
import './App.css';
import Banner from './Components/Banner';
import Navbar from './Components/Navbar';
import About from './Components/About';
import Project from './Components/Projects';
import Contact from './Components/Contact'
import 'bootstrap/dist/css/bootstrap.min.css';
import FloatingCTFTerminal from './Components/FloatingTerminal';
import { useEffect, useState } from 'react';


function App() {

  const [isMobile,setIsMobile] = useState(false);
  useEffect(()=>{
    const checkIsMobile = ()=>setIsMobile(window.innerWidth <=768)
    checkIsMobile();

    window.addEventListener('resize',checkIsMobile)
    return ()=> window.removeEventListener('resize',checkIsMobile)
  },[])

  return (
    <div className="App">
      <Navbar/>
      <Banner/>
      <About/>
      <Project/>
      <Contact/>
      {!isMobile && <FloatingCTFTerminal/>}
    </div>
  );
}

export default App;
