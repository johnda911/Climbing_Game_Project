# The Monkey Climbing Game

# Background

The Monkey Climbing game is javascript game where you control a monkey to climb on bananas and climb as high as you can without falling. You will get scored with the climbing distance you have made during the game.

# Link to Live Site

https://johnda911.github.io/Climbing_Game_Project/

# Technologies, Libraries, APIs

I use the native browser technology, Canvas API to render the background of the game, bananas as well as the monkey, all the motions involved.

# Animation Effects

All the animations are built up on the event listener and the callback equestAnimationFrame. I set up the fps to 70 so that the callback is invoked and repaint the canvas every 1 second / 70 frames. That's why players can see the bananas/monkey moving onscreen visually.

# Code Snippets Highlights

The monkey is swinging on a banana when the status is idle. It was not recommended to do a frame by frame animation on the game canvas. In order to address that, I created an empty array as a contained for storing all my consecutive static png of my monkey, then I was able to iterate through the image array so that whenever the callback is invoked, the image will get replaced with the next following image in the array.

```javascript
// step1: after loading all consecutive motion images of the monkey, I created an awway including all the images variables inside:
const MONKEY_LEFT_IMGS = [MK_IMG0, MK_IMG1, MK_IMG2, MK_IMG3, MK_IMG4, MK_IMG5, MK_IMG6, MK_IMG7, MK_IMG8, MK_IMG9, MK_IMG10, MK_IMG11];

//step2: start interating through the index of the image array while still repainting 70 frams every second.
this.counter += 1;
    if (this.counter % 6 === 0) {
        this.monkeyImgIdx = (this.monkeyImgIdx + 1) % 12;
        this.img = MONKEY_LEFT_IMGS[this.monkeyImgIdx];
    }};

```
