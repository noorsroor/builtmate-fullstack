import {createBrowserRouter , RouterProvider} from "react-router-dom";
import {Navbar} from './components/Navbar'
import ScrollToTop from "./components/scrollToTop";
import AdminUsers from './pages/admin/AdminUsers';
import './index.css'
import {
  AboutPage,
  HomePage,
  FindProPage,
  ContactPage,
  IdeasPage,
  ProfilePage, 
  Login,
  Signup,
  AdminDash,
  ProDetails,
  ProJoinForm,
  ShopsPage,
  IdeasDetails,
  AddProjectForm
} from './pages'
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Footer from "./components/Footer";
import SubscriptionPlans from "./pages/SubscriptionPlans";
import AdminProfessionals from "./pages/admin/AdminProfessionals";
import AdminLayout from "./components/AdminLayout";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminProjects from "./pages/admin/AdminProjects";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";


function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
      // Dynamically set the lang attribute on the HTML tag
      document.documentElement.setAttribute('lang', i18n.language);

      // Dynamically update the font based on the language
      if (i18n.language === 'ar') {
          document.body.style.fontFamily = "'Almarai', sans-serif";
      } else {
          document.body.style.fontFamily = "'Inter', sans-serif";
      }
  }, [i18n.language]);

  const router = createBrowserRouter([
    {
      path:'/',
      element: (
        <>
         <ScrollToTop />
          <Navbar />
          <Footer />
        </>
      ),
      children: [
        {
          index:true,
          element: <HomePage/>
        },
        {
          path:'/findPro',
          element:<FindProPage/>
        },
        {
          path:'/proDetails/:id',
          element:<ProDetails/>
        },
        {
          path:'/ideas',
          element: <IdeasPage/>
        },
        {
          path:'/ideas/:id',
          element: <IdeasDetails/>
        },
        {
          path:'/contact',
          element: <ContactPage/>
        },
        {
          path:'/about',
          element: <AboutPage/>
        },
        {
          path:'/profile',
          element:<ProtectedRoute> <ProfilePage/> </ProtectedRoute>
        },
        {
          path:'/joinform',
          element: <ProJoinForm/>
        },
        {
          path:'/add-project',
          element: <AddProjectForm/>
        },
        {
          path:'/plans',
          element: <SubscriptionPlans/>
        },
        {
          path:'/shops',
          element: <ShopsPage/>
        }
      ]
    },
    {
      path:'*',
      element: <NotFound/>
    },
    {
      path:'/login',
      element: <Login/>
    },
    {
      path:'/signup',
      element: <Signup/>
    },
    {
      path: '/admin',
      element:<ProtectedRoute> <AdminLayout /> </ProtectedRoute>, // shared sidebar + outlet here
      children: [
        { index: true, element: <AdminDash /> },
        { path: 'users', element: <AdminUsers /> },
        { path: 'professionals', element: <AdminProfessionals /> },
        { path: 'bookings', element: <AdminBookings/> },
        { path: 'ideas', element: <AdminProjects/> },
        // (add more admin pages easily here)
      ],
    },
  ]);


  return (
    <>
      <RouterProvider router={router}/>   
    </>
  )
}

export default App
