let darkMode = localStorage.getItem("dark");
const darkModeToggle = document.querySelector('.theme-toggle-button');

const enableDarkMode = () => {
    document.body.classList.add('dark');
    localStorage.setItem("dark", "enabled");
    $('#table').addClass(' table-dark');
    $('.change').removeClass(' btn-outline-light');
    $('.change').addClass(' btn-secondary');
    $('.changeSubmit').addClass(' btn-secondary');
    $('.changeSubmit').removeClass(' btn-light');
}

const enableLightMode = () => {
    document.body.classList.remove('dark');
    localStorage.setItem("dark", null);
    $('#table').removeClass(' table-dark');
    $('.change').removeClass(' btn-secondary');
    $('.change').addClass(' btn-outline-light');
    $('.changeSubmit').addClass(' btn-light');
    $('.changeSubmit').removeClass(' btn-secondary');
}

if (darkMode == "enabled") {
    enableDarkMode();
}

darkModeToggle.addEventListener("click", () => {
    darkMode = localStorage.getItem("dark");
    if (darkMode != "enabled") {
        enableDarkMode();
        console.log(darkMode);
    } else {
        enableLightMode();
        console.log(darkMode);
    }
});