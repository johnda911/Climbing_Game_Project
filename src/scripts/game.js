// import KingKong from "./kingKong.js";
import Rock from "./rock.js";

import { CONSTANTS, getVerticalGap } from "./constants.js";
import Climber from "./climber.js";



export default class Game {
    constructor() {
        //declare variables 
        this.rocks = [];
        this.bottomRock = 0;


        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext("2d");
        this.ctx = ctx;
        this.canvas = canvas;

        // window.addEventListener('keyleft',this.keyleft,false);
        // window.addEventListener('keyright',this.keyright,false);
        // window.addEventListener('keyup',this.keyup,false);

        this.addRocks();
        this.createClimber();

    }

    addRocks() {
        let firstRock = new Rock(250, 670);
        this.rocks.push(firstRock);
        this.rockMover();
        console.log(this.rocks);
    }

    rockMover() {
        let i = this.bottomRock === 0 ? 1 : this.bottomRock;

        for (i; i < this.bottomRock + 60; i++) {
            if (i >= this.rocks.length) {
                let x = Math.random() * (CONSTANTS.CANVAS_WIDTH - CONSTANTS.ROCK_WIDTH);
                let y = this.rocks[i - 1].y - ((Math.random() * 80) + 30);
                this.rocks.push(new Rock(x, y));
            }
        }

        //Remove blocks out of canvas
        for (let i = 0; i < this.bottomRock - 2; i++) {
            rocks.shift();
        }
    }

    createClimber() {
        new Climber();
    }



}

