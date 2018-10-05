window.addEventListener('load', () => {
    const
        btnBurger = document.getElementById('btn-burger'),
        menuBurgered = document.getElementById('navbarMenuHeroB');

    btnBurger.addEventListener('click', () => {
        btnBurger.classList.toggle('is-active');
        menuBurgered.classList.toggle('is-active');
        console.log(menuBurgered);
    });
});