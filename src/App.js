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

import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';


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
      <style type="text/css">
        {`
          .dropdown>a::after {
            color: white;
          }
          .dropdown-menu {
            background-color: transparent;
            .dropdown-item:hover {
              text-decoration: underline;
              color: #fff;
              background-color: transparent;
            }
          }
        `}
      </style>

      {/* https://stackoverflow.com/a/69321054 */}
      <Stack direction="horizontal" gap={5} className='mt-5 mx-5'>
        <div className="p-2 text-white">
          <img src={paionLogoWhite} alt='paion logo' />
          Paion Data
        </div>

        <Nav className="justify-content-center">
          <NavDropdown title={
            <span style={{ color: 'white' }}>API</span>
          } id="basic-nav-dropdown">
            <NavDropdown.Item href="https://rapidapi.com/paion-data-machine-learning/api/theresa3">
              <span style={{ color: 'white' }}>RapidAPI</span>
            </NavDropdown.Item>
            <NavDropdown.Item href="https://huggingface.co/paion-data">
              <span style={{ color: 'white' }}>Hugging Face</span>
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title={
            <span style={{ color: 'white' }}>Company</span>
          } id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">
              <span style={{ color: 'white' }}>About Us</span>
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              <span style={{ color: 'white' }}>Careers</span>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              <span style={{ color: 'white' }}>Social</span>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>

        <div className="p-2 ms-auto text-white">
          <a href="https://github.com/QubitPi/react-3d-graph-landing-page" style={{ color: '#ffffff' }}>
            <BsGithub
              size={30}
              onMouseOver={({ target }) => target.style.color = '#0C6EFD'}
              onMouseOut={({ target }) => target.style.color = '#ffffff'}
            />
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
