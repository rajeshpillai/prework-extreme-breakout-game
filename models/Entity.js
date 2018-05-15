class Entity {
    constructor(props) {
        if (props === undefined) {
            props = {};      
        }
        this.show = props.show || true;
        this.x = props.x || 0;
        this.y = props.y || 0;
        this.w = props.w || 25;
        this.h = props.h || 25;
        this.ctx = props.ctx;

        // Velocity: Speed with direction
        this.xVelocity = 0;
        this.yVelocity = 0;
    }

    update() {

    }

    intersect(other) {
        
    }
}