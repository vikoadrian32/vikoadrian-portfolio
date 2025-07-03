import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import navIcon1 from '../assets/img/nav-icon1.svg'
import navIcon2 from '../assets/img/gmail.svg'
import navIcon3 from '../assets/img/nav-icon3.svg'


const NavigationBar = () =>{
    const [activeLink,setActiveLink] = useState('home')

    const [scrolled ,setScrolled] = useState(false)

    useEffect(()=>{
        const onScroll = ()=>{
            if(window.scrollY>50){
                setScrolled(true);
            }else{
                setScrolled(false);
            }
        }
        window.addEventListener('scroll',onScroll)
        return ()=> window.removeEventListener('scroll',onScroll)
    },[])

      const onUpdateActiveLink = (value)=>{
        setActiveLink(value);
    }

    return (
        <Navbar expand="lg" className={scrolled ? "scrolled" : " "}>
            <Container>
                <Navbar.Brand href="#home" className="text-white" style={{fontSize:"25px"}}>VICONIC</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home" className={activeLink === "home" ? 'active navbar-link' : 'navbar-link'}  onClick={()=> onUpdateActiveLink('home')}>Home</Nav.Link>
                            <Nav.Link href="#about" className={activeLink === "about" ? 'active navbar-link' : 'navbar-link'}  onClick={()=> onUpdateActiveLink('about')}>About</Nav.Link>
                            <Nav.Link href="#projects" className={activeLink === "projects" ? 'active navbar-link' : 'navbar-link'} onClick={()=> onUpdateActiveLink('projects')}>Project</Nav.Link>
                            <Nav.Link href="#contact" className={activeLink === "contact" ? 'active navbar-link' : 'navbar-link'}  onClick={()=> onUpdateActiveLink('contact')}>Contact</Nav.Link>
                        </Nav>
                            <span className='navbar-text'>
                                <div className='social-icon'>
                                    <a href='https://www.linkedin.com/in/vikoadrian' target="_blank" rel="noopener"><img src={navIcon1} alt="linkedin"/></a>
                                    <a href='https://mail.google.com/mail/?view=cm&to=vikoadrian26@gmail.com' target="_blank"><img src={navIcon2} alt="gmail"/></a>
                                    <a href='https://www.instagram.com/vikkopiko/'><img src={navIcon3} alt="instagram"/></a>
                                </div>
                            </span>
                    </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}


export default NavigationBar;