"use strict";
exports.__esModule = true;
var fs = require("fs");
var Player = /** @class */ (function () {
  function Player() {}
  Player.prototype.readFile = function (path) {
    var _this = this;
    fs.readFile(path, function (err, data) {
      if (err) {
        console.error(err);
      } else {
        var c = "dfds";
        _this.data = data.toString();
        console.log(_this.data);
      }
    });
  };
  return Player;
})();
var p = new Player();
p.readFile("src/audioStream/audio.txt");

exports["default"] = Player;
