import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable'

interface ModalProps {
    rect: DOMRect | {}
    axis: "x" | "y" | "both" | "none",
    position: number[],
    borderRadius: { top: number; right: number; bottom: number; left: number; },
    setBorderRadius: Dispatch<SetStateAction<{ top: number; right: number; bottom: number; left: number; }>>
}

export const Picker: React.FC<ModalProps> = ({ rect, axis, position, borderRadius, setBorderRadius }) => {
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
    const [bounds, setBounds] = useState(null);
    
    const myRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (position[0] === rect["x"] && position[1] === rect["y"]) {
            setBounds({ left: 0, right: rect["width"], top: 0, bottom: 0 });
            setDragPosition({ x: (borderRadius.top * rect["width"])/100, y: 0 })
        }
        else if (position[0] === (rect["x"] + rect['width']) && position[1] === rect["y"]) {
            setBounds({ left: 0, right: 0, top: 0, bottom: rect["height"] });
            setDragPosition({ x: 0, y: (borderRadius.right * rect["height"])/100 })
        }
        else if (position[0] === (rect["x"]) && position[1] === (rect["y"] + rect['height'])) {
            setBounds({ left: 0, right: 0, top: -rect["width"], bottom: 0 });
            setDragPosition({ x: 0, y: -(borderRadius.left * rect["height"])/100 })
        }
        else if (position[0] === (rect["x"] + rect['width']) && position[1] === (rect["y"] + rect['height'])) {
            setBounds({ left: -rect["width"], right: 0, top: 0, bottom: 0 });
            setDragPosition({ x: -(borderRadius.bottom * rect["height"])/100, y: 0 })
        }
    }, []);


    const onControlledDrag = (e, newPosition) => {
        setDragPosition(newPosition);
        if (position[0] === rect["x"] && position[1] === rect["y"]) {
            setBorderRadius({
                ...borderRadius,
                "top": Math.floor((newPosition.x/bounds.right)*100)
            });
        }
        else if (position[0] === (rect["x"] + rect['width']) && position[1] === rect["y"]) {
            setBorderRadius({
                ...borderRadius,
                "right": Math.floor((newPosition.y/bounds.bottom)*100)
            });
        }
        else if (position[0] === (rect["x"]) && position[1] === (rect["y"] + rect['height'])) {
            setBorderRadius({
                ...borderRadius,
                "left": Math.floor((newPosition.y/bounds.top)*100)
            });
        }
        else if (position[0] === (rect["x"] + rect['width']) && position[1] === (rect["y"] + rect['height'])) {
            setBorderRadius({
                ...borderRadius,
                "bottom": Math.floor((newPosition.x/bounds.left)*100)
            });
        }
    };

    return (
            <Draggable position={dragPosition} onDrag={onControlledDrag} axis={axis} bounds={bounds}>
                <div ref={myRef} style={{ left: position[0] - 10, top: position[1] - 10}} className="absolute w-5 h-5 border border-2 border-solid border-black flex justify-center items-center">
                    <div className='w-2 h-2 bg-black'></div>
                </div>
            </Draggable>
    );
};
