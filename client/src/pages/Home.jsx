import React, {useContext, useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import '../styles/Home.css'
import TransactionChart from '../components/TransactionChart'
import axios from 'axios'
import {GeneralContext} from "../context/GeneralContext";

const Home = () => {

  const {userData} = useContext(GeneralContext)

  return (

    <>

    {userData ?
          <div className='page' >
            <Navbar page={"home"} />

            <div className="home_page general_page">
                <div className="home_part1">

                  <div className="transaction_chart_container">
                    <h3>Transactions</h3>
                    <TransactionChart />
                  </div>

                </div>
                <div className="home_part2">

                  <div className="home_balance_container">
                    <span>
                      <p>Income</p>
                      <h3>&#8377; {userData.income}</h3>
                    </span>

                    <span>
                      <p>Expense</p>
                      <h3>&#8377; {userData.expense}</h3>
                    </span>

                    <span>
                      <p>Balance</p>
                      <h3>&#8377; {userData.balance}</h3>
                    </span>
                  </div>

                  <div className="recent_transactions_body">
                    <h4>Recent Transactions</h4>
                    <div className="recent_transactions">
                        <div className="recent_transaction red">
                          <p>Rent payment</p>
                          <p>&#8377; 20000</p>
                        </div>
                        <div className="recent_transaction green">
                          <p>Salary credit</p>
                          <p>&#8377; 20000</p>
                        </div>
                        <div className="recent_transaction red">
                          <p>Food payment</p>
                          <p>&#8377; 20000</p>
                        </div>
                    </div>
                  </div>


                  <div className="home_range_body">
                      <span>
                        <p>Min</p>
                        <h4>Income</h4>
                        <p>Max</p>
                      </span>
                      <div>
                        <p>&#8377; {userData.minIncome}</p>
                        <p>&#8377; {userData.maxIncome}</p>
                      </div>
                  </div>
                  <div className="home_range_body">
                      <span>
                        <p>Min</p>
                        <h4>Expense</h4>
                        <p>Max</p>
                      </span>
                      <div>
                        <p>&#8377; {userData.minExpense}</p>
                        <p>&#8377; {userData.maxExpense}</p>
                      </div>
                  </div>
                </div>
            </div>
          </div>
    
    :"data loading"}
    </>
  )
}

export default Home