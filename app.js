// ****---- Utilities ----****

const $ = (selector) => document.querySelector(selector);


// ****---- Variables ----****

const $contBalance = $(".cont-balance");
const $boxNewOperation = $(".box-new-operation");
const $btnNewOperation = $("#btn-new-operation");
const $btnCancelNewOperation = $("#btn-cancel-new-operation");
const $btnBalance = $("#btn-balance");
const $btnCategory = $("#btn-category");
const $btnReport = $("#btn-report");
const $boxCategory = $(".box-category");
const $boxReportsNoOperations = $(".box-insufficient-operations");
const $boxReportsSummary = $(".box-reports-summary");
const $navBarMenu = $(".navbar-menu");
const $btnNavBarBurger = $(".navbar-burger")

// ****---- Events ----****

$btnNewOperation.addEventListener("click", ()=>{
    $boxNewOperation.classList.remove("hidden");
    $contBalance.classList.add("hidden");
})

$btnCancelNewOperation.addEventListener("click", ()=>{
    $contBalance.classList.remove("hidden");
    $boxNewOperation.classList.add("hidden");
})

$btnCategory.addEventListener("click", ()=>{
    $boxCategory.classList.remove("hidden");
    $contBalance.classList.add("hidden");
    $boxNewOperation.classList.add("hidden");
    $boxReportsNoOperations.classList.add("hidden");
    $boxReportsSummary.classList.add("hidden");
    
})

$btnReport.addEventListener("click", ()=>{
    $boxReportsNoOperations.classList.remove("hidden");
    $contBalance.classList.add("hidden");
    $boxNewOperation.classList.add("hidden");
    $boxCategory.classList.add("hidden");
})

$btnBalance.addEventListener("click", ()=>{
    $contBalance.classList.remove("hidden");
    $boxNewOperation.classList.add("hidden");
    $boxCategory.classList.add("hidden");
    $boxReportsNoOperations.classList.add("hidden");
    $boxReportsSummary.classList.add("hidden");
})

$btnNavBarBurger.addEventListener("click", ()=> {
    $navBarMenu.classList.toggle("is-active");
    $btnNavBarBurger.classList.toggle("is-active");
});
