import React, { useEffect, useRef, useState } from 'react';

interface ModalProps {
    axis: string
}

export const Picker: React.FC<ModalProps> = ({ axis }) => {
    return (
        <div style={{left: 650, top: 187, transform: "translateY(-50%) translateX(-50%)"}} className="absolute w-5 h-5 border border-2 border-solid border-black flex justify-center items-center">
            <div className='w-2 h-2 bg-black'></div>
        </div>
    );
};
