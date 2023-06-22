class PlayerCard {
    constructor(name, image){
        this.name = name;
        this.image = image;
    }
    doggo(){
        return `
        ${this.name}
        ${this.image}`;
    }
}

class DoggoDetails extends playerCard {
    constructor(name, image, breed, status, id, cohortId, updatedAt, createdAt, teamId){
           super(name, image);
           this.breed = breed;
           this.status = status;
           this.id = id;
           this.cohortId = cohortId;
           this.updatedAt = updatedAt;
           this.createdAt = createdAt;
           this.teamId = teamId;
        }

         clickDetails(){
              return `Meet player ${this.id}, ${this.name} is a ${this.breed}. From ${this.cohortId}! This player joined ${this.createdAt} and is updated to the roster as of ${this.updatedAt}. ${this.name} will be joining ${this.teamId} for the competeion!`
           }
};



//ROSTER

const roster = async (playerName) => {
    try {
      const response = await fetch(`${APIURL}/${playerName}`);
      const responseJson = await response.json();
      // console.log(responseJson);
      const justName = responseJson.data.player.name;
      return justName;
    } catch (err) {
      console.error(`oh no, trouble fetching names`, err);
    }
    };

//roster
const renderRoster = async (playerName) => {
    try {
      const justName = await fetchRoster(playerName);
  
      // create new HTML element to display player names
      const playersNameElement = document.createElement('div');
      playersNameElement.classList.add('player');
      playersNameElement.innerHTML = `
        <ul>Roster</ul>
        <li>${player.name}</li>
        <button class=remove-button">Remove</button>
        <button class="done-button">Done</button>
      `;
  // put the players names on the page (in the container)
  playerListContainer.appendChild(playersNameElement);
  
  // add event listener to close and remove buttons
  const removeButton = playersNameElement.querySelector('.remove-button');
  removeButton.addEventListener('click', (event) => {
    playersNameElement.remove();
    
          // pass the id to deleteParty function
          const playerName = event.target.dataset.name;
          deletePlayer(playerName);
          playerListContainer.style.display = 'block'; // show the player list container again
    //return to main page after hitting close button
    window.location.href = 'index.html';
  });
  const doneButton = playersNameElement.querySelector('.done-button');
doneButton.addEventListener('click', () => {
  playersNameElement.remove();
  playerListContainer.style.display = 'block'; // show the player list container again
  //return to main page after hitting close button
  window.location.href = 'index.html';
});
} catch (error) {
console.error(error);

}
};
