// Declaring IIFE inside a variable
let pokemonRepository = (function(){
    // Object with the pokemons and characteristics
let pokemonList = [
    {
        name: 'bulbasaur',
        height: 0.7,
        type: ['grass', 'poison']
    },
    {
        name: 'charmander',
        height: 0.6,
        type:['fire']
    },
    {
        name: 'squirtle' ,
        height: 0.5 ,
        type: ['water']
    },
    {
        name: 'pidgey',
        height: 0.3,
        type: ['flying', 'normal']
    },
    {
        name:'weddle',
        height:0.3,
        type: ['bug', 'poison']
    },
    {
        name: 'ivysaur',
        height: 1.0,
        type: ['grass', 'poison']
    },
    {
        name: 'venasaur',
        height: 2.0,
        type: ['grass', 'poison']
    },
    {
        name: 'charmaleon',
        height: 1.1,
        type: ['fire']
    },
    {
        name: 'charizard',
        height: 1.7,
        type: ['fire','flying']
    },
    {
        name: 'wartortle',
        height: 1.0,
        type: ['water']
    },
    {
        name: 'blastoise',
        height: 1.6,
        type: ['water']
    }
];
    function getAll(){
        return pokemonList
    }
    function add(pokemon){
        return pokemonList.push(pokemon)
    }
    // IIFE return values to be global values
    return{
        getAll: getAll,
        add: add
    }
})() 

console.log(pokemonRepository.getAll())
console.log(pokemonRepository.add({name: 'opi', height: 1.2, type: ['water']}))
console.log(pokemonRepository.getAll())


// Looping throught the pokemonList object
// for(let i = 0; i < pokemonList.length; i++){
//     // Add a conditional checking if the height of the pokemon is bigger or equal to 1.0    
//     if(pokemonList[i].height >= 1.0){
//         document.write(`${'<p>'} ${pokemonList[i].name} (height: ${pokemonList[i].height}) - Wow, that's big! ${'</p>'}`)
//     }
//     // Part of the code that escapes if to the height value doesn't meet the conditional
//     else{
//         document.write(`${'<p>'} ${pokemonList[i].name} (height: ${pokemonList[i].height}) ${"</p>"}`)
//     }
// }

// Re-factoring the for loop to the built-in function forEach()
/*
arrPokemons.forEach((pokemon) => {
    if(pokemon.height >= 1.0){
        document.write(`${'<p>'} ${pokemon.name} (height: ${pokemon.height}) - Wow, that's big! ${'</p>'}`)
    }
    // Part of the code that escapes if to the height value doesn't meet the conditional
    else{
        document.write(`${'<p>'} ${pokemon.name} (height: ${pokemon.height}) ${"</p>"}`)
    }
})
*/


