// Declaring IIFE inside a variable
let pokemonRepository = (function () {
    // Added empty array for the pokemon list
    let pokemonList = []
    // apiURL data
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150'
    // Creating loading element
    let loadingElement = document.createElement('p')
    loadingElement.innerHTML = 'Loading...'



    // Retrieves all the list of pokemons
    function getAll() {
        return pokemonList;
    }

    // Add a new pokemon
    function add(pokemon) {
        // conditional if object then add if not error message
        if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
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
        eventShowDetails(createButtonElement, pokemon);
    }

    // Show details of the pokemons
    function showDetails(pokemon) {
        // retrieving information from the pokemon list in a table
        loadDetails(pokemon).then(() =>{
            console.table(pokemon)
        }).catch((e) =>{
            console.error(e)
        })
    }

    // Event listener on clicking button to show more
    function eventShowDetails(button, pokemon) {
        button.addEventListener('click', () => {
            showDetails(pokemon);
        });
    }

    // Load list function to fetch the actual data
   function loadList(){
        showLoadingMessage()
        return new Promise((resolve, reject) =>{
            setTimeout(() =>{
                fetch(apiURL).then((response) =>{
                    return response.json()
                }).then((data) =>{
                    data.results.forEach((item) =>{
                        let pokemon = {
                            name : item.name,
                            detailsUrl : item.detailsUrl
                        }
                        add(pokemon)
                        resolve(pokemon)

                    })
                }).catch((e) =>{
                    console.error(e)
                    reject(e)
                })
            }, 3000)
        })
        // return fetch(apiURL).then((response) =>{
        //     return response.json()
        // }).then((data) =>{
        //     hideLoadingMessage()
        //     data.results.forEach((item) =>{
        //         let pokemon = {
        //             name: item.name,
        //             detailsUrl: item.url
        //         }
        //         add(pokemon)
        //     })
        // }).catch((e) =>{
        //     hideLoadingMessage()
        //     console.error(e)
        // })
    }
   

  // Load details function
  function loadDetails(item) {
       showLoadingMessage()
       let url = item.detailsUrl;
    //    return fetch(url).then((response) =>{
    //         return response.json()
    //    }).then((data) => {
    //         hideLoadingMessage()
    //         item.img = data.sprites.front_default,
    //         item.height = data.height,
    //         item.types = data.types
    //    }).catch((e) =>{
    //         hideLoadingMessage()
    //         console.error(e)
    //    })
        return new Promise((resolve, reject) =>{
            setTimeout(() =>{
                fetch(url).then((response) => response.json())
                .then((data) => {
                    hideLoadingMessage()
                    item.img = data.sprites.front_default;
                    item.height = data.height;
                    item.types = data.types
                    resolve(item)
                })
                .catch((e) =>{
                    hideLoadingMessage()
                    console.error(e)
                    reject(e)
                })
            }, 3000)
        })   

  }

  //loading message functions
  function showLoadingMessage(){
    document.body.appendChild(loadingElement)
  }

  function hideLoadingMessage(){
    document.body.removeChild(loadingElement)
  }


    // IIFE return values to be global values
    return {
        getAll: getAll,
        add: add,
        addv: addv,
        findPokemonByName: findPokemonByName,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();


//Checking if the data was fetched
pokemonRepository.loadList().then(() =>{
    pokemonRepository.getAll().forEach(pokemon => {
    pokemonRepository.addListItem(pokemon);
});


})
