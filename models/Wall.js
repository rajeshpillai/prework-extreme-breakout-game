class Wall extends Entity {
    constructor(props) {
        super(props);
        this.rows = 1;
        this.type="wall";
        this.bricksPerRow = props.bricksPerRow;
        this.bricks = [];
        this.init();
    }

    init() {
        let brickWidth = this.w / this.bricksPerRow;

        for(let r = 0; r < this.rows; r++) {
            for(let c = 0; c < this.bricksPerRow; c++) {
                let b = new Brick({ctx: this.ctx, x:0, w:brickWidth, h:25});
                b.x += b.w * c;
                b.y = 0;
                this.bricks.push(b);
            }
        }
    }

    draw () {
        for(let i =0; i < this.bricks.length; i++) {
            let b = this.bricks[i];
            b.draw();
        }
    }

    update() {

    }
}