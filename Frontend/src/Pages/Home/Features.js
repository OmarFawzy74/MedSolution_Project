import './Features.css';

const Features = () => {
  return (
    <>
        <div
        data-aos="fade-up"
        data-aos-offset="100"
        data-aos-delay="0"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
        data-aos-mirror="false"
        data-aos-once="true">
            <h1 className='featureSectionHeader'>MedSolution Pharmacies Are More Than 200 Branches Across The World Ready To Serve You Anytime And Anywhere</h1>
        </div>
        <div className="grid-container">
            <div className="grid-item first-feature"
            data-aos="fade-up"
            data-aos-offset="100"
            data-aos-delay="0"
            data-aos-duration="700"
            data-aos-easing="ease-in-out"
            data-aos-mirror="false"
            data-aos-once="true">
                <img src={'images/cloud-computing.png'} alt=''/>
                <h5 className='featureHeader'>Send Your Inquiries To MedSolution</h5>
                <p>Contact us If you have a question relating to our products because we are here for you.</p>
            </div>
            <div className="grid-item second-feature"
            data-aos="fade-up"
            data-aos-offset="100"
            data-aos-delay="0"
            data-aos-duration="900"
            data-aos-easing="ease-in-out"
            data-aos-mirror="false"
            data-aos-once="true">
                <img src={'images/product.png'} alt=''/>
                <h5 className='featureHeader'>Receive Your Online Orders</h5>
                <p>Call us at 19757 to order your product and we will deliver it as soon as possible.</p>
            </div>
            <div className="grid-item third-feature"
            data-aos="fade-up"
            data-aos-offset="100"
            data-aos-delay="0"
            data-aos-duration="1100"
            data-aos-easing="ease-in-out"
            data-aos-mirror="false"
            data-aos-once="true">
                <img src={'images/smile.png'} alt=''/>
                <h5 className='featureHeader'>Enjoy With Our Products</h5>
                <p>We guarantee an excellent after-sales service to our customers.</p>
            </div>
        </div>
    </>
  )
}


export default Features;