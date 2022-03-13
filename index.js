const { showMenu, pause, readInput, showPlaces } = require("./helpers/inquirer")

const axios = require('axios');
const Searches = require("./models/searches");


require('dotenv').config();


const main = async() => {

    let opt;

    const searches = new Searches();

    do {
        opt = await showMenu();

        switch (opt) {
            case 1:
                //Buscar la ciudad
                const lugar = await readInput();


                //Seleccionar la ciudad

                const lugares = await searches.ciudad(lugar);

                const id = await showPlaces(lugares);

                

                const lugarSelec = lugares.find(l=> l.id === id);

                searches.addHistory(lugarSelec.nombre);

                const {nombre, lat, lng} = lugarSelec;

                const {desc, temp, temp_min, temp_max} = await searches.wheatherPlace(lugarSelec.lat, lugarSelec.lng);

                
                

                //Datos del clima

                console.log('\nInformacion de la ciudad:\n'.green);
                console.log(`Ciudad: ${nombre}`);
                console.log(`Cómo está el clima: ${desc}`);
                console.log(`Lat: ${lat.toFixed(2)}`);
                console.log(`Lng: ${lng.toFixed(2)}`);
                console.log(`Temperatura: ${temp}`);
                console.log(`Mínima: ${temp_min}`);
                console.log(`Máxima: ${temp_max}`);

            break;
        
            case 2:

                searches.historyCapitalized.forEach((lugar, i)=>{
                const ind = i+1;
                console.log(`${ind} ${lugar}`);


            })


            break;
        }



        if(opt !==0) await pause();
        
    } while (opt !== 0);
    

}

main();
