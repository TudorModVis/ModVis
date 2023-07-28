const servicesButtons = document.querySelectorAll('.service');

function activateService(event) {
    event.currentTarget.classList.toggle('active');
}

servicesButtons.forEach(button => {
    button.addEventListener('click', activateService);
});

// -------- Menu -------- //
const lang = document.getElementById('lang');

const header = document.querySelector('header');
function openMenu() {
    menu.classList.toggle('active');
    document.body.classList.toggle('active');

    lineOne.classList.toggle('line-cross');
    lineTwo.classList.toggle('line-fade-out');
    lineThree.classList.toggle('line-cross');

    if (menu.classList.contains('active')) {
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

const sumbit = document.querySelector('#submit');

function sendMessage(event) {
    event.preventDefault();

    let name = document.querySelector("#name").value;
    let tel = document.querySelector("#tel").value;
    let email = document.querySelector('#email').value;
    let detalii = document.querySelector('#detalii').value;
    let phoneNumber = 37369150744;

    let url = "https://wa.me/" + phoneNumber + "?text="
    + 'Здравствуйте! Меня зовут, ' + name + '. ' + 'Услуги, которые меня интересуют:';

    servicesButtons.forEach(button => {
        if (button.classList.contains('active')) url += ' ' + button.textContent;
    })

    url += '. Мой номер телефона: ' + tel + '. Электронная почта: ' 
    + email + '. Детали моего проекта: ' + detalii;

    console.log(url);

    window.open(url,'_blank').focus();
}

sumbit.addEventListener('click', sendMessage);

// -------- Loading -------- //
const loadingScreens = document.querySelector('.loading');
if (window.innerWidth >= 1024) {
    document.body.style.overflow = 'hidden';
  }

function stopLoading() {
    setTimeout(() => {
        anime({
            targets: loadingScreens,
            opacity: 0,
            complete: () => {
                document.body.style.overflow = 'auto';
                loadingScreens.style.display = 'none';
            },
            easing: 'easeInOutQuad',
            duration: 800
        });
    }, 2800);
}

window.addEventListener('load', stopLoading);