
function generateYearOptions(years) {
    years.unshift(YEAR_ALL);
    const optionsMarkup = `
        ${years.map(year => `<option> ${year} </option>`).join("")}
    `;
    document.getElementById("yearSelector").innerHTML = optionsMarkup;
}

function generateCategoriesDiv(categories) {
    categories.unshift(CATEGORY_ALL);
    const categoriesMarkup = `
        ${categories.map(category => 
            `<button onclick="changeCategory(this)" data-category="${category}" class="${category == CATEGORY_ALL ? BUTTON_SELECTED_CLASS : ''}"> ${category} 
                <span>X</span> 
            </button>`).join("")}
    `;
    changeCategoryFilter(CATEGORY_ALL, CATEGORY_ACTION_ADD);

    document.getElementById("categoriesNode").innerHTML = categoriesMarkup;
}


function generateRaportRow(raports) {

    let dataElement = document.getElementById("dataPanel");
    dataElement.innerHTML = "";
    
    if (raports.length == 0) {
        dataElement.innerHTML = "<div> BRAK DANYCH </div";
        return; 
    }

    raports.forEach((raport, idx) => {
        var para = document.createElement("div");
        para.innerHTML = `<div class="dateInfo">
            <h4> ${customDateFormater(raport.date)} </h4>
            ${raport.category}
        </div>
        <div>
            <h2 class="raportTitle">${raport.title}</h2>
            <p class="raportDesctiption">${raport.description}</p>
            <a href="/preview/fileId">Zobacz raport</a>
            ${generateFileElement(raport.files, idx)}
        </div>`;
        dataElement.appendChild(para);
    });

    function generateFileElement(files, id) {
        if (!files || files.length == 0) 
            return '';
        else if (files.length == 1)
            return `<a href="download/fileId" download="${files[0].filename}">Pobierz ${files[0].filename} (${files[0].filesize}kB)</a>`;
        else
            return `<span class="files">
                <a class="multiFilesLink" data-filesid="${id}" onclick="toggleFiles(this)">Pliki do
                    pobrania</a>
                <div id="files-${id}" class="filesPanel">
                    ${files.map(file => `<a href="download/fileId" download="${file.filename}">Pobierz ${file.filename} (${file.filesize}kB)</a></br>`).join("")}
                </div>
            </span>`
    }
}