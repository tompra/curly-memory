// Declaring IIFE inside a variable
let pokemonRepository = (function () {
    // Object with the pokemons and characteristics
    let pokemonList = [
        {
            name: 'bulbasaur',
            height: 0.7,
            type: ['grass', 'poison'],
        },
        {
            name: 'charmander',
            height: 0.6,
            type: ['fire'],
        },
        {
            name: 'squirtle',
            height: 0.5,
            type: ['water'],
        },
        {
            name: 'pidgey',
            height: 0.3,
            type: ['flying', 'normal'],
        },
        {
            name: 'weddle',
            height: 0.3,
            type: ['bug', 'poison'],
        },
        {
            name: 'ivysaur',
            height: 1.0,
            type: ['grass', 'poison'],
        },
        {
            name: 'venasaur',
            height: 2.0,
            type: ['grass', 'poison'],
        },
        {
            name: 'charmaleon',
            height: 1.1,
            type: ['fire'],
        },
        {
            name: 'charizard',
            height: 1.7,
            type: ['fire', 'flying'],
        },
        {
            name: 'wartortle',
            height: 1.0,
            type: ['water'],
        },
        {
            name: 'blastoise',
            height: 1.6,
            type: ['water'],
        },
    ];

    // Retrieves all the list of pokemons
    function getAll() {
        let getListOfPokemon = document.querySelector('.pokemon-list');
        let createList = document.createElement('li');
        let createButton = document.createElement('button');
        return pokemonList;
    }

    // Add a new pokemon
    function add(pokemon) {
        // conditional if object then add if not error message
        if (
            typeof pokemon === 'object' &&
            pokemon.hasOwnProperty('name') &&
            pokemon.hasOwnProperty('height') &&
            pokemon.hasOwnProperty('type')
        ) {
            return pokemonList.push(pokemon);
        } else {
            return console.error('Something went wrong! Add a pokemon object');
        }
    }

    function addv(pokemon) {
        // Valid keys to add a pokemon
        let validKeys = ['name', 'height', 'type'];
        // The keys added by the function
        let inputKeys = Object.keys(pokemon);
        // Valid value data type to add a pokemon
        let validValues = [typeof 'string', typeof 1, typeof []];
        // Values added by the function
        let valuesAdded = Object.values(pokemon);
        // Checking if the the input key matches
        let checkKeysMatch = inputKeys.every(
            (key, index) => key === validKeys[index]
        );
        // Checking if the values data type are valid
        let checkValidType = valuesAdded.every(
            (value, index) => typeof value === validValues[index]
        );
        // If all the conditions meet the pokemon added has the correct input
        if (
            typeof pokemon === 'object' &&
            validKeys.length === inputKeys.length &&
            checkKeysMatch &&
            checkValidType
        ) {
            return pokemonList.push(pokemon);
        } else {
            return console.error('Something went wrong! Add a pokemon object');
        }
    }
    // Add searchByName parameter
    function findPokemonByName(searchByName) {
        // Filter the pokemon list to find the search pokemon
        // Put the filter method into a variable to return the value searched
        let searchedPokemon = pokemonList.filter(pokemon => {
            // Find the full name or the pokemons that start with using the startWith string method
            return pokemon.name.startsWith(searchByName);
        });
        //Log in the searched pokemon into the console
        console.table(searchedPokemon);
    }
    // Getting list of pokemons in the interface
    function addListItem(pokemon) {
        // Select the pokemon unordered list
        let getListOfPokemon = document.querySelector('.pokemon-list');
        // Create button and list element
        let createListElement = document.createElement('li');
        let createButtonElement = document.createElement('button');

        // Give the to the new button element the pokemon's name
        createButtonElement.innerText = `${pokemon.name}`;
        // Append the new created button and list items to the parent element
        getListOfPokemon.appendChild(createListElement);
        createListElement.appendChild(createButtonElement);

        // Add event listener to the buttons
        createButtonElement.addEventListener('click', () => {
            //checking if the event works in all the buttons
            console.log('event happening');
        });
    }
    // Show details of the pokemons
    function showDetails(pokemon) {
        console.log(pokemonList);
    }

    // IIFE return values to be global values
    return {
        getAll: getAll,
        add: add,
        addv: addv,
        findPokemonByName: findPokemonByName,
        addListItem: addListItem,
        showDetails: showDetails,
    };
})();

// Examples

// Searching a pokemon by name or pokemons that start with
// pokemonRepository.findPokemonByName('char');

// // Adding a new pokemon to the list
// pokemonRepository.add({ name: 'caterpie', height: 0.3, type: ['bug'] });
// pokemonRepository.add({ nae: 'caterpie', height: 0.3, tye: ['bug'] }); // Creates an error by wrong key
// pokemonRepository.addv({ name: 'metapod', height: 0.7, type: ['bug'] });
// pokemonRepository.addv({ name: 'metapod', height: '0.7', type: 'fire' }); // Creates an error by wrong key and value

// Calling the function by the IFFE to retrieve the pokemon list
// Re-factoring the for loop to the built-in function forEach()

pokemonRepository.getAll().forEach(pokemon => {
    //Created a new function getListOfPokemons to continue the FP principle
    pokemonRepository.addListItem(pokemon);
});

//Checking if showDetails function retrieve the pokemonList array
pokemonRepository.showDetails();
