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
        // Valid value data type to add a pokemon
        let validValues = [typeof 'string', typeof 1, typeof []]
        // Values added by the function
        let valuesAdded = Object.values(pokemon)  
        // Checking if the the input key matches
        let checkKeysMatch = inputKeys.every((key, index) => key === validKeys[index])
        // Checking if the values data type are valid
        let checkValidType = valuesAdded.every((value, index) => typeof value === validValues[index])
        // If all the conditions meet the pokemon added has the correct input
        if(typeof pokemon === 'object' && validKeys.length === inputKeys.length && checkKeysMatch && checkValidType){
            return pokemonList.push(pokemon)
        }else{
            return console.error('Something went wrong! Add a pokemon object')
        }

    }
    // Add searchByName parameter
    function findPokemonByName(searchByName){
        // Filter the pokemon list to find the search pokemon
        // Put the filter method into a variable to return the value searched
       let searchedPokemon = pokemonList.filter((pokemon) => {
        // Find the full name or the pokemons that start with using the startWith string method
           return pokemon.name.startsWith(searchByName)
        })
        //Log in the searched pokemon into the console
        console.table(searchedPokemon);
    }

    // IIFE return values to be global values
    return{
        getAll: getAll,
        add: add,
        addv: addv,
        findPokemonByName: findPokemonByName
    }
})() 

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

pokemonRepository.findPokemonByName('char')



