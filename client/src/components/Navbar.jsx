import React, { useContext } from 'react'
import '../styles/Navbar.css'
import { GiExpense } from "react-icons/gi";
import { FaChartLine } from "react-icons/fa6";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import profile from '../images/profile.png'
import { MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import { GeneralContext } from '../context/GeneralContext';

const Navbar = ({page}) => {

  const navigate = useNavigate()

  const {logout} = useContext(GeneralContext)

  return (
    <div className='nav_container'>

      <div className="nav_top">
          <div className="navbar_profile">
            <img src={profile} alt="" />
            <span>
              <h3>{localStorage.getItem('username')}</h3>
              <p>SB Expenzee</p>
            </span>
          </div>

          <div className="navbar_options">
            <span className={page === 'home' ? 'active' : ''} onClick={()=> navigate('/home')} >
              <FaChartLine className='nav_icon' /> 
              <p>Home</p>
            </span>
            <span  className={page === 'income' ? 'active' : ''} onClick={()=> navigate('/income')} >
              <FaMoneyBill1Wave className='nav_icon' /> 
              <p >Incomes</p>
            </span>
            <span  className={page === 'expense' ? 'active' : ''} onClick={()=> navigate('/expense')} >
              <GiExpense className='nav_icon' /> 
              <p>Expenses</p>
            </span>
            <span  className={page === 'transaction' ? 'active' : ''} onClick={()=> navigate('/transactions')} >
              <FaMoneyBillTrendUp className='nav_icon' /> 
              <p>Transactions</p>
            </span>
          </div>

      </div>

      <div className="nav_bottom">
        <MdLogout />
        <p onClick={()=> logout()} >Logout</p>
      </div>


    </div>
  )
}

export default Navbar