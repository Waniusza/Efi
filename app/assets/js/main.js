let allRaports;

let selectedCategories = [];
let selectedYear;
let selectedPhrase;

(function () {
    document.addEventListener('DOMContentLoaded', () => {
        console.log("Document ready");

        let categories = Array();
        let years = Array();

        loadData()
            .then(data => {
                console.log("Wynik", data);
                allRaports = data;

                categories.push(...fetchCategories(data));
                years.push(...fetchYearsOrdered(data));

                generateYearOptions(years);
                generateCategoriesDiv(categories);

                filterDataAndUpdate();
                console.log(categories);
                console.log(years);
            }).catch(err => {
                console.warn("Could not load data", err);
                alert("Błąd ładowania danych, skontaktuj się z developerem.")
            })
    })

    function fetchCategories(elements) {
        let result = Array();
        elements.forEach(element => {
            let elCategory = element.category;
            if (result.indexOf(elCategory) == -1) {
                result.push(elCategory);
            }
        });
        return result;
    }

    function fetchYearsOrdered(elements) {
        let result = Array();
        elements.forEach(element => {
            let elYear = (new Date(element.date)).getFullYear();
            if (result.indexOf(elYear) == -1) {
                result.push(elYear);
            }
            result.sort((a, b) => b - a);
        });
        return result;
    }

    function loadData() {
        let res = new Promise(function (resolve, reject) {
            fetch("./data/data.json", {
                method: 'GET',
                mode: 'no-cors'
            })
                .then(response => response.json())
                .then(response => {
                    resolve(response);
                }).catch(err => {
                    console.warn("Bład wczytywania strony", err)
                    reject(err);
                })
        });
        return res;
    }
})();
