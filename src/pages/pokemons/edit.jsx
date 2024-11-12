//src/pages/pokemons/edit.jsx
import { useState, useEffect } from "react";
 
//import useNavigate
import { useNavigate, useParams } from "react-router-dom";
 
//import API
import api from "../../api";
 
export default function PostEditPokemon() {
  //define state
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [ability, setAbility] = useState("");
  const [desc, setDesc] = useState("");
 
  //state validation
  const [errors, setErrors] = useState([]);
 
  //useNavigate
  const navigate = useNavigate();
 
  //destruct ID
  const { id } = useParams();
 
  //method fetchDetailPost
  const fetchDetailPost = async () => {
    //fetch data
    await api.get(`/api/pokemons/${id}`).then((response) => {
      //assign to state
      setName(response.data.data.name);
      setAbility(response.data.data.ability);
      setDesc(response.data.data.desc);
    });
  };
 
  //hook useEffect
  useEffect(() => {
    //call method "fetchDetailPost"
    fetchDetailPost();
  }, []);
 
  //method handle file change
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
 
  //method update post
  const updatePost = async (e) => {
    e.preventDefault();
 
    //init FormData
    const formData = new FormData();
 
    //append data
    formData.append("image", image);
    formData.append("name", name);
    formData.append("ability", ability);
    formData.append("desc", desc);
    formData.append("_method", "PUT");
 
    //send data with API
    await api
      .post(`/api/pokemons/${id}`, formData)
      .then(() => {
        //redirect to pokemons index
        navigate("/pokemons");
      })
      .catch((error) => {
        //set errors response to state "errors"
        setErrors(error.response.data);
      });
  };
 
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card border-0 rounded shadow">
            <div className="card-body">
              <form onSubmit={updatePost}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Image</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="form-control"
                  />
                  {errors.image && (
                    <div className="alert alert-danger mt-2">
                      {errors.image[0]}
                    </div>
                  )}
                </div>
 
                <div className="mb-3">
                  <label className="form-label fw-bold">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name Pokemon"
                  />
                  {errors.name && (
                    <div className="alert alert-danger mt-2">
                      {errors.name[0]}
                    </div>
                  )}
                </div>
 
                <div className="mb-3">
                  <label className="form-label fw-bold">Ability</label>
                  <textarea
                    className="form-control"
                    value={ability}
                    onChange={(e) => setAbility(e.target.value)}
                    rows="5"
                    placeholder="Ability Pokemon"
                  ></textarea>
                  {errors.ability && (
                    <div className="alert alert-danger mt-2">
                      {errors.ability[0]}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Desc</label>
                  <textarea
                    className="form-control"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    rows="5"
                    placeholder="Desc Pokemon"
                  ></textarea>
                  {errors.desc && (
                    <div className="alert alert-danger mt-2">
                      {errors.desc[0]}
                    </div>
                  )}
                </div>
 
                <button
                  type="submit"
                  className="btn btn-md btn-primary rounded-sm shadow border-0"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}