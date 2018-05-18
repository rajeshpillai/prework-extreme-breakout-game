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
        document.getElementById("btnContinue").addEventListener("click", ()=> this.onContinue());
        window.addEventListener('resize', this.resize, false);

        this.init = this.init.bind(this);
        this.draw = this.draw.bind(this);
        this.pause = this.pause.bind(this);
        this.resume = this.resume.bind(this);
        this.update = this.update.bind(this);
        this.start = this.start.bind(this);
        this.init();
    }
    
    resize() {
        // Our canvas must cover full height of screen
        // regardless of the resolution
        let height = window.innerHeight;
        let canvas = this.canvas;
        
        // So we need to calculate the proper scaled width
        // that should work well with every resolution
        let ratio = canvas.width/canvas.height;
        let width = height * ratio;
        
        canvas.style.width = width+'px';
        canvas.style.height = height+'px';
    }

    init () {
        this.ball = new Ball({ctx:this.ctx, x:50, y:450, r:12});
        this.ball.loadSprite('./assets/pokeball.png');
        this.score = Score;
        this.particles = [];
        

        this.paddle = new Paddle({ctx: this.ctx, x:40,y:500,w:80,h:20});

        switch(this.gameLevel) {
            case 1:
                this.brickRows = 1;
                break;
            case 2:
                this.brickRows = 2;
                break;
            default:
                this.brickRows = 1;
        }
        this.wall = new Wall({
            ctx: this.ctx,
            x:0, 
            y:0,
            w: this.canvas.width, 
            bricksPerRow: 16,
            rows: this.brickRows
        });
        
        this.bg = new Background();

        Score.init(this.ctx);

        this.entities = [this.ball, this.paddle, 
                    this.wall, this.score, this.bg];

    }

    setupParticles(b) {
        for(let i = 0; i < 25; i++)  {
            let p = new Particle(this.ctx, b.x, b.y + b.h, b.fillStyle);
            this.particles.push(p);
        }
    }

    onContinue () {
        if (!this.inprogress) {  // space key
            this.startGame();
        }
    }

    handleEvents(e) {
        console.log(e);
        // Convert the key code to key name
        let keyName = Game.keys[e.which];
        
        if (keyName) {
            this.keyPressed[keyName] = (e.type === "keydown");
            e.preventDefault();
        }

        if (e.keyCode === 32 && !this.inprogress) {  // space key
            this.startGame();
        }

        if (e.keyCode === 81) {
            this.quitting = true;
            this.endGame();
            this.quitting = false;
            return;
        }

        
    }

    startGame() {
        document.querySelector(".startup").style.display = "none";
        document.getElementById("canvas-wrapper").style.display = 'block';
        document.getElementById("canvas").style.display = 'block';
        //document.removeEventListener("keyup", this.handleEvents);
        this.init();
        this.start();
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
        this.checkWinner();
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

    checkWinner() {
        if (this.wall.totalBricks === 0) {
            alert("You won!");
            this.quitting = true;
            this.endGame();
            this.quitting = false;
            this.inprogress = false;
            this.gameLevel++;
            if (this.gameLevel > 2) {
                this.gameLevel = 1;
            }
            return;
        }
    }

    handlePaddle(paddle) {
        let speed = 2;
        if (this.keyPressed.left) {
            paddle.vx = -speed;
        } else if (this.keyPressed.right) {
            paddle.vx = speed;
        } 

        if (paddle.intersect(this.ball)) {
            console.log("COLLIDE>..");
            paddle.collide = true;
            this.ball.vy *= -1;
        }

        if (paddle.x > this.w-paddle.w) paddle.vx = -speed;
        if (paddle.x < 0) paddle.vx = speed;
    }

    handleBall(ball) {
        for(let i =0; i < this.wall.bricks.length; i++) {
            let b = this.wall.bricks[i];
            if (!b.show) continue;
            if (b.intersect(ball)) {
                this.explode = true;
                this.setupParticles(b);
                this.incrementScore();
                b.show = false;
                --this.wall.totalBricks;
            }
        }

        if (ball.y > this.h - ball.h || ball.y < 0) {
            ball.vy *= -1;
        }
        if (ball.x > this.w - ball.w || ball.x < 0) {
            ball.vx *=-1;
        }

    }

    draw() {
        this.entities.forEach((entity => {
            if (entity.draw) entity.draw();
        }));

        if (this.explode) {
            this.explodeBricks();
        }
    }

    explodeBricks() {
        for(let i = this.particles.length-1; i>=0; i--) {
            this.particles[i].update();
            this.particles[i].show();
            if (this.particles[i].finished()) {
                this.particles.splice(i,1);
            }
        }
    }

    incrementScore() {
        Score.increment(1);
    }

    decrementScore() {
        Score.decrement(1);
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

window.game = game;  // For debugging purpose.