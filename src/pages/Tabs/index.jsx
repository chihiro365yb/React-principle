import * as bodyPix from '@tensorflow-models/body-pix';
import * as tfjs from '@tensorflow/tfjs';
import { Radio } from 'antd';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
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
// 注册模型
tfjs.backend();

function Tabs() {
    const [active, setActive] = useState('1');
    const canvasRef = useRef(null);
    const videoRef = useRef(null);
    const [blurVal, setBlurVal] = useState(0);
    const [net, setNet] = useState();
    const blurLevel = useRef();

    const clearCanvas = obj => {
        obj.getContext('2d').clearRect(0, 0, obj.width, obj.height);
    };

    const blurBackground = async () => {
        const img = videoRef.current;
        const val = blurLevel.current;
        const canvas = canvasRef.current;
        const segmentation = await net.segmentPerson(img);
        bodyPix.drawBokehEffect(canvas, img, segmentation, val, 3, true);
        if (val === 0) {
            clearCanvas(canvas);
        } else {
            requestAnimationFrame(blurBackground);
        }
    };

    const initCamera = async () => {
        const res = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (res) {
            videoRef.current.srcObject = res;
        }
    };

    const loadAndPredict = async () => {
        const res = await bodyPix.load({
            architecture: 'MobileNetV1',
            outputStride: 16,
            multiplier: 0.75,
            quantBytes: 2,
        });
        setNet(res);
    };

    useEffect(() => {
        // 开启摄像头
        initCamera();
        // 加载模型
        loadAndPredict();
    }, []);

    const onChange = val => {
        setActive(val);
    };

    const changeBlur = e => {
        const val = e.target.value;
        setBlurVal(val);
        blurLevel.current = val;
        if (val > 0) {
            blurBackground();
        }
    };

    return (
        <section>
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
            <div className="video-area">
                <div className="control">
                    <span>背景虚化</span>
                    <Radio.Group onChange={changeBlur} value={blurVal}>
                        <Radio value={0}>关</Radio>
                        <Radio value={3}>弱</Radio>
                        <Radio value={10}>中</Radio>
                        <Radio value={20}>强</Radio>
                    </Radio.Group>
                </div>
                <div className="transflow">
                    <video ref={videoRef} autoPlay width="640" height="480"></video>
                    <canvas ref={canvasRef}></canvas>
                </div>
            </div>
        </section>
    );
}

export default Tabs;
