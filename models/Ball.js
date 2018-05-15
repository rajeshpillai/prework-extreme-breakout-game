class Ball extends Entity {
    constructor(props) {
        super(props);
        this.r = props.r;
        this.deltaX = -2;
        this.deltaY = -4;
    }

    update() {
        this.x = this.x + this.deltaX;
        this.y = this.y + this.deltaY;
    }

    draw() {
        console.log("ball:draw:", this.x, this.y);
        let ctx = this.ctx;
        ctx.save();

        if (this.sprite) {
            ctx.drawImage(this.sprite, this.x, this.y, this.r * 2, this.r * 2);
        } else {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle="white";
            ctx.fillStyle="red"; //todo
            ctx.arc(this.x, this.y, this.r, 0, 2* Math.PI, true);
            ctx.stroke();
            ctx.fill();
        }

        ctx.restore();

    }
}