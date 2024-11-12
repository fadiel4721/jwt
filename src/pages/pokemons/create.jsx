//src/pages/pokemons/create.jsx
import { useState } from "react";
 
//import useNavigate
import { useNavigate } from "react-router-dom";
 
//import API
import api from "../../api";
 
export default function PostCreatePokemon() {
  //define state
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [ability, setAbility] = useState("");
  const [desc, setDesc] = useState("");
 
  //state validation
  const [errors, setErrors] = useState([]);
 
  //useNavigate
  const navigate = useNavigate();
 
  //method handle file change
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
 
  //method store post
  const storePost = async (e) => {
    e.preventDefault();
 
    //init FormData
    const formData = new FormData();
 
    //append data
    formData.append("image", image);
    formData.append("name", name);
    formData.append("ability", ability);
    formData.append("desc", desc);
 
    //send data with API
    await api
      .post("/api/pokemons", formData)
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
              <form onSubmit={storePost}>
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
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama Pokemon"
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
                    onChange={(e) => setDesc(e.target.value)}
                    rows="5"
                    placeholder="Deskripsi Pokemon"
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
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}