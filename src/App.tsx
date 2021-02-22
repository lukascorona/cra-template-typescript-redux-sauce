import React from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import blue from '@material-ui/core/colors/blue';
import CssBaseline from '@material-ui/core/CssBaseline';
import Snackbar from './components/widgets/Snackbar'
import { BrowserRouter, Redirect, Switch } from 'react-router-dom'
import { getBasename } from './utils/functions'
import MainLayout from './components/Layout/MainLayout'
import EmptyLayout from './components/Layout/EmptyLayout'
import LayoutRoute from './components/Layout/LayoutRoute'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import ProfilePage from './pages/ProfilePage'
import AuthenticatedRoute from './components/Layout/AuthenticatedRoute';


function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: blue[700]
          },
          secondary: pink,
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename={getBasename()}>
        <Switch>
          <LayoutRoute
            exact
            path="/"
            layout={MainLayout}
            component={LandingPage}
          />
          <LayoutRoute
            exact
            path="/login"
            layout={EmptyLayout}
            component={(props : any) => (
              <AuthPage {...props} authState={"LOGIN"} />
            )}
          />
          <LayoutRoute
            exact
            path="/signup"
            layout={EmptyLayout}
            component={(props : any) => (
              <AuthPage {...props} authState={"SIGNUP"} />
            )}
          />
          <AuthenticatedRoute
            exact
            path="/profile"
            title="Profile"
            layout={MainLayout}
            component={ProfilePage}
          />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
      <Snackbar />
    </ThemeProvider>
  );
}

export default App;
