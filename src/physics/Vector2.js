export class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    
    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    
    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    
    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    
    scale(s) {
        this.x *= s;
        this.y *= s;
        return this;
    }
    
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    
    lengthSquared() {
        return this.x * this.x + this.y * this.y;
    }
    
    normalize() {
        const len = this.length();
        if (len > 0) {
            this.x /= len;
            this.y /= len;
        }
        return this;
    }
    
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    
    clone() {
        return new Vector2(this.x, this.y);
    }
    
    copy(v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    }
    
    static distance(v1, v2) {
        const dx = v2.x - v1.x;
        const dy = v2.y - v1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    static distanceSquared(v1, v2) {
        const dx = v2.x - v1.x;
        const dy = v2.y - v1.y;
        return dx * dx + dy * dy;
    }
}
