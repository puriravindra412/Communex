import React from 'react'
import profile from '../../images/profile.jpg'
import '../../css/blog.css'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import { Link } from 'react-router-dom';
const BlogFeed = ({data}) => {
    console.log("inside bloog feed ",data)
  return (
    <div>
    <div className='top-feed-post'>
                <img src={data.user.profilePicture} alt="ravi" class="profile-post-image"></img>
                <Link to={`/profile/${data.user._id}`} className="user-name">
          {data.user.username}
        </Link>
     </div>
        
        <div className='blog-feed-container'>
       
        <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.3,
        },
      }}
    >
    {data?.recentPosts?.map((post)=>{
      const newData={}
        return <TimelineItem>
       
        <TimelineOppositeContent className='timeline-date'>
            <p className="blog-heading">{new Date(post.createdAt?post.createdAt:post.post.createdAt).toLocaleString("en-US", {
                day: "numeric",
                month: "short",
                timeZone: "UTC",
              })}</p>  
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot variant="outlined" color="primary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent> <Link
            to={`/post/${post._id?post._id:post.post._id}`}
            state={post.post?post.post:post}
            className="blog-heading"
          >
            {post.heading?post.heading:post.post.heading}
          </Link></TimelineContent>
          </TimelineItem>
        
    })}
    <TimelineItem>
        <TimelineOppositeContent className='timeline-date'>
         
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="primary" />
        </TimelineSeparator>
        <TimelineContent><p className="blog-heading">More..</p></TimelineContent>
      </TimelineItem>
   
    
      

      </Timeline>
        </div>
        </div>
       
  )
}

export default BlogFeed