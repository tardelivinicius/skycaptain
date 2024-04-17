import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  try {
    const response = await fetch(`${process.env.AIRLABS_API_URL}/airports?api_key=${process.env.AIRLABS_API_KEY}`);
    const airportsData = await response.json();
    
    for (const airportData of airportsData.response) {
      console.log(`Inserindo/atualizando o aeroporto ${airportData.name} - is_international: ${airportData.name.includes('International')}`);
  
      let airport = await prisma.airport.findFirst({
        where: {
          OR: [
            { icao_code: airportData.icao_code },
            { name: airportData.name }
          ]
        }
      });
  
      if (!airport && airportData.name.includes('International')) {
        // Se o aeroporto não existir, criamos um novo
        airport = await prisma.airport.create({
          data: {
            name: airportData.name,
            iata_code: airportData.iata_code || null,
            icao_code: airportData.icao_code || null,
            lat: airportData.lat,
            lng: airportData.lng,
            country_code: airportData.country_code,
            is_international: airportData.name.includes('International')
          }
        });
      } else {
        // Se o aeroporto existir, atualizamos somente se for internacional
        if (airportData.name.includes('International')) {
          airport = await prisma.airport.update({
            where: { id: airport.id },
            data: {
              name: airportData.name,
              iata_code: airportData.iata_code || null,
              icao_code: airportData.icao_code || null,
              lat: airportData.lat,
              lng: airportData.lng,
              country_code: airportData.country_code,
              is_international: airportData.name.includes('International')
            }
          });
        }
      }
    }
    console.log('Seed de aeroportos concluído com sucesso!');
  } catch (error) {
    console.error('Erro ao executar o seed de aeroportos:', error);
  } finally {
    // Fecha a conexão com o banco de dados Prisma
    await prisma.$disconnect();
  }
}

main();
