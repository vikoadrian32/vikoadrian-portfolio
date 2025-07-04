import { Col, Container, Row, Pagination } from "react-bootstrap";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import aboutImage from '../assets/img/portoprofile.jpg'
import '../style/About.css'

// Lazy load images untuk skills
const LazyImage = ({ src, alt, className }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const imgRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={imgRef} className={className}>
            {isInView && (
                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    onLoad={() => setIsLoaded(true)}
                    style={{
                        opacity: isLoaded ? 1 : 0,
                        transition: 'opacity 0.3s ease'
                    }}
                />
            )}
        </div>
    );
};

const About = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [typedText, setTypedText] = useState("");
    const iRef = useRef(0);
    const hasTyped = useRef(false);
    const [activeFilter, setActiveFilter] = useState('all');
    const [isMobile, setIsMobile] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const skillsPerPage = 6;

    // Memoize allSkills untuk mencegah re-creation
    const allSkills = useMemo(() => [
        { name: 'HTML', description: 'Markup Language', icon: require('../assets/img/icon-html.png'), category: 'frontend' },
        { name: 'CSS', description: 'Cascading Style Sheets', icon: require('../assets/img/css.svg'), category: 'frontend'},
        { name: 'Bootstrap', description: 'CSS Framework', icon: require('../assets/img/icon-bootstrap.png'), category: 'frontend' },
        { name: 'React', description: 'Frontend Library', icon: require('../assets/img/icon-react.png'), category: 'frontend' },
        { name: 'PHP', description: 'Backend Scripting', icon: require('../assets/img/icon-php.png'), category: 'backend' },
        { name: 'Laravel', description: 'PHP Framework', icon: require('../assets/img/icons8-laravel-48.png'), category: 'backend' },
        { name: 'Node.js', description: 'JavaScript Runtime', icon: require('../assets/img/nodejs.svg'), category: 'backend' },
        { name: 'Express.js', description: 'Node.js Framework', icon: require('../assets/img/express.svg'), category: 'backend' },
        { name: 'Python', description: 'Backend & Automation', icon: require('../assets/img/icon-python.png'), category: 'backend' },
        { name: 'MySQL', description: 'Relational Database', icon: require('../assets/img/icons8-mysql-48.png'), category: 'backend' },
        { name: 'Java', description: 'Programming Language', icon: require('../assets/img/icon-java.png'), category: 'mobile' },
        { name: 'Android Studio', description: 'Mobile Development IDE', icon: require('../assets/img/icons8-android-studio-48.png'), category: 'mobile' },
        { name: 'Wireshark', description: 'Network Analyzer', icon: require('../assets/img/wireshark.svg'), category: 'cybersecurity' },
        { name: 'Linux', description: 'Operating System', icon: require('../assets/img/icon-linux.png'), category: 'cybersecurity' },
        { name: 'Burpsuite', description: 'Security Testing', icon: require('../assets/img/burpsuite.svg'), category: 'cybersecurity' },
        { name: 'Autopsy', description: 'Digital Forensics', icon: require('../assets/img/icon-autopsy.png'), category: 'cybersecurity' },
        { name: 'PostgreSQL', description: 'Relational Database', icon: require('../assets/img/icons8-postgresql-50.png'), category: 'backend' },
        { name: 'Github', description: 'Version Control Platform', icon: require('../assets/img/icons8-github-64.png'), category: 'tools' },
        { name: 'Metasploit', description: 'Penetration Testing Framework', icon: require('../assets/img/metasploit.svg'), category: 'cybersecurity' }
    ], []);

    // Debounce resize handler
    const debounce = useCallback((func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    }, []);

    // Optimized mobile detection
    useEffect(() => {
        const checkMobile = debounce(() => {
            setIsMobile(window.innerWidth >= 310 && window.innerWidth <= 950);
        }, 100);
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, [debounce]);

    // Memoize filtered skills
    const filteredSkills = useMemo(() => {
        return activeFilter === 'all' 
            ? allSkills 
            : allSkills.filter(skill => skill.category === activeFilter);
    }, [activeFilter, allSkills]);

    // Memoize current skills untuk pagination
    const currentSkills = useMemo(() => {
        if (!isMobile) return filteredSkills;
        
        const startIndex = (currentPage - 1) * skillsPerPage;
        const endIndex = startIndex + skillsPerPage;
        return filteredSkills.slice(startIndex, endIndex);
    }, [filteredSkills, currentPage, skillsPerPage, isMobile]);

    // Memoize pagination calculation
    const totalPages = useMemo(() => {
        return Math.ceil(filteredSkills.length / skillsPerPage);
    }, [filteredSkills.length, skillsPerPage]);

    // Reset to page 1 when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeFilter]);

    const typewriterText = "Passionate Developer & Security Enthusiast";

    // Intersection Observer untuk visibility
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            observer.observe(aboutSection);
        }

        return () => observer.disconnect();
    }, []);

    // Optimized typewriter effect
    useEffect(() => {
        if (isVisible && !hasTyped.current) {
            hasTyped.current = true;
            iRef.current = 0;
            setTypedText("");
            
            const timer = setInterval(() => {
                if (iRef.current < typewriterText.length) {
                    setTypedText(typewriterText.substring(0, iRef.current + 1));
                    iRef.current += 1;
                } else {
                    clearInterval(timer);
                }
            }, 100);
            
            return () => clearInterval(timer);
        }
    }, [isVisible, typewriterText]);

    // Memoize event handlers
    const handlePageChange = useCallback((pageNumber) => {
        setCurrentPage(pageNumber);
    }, []);

    const handleFilterChange = useCallback((filter) => {
        setActiveFilter(filter);
    }, []);

    // Memoize pagination component
    const renderPagination = useMemo(() => {
        if (!isMobile || totalPages <= 1) return null;

        return (
            <div className="d-flex justify-content-center mt-4">
                <Pagination className="custom-pagination">
                    <Pagination.Prev 
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    />
                    {Array.from({ length: totalPages }, (_, i) => (
                        <Pagination.Item
                            key={i + 1}
                            active={i + 1 === currentPage}
                            onClick={() => handlePageChange(i + 1)}
                        >
                            {i + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next 
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    />
                </Pagination>
            </div>
        );
    }, [isMobile, totalPages, currentPage, handlePageChange]);

    return (
        <section id="about" className="about">
            <Container>
                {/* Header Section */}
                <Row className="p-4">
                    <h1 className="text-center p-5 text-white position-relative">
                        About Me
                        <div className="about-title-underline"></div>
                    </h1>
                </Row>

                {/* Main Content */}
                <Row className="align-items-center mb-5">
                    <Col xl={5} lg={6} className="mb-4 mb-lg-0">
                        <div className={`about-image-container ${isVisible ? 'animate-in' : ''}`}>
                            <div className="image-wrapper">
                                <img 
                                    src={aboutImage} 
                                    alt="about-image" 
                                    className="about-profile-img"
                                    loading="lazy"
                                />
                                <div className="image-overlay">
                                    <div className="overlay-content">
                                        <h4>Viko Adrian</h4>
                                        <p>Full Stack Developer</p>
                                    </div>
                                </div>
                            </div>
                            {/* Disable floating animations on mobile untuk performa */}
                            {!isMobile && (
                                <div className="floating-elements">
                                    <div className="floating-icon icon-1">💻</div>
                                    <div className="floating-icon icon-2">🔒</div>
                                    <div className="floating-icon icon-3">🚀</div>
                                    <div className="floating-icon icon-4">👀</div>
                                </div>
                            )}
                        </div>
                    </Col>
                    
                    <Col xl={7} lg={6}>
                        <div className={`about-content ${isVisible ? 'slide-in' : ''}`}>
                            <div className="typewriter-container mb-4">
                                <h2 className="typewriter-text">
                                    {typedText}
                                    <span className="cursor">|</span>
                                </h2>
                            </div>
                            
                            <div className="about-description">
                                <p className="intro-text">
                                    Hi, I'm <span className="highlight">Viko Adrian</span>! I'm a second-year Computer Science student at President University with two years of experience in informatics since graduating from high school.
                                </p>
                                
                                <p className="passion-text">
                                    I'm passionate about <span className="highlight">web development</span> and <span className="highlight">cybersecurity</span>, always excited to create innovative solutions and secure digital experiences.
                                </p>
                                
                                <p className="skills-intro">
                                    I love combining creativity with problem-solving to build meaningful projects. Whether it's crafting responsive websites or understanding security protocols, I'm always eager to learn and take on new challenges.
                                </p>
                            </div>

                            <div className="stats-container mt-4">
                                <div className="stat-item">
                                    <span className="stat-number">2+</span>
                                    <span className="stat-label">Years Experience</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">5+</span>
                                    <span className="stat-label">Projects</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">5+</span>
                                    <span className="stat-label">Technologies</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* Skills Section */}
                <Row className="mt-5">
                    <Col>
                        <div className={`skills-section ${isVisible ? 'fade-in' : ''}`}>
                            <h3 className="skills-title text-center mb-4">Technical Skills</h3>
                           
                            {/* Desktop Marquee - Disable di mobile */}
                            {!isMobile && (
                                <Row className="justify-content-center">
                                    <div className="marquee-container">
                                        <div className="marquee-content">
                                            {[...allSkills, ...allSkills].map((tool, index) => (
                                                <div key={index} className="marquee-item">
                                                    <LazyImage 
                                                        src={tool.icon} 
                                                        alt={tool.name} 
                                                        className="skill-icon-images" 
                                                    />
                                                    <h5 className="text-white mt-2 mb-1">{tool.name}</h5>
                                                    <p className="text-white">{tool.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Row>
                            )}

                            <Row className="mt-5">
                                <div className="skills-categories w-100">
                                    <div className="filter-buttons text-center mb-5">
                                        <button 
                                            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                                            onClick={() => handleFilterChange('all')}
                                        >
                                            All
                                        </button>
                                        <button 
                                            className={`filter-btn ${activeFilter === 'frontend' ? 'active' : ''}`}
                                            onClick={() => handleFilterChange('frontend')}
                                        >
                                            Frontend
                                        </button>
                                        <button 
                                            className={`filter-btn ${activeFilter === 'cybersecurity' ? 'active' : ''}`}
                                            onClick={() => handleFilterChange('cybersecurity')}
                                        >
                                            Cybersecurity
                                        </button>
                                        <button 
                                            className={`filter-btn ${activeFilter === 'backend' ? 'active' : ''}`}
                                            onClick={() => handleFilterChange('backend')}
                                        >
                                            Backend
                                        </button>
                                        <button 
                                            className={`filter-btn ${activeFilter === 'mobile' ? 'active' : ''}`}
                                            onClick={() => handleFilterChange('mobile')}
                                        >
                                            Mobile
                                        </button>
                                        <button 
                                            className={`filter-btn ${activeFilter === 'tools' ? 'active' : ''}`}
                                            onClick={() => handleFilterChange('tools')}
                                        >
                                            Tools
                                        </button>
                                    </div>

                                    {/* Skills Cards */}
                                    <div className={`skills-grid ${isMobile ? 'mobile-grid' : ''}`}>
                                        {currentSkills.map((skill, index) => (
                                            <div key={`${skill.name}-${index}`} className="skill-card-item">
                                                <div className="skill-icon-wrapper">
                                                    <LazyImage 
                                                        src={skill.icon} 
                                                        alt={skill.name} 
                                                        className="skill-icon-img" 
                                                    />
                                                </div>
                                                <h5 className="skill-name">{skill.name}</h5>
                                                <div className="skill-description">
                                                    <p>{skill.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Pagination - Only show on mobile */}
                                    {renderPagination}
                                </div>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default About;