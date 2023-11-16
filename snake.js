const Direction = {
    LEFT: '0',
    RIGHT: '1',
    UP: '2',
    DOWN: '3'
};

var direction = 4;
var pastDirection = direction;
var score = 1;
var stall = 0;
document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-div');
    const gridSize = 20;
    let snake = [{ x: 5, y: 5 }];
    let food = generateFood();

    function generateFood() {
        var redo = true;

        var x;
        var y;
        //regenerate food if the food spawns on top of the snake
        do{
            x = Math.floor(Math.random() * gridSize);
            y = Math.floor(Math.random() * gridSize);
            
            //TODO FIX THIS BUG
            for(block in snake){
                if(block.x == x && block.y == y){
                    redo = true;
                }
            }
            redo = false;
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

        // Render the game
        renderGame();
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
        block.style.left = x + `px`;
        let y = position.y * gridSize;
        block.style.top = y + `px`;
        gameContainer.appendChild(block);
    }

    // Set up the game loop
    
    var intervalId = window.setInterval(function(){
        updateGame();
      }, 175);
});