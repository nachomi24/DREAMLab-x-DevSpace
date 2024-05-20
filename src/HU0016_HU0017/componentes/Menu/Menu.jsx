import { useState } from 'react';
import './Menu.css';

function Menu({ onMenuClick }) {
    const [activeIndex, setActiveIndex] = useState(0); // Talleres is default active
    
    const handleItemClick = (index) => {
        setActiveIndex(index);
        onMenuClick(index);
    };

    
    return (
        <div className="menu">
            <div className='menu-row'>
                <div className={`menu-row-element ${activeIndex === 0 ? 'active' : ''}`}>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleItemClick(0); }}>TALLERES</a>
                </div>
                <div className={`menu-row-element ${activeIndex === 1 ? 'active' : ''}`}>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleItemClick(1); }}>SALAS</a>
                </div>
                
            </div>
        </div>
    );
}

export default Menu;
