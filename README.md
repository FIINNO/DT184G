# 2D Physics Engine with Three.js

A physics simulation project implementing a 2D physics engine using Three.js for visualization.

## Project Structure

```
├── index.html           # Main HTML file
├── src/
│   ├── main.js         # Application entry point
│   ├── physics/        # Physics engine components
│   │   ├── Particle.js
│   │   └── PhysicsWorld.js
│   ├── rendering/      # Rendering components
│   │   └── Renderer.js
│   └── utils/          # Utility classes
│       └── Vector2.js
└── package.json
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

This will start a development server at `http://localhost:3000` with hot module reloading.

### Build

```bash
npm run build
```

This will create a production build in the `dist/` folder.

## Features

- **Particle System**: Basic particle dynamics with position, velocity, and acceleration
- **Euler Integration**: Simple numerical integration for updating particle states
- **Gravity**: Adjustable gravity force affecting all particles
- **Wall Collisions**: Particles bounce off boundary walls
- **Interactive Controls**: Real-time adjustment of physics parameters
- **Performance Stats**: FPS and collision count monitoring

## Upcoming Features (Following Project Plan)

### Tillfälle 2 (v.47) - Current
- ✅ Basic project structure
- ✅ Particle system with Euler integration
- ✅ Gravity and simple forces

### Tillfälle 3 (v.49) - Next
- [ ] Discrete collision detection (particle-particle)
- [ ] Collision response with momentum conservation
- [ ] Naive O(n²) collision detection
- [ ] Broad-phase optimization (Sweep and Prune or Uniform Grid)

### Tillfälle 4 (v.50)
- [ ] Continuous collision detection (CCD)
- [ ] Tunneling problem demonstration
- [ ] Spatial data structure optimization

### Tillfälle 5 (v.2)
- [ ] Soft body physics
- [ ] Mass-spring systems
- [ ] Cloth simulation

## Controls

- **Gravity Slider**: Adjust gravitational force
- **Particle Count**: Change number of particles in simulation
- **Reset Button**: Reset all particles to random positions
- **Pause Button**: Pause/resume simulation

## License

Educational project for learning physics simulation.
