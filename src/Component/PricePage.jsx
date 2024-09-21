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
  const { id, name, mandi_location } = state || {};
  if (mandi_location == null) {
    useEffect(() => {
      const fetchCrops = async () => {
        setStatus("loading");
        try {
          const response = await axios.get(
            `https://tpcropprice.as.r.appspot.com/api/crop-prices/by-crop/name/${id}/on-date/${currentDate}`
          );
          setCrops(response.data);
          console.log(crops);
          setStatus("succeeded");
        } catch (err) {
          setError(err.message);
          setStatus("failed");
        }
      };
      fetchCrops();
    }, [id, currentDate]);
  } else {
    useEffect(() => {
      const fetchCrops = async () => {
        setStatus("loading");
        try {
          const response = await axios.get(
            `https://tpcropprice.as.r.appspot.com/api/marketplace/by-marketplace/${id}/on-date/${currentDate}`
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
  }

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
        {mandi_location == null ? (
          crops.length === 0 ? (
            <div className="container_warning">
              <p>Please select another date, no data for this date</p>
              <div>For selecting data, click on the calendar icon</div>
            </div>
          ) : (
            <table className="centered-table">
              <thead>
                <tr>
                  <th>मंडी</th>
                  <th>न्यूनतम मूल्य</th>
                  <th>अधिकतम मूल्य</th>
                  <th>मॉडल मूल्य</th>
                  <th>दिनांक</th>
                </tr>
              </thead>
              <tbody>
                {crops.map((item, index) => (
                  <tr key={index}>
                    <td>
                      {item.marketplaceName == null
                        ? "nill"
                        : item.marketplaceName}
                    </td>
                    <td>
                      {item.priceLowest == null ? "NILL" : item.priceLowest}
                    </td>
                    <td>
                      {item.priceHighest == null ? "NILL" : item.priceHighest}
                    </td>
                    <td>{item.price == null ? "NILL" : item.price}</td>
                    <td>{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : crops.length === 0 ? (
          <div className="container_warning">
            <p>Please select another date, no data for this date</p>
            <div>For selecting data, click on the calendar icon</div>
          </div>
        ) : (
          <table className="centered-table">
            <thead>
              <tr>
                <th>Crop Name</th>
                <th>Lowest Price</th>
                <th>Higest Price</th>
                <th>Modal Price</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {crops.map((item, index) => (
                <tr key={index}>
                  <td>{item.cropName == null ? "NILL" : item.cropName}</td>
                  <td>
                    {item.priceLowest == null ? "NILL" : item.priceLowest}
                  </td>
                  <td>
                    {item.priceHighest == null ? "NILL" : item.priceHighest}
                  </td>
                  <td>{item.price == null ? "NILL" : item.price}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PricePage;

// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { FaCalendarAlt } from "react-icons/fa";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import { setDate } from "../Store/CurrentDateSlice";
// import Loading from "../Pages/Loading";
// import "../styles/PricePage.css";

// import { fetchCrops, formatDate, handleDateChange } from "./PricePageLogic";
// import { useLocation } from "react-router-dom";

// const PricePage = () => {
//   const dispatch = useDispatch();
//   const currentDate = useSelector((state) => state.date.value);
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [crops, setCrops] = useState([]);
//   const [status, setStatus] = useState("idle");
//   const [error, setError] = useState(null);

//   const location = useLocation();
//   const { state } = location;
//   const { id, name, mandi_location } = state || {};

//   useEffect(() => {
//     const fetchData = async () => {
//       setStatus("loading");
//       try {
//         const fetchedCrops = await fetchCrops(id, currentDate, mandi_location);
//         setCrops(fetchedCrops);
//         setStatus("succeeded");
//       } catch (err) {
//         setError(err.message);
//         setStatus("failed");
//       }
//     };
//     fetchData();
//   }, [id, currentDate, mandi_location]);

//   // Handling calendar date change
//   const handleCalendarChange = (date) => {
//     handleDateChange(date, dispatch);
//   };

//   return (
//     <div className="heading_price_table-container">
//       <div className="heading_price">
//         <h1>{name}</h1>
//         <span className="date-icon-container">
//           <span>{currentDate}</span>
//           <div className="icon" onClick={() => setShowCalendar(!showCalendar)}>
//             <FaCalendarAlt />
//           </div>
//           {showCalendar && (
//             <div className="calendar-popup">
//               <Calendar
//                 onChange={handleCalendarChange}
//                 value={new Date(currentDate)}
//               />
//             </div>
//           )}
//         </span>
//       </div>
//       {status === "loading" && <Loading />}
//       {status === "failed" && <p>Error: {error}</p>}
//       {status === "succeeded" && (
//         <div className="table-container">
//           {crops.length === 0 ? (
//             <div className="container_warning">
//               <p>Please select another date, no data for this date</p>
//               <div>For selecting data, click on the calendar icon</div>
//             </div>
//           ) : (
//             <table className="centered-table">
//               <thead>
//                 <tr>
//                   <th>{mandi_location ? "Crop Name" : "Market Place"}</th>
//                   <th>Lowest Price</th>
//                   <th>Highest Price</th>
//                   <th>Modal Price</th>
//                   <th>Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {crops.map((item, index) => (
//                   <tr key={index}>
//                     <td>
//                       {mandi_location ? item.cropName : item.marketplaceName}
//                     </td>
//                     <td>{item.priceLowest}</td>
//                     <td>{item.priceHighest}</td>
//                     <td>{item.price}</td>
//                     <td>{item.date}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PricePage;
