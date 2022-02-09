// import KingKong from "./kingKong.js";
import { CONSTANTS, getVerticalGap } from "./constants.js";
import Rock from "./rock.js";
import Climber from "./climber.js";
import jungle from "../imgs/jungle.png";
import scoreLogo from "../imgs/score_logo.png";



export default class Game {
    constructor() {
        //declare variables 
        this.rocks = [];
        this.bottomRock = 0;
        this.rockParam = {
            bottomRock: 0
        };
        this.score = 0;


        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext("2d");
        this.ctx = ctx;
        this.canvas = canvas;

        this.addRocks();
        this.climber = this.createClimber(this.rocks, this.rockParam);
        this.startGame();


        // Time variables
        this.fps = 70;
        this.now;
        this.then = Date.now();
        this.interval = 1000 / this.fps;
        this.delta;

        this.isAnimationOn = false;
    }

    addRocks() {
        let firstRock = new Rock(250, 670);
        this.rocks.push(firstRock);
        this.rockMover();
    }

    rockMover() {
        let i = this.bottomRock === 0 ? 1 : this.bottomRock;

        for (i; i < this.bottomRock + 600; i++) {
            if (i >= this.rocks.length) {
                let x = Math.random() * (CONSTANTS.CANVAS_WIDTH - CONSTANTS.ROCK_WIDTH);
                let y = this.rocks[i - 1].y - ((Math.random() * 80) + 35);
                this.rocks.push(new Rock(x, y));
            }
        }

        //Remove blocks out of canvas
        for (let i = 0; i < this.bottomRock - 2; i++) {
            rocks.shift();
        }
    }

    createClimber(rocks, rockParam) {
        return new Climber(rocks, rockParam);
        // this.climber = new Climber(this.rocks, this.rockParam);
    }

    startGame() {
        // climb up
        document.addEventListener('keyup', event => {
            if (event.code === 'Space' && this.climber.stay) {
                this.climber.climb();
            }

            if (event.code === 'ArrowLeft') {
                this.climber.holdingLeft = false;
            }
            if (event.code === 'ArrowRight') {
                this.climber.holdingRight = false;
            }
            event.stopPropagation();
        });

        // go left/right
        document.addEventListener('keydown', event => {
            if (event.code === 'ArrowLeft' && !this.climber.isGameOver) {
                this.climber.holdingLeft = true;
            }
            if (event.code === 'ArrowRight' && !this.climber.isGameOver) {
                this.climber.holdingRight = true;
            }
            if (event.code === 'Enter' && this.climber.isGameOver) {
                this.climber.isGameOver = false;
                this.resetGame();
            }

            event.stopPropagation();
        });

        // let the animation begin
        if (!this.isAnimationOn) {
            this.loop();
        }
    }

    showRockCounts() {
        if (this.climber.verticalElevated > this.climber.score) {
            this.climber.score = Math.round(this.climber.verticalElevated);
        }
        //create banana score logo in the upperleft of the canvas
        this.img = new Image(20, 35);
        this.img.src = scoreLogo;
        this.ctx.drawImage(this.img, 10, 2, 20, 35);

        //render the score showing on upperleft corner of canvas
        this.ctx.font = "30px Nunito";
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "left";
        this.ctx.fillText(this.climber.score, 35, 30);
    }

    resetGame() {
        this.rocks = [];
        this.bottomRock = 0;
        this.rockParam = {
            bottomRock: 0
        };
        this.addRocks();

        this.climber = this.createClimber(this.rocks, this.rockParam);
        this.climber.x = 250;
        this.climber.y = 670;

        this.ctx.globalAlpha = 1;
        this.ctx.shadowColor = '#000000';
        this.ctx.shadowBlur = 0;
        this.startGame();

    }

    loop() {
        this.isAnimationOn = true;
        requestAnimationFrame(() => this.loop());

        //sets the FPS to 60
        this.now = Date.now();
        this.delta = this.now - this.then;

        // Moving canvas jungle background to be continued
        let backgroundImage = new Image();
        backgroundImage.onload = () => {
            this.ctx.drawImage(backgroundImage, 0, 0, CONSTANTS.CANVAS_WIDTH, CONSTANTS.CANVAS_HEIGHT);
        };
        backgroundImage.src = jungle;

        if (this.delta > this.interval) {
            for (let j = 0; j < this.rocks.length; j++) {
                if (this.rocks[j] !== 0) {
                    //add rock.update after dragon feature
                    // this.rocks[j].update();
                    this.rocks[j].draw();
                }
            }

            this.climber.update();
            this.climber.draw();
            this.showRockCounts();

            this.then = this.now - (this.delta % this.interval);
        }
    }

}

