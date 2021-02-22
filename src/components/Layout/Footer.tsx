import React from 'react'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Link from '@material-ui/core/Link'

const Footer = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Divider/>
      </Grid>
      <Grid item xs={12} style={{textAlign: "center", color: "grey", padding: 8}}>
          Copyright © 2021 - <span style={{fontWeight: "bold"}}>{process.env.REACT_APP_NAME}</span> v.{process.env.REACT_APP_VERSION}, more on <Link href="https://github.com/lukascorona/cra-template-typescript-redux-sauce" target="_blank" rel="noreferrer" color="secondary">Github</Link>
      </Grid>
    </Grid>
  );
};

export default Footer;