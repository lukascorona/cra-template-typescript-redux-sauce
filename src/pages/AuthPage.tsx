import React from 'react'
import { connect } from 'react-redux'
import AuthActions from '../redux/authRedux'
import { 
    Grid,
    Paper,
    OutlinedInput,
    FormControl,
    InputAdornment,
    InputLabel,
    IconButton,
    FormGroup,
    FormControlLabel,
    FormHelperText,
    Checkbox,
    Divider,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Redirect, useHistory } from 'react-router-dom'
import LoadingButton from '../components/LoadingButton'
import logo from '../assets/logo.svg';
import { isValidMail, isValidPassword } from '../utils/functions';


export type AuthState = 'LOGIN' | 'SIGNUP'

type Props = {
    user: any,
    fetching: boolean,
    error: boolean,
    authState: AuthState,
    login: (mail: string, password: string) => void,
    signup: (mail: string, password: string) => void,
    resetPassword: (mail: string) => void,
}

interface State {
    mail: string,
    password: string;
    passwordConfirm: string;
    checked: boolean;
    showPassword: boolean;
    showPasswordConfirm: boolean;
    passwordForgot: boolean,
}

function AuthPage(props: Props) {
    const { user, authState, fetching } = props
    const history = useHistory()
    const historyState: any = history.location.state

    const [values, setValues] = React.useState<State>({
        mail: '',
        password: '',
        passwordConfirm: '',
        checked: false,
        showPassword: false,
        showPasswordConfirm: false,
        passwordForgot: false,
    });

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.checked });
    };

    const handleBooleanChange = (prop: keyof State) => () => {
        setValues({ ...values, [prop]: !values[prop] });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handlePasswordReset = () => {
        props.resetPassword(values.mail)
        setValues({...values, passwordForgot: false})
    }

    const handleAuthStateChange = () => {
        if (authState === 'LOGIN') {
            history.push('/signup')
        } else {
            history.push('/login')
        }
    }

    const isFormValid = () => {
        if (authState === 'LOGIN') {
            return isValidMail(values.mail) && isValidPassword(values.password)
        } else {
            return isValidMail(values.mail)
                && isValidPassword(values.password)
                && values.password === values.passwordConfirm
                && values.checked
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (authState === 'LOGIN') {
            props.login(values.mail, values.password)
        } else {
            props.signup(values.mail, values.password)
        }
    }

    if (user) {
        return (
            <Redirect
                to={historyState && historyState.from ? historyState.from : '/'}
            />
        )
    }

    function renderPasswordForgot() {
        return (
            <Dialog open={values.passwordForgot} onClose={handleBooleanChange("passwordForgot")} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Reset Password</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        If the email address you entered is stored in the system, you will receive a password reset email in a few minutes.
                        Please also check your spam folder.
                </DialogContentText>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="mail">Email address</InputLabel>
                        <OutlinedInput
                            id="mail"
                            type="email"
                            value={values.mail}
                            onChange={handleChange('mail')}
                            error={!isValidMail(values.mail)} 
                            aria-describedby="filled-weight-helper-text"
                            inputProps={{
                                'aria-label': 'weight',
                            }}
                            labelWidth={100}
                        />
                        {values.mail !== '' && !isValidMail(values.mail) && 
                            <FormHelperText error variant="outlined" >Please enter valid email address</FormHelperText>
                        }
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleBooleanChange("passwordForgot")} color="primary">
                        Cancel
                </Button>
                    <Button onClick={() => handlePasswordReset()} color="primary">
                        Reset
                </Button>
                </DialogActions>
            </Dialog>
        );
    }

    return (
        <Grid container alignItems="center" justify="center" style={{ flex: 1 }}>
            <Grid item lg={4} md={6}>
                <Paper elevation={3} style={{ padding: 16 }}>
                    <form id="auth" onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid container justify="center" style={{ marginBottom: 20, marginTop: 20 }}>
                            <img
                                src={logo}
                                style={{ height: 120 }}
                                alt="logo"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="mail">Email address</InputLabel>
                                <OutlinedInput
                                    id="mail"
                                    value={values.mail}
                                    onChange={handleChange('mail')}
                                    autoComplete="email"
                                    autoFocus
                                    error={values.mail !== '' && !isValidMail(values.mail)} 
                                    aria-describedby="filled-weight-helper-text"
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                    labelWidth={100}
                                />
                                {values.mail !== '' && !isValidMail(values.mail) && 
                                    <FormHelperText error variant="outlined" >Please enter valid email address</FormHelperText>
                                }
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined" className="textField">
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <OutlinedInput
                                    id="password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    autoComplete={authState === 'LOGIN' ? 'current-password' : 'new-password'}
                                    onChange={handleChange('password')}
                                    error={values.password !== '' && !isValidPassword(values.password)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleBooleanChange("showPassword")}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    labelWidth={70}
                                />
                                {values.password !== '' && !isValidPassword(values.password) && 
                                    <FormHelperText error variant="outlined" >Password must contain between 8 and 64 characters</FormHelperText>
                                }
                            </FormControl>
                        </Grid>
                        {authState === 'SIGNUP' &&
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined" className="textField">
                                    <InputLabel htmlFor="passwordConfirm">Password Confirm</InputLabel>
                                    <OutlinedInput
                                        id="passwordConfirm"
                                        type={values.showPasswordConfirm ? 'text' : 'password'}
                                        value={values.passwordConfirm}
                                        autoComplete="new-password"
                                        onChange={handleChange('passwordConfirm')}
                                        error={values.passwordConfirm !== '' && values.passwordConfirm !== values.password}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleBooleanChange("showPasswordConfirm")}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {values.showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        labelWidth={132}
                                    />
                                    { values.passwordConfirm !== '' && values.passwordConfirm !== values.password &&
                                        <FormHelperText error variant="outlined" >The passwords do not match</FormHelperText>
                                    }
                                </FormControl>
                            </Grid>
                        }
                        {authState === 'SIGNUP' &&
                            <Grid item xs={12}>
                                <FormGroup row>
                                    <FormControlLabel
                                        control={<Checkbox checked={values.checked} onChange={handleCheckBoxChange} name="checked" color="primary" />}
                                        label="I have read and agree to the end user license agreement."
                                    />
                                </FormGroup>
                            </Grid>
                        }
                        {authState === 'LOGIN' &&
                            <Grid item xs={12}>
                                <Button variant="outlined" color="primary" onClick={() => setValues({ ...values, passwordForgot: true })}>Forgot Password</Button>
                            </Grid>
                        }
                    </Grid>
                    {renderPasswordForgot()}
                    <Divider style={{ marginTop: 16, marginBottom: 8 }} />
                    <Grid container justify="center">
                        <Grid item xs={12}>
                            <LoadingButton
                                type="submit"
                                size="large"
                                fetching={fetching}
                                disabled={!isFormValid()}
                                text={ authState === 'LOGIN' ? "Login" : "Signup"}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: "center", marginTop: 8 }}>
                            or
                        </Grid>
                        <Button variant="text" onClick={handleAuthStateChange} color="primary">
                            {authState === 'LOGIN' ? "Signup" : "Login"}
                        </Button>
                    </Grid>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state: any) => {
    return {
        fetching: state.auth.fetching,
        error: state.auth.error,
        user: state.auth.user,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        login: (mail: string, password: string) => dispatch(AuthActions.login(mail, password)),
        signup: (mail: string, password: string) => dispatch(AuthActions.signup(mail, password)),
        resetPassword: (mail: string) => dispatch(AuthActions.resetPassword(mail)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
