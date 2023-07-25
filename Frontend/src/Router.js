import {createBrowserRouter, Navigate} from "react-router-dom";
import Header from "./Components/Header/Header";
import ContactUs from "./Pages/ContactUs/ContactUs";
import Features from "./Pages/Home/Features";
import CarouselSection from "./Pages/Home/CarouselSection";
import FocusQuoteSection from "./Pages/Home/FocusQuoteSection";
import InfoSection from "./Pages/Home/InfoSection";
import ServicesSection from "./Pages/Home/ServicesSection";
import Footer from "./Components/Footer/Footer";
import Login from "./Pages/Login/Login";
import About from "./Pages/AboutUs/About";
import AdminHeader from "./Components/AdminHeader/AdminHeader";
import PatientList from "./Pages/PatientList/PatientList";
import AddPatient from "./Pages/AddPatient/AddPatient";
import AddCategory from "./Pages/AddCategory/AddCategory"
import CategoryList from "./Pages/CategoryList/CategoryList"
import Orders from "./Pages/Orders/Orders";
import PatientHeader from "./Components/PatientHeader/PatientHeader";
import AdminMedsDashboard from "./Pages/AdminMedsDashboard/AdminMedsDashboard";
import PatientMedsDashboard from "./Pages/PatientMedsDashboard/PatientMedsDashboard";
import AddMedicine from "./Pages/AddMedicine/AddMedicine";
import PatientOrdersList from "./Pages/PatientOrdersList/PatientOrdersList";
import UpdatePatient from "./Pages/UpdatePatient/UpdatePatient";
import UpdateMedicine from "./Pages/UpdateMedicine/UpdateMedicine";
import SearchHistory from "./Pages/SearchHistory/SearchHistory";
import UpdateCategory from "./Pages/UpdateCategory/UpdateCategory";
import Admin from "./Middleware/Admin";
import Patient from "./Middleware/Patient";
import Authenticated from "./Middleware/Authenticated";

const router = createBrowserRouter([

    {
      path: "/",
      element: [<Header />, <CarouselSection />, <Features />,  <FocusQuoteSection />, <InfoSection />, <ServicesSection />, <Footer />]
    },
    {
      path: "/about",
      element: [<Header />, <About />, <Footer />]
    },
    {
      path: "/contactus",
      element: [<Header />, <ContactUs />, <Footer />]
    },
    
    {
      element: <Authenticated />,
      children: [
        {
          path: "/login",
          element: [<Header />, <Login />, <Footer />]
        },
      ]
    },
    

    {
      element: <Admin />,
      children: [
        {
          path: "/adminMedsDashboard",
          element: [<AdminHeader />, <AdminMedsDashboard />, <Footer />]
        },
        {
          path: "/patientList",
          element: [<AdminHeader />, <PatientList />, <Footer />]
        },
        {
          path: "/addPatient",
          element: [<AdminHeader />, <AddPatient />, <Footer />]
        },
        {
          path: "/categoryList",
          element: [<AdminHeader />, <CategoryList />, <Footer />]
        },
        {
          path: "/addCategory",
          element: [<AdminHeader />, <AddCategory />, <Footer />]
        },
        {
          path: "/orders",
          element: [<AdminHeader />, <Orders />, <Footer />]
        },
        {
          path: "*",
          element: <Navigate to={'/adminMedsDashboard'}/>
        },
        {
          path: "/addMedicine",
          element: [<AdminHeader />, <AddMedicine />, <Footer />]
        },
        {
          path: "/updatePatient",
          element: [<AdminHeader />, <UpdatePatient />, <Footer />],
          children: [
            {
              path: ":id",
              element: [<AdminHeader />, <UpdatePatient />, <Footer />],
            }
          ]
        },
        {
          path: "/updateMedicine",
          element: [<AdminHeader />, <UpdateMedicine />, <Footer />],
          children: [
            {
              path: ":id",
              element: [<AdminHeader />, <UpdateMedicine />, <Footer />],
            }
          ]
        },
        {
          path: "/updateCategory",
          element: [<AdminHeader />, <UpdateCategory />, <Footer />],
          children: [
            {
              path: ":id",
              element: [<AdminHeader />, <UpdateCategory />, <Footer />],
            }
          ]
        },
      ]
    },

    {
      element: <Patient />,
      children: [
        {
          path: "/patientMedsDashboard",
          element: [<PatientHeader />, <PatientMedsDashboard />, <Footer />]
        },
        {
          path: "*",
          element: <Navigate to={'/patientMedsDashboard'}/>
        },
        {
          path: "/patientOrdersList",
          element: [<PatientHeader />, <PatientOrdersList />, <Footer />]
        },
        {
          path: "/searchHistory",
          element: [<PatientHeader />, <SearchHistory/>, <Footer />]
        },
      ]
    }
    
  ]);

export default router;


