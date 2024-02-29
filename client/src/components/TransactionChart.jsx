import React, {Component, useContext, useEffect, useState} from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import {GeneralContext} from "../context/GeneralContext";
//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


const TransactionChart = () => {

    const {transactions} = useContext(GeneralContext);

    const [incomeTransactions, setIncomeTransactions] = useState([])

    const [expenseTransactions, setExpenseTransactions] = useState([])

    useEffect(() => {
        if (transactions.length>0){
            let trans1 = transactions.filter((tran)=> tran.userId === localStorage.getItem("userId") && tran.type === "income")
            let trans2 = transactions.filter((tran)=> tran.userId === localStorage.getItem("userId") && tran.type === "expense")

            trans1.map((tran)=>{
                let a = {y: tran.amount, label: tran.date}
                setIncomeTransactions((incomeTransactions)=> [...incomeTransactions, a]);
            })

            trans2.map((tran)=>{
                let b = {y: tran.amount, label: tran.date}
                setExpenseTransactions((expenseTransactions)=> [...expenseTransactions, b]);
            })



        }
    }, [transactions]);


    const options = {
        animationEnabled: true,	

        axisY : {
            title: "Amount in INR "
        },
        toolTip: {
            shared: true
        },
        data: [{
            type: "spline",
            name: "income",
            showInLegend: true,
            dataPoints: incomeTransactions
        },
        {
            type: "spline",
            name: "expense",
            showInLegend: true,
            dataPoints: expenseTransactions
        }]
    }
    
    
    return (
        <div  className='transaction_chart' >
            <CanvasJSChart options = {options} />
        </div>
      );
}

export default TransactionChart