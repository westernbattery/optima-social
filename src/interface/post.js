import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardHeader, CardContent, CardActions, Avatar, Typography, TextField,
  Button, InputAdornment, IconButton, Input, Divider } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/DeleteOutline';

const useStyles = makeStyles((theme) => ({
  card: {
    width : '500px',
    ['@media (max-width:780px)']: {
      width: '85%'
    },
    backgroundColor: '#fff',
    marginBottom: 20
  },
  avatar: {
    backgroundColor: red[500],
  },
  commentInput: {
    width: '100%'    
  },
  commentBox: {
    padding: 10,
    backgroundColor: '#eff2f5',
    marginBottom: 10,
    borderRadius: 20
  },
}));

export default function PostCard(props) {
  const classes = useStyles();
  const {post, name, email, postId} =  props;
  const [comment, setComment] = useState('');
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {post.name.charAt(0)}
          </Avatar>
        }
        title={post.name}
        subheader={post.email}
        action={
          post.email === props.email ?
          <IconButton aria-label="remove post" onClick={() => props.onDeletePost({postId: postId})}>
            <DeleteIcon color='secondary'/>
          </IconButton>
          : null
        }
      />
      <CardContent>
        <Typography variant="body2" component="p">
          {post.text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <form className={classes.commentInput} autoComplete="off" 
          onSubmit={(e) => {
            e.preventDefault();
            setComment('');
            props.onAddComment({postId: postId, text: comment, name: name, email})
          }}>
          <Input aria-describedby="reply to comment" label={"Message"} placeholder="Reply..."
            onChange={(e) => setComment(e.target.value)} value={comment} fullWidth
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  id="send-message"
                  aria-label="send message"
                  edge="end"
                  type="submit"
                >
                  {<SendIcon color='primary' />}
                </IconButton>
              </InputAdornment>
            }
          />
        </form>
        <Divider/>
      </CardActions>
      {
        post.comments.length > 0 ? 
          <CardContent>
            <Typography color="textSecondary">All Comments</Typography>
            {post.comments.map((comment, index) => {
                return (
                  <div className={classes.commentBox} key={index}>
                    <Typography component="p">{comment.text}</Typography>
                    <Typography component="p" color="textSecondary" variant="body2">By {comment.name} | {comment.email}</Typography>
                  </div>
                )
            })}
          </CardContent> : null
      }
    </Card>
  );
}