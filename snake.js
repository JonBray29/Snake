$(function(){
    var canvasContext = $("#snakeCanvas")[0].getContext("2d");
    var hello = "hello";
    var snake = [ {x: 250, y: 250}, {x: 260, y: 250}, {x: 270, y: 250}, ];
    var dx = -10;
    var dy = 0;
    var changingDirection = false;

    $(document).keydown(function(event){
        changeDirection(event);
    });

    drawCanvas();

    function drawCanvas(){
        if (gameEnded()) return;

        changingDirection = false;

        setTimeout(function onTick(){
            fillCanvas();
            moveSnake();
            snake.forEach(drawSnake);
            drawCanvas();
        }, 200);
    }
    //function to fill the canvas with a blakc background
    function fillCanvas(){
        canvasContext.fillStyle = "black";
        canvasContext.fillRect(0, 0, 500, 500);
    }
    //Draws the snake onto the canvas
    function drawSnake(snakePart){
        canvasContext.fillStyle = "white";
        canvasContext.strokeStyle = "black";
        canvasContext.fillRect(snakePart.x, snakePart.y, 10, 10);
        canvasContext.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }
    //Moves the snake
    function moveSnake(){
        var newHead = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(newHead);
        snake.pop();
    }
    //Change direction of snake
    function changeDirection(event){
        var goingUp = dy === -10;
        var goingDown = dy === 10;
        var goingLeft = dx === -10;
        var goingRight = dx === 10;

        if(changingDirection) return;
        changingDirection = true;

        if(event.key === "ArrowUp" && !goingDown){
            dx = 0;
            dy = -10;
        }
        else if(event.key === "ArrowDown" && !goingUp){
            dx = 0;
            dy = 10;
        }
        else if(event.key === "ArrowLeft" && !goingRight){
            dx = -10;
            dy = 0;
        }
        else if(event.key === "ArrowRight" && !goingLeft){
            dx = 10;
            dy = 0;
        }
    }
    //Has game ender
    function gameEnded(){
        for(let i = 4; i < snake.length; i++){
            var hasCollided = snake[i].x === snake[i].x && snake[i].y === snake[i].y;

            if(hasCollided) return true;
        }

        var hitTopWall = snake[0].y < 0;
        var hitBottomWall = snake[0].y > $("#snakeCanvas").height - 10;
        var hitRightWall = snake[0].x > $("snakeCanvas").width - 10;
        var hitLeftWall = snake[0].x < 0;

        return hitTopWall || hitBottomWall || hitRightWall || hitLeftWall;
    }
})

