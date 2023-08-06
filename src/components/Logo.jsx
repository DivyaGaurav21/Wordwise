import styles from "./Logo.module.css";

import logo from '../assets/logo.png'
import { Link } from "react-router-dom";

function Logo() {
  return <Link to='/'>
    <img src={logo} alt="World logo" className={styles.logo} />
  </Link>;
}

export default Logo;
