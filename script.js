
let alphabetContainer = document.getElementById("alphabet-container")
const countryDashboard = document.getElementById("countries-initial-dashboard");
const userInput = document.getElementById("search-bar");

const alphabetsForTheCountries = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

function createAlphabetButtonsAndHandleButtonClicks() {
    alphabetsForTheCountries.forEach(letter => {
        let alphabetButton = `<span class="letters">${letter}</span>`
        alphabetContainer.innerHTML += alphabetButton;
    });

    alphabetContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("letters")) {
            const letter = event.target.textContent;
            getCountryData(letter);
        }
    });
}

createAlphabetButtonsAndHandleButtonClicks();

userInput.addEventListener("input", () => {
    const userInput = userInput.value.trim();
    if (userInput.length > 0) {
        getCountryData(userInput);
    } else {
        countryDashboard.innerHTML = "<p>Type a country name and select an alphabet</p>";
    }
});

async function getCountryData(letter) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${letter}`);
        const data = await response.json();

        const filteredCountries = data.filter(country =>
            country.name.common.toLowerCase().startsWith(letter.toLowerCase())
        );

        countryDashboard.innerHTML = "";

        if (filteredCountries.length === 0) {
            countryDashboard.innerHTML = `<p>No countries found for "${letter}"</p>`;
            return;
        }

        filteredCountries.forEach(country => {
            const countryFlag = country.flags.png;
            const countryName = country.name.common;
            const countryCapital = country.capital;
            const population = country.population.toLocaleString();
            const countryOnMap = country.maps.googleMaps;

            const countryHTML = `
                <div class="country-info-container">
                  <div class="flag-container">
                    <img src="${countryFlag}" alt="Flag of ${countryName}" class="flag-image" />
                  </div>
                  <div class="country-info">
                    <h2>${countryName}</h2>
                    <p><strong>Capital:</strong> ${countryCapital}</p>
                    <p><strong>Population:</strong> ${population}</p>
                    <p><a href="${countryOnMap}" target="_blank">Map Location</a></p>
                  </div>
                </div>
              `;
            countryDashboard.innerHTML += countryHTML;
        });
    } catch (error) {
        console.error(error);
        countryDashboard.innerHTML = `<p>Error fetching countries.</p>`;
    }
}