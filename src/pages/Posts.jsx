import React, { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { InputGroup, Button, Input, Row, Col, FormGroup } from "reactstrap";
import Shimmer from "../components/Shimmer";
import { descriptionFormat, tittleFormat } from "../utils/helper";
import { STATUSES, setModal, deletePost } from "../features/posts/postsSlice";
import viewIcon from "../assets/view-details.png";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";
import { useTranslation } from "react-i18next";

const Posts = () => {
  const [filterText, setFilterText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation("translation");
  const { posts, status } = useSelector((state) => state.post);

  useEffect(() => {
    const data = posts.filter(
      (post) =>
        post.title.includes(filterText) || post.body.includes(filterText)
    );

    setFilteredData(data);
  }, [filterText, posts]);

  const showModel = (modalType, post) => {
    dispatch(setModal({ isOpen: true, post: post, modalType: modalType }));
  };

  const deletePostItem = (id) => {
    dispatch(deletePost(id));
  };

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setFilterText("");
      }
    };

    return (
      <>
        <Row>
          <Col md={12}>
            <FormGroup>
              <InputGroup>
                <Input
                  placeholder={t("PLSEARCH")}
                  onChange={(e) => setFilterText(e.target.value)}
                  value={filterText}
                />
                <Button onClick={handleClear}>{t("CLEAR")}</Button>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
      </>
    );
  }, [filterText, t]);

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

  return status == STATUSES.LOADING ? (
    <Shimmer />
  ) : (
    <section className="container mt-5 d-flex flex-wrap justify-content-between post-section">
      <DataTable
        pagination
        columns={columns}
        data={filteredData}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
      />
    </section>
  );
};

export default Posts;
