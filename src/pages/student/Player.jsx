import React, { useEffect } from 'react'
import {useContext, useState} from 'react'
import {AppContext} from '../../context/AppContext'
import { useParams } from 'react-router-dom'
import humanizeDuration from 'humanize-duration';
import { assets } from '../../assets/assets';
import YouTube from 'react-youtube';
import Footer from '../../components/student/Footer';
import Rating from '../../components/student/Rating';

const Player = () => {
  const {enrolledCourses, calculateChapterTime} = useContext(AppContext)
  const {courseId } = useParams()
  const [courseData, setCourseData] = useState(null)
  const [openSections, setOpenSections]=useState({})
  const [playerData, setPlayerData] = useState(null)

  const getCourseData = ()=>{
    enrolledCourses.map((course)=>{
      if(course._id === courseId)
      setCourseData(course)
    })
  }
  useEffect(()=>{
    getCourseData()
  })
  const toggleSection = (index)=>{
    setOpenSections((prev)=>(
      {...prev,
        [index]:!prev[index],
      }
    ));
  };

  return (
   <>
    <div className='p-4 sm:p-10 flex flex-row md:grid-cols-2 gap-10 md:px-36'>
    <div className='w-300'>
            <div className='text-gray-800'>
        <h2 className='text-xl font-semibold'>Course Structure</h2>
      </div>
                <div className='pt-8 text-gray-800'>
                  <h2 className='text-xl font-semibold'>Course Structure</h2>
                  <div>
                    {courseData?.courseContent?.map((chapter, index) => {
                      return (
                        <div key={index} className='border border-gray-300 bg-white mb-2 rounded'>
                          <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none'
                            onClick={() => {
                              toggleSection(index)
                            }}>
                            <div className='flex items-center gap-2'>
                              <img className={`transform transition-transform ${openSections
                              [index] ? 'rotate-180' : ''}`}
                                src={assets.down_arrow_icon}
                                alt="arrow icon" />
                              <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                            </div>
                            <p className='text-sm md:text-default'>{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}</p>
                          </div>
        
        
                          <div className={`overflow-hidden transition-all duration-300 ${openSections[index] ? 'max-h-[1000px]' : 'max-h-0'} `}>
                            <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                              {chapter.chapterContent.map((lecture, i) => (
                                <li key={i} className='flex items-start gap-2 py-1' >
                                  <img src={false? assets.blue_tick_icon:assets.play_icon}
                                    alt="play icon"
                                    className='w-4 h-2 mt-1' />
                                  <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
                                    <p>{lecture.lectureTitle}</p>
                                    
                                    <div className='flex gap-2'>
                                      {lecture.lectureUrl && 
                                      <p onClick={()=>setPlayerData({
                                        ...lecture,
                                        chapter:index+1,
                                        lecture: i+1,
                                        videoId: lecture.lectureUrl.split('/').pop()
                                      })} 
                                        className='text-blue-500 cursor-pointer'>Watch</p>}
                                      <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}</p>
        
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                 
        
                </div>
                <div className='flex items-center gap-2 py-3 mt-10'>
                  <h1 className='text-xlfont-bold'>Rate this Course:</h1>
                  <Rating initialRating={0}/>
                </div>

    </div>
      {/* right   */}
      <div className='md:mt-10'>
        {playerData ? (
          <div className='w-600'>
            <YouTube
              videoId={playerData.lectureUrl.split('/').pop()} 
              iframeClassName = 'w-full aspect-video'
            />
            <div className='flex justify-between items-center mt-1'>
              <p>
                {playerData.chapter}.{playerData.lecture}.
                {playerData.lectureTitle}
              </p>
              <button  className='text-blue-600'>{false?'completed':'Mark complete'}</button>
            </div>
          </div>
        ):
        
        <img src={courseData ? courseData.courseThumbnail : ''} alt="" />
        }

      </div>
    </div>
      <Footer/>
   </>
  )
}

export default Player
