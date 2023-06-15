class playerCard {
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

class doggoDetails extends playerCard {
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
