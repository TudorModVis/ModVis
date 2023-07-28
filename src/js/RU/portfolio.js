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


// -------- Projects Selector -------- //
const projects = [{
    titlu: 'Forward International - Холодное хранение',
    localitate: 'Chișinău',
    suprafata: '16.000 m2',
    anul: 2021
},
{
    titlu: 'Частный дом - 11 kw',
    localitate: 'Schinoasa',
    suprafata: '11 kW',
    anul: 2023
},
{
    titlu: 'Sun City - Коммерческое строительство',
    localitate: 'Chișinău',
    suprafata: '1.500 m2',
    anul: 2020
},
{
    titlu: 'Agropiese TGR - Коммерческое строительство',
    localitate: 'Bălți',
    suprafata: '5.000 m2',
    anul: 2007
},
{
    titlu: 'Холодильный склад для хранения фруктов - 60kW',
    localitate: 'Balțata',
    suprafata: '60 kW',
    anul: 2022
},
{
    titlu: 'Центр Молодежи и Спорта - Спортивный комплекс',
    localitate: 'Căușeni',
    suprafata: '6.000 m2',
    anul: 2013
},
{
    titlu: 'NANU Market - Коммерческое строительство и Склад',
    localitate: 'Chișinău',
    suprafata: '8.000 m2',
    anul: 2011
},
{
    titlu: 'Частный дом - 10kW',
    localitate: 'Dumbrava',
    suprafata: '10 kW',
    anul: 2023
},
{
    titlu: 'Cegoltar - Коммерческое строительство и Склад',
    localitate: 'Chișinău',
    suprafata: '4.000 m2',
    anul: 2020
},
{
    titlu: 'Частный дом - 7 kW',
    localitate: 'Anenii Noi',
    suprafata: '7 kW',
    anul: 2023
},
{
    titlu: 'Cap-Cap - Коммерческое строительство и Шоу-рум',
    localitate: 'Chișinău',
    suprafata: '3.000 m2',
    anul: 2018
},
{
    titlu: 'Megapolis - Коммерческое строительство',
    localitate: 'Chișinău',
    suprafata: '200 m2',
    anul: 2010
},
{
    titlu: 'Центральная площадь в Căușeni - Коммерческое строительство',
    localitate: 'Căușeni',
    suprafata: '3.000 m2',
    anul: 2018
},
{
    titlu: 'Teraru Auto Serive - Автомойка с Сервисом',
    localitate: 'Chișinău',
    suprafata: '1.000 m2',
    anul: 2019
},
{
    titlu: 'Коммерческое строительство ул. Igor Vieru',
    localitate: 'Chișinău',
    suprafata: '2.000 m2',
    anul: 2012
},
{
    titlu: 'Фабрика зажигалок - Производственное помещение со Складом',
    localitate: 'Porumbeni',
    suprafata: '4.500 m2',
    anul: 2015
},
{
    titlu: 'Avicola Floreni - Птицефабрики',
    localitate: 'Floreni',
    suprafata: '20.000 m2',
    anul: 2017
},
{
    titlu: 'Производство металлических изделий со Складом',
    localitate: 'Ialoveni',
    suprafata: '2.000 m2',
    anul: 2018
},
{
    titlu: 'Склад с Офисным комплексом ул. Uzinelor',
    localitate: 'Chișinău',
    suprafata: '1.200 m2',
    anul: 2014
},
{
    titlu: 'Tronex-Com - Коммерческое строительство',
    localitate: 'Chișinău',
    suprafata: '2.500 m2',
    anul: 2013
},
{
    titlu: 'Benett-Auto Group - Автосервис со Складом',
    localitate: 'Sîngera',
    suprafata: '4.000 m2',
    anul: 2010
},
{
    titlu: 'Автомойка с Сервисом',
    localitate: 'Nisporeni',
    suprafata: '1.800 m2',
    anul: 2018
},
{
    titlu: 'Cheton Grup - Завод по производству красок',
    localitate: 'Chișinău',
    suprafata: '4.000 m2',
    anul: 2017
},
{
    titlu: 'Garduri.MD - Завод по производству сеток и заборов',
    localitate: 'Chișinău',
    suprafata: '1.300 m2',
    anul: 2017
},
{
    titlu: 'Холодильный склад ул. Varnița',
    localitate: 'Chișinău',
    suprafata: '350 m2',
    anul: 2018
},
{
    titlu: 'Lapmol - Комплекс офисов и Холодный склад',
    localitate: 'Chișinău',
    suprafata: '3.500 m2',
    anul: 2015
},
{
    titlu: 'Автомойка с Сервисом',
    localitate: 'Căușeni',
    suprafata: '1.200 m2',
    anul: 2013
},
{
    titlu: 'Швейная фабрика, производство одежды',
    localitate: 'Vulcănești',
    suprafata: '4.000 m2',
    anul: 2012
},
{
    titlu: 'Garma Grup - Производственное помещение',
    localitate: 'Fîrlădeni',
    suprafata: '1.500 m2',
    anul: 2012
},]

const container = document.querySelector('.container');
let count = 0, n = 4, end = false;

function generateProjects() {
    for (let i = count; i < n; i++) {
        if (i % 2 == 0) {
            container.innerHTML += 
        `<div class="flex flex-col lg:flex-row justify-between lg:h-[55vh] gap-[20px] lg:gap-0 mb-[50px] lg:mb-[7vh]">
            <img src="../images/PORTFOLIO/p${i + 1}.webp" alt="" class="w-full lg:w-[38%] h-full object-cover rounded-2xl">
            <div class="w-full lg:w-[18%] h-full flex lg:flex-col justify-between">
                <img src="../images/PORTFOLIO/p${i + 1} 1.webp" alt="" class="lg:h-[48%] w-[48%] lg:w-auto rounded-2xl">
                <img src="../images/PORTFOLIO/p${i + 1} 2.webp" alt="" class="lg:h-[48%] w-[48%] lg:w-auto rounded-2xl">
            </div>
            <div class="glass w-full lg:w-[40%] max-h-full text-[#f1f1f1]">
                <div class="panel w-full px-[20px] lg:px-[2.6vw] py-[20px] lg:py-[2.3vh] 2xl:py-[3.7vh] overflow-hidden flex flex-col lg:justify-between gap-[20px] lg:gap-0 max-h-full min-h-full">
                    <div class="circle-glass"></div>
                    <h3 class="text-2xl font-bold text-center lg:text-left">${projects[i].titlu}</h3>
                    <div>
                        <div class="flex justify-between mb-[2.3vh]">
                            <div>
                                <h3 class="font-bold text-2xl lg:text-base 2xl:text-xl mb-[20px] lg:mb-[2vh]">Город</h3>
                                <p class="text-xl lg:text-base">${projects[i].localitate}</p>
                            </div>
                            <img src="../images/PORTFOLIO/ICONS/suprafata.svg" alt="" class="h-[4.5vh]">
                        </div>
                        <div class="flex justify-between mb-[2.3vh]">
                            <div>
                                <h3 class="font-bold text-2xl lg:text-base 2xl:text-xl mb-[20px] lg:mb-[2vh]">Поверхность</h3>
                                <p class="text-xl lg:text-base">${projects[i].suprafata}</p>
                            </div>
                            <img src="../images/PORTFOLIO/ICONS/inaltime.svg" alt="" class="h-[4.5vh]">
                        </div>
                        <div class="flex justify-between">
                            <div>
                                <h3 class="font-bold text-2xl lg:text-base 2xl:text-xl mb-[20px] lg:mb-[2vh]">Год постройки</h3>
                                <p class="text-xl lg:text-base">${projects[i].anul}</p>
                            </div>
                            <img src="../images/PORTFOLIO/ICONS/calendar.svg" alt="" class="h-[4.5vh]">
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        } else {
            container.innerHTML += 
            `<div class="flex flex-col lg:flex-row justify-between lg:h-[55vh] gap-[20px] lg:gap-0 mb-[50px] lg:mb-[7vh]">
            <img src="../images/PORTFOLIO/p${i + 1}.webp" alt="" class="w-full lg:w-[38%] h-full object-cover rounded-2xl lg:hidden">
            <div class="w-full lg:w-[18%] h-full flex lg:flex-col justify-between lg:hidden">
                <img src="../images/PORTFOLIO/p${i + 1} 1.webp" alt="" class="lg:h-[48%] w-[48%] lg:w-auto rounded-2xl">
                <img src="../images/PORTFOLIO/p${i + 1} 2.webp" alt="" class="lg:h-[48%] w-[48%] lg:w-auto rounded-2xl">
            </div>
            <div class="glass w-full lg:w-[40%] max-h-full text-[#f1f1f1]">
                <div class="panel w-full px-[20px] lg:px-[2.6vw] py-[20px] lg:py-[2.3vh] 2xl:py-[3.7vh] overflow-hidden flex flex-col lg:justify-between gap-[20px] lg:gap-0 max-h-full min-h-full">
                    <div class="circle-glass"></div>
                    <h3 class="text-2xl font-bold text-center lg:text-left">${projects[i].titlu}</h3>
                    <div>
                        <div class="flex justify-between mb-[2.3vh]">
                            <div>
                                <h3 class="font-bold text-2xl lg:text-base 2xl:text-xl mb-[20px] lg:mb-[2vh]">Город</h3>
                                <p class="text-xl lg:text-base">${projects[i].localitate}</p>
                            </div>
                            <img src="../images/PORTFOLIO/ICONS/suprafata.svg" alt="" class="h-[4.5vh]">
                        </div>
                        <div class="flex justify-between mb-[2.3vh]">
                            <div>
                                <h3 class="font-bold text-2xl lg:text-base 2xl:text-xl mb-[20px] lg:mb-[2vh]">Поверхность</h3>
                                <p class="text-xl lg:text-base">${projects[i].suprafata}</p>
                            </div>
                            <img src="../images/PORTFOLIO/ICONS/inaltime.svg" alt="" class="h-[4.5vh]">
                        </div>
                        <div class="flex justify-between">
                            <div>
                                <h3 class="font-bold text-2xl lg:text-base 2xl:text-xl mb-[20px] lg:mb-[2vh]">Год постройки</h3>
                                <p class="text-xl lg:text-base">${projects[i].anul}</p>
                            </div>
                            <img src="../images/PORTFOLIO/ICONS/calendar.svg" alt="" class="h-[4.5vh]">
                        </div>
                    </div>
                </div>
            </div>
            <img src="../images/PORTFOLIO/p${i + 1}.webp" alt="" class="w-full lg:w-[38%] h-full object-cover rounded-2xl hidden lg:block">
            <div class="w-full lg:w-[18%] h-full lg:flex lg:flex-col justify-between hidden">
                <img src="../images/PORTFOLIO/p${i + 1} 1.webp" alt="" class="lg:h-[48%] w-[48%] lg:w-auto rounded-2xl">
                <img src="../images/PORTFOLIO/p${i + 1} 2.webp" alt="" class="lg:h-[48%] w-[48%] lg:w-auto rounded-2xl">
            </div>
        </div>`;
        }
    }
    
    cards = document.querySelectorAll('.glass .panel');

    cards.forEach(card => {
        card.addEventListener('mouseenter', enterCard);
        card.addEventListener('mouseleave', leaveCard);
        card.addEventListener('mousemove', moveCard);
    });

    if (end == true) {
        moreButton.style.display = 'none';
    }
    count = n;
    n += 4;
    if (n > projects.length) {
        n = projects.length;
        end = true;
    }
}

const moreButton = document.getElementById('submit');

moreButton.addEventListener('click', generateProjects);
generateProjects();

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