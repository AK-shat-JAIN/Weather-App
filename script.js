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



async function getWeather(){
    if(locationContainer.value==""){
        valid.style.display = "none";
        errorContainer.innerHTML="Please Enter Location Before Search";
        return;
    }
    try {
        let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=0b7781455a2d4c58b0a230926232406&q=${locationContainer.value}`);
        let data = await response.json();

        console.log(data)
        if(Object.entries(data).length==1){
            throw ("Not found");
        }
        else{
            displayResult(data);
        }
    } 
    catch (error) {
        valid.style.display = "none";
        errorContainer.innerHTML = "Location Not Found";
    }
}
submitBtn.addEventListener('click',getWeather);


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