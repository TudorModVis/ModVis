// -------- FullPage Specification -------- //

const header = document.querySelector('header');
const iarba = document.querySelector('#iarba');
const house = document.querySelector('#house');
const circleLeft = document.querySelector('#circle-left');
const circleRight = document.querySelector('#circle-right');
const logo = document.getElementById('logo');

const socialMenu = document.querySelector('.social-menu');

const page = new fullpage('#fullpage', {
    navigation: true,
    navigationPosition: 'left',
    navigationTooltips: ['ГЛАВНАЯ', 'УСЛУГИ', 'КОЛЛАБОРАЦИЯ', 'ПРОЕКТЫ', 'КЛИЕНТЫ'],
    showActiveTooltip: true,
    licenseKey: 'gplv3-license',
    responsiveWidth: 1024,
    verticalCentered: false,
    onLeave: function(origin, destination, direction, trigger){
        if (destination.index == 4) {
            anime({
                targets: socialMenu,
                opacity: 0,
                easing: 'easeOutQuad',
                duration: 300,
                complete: () => {
                    socialMenu.style.display = 'none';
                }
            });
        }

        if (origin.index == 4) {
            socialMenu.style.display = 'block';
            anime({
                targets: socialMenu,
                opacity: 1,
                easing: 'easeOutQuad',
                duration: 300,
            });
        }

        if (window.innerWidth <= 1024) return;

        if (origin.index == 0) {
            header.classList.add('alt');
            iarba.classList.add('open');
            house.classList.add('open');
            logo.src = '../images/logo.webp';
            navigationSpan.forEach(nav => nav.classList.add('white'));
            navigationText.forEach(nav => nav.classList.add('white'));

            circleLeft.style.left = '-10vw';
            circleLeft.style.bottom = '-25vh';

            circleRight.style.right = '-10vw';
            circleRight.style.top = '10vh';
        }

        if (destination.index == 0) {
            header.classList.remove('alt');
            iarba.classList.remove('open');
            house.classList.remove('open');

            circleLeft.style.left = '-50vw';
            circleRight.style.right = '-50vw';
            logo.src = '../images/logo-negru.webp';
            navigationSpan.forEach(nav => nav.classList.remove('white'));
            navigationText.forEach(nav => nav.classList.remove('white'));
        }

        if (destination.index == 1) {
            showService();
        }

        if (destination.index == 3) {
            anime({
                targets: '#surface',
                innerHTML: [8000, 500000],
                round: 1,
                duration: 2000,
                easing: 'easeOutCubic',
                complete: function(anim) {
                    document.querySelector('#surface').innerHTML = '500 000';
                }
            });
            anime({
                targets: '#projects',
                innerHTML: [0, 1000],
                round: 1,
                duration: 2000,
                easing: 'easeOutCubic',
                complete: function(anim) {
                    document.querySelector('#projects').innerHTML += '+';
                }
            });
            anime({
                targets: '#years',
                innerHTML: [0, 20],
                round: 1,
                duration: 2700,
                easing: 'easeOutCubic'
            });
        }
	}
});

const navigationSpan = document.querySelectorAll('#fp-nav ul li a span');
const navigationText = document.querySelectorAll('#fp-nav ul li .fp-tooltip.fp-left');

// -------- Sponsor Carousell -------- //

const services = document.querySelectorAll('#service .service');

function showService() {
    anime({
        targets: services,
        opacity: [0, 1],
        translateY: [70, 0],
        delay: anime.stagger(200, {start: 250}),
        easing: 'easeOutSine',
        duration: 700
    });
}

// -------- Sponsor Carousell -------- //

const slider = document.querySelector('.partners');
const circle = document.querySelector('#sponsors .circle');

let isDown = false, startX, scrollLeft, xp = 0, yp = 0, mouseX = 0, mouseY = 0;

function end() {
    isDown = false;
    beginMomentumTracking();
    slider.classList.remove('active');
}

function mouseLeave() {
    isDown = false;
    beginMomentumTracking();
    slider.classList.remove('active');
    circle.classList.remove('active');
    circle.classList.add('close');
}

function start(event) {
    isDown = true;
    startX = event.pageX || event.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    slider.classList.add('active');
    cancelMomentumTracking();
}

function move(event) {
    mouseX = event.pageX - 25;
    mouseY = event.pageY - 25; 

    if (!isDown) return;

    let x = event.pageX || event.touches[0].pageX - slider.offsetLeft;
    let dist = (x - startX);
    let prevScrollLeft = slider.scrollLeft;
    slider.scrollLeft = scrollLeft - dist;
    velX = slider.scrollLeft - prevScrollLeft;
}

setInterval(() => {
    xp += ((mouseX - xp)/6);
    yp += ((mouseY - yp)/6);
    circle.style.left = xp + 'px';
    circle.style.top = yp + 'px';
}, 20);

// Momentum 
var velX = 0;
var momentumID;

function beginMomentumTracking() {
    cancelMomentumTracking();
    momentumID = requestAnimationFrame(momentumLoop);
}

function cancelMomentumTracking() {
    cancelAnimationFrame(momentumID);
}

function momentumLoop() {
    slider.scrollLeft += velX * 2;
    velX *= 0.95;
    if (Math.abs(velX) > 0.5) {
        momentumID = requestAnimationFrame(momentumLoop);
    }
}

slider.addEventListener('mousedown', start);
slider.addEventListener('touchstart', start);

slider.addEventListener('mousemove', move);
slider.addEventListener('touchmove', move);

slider.addEventListener('mouseleave', mouseLeave);
slider.addEventListener('mouseup', end);
slider.addEventListener('touchend', end);

function circleOn(event) {
    mouseX = event.pageX - 25;
    mouseY = event.pageY - 25; 
    circle.classList.add('active');
}

slider.addEventListener('mouseenter', circleOn);


// -------- Panel Carousell -------- //

const panelContainer = document.querySelector('#colab .carousell');
const mobilePanelContainer = document.querySelector('#colab .mobile');
let panelCircles = document.querySelectorAll('#colab .circle');

let panelIndex = 0;

function moveRight() {
    let tempContainer;
    if (window.innerWidth <= 1024) {
        tempContainer = mobilePanelContainer;
    } else {
        tempContainer = panelContainer;
    }

    let widthPanel = tempContainer.querySelector('.first');
    let panels = tempContainer.querySelectorAll('.panel');
    panelCircles = tempContainer.querySelectorAll('.circle');

    var style = widthPanel.currentStyle || window.getComputedStyle(widthPanel);
    const width = widthPanel.clientWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight) + parseFloat(style.borderLeft) + parseFloat(style.borderRight);
    panelIndex++;

    if (panelIndex >= panels.length) {
        panelIndex--;
        return;
    }
    tempContainer.style.transform = 'translateX(' + panelIndex * -width + 'px)';
}

function moveLeft() {
    let tempContainer;
    if (window.innerWidth <= 1024) {
        tempContainer = mobilePanelContainer;
    } else {
        tempContainer = panelContainer;
    }

    let widthPanel = tempContainer.querySelector('.first');
    panelCircles = tempContainer.querySelectorAll('.circle');

    var style = widthPanel.currentStyle || window.getComputedStyle(widthPanel);
    const width = widthPanel.clientWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight) + parseFloat(style.borderLeft) + parseFloat(style.borderRight);
    panelIndex--;

    if (panelIndex < 0) {
        panelIndex = 0;
        return;
    }

    tempContainer.style.transform = 'translateX(' + panelIndex * -width + 'px)';
}

const leftArrows = document.querySelectorAll('#colab .arrow.left');
const rightArrows = document.querySelectorAll('#colab .arrow.right');

leftArrows.forEach(arrow => {
    arrow.addEventListener('click', moveLeft);
});

rightArrows.forEach(arrow => {
    arrow.addEventListener('click', moveRight);
})

function cirlceMove(event) {
    let tempContainer;
    if (window.innerWidth <= 1024) {
        tempContainer = mobilePanelContainer;
    } else {
        tempContainer = panelContainer;
    }

    let panels = tempContainer.querySelectorAll('.panel');
    panelCircles = panels[panelIndex].querySelectorAll('.circle');
    let widthPanel = tempContainer.querySelector('.first');

    var style = widthPanel.currentStyle || window.getComputedStyle(widthPanel);
    const width = widthPanel.clientWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight) + parseFloat(style.borderLeft) + parseFloat(style.borderRight);

    for (let i = 0; i < panelCircles.length; i++) {
        if (panelCircles[i].isEqualNode(event.target)) {
            panelIndex = i;
            tempContainer.style.transform = 'translateX(' + panelIndex * -width + 'px)';
            return;
        }
    }
}

panelCircles.forEach (circle => {
    circle.addEventListener('click', cirlceMove);
});

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

const mobilePanels = mobilePanelContainer.querySelectorAll('.panel');

mobilePanels.forEach (panel => {
    panel.addEventListener('touchstart', touchStart);
    panel.addEventListener('touchmove', touchMove);
    panel.addEventListener('touchend', touchEnd);
});

let dragStartX = 0;

function dragStart(event) {
    dragStartX = parseInt(event.clientX);
}

function dragEnd(event) {
    let distance = parseInt(event.clientX - dragStartX);

    if (distance > 50) {
        moveLeft();
     } else if (distance < -50) {
        moveRight();
     }
}

const pcPanels = panelContainer.querySelectorAll('.panel');

pcPanels.forEach(panel => {
    panel.addEventListener('mousedown', dragStart);
    panel.addEventListener('mouseup', dragEnd);
})

// -------- Menu -------- //
const lang = document.getElementById('lang');

function openMenu() {
    menu.classList.toggle('active');

    lineOne.classList.toggle('line-cross');
    lineTwo.classList.toggle('line-fade-out');
    lineThree.classList.toggle('line-cross');

    if (menu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';

        logo.src = '../images/logo.webp';
        header.classList.toggle('menu');
        setTimeout(() => {
            anime({
                targets: menuLinks,
                translateX: [100, 0],
                duration: 1500,
                opacity: 1,
                delay: anime.stagger(100)
            });
        }, 400);
        lang.style.display = 'block';
        anime({
            targets: lang,
            opacity: 1,
            delay: 400
        });
    } else {
        anime({
            targets: lang,
            opacity: 0,
            duration: 200,
            complete: () => {
                lang.style.display = 'none';
            }
        });
        
        document.body.style.overflow = 'auto';

        closeSection();

        if (!header.classList.contains('mobile') && !header.classList.contains('alt')) logo.src = '../images/logo-negru.webp';
        setTimeout(() => { header.classList.toggle('menu'); }, 500)
        
        anime({
            targets: menuLinks,
            translateX: 100,
            duration: 1500,
            opacity: 0,
            delay: anime.stagger(100)
        });
    }
}

menuButton.addEventListener('click', openMenu);

const sectionLinks =  document.querySelectorAll('.sections a');

sectionLinks.forEach(link => {
    link.addEventListener("click", () => {
        openMenu();
    })
});

function closeSection() {
    const link = document.querySelector('.unfold');
    const arrow = link.querySelector('img');
    const sections = link.nextElementSibling;
    const items = sections.querySelectorAll('a');

    arrow.classList.remove('open');

    anime.remove(items);
    anime({
      targets: items,
      opacity:0,
      duration: 200,
      easing: 'easeOutCubic',
      complete: () => {
          sections.classList.remove('open');
      }
    });
    anime({
      targets: sections,
      height: 0,
      duration: 400,
      easing: 'easeOutCubic',
      complete() {
      }
    });
}

// -------- Scroll Mobile -------- //

const serviceSection = document.querySelector('#service');

function scrollMobile() {
    if (window.innerWidth > 1023) return;

    if (serviceSection.getBoundingClientRect().top < 10) {
        circleLeft.style.left = '-150px';
        circleRight.style.right = '-150px';
        header.classList.add('mobile');
        logo.src = '../images/logo.webp';
    }
    else {
        circleLeft.style.left = '-350px';
        circleRight.style.right = '-350px';
        header.classList.remove('mobile');
        logo.src = '../images/logo-negru.webp';
    }
} 

window.addEventListener('scroll', scrollMobile);

// -------- Loading -------- //
const loadingScreens = document.querySelector('.loading');
if (window.innerWidth >= 1024) {
    document.body.style.overflow = 'hidden';
    fullpage_api.setAllowScrolling(false);
  }

function stopLoading() {
    setTimeout(() => {
        anime({
            targets: loadingScreens,
            opacity: 0,
            complete: () => {
                fullpage_api.setAllowScrolling(true);
                document.body.style.overflow = 'auto';
                loadingScreens.style.display = 'none';
            },
            easing: 'easeInOutQuad',
            duration: 800
        });
    }, 2800);
}

window.addEventListener('load', stopLoading);