let pokemonRepository = (function() {
    let pokemonList = [];
  
    function getAll() {
      return pokemonList;
    }
  
    function add(pokemon) {
      pokemonList.push(pokemon);
    }
  
    function addListItem(pokemon) {
      let listPokemon = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('pokemon-button')
      listItem.appendChild(button);
      listPokemon.appendChild(listItem);
      addButtonEventListener(button, pokemon);
  
    }
  
    function showDetails(pokemon) {
      loadDetails(pokemon).then(function() {
        console.log(pokemon);
      });
    }
  
    function loadList() {
      return fetch('https://pokeapi.co/api/v2/pokemon/')
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          json.results.forEach(function(item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        })
        .catch(function(e) {
          console.error(e);
        });
    }
  
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(details) {
          item.imgUrl = details.sprites.front_default;
          item.height = details.height;
        })
        .catch(function(e) {
          console.error(e);
        });
    }
  
    function addButtonEventListener(button, pokemon) {
      button.addEventListener('click', function() {
        showDetails(pokemon);
      });
    }
  
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails
    };
  
  })();
  
  pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
   