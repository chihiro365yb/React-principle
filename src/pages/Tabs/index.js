import React, { useState } from 'react';
import './index.less';

const tabItem = [
    {
        label: '路径1',
        key: '1',
    },
    {
        label: '路径2',
        key: '2',
    },
    {
        label: '路径3',
        key: '3',
    },
];

function Tabs() {
    const [active, setActive] = useState('1');
    const onChange = val => {
        setActive(val);
    };
    return (
        <div className="App">
            <div className="tabs">
                {tabItem.map(ele => {
                    return (
                        <span key={ele.key}>
                            <span className="tab-item" onClick={() => onChange(ele.key)}>
                                {ele.label}
                            </span>
                            <i className={`underline ${active === ele.key && 'active'}`} />
                        </span>
                    );
                })}
            </div>
        </div>
    );
}

export default Tabs;
