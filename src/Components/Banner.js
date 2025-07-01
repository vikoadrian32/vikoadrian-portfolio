import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import HeaderImage from '../assets/img/portoprofile.jpg'
import '../style/Banner.css';


const Banner = ()=>{
    const [loopNum,setLoopNum] = useState(0);
    const [isDeleting , setIsDeleting] = useState(false);
    const [text,setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const toRotate = ["Web Developer", "Backend Developer", "Pen Testing"];
    const period = 2000;


    useEffect(()=>{
        let ticker = setInterval(()=>{
            tick();
        },delta)
        
        return ()=>{clearInterval(ticker)}
    },[text,delta,toRotate])

        const tick = () => {
            if (toRotate.length === 0) return; 

            let i = loopNum % toRotate.length;
            let fullText = toRotate[i];
            if (!fullText) return; 

            let updatedText = isDeleting
                ? fullText.substring(0, text.length - 1)
                : fullText.substring(0, text.length + 1);

            setText(updatedText);

            if (isDeleting) {
                setDelta(150);
            }

            if (!isDeleting && updatedText === fullText) {
                setIsDeleting(true);
                setDelta(period);
            } else if (isDeleting && updatedText === "") {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
                setDelta(200);
            }
        };

    return (
        <section id="home" className="banner">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={7}>
                        <span className="tagline">Welcome to My Portofolio</span>
                        <h1> <span className="wrap">{toRotate.length > 0 ? `Hi I'm Viko Passionate in ${text}` : "Hello Guys"}</span></h1>
                        <button><a className="text-decoration-none text-white" href = "https://www.linkedin.com/in/viko-adrian-45a34728b">Let's Connect<ArrowRight size={20}/></a></button>
                    </Col>

                    <Col xs={12} md={6} xl={5}>
                        <img src= {HeaderImage} alt="header-image"></img>
                    </Col>
                </Row>
            </Container>

        </section>
    )
}


export default Banner ; 