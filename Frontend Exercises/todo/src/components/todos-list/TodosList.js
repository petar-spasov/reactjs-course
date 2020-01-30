import React, {useEffect, useState} from "react";
import axios from 'axios';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Fab from '@material-ui/core/Fab';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withStyles} from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


import Todo from "../todo/Todo"

import classes from './TodoList.module.css';

const StyledTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'tomato',
        },
        //incase you want different color when not focused
        // '& input:valid + fieldset': {
        // borderColor: 'tomato',
        // borderWidth: 2,
        // },
        '& input:invalid + fieldset': {
            borderColor: 'red',
        },
        '& input:valid:focus + fieldset': {
            borderColor: 'tomato', // override inline-style
        },
        '& input:valid:hover + fieldset': {
            borderColor: '#ef9a9a'
        }
    },
})(TextField);


const StyledCheckbox = withStyles({
    root: {
        color: 'tomato',
        '&$checked': {
            color: 'tomato',
        },
    },
    checked: {},
})(Checkbox);

const TodosList = () => {

    const [allTodos, setTodos] = useState([]);
    const [showCompletedTodos, setShowCompleted] = useState(false);
    const [showIncompleteTodos, setShowIncomplete] = useState(true);
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        type: 'success',
        message: ''
    });
    const [dialogState, setDialogState] = useState({
        openDialog: false,
        todoTitle: '',
        todoDescription: '',
        todoCompleted: false
    });

    useEffect(() => {
        axios.get('http://jsonplaceholder.typicode.com/todos?_limit=10').then((response) => {
            setTodos(response.data);
        });
    }, []);

    let incompleteTodos = allTodos.filter(todo => !todo.completed);
    let completeTodos = allTodos.filter(todo => todo.completed);


    const saveTodo = () => {
        let newAllTodos = allTodos.slice();
        newAllTodos.splice(0, 0, {
            title: dialogState.todoTitle,
            description: dialogState.todoDescription,
            completed: dialogState.todoCompleted
        });
        //No http request, because it won't be saved
        setTodos(newAllTodos);
        toggleDialog(false);
    };

    const deleteTodo = (todo) => {
        axios.delete('http://jsonplaceholder.typicode.com/todos/' + todo.id).then((response) => {
            setTodos(allTodos.filter(todoState => todoState.id !== todo.id));
            toggleSnackbar(true, "success", "To-Do successfully deleted.");
        }).catch((error) => {
            toggleSnackbar(true, "error", error.message)
        })
    };

    const handleCompleted = (todo) => {
        setTodos(allTodos.map((todoState) => {
            if (todoState.id !== todo.id) {
                return todoState;
            } else {
                toggleSnackbar(true, "success", todo.title + " successfully completed.");
                return {
                    ...todoState,
                    completed: !todo.completed
                }
            }
        }))
    };

    const todoTitleInputHandler = () => event => {
        setDialogState({
            ...dialogState,
            todoTitle: event.target.value,
        });
    };

    const todoDescriptionInputHandler = () => event => {
        setDialogState({
            ...dialogState,
            todoDescription: event.target.value,
        });
    };

    const todoCompletedCheckboxHandler = () => {
        setDialogState(prevState => {
            return {
                ...dialogState,
                todoCompleted: !prevState.todoCompleted,
            }
        });
    };

    const toggleSnackbar = (open, type, message) => {
        setSnackbarState({
            open: open,
            type: type,
            message: message
        });
    };

    const toggleCompleted = () => {
        setShowCompleted(!showCompletedTodos);
    };

    const toggleIncomplete = () => {
        setShowIncomplete(!showIncompleteTodos);
    };

    const toggleDialog = (open) => {
        setDialogState({
            ...dialogState,
            openDialog: open
        });
    };

    const completedTasksView = (
        <div>
            <GridList className={classes.grid} cols={5} cellHeight={300} spacing={4}>
                {completeTodos.map((completedTodo) => {
                    let todoDesc = {description: 'Very complex description omg. This way to complicated call NASA', ...completedTodo};
                    return (
                        <GridListTile key={todoDesc.id}>
                            <Todo todo={todoDesc} handleCompleted={handleCompleted}
                                  deleteTodo={deleteTodo}/>
                        </GridListTile>
                    );
                })}
            </GridList>
        </div>
    );

    const incompletedTasksView = (
        <GridList className={classes.grid} cols={5} cellHeight={300} spacing={4}>
            {incompleteTodos.map((todo) => {
                let todoDesc = {description: 'Very complex description omg. This way to complicated call NASA', ...todo};
                return (
                    <GridListTile key={todoDesc.id}>
                        <Todo todo={todoDesc} handleCompleted={handleCompleted}
                              deleteTodo={deleteTodo}/>
                    </GridListTile>
                );
            })}
        </GridList>
    );

    return (
        <React.Fragment>
            <div className={classes.headerWrapper}>
                <h1 className={classes.todoList}>Todos</h1>
                <Button variant="contained" className={classes.addButton} onClick={() => toggleDialog(true)}>
                    Add To-Do
                </Button>
            </div>
            <div className={classes.gridWrapper}>
                <Fab variant="extended" color="primary" aria-label="add" className={classes.fabButton}
                     onClick={toggleIncomplete}>
                    <ArrowDownward/>
                    Show incomplete tasks
                </Fab>
                {showIncompleteTodos ? incompletedTasksView : null}
                <Fab variant="extended" color="primary" aria-label="add" className={classes.fabButton}
                     onClick={toggleCompleted}>
                    <ArrowDownward/>
                    Show completed tasks
                </Fab>
                {showCompletedTodos ? completedTasksView : null}
            </div>

            {/*Snackbar for messages to the user*/}
            <Snackbar open={snackbarState.open} autoHideDuration={6000}
                      onClose={() => toggleSnackbar(false, '', 'success')}>
                <MuiAlert onClose={() => toggleSnackbar(false, '', '')} severity={snackbarState.type}>
                    {snackbarState.message}
                </MuiAlert>
            </Snackbar>

            {/*Dialog for adding task*/}
            <Dialog open={dialogState.openDialog} onClose={() => toggleDialog(false)}
                    aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new To-Do</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create a new task by filling out the following fields.
                    </DialogContentText>
                    <StyledTextField label='Title' className={classes.addInput} onChange={todoTitleInputHandler()}
                                     variant='outlined'/>
                    <StyledTextField label='Short description' className={classes.addInput}
                                     onChange={todoDescriptionInputHandler()}
                                     variant='outlined'/>

                    <FormControlLabel
                        control={
                            <StyledCheckbox checked={dialogState.todoCompleted}
                                            onChange={todoCompletedCheckboxHandler}
                                            label='Completed'/>
                        }
                        label='Task completed'
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => toggleDialog(false)} color="primary" className={classes.textButton}>
                        Cancel
                    </Button>
                    <Button onClick={() => saveTodo()} color="primary" className={classes.textButton}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

        </React.Fragment>
    )
};

export default TodosList;