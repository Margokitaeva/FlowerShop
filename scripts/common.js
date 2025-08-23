export const formatPrice = (price) => (price / 100).toLocaleString("ru-BY", {style: "currency", currency: "BYN"});

export function initMenu() {
    const burger = document.querySelector('.hamburger');
    const menu = document.getElementById('site_menu');
    const overlay = document.querySelector('.overlay');
    const wrapper = document.querySelector('.wrapper');
    const close = document.getElementById('menu_close');
    if (!burger || !menu || !overlay || !wrapper || !close) return;

    function openMenu() {
        menu.classList.add('open');
        // menu.setAttribute('aria-hidden', 'false');
        overlay.classList.add('show');
        overlay.hidden = false;
        wrapper.classList.add('menu_open');
    }

    function closeMenu() {
        menu.classList.remove('open');
        // menu.setAttribute('aria-hidden', 'true');
        overlay.classList.remove('show');
        wrapper.classList.remove('menu_open');
        // document.querySelector('.menu').classList.toggle('open');
        document.querySelector('.menu').classList.remove('open');

        setTimeout(() => overlay.hidden = true, 300);
    }

    burger.addEventListener('click', openMenu);
    close.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu()
    });

    function scrollFromTopTo(targetEl) {
        const root = document.documentElement;
        const prevBehavior = root.style.scrollBehavior || '';

        root.style.scrollBehavior = 'auto';
        window.scrollTo(0, 0);

        const header = document.querySelector('.header');
        const headerH = header ? header.offsetHeight : 0;

        setTimeout(() => {
            root.style.scrollBehavior = 'smooth';
            const y = targetEl.getBoundingClientRect().top + window.pageYOffset - headerH - 8; // -8 - немного места перед элементом, чтобы не начиналось прямо с него
            window.scrollTo({top: y, behavior: 'smooth'});

            setTimeout(() => {
                root.style.scrollBehavior = prevBehavior;
            }, 800);
        }, 320);
    }

    document.querySelectorAll('.offcanvas_link[href*="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            const hashIndex = href.indexOf('#');
            if (hashIndex === -1) return;

            const id = href.slice(hashIndex + 1);
            const target = document.getElementById(id);
            if (!target) return;

            e.preventDefault();
            closeMenu();
            scrollFromTopTo(target);
        });
    });
}

