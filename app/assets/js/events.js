function changeCategory(el) {
    let categoryName = el.dataset.category;
    let wasActive = el.classList.contains(BUTTON_SELECTED_CLASS);

    console.log(categoryName);

    el.classList.toggle(BUTTON_SELECTED_CLASS);

    changeCategoryFilter(categoryName, wasActive ? CATEGORY_ACTION_REMOVE : CATEGORY_ACTION_ADD);
}

function changeYear(value) {
    console.log(value);
    changeYearFilter(value);
}

function changePhrase(event) {
    event.preventDefault();

    let phrase = document.getElementById("searchPhrase").value;

    console.log(phrase);
    changePhraseFilter(phrase);
}

function toggleFiles(element) {
    let id = element.dataset.filesid;
    let filesElements = document.getElementsByClassName("filesPanel");

    element.classList.toggle("show");

    let panel = filesElements[`files-${id}`];
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
    } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
    }
}