class Ball extends Entity {
    constructor(props) {
        super(props);
        this.r = props.r;
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