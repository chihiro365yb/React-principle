import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default () => {
    const [second, setSecond] = useState(5);

    useEffect(() => {
        const id = setInterval(() => {
            setSecond(t => t - 1);
        }, 1000);
        return () => clearInterval(id);
    }, []);

    if (second === 0) {
        return (window.location.href = '/');
    }

    return (
        <>
            <h1>Not found</h1>
            <h3>
                {second}s后,
                <Link to="/">back home</Link>
            </h3>
        </>
    );
};
