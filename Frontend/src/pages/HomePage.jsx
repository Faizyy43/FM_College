import React from 'react'
import TopCourses from '../components/HomeComponents/TopCourses'
import StudybyDistrict from '../components/HomeComponents/StudybyDistrict'
import Admissions from '../components/HomeComponents/Admissions'

import SearchSection from '../components/HomeComponents/SearchSection'
import ProgramSection from '../components/HomeComponents/ProgramSection'







const HomePage = () => {
  return (
    <>
       <SearchSection/> 
       <ProgramSection/>     
       <Admissions/> 
       <StudybyDistrict/>
       {/* <TopCourses/> */}
     
 

       
      

     
      
    </>
  )
}

export default HomePage
