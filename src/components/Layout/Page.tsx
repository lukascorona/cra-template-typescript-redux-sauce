import React from 'react'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import useMobileService from '../../utils/mobileService'

type Props = {
    children: React.ReactNode,
    title? : React.ReactNode,
    showTitleOnMobile?: boolean,
    breadcrumps?: { name: string, href?: string }[],
    className?: string,
}

export default function Page(props: Props) {
    const isMobile = useMobileService()
    const { children, title, breadcrumps, className, showTitleOnMobile} = props
    return (
        <Box flex={1} style={{paddingLeft: 8, paddingRight: 8, paddingTop: 8}}>
            <Grid container className={className || "main"}>
                <Grid container className="header">
                    <Grid item>
                        { title && (showTitleOnMobile || !isMobile) &&
                            (typeof title === "string" ? <h1 className="title">{title}</h1> : (title))
                        }
                    </Grid>
                    <Grid item>
                        { breadcrumps &&
                            <Breadcrumbs maxItems={2} aria-label="breadcrumb">
                                { breadcrumps.map(({name, href, },index) => 
                                    index < breadcrumps.length -1 
                                    ? <Link color="inherit" href={href}>{name}</Link>
                                    : <Typography color="textPrimary">{name}</Typography>
                                )}
                            </Breadcrumbs>
                        }         
                    </Grid>
                </Grid>
                <Box flex={1}>{ children }</Box>
            </Grid>
        </Box>
    )
}