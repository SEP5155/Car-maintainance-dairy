document.addEventListener('DOMContentLoaded', function() {

    // console.log('testing js connection');

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

    const extraInput = document.querySelectorAll('.register_extra_info');
    const extraMenuCheckbox = document.querySelector('#tell_more');

    if(extraMenuCheckbox) {
        extraMenuCheckbox.addEventListener('change', function() {
            if (extraMenuCheckbox.checked) {
                extraInput.forEach(function(element) {
                    element.style.display = 'inline-block';
                    console.log('showing extra menu');
                });
                
            } else {
                extraInput.forEach(function(element) {
                    element.style.display = 'none';
                    console.log('hiding extra menu');
                });
            }
        });
    }
    
    
    customAlert();
  

});

