import Swal from "sweetalert2";

export const tittleFormat = (title) => {
  let formatTitle = title?.length > 40 ? title?.slice(0, 40) + "..." : title;
  return formatTitle?.charAt(0).toUpperCase() + formatTitle?.slice(1);
};

export const descriptionFormat = (description) => {
  return description.length > 190
    ? description.slice(0, 190) + "..."
    : description;
};

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const loginBtn = () => {
  console.log("clicked");
  sessionStorage.setItem("isLoggedIn", true);
};
