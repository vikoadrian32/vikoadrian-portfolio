import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import southTresor from '../assets/project_img/southtresor.png';
import riskAssessment from '../assets/project_img/riskassessment.png';
import bondargo from '../assets/project_img/bondargo.png';
import ezstore from '../assets/project_img/ezstore.png';
import profiling from '../assets/project_img/profiling.png'
import '../style/Projects.css';
import cssIcon from '../assets/img/css.svg';
import iconBurpsuite from '../assets/img/burpsuite.svg';
import iconWireshark from '../assets/img/wireshark.svg';
import iconFlask from '../assets/img/flask.svg';

const Project = () => {
    const getItemsPerSlide = () => {
        const screenWidth = window.innerWidth;
        
        if (screenWidth <= 950) {
            return 1; // Mobile: 1 project per slide
        } else if (screenWidth <= 1200) {
            return 2; // Tablet: 2 projects per slide
        } else {
            return 3; // Desktop: 3 projects per slide
        }
    };
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoplay, setIsAutoplay] = useState(true);
    const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide());

    const projects = [
          {
            id: 1,
            title: "Capture The Flag",
            category: "Cyber Security Project",
            description: "Participated in comprehensive Capture The Flag cybersecurity competition, successfully solving 10+ challenges across multiple domains including Web Exploitation (identifying SQL injection, command injection, and authentication bypass vulnerabilities), Digital Forensics (analyzing system artifacts and recovering hidden data), and OSINT (gathering intelligence through open-source investigation techniques).",
            image: require('../assets/project_img/download.webp'),
            color: "teal",
            bgColor: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            techStack: ['Burpsuite','Linux','Wireshark','Autopsy'],
            source: 'https://docs.google.com/document/d/18OVeJPxpFgJ4k-kyI1nG0LeqVFjiWb6D2mBmjwvsofM/edit?usp=sharing'
        },
        {
            id: 2,
            title: "EzStore",
            subtitle: "Ecommerce app",
            category: "Mobile app",
            description: "EzStore is a simple fashion e-commerce mobile application developed as part of a Mobile Programming project. It allows users to browse, search, and purchase clothing items. Built using Java and MySQL in Android Studio, the app features user authentication, product listing, cart management, and order processing functionalities.",
            image: ezstore, 
            color: "blue",
            techStack : ['Java','MySQL','Android Studio'],
            bgColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            source : "https://github.com/vikoadrian32/finalproject.git"
        },
          {
            id: 3,
            title: "Profiling Hacker by KEMHAN",
            category: "Cyber Security Project",
            description: "Strategic cybersecurity intelligence project commissioned by the Ministry of Defense (KEMHAN) to conduct comprehensive profiling of hackers in Indonesia using Open Source Intelligence (OSINT) methodologies and advanced data analysis techniques.",
            image: profiling,
            color: "orange",
            bgColor: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            techStack : ['OSINT'],
            source: '-'
        },
       
        {
            id: 4,
            title: "Bond Argo Limited",
            subtitle: "Travel platform",
            category: "Web Company Profile",
            description: "An elegant company profile website for a premium spice trading company, showcasing a wide range of high-quality spices, their origins, and uses designed to build trust, highlight tradition, and help customers explore authentic flavors with ease and confidence.",
            image: bondargo,
            color: "teal",
            techStack : ['HTML','CSS','Bootstrap','Javascript'],
            bgColor: "linear-gradient(135deg, #3e2f1c 0%, #a85b2d 50%, #f2c572 100%)",
            source:"https://vikoadrian32.github.io/bondargo/"
        },
         {
            id: 5,
            title: "Risk Assessement",
            subtitle: "Risk Assessment Website",
            category: "Cyber Security Project",
            description: "A web-based Risk Assessment platform designed to evaluate and manage security risks based on the NIST 800 series standards. This tool helps organizations identify vulnerabilities, assess potential impacts, and implement effective mitigation strategies to strengthen their cybersecurity posture.",
            image: riskAssessment,
            color: "green",
            techStack : ['Python','HTML','CSS','Flask','MySQL'],
            bgColor: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            source: "https://github.com/vikoadrian32/riskassessmentproject.git"
        },
      
        {
            id: 6,
            title: "South Tresor",
            category: "Web Company Profile",
            description: "An elegant company profile website for a modern real estate developer, showcasing residential projects, facilities, and services to help clients find their perfect home with ease and confidence.",
            image: southTresor,
            color: "teal",
            techStack : ['HTML','CSS','Bootstrap','Javascript'],
            bgColor: "linear-gradient(135deg, #4b0f1b 0%, #2d142c 100%)",
            source : "https://vikoadrian32.github.io/southtresor/"

        },
      
    ];

    const techIcons = 
        {
            'HTML' :  require('../assets/img/icon-html.png'),
            'CSS' : cssIcon,
            'Javascript' : require('../assets/img/icon-js.png'),
            'PHP' : require('../assets/img/icon-php.png'),
            'Laravel' : require('../assets/img/icons8-laravel-48.png'),
            'Java' :  require('../assets/img/icon-java.png'),
            'MySQL' : require('../assets/img/icons8-mysql-48.png'),
            'Burpsuite' :  iconBurpsuite,
            'Wireshark' : iconWireshark,
            'Linux' : require('../assets/img/icon-linux.png'),
            'Python' : require('../assets/img/icon-python.png'),
            'Autopsy' : require('../assets/img/icon-autopsy.png'),
            'Bootstrap' : require('../assets/img/icon-bootstrap.png'),
            'Android Studio' : require('../assets/img/icons8-android-studio-48.png'),
            'Flask' : iconFlask,
            'OSINT' : require('../assets/img/osint-seeklogo.png')
        }

    // const itemsPerSlide = 3;
    const totalSlides = Math.ceil(projects.length / itemsPerSlide)
    // const totalSlides = Math.ceil(projects.length / itemsPerSlide);

    // useEffect(() => {
    //     if (isAutoplay) {
    //         const interval = setInterval(() => {
    //             setCurrentSlide((prev) => (prev + 1) % totalSlides);
    //         }, 5000);
    //         return () => clearInterval(interval);
    //     }
    // }, [isAutoplay, totalSlides]);
    useEffect(() => {
        const handleResize = () => {
            const newItemsPerSlide = getItemsPerSlide();
            if (newItemsPerSlide !== itemsPerSlide) {
                setItemsPerSlide(newItemsPerSlide);
                // Reset ke slide pertama saat resize untuk menghindari error
                setCurrentSlide(0);
            }
        };

        window.addEventListener('resize', handleResize);
        
        // Initial call untuk set correct value
        handleResize();
        
        return () => window.removeEventListener('resize', handleResize);
    }, [itemsPerSlide]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    useEffect(() => {
        if (isAutoplay && totalSlides > 1) {
            const interval = setInterval(() => {
                nextSlide();
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [isAutoplay, currentSlide, totalSlides]);

    return (
        <Container fluid className="project-wrapper" id="projects">
            <Row className="justify-content-center mb-5">
                <div className="project-header">
                    <h2 className="project-title">Featured Projects</h2>
                    <p className="project-subtitle">Crafting digital experiences that make a difference</p>
                </div>
            </Row>
            
            <div className="project-carousel-container">
                <div className="carousel-controls">
                    <button 
                        className="carousel-btn prev-btn" 
                        onClick={prevSlide}
                        onMouseEnter={() => setIsAutoplay(false)}
                        onMouseLeave={() => setIsAutoplay(true)}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    
                    <button 
                        className="carousel-btn next-btn" 
                        onClick={nextSlide}
                        onMouseEnter={() => setIsAutoplay(false)}
                        onMouseLeave={() => setIsAutoplay(true)}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>

                <div 
                    className="project-carousel"
                    onMouseEnter={() => setIsAutoplay(false)}
                    onMouseLeave={() => setIsAutoplay(true)}>
                    <div 
                        className="project-slides"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                            <div key={slideIndex} className="project-slide">
                                {projects.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).map((project, index) => (
                                    <div key={project.id} className="project-card" style={{ animationDelay: `${index * 0.1}s` }}>
                                        <div className="project-number">
                                            {String(slideIndex * itemsPerSlide + index + 1).padStart(2, '0')}
                                        </div>
                                        
                                        <div className="project-category">
                                            <span className={`category-tag ${project.color}`}>
                                                {project.category}
                                            </span>
                                        </div>

                                        <div className="project-image" style={{ background: project.bgColor }}>
                                            {project.image ? (
                                                <div className="project-image-container">
                                                    <img 
                                                        src={project.image} 
                                                        alt={project.title}
                                                        className="project-img"
                                                        onError={(e) => {
                                                            console.log('Image failed to load:', project.image);
                                                            e.target.style.display = 'none';
                                                            e.target.nextSibling.style.display = 'flex';
                                                        }}
                                                    />
                                                    <div className="fallback-preview" style={{ display: 'none' }}>
                                                        <div className="mock-interface">
                                                            {project.category === "Mobile app" ? (
                                                                <div className="mobile-mockup">
                                                                    <div className="mobile-screen">
                                                                        <div className="mobile-header"></div>
                                                                        <div className="mobile-content">
                                                                            <div className="content-block"></div>
                                                                            <div className="content-block small"></div>
                                                                            <div className="content-block medium"></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="web-mockup">
                                                                    <div className="browser-bar">
                                                                        <div className="browser-dots">
                                                                            <span></span><span></span><span></span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="web-content">
                                                                        <div className="content-header"></div>
                                                                        <div className="content-grid">
                                                                            <div className="grid-item"></div>
                                                                            <div className="grid-item"></div>
                                                                            <div className="grid-item"></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="project-preview">
                                                    <div className="mock-interface">
                                                        {project.category === "Mobile app" ? (
                                                            <div className="mobile-mockup">
                                                                <div className="mobile-screen">
                                                                    <div className="mobile-header"></div>
                                                                    <div className="mobile-content">
                                                                        <div className="content-block"></div>
                                                                        <div className="content-block small"></div>
                                                                        <div className="content-block medium"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="web-mockup">
                                                                <div className="browser-bar">
                                                                    <div className="browser-dots">
                                                                        <span></span><span></span><span></span>
                                                                    </div>
                                                                </div>
                                                                <div className="web-content">
                                                                    <div className="content-header"></div>
                                                                    <div className="content-grid">
                                                                        <div className="grid-item"></div>
                                                                        <div className="grid-item"></div>
                                                                        <div className="grid-item"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="project-info">
                                            <h3 className="project-name">{project.title}</h3>
                                            <p className="project-description">{project.description}</p>

                                            <div className="project-techstack">
                                                <h4 className="techstack-title">Tech Stack:</h4>
                                                <div className="techstack-container">
                                                    {project.techStack.map((tech, techIndex) => (
                                                        <div 
                                                            key={techIndex}
                                                            className="techstack-item"
                                                            title={tech}
                                                        >
                                                            {/* FIX: Cek apakah icon ada sebelum menampilkan */}
                                                            {techIcons[tech] && (
                                                                <img 
                                                                    src={techIcons[tech]} 
                                                                    alt={tech}
                                                                    className="techstack-icon"
                                                                    onError={(e) => {
                                                                        console.log(`Icon failed to load for ${tech}:`, techIcons[tech]);
                                                                        e.target.style.display = 'none';
                                                                    }}
                                                                />
                                                            )}
                                                            <span className="techstack-name">{tech}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="project-actions">
                                                <button className="action-btn primary">
                                                    <a className="text-decoration-none text-white" target="_blank" rel="noopener" href={project.source}>View Project</a>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="carousel-indicators">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                        <button
                            key={index}
                            className={`indicator ${currentSlide === index ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                        />
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default Project;