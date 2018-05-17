function random(min, max) {
    return Math.random() * (max - min) + min;
}

class Particle {
    constructor(ctx, x, y,fill) {
        this.x = x;
        this.y = y;
        this.vx = random(-1,1);
        this.vy = random(-5,5);

        this.ctx = ctx;
        this.ball = new Box({ctx: this.ctx, x:this.x, y: this.y, w:4,h:4});
        this.ball.fillStyle= fill;
        this.alpha = 1;
    }

    show() {
        this.ctx.save();
        this.alpha -= 0.01;
        this.ctx.globalAlpha = this.alpha;
        this.ball.draw(); 
        this.ctx.restore();
    }

    update() {
        let ball = this.ball;
        ball.x += this.vx;
        ball.y += this.vy;
    }

    finished() {
        return this.alpha < 0.1;
    }
}