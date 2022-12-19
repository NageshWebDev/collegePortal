import React, { useContext, useEffect } from "react";
import { authContext } from "../provider/AuthUser";
import Navbar from '../header/Navbar'
import { useNavigate, useLoaderData, Outlet, Link } from "react-router-dom";
import { userContext } from "../provider/UserIDContext";
import getStaffName from "../api/GetStaffName";
import style from './portal.module.css'
import { useState } from "react";

export default function StudentPortal() {

    const navigate = useNavigate()
    const loaderData = useLoaderData()
    const [authUser] = useContext(authContext)
    const { staff: staffAuth } = authUser
    const [userID] = useContext(userContext)
    const { staID } = userID
    const [linkClicked, setLinkClicked] = useState(false)
    const [displayMsg, setDisplayMsg] = useState('Display Student Record')


    console.log('Staff Portal')

    function onLinkHandler() {
        if (linkClicked === false) {
            setLinkClicked(true)
            setDisplayMsg("Displaying Student Record")
        }
        else if (linkClicked === true) {
            setLinkClicked(false)
            setDisplayMsg("Display Student Record")
        }

    }

    useEffect(() => {
        if (!staffAuth) {
            console.log('Back to Home')
            navigate('/')
        }
    }, [staffAuth, navigate, loaderData])

    return (
        <React.Fragment>
            {
                staffAuth &&
                <main >
                    <Navbar back={true} close={true} refresh={false} icon="fa-solid fa-user-tie" header="Staff Portal" />
                    <section className={`mt-5 ${style.portal_section}`}>

                        <div className={`card p-3 ${style.staffPortal_div}`} style={{ maxWidth: '600px' }}>
                            <div className="row g-0">
                                <div className="col-md-5">
                                    <img src={loaderData.avatar} className="img-fluid rounded-start" alt="avatar" />
                                </div>
                                <div className="col-md-7" style={{ borderLeft: '3px solid lightslategray', backgroundColor: 'ghostWhite' }}>
                                    <div className="card-body">
                                        <h4 className="card-title">{loaderData.first_name} {loaderData.last_name}</h4>
                                        <p className="card-title"><strong> Staff-ID :</strong> {staID} </p>
                                        <p className="card-text"><strong> Address :</strong> {loaderData.address.street_address},{loaderData.address.street_name},{loaderData.address.state},{loaderData.address.country}</p>
                                        <p className="card-text"><strong>Date Of Birth :</strong> {loaderData.date_of_birth}</p>
                                        <p className="card-text"><small className="text-muted">{loaderData.email}</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <a  classname="btn btn-outline-secondary">Secondary</a> */}

                        <nav className="navbar navbar-dark m-5 " style={{ width: '600px', backgroundColor: "rgba(0,0,0,0.5)", borderRadius: "0.25rem" }}>
                            <div className="container-fluid">
                                <h1 className="navbar-brand">{displayMsg}</h1>
                                {
                                    !linkClicked && <Link onClick={onLinkHandler} to={'studentRecord'} type="button" className="btn btn-info" style={{ color: "white", fontWeight: "bold" }} >Show Record</Link>
                                }
                                {
                                    linkClicked && <Link onClick={onLinkHandler} to={''} type="button" className="btn btn-warning" style={{ color: "black", fontWeight: "bold" }} >Hide Record</Link>
                                }
                            </div>
                        </nav>
                        <Outlet />
                    </section>
                </main>
            }
        </React.Fragment>
    )
}

export async function loader() {
    console.log('loader is called')
    const fetchedData = await getStaffName();
    return fetchedData
}