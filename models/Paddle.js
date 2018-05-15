class Paddle extends Entity {
    constructor(props) {
        super(props);
        this.type="paddle";
        this.xVelocity = 0;
    }

    update() {
        console.log("player: ", this.xVelocity);
        this.x += this.xVelocity;
    }
    draw() {
        let ctx = this.ctx;
        ctx.save();
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.restore();
    }
}