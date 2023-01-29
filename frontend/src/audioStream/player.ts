import * as fs from "fs";
class Player {
  data: string | undefined;
  readFile(path: string) {
    fs.readFile(path, (err, data) => {
      if (err) {
      } else {
        const c = "dfds";
        this.data = data.toString();
      }
    });
  }
}

const p = new Player();
p.readFile("./audio.txt");
console.log("fdsf");

export default Player;
