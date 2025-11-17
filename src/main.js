import * as THREE from 'three';
import { PhysicsWorld } from './physics/PhysicsWorld.js';
import { Particle } from './physics/Particle.js';
import { ParticleRenderer } from './rendering/Renderer.js';
import { GUI } from 'lil-gui';
import Stats from 'stats.js';

const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a1a);

// Camera setup (orthographic for 2D)
const aspect = window.innerWidth / window.innerHeight;
const viewSize = 20;
const camera = new THREE.OrthographicCamera(
    -viewSize * aspect, viewSize * aspect,
    viewSize, -viewSize,
    0.1, 1000
);
camera.position.z = 10;

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Handle window resize
window.addEventListener('resize', () => {
    const aspect = window.innerWidth / window.innerHeight;
    camera.left = -viewSize * aspect;
    camera.right = viewSize * aspect;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const physicsWorld = new PhysicsWorld();
const particleRenderer = new ParticleRenderer(scene);

function createBoundaryBox(box) {
    const points = [
        new THREE.Vector3(box.minX, box.minY, 0),
        new THREE.Vector3(box.maxX, box.minY, 0),
        new THREE.Vector3(box.maxX, box.maxY, 0),
        new THREE.Vector3(box.minX, box.maxY, 0),
        new THREE.Vector3(box.minX, box.minY, 0),
    ];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0xffffff });
    const line = new THREE.Line(geometry, material);
    scene.add(line);
}

createBoundaryBox(physicsWorld.getBox());

const gui = new GUI();
const controls = {
    gravity: 0,
    initialSpeed: 5.0,
    particleCount: 0,
    addParticle: () => {

        const theta = Math.random() * 2 * Math.PI;
        const speed = controls.initialSpeed;
        const velocity = new THREE.Vector2(Math.cos(theta) * speed, Math.sin(theta) * speed);
        const particle = new Particle(
            0,
            0,
            velocity,
            0.5,
            1.0
        )
        physicsWorld.addParticle(particle);
        particleRenderer.addParticle(particle, Math.random() * 0xffffff);
        controls.particleCount++;
    },
    clearParticles: () => {
        physicsWorld.particles.forEach(p => particleRenderer.removeParticle(p));
        physicsWorld.particles = [];
        controls.particleCount = 0;
    },
}

const physicsFolder = gui.addFolder('Physics Controls');
physicsFolder.add(controls, 'gravity', -20, 20).onChange(value => {
    physicsWorld.setGravity(new THREE.Vector2(0, value));
});
physicsFolder.open();

const particlesFolder = gui.addFolder('Particle Controls');
particlesFolder.add(controls, 'addParticle').name('Add Particle');
particlesFolder.add(controls, 'clearParticles').name('Clear Particles');
particlesFolder.add(controls, 'particleCount').name('Particle Count').listen();
particlesFolder.open();

let lastTime = performance.now();
let accumulator = 0;
const fixedDelta = 1/60; // 60 Hz physics

// Animation loop
function animate(now) {

    requestAnimationFrame(animate);

    stats.begin();
    
    let dt = (now - lastTime) / 1000; // in seconds
    lastTime = now;
    
    accumulator += dt;
    while (accumulator >= fixedDelta) {
        updatePhysics(fixedDelta);
        accumulator -= fixedDelta;
    }

    render();
   
    stats.end();
}

let physicsTimeMs = 0;
function updatePhysics(dt) {
    const start = performance.now();
    physicsWorld.update(dt);
    physicsTimeMs = performance.now() - start;
}

function render() {
    particleRenderer.update();
    renderer.render(scene, camera);
}

animate(performance.now());
