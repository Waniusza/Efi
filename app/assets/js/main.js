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
        return new Set(
            elements.map(raport => raport.category)
        )
    }

    function fetchYearsOrdered(elements) {
        return new Set(
            elements
                .map(raport => new Date(raport.date).getFullYear())
                .sort((a, b) => b - a));
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
