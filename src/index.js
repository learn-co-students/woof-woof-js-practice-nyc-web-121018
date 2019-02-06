

document.addEventListener("DOMContentLoaded", () => {
  let puppers = []



    const dogBar = document.getElementById("dog-bar");

    fetch("http://localhost:3000/pups")
     .then(r => r.json())
     .then(data => {
       puppers = data

       return puppers.map(pup => {
         dogBar.innerHTML += `<span data-id=${pup.id} class="span_class">${pup.name}</span>`
       })

    })

    const dogInfo = document.getElementById("dog-info");
      dogInfo.addEventListener('click', e => {
        //console.log(e.target)
        if (e.target.id === "good_btn"){
          if (e.target.innerText === "false") {
             e.target.innerText = "true"

          }else{
            e.target.innerText = "false"

          }
          let found_pup = puppers.find(pup => {
            return pup.id == e.target.dataset.id
          })
          console.log(found_pup);
          
         fetch(`http://localhost:3000/pups/${e.target.dataset.id}`, {
           method: "PATCH",
           headers: {
             "Content-Type": "application/json",
             "Accept": "application/json"
             },
           body: JSON.stringify({
             isGoodDog: !found_pup.isGoodDog


           })

         })

       }// if delegation

     })// end of listener
     const spanID = document.getElementsByClassName("span_class");
       dogBar.addEventListener('click', e => {
         //console.log(e.target)

          return puppers.find(pup => {
          if (pup.id == e.target.dataset.id)
            dogInfo.innerHTML =
                  `<img src=${pup.image}>
                   <h2>${pup.name}</h2>
                   <button data-id=${pup.id} id="good_btn">${pup.isGoodDog}</button>`

           })
       })//end of dog bar

      })//if (e.target.id === "good_btn")











        // end of  DOM







      //})
    //})




  //})
