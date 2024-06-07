document.addEventListener('DOMContentLoaded', function() {

    // console.log('testing js connection');

    function customAlert() {
        const customAlert = document.querySelector('.custom_alert');
        const pageName = document.querySelector('h1.page_title').innerHTML;
        customAlert.innerHTML = ('You are at ' + pageName + ' page right now');
        customAlert.classList.add('show');

        setTimeout(function() {
            customAlert.classList.remove('show');
        }, 5000);
    }
    customAlert();
})

