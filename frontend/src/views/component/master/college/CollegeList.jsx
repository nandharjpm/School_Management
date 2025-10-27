import { useEffect, useState } from "react";

export default function CollegeList(){
    const [college, setCollege] = useState([]);

    useEffect(()=>{
        fetchCollegeList();
    },[])

    const fetchCollegeList = () =>{

    }
}