import React, { useContext, useState, useRef, useEffect } from "react";
import styles from "./Hub.module.scss";
import classnames from "classnames";
import * as service from "../../contexts/service";

const setTimeoutPromise = timeout => new Promise(resolve => {        
  setTimeout(resolve, timeout);
});

const Hub = () => {
    const [init, setInit] = useState({
        base: '#fff',
    });

    useEffect(() => {
    }, [])

    return (
        <div style={{width: '100vw', height: '100vh', backgroundColor: '#fff'}}>
        </div>
    )
};

export default Hub;
