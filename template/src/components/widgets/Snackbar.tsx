import React from 'react';
import { connect } from "react-redux";
import MessageActions from "../../redux/messageRedux";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import MUISnackbar from "@material-ui/core/Snackbar";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';

type Props = {
    snackbar : boolean,
    snackbarMessage : string,
    snackbarColor: "success" | "warning" | "error" | "info" | "default",
    closeSnackbar : () => void,
}

// Snackbar should appear above tabBar (on mobile).
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    snackbar: {
      [theme.breakpoints.down(768)]: {
        bottom: 65,
      },
    },
  }),
);

function Snackbar(props : Props) {
    const classes = useStyles();

    if (props.snackbarColor === "default") {
        return (
            <MUISnackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                className={classes.snackbar}
                open={props.snackbar}
                autoHideDuration={5000}
                onClose={() => props.closeSnackbar()}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{props.snackbarMessage}</span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        onClick={() => props.closeSnackbar()}
                    >
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        )
    } else {
        return (
            <MUISnackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                className={classes.snackbar}
                open={props.snackbar}
                autoHideDuration={5000}
                onClose={() => props.closeSnackbar()}

            >
                <MuiAlert elevation={6} variant="filled" onClose={() => props.closeSnackbar()} severity={props.snackbarColor}>{props.snackbarMessage}</MuiAlert>
            </MUISnackbar>
        )
    }
}

const mapStateToProps = ( state : any ) => {
    return {
        snackbar: state.message.snackbar,
        snackbarMessage: state.message.snackbarMessage,
        snackbarColor: state.message.snackbarColor,
    }
}

const mapDispatchToProps = ( dispatch : any ) => {
    return {
        closeSnackbar: () => dispatch(MessageActions.closeSnackbar()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Snackbar);