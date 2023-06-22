//form attempt 1 - fail
// const form = document.getElementById('new-player-form');
/**Add an onclick-listener to the whole form, the callback-function
 will always know what you have clicked and supply your function with
 an event-object as first parameter, `addEventListener` creates this
*/
// form.addEventListener('click', function(event){
//   event.preventDefault();
//   const formattedFormData = {
//     name: this.name.value,
//     breed: this.breed.value,
//     status: this.status.value,
//     imageUrl: this.imageUrl.value,
//     teamId: this.teamId.value
//     }
//     postData(formattedFormData);
//   });
  // const formattedFormData = new FormData(form);
  // postData(formattedFormData);
// });
//  async function postData(...args: [formattedFormData: any]) {
//     const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2302-ACC-PT-WEB-PT-A/players', {
//         method: 'POST',
//         body: formattedFormData
//         // body: JSON.stringify(formattedFormData)
//     }
//     );
//     const data = await response.json();
//     console.log(data);

// }


// form attempt 3 -
//HTML code: 
//    <form onsubmit="return sendData()" id="demo">
//   <input type="text" name="name" value="Jon Doe" required>
//   <input type="email" name="email" value="jon@doe.com" required/>
//   <input type="submit" value="Go!">
// </form>


//JS code:

//function sendData () {

  // (A) GET FORM DATA-comment

//   var data = new FormData(document.getElementById("demo"));

  // data.append("KEY", "VALUE");
 
  // (B) INIT FETCH POST -comment

//   fetch("2-dummy.php", {
//     method: "POST",
//     body: data
//   })
 
  // (C) RETURN SERVER RESPONSE AS TEXT -comment

//   .then(res => {
//     if (res.status != 200) { throw new Error("Bad Server Response"); }
//     return res.text();
//   })
 
  // (D) SERVER RESPONSE -comment

//   .then(res => console.log(res))
 
  // (E) HANDLE ERRORS - OPTIONAL
//   .catch(err => console.error(err));
 
  // (F) PREVENT FORM SUBMIT
//   return false;
// }



//form 4:
// const form = document.createElement("form");
// const input = document.createElement("input");
// form.action = action= "https://fsa-puppy-bowl.herokuapp.com/api/2302-ACC-PT-WEB-PT-A/players";
// form.method = "POST"

// form.addEventListener('click', function(event){
//     event.preventDefault();
//     const formattedFormData = new FormData(form);
//     postData(formattedFormData);
  
//    const postData = async (formattedFormData) => {
//     try {
//     const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2302-ACC-PT-WEB-PT-A/players', {
//      method: 'POST',
//mode: 'no-cors', // no-cors, *cors, same-origin
// credentials: 'same-origin', // include, *same-origin, omit
// headers: {
//   'Content-Type': 'application/json'
// },
// redirect: 'follow', // manual, *follow, error
// referrerPolicy: 'no-referrer',
// //  body: formattedFormData 
// body: JSON.stringify(postData)
// }
// );
// const data = await response.json();
// console.log(data);
// } catch (err) {
// console.error(err);
// }
// };