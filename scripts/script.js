// document.querySelector('.menu').onclick = function(){
//     this.classList.toggle('open');
// }

// async function loadProducts() {
//     const res = await fetch('/data/products.json');
//     if (!res.ok) throw new Error('Не удалось загрузить товары');
//     return await res.json();
// }

// const formatPrice = (price) => (price / 100).toLocaleString("ru-BY", {style: "currency", currency: "BYN"});


// function renderProducts(items) {
//     const container = document.getElementById('products');
//     const template = document.getElementById('product_template');
//     const fragment = document.createDocumentFragment();
//
//     container.innerHTML = "";
//
//     items.forEach(item => {
//         const productEl = template.content.cloneNode(true);
//
//         productEl.querySelector('.product_image').src = item.src;
//         productEl.querySelector('.product_image').alt = item.title;
//         productEl.querySelector('.product_title').textContent = item.title;
//         productEl.querySelector('.product_price').textContent = formatPrice(item.price);
//
//
//         const productWithAttr = productEl.querySelector('.product');
//         productWithAttr.setAttribute("data-id", item.id);
//
//         fragment.appendChild(productEl);
//     });
//
//     container.appendChild(fragment);
// }

// const products = [
//     {
//         id: 1,
//         src: "https://static.wixstatic.com/media/dae918_3aef53714c864818928d8e192a51fe60~mv2_d_3644_5466_s_4_2.jpg/v1/fill/w_1000,h_1500,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/dae918_3aef53714c864818928d8e192a51fe60~mv2_d_3644_5466_s_4_2.jpg",
//         title: "Букет 1",
//         price: 1000
//     },
//     {
//         id: 2,
//         src: "https://static.wixstatic.com/media/dae918_a5299ac3cb2644b28c4ed4da110e3f52~mv2_d_3357_5035_s_4_2.jpg/v1/fill/w_1000,h_1500,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/dae918_a5299ac3cb2644b28c4ed4da110e3f52~mv2_d_3357_5035_s_4_2.jpg",
//         title: "Букет 2",
//         price: 1000
//     },
//     {
//         id: 3,
//         src: "https://static.wixstatic.com/media/dae918_590f11a1ba874ac2a73264b3876477b0~mv2_d_3330_4995_s_4_2.jpg/v1/fill/w_1000,h_1500,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/dae918_590f11a1ba874ac2a73264b3876477b0~mv2_d_3330_4995_s_4_2.jpg",
//         title: "Букет 3",
//         price: 1000
//     },
//     {
//         id: 4,
//         src: "https://static.wixstatic.com/media/dae918_ce8e21fef66b46e09a19a38a92d06950~mv2_d_3540_5310_s_4_2.jpg/v1/fill/w_1000,h_1500,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/dae918_ce8e21fef66b46e09a19a38a92d06950~mv2_d_3540_5310_s_4_2.jpg",
//         title: "Букет 4",
//         price: 1000
//     },
//     {
//         id: 5,
//         src: "https://static.wixstatic.com/media/dae918_73de717ef4ee4c73bb5de043cfa4a978~mv2_d_3122_4684_s_4_2.jpg/v1/fill/w_1000,h_1500,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/dae918_73de717ef4ee4c73bb5de043cfa4a978~mv2_d_3122_4684_s_4_2.jpg",
//         title: "Букет 5",
//         price: 1000
//     },
//     {
//         id: 6,
//         src: "https://static.wixstatic.com/media/dae918_c65c9ca3443f4c37a5803d6f11ce672b~mv2_d_3065_4596_s_4_2.jpg/v1/fill/w_1000,h_1500,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/dae918_c65c9ca3443f4c37a5803d6f11ce672b~mv2_d_3065_4596_s_4_2.jpg",
//         title: "Букет 6",
//         price: 1000
//     },
//     {
//         id: 7,
//         src: "https://static.wixstatic.com/media/dae918_7b1ed0aa712c4cd3b93483fdab35b9be~mv2_d_3367_5050_s_4_2.jpg/v1/fill/w_1000,h_1500,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/dae918_7b1ed0aa712c4cd3b93483fdab35b9be~mv2_d_3367_5050_s_4_2.jpg",
//         title: "Букет 7",
//         price: 1000
//     },
//     {
//         id: 8,
//         src: "https://static.wixstatic.com/media/dae918_35a4511291694b46963c9d67ab8e2e43~mv2_d_3425_5139_s_4_2.jpg/v1/fill/w_1000,h_1500,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/dae918_35a4511291694b46963c9d67ab8e2e43~mv2_d_3425_5139_s_4_2.jpg",
//         title: "Букет 8",
//         price: 1000
//     },
//
// ]

// renderProducts(products);

// const burger = document.querySelector('.hamburger');
// const menu = document.getElementById('site_menu');
// const overlay = document.querySelector('.overlay');
// const wrapper = document.querySelector('.wrapper');
// const close = document.getElementById('menu_close');


// function openMenu() {
//     menu.classList.add('open');
//     // menu.setAttribute('aria-hidden', 'false');
//     overlay.classList.add('show');
//     overlay.hidden = false;
//     wrapper.classList.add('menu_open');
// }

// function closeMenu() {
//     menu.classList.remove('open');
//     // menu.setAttribute('aria-hidden', 'true');
//     overlay.classList.remove('show');
//     wrapper.classList.remove('menu_open');
//     // document.querySelector('.menu').classList.toggle('open');
//     document.querySelector('.menu').classList.remove('open');
//
//
//     setTimeout(() => overlay.hidden = true, 300);
// }

// burger.addEventListener('click', openMenu);
// close.addEventListener('click', closeMenu);
// overlay.addEventListener('click', closeMenu);
//
// document.addEventListener('keydown', e => {
//     if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu()
// });

// function scrollFromTopTo(targetEl) {
//     const root = document.documentElement;
//     const prevBehavior = root.style.scrollBehavior || '';
//
//     root.style.scrollBehavior = 'auto';
//     window.scrollTo(0, 0);
//
//     const header = document.querySelector('.header');
//     const headerH = header ? header.offsetHeight : 0;
//
//     setTimeout(() => {
//         root.style.scrollBehavior = 'smooth';
//         const y = targetEl.getBoundingClientRect().top + window.pageYOffset - headerH - 8; // -8 - немного места перед элементом, чтобы не начиналось прямо с него
//         window.scrollTo({top: y, behavior: 'smooth'});
//
//         setTimeout(() => {
//             root.style.scrollBehavior = prevBehavior;
//         }, 800);
//     }, 320);
// }
//
// document.querySelectorAll('.offcanvas_link[href*="#"]').forEach(link => {
//     link.addEventListener('click', (e) => {
//         const href = link.getAttribute('href');
//         const hashIndex = href.indexOf('#');
//         if (hashIndex === -1) return;
//
//         const id = href.slice(hashIndex + 1);
//         const target = document.getElementById(id);
//         if (!target) return;
//
//         e.preventDefault();
//         closeMenu();
//         scrollFromTopTo(target);
//     });
// });

// const productsDiv = document.querySelector('.products');
//
// productsDiv.addEventListener('click', openProductPage);
//
// function openProductPage(eo) {
//     eo = eo || window.event;
//     const product = eo.target.closest('.product');
//     if (!product) return;
//     const productId = product.getAttribute('data-id');
//
//     window.open(`item.html?id=${productId}`, "_blank");
//
// }
// document.addEventListener('DOMContentLoaded', () => {
//
// })