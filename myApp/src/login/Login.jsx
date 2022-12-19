import React, { useContext, useEffect, useState } from 'react'
import style from './Login.module.css'
import { loginContext } from '../provider/LoginContext'
import { useNavigate } from 'react-router-dom';
import { authContext } from '../provider/AuthUser';
import { userContext } from '../provider/UserIDContext';

export default function Login(props) {

    const { avatarName } = props

    const navigate = useNavigate()

    const [, setUserAuth] = useContext(authContext)
    const [checkLogin] = useContext(loginContext)
    const [, setUserID] = useContext(userContext)

    const [isMouseEnter, setIsMouseEnter] = useState(false)
    const [isMouseLeave, setIsMouseLeave] = useState(true)
    const [inputFocus, setInputFocus] = useState(false)
    const [rightCredential, setRightCredential] = useState(null)
    const [checkPassword, setCheckPassword] = useState('')
    const [alertUser, setAlertUser] = useState('')

    function onMouseEnterHandler() {
        setIsMouseEnter(true)
        setIsMouseLeave(false)
    }

    function onMouseLeaveHandler() {
        setIsMouseEnter(false)
        setIsMouseLeave(true)
    }

    function onClickHandler() {
        if (avatarName === 'Student Login') {
            setUserID((preVal) => { return { ...preVal, stuRollNo: checkPassword, staID: null } })
            setUserAuth((preVal) => { return { ...preVal, student: true, staff: false } })
            navigate('/studentPortal')
        } else if (avatarName === 'Staff Login') {
            setUserID((preVal) => { return { ...preVal, stuRollNo: null, staID: checkPassword } })
            setUserAuth((preVal) => { return { ...preVal, student: false, staff: true } })
            navigate('/staffPortal')
        }
    }

    function onInputChangeHandler(event) {
        if (avatarName === 'Student Login') {
            const value = event.target.value;
            setCheckPassword(value)
        } else if (avatarName === 'Staff Login') {
            const value = event.target.value;
            setCheckPassword(value)
        }
    }

    function onInputFocusHandler() {
        setInputFocus(true);
    }

    useEffect(() => {
        if (avatarName === 'Student Login') {
            if (checkPassword === '') {
                setRightCredential(false)
                setAlertUser("Enter RollNo.")
            } else if (checkPassword < 100 || checkPassword > 500) {
                setRightCredential(false)
                setAlertUser("Incorrect RollNo.")
            } else {
                setRightCredential(true)
                setAlertUser("Correct RollNo.")
            }
        } else if (avatarName === 'Staff Login') {
            if (checkPassword === '') {
                setRightCredential(false)
                setAlertUser("Enter Staff-ID")
            } else if (checkPassword < 500 || checkPassword > 600) {
                setRightCredential(false)
                setAlertUser("Incorrect Staff-ID")
            } else {
                setRightCredential(true)
                setAlertUser("Correct Staff-ID")
            }
        }
    }, [checkPassword, avatarName, rightCredential])

    return (
        <React.Fragment>
            <div className={`card ${style.login_card}`}
                style={{ width: "18rem" }}
                onMouseEnter={onMouseEnterHandler}
                onMouseLeave={onMouseLeaveHandler}
            >
                <i className={(isMouseEnter && !isMouseLeave) ? `${props.avatar} ${style.login_hovered}` : `${props.avatar} ${style.login_ava}`}></i>
                {
                    checkLogin.student &&
                    <div className={style.login_div}>
                        <label>Enter RollNumber</label>
                        <input
                            onFocus={onInputFocusHandler}
                            onChange={onInputChangeHandler}
                            className={inputFocus ? rightCredential ? `${style.login_rightPassword}` : `${style.login_wrongPassword}` : ''}
                            // same as className={ inputFocus ? {rightCredential ? `${style.login_rightPassword}` : `${style.login_wrongPassword}`} : ''}
                            type="number"
                            max="500"
                            min="100"
                            required
                        />
                    </div>
                }
                {
                    checkLogin.staff &&
                    <div className={style.login_div}>
                        <label>Enter Satff-ID</label>
                        <input
                            onChange={onInputChangeHandler}
                            onFocus={onInputFocusHandler}
                            className={inputFocus ? rightCredential ? `${style.login_rightPassword}` : `${style.login_wrongPassword}` : ''}
                            type="number"
                            max="600"
                            min="501"
                        />
                    </div>
                }
                {
                    !rightCredential &&
                    <div className={style.login_tooltip} data-tooltip={props.tip}>
                        <i className={`fa-solid fa-circle-question ${style.login_que}`}></i>
                    </div>
                }
                <button
                    onClick={onClickHandler}
                    type="button"
                    className={rightCredential ? `btn ${style.login_btn}` : `btn`}
                    disabled={!rightCredential ? true : false}
                >
                    {props.avatarName}
                </button>
                {
                    inputFocus && !rightCredential &&
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg>
                        <div>
                            {alertUser}
                        </div>
                    </div>
                }
                {
                    inputFocus && rightCredential &&
                    <div className="alert alert-success d-flex align-items-center" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Success:">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                        <div>
                            {alertUser}
                        </div>
                    </div>
                }
            </div>
        </React.Fragment>
    )
}