import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import BasicLighting from "../Lighting/Studio";

const Layout = ({ children }) => {
  return (
    <>
      <Canvas orthographic={false} shadows={true}>
        <Suspense>
          <BasicLighting />
          <OrbitControls
            enableDamping={true}
            enablePan={true}
            enableZoom={true}
          />
          <axesHelper args={[3]} />
          <gridHelper />
          {children}
        </Suspense>
      </Canvas>
    </>
  );
};

export default Layout;
