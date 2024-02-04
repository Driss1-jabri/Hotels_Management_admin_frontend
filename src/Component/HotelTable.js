import React, { useEffect, useState } from "react";
import "./Table.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { GrUpdate } from "react-icons/gr";
import axios from "axios";
import "./Update_view_Folder/ConponentUp.css";
import logo from "../images/logohotel.png";
import { RiUploadCloud2Line } from "react-icons/ri";

const HotelTable = () => {
  const [hotels, setHotels] = useState([]);
  const [isAjoutFormVisible, setIsAjoutFormVisible] = useState(false);

  const handleAjoutFormClose = () => {
    setIsAjoutFormVisible(false);
  };

  const fetchHotels = async () => {
    try {
      const result = await axios.get("http://localhost:8088/hotels");
      setHotels(result.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleEdit = (hotelId) => {
    console.log(`Edit hotel with id: ${hotelId}`);
  };

  const deleteHotel = async (id) => {
    await axios.delete(`http://localhost:8088/hotels/${id}`);
    fetchHotels();
  };

  const handleView = (hotelId) => {
    console.log(`View hotel with id: ${hotelId}`);
  };

  const AjoutForm = ({ onClose, onSubmit }) => {
    const [nom, setNom] = useState("");
    const [adresse, setAdresse] = useState("");
    const [ville, setVille] = useState("");
    const [image, setImage] = useState(null);

    const handleNomChange = (e) => setNom(e.target.value);
    const handleAdresseChange = (e) => setAdresse(e.target.value);
    const handleVilleChange = (e) => setVille(e.target.value);
    const handleImageChange = (e) => {
      console.log("Selected image:", e.target.files[0]);
      setImage(e.target.files[0]);
    };


    const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("nom", nom);
      formData.append("adresse", adresse);
      formData.append("ville", ville);

      
      if (image) {
        formData.append("image", image);
      }

      try {
        await axios.post("http://localhost:8088/hotels", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        
        fetchHotels(); 

        
        setNom("");
        setAdresse("");
        setVille("");
        setImage(null);

        setIsAjoutFormVisible(false);
      } catch (error) {
        console.error("Error adding hotel:", error);
      }
    };



    return (
      <div className="cg">
        <div className="cm">
          <div className="cmc">
            <div className="headform">
              <img src={logo} />

              <button onClick={() => onClose()}> X</button>
            </div>

            <form className="form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="nom"> Nom d'hôtel</label>
                <input
                  type="text"
                  required
                  id="nom"
                  value={nom}
                  onChange={handleNomChange}
                />
              </div>

              <div>
                <label htmlFor="adresse">Adresse d'hôtel</label>
                <input
                  type="text"
                  required
                  id="adresse"
                  value={adresse}
                  onChange={handleAdresseChange}
                />
              </div>

              <div>
                <label htmlFor="ville"> Ville d'hôtel:</label>
                <input
                  type="text"
                  required
                  id="ville"
                  value={ville}
                  onChange={handleVilleChange}
                />
              </div>

              <div>
                <label
                  title="image"
                  htmlFor="imageBase64"
                  className="labelFile"
                >
                  <RiUploadCloud2Line className="icon" /> Importer Image
                </label>

                <input
                  type="file"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  id="imageBase64"
                />
              </div>

              <button type="submit">
                {" "}
                <GrUpdate className="icon"></GrUpdate> Ajouter{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="card my-4">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div
                className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h6 className="text-white text-capitalize ps-3">
                  Table des hotels
                </h6>
                <button
                  style={{
                    marginRight: "10px",
                    backgroundColor: "blue",
                    paddingLeft: "40px",
                    paddingRight: "40px",
                    borderRadius: "9px",
                    paddingTop: "7px",
                    paddingBottom: "7px",
                  }}
                  onClick={() => setIsAjoutFormVisible(true)}
                >
                  Ajouter
                </button>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <table className="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th className="text-secondary opacity-7">Id</th>
                      <th className="tebxt-secondary opacity-7">Nom</th>
                      <th className="text-secondary opacity-7">Adresse</th>
                      <th className="text-secondary opacity-7">Ville</th>
                      <th className="text-secondary opacity-7">Image</th>
                      <th className="text-secondary opacity-7">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hotels.map((hotel) => (
                      <tr key={hotel.id}>
                        <td>{hotel.id}</td>
                        <td>{hotel.nom}</td>
                        <td>{hotel.adresse}</td>
                        <td>{hotel.ville}</td>
                        <td>
                          <img
                            src={`data:image/jpeg;base64,${hotel.imageBase64}`}
                            className="avatar avatar-sm me-3 border-radius-lg"
                            alt={hotel.nom}
                            style={{
                              width: "50px",
                              height: "50px",
                              marginLeft: "30px",
                            }}
                          />
                        </td>
                        <td>
                          <span
                            style={{ cursor: "pointer", marginRight: "10px" }}
                            title="Modifier"
                            onClick={() => handleEdit(hotel.id)}
                          >
                            ✏️
                          </span>

                          <span
                            style={{ cursor: "pointer", marginRight: "10px" }}
                            title="Supprimer"
                            onClick={() => deleteHotel(hotel.id)}
                          >
                            🗑️
                          </span>
                          <span
                            style={{ cursor: "pointer" }}
                            title="Visualiser"
                          >
                            👁️
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isAjoutFormVisible && (
        <AjoutForm onClose={handleAjoutFormClose} onSubmit={fetchHotels} />
      )}
    </div>
  );
};

export default HotelTable;
