import * as THREE from 'three';


export class Particle {
    constructor(x, y, velocity=new THREE.Vector2(0, 0), radius, mass) {
        this.position = new THREE.Vector2(x, y);
        this.velocity = velocity;
        this.acceleration = new THREE.Vector2(0, 0);
        this.radius = radius;
        this.mass = mass;
    }
    applyForce(force) {
        // F = ma => a = F/m
        const acceleration = force.clone().divideScalar(this.mass);
        this.acceleration.add(acceleration);
    }

    update(dt) {
        // Euler integration
        this.velocity.add(this.acceleration.clone().multiplyScalar(dt)); // v = v0 + at
        this.position.add(this.velocity.clone().multiplyScalar(dt)); // x = x0 + vt
        this.acceleration.set(0, 0);
    }

}