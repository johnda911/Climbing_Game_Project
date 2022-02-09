import Game from '../src/scripts/game.js';
import { CONSTANTS } from '../src/scripts/constants.js';
import Rock from './scripts/rock.js';
// import jungle from "./imgs/jungle.png";

document.addEventListener("DOMContentLoaded", () => {
    // let backgroundImage = new Image();
    // backgroundImage.onload = () => {
    //     this.ctx.drawImage(backgroundImage, 0, 0, CONSTANTS.CANVAS_WIDTH, CONSTANTS.CANVAS_HEIGHT);
    // };

    // backgroundImage.src = jungle;
    // const getDrawImageParams = (image, scale) => {
    //     const { naturalWidth: imageWidth, naturalHeight: imageHeight } = image;

    //     return {
    //         sx: 0,
    //         sy: 0,
    //         sWidth: imageWidth,
    //         sHeight: imageHeight,
    //         dx: 0,
    //         dy: 0,
    //         dWidth: imageWidth * scale,
    //         dHeight: imageHeight * scale,
    //     };
    // };

    // const scale = 0.8;
    // const { sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight } = getDrawImageParams(image, scale);
    // canvas.width = dWidth;
    // canvas.height = dHeight;

    // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext("2d");
    canvas.width = CONSTANTS.CANVAS_WIDTH;
    canvas.height = CONSTANTS.CANVAS_HEIGHT;

    //invoke new game instance
    const game = new Game();

});

