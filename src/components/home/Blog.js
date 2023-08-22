import React, { useCallback, useEffect, useState } from 'react'
import '../../css/blog.css'
import { getBlogPost } from '../../api/PostsRequests';
import { useSelector } from 'react-redux';
import BlogFeed from './BlogFeed';
const Blog = () => {
    const [blogPosts,setBlogPosts]=useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    let { posts, loading } = useSelector((state) => state.postReducer);

    
    const fetchBlogs = useCallback(async () => {
        try {
          const { data } = await getBlogPost();
          return data;
        } catch (error) {
          console.log(error);
          throw error;
        }
      }, []);
      useEffect(() => {
        let isCancelled = false;
        setIsLoading(true);
    
        fetchBlogs()
          .then((data) => {
            if (!isCancelled) {
              setBlogPosts(data);
              setIsLoading(false);
            }
          })
          .catch((error) => {
            if (!isCancelled) {
              setError(error.message);
              setIsLoading(false);
            }
          });
        },[fetchBlogs])

       

    console.log("blog posts",blogPosts)
        
    
  return (
    
    <div className='blog-container' >
        <h4>Top Recent Blog </h4>
        {blogPosts&&
            blogPosts.map((blog)=>{
                return <BlogFeed data={blog}/>
            })}
    </div>
  )
}

export default Blog;