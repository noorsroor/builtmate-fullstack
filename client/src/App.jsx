import {createBrowserRouter , RouterProvider} from "react-router-dom";
import {Navbar} from './components/Navbar'
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
  AddProjectForm
} from './pages'
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Footer from "./components/Footer";
import SubscriptionPlans from "./pages/SubscriptionPlans";


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
          path:'/contact',
          element: <ContactPage/>
        },
        {
          path:'/about',
          element: <AboutPage/>
        },
        {
          path:'/profile',
          element: <ProfilePage/>
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
      path:'/login',
      element: <Login/>
    },
    {
      path:'/signup',
      element: <Signup/>
    },
    {
      path:'/admin',
      element: <AdminDash/>
    }
  ]);


  return (
    <>
      <RouterProvider router={router}/>   
    </>
  )
}

export default App
