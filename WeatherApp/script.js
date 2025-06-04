async function getWeather() {
  const city = document.getElementById("locationInput").value.trim();
  const resultBox = document.getElementById("weatherResult");

  if (city === "") {
    resultBox.innerHTML = "Please enter a city name.";
    return;
  }

  const apiKey = "d670e99ddce7462c96f112951250106";
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=yes`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      resultBox.innerHTML = `<p>${data.error.message}</p>`;
      return;
    }

    const { name, country } = data.location;
    const { temp_c, condition } = data.current;

    resultBox.innerHTML = `
      <h3>${name}, ${country}</h3>
      <p><strong>Temperature:</strong> ${temp_c} °C</p>
      <p><strong>Condition:</strong> ${condition.text}</p>
      <img src="${condition.icon}" alt="Weather icon">
    `;
  } catch (error) {
    resultBox.innerHTML = `<p>Error fetching weather. Try again later.</p>`;
    console.error(error);
  }
}
