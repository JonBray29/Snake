$(function(){
    var hello = "hello";
    
    //fill the canvas with a black background
    fillCanvas();
    

    //function to fill the canvas with a blakc background
    function fillCanvas(){
        var canvas = $("#snakeCanvas")[0].getContext("2d");
    
        canvas.beginPath();
        canvas.rect(0, 0, 500, 500);
        canvas.fillStyle = "black";
        canvas.fill();
    }
})

