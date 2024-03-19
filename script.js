document.addEventListener("DOMContentLoaded", function() {
    const ball = document.getElementById("ball");
    const paddle = document.getElementById("paddle");
    const bricksContainer = document.getElementById("bricks");

    // Create bricks
    const brickRowCount = 5;
    const brickColumnCount = 12;

    for(let c = 0; c < brickColumnCount; c++) {
        for(let r = 0; r < brickRowCount; r++) {
            const brick = document.createElement("div");
            brick.classList.add("brick");
            brick.style.left = (c * 60) + "px";
            brick.style.top = (r * 30) + "px";
            bricksContainer.appendChild(brick);
        }
    }

    // Ball movement
    let ballX = 300;
    let ballY = 200;
    let ballSpeedX = 3;
    let ballSpeedY = 3;

    function moveBall() {
        ballX += ballSpeedX;
        ballY += ballSpeedY;
        ball.style.left = ballX + "px";
        ball.style.top = ballY + "px";

        // Collisions with walls
        if (ballX <= 0 || ballX >= 580) {
            ballSpeedX *= -1;
        }
        if (ballY <= 0) {
            ballSpeedY *= -1;
        }

        // Collision with paddle
        if (ballY >= 380 && ballX >= paddle.offsetLeft && ballX <= paddle.offsetLeft + 80) {
            ballSpeedY *= -1;
        }

        // Collision with bricks
        const bricks = document.querySelectorAll(".brick");
        bricks.forEach(brick => {
            if (ballY <= brick.offsetTop + 20 &&
                ballX >= brick.offsetLeft &&
                ballX <= brick.offsetLeft + 50) {
                ballSpeedY *= -1;
                brick.remove();
            }
        });

        // Game over
        if (ballY >= 420) {
            alert("Game Over!");
            location.reload();
        }

        requestAnimationFrame(moveBall);
    }

    moveBall();

    // Paddle movement
    document.addEventListener("keydown", function(e) {
        if (e.key === "ArrowLeft" && paddle.offsetLeft > 0) {
            paddle.style.left = (paddle.offsetLeft - 20) + "px";
        }
        if (e.key === "ArrowRight" && paddle.offsetLeft < 520) {
            paddle.style.left = (paddle.offsetLeft + 20) + "px";
        }
    });
});
