import React, { useEffect, useState } from "react";
import * as SearchApi from "../../api/SearchRequest";
import { UserCard } from "../user/UserCard";
import FeedCard from "../home/feedCard";
import { TrendingTags } from "../rightSideBar/TrendingTags";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { CircularProgress } from "@mui/material";
export const Searchresult = ({ state }) => {
  console.log(state.search);
  const [result, setResult] = useState([]);
  const [value, setValue] = React.useState('1');
  const [loading,setLoading]=useState(false)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  
  useEffect(() => {
    const getdata = async () => {
      setLoading(true);
      const { data } = await SearchApi.searchResult(state.search);
      setResult(data);
     setTimeout(()=>setLoading(false),2000) ;
    };
    getdata();
  }, [state.search]);
  console.log(result);
  return (
    <div className="search-container">
   
      <h2>Here are your search results</h2>
      
      <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value} >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" >
            <Tab label="Users" value="1" sx={{color:"var(--color)"}}/>
            <Tab label="Posts" value="2" sx={{color:"var(--color)"}}/>
            <Tab label="Community" value="3"  sx={{color:"var(--color)"}}/>
          </TabList>
        </Box>
        <TabPanel  sx={{padding:0}} value="1">
            {loading?<CircularProgress sx={{margin:"30px 45%"}} /> : <div className="category-content">
                  {
                    <div className="community-users">
                      {result?.users?.map((people, index) => {
                        return (
                          <UserCard
                            username={people.username}
                            profile={people.profilePicture}
                            userId={people._id}
                            worksAt={people.worksAt}
                            key={index}
                          />
                        );
                      })}
                    </div>
                  }
              </div>}
        </TabPanel>
        <TabPanel value="2">
        {loading?<CircularProgress sx={{margin:"30px 45%"}}  /> :<div className="category-content">
                  {result?.posts?.map((post, id) => {
                      return <FeedCard data={post} key={id} />;
                    })}
                  </div>}
        </TabPanel>
        <TabPanel value="3">
        {loading?<CircularProgress sx={{margin:"30px 45%"}}  /> :<div className="category-content">
                  {result?.community?.map((index) => {
                    return (
                      <TrendingTags
                        img={index.image}
                        name={index.name}
                        peoples={index.users}
                        key={index.name}
                      ></TrendingTags>
                    );
                  })}
              </div>}
        </TabPanel>
      </TabContext>
      </Box>
    
      
    </div>
    
    );
};

 