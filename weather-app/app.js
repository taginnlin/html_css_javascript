const valueSearch = document.getElementById('valueSearch');
const city = document.getElementById('city');
const temperature = document.getElementById('temperature');
const description = document.querySelector('.description');
const clouds = document.getElementById('clouds');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const form = document.querySelector('form');
const main = document.querySelector('main');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if(valueSearch.value != '') {
    searchWeather();
  }
});

const id = '08f4c29d9b648302e9b792be76926a8e';
const url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;
const searchWeather = () => {
  fetch(url + '&q=' + valueSearch.value)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if(data.cod == 200) {
      city.querySelector('figcaption').innerText = data.name;
      city.querySelector('img').src = 'https://flagsapi.com/'+ data.sys.country +'/shiny/32.png';
      
      temperature.querySelector('img').src = 'http://openweathermap.org/img/wn/'+ data.weather[0].icon +'@4x.png'
      temperature.querySelector('figcaption span').innerText = data.main.temp;
      description.innerText = data.weather[0].description;
      clouds.innerText = data.clouds.all;
      humidity.innerText = data.main.humidity;
      pressure.innerText = data.main.pressure;
    } else {
      main.classList.add('error');
      setTimeout(() => {
        main.classList.remove('error');
      }, 1000);
    }

    valueSearch.value = '';
  })
}

const initApp = () => {
  valueSearch.value = 'ShenZhen';
  searchWeather();
}
initApp();