// [1] On the page, there is a div with the id of "dog-bar". On page load, make a fetch to get all of the pup objects. When you have this information, you'll need to add a span with the pup's name to the dog bar (ex: <span>Mr. Bonkers</span>).




document.addEventListener("DOMContentLoaded", ()=>{
const dogBar = document.querySelector("#dog-bar")

let allDogs = []


  fetch('http://localhost:3050/pups')
    .then ( response => response.json())
    .then ( pups =>{
      allDogs = pups
      // console.log(allDogs)
      let dogsHTML = pups.map(function (pup){

        // console.log(allDogs)
        return `
        <span class="onepup" data-id=${pup.id}> ${pup.name} </span>
        `
      })
      dogBar.innerHTML =
      dogsHTML.join("")
    })

let dogContainer = document.querySelector('#dog-info')


dogBar.addEventListener('click', (e) => {

  if (e.target.className === 'onepup') {
     let foundDog = allDogs.find( (pup) => {
      return pup.id == e.target.dataset.id

    })
    console.log(foundDog.id)

      fetch('http://localhost:3050/pups/' + `${foundDog.id}`)
        .then ( response => response.json())
        .then ( foundDog =>{
          dogContainer.innerHTML =
          // console.log(allDogs)
          // let dogsHTML = pups.map(function (pup){
            `
            <img data-id=${foundDog.id} src="${foundDog.image}">
             <h2 data-id=${foundDog.id}>${foundDog.name}</h2>
             <button id= "isGoodDog" data-id=${foundDog.id}>${foundDog.isGoodDog}</button>
            `
          })
          // dogsHTML.join("")
      }
  }) // event listener

dogContainer.addEventListener( 'click', (e)  => {
      if (e.target.id === "isGoodDog"){
        const button = e.target.id
      const foundDog = allDogs.find( function (pup) {
    return pup.id === parseInt(e.target.dataset.id)
  })



  // console.log(foundDog.isGoodDog)
  if (foundDog.isGoodDog === true) {
  			foundDog.isGoodDog = false
        e.target.innerHTML = "false"
  		} else {
  			foundDog.isGoodDog = true
        e.target.innerHTML = "true"
  		}
        let status = foundDog.isGoodDog
        console.log(status)

}

fetch('http://localhost:3050/pups/' + `${e.target.dataset.id}`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
    body:
    JSON.stringify({
      isGoodDog: status
    })


})

}) // end update button event listener



      // update boolean to true or false
      // const giftData = allGifts.find((gift) => {
    //   return gift.id == e.target.dataset.id
    // const giftData = allGifts.find((gift) => {
    // return gift.id == e.target.dataset.id




})// end dom
