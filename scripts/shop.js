import { formatPrice, initMenu, decodeEntities, signForNews} from "./common.js";
import { products } from "./data.js";

initMenu();

const container = document.getElementById('products');
const template = document.getElementById('product_template');
// if (!container || !template) return;



function renderProducts(items) {
    const container = document.getElementById('products');
    const template = document.getElementById('product_template');
    const fragment = document.createDocumentFragment();

    container.innerHTML = "";

    items.forEach(item => {
        const productEl = template.content.cloneNode(true);

        productEl.querySelector('.product_image').src = item.imgs.src1;
        productEl.querySelector('.product_image').alt = decodeEntities(item.title);
        productEl.querySelector('.product_title').innerHTML = item.title;
        productEl.querySelector('.product_price').textContent = formatPrice(item.price);


        const productWithAttr = productEl.querySelector('.product');
        productWithAttr.setAttribute("data-id", item.id);

        fragment.appendChild(productEl);
    });

    container.appendChild(fragment);
}

renderProducts(products);

const productsDiv = document.querySelector('.products');

productsDiv.addEventListener('click', openProductPage);

function openProductPage(eo) {
    eo = eo || window.event;
    const product = eo.target.closest('.product');
    if (!product) return;
    const productId = product.getAttribute('data-id');
    const path = location.pathname;
    const from =
        path.endsWith('/shop.html')  || path.endsWith('shop.html')  ? 'shop'  :
            path.endsWith('/index.html') || path.endsWith('index.html') ? 'index' :
                'index';

    window.open(`item.html?id=${encodeURIComponent(productId)}&from=${from}`, '_blank');

}

// container.addEventListener('hover', changeProductImage);
//
// function changeProductImage(eo) {
//     const prod = eo.target.closest('.product');
//     const prodId = prod.getAttribute('data-id');
//     prod.querySelector('.product_image').src = getImageList(products.find(x => String(x.id) === String(prodId)))[1];
// }

export function getImageList(p) {
    const list = [];
    if (p && p.imgs && typeof p.imgs === "object") {
        Object.keys(p.imgs)
            .sort((a, b) => {
                const na = parseInt(a.replace(/\D+/g, ""), 10);
                const nb = parseInt(b.replace(/\D+/g, ""), 10);
                if (Number.isFinite(na) && Number.isFinite(nb)) return na - nb; // src1 < src2 < src10
                return a.localeCompare(b);
            })
            .forEach(k => {
                const url = p.imgs[k];
                if (url) list.push(url);
            });
    }
    return list;
}

container.addEventListener('mouseover', (e) => {
    const card = e.target.closest('.product');
    if (!card || !container.contains(card)) return;

    // игнорируем переходы внутри одной карточки
    if (e.relatedTarget && card.contains(e.relatedTarget)) return;

    const id = card.getAttribute('data-id');
    const p = products.find(x => String(x.id) === String(id));
    if (!p) return;
    const imgs = getImageList(p);
    if (imgs.length < 2) return;

    const imgEl = card.querySelector('.product_image');
    if (!imgEl) return;
    card.__origSrc = imgEl.src;
    imgEl.src = imgs[1];
});

container.addEventListener('mouseout', (e) => {
    const card = e.target.closest('.product');
    if (!card || !container.contains(card)) return;
    if (e.relatedTarget && card.contains(e.relatedTarget)) return;

    const imgEl = card.querySelector('.product_image');
    if (!imgEl) return;
    if (card.__origSrc) imgEl.src = card.__origSrc;
});