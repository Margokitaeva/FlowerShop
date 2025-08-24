import {formatPrice, initMenu, signForNews} from "./common.js";

initMenu();

// Месяцы/дни
const MONTHS_UI = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
const MONTHS_RU = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
const WEEKDAYS_RU = ['понедельник','вторник','среда','четверг','пятница','суббота','воскресенье'];

// DOM-узлы
const calMonthEl = document.getElementById('cal_month');
const calYearEl  = document.getElementById('cal_year');
const calGrid    = document.getElementById('cal_grid');
const prevBtn    = document.getElementById('cal_prev');
const nextBtn    = document.getElementById('cal_next');

const timesDateLabel = document.getElementById('times_date_label');
const timesList  = document.getElementById('times_list');

const btnNext    = document.getElementById('btn_next');
const bookingForm= document.getElementById('booking_form');

const chosenDt   = document.getElementById('chosen_dt');
const summaryDt  = document.getElementById('summary_dt');


const backLink = document.getElementById('back_link') || document.querySelector('.registration .container a.textInfo');


const SLOT_TEMPLATE = ["10:00","10:30","11:00","11:30","12:30","13:00","13:30","14:00","14:30","15:00"];

// Состояние
let y, m;
let selectedDate = null;
let selectedSlot = null;


(function setupBackLink(){
    if (!backLink) return;


    function mapFrom(val) {
        if (!val) return null;
        const v = String(val).toLowerCase();
        if (v === 'index' || v === 'home' || v === 'main') return 'index.html';
        if (v === 'shop'  || v === 'store')               return 'shop.html';
        if (v === 'master' || v === 'classes')            return 'master_classes.html';
        return null;
    }

    function sameOrigin(url) {
        try { return new URL(url, location.href).origin === location.origin; }
        catch { return false; }
    }

    function fromReferrer(ref) {
        if (!ref || !sameOrigin(ref)) return null;
        const page = new URL(ref).pathname.split('/').pop().toLowerCase();
        if (page === '' || page === '/' || page === 'index.html') return 'index.html';
        if (page.includes('shop'))           return 'shop.html';
        if (page.includes('master_classes')) return 'master_classes.html';
        return null;
    }

    const params = new URLSearchParams(location.search);
    const href =
        mapFrom(params.get('from')) ||
        fromReferrer(document.referrer) ||
        'index.html';

    backLink.setAttribute('href', href);
    backLink.setAttribute('rel', 'prev');

    backLink.addEventListener('click', (e) => {
        e.preventDefault();
        location.href = href;
    });
})();


(function init(){
    const now = new Date();
    y = now.getFullYear();
    m = now.getMonth();

    renderCalendar();

    prevBtn.addEventListener('click', () => { shiftMonth(-1); });
    nextBtn.addEventListener('click', () => { shiftMonth(1);  });

    document.querySelectorAll('.acc__toggle').forEach(btn => {
        const panel = document.getElementById(btn.getAttribute('aria-controls'));
        btn.addEventListener('click', () => {
            const open = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', String(!open));
            panel.classList.toggle('open', !open);
        });
    });

    btnNext.addEventListener('click', () => {
        bookingForm.hidden = false;
        btnNext.disabled = true;
        bookingForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
})();


function shiftMonth(delta) {
    m += delta;
    if (m < 0)  { m = 11; y--; }
    if (m > 11) { m = 0;  y++; }
    renderCalendar();
}


function renderCalendar() {
    calMonthEl.textContent = MONTHS_UI[m];
    calYearEl.textContent  = y;

    calGrid.innerHTML = '';

    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const first = new Date(y, m, 1);
    const startIdx = (first.getDay() + 6) % 7; // чтобы Пн=0


    for (let i = 0; i < startIdx; i++) {
        const gap = document.createElement('button');
        gap.type = 'button';
        gap.disabled = true;
        gap.className = 'is-muted';
        gap.textContent = '';
        calGrid.appendChild(gap);
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = String(d);

        if (selectedDate &&
            selectedDate.getFullYear() === y &&
            selectedDate.getMonth()    === m &&
            selectedDate.getDate()     === d) {
            btn.classList.add('is-selected');
        }

        btn.addEventListener('click', () => {
            selectedDate = new Date(y, m, d);
            selectedSlot = null;
            renderCalendar();
            renderSlots();
            btnNext.disabled = true;
            chosenDt.hidden = true;
        });

        calGrid.appendChild(btn);
    }

    if (selectedDate && selectedDate.getFullYear() === y && selectedDate.getMonth() === m) {
        renderSlots();
    } else {
        timesList.innerHTML = '';
        timesDateLabel.textContent = '—';
    }
}

function renderSlots() {
    timesList.innerHTML = '';

    if (!selectedDate) {
        timesDateLabel.textContent = '—';
        return;
    }

    timesDateLabel.textContent =
        `${weekdayRu(selectedDate)}, ${selectedDate.getDate()} ${MONTHS_RU[selectedDate.getMonth()]}`;

    SLOT_TEMPLATE.forEach(time => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = time;

        if (selectedSlot === time) btn.classList.add('active');

        btn.addEventListener('click', () => {
            selectedSlot = time;
            document.querySelectorAll('.times-list button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            btnNext.disabled = false;
            updateChosenUI();
        });

        timesList.appendChild(btn);
    });
}

function updateChosenUI() {
    if (!selectedDate || !selectedSlot) return;

    const label =
        `${weekdayRu(selectedDate)} ${selectedDate.getDate()} ${MONTHS_RU[selectedDate.getMonth()]} ${selectedDate.getFullYear()} г. в ${selectedSlot}`;

    chosenDt.hidden = false;
    chosenDt.textContent = label;
    summaryDt.textContent = label;
}

function weekdayRu(d) {
    return WEEKDAYS_RU[(d.getDay() + 6) % 7];
}

function registerMC(eo) {
    eo.preventDefault();

    const name = document.getElementById('f_name').value.trim();
    const lname = document.getElementById('f_lname').value.trim();
    const email = document.getElementById('f_email').value.trim();

    if (name && lname && email) {
        alert("Спасибо за регистрацию, " + name + "! Вы успешно записаны на мастер-класс.");
        eo.target.reset();
    } else {
        alert("Пожалуйста, заполните обязательные поля (имя, фамилия, эл. почта).");
    }

    return false;
}

window.registerMC = registerMC;
