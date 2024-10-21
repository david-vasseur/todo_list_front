import React from 'react';
import { TfiAngleLeft } from 'react-icons/tfi';
import { useNavigate } from 'react-router-dom';

function BackButton({ onClick }) {
    
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            navigate(-1)
        }
    }

    return (
        <div>
            <button onClick={handleClick} className="flex items-center text-[#dbd8e3] underline text-[1rem] font-bold hover:scale-[1.15] transition-all duration-50 fixed left-1 top-20 sm:left-10 sm:top-28">
              <TfiAngleLeft className="mr-1" /> Retour
            </button>
        </div>
      )
}

export default BackButton;