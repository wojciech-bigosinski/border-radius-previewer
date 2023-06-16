import React, { useEffect, useRef, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Picker } from './components/picker';
import './index.css';

const App: React.FC = () => {
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
      ]);
    const [borderRadius, setBorderRadius] = useState({
        "top": 32, 
        "right": 30, 
        "bottom": 5, 
        "left": 20
    })
    const [value, setValue] = useState('border-radius: 0% 0% 0% 0%');
    const [copied, setCopied] = useState(false);
    const [rect, setRect] = useState<DOMRect | null>(null);
    const myRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (myRef.current) {
          const rect = myRef.current.getBoundingClientRect();
          console.log(rect)
          setRect(rect)
        }
    }, [windowSize]);

    useEffect(() => {
        setValue(`border-radius: ${borderRadius.top}% ${borderRadius.right}% ${borderRadius.bottom}% ${borderRadius.left}%`)
    }, [borderRadius])

    useEffect(() => {
        const handleWindowResize = () => {
          setWindowSize([window.innerWidth, window.innerHeight]);
        };
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    
    return (
        <div className="flex flex-col h-screen items-center justify-between">
            <h1 className="text-5xl mt-10 h-16 flex justify-center flex-wrap"><p className='px-2'>Border</p> <p className='px-2'>Radius</p> <p className='px-2'>Previewer</p></h1>
            <div ref={myRef} className='h-[12rem] w-[12rem] sm:h-[18rem] sm:w-[18rem] md:h-[24rem] md:w-[24rem] lg:h-[30rem] lg:w-[30rem] xl:h-[36rem] xl:w-[36rem] 2xl:h-[42rem] 2xl:w-[42rem] border border-dashed border-2 border-black'>
                {rect == null ? <></> : <div>
                    <Picker rect={rect} axis="x" position={[rect["x"], rect["y"]]} borderRadius={borderRadius} setBorderRadius={setBorderRadius}/>
                    <Picker rect={rect} axis="y" position={[rect["x"] + rect["width"], rect["y"]]} borderRadius={borderRadius} setBorderRadius={setBorderRadius}/>
                    <Picker rect={rect} axis="y" position={[rect["x"], rect["y"] + rect["height"]]} borderRadius={borderRadius} setBorderRadius={setBorderRadius}/>
                    <Picker rect={rect} axis="x" position={[rect["x"] + rect["width"], rect["y"] + rect["height"]]} borderRadius={borderRadius} setBorderRadius={setBorderRadius}/>
                    </div>
                }
                <div className='h-full w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' style={{ borderRadius: `${borderRadius.top}% ${borderRadius.right}% ${borderRadius.bottom}% ${borderRadius.left}%`}}></div>
            </div>
            <div className='flex flex-row items-center flex-wrap justify-center'>
                <span className='mr-4 text-2xl'>border-radius:</span>
                <div className='flex flex-wrap justify-center'>
                    <div className='border p-6 text-2xl bg-slate-400 rounded-l-xl'>{`${borderRadius.top}% ${borderRadius.right}% ${borderRadius.bottom}% ${borderRadius.left}%`}</div>
                    <CopyToClipboard text={value}
                        onCopy={() => {
                        setCopied(true);
                        setTimeout(() => {
                            setCopied(false);
                        }, 2000);
                        }}
                    >
                        <button className='w-24 text-lg border bg-pink-500 text-white hover:bg-pink-700 rounded-r-xl'>{copied ? 'Copied!' : 'Click to copy'}</button>
                    </CopyToClipboard>
                </div>
            </div>
            <div className='h-16 mb-10'>Made by Wojciech Bigosinski</div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
