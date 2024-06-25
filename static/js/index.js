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

    const formWeb = document.querySelectorAll('.form input');
    const formName = document.querySelector('form');
    function storeFormData2() {
        if (formWeb) {
            console.log('qnt of field are: ' + formWeb.length);
            const formDatas = {}
            formWeb.forEach(function(input) {
                console.log(input.id);
                formDatas[input.id] = input.value;
                
            });
            // document.getElementById('user_id').value;
            localStorage.setItem(formName.id, JSON.stringify(formDatas));
            console.log(formDatas);
        }
    }
    if (formWeb.length > 0) {
        formWeb.forEach(function(input) {
            input.addEventListener('input', storeFormData2);
        });
    }
    function loadFormData2() {
        if(localStorage.getItem(formName.id)) {
            const formName = document.querySelector('form');
            const storedFormDatas = localStorage.getItem(formName.id);
            formWeb.forEach(function(input) {
                const formDatas = JSON.parse(storedFormDatas);
                input.value = formDatas[input.id];
                console.log('form data is loaded')
            })
        }
    }
    if (formWeb.length > 0) {
        loadFormData2()
    }

    function clearFormData2() {
        localStorage.removeItem(formName.id);
    }

    if(formWeb.length > 0) {
        formName.addEventListener('submit', function(event) {
            clearFormData2();
            alert('form submitted and Local Storage is cleared');
        })
    }

    const sortMenu = document.getElementById("sort_entries");
    if(sortMenu) {
        sortMenu.addEventListener("change", function() {
            console.log(this.value);
            let criteria = this.value;
            let entries = Array.from(document.querySelectorAll('.posts .post'));
    
            entries.sort(function(a, b) {
                let valueA = a.querySelector("." + criteria).textContent;
                let valueB = b.querySelector("." + criteria).textContent;
    
                if (criteria === "date") {
                    return new Date(valueA) - new Date(valueB);
    
                } else if (criteria === "cost") {
                    return parseFloat(valueA) - parseFloat(valueB);
                } else {
                    return valueA.localeCompare(valueB)
                }
            });
    
            let container = document.querySelector(".posts");
            container.innerHTML = "";
            entries.forEach(function(entry) {
                container.appendChild(entry);
            });
    
        })
    }
    
});

