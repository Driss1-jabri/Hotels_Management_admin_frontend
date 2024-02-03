import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import './Update_view_Folder/ConponentUp.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export default function Hotels() {
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

  const deleteHotel = async (id) => {
    await axios.delete(`http://localhost:9090/hotels/${id}`);
    fetchHotels();
  }

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

    const handleChange = (e) => {
      const { id, value } = e.target;
      setEditedHotel((prevHotel) => ({
        ...prevHotel,
        [id]: value
      }));
      console.log(editedHotel.imageBase64);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
  
  
  formData.append("nom",editedHotel.nom)
  formData.append("image",editedHotel.imageBase64)
  
      try {

        const response = await axios.put(`http://localhost:8088/hotels/zte/${editedHotel.id}`, formData,{
          headers: {
              'Content-Type': 'multipart/form-data'
          }});
        console.log("Hotel updated successfully:", response.data);
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
              <button onClick={() => toggleVisibility(hotel.id)}>Toggle Content</button>
              
              <form onSubmit={handleSubmit}>
                <div>
                  <input id="id" type="number" disabled value={editedHotel.id} />
                </div>

                <div>
                  <input type="text" id="nom" value={editedHotel.nom} onChange={handleChange} />
                </div>

                <div>
                  <input type="text" id="adresse" value={editedHotel.adresse} onChange={handleChange} />
                </div>

                <div>
                  <input type="text" id="ville" value={editedHotel.ville} onChange={handleChange} />
                </div>

                <div>
                <input type="file" name="imageBase64" onChange={(e) => setEditedHotel({ ...editedHotel, imageBase64: e.target.files[0] })} />
                </div>

                <button type="submit" >Envoyer</button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <NavBar nom="hotel" />
      
      <div style={{ marginTop: "5rem" }}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Nom</th>
              <th scope="col">Adresse</th>
              <th scope="col">Ville</th>
              <th scope="col">Image</th>
              <th scope="col">Action</th>
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
                    alt={`Image of ${hotel.nom}`}
                    style={{ width: "50px", height: "50px" }}
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
  );
}
