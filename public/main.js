const weatherDisplay = document.querySelector('.weather')
const weatherForm = document.querySelector('#weather-form')
const cityInput = document.querySelector('#city-input')

// Fetch weather data from API
const fetchWeather = async (city) => {
  const url = `/api?q=${city}`

  const res = await fetch(url)
  const data = await res.json()

  if (data.cod === '404') {
    alert('City not found')
    return
  }

  if (data.cod === '401') {
    alert('Invalid API Key')
    return
  }

  const displayData = {
    city: data.name,
    icon: data.weather[0].icon,
    temp: kelvinToFahrenheit(data.main.temp),
    tempC: kelvinToCelcius(data.main.temp)
  }

  addWeatherToDOM(displayData)
}

// Add display data to DOM
const addWeatherToDOM = (data) => {
  weatherDisplay.innerHTML = `
    <h1>Weather in ${data.city}</h1>
    <h2>${data.temp} &deg;F  <img src="https://openweathermap.org/img/wn/${data.icon}@2x.png"> ${data.tempC}  &deg;C</h2>
  `
  cityInput.value = ''
}

// Convert Kelvin to Fahrenheit formula °F = (K × 9/5) − 460
const kelvinToFahrenheit = (temp) => {
  return Math.ceil(temp * (9 / 5) - 460)
}

// Convert Kelvin to Celcius - Formula °C = K − 273.15
const kelvinToCelcius = (temp) => {
  return Math.ceil(temp - 273.15)
}

// Event listener for form submission
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  if (cityInput.value === '') {
    alert('Please enter a city')
  } else {
    fetchWeather(cityInput.value)
  }
})

// Initial fetch
fetchWeather('Oslo')