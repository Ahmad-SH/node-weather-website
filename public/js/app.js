console.log('client side javascript file is loaded');

// fetch('http://puzzle.mead.io/puzzle')
// .then(res=>{
//     return res.json()
// })
// .then(result=>{
//     console.log(result);
// })
////////same as above
// fetch('http://puzzle.mead.io/puzzle')
// .then(res=>{
//      res.json()
//     .then(result=>{
//         console.log(result);
//     })
// })

//##############################


const weatherForm = document.querySelector('form');
const weatherInput= document.querySelector('input');
const messageOne = document.getElementById('messageOne')
const messageTwo = document.getElementById('messageTwo')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
        let weatherInputVal = weatherInput.value
        if(weatherInputVal.length === 0){
            console.log('not valid');
        }
        messageOne.textContent = 'Loading'
        messageTwo.textContent=''
        // use heroku or localhost
    fetch(`/weather?address=${weatherInputVal}`)
    .then(res=>{
        return res.json()
    })
    .then(data =>{
        if(data.err){
           messageOne.textContent= data.err
        }else{
            messageOne.textContent= data.location
            messageTwo.textContent = data.forecast
            console.log(data.forecast);
        }
    })
    
})
