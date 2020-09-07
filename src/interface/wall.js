import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, TextField, Card, Box, Input, InputAdornment, IconButton, CardContent } from '@material-ui/core';
import Post from './post';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  card: {
    width : '500px',
    ['@media (max-width:780px)']: {
      width: '85%'
    },
    backgroundColor: '#fff',
    marginBottom: 20
  },
}));

export default function Wall(props) {
  const classes = useStyles();
  const {name, email} = props;
  const [post, setPost] = useState(''); 
  const [comment, setComment] = useState(''); 
  const [posts, setPosts] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [searchPosts, setSearchPosts] = useState([]);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    const posts  = localStorage.getItem('posts');
    if(posts) {
      let postArray = JSON.parse(posts);
      setPosts(postArray);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchPosts([]);
    setSearchString('');
    const newPosts = [{text: post, comments: [], name: name, email: email}, ...posts];
    setPosts(newPosts);
    setPost('');
    localStorage.setItem('posts', JSON.stringify(newPosts));
  }

  const addComment = ({postId, name, email, text}) => {
    if (text !== '') {
      let post = posts[postId];
      post.comments = [{name: name, email: email, text: text}, ...post.comments];
      posts[postId] = post;
      setPosts([...posts]);
      localStorage.setItem('posts', JSON.stringify([...posts]));
    }
  }

  const deletePost = ({postId}) => {
    posts.splice(postId, 1);
    setPosts([...posts]);
    localStorage.setItem('posts', JSON.stringify([...posts]));
    if(searchPosts.length > 0) {
      onSearch();
    }
  }

  const onSearch = (e) => {
    e && e.preventDefault();
    let tempPosts = posts;
    tempPosts = tempPosts.filter((post) => {
      const isValid = post.name.indexOf(searchString) != -1 || 
      post.email.indexOf(searchString) != -1 || 
      post.text.indexOf(searchString) != -1
      return isValid
    });
    if(tempPosts.length > 0) {
      setSearchPosts([...tempPosts]);
    } else {
      setSearchPosts([]);
      setNotFound(true);
    }
  }

  const onClearSearch = () => {
    setSearchString('');
    setSearchPosts([]);
    setNotFound(false);
    const tempPosts  = localStorage.getItem('posts');
    if(tempPosts) {
      let postArray = JSON.parse(tempPosts);
      setPosts(postArray);
    }
  }

  return (
    <div className={classes.root}>
      <Typography variant="h3" align="center" gutterBottom={true}>Hi {name}</Typography>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom={true}>What's on your mind?</Typography>
          <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
            <TextField id="post" placeholder="Start sharing..." name="post" variant="outlined" required={true} 
              onChange={(e) => setPost(e.target.value)} value={post} fullWidth multiline={true} />
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Post
            </Button>
          </form>
        </CardContent>
      </Card>
      {
        posts.length > 0 ? 
        <div>
          <Card className={classes.card}>
            <CardContent>
              <form autoComplete="off" 
                onSubmit={(e) => onSearch(e)}>
                <Input aria-describedby="search posts" label={"Search"} placeholder="Search posts..."
                  onChange={(e) => setSearchString(e.target.value)} value={searchString} fullWidth
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        id="search"
                        aria-label="search posts"
                        edge="end"
                        type="submit"
                      >
                        {<SearchIcon color='primary' />}
                      </IconButton>
                      <IconButton
                        id="clear"
                        aria-label="clear search text"
                        edge="end"
                        onClick={onClearSearch}
                      >
                        {<ClearIcon color='secondary' />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </form>
            </CardContent>
          </Card>
          {notFound &&
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="p">
                  Your search - {searchString} - did not match any posts.
                </Typography>
              </CardContent>
            </Card>
          }
          {!notFound && searchPosts.length === 0 && posts.map((post, index) => {
            return (
              <Post post={post} postId={index} name={name} email={email} key={index} 
                onAddComment={addComment} onDeletePost={deletePost}/>
            )
          })}
          {
            searchPosts.length > 0 && searchPosts.map((post, index) => {
              return (
                <Post post={post} postId={index} name={name} email={email} key={index} 
                  onAddComment={addComment} onDeletePost={deletePost}/>
              )
            })
          }
        </div>
        : null
      }
    </div>
  );
}