import { useState, useEffect } from 'react';

const words = [
    'Websites',
    'Mobile Apps',
    'Software',
    'IoT Solutions',
    'UI/UX Designs',
    'Your Dreams',
];

export default function TypeWriter() {
    const [wordIndex, setWordIndex] = useState(0);
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[wordIndex];
        let timeout: ReturnType<typeof setTimeout>;

        if (!isDeleting && text === currentWord) {
            timeout = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && text === '') {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
        } else {
            timeout = setTimeout(
                () => {
                    setText(
                        isDeleting
                            ? currentWord.slice(0, text.length - 1)
                            : currentWord.slice(0, text.length + 1)
                    );
                },
                isDeleting ? 50 : 100
            );
        }

        return () => clearTimeout(timeout);
    }, [text, isDeleting, wordIndex]);

    return (
        <span className="text-primary">
            {text}
            <span className="animate-blink text-primary/80">|</span>
        </span>
    );
}
