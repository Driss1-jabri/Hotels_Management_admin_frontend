import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default function Hotels() {
  const [hotels, setHotels] = useState([]);

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

  const deleteHotel = async (id) =>{
    await axios.delete(`http://localhost:8088/hotels/${id}`);
    fetchHotels();
  }
  const handleView = (hotelId) => {
    
    console.log(`View hotel with id: ${hotelId}`);
  };

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
                    onClick={() => handleView(hotel.id)}
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
  );
}
