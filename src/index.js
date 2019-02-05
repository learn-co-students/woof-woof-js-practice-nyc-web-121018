// need a local variable to hold all dogs
let allPuppies = []
// url is just our "database" -- set as string with variable to facilitate use
let url = `http://localhost:3000/pups`

//DOMContentLoaded listener acts as buffer so content must load before our container
// listeners can begin to work
document.addEventListener("DOMContentLoaded", function(event) {
  //indiviual consts for each container we will want to access
  const dogBar = document.getElementById('dog-bar')
  const dogInfo = document.getElementById('dog-info')
  const filterBar = document.getElementById('filter-div')

  // get all data from our db
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // this is were we set our local variable equal to the data we get back from our fetch
      allPuppies = data

      //Iterating over all data to get the info we need to be able to add to dogBar
      let dogs = allPuppies.map( puppy => {
          //added a data-id to identify the particular dog
        return `<span data-id="${puppy.id}">${puppy.name}</span>`
      }).join("")

      //actually changing/updating the DOM
      dogBar.innerHTML = dogs
    })

  //setting listener for a click in the dogBar
  dogBar.addEventListener('click', e => {
    //find indiviual dog that was click, so that we can access their information to
    //paint to the DOM in the next steps
    let foundPuppy = allPuppies.find(puppy => {
      return parseInt(e.target.dataset.id) === puppy.id
    })

    //created a function to hold a ternary operator to change button innerText to show the
    // behavior state of the foundPuppy
    let goodOrBadDog = function() { return (foundPuppy.isGoodDog ? "Good Dog!" : "Bad Dog!")}

    // Paint show indiviual foundPuppy info to the DOM
    dogInfo.innerHTML = `<img src=${foundPuppy.image}>
                        <h2>${foundPuppy.name}</h2>
                        <button data-id=${foundPuppy.id}>${goodOrBadDog()}</button>`
                        //^^ added data-id here again to identify foundPuppy and invoked our function to alter
                        //button text
  })

  //added listener to dogInfo to listen for click
  dogInfo.addEventListener('click', e => {
    //found dog again to be able to edit that dog's attributes
    let foundPuppy = allPuppies.find(puppy => {
      return parseInt(e.target.dataset.id) === puppy.id
    })

    //actually change foundPuppy's boolean value
    foundPuppy.isGoodDog = !foundPuppy.isGoodDog

    //updating DOM again with new button text...
    let goodOrBadDog = function() { return (foundPuppy.isGoodDog ? "Good Dog!" : "Bad Dog!")}
    dogInfo.innerHTML = `<img src=${foundPuppy.image}>
                        <h2>${foundPuppy.name}</h2>
                        <button data-id=${foundPuppy.id}>${goodOrBadDog()}</button>`

    //actually updating the DB by going to our RESTful route with exact dog id
    fetch(url + `/${foundPuppy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        isGoodDog: foundPuppy.isGoodDog
      })
    })
  })

  //listener for click on our filterBar
  filterBar.addEventListener("click", e => {

    //if/else initially changes button text ON/OFF
    if (e.target.innerText === "Filter good dogs: OFF") {
      e.target.innerText = "Filter good dogs: ON"

      //create variable to hold our filtered dog array
      let filteredDogs = allPuppies.filter(puppy => {
              //this is the condition that we are filterin on
        return puppy.isGoodDog === true
      })

      //create variable to hold our iteration over filtered data
      //to get the info we need to be able to add to filtered dogBar
      let goodDogs = filteredDogs.map( puppy => {
        return `<span data-id="${puppy.id}">${puppy.name}</span>`
      }).join("")

      dogBar.innerHTML = goodDogs
    }
    else {
      //this is where we toggle the button text
      e.target.innerText = "Filter good dogs: OFF"

      //reuse code to put all dogs on the filted dogBar 
      let dogs = allPuppies.map( puppy => {
        return `<span data-id="${puppy.id}">${puppy.name}</span>`
      }).join("")

      dogBar.innerHTML = dogs
    }

  })

}); // End of DOMContentLoaded
