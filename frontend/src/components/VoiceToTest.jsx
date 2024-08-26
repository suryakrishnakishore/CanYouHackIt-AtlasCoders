import React, { useState, useEffect } from 'react';
import { FaMicrophone, FaStop } from 'react-icons/fa';

const VoiceToText = ({ value, onChange }) => {
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recog = new SpeechRecognition();
            recog.continuous = true;
            recog.interimResults = true;
            recog.lang = 'en-US';

            recog.onstart = () => {
                setIsListening(true);
                console.log("Voice recognition started. Speak into the microphone.");
            };

            recog.onresult = (event) => {
                let interimTranscript = '';
                let finalTranscript = '';

                for (let i = 0; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript + ' ';
                    } else {
                        interimTranscript += transcript;
                    }
                }

                onChange({ target: { name: 'body', value: finalTranscript + interimTranscript } });
            };

            recog.onerror = (event) => {
                console.error("Speech recognition error detected: " + event.error);
                setIsListening(false);
            };

            recog.onend = () => {
                setIsListening(false);
                console.log("Voice recognition ended.");
            };

            setRecognition(recog);
        } else {
            console.error("Speech Recognition API is not supported in this browser.");
        }
    }, [onChange]);

    const startListening = () => {
        if (recognition) {
            recognition.start();
        }
    };

    const stopListening = () => {
        if (recognition) {
            recognition.stop();
        }
    };

    return (
        <div style={{ width: '100%', marginTop: '20px' }}>
            <div style={{ position: 'relative' }}>
                <textarea
                    id="note"
                    name="body"
                    value={value}
                    onChange={onChange}
                    placeholder="Type or use voice input..."
                    style={{
                        width: '400px',
                        height: '200px',
                        fontSize: '18px',
                        padding: '15px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        resize: 'none'
                    }}
                />
                <div style={{ position: 'absolute', right: '20px', top: '20px', cursor: 'pointer' }}>
                    {isListening ? (
                        <FaStop size={28} color="red" onClick={stopListening} />
                    ) : (
                        <FaMicrophone size={28} color="green" onClick={startListening} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default VoiceToText;
