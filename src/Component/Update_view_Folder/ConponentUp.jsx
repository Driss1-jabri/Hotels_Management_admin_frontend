import React, { useState } from 'react';
import './ConponentUp.css';
export default function ToggleContent({}) {
    const [isVisible, setIsVisible] = useState(false);
    

    const toggleVisibility = () => {
        setIsVisible(!isVisible); 
        if(!isVisible){
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Pour un défilement fluide
        });
        document.body.classList.add('disable-scroll');}
        else
        document.body.classList.remove('disable-scroll');

    };

    return (
        <div className='cg'>
            <button onClick={toggleVisibility}>Toggle Content</button>
            {isVisible && (
                <div className='cm'>
                   
                        <div className='cmc'>
                            
                                <button onClick={toggleVisibility}>Toggle Content</button>
                                {/* Contenu à afficher lorsqu'il est visible */}
                                <input type="email" name="" placeholder='email' id="" />
                                
                                
                        </div>
                    
                </div>
            )}
        </div>
    );
}
