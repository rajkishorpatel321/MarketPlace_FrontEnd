import Card from "./Card";
import "../styles/Containt.css"; // Ensure this file contains the CSS above
import { useDispatch, useSelector } from "react-redux";
import { MarketPlaceData } from "../Store/MarketPlaceDataSlice";
import { useEffect } from "react";
import Loading from "../Pages/Loading";

const MarketPlaceComponent = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.MarketPlace);

  useEffect(() => {
    dispatch(MarketPlaceData()); // Fetch data when component mounts
  }, [dispatch]);

  // console.log("Loging the marketplace");
  console.log("loging the market place");
  console.log(items);
  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  return (
    <>
      <h1 className="heading">MarketPlace के अनुसार मूल्य</h1>
      <div className="containt">
        {items.map((item, index) => (
          <div className="containt_card" key={index}>
            <Card
              mandi_location={item.location}
              id={item.marketplaceId}
              name={item.marketplaceName}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default MarketPlaceComponent;
