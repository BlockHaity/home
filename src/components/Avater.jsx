import "./Avater.css"
import img from "../assets/logo.jpg"

function Avatar() {
    return(
        <div className="avatar">
            <img src={img} alt="logo" className="logo" />
        </div>
    )
}

export default Avatar