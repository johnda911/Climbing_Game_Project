import { CONSTANTS } from "./constants.js";
import leftMonkeyImg from "../imgs/monkey.png";

export default class Climber {
    constructor(rocks, rockParam) {

        this.x = 250;
        this.y = 700;
        this.width = CONSTANTS.CLIMBER_WIDTH;
        this.height = CONSTANTS.CLIMBER_HEIGHT;
        this.gravity = CONSTANTS.GRAVITY;
        this.xSpeed = 6.8;
        this.ySpeed = -15;
        this.direction = "left";
        this.isGameOver = false;
        this.rocks = rocks;
        this.rockParam = rockParam;
        this.yDistanceTravelled = 0;
        this.stay = false;



        this.img = new Image(70, 70);
        this.img.onload = () => this.draw();
        this.img.src = leftMonkeyImg;
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext("2d");
        this.ctx = ctx;
        this.canvas = canvas;

        // this.draw();

    }


    update() {
        if (!this.isGameOver && !this.stay) {
            // climber is falling
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
            this.yDistanceTravelled -= this.ySpeed;
        } else if (this.isGameOver) {
            // if fall down to the bottom, game over
            this.ctx.font = "60px Arial";
            this.ctx.fillStyle = "orange";
            this.ctx.textAlign = "center";
            this.ctx.fillText("Game Over!", CONSTANTS.CANVAS_WIDTH / 2, CONSTANTS.CANVAS_HEIGHT / 2);
            this.ctx.font = "30px Arial";
            this.ctx.fillText("Press space to restart", CONSTANTS.CANVAS_WIDTH / 2, (CONSTANTS.CANVAS_HEIGHT / 2) + 50);
        }

        // //holding left key
        // if (holdingLeftKey) {
        //this.stay = false
        //     this.direction = "left";
        //     // this.img.src = "";
        //     this.climber.moveLeft();
        // }
        // //holding right key
        // if (holdingRightKey) {
        //     this.direction = "right";
        //     // this.img.src = "";
        //     this.climber.moveRight();
        // }

        //Check for climb
        for (let i = 0; i < this.rocks.length; i++) {
            if (this.ySpeed >= 0) {
                if (this.x >= this.rocks[i].x - this.width + 15 && this.x <= this.rocks[i].x + this.rocks[i].width - 15 &&
                    this.y >= this.rocks[i].y && this.y <= this.rocks[i].y + this.rocks[i].height) {
                    // this.climb();
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

        if (this.y >= this.rocks[this.rockParam.bottomRock].y) {
            // this.isGameOver = true;
        }

        if (this.rockParam.bottomRock >= 45) {
            this.rockMover();
        }
    }

    rockMover() {
        let i = this.rockParam.bottomRock === 0 ? 1 : this.rockParam.bottomRock;

        for (i; i < this.rockParam.bottomRock + 60; i++) {
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

    climb() {
        this.ySpeed = -13;
        this.ySpeed += this.gravity;
        this.y -= this.ySpeed;
    }

    //when climbing to left
    moveLeft() {
        this.x -= this.xSpeed;
        if (this.x <= -this.width) {
            this.x = CONSTANTS.CANVAS_WIDTH;
        }
    }

    //when climbing to right
    moveRight() {
        this.x += this.xSpeed;
        if (this.x >= CONSTANTS.CANVAS_WIDTH) {
            this.x = -this.width;
        }
    }

    draw() {
        this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}
