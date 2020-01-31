import {withStyles} from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";

const StyledOutlinedInput = withStyles({
    root: {
        '& $notchedOutline': {
            // borderColor: 'tomato'
        },
        '&:hover $notchedOutline': {
            borderColor: '#ef9a9a'
        },
        '&$focused $notchedOutline': {
            borderColor: 'tomato'
        },
    },
    focused: {},
    notchedOutline: {}
})(OutlinedInput);

export default StyledOutlinedInput;