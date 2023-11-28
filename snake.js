const Direction = {
    LEFT: '0',
    RIGHT: '1',
    UP: '2',
    DOWN: '3'
};
var intervalId;
var viewportHeight = window.innerHeight;
var viewportWidth = window.innerWidth;

var boardX = viewportWidth;
var boardY = viewportHeight;

var leftOffset = 0;
var topOffset = 0;
resize();

function resize(){
    viewportHeight = window.innerHeight;
    viewportWidth = window.innerWidth;

    let marginX = 80 + viewportWidth % 20;
    let marginY = 80 + viewportHeight % 20;
    boardX = (viewportWidth - marginX) / 20 - 1;
    boardY = (viewportHeight - marginY) / 20 - 1;

    leftOffset = marginX/2;
    topOffset = marginY/2;

    document.body.style.marginLeft = leftOffset + "px";
    document.body.style.marginTop = topOffset + "px";
    document.body.style.width = viewportWidth - marginX + 1 + "px";
    document.body.style.height = viewportHeight - marginY + "px";

}


var direction = 4;
var pastDirection = direction;
var score = 1;
var stall = 0;
var dead = false;

const gameContainer = document.getElementById('game-div');
const gridSize = 20;
let snake = [{ x: Math.floor(boardX/2), y: Math.floor(boardY/2) }];
let food = generateFood();

function generateFood() {
    var redo = true;

    var x;
    var y;
    //regenerate food if the food spawns on top of the snake
    do{
        x = Math.floor(Math.random() * (boardX));
        y = Math.floor(Math.random() * (boardY));
        
        var good = true;
        for(var i = 0; i < snake.length; i++){
            if(snake[i].x == x && snake[i].y == y){
                good = false;
                break;
            }
        }
        if(good){
            redo = false;
        }
        
    } while(redo);
    
    return { x, y };
}

function updateGame() {
    // Update game logic here
    // Move snake, check for collisions, handle food, etc.

    // Example: Move the snake to the right
    const head = Object.assign({}, snake[0]); // Clone the head

    switch(direction){
        case Direction.LEFT:
            head.x += 1;
            break;
        case Direction.RIGHT:
            head.x -= 1;
            break;
        case Direction.UP:
            head.y -= 1;
            break;
        case Direction.DOWN:
            head.y += 1;
            break;
        default:
            break;
    }

    

    pastDirection = direction;

    snake.unshift(head);

    // Check for collisions and handle food logic
    if (head.x === food.x && head.y === food.y) {
        // Snake ate the food
        food = generateFood();
        score++;
        stall += 3;
    } else if(stall != 0){
        stall--;
    } else {
        // Remove the tail if no food was eaten
        snake.pop();
    }

    if(head.x > boardX || head.x < 0 || head.y > boardY || head.y < 0){
        dead = true;
    } else {
        for(var i = 1; i < snake.length; i++){
            if(head.x == snake[i].x && head.y == snake[i].y){
                dead = true;
                break;
            }
        }
    }


    // Render the game
    if(!dead){
        renderGame();
    } else {
        window.clearInterval(intervalId);

        let popup = document.createElement("div");
        popup.id = "pop-up";
        let text = document.createTextNode("Javascript Snake");

        let text2 = document.createTextNode("You died :(");

        popup.appendChild(text);
        
        p = document.createElement("p");

        popup.appendChild(p);

        popup.appendChild(text2);


        p2 = document.createElement("p");

        popup.appendChild(p2);

        let button = document.createElement("button");
        button.textContent = 'Play Again!';
        
        button.addEventListener('click', () => {
            console.log("clicked");
            reset();
            popup.style.display = "none";
        });


        popup.appendChild(button);

        gameContainer.appendChild(popup);
    }
    
}

function reset(){
    snake = [{ x: Math.floor(boardX/2), y: Math.floor(boardY/2) }];
    food = generateFood();
    direction = 4;
    pastDirection = direction;
    score = 1;
    stall = 0;
    dead = false;

    intervalId = window.setInterval(function(){
        updateGame();
        }, 100);
}

function renderGame() {
    // Clear the game container
    gameContainer.innerHTML = '';

    // Render snake
    snake.forEach(block => 
        
        renderBlock(block, 'snake-block')
    );

    // Render food
    renderBlock(food, 'food-block');
}

function renderBlock(position, className) {
    const block = document.createElement('div');
    block.className = className;
    let x = position.x * gridSize;
    block.style.left = x + leftOffset + `px`;
    let y = position.y * gridSize;
    block.style.top = y + topOffset + `px`;
    gameContainer.appendChild(block);
}

document.addEventListener('DOMContentLoaded', () => {
    resize();
    window.onresize = resize;
    // Set up the game loop
    intervalId = window.setInterval(function(){
        updateGame();
      }, 100);
});