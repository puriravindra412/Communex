import React, { useEffect, useState } from 'react'
import Feed from '../home/Feed'
import * as CommunityApi from '../../api/CommunityRequests.js'
import { TrendingTags } from '../rightSideBar/TrendingTags'
import { useSelector } from 'react-redux'
import * as PostApi from'../../api/PostsRequests.js'
import FeedCard from '../home/feedCard'
export const ExploreFeed = () => {
  const[Community,setCommunity]=useState([]);
  const user  = useSelector((state) => state.authReducer.authData);
  const [posts,setPost]=useState([]);
  const id=user._id;
  useEffect(()=>{
    const communities=async()=>{ 
      const communitData=await CommunityApi.getCommunity();
      setCommunity(communitData.data);
    
    }
   
    communities();
  },[])

  useEffect(()=>{
    const recentPost=async()=>{ 
      const posts=await PostApi.getRecentPost();
      setPost(posts.data)
      
    }
    recentPost()

    
  },[])
console.log(posts)
const [activeCategory, setActiveCategory] = useState('Tranding');
      
const handleCategoryChange = (category) => {
  setActiveCategory(category);
};

let trandingPost=posts;
trandingPost.sort((a, b) => {
  const aLikes = a.likes.length;
  const bLikes = b.likes.length;

  const aComments = a.comments.length;
  const bComments = b.comments.length;

  // Sort by likes in descending order
  if (aLikes !== bLikes) {
    return bLikes - aLikes;
  }

  // If the number of likes is the same, sort by comments in descending order
  return bComments - aComments;
});

  return (
    <div>
    <div className='trending-tag'> 
    <h2>Trending Tags</h2>
    <div className='trending-tags-grid'>
      {Community.map((index)=>{return <TrendingTags img={index.image} name={index.name} peoples={index.users} posts={index.posts}key={index.name}></TrendingTags>})}
      </div>
      </div>
      <div>
      <div className='card-container'>
      <div className='container-top-new'>
      <div  className="buttons-container">
      <div>
      <button  className={activeCategory === 'Tranding' ? 'active' : ''}
      onClick={() => handleCategoryChange('Tranding')}>Tranding</button>
      <button className={activeCategory === 'Recent Posts' ? 'active' : ''}
      onClick={() => handleCategoryChange('Recent Posts')}>Recent Posts</button>
      <button className={activeCategory === 'Blogs' ? 'active' : ''}
      onClick={() => handleCategoryChange('Blogs')}>Blogs</button>
      <button className={activeCategory === 'Tags You follow' ? 'active' : ''}
      onClick={() => handleCategoryChange('Tags You follow')}>Tags You follow</button>
     
      </div>
      <hr></hr>
      
</div> 
      
      </div>
     
      
      {activeCategory === 'Tranding' && trandingPost && trandingPost?.map((post, id) => {
        return <FeedCard data={post} key={id} />;
      })}
      {activeCategory === 'Recent Posts' && posts && posts?.map((post, id) => {
        return <FeedCard data={post} key={id} />;
      })}  
        </div>
        </div>
    </div>
  )
}
