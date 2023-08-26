import React, {  memo, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import { FormControl, IconButton, List, ListItem, SwipeableDrawer } from '@mui/material';
import { GoCommentDiscussion } from "react-icons/go";
import CommentEditor from './CommentEditor';

const MuiDrawer = memo(({data,user,commentsCount, setCommentsCount,}) => {
  const [open, setOpen] =useState(false);
  const[direction,setDirection]=useState('right')
  const [width,setWidth]=useState('450px')
  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth <= 450) {
        setDirection('bottom');
        setWidth('100%')
      } else {
        setDirection('right');
        setWidth('450px')
      }
    };

    handleWindowResize(); // Set the initial anchor direction

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  const list = (
    <Box sx={{ width: width}} role="presentation">
      <List>
        
        <ListItem>
          <FormControl fullWidth>
          <Box role='presentation' width={'100%'} style={{padding:'10px'}} >
          <h5>Comment</h5>
          <CommentEditor  data={data} 
           commentsCount={commentsCount}  setCommentsCount={setCommentsCount} setOpen={setOpen}></CommentEditor>
          </Box>
          </FormControl>
        </ListItem>
      </List>
      
    </Box>
  );

  return (
    <div>
      < >
    <IconButton sx={{padding:'0',margin:'0',color:'var(--color)'}} onClick={(e)=>setOpen(true)}>
    <GoCommentDiscussion></GoCommentDiscussion>
    </IconButton>
    <SwipeableDrawer   width={width} anchor={direction} open={open} onClose={(e) => setOpen(false)}>
          {list}
    </SwipeableDrawer>
      
    
    </>
    </div>
  )
})

export default MuiDrawer;