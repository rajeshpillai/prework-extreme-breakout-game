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
        this.vx = 0;
        this.vy = 0;
    }

    loadSprite(url) {
        this.sprite = new Image();
        this.sprite.onload = function () {
        }
        this.sprite.src = url;
    }

    update() {

    }

    intersect(other) {
        return this.y + this.h > other.y &&
            this.y < other.y + other.h &&
            this.x + this.w > other.x &&
            this.x < other.x + other.w;
    }
}