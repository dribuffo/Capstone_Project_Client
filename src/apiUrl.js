let apiUrl;

// check if development
if (window.location.hostname === "localhost") {
  apiUrl = "http://localhost:4000";
} else {
  apiUrl = "https://blooming-caverns-23443.herokuapp.com"
}

// export api url
export default apiUrl;

