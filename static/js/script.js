let apikey = "b8c3ec61-f7e0-4fc9-b039-f1342ad24cef";
    

async function start(){
    // const response = await fetch("https://api.thecatapi.com/v1/images/search?breed_id=beng", {
    const response = await fetch("https://api.thecatapi.com/v1/breeds", {
            method: 'GET', 
            headers:{
                "Accpet" : "application/json",
                "x-api-key" : apikey
            } 
        })
    const data = await response.json();

    // console.log(data);

    // get breed list
    document.getElementById('breeds').innerHTML = `

        <select onchange="selectBreed(this.value)" class="form-select"  aria-label="Select Breed">

            <option>Choose a breed</option>
            ${data.map(data => {
                return `<option>${data.name}</option>`

            }).join('')}
        </select>
    `


}

async function selectBreed(breed){

    if (breed != "Choose a breed"){
        document.getElementById('cat_breed').innerHTML = breed;
        const response = await fetch(`https://api.thecatapi.com/v1/breeds/search?q=${breed}`, {
            method : "get", 
            headers : {"x-api-key" : apikey}
        })
        const breed_data = await response.json();

        const res = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed_data[0].id}`, {
            method : "get", 
            headers : {"x-api-key" : apikey}
        })
        const image_data = await res.json();


        document.getElementById('image').src = image_data[0].url;
        document.getElementById('description').innerHTML = breed_data[0].description;

        console.log(breed_data[0])
        change_ratings('affection_level', breed_data[0].affection_level)
        change_ratings('adaptability', breed_data[0].adaptability)
        change_ratings('child_friendly', breed_data[0].child_friendly)
        change_ratings('dog_friendly', breed_data[0].dog_friendly)
        change_ratings('energy_level', breed_data[0].energy_level)
        change_ratings('grooming', breed_data[0].grooming)
        change_ratings('health_issues', breed_data[0].health_issues)
        change_ratings('intelligence', breed_data[0].intelligence)
        change_ratings('shedding_level', breed_data[0].shedding_level)
        change_ratings('stranger_friendly', breed_data[0].stranger_friendly)
        change_ratings('social_needs', breed_data[0].social_needs)
        change_ratings('vocalisation', breed_data[0].vocalisation)

        update_temperament(breed_data[0].temperament.split(","));

        document.getElementById('origin').innerHTML =  `<span class="badge badge-info">Origin <i class="flag flag-${breed_data[0].country_code.toLowerCase()}"></i></span>`

    }
}

function change_ratings(quality, rating){
        for (let i = 1; i <= 5 ; i++){
            if (i == 1 && i <= rating){
                document.getElementById(quality).innerHTML = `
                    <span class="fa fa-star checked"></span>
                `
            }
            else if (i <= rating){
                document.getElementById(quality).innerHTML += `
                <span class="fa fa-star checked"></span>
                `
            }
            else {
                document.getElementById(quality).innerHTML += `
                <span class="fa fa-star"></span>
                `
            }
        }
    
}
function update_temperament(data){
        for (let i = 0 ; i < data.length; i++){
            document.getElementById("temperament").innerHTML += `<span class="badge rounded-pill badge-success">${data[i]}</span>`
        }
}

start();