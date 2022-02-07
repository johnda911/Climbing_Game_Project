import Game from '../src/scripts/game.js';
import { CONSTANTS } from '../src/scripts/constants.js';
import Rock from './scripts/rock.js';

document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById('canvas');
    canvas.width = CONSTANTS.CANVAS_WIDTH;
    canvas.height = CONSTANTS.CANVAS_HEIGHT;
    const ctx = canvas.getContext("2d");

    //invoke new game instance
    const game = new Game();

});

