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