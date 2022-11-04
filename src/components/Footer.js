import './Footer.css';

const Footer = (props) => {

    const { top } = props

    return (
        <footer className='footer' style={{top:top}}>

            <div className='footer-bottom'>
                AIR ARTBERRY
                <a href="mailto:air@artberry.eu">air@artberry.eu</a>
                <a href="tel:+359893383999">mob. +359 893 383 999</a>
            </div>
        </footer>
    );
};

export default Footer;