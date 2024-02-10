import React, { useEffect, useState } from "react";
import axios from "axios";
import { GrUpdate } from "react-icons/gr";
import { RiUploadCloud2Line } from "react-icons/ri";
import logo from "../images/logohotel.png";
import { useParams } from "react-router-dom";
import "./Update_view_Folder/ConponentUp.css";

const Rooms = () => {
  const { id } = useParams();
  const [rooms, setRooms] = useState([]);
  const [isAjoutFormVisible, setIsAjoutFormVisible] = useState(false);
  const [hotel, setHotel] = useState([]);
  

  const handleAjoutButtonClick = () => {
    setIsAjoutFormVisible(true);
  };
  const deleteRoom = async (id) => {
    await axios.delete(`http://localhost:8088/hotels/chambre/${id}`);
    fetchRooms();
  };
  const handleAjoutFormClose = () => {
    setIsAjoutFormVisible(false);
  };

  
  const fetchRooms = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8088/hotels/chambre/${id}`
      );
      setRooms(result.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };
  const fetchHotelData = async () => {
    const response = await axios.get(`http://localhost:8088/hotels/${id}`);
    setHotel(response.data);
  }

  useEffect(() => {
    fetchRooms();
    fetchHotelData();
  }, []);


  const AjoutForm = ({ onClose, onSubmit }) => {
    const [capacite, setCapacite] = useState("");
    const [prix, setPrix] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState(null);
    const [nom, setNom] = useState("");

    const handleCapaciteChange = (e) => setCapacite(e.target.value);
    const handlePrixChange = (e) => setPrix(e.target.value);
    const handleTypeChange = (e) => setType(e.target.value);
    const handleNomChange = (e) => setNom(e.target.value);

    const handleImageChange = (e) => {
      console.log("Selected image:", e.target.files[0]);
      setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("nom", nom);
      formData.append("capacite", capacite);
      formData.append("prix", prix);
      formData.append("type", type);

      if (image) {
        formData.append("image", image);
      }

      try {
        await axios.post(`http://localhost:8088/hotels/${id}/rooms`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        fetchRooms();

        setNom("");
        setCapacite("");
        setPrix("");
        setType("");
        setImage(null);

        setIsAjoutFormVisible(false);
      } catch (error) {
        console.error("Error adding room:", error);
      }
    };

    return (
      <div className="cg">
        <div className="cm">
          <div className="cmc">
            <div className="headform">
              <img src={logo} alt="Logo" />

              <button onClick={() => onClose()}>X</button>
            </div>

            <form className="form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="nom">Nom</label>
                <input
                  type="text"
                  required
                  id="nom"
                  value={nom}
                  onChange={handleNomChange}
                />
              </div>
              <div>
                <label htmlFor="capacite">Capacité</label>
                <input
                  type="text"
                  required
                  id="capacite"
                  value={capacite}
                  onChange={handleCapaciteChange}
                />
              </div>

              <div>
                <label htmlFor="prix">Prix</label>
                <input
                  type="text"
                  required
                  id="prix"
                  value={prix}
                  onChange={handlePrixChange}
                />
              </div>

              <div>
                <label htmlFor="type">Type</label>
                <select
                  id="type"
                  value={type}
                  onChange={handleTypeChange}
                  required
                >
                  <option value="">Sélectionnez un type</option>
                  <option value="SUITE">Suite</option>
                  <option value="STANDARD">Standard</option>
                  <option value="SINGLE">Single</option>
                  <option value="TRIPLE">Triple</option>
                  <option value="FAMILIALE">Familiale</option>
                </select>
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
                <GrUpdate className="icon"></GrUpdate> Ajouter
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  //view rooms////////////////////////////////////////////////////////
  const [isVisibleView , setisVisibleView] = useState(null);

  const toggleVisibilityView = (hotelId) => {
    setisVisibleView(isVisibleView === hotelId ? null : hotelId);
    console.log(isVisibleView);

    if (isVisibleView !== hotelId) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      document.body.classList.add("disable-scroll");
    } else {
      document.body.classList.remove("disable-scroll");
    }
  };

  const HandleView = ({ room }) => {
    /*const handleRoom = () => {
      navigate(`/rooms/${encodeURIComponent(hotel.id)}`);
    };*/
    console.log(room)
    return (
      <div className="cg">
        {isVisibleView === room.id && (
          <div className="cm">
            <div className="cmc hotelview">
              <div className="headform" style={{}}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "20px",
                    alignItems: "center",
                  }}
                >
                  <img src={logo} />
                  <p
                    style={{
                      fontFamily: "algerian",
                      color: "black",
                      fontSize: "50px",
                      borderRadius: "20px 4px 20px 4px",
                      backgroundColor: "antiquewhite",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "algerian",
                        color: "orangered",
                        fontSize: "50px",
                      }}
                    >
                      {room.nom.substr(0,room.nom.length/2)}
                    </span>
                    {room.nom.substr(room.nom.length/2)}
                  </p>
                </div>
                <button onClick={() => toggleVisibilityView(room.id)} readOnly>
                  {" "}
                  X
                </button>
              </div>
              <div className="hotelbody">
                <div className="hotelimage">
                  <img
                    src={`data:image/png;base64,${room.imageBase64}`}
                    alt="Description de l'image"
                  />
                  <button
                    style={{
                      borderRadius: "20px",
                      color: "white",
                      backgroundColor: "orange",
                      width: "150px",
                      fontSize: "30px",
                      height: "50px",
                    }}
                    
                  >
                    Hotels
                  </button>
                </div>
                <div className="hotelinfo">
                  <p>
                    <span>Identifiant du chambre :</span>
                    {room.id}
                  </p>
                  <p>
                    {" "}
                    <span>Type :</span>
                    {room.type}
                  </p>

                  <p>
                    <span>Disponible :</span>
                    {room.disponibilite ? 'disponible':'onDisponible'}
                  </p>

                  <p>
                    <span>Capacite:</span>
                    {room.capacite}
                  </p>
                  <p>
                    <span>Prix:</span>
                    {room.prix} DH
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  ///////////////////////////////////////////////////////////////////////////
  //update data of rooms
  const [isVisible, setIsVisible] = useState(null);

  const toggle=(idRoom)=>{
    setIsVisible(isVisible === idRoom ? null : idRoom);
    if (isVisible !== idRoom) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      document.body.classList.add("disable-scroll");
    } else {
      document.body.classList.remove("disable-scroll");
    }

  }

  const UpdateData = ({room}) => {
    const [capacite, setCapacite] = useState("");
    const [prix, setPrix] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState(null);
    const [nom, setNom] = useState("");

    const handleCapaciteChange = (e) => setCapacite(e.target.value);
    const handlePrixChange = (e) => setPrix(e.target.value);
    const handleTypeChange = (e) => setType(e.target.value);
    const handleNomChange = (e) => setNom(e.target.value);

    const handleImageChange = (e) => {
      console.log("Selected image:", e.target.files[0]);
      setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("nom", nom);
      formData.append("capacite", capacite);
      formData.append("prix", prix);
      formData.append("type", type);

      if (image) {
        formData.append("image", image);
      }

      try {
        await axios.post(`http://localhost:8088/hotels/${id}/rooms`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        fetchRooms();

        setNom("");
        setCapacite("");
        setPrix("");
        setType("");
        setImage(null);

        setIsAjoutFormVisible(false);
      } catch (error) {
        console.error("Error adding room:", error);
      }
    };

    return (

      <div className="cg">
        { isVisible === room.id && (
        <div className="cm">
          <div className="cmc">
            <div className="headform">
              <img src={logo} alt="Logo" />

              <button onClick={() => {toggle(room.id)}}>X</button>
            </div>

            <form className="form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="nom">Nom</label>
                <input
                  type="text"
                  required
                  id="nom"
                  value={nom}
                  onChange={handleNomChange}
                />
              </div>
              <div>
                <label htmlFor="capacite">Capacité</label>
                <input
                  type="text"
                  required
                  id="capacite"
                  value={capacite}
                  onChange={handleCapaciteChange}
                />
              </div>

              <div>
                <label htmlFor="prix">Prix</label>
                <input
                  type="text"
                  required
                  id="prix"
                  value={prix}
                  onChange={handlePrixChange}
                />
              </div>

              <div>
                <label htmlFor="type">Type</label>
                <select
                  id="type"
                  value={type}
                  onChange={handleTypeChange}
                  required
                >
                  <option value="">Sélectionnez un type</option>
                  <option value="SUITE">Suite</option>
                  <option value="STANDARD">Standard</option>
                  <option value="SINGLE">Single</option>
                  <option value="TRIPLE">Triple</option>
                  <option value="FAMILIALE">Familiale</option>
                </select>
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
                <GrUpdate className="icon"></GrUpdate> Ajouter
              </button>
            </form>
          </div>
        </div>)}
      </div>
    );
  };




  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="my-4">
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
                  Table des chambres
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
                  onClick={handleAjoutButtonClick}
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
                      <th className="tebxt-secondary opacity-7">Capacité</th>
                      <th className="text-secondary opacity-7">Prix</th>
                      <th className="text-secondary opacity-7">Type</th>
                      <th className="text-secondary opacity-7">Image</th>
                      <th className="text-secondary opacity-7">Hotel</th>
                      <th className="text-secondary opacity-7">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.map((room) => (
                      <tr key={room.id}>
                        <td>{room.id}</td>
                        <td>{room.capacite}</td>
                        <td>{room.prix}</td>
                        <td>{room.type}</td>
                        <td>
                          <img
                            src={`data:image/jpeg;base64,${room.imageBase64}`}
                            className="avatar avatar-sm me-3 border-radius-lg"
                            alt={room.nom}
                            style={{
                              width: "50px",
                              height: "50px",
                              marginLeft: "30px",
                            }}
                          />
                        </td>
                        <td>{hotel.nom}</td>
                        <td>
                          <span
                            style={{ cursor: "pointer", marginRight: "10px" }}
                            title="Modifier"
                            onClick={() => {toggle(room.id)}}
                          >
                            ✏️
                          </span>

                          <span
                            style={{ cursor: "pointer", marginRight: "10px" }}
                            title="Supprimer"
                            onClick={() => deleteRoom(room.id)}
                          >
                            🗑️
                          </span>
                          <span
                            style={{ cursor: "pointer" }}
                            title="Visualiser"
                            onClick={()=>{toggleVisibilityView(room.id)}}
                          >
                            👁️
                          </span>
                        </td>
                        <UpdateData room={room}></UpdateData>
                        <HandleView room={room}></HandleView>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isAjoutFormVisible && <AjoutForm onClose={handleAjoutFormClose} />}
    </div>
  );
};

export default Rooms;
