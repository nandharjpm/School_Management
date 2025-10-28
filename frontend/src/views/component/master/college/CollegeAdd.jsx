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

export default function CollegeAdd() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [locations, setLocation] = useState([]);
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

  const onSubmit = async (data) => {
    try {
      const result = await axios.post(`${api}/college-submit`, data);
      if (result.status === 201) {
        toast.success("College is Created");
      }
    } catch (err) {
      toast.error("Something went Wrong");
      console.log(err);
    }
    navigate("/college/list");
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
        color: "#fff",
      }}
    >
      <Header />
      <LeftMenu />

      <div
        style={{
          marginTop: 120,
          marginLeft: 100,
          boxShadow: "0 5px 18px 0 rgba(0, 0, 0, 0.37)",
          padding: 40,
          height: "90%",
          width: "70%",
          borderRadius: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "5px",
          }}
        >
          <Backbutton onClick={() => navigate("/college/list")} />
        </div>

        <p
          className="text-center text-2xl"
          style={{
            backgroundColor: "#cfcfcfff",
            padding: "8px",
            marginBottom: "8px",
            borderRadius: "5px",
            color: "#000",
            fontWeight: "600",
          }}
        >
          College Add
        </p>

        <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "30px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "40px",
              alignItems: "start",
            }}
          >
            <div>
              <label
                htmlFor="location"
                style={{
                  display: "block",
                  fontSize: "1.2rem",
                  fontWeight: "500",
                  color: "#000",
                  marginBottom: "10px",
                }}
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
                      field.onChange(
                        selectedOption ? selectedOption.value : ""
                      );
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
                style={{
                  display: "block",
                  fontSize: "1.2rem",
                  fontWeight: "500",
                  color: "#000",
                  marginBottom: "10px",
                }}
              >
                College Name
              </label>

              <input
                type="text"
                id="college"
                {...register("college", {
                  required: "College Name is Required",
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
              {errors.college && (
                <p style={{ color: "red", marginTop: "5px" }}>
                  {errors.college.message}
                </p>
              )}
            </div>
          </div>

          <div
            style={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Submitbutton />
          </div>
        </form>
      </div>
    </div>
  );
}
