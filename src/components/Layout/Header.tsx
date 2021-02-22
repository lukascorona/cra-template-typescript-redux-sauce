import React from 'react'
import { connect } from 'react-redux'
import AuthActions from '../../redux/authRedux'
import { IconButton, Toolbar, AppBar, Typography, Button, Menu, MenuItem } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router-dom'

type Props = {
    title?: string,
    showMenu?: boolean,
    showProfile?: boolean,
    centerTitle?: boolean,
    user: any,
    onMenuClick?: () => void,
    logout: () => void,
}

function Header(props: Props) {
    const history = useHistory()

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
  
    const handleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleUserMenuClose = () => {
      setAnchorEl(null);
    };

    const logout = () => {
        handleUserMenuClose();
        props.logout()
    }

    const navigateProfile = () => {
        handleUserMenuClose();
        history.push("/profile")
    }

    function renderProfile() {
        if (!props.user) {
            return (
                <Button color="inherit" onClick={() => history.push("/login")}>Login</Button>
            )
        } else {
            return (
                <div>
                    <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleUserMenu}
                    color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleUserMenuClose}
                    >
                    <MenuItem onClick={navigateProfile}>Profile</MenuItem>
                    <MenuItem divider />
                    <MenuItem onClick={logout}>Logout</MenuItem>
                    </Menu>
              </div>
            )
        }
    }

    return (
        <AppBar position="static">
            <Toolbar>
                { props.showMenu && 
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={props.onMenuClick}>
                        <MenuIcon />
                    </IconButton>
                }
                <Typography variant="h6" style={{flexGrow: 1, textAlign: props.centerTitle ? "center" : "left"}}>
                    {props.title || process.env.REACT_APP_NAME}
                </Typography>
                { props.showProfile && renderProfile() } 
            </Toolbar>
        </AppBar>
    );
}

const mapStateToProps = (state : any) => {
    return {
      user: state.auth.user
    }
  }
  
  const mapDispatchToProps = (dispatch : any) => {
    return {
      logout: () => dispatch(AuthActions.logout()),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Header);