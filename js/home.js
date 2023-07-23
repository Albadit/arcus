async function fetchdata() {
    const response = await fetch('/src/json/language.json');
    const data = await response.json();
    return data;
}

function updateLanguage() {
    var languageSelect = document.getElementById("language");
    var selectedLanguage = languageSelect.options[languageSelect.selectedIndex].value;
    displayMenu(selectedLanguage)
}

function createLanguageSelect(data, lang) {
    let html = '';
    html += `<label for="language" hidden>Select language:</label>`;
    html += `<select id="language" onchange="updateLanguage()">`;
    data.forEach(menu => {
        if (menu["language"]) {
            for (let key in menu.language) {
                if (lang == key) {
                    html += `<option value="${key}" selected>${menu.language[key]}</option>`;
                } else {
                    html += `<option value="${key}">${menu.language[key]}</option>`;
                }
            }
        }
    });
    html += `</select>`;
    return html;
}

function createMenu(data, language) {
    let html = '';
    data.forEach(menu => {
        if (menu["menu"]) {
            menu.menu.menuProduct.forEach(product => {
                html += `<div class="product">`;
                html += `<p class="product-title">${product.name[language]}</p>`;
                html += `<p class="product-description">${product.description[language]}</p>`;
                html += `<div class="product-line"></div>`;
                html += `<p class="product-price">${product.price}</p>`;
                html += `</div>`;
            });
        }
    });
    return html;
}

function displayTranslations(data, language) {
    if (typeof data === "object") {
        for (let key in data) {
            if (typeof data[key] === "object") {
                displayTranslations(data[key], language);
            } else {
                if (data["id"] && data["link"]) {
                    document.getElementById(data["id"]).innerHTML = `<a href="#${data["link"]}">${data[language]}</a>`;
                    break;
                } else if (data["id"] && !data["link"]) {
                    document.getElementById(data["id"]).innerHTML = data[language];
                    break;
                }
            }
        }
    }
}

async function displayMenu(language) {
    const data = await fetchdata();
    const languageSelect = createLanguageSelect(data, language);
    const menu = createMenu(data, language);
    displayTranslations(data, language);
    document.getElementById('language-select').innerHTML = languageSelect;
    document.getElementById('menu-content').innerHTML = menu;
}

document.getElementById('year').innerHTML = new Date().getFullYear();
window.addEventListener('load', displayMenu('en'));