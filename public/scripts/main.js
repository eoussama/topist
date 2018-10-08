window.addEventListener('load', () => {
    const
        btnBurger = document.getElementById('btn-burger'),
        menuBurgered = document.getElementById('navbarMenuHeroB'),
        btnOpenModalLogin = document.getElementById('btn-modal-login'),
        btnCloseModalLogin = document.querySelector('#modal-login button.delete'),
        modalLogin = document.getElementById('modal-login'),
        btnOpenModalRegister = document.getElementById('btn-modal-register'),
        btnCloseModalRegister = document.querySelector('#modal-register button.delete'),
        modalRegister = document.getElementById('modal-register'),
        topists = document.querySelectorAll('div.tops-box'),
        primaryPass = document.getElementById('primary-pass'),
        secondaryPass = document.getElementById('secondary-pass');

    btnBurger.addEventListener('click', () => {
        btnBurger.classList.toggle('is-active');
        menuBurgered.classList.toggle('is-active');
    });

    btnOpenModalLogin.addEventListener('click', () => {
        modalLogin.classList.toggle('is-active');
    });

    btnCloseModalLogin.addEventListener('click', () => {
        modalLogin.classList.toggle('is-active');
    });

    btnOpenModalRegister.addEventListener('click', () => {
        modalRegister.classList.toggle('is-active');
    });

    btnCloseModalRegister.addEventListener('click', () => {
        modalRegister.classList.toggle('is-active');
    });

    if(topists)
        topists.forEach(topist => topist.addEventListener('click', () => window.location = `/topist/${topist.dataset.id}`));
    
    function validatePassword() {
        if(primaryPass.value != secondaryPass.value)
            secondaryPass.setCustomValidity("Passwords don't match!");
        else
            secondaryPass.setCustomValidity('');
    }
    
    primaryPass.addEventListener('change', validatePassword);
    secondaryPass.addEventListener('change', validatePassword);
});

