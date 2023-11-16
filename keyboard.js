window.addEventListener("keydown", function (event){
    if(event.defultPrevented){
        return;
    }

    switch(event.key){
        case "ArrowDown":
        case 's':
            //down pressed
            moveDown();
        break;

        case "ArrowUp":
        case 'w':
            //up pressed
            moveUp();
        break;

        case "ArrowLeft":
        case 'a': 
            //left pressed
            moveLeft();
        break;

        case "ArrowRight":
        case 'd':
            //right pressed
            moveRight();
        break;

    }
})

function moveUp(){
    if(score == 1 || pastDirection != Direction.DOWN){
        direction = Direction.UP;
    }
    
}

function moveDown(){
    if(score == 1 || pastDirection != Direction.UP){
        direction = Direction.DOWN;
    }
}


function moveLeft(){
    if(score == 1 || pastDirection != Direction.RIGHT){
        direction = Direction.RIGHT;
    }
}


function moveRight(){
    if(score == 1 || pastDirection != Direction.LEFT){
        direction = Direction.LEFT;
    }
}