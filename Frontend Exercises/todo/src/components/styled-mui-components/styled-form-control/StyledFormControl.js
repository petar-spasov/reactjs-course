import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";

const StyledFormControl = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'tomato',
        },

    },
})(FormControl);

export default StyledFormControl;
