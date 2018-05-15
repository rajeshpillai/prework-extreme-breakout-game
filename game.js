document.addEventListener("keyup", startGame);

function startGame(e) {
    if (e.keyCode === 32) {  // space key
        document.querySelector(".startup").style.display = "none";
        document.getElementById("canvas-wrapper").style.display = 'block';
        document.getElementById("canvas").style.display='block';
        document.removeEventListener("keyup", startGame);
    }
}