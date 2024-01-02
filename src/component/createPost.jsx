import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material'
import { SetNewUserPost } from '../redux/action'

export const CreatePost = (props) => { 
    const dispatchh = useDispatch();
    const titleRef = useRef(null);
    const bodyRef = useRef(null);

    const handleCreatePost = () => {
        const newPost = {
            title: titleRef.current.value,
            body: bodyRef.current.value,
            userId:props.userId
        };

        dispatchh(SetNewUserPost(newPost));

        titleRef.current.value = '';
        bodyRef.current.value = '';
        props.onClose();
    };

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Create New Post</DialogTitle>
            <DialogContent>
                <TextField inputRef={titleRef} label="Title" fullWidth />
                <TextField inputRef={bodyRef} label="Body" multiline fullWidth />
                <Button onClick={handleCreatePost}>Create</Button>
            </DialogContent>
        </Dialog>
    );
}
