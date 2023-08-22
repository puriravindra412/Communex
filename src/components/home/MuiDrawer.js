import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import { FormControl, IconButton, List, ListItem, SwipeableDrawer } from '@mui/material';
import { GoCommentDiscussion } from "react-icons/go";
import CommentEditor from './CommentEditor';

const MuiDrawer = memo(({data,user,commentsCount, setCommentsCount,}) => {
  const [open, setOpen] =useState(false);
  

  const list = (
    <Box sx={{ width: "450"}} role="presentation">
      <List>
        
        <ListItem>
          <FormControl fullWidth>
          <Box role='presentation' width={400} >
          <h4>Comment</h4>
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
    <SwipeableDrawer   width={450} anchor={"right"} open={open} onClose={(e) => setOpen(false)}>
          {list}
    </SwipeableDrawer>
      
    
    </>
    </div>
  )
})

export default MuiDrawer;