import React, { useEffect, useState } from "react";
import style from './Modal.module.css'

export default function Modal(props) {

    const [mainClicked, setMainCliked] = useState(false)

    function onClickHandler(){
        props.onCallParent()
    }

    function onMainCkickHandler(){
        setMainCliked(true)
    }

    useEffect(()=>{
        setMainCliked(false)
    },[mainClicked])

    return (
        <React.Fragment>
            <main className={style.modal_main} onClick={onMainCkickHandler}>
                <div className={mainClicked ? `${style.modal_box}` : `${style.modal_box} ${style.modal_main_clicked}`} >
                    <div className={style.modal_top}>
                        <h1 className="display-6"><i className={props.icon}></i> {props.header}</h1>
                        <button onClick={onClickHandler} type="button" className="btn btn-outline-danger">X</button>
                    </div>
                    <div className={style.modal_body}>{props.message}</div>
                </div>
            </main>
        </React.Fragment>
    )
}