class Box extends Entity {
    constructor(props) {
        super(props);
        this.xVelocity = -2;
        this.yVelocity = -4;
        this.type="box";
        this.strokeStyle="white";
        this.fillStyle="red"; //todo
    }

    update() {
        this.x = this.x + this.xVelocity;
        this.y = this.y + this.yVelocity;
    }

    draw() {
        let ctx = this.ctx;
        ctx.save();
        ctx.fillStyle = this.fillStyle;
        ctx.strokeStyle="none";
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        ctx.restore();
    }
}