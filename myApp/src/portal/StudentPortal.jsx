import React, { useContext, useEffect } from "react";
import { authContext } from "../provider/AuthUser";
import Navbar from '../header/Navbar'
import { useNavigate, Form } from "react-router-dom";
import { userContext } from "../provider/UserIDContext";
import style from './portal.module.css'
import { useState } from "react";
import axios from 'axios'
import Modal from "../modal/Modal";

export default function StudentPortal() {

    const navigate = useNavigate()
    const [authUser] = useContext(authContext)
    const { student: studentAuth } = authUser
    const [userID] = useContext(userContext)
    const { stuRollNo } = userID
    const [fileError, setFileError] = useState(false)
    const [fileErrorMsg, setFileErrorMsg] = useState('')
    const [selectedFile, setSelectedFile] = useState('')
    const [onFocus, setOnFocus] = useState(false)
    const [formFilled, setFormFilled] = useState(false)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const [postSuccess, setPostSuccess] = useState(false)
    const [postError, setPostError] = useState(false)
    const [res, setRes] = useState(false)

    function onChangeFileHandler(event) {
        const tempFile = event.target.files[0]
        setSelectedFile(tempFile);
    }

    function onFocusHandler() {
        setOnFocus(true)
    }

    async function onSubmitHandler(event) {
        event.preventDefault();

        const stuName = (firstName + " " + lastName)
        const stuEmail = email
        const fileObj = selectedFile

        console.log('Posting Student Record ...');

        const formData = new FormData();
        formData.append("stuRollNo", stuRollNo);
        formData.append("stuName", stuName);
        formData.append("stuEmail", stuEmail);
        formData.append("myFile", fileObj);

        axios
            .post("/sendStudentRecord", formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((response) => {
                const responseMessage = response.data.message
                setPostSuccess(true)
                setRes(responseMessage)
            })
            .catch((error) => {
                const responseError = error.response.data.error
                console.log(responseError)
                setPostError(true);
                setRes(responseError)
            });
    }

    useEffect(() => {
        if (!studentAuth) {
            console.log('Back to Home')
            navigate('/')
        } else {
            if ((firstName) && (lastName) && (email) && (selectedFile.type === 'application/pdf')) {
                setFileError(false)
                setFormFilled(true)
                setFileErrorMsg('Looks Good')
            } else if (selectedFile.type !== 'application/pdf') {
                setFileError(true)
                setFormFilled(false)
                setFileErrorMsg('PDF format only')
            } else if (selectedFile.type === 'application/pdf') {
                setFileError(false)
                setFormFilled(false)
            }
        }
    }, [studentAuth, navigate, selectedFile, firstName, lastName, email])

    function onClickModalErrorHandle() {
        setPostError(false);
    }

    function onClickModalSuccessHandle() {
        setPostError(false);
        navigate('/')
    }

    return (
        <React.Fragment>
            {postError && <Modal onCallParent={onClickModalErrorHandle} icon="fa-solid fa-circle-exclamation fa-sm" header="Error" message={res} />}
            {postSuccess && <Modal onCallParent={onClickModalSuccessHandle} icon="fa-solid fa-circle-check fa-sm" header="Form Submitted" message={res} />}
            {
                studentAuth &&
                <main>
                    <Navbar back={true} close={true} refresh={false} icon="fa-solid fa-user" header="Student Portal" />
                    <section className={style.portal_section}>
                        <Form className={`${style.stuPortal_form}`} style={{ height: '60vh' }} onSubmit={onSubmitHandler}>
                            <h1 className="display-6"> <i className="fa-solid fa-file-signature"></i> Enter Your Details</h1>
                            <div className="input-group">
                                <span className="input-group-text">First and last name</span>
                                <input onChange={(event) => { setFirstName(event.target.value) }} type="text" aria-label="First name" className="form-control" value={firstName} />
                                <input onChange={(event) => { setLastName(event.target.value) }} type="text" aria-label="Last name" className="form-control" value={lastName} />
                            </div>
                            <div className="input-group g-0">
                                <span className="input-group-text ">Enter Email</span>
                                <input onChange={(event) => { setEmail(event.target.value) }} type="email" aria-label="Email" className="form-control" value={email} />
                                <span className="input-group-text ">Enter RollNumber</span>
                                <input type="number" aria-label="RollNumber" className="form-control" value={stuRollNo} readOnly />
                            </div>
                            <div className="input-group">
                                <input onFocus={onFocusHandler} onChange={onChangeFileHandler} name="post_upload" type="file" className="form-control" id="inputGroupFile02" />
                                {
                                    onFocus && fileError && <div className="alert alert-info p-0 px-3 py-1 m-0" role="alert"> <i className="fa-solid fa-circle-exclamation fa-lg"></i>&nbsp; {fileErrorMsg} </div>
                                }
                            </div>

                            {
                                formFilled && !fileError &&
                                <div className={style.alert_submit}>
                                    <div className="alert alert-success p-2 ps-4 pe-4 m-0" role="alert"> <i className="fa-solid fa-thumbs-up"></i>&nbsp; {fileErrorMsg} </div>
                                    <button type="submit" className={`btn btn-info ${style.submit_btn}`} >Submit form</button>
                                </div>
                            }
                        </Form>
                    </section>
                </main>
            }
        </React.Fragment>
    )
}