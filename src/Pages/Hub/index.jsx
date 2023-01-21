import React, { useContext, useState, useRef, useEffect } from "react";
import styles from "./Hub.module.scss";
import classnames from "classnames";
import { getState, updateState } from "../../contexts/service";

const setTimeoutPromise = timeout => new Promise(resolve => {        
  setTimeout(resolve, timeout);
});

const Board = (props) => {
    return(
        <div style={{width: '100%', height: '100%', justifyContent: 'center', marginTop: 100, position: 'relative', zIndex: 2}}>
            <div style={{justifyContent: 'center', marginTop: 32 * 3 + 5, position: 'relative', zIndex: 2}}>
                {props.board.map((item, index) => (
                    <div style={{flexDirection: 'column', display: 'block'}}>
                        {item.map((item, index) => (
                            <div className={classnames(styles.tile)} style={{width: 32, height: 32, border: 'solid 1px white'}}>
                                {item.state === '' ?
                                    <div style={{height: 20, width: 20, backgroundColor: 'green'}}/>
                                    : 
                                    null
                                }
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div 
                style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, zIndex: 1}}
            >
                <img style={{width: 405, height: 405,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',}} 
                    src='https://cdn.discordapp.com/attachments/1023793616575012946/1066338496714907740/image.png' >
                </img>
            </div>
            <div style={{position: 'absolute', justifyContent: 'center', marginTop: 32 * 3 + 5, zIndex: -1}}>
                {props.board.map((item, index) => (
                    <div style={{flexDirection: 'column', display: 'block'}}>
                        {item.map((item, index) => (
                            <div className={classnames(styles.tile_background)} style={{backgroundImage: 'url(https://cdn.discordapp.com/attachments/1023793616575012946/1066347303209812079/image.png)',width: 32, height: 32, backgroundColor: 'red', border: 'solid 1px white'}}>
                           
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>

    )
}

const Hub = () => {
    const [state, setState] = useState({
        load: true,
        board: [],
        cards: [{description: 'Hire a burglar'},{description: 'Buy a cat'},{description: 'Hire a burglar'},{description: 'Buy a cat'}],
    });

    useEffect(() => {
        getStateFunction();
        generateBoard();
    }, [false])

    const generateBoard = async => {
        var board = [];
        for(let i = 0; i< 12; i++) {
            var row = [];
            for(let i = 0; i< 12; i++) {
                var tile = {state: Math.random() < 0.5 ? 'idle' : 'plant'};
                row.push(tile);
            }
            board.push(row);
            row = [];
        }
        setState({...state, board: board});
    }

    const getStateFunction = async() => {
        const state = await getState();
    }

    const MAINWIDTH = 50;
    const SIDEWIDTH = (100 - MAINWIDTH)/2;
    return (
        <div style={{width: '100vw', height: '100vh', backgroundColor: '#fff'}}>
            <div className={classnames(styles.splitScreen )}style={{flexDirection: 'column'}}>
                <div style={{width: 'auto', height: '50%', backgroundColor: 'red', flexDirection: 'row'}}>
                    <div style={{width: SIDEWIDTH + '%', height: 'auto', backgroundColor: 'tan'}}>
                    </div>
                    <div style={{width: MAINWIDTH + '%', height: 'auto', backgroundColor: 'aquamarine'}}>

                        <div style={{position: 'relative', justifyContent: 'center'}}>
                            <Board board={state.board}/>
                        </div>

                    </div>
                    <div style={{width: SIDEWIDTH + '%', height: 'auto', backgroundColor: 'gray'}}>
                    </div>
                </div>
                <div style={{width: '100vw', height: '50%', backgroundColor: 'green', flexDirection: 'row', justifyContent: 'center'}}>
                

                    {state.cards.map((item, index) => (

                        <div 
                            onClick={() => console.log(item.description)}
                            className={classnames(styles.card)} 
                            style={{margin: 20, width: 120, height: 200, backgroundColor: 'tan'}}
                        >
                            
                        </div>
                    ))}


                </div>
            </div>
        </div>
    )
};

export default Hub;
