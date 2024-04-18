import { useState } from 'react';
import './Menu.css';

function Menu() {
    const [activeIndex, setActiveIndex] = useState(1);

    const handleItemClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <>
        <div className="menu">
            <div className='menu-row'>
                <div className={`menu-row-element ${activeIndex === 0 ? 'active' : ''}`}>
                    <a href="#" onClick={() => handleItemClick(1)}>TALLERES</a>
                </div>
                <div className={`menu-row-element ${activeIndex === 1 ? 'active' : ''}`}>
                    <a href="#" onClick={() => handleItemClick(0)}>SALAS</a>
                </div>
            </div>
        </div>
        </>
  );
}
  
  export default Menu;