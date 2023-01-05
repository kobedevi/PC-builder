const BasicLighting = () => {
  return (
    <group name="Studio Lighting">
      <ambientLight
        color="hsl(00, 0%, 100%)"
        intensity="0.4"
        name="Ambient Light"
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
        color="hsl(30, 100%, 70%)"
        intensity={0.2}
        name="Left Light"
        position={[-4, 1.8, 4]}
      />
      <directionalLight
        castShadow={true}
        color="hsl(220, 85%, 70%)"
        intensity={0.86}
        name="Right Light"
        position={[4, 0, 0]}
      />
    </group>
  );
};

export default BasicLighting;
