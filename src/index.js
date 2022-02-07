import Game from '../src/scripts/game.js';
import { CONSTANTS } from '../src/scripts/constants.js';
// console.log(Jumpler.test());

document.addEventListener("DOMContentLoaded", () => {
    // console.log("hello world");
    // const canvas = document.getElementById('jump-game');
    // const ctx = canvas.getContext("2d");

    // ctx.fillStyle = 'green';
    // ctx.fillRect(0, 0, CONSTANTS.CANVAS_WIDTH, CONSTANTS.CANVAS_HEIGHT);
    const game = new Game();
});

