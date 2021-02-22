import React, { useEffect, useState } from 'react'
import Page from '../components/Layout/Page'
import { connect } from 'react-redux'
import AuthActions from '../redux/authRedux'
import { Paper, Grid, Divider, Button, Hidden } from '@material-ui/core'
import Input from '../components/Input'
import LoadingButton from '../components/LoadingButton'
import { isValidMail } from '../utils/functions'
import useMobileService from '../utils/mobileService'
import { Redirect } from 'react-router-dom'
import SaveIcon from '@material-ui/icons/Save';

type Props = { 
    user: any,
    fetching: boolean,
    logout: () => void,
    uploadUserChanges: (user: any) => void,
}


function ProfilePage (props : Props) {
    const [values, setValues] = useState(props.user)
    const isMobile = useMobileService()

    useEffect(() => setValues(props.user), [props.user])

    const isValid = () => {
        return isValidMail(values.mail) && values.name && values.surname 
    }

    if (!props.user) {
        return <Redirect to="/login" />
    }

    return (
        <Page
            className="landingPage"
            title={`${props.user.name} ${props.user.surname}`}
        >
            <Paper elevation={3} style={{marginTop: 8}}>
                    <Grid container style={{padding: 16}} spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Input
                                id="name"
                                label="Name"
                                labelWidth={50}
                                value={values.name}
                                onChange={(name) => setValues({...values, name})}
                                fullWidth
                                error={!values.name}
                                errorText="The name may not be empty"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input
                                id="surname"
                                label="Surname"
                                labelWidth={70}
                                value={values.surname}
                                onChange={(surname) => setValues({...values, surname})}
                                fullWidth
                                error={!values.surname}
                                errorText="The surname may not be empty"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input
                                id="email"
                                label="Email"
                                labelWidth={60}
                                value={values.mail}
                                onChange={(mail) => setValues({...values, mail})}
                                fullWidth
                                error={!isValidMail(values.mail || "")}
                                errorText="The email must have a valid format"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <LoadingButton
                                type="button"
                                onClick={() => props.uploadUserChanges(values)}
                                fetching={props.fetching}
                                disabled={!isValid()}
                                text="Save"
                                fullWidth={isMobile}
                                startIcon={<SaveIcon />}
                            />
                        </Grid>
                        <Grid item xs={12}><Divider /></Grid>
                        <Grid item xs={12}>
                            <Hidden smDown>
                                   Are you you not {props.user.name} {props.user.surname}? <Button variant="text" onClick={() => props.logout()} color="primary">Logout here</Button>
                            </Hidden>
                            <Hidden mdUp>
                                <LoadingButton
                                    type="button"
                                    color="error"
                                    onClick={() => props.logout()}
                                    fullWidth
                                    text="Logout"
                                />
                            </Hidden>
                        </Grid>
                    </Grid>
            </Paper>
        </Page>
    )
}

const mapStateToProps = (state : any) => {
    return {
      user: state.auth.user,
      fetching: state.auth.fetching
    }
  }
  
const mapDispatchToProps = (dispatch : any) => {
    return {
        uploadUserChanges: (user : any) => dispatch(AuthActions.uploadUserChanges(user)),
        logout: () => dispatch(AuthActions.logout()),
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
