import React, { Component } from 'react';
import AppNav from './AppNav';
import DatePicker from 'react-datepicker';
import Moment from 'react-moment';
import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import { Table, Container, FormGroup,Input, Form, Button, Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import { PieChart } from 'react-minimal-pie-chart';
import 'bootstrap/dist/css/bootstrap.min.css';

class Expenses extends Component {
    emptyItem = { 
        id:0,
        expensedate: new Date(),
        description: '',
        location:'',
        amount: 0,
        category:{id:1, name:'Travel'}
    }

    constructor(props){
        super(props);

        this.state = { 
            date: new Date(),
            isLoading: false,
            expenses: [],
            categories:[],
            item: this.emptyItem,
            currOption: 1
         }
         this.handleSubmit = this.handleSubmit.bind(this);
         this.handleChange = this.handleChange.bind(this);
         this.handleDateChange = this.handleDateChange.bind(this);
         this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }


    async handleSubmit(event){
    
        const item = this.state.item;
        await fetch(`/api/expenses`,{
            method: 'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        
        event.preventDefault();
        this.props.history.push("/expenses");
    }


    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
        
    }

    handleCategoryChange(event){
        const target = event.target;
        const value = target.value;
        let item = this.state.item
        let cat = this.state.categories
        item["category"]["id"] = value;
        item["category"]["name"] = cat[value-1].name;
        this.setState({item});
    }

    handleDateChange(date){
        let item={...this.state.item};
        item.expensedate = date;
        this.setState({item});
    }



    async remove(id){
        await fetch(`/api/expenses/${id}`,{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application.json'
            }
        }).then(() => {
            let updatedExpenses = [...this.state.expenses].filter( i => i.id !== id);
            this.setState({expenses: updatedExpenses});
        });
    }

    async componentDidMount(){
        const response = await fetch('/api/categories');
        const body = await response.json();
        this.setState({categories : body, isLoading:false});

        const responseExp = await fetch('/api/expenses');
        const bodyExp = await responseExp.json();
        this.setState({expenses : bodyExp, isLoading:false});
    }

    
    render() { 
        const title=<h3 align="center"> Add Expense</h3>
        const {categories} = this.state;
        const {expenses, isLoading} = this.state;

        if (isLoading)
            return(<div>Loading...</div>)

        let optionList = 
                categories.map((category)=>
                       <option value={category.id} key={category.id}>
                           {category.name}
                       </option> 
                )
        let rows = 
                expenses.map(expense =>
                    <tr key={expense.id}>
                        <td>{expense.description}</td>
                        <td>{expense.amount}</td>
                        <td>{expense.location}</td>
                        <td><Moment date={expense.expensedate} format="YYYY/MM/DD"/></td>
                        <td>{expense.category.name}</td>
        
                        <td><Button size = "sm" color="danger" onClick={()=> this.remove(expense.id)}>Delete</Button> </td>


                    </tr>)
        
        let normal  = {}

        let arr = []
          
        for (var i = 0; i < expenses.length; i++) {
            console.log("hi")
            var cat = expenses[i]["category"]["name"];
            var curr = expenses[i]["amount"];
            
            normal[cat] = ((normal[cat]|| 0) + curr);

            arr.push(((normal[cat]|| 0) + curr));
            
        }


        let vals = Object.values(normal)
        let keys = Object.keys(normal)

        let ifEmpty;
        if (vals.length > 0) {
            ifEmpty = <h3></h3>
        } else {
            ifEmpty = <p align="center">**Please add some Expenses to view the summary chart**</p>
        }
        return ( 
            <div>
                <AppNav/>
                <div class="toppane">
                    <h2 style={{display:'flex', justifyContent:'center', alignItems:'center', height:'10vh'}}>

                Welcome to the Expense Tracker Application!

                </h2></div>
                <div class="leftpane" >
                <Container >
                    {title}
                    <div border={'2px solid #000000'}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="description">Title</Label>
                            <Input type="description" name="description" id="description" onChange={this.handleChange} autoComplete="name"/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="amount">Amount</Label>
                            <Input type="amount" name="amount" id="amount" onChange={this.handleChange} autoComplete="name"/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="category">Category</Label>
                            <select onChange={this.handleCategoryChange}>
                                {optionList}
                            </select>
                            <span>   </span>  
                            <Label for="city">Date</Label>
                            <DatePicker selected={this.state.item.expensedate} onChange={this.handleDateChange}></DatePicker>
                        
                        </FormGroup>

                        <FormGroup>
                           
                        </FormGroup>

                        <div className="row">
                            <FormGroup className="col-md-4 mb-3">
                                <Label for="location">Location</Label>
                                <Input type="text" name="location" id="location" onChange={this.handleChange}/>
                            </FormGroup>

                        </div>


                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>{' '}
                            <Button color = "secondary" tag={Link} to="/">Cancel</Button>
                        </FormGroup>  
                    </Form>
                    </div>
                    {" "}
                    {" "}
                    <h3 align="center"> Expense List</h3>
                    <Table className = "mt-4">
                        <thead>
                            <tr>
                                <th width="30%">Description</th>
                                <th width="20%">Amount</th>
                                <th width="20%">Location</th>
                                <th width="20%">Date</th>
                                <th width="20%">Category</th>
                                <th width="20%">Action</th>

                            </tr>

                        </thead>
                        <tbody>
                            {rows}
                        </tbody>

                    </Table>
                </Container>
                </div>
                <div class="rightpane">
                <Container>

                <h3 align="center"> Expenses By Category: </h3>
                    {ifEmpty}
                    <PieChart radius={30} labels={"labels"}
                        animation
                        animationDuration={500}
                        animationEasing="ease-out"
                        center={[50, 35]}
                        labelPosition={50}
                        lengthAngle={360}
                        lineWidth={15}
                        paddingAngle={0}
                        radius={25}
                        rounded
                        startAngle={0}
                        viewBoxSize={[100, 100]}
                        data={[
                            { title: (keys[0] || "Others")+": $ "+String((vals[0] || 0)), value: (vals[0] || 0), color: '#EDF958' },
                            { title: (keys[1] || "Others")+": $ "+String((vals[1] || 0)), value: (vals[1] || 0), color: '#38F1D4' },
                            { title: (keys[2] || "Others")+": $ "+String((vals[2] || 0)), value: (vals[2] || 0), color: '#58ACF9' },
                            { title: (keys[3] || "Others")+": $ "+String((vals[3] || 0)), value: (vals[3] || 0), color: '#E52EC6' },
                        ]} 
                        />;
                </Container>
                </div>
            </div>
            );
    }
}
 
export default Expenses;