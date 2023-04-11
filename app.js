"use strict";

const queueArray = [];
const barsAmount = 40;

window.addEventListener("load", init);

function init() {
    insertGridHTML();
    declareArray();
    updateHTML();
    setAnimations();
    setInterval(updateHTML, 1000);
}

function insertGridHTML() {
    const grid = document.querySelector("#grid-container");

    for(let i = 0; i < barsAmount; i++) {
        const myHTML = /*html*/`
            <div id="bar${i}" class="bar">
                <div class="tooltip">Hello</div>
            </div>
        `
        grid.insertAdjacentHTML("afterbegin", myHTML);
        document.querySelector("#bar" + i).addEventListener("mouseover", showTooltip);
        document.querySelector("#bar" + i).addEventListener("mouseleave", hideTooltip);
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
        const bar = document.querySelector("#bar" + i)
        bar.style.height = queueArray[i] + "vh";
        bar.children[0].innerText = `Mængde i kø: ${queueArray[i]}`
    }
}

function setAnimations() {
    for (let i = 0; i < barsAmount; i++) {
        const bar = document.querySelector("#bar" + i)
        bar.classList.add("move-left");
        //bar.addEventListener("animationend", handleAnimationEnd);
    }
}

function handleAnimationEnd() {
      for (let i = 0; i < barsAmount; i++) {
        const bar = document.querySelector("#bar" + i)
        bar.classList.remove("move-left");
        bar.offsetWidth;
        //bar.addEventListener("animationend", handleAnimationEnd);
    }
    
}

function showTooltip() {
    this.children[0].style.display = "block";
}   

function hideTooltip() {
    this.children[0].style.display = "none";
}

function updateHTML() {
    handleAnimationEnd();
    setAnimations();
    updateQueueArray();
    setBarHeights();
}