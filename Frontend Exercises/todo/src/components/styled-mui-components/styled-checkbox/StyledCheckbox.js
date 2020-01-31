import {withStyles} from "@material-ui/core/styles";
import {Checkbox} from "@material-ui/core";

const StyledCheckbox = withStyles({
    root: {
        color: 'tomato',
        '&$checked': {
            color: 'tomato',
        },
    },
    checked: {},
})(Checkbox);

export default StyledCheckbox;