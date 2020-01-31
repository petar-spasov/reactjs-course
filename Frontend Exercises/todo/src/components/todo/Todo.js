import React from 'react';

import {
    Card, CardActionArea, CardActions, CardContent, CardMedia, Button,
    Typography, FormControlLabel
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import StyledCheckbox from "../styled-mui-components/styled-checkbox/StyledCheckbox";

import classes from './Todo.module.css';

const Todo = props => {


    return (
        <Card className={classes.todo} elevation={3}>
            <CardActionArea>
                <CardMedia
                    className={classes.image}
                    image={require('../../assets/images/todo.jpeg')}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" noWrap={true}>
                        {props.todo.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" noWrap={true}>
                        {props.todo.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
                <FormControlLabel className={classes.completed}
                                  control={
                                      <StyledCheckbox
                                          checked={props.todo.completed}
                                          onChange={() => props.handleCompleted(props.todo)}
                                      />
                                  }
                                  label={props.todo.completed ? 'Remove from completed' : 'Complete'}
                />
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.containedButton}
                    startIcon={<Edit/>}
                    onClick={() => props.editTodo(true, props.todo)}>
                    Edit
                </Button>
                <Button
                    variant="text"
                    color="secondary"
                    className={classes.textButton}
                    startIcon={<DeleteIcon/>}
                    onClick={() => props.deleteTodo(props.todo)}>
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
};

export default Todo;