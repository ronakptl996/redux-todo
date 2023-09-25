import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { Toast } from "../../utils/helper";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const initialState = {
  posts: [],
  status: STATUSES.IDLE,
  modal: {
    isOpen: false,
    value: {},
    modalType: "",
  },
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setModal: (state, action) => {
      state.modal.isOpen = action.payload.isOpen;
      state.modal.value = action.payload.post;
      state.modal.modalType = action.payload.modalType;
    },
    updatePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload.id);

      state.posts.unshift({
        id: action.payload.id,
        userId: 2,
        title: action.payload.title,
        body: action.payload.body,
      });
    },
    deleteStatePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
});

export const {
  setPosts,
  setStatus,
  setModal,
  updatePost,
  deleteStatePost,
  addPost,
} = postsSlice.actions;
export default postsSlice.reducer;

export function fetchPosts() {
  return async function fetchPostsThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      dispatch(setPosts(data));
      dispatch(setStatus(STATUSES.IDLE));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

export function updatePostDetails({ id, data }) {
  return async function updatePostDetailsThunk(dispatch, getState) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    let result = await swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "Do You update the post!",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      dispatch(setStatus(STATUSES.LOADING));
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`,
          {
            method: "PUT",
            body: JSON.stringify({
              id: id,
              title: data.title,
              body: data.body,
              userId: 1,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );

        if (res.ok) {
          const resJson = await res.json();
          dispatch(updatePost(resJson));
          dispatch(setStatus(STATUSES.IDLE));
          swalWithBootstrapButtons.fire(
            "Updated!",
            "Your post has been updated.",
            "success"
          );
        }
      } catch (error) {
        console.log(error);
        dispatch(setStatus(STATUSES.ERROR));
      }
    }
  };
}

export function deletePost(id) {
  return async function deletePostThunk(dispatch, getState) {
    let result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      dispatch(setStatus(STATUSES.LOADING));
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`,
          {
            method: "DELETE",
          }
        );
        if (res.ok) {
          dispatch(deleteStatePost(id));
          Swal.fire("Deleted!", "Your post has been deleted.", "success");
          dispatch(setStatus(STATUSES.IDLE));
        }
      } catch (error) {
        console.log(error);
        dispatch(setStatus(STATUSES.ERROR));
      }
    }
  };
}

export function submitPost(data) {
  return async function deletePostThunk(dispatch, getState) {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (res.status === 201) {
        dispatch(addPost(data));
        Toast.fire({
          icon: "success",
          title: "Post added Successfully!",
        });
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
