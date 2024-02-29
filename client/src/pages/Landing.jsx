import React from 'react'
import '../styles/Landing.css'
import { useNavigate } from 'react-router-dom'

const Landing = () => {


  const navigate = useNavigate();


  if (localStorage.getItem("userId") && localStorage.getItem("userId") !== null && localStorage.getItem("userId") !== ""){
      navigate("/home")
  }

  return (
    <div className='landing_page'>
      <div className="landing_hero">
        <h1>Uncover Your Spending Secrets. Be a Money Master!</h1>
        <p>Ditch the spreadsheets and messy receipts. Our app makes tracking expenses fun and rewarding. Discover where you can save and unlock a healthier financial future.</p>
        <button onClick={()=> navigate('/authenticate')} >Join now</button>
      </div>
    </div>
  )
}

export default Landing