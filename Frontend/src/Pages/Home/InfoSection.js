import './InfoSection.css';

const InfoSection = () => {
  return (
    <div className='infoSectionContainer'>
        <div className='firstInfoContent'
            data-aos="fade-up"
            data-aos-offset="100"
            data-aos-delay="0"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
            data-aos-mirror="false"
            data-aos-once="true">
            <div className='firstInfoHeader'>
                <h1>For</h1>
                <h1 className='firstInfoColoredHeader'>Patients</h1>
            </div>
            <img src={'https://wirxpharmacy.com/wp-content/uploads/2019/12/image-1-400x300.jpg'} alt=''/>
            <p>We consider it a privilege to be of service to you, coordinating with your treating physicians to simplify your experience and deliver your prescriptions as quickly as possible.</p>
        </div>
        <div className='secondInfoContent'
            data-aos="fade-up"
            data-aos-offset="100"
            data-aos-delay="0"
            data-aos-duration="700"
            data-aos-easing="ease-in-out"
            data-aos-mirror="false"
            data-aos-once="true">
            <div className='secondInfoHeader'>
                <h1>For</h1>
                <h1 className='secondInfoColoredHeader'>Physicians</h1>
            </div>
            <img src={'https://wirxpharmacy.com/wp-content/uploads/2019/12/image-2-400x300.jpg'} alt=''/>
            <p>Our goal is to ensure your patients receive the utmost in care and are able to adhere to your treatment plan without interruption.  WIRX Pharmacy can help your practice run smoother.</p>
        </div>
        <div className='thirdInfoContent'
            data-aos="fade-up"
            data-aos-offset="100"
            data-aos-delay="0"
            data-aos-duration="900"
            data-aos-easing="ease-in-out"
            data-aos-mirror="false"
            data-aos-once="true">
            <div className='thirdInfoHeader'>
                <h1>For</h1>
                <h1 className='thirdInfoColoredHeader'>Attorneys</h1>
            </div>
            <img src={'https://wirxpharmacy.com/wp-content/uploads/2019/12/image-3-400x300.jpg'} alt=''/>
            <p>Imagine being able to offer your clients a simplified and hassle-free process that guarantees delivery of important medications despite claim denials or pending litigation.</p>
        </div>
    </div>
  )
}

export default InfoSection;
