import sqlite3 from "sqlite3";
//import {users, points} from "./static/scripts/game.js";
//import game from "./static/scripts/game.js";
//import ui from "./static/scripts/ui.js";

//let db = new sqlite3.Database("./ScoreData.db");



/*let id = ui.users;
//let sc = game.points;

let idacc = id.map((player) => "(?)").join(","); //placeholder for user ids
//let scacc = sc.map((scores) => "(?").join(","); //placeholder for scores

let idsql = 'INSERT INTO Scoreboard(Player) VALUES ' + idacc;
//let scsql = 'INSERT INTO Scoreboard(Score) VALUES ' + scacc;

db.run(idsql, id, function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get number of rows inserted
    console.log(`Number of rows inserted : ${this.changes}`);
  });
  
  db.all("SELECT Player as p FROM Scoreboard", [], (err,rows) => {
      if (err) {
          throw err;
      }
      rows.forEach((row) => {
          console.log(row.p);
      });
  });

  db.run(scsql, sc, function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get number of rows inserted
    console.log(`Number of rows inserted : ${this.changes}`);
  });
  
  db.all("SELECT Score as s FROM Scoreboard", [], (err,rows) => {
      if (err) {
          throw err;
      }
      rows.forEach((row) => {
          console.log(row.s);
      });
  });*/

/*const queryPromise = function (query) {
  return new Promise(function (query) {
    db.all(query, [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        console.log(row.s);
      });
    });

  });
};

const handlers = function (obj) {
  const sql = "SELECT Player as p, Score as s FROM Scoreboard";
  queryPromise(sql);
};

db.close();*/
/*const history = []

const handler = function (req) {
    const reversed = req.message.split("").reverse().join();
    const past = history.push[req];
    console.log(past);
    return {
        "message": reversed
    };
};

export default Object.freeze(handler);
*/
const db = new sqlite3.Database("./scoreData.db");

const handlers = Object.create(null);

const actionPromise = function (query, ...queryParams) {
  return new Promise(function (resolve, reject) {
    db.run(query, queryParams, function (err, rows) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.changes);
    });
  });
};


const handler = function (obj) {


  handlers.addData = function (obj) {
    const query = (
      "INSERT INTO Scoreboard " +
      "VALUES (null, ?, ?)"
    );

    return actionPromise(query, obj.name, obj.category);
  };
};
export default Object.freeze(handler);

/*
const history = [];
const handlers = {};

const handler = function (obj) {
  return Promise.resolve(handlers[obj.type](obj));
};

handlers.message = function (obj) {
  history.push(obj.message);
};
*/