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
});


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
const aboutEye = document.querySelector('#about-us .circle');
const firstSvg = document.getElementById('svg1');

const salesContainer = document.getElementById('sales');
const sales = document.querySelector('#sales div');
const salesTitles = sales.querySelectorAll('h1');
const salesButton = sales.querySelector('button');

const homeColorObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) firstSvg.style.top = 0;
    });
})

homeColorObserver.observe(home);

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
    duration: 1000,
});

//Exit Timeline

const exitTimeline = anime.timeline({
    easing: 'easeOutQuad',
    autoplay: false,
});

exitTimeline
.add({
    targets: typingText[1].querySelectorAll('span'),
    opacity: [1, 0],
    rotate: function(el, i) {
        return anime.random(-5, 5)
      },
    //   scale: function(el, i) {
    //     return anime.random(1, 1.3)
    //   },
      translateY: () => {
        return [0, anime.random(-10, -20)]
      },
      translateX: () => {
        return anime.random(-50, 50)
      },
})
.add({
    targets: typingText[0].querySelectorAll('span'),
    opacity: [1, 0],
    rotate: function(el, i) {
        return anime.random(-5, 5)
      },
    //   scale: function(el, i) {
    //     return anime.random(1, 1.3)
    //   },
      translateY: () => {
        return [0, anime.random(-10, -20)]
      },
      translateX: () => {
        return anime.random(-50, 50)
      },
}, 0);

//Typing Timeline

typingTimeline
.add({
    targets: typingText[0].querySelectorAll('span'),
    opacity: [0, 1],
    translateY: [15, 0], 
    delay: anime.stagger(300),
})
.add({
    targets: typingText[1].querySelectorAll('span'),
    opacity: [0, 1],
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
    } else { homeEye.style.scale = 0; homeEye.style.display = 'none'; salesEye.classList.add('active'); aboutEye.classList.remove('active');}

    if (sales.getBoundingClientRect().top == 0) {
        salesTitles.forEach(title => {title.classList.add('active'); title.classList.remove('bottom');}); 
        typingTimeline.seek((salesContainer.getBoundingClientRect().top / salesContainer.clientHeight * -1 * 2) * typingTimeline.duration);
        if (salesContainer.getBoundingClientRect().top / salesContainer.clientHeight * -1 * 2 <= 1) {
            salesButton.classList.remove('active');
        } else {salesButton.classList.add('active'); salesButton.classList.remove('bottom');}
        exitTimeline.seek(0);
    }
    else if (sales.getBoundingClientRect().top > 0) {
        typingTimeline.seek(0);
        salesTitles.forEach(title => {title.classList.remove('active')});
    }
    else {
        salesTitles.forEach(title => {title.classList.add('bottom');});
        exitTimeline.seek(((salesContainer.getBoundingClientRect().top / salesContainer.clientHeight * -1 - .65) * 2.5) * exitTimeline.duration);
    }

    if (sales.getBoundingClientRect().top * -1 > window.innerHeight / 3) { salesButton.classList.add('bottom'); salesEye.classList.remove('active'); aboutEye.classList.add('active');}
    else if (sales.getBoundingClientRect().top < 0) { salesButton.classList.add('active'); salesButton.classList.remove('bottom'); }
}

window.addEventListener('scroll', scrollEvents);


// -------- Portfolio Animation -------- //

const portfolio = document.getElementById('portfolio')
const plans = portfolio.querySelectorAll('.plan');

function movePlans(event) {
    let moveX = event.clientX / window.innerWidth;
    let moveY = event.clientY / window.innerHeight;

    plans[2].style.transform = 'translate(' + moveX * 10 + '%, ' + moveY * 10 + '%)';
    plans[1].style.transform = 'translate(' + moveX * 7 + '%, ' + moveY * 7 + '%)';
    plans[0].style.transform = 'translate(' + moveX * 5 + '%, ' + moveY * 5 + '%)';
}

portfolio.addEventListener('mousemove', movePlans);

const portfolioText = portfolio.querySelector('.text');

const portfolioObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            anime.remove(plans);
            anime({
                targets: plans,
                opacity: [0, 1],
                scale: [0, 1],
                delay: anime.stagger(100),
                easing: 'easeOutElastic(8, 1)',
                duration: 2000,
                complete: () => {
                    plans.forEach(plan => {
                        plan.classList.add('active');
                    });
                }
            });
            portfolioText.classList.add('active');
        } else {
            portfolioText.classList.remove('active');
            anime.remove(plans);
            plans.forEach(plan => {
                plan.classList.remove('active');
            });
            anime({
                targets: plans,
                opacity: 0,
                scale: 0,
                delay: anime.stagger(100),
                easing: 'easeOutQuad',
                duration: 500
            });
        }
    })
})

portfolioObserver.observe(portfolioText);

// -------- Background Animation -------- //

function moveBackground() {
    let percent = (window.innerHeight - salesContainer.getBoundingClientRect().bottom) / window.innerHeight * 100;
    if (percent < 0 ) {
        firstSvg.style.top = 0;
        return;
    }

    if (percent > 120) {
        firstSvg.style.top = '120%';
        return;
    }
    firstSvg.style.top = percent * -1 + '%';
}

window.addEventListener('scroll', moveBackground);

// -------- About Us -------- //

const aboutUs = document.getElementById('about-us');
const box = aboutUs.querySelector('div');
const scrollBox = aboutUs.querySelector('.scroll');

const aboutUsTimeline = anime.timeline({
    easing: 'easeOutQuad',
    autoplay: false,
    duration: 1000
});

aboutUsTimeline
.add({
    targets: aboutUs.querySelectorAll('.one'),
    translateY: ['-10%', 0],
    translateX: ['60%', 0],
    rotate: [-25, 0],
})
.add({
    targets: aboutUs.querySelectorAll('.two'),
    translateY: ['-20%', 0],
    translateX: ['30%', 0],
    rotate: [25, 0],
}, 400)
.add({
    targets: aboutUs.querySelectorAll('.three'),
    translateY: ['50%', 0],
    translateX: ['20%', 0],
    rotate: [-25, 0],
}, 800)
.add({
    targets: aboutUs.querySelectorAll('.four'),
    translateY: ['-150%', 0],
    translateX: ['-60%', 0],
    rotate: [25, 0],
}, 800);

function moveBox() {
    const cord = box.offsetTop;
    scrollBox.style.transform = `translateX(-${cord}px)`;

    const percent = cord / (aboutUs.clientHeight - window.innerHeight);
    aboutUsTimeline.seek(percent * aboutUsTimeline.duration);
}

window.addEventListener('scroll', moveBox);

const aboutPupil = aboutUs.querySelector('.pupil');

window.addEventListener('mousemove', (event) => {
    let offsetX = 35, offsetY = 33, mult = 40;

    if (window.innerWidth >= 1024) {
        offsetX = 44;
        offsetY = 33;
        mult = 30;
    }

    let x = event.clientX * mult / window.innerWidth + offsetX + "%";
    let y = event.clientY * mult / window.innerHeight + offsetY + "%";

    aboutPupil.style.left = x;
    aboutPupil.style.top = y;
})