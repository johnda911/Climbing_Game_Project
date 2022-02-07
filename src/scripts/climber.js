import { CONSTANTS } from "./constants.js";

export default class Climber {
    constructor() {


        this.x = 250;
        this.y = 700;
        this.width = CONSTANTS.CLIMBER_WIDTH;
        this.height = CONSTANTS.CLIMBER_HEIGHT;
        this.gravity = CONSTANTS.GRAVITY;
        this.xSpeed = 6.8;
        this.ySpeed = 0;
        this.direction = "left";
        this.isGameOver = false;
        // this.img = new Image();
        // this.img.src = "imgs/leftMonkey.png";

        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext("2d");
        this.ctx = ctx;
        this.canvas = canvas;

        this.draw();

    }


    update() {
        if (!this.isGameOver) {
            this.ySpeed += this.gravity;
            if (this.y <= this.canvas.height / 2 - 200 && this.ySpeed <= 0) {
                for (let i = 0; i < rocks.length; i++) {
                    rocks[i].y -= this.ySpeed;
                }
            } else {
                this.y += this.ySpeed;
            }
            yDistanceTravelled -= this.ySpeed;
        } else {
            ctx.font = "60px Arial";
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.fillText("You Died!", screenWidth / 2, screenHeight / 2);
            ctx.font = "36px Arial";
            ctx.fillText("Press r to restart", screenWidth / 2, (screenHeight / 2) + 50);
        }

        //holding left key
        if (holdingLeftKey) {
            this.direction = "left";
            this.img.src = "Sprites/leftPlayer.png";
            player.moveLeft();
        }
        //holding right key
        if (holdingRightKey) {
            this.direction = "right";
            this.img.src = "Sprites/rightPlayer.png";
            player.moveRight();
        }

        //Check for jump
        for (var i = 0; i < blocks.length; i++) {
            if (this.ySpeed >= 0) {
                if (this.x >= blocks[i].x - this.width + 15 && this.x <= blocks[i].x + blocks[i].width - 15 &&
                    this.y >= blocks[i].y - this.height && this.y <= blocks[i].y + blocks[i].height - this.height) {
                    if (blocks[i].type === "break") {
                        blocks[i] = 0;
                    } else if (blocks[i].monster !== 0) {
                        this.jump(blocks[i].powerup, blocks[i].type);
                        blocks[i] = 0;
                    } else {
                        this.jump(blocks[i].powerup, blocks[i].type);
                    }
                }
            }
        }


        for (var i = blocks.length - 1; i > 0; i--) {
            if (blocks[i].y > screenHeight) {
                lowestBlock = i + 1;
                break;
            }
        }

        if (this.y >= blocks[lowestBlock].y) {
            dead = true;
        }

        if (lowestBlock >= 45) {
            if (difficulty < 6) {
                difficulty += 1;
            }
            blockSpawner();
        }
    }

    jump() {
        this.ySpeed = -13.2;
    }

    moveLeft() {

    }

    moveRight() {
        this.x += this.xSpeed;
        if (this.x >= screenWidth) {
            this.x = -this.width;
        }
    }

    draw() {
        // this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
