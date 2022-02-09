import Game from '../src/scripts/game.js';
import { CONSTANTS } from '../src/scripts/constants.js';
import Rock from './scripts/rock.js';
// import jungle from "./imgs/jungle.png";

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext("2d");
    canvas.width = CONSTANTS.CANVAS_WIDTH;
    canvas.height = CONSTANTS.CANVAS_HEIGHT;

    //invoke new game instance
    const game = new Game();

});

