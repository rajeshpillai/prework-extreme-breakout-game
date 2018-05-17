class Ball extends Entity {
    constructor(props) {
        super(props);
        this.r = props.r;
        this.w = this.r * 2;
        this.h = this.r * 2;
        this.vx = -2;
        this.vy = -4;
        this.type="ball";
        this.strokeStyle="white";
        this.fillStyle="red"; //todo
    }

    update() {
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
    }

    draw() {
        let ctx = this.ctx;
        ctx.save();

        if (this.sprite) {
            ctx.drawImage(this.sprite, this.x, this.y, this.r * 2, this.r * 2);
        } else {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle=this.strokeStyle;
            ctx.fillStyle= this.fillStyle;
            ctx.arc(this.x, this.y, this.r, 0, 2* Math.PI, true);
            ctx.stroke();
            ctx.fill();
        }

        ctx.restore();

    }
}