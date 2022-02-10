# The Climbing Game

# Background

The Monkey Climbing game is javascript game where you control a monkey to climb on bananas and climb as high as you can without falling. You will get scored with the climbing distance you have made during the game.

# Functionality & MVPs

In the climbing game, users will be able to:

- use the left/right keyboard to control the climbing direction and reach the bananas to avoid falling off
- see moving bananas as they climb all the way up
- accumulate their scores by climbing as much as they could

In addition, this project will include:

- An **About** modal describing the background and rules of the game
- A production README

# Wireframes

![Alt text](./Wireframe.png)

- On the upper right corner, three clickable contact icons of the author are presented for users to get information about the game creator.
- Instruction on the left column includes the background and rules of the game.
- A music button on the lower left corner to control the music on and off.
- Score on the upper left of the game canvas keeps track of the climbing distance the player accumulates.

# Technologies, Libraries, APIs

I use the native browser technology, Canvas API to render the background of the game, bananas as well as the monkey, all the motions involved.

# Implementation Timeline

- **Friday Afternoon & Weekend**: Setup project, including getting webpack up and running. Get moving canvas to show up on the screen, and spend time getting comfortable with the Canvas API. Create `Rock` and individual `Character`, `Dragon`and `BrokenRock` classes. Get a character rendered to the canvas reflecting the climbing motion during the game.
- **Monday**: Dedicate this day toward implementing the underlying logic of the game. Ensure that I can get the moving canvas work and the snow flacks/ fire-breathing dragon work appropriately. If time, make sure this is all rendered correctly on the canvas.
- **Tuesday**: If I didn't get to it already, get everything correctly rendered to the canvas. Make sure they re-render correctly when I restart the game. Then, focus on user controls: left, right arrows keyboard controls.
- **Wednesday**: Finish implementing user controls, and focus on styling, as well as implementing the different color schemes and nav links. If time, start on bonuses.
- **Thursday Morning**: Deploy to GitHub pages. If time, rewrite this proposal as a production README.

# Bonus features

There are many themes and characters with different climbing behaviors I can add on to the main game.

- More themes to choose from a drop down list.
- More obstacles and reward types to be encoutered the higher the monkey climbs up.
- Create different motion effect on different characters accordingly, rather than just a different images.
