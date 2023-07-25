import './Footer.css';
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <section className='footer-section'>
      <div className='footer-container'>
        <div className='footerHeadersContainer'>
          <div className='firstFooterHeader'>
            <span>HOTLINE | 19757</span>
          </div>
          <div className='secondFooterHeader'>
            <Link to={""}>CONTACT US</Link>
          </div>
          <div className='thirdFooterHeader'>
            <Link to={""}>ABOUT US</Link>
          </div>
        </div>
        <div className='footer-content'>
          <div className='brandlogos'>
            <div className='firstLogo'>
              <img src={'images/logo2.png'} alt=''/>
            </div>
            <div className='secondLogo'>
              <img src={'images/MedSolution6.png'} alt=''/>
            </div>
          </div>
          <div className='paymentLogos'>
            <div className='aramexLogo'>
              <img src={'images/fot-1.png'} alt=''/>
            </div>
            <div className='mastercardLogo'>
              <img src={'images/fot-2.png'} alt=''/>
            </div>
            <div className='visaLogo'>
              <img src={'images/fot-3.png'} alt=''/>
            </div>
            <div className='healthLogo'>
              <img src={'images/healthLogo.png'} alt=''/>
            </div>
          </div>
          <div className='socialLogos'>
            <div className='facebookLogo'>
              <a href='https://web.facebook.com/' target='_blank'><img src={'images/facebook.png'} alt=''/></a>
            </div>
            <div className='twitterLogo'>
              <a href='https://twitter.com/' target='_blank'><img src={'images/twitter-sign.png'} alt=''/></a>
            </div>
            <div className='instagramLogo'>
              <a href='https://www.instagram.com/' target='_blank'><img src={'images/instagram.png'} alt=''/></a>
            </div>
            <div className='youtubeLogo'>
              <a href='https://www.youtube.com/' target='_blank'><img src={'images/youtube.png'} alt=''/></a>
            </div>
          </div>
          <div className='heartLogo'>
            <img src={'images/heart.png'} alt=''/>
          </div>
          <div className='copyright'>
            <h6>© 2023 MedSolution</h6>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer;