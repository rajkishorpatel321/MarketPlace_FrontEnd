import axios from "axios";

const fetchCrops = async (id, currentDate, mandi_location) => {
  try {
    const url = mandi_location
      ? `http://localhost:8080/api/marketplace/by-marketplace/${id}/on-date/${currentDate}`
      : `http://localhost:8080/api/crop-prices/by-crop/name/${id}/on-date/${currentDate}`;

    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const handleDateChange = (date, dispatch) => {
  const formattedDate = formatDate(date);
  dispatch({ type: "setDate", payload: formattedDate });
};

export { fetchCrops, formatDate, handleDateChange };
