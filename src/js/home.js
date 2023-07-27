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

let homeAnimation;

if (window.innerWidth < 1024) {
    homeAnimation = anime({
        targets: [changeContainer, document.querySelectorAll('.homeTextMob')],
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
} else {
    homeAnimation = anime({
        targets: [changeContainer, document.querySelectorAll('.homeText')],
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
}


const home = document.getElementById('home');
const homeEye = document.querySelector('#home .circle');
const salesEye = document.querySelector('#sales .circle');
const aboutEye = document.querySelector('#about-us .circle');
const firstSvg = document.getElementById('svg1');

const salesContainer = document.getElementById('sales');
const sales = document.querySelector('#sales div');
const salesTitles = sales.querySelectorAll('h1');
const salesButton = sales.querySelector('button')
let salesHeadings = sales.querySelectorAll('.heading');
if (window.innerWidth < 1024) salesHeadings = salesContainer.querySelectorAll('.headingMob');

// -------- Sales Animation -------- //

const typingText = document.querySelector('#sales .typing');

  typingText.innerHTML = typingText.textContent.split(' ').map(function(word) {
    if (word == 'WEB-DEVELOPMENT' || word == 'ВЕБ-РАЗРАБОТКА') return "<div class='letter word accent cursour-button'>" + word + " </div>";
    if (word == 'BRANDING' || word == 'БРЕНДИНГ,') return "<div class='letter word accent cursour-button'>" + word + " </div>";
    if (word == 'MARKETING' || word == 'МАРКЕТИНГ') return "<div class='letter word accent cursour-button'>" + word + " </div>";

    return "<span class='letter'>" + word + "</span>";
}).join(' ');

const typingTimeline = anime.timeline({
    easing: 'easeOutQuad',
    autoplay: false,
    duration: 1000,
});

cursourButtons = document.querySelectorAll('.cursour-button');

cursourButtons.forEach(button => {
    button.addEventListener('mouseover', enterCursour);
    button.addEventListener('mouseout', exitCursour);
})

//Exit Timeline

const exitTimeline = anime.timeline({
    easing: 'easeOutQuad',
    autoplay: false,
});

exitTimeline
.add({
    targets: typingText.querySelectorAll('.letter'),
    opacity: (el) => {
        if (el.classList.contains('word')) return [1, 1];
        return [1, 0];
    },
    rotate: function(el, i) {
        return anime.random(-5, 5)
      },
      translateY: () => {
        return [0, anime.random(-10, -20)]
      },
      translateX: () => {
        return anime.random(-50, 50)
      },
})
.add ({
    targets: salesHeadings,
    opacity: 0,
    rotate: function(el, i) {
        return -5 + (10 * i);
    },
    marginBottom: function(el, i) {
        return 50 + (-10 * i);
    },
}, 0);

const exitAnimation = anime({
    targets: typingText.querySelectorAll('.letter'),
    opacity: (el) => {
        if (el.classList.contains('word')) return [1, 1];
        return [1, 0];
    },
    rotate: function(el, i) {
        return anime.random(-5, 5)
      },
      translateY: () => {
        return [0, anime.random(-10, -20)]
      },
      translateX: () => {
        return anime.random(-50, 50)
      },
      easing: 'easeOutQuad',
      autoplay: false,
});

//Typing Timeline

typingTimeline
.add({
    targets: typingText.querySelectorAll('.letter'),
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

//Heading animation

const headingAnimation = anime({
    targets: salesHeadings,
    translateX: (el) => {
        if (el.classList.contains('left')) return ['-30%', 0];
        return ['30%', 0];
    },
    delay: anime.stagger(290),
    easing: 'easeOutQuad',
    autoplay: false
});

function scrollEvents() {
    let posY = window.scrollY;
    let amplifier = 4;

    if (window.innerWidth < 1024) amplifier = 1;

    headingAnimation.seek(((salesContainer.getBoundingClientRect().top / salesContainer.clientHeight * amplifier * -1) + 1) * headingAnimation.duration)

    if (home.getBoundingClientRect().bottom > window.innerHeight / 100 * 10) {
        homeAnimation.seek((posY / (home.clientHeight - (window.innerHeight / 100 * 10))) * homeAnimation.duration);
        homeEye.style.display = 'block';
        homeEye.style.transform = 'translate(-50%, -50%) scale(' + (1 - posY / home.clientHeight) + ')';
        salesEye.classList.remove('active');
    } else { homeEye.style.transform = 'translate(-50%, -50%) scale(0)'; homeEye.style.display = 'none'; salesEye.classList.add('active');}

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
        exitTimeline.seek(((salesContainer.getBoundingClientRect().top / salesContainer.clientHeight * -1 - .65) * 2.5) * exitAnimation.duration);
    }

    if (sales.getBoundingClientRect().top * -1 > window.innerHeight / 3) { salesButton.classList.add('bottom'); salesEye.classList.remove('active');}
    else if (sales.getBoundingClientRect().top < 0) { salesButton.classList.add('active'); salesButton.classList.remove('bottom'); }
}

window.addEventListener('scroll', scrollEvents);


// -------- Portfolio Animation -------- //

const portfolio = document.getElementById('portfolio')
const portfolioWrapper = portfolio.querySelector('div');
const plans = portfolio.querySelectorAll('.plan');

function movePlans(event) {
    let moveX = event.clientX / window.innerWidth - .5;
    let moveY = event.clientY / window.innerHeight - .5;

    plans[2].style.transform = 'translate(' + moveX * 10 + '%, ' + moveY * 10 + '%)';
    plans[1].style.transform = 'translate(' + moveX * 7 + '%, ' + moveY * 7 + '%)';
    plans[0].style.transform = 'translate(' + moveX * 5 + '%, ' + moveY * 5 + '%)';
}

portfolioWrapper.addEventListener('mousemove', movePlans);

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
});

portfolioObserver.observe(portfolioText);

const textSwitch = portfolio.querySelector('.carousell');
const portfolioSpace = portfolio.querySelector('.space');

function switchWords() {
    let percent = portfolioWrapper.offsetTop / window.innerHeight;
    if (percent > .75) {
        portfolioSpace.classList.add('active');
        textSwitch.classList.add('active');
    } else {
        portfolioSpace.classList.remove('active');
        textSwitch.classList.remove('active');
    }    
}

window.addEventListener('scroll', switchWords);

// -------- About Us -------- //

const aboutUs = document.getElementById('about-us');
const box = aboutUs.querySelector('div');
const scrollBox = aboutUs.querySelector('.scroll');
const aboutUsHeading = aboutUs.querySelector('.heading');
const aboutUsText = aboutUs.querySelectorAll('.text');

const aboutEyeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            aboutUsHeading.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    })
});

aboutEyeObserver.observe(aboutEye);

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
    targets: aboutUsText[0],
    translateX: ['-100%', 0],
    duration: 400
}, 0)
.add({
    targets: aboutUs.querySelectorAll('.two'),
    translateY: ['-20%', 0],
    translateX: ['30%', 0],
    rotate: [35, 0],
}, 400)
.add({
    targets: aboutUsText[1],
    translateX: ['-100%', 0],
    duration: 400
}, 800)
.add({
    targets: aboutUs.querySelectorAll('.three'),
    translateY: ['50%', 0],
    translateX: ['20%', 0],
    rotate: [-25, 0],
}, 800)
.add({
    targets: aboutUsText[2],
    translateX: ['-100%', 0],
    duration: 400
}, 1800)
.add({
    targets: aboutUs.querySelectorAll('.four'),
    translateY: ['-150%', 0],
    translateX: ['-60%', 0],
    rotate: [25, 0],
}, 1200);

function moveBox() {
    const cord = box.offsetTop;
    scrollBox.style.transform = `translateX(-${cord}px)`;

    const percent = cord / (aboutUs.clientHeight - window.innerHeight);
    aboutUsTimeline.seek(percent * aboutUsTimeline.duration);
    if (percent >= .9 ) {
        logo.classList.add('active');
        languages.classList.add('hide');
    } else if (window.innerWidth > 1024) {
        logo.classList.remove('active');
        languages.classList.remove('hide');
    }
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
});

// About Us Mobile Carousell

const carousell = document.querySelector('.carousell');
const widthPanel = carousell.querySelector('.first');
const panels = carousell.querySelectorAll('.panel');
let panelCircles = document.querySelectorAll('#about-us-mobile .circle');

let panelIndex = 3;
panels[panelIndex].classList.add('active');
carousell.style.transform = 'translateX(' + panelIndex * -findWidth() + 'px)';

let moving;

function findWidth() {
    var style = widthPanel.currentStyle || window.getComputedStyle(widthPanel);
    return width = widthPanel.clientWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight) + parseFloat(style.borderLeft) + parseFloat(style.borderRight);
}

function moveRight() {
    if (moving) return;

    const width = findWidth();
    carousell.classList.remove('active');
    panelIndex++;


    if (panelIndex == panels.length - 2) {
        moving = true;

        panels[panelIndex - 1].classList.remove('active');
        panels[panelIndex].classList.add('active');
        carousell.style.transform = 'translateX(' + panelIndex * -width + 'px)';

        panelIndex = 3;
        panels[panelIndex].classList.add('active');

        setTimeout(() => {
            panels[panels.length - 2].classList.remove('active');
            carousell.classList.add('active');
            carousell.style.transform = 'translateX(' + panelIndex * -width + 'px)';
            moving = false;
        }, 500);
        return;
    }
    moving = true;

    setTimeout(() => {
        moving = false;
    }, 550);

    panels[panelIndex - 1].classList.remove('active');
    panels[panelIndex].classList.add('active');
    carousell.style.transform = 'translateX(' + panelIndex * -width + 'px)';
}

function moveLeft() {
    if (moving) return;

    const width = findWidth();
    carousell.classList.remove('active');
    panelIndex--;

    if (panelIndex == 1) {
        moving = true;

        panels[panelIndex + 1].classList.remove('active');
        panels[panelIndex].classList.add('active');
        carousell.style.transform = 'translateX(' + panelIndex * -width + 'px)';

        panelIndex = 4;
        panels[panelIndex].classList.add('active');

        setTimeout(() => {
            panels[1].classList.remove('active');
            carousell.classList.add('active');
            carousell.style.transform = 'translateX(' + panelIndex * -width + 'px)';
            moving = false;
        }, 500);
        return;
    }
    moving = true;

    setTimeout(() => {
        moving = false;
    }, 550);

    panels[panelIndex + 1].classList.remove('active');
    panels[panelIndex].classList.add('active');
    carousell.style.transform = 'translateX(' + panelIndex * -width + 'px)';
}

const leftArrows = document.querySelectorAll('#about-us-mobile .arrow.left');
const rightArrows = document.querySelectorAll('#about-us-mobile .arrow.right');

leftArrows.forEach(arrow => {
    arrow.addEventListener('click', moveLeft);
});

rightArrows.forEach(arrow => {
    arrow.addEventListener('click', moveRight);
})

let panelStartX = 0, panelDist = 0;

function touchStart(e) {
    let touchobj = e.changedTouches[0];
    panelStartX = parseInt(touchobj.clientX);
}

function touchMove(e) {
    let touchobj = e.changedTouches[0];
    panelDist = parseInt(touchobj.clientX) - panelStartX;

}

function touchEnd() {
    if (panelDist > 50) {
        moveLeft();
     } else if (panelDist < -50) {
        moveRight();
     }
     panelDist = 0;
}

panels.forEach (panel => {
    panel.addEventListener('touchstart', touchStart);
    panel.addEventListener('touchmove', touchMove);
    panel.addEventListener('touchend', touchEnd);
});


// -------- Contact Us -------- //

const contactUs = document.getElementById('contact-us');
let contactHeadings = contactUs.querySelectorAll('.heading');
if (window.innerWidth < 1024) contactHeadings = contactUs.querySelectorAll('.headingMob');
const contactButton = contactUs.querySelector('button');
const contactText = contactUs.querySelector('p');
const contactEye = contactUs.querySelector('.circle');

const contactAnimation = anime({
    targets: contactHeadings,
    translateX: (el) => {
        if (el.classList.contains('left')) return ['-20%', 0];
        return ['20%', 0];
    },
    delay: anime.stagger(290),
    easing: 'easeOutQuad',
    autoplay: false
});

aboutEyeObserver.observe(contactEye);

function animateContacts() {
    let percent = contactUs.getBoundingClientRect().top / (window.innerHeight * .8) * -1 + 1;
    contactAnimation.seek(percent * contactAnimation.duration);
}

window.addEventListener('scroll', animateContacts);

const footerObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            contactText.classList.add('active');
            setTimeout(() => {
                contactButton.classList.add('active');
            }, 300);
        } else {
            contactButton.classList.remove('active');
            contactText.classList.remove('active');
        }
    })
});

footerObserver.observe(contactText);

const contactPupil = document.querySelector('#contact-us .pupil');

window.addEventListener('mousemove', (event) => {
    let offsetX = 35, offsetY = 33, mult = 40;

    if (window.innerWidth >= 1024) {
        offsetX = 42;
        offsetY = 38;
        mult = 30;
    }

    let x = event.clientX * mult / window.innerWidth + offsetX + "%";
    let y = event.clientY * mult / window.innerHeight + offsetY + "%";

    contactPupil.style.left = x;
    contactPupil.style.top = y;
});

// -------- Cursour Buttons -------- //

salesButton.addEventListener('mouseover', () => {
    cursor.classList.add('active');
    cursor.querySelector('#offer').classList.add('active');
});
salesButton.addEventListener('mouseout', () => {
    cursor.classList.remove('active');
    cursor.querySelector('#offer').classList.remove('active');
});

const portfolioButton = portfolio.querySelector('button');

portfolioButton.addEventListener('mouseover', () => {
    cursor.classList.add('active');
    cursor.querySelector('#projects').classList.add('active');
});
portfolioButton.addEventListener('mouseout', () => {
    cursor.classList.remove('active');
    cursor.querySelector('#projects').classList.remove('active');
});

contactButton.addEventListener('mouseover', () => {
    cursor.classList.add('active');
    cursor.querySelector('#contact-text').classList.add('active');
});
contactButton.addEventListener('mouseout', () => {
    cursor.classList.remove('active');
    cursor.querySelector('#contact-text').classList.remove('active');
});

const homeButton = document.getElementById('home-button');

homeButton.addEventListener('click', () => {
    salesContainer.scrollIntoView();
})