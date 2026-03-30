import React from 'react'
import { useParams } from 'react-router-dom'

const CoursePage = () => {

    const courseDetails = {

    }

    const {courseId } = useParams();
    const title = courseId.replace(/-/g," ").toUpperCase();
    const description = courseDetails[courseId]  || "Course details coming soon...." ;
  return (
    <div className='p-6'>
        <h1 className='text-3xl font-bold mb-3'>{title}</h1>
        <p className='text-lg text-gray-700'>{description} </p>
        
        
    </div>
  )
}

export default CoursePage
