import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { setDate } from "../Store/CurrentDateSlice";
import Loading from "../Pages/Loading";
import "../styles/PricePage.css";

const PricePage = () => {
  const dispatch = useDispatch();
  const currentDate = useSelector((state) => state.date.value);
  const [showCalendar, setShowCalendar] = useState(false);
  const [crops, setCrops] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const location = useLocation();
  const { state } = location;
  const { id, name } = state || {};

  useEffect(() => {
    const fetchCrops = async () => {
      setStatus("loading");
      try {
        const response = await axios.get(
          `http://localhost:8080/api/crop-prices/by-crop/name/${id}/on-date/${currentDate}`
        );
        setCrops(response.data);
        setStatus("succeeded");
      } catch (err) {
        setError(err.message);
        setStatus("failed");
      }
    };
    fetchCrops();
  }, [id, currentDate]);

  const handleDateChange = (date) => {
    const formattedDate = formatDate(date);
    dispatch(setDate(formattedDate)); // Update the date in Redux store
    setShowCalendar(false); // Close the calendar
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  if (status === "loading") return <Loading />;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="heading_price_table-container">
      <div className="heading_price">
        <h1>{name}</h1>
        <span className="date-icon-container">
          <span>{currentDate}</span>
          <div className="icon" onClick={() => setShowCalendar(!showCalendar)}>
            <FaCalendarAlt />
          </div>
          {showCalendar && (
            <div className="calendar-popup">
              <Calendar
                onChange={handleDateChange}
                value={new Date(currentDate)}
              />
            </div>
          )}
        </span>
      </div>
      <div className="table-container">
        <table className="centered-table">
          <thead>
            <tr>
              <th>Market Place</th>
              <th>Price</th>
              <th>Date</th>
              <th>Column 4</th>
            </tr>
          </thead>
          <tbody>
            {crops.map((item, index) => (
              <tr key={index}>
                <td>{item.marketplaceName}</td>
                <td>{item.price}</td>
                <td>{item.date}</td>
                <td>Row {index + 1} - Col 4</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PricePage;
