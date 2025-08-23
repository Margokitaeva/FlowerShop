import {formatPrice, initMenu} from "./common.js";
import {products} from "./data.js";

initMenu();

// function getParam(name) {
//     return new URLSearchParams(location.search).get(name);
// }

const params = new URLSearchParams(window.location.search);
const idParam = params.get("id");
const fromParam = params.get("from") || "index";
const item = products.find(p => String(p.id) === String(idParam));

if (!item) {
    const titleEl = document.querySelector(".sectionTitle");
    if (titleEl) titleEl.textContent = "Товар не найден";
    document.title = "Товар не найден";
}
else {
    hydrateItem(item);
    // fillItemTexts(item);
    setupBreadcrumbs(item, fromParam);
    setupPager(item, fromParam);
    setupQty();
    setupAccordions(item);
    setupItemImgs(item);
}

function hydrateItem(p) {
    const titleEl = document.querySelector(".sectionTitle");
    if (titleEl) titleEl.textContent = p.title || "Ваш товар";
    document.title = p.title || "Товар";

    const costEl = document.querySelector(".cost");
    if (costEl && p.price != null) {
        costEl.textContent = formatPrice(p.price);
    }

    const mainImg = document.querySelector(".product_image");
    if (mainImg) {
        const url = p.src || p.image || (Array.isArray(p.images) && p.images.length ? p.images[0] : "");
        mainImg.src = url || "";
        mainImg.alt = p.title || "Фото товара";
    }

    const desc = document.querySelector(".description");
    if (desc && p.description) desc.textContent = p.description;
}

function fillItemTexts(p) {
    const descEl = document.querySelector('.description');
    if (descEl) {
        if (p.description) {
            descEl.textContent = p.description;
            descEl.hidden = false;
        } else {
            // если описания нет — можно скрыть блок
            descEl.hidden = true;
        }
    }

    const aboutP = document.querySelector('.accordions .accordion:nth-of-type(1) .accordion_panel .textInfo');
    const aboutSection = document.querySelector('.accordions .accordion:nth-of-type(1)');
    if (aboutP && p.aboutProduct) {
        aboutP.textContent = p.aboutProduct;
        if (aboutSection) aboutSection.hidden = false;
    } else if (aboutSection && !p.aboutProduct) {
        // если нет текста — можно убрать весь аккордеон
        aboutSection.style.display = 'none';
    }

    const policyP = document.querySelector('.accordions .accordion:nth-of-type(2) .accordion_panel .textInfo');
    const policySection = document.querySelector('.accordions .accordion:nth-of-type(2)');
    if (policyP && p.returnPolicy) {
        policyP.textContent = p.returnPolicy;
        if (policySection) policySection.hidden = false;
    } else if (policySection && !p.returnPolicy) {
        policySection.style.display = 'none';
    }
}

function setupBreadcrumbs(p, from) {
    const container = document.querySelector(".breadcrumbs");
    if (!container) return;

    const fragment = document.createDocumentFragment();

    const aHome = document.createElement("a");
    aHome.href = "index.html";
    aHome.title = "На главную"
    aHome.textContent = "Главная";
    aHome.className = "textInfo";
    aHome.className += " navEl";
    fragment.appendChild(aHome);

    if (from === "shop") {
        fragment.appendChild(document.createTextNode(" / "));
        const aShop = document.createElement("a");
        aShop.href = "shop.html";
        aShop.title = "В магазин";
        aShop.textContent = "Магазин";
        aShop.className = "textInfo";
        aShop.className += " navEl";
        fragment.appendChild(aShop);
    }

    fragment.appendChild(document.createTextNode(" / "));
    const span = document.createElement("span");
    span.textContent = p.title || "Ваш товар";
    span.className = "textInfo";
    fragment.appendChild(span);

    container.innerHTML = "";
    container.appendChild(fragment);
}

function setupPager(p, from) {
    const pager = document.querySelector(".prev_next");
    if (!pager) return;

    const currentIndex = products.findIndex(x => String(x.id) === String(p.id));
    if (currentIndex < 0) return;

    const prev = products[(currentIndex - 1 + products.length) % products.length];
    const next = products[(currentIndex + 1) % products.length];

    const prevA = document.getElementById("prev");
    const nextA = document.getElementById("next");

    if (prevA)
        prevA.href = `item.html?id=${encodeURIComponent(prev.id)}&from=${encodeURIComponent(from)}`;
    if (nextA)
        nextA.href = `item.html?id=${encodeURIComponent(next.id)}&from=${encodeURIComponent(from)}`;
}

function setupQty() {
    const minusBtn = document.querySelector(".qty_minus");
    const plusBtn  = document.querySelector(".qty_plus");
    const input    = document.querySelector(".qty_input");
    if (!minusBtn || !plusBtn || !input) return;

    input.addEventListener("input", () => {
        const parsed = parseInt(input.value, 10);
        const num = Number.isFinite(parsed) ? parsed : 1;
        input.value = String(Math.max(1, num));
    });

    minusBtn.addEventListener("click", () => {
        const parsed = parseInt(input.value, 10);
        const num = Number.isFinite(parsed) ? parsed : 1;
        input.value = String(Math.max(1, num - 1));
    });

    plusBtn.addEventListener("click", () => {
        const parsed = parseInt(input.value, 10);
        const num = Number.isFinite(parsed) ? parsed : 1;
        input.value = String(Math.max(1, num + 1));
    });
}


function setupAccordions(p) {
    const list = Array.from(document.querySelectorAll(".accordion"));
    list.forEach(acc => {
        const toggle = acc.querySelector(".accordion_toggle");
        const panel  = acc.querySelector(".accordion_panel");
        const sign   = acc.querySelector(".sign");
        if (!toggle || !panel) return;

        toggle.addEventListener("click", () => {
            const isHidden = panel.hidden;   // было скрыто?
            panel.hidden = !isHidden;        // инвертируем
            if (sign) sign.textContent = isHidden ? "-" : "+"; // меняем значок
            toggle.classList.toggle("open", !isHidden);
            // const expanded = toggle.getAttribute("aria-expanded") === "true";
            // toggle.setAttribute("aria-expanded", expanded ? "false" : "true");
            // panel.hidden = expanded;
            // if (sign) sign.textContent = expanded ? "+" : "—";
        });
    });
}

function setupItemImgs(p) {
    const item_imgs  = document.querySelector(".item_imgs");
    const mainImg = document.querySelector(".product_image");
    if (!item_imgs || !mainImg) return;

    const images = Array.isArray(p.images) ? p.images.slice() : [];
    const primary = p.src || p.image;
    if (primary && !images.includes(primary)) images.unshift(primary);

    item_imgs.innerHTML = "";

    images.forEach((url, idx) => {
        if (!url) return;
        const img = document.createElement("img");
        img.src = url;
        img.alt = (p.title || "Фото") + " " + (idx + 1);
        img.className = "item_img";
        if (idx === 0) img.classList.add("active");

        img.addEventListener("click", () => {
            mainImg.src = url;
            Array.from(item_imgs.querySelectorAll(".item_img")).forEach(t => t.classList.remove("active"));
            img.classList.add("active");
        });

        item_imgs.appendChild(img);
    });
}