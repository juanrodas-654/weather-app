const inquirer = require('inquirer');
const colors = require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'Qué desea hacer?',
        choices: [
            {
                value: 1,
                name:'1. Buscar Ciudad'
            },
            {
                value: 2,
                name: '2. Historial'
            },
            {
                value: 0,
                name:'0. Salir'
            }
        ]

    }
]


const showMenu = async() => {
    console.clear();

    console.log("=======================");
    console.log("Seleccione una opción: ");
    console.log("=======================");


    const {option} = await inquirer.prompt(questions);

    return option;
}



const readInput = async(message)=>{

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
        
        }
    ]

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const pause = async() => {
    const question = [{
        type: 'input',
        name: 'pause',
        message: `Presiona ${"Enter".green} para continuar`

    }]

    const {pause} = await inquirer.prompt(question);
    return pause;
}


const showPlaces = async(lugares = []) => {
    const choices = lugares.map((lugar, i)=>{
        const indice = `${i+1}`.green;

        return {
            value: lugar.id,
            name: `${indice} ${lugar.nombre}`
        }
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione el lugar',
            choices
        }
    ];


    const {id} = await inquirer.prompt(questions);

    return id;

}

module.exports = {
    readInput,
    showMenu,
    pause,
    showPlaces
}