import React, { useEffect, useState } from "react";
import * as PostApi from "../../api/PostsRequests.js";

import FeedCard from "../home/feedCard";
import { MdAutorenew } from "react-icons/md";
import { FaHotjar } from "react-icons/fa";
import { HiViewGrid } from "react-icons/hi";

import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePosts } from "../../redux/actions/PostsAction.js";
import { Skeleton } from "@mui/material";

export default function Feed(props) {
  const params = useParams();
  const id = props.id;
  const dispatch = useDispatch();
  let { posts, loading } = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getTimelinePosts(id));
  }, []);
  if (!posts) return "No Posts";
  if (params.id) posts = posts.filter((post) => post.userId === params.id);
  console.log(posts)

  return (
    <div>

      <div className="card-container">

        <div className="container-top">
        {loading?<Skeleton variant="text" width={"100%"}/>:
          <><button className="container-top-button">
            <MdAutorenew /> New
          </button>
          <button className="container-top-button">
            <FaHotjar /> hot
          </button>
          <button className="container-top-button">
            <HiViewGrid /> view
          </button></>}
        </div>
        {posts.map((post, id) => {
          return <FeedCard data={post} key={id} loading={loading}/>;
        })}
      </div>
    </div>
  );
}
