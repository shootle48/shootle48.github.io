import weatherTranslations from "./weatherTranslated.js";

const apiKey = "738defc32380c9170fbe90fd2f4cf64c";

document.getElementById("searchButton").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === 200) {
        const weatherData = data;
        const temp = Math.round(weatherData.main.temp);
        const humidity = weatherData.main.humidity;
        const windSpeed = weatherData.wind.speed;
        const iconCode = weatherData.weather[0].icon;
        const description = weatherData.weather[0].description;

        const translatedDescription =
          weatherTranslations[description] || description;

        document.getElementById("weatherResult").innerHTML = `
        <p class='text-3xl text-center font-semibold'>${temp}℃</p>
        <img src="http://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather icon" class="w-36 mx-auto">
        <p class='text-2xl'>${city}</p>
        <p>${translatedDescription}</p>
        <div class='flex justify-between mt-2'>
          <div class='flex items-center gap-4'>
            <i class="fa-solid fa-water text-xl"></i>
            <div><p>${humidity}%</p>
            <p>ความชื้น</p></div>
          </div>  
          <div class='flex items-center gap-4'>
            <i class="fa-solid fa-wind text-xl"></i>
            <div><p>${windSpeed} m/s</p>
            <p>ความเร็วลม</p></div>
          </div>
        </div>
        `;
      }
      else if(!city){
        document.getElementById('weatherResult').innerHTML = "กรุณากรอกชื่อเมือง"
      }
      else {
        document.getElementById("weatherResult").innerHTML = `
        <p>ไม่พบชื่อเมืองที่ค้นหา</p>`;
      }
    })
    .catch((error) => {
      console.error("Error fetching the weather data:", error);
      document.getElementById("weatherResult").innerHTML = `
      <p>เกิดข้อผิดพลาดในการดึงข้อมูลอากาศ</p>`;
    });
});
