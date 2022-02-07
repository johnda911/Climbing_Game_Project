import { CONSTANTS } from "./constants.js";

export default class Rock {
    constructor(bottomDistance, leftBase) {
        if (leftBase) {
            const leftWall = Math.max(leftBase - 1.5 * CONSTANTS.CLIMBER_WIDTH, 0);
            const rightWall = Math.min(leftBase + 1.5 * CONSTANTS.CLIMBER_WIDTH + CONSTANTS.ROCK_WIDTH, CONSTANTS.CANVAS_WIDTH - CONSTANTS.ROCK_WIDTH);
            this.left = leftWall + Math.random() * (rightWall - leftWall);
        } else {
            this.left = CONSTANTS.ROCK_WIDTH * 0.6 + Math.random() * (CONSTANTS.CANVAS_WIDTH - 2 * CONSTANTS.CLIMBER_WIDTH);
        }
        this.bottom = bottomDistance;
        this.renderRock = document.createElement('div');

        const renderRock = this.renderRock;
        renderRock.classList.add('rock');
        renderRock.style.left = this.left + 'px';
        renderRock.style.bottom = this.bottom + 'px';
        document.getElementById("climb-game").appendChild(renderRock);
    }

    getBottom() {
        return this.bottom;
    }

    makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

}


