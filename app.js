// ****---- Utilities ----****

const $ = (selector) => document.querySelector(selector);


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

// ****---- Events to change the screens----****

$btnNewOperation.addEventListener("click", ()=>{
    $sectionNewOperation.classList.remove("is-hidden");
    $sectionBalance.classList.add("is-hidden");
})

$btnCancelNewOperation.addEventListener("click", ()=>{
    $sectionBalance.classList.remove("is-hidden");
    $sectionNewOperation.classList.add("is-hidden");
})

$btnCategory.addEventListener("click", ()=>{
    $sectionCategory.classList.remove("is-hidden");
    $sectionBalance.classList.add("is-hidden");
    $sectionNewOperation.classList.add("is-hidden");
    $sectionReports.classList.add("is-hidden");
    
})

$btnReport.addEventListener("click", ()=>{
    $sectionReports.classList.remove("is-hidden");
    $boxReportsSummary.classList.remove("is-hidden");
    $boxReportsNoOperations.classList.add("is-hidden")
    $sectionBalance.classList.add("is-hidden");
    $sectionNewOperation.classList.add("is-hidden");
    $sectionCategory.classList.add("is-hidden");

})

$btnBalance.addEventListener("click", ()=>{
    $sectionBalance.classList.remove("is-hidden");
    $sectionNewOperation.classList.add("is-hidden");
    $sectionCategory.classList.add("is-hidden");
    $sectionReports.classList.add("is-hidden");
})

$btnNavBarBurger.addEventListener("click", ()=> {
    $navBarMenu.classList.toggle("is-active");
    $btnNavBarBurger.classList.toggle("is-active");
});


const changeScreen = (seccion)=>{

}
