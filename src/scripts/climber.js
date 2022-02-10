import { CONSTANTS } from "./constants.js";
import leftMonkeyImg from "../imgs/monkey/l4.png";
import rightMonkeyImg from "../imgs/monkey/r4.png";
import l0 from "../imgs/monkey/l0.png";
import l1 from "../imgs/monkey/l1.png";
import l2 from "../imgs/monkey/l2.png";
import l3 from "../imgs/monkey/l3.png";
import l4 from "../imgs/monkey/l4.png";
import l5 from "../imgs/monkey/l5.png";
import l6 from "../imgs/monkey/l6.png";
import l7 from "../imgs/monkey/l7.png";
import l8 from "../imgs/monkey/l8.png";
import l9 from "../imgs/monkey/l9.png";
import l10 from "../imgs/monkey/l10.png";
import l11 from "../imgs/monkey/l11.png";


const MK_IMG0 = createImg(l0);
const MK_IMG1 = createImg(l1);
const MK_IMG2 = createImg(l2);
const MK_IMG3 = createImg(l3);
const MK_IMG4 = createImg(l4);
const MK_IMG5 = createImg(l5);
const MK_IMG6 = createImg(l6);
const MK_IMG7 = createImg(l7);
const MK_IMG8 = createImg(l8);
const MK_IMG9 = createImg(l9);
const MK_IMG10 = createImg(l10);
const MK_IMG11 = createImg(l11);

const MONKEY_LEFT_IMGS = [MK_IMG0, MK_IMG1, MK_IMG2, MK_IMG3, MK_IMG4, MK_IMG5, MK_IMG6, MK_IMG7, MK_IMG8, MK_IMG9, MK_IMG10, MK_IMG11];

function createImg(img) {
    const myImg = new Image(70, 70);
    myImg.src = img;
    return myImg;
}

export default class Climber {
    constructor(rocks, rockParam) {

        this.x = 250;
        this.y = 670;
        this.width = CONSTANTS.CLIMBER_WIDTH;
        this.height = CONSTANTS.CLIMBER_HEIGHT;
        this.gravity = CONSTANTS.GRAVITY;
        this.xSpeed = 7;
        this.ySpeed = 0;
        this.isGameOver = false;
        this.rocks = rocks;
        this.rockParam = rockParam;
        this.verticalElevated = 0;
        this.stay = true;
        this.score = 0;
        this.holdingLeft = false;
        this.holdingRight = false;
        this.direction = "left";
        this.counter = 0;
        this.monkeyImgIdx = 0;

        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext("2d");
        this.ctx = ctx;
        this.canvas = canvas;
    }

    update() {
        if (!this.isGameOver && !this.stay) {
            this.ySpeed += this.gravity;
            if (this.y <= CONSTANTS.CANVAS_HEIGHT / 4 && this.ySpeed <= 0) {
                //when going up, rock moves down
                for (let i = 0; i < this.rocks.length; i++) {
                    this.rocks[i].y -= this.ySpeed;
                }
            } else {
                // climber moves at yspeed
                this.y += this.ySpeed;
            }
            this.verticalElevated -= this.ySpeed;
        } else if (this.isGameOver) {
            // if fall down to the bottom, game over
            this.showGameOver();
        }

        //when climbing to left
        if (this.holdingLeft === true && !this.stay) {
            // this.direction = "left";
            // this.img = new Image(70, 70);
            // this.img.onload = () => this.draw();
            // this.img.src = leftMonkeyImg;

            this.x -= this.xSpeed;
            if (this.x <= -this.width) {
                this.x = CONSTANTS.CANVAS_WIDTH;
            }
        }

        //when climbing to right
        if (this.holdingRight === true && !this.stay) {
            // this.img = new Image(70, 70);
            // this.img.onload = () => this.draw();
            // this.img.src = rightMonkeyImg;

            this.x += this.xSpeed;
            if (this.x >= CONSTANTS.CANVAS_WIDTH) {
                this.x = -this.width;
            }
        }

        //Check for climb
        for (let i = 0; i < this.rocks.length; i++) {
            if (this.ySpeed >= 0) {
                if (this.x >= this.rocks[i].x - this.width + 70
                    && this.x <= this.rocks[i].x + this.rocks[i].width - 70
                    && this.y >= this.rocks[i].y
                    && this.y <= this.rocks[i].y + this.rocks[i].height - 5) {
                    this.stay = true;
                }
            }
        }

        for (var i = this.rocks.length - 1; i > 0; i--) {
            if (this.rocks[i].y > CONSTANTS.CANVAS_HEIGHT) {
                this.rockParam.bottomRock = i + 1;
                break;
            }
        }

        if (this.y >= this.rocks[this.rockParam.bottomRock].y && !this.stay && this.ySpeed > 0) {
            this.isGameOver = true;
        }

        if (this.rockParam.bottomRock >= 5950) {
            this.rockMover();
        }

        // update mokey img for animation 
        if (this.img) {
            this.counter += 1;
            if (this.counter % 6 === 0) {
                this.monkeyImgIdx = (this.monkeyImgIdx + 1) % 12;
                this.img = MONKEY_LEFT_IMGS[this.monkeyImgIdx];
            }
        } else {
            this.direction = "left";
            this.img = MK_IMG4;
        }
    }

    rockMover() {
        let i = this.rockParam.bottomRock === 0 ? 1 : this.rockParam.bottomRock;

        for (i; i < this.rockParam.bottomRock + 600; i++) {
            if (i >= this.rocks.length) {
                let x = Math.random() * (CONSTANTS.CANVAS_WIDTH - CONSTANTS.ROCK_WIDTH);
                let y = this.rocks[i - 1].y - ((Math.random() * 80) + 35);
                this.rocks.push(new Rock(x, y));
            }
        }

        //Remove blocks out of canvas
        for (let i = 0; i < this.rockParam.bottomRock - 2; i++) {
            rocks.shift();
        }
    }

    // climb is triggerred by key press
    climb() {
        this.stay = false;
        this.ySpeed = -14;
    }

    showGameOver() {
        this.ctx.fillStyle = "#2c3e50";
        this.ctx.fillRect(CONSTANTS.CANVAS_WIDTH / 8, CONSTANTS.CANVAS_HEIGHT / 2.5, 460, 250);

        //set the canvas style for the game over board
        this.ctx.strokeRect(CONSTANTS.CANVAS_WIDTH / 8, CONSTANTS.CANVAS_HEIGHT / 2.5, 460, 250);
        this.ctx.shadowColor = 'black';
        this.ctx.shadowBlur = 20;
        this.ctx.lineJoin = 'bevel';
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = 'black';
        this.ctx.globalAlpha = 0.5;

        // set the font style for game over
        this.ctx.font = "50px Nunito";
        this.ctx.fillStyle = "yellow";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Game Over!", CONSTANTS.CANVAS_WIDTH / 2, CONSTANTS.CANVAS_HEIGHT / 2);
        this.ctx.font = "35px Nunito";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(`Your score is ${this.score}`, CONSTANTS.CANVAS_WIDTH / 2, (CONSTANTS.CANVAS_HEIGHT / 2) + 50);
        this.ctx.fillText("Press enter to restart", CONSTANTS.CANVAS_WIDTH / 2, (CONSTANTS.CANVAS_HEIGHT / 2) + 100);
    }

    draw() {
        // this.ctx.drawImage(this.img, 10, 10, 680, 700, this.x, this.y, this.width, this.height);
        this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}
