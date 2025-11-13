import React, { useEffect, useState } from "react";
import Header from "../../../admin/admin_panel/Header";
import LeftMenu from "../../../admin/admin_panel/LeftMenu";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Backbutton from "../../../../utils/components/Backbutton";
import Submitbutton from "../../../../utils/components/Submitbutton";
import Select from "react-select";


export default function CourseAdd() {
  const { control, register, handleSubmit, formState: { errors }} = useForm();
  const navigate = useNavigate();
  const [locations, setLocation] = useState([]);
  const [college, setCollege] = useState([]);
  const [department, setDepartment] = useState([]);
  const [courses, setCourse] = useState([{name:""}]);
  const api = import.meta.env.VITE_API_URL;


  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = async () => {
    try {
      const getLocation = await axios.get(`${api}/location`);
      const dropDownLoc = getLocation.data.locationData;
      setLocation(dropDownLoc);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCollege = async (locationId) => {
    try{
      if(!locationId){
        setCollege([]);
        return;
      }
      const getCollege = await axios.post(`${api}/college/location_id/${locationId}`);
      const dropDownCollege = getCollege.data.getCollege;
      
      setCollege(dropDownCollege);
    }catch(err){
        console.log(err);
    }
  }

  const DepartmentList = async (collegeId)=>{
    try{
      if(!collegeId){
        setDepartment([]);
        return;
      }
      const department = await axios.post(`${api}/department/clg_id/${collegeId}`);
      setDepartment(department.data.getDepartment)
    }catch(err){
      console.log(err);
      
    }
  }

  const addCourseField = () => {
    setCourse([...courses, {name:""}]);
  }

  const removeCourseField = (index) => {
    const updateCourses = courses.filter((_,i)=>i !== index);
    setCourse(updateCourses)
  }


  const handleCourseChange = (index, value)=>{
    const updateCourses = [...courses];
    updateCourses[index].name = value;
    setCourse(updateCourses);
  }

  const onSubmit = async (data) => {
    try {
        const payload = {
            ...data, courses:courses.map((c)=>c.name),
        }
      const result = await axios.post(`${api}/course-submit`, payload);
      if (result.status === 201) {
        toast.success("Student is Created");
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err.response.data.message);
    }
    navigate("/course/list");
  };

  const year = [
    {value:1, label:"I-Year"},
    {value:2, label:"II-Year"},
    {value:3, label:"III-Year"},
    {value:4, label:"IV-Year"},
  ]


  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Poppins', sans-serif", color: "#fff"}}>
      <Header />
      <LeftMenu />
      <div style={{ marginTop: 120, marginLeft: 100, boxShadow: "0 5px 18px 0 rgba(0, 0, 0, 0.37)", padding: 40, height: "90%", width: "70%", borderRadius: "20px"}}>
        <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "5px"}}>
          <Backbutton onClick={() => navigate("/course/list")} />
        </div>

        <p className="text-center text-2xl"
          style={{ backgroundColor: "#cfcfcfff", padding: "8px", marginBottom: "8px", borderRadius: "5px", color: "#000", fontWeight: "600"}}
        >
          Course Add
        </p>

        <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "30px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px", alignItems: "start"}}>
            <div>
              <label
                htmlFor="location"
                style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px"}}
              >
                Location
              </label>

                <Controller
                  name="location"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Location is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={locations.map((loc) => ({ value: loc._id, label: loc.location}))}
                      placeholder="Select Location"
                      isClearable
                      onChange={(selectedOption) => {
                        const selectedValue = selectedOption ? selectedOption.value : '';
                        field.onChange(selectedValue);
                        fetchCollege(selectedValue)
                      }}
                      value={locations.map((loc) => ({ value: loc._id, label: loc.location })).find((option) => option.value === field.value) || null}
                      styles={{
                        control: (base) => ({
                          ...base, border: "1px solid rgba(255,255,255,0.2)", width: "100%", padding: "8px 15px", borderRadius: "12px", fontSize: "16px", outline: "none", background: "rgba(255,255,255,0.1)", color: "#000", boxShadow: "0 4px 15px rgba(0,0,0,0.3)", transition: "all 0.3s ease",
                        }),
                        option: (base, state) => ({
                          ...base,
                          border: state.isFocused
                            ? "1px solid #00e1ff"
                            : "1px solid rgba(255,255,255,0.2)",
                          color: "#000",
                        }),
                      }}
                    />
                  )}
                />

              {errors.location && (
                <p style={{ color: "red", marginTop: "5px" }}>
                  {errors.location.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="college"
                style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px"}}
              >
                College
              </label>

              <Controller
                name="college"
                control={control}
                defaultValue=''
                rules={{ required: "College is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={college?.map((col) => ({value: col._id,label: col.college})) || []}
                    placeholder="Select College"
                    isClearable
                    onChange={(selectedOption) => {
                      const selectedValue = selectedOption ? selectedOption.value : "";
                      field.onChange(selectedValue);
                      DepartmentList(selectedValue);
                    }}

                    value={
                      college?.map((col) => ({ value: col._id, label: col.college })).find((option) => option.value === field.value) || null
                    }
                    styles={{
                      control: (base) => ({
                        ...base, border: "1px solid rgba(255,255,255,0.2)", width: "100%", padding: "8px 15px", borderRadius: "12px", fontSize: "16px", outline: "none", background: "rgba(255,255,255,0.1)", color: "#000", boxShadow: "0 4px 15px rgba(0,0,0,0.3)", transition: "all 0.3s ease",
                      }),
                      option: (base, state) => ({
                        ...base,
                        border: state.isFocused
                          ? "1px solid #00e1ff"
                          : "1px solid rgba(255,255,255,0.2)",
                        color: "#000",
                      }),
                    }}
                  />
                )}
              />

              {errors.college && (
                <p style={{ color: "red", marginTop: "5px" }}>
                  {errors.college.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="department"
                style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px"}}
              >
                Department
              </label>

                <Controller
                  name="department"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Department is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={department.map((dep) => ({
                        value: dep._id,
                        label: dep.department,
                      }))}
                      placeholder="Select Department"
                      isClearable
                      onChange={(selectedOption) => {
                        const selectedValue = selectedOption ? selectedOption.value : '';
                        field.onChange(selectedValue);
                      }}
                      value={
                          department
                            .map((dep) => ({ value: dep._id, label: dep.department }))
                            .find((option) => option.value === field.value) || null
                        }
                      styles={{
                        control: (base) => ({
                          ...base, border: "1px solid rgba(255,255,255,0.2)", width: "100%", padding: "8px 15px", borderRadius: "12px", fontSize: "16px", outline: "none", background: "rgba(255,255,255,0.1)", color: "#000", boxShadow: "0 4px 15px rgba(0,0,0,0.3)", transition: "all 0.3s ease",
                        }),
                        option: (base, state) => ({
                          ...base,
                          border: state.isFocused
                            ? "1px solid #00e1ff"
                            : "1px solid rgba(255,255,255,0.2)",
                          color: "#000",
                        }),
                      }}
                    />
                  )}
                />

              {errors.department && (
                <p style={{ color: "red", marginTop: "5px" }}>
                  {errors.department.message}
                </p>
              )}
            </div>

            <div>
              <label
              htmlFor="year"
              style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px"}}
              >
              Year
              </label>
              <Controller
                name="year"
                control={control}
                defaultValue=""
                rules={{ required: "Year is required" }}
                render={({ field }) => (
                    <Select
                    {...field}
                    options={year.map((y) => ({ value: y.value, label: y.label}))}
                    placeholder="Select Year"
                    isClearable
                    onChange={(selectedOption) => {
                        const selectedValue = selectedOption ? selectedOption.value : "";
                        field.onChange(selectedValue);
                    }}
                    value={year
                        .find((option) => option.value === field.value) || null
                    }
                    styles={{
                        control: (base) => ({
                        ...base,
                        border: "1px solid rgba(255,255,255,0.2)",
                        width: "100%",
                        padding: "8px 15px",
                        borderRadius: "12px",
                        fontSize: "16px",
                        outline: "none",
                        background: "rgba(255,255,255,0.1)",
                        color: "#000",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                        transition: "all 0.3s ease",
                        }),
                        option: (base, state) => ({
                        ...base,
                        border: state.isFocused
                            ? "1px solid #00e1ff"
                            : "1px solid rgba(255,255,255,0.2)",
                        color: "#000",
                        }),
                    }}
                    />
                )}
                />

                {errors.year && (<p style={{ color: "red", marginTop: "5px" }}>{errors.year.message}
                </p>
                )}
            </div>


            <div>
              <label
                htmlFor="student_name" style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px"}}
              >
                Course
              </label>

              {courses.map((course, index)=>(
                <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                    <input type="text" 
                        placeholder={`Course${index+1}`}
                        value={course.name}
                        onChange={(e)=>handleCourseChange(index, e.target.value)}
                        style={{
                            flex: 1,
                            border: "1px solid rgba(0,0,0,0.2)",
                            padding: "10px",
                            borderRadius: "8px",
                            fontSize: "16px",
                            background: "rgba(255,255,255,0.9)",
                            color: "#000",
                        }}
                    />
                    {courses.length>1 && (
                        <button
                      type="button"
                      onClick={() => removeCourseField(index)}
                      style={{
                        backgroundColor: "red",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        padding: "0 12px",
                        cursor: "pointer",
                      }}
                    >
                      ×
                    </button>
                    )}
                </div>
              ))}
              <button
                type="button"
                onClick={addCourseField}
                style={{
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  cursor: "pointer",
                }}
              >
                Add Course
              </button>
            </div>

          </div>

          <div style={{ marginTop: "40px", display: "flex", justifyContent: "end"}}>
            <Submitbutton />
          </div>
        </form>
      </div>
    </div>
  );
}
