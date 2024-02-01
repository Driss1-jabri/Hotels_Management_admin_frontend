import React, { useEffect, useState } from "react";
import "./Table.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const HotelTable = () => {
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

  const deleteHotel = async (id) => {
    await axios.delete(`http://localhost:8088/hotels/${id}`);
    fetchHotels();
  };

  const handleView = (hotelId) => {
    console.log(`View hotel with id: ${hotelId}`);
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="card my-4">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelTable;
