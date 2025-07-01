import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../style/Contact.css';


const Contact = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        message: ''
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const contactSection = document.getElementById('contact');
        if (contactSection) {
            observer.observe(contactSection);
        }

        return () => observer.disconnect();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
            e.preventDefault();

    if (!formData.email || !formData.message) {
        alert('Please fill in all fields');
        return;
    }

    fetch('https://backend-portfolio-production-202c.up.railway.app/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                alert('Failed to send message.');
            } else {
                alert('Message sent successfully!');
                setFormData({ email: '', message: '' });
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to send message. Please try again.');
        });
    };


    return (
        <section id="contact">        
            <Container className="contact-container">
                <Row className="mb-5">
                    <Col>
                        <div className={`contact-animated-div ${isVisible ? 'visible' : ''}`}>
                            <p className="contact-header-text">Get In Touch</p>
                            <h2 className="contact-main-title">
                                Let's Build Something Amazing Together!
                            </h2>
                            <p className="contact-subtitle">
                                Ready to bring your ideas to life with secure and innovative solutions.
                            </p>
                        </div>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col lg={8} xl={6}>
                        <div className={`contact-card-container ${isVisible ? 'visible' : ''}`}>
                            <div className="contact-glass-card">
                                <h3 className="contact-card-title">Contact Me</h3>
                                <div className="contact-title-underline"></div>

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-4">
                                        <Form.Label className="contact-form-label">
                                            Email Address
                                        </Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="name@example.com"
                                            className="contact-form-control"
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label className="contact-form-label">
                                            Your Message
                                        </Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={5}
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Tell me about your project..."
                                            className="contact-form-control"
                                            required
                                        />
                                    </Form.Group>

                                    <Button
                                        type="submit"
                                        className="contact-submit-button"
                                    >
                                        <span className="d-flex align-items-center justify-content-center">
                                            Send Message
                                            <svg 
                                                className="ms-2" 
                                                width="20" 
                                                height="20" 
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round" 
                                                    strokeWidth={2} 
                                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
                                                />
                                            </svg>
                                        </span>
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div className={`contact-info ${isVisible ? 'visible' : ''}`}>
                            <div className="d-flex flex-wrap justify-content-center gap-4">
                                <div className="contact-item">
                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    <span>vikoadrian26@gmail.com</span>
                                </div>
                                <div className="contact-item">
                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Bekasi, West Java</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Contact;