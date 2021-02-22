import React from 'react'
import Page from '../components/Layout/Page'
import { connect } from 'react-redux'
import { Paper, Grid } from '@material-ui/core'
import logo from '../assets/logo.svg'
import '../styles/App.css';

type Props = { 
    user: any,
}


function LandingPage (props : Props) {
    const { user } = props

    return (
        <Page
            className="landingPage"
            title="Landing Page"
        >
            <Paper elevation={3} style={{padding: 16, justifyContent: "center"}}>
                <Grid container>
                    <Grid item xs={12}>
                        { user ? `Hello ${user.name} ${user.surname}!` : "Hello World!"}
                    </Grid>
                    <Grid item xs={12} style={{justifyContent: "center"}}>
                    <img src={logo} className="App-logo" alt="logo"/>
                    </Grid>
                    <Grid item xs={12}>
                    Edit <code>src/App.js</code> and save to reload.
                    </Grid>
                </Grid>
            </Paper>
        </Page>
    )
}

const mapStateToProps = (state : any) => {
    return {
      user: state.auth.user,
    }
  }
  
const mapDispatchToProps = (dispatch : any) => {
    return { }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
