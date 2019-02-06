document.addEventListener('DOMContentLoaded', () => {

  const dogBar = document.querySelector('#dog-bar')
  const dogContainer = document.querySelector('#dog-summary-container')
  const dogInfo = document.querySelector('#dog-info')
  const goodDogFilter = document.querySelector('#good-dog-filter')
  let allDogs = []
  let dogToggle = true

  fetchDogs();

  goodDogFilter.addEventListener('click', e => {
    if (e.target.innerText === "Filter good dogs: OFF") {
      e.target.innerText = "Filter good dogs: ON";
      let goodDogs = allDogs.filter(dog => dog.isGoodDog === true)
      dogBarRenderAllDogs(goodDogs)

    } else {
      e.target.innerText = "Filter good dogs: OFF"
      dogBarRenderAllDogs(allDogs)
    }

  })

  dogBar.addEventListener('click', (e) => {
    if (e.target.tagName === 'SPAN') {
      let currentDog = allDogs.find(dog => dog.id == e.target.dataset.id)
      dogInfoRenderDog(currentDog)
    }
  })

  dogInfo.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      let currentDog = allDogs.find(dog => dog.id == e.target.dataset.id)
      dogToggle = !dogToggle

      dogToggle ? currentDog.isGoodDog = true : currentDog.isGoodDog = false
      //
      // if (goodDogFilter.innerText === "Filter good dogs: ON") {
      //   let goodDogs = allDogs.filter(dog => dog.isGoodDog === true)
      //   dogBarRenderAllDogs(goodDogs)
      // }

      fetch(`http://localhost:3000/pups/${currentDog.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          isGoodDog: currentDog.isGoodDog
        })
      })
      .then(r => r.json())
      .then(updatedDog => {
        let index = allDogs.findIndex(dog => dog.id === updatedDog.id)
        allDogs[index] = updatedDog
        dogInfoRenderDog(currentDog)
        let goodDogs = allDogs.filter(dog => dog.isGoodDog === true)
        dogBarRenderAllDogs(goodDogs)
      })

    }
  })

  function dogInfoRenderDog(dog) {
    return dogInfo.innerHTML = `
    <img src=${dog.image}>
    <h2>${dog.name}</h2>
    <button data-id=${dog.id}>${dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!'}</button>`
  }

  function fetchDogs() {
    fetch('http://localhost:3000/pups')
      .then(r => r.json())
      .then(dogs => {
        allDogs = dogs
        dogBarRenderAllDogs(allDogs)
      })
  }

  function dogBarRenderDog(dog) {
    return `
    <span data-id=${dog.id}>${dog.name}</span>`
  }

  function dogBarRenderAllDogs(dogs) {
    return dogBar.innerHTML = dogs.map(dogBarRenderDog).join('')
  }

}) // end of DOMContentLoaded
