'use server'
import db from '@/services/database'
import { getRequestCountry } from "@/lib/get-request-country";
export async function generateUserData(user: any) {
  // Esse método inicializa os dados de um usuário para o sistema
  // 1 - Gera um HUB (Aeroporto Principal) 
  // 2 - Entrega 5 licenças de aeroportos para o usuário (Apenas aeroportos grandes e do país de origem), totalizando 4 + 1 hub = 5 trechos
  // 3 - Da a aeronave a320Neo para iniciar o processo.
  const reqCountryCode = await getRequestCountry()
  if(user.isFirstAccess){
    const results = await db.$queryRawUnsafe(
      // DO NOT pass in or accept user input here
      `SELECT * FROM "airports" WHERE country_code LIKE '${reqCountryCode}' and is_international = 1 ORDER BY RANDOM() LIMIT 5;`,
    )
    // @TODO - VERIFICAR O ERRO DE TYPE COM INDEX
    // Get the main hub
    await db.userAirportHub.create({
        data: { 
          userId: user?.id,
          airportId: results[0].id,
        }
      });
    // Give another 4 licenses to the user
    await db.userAirportLicense.create({
      data: { 
        userId: user.id, 
        airportId: results[1].id
      },
    });
    await db.userAirportLicense.create({
      data: { 
        userId: user.id, 
        airportId: results[2].id
      },
    });
    await db.userAirportLicense.create({
      data: { 
        userId: user.id, 
        airportId: results[3].id
      },
    });
    await db.userAirportLicense.create({
      data: { 
        userId: user.id, 
        airportId: results[4].id
      },
    });
    // Give A320 Neo to the user
    const aircraft = await db.aircraft.findFirst({ where: { icao_code: 'A20N' } })
    if (aircraft) {
      await db.userAircraft.create({
        data: { user: { connect: { id: user.id } }, aircraft: { connect: { id: aircraft.id } } },
      });
    }
    // Insert default level to user and flagged the first access
    await db.user.update({
      where: { 
        email: user.email 
      },
      data: {
        levelId: 1,
        isFirstAccess: false
      },
    });
  }
}