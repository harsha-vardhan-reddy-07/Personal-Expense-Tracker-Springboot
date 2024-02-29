import React, { createContext, useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const GeneralContext = createContext();

const GeneralContextProvider = ({children}) => {


  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');


    const [userData, setUserData] = useState();
    const [transactions, setTransactions] = useState([]);


    useEffect(()=>{
        if(localStorage.getItem("userId") && localStorage.getItem("userId") != null && localStorage.getItem("userId") != ''){
            fetchUserData();
            fetchTransactionData();
        }

    },[])


    const fetchUserData = async() =>{
        console.log(localStorage.getItem("userId"))
        await axios.get(`http://localhost:6001/fetch-user/${localStorage.getItem("userId")}`).then(
            (res) => {
                setUserData(res.data);
                console.log(localStorage.getItem("userId"))
                console.log(res.data);
            }
        )
    }

    const fetchTransactionData = async() =>{
        await axios.get(`http://localhost:6001/fetch-transactions`).then(
            (res) => {
                setTransactions(res.data);
                console.log(res.data);
            }
        )
    }
 
  
  
  
  const login = async () =>{
    try{
      const loginInputs = {email, password}
        await axios.post('http://localhost:6001/login', loginInputs)
        .then( async (res)=>{

            localStorage.setItem('userId', res.data._id);
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('email', res.data.email);
            localStorage.setItem('income', res.data.income);
            localStorage.setItem('expense', res.data.expense);
            localStorage.setItem('minIncome', res.data.minIncome);
            localStorage.setItem('maxIncome', res.data.maxIncome);
            localStorage.setItem('minExpense', res.data.minExpense);
            localStorage.setItem('maxExpense', res.data.maxExpense);

            
            navigate('/home');

          }).catch((err) =>{
            alert("login failed!!");
            console.log(err);
          });
          
        }catch(err){
          console.log(err);
        }
      }
      
  const inputs = {username, email, password};

  const register = async () =>{
    try{
        await axios.post('http://localhost:6001/register', inputs)
        .then( async (res)=>{
            localStorage.setItem('userId', res.data._id);
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('email', res.data.email);
            localStorage.setItem('income', res.data.income);
            localStorage.setItem('expense', res.data.expense);
            localStorage.setItem('minIncome', res.data.minIncome);
            localStorage.setItem('maxIncome', res.data.maxIncome);
            localStorage.setItem('minExpense', res.data.minExpense);
            localStorage.setItem('maxExpense', res.data.maxExpense);

              navigate('/home');
 
        }).catch((err) =>{
            alert("registration failed!!");
            console.log(err);
        });
    }catch(err){
        console.log(err);
    }
  }


  const logout = async () =>{
    
    localStorage.clear();
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        localStorage.removeItem(key);
      }
    }
    
    navigate('/');
  }


  return (
    <GeneralContext.Provider value={{login, register, logout, username, setUsername, email, setEmail, password, setPassword, userData, transactions, fetchUserData, fetchTransactionData}} >{children}</GeneralContext.Provider>
  )
}

export default GeneralContextProvider