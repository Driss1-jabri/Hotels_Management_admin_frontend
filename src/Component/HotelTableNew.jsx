import React, { useEffect, useState } from "react";
import "./Table.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import './Update_view_Folder/ConponentUp.css'
import logo from '../images/logohotel.png'
import { RiUploadCloud2Line } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";

const HotelTable = () => {
  const [hotels, setHotels] = useState([]);
  const [isVisible, setIsVisible] = useState(null);

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


  /*const handleEdit = (hotelId) => {
    console.log(`Edit hotel with id: ${hotelId}`);
  };*/

  const deleteHotel = async (id) => {
    await axios.delete(`http://localhost:8088/hotels/${id}`);
    fetchHotels();
  };
  const toggleVisibility = (hotelId) => {
    setIsVisible(isVisible === hotelId ? null : hotelId);
    if (isVisible !== hotelId) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      document.body.classList.add('disable-scroll');
    } else {
      document.body.classList.remove('disable-scroll');
    }
  };
  function ToggleContent1({ hotel }) {
    const [editedHotel, setEditedHotel] = useState({ ...hotel });
    
    const [isDisabled ,setIsDisabled]=useState(true);
    const handleChange = (e) => {
      const { id, value } = e.target;
      setEditedHotel((prevHotel) => ({
        ...prevHotel,
        [id]: value
      }));
      
      
      if (
        editedHotel.nom === hotel.nom &&
        editedHotel.adresse === hotel.adresse &&
        editedHotel.ville === hotel.ville &&
        editedHotel.imageBase64 === null
      ) {
        setIsDisabled(true);
         // Activer le bouton si les valeurs sont différentes
      } else {
        setIsDisabled(false);
         // Désactiver le bouton si les valeurs sont identiques
         console.log(false)
      }


    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if(hotel.imageBase64===editedHotel.imageBase64){
        console.log("hello")
        var binaryString = window.atob(editedHotel.imageBase64);

        // Convertir les données binaires en tableau d'octets
        var length = binaryString.length;
        var bytes = new Uint8Array(length);
        for (var i = 0; i < length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }

        // Créer un objet Blob à partir des données binaires
        var blob = new Blob([bytes], { type: 'image/png' });
        console.log(blob)
        setEditedHotel({ ...editedHotel, imageBase64: blob})
      }
      const formData = new FormData();
      formData.append("ville",editedHotel.ville)
      formData.append("adresse",editedHotel.adresse)
    formData.append("nom",editedHotel.nom)
    formData.append("image",editedHotel.imageBase64)

      try {
        const response = await axios.put(`http://localhost:8088/hotels/zte/${editedHotel.id}`, formData,{
          headers: {
              'Content-Type': 'multipart/form-data'
          }});
        alert("votre donnes sont modifier")
        toggleVisibility(hotel.id)
        fetchHotels();
        // Ajoutez ici la logique pour gérer la réponse du serveur si nécessaire
      } catch (error) {
        console.error("Error updating hotel:", error);
      }
    };

    return (
      <div className="cg">
        {isVisible === hotel.id && (
          <div className="cm">
            <div className="cmc">
              <div className="headform">
                <img src={logo}/>
                
                <button onClick={() => toggleVisibility(hotel.id)}> X</button>
              </div>

              <form onSubmit={handleSubmit} className="form">
                <div>
                  <label htmlFor="id">identifiant d'hôtel{" (readOnly)"}</label>
                  <input id="id" required type="number" readOnly value={editedHotel.id} />
                </div>

                <div>
                  <label htmlFor="nom"> Nom d'hôtel</label>
                  <input type="text"  required id="nom" value={editedHotel.nom} onChange={handleChange} />
                </div>

                <div>
                <label htmlFor="adresse">Adresse d'hôtel</label>
                  <input type="text" required id="adresse" value={editedHotel.adresse} onChange={handleChange} />
                </div>

                <div>
                <label htmlFor="ville"> Ville d'hôtel:</label>
                  <input type="text"  required id="ville" value={editedHotel.ville} onChange={handleChange} />
                </div>

                <div>
                <label  title="image" htmlFor="imageBase64" className="labelFile">
                <RiUploadCloud2Line className="icon" /> importer Image
                 
                </label>
                
                <input type="file" style={{display:"none"}} id="imageBase64" onChange={(e) =>{ setEditedHotel({ ...editedHotel, imageBase64: e.target.files[0] })
                
              }} />
                </div>

                <button type="submit"  disabled={ isDisabled}> <GrUpdate className="icon"></GrUpdate>modifier </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }



  const handleView = (hotelId) => {
    console.log(`View hotel with id: ${hotelId}`);
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="my-4">
            <div className="card-header p-0 position-relative mt-n4 mx-3">
              <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                <h6 className="text-white text-capitalize ps-3">
                  Table des hotels
                </h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <table className="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Id
                      </th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                        Nom
                      </th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Adresse
                      </th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Ville
                      </th>
                      <th className="text-secondary opacity-7">Image</th>
                      <th className="text-secondary opacity-7">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hotels.map((hotel) => (
                      <tr key={hotel.id} >
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
                            onClick={() => toggleVisibility(hotel.id)}
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
                            onClick={() => handleView(hotel.id)}
                          >
                            👁️
                          </span>
                          
                        </td>

                        <ToggleContent1 hotel={hotel} />
                      </tr>
                      
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default HotelTable;
