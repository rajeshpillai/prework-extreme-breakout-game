class Paddle extends Entity {
    constructor(props) {
        super(props);
        this.type="paddle";
        this.xVelocity = 1.5;
        this.speed = 2;
        this.acceleration = 0.1;
    }

    update() {
        this.x += (this.xVelocity + this.acceleration) * this.speed;
    }
    draw() {
        let ctx = this.ctx;
        ctx.save();
        ctx.fillStyle = "black";
        ctx.strokeStyle="white";
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        ctx.restore();
    }
}