// import KingKong from "./kingKong.js";
import Rock from "./rock.js";

import { CONSTANTS, getVerticalGap } from "./constants.js";



export default class Game {
    constructor() {

        //declare variables 
        const gravity = 0.35;
        this.gravity = gravity;
        this.rocks = [];
        this.bottomRock = 0;

        this.addRocks();

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




}

