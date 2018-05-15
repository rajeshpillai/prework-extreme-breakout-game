class Game {
    constructor() {
        this.startGame = this.startGame.bind(this);
        document.addEventListener("keyup", this.startGame)
    }
    startGame(e) {
        if (e.keyCode === 32) {  // space key
            document.querySelector(".startup").style.display = "none";
            document.getElementById("canvas-wrapper").style.display = 'block';
            document.getElementById("canvas").style.display='block';
            document.removeEventListener("keyup", this.startGame);
        }
    }
}


let game = new Game();