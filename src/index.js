document.addEventListener('DOMContentLoaded', () => {

//***************** VARIABLES *****************//
  let dogeBar = document.getElementById('dog-bar')
  let doggosContainer = document.getElementById('dog-info')
  let goodboiFilter = document.getElementById('filter-div')
  let doggos = []
  let currentPuppo
//***************** VARIABLES *****************//

//***************** FETCHES *****************//

  fetch('http://localhost:3000/pups')
  .then(r => r.json())
  .then(dogs => {
    // console.log(makeSpans(dogs));
    doggos = dogs
    // console.log(doggos);
    dogeBar.innerHTML += makeSpans(doggos).join('')
  }) // end of 2nd .then

//***************** FETCHES *****************//


//***************** EVENT LISTENERS *****************//

dogeBar.addEventListener('click', (e) => {
  // console.log(e.target.tagName);
  if(e.target.tagName === 'SPAN'){
    // console.log(e.target.id);
    const foundDog = doggos.find((dogObj) => {
      return dogObj.id === parseInt(e.target.id)
    })
    doggosContainer.innerHTML = makeDog(foundDog)
  } // end of if statement
}) // end of dogebar click listener


doggosContainer.addEventListener('click', (e) => {
  currentPuppo = doggos.find((dog) => {
    return dog.id === parseInt(e.target.id)
  })

  if(e.target.tagName === "BUTTON"){
    // console.log(e.target);
    if (e.target.innerHTML === "Good Dog!"){
      e.target.innerHTML = "Bad Dog!"
      currentPuppo.isGoodDog = false
    }//end of nested if statement
    else {
      e.target.innerHTML = "Good Dog!"
      currentPuppo.isGoodDog = true
    } // end of else statement -> updating the DOM optimistically

    fetch(`http://localhost:3000/pups/${currentPuppo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "isGoodDog": currentPuppo.isGoodDog
      })
    }) // end of fetch
  } //end of button if
}) // end of doggos container listener

goodboiFilter.addEventListener('click', (e) =>{
  if(e.target.tagName === "BUTTON"){
    if (e.target.innerText === 'Filter good dogs: OFF'){
      e.target.innerText = 'Filter good dogs: ON'
      const filteredPuppacinos = doggos.filter(dog => dog.isGoodDog === true)
      dogeBar.innerHTML = makeSpans(filteredPuppacinos).join('')
    } // end of toggle text if
    else {
      e.target.innerText = 'Filter good dogs: OFF'
      dogeBar.innerHTML = makeSpans(doggos).join('')
    } //end of else stmt
  }//end of button if stmt
}) //end of filter listener

//***************** EVENT LISTENERS *****************//

}) // end of DOM content loaded

//***************** PURE *****************//

const makeSpans = (dogs) => {
  return dogs.map((dog) => `<span id="${dog.id}">${dog.name}</span>`
)}

const isGood = (dog) => {return (dog.isGoodDog ? `<button id="${dog.id}">Good Dog!</button>` : `<button id="${dog.id}">Bad Dog!</button>`)}
// console.log(isGood);

const makeDog = (dog) => {
  return `
  <img src="${dog.image}">
  <h2>${dog.name}</h2>
  ${isGood(dog)}
  `
}



//***************** PURE *****************//
