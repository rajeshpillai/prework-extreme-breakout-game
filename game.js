class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.w = canvas.width;
        this.h = canvas.height;
        this.ctx = canvas.getContext('2d');
        this.trialRun = false;
        this.gameLevel = 1;
        this.gameLoop = null;
        this.isPaused = false;
        this.entities = [];
        this.keyPressed = {};
        this.handleEvents = this.handleEvents.bind(this);
        
        document.addEventListener("keydown", this.handleEvents)
        document.addEventListener("keyup", this.handleEvents)

        this.init = this.init.bind(this);
        this.draw = this.draw.bind(this);
        this.pause = this.pause.bind(this);
        this.resume = this.resume.bind(this);
        this.update = this.update.bind(this);
        this.start = this.start.bind(this);
        this.init();
    }

    init () {
        this.ball = new Ball({ctx:this.ctx, x:50, y:450, r:12});
        this.paddle = new Paddle({ctx: this.ctx, x:40,y:500,w:80,h:20});
        this.score = new Score({ctx: this.ctx, x:0, y:575});
        this.wall = new Wall({
            ctx: this.ctx,
            x:0, 
            y:0,
            w: this.canvas.width, 
            bricksPerRow: 16,
        });
        
        this.bg = new Background();

        this.entities = [this.ball, this.paddle, this.score, 
                    this.wall, this.bg];

    }

    handleEvents(e) {
        if (e.keyCode === 32 && !this.inprogress) {  // space key
            document.querySelector(".startup").style.display = "none";
            document.getElementById("canvas-wrapper").style.display = 'block';
            document.getElementById("canvas").style.display='block';
            //document.removeEventListener("keyup", this.handleEvents);
             this.start();
        }

        if (e.keyCode === 81) {
            this.quitting = true;
            this.endGame();
            this.quitting = false;
            return;
        }

        // Convert the key code to key name
        let keyName = Game.keys[e.which];
        if (keyName) {
            this.keyPressed[keyName] = (e.type === "keydown");
            e.preventDefault();
        }
    }

    showStartScreen() {
        document.querySelector(".startup").style.display = "block";
        document.getElementById("canvas-wrapper").style.display = 'none';
        document.getElementById("canvas").style.display='none';
        this.start();
    }

    start() {
        this.inprogress = true;
        if (this.quitting) return;
        this.clear();
        this.gameLoop = window.requestAnimationFrame(this.start);
        this.update();
        this.draw();
    }

    endGame() {
        this.inprogress = false;
        window.cancelAnimationFrame(this.gameLoop);
        this.showStartScreen();
    }

    update() {
        this.entities.forEach((entity => {
            if (entity.update) {
                entity.update();
                switch(entity.type) {
                    case "ball":
                        this.handleBall(entity);
                        return;
                    case "paddle":
                        this.handlePaddle(entity);
                        break;
                }
            }
        }));
    }

    handlePaddle(paddle) {
        let speed = 2;
        if (this.keyPressed.left) {
            paddle.xVelocity = -speed;
        } else if (this.keyPressed.right) {
            paddle.xVelocity = speed;
        } 

        if (paddle.intersect(this.ball)) {
            console.log("COLLIDE>..");
            this.ball.yVelocity *= -1;
        }

        if (paddle.x > this.w-paddle.w) paddle.xVelocity = -speed;
        if (paddle.x < 0) paddle.xVelocity = speed;
    }

    handleBall(ball) {
        if (ball.y > this.h - ball.h || ball.y < 0) {
            ball.yVelocity *= -1;
        }
        if (ball.x > this.w - ball.w || ball.x < 0) {
            ball.xVelocity *=-1;
        }

        for(let i =0; i < this.wall.bricks.length; i++) {
            let b = this.wall.bricks[i];
            if (b.intersect(ball)) {
                console.log("BALL intersects BRICK..");
                b.show = false;
            }
        }
    }

    draw() {
        this.entities.forEach((entity => {
            if (entity.draw) entity.draw();
        }));
    }

    clear() {
        let ctx = this.ctx;
        ctx.fillStyle = "black";
        ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        ctx.restore();
    }

    
    pause () {

    }

    resume () {

    }
}

Game.keys = {
    32: 'space',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    81: 'quit',
}


let game = new Game(document.getElementById("canvas"));