import { CONSTANTS } from "./constants.js";
import Game from "./game.js";

export default class Rock {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = CONSTANTS.ROCK_WIDTH;
        this.height = CONSTANTS.ROCK_HEIGHT;

        //grab variables from index.js:




        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext("2d");
        this.ctx = ctx;
        this.canvas = canvas;

        this.draw();
    }

    draw() {
        this.ctx.fillStyle = "grey";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

}






// function spawnBlock() {
//     var blockChances = {
//         "break": 15,
//         "sideways": Math.round(10 / difficulty)
//     };

//     if (Math.round(Math.random() * blockChances["break"]) === 0) {
//         return "break";
//     } else if (Math.round(Math.random() * blockChances["sideways"]) === 0) {
//         return "sideways";
//     }
//     return 0;
// }