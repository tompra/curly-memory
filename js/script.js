// Declaring IIFE inside a variable
let pokemonRepository = (function () {
    // Added empty array for the pokemon list
    let pokemonList = []
    // apiURL data
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150'
    // Creating loading element
    let loadingElement = document.createElement('p')
    loadingElement.innerHTML = 'Loading...'
    // Selecting modal container
    let modalContainer = document.querySelector('#modal-container')



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
            showModal(pokemon)
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
        return fetch(apiURL).then((response) =>{
            return response.json()
        }).then((data) =>{
            hideLoadingMessage()
            data.results.forEach((item) =>{
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                }
                add(pokemon)
            })
        }).catch((e) =>{
            hideLoadingMessage()
            console.error(e)
        })
    }
   

  // Load details function
  function loadDetails(item) {
       showLoadingMessage()
       let url = item.detailsUrl;
       return fetch(url).then((response) =>{
            return response.json()
       }).then((data) => {
            hideLoadingMessage()
            item.img = data.sprites.front_default,
            item.height = data.height,
            item.types = data.types
       }).catch((e) =>{
            hideLoadingMessage()
            console.error(e)
       })
  }

  //loading message functions
  function showLoadingMessage(){
    document.body.appendChild(loadingElement)
  }

  function hideLoadingMessage(){
    document.body.removeChild(loadingElement)
  }

  // Show modal
  function showModal(pokemon){
    // Clear all before adding elements
    modalContainer.innerHTML = ''
    // Create elements: modal,closeButton, heading, content, img
    let modal = document.createElement('div')
    modal.classList.add('modal')

    let closeButtonElement = document.createElement('button')
    closeButtonElement.innerText = "Close"
    closeButtonElement.classList.add('modal-close')
    //Add event listener to close modal
    closeButtonElement.addEventListener('click', hideModal)

    let heading = document.createElement('h1')
    heading.innerText = pokemon.name

    let descriptionType = document.createElement('p')
    let descriptionHeight = document.createElement('p')
    let typeNames = pokemon.types.map((item) => item.type.name).join(', ')
    descriptionType.innerText = `Type: ${typeNames}.`
    descriptionHeight.innerText = `Height: ${pokemon.height}m.`

    let image = document.createElement('img')
    image.setAttribute('src', pokemon.img)
    image.setAttribute('width', 150)
    image.setAttribute('height', 150)
    image.setAttribute('alt', `Image of the ${pokemon.name}`)

    // Append every element created
    modal.appendChild(closeButtonElement)
    modal.appendChild(heading)
    modal.appendChild(descriptionType)
    modal.appendChild(descriptionHeight)
    modal.appendChild(image)
    modalContainer.appendChild(modal)

    // Add class to make modal visible
    modalContainer.classList.add('is-visible')

  }

  // Hide modal 
  function hideModal(){
    // Remove class list that makes modal visible
    modalContainer.classList.remove('is-visible')

  }
  // Hide modal with escape key
  window.addEventListener('keydown', (e) =>{
    if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')) hideModal()
  })

  // Hide modadl clicking outside of the modal container
  modalContainer.addEventListener('click', (e) =>{
    if(e.target === modalContainer) hideModal()
})


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
