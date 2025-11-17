import * as THREE from 'three';

export class PhysicsWorld {
    constructor() {
        this.particles = [];
        this.gravity = new THREE.Vector2(0, 0);
        this.box = {minX: -10, maxX: 10, minY: -10, maxY: 10};
    }

    setGravity(vec) {
        this.gravity = vec;
    }

    getBox() {
        return this.box;
    }


    addParticle(particle) {
        this.particles.push(particle);
    }

    update(dt) {
        for (const particle of this.particles) {
            // Apply gravity
            const gravityForce = this.gravity.clone().multiplyScalar(particle.mass);
            particle.applyForce(gravityForce);
            particle.update(dt);
            this.handleBoxCollisions(particle);
        }
    }

    handleBoxCollisions(p) {
        if(p.position.x - p.radius < this.box.minX || p.position.x + p.radius > this.box.maxX) {
            p.velocity.x *= -1;
        }
        if(p.position.y - p.radius < this.box.minY || p.position.y + p.radius > this.box.maxY) {
            p.velocity.y *= -1;
        }
    }
}