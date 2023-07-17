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
    if (word == 'WEBSITE,') return "<span class='relative word hover:z-20 cursor-pointer accent'> <div class='font-bold inline'>" + word + " </div> <img src='images/HOME/SALES/word.jpg' class='absolute left-0 top-0 z-[-1] pointer-events-none max-w-none h-[10rem]'> </span>";
    if (word == 'BRAND,') return "<span class='relative word z-10 cursor-pointer accent'> <div class='font-bold inline'>" + word + " </div> <img src='images/HOME/SALES/word.jpg' class='absolute left-0 top-0 z-[-1] pointer-events-none max-w-none h-[10rem]'> </span>";
    if (word == 'PR.') return "<span class='relative word z-10 cursor-pointer accent'> <div class='font-bold inline'>" + word + " </div> <img src='images/HOME/SALES/word.jpg' class='absolute left-0 top-0 z-[-1] pointer-events-none max-w-none h-[10rem]'> </span>";

    return "<span class='letter'>" + word + "</span>";
}).join(' ');

const highlightedWords = document.querySelectorAll('#sales .word');
let highlightImage;

function enterTextImage(event) {
    highlightImage = event.currentTarget.querySelector('img');
    highlightImage.classList.add('active');
}

function exitTextImage(event) {
    highlightImage.classList.remove('active');
}

function moveTextImage(event) {
    let rect = event.currentTarget.getBoundingClientRect();
    
    highlightImage.style.left = event.clientX - rect.left + 'px';
    highlightImage.style.top = event.clientY - rect.top + 'px';
}

highlightedWords.forEach(word => {
    word.addEventListener('mouseenter', enterTextImage);
    word.querySelector('div').addEventListener('mousemove', moveTextImage);
    word.addEventListener('mouseleave', exitTextImage);
})

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
.add({
    targets: typingText[0].querySelectorAll('span'),
    opacity: [1, 0],
    rotate: function(el, i) {
        return anime.random(-5, 5)
      },
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
    } else { homeEye.style.scale = 0; homeEye.style.display = 'none'; salesEye.classList.add('active');}

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

    if (sales.getBoundingClientRect().top * -1 > window.innerHeight / 3) { salesButton.classList.add('bottom'); salesEye.classList.remove('active');}
    else if (sales.getBoundingClientRect().top < 0) { salesButton.classList.add('active'); salesButton.classList.remove('bottom'); }
}

window.addEventListener('scroll', scrollEvents);


// -------- Portfolio Animation -------- //

const portfolio = document.getElementById('portfolio')
const portfolioWrapper = portfolio.querySelector('div');
const plans = portfolio.querySelectorAll('.plan');

function movePlans(event) {
    let moveX = event.clientX / window.innerWidth;
    let moveY = event.clientY / window.innerHeight;

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
const aboutUsHeading = aboutUs.querySelector('.heading');
const aboutUsText = aboutUs.querySelectorAll('.text');

const aboutEyeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    })
});

// aboutUsText.forEach(text => aboutEyeObserver.observe(text));
aboutEyeObserver.observe(aboutEye);
aboutEyeObserver.observe(aboutUsHeading);

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
});


// -------- Contact Us -------- //

const contactUs = document.getElementById('contact-us');
const contactHeadings = contactUs.querySelectorAll('img');
const contactButton = contactUs.querySelector('button');
const contactText = contactUs.querySelector('p');
const contactEye = contactUs.querySelector('.circle');

const contactAnimation = anime({
    targets: contactHeadings,
    translateX: (el) => {
        if (el.classList.contains('left')) return ['-30%', 0];
        return ['30%', 0];
    },
    delay: anime.stagger(290),
    easing: 'easeOutQuad',
    autoplay: false
});

aboutEyeObserver.observe(contactEye);

function animateContacts() {
    let percent = contactUs.getBoundingClientRect().top / (window.innerHeight * 1.2) * -1 + .75;
    console.log(percent);
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

// -------- Footer -------- //

const footer = document.querySelector('footer');
const footerLogo = document.getElementById('footer-logo');
const footerEye = document.querySelector('.footer .circle');

const footerAnim = anime({
    targets: footerLogo,
    autoplay: false,
    translateY: [100, 0],
    easing: 'easeOutQuad',
});


function animateFooter() {
    let percent = Math.abs(footer.getBoundingClientRect().bottom - window.innerHeight) / footer.clientHeight;
    footerAnim.seek((1 -percent) * footerAnim.duration);

    if (percent < .4) footerEye.classList.add('active'); else footerEye.classList.remove('active')
}

window.addEventListener('scroll', animateFooter);