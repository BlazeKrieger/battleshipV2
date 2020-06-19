import ui from "./ui.js";
import game from "./game.js";

const el = (id) => document.getElementById(id);

const tag = (tag) => document.querySelector(tag);

//initialise UI when page content is loaded
window.addEventListener("DOMContentLoaded", function () {
    ui.init();
});

//Game starts when "play" button is clicked on
el("play").addEventListener("click", function () {
    game.init();
    el("play").textContent = "Exit";
    tag("h3").remove();
});


