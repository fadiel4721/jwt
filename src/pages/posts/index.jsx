// src/pages/posts/index.jsx
import { useState, useEffect } from "react";

// import api
import api from "../../api";

// import Link and useNavigate
import { Link, useNavigate } from "react-router-dom";

export default function PostIndex() {
  // ini state
  const [posts, setPosts] = useState([]);

  // define method
  const fetchDataPosts = async () => {
    // fetch data from API with Axios
    await api.get("/api/posts").then((response) => {
      // assign response data to state "posts"
      setPosts(response.data.data.data);
    });
  };

  // run hook useEffect
  useEffect(() => {
    // call method "fetchDataPosts"
    fetchDataPosts();
  }, []);

  // method deletePost
  const deletePost = async (id) => {
    // delete with api
    await api.delete(`/api/posts/${id}`).then(() => {
      // call method "fetchDataPosts"
      fetchDataPosts();
    });
  };

  // Set up navigate function
  const navigate = useNavigate();

  // Function to handle going back to the dashboard
  const goBack = () => {
    navigate("/"); // Navigate to the dashboard or homepage
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#343a40' }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/dashboard">Dashboard</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/pokemons">Pokemon</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/posts">Posts</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-12">
            <Link
              to="/posts/create"
              className="btn btn-md btn-success rounded shadow border-0 mb-3"
            >
              ADD NEW POST
            </Link>
            {/* Back Button */}
            <button
              onClick={goBack}
              className="btn btn-md btn-secondary rounded shadow border-0 mb-3 ms-2"
            >
              BACK TO DASHBOARD
            </button>

            <div className="card border-0 rounded shadow">
              <div className="card-body">
                <table className="table table-bordered">
                  <thead className="bg-dark text-white">
                    <tr>
                      <th scope="col">Image</th>
                      <th scope="col">Title</th>
                      <th scope="col">Content</th>
                      <th scope="col" style={{ width: "15%" }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.length > 0 ? (
                      posts.map((post, index) => (
                        <tr key={index}>
                          <td className="text-center">
                            <img
                              src={post.image}
                              alt={post.title}
                              width="200"
                              className="rounded"
                            />
                          </td>
                          <td>{post.title}</td>
                          <td>{post.content}</td>
                          <td className="text-center">
                            <Link
                              to={`/posts/edit/${post.id}`}
                              className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2"
                            >
                              EDIT
                            </Link>
                            <button
                              onClick={() => deletePost(post.id)}
                              className="btn btn-sm btn-danger rounded-sm shadow border-0"
                            >
                              DELETE
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          <div className="alert alert-danger mb-0">
                            Data Belum Tersedia!
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
