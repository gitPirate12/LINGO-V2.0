import React from 'react';

const footerStyles = {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  
};

const sectionStyles = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
};

const contentStyles = {
  flex: 1,
  padding: '20px',
  minHeight: 'auto',
};

const navStyles = {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  padding: '40px 20px',
};

const linkListStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '24px',
  justifyContent: 'space-between',
  textAlign: 'center',
  color: '#6B7280', // Equivalent to text-stone-500
};

const linkItemStyles = {
  minWidth: '160px',
  width: '40px',
};

const socialStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
  justifyContent: 'center',
  marginTop: '24px',
};

const footerTextStyles = {
  marginTop: '24px',
  textAlign: 'center',
  color: '#6B7280', // Equivalent to text-stone-500
};

const Footer = () => {
  return (
    <footer style={footerStyles}>
      <section style={sectionStyles}>
        <div style={contentStyles}></div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, width: '100%', maxWidth: '960px', minWidth: '240px' }}>
            <nav style={navStyles}>
            <ul style={linkListStyles}>
              <li style={linkItemStyles}><span tabIndex="0">FAQ</span></li>
              <li style={linkItemStyles}><span tabIndex="0">Contact Us</span></li>
              <li style={linkItemStyles}><span tabIndex="0">Privacy Policy</span></li>
              <li style={linkItemStyles}><span tabIndex="0">Terms of Service</span></li>
            </ul>

              <div style={socialStyles}>
                <a href="#social1" className="flex flex-col items-center" tabIndex="0">
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/679633ebc02a23390507d79aedec69f3f1488e097478efaac91ec332f5ec6ce2?placeholderIfAbsent=true&apiKey=32eae747db0848928735b2b1f6ffe638" alt="Social Media Icon 1" style={{ objectFit: 'contain', width: '24px', height: '24px' }} />
                </a>
                <a href="#social2" className="flex flex-col items-center" tabIndex="0">
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/fcf1507e4f2c4f51d3d3a130d0e4580c1c26b9de5e0985f0316f2ef1f10df858?placeholderIfAbsent=true&apiKey=32eae747db0848928735b2b1f6ffe638" alt="Social Media Icon 2" style={{ objectFit: 'contain', width: '24px', height: '24px' }} />
                </a>
                <a href="#social3" className="flex flex-col items-center" tabIndex="0">
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/68c6c1d28799fc9dea51ba8c11ae9c9ab251423ff388f38a49b5bf343ba92289?placeholderIfAbsent=true&apiKey=32eae747db0848928735b2b1f6ffe638" alt="Social Media Icon 3" style={{ objectFit: 'contain', width: '24px', height: '24px' }} />
                </a>
              </div>
              <p style={footerTextStyles}>© 2024 LINGO TRANSLATOR. All Rights Reserved.</p>
            </nav>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
