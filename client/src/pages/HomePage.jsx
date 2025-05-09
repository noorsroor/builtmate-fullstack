import React from 'react'
import HeroSection from '../components/HeroSection'
import CategorySection from '../components/CategorySection'
import IdeasCat from '../components/IdeasCat'
import ProCat from '../components/ProCat'
import LocationCat from '../components/LocationCat'
import Footer from '../components/Footer'
import IdeasSection from '../components/IdeasSection'
import EducationalSection from '../components/educationalSection'
import SuccessProjects from '../components/SuccessProjects'
import CallToAction from '../components/CallToAction'
import ServicesSection from '../components/ServicesSection'

function HomePage() {
  return (
    <>
    <HeroSection/>
    <ServicesSection/>
    {/* <CategorySection/> */}
    <EducationalSection/>
    <SuccessProjects/>
    <IdeasCat/>
    <ProCat/>
    <IdeasSection/>
    <CallToAction/>
    </>
  )
}

export default HomePage