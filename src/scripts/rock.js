import { CONSTANTS } from "./constants.js";
import Game from "./game.js";
// import ivy from "../imgs/ivy.png";

export default class Rock {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = CONSTANTS.ROCK_WIDTH;
        this.height = CONSTANTS.ROCK_HEIGHT;
        this.direction = "right";
        this.moveTime = 10;

        // this.img = new Image(CONSTANTS.ROCK_WIDTH, CONSTANTS.ROCK_HEIGHT);
        // this.img.onload = () => this.draw();
        // this.img.src = ivy;
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext("2d");
        this.ctx = ctx;
        this.canvas = canvas;

        this.draw();
    }

    draw() {
        this.ctx.fillStyle = "grey";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        // this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

}



