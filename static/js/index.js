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
    //SLIDER FOR HOME PAGE
    let currentIndex = 0;
    let images = document.querySelectorAll('.random_car-img');
    let totalImages = images.length;
    console.log('Images found: ' + totalImages);
    let nextBtn = document.getElementById('next-button');
    let prevBtn = document.getElementById('prev-button');

    function showNext() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % totalImages;
        images[currentIndex].classList.add('active');
        console.log('showing slide number' + (currentIndex + 1));
    }
    function showPrev() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        images[currentIndex].classList.add('active');
        console.log('showing slide number' + (currentIndex + 1));
    }
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);

    
    
    customAlert();
  

});

