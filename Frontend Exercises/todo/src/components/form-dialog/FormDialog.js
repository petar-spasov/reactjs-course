import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import classes from "./FormDialog.module.css";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

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