import React, { useEffect, useState } from "react";
import { IoPencil } from "react-icons/io5";
import { TrendingTags } from "../rightSideBar/TrendingTags";
import { Link } from "react-router-dom";
import * as CommunityApi from "../../api/CommunityRequests.js";

export const Addcommunity = () => {
  const [Community, setCommunity] = useState([]);

  useEffect(() => {
    const communities = async () => {
      const communitData = await CommunityApi.getCommunity();
      setCommunity(communitData.data);
    };
    communities();
  }, []);

  return (
    <div>
      <div className="community">
        <div className="add-commuinty">
          <h4>Create New Community</h4>
          <Link to="/addCommunity">
            <button className="community-button-icon">
              Add New Community <IoPencil />
            </button>
          </Link>
          <h6 style={{ textAlign: "center", display: "block" }}>
            or Explore more
          </h6>
          <div className="trending-tags-grid">
            {Community.map((index) => {
              return (
                <TrendingTags
                  img={index.image}
                  name={index.name}
                  peoples={index.users}
                  posts={index.posts}
                  key={index.name}
                ></TrendingTags>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
