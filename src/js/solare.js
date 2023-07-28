// -------- FullPage Specification -------- //

const header = document.querySelector('header');
const iarba = document.querySelector('#iarba');
const house = document.querySelector('#house');
const circleLeft = document.querySelector('#circle-left');
const circleRight = document.querySelector('#circle-right');
const logo = document.getElementById('logo');
const adLines = document.querySelectorAll('.adv-line');

const socialMenu = document.querySelector('.social-menu');

const page = new fullpage('#fullpage', {
    navigation: true,
    navigationPosition: 'left',
    navigationTooltips: ['ACASĂ', 'SERVICII', 'AVANTAJE', 'PROCESUL', 'PROIECTE'],
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
            logo.src = '../images/SOLARE/logo-alb.webp';
            iarba.classList.add('open');
            house.classList.add('open');
            navigationSpan.forEach(nav => nav.classList.add('white'));
            navigationText.forEach(nav => nav.classList.add('white'));

            circleLeft.style.left = '-10vw';
            circleLeft.style.bottom = '-25vh';

            circleRight.style.right = '-10vw';
            circleRight.style.top = '10vh';
        }

        if (destination.index == 0) {
            header.classList.remove('alt');
            logo.src = '../images/SOLARE/logo-black.webp';
            iarba.classList.remove('open');
            house.classList.remove('open');
            navigationSpan.forEach(nav => nav.classList.remove('white'));
            navigationText.forEach(nav => nav.classList.remove('white'));

            circleLeft.style.left = '-50vw';
            circleRight.style.right = '-50vw';
        }

        if (destination.index == 1) {
          showWorkers();
        }

        if (destination.index == 2) {
            adLines.forEach(line => {
              line.classList.add('active');
            });
        }

        if (origin.index == 2) {
          adLines.forEach(line => {
            line.classList.remove('active');
          });
        }

        if (destination.index == 3) {
          showSteps();
        }
	}
});

const navigationSpan = document.querySelectorAll('#fp-nav ul li a span');
const navigationText = document.querySelectorAll('#fp-nav ul li .fp-tooltip.fp-left');

// -------- Smooth -------- //

const steps = document.querySelectorAll('.steps div');

function showSteps() {
  anime({
    targets: steps,
    opacity: [0, 1],
    translateX: [-50, 0],
    duration: 300,
    easing: 'easeOutSine',
    delay: anime.stagger(150, {start: 400})
  });
}

const serviceWorkers = document.querySelectorAll('#colab .image');

function showWorkers() {
  anime({
    targets: serviceWorkers,
    opacity: [0, .5],
    translateY: [100, 0],
    easing: 'easeOutSine',
    delay: anime.stagger(300),
    duration: 700
  })
}

// -------- Scroll Mobile -------- //

const serviceSection = document.querySelector('#colab');

function scrollMobile() {
    if (window.innerWidth > 1023) return;

    if (serviceSection.getBoundingClientRect().top < 10) {
        circleLeft.style.left = '-150px';
        circleRight.style.right = '-150px';
        header.classList.add('mobile');
        logo.src = '../images/SOLARE/logo-alb.webp';
    }
    else {
        circleLeft.style.left = '-350px';
        circleRight.style.right = '-350px';
        header.classList.remove('mobile');
        logo.src = '../images/SOLARE/logo-black.webp';
    }
} 

window.addEventListener('scroll', scrollMobile);

// -------- Panel Carousell Mobile -------- //

const mobilePanelContainer = document.querySelector('#colab .mobile');
let panelCircles = document.querySelectorAll('#colab .circle');
let panelStartX = 0, panelDist = 0, panelIndex = 0;

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

function moveRight() {
  let tempContainer;
  tempContainer = mobilePanelContainer;

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
  tempContainer = mobilePanelContainer;

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
  tempContainer = mobilePanelContainer;

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


// -------- Menu -------- //

const lang = document.getElementById('lang');
function openMenu() {
  menu.classList.toggle('active');

  lineOne.classList.toggle('line-cross');
  lineTwo.classList.toggle('line-fade-out');
  lineThree.classList.toggle('line-cross');

  if (menu.classList.contains('active')) {
    document.body.style.overflow = 'hidden';

    logo.src = '../images/SOLARE/logo-alb.webp';
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

      if (!header.classList.contains('mobile') && !header.classList.contains('alt')) logo.src = '../images/SOLARE/logo-black.webp';
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

menuButton.addEventListener('click', openMenu);

const sectionLinks =  document.querySelectorAll('.sections a');

sectionLinks.forEach(link => {
    link.addEventListener("click", () => {
        openMenu();
    })
});

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