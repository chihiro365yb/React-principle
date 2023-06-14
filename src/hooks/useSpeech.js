import { useState } from 'react';

function useSpeech(lang) {
    const [text, setText] = useState();

    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = window.navigator.language || lang;
        recognition.continuous = true;
        recognition.interimResults = true;
        const onStart = () => {
            recognition.start();
        };
        const onStop = () => {
            recognition.stop();
        };

        recognition.onresult = event => {
            let val = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                val += event.results[i][0].transcript;
            }
            setText(val);
        };
        return {
            onStart,
            onStop,
            text,
        };
    } else {
        throw 'Speech Recognition Not Available';
    }
}

export default useSpeech;
