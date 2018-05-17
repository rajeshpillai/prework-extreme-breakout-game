class Brick extends Entity {
    constructor(props) {
        super(props) ;
        this.type="brick";
        this.fillStyle = "#FF4848";
    }   

    draw() {

        if (!this.show) return;
        let ctx = this.ctx;
        ctx.save();

        ctx.fillStyle = this.fillStyle;
        ctx.fillRect(this.x,this.y,this.w, this.h);
        ctx.strokeRect(this.x, this.y, this.w,this.h);
        ctx.restore();
    } 
}