import React, { useState } from 'react'
import { Button, Divider, Typography } from "@mui/material";
import { BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";
import { Link } from 'react-router-dom';
const ExploreLogin = () => {
    const [activeCategory, setActiveCategory] = useState(
        localStorage.getItem("active-category"),
      );
    
      const handleCategoryChange = (category) => {
        setActiveCategory(category);
        localStorage.setItem("active-category", category);
      };
  return (
    <div className="right-sidebar">
            <div className="right-sidebar-community-box" style={{textAlign:"start"}}>
                <Typography variant="h6">
                New to Communex
                </Typography>
                <Typography variant="caption" style={{fontSize:"10px"}} >
                Unlock Exclusive Wonders – Log In to Ignite Your Journey!
                </Typography>
                <div style={{alignItems:"center",textAlign:"center",marginTop:"10px"}}>
                <Link
                to="/login"
                className="link-styling"
               
                  ><Button  variant="outlined" style={{color:"var(--button)",borderRadius:"20px",width:"100%",marginBottom:"5px"}}>
                  <Typography variant="button" >
                    Sign In
                  </Typography>
            </Button>
                  </Link>
                  
                    <Typography variant="body2" >
                    or
                  </Typography>
                  <Link
              to="/login"
              className="link-styling"
              
                ><Button  variant="outlined" style={{color:"var(--button)",borderRadius:"20px",width:"100%",marginBottom:"5px"}}>
                <Typography variant="button" >
                  Sign Up
                </Typography>
          </Button>
                </Link>
                  
                  
                </div>
              <Typography variant="caption" style={{fontSize:"10px"}} >
                By signing up, you agree to the <a href="#" style={{color:"#3a9ae8"}}>Terms of Service</a> and <a href="#" style={{color:"#3a9ae8"}}>Privacy Policy</a>, including <a href="#" style={{color:"#3a9ae8"}}>Cookie</a> Use.
              </Typography>
              <Divider style={{marginTop:"10px"}}>X</Divider>
              <div style={{alignItems:"center",textAlign:"center",marginTop:"10px"}}>
              <Link
              to="/about"
              className="link-styling"
              onClick={() => handleCategoryChange("about")}
                >
              <Button  variant="contained" style={{backgroundColor:"var(--button)",borderRadius:"20px",width:"100%",marginBottom:"10px"}}>
                <Typography variant="button" >
                  About Us
                </Typography>
              </Button>
              </Link>
              
            </div>
            
            <div style={{textAlign:"center",marginTop:"20px"}}>
            <Typography variant="subtitle"  style={{marginTop:"20px",textAlign:"center"}}>
                  Socials
            </Typography>
                <div className="team-socials" style={{textAlign:"center",marginTop:"20px"}}>
                <button className="team-social-button">
                  <BsInstagram />
                </button>
                <button className="team-social-button">
                  <BsLinkedin />
                </button>
                <button className="team-social-button">
                  <BsGithub />
                </button>
               
              </div>
                </div>
            
              </div>
              <div className="right-sidebar-community-box" style={{textAlign:"start"}}>
                <h6 style={{fontSize:"13px",color:"var(--button)"}}>
                Communex
                </h6>
                <div className='trending-tag-box-design'>
                    <Typography variant='caption' style={{fontSize:"12px",fontStyle:"italic",color:"var(--button)"}}>"Communex: Where Stories Connect and Communities Thrive"</Typography>
                </div>
              </div>
          </div>
  )
}

export default ExploreLogin