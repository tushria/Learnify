import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import CourseCard from './CourseCard'


const CoursesSection = () => {
  const {allCourses}=useContext(AppContext)

  
  return (
    <div className='py-16 md:px-40 px-8'>
      <h2 className='text-3xl font-medium text-gray-800'>Learn from the best</h2>
      <p className='text-sm md:text-basetext-gray-500 mt-3'> 
        Discover our top-rated courses across various categories. From coding
        and design to business and wellness, out courses are crafted to 
        deliver results.</p>

      <div className="grid grid-rows-4 md:grid-rows-none md:grid-cols-4 px-4 md:px-0 md:my-10 gap-4">
        {allCourses
        .slice(0,4)
        .map((course,index)=>( 
          <CourseCard key={index}
          course={course} />))}
      </div>
          <br />
      <Link to={'/course-list'} onClick={()=> scrollTo(0,0)}
      className='text-gray-500 border border-gray-500/30 px-10 py-3 mt-5'
      >Show all courses</Link>
    </div>
  )
}

export default CoursesSection
