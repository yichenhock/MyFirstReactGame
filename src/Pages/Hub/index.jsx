import React, { useContext, useState, useRef, useEffect } from "react";
import styles from "./Hub.module.scss";
import classnames from "classnames";
import { getState, updateState } from "../../contexts/service";

import deck from "../../assets/deck.png";
import house from "../../assets/house.png";
import otherhouse from "../../assets/otherhouse.png";
import grass from "../../assets/grass.png";
import bench from "../../assets/objects/bench.png";

import brokenfloor from "../../assets/objects/brokenfloor.png";
import chair from "../../assets/objects/chair.png";
import dirt1 from "../../assets/objects/dirt-1.png";
import dirt2 from "../../assets/objects/dirt-2.png";
import dirt3 from "../../assets/objects/dirt-3.png";
import dogbowl from "../../assets/objects/dogbowl.png";
import duck from "../../assets/objects/duck.png";
import flowers from "../../assets/objects/flowers.png";
import hottub from "../../assets/objects/hottub.png";
import plant from "../../assets/objects/plant.png";
import pond from "../../assets/objects/pond.png";
import stool from "../../assets/objects/stool.png";
import table from "../../assets/objects/table.png";
import treehouse from "../../assets/objects/treehouse.png";

import chaircard from "../../assets/cards/objectcards/chair-card.png";
import duckcard from "../../assets/cards/objectcards/duck-card.png";
import flowerscard from "../../assets/cards/objectcards/flower-card.png";
import stoolcard from "../../assets/cards/objectcards/stool-card.png";
import stealcard from "../../assets/cards/actioncards/steal-card.png";
import dogcard from "../../assets/cards/actioncards/dog-card.png";

const setTimeoutPromise = timeout => new Promise(resolve => {        
  setTimeout(resolve, timeout);
});
const _BLACK_ = '#3b1735';
const _CARDS_ = [
{id: 0, type: 'action', description: 'Hire a burglar', string: 'A burglar will steal one of your opponent\'s objects', card: 'stealcard'},
{id: 1, type: 'action', description: 'Hire a dog', string: 'A dog will put mud on your opponent\'s deck', card: 'dogcard'},
{id: 3, type: 'object', description: 'chair', string: 'Place a chair', card: 'chaircard'},
{id: 4, type: 'object', description: 'duck', string: 'Place a duck', card: 'duckcard'},
{id: 5, type: 'object', description: 'flowers', string: 'Place a flowers', card: 'flowerscard'},
{id: 6, type: 'object', description: 'stool', string: 'Place a stool', card: 'stoolcard'},
]

const Board = (props) => {
    const _HOUSE_ = props.small ? 240 : 464;
    const _BOARD_ = props.small ? 240 : 464;
    const _SIZE_ = props.small ? 16 : 32;

    return(
        <div style={{width: '100%', height: '100%', justifyContent: 'center', position: 'relative', zIndex: 3, marginTop: _SIZE_}}>
            <div style={{justifyContent: 'center', /*marginTop: _SIZE_ * 1 + 2,*/ position: 'relative', zIndex: 3}}>
                {props.board.map((item, index) => (
                    <div style={{flexDirection: 'column', display: 'block'}}>
                        {item.map((item, index) => (
                            <div onClick={() => props.small ? null : props.placeObject(item.id)} className={classnames(props.small ? styles.tile_no_hover : styles.tile)} style={{width: _SIZE_, height: _SIZE_, border: props.small ? 'solid 1px transparent' : 'solid 1px rgba(255,255,255,0.4)'}}>
                                {item.state === 'chair' ?
                                    <div 
                                        className={classnames(styles.tile_background)} 
                                        style={{backgroundSize: 'cover',backgroundImage: `url(${chair})`, width: _SIZE_, height: _SIZE_ }}>
                                    </div>
                                    : item.state === 'duck' ?
                                    <div 
                                        className={classnames(styles.tile_background)} 
                                        style={{backgroundSize: 'cover',backgroundImage: `url(${duck})`, width: _SIZE_, height: _SIZE_ }}>
                                    </div>
                                    : item.state === 'flowers' ?
                                    <div 
                                        className={classnames(styles.tile_background)} 
                                        style={{backgroundSize: 'cover',backgroundImage: `url(${flowers})`, width: _SIZE_, height: _SIZE_ }}>
                                    </div>
                                    : item.state === 'stool' ?
                                    <div 
                                        className={classnames(styles.tile_background)} 
                                        style={{backgroundImage: `url(${stool})`, width: _SIZE_, height: _SIZE_ }}>
                                    </div>
                                    : item.state === 'chair' ?
                                    <div 
                                        className={classnames(styles.tile_background)} 
                                        style={{backgroundSize: 'cover',backgroundImage: `url(${chair})`, width: _SIZE_, height: _SIZE_ }}>
                                    </div>
                                    : 
                                    null
                                }
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div 
                style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, zIndex: 2}}
            >
                <img style={{width: _BOARD_, height: _BOARD_,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',}} 
                    src={props.blue ? otherhouse : house}
                    >
                </img>
            </div>
            <div 
                style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, zIndex: 1}}
            >
                <img style={{width: _BOARD_, height: _BOARD_,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',}} 
                    src={deck}
                    >
                </img>
            </div>
            <div style={{position: 'absolute', justifyContent: 'center', /*marginTop: _SIZE_ * 1 + 2,*/ zIndex: -1}}>
                {props.board.map((item, index) => (
                    <div style={{flexDirection: 'column', display: 'block'}}>
                        {item.map((item, index) => (
                            <div 
                                className={classnames(styles.tile_background)} 
                                style={{backgroundImage: `url(${deck})`, width: _SIZE_, height: _SIZE_ }}>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div 
                style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, zIndex: -2}}
            >
                <img style={{width: _BOARD_, height: _BOARD_,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',}} 
                    src={grass}
                    >
                </img>
            </div>
        </div>

    )
}

const Hub = () => {
    const [state, setState] = useState({
        turn: 1,
        p1board: [],
        p2board: [],
    });
    const [cards, setCards] = useState([
    ]);
    const [turn, setTurn] = useState(0);
    const [player, setPlayer] = useState(0);
    const [opponent, setOpponent] = useState(0);
    const [action, setAction] = useState(0);

    useEffect(() => {
        //getStateFunction();
        generateBoard();
        var res = window.prompt("Create or join?");
        if(res.toLowerCase() === 'create') {
            console.log("Player 1")
            setPlayer(1);
            setTurn(1);
            setOpponent(2);
        } else {
            console.log("Player 2")
            setPlayer(2);
            setOpponent(1)
            setTurn(2);
        }
    }, [])

    useEffect(() => {
        const intervalId = setInterval(() => {
            listener();
        }, 2000)
        return () => clearInterval(intervalId)
    }, [turn])

    const select = (item) => {
        console.log(item)
        setAction(item);
    }

    const removeCard = () => {
        var curr_cards = cards;
        for(let m = 0; m < curr_cards.length; m++) {
            if(curr_cards[m].id === action.id) {
                curr_cards.splice(m, 1);
            }
        }
        setCards(curr_cards);
    }


    const getRandomCard = () => {
        var rand = Math.floor(Math.random() * _CARDS_.length);
        var curr_cards = cards;
        curr_cards.push(_CARDS_[rand]);
        setCards(curr_cards);
        console.log(curr_cards)
    }

    const endTurn = () => {
        setTurn(opponent);
        updateState({...state, turn: opponent});
    }
 
    const listener = async () => { 
    //return; 
        if(turn === player) { 
            //your turn
            console.log("Waiting for you to finish turn")
            console.log(turn)
        } else {
            //opponent turn
            console.log("Awaiting opponent");
            console.log(turn)
            var res = await getStateFunction();
        }
    }

    const generateBoard = async() => {
        var board = [];
        var id = 0;
        for(let i = 0; i< 12; i++) {
            var row = [];
            for(let k = 0; k< 12; k++) {
                var tile = {state: 'idle', id: id};
                row.push(tile);
            id++;
            }
            board.push(row);
            row = [];
        }
        setState({...state, p1board: board, p2board: board});
    }

    const getStateFunction = async() => {
        const res = await getState();
        setTurn(res.game_state.turn)
        console.log(res.game_state)
            setState({...state, p1board: res.game_state.p1board, p2board: res.game_state.p2board})

        if(res.game_state.turn === player) {
            getRandomCard();
            setAction(0);
        }
    }

    const placeObject = (id) => {
        console.log(action)
        if(player === 1) {
            var board = state.p1board;
        } else {
            var board = state.p2board;
        }
        for(let i = 0; i< 12; i++) {
            for(let k = 0; k< 12; k++) {
                if(board[i][k].id === id) {
                    board[i][k].state = action.description
                }
            }
        }
        if(player === 1) {
        setState({...state, p1board: board});
        } else {
        setState({...state, p2board: board});
        }
        if(action !== 0) {
            removeCard();
        }
        setAction(0);
        console.log(state)
    }

    const MAINWIDTH = 50;
    const SIDEWIDTH = (100 - MAINWIDTH)/2;
    return (
        <div style={{width: '100vw', height: '100vh', backgroundColor: '#fff'}}>
            <div className={classnames(styles.splitScreen )}style={{flexDirection: 'column'}}>
                <div style={{width: 'auto', height: '60%', flexDirection: 'row'}}>
                    <div style={{width: SIDEWIDTH + '%', height: 'auto', backgroundColor: '#404040'}}>
                    
                        <div style={{flexDirection: 'column', position: 'fixed', top: 50, left: 40}}>
                            <div style={{}} 
                            >
                                <p>Current Action: </p>
                                <br/>
                                <p>{action.string ? action.string : ''}</p>
                            </div>

                            <div 
                                style={{cursor: 'pointer', backgroundColor: _BLACK_, paddingLeft: 25, width: '100%'}}
                                onClick={() => endTurn()}
                            >
                                <p style={{ color: 'white',margin: 6,alignSelf: 'center'}}>{turn == player ? 'End turn' : 'Waiting'}</p>
                            </div>
                        </div>

                    </div>
                    <div style={{width: MAINWIDTH + '%', height: 'auto', backgroundColor: '#404040'}}>

                        <div style={{position: 'relative', justifyContent: 'center', margin: '0 auto'}}>
                            <Board blue={player !== 1} placeObject={placeObject} board={player === 1 ? state.p1board : state.p2board}/>
                        </div>

                    </div>
                    <div style={{width: SIDEWIDTH + '%', height: 'auto', backgroundColor: '#404040'}}>
                            
                        <div style={{flexDirection: 'column', marginLeft: 10}}>
                                <p>Opponent's board </p>
                            

                        <div style={{position: 'relative', justifyContent: 'center', margin: '0 auto'}}>
                            <Board small blue={player === 1} board={player === 1 ? state.p2board : state.p1board}/>
                        </div>

                        </div>

                    </div>
                </div>
                <div style={{width: '100vw', height: '40%', backgroundColor: '#404040', flexDirection: 'row', justifyContent: 'center'}}>
                

                    {cards.map((item, index) => (
                        <img 
                            src={item.card}
                            onClick={() => select(item)}
                            className={classnames(styles.card)} 
                            style={{margin: 20, width: 110, height: 200}}
                        >
                            
                        </img>
                    ))}


                </div>
            </div>
        </div>
    )
};

export default Hub;
