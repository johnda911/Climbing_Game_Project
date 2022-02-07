// import KingKong from "./kingKong.js";
import Rock from "./rock.js";
import Climber from "./climber.js";
import { CONSTANTS, getVerticalGap } from "./constants.js";


export default class Game {
    // static test() {
    //     console.log('test the jumpler');
    // }


    constructor() {
        this.rocks = [];
        this.createRocks();
        this.createClimber();

        this.beginPoint = this.climberBottom + CONSTANTS.CLIMBER_HEIGHT;

        this.isClimbing = false;
        this.isGoingLeft = false;
        this.isGoingRight = false;

        // 
        // setInterval(this.moveRocks.bind(this), 100);



        // this.rockCounts = 0;
        this.startGame();
    }

    play() {

    }

    gameOver() {
        // isGameOver = true
        // while (grid.firstChild) {
        //   console.log('remove')
        //   grid.removeChild(grid.firstChild)
        // }
        clearInterval(this.climbTimerId);
        clearInterval(this.goLeftTimerId);
        clearInterval(this.goRightTimerId);
        clearInterval(this.fallTimerId);
    }

    startGame() {
        // climb up
        document.addEventListener('keyup', event => {
            if (event.code === 'Space') {
                if (!this.isClimbing) {
                    this.climbTimerId = setInterval(this.climb.bind(this), 50);
                }
            }
            event.stopPropagation();
        });
        // go left
        document.addEventListener('keyup', event => {
            if (event.code === 'ArrowLeft' && this.isClimbing && !this.isGoingLeft) {
                this.isGoingLeft = true;
                this.goLeftTimerId = setInterval(() => {
                    if (this.climberLeft >= 0) {
                        this.climberLeft -= 20;
                        const renderClimber = document.getElementById("climberA");
                        renderClimber.style.left = this.climberLeft + 'px';
                    }
                }, 45);
                setTimeout(() => {
                    clearInterval(this.goLeftTimerId);
                    this.isGoingLeft = false;
                }, 300);
            }
            event.stopPropagation();
        });

        // go right
        document.addEventListener('keyup', event => {
            if (event.code === 'ArrowRight' && this.isClimbing && !this.isGoingRight) {
                this.isGoingRight = true;
                this.goRightTimerId = setInterval(() => {
                    if (this.climberLeft + CONSTANTS.CLIMBER_WIDTH < CONSTANTS.CANVAS_WIDTH) {
                        this.climberLeft += 20;
                        const renderClimber = document.getElementById("climberA");
                        renderClimber.style.left = this.climberLeft + 'px';
                    }
                }, 45);
                setTimeout(() => {
                    clearInterval(this.goRightTimerId)
                    this.isGoingRight = false;
                }, 300);
            }

            event.stopPropagation();
        });
    }

    createClimber() {
        const climber = new Climber(this.rocks[0]);
        this.climberBottom = climber.getClimberBottom();
        this.climberLeft = climber.getClimberLeft();

    }

    // to instantiate, render a rock and add the rock instance to rocks array
    createRocks() {
        let preLeft;
        for (let i = 0; i < CONSTANTS.TOTAL_ROCKS; i++) {
            const verticalGap = getVerticalGap();
            let bottomDistance = CONSTANTS.CLIMBER_HEIGHT + 20 + verticalGap * i;
            const left = !preLeft ? undefined : preLeft;
            let newRock = new Rock(bottomDistance, left);
            preLeft = newRock.left;
            // console.log(left);
            this.rocks.push(newRock);
        }
    }

    moveRocks() {
        if (this.climberBottom + CONSTANTS.CLIMBER_HEIGHT > 300) {
            for (let i = 0; i < this.rocks.length; i++) {
                const rock = this.rocks[i];
                rock.bottom -= CONSTANTS.CLIMBER_HEIGHT;
                rock.renderRock.style.bottom = rock.bottom + 'px';
                console.log(rock.bottom);

                if (rock.bottom < 10) {
                    let firstRock = this.rocks[0].renderRock;
                    firstRock.classList.remove('rock');
                    this.rocks.shift();
                    i--;
                    let newBottom = this.rocks[this.rocks.length - 1].bottom + getVerticalGap();
                    let newLeft = this.rocks[this.rocks.length - 1].left;
                    const newRock = new Rock(newBottom, newLeft);
                    this.rocks.push(newRock);
                }
            }
            // also move climber
            const renderClimber = document.getElementById("climberA");
            renderClimber.style.bottom = this.climberBottom - CONSTANTS.CLIMBER_HEIGHT + 'px';
        }
    }

    climb() {
        //start falling when climb too hight
        if (this.climberBottom + CONSTANTS.CLIMBER_HEIGHT > (this.beginPoint + getVerticalGap() + CONSTANTS.ROCK_HEIGHT)) {
            clearInterval(this.climbTimerId);
            this.fallTimerId = setInterval(this.fall.bind(this), 40);
            // keep climbing up
        } else {
            this.isClimbing = true;
            this.climberBottom += 20;
            const renderClimber = document.getElementById("climberA");
            renderClimber.style.bottom = this.climberBottom + 'px';
        }
    }

    fall() {
        this.isClimbing = false;
        this.climberBottom -= 30;
        const renderClimber = document.getElementById("climberA");
        renderClimber.style.bottom = this.climberBottom + 'px';

        // if fall to bottom, game over 
        if (this.climberBottom <= 0) {
            clearInterval(this.fallTimerId);
            console.log('game over');
            this.gameOver();
        }
        // if the climber catches the rock
        this.rocks.forEach((rock, i) => {
            if (this.climberBottom + CONSTANTS.CLIMBER_HEIGHT >= rock.bottom
                && this.climberBottom + CONSTANTS.CLIMBER_HEIGHT <= rock.bottom + CONSTANTS.ROCK_HEIGHT
                && this.climberLeft + CONSTANTS.CLIMBER_WIDTH >= rock.left
                && this.climberLeft <= rock.left + CONSTANTS.ROCK_WIDTH && !this.isClimbing) {
                clearInterval(this.fallTimerId);
                clearInterval(this.goLeftTimerId);
                clearInterval(this.goRightTimerId);
                const newBottom = rock.bottom - CONSTANTS.CLIMBER_HEIGHT;
                const renderClimber = document.getElementById("climberA");
                renderClimber.style.bottom = newBottom + 'px';
                // renderClimber.style.left = rock.left + 'px';
                this.moveRocks();
                this.beginPoint = rock.bottom;
                this.isClimbing = false;
            }
        });

    }





}

