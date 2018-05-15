class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.trialRun = false;
        this.gameLevel = 1;
        this.gameLoop = null;
        this.isPaused = false;
        this.entities = [];
        this.keyPressed = {};
        this.handleEvents = this.handleEvents.bind(this);
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
        this.wall = new Wall();
        this.bg = new Background();

        this.entities = [this.ball, this.paddle, this.score, this.wall, this.bg];

        console.log(this.entities);
    }

    handleEvents(e) {
        console.log(e.which);
        if (e.keyCode === 32) {  // space key
            document.querySelector(".startup").style.display = "none";
            document.getElementById("canvas-wrapper").style.display = 'block';
            document.getElementById("canvas").style.display='block';
            //document.removeEventListener("keyup", this.handleEvents);
             this.start();
        }

        if (e.keyCode === 81) {
            this.quitting = true;
            console.log("QUIT...");
            this.endGame();
            this.quitting = false;
            return;
        }

        // Convert the key code to key name
        let keyName = Game.keys[e.which];
        console.log("keyName: ", keyName);
        if (keyName) {
            this.keyPressed[keyName] = (e.type === "keydown");
            e.preventDefault();
            console.log("KEY: ", this.keyPressed);
        }
    }

    showStartScreen() {
        document.querySelector(".startup").style.display = "block";
        document.getElementById("canvas-wrapper").style.display = 'none';
        document.getElementById("canvas").style.display='none';
        this.start();
    }

    start() {
        if (this.quitting) return;
        this.gameLoop = window.requestAnimationFrame(this.start);
        this.update();
        this.draw();
    }

    endGame() {
        window.cancelAnimationFrame(this.gameLoop);
        this.showStartScreen();
    }

    update() {
        console.log("update...");
    }

    draw() {
        console.log("drawing...");
        this.entities.forEach((entity => {
            if (entity.draw) entity.draw();
        }));
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