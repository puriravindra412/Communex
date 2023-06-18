import React, { useEffect } from 'react'
import NavBar from '../navbar/navBar'
import '../../css/about.css'
import social from '../../images/socialCommunity.png'
import ravindra from '../../images/ravindra.jpg'
import rohit from '../../images/rohit.jpg'
import sumit from '../../images/sumit.jpg'
import { BsInstagram,BsLinkedin,BsGithub} from "react-icons/bs";
import AOS from 'aos'
import 'aos/dist/aos.css'
const About = () => {
    useEffect(() => {
      AOS.init({duration:2000})
    }, [])
    
  return (
    <div>
        <NavBar />
        <div className='about-communex'>
            <h4>ABOUT COMMUNEX</h4>
            <p data-aos='zoom-out'>Build with love , by  a <strong className='highlighted-text'>Developer<br/> for the Developers ,  tO Connect ,</strong>  Share <br/>and Build a Community For Future </p>
            <img src={social} alt='community' className='social-community-img' data-aos='fade-down'/>
            <div className='meet-our-team'>
                <h4>MEET OUR TEAM</h4>
                <div className='team-container'>
                    <div className='team-card' data-aos='flip-left'>
                        <img  src={ravindra} alt="ravi"/>
                        <div className='team-member-name'>
                            <h3 >Ravindra Puri</h3>
                            <p>Jr. FullStack Developer</p>
                        </div>
                        <h4>ABOUT</h4>
                        <p className='short-bio'>Full-stack developer and B.Tech graduate from PIET, worked on Communex, a Responsible Front-end,Back-end and Technical research.</p>
                        <div className='team-socials'>
                            <button className='team-social-button'><BsInstagram /></button>
                            <button className='team-social-button'><BsLinkedin /></button>
                            <button className='team-social-button'><BsGithub /></button>
                            <button className='team-social-button'><BsInstagram /></button>
                        </div>
                    </div>
                    <div className='team-card' data-aos='flip-left'>
                        <img  src={rohit} alt="ravi"/>
                        <div className='team-member-name'>
                            <h3 >Rhit Tak</h3>
                            <p>Software Developer</p>
                        </div>
                        <h4>ABOUT</h4>
                        <p className='short-bio'>Software Developer and B.Tech graduate from PIET, worked on Communex, and  Responsible  for Back-end and Data Base Managment .</p>
                        <div className='team-socials'>
                            <button className='team-social-button'><BsInstagram /></button>
                            <button className='team-social-button'><BsLinkedin /></button>
                            <button className='team-social-button'><BsGithub /></button>
                            <button className='team-social-button'><BsInstagram /></button>
                        </div>
                    </div>
                    <div className='team-card' data-aos='flip-left'>
                        <img  src={sumit} alt="ravi"/>
                        <div className='team-member-name'>
                            <h3 >Sumit Jain</h3>
                            <p>Front-end Developer</p>
                        </div>
                        <h4>ABOUT</h4>
                        <p className='short-bio'>Front-end Developer and B.Tech graduate from PIET, worked on Communex, and  Responsible seamless UI/UX Design and  Front-end Developement.</p>
                        <div className='team-socials'>
                            <button className='team-social-button'><BsInstagram /></button>
                            <button className='team-social-button'><BsLinkedin /></button>
                            <button className='team-social-button'><BsGithub /></button>
                            <button className='team-social-button'><BsInstagram /></button>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>

    </div>
  )
}

export default About