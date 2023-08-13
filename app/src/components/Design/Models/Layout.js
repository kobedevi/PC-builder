import { Html, Loader, OrbitControls, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import BasicLighting from "../Lighting/Studio";

const Layout = ({ children }) => {

  function Loader() {
    const { active, progress, errors, item, loaded, total } = useProgress();
    return <Html center>{total} % loaded</Html>
  }

  return (
    <>
      <Canvas orthographic={false} shadows={true}>
        <BasicLighting />
        <OrbitControls
          enableDamping={true}
          enablePan={true}
          enableZoom={true}
        />
        <Suspense fallback={<Loader/>}>
          {children}
        </Suspense>
      </Canvas>
    </>
  );
};

export default Layout;
