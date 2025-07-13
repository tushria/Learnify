import {useContext, useEffect, useState} from 'react'
import Loading from '../../components/student/Loading'
import { AppContext } from '../../context/AppContext'

const MyCourses = () => {
  const{currency, allCourses} = useContext (AppContext)
  const [courses, setCourses] = useState(null)
  const fetchEducatorCourses = async ()=>{
    setCourses(allCourses)
  }
  useEffect(()=>{
    fetchEducatorCourses()
  },[])
  return courses ? (
    <div>
      <h1>My courses</h1>
    </div>
  ) : <Loading/>
}

export default MyCourses
