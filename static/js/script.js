let apikey = "b8c3ec61-f7e0-4fc9-b039-f1342ad24cef";
// fetch("https://api.thecatapi.com/v1/breeds", {
//     method: 'GET', 
//     headers:{
//         "Accpet" : "application/json",
//         "x-api-key" : apikey
//     } 
// })
//     .then(res => res.json())
//     .then(data => console.log(data[0]))
    

async function start(){
    const response = await fetch("https://api.thecatapi.com/v1/breeds", {
            method: 'GET', 
            headers:{
                "Accpet" : "application/json",
                "x-api-key" : apikey
            } 
        })
    const data = await response.json();
    console.log(data);
}

start();