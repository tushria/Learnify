import React from 'react'
import { AppContext } from '../../context/AppContext'
import { useContext,useState } from 'react'
import {Line} from 'rc-progress'
import Footer from '../../components/student/Footer'
const MyEnrollments = () => {
  const { enrolledCourses, calculateCourseDuration, navigate } = useContext(AppContext)
  const [progressArray,setProgressArray] = useState([
    {lectureCompleted:2,totalLecture:4},
    {lectureCompleted:2,totalLecture:4},
    {lectureCompleted:2,totalLecture:4},
    {lectureCompleted:2,totalLecture:4},
    {lectureCompleted:2,totalLecture:4},
    {lectureCompleted:2,totalLecture:4},
    {lectureCompleted:2,totalLecture:4},
    {lectureCompleted:2,totalLecture:4},
    {lectureCompleted:2,totalLecture:4},
    {lectureCompleted:2,totalLecture:4},
    {lectureCompleted:2,totalLecture:4},
    {lectureCompleted:2,totalLecture:4},
    {lectureCompleted:2,totalLecture:4},
    {lectureCompleted:2,totalLecture:4}
  ])

  if (!Array.isArray(enrolledCourses)) {
    return <p className="text-center pt-10 text-gray-500">Loading your enrollments...</p>;
  }
console.log("Enrolled Courses:", enrolledCourses);

  return (
    <>

      <div className='md:px-36 px-8 pt-10'>
        <h1 className='text-2xl font-semibold'>My Enrollment</h1>
        <table className='md:table-auto table-fixed w-full overflow-hidden  mt-10'>
          <thead className='text-gray-900 border-b border-gray-500/20 text-sm
        text-left max-sm:hidden'>
            <tr>
              <th className='px-4 py-3 font-semibold truncate'>Course</th>
              <th className='px-4 py-3 font-semibold truncate'>Duration</th>
              <th className='px-4 py-3 font-semibold truncate'>Completed</th>
              <th className='px-4 py-3 font-semibold truncate'>Status</th>
            </tr>
          </thead>
          <tbody>
          {enrolledCourses.map((course, index) => (
            <tr key={index} className="border-b">
              <td className="flex gap-4 items-center px-4 py-4">
                <img src={course.courseThumbnail} alt="" className='w-14 sm:w-24 md:w-28' />
                
                <div className='flex-1'>
                  <p className='mb-1 max-sm:text-sm'>{course.courseTitle}</p>
                  <Line strokeWidth={2} percentage={progressArray[index] ?(progressArray[index].lectureCompleted*100)/progressArray[index].totalLecture : 0}  className='bg-gray-300 rounded-full'/>
                </div>
              </td>
              <td className="px-4 py-3 max-sm:hidden">
                {calculateCourseDuration(course)}
              </td>
              <td className="px-4 py-3 max-sm:hidden">
                {progressArray[index]&&`${progressArray[index].lectureCompleted}/${progressArray[index].totalLecture}`}
                <span>Lecture</span>
              </td>
              <td className="px-4 py-3 max-sm:text-right">
                <button className='px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 
                max-sm:text-xs text-white' onClick={()=> navigate('/player/' + course._id)}>
                  {progressArray[index] && progressArray[index].lectureCompleted/progressArray[index].totalLecture === 1? 'completed' :'On Going'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
      <Footer/>
    </>

  )
}

export default MyEnrollments
