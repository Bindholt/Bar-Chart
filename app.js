"use strict";

const queueArray = [];
const barsAmount = 40;

window.addEventListener("load", init);

function init() {
    insertGridHTML();
    declareArray();
    updateHTML();
    setAnimation();
    setInterval(updateHTML, 1000);
}

function insertGridHTML() {
    const grid = document.querySelector("#grid-container");

    for(let i = 0; i < barsAmount; i++) {
        const myHTML = /*html*/`
            <div id="bar${i}" class="bar">
                <div class="tooltip"></div>
            </div>
        `
        grid.insertAdjacentHTML("afterbegin", myHTML);
        const bar = document.querySelector("#bar" + i);
        bar.addEventListener("mouseover", showTooltip);
        bar.addEventListener("mouseleave", hideTooltip);
        bar.style.filter = `grayscale(${i*0.025})`
    }
}

function declareArray() {
    for (let i = 0; i < barsAmount; i++) {
        queueArray.push(randomInt(0,32));
    }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateQueueArray() {
    queueArray.unshift(randomInt(0,32));
    queueArray.pop();
}

function setBarHeights() {
    for (let i = 0; i < barsAmount; i++) {
        const bar = document.querySelector("#bar" + i);
        bar.style.height = queueArray[i] + "vh";
        bar.children[0].innerText = `Mængde i kø: ${queueArray[i]}`
    }
}

function setAnimation() {
    const bar = document.querySelector("#grid-container");
    bar.classList.add("move-left-container");
}

function handleAnimationEnd() {
    const bar = document.querySelector("#grid-container");
    bar.classList.remove("move-left-container");
    bar.offsetWidth;
}



function showTooltip() {
    this.children[0].style.display = "block";
}   

function hideTooltip() {
    this.children[0].style.display = "none";
}

function updateHTML() {
    handleAnimationEnd();
    setAnimation();
    updateQueueArray();
    setBarHeights();
}