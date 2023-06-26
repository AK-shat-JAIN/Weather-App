// Declaring variables
const locationContainer = document.getElementById('input');
const errorContainer = document.getElementById('err');
const submitBtn = document.getElementById('submit');

const valid = document.getElementById('resultcard');
const place = document.getElementById('loc');
const date = document.getElementById('date');
const resultContainer = document.getElementById('res');
const imageContainer = document.getElementById('img');

const tempContainer = document.getElementById('temp');
const windMph = document.getElementById('windmph');
const windKph = document.getElementById('windkph');
const precipMm = document.getElementById('precipmm');
const precipIn = document.getElementById('precipin');
const humidity = document.getElementById('humidity');


// Function to fetch Data
async function getWeather(){
    if(locationContainer.value==""){
        valid.style.display = "none";
        errorContainer.innerHTML="Please Enter Location Before Search";
        return;
    }
    try {
        let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=0b7781455a2d4c58b0a230926232406&q=${locationContainer.value}`);
        if(response.status==400){
            throw new Error("Location Not Found");
        }
        else if(response.status==401 || response.status==403){
            throw new Error("Data Can Not Fetch");
        }
        else if(response.status==404){
            throw new Error("Page Not Found");
        }
        else if(response.status==500){
            throw new Error("Server Error");
        }
        else if(!response.ok){
            throw new Error("Internet Connection Break");
        }
        
        let data = await response.json();
        displayResult(data);
    } 
    catch (error) {
        valid.style.display = "none";
        errorContainer.innerHTML = error;
    }
}
submitBtn.addEventListener('click',getWeather);

// Function to Display Data if successfully Fetched
function displayResult(data){
    errorContainer.innerHTML="";
    valid.style.display = "flex";

    place.innerHTML = `${data.location.name}, ${data.location.region}, ${data.location.country}`;
    date.innerHTML = `${data.location.localtime}`;
    resultContainer.innerHTML = `${data.current.condition.text}`;
    imageContainer.src = `${data.current.condition.icon}`;
    tempContainer.innerHTML = `${data.current.temp_c}&deg;C ${data.current.temp_f}&deg;F`;
    windMph.innerHTML = `${data.current.wind_mph}mph`;
    windKph.innerHTML = `${data.current.wind_kph}kph`;
    precipMm.innerHTML = `${data.current.precip_mm}mm`;
    precipIn.innerHTML = `${data.current.precip_in}in`;
    humidity.innerHTML = `${data.current.humidity}%`;
}