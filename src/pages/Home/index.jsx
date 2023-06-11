import React, { useState } from 'react';
import './index.less';

const Home = () => {
    const [toggle, setToggle] = useState(false);
    return (
        <>
            {toggle ? (
                <div className="child" onClick={() => setToggle(!toggle)}>
                    124
                </div>
            ) : (
                <div className="father" onClick={() => setToggle(!toggle)}>
                    我是Home
                </div>
            )}
        </>
    );
};

export default Home;
