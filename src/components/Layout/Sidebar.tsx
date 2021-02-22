import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import AccountIcon from '@material-ui/icons/AccountCircle'
import { useHistory, useLocation } from 'react-router-dom';
import { Drawer, List,Typography, Divider, ListItem, ListItemIcon,ListItemText } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import { isNavActive } from '../../utils/functions';

const navItems : {to: string, name: string, exact: boolean, Icon: any}[]= [
    { to: '/', name: 'Start', exact: true, Icon: HomeIcon},
    { to: '/profile', name: 'Profile', exact: true, Icon: AccountIcon},
];

type Props = {
    open: boolean,
    onClose: () => void,
}


export default function Sidebar(props : Props) {
    const location = useLocation()
    const history = useHistory()

    const onClick = (e: any, to : string) => {
        e.stopPropagation();
        history.push(to)
        props.onClose()
    }

    return (
            <Drawer
                anchor="left"
                open={props.open}
                onClose={() => props.onClose()}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                <Typography variant="h6" style={{margin: 15, maxWidth: 250}}>
                    {process.env.REACT_APP_NAME}
                </Typography>
                <Divider />
                <List>
                    {navItems.map(({to, name, exact, Icon}) => 
                        <ListItem button key={name} onClick={(e) => onClick(e, to)} style={{width: 250}}>
                            <ListItemIcon style={{color: isNavActive(to, exact, location.pathname) ? blue[700] : "inherit"}}><Icon /></ListItemIcon>
                            <ListItemText
                                primary={name}
                                style={{color: isNavActive(to, exact, location.pathname) ? blue[700] : "inherit"}}
                            />
                        </ListItem>
                    )}
                </List>
            </Drawer>
    );
}

