import React, { useEffect, useState } from "react";
import * as SearchApi from "../../api/SearchRequest";
import { UserCard } from "../user/UserCard";
import FeedCard from "../home/feedCard";
import { TrendingTags } from "../rightSideBar/TrendingTags";
export const Searchresult = ({ state }) => {
  console.log(state.search);
  const [result, setResult] = useState([]);

  const [activeCategory, setActiveCategory] = useState("user");

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };
  useEffect(() => {
    const getdata = async () => {
      const { data } = await SearchApi.searchResult(state.search);
      setResult(data);
    };
    getdata();
  }, [state.search]);
  console.log(result);
  return (
    <div className="search-container">
      <h2>Here are your search results</h2>
      <div className="buttons-container">
        <button
          className={activeCategory === "user" ? "active" : ""}
          onClick={() => handleCategoryChange("user")}
        >
          User
        </button>
        <button
          className={activeCategory === "post" ? "active" : ""}
          onClick={() => handleCategoryChange("post")}
        >
          Post
        </button>
        <button
          className={activeCategory === "community" ? "active" : ""}
          onClick={() => handleCategoryChange("community")}
        >
          Community
        </button>
      </div>

      <div className="content-container">
        {activeCategory === "user" && (
          <div className="category-content">
            {/* User content */}
            <h4>{}</h4>
            {
              <div className="community-users">
                {result?.users?.map((people, index) => {
                  return (
                    <UserCard
                      username={people.username}
                      profile={people.profilePicture}
                      userId={people._id}
                      key={index}
                    />
                  );
                })}
              </div>
            }
          </div>
        )}

        {activeCategory === "post" && (
          <div className="category-content">
            {/* Post content */}
            <h4>{}</h4>
            {result?.post?.map((post, id) => {
              return <FeedCard data={post} key={id} />;
            })}
          </div>
        )}

        {activeCategory === "community" && (
          <div className="category-content">
            {/* Community content */}
            <h4>
              {result.community.length !== 0
                ? result.community.length + " result found in community"
                : "No result found"}
            </h4>
            {
              <div className="right-sidebar">
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
              </div>
            }
            {/* Add your community component or content here */}
          </div>
        )}
      </div>
    </div>
  );
};
