import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import axios from "axios";	
import { useNavigate } from "react-router-dom";

const Main = () => {
	const navigate = useNavigate();
	const [profile, setProfile] = useState({});
	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/")
	};
		
	const url = "http://localhost:8000/api/users/getProfile";
	const getProfile = async () => {
		try {
		  const { data: res }  = await axios.get(url , { 
			  headers:{
				  Authorization : 'Bearer ' + localStorage.getItem("token") 
			  }
		  })
		  setProfile(res.data);
		//   console.log(res)
		} catch {}
	  };

	useEffect(() => {
        getProfile();
      },[]);

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>User Profile</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<div className={styles.mainBox}>
				<h3 className={styles.largeFont}>First Name: <span className={styles.smallFont}>{profile.firstName}</span> </h3>
				<h3 className={styles.largeFont}>Last Name: <span className={styles.smallFont}>{profile.lastName}</span></h3>
				<h3 className={styles.largeFont}>Email Address: <span className={styles.smallFont}>{profile.email}</span></h3>
				<h3 className={styles.largeFont}>Contact Details: <span className={styles.smallFont}>{profile.mobile_no}</span></h3>
			</div>
		</div>
	);
};

export default Main;
