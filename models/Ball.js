class Ball extends Entity {
    constructor(props) {
        super(props);
        this.r = props.r;
        this.w = this.r * 2;
        this.h = this.r * 2;
        this.vx = -2;
        this.vy = -4;
        this.type="ball";
        this.startAngle = 0;
        this.strokeStyle="white";
        this.fillStyle="red"; //todo
    }

    update() {
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
    }

    draw() {
        let ctx = this.ctx;
        

        if (this.sprite) {
            ctx.save();
            ctx.translate(this.x+this.w/2, this.y)+this.h/2;
            ctx.rotate(this.startAngle * Math.PI/180);
            //ctx.drawImage(this.sprite, this.x, this.y, this.r * 2, this.r * 2);
            ctx.drawImage(this.sprite, -this.w/2, -this.h/2, this.r*2, this.r*2);
            ctx.restore();
        } else {
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle=this.strokeStyle;
            ctx.fillStyle= this.fillStyle;
            ctx.arc(this.x, this.y, this.r, 0, 2* Math.PI, true);
            ctx.stroke();
            ctx.fill();
            ctx.restore();
        }
        this.startAngle++;
        

    }
}