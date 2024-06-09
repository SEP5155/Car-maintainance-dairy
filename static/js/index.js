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
    if(nextBtn) {
        nextBtn.addEventListener('click', showNext);
    }
    if(prevBtn) {
        prevBtn.addEventListener('click', showPrev);
    }
    

    
    
    customAlert();

    //FORM FUCTIONS TO STORE DATA IN LOCAL STORAGE
    const form = document.querySelector('.form');
    const entrieTitle = document.querySelector('#title');
    const entriePlace = document.querySelector('#place');
    const entrieCost = document.querySelector('#cost');
    const entrieMialadge = document.querySelector('#mialadge');
    const entrieText = document.querySelector('#text');
    const userIdInput = document.querySelector('#user_id');
    
    function storeFormData() {
        const formData =  {
            title: entrieTitle.value,
            place: entriePlace.value,
            cost: entrieCost.value,
            mialadge: entrieMialadge.value,
            text: entrieText.value
        };
        localStorage.setItem('formData', JSON.stringify(formData));
        console.log('saved data from form to local storage');
        console.log('saved data: ' + localStorage.getItem('formData'));

    }

    function loadFormData() {
        if(form) {
            const storedFormData = localStorage.getItem('formData');
            if(storedFormData) {
                const formData = JSON.parse(storedFormData);
                entrieTitle.value = formData.title;
                entriePlace.value = formData.place;
                entrieCost.value = formData.cost;
                entrieMialadge.value = formData.mialadge;
                entrieText.value = formData.text;
                console.log('form data is loaded')
            }
        }
        
    }
    loadFormData();

    if(form) {
        entrieTitle.addEventListener('input', storeFormData);
        entriePlace.addEventListener('input', storeFormData);
        entrieCost.addEventListener('input', storeFormData);
        entrieMialadge.addEventListener('input', storeFormData);
        entrieText.addEventListener('input', storeFormData);
    }

    function clearFormData() {
        localStorage.removeItem('formData');
    }

    if(form) {
        form.addEventListener('submit', function(event) {
            // event.preventDefault();
            clearFormData();
            alert('form submitted and Local Storage is cleared');
            // userIdInput.required = false;
            // form.reset();
            // userIdInput.required = true;
        });
    }
    
    

});

