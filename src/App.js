
import './App.css';
import Banner from './Components/Banner';
import Navbar from './Components/Navbar';
import About from './Components/About';
import Project from './Components/Projects';
import Contact from './Components/Contact'
import 'bootstrap/dist/css/bootstrap.min.css';
import FloatingCTFTerminal from './Components/FloatingTerminal';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Banner/>
      <About/>
      <Project/>
      <Contact/>
      <FloatingCTFTerminal/>
    </div>
  );
}

export default App;
