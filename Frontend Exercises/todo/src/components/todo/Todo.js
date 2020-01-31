import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {withStyles} from '@material-ui/core/styles';


import classes from './Todo.module.css';


const StyledCheckbox = withStyles({
    root: {
        color: 'tomato',
        '&$checked': {
            color: 'tomato',
        },
    },
    checked: {},
})(Checkbox);

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