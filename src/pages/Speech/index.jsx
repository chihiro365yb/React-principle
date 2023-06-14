import React, { useRef, useState } from 'react';
import useSpeech from '@/hooks/useSpeech';
import { useEffect } from 'react';

export default () => {
    const textRef = useRef(null);
    const [value, setValue] = useState();
    const { onStart, onStop, text } = useSpeech('zh-CN');

    const soundRecord = () => {
        textRef.current.focus();
        onStart();
    };

    const change = e => {
        setValue(e.target.value);
    };

    useEffect(() => {
        if (text) {
            setValue(text);
        }
    }, [text]);

    return (
        <section>
            <textarea onChange={change} value={value} ref={textRef} cols="30" rows="10" />
            <button onClick={soundRecord}>录音</button>
            <button onClick={() => onStop()}>停止</button>
        </section>
    );
};
