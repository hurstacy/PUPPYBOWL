// const form = document.getElementById('formfield');

const newPlayerFormContainer = document.getElementsByClassName('form');
const playerListContainer = document.getElementById('all-players-container');
const playerContainer = document.getElementById('player-container');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2302-ACC-PT-WEB-PT-A';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;
 
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

const fetchSinglePlayerById = async (playerId) => {
  try {
    const response = await fetch(`${APIURL}/${playerId}`);
    const responseJson = await response.json();
    // console.log(responseJson);
    const player = responseJson.data.player;
    return player;
  } catch (err) {
    console.error(`Oh no, trouble fetching player!`, err);
  }
};

//add new player
const AddNewPlayer = async (playerObj) => {
  try {
      const response = await POST(APIURL);
      const responseJson =await response.json();
      conseole.log(resposeJson);
      const newPlayer = responseJson.data;
      console.log(players);
      return newPlayer;
  } catch (err) {
      console.error('Oops, something went wrong with adding that player!', err);
  }
};



const renderAddNewPlayer = async (playerObj) => {
  try {
      const newPlayer = await fetchAllPlayers(APIURL);

      // create new html element to display new player
      const newPlayerDetailsElement = document.createElement('div');
      newPlayerDetailsElement.classList.add('player');
      newPlayerDetailsElement.innerHTML = `
          <form id ="new-player-form">
          <h2> New Player Form </h2><br />
          <label> New Player:</label><br />
          <input type='text' class="player-name" placeholder="Name">${player.name}</input>
          <label> Breed:</label><br />
          <input type='text' class="player-breed" placeholder="Breed">${player.breed}</input>
          <label> Status:</label><br />
          <input type='text' class="player-status" placeholder="Status">${player.status}</input>
          <label> Upload Photo:</label><br />
          <input type='file' accept="image/*" class="player-img" placeholder="">${player.imageUrl}</input> 
          <img src=""></img> 
          <button class="submit-button" data-id="${player.id}">Submit</button>
          </form>
           `
          // put the new player in the container
      playerListContainer.appendChild(newPlayerDetailsElement);

      //add event listener to sumbit button
      const submitButton = newPlayerDetailsElement.querySelector('.submit-button');
      submitButton.addEventListener('click', async (AddNewPlayer) => {

      const newPlayerId = AddNewPlayer.target.dataset.id;
      renderAddNewPlayer(newPlayerId);
  });     

          
          } catch (error) {
              console.error(error);
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

const renderSinglePlayerById = async (playerId) => {
  try {
    const player = await fetchSinglePlayerById(playerId);

    // create new HTML element to display player details
    const playerDetailsElement = document.createElement('div');
    playerDetailsElement.classList.add('player');
    playerDetailsElement.innerHTML = `
      <h2>${player.name}</h2>
      <p>${player.id}</p>
      <p>${player.breed}</p>
      <p>${player.status}</p>
      <p>${player.teamId}</p>
      <button class="close-button">Close</button>
    `;

    // hide the player list container
    // playerContainer.style.display = 'none';
    
    // put the player details on the page (in the container)
    playerListContainer.appendChild(playerDetailsElement);

    // add event listener to close button
    const closeButton = playerDetailsElement.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
      playerDetailsElement.remove();
      playerListContainer.style.display = 'block'; // show the player list container again
    });
  } catch (error) {
    console.error(error);
  }
};

const renderAllPlayers = async (player) => {
  try {
      player.forEach((player) => {
      const playerElement = document.createElement('div');
      playerElement.classList.add('player');
      playerElement.innerHTML = `
                <h2>${player.name}</h2>
                <p>${player.id}</p>
                <p>${player.breed}</p>
                <p>${player.status}</p>
                <p>${player.teamId}</p>
                <button class="details-button" data-id="${player.id}">See Details</button>
                <button class="delete-button" data-id="${player.id}">Delete</button>
          
            `;
            // see details
      const detailsButton = playerElement.querySelector('.details-button');
      detailsButton.addEventListener('click', async (event) => {
        // get the id
        const playerId = event.target.dataset.id;
        renderSinglePlayerById(playerId);
        playerContainer.appendChild(playerElement);
      });
      
           
          });
    
      
    
       
    } catch (error) {
          console.error(error);
        }
      };
  

      // delete player
      // const deleteButton = playerElement.querySelector('.delete-button');
      // deleteButton.addEventListener('click', async (event) => {
        // get the id
        // const playerId = event.target.dataset.player.id
        // pass the id to deleteParty function
        // deletePlayer(playerId)
        // get it off the page
//         event.target.closest('div.player').remove()
//       });
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };





    
    //add delete player from roster via checkbox.
    // function removeLi() {
    //     'use strict';
    //     var i,
    //         u_l = document.getElementById("items-listed"),
    //         items = u_l.getElementsByTagName("li");
    //     for (i = 0; i < items.length; i += 1) {
    //         if (items[i].firstChild.checked) {
    //             u_l.removeChild(items[i]);
    //             i = i - 1;
    //         }
    //     }
    // }




/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */

//grab value and files from input
const getValuesFromInputs = () =>{
  
  const puppyName = document.querySelector('input.puppy-name').value;
  const puppyBreed = document.querySelector('input.puppy-breed').value;
  const puppyStatus = document.querySelector('input.puppy-status').value;
  const puppyImg = document.querySelector('input.puppy-img').files[0];
  

  // document.querySelector('new-player-form').style.display = 'none';

  return [puppyName, puppyBreed, puppyStatus, puppyImg];

};

  //Convert file objects into URL:
const convertInputValues = () => {
  const [puppyName, puppyBreed, puppyStatus, puppyImg] = getValuesFromInputs();

  const puppyImgURL = URL.createObjectURL(puppyImg);
  

  return [puppyName, puppyBreed, puppyStatus, puppyImgURL];
};
//Grab URL's and supply them to DOM elements:
const addInputToPuppy = () => {

  const [puppyName, puppyBreed, puppyStatus, puppyImgURL]  = convertInputValues();

  document.querySelector('.form').innerHTML = '';
  document.querySelector('.puppy-name').setAttribute`('input', '${player.name}')`;
  document.querySelector('.puppy-breed').setAttribute`('input', '${player.breed}')`;
  document.querySelector('.puppy-status').setAttribute`('input', '${player.status}')`;
  document.querySelector('.puppy-img').setAttribute`('src', '${player.imageUrl}')`;
  document.querySelector('.submit-button').setAttribute('button', newPlayer);

};

      
      


async function init() {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);
  console.log(players);
}

  
init();
