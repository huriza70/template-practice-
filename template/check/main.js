document.addEventListener("DOMContentLoaded", function () {
  const customDropdown = document.querySelector(".custom-dropdown");
  const selectedOption = customDropdown.querySelector(".selected-option");
  const dropdownOptions = customDropdown.querySelector(".dropdown-options");
  const countrySearchInput = document.getElementById("countrySearch");

  // List of countries (you can expand this list as needed)
  const countries = [
    { name: "Albania", code: "AL" },
    { name: "Andorra", code: "AD" },
    { name: "Austria", code: "AT" },
    { name: "Belarus", code: "BY" },
    { name: "Belgium", code: "BE" },
    { name: "Bosnia and Herzegovina", code: "BA" },
    { name: "Bulgaria", code: "BG" },
    { name: "Croatia", code: "HR" },
    { name: "Cyprus", code: "CY" },
    { name: "Czech Republic", code: "CZ" },
    { name: "Denmark", code: "DK" },
    { name: "Estonia", code: "EE" },
    { name: "Finland", code: "FI" },
    { name: "France", code: "FR" },
    { name: "Germany", code: "DE" },
    { name: "Greece", code: "GR" },
    { name: "Hungary", code: "HU" },
    { name: "Iceland", code: "IS" },
    { name: "Ireland", code: "IE" },
    { name: "Italy", code: "IT" },
    { name: "Latvia", code: "LV" },
    { name: "Liechtenstein", code: "LI" },
    { name: "Lithuania", code: "LT" },
    { name: "Luxembourg", code: "LU" },
    { name: "Malta", code: "MT" },
    { name: "Moldova", code: "MD" },
    { name: "Monaco", code: "MC" },
    { name: "Montenegro", code: "ME" },
    { name: "Netherlands", code: "NL" },
    { name: "North Macedonia", code: "MK" },
    { name: "Norway", code: "NO" },
    { name: "Poland", code: "PL" },
    { name: "Portugal", code: "PT" },
    { name: "Romania", code: "RO" },
    { name: "Russia", code: "RU" },
    { name: "San Marino", code: "SM" },
    { name: "Serbia", code: "RS" },
    { name: "Slovakia", code: "SK" },
    { name: "Slovenia", code: "SI" },
    { name: "Spain", code: "ES" },
    { name: "Sweden", code: "SE" },
    { name: "Switzerland", code: "CH" },
    { name: "Ukraine", code: "UA" },
    { name: "United Kingdom", code: "GB" },
    { name: "Vatican City", code: "VA" },
  ];

  // Mapping von Ländercodes zu Google Übersetzer-Sprachcodes
  const languageCodes = {
    AL: "sq", // Albanian
    AD: "ca", // Catalan
    AT: "de", // German
    BY: "be", // Belarusian
    BE: "nl", // Dutch
    BA: "bs", // Bosnian
    BG: "bg", // Bulgarian
    HR: "hr", // Croatian
    CY: "el", // Greek (Cyprus)
    CZ: "cs", // Czech
    DK: "da", // Danish
    EE: "et", // Estonian
    FI: "fi", // Finnish
    FR: "fr", // French
    DE: "de", // German
    GR: "el", // Greek
    HU: "hu", // Hungarian
    IS: "is", // Icelandic
    IE: "ga", // Irish
    IT: "it", // Italian
    LV: "lv", // Latvian
    LI: "de", // German (Liechtenstein)
    LT: "lt", // Lithuanian
    LU: "de", // German (Luxembourg)
    MT: "mt", // Maltese
    MD: "ro", // Romanian (Moldova)
    MC: "fr", // French (Monaco)
    ME: "sr", // Serbian (Montenegro)
    NL: "nl", // Dutch (Netherlands)
    MK: "mk", // Macedonian
    NO: "no", // Norwegian
    PL: "pl", // Polish
    PT: "pt", // Portuguese
    RO: "ro", // Romanian
    RU: "ru", // Russian
    SM: "it", // Italian (San Marino)
    RS: "sr", // Serbian
    SK: "sk", // Slovak
    SI: "sl", // Slovenian
    ES: "es", // Spanish
    SE: "sv", // Swedish
    CH: "de", // German (Switzerland)
    UA: "uk", // Ukrainian
    GB: "en", // English (United Kingdom)
    VA: "it", // Italian (Vatican City)
  };

  // Funktion zum Ändern der Übersetzungssprache
  function changeLanguage(countryCode) {
    const languageCode = languageCodes[countryCode];
    if (languageCode) {
      const translator = new google.translate.TranslateElement({ pageLanguage: 'de' }, 'google_translate_element');
      translator.showOverlay();
      translator.changeLanguage(languageCode);
    } else {
      console.error("Sprachcode nicht gefunden für das ausgewählte Land: " + countryCode);
    }
  }
  
  // Function to set the selected country based on user's IP
  function setSelectedCountryByIP() {
    fetch("http://ip-api.com/json")
      .then((response) => response.json())
      .then((data) => {
        const userCountryCode = data.countryCode;
        const country = countries.find((c) => c.code === userCountryCode);
        if (country) {
          selectedOption.textContent = country.name;
          highlightSelectedOption(country.code);
        }
      })
      .catch((error) => {
        console.error("Error fetching IP-based location data:", error);
      });
  }

  // Populate the dropdown options
  countries.forEach(function (country) {
    const option = document.createElement("li");
    option.textContent = country.name;
    option.dataset.value = country.code;
    option.addEventListener("click", function () {
      selectedOption.textContent = country.name;
      highlightSelectedOption(country.code);
      customDropdown.classList.remove("active");
    });
    dropdownOptions.appendChild(option);
  });


  
  // Function to filter countries based on user input and update the dropdown
  function filterCountries(searchTerm) {
    const filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Clear the existing dropdown options
    dropdownOptions.innerHTML = "";

    // Populate the dropdown with filtered countries
    filteredCountries.forEach(function (country) {
      const option = document.createElement("li");
      option.textContent = country.name;
      option.dataset.value = country.code;
      option.addEventListener("click", function () {
        selectedOption.textContent = country.name;
        highlightSelectedOption(country.code);
        customDropdown.classList.remove("active");
      });
      dropdownOptions.appendChild(option);
    });
  }

  // Event listener for the search input
  countrySearchInput.addEventListener("input", function () {
    const searchTerm = countrySearchInput.value;
    filterCountries(searchTerm);
  });


 // Toggle the dropdown and search bar when the selected option is clicked
 selectedOption.addEventListener("click", function () {
  customDropdown.classList.toggle("active");
  countrySearchInput.value = ""; // Clear the search input
  countrySearchInput.focus(); // Focus on the search input
});

// Close the dropdown and hide the search bar when clicking outside of it
document.addEventListener("click", function (event) {
  if (!customDropdown.contains(event.target)) {
    customDropdown.classList.remove("active");
  }
});

  // Function to highlight the selected option
  function highlightSelectedOption(countryCode) {
    const options = dropdownOptions.querySelectorAll("li");
    options.forEach(function (option) {
      option.classList.remove("selected");
      if (option.dataset.value === countryCode) {
        option.classList.add("selected");
      }
    });
  }

  // Automatically set the user's country when the page loads
  setSelectedCountryByIP();
});



document.addEventListener("DOMContentLoaded", function () {
  const yesButton = document.getElementById("yesButton");

  yesButton.addEventListener("click", function () {
    // Redirect the user to the specified link
    window.location.href = "https://www.maxipape.com/index.html";
  });
});


