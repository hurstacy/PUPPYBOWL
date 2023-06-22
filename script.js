const playerListContainer = document.getElementById("all-players-container");
const playerContainer = document.getElementById("player-container");

// const playerRosterContainer = document.getElementById('roster-container');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/2302-ACC-PT-WEB-PT-A/players`;

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

//form
const form = document.getElementById("new-player-form");

  const playerName = form.elements["name"];
  const playerBreed = form.elements["breed"];
  const playerStatus = form.elements["status"];
  const playerImageUrl = form.elements["fileElem"];

  //get the element's value:
  let name = playerName.value;
  let breed = playerBreed.value;
  let status = playerStatus.value;
  let imageUrl = playerImageUrl;
  


//show a message with a type of the input
function showMessage(input, message, type) {
  //get the small element and set the message
  const msg = input.parentNode.querySelector("small");
  msg.innerText = message;
  //update the class for the input
  input.className = type ? "sucess" : "error";
  return type;
}
function showError(input, message) {
  return showMessage(input, message, false);
}
function showSuccess(input) {
  return showMessage(input, "", true);
}
function hasValue(input, message) {
  if (input.value.trim() === "") {
    return showError(input, message);
  }
  return showSuccess(input);
}

const NAME_REQUIRED = "Enter player's name";
const BREED_REQUIRED = "Enter puppy's breed";
const STATUS_REQUIRED = "Is the player on bench or field";

form.addEventListener("submit", function (event) {
  //stop form submission
  event.preventDefault();

  //validate the form
  let nameValid = hasValue(form.elements["name"], NAME_REQUIRED);
  let breedValid = hasValue(form.elements["breed"], BREED_REQUIRED);
  let statusValid = hasValue(form.elements["status"], STATUS_REQUIRED);

  //if valid submit the form
  if (nameValid && breedValid && statusValid) {
    alert("Player submitted");
    form.submit();
  }
});



// formObj = {};
// for (let pair of formData.entries()) {
//   formObj[pair[0]] = pair[1];
// }
// console.log(formObj);
/**Add an onclick-listener to the whole form, the callback-function
 will always know what you have clicked and supply your function with
 an event-object as first parameter, `addEventListener` creates this
*/

async function postData() {
  const response = await fetch(
    `${APIURL}/players/${playerObj}`,

    {
      method: "POST",
      mode: "no-cors", // no-cors, *cors, same-origin
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
      body: JSON.stringify({}),
    }
  );
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const postData = event.target.data;
    const data = response.json();
    console.log(data);
    const formattedFormData = new FormData(formData);
    postData(formattedFormData);
  });
}

// const addNewPlayer = async () => {
//   try {
//     const response = await fetch(
//       'https://fsa-puppy-bowl.herokuapp.com/POST/api/2302-ACC-PT-WEB-PT-A/players',
//        {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body:JSON.stringify({

//                 })
//       }
//     )
//   }
// }

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
    const playerDetailsElement = document.createElement("div");
    playerDetailsElement.classList.add("player");
    playerDetailsElement.innerHTML = `
      <h2>Name: ${player.name}</h2>
      <p>Id: ${player.id}</p>
      <p>Breed: ${player.breed}</p>
      <p>Status: ${player.status}</p>
      <p>Team Id: ${player.teamId}</p>
      <img src="${player.imageUrl}" alt="Player Image"> 
      <button class="close-button">Close</button>
    `;

    // hide the player list container
    playerContainer.style.display = "none";

    // put the player details on the page (in the container)
    playerContainer.appendChild(playerDetailsElement);

    // add event listener to close button
    const closeButton = playerDetailsElement.querySelector(".close-button");
    closeButton.addEventListener("click", () => {
      playerDetailsElement.remove();
      playerListContainer.style.display = "block"; // show the player list container again
      //return to main page after hitting close button
      window.location.href = "index.html";
    });
  } catch (error) {
    console.error(error);
  }
};

const renderAllPlayers = async (players) => {
  try {
    playerListContainer.innerHTML = "";
    players.forEach((player) => {
      const playerElement = document.createElement("div");
      playerElement.classList.add("player");
      playerElement.innerHTML = `
                <h2>${player.name}</h2>
                
                <img src="${player.imageUrl}" alt="Player Image">
                <button class="details-button" data-id="${player.id}">See Details</button>
                <button class="delete-button" data-id="${player.id}">Delete</button>
            `;

      playerListContainer.appendChild(playerElement);

      // see details
      const detailsButton = playerElement.querySelector(".details-button");
      detailsButton.addEventListener("click", async (event) => {
        // get the id
        const playerId = event.target.dataset.id;
        renderSinglePlayerById(playerId);
      });

      // delete player
      const deleteButton = playerElement.querySelector(".delete-button");
      deleteButton.addEventListener("click", async (event) => {
        // get the id
        const playerId = event.target.dataset.id;
        // pass the id to deleteParty function
        deletePlayer(playerId);
        // get it off the page
        event.target.closest("div.player").remove();
      });
    });
  } catch (error) {
    console.error(error);
  }
};

// Render the form for adding a new player

/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */

const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);
  // submit()
  // renderFormElem()
  console.log(players);
};

init();
