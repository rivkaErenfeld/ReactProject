import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CreatePost } from './createPost'
import { Card, CardContent, Typography, Button } from '@mui/material'

export const UserPost = (props) => {

  const [isDialogOpen, setDialogOpen] = useState(false); 
  const userPosts = useSelector(state => state.user_posts);
  const selectedPosts = userPosts.filter((user) => user.userId === props.user.id);

  return (
    <>
      <Button onClick={() => setDialogOpen(true)}>Create Post</Button>
      <CreatePost open={isDialogOpen} userId={props.user.id} onClose={() => setDialogOpen(false)} />
      {props.user ? (
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Posts of {props.user.name}
            </Typography>
            {selectedPosts.map((post) => (
              <Card key={post.id} style={{ marginTop: 16 }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.body}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      ) : (
        <div>Please select a user to view their posts.</div>
      )}
    </>
  );
};

