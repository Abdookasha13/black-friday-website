// =====================countdown================================
// const endDate = new Date(2025, 11, 31, 23, 59, 59).getTime() / 1000;

// function updateCountdown() {
//     const now = new Date().getTime() / 1000;
//     const diff = endDate - now;

//     const days = Math.floor(diff / (60 * 60 * 24));
//     const hours = Math.floor((diff % (60 * 60 * 24)) / (60 * 60));
//     const minutes = Math.floor((diff % (60 * 60)) / (60));
//     const seconds = Math.floor((diff % 60));
//     document.getElementById("days").innerText = days.toString().padStart(3, "0");
//     document.getElementById("hours").innerText = hours.toString().padStart(2, "0");
//     document.getElementById("minutes").innerText = minutes.toString().padStart(2, "0");
//     document.getElementById("seconds").innerText = seconds.toString().padStart(2, "0");
// }

// updateCountdown();
// setInterval(updateCountdown, 1000);
// =====================end-countdown================================



// ==========================btn-scroll===========================
const scrollBtn = document.getElementById("btn-scroll");

window.addEventListener('scroll', function () {
    if (window.scrollY > window.innerHeight * 0.7) {
        scrollBtn.style.display = 'block';
    }
    else {
        scrollBtn.style.display = 'none';
    }
});
// ==========================end-btn-scroll===========================



// ==============================btn-customize=========================
const customize = document.getElementsByClassName('btn-customize')[0];
const colors = document.getElementsByClassName('btn-colors')[0];
customize.addEventListener('click', function () {
    colors.classList.toggle('show');
});

const defaltColor = document.getElementsByClassName('defalt-color')[0];
const secondColor = document.getElementsByClassName('second-color')[0];
const thirdColor = document.getElementsByClassName('third-color')[0];
const linkTage = document.getElementsByTagName('link');

defaltColor.addEventListener('click', function () {
    linkTage[2].disabled = false;
    linkTage[4].disabled = true;
    linkTage[3].disabled = true;
    localStorage.setItem('theme', 'default');
    console.log(localStorage.getItem('theme'));
});

secondColor.addEventListener('click', function () {
    linkTage[2].disabled = true;
    linkTage[4].disabled = true;
    linkTage[3].disabled = false;
    localStorage.setItem('theme', 'second');
    console.log(localStorage.getItem('theme'));
});

thirdColor.addEventListener('click', function () {
    linkTage[2].disabled = true;
    linkTage[4].disabled = false;
    linkTage[3].disabled = true;
    localStorage.setItem('theme', 'third');
    console.log(localStorage.getItem('theme'));
});

window.onload = function () {
    const savedTheme = localStorage.getItem('theme');
    console.log(savedTheme);


    if (savedTheme === 'default') {
        linkTage[2].disabled = false;
        linkTage[4].disabled = true;
        linkTage[3].disabled = true;
    } else if (savedTheme === 'second') {
        linkTage[2].disabled = true;
        linkTage[4].disabled = true;
        linkTage[3].disabled = false;
    } else if (savedTheme === 'third') {
        linkTage[2].disabled = true;
        linkTage[4].disabled = false;
        linkTage[3].disabled = true;
    }
};


// ==============================end-btn-customize=========================


// ==============================sopping-cart=========================
const openShoppingCart = document.getElementsByClassName('parent-of-num-cart')[0];
const closeShoppingCart = document.getElementsByClassName('close-cart')[0];
const shoppingCart = document.getElementsByClassName('shopping-cart')[0];
const emptyOverlay = document.getElementsByClassName('empty')[0];


const openUsrData = document.getElementsByClassName('usr-img')[0];
const usrData = document.getElementsByClassName('usr-data')[0];
const closeUsrData = document.getElementsByClassName('close-usr-data')[0];
const emptyUsrData = document.getElementsByClassName('empty-usr-data')[0];

openShoppingCart.addEventListener('click', function () {
    shoppingCart.style.right = `0px`;
    document.body.style.overflow = 'hidden';
});

closeShoppingCart.addEventListener('click', function () {
    shoppingCart.style.right = `-100%`;
    document.body.style.overflow = '';
});

emptyOverlay.addEventListener('click', function () {
    shoppingCart.style.right = `-100%`;
    document.body.style.overflow = '';
});



openUsrData.addEventListener('click', function () {
    usrData.style.right = `0px`;
    document.body.style.overflow = 'hidden';
});

closeUsrData.addEventListener('click', function () {
    usrData.style.right = `-100%`;
    document.body.style.overflow = '';
});

emptyUsrData.addEventListener('click', function () {
    usrData.style.right = `-100%`;
    document.body.style.overflow = '';
});

// ==============================end-shopping-cart=========================


// ==============================upload-usr-info=========================
const img = document.getElementById('usr-img');
const usrName = document.getElementsByClassName('usr-name')[0];
const data = localStorage.getItem('userImage');

const usrImgData = document.getElementById('usr-data-img');
const usrNameData = document.getElementsByClassName('usr-name')[1];

if (data) {
    img.src = data;
    usrImgData.src = data;
} else {
    img.style.display = 'none';
    usrImgData.style.display = 'none';
}

usrName.innerHTML = localStorage.getItem('user-name');

if (localStorage.getItem('user-name'))
    usrNameData.innerHTML = "Hello " + localStorage.getItem('user-name');


// usrName.innerHTML = location.search.split('=')[1];
// usrNameData.innerHTML = "Hello " + location.search.split('=')[1];
// ==============================upload-usr-info=========================


// =============================log-out==================================
const logOut = document.getElementsByClassName('btns-usr-data')[0];
logOut.addEventListener('click', function () {
    localStorage.removeItem('user-name');
    localStorage.removeItem('userImage');
    window.location.href = './index.html';
})
// =============================end-log-out==================================