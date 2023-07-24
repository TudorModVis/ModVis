// -------- Word Change -------- //

const change = document.querySelector('.change');
const changeContainer = document.querySelector('.change-container');
let index = 1, changeImage;

function changeWords() {
    imageSelector();
    setImageHeigth();

    let changeImageHeight = changeImage.getBoundingClientRect().height;
    let rate = -1 * changeImageHeight;

    change.style.transform = 'translateY(' + rate * index + 'px)';
    if (index == 2) change.classList.remove('active');

    if (index == 5) {
        index = 1;
        
        setTimeout(() => {
            change.classList.add('active');
        }, 1500);
    } else index++;
}

function imageSelector() {
    if (window.innerWidth >=1024) {
        changeImage = changeContainer.querySelector('#pc');
    } else changeImage = changeContainer.querySelector('#mobile');
}

function setImageHeigth() {
    const images = change.querySelectorAll('img');
    images.forEach(image => {
        image.style.height = changeImage.getBoundingClientRect().height + 'px';
    });
}

changeWords();

setInterval(changeWords, 2000);

// -------- Logo Hide -------- //

let logoVisible = true;

function hideLogo() {
    if (window.scrollY > 0) {
        if (logoVisible == false) return;
        logo.classList.add('active');
        languages.classList.add('hide');
        logoVisible = false;
    } else {
        if (logoVisible == true) return;
        logo.classList.remove('active');
        languages.classList.remove('hide');
        logoVisible = true;
    }
}

window.addEventListener('scroll', hideLogo);