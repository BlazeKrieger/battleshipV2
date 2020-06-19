const game = Object.create(null);

const el = (id) => document.getElementById(id);

const tag = (tag) => document.querySelector(tag);

const storedName = localStorage.getItem("name");

const users = [];
const points = [];

//List of user's ships
var player1ships = [
    {name: "destroyer", HP: 3},
    {name: "helicarrier", HP: 3},
    {name: "jetcarrier", HP: 3},
    {name: "submarine", HP: 3},
    {name: "dreadnought", HP: 3},
    {name: "helidestroyer", HP: 3}
];

//List of bot's ships
var player2ships = [
    {name: "ship1", HP: 3},
    {name: "ship2", HP: 3},
    {name: "ship3", HP: 3},
    {name: "ship4", HP: 3},
    {name: "ship5", HP: 3},
    {name: "ship6", HP: 3}
];

game.init = function () {

    var score = 0;
    localStorage.setItem("score", score);

    //Randomizes bot's ships on seaTwo
    function shipPlace() {
        player2ships.map(function (item) {
            var dy = Math.random() * (50 + 5) - 5;
            var dx = Math.random() * (30 + 40) - 40;
            el(item.name).style.setProperty("margin-left", dx + "%");
            el(item.name).style.setProperty("margin-top", dy + "%");
            player2ships.reduce(function (acc, dy) {
                //If y distance between 2 ships too small, randomize again
                if (acc - dy >= 25) {
                    shipPlace();
                }
            });
            player2ships.reduce(function (acc, dx) {
                //If x distance between 2 ships too small, randomize again
                if (acc - dx >= 35) {
                    shipPlace();
                }
            });
        });
    }

    shipPlace();

    var t = 0;
    var min = 0;
    var seconds;
    var minutes;

    //Second and minute timer for match
    setInterval(function timer() {
        t += 1;
        if (t<10) {
            seconds = "0" + t;
        } else {
            seconds = t;
        }
        if (t >= 60) {
            Math.floor(min += t/60);
            t -= 60;
        }
        if (min<10) {
            minutes = "0" + min;
        } else {
            minutes = min;
        }
        el("time").textContent = minutes + ":" + seconds;
    }, 1000);

    const number = localStorage.getItem("score");

    //Gives a point everytime player hits a bot ship
    function scoreSystem () {
        score += 1;
        localStorage.setItem("score", score);
        el("score1").textContent = score;
        //Player wins if reaches 18 points (= sum of bot ships HP)
        if (score === 18) {
            console.log("Player: " + storedName + " Score: " + number);
            users.push({"player": storedName});
            points.push({"score": number});
            tag("h2").textContent = "YOU WIN!";
            setTimeout(function () {
                location.reload();
            }, 3000);

        }
    }

    //Bot ship loses 1 HP when player hits it
    function health (x) {
        player2ships.map(function (item) {
            if (item.name === x) {
                item.HP -= 1;
                if (item.HP === 0) {
                    el(item.name).style.setProperty("opacity", "1");
                    setTimeout(function () {
                        el(item.name).remove();
                    }, 200);
                }
            }
        });
    }
    alert("Now click around to hit enemy ships!");

    //hit mechanism: events trigger when player click's on bot ship
    function hit (x) {
        event.stopPropagation();
        var audio = new Audio("crazy-diamond-punch.mp3");
        tag("h2").textContent = "HIT!";
        setTimeout(function () {
            tag("h2").textContent = "Welcome, " + storedName + "!";
        },500);
        audio.play();
        scoreSystem();
        health(x);
    }

    //Indicate that player has clicked on own territory
    el("seaOne").onclick = function () {
        tag("h2").textContent = storedName + "'s territory!";
        setTimeout(function () {
            tag("h2").textContent = "Welcome, " + storedName + "!";
        },300);
    };

    //Indicate that player has clicked on bot's territory (not on bot ship)
    el("seaTwo").onclick = function () {
        tag("h2").textContent = "Bot's territory!";
        setTimeout(function () {
            tag("h2").textContent = "Welcome, " + storedName + "!";
        },300);
    };

    //Hit event can be triggered on any bot ship
    player2ships.map(function (item) {
        el(item.name).onclick = () => hit(item.name);
    });

    //Bot's hitting mechanism - kills a player's ship every 10s
    const constBot = function () {
        var index = -1;
        setInterval(function () {
            index += 1;
            var i = player1ships[index];
            el(i.name).remove();
            el("score2").textContent = (3 * index + 3);
        }, 10000);
        setTimeout(function () {
            location.reload();
        }, 61000);
        setTimeout(function () {
            el("h2").textContent = "YOU LOSE!";
        }, 60000);
    };

    constBot();

    //Exit button
    el("play").addEventListener("click", function () {
        event.preventDefault();
        if (confirm("Do want to exit game?")) {
            location.reload();
        }
    });
};



export default Object.freeze(game);