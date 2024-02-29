import React, {useContext} from 'react'
import Navbar from '../components/Navbar'
import { FaMoneyBillWave } from 'react-icons/fa6'
import { BsCalendarDate } from 'react-icons/bs'
import { RiMessage3Fill } from 'react-icons/ri'
import { FaRegNoteSticky } from "react-icons/fa6";
import '../styles/Transactions.css'
import {GeneralContext} from "../context/GeneralContext";

const Transactions = () => {

  const {userData, transactions} = useContext(GeneralContext)

  return (

      <>
      {userData && transactions?


    <div className='page' >
      <Navbar page={"transaction"} />

      <div className="transaction_page general_page">

            <h3>Transactions</h3>
            <div className="transaction_page_head">
              <p>Total Income: <span style={{color:'rgb(26, 221, 114)'}}  >&#8377; {userData.income}</span></p>
              <p>Total Expense: <span style={{color:'rgb(221, 26, 68)'}} >&#8377; {userData.expense}</span></p>
              <p>Balance: <span style={{color:'rgb(229, 185, 115)'}}>&#8377; {userData.balance}</span></p>
            </div>

        {transactions.filter((trans)=> trans.userId === localStorage.getItem("userId")).length > 0 ?


            <div className="transactions">
              {transactions.filter((trans)=> trans.userId === localStorage.getItem("userId")).map((transaction)=>(

                  <div className="transaction" key={transaction._id}>
                    <div className='transaction_body'>
                      {transaction.type === 'income'?
                          <FaMoneyBillWave className='transaction_icon_green ' />
                      :
                          <FaMoneyBillWave className='transaction_icon_red' />
                      }

                      <div className="transaction_data">
                        <h4>{transaction.title}</h4>
                        <span>
                        <p>&#8377; {transaction.amount}</p>
                        <p><BsCalendarDate /> {transaction.date}</p>
                        <p><FaRegNoteSticky /> {transaction.category}</p>
                        <p><RiMessage3Fill /> {transaction.description}</p>
                      </span>

                      </div>
                    </div>
                  </div>
              ))}


            </div>
        :"No transactions"}
      </div>
    </div>
    :"Data loading"}
    </>
  )
}

export default Transactions