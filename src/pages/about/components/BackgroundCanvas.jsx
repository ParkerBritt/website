import { Canvas } from '@react-three/fiber';
import BackgroundScene from './BackgroundScene';

export default function BackgroundCanvas() {
  return (
    <Canvas 
      camera={{
        fov: 75,
        near: 0.1,
        far: 100,
        position: [0, 0, 5] 
      }}
      
    >
      <BackgroundScene />
    </Canvas>
  );
}

