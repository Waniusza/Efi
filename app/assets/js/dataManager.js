function customDateFormater(time) {
    var date = new Date(time);
    var yyyy = date.getFullYear();
    var MM = formatTwoDigits(date.getMonth() + 1);
    var dd = formatTwoDigits(date.getDate());
    var hh = formatTwoDigits(date.getHours());
    var mm = formatTwoDigits(date.getMinutes());
    
    return `${dd}.${MM}.${yyyy} </br> ${hh}:${mm}`;

    function formatTwoDigits(num) {
        return num > 9 ? `${num}` : `0${num}`;
    }
}



function filterDataAndUpdate() {
    console.log("Filter by ", selectedPhrase, selectedYear, selectedCategories);

    let selectedRaports = Array.of(...allRaports);

    console.log("filter")

    if (selectedYear
        && selectedYear != YEAR_ALL) {
        console.log("filter year ", selectedYear)
        selectedRaports = selectedRaports.filter(raport => selectedYear == (new Date(raport.date)).getFullYear());
    }
    if (selectedCategories.length != 0
        && !selectedCategories.includes(CATEGORY_ALL)) {
        console.log("filter selectedCategories ", selectedCategories)
        selectedRaports = selectedRaports.filter(raport => selectedCategories.includes(raport.category));
    }
    if (selectedPhrase
        && selectedPhrase.trim().length > 0) {
        selectedRaports = selectedRaports.filter(raport => {
            console.log("filter selectedPhrase ", selectedPhrase)
            return raport.description.toLowerCase().search(selectedPhrase.toLowerCase()) != -1
                || raport.title.toLowerCase().search(selectedPhrase.toLowerCase()) != -1;
        });
    }
    console.log(selectedRaports);
    generateRaportRow(selectedRaports);
}

function changeYearFilter(year) {
    console.debug("year defined", year);
    if (year == YEAR_ALL) {
        selectedYear = null;
    } else {
        selectedYear = year;
    }
    filterDataAndUpdate();
}


function changeCategoryFilter(category, categoryAction) {
    console.debug("category defined", category);
    switch (categoryAction) {
        case CATEGORY_ACTION_ADD:
            selectedCategories.push(category);
            break;
        case CATEGORY_ACTION_REMOVE:
            let idx = selectedCategories.indexOf(category);
            selectedCategories.splice(idx, 1);
            break;
        default:
            console.warn("Not defined category action");
    }
    filterDataAndUpdate();
}

function changePhraseFilter(phrase) {
    console.debug("phrase defined", phrase);
    selectedPhrase = phrase;
    filterDataAndUpdate();
}