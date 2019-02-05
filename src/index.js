document.addEventListener("DOMContentLoaded", () => {

const dogBar = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("#dog-info")
const filterBar = document.querySelector("#filter-div")
//console.log(dogInfo)

let filteredDogs = []
//let badDogs = []
let allDogs = []

//xxfetch request to "get" all dogs to the dog-bar
//xxadd HTML with the dogs names in a span tag

//add a listener to the dog bar for a click
//need to set up html place, when clicked the pups infor pic, image, button that says good/bad Dogs.   that is clickables
//when button clicked, toggle from good or bad dog
// filter for good or bad or all

fetch ("http://localhost:3000/pups")
.then(response => response.json())
.then(dogs => {
  let dogsNames = dogs.map(function(dog){
    allDogs = dogs
    return `
    <span data-id=${dog.id}>${dog.name}</span>
    `
  })//end map
  dogBar.innerHTML = dogsNames.join('')
})//end then

dogBar.addEventListener("click", (e) => {
  //console.log(e.target.dataset.id)
  //currDogId = parseInt(e.target.dataset.id)
  //console.log(currDogId)
  let foundDog = allDogs.find(dog => {
    return parseInt(e.target.dataset.id) === dog.id
  })
    let goodOrBadDog  =  function() { return (foundDog.isGoodDog ? "Good Dog!" : "Bad Dog!")}

    dogInfo.innerHTML=`<img src="${foundDog.image}">
    <h2>${foundDog.name}</h2>
    <button data-id=${foundDog.id}>${goodOrBadDog()}</button>`
//console.log(foundDog)
})//end event listener

dogInfo.addEventListener('click', e => {
  //console.log(e.target)
  let foundDog = allDogs.find(dog => {
    return parseInt(e.target.dataset.id) === dog.id
  })
  foundDog.isGoodDog = !foundDog.isGoodDog
  let goodOrBadDog  =  function() { return (foundDog.isGoodDog ? "Good Dog!" : "Bad Dog!")}

  dogInfo.innerHTML=`<img src="${foundDog.image}">
  <h2>${foundDog.name}</h2>
  <button data-id=${foundDog.id}>${goodOrBadDog()}</button>`

  fetch(`http://localhost:3000/pups/${foundDog.id}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify({
          isGoodDog: foundDog.isGoodDog
        })
//  console.log(foundD
})//end fetch
})//end listener

filterBar.addEventListener('click', (e)=> {
  //console.log(e.target);

    //if/else initially changes button text ON/OFF
    if (e.target.innerText === "Filter good dogs: OFF") {
      e.target.innerText = "Filter good dogs: ON"

      //create variable to hold our filtered dog array
      let filteredDogs = allDogs.filter(dog => {
              //this is the condition that we are filterin on
        return dog.isGoodDog === true
      })

      //create variable to hold our iteration over filtered data
      //to get the info we need to be able to add to filtered dogBar
      let goodDogs = filteredDogs.map( dog => {
        return `<span data-id="${dog.id}">${dog.name}</span>`
      }).join("")

      dogBar.innerHTML = goodDogs
    }
    else {
      //this is where we toggle the button text
      e.target.innerText = "Filter good dogs: OFF"

      //reuse code to put all dogs on the filted dogBar
      let dogs = allDogs.map( dog => {
        return `<span data-id="${dog.id}">${dog.name}</span>`
      }).join("")

      dogBar.innerHTML = dogs
    }

  })

}); // End of DOMContentLoaded
