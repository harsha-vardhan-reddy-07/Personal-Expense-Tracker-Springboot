import React, {useContext, useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import '../styles/Income.css'
import { FaMoneyBillWave } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import { RiMessage3Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import {GeneralContext} from "../context/GeneralContext";
import axios from "axios";
import transactions from "./Transactions";

const Income = () => {

    const {userData, transactions, fetchUserData, fetchTransactionData} = useContext(GeneralContext)

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0)
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const [incomeTransactions, setIncomeTransactions] = useState([])

    useEffect(() => {
        if (transactions.length>0){
            let trans = transactions.filter((tran)=> tran.userId === localStorage.getItem("userId") && tran.type === "income")
            setIncomeTransactions(trans)
        }
    }, [transactions]);

    const addIncome = async() =>{
        await axios.post("http://localhost:6001/add-income",{userId: localStorage.getItem("userId"), title, amount, date, description, type: "income", category}).then(
            (res)=>{
                alert("Transaction added");
                setAmount(0)
                setTitle('')
                setDate('')
                setDescription('')
                setCategory('')
                fetchUserData();
                fetchTransactionData();
            }).catch((err)=>{
                alert("Transaction failed")
            })
    }

    const deleteTransaction = async(id)=>{
        await axios.get(`http://localhost:6001/delete-transaction/${id}`).then(
            (res)=>{
                alert("Transaction deleted");
                fetchUserData()
                fetchTransactionData()
            }
        ).catch((err)=>{
            alert("Operation failed!!")
        })
    }

  return (

    <>
    {userData && transactions ?


    <div className='page' >
      <Navbar page={"income"} />

      <div className="income_page general_page">

        <h3>Incomes</h3>
        <div className="incomes_top_box">
          <p>Total Income: <span style={{color: 'rgb(34, 243, 128)'}}>&#8377; {userData.income}</span></p>
        </div>

        <div className="income_body">

            <div className="add_income_container">
              <input type="text" placeholder='Title' value={title} onChange={(e)=> setTitle(e.target.value)} />
              <input type="text" placeholder='Amount'  value={amount} onChange={(e)=> setAmount(e.target.value)} />
              <input type='date' placeholder='Date'  value={date} onChange={(e)=> setDate(e.target.value)} />
              <select  value={category} onChange={(e)=> setCategory(e.target.value)} >
                <option value="">Choose category</option>
                <option value="Salary">Salary</option>
                <option value="Freelancing">Freelancing</option>
                <option value="FD Interest">FD Interest</option>
                <option value="Other">Other</option>
              </select>
              <textarea placeholder='Description'  value={description} onChange={(e)=> setDescription(e.target.value)} />
              <button onClick={addIncome} ><IoMdAdd /> Add Income</button>
            </div>

            {incomeTransactions.length > 0 ?

            <div className="income_transactions">


                {incomeTransactions.map((transaction)=>(
                    <div className="income_transaction" key={transaction._id} >
                        <div className='income_transaction_body'>
                            <FaMoneyBillWave className='income_transaction_icon' />
                            <div className="income_transaction_data">
                                <h4>{transaction.title}</h4>
                                <span>
                        <p>&#8377; {transaction.amount}</p>
                        <p><BsCalendarDate /> {transaction.date}</p>
                        <p><RiMessage3Fill /> {transaction.description}</p>
                      </span>

                            </div>
                        </div>
                        <MdDelete className='income_transaction_delete' onClick={()=>deleteTransaction(transaction._id)} />
                    </div>
                ))}


            </div>
           :"No transactions"}
        </div>
      </div>
    </div>

    :"Data loading"}
    </>
  )
}

export default Income