class Paddle extends Entity {
    constructor(props) {
        super(props);
        this.type="paddle";
        this.xVelocity = 2;
        this.speed = 2;
        this.acceleration = 0.2;
    }

    update() {
        this.x += this.xVelocity * this.speed * this.acceleration;
    }
    draw() {
        let ctx = this.ctx;
        ctx.save();
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.restore();
    }
}