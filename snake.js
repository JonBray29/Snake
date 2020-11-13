$(function(){
    var canvasContext = $("#snakeCanvas")[0].getContext("2d");
    var snake = [ {x: 250, y: 250}, {x: 260, y: 250}, {x: 270, y: 250}, ];
    var dx = -10;
    var dy = 0;
    var foodX;
    var foodY;
    var score = 0;
    var changingDirection = false;

    $(document).keydown(function(event){
        changeDirection(event);
    });

    drawCanvas();
    generateFood();

    function drawCanvas(){
        if (gameEnded()) return;

        changingDirection = false;

        setTimeout(function onTick(){
            fillCanvas();
            drawFood();
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

        const hasEatenFood = snake[0].x === foodX && snake[0].y === foodY;

        if(hasEatenFood){
            score += 1;
            $("#score").html(score);
            generateFood();
        }
        else{
            snake.pop();
        }
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
            var hasCollided = snake[i].x === snake[0].x && snake[i].y === snake[0].y;

            if(hasCollided) return true;
        }

        var hitTopWall = snake[0].y < 0;
        var hitBottomWall = snake[0].y > $("#snakeCanvas")[0].height - 10;
        var hitRightWall = snake[0].x > $("#snakeCanvas")[0].width - 10;
        var hitLeftWall = snake[0].x < 0;

        return hitTopWall || hitBottomWall || hitRightWall || hitLeftWall;
    }
    //Get random coordinate for the food
    function randomFood(min, max){
        return Math.round((Math.random() * (max-min) + min) / 10) * 10;
    }
    //Generate food location
    function generateFood(){
        foodX = randomFood(0, $("#snakeCanvas")[0].width - 10);
        foodY = randomFood(0, $("#snakeCanvas")[0].height - 10);

        snake.forEach(function hasEatenFood(part){
            let hasEaten = part.x == foodX && part.y == foodY;
            if(hasEaten) generateFood();
        });
    }
    //Draw food onto the canvas
    function drawFood(){
        canvasContext.fillStyle = "white";
        canvasContext.strokeStyle = "white";
        canvasContext.fillRect(foodX, foodY, 10, 10);
        canvasContext.strokeRect(foodX, foodY, 10, 10);
    }         
})

