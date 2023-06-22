import React, { useState } from 'react';
import './index.less';

const Home = () => {
    const [toggle, setToggle] = useState(true);

    const onChange = e => {
        const val = e.target.value;
        console.log(val);
    };

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
            <div>
                <input type="text" onChange={onChange} />
            </div>
        </>
    );
};

export default Home;
