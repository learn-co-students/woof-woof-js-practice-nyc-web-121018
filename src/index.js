let allPups = []
document.addEventListener("DOMContentLoaded", e => {
  // console.log("DOM fully loaded and parsed");
  const dogBar = document.querySelector('#dog-bar')
  const dogInfo = document.querySelector('#dog-info')
  const goodDogFilter = document.querySelector('#good-dog-filter')
  // console.log(dogBar);
  function showPups(pups) {
    dogBar.innerHTML = pups.map(addDogBarHTML).join("")
  }
  fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(data => {
      allPups = data
      showPups(allPups)
    })
  dogBar.addEventListener('click', e => {
    const currentId = e.target.dataset.id
    const pupObj = allPups.find(pup => pup.id === parseInt(currentId))
    dogInfo.innerHTML = addDogInfoHTML(pupObj)
  })
  goodDogFilter.addEventListener('click', e => {
    if (e.target.innerHTML === 'Filter good dogs: OFF'){
      e.target.innerHTML = 'Filter good dogs: ON'
      const filteredPups = allPups.filter(pup => {
        return pup.isGoodDog === true
      })
      showPups(filteredPups)
    } else {
      e.target.innerHTML = 'Filter good dogs: OFF'
      showPups(allPups)
    }
  })
  dogInfo.addEventListener('click', e => {
    if (e.target.id === 'button'){
      const currentId = e.target.dataset.id
      const pupObj = allPups.find(pup => pup.id === parseInt(currentId))
      if (pupObj.isGoodDog === true){
        pupObj.isGoodDog = false
        fetch(`http://localhost:3000/pups/${currentId}`, {
          method:"PATCH",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              isGoodDog: false,
            })
        })//end ftech
        dogInfo.innerHTML = addDogInfoHTML(pupObj)
      }else{
        pupObj.isGoodDog = true
        dogInfo.innerHTML = addDogInfoHTML(pupObj)
        fetch(`http://localhost:3000/pups/${currentId}`, {
          method:"PATCH",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              isGoodDog: true,
            })
        })//end ftech
      }
    }
  })//end of dogInfo EventListener
})

function addDogBarHTML(pup) {
  return`<span data-id=${pup.id}>${pup.name}</span>`
}
function addDogInfoHTML(pup) {
  goodOrBad = ''
  if (pup.isGoodDog === true){
    goodOrBad = 'Good Dog!'
  }else{
    goodOrBad = 'Bad Dog!'
  }
  return` <img src=${pup.image}>
          <h2>${pup.name}</h2>
          <button id='button' data-id=${pup.id}>${goodOrBad}</button>`
}
