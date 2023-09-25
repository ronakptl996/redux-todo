import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  STATUSES,
  setModal,
  deletePost,
} from "../features/posts/postsSlice";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";
import { descriptionFormat, tittleFormat } from "../utils/helper";
import Shimmer from "./Shimmer";
import viewIcon from "../assets/view-details.png";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state);

  const showModel = (modalType, post) => {
    dispatch(setModal({ isOpen: true, post: post, modalType: modalType }));
  };

  const deletePostItem = (id) => {
    dispatch(deletePost(id));
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return status === STATUSES.LOADING ? (
    <Shimmer />
  ) : (
    <section className="container mt-5 d-flex flex-wrap justify-content-between">
      {posts.map((post) => (
        <Card
          key={post.id}
          style={{
            width: "18rem",
          }}
          className="m-2"
        >
          <CardBody>
            <CardTitle tag="h5" style={{ height: "50px" }}>
              {post.title && tittleFormat(post?.title)}
            </CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6"></CardSubtitle>
            <CardText style={{ height: "140px" }}>
              {post.body && descriptionFormat(post?.body)}
            </CardText>
            <div className="d-flex justify-content-between">
              <Button
                size="sm"
                color=""
                onClick={() => showModel("viewDetails", post)}
              >
                <img src={viewIcon} width={"30px"} alt="View Details" />
              </Button>
              <div>
                <Button
                  size="sm"
                  color=""
                  onClick={() => deletePostItem(post.id)}
                >
                  <img src={deleteIcon} width={"30px"} alt="Edit Icon" />
                </Button>
                <Button
                  size="sm"
                  color=""
                  onClick={() => showModel("editDetails", post)}
                >
                  <img src={editIcon} width={"20px"} alt="Edit Icon" />
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </section>
  );
};

export default Posts;
