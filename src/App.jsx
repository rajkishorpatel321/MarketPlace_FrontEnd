import "bootstrap/dist/css/bootstrap.min.css";

import AppLayout from "./AppLayout/AppLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PricePage from "./Component/PricePage";
import Containt from "./Component/Containt";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import MarketPlaceComponent from "./Component/MarketPlaceComponent";
import ContainerLayout from "./AppLayout/ContainerLayout";
import CropPriceDataSave from "./InputWeb/CropPriceDataSave";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <ContainerLayout />,
        },
        {
          path: "/pricePage",
          element: <PricePage />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/saveCrop",
          element: <CropPriceDataSave />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
