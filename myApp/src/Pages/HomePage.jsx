import React, {useContext} from "react"
import Avatar from "../avatar/Avatar"
import NavBar from "../header/Navbar"
import Login from "../login/Login"
import { loginContext } from "../provider/LoginContext"
import style from './HomePage.module.css'


export default function HomePage() {
    const [checkLogin] = useContext(loginContext)
    
    return (
        <React.Fragment>
            <NavBar back={false} close={false} refresh={true} header="College Portal" icon="fa-solid fa-building-columns" />
            <main className={style.homePage_main}>
                {
                    !checkLogin.student &&
                    <Avatar avatar="fa-solid fa-graduation-cap" avatarName='Student' />
                }
                {
                    checkLogin.student &&
                    <Login avatar="fa-solid fa-user" avatarName='Student Login' tip="RollNumber range 100-500" />
                }
                <div className={style.homePage_seperator}></div>
                {
                    !checkLogin.staff &&
                    <Avatar avatar="fa-solid fa-chalkboard-user" avatarName='Staff' />
                }
                {
                    checkLogin.staff &&
                    <Login avatar="fa-solid fa-user-tie" avatarName='Staff Login' tip="Staff-ID range 501-600" />
                }
            </main>
        </React.Fragment>
    )
}