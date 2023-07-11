// -------- Eye Movement -------- //

const pupil = document.querySelector('#home .pupil');
window.addEventListener('mousemove', (event) => {
    let offsetX = 35, offsetY = 33, mult = 40;

    if (window.innerWidth >= 1024) {
        offsetX = 29;
        offsetY = 33;
        mult = 30;
    }

    let x = event.clientX * mult / window.innerWidth + offsetX + "%";
    let y = event.clientY * mult / window.innerHeight + offsetY + "%";

    pupil.style.left = x;
    pupil.style.top = y;
})


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


// -------- Home Animation -------- //

const homeAnimation = anime({
    targets: [changeContainer ,'#enhance', '#presence'],
    opacity: 0,
    rotate: function(el, i) {
        return -5 + (5 * i);
      },
    marginBottom: function(el, i) {
        return 50 + (-10 * i);
      },
    delay: anime.stagger(150),
    easing: 'easeInOutQuad',
    autoplay: false,
    duration: 1000,
});

const home = document.getElementById('home');
const homeEye = document.querySelector('#home .circle');
const salesEye = document.querySelector('#sales .circle');

const salesContainer = document.getElementById('sales');
const sales = document.querySelector('#sales div');
const salesTitles = sales.querySelectorAll('h1');

// -------- Sales Animation -------- //

const typingText = document.querySelectorAll('#sales .typing');
typingText[0].innerHTML = typingText[0].textContent.split(' ').map(function(word) {
    return "<span class='letter'>" + word + "</span>";
  }).join(' ');
  typingText[1].innerHTML = typingText[1].textContent.split(' ').map(function(word) {
    return "<span class='letter'>" + word + "</span>";
  }).join(' ');

const typingTimeline = anime.timeline({
    easing: 'easeOutQuad',
    autoplay: false,
    duration: 1000
})

typingTimeline
.add({
    targets: typingText[0].querySelectorAll('span'),
    opacity: 1,
    translateY: [15, 0], 
    delay: anime.stagger(300),
})
.add({
    targets: typingText[1].querySelectorAll('span'),
    opacity: 1,
    translateY: [15, 0], 
    delay: anime.stagger(300)
})
.add({
    targets: '#sales .pupil',
    left: ['30%', '70%', '30%', '70%'],
    top: ['40%', '40%', '60%', '60%'],
    duration: 16000,
}, 0);

function scrollEvents() {
    let posY = window.scrollY;

    if (home.getBoundingClientRect().bottom > window.innerHeight / 100 * 10) {
        homeAnimation.seek((posY / (home.clientHeight - (window.innerHeight / 100 * 10))) * homeAnimation.duration);
        homeEye.style.display = 'block';
        homeEye.style.scale = 1 - posY / home.clientHeight;
        salesEye.classList.remove('active');
    } else { homeEye.style.scale = 0; homeEye.style.display = 'none'; salesEye.classList.add('active')}

    if (sales.getBoundingClientRect().top == 0) {
        salesTitles.forEach(title => {title.classList.add('active'); title.classList.remove('bottom');}); 
        typingTimeline.seek((salesContainer.getBoundingClientRect().top / salesContainer.clientHeight * -1 * 2) * typingTimeline.duration);
    }
    else if (sales.getBoundingClientRect().top > 0) {
        typingTimeline.seek(0);
        salesTitles.forEach(title => {title.classList.remove('active')});
    }
    else {
        salesTitles.forEach(title => {title.classList.add('bottom');}); 
    }
}

window.addEventListener('scroll', scrollEvents);