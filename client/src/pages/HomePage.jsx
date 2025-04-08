import React from 'react'
import HeroSection from '../components/HeroSection'
import CategorySection from '../components/CategorySection'
import IdeasCat from '../components/IdeasCat'
import ProCat from '../components/ProCat'
import LocationCat from '../components/LocationCat'
import Footer from '../components/Footer'

function HomePage() {
  return (
    <>
    <HeroSection/>
    <CategorySection/>
    <IdeasCat/>
    <ProCat/>
    <LocationCat/>
    </>
  )
}

export default HomePage