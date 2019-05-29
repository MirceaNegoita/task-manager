import React, {Component} from 'react'
import {withRouter} from "react-router-dom"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import axios from "axios"

class Task extends Component{
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description : '',
            status : '',
            selectItems : []
        }
        this.handleSelectChange = this.handleSelectChange.bind(this)
    }

    getId(){
        const url = window.location.pathname
        const id = url.substring(url.lastIndexOf('/') + 1)

        return id
    }

    loadTask(){
        const id = this.getId()
        axios.get(`http://localhost:3001/tasks/get/${id}`)
        .then(response => {
            let items = ["Backlog", "InProgress", "Done"]
            items.map((item, index) => {
                if (response.data.task.status === item) {
                    items.splice(index, 1)
                    this.setState({
                        title : response.data.task.title,
                        description : response.data.task.description,
                        status : response.data.task.status,
                        selectItems: items
                    })
                }
            })
            
        })
    }

    componentWillMount(){
        this.loadTask()
    }

    handleSelectChange(event){
        const id = this.getId()
        console.log(id)
        axios.put(`http://localhost:3001/tasks/update/${id}`, {
            status : event.target.value
        })
        .then(response => {
            this.setState({
                status: event.target.value
            })
        })
    }

    render(){
        if (!this.state.title) {
            return (<h1>Loading...</h1>)
        }
        
        return(
            <div>
                <h1>{this.state.title}</h1>
                <p>{this.state.description}</p>
                <FormControl>
                    <InputLabel htmlFor="status">Status</InputLabel>
                    <Select
                        value={this.state.status}
                        onChange={this.handleSelectChange}
                        name="status"
                    >
                        <MenuItem
                            key={this.state.status}  
                            value={this.state.status}
                        >
                            {this.state.status}
                        </MenuItem>
                        {this.state.selectItems.map(item => (
                            <MenuItem 
                                key={item}
                                value={item}
                            >
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        )
    }
}

export default withRouter(Task)