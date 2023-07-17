import { Text } from "@react-three/drei";


const BasicLighting = () => {
  return (
    <group name="Studio Lighting">
      <ambientLight
        color="hsl(0, 0%, 100%)"
        intensity={1}
        name="Ambient Light"
      />
      <directionalLight
        castShadow={true}
        color="hsl(0, 0%, 70%)"
        intensity={.3}
        name="top Light"
        position={[0, 2, 1]}
      />
      <directionalLight
        castShadow={true}
        color="hsl(0, 0%, 70%)"
        intensity={1}
        name="bottom Light"
        position={[0, -2, 0]}
      />
     <directionalLight
        castShadow={true}
        color="hsl(0, 0%, 70%)"
        intensity={0.74}
        name="Front Light"
        position={[0, 2, 4]}
      />
     <directionalLight
        castShadow={true}
        color="hsl(220, 85%, 70%)"
        intensity={0.34}
        name="back Light"
        position={[0, 1, -4]}
      />
      <directionalLight
        castShadow={true}
        color="hsl(49, 100%, 86%)"
        intensity={3}
        name="Left Light"
        position={[-5, 1, -1]} 
      />
      <directionalLight
        castShadow={true}
        color="hsl(220, 85%, 70%)"
        intensity={0.86}
        name="Right Light"
        position={[4, -1.8, -4]}
      />
    </group>
  );
};

export default BasicLighting;
