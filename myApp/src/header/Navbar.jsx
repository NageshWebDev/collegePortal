import { useNavigate } from 'react-router-dom'
import style from './Navbar.module.css'

export default function NavBar(props) {

    const navigate = useNavigate()

    return (
        <ul className={`nav ${style.navbar_ul}`}>
            {
                props.back &&
                <li style={{visibility: 'hidden'}} className="nav-item">
                    <button onClick={()=>{navigate(-1)}} type="button" className={`btn btn-light ${style.navbar_btn_back}`}> <i className="fa-solid fa-arrow-left"></i> Back</button>
                </li>
            }
            {
                props.refresh &&
                <li className="nav-item">
                    <a href='/' className={`btn btn-light ${style.navbar_btn_back}`}> <i className="fa-solid fa-rotate-right"></i> Refresh</a>
                </li>
            }
            <li className="nav-item">
                <h1 className={`${style.navbar_tagline}`}><i className={props.icon}></i> &nbsp; {props.header} </h1>
            </li>
            {
                props.close &&
                <li className="nav-item">
                    <a href='/' type="button" className={`btn btn-danger ${style.navbar_btn_close}`}> <i className="fa-solid fa-xmark"></i> Close</a>
                </li>
            }
            {
                props.refresh &&
                <li style={{visibility: 'hidden'}} className="nav-item">
                    <a href='/' className={`btn btn-light ${style.navbar_btn_back}`}> <i className="fa-solid fa-rotate-right"></i> Refresh</a>
                </li>
            }
        </ul>
    )
}