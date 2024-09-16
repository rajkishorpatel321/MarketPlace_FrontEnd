import Card from "./Card";
import "../styles/Containt.css"; // Ensure this file contains the CSS above
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../Store/dataSlice";
import { useEffect } from "react";
import Loading from "../Pages/Loading";

const Containt = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchData()); // Fetch data when component mounts
  }, [dispatch]);

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  return (
    <>
      <h1 className="heading">फसल के अनुसार मूल्य</h1>
      <div className="containt">
        {items.map((item, index) => (
          <div className="containt_card" key={index}>
            <Card name={item.cropName} id={item.cropId} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Containt;
