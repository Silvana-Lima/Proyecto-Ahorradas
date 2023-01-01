// ****---- Utilities ----****

const $ = (selector) => document.querySelector(selector);
const $$ = (selector)=> document.querySelectorAll(selector);


// ****---- Variables ----****

const $sectionBalance = $(".section-balance");
const $sectionNewOperation = $(".section-new-operation");
const $btnNewOperation = $("#btn-new-operation");
const $btnCancelNewOperation = $("#btn-cancel-new-operation");
const $btnBalance = $("#btn-balance");
const $btnCategory = $("#btn-category");
const $btnReport = $("#btn-report");
const $sectionCategory = $(".section-category");
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
const $btnAddNewOperation = $("#btn-add-new-operation");
const $totalGananciasBalance = $(".total-ganancias-balance");
const $totalGastosBalance = $(".total-gastos-balance");
const $totalBalance = $(".total-balance");
const $contWithoutResults = $(".cont-without-results");
const $contOperations = $(".cont-operations");
const $contTitleOperations = $(".cont-title-operations");
const $inputFilterDate = $("#input-filter-date");
const $btnAddCategory = $("#btn-add-category");
const $inputCategory = $(".input-category");
const $newOperationSelectCategory = $("#new-operation-select-category");
const $contCategories = $(".cont-category");

const $$sections = $$(".section");


// ****---- Function to change the screens----****

const changeScreen = (hideSections, showSection) => {
    for (const section of hideSections) {
      section.classList.add("is-hidden");
    }
    showSection.classList.remove("is-hidden");
  };


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
        $boxReportsSummary.classList.remove("is-hidden");
        $boxReportsNoOperations.classList.add("is-hidden");
    } else {
        $boxReportsNoOperations.classList.remove("is-hidden");
        $boxReportsSummary.classList.add("is-hidden");
    }
  });

$btnNewOperation.addEventListener("click", ()=>{
    changeScreen($$sections, $sectionNewOperation);
})

$btnCancelNewOperation.addEventListener("click", ()=>{
    changeScreen($$sections, $sectionBalance);
})

// ****---- Event to active NavBurger Bulma ----****

$btnNavBarBurger.addEventListener("click", ()=> {
    $navBarMenu.classList.toggle("is-active");
    $btnNavBarBurger.classList.toggle("is-active");
});