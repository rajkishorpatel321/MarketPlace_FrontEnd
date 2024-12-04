import axios from "axios";
import {API_URL} from '../Store/utils.JS';

export const CropPriceDataSaveLogic = ({
  items,
  marketPlaceList,
  currentDate,
}) => {
  const [formData, setFormData] = useState({
    dropdown1: "",
    cropData: items.map(() => ({
      cropId: null,
      LowestPrice: null,
      HigestPrice: null,
      Price: null,
    })),
  });

  const dropdownOptions1 = items.map((item) => item.cropName);

  const resetFormData = () => {
    setFormData({
      dropdown1: "",
      cropData: formData.cropData.map(() => ({
        LowestPrice: null,
        HigestPrice: null,
        Price: null,
      })),
    });
  };

  const handleChange = (e, index, field) => {
    const { value } = e.target;
    const updatedCropData = formData.cropData.map((crop, i) =>
      i === index ? { ...crop, [field]: value } : crop
    );

    setFormData({
      ...formData,
      cropData: updatedCropData,
    });
  };

  const fetchExistingData = async (
    marketPlaceID,
    selectedDate,
    marketPlaceValue
  ) => {
    try {
      const response = await fetch(
        API_URL+`/api/marketplace/by-marketplace/${marketPlaceID}/on-date/${selectedDate}`
      );

      if (!response.ok) {
        throw new Error("No existing data found.");
      }

      const existingData = await response.json();

      if (existingData && existingData.length > 0) {
        setFormData({
          ...formData,
          dropdown1: marketPlaceValue,
          cropData: existingData.map((item) => ({
            LowestPrice: item.priceLowest,
            HigestPrice: item.priceHighest,
            Price: item.price,
          })),
        });
      } else {
        resetFormData();
        setFormData({
          ...formData,
          dropdown1: marketPlaceValue,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      resetFormData();
    }
  };

  const handleDropdownChange = (e) => {
    const marketPlaceID = marketPlaceList.indexOf(e.target.value) + 1;
    fetchExistingData(marketPlaceID, currentDate, e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jsonData = formData.cropData.map((data, index) => ({
      cropId: index + 1,
      price: parseFloat(data.Price),
      priceHighest: parseFloat(data.HigestPrice),
      priceLowest: parseFloat(data.LowestPrice),
    }));

    const marketPlaceID = marketPlaceList.indexOf(formData.dropdown1) + 1;
    const apiUrl = API_URL+`/api/crop-prices/save/${marketPlaceID}/on-date/${currentDate}`;

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

      const result = await response.text();

      if (result) {
        const jsonResult = JSON.parse(result);
        console.log("Data successfully sent to the backend:", jsonResult);
      } else {
        console.log("No response body");
      }
    } catch (error) {
      console.error("Error sending data to the backend:", error);
    }
  };

  const handleDateChange = (date) => {
    const formattedDate = formatDate(date);
    dispatch(setDate(formattedDate));
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return {
    handleDropdownChange,
    handleSubmit,
    formData,
    dropdownOptions1,
    handleDateChange,
  };
};
