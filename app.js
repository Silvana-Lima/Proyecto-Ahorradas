// ****---- Utilities ----****

const $ = (selector) => document.querySelector(selector);
const $$ = (selector)=> document.querySelectorAll(selector);


// ****---- Variables ----****

const $sectionBalance = $(".section-balance");
const $sectionNewOperation = $(".section-new-operation");
const $sectionEditOperatioin = $(".section-edit-operation");
const $btnNewOperation = $("#btn-new-operation");
const $formNewOperation = $(".form-new-operation");
const $btnCancelNewOperation = $("#btn-cancel-new-operation");
const $btnBalance = $("#btn-balance");
const $btnCategory = $("#btn-category");
const $btnReport = $("#btn-report");
const $sectionCategory = $(".section-category");
const $boxAddCategorie = $(".box-add-category");
const $boxEditCategorie = $(".box-edit-category");
const $inputEditCategory = $(".input-edit-category");
const $btnCancelEditCategory = $("#btn-cancel-edit-category");
const $formEditCategorie = $(".form-edit-categorie");
const $sectionReports = $(".section-reports");
const $boxReportsNoOperations = $(".box-insufficient-operations");
const $boxReportsSummary = $(".box-reports-summary");
const $navBarMenu = $(".navbar-menu");
const $btnNavBarBurger = $(".navbar-burger");
const $selectType = $("#filter-select-type");
const $selectCategory = $("#filter-select-category");
const $selectOrder = $("#filter-select-order");
const $btnHideFilters = $(".btn-hide-filter");
const $formFilters = $("#form-filters");
const $contSummary = $(".cont-summary");
const $contTotalByCategory = $(".cont-total-by-category");
const $newOperationDescription = $("#description");
const $newOperationAmount = $("#amount");
const $newOperationInputDate = $("#new-operation-input-date")
const $newOperationSelectType = $("#new-operation-select-type");
const $totalProfitsBalance = $(".total-ganancias-balance");
const $totalSpencesBalance = $(".total-gastos-balance");
const $totalBalance = $(".total-balance");
const $contWithoutResults = $(".cont-without-results");
const $contOperations = $(".cont-operations");
const $contTitleOperations = $(".cont-title-operations");
const $inputFilterDate = $("#input-filter-date");
const $formAddCategory = $(".form-add-category")
const $inputCategory = $(".input-category");
const $newOperationSelectCategory = $("#new-operation-select-category");
const $contCategories = $(".cont-category");
const $inputEditDescription = $("#edit-description");
const $inputEditAmount = $("#edit-amount");
const $selectTypeEdit = $("#edit-operation-select-type");
const $inputEditDate = $("#edit-operation-input-date");
const $inputEditCategoryOperation = $("#edit-operation-select-category");
const $btnCancelEditOperation = $("#btn-cancel-edit-operation");
const $formEditOperation = $(".form-edit-operation");
const $btnEditOperation = $("#btn-add-edit-operation");
const $contTotalByMonth = $(".cont-total-by-month");

const $$sections = $$(".section");


// ****---- Functions to change the screens----****

const changeScreen = (hideSections, showSection) => {
    for (const section of hideSections) {
      section.classList.add("is-hidden");
    }
    showSection.classList.remove("is-hidden");
  };

const hideElement = (element)=> element.classList.add("is-hidden");
const showElement = (element)=> element.classList.remove("is-hidden");


// ****---- Events to change the screens----****

$btnBalance.addEventListener("click", () => {
    changeScreen($$sections, $sectionBalance);
  });

$btnCategory.addEventListener("click", () => {
  changeScreen($$sections, $sectionCategory);
});

$btnReport.addEventListener("click", () => {
    changeScreen($$sections, $sectionReports);

        if (operations != 0) {
        hideElement($boxReportsNoOperations);
        showElement($boxReportsSummary);
        showReports();
    } else {
        hideElement($boxReportsSummary);
        showElement($boxReportsNoOperations);
    }
  });

$btnNewOperation.addEventListener("click", ()=>{
    changeScreen($$sections, $sectionNewOperation);
})

// ****---- Event to active NavBurger Bulma ----****

$btnNavBarBurger.addEventListener("click", ()=> {
    $navBarMenu.classList.toggle("is-active");
    $btnNavBarBurger.classList.toggle("is-active");
});