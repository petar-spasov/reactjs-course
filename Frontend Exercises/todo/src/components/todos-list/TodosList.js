import React, { useEffect, useState } from "react";
import axios from 'axios';

import {
    GridList, GridListTile, Button, Fab,
} from '@material-ui/core';

import ArrowDownward from '@material-ui/icons/ArrowDownward';

import classes from './TodoList.module.css';
import nextId from "react-id-generator";

import Todo from "../todo/Todo";
import FormDialog from "../form-dialog/FormDialog";
import SnackbarMessages from '../snackbar/SnackbarMessages';

const TodosList = () => {

    // ---------------------States--------------------- //
    const initialDialogState = {
        editingTodo: false,
        editingTodoId: null,
        openDialog: false,
        todoTitle: '',
        todoDescription: '',
        todoCompleted: false,
    };
    const [allTodos, setTodos] = useState([]);
    const [showCompletedTodos, setShowCompleted] = useState(false);
    const [showIncompleteTodos, setShowIncomplete] = useState(true);
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        type: 'success',
        message: '',
    });
    const [dialogState, setDialogState] = useState({ ...initialDialogState });
    // ---------------------States-End--------------------- //

    useEffect(() => {
        axios.get('http://jsonplaceholder.typicode.com/todos?_limit=10').then((response) => {
            setTodos(response.data);
        });
    }, []);

    const incompleteTodos = allTodos.filter(todo => !todo.completed);
    const completeTodos = allTodos.filter(todo => todo.completed);

    // Method creates a new to-do with the values of the inputs which were saved in the dialog-state
    const saveTodo = () => {
        const newAllTodos = allTodos.slice();
        newAllTodos.splice(0, 0, {
            id: nextId(),
            title: dialogState.todoTitle,
            description: dialogState.todoDescription,
            completed: dialogState.todoCompleted,
        });
        // No http request, because JSON Placeholder doesn't save it anyways
        setTodos(newAllTodos);
        // Close the dialog
        toggleAddDialog(false);
        // Show success
        toggleSnackbar(true, 'success', 'To-Do added successfully');
    };

    const updateTodo = () => {
        const todoToUpdate = allTodos.filter(todo => todo.id === dialogState.editingTodoId);
        todoToUpdate[0].id = dialogState.editingTodoId;
        todoToUpdate[0].title = dialogState.todoTitle;
        todoToUpdate[0].description = dialogState.todoDescription;
        todoToUpdate[0].completed = dialogState.todoCompleted;
        setTodos(allTodos.map((todo) => {
            if (todo.id !== todoToUpdate.id) {
                return todo;
            }
            return { ...todoToUpdate };
        }));
        toggleEditDialog(false, null);
        toggleSnackbar(true, 'success', 'To-Do updated successfully');
    };

    const deleteTodo = (todo) => {
        axios.delete(`http://jsonplaceholder.typicode.com/todos/${todo.id}`).then(() => {
            setTodos(allTodos.filter(todoState => todoState.id !== todo.id));
            toggleSnackbar(true, "success", "To-Do successfully deleted.");
        }).catch((error) => {
            toggleSnackbar(true, "error", error.message);
        });
    };

    const handleCompleted = (todo) => {
        setTodos(allTodos.map((todoState) => {
            if (todoState.id !== todo.id) {
                return todoState;
            }
            toggleSnackbar(true, "success", `${todo.title} successfully completed.`);
            return {
                ...todoState,
                completed: !todo.completed,
            };
        }));
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
        setDialogState(prevState => (
            {
                ...dialogState,
                todoCompleted: !prevState.todoCompleted,
            }
        ));
    };

    const toggleSnackbar = (open, type, message) => {
        setSnackbarState({
            open,
            type,
            message,
        });
    };

    const toggleCompleted = () => {
        setShowCompleted(!showCompletedTodos);
    };

    const toggleIncomplete = () => {
        setShowIncomplete(!showIncompleteTodos);
    };

    const toggleAddDialog = (open) => {
        if (!open) {
            setDialogState({ ...initialDialogState });
        } else {
            setDialogState({
                ...dialogState,
                openDialog: open,
            });
        }
    };

    const toggleEditDialog = (open, todo) => {
        if (!open) {
            setDialogState({ ...initialDialogState });
        } else {
            setDialogState({
                editingTodo: true,
                editingTodoId: todo.id,
                openDialog: open,
                todoTitle: todo.title,
                todoDescription: todo.description,
                todoCompleted: todo.completed,
            });
        }
    };

    const completedTasksView = (
        <div>
            <GridList className={classes.grid} cols={5} cellHeight={300} spacing={4}>
                {completeTodos.map((completedTodo) => {
                    const todoDesc = {
                        description: 'Very complex description omg. This way to complicated call NASA',
                        ...completedTodo,
                    };
                    return (
                        <GridListTile key={todoDesc.id}>
                            <Todo todo={todoDesc} handleCompleted={handleCompleted}
                                  deleteTodo={deleteTodo} editTodo={toggleEditDialog}
                            />
                        </GridListTile>
                    );
                })}
            </GridList>
        </div>
    );

    const incompletedTasksView = (
        <GridList className={classes.grid} cols={5} cellHeight={300} spacing={4}>
            {incompleteTodos.map((todo) => {
                const todoDesc = {
                    description: 'Very complex description omg. This way to complicated call NASA',
                    ...todo,
                };
                return (
                    <GridListTile key={todoDesc.id}>
                        <Todo todo={todoDesc} handleCompleted={handleCompleted}
                              deleteTodo={deleteTodo} editTodo={toggleEditDialog}
                        />
                    </GridListTile>
                );
            })}
        </GridList>
    );

    return (
        <>
            <div className={classes.headerWrapper}>
                <h1 className={classes.todoList}>Todos</h1>
                <Button variant="contained" className={classes.addButton} onClick={() => toggleAddDialog(true)}>
                    Add To-Do
                </Button>
            </div>
            <div className={classes.gridWrapper}>
                <Fab variant="extended" color="primary" aria-label="add" className={classes.fabButton}
                     onClick={toggleIncomplete}
                >
                    <ArrowDownward/>
                    Show incomplete tasks
                </Fab>
                {showIncompleteTodos ? incompletedTasksView : null}
                <Fab variant="extended" color="primary" aria-label="add" className={classes.fabButton}
                     onClick={toggleCompleted}
                >
                    <ArrowDownward/>
                    Show completed tasks
                </Fab>
                {showCompletedTodos ? completedTasksView : null}
            </div>

            {/* Snackbar for messages to the user */}
            <SnackbarMessages snackbarState={snackbarState} toggleSnackbar={toggleSnackbar}/>

            { /* Dialog for adding task */}
            <FormDialog dialogState={dialogState} toggleAddDialog={toggleAddDialog}
                        todoTitleInputHandler={todoTitleInputHandler}
                        todoDescriptionInputHandler={todoDescriptionInputHandler}
                        todoCompletedCheckboxHandler={todoCompletedCheckboxHandler}
                        persistTodo={dialogState.editingTodo ? updateTodo : saveTodo}
            />

        </>
    );
};

export default TodosList;
