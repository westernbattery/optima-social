import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 20
  },
  title: {
    flexGrow: 1,
  },
  button: {
    color: '#fff'
  }
}));

export default function NavBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Optima Social
          </Typography>
          <div>
            {
              props.isLoggedIn ? <Button className={classes.button} onClick={props.onLogout}>Logout</Button> : null
            }
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}