var paused = false;
var popup;
window.addEventListener("keydown", function (event){
    if(event.defultPrevented){
        return;
    }

    switch(event.key){
        case " ":
            pause();
            break;
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
    if(score == 1 || pastDirection != Direction.LEFT){
        direction = Direction.RIGHT;
    }
}


function moveRight(){
    if(score == 1 || pastDirection != Direction.RIGHT){
        direction = Direction.LEFT;
    }
}

function pause(){
    console.log("paused");
    paused = !paused;

    if(!dead && paused){
        window.clearInterval(intervalId);

        popup = document.createElement("div");
        popup.id = "pop-up";
        let text = document.createTextNode("Game Paused");

        let text2 = document.createTextNode("Press Space to unpause");

        popup.appendChild(text);
        
        p = document.createElement("p");

        popup.appendChild(p);

        popup.appendChild(text2);


        p2 = document.createElement("p");

        popup.appendChild(p2);

        document.getElementById('game-div').appendChild(popup);

    } else {
        popup.remove();
        intervalId = window.setInterval(function(){
            updateGame();
          }, 100);
    }
}