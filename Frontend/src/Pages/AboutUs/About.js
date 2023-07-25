import './About.css';
import React from "react";

const About = () => {
    return (
        <section className='aboutPage'>
            <section className='about-banner'>
                <div className='about-header-container'>
                    <div className='row'>
                        <div className='col-lg-6 col-md-6'>
                            <h1>About Us</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className='about-us'>
                <div className='about-text-container'>
                    <h2>Wellness is you</h2>
                    <p>It is not just about being healthy, it is beyond.  WELLNESS is a state of complete harmony & integration of the body, mind and spirit.  In <b>MedSoultion</b> everything we do, think, feel, and believe is dedicated to improve your state of well-being. We are dedicated to do what beyond normal to bring wellness into your life.</p>
                    <h2>Vision</h2>
                    <p>To be the top healthcare service provider and partner, expanding our international services to bring wellness in each community we serve.</p>
                    <h2>Mission</h2>
                    <p>To do what beyond normal everyday bringing wellness into lives of our fellows' human-beings. To use advanced technology providing the most high standard accessible solutions in healthcare and retail services.</p>
                    <h2>The 7 values</h2>
                    <p>
                        You<br/>
                        Compassion<br/>
                        Integrity<br/>
                        Together<br/>
                        Accessibility<br/>
                        Innovation<br/>
                        Excellence
                    </p>
                    <h2>Philosophy behind our symbol</h2>
                    <p>
                        We attract all positives.<br/>
                        We bridge all good meanings.<br/>
                        We bring happiness in all what we do.
                    </p>
                </div>
            </section>

            <img className='plus-2' src='images/plus.jpeg'/>
            <img className='wave1-2' src='images/wave.jpeg'/>
            <img className='wave2-2' src='images/wave.jpeg'/>
            <img className='circle-2' src='images/circle.jpeg'/>

        </section>

    )

}


export default About;
