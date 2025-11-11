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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";


export default function StaffAdd() {
  const { control, register, handleSubmit, formState: { errors }} = useForm();
  const navigate = useNavigate();
  const [locations, setLocation] = useState([]);
  const [college, setCollege] = useState([]);
  const [department, setDepartment] = useState([]);
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

  const onSubmit = async (data) => {
    try {
      const result = await axios.post(`${api}/staff-submit`, data);
      if (result.status === 201) {
        toast.success("Staff is Created");
      }
    } catch (err) {
      toast.error("Something went Wrong");
      console.log(err);
    }
    navigate("/staff/list");
  };

  const user_role = [
    {value:"1", label:"Admin"},
    {value:"2", label:"Principal"},
    {value:"3", label:"HOD"},
    {value:"4", label:"Tutor"},
    // {value:"5", label:"Student"},
  ];


  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Poppins', sans-serif", color: "#fff"}}>
      <Header />
      <LeftMenu />
      <div style={{ marginTop: 120, marginLeft: 100, boxShadow: "0 5px 18px 0 rgba(0, 0, 0, 0.37)", padding: 40, height: "90%", width: "70%", borderRadius: "20px"}}>
        <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "5px"}}>
          <Backbutton onClick={() => navigate("/staff/list")} />
        </div>

        <p className="text-center text-2xl"
          style={{ backgroundColor: "#cfcfcfff", padding: "8px", marginBottom: "8px", borderRadius: "5px", color: "#000", fontWeight: "600"}}
        >
          Staff Add
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
                      options={locations.map((loc) => ({
                        value: loc._id,
                        label: loc.location,
                      }))}
                      placeholder="Select Location"
                      isClearable
                      onChange={(selectedOption) => {
                        const selectedValue = selectedOption ? selectedOption.value : '';
                        field.onChange(selectedValue);
                        fetchCollege(selectedValue)
                      }}
                      value={
                        locations
                          .map((loc) => ({ value: loc._id, label: loc.location }))
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
                    options={college?.map((col) => ({
                      value: col._id,
                      label: col.college,
                    })) || []}
                    placeholder="Select College"
                    isClearable
                    onChange={(selectedOption) => {
                      const selectedValue = selectedOption ? selectedOption.value : "";
                      field.onChange(selectedValue);
                      DepartmentList(selectedValue);
                    }}

                    value={
                      college?.map((col) => ({ value: col._id, label: col.college }))
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

              {errors.college && (
                <p style={{ color: "red", marginTop: "5px" }}>
                  {errors.college.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="staff_name"
                style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px"}}
              >
                Staff Name
              </label>

              <input
                type="text"
                id="staff_name"
                {...register("staff_name", {
                  required: "Staff Name is Required",
                  pattern:{
                    value:/^[A-Za-z\s]+$/,
                    message:"Letters Only Allowed"
                  }
                })}
                style={{
                  border: "1px solid rgba(255,255,255,0.2)",
                  width: "100%",
                  padding: "12px 15px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  outline: "none",
                  background: "rgba(255,255,255,0.1)",
                  color: "#000",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) =>
                  (e.target.style.border = "1px solid rgba(0,255,255,0.6)")
                }
                onBlur={(e) =>
                  (e.target.style.border = "1px solid rgba(255,255,255,0.2)")
                }
              />
              {errors.staff_name && (
                <p style={{ color: "red", marginTop: "5px" }}>
                  {errors.staff_name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="username"
                style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px"}}
              >
                User name
              </label>

              <input
                type="text"
                id="username"
                {...register("username", {
                  required: "Username is Required",
                  pattern:{
                    value:/^[a-z0-9\s]+$/,
                    message:"Letters Only Allowed"
                  }
                })}
                style={{
                  border: "1px solid rgba(255,255,255,0.2)",
                  width: "100%",
                  padding: "12px 15px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  outline: "none",
                  background: "rgba(255,255,255,0.1)",
                  color: "#000",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) =>
                  (e.target.style.border = "1px solid rgba(0,255,255,0.6)")
                }
                onBlur={(e) =>
                  (e.target.style.border = "1px solid rgba(255,255,255,0.2)")
                }
              />
              {errors.username && (
                <p style={{ color: "red", marginTop: "5px" }}>
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="college"
                style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px"}}
              >
                DOB
              </label>
                <Controller 
                    name="dob"
                    control={control}
                    rules={{required:"Date of Birth is Required"}}
                    render={({field})=>(
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            {...field}
                            label=""
                            value={field.value || null}
                            minDate={dayjs().subtract(90, "year")}
                            maxDate={dayjs().subtract(25,"year")}
                            onChange={(newValue)=>field.onChange(newValue)}
                            sx={{ width: "100%" }}
                        />
                        </LocalizationProvider>
                    )}
                />
                {errors.dob && (
                    <p style={{ color: "red", marginTop: "5px" }}>
                        {errors.dob.message}
                    </p>
                )}
            </div>


            <div>
              <label
                htmlFor="Email"
                style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px"}}
              >
                Email
              </label>

              <input
                type="text"
                id="email"
                {...register("email", {
                  required: "email is Required",
                })}
                placeholder="email@school.com"
                style={{
                  border: "1px solid rgba(255,255,255,0.2)",
                  width: "100%",
                  padding: "12px 15px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  outline: "none",
                  background: "rgba(255,255,255,0.1)",
                  color: "#000",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) =>
                  (e.target.style.border = "1px solid rgba(0,255,255,0.6)")
                }
                onBlur={(e) =>
                  (e.target.style.border = "1px solid rgba(255,255,255,0.2)")
                }
              />
              {errors.email && (
                <p style={{ color: "red", marginTop: "5px" }}>
                  {errors.email.message}
                </p>
              )}
            </div>


            <div>
              <label
                htmlFor="mobile"
                style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px"}}
              >
                Mobile Number
              </label>

              <input
                type="text"
                id="mobile"
                {...register("mobile", {
                  required: "mobile is Required",
                })}
                placeholder="Phone Number"
                style={{
                  border: "1px solid rgba(255,255,255,0.2)",
                  width: "100%",
                  padding: "12px 15px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  outline: "none",
                  background: "rgba(255,255,255,0.1)",
                  color: "#000",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) =>
                  (e.target.style.border = "1px solid rgba(0,255,255,0.6)")
                }
                onBlur={(e) =>
                  (e.target.style.border = "1px solid rgba(255,255,255,0.2)")
                }
              />
              {errors.mobile && (
                <p style={{ color: "red", marginTop: "5px" }}>
                  {errors.mobile.message}
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

              {errors.department && (
                <p style={{ color: "red", marginTop: "5px" }}>
                  {errors.department.message}
                </p>
              )}
            </div>

            <div>
              <label
              htmlFor="user_role"
              style={{
                display: "block",
                fontSize: "1.2rem",
                fontWeight: "500",
                color: "#000",
                marginBottom: "10px",
              }}
              >
              User Role
              </label>
              <Controller
              name="user_role"
              control={control}
              defaultValue=""
              rules={{ required: "User Role is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={user_role.map((role) => ({
                    value: role.value,
                    label: role.label,
                  }))}
                  placeholder="Select User Role"
                  isClearable
                  onChange={(selectedOption) => {
                    const selectedValue = selectedOption ? selectedOption.value : "";
                    field.onChange(selectedValue);
                  }}
                  value={
                    user_role
                      .map((role) => ({
                        value: role.value,
                        label: role.label,
                      }))
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

    {errors.user_role && (
    <p style={{ color: "red", marginTop: "5px" }}>
      {errors.user_role.message}
    </p>
    )}
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
