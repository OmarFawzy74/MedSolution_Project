import './FocusQuoteSection.css';

const FocusQuoteSection = () => {
  return (
    <div className='serviceContainer'>
        <div className='serviceContent'
          data-aos="zoom-in"
          data-aos-offset="0"
          data-aos-delay="0"
          data-aos-duration="500"
          data-aos-easing="ease-in-out"
          data-aos-mirror="false"
          data-aos-once="true">
          <h1 className='serviceHeader'>A FOCUS ON SERVICE</h1>
          <div className='line'></div>
          <p className='first-phrase'>I do not know how I would get my medication for my work-related injury if it wasn’t for MedSolution.</p>
          <p className='second-phrase'>When you are injured and in pain no one wants to go through the red tape of waiting days for relief. MedSolution always delivers my medication as soon as possible. Be assured with MedSolution you are relying on a fast and reputable staff.</p>
          <p>-Evelyn W.</p>
        </div>
    </div>
  )
}

export default FocusQuoteSection;