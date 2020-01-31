import React from "react";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
        FormControlLabel, Button} from '@material-ui/core';

import classes from "./FormDialog.module.css";

import StyledCheckbox from "../styled-mui-components/styled-checkbox/StyledCheckbox";
import StyledTextField from "../styled-mui-components/styled-text-field/StyledTextField";

const FormDialog = (props) => {

    return(
        <Dialog open={props.dialogState.openDialog} onClose={() => props.toggleAddDialog(false)}
                aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add new To-Do</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Create a new task by filling out the following fields.
                </DialogContentText>
                <StyledTextField label='Title' className={classes.addInput} onChange={props.todoTitleInputHandler()}
                                 variant='outlined' value={props.dialogState.todoTitle}/>
                <StyledTextField label='Short description' className={classes.addInput}
                                 onChange={props.todoDescriptionInputHandler()}
                                 variant='outlined' value={props.dialogState.todoDescription}/>

                <FormControlLabel
                    control={
                        <StyledCheckbox checked={props.dialogState.todoCompleted}
                                        onChange={props.todoCompletedCheckboxHandler}
                                        label='Completed'/>
                    }
                    label='Task completed'
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.toggleAddDialog(false)} color="primary" className={classes.textButton}>
                    Cancel
                </Button>
                <Button onClick={() => props.persistTodo()} color="primary" className={classes.textButton}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default FormDialog;