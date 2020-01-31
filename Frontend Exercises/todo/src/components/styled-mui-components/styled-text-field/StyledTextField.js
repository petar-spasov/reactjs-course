import {withStyles} from "@material-ui/core/styles";
import {TextField} from "@material-ui/core";

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

export default StyledTextField;