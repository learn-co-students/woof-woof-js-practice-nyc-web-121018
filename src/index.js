document.addEventListener("DOMContentLoaded", e=>{
  let dogBar = document.getElementById("dog-bar")
  let url = "http://localhost:3000/pups"
  let allDogs = []
  let dogStatus = ""
  let dogContainer = document.getElementById("dog-summary-container")
  let statusButton= document.querySelector("#status")


  fetch(url)
  .then(r=> r.json())
  .then(dogs =>{
    console.log(dogs)
    allDogs = dogs
    allDogs.map(dog=>{
      dogBar.innerHTML += `
        <span data-id="${dog.id}" class="span-tag">${dog.name}</span>`
    })
  })

  document.addEventListener("click", e=>{
    if (e.target.id === "status") {
      if(e.target.innerHTML === "Good Dog!"){
        e.target.innerHTML = "Bad Dog!"
      }
      else{
        e.target.innerHTML = "Good Dog!"
      }
    }
  })

  dogBar.addEventListener("click", e=>{
    if(e.target.className === "span-tag"){
      allDogs.find(function(dog){
      if(dog.id === parseInt(e.target.dataset.id)){
        if(dog.isGoodDog == true){
          dogStatus = "Good Dog!"
        } else {
          dogStatus= "Bad Dog!";
        }
       dogContainer.innerHTML= `
        <h1>DOGGO:</h1>
        <div id="dog-info">
        <img src=${dog.image}>
        <h2>${dog.name}</h2>
        <button id="status">${dogStatus}</button>
        </div>
        `
        }
      })
    }
  })






})
