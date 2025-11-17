import * as THREE from 'three';

export class ParticleRenderer {
    constructor(scene) {
        this.scene = scene;
        this.meshes = new Map();
    }

    addParticle(particle, color  = 0xff0000) {
        const geometry = new THREE.CircleGeometry(particle.radius, 16);
        const material = new THREE.MeshBasicMaterial({ color: color });
        const mesh = new THREE.Mesh(geometry, material);
        this.scene.add(mesh);
        this.meshes.set(particle, mesh);
    }

    update() {
        for (const [particle, mesh] of this.meshes) {
            mesh.position.set(particle.position.x, particle.position.y, 0);
        }
    }

    removeParticle(particle) {
        const mesh = this.meshes.get(particle);
        if (mesh) {
            this.scene.remove(mesh);
            this.meshes.delete(particle);
        }
    }
}