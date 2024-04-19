
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  try {
    // console.log("Cadastrando aeronaves...")
    // const url = 'https://parseapi.back4app.com/classes/Aircraftmodels_ListOfAircraftModel?count=1&limit=500&excludeKeys=Aircraft_Manufacturer,Type';
    // const headers = new Headers();
    // headers.set('X-Parse-Application-Id', process.env.BACK4APP_APPLICATION_ID || '');
    // headers.set('X-Parse-REST-API-Key', process.env.BACK4APP_API_KEY || '');
    // const aircrafts = await fetch(url, { headers });
    // const aircraftsData = await aircrafts.json();
    // for (const aircraftData of aircraftsData['results']) {
    //     let aircraft = await prisma.aircraft.findFirst({
    //         where: {
    //         OR: [
    //             { icao_code: aircraftData.icao_code },
    //             { model: aircraftData.Model }
    //         ]
    //         }
    //     });
    //     if (!aircraft) {
    //         aircraft = await prisma.aircraft.create({
    //             data: {
    //                 model: aircraftData.Model,
    //                 manufacturer: aircraftData.Manufacturer,
    //                 iata_code: aircraftData.IATACode || null,
    //                 icao_code: aircraftData.ICAOCode || null,
    //             }
    //         });
    //     } else {
    //         if (aircraftData.ICAOCode) {
    //         aircraft = await prisma.aircraft.update({
    //             where: { id: aircraft.id },
    //             data: {
    //             model: aircraftData.Model,
    //             manufacturer: aircraftData.Manufacturer,
    //             iata_code: aircraftData.IATACode || null,
    //             icao_code: aircraftData.ICAOCode || null,
    //             }
    //         });
    //         }
    //     }
    // }
    // console.log("Cadastrando aeroportos...")
    // const airports = await fetch(`${process.env.AIRLABS_API_URL}/airports?api_key=${process.env.AIRLABS_API_KEY}`);
    // const airportsData = await airports.json();
    
    // for (const airportData of airportsData.response) {
    //   let airport = await prisma.airport.findFirst({
    //     where: {
    //       OR: [
    //         { icao_code: airportData.icao_code },
    //         { name: airportData.name }
    //       ]
    //     }
    //   });
  
    //   if (!airport && airportData.name.includes('International')) {
    //     airport = await prisma.airport.create({
    //       data: {
    //         name: airportData.name,
    //         iata_code: airportData.iata_code || null,
    //         icao_code: airportData.icao_code || null,
    //         lat: airportData.lat,
    //         lng: airportData.lng,
    //         country_code: airportData.country_code,
    //         is_international: airportData.name.includes('International')
    //       }
    //     });
    //   } else {
    //     if (airportData.name.includes('International')) {
    //       airport = await prisma.airport.update({
    //         where: { id: airport?.id },
    //         data: {
    //           name: airportData.name,
    //           iata_code: airportData.iata_code || null,
    //           icao_code: airportData.icao_code || null,
    //           lat: airportData.lat,
    //           lng: airportData.lng,
    //           country_code: airportData.country_code,
    //           is_international: airportData.name.includes('International')
    //         }
    //       });
    //     }
    //   }
    // }
    console.log("Cadastrando levels")
    const levels = [
      {'id': 1, 'title': 'Aprendiz', 'order': 0, 'totalXP': 0, 'multiplierFactor': 1.0, 'color': 'bronze'},
      {'id': 2, 'title': 'Novato', 'order': 1, 'totalXP': 500, 'multiplierFactor': 1.2, 'color': 'bronze'},
      {'id': 3, 'title': 'Aventureiro dos Céus', 'order': 2, 'totalXP': 2000, 'multiplierFactor': 1.5, 'color': 'bronze'},
      {'id': 4, 'title': 'Explorador Celestial', 'order': 3, 'totalXP': 5000, 'multiplierFactor': 2.0, 'color': 'bronze'},
      {'id': 5, 'title': 'Piloto Cadete', 'order': 4, 'totalXP': 10000, 'multiplierFactor': 2.5, 'color': 'bronze'},
      {'id': 6, 'title': 'Alto Voo', 'order': 5, 'totalXP': 20000, 'multiplierFactor': 3.0, 'color': 'silver'},
      {'id': 7, 'title': 'Navegador Intrépido', 'order': 6, 'totalXP': 35000, 'multiplierFactor': 3.5, 'color': 'silver'},
      {'id': 8, 'title': 'Dominador do Céu', 'order': 7, 'totalXP': 50000, 'multiplierFactor': 4.0, 'color': 'silver'},
      {'id': 9, 'title': 'Comandante Júnior', 'order': 8, 'totalXP': 75000, 'multiplierFactor': 4.5, 'color': 'silver'},
      {'id': 10, 'title': 'Comandante Sênior', 'order': 9, 'totalXP': 100000, 'multiplierFactor': 5.0, 'color': 'silver'},
      {'id': 11, 'title': 'Senhor dos Ventos', 'order': 10, 'totalXP': 150000, 'multiplierFactor': 6.0, 'color': 'gold'},
      {'id': 12, 'title': 'Navegador Virtuoso', 'order': 11, 'totalXP': 200000, 'multiplierFactor': 7.0, 'color': 'gold'},
      {'id': 13, 'title': 'Especialista Aéreo', 'order': 12, 'totalXP': 250000, 'multiplierFactor': 8.0, 'color': 'gold'},
      {'id': 14, 'title': 'Mestre de Esquadrilha', 'order': 13, 'totalXP': 300000, 'multiplierFactor': 9.0, 'color': 'gold'},
      {'id': 15, 'title': 'Legado Celestial', 'order': 14, 'totalXP': 400000, 'multiplierFactor': 10.0, 'color': 'black'},
      {'id': 16, 'title': 'Piloto Instrutor', 'order': 15, 'totalXP': 500000, 'multiplierFactor': 11.0, 'color': 'black'},
      {'id': 17, 'title': 'Comandante Instrutor', 'order': 16, 'totalXP': 650000, 'multiplierFactor': 12.0, 'color': 'black'},
      {'id': 18, 'title': 'Mestre da Aviação', 'order': 17, 'totalXP': 800000, 'multiplierFactor': 13.0, 'color': 'diamond'},
      {'id': 19, 'title': 'Lenda dos Céus', 'order': 18, 'totalXP': 1000000, 'multiplierFactor': 15.0, 'color': 'diamond'},
      {'id': 20, 'title': 'Supremo dos Céus', 'order': 19, 'totalXP': 1500000, 'multiplierFactor': 20.0, 'color': 'diamond'},
    ];
    for (const levelData of levels) {
      await prisma.userLevel.upsert({
        where: { id: levelData.id },
        update: levelData,
        create: levelData,
      });
    }
  } catch (error) {
    console.error('Erro ao inserir/atualizar dados de aeronaves:', error);
  } finally {
    await prisma.$disconnect();
    console.log('Desconectado do banco de dados');
  }
}
main();
