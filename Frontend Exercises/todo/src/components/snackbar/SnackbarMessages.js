import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from '@material-ui/core';
import PropTypes from 'prop-types';

const SnackbarMessages = (props) => (
    <Snackbar open={props.snackbarState.open} autoHideDuration={5000}
              onClose={() => props.toggleSnackbar(false, 'success', '')}
    >
        <MuiAlert onClose={() => props.toggleSnackbar(false, 'success', '')} severity={props.snackbarState.type}>
            {props.snackbarState.message}
        </MuiAlert>
    </Snackbar>
);

export default SnackbarMessages;

SnackbarMessages.propTypes = {
    snackbarState: PropTypes.object.isRequired,
    toggleSnackbar: PropTypes.func.isRequired,
};
