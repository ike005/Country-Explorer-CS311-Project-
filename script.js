
let alphabetContainer = document.getElementById("alphabet-container")
const alphabetsForTheCountries = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

function createAlphabetButtons() {
    alphabetsForTheCountries.forEach(letter => {
        let alphabetButton = `<span class="letters">${letter}</span>`
        alphabetContainer.innerHTML += alphabetButton;
    })
}

createAlphabetButtons();



