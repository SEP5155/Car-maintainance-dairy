function customAlert() {
    const customAlert = document.querySelector('.custom_alert');
    const pageNameTitle = document.querySelector('h1.page_title');
    if (pageNameTitle) {
        const pageName = pageNameTitle.innerHTML;
        customAlert.innerHTML = ('You are at ' + pageName + ' page right now');
        customAlert.classList.add('show');
        console.log('showing alert');

        setTimeout(function() {
            customAlert.classList.remove('show');
            console.log('hiding alert');
        }, 3000);
    } else {
        console.log('no alert needed');
    }
    
}


customAlert();