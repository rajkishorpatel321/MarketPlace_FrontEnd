import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../Store/dataSlice";
import { MarketPlaceData } from "../Store/MarketPlaceDataSlice";
import { setDate } from "../Store/CurrentDateSlice";
import "./CropPriceDataSave.css";
import { useEffect, useState } from "react";
import Loading from "../Pages/Loading";
import { FaCalendarAlt } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CropPriceDataSave = () => {
  const dispatch = useDispatch();
  const currentDate = useSelector((state) => state.date.value);
  const { items = [], loading, error } = useSelector((state) => state.data);
  const marketPlace = useSelector((state) => state.MarketPlace);
  const [showCalendar, setShowCalendar] = useState(false);

  const [formData, setFormData] = useState({
    dropdown1: "",
    cropData: items.map(() => ({
      cropId: null,
      LowestPrice: "",
      HigestPrice: "",
      Price: "",
    })), // Initialize cropData based on items length
  });

  useEffect(() => {
    dispatch(fetchData());
    dispatch(MarketPlaceData());
  }, [dispatch]);

  // Handle input changes for crop data
  const handleChange = (e, index, field) => {
    const { value } = e.target;
    // Update the specific crop data at the given index
    const updatedCropData = formData.cropData.map((crop, i) =>
      i === index ? { ...crop, [field]: value } : crop
    );

    setFormData({
      ...formData,
      cropData: updatedCropData,
    });
  };

  // Handle dropdown change
  const handleDropdownChange = (e) => {
    console.log(e.target.value);
    setFormData({
      ...formData,
      dropdown1: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Construct JSON object with the required format
    const jsonData = formData.cropData.map((data, index) => ({
      cropId: index + 1, // Assign cropId based on index
      price: parseFloat(data.Price),
      priceHighest: parseFloat(data.HigestPrice),
      priceLowest: parseFloat(data.LowestPrice),
    }));

    console.log("Form submitted with data:", jsonData);

    // Construct the API URL
    const marketPlaceID = 1;
    console.log(marketPlaceID);
    const apiUrl = `http://localhost:8080/api/crop-prices/by-crop/name/${marketPlaceID}/on-date/${currentDate}`;

    // Send the data to the backend
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Data successfully sent to the backend:", result);
    } catch (error) {
      console.error("Error sending data to the backend:", error);
    }
  };

  // Handle date change from calendar
  const handleDateChange = (date) => {
    const formattedDate = formatDate(date);
    dispatch(setDate(formattedDate));
    setShowCalendar(false);
  };

  // Format date to YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  const dropdownOptions1 = items.map((item) => item.cropName);
  const marketPlaceList = marketPlace.items.map((item) => item.location);

  return (
    <div className="form-container">
      <div className="header-container">
        <h1>CropPrice</h1>
        <div className="date-icon-container">
          <span className="current-date">{currentDate}</span>
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
        </div>
      </div>
      <form onSubmit={handleSubmit} className="form-grid">
        <label>
          Market Place Name
          <select
            name="dropdown1"
            value={formData.dropdown1}
            onChange={handleDropdownChange}
            required
          >
            <option value="">Select an option</option>
            {marketPlaceList.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <div className="input-group">
          {dropdownOptions1.map((option, index) => (
            <div key={index} className="input-item">
              <label>
                {option}
                <input
                  type="number"
                  placeholder="Lowest Price"
                  onChange={(e) => handleChange(e, index, "LowestPrice")}
                />
                <input
                  type="number"
                  placeholder="Highest Price"
                  onChange={(e) => handleChange(e, index, "HigestPrice")}
                />
                <input
                  type="number"
                  placeholder="Price"
                  onChange={(e) => handleChange(e, index, "Price")}
                  required
                />
              </label>
            </div>
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CropPriceDataSave;
