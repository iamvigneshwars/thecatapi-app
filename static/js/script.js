const apikey = "b8c3ec61-f7e0-4fc9-b039-f1342ad24cef";
    

async function start(){
    try{
        const response = await fetch("https://api.thecatapi.com/v1/breeds", {
                method: 'GET', 
                headers:{
                    "Accpet" : "application/json",
                    "x-api-key" : apikey
                } 
            })
        const data = await response.json();
        // Initial page.
        selectBreed(data[1].name);

        // Get breed list and pass the selected breed to the selectbreed function.
        document.getElementById('breeds').innerHTML = `

                <img src="static/images/cat2.png" class="rounded mx-auto" width="50" alt="Wild Landscape" />
            <select onchange="selectBreed(this.value)" class="form-select"  aria-label="Select Breed">

                <option>Choose a breed</option>
                ${data.map(data => {
                    return `<option>${data.name}</option>`

                }).join('')}
            </select>
        `
    } catch(error){
        console.error("Error Loading the webpage!")
    }


}

async function selectBreed(breed){

    if (breed != "Choose a breed"){
        document.getElementById('cat_breed').innerHTML = breed;
        // Fetch breed data
        const response = await fetch(`https://api.thecatapi.com/v1/breeds/search?q=${breed}`, {
            method : "get", 
            headers : {"x-api-key" : apikey}
        })
        const breed_data = await response.json();

        // Fetch image data
        const res = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed_data[0].id}`, {
            method : "get", 
            headers : {"x-api-key" : apikey}
        })
        const image_data = await res.json();


        // Update the image and description with selected breed.
        document.getElementById('image').src = image_data[0].url;
        document.getElementById('description').innerHTML = breed_data[0].description;

        // Update facts with selected breed
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

        document.getElementById('origin').innerHTML =  `<span class="badge badge-info">Origin <i class="flag flag-${breed_data[0].country_code.toLowerCase()}"></i></span>`
        document.getElementById('life').innerHTML = `<span class="badge badge-info position-relative">Life Span : ${breed_data[0].life_span}</span>`
        document.getElementById('weight').innerHTML = `<span class="badge badge-info position-relative">Metric Weight : ${breed_data[0].weight.metric}</span>`
        document.getElementById('wiki_url').href = breed_data[0].wikipedia_url

        // Update the temperaments with selected breed.
        update_temperament(breed_data[0].temperament.split(","));

        if (breed_data[0].experimental == 1){
            document.getElementById('dis_ad').innerHTML = `<span class="badge rounded-pill badge-danger">Experimental</span>`
        }

        if (breed_data[0].hairless == 1){
            document.getElementById('dis_ad').innerHTML = `<span class="badge rounded-pill badge-danger">Hairless</span>`
        }

        if (breed_data[0].hypoallergenic == 1){
            document.getElementById('dis_ad').innerHTML = `<span class="badge rounded-pill badge-danger">Hypoallergenic</span>`;
        }

        if (breed_data[0].lap == 1){
            document.getElementById('dis_ad').innerHTML = `<span class="badge rounded-pill badge-danger">Lap</span>`
        }

        if (breed_data[0].natural == 1){
            document.getElementById('dis_ad').innerHTML = `<span class="badge rounded-pill badge-danger">Natural</span>`
        }

        if (breed_data[0].rare == 1){
            document.getElementById('dis_ad').innerHTML = `<span class="badge rounded-pill badge-danger">Rare</span>`
        }

        if (breed_data[0].rex == 1){
            document.getElementById('dis_ad').innerHTML = `<span class="badge rounded-pill badge-danger">Rex</span>`
        }

        if (breed_data[0].short_legs == 1){
            document.getElementById('dis_ad').innerHTML = `<span class="badge rounded-pill badge-danger">Short Legs</span>`
        }

        if (breed_data[0].supressed_tail == 1){
            document.getElementById('dis_ad').innerHTML = `<span class="badge rounded-pill badge-danger">Supressed Tail</span>`
        }


    }
}

// This function updates the star rating of the selected breed.
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
            if (i == 0){
                document.getElementById("temperament").innerHTML = `<span class="badge rounded-pill badge-success">${data[i]}</span>`
            } 
            else {
                document.getElementById("temperament").innerHTML += `<span class="badge rounded-pill badge-success">${data[i]}</span>`
            }
        }
}

start();