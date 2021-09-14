import React from "react"
import "./style.css"


function Footer() {
    var date = new Date().getFullYear();

    return (
        <footer className="foot" >
            <br />
            <h4><p className="date">Copyrights @ TAHIR {date} </p></h4>
            <br/>
<a href = "mailto: tahirmama8@gmail.com" className="link"> <h4>FOR CONTACT CLICK HERE</h4></a>
            <br />
        </footer>
    )
}

export default Footer;