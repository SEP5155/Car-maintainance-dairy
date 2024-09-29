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