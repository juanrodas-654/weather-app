const { default: axios } = require("axios");

const fs = require('fs');
class Searches {

    history = [];
    dbPath = './db/database.json';

    constructor(){
        //TODO: leer DB si existe

        this.leerDB();
    }

    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramWeather () {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    get historyCapitalized() {
        return this.historial.map( lugar => {

            let palabras = lugar.split(' ');
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1) );

            return palabras.join(' ')

        })
    }

    async ciudad(lugar = ''){
        try {

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            })

            const resp = await instance.get();

            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }))

            
        } catch (error) {
            return [];
        }
        
    }

    async wheatherPlace(lat, lon){

        try {

            const instance =  axios.create(({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramWeather, lat, lon}
            }));
            
            const resp = await instance.get();
            

            const {weather, main} = resp.data;

            return {
                desc: weather[0].description,
                temp: main.temp,
                temp_min: main.temp_min,
                temp_max: main.temp_max

            };

            
        } catch (error) {
            console.log(error);
        }
    }

    addHistory(lugar = ''){

        //this.history.push(lugar);

        if(this.history.includes(lugar.toLocaleLowerCase())){
            return;
        }
        this.historial = this.history.splice(0,5);
        this.history.unshift(lugar);


         // Grabar en DB
         this.saveDB();
    }

    saveDB(){
            const payload = {
                historial: this.historial
            };
    
            fs.writeFileSync( this.dbPath, JSON.stringify( payload ));
    }

    leerDB() {

        if( !fs.existsSync( this.dbPath ) ) return;
        
        const info = fs.readFileSync( this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse( info );

        this.historial = data.historial;
    }



}


module.exports = Searches;