import React, {Component} from 'react'
import {Link, withRouter} from "react-router-dom"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableHead from "@material-ui/core/TableHead"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import Button from "@material-ui/core/Button"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import VisibilityIcon from "@material-ui/icons/Visibility"
import DeleteIcon from "@material-ui/icons/Delete"
import Box from "@material-ui/core/Box"
import axios from "axios"

class Tasks extends Component{
    constructor(props){
        super(props)
        this.state = {
            tasks : [],
            deleteMessage : ''
        }
    }

    componentWillMount(){
        axios.get('http://localhost:3001/tasks')
        .then(response => {
            this.setState({
                tasks: response.data.tasks
            })
        })
        
    }

    handleDelete(event, id, index){
        axios.delete(`http://localhost:3001/tasks/delete/${id}`)
        .then(response => {
            let tasks = [...this.state.tasks];
            tasks.splice(index, 1);
            this.setState({
                tasks: tasks,
                deleteMessage: response.data.message
            })
            
        })
    }

    render(){
        if (this.state.tasks.length === 0) {
            return(<h1>Loading...</h1>)
        } 

        const styles = {
            maindiv: {
                width: '90%',
                left: 0,
                right: 0,
                marginLeft: 'auto',
                marginRight: 'auto'
            },
            link: {
                textDecoration: 'none'
            }
        }

        return(
            <div style={styles.maindiv}>
                <Box style={{float:'left'}}>
                    <h1>Tasks</h1>
                    <Link to="/create" style={styles.link}>
                        <Button variant="contained" color="primary">
                            <AddCircleIcon/>
                            Add
                        </Button>
                    </Link>
                </Box>
                
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>View</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.tasks.map((task,index) => (
                            <TableRow key={task.id}>
                                <TableCell>{task.id}</TableCell>
                                <TableCell>{task.title}</TableCell>
                                <TableCell>{task.status}</TableCell>
                                <TableCell>
                                    <Link to={'/task/'+task.id} style={styles.link}>
                                        <Button variant="contained" color="primary">
                                            <VisibilityIcon/>
                                            View
                                        </Button>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Button id={task.id} variant="contained" color="secondary" onClick={((e) => this.handleDelete(e, task.id, index))}>
                                        <DeleteIcon/>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default withRouter(Tasks)