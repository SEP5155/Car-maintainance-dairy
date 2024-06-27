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