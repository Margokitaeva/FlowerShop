import { formatPrice, initMenu } from "./common.js";
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

        productEl.querySelector('.product_image').src = item.src;
        productEl.querySelector('.product_image').alt = item.title;
        productEl.querySelector('.product_title').textContent = item.title;
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