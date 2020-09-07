import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
      width: '30ch',
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const [email, setEmail] = useState(''); 
  const [name, setName] = useState(''); 
  const handleSubmit = (e) => {
    e.preventDefault();
    return props.onSubmit({name: name, email: email});
  }

  return (
    <div>
      <Typography variant="h3" align="center" gutterBottom={true}>Login to get started</Typography>
      <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
        <TextField id="name" label="Name" name="name" variant="outlined" required={true} 
          autoFocus onChange={(e) => setName(e.target.value)} value={name} />
        <TextField id="email" label="Email" name="email" variant="outlined" required={true} 
          autoComplete="email" onChange={(e) => setEmail(e.target.value)} value={email} type="email" />
        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
          Sign In
        </Button>
      </form>
    </div>
  );
}