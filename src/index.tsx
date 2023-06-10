import React, { useEffect, useRef, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Picker } from './components/picker';
import './index.css';

const App: React.FC = () => {
    const [borderRadius, setBorderRadius] = useState([62, 38, 70, 30])
    const [value, setValue] = useState('border-radius: 62% 38% 70% 30%');
    const [copied, setCopied] = useState(false);
    const [rect, setRect] = useState<DOMRect | null>();
    const myRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (myRef.current) {
          const rect = myRef.current.getBoundingClientRect();
          console.log(rect)
          setRect(rect)
        }
      }, []);

    
    return (
        <div className="flex flex-col h-screen items-center justify-between">
            <h1 className="text-5xl mt-10 h-16">Border Radius Previewer</h1>
            <div ref={myRef} className='h-[48rem] w-[48rem] border border-dashed border-2 border-black'>
                <Picker axis={"y"}/>
                <Picker axis={"y"}/>
                <Picker axis={"x"}/>
                <Picker axis={"x"}/>
                <div className='h-full w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' style={{ borderRadius: borderRadius.join('% ') + "%"}}></div>
            </div>
            <div className='flex flex-row items-center'>
                <span className='mr-4 text-2xl'>border-radius:</span>
                <div className='border p-6 text-2xl bg-slate-400'>{borderRadius.join('% ') + "%"}</div>
                <CopyToClipboard text={value}
                    onCopy={() => {
                    setCopied(true);
                    setTimeout(() => {
                        setCopied(false);
                    }, 2000);
                    }}
                >
                    <button className='w-20 text-lg border h-full bg-pink-500 text-white'>{copied ? 'Copied!' : 'Click to copy'}</button>
                </CopyToClipboard>
            </div>
            <div className='h-16 mb-10'>Made by Wojciech Bigosinski</div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
