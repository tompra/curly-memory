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

    // Retrieves all the list of pokemons
    function getAll(){
        return pokemonList
    }

    // Add a new pokemon
    function add(pokemon){
        // conditional if object then add if not error message
        if(typeof pokemon === 'object' && pokemon.hasOwnProperty('name') && pokemon.hasOwnProperty('height') && pokemon.hasOwnProperty('type')){
            return pokemonList.push(pokemon)
        }else{
            return console.error('Something went wrong! Add a pokemon object')
        }
    }
    function addv(pokemon){
        // Valid keys to add a pokemon
        let validKeys = ['name','height','type']
        // The keys added by the function
        let inputKeys = Object.keys(pokemon)   
        // Checking if the pokemon added was an object and has the same key and value data type
        if(typeof pokemon === 'object' && validKeys.length === inputKeys.length){
            
            
        }

    }
    // IIFE return values to be global values
    return{
        getAll: getAll,
        add: add,
        addv: addv
    }
})() 

console.log('getAll', pokemonRepository.getAll())
console.log('add',pokemonRepository.addv({nae:'blas',height: 1.2,type:['water']}))
// console.log('add',pokemonRepository.add({name:'blas',height: 1.2,type:['water']}))

// Calling the function by the IFFE to retrieve the pokemon list
// Re-factoring the for loop to the built-in function forEach()
pokemonRepository.getAll().forEach((pokemon) =>{
     if(pokemon.height >= 1.0){
        document.write(`${'<p>'} ${pokemon.name} (height: ${pokemon.height}) - Wow, that's big! ${'</p>'}`)
    }
    // Part of the code that escapes if to the height value doesn't meet the conditional
    else{
        document.write(`${'<p>'} ${pokemon.name} (height: ${pokemon.height}) ${"</p>"}`)
    }
})



