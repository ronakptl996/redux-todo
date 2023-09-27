import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Button } from "reactstrap";
import Shimmer from "../components/Shimmer";
import { descriptionFormat, tittleFormat } from "../utils/helper";
import { STATUSES, setModal, deletePost } from "../features/posts/postsSlice";
import viewIcon from "../assets/view-details.png";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";

const Posts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts, status } = useSelector((state) => state);

  const showModel = (modalType, post) => {
    dispatch(setModal({ isOpen: true, post: post, modalType: modalType }));
  };

  const deletePostItem = (id) => {
    dispatch(deletePost(id));
  };

  const columns = [
    {
      name: "Title",
      selector: (row) => tittleFormat(row.title),
      width: "300px",
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => descriptionFormat(row.body),
      width: "600px",
      sortable: true,
    },
    {
      name: "",
      center: true,
      selector: (row) => (
        <>
          <Button
            size="sm"
            color=""
            onClick={() => showModel("viewDetails", row)}
          >
            <img src={viewIcon} width={"25px"} alt="View Details" />
          </Button>
          <Button
            size="sm"
            color=""
            onClick={() => navigate(`/edit/${row.id}`)}
          >
            <img src={editIcon} width={"18px"} alt="Edit Icon" />
          </Button>
          <Button size="sm" color="" onClick={() => deletePostItem(row.id)}>
            <img src={deleteIcon} width={"25px"} alt="Edit Icon" />
          </Button>
        </>
      ),
    },
  ];

  return status === STATUSES.LOADING ? (
    <Shimmer />
  ) : (
    <section className="container mt-5 d-flex flex-wrap justify-content-between post-section">
      <DataTable pagination columns={columns} data={posts} />
    </section>
  );
};

export default Posts;
