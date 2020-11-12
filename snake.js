$(function(){
    var canvasContext = $("#snakeCanvas")[0].getContext("2d");
    var hello = "hello";
    var snake = [ {x: 250, y: 250}, {x: 260, y: 250}, {x: 270, y: 250}, ];
    var dx = -10;
    var dy = 0;

    drawCanvas();

    function drawCanvas(){
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
    
})

