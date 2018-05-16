class Brick extends Entity {
    constructor(props) {
        super(props) ;
        this.type="brick";
    }   

    draw() {

        if (!this.show) return;
        let ctx = this.ctx;
        ctx.save();

        ctx.fillStyle = "#FF4848";
        ctx.fillRect(this.x,this.y,this.w, this.h);
        ctx.strokeRect(this.x, this.y, this.w,this.h);
        ctx.restore();
    } 
}