const cityName = document.getElementById("cityName");
const submitBtn = document.getElementById("submitBtn");
const city_name = document.getElementById("city_name");
const tempStatus = document.getElementById("tempStatus");
const currDate = document.getElementById("currDate");

const d = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// console.log(d.getDay());
currDate.innerHTML = `${d.getDate()} ${months[d.getMonth()]}, ${d.getFullYear()}`;

var tempMoodStatus = "";

const getInfo = async(event) => {
    event.preventDefault();
    // console.log("Hello Durga!");
    let cityVal = cityName.value;
    if (cityVal == "") {
        city_name.innerText = `Pls write the name before search`;
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&APPID=0a2dfc87e6b0d532bb0db9787fd25723`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            // console.log(arrData[0]);
            const tempMood = arrData[0].weather[0].main;
            // console.log(tempMood);
            if (tempMood == "Clear") {
                tempMoodStatus = "<i class='fas  fa-sun' style='color: yellow;'></i>";
              } else if (tempMood == "Clouds") {
                tempMoodStatus = "<i class='fas  fa-cloud' style='color: #555555;'></i>";
              } else if (tempMood == "Rain") {
                tempMoodStatus = "<i class='fas  fa-cloud-rain' style='color: #008CBA;'></i>";
              } else {
                tempMoodStatus = "<i class='fas  fa-cloud' style='color:#555555;'></i>";
              }
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            let str = `<b>The ${cityVal} Temprature is <span class="text_color">${arrData[0].main.temp}&degC</span> &nbsp;&nbsp;&nbsp;${tempMoodStatus}</b>`;
            tempStatus.innerHTML = str;
        } catch{
            city_name.innerText = `Pls enter the city name properly`;
        }
    }
}
// https://api.openweathermap.org/data/2.5/weather?q=Azamgarh&units=metric&APPID=0a2dfc87e6b0d532bb0db9787fd25723
submitBtn.addEventListener("click", getInfo);