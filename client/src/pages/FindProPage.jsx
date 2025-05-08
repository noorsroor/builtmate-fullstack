import React from 'react'
import ProHeroSection from '../components/ProHeroSection'
import ProCategorySlider from '../components/ProCategorySlider '
import ProLocationFilter from '../components/ProLocationFilter '
import ProList from '../components/ProList'
import { useDispatch, useSelector } from 'react-redux'
import { setLocation, setCategory } from '../redux/filterSlice'

function FindProPage() {
  const dispatch = useDispatch()
  const { location, category, searchQuery } = useSelector((state) => state.filter)

  // Dispatch actions when the user changes the filters
  const handleLocationChange = (newLocation) => {
    dispatch(setLocation(newLocation))
  }

  const handleCategoryChange = (newCategory) => {
    dispatch(setCategory(newCategory))
  }

  console.log(category)
  return (
    <>
    <ProHeroSection/>
    <ProCategorySlider onCategoryChange={handleCategoryChange} />
      <ProLocationFilter 
        location={location} 
        onLocationChange={handleLocationChange} 
      />
      <ProList 
        location={location} 
        category={category} 
        searchQuery={searchQuery} // Pass search query to ProList
      />
    </>
  )
}

export default FindProPage