import React from "react";
import footerImage from "./ImageFooter/logo.jpg"; // Lingo image for footer

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <img src={footerImage} alt="Lingo Logo" className="footer-logo" />
          </div>
          <div className="col-md-2">
            <div className="footer-section">
              <h5 className="footer-title">HELP</h5>
              <ul className="footer-list">
                <li>FAQ</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
          <div className="col-md-2">
            <div className="footer-section">
              <h5 className="footer-title">Policies</h5>
              <ul className="footer-list">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>

          <div className="col-md-2">
            <div className="footer-section">
              <h5 className="footer-title">Follw us</h5>
              <ul className="footer-list">
                <li>Facebook</li>
                <li>Youtube</li>
              </ul>
            </div>
          </div>


        </div>
        
        <div className='footer-right'>
          <p className='FNFooterBottom'>
            © 2024 LINGO All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;