import React, {Component} from 'react'
import {withRouter} from "react-router-dom"
import TextField from "@material-ui/core/TextField"
import Divider from "@material-ui/core/Divider"
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import axios from "axios"

class CreateTask extends Component{
    constructor(props){
        super(props)
        this.state = {
            title: '',
            description: '',
            status : ''
        }
        this.handleTitleInputChange = this.handleTitleInputChange.bind(this)
        this.handleDescriptionInputChange = this.handleDescriptionInputChange.bind(this)
        this.handleStatusInputChange = this.handleStatusInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleTitleInputChange(event){
        this.setState({title: event.target.value})
    }
    handleDescriptionInputChange(event){
        this.setState({description: event.target.value})
    }
    handleStatusInputChange(event){
        this.setState({status: event.target.value})
    }
    handleSubmit(event){
        event.preventDefault()
        
        axios.post("http://localhost:3001/tasks/create", {
            title : this.state.title,
            description: this.state.description,
            status: this.state.status
        })
    }
    

    render(){
        const formStyles = {
            width: '95%',
            left: 0,
            right: 0,
            marginLeft: 'auto',
            marginRight: 'auto',
        }    
        return(
            <form onSubmit={this.handleSubmit} style={formStyles}>
                <h1>Create Task</h1>
                
                <TextField
                    id="title"
                    name="title"
                    label="Title"
                    placeholder="Task Title"
                    margin="normal"
                    fullWidth
                    onChange={this.handleTitleInputChange}
                />
                
                <TextField
                    id="description"
                    name="description"
                    label="Description"
                    placeholder="Task Description"
                    margin="normal"
                    multiline
                    rowsMax="5"
                    fullWidth
                    onChange={this.handleDescriptionInputChange}
                />
                
                
                <FormControl fullWidth>
                    <InputLabel htmlFor="status">Status</InputLabel>
                    <Select
                        value={this.state.status}
                        inputProps={{
                            name: 'status',
                            id: 'status',
                        }}
                        onChange={this.handleStatusInputChange}
                    >
                        <MenuItem value="Backlog">Backlog</MenuItem>
                        <MenuItem value="InProgress">In Progress</MenuItem>
                        <MenuItem value="Done">Done</MenuItem>
                    </Select>
                </FormControl>
                <br></br>
                <br></br>
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </form>
        )
    }
}

export default withRouter(CreateTask)