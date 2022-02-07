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








// //====================================================
// document.addEventListener('DOMContentLoaded', () => {
//     const grid = document.querySelector('.grid')
//     const doodler = document.createElement('div')
//     let isGameOver = false
//     let speed = 3
//     let platformCount = 5
//     let platforms = []
//     let score = 0
//     let doodlerLeftSpace = 50
//     let startPoint = 150
//     let doodlerBottomSpace = startPoint
//     const gravity = 0.9
//     let upTimerId
//     let downTimerId
//     let isJumping = true
//     let isGoingLeft = false
//     let isGoingRight = false
//     let leftTimerId
//     let rightTimerId

//     class Platform {
//         constructor(newPlatBottom) {
//             this.left = Math.random() * 315
//             this.bottom = newPlatBottom
//             this.visual = document.createElement('div')

//             const visual = this.visual
//             visual.classList.add('platform')
//             visual.style.left = this.left + 'px'
//             visual.style.bottom = this.bottom + 'px'
//             grid.appendChild(visual)
//         }
//     }


//     function createPlatforms() {
//         for (let i = 0; i < platformCount; i++) {
//             let platGap = 600 / platformCount
//             let newPlatBottom = 100 + i * platGap
//             let newPlatform = new Platform(newPlatBottom)
//             platforms.push(newPlatform)
//             console.log(platforms)
//         }
//     }

//     function movePlatforms() {
//         if (doodlerBottomSpace > 200) {
//             platforms.forEach(platform => {
//                 platform.bottom -= 4
//                 let visual = platform.visual
//                 visual.style.bottom = platform.bottom + 'px'

//                 if (platform.bottom < 10) {
//                     let firstPlatform = platforms[0].visual
//                     firstPlatform.classList.remove('platform')
//                     platforms.shift()
//                     console.log(platforms)
//                     score++
//                     var newPlatform = new Platform(600)
//                     platforms.push(newPlatform)
//                 }
//             })
//         }

//     }

// }
// //====================================================
// const CONSTANTS = {
//     PIPE_SPEED: 2,
//     GAP_HEIGHT: 150,
//     PIPE_WIDTH: 50,
//     EDGE_BUFFER: 50,
//     PIPE_SPACING: 220,
//     WARM_UP_SECONDS: 1
// };

// export default class Level {
//     constructor(dimensions) {
//         this.dimensions = dimensions;

//         const firstPipeDistance =
//             this.dimensions.width +
//             (CONSTANTS.WARM_UP_SECONDS * 60 * CONSTANTS.PIPE_SPEED);

//         this.pipes = [
//             this.randomPipe(firstPipeDistance),
//             this.randomPipe(firstPipeDistance + CONSTANTS.PIPE_SPACING),
//             this.randomPipe(firstPipeDistance + (CONSTANTS.PIPE_SPACING * 2)),
//         ];
//     }

//     randomPipe(x) {
//         const heightRange = this.dimensions.height - (2 * CONSTANTS.EDGE_BUFFER) - CONSTANTS.GAP_HEIGHT;
//         const gapTop = (Math.random() * heightRange) + CONSTANTS.EDGE_BUFFER;
//         const pipe = {
//             topPipe: {
//                 left: x,
//                 right: CONSTANTS.PIPE_WIDTH + x,
//                 top: 0,
//                 bottom: gapTop
//             },
//             bottomPipe: {
//                 left: x,
//                 right: CONSTANTS.PIPE_WIDTH + x,
//                 top: gapTop + CONSTANTS.GAP_HEIGHT,
//                 bottom: this.dimensions.height
//             },
//             passed: false
//         };
//         return pipe
//     }

//     animate(ctx) {
//         this.drawBackground(ctx);
//         this.movePipes();
//         this.drawPipes(ctx);
//     }

//     drawBackground(ctx) {
//         ctx.fillStyle = "skyblue";
//         ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
//     }

//     passedPipe(bird, callback) {
//         this.eachPipe((pipe) => {
//             if (pipe.topPipe.right < bird.left) {
//                 if (!pipe.passed) {
//                     pipe.passed = true;
//                     callback();
//                 }
//             }
//         });
//     }

//     movePipes() {
//         this.eachPipe(function (pipe) {
//             pipe.topPipe.left -= CONSTANTS.PIPE_SPEED;
//             pipe.topPipe.right -= CONSTANTS.PIPE_SPEED;
//             pipe.bottomPipe.left -= CONSTANTS.PIPE_SPEED;
//             pipe.bottomPipe.right -= CONSTANTS.PIPE_SPEED;
//         });

//         //if a pipe has left the screen add a new one to the end
//         if (this.pipes[0].topPipe.right <= 0) {
//             this.pipes.shift();
//             const newX = this.pipes[1].topPipe.left + CONSTANTS.PIPE_SPACING;
//             this.pipes.push(this.randomPipe(newX));
//         }
//     }

//     drawPipes(ctx) {
//         this.eachPipe(function (pipe) {
//             ctx.fillStyle = "green";

//             //draw top pipe
//             ctx.fillRect(
//                 pipe.topPipe.left,
//                 pipe.topPipe.top,
//                 CONSTANTS.PIPE_WIDTH,
//                 pipe.topPipe.bottom - pipe.topPipe.top
//             );
//             //draw bottom pipe
//             ctx.fillRect(
//                 pipe.bottomPipe.left,
//                 pipe.bottomPipe.top,
//                 CONSTANTS.PIPE_WIDTH,
//                 pipe.bottomPipe.bottom - pipe.bottomPipe.top
//             );
//         });
//     }

//     eachPipe(callback) {
//         this.pipes.forEach(callback.bind(this));
//     }
//     //This method shall return true if the bird passed in is currently
//     //colliding with any pipe.
//     collidesWith(bird) {
//         //this function returns true if the the rectangles overlap
//         const _overlap = (rect1, rect2) => {
//             //check that they don't overlap in the x axis
//             if (rect1.left > rect2.right || rect1.right < rect2.left) {
//                 return false;
//             }
//             //check that they don't overlap in the y axis
//             if (rect1.top > rect2.bottom || rect1.bottom < rect2.top) {
//                 return false;
//             }
//             return true;
//         };
//         let collision = false;
//         this.eachPipe((pipe) => {
//             if (
//                 //check if the bird is overlapping (colliding) with either pipe
//                 _overlap(pipe.topPipe, bird) ||
//                 _overlap(pipe.bottomPipe, bird)
//             ) { collision = true; }
//         });
//         return collision;
//     }
// }
