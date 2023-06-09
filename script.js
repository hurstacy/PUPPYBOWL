const form = document.getElementById('formfield');
const playerContainer = document.getElementById('all-players-container');
const playerListContainer = document.getElementById('player-container');
// const playerListContainer = document.getElementById('player-list-container');


// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2302-ACC-PT-WEB-PT-A';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players/`;
  

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
    try {
        const response = await fetch(APIURL);
        const responseJson = await response.json();
        // console.log(responseJson);
        const players = responseJson.data.players;
        // console.log(players);
        return players;
        } catch (error) {
        console.error(error);
    }
};

const getPlayerById = async (id) => {
  try {
    const response = await fetch(`${APIURL}/${id}`);
    const player = await response.json();
    return player;
  } catch (error) {
    console.error(error);
  }
};

// const addNewPlayer = async (id) => {
//   console.log('adding ' + id);
//   try {
//     const requestOptions = {
//       method: 'ADD'
//     }
//     const response = await fetch(`${APIURL}/${id}`, requestOptions);
//     const party = await response.json();
//     return party;
//   } catch (error) {
//     console.error(error);
//   }
// };

const removePlayer = async (player) => {
  try {
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${player} from the roster!`,
      err
    );
  }
};

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players.
 *
 * Then it takes that larger string of HTML and adds it to the DOM.
 *
 * It also adds event listeners to the buttons in each player card.
 *
 * The event listeners are for the "See details" and "Remove from roster" buttons.
 *
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player.
 *
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster.
 *
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
const renderSinglePlayerById = async (id) => {
  try {
    // fetch party details from server
    const player = await getPlayerById(id);

    // create new HTML element to display player details
    const playerDetailsElement = document.createElement('div');
    // playerDetailsElement.classList.add('player');
    playerDetailsElement.innerHTML = `
            <h2>${player.name}</h2>
            <p>${player.breed}</p>
            <p>${player.status}</p>
            <p>${player.teamId}</p>
            <ul>


            <button class="close-button">Close</button>
        `;

    // hide the party list container
    // playerContainer.style.display = 'none'

    // put the party details on the page ( in the container )
    playerListContainer.appendChild(playerDetailsElement);

    // add event listener to close button
    const closeButton = playerDetailsElement.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
      playerDetailsElement.remove();
    });
  } catch (error) {
    console.error(error);
  }
};
const renderAllPlayers = async (players) => {
  try {
    playerContainer.innerHTML = '';
    players.forEach((player) => {
      const playerElement = document.createElement('div');
      playerElement.classList.add('player');
      playerElement.innerHTML = `
                <h2>${player.name}</h2>
                <p>${player.breed}</p>
                <p>${player.status}</p>
                <p>${player.teamId}</p>
                <button class="details-button" data-id="${player.id}">See Details</button>
                <button class="delete-button" data-id="${player.id}">Delete</button>
            `;
      playerContainer.appendChild(playerElement);

      // see details
      const detailsButton = playerElement.querySelector('.details-button');
      detailsButton.addEventListener('click', async (event) => {
        // get the id
        const playerId = event.target.dataset.id
        renderSinglePlayerById(playerId)
      });

      // delete player
      const deleteButton = playerElement.querySelector('.delete-button');
      deleteButton.addEventListener('click', async (event) => {
        // get the id
        const playerId = event.target.dataset.player.id
        // pass the id to deleteParty function
        deletePlayer(playerId)
        // get it off the page
        event.target.closest('div.player').remove()
      });
    });
  } catch (error) {
    console.error(error);
  }
};



/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */

    const newPlayer = async (formfield) => {
        try {
            const response = await POST(`${APIURL}`);
            formfield.innerHTML = '';
            formfield.add((formfield) => {
                const formfield = document.getElementById('formfield');  
   
    {
        
        function add(){
          const newField = document.createElement('input');
          newField.setAttribute('Name','text');
          newField.setAttribute('Breed','text');
          newField.setAttribute('class','text');
          newField.setAttribute('siz',50);
          newField.setAttribute('Status','text');
          formfield.appendChild(newField);
        }};
        
        function remove(){
          const input_tags = formfield.getElementsByTagName('input');
          if(input_tags.length > 2) {
            formfield.removeChild(input_tags[(input_tags.length) - 1]);
          }});
        } catch (err) {
            console.error("Uh oh, trouble rendering the new player form!", err);
          }
        
        };
    const result = await response.json();
    console.log(result);




const init = async () => {
  const players = await fetchAllPlayers()
  renderAllPlayers(players)

  // renderNewPlayerForm()
};

init();
