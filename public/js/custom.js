
const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const msgOne = document.querySelector('.message-one');
const msgTwo = document.querySelector('.message-two');
// fetch('http://puzzle.mead.io/puzzle')
// .then(response => response.json())
// .then((data) => {
//     console.log(data)
//     })

function fetchApi(location){
    msgTwo.innerHTML= 'Loading...';
    fetch(`/weather?address=${location}`).then((response) => {
        
        response.json().then((data) => {
        
            if(data.error){
                msgTwo.innerHTML=' ';
                msgOne.innerHTML= data.error;
            }
            else{
                msgOne.innerHTML=' ';
                
                msgTwo.innerHTML = data.location;
                searchInput.value ='';
            }
            
        })
    })
}


weatherForm.addEventListener('submit',function(e){
    e.preventDefault();
    const location = searchInput.value;
    fetchApi(location)
})