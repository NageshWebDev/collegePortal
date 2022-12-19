import { useContext, useState } from 'react'
import { loginContext } from '../provider/LoginContext'
import style from './Avatar.module.css'

export default function Avatar(props) {

    const [, setLogin] = useContext(loginContext)
    const [isMouseEnter, setIsMouseEnter] = useState(false)
    const [isMouseLeave, setIsMouseLeave] = useState(true)

    function onMouseEnterHandler() {
        setIsMouseEnter(true)
        setIsMouseLeave(false)
    }

    function onMouseLeaveHandler() {
        setIsMouseEnter(false)
        setIsMouseLeave(true)
    }

    function onClickHandler() {
        // console.log(checkLogin)
        if (props.avatarName === 'Student') {
            setLogin((preVal) => { return { ...preVal, student: true, staff: false } })
        }else if(props.avatarName === 'Staff'){
            setLogin((preVal) => { return { ...preVal, student: false, staff: true } })
        }
    }

    return (
        <div
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
            className={`card ${style.avatar_card}`}
            style={{ width: "18rem" }}
        >
            <i className={(isMouseEnter && !isMouseLeave) ? `${props.avatar} ${style.avatar_hovered}` : `${props.avatar} ${style.avatar_ava}`}></i>
            <button onClick={onClickHandler} type="button" className={`btn btn-primary ${style.avatar_btn}`}>{props.avatarName}</button>
        </div>
    )
}