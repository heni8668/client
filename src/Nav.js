import React, { useEffect, useState } from 'react';
import './Nav.css';

function Nav() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShow(true);
            } else {
                setShow(false);
            }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
  return (
    <div className={`nav ${show && 'nav__black'}`}>
        <img className='nav__logo' src="https://images.ctfassets.net/y2ske730sjqp/1aONibCke6niZhgPxuiilC/2c401b05a07288746ddf3bd3943fbc76/BrandAssets_Logos_01-Wordmark.jpg?w=940" alt="netflix logo" />
        <img className='nav__avatar' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJljDyTu6udHTQ6J7shXViP08L6_g9xaOGQg&usqp=CAU" alt="avator" />
    </div>
  )
}

export default Nav