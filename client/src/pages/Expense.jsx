import React, {useContext, useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import '../styles/Expense.css'
import { FaMoneyBillWave } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import { RiMessage3Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import {GeneralContext} from "../context/GeneralContext";
import axios from "axios";

const Expense = () => {

    const {userData, transactions, fetchUserData, fetchTransactionData} = useContext(GeneralContext)

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0)
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const [expenseTransactions, setExpenseTransactions] = useState([])

    useEffect(() => {
        if (transactions.length>0){
            let trans = transactions.filter((tran)=> tran.userId === localStorage.getItem("userId") && tran.type === "expense")
            setExpenseTransactions(trans)
        }
    }, [transactions]);

    const addExpense = async() =>{
        await axios.post("http://localhost:6001/add-expense",{userId: localStorage.getItem("userId"), title, amount, date, description, type: "expense", category}).then(
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
      <Navbar page={"expense"} />

      <div className="expense_page general_page">

        <h3>expenses</h3>
        <div className="expenses_top_box">
          <p>Total expense: <span style={{color: 'rgb(243, 34, 72)'}}>&#8377; {userData.expense}</span></p>
        </div>

        <div className="expense_body">

            <div className="add_expense_container">
                <input type="text" placeholder='Title' value={title} onChange={(e)=> setTitle(e.target.value)} />
                <input type="text" placeholder='Amount'  value={amount} onChange={(e)=> setAmount(e.target.value)} />
                <input type='date' placeholder='Date'  value={date} onChange={(e)=> setDate(e.target.value)} />
                <select  value={category} onChange={(e)=> setCategory(e.target.value)} >
                    <option value="">Choose category</option>
                    <option value="Rent">Rent</option>
                    <option value="Food">Food</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Salary">Other</option>
                </select>
                <textarea placeholder='Description'  value={description} onChange={(e)=> setDescription(e.target.value)} />
                <button onClick={addExpense} ><IoMdAdd /> Add Expense</button>
            </div>

            {expenseTransactions.length > 0 ?


            <div className="expense_transactions">

                {expenseTransactions.map((transaction)=>(
                        <div className="expense_transaction" key={transaction._id}>
                            <div className='expense_transaction_body'>
                                <FaMoneyBillWave className='expense_transaction_icon' />
                                <div className="expense_transaction_data">
                                    <h4>{transaction.title}</h4>
                                    <span>
                                        <p>&#8377; {transaction.amount}</p>
                                        <p><BsCalendarDate /> {transaction.date}</p>
                                        <p><RiMessage3Fill /> {transaction.description}</p>
                                    </span>

                                </div>
                            </div>
                            <MdDelete className='expense_transaction_delete' onClick={()=> deleteTransaction(transaction._id)} />
                        </div>
                    ))
                }

            </div>
            :"No transactions"}
        </div>
      </div>
    </div>
    :"Data loading"}
    </>
  )
}

export default Expense;