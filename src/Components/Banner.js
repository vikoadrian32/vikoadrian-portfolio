import { useEffect, useState, useCallback, useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import HeaderImage from '../assets/img/portoprofile.jpg'
import '../style/Banner.css';

const Banner = () => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300);
    
    // Memoisasi array untuk menghindari re-render
    const toRotate = useMemo(() => ["Web Developer", "Backend Developer", "Pen Testing"], []);
    const period = 2000;

    // Memoisasi fungsi tick untuk performa
    const tick = useCallback(() => {
        if (toRotate.length === 0) return;

        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        if (!fullText) return;

        let updatedText = isDeleting
            ? fullText.substring(0, text.length - 1)
            : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(200); // Diperlambat untuk mengurangi frequency
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period);
        } else if (isDeleting && updatedText === "") {
            setIsDeleting(false);
            setLoopNum(prev => prev + 1);
            setDelta(300); // Diperlambat
        }
    }, [loopNum, isDeleting, text, toRotate, period]);

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => { clearInterval(ticker) };
    }, [tick, delta]); // Hanya depend pada tick dan delta

    return (
        <section id="home" className="banner">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={7}>
                        <span className="tagline">Welcome to My Portfolio</span>
                        <h1>
                            <span className="wrap">
                                {toRotate.length > 0 ? `Hi I'm Viko Passionate in ${text}` : "Hello Guys"}
                            </span>
                        </h1>
                        <button>
                            <a 
                                className="text-decoration-none text-white" 
                                href="https://www.linkedin.com/in/viko-adrian-45a34728b"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Let's Connect<ArrowRight size={20}/>
                            </a>
                        </button>
                    </Col>

                    <Col xs={12} md={6} xl={5}>
                        <div className="image-container">
                            <img 
                                src={HeaderImage} 
                                alt="header-image"
                                loading="lazy"
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Banner;