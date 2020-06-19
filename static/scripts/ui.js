const ui = Object.create(null);
import Ajax from "./ajax.js";
//import {points} from "./game.js";

const tag = (tag) => document.querySelector(tag);
const el = (id) => document.getElementById(id);

const users = [];
const score = localStorage.getItem("score");

ui.init = function () {
    //Set up username
    function setUserName() {
        let myName = prompt("Please enter your name");
        if (!myName || myName === null) {
            setUserName();
        } else {
            localStorage.setItem("name", myName);
            tag("h2").textContent = "Welcome, " + myName + "!";
            el("playerOne").textContent = myName;
        }
    }
    if (!localStorage.getItem("name")) {
        setUserName();
    } else {
        let storedName = localStorage.getItem("name");
        users.push(storedName);
        tag("h2").textContent = "Welcome, " + storedName + "!";
        el("playerOne").textContent = storedName;
    }
    el("changePlayer").onclick = function () {
        setUserName();
        location.reload();
    };

    let active = false;
    let activeItem = null;

    //activate drag effect on element when dragging correct element
    function dragStart(e) {
        if(e.target !== e.currentTarget) {
            active = true;
            activeItem = e.target;

            if (activeItem !== null) {
                if (!activeItem.xOffset) {
                    activeItem.xOffset = 0;
                }
                if (!activeItem.yOffset) {
                    activeItem.yOffset = 0;
                }
                if (e.type === "touchstart") {
                    activeItem.initialX = e.touches[0].clientX
                    - activeItem.xOffset;
                    activeItem.initialY = e.touches[0].clientY
                    - activeItem.yOffset;
                } else {
                    activeItem.initialX = e.clientX - activeItem.xOffset;
                    activeItem.initialY = e.clientY - activeItem.yOffset;
                }
            }
        }
    }

    //Dragged item's new position becomes the new origin
    function dragEnd(e) {
        if (activeItem !== null) {
            activeItem.initialX = activeItem.currentX;
            activeItem.initialY = activeItem.currentY;
        }

        active = false;
        activeItem = null;
    }

    //Translation motion of item on the 2D screen plane
    function setTranslate(xPos, yPos, el) {
        el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }

    //During drag movement, item follows cursor
    function drag(e) {
        if (active) {

            e.preventDefault();

            if (e.type === "touchmove") {
                activeItem.currentX = e.touches[0].clientX
                - activeItem.initialX;
                activeItem.currentY = e.touches[0].clientY
                - activeItem.initialY;
            } else {
                activeItem.currentX = e.clientX - activeItem.initialX;
                activeItem.currentY = e.clientY - activeItem.initialY;
            }

            activeItem.xOffset = activeItem.currentX;
            activeItem.yOffset = activeItem.currentY;

            setTranslate(activeItem.currentX, activeItem.currentY, activeItem);
        }

    }

    //Player's territory listens to clicks and triggers appropriate events
    el("seaOne").addEventListener("touchstart", dragStart, false);
    el("seaOne").addEventListener("touchend", dragEnd, false);
    el("seaOne").addEventListener("touchmove", drag, false);

    el("seaOne").addEventListener("mousedown", dragStart, false);
    el("seaOne").addEventListener("mouseup", dragEnd, false);
    el("seaOne").addEventListener("mousemove", drag, false);

    //Cancel drag functionality when "play" is pressed
    el("play").addEventListener("click", function cancelDrag () {
        el("seaOne").removeEventListener("touchstart", dragStart);
        el("seaOne").removeEventListener("touchend", dragEnd);
        el("seaOne").removeEventListener("touchmove", drag);

        el("seaOne").removeEventListener("mousedown", dragStart);
        el("seaOne").removeEventListener("mouseup", dragEnd);
        el("seaOne").removeEventListener("mousemove", drag);
    });
};

window.addEventListener("DOMContentLoaded", function () {

    let data = ["Player", "Score", users, score, "Tim", "18"];

    //table format
    var perrow = 2, // 3 cells per row
        count = 0, // current cell indicator
        table = document.querySelector("table"),
        row = table.insertRow();

    for (var i of data) {
        var cell = row.insertCell();
        cell.innerHTML = i;

        // Break into next row
        count++;
        if (count % perrow == 0) {
            row = table.insertRow();
        }
    }

    //client request
    const request = {
        "Player": player,
        "Score": score
    };

    req = JSON.stringify(request);

    const response = Ajax.query(request);

    //server promise
    response.then(function (object) {
        responseBox.textContent = JSON.stringify(object);
    });

    const responseMessage = response.then((res) => res.message);

    responseMessage.then(function (msg) {
        data.push(msg);
    });

    event.preventDefault();
});

export default Object.freeze(ui);