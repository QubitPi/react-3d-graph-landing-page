import React from 'react';
import { ForceGraph3D } from 'react-force-graph';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundData from './data.json';
import Stack from 'react-bootstrap/Stack';
import paionLogoWhite from './paion-logo-white.svg'
import { BsGithub } from "react-icons/bs";

// https://stackoverflow.com/a/38463360
const BackgroundGraph = styled.section`
width: 100vw;
height: 100vh;
display: block;
position: fixed;
top: 0;
left: 0;
z-index: -9999;
`;

function App() {

  const { useRef, useEffect } = React;

  const fgRef = useRef();

  useEffect(() => {
    const bloomPass = new UnrealBloomPass();
    bloomPass.strength = 1;
    bloomPass.radius = 1;
    bloomPass.threshold = 0;
    fgRef.current.postProcessingComposer().addPass(bloomPass);
  }, []);

  return (
    <>
      {/* https://stackoverflow.com/a/69321054 */}
      <Stack direction="horizontal" gap={3} className='mt-5 mx-5'>
        <div className="p-2 text-white">
          <img src={paionLogoWhite} alt='paion logo' />
          Paion Data
        </div>
        <div className="p-2 ms-auto text-white">
          <a href="https://github.com/QubitPi/react-3d-graph-landing-page" style={{color: '#ffffff'}}>
            <BsGithub size={30} />
          </a>
        </div>
        <Button variant="outline-light" className="p-2" href="https://app.nexusgraph.com">Start Free</Button>
      </Stack>

      {/* https://stackoverflow.com/a/52284399 */}
      <Button variant="outline-primary" size="lg" href="https://app.nexusgraph.com" style={{
        position: 'absolute', left: '50%', top: '70%',
        transform: 'translate(-50%, -50%)'
      }}>Nexus Graph</Button>

      <BackgroundGraph>
        <ForceGraph3D
          ref={fgRef}
          backgroundColor="#000003"
          graphData={backgroundData}
          nodeLabel={node => `${node.user}: ${node.description}`}
          nodeAutoColorBy="user"
          linkDirectionalParticles={1}
        />
      </BackgroundGraph>
    </>
  );
}

export default App;
