import { CONSTANTS } from "./constants.js";

export default class Climber {
    constructor(rock) {
        // console.log(rock);
        this.left = rock.left - (CONSTANTS.CLIMBER_WIDTH - CONSTANTS.ROCK_WIDTH) / 2;
        this.bottom = rock.bottom - CONSTANTS.CLIMBER_HEIGHT;
        this.renderClimber = document.createElement('div');

        const renderClimber = this.renderClimber;
        renderClimber.setAttribute("id", "climberA");
        // renderClimber.classList.add('climber');
        renderClimber.style.left = this.left + 'px';
        renderClimber.style.bottom = this.bottom + 'px';
        document.getElementById("climb-game").appendChild(renderClimber);


    }

    getClimberBottom() {
        return this.bottom;
    }

    getClimberLeft() {
        return this.left;
    }

}