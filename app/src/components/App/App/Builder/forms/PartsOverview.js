import Layout from 'components/Design/Models/Layout'
import Model  from "./Model/Model"
import Input from 'components/Design/Input'
import { PossibleRoutes, route } from 'core/routing'
import { useRef, useState } from 'react';
// import CaseModel from "../../../Cases/detail/Model/Model"

const PartsOverview = ({currentBuild}) => {

  const inputRef = useRef(null);
  const [clipboardColor, setClipboardColor] = useState('black');
  const [hideText, setHideText] = useState(true);

  const copyText = (e) => {
    navigator.clipboard.writeText(inputRef.current.value);
    setClipboardColor('green');
    setHideText(false);
    setTimeout(() => {
      // Remove focus, and reset colors
      setHideText(true);
      setClipboardColor('black');
      inputRef.current.blur();
    }, "2500");
  }

  return (
    // TODO: overview model
    <>
      <div>
        <h2>PartsOverview</h2><br/>
        <span style={{opacity: '0.5', fontSize: '1rem'}}>This render is not be accurate and is only to give an idea of how the build will vaguely look build</span><br/>
        <div style={{position: "relative"}}>
          <Input ref={inputRef} style={{cursor: "pointer", color:"black"}} onClick={copyText} readOnly={true} tabIndex="1" value={`${window.location.origin}${route(PossibleRoutes.BuildDetail, {id:currentBuild.id})}`} required type="text" />
          <div onClick={copyText} className="clipboard icon" style={{position: "absolute", width: "16px", height: "32px", right: "1rem", top: "50%", marginTop: "-18px", cursor: "pointer"}}>
            <span className= {hideText ? "hide" : ""}  style={{zIndex:"10", position: "absolute", right: 0, top: "-42px"}}>Copied</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={clipboardColor} class="bi bi-clipboard" viewBox="0 0 16 16">
              <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
              <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
            </svg>
          </div>
        </div>
      </div>
      <div className="model" style={{height: "60vh"}}>
        <Layout>
          <group name="parts">
            <Model motherboard={currentBuild.motherboard} psu={currentBuild.psu} pccase={currentBuild.case} gpu={currentBuild.gpu} cpucooler={currentBuild.cpucooler} ram={currentBuild.ram}/>
          </group>
        </Layout>
      </div>
    </>
  )
}

export default PartsOverview