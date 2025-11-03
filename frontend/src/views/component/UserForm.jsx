import Header from "../admin/admin_panel/Header";
import { useForm, Controller } from "react-hook-form";
import Submitbutton from "../../utils/components/Submitbutton";
import LeftMenu from "../admin/admin_panel/LeftMenu";
import { useDropzone } from 'react-dropzone';
import Select from "react-select";


export default function UserForm() {
  const { control, register, handleSubmit, formState: { errors }} = useForm();
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone();


  const api = import.meta.env.VITE_API_URL;
  const roleOptions = [
    {value:"1", label:"Admin"},
    {value:"2", label:"Principal"},
    {value:"3", label:"HOD"},
    {value:"4", label:"Tutor"},
    {value:"5", label:"Student"},
  ];

  const department = [
    {value:"1", label:"B.E Civil"},
    {value:"2", label:"B.E Mechanical"},
    {value:"3", label:"B.Tech Information Technology"},
    {value:"4", label:"B.E Aero Space Engineering"},
    {value:"5", label:"B.E Computer Science Engineering"},
    {value:"6", label:"B.E Electrical Engineering"},
    {value:"7", label:"B.Tech Biomedical Engineering"},
    {value:"8", label:"B.E Chemical Engineering"},
  ];



  return (
    <div
      style={{ display: "flex", minHeight: "100vh", fontFamily: "'Poppins', sans-serif", color: "#fff"}}
    >
      <Header />
      <LeftMenu />
      <div
        style={{ marginTop: 120, marginLeft: 100, boxShadow: "0 5px 18px 0 rgba(0, 0, 0, 0.37)", padding: 40, height: "90%", width: "70%", borderRadius: "20px"}}
      >
        <p
          className="text-center text-2xl"
          style={{ backgroundColor: "#cfcfcfff", padding: "8px", marginBottom: "8px", borderRadius: "5px", color: "#000", fontWeight: "600"}}
        >
          Please Fill The Details For Further
        </p>

        <form style={{ marginTop: "30px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px", alignItems: "start"}}>
            <div>
              <label
                htmlFor="name"
                style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px"}}
              >
                Name
              </label>

              <input
                type="text"
                id="name"
                {...register("name", {
                  required: "Name is Required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Letters Only Allowed",
                  },
                })}
                style={{ border: "1px solid rgba(255,255,255,0.2)", width: "100%", padding: "12px 15px", borderRadius: "12px", fontSize: "16px", outline: "none", background: "rgba(255,255,255,0.1)", color: "#000", boxShadow: "0 4px 15px rgba(0,0,0,0.3)", transition: "all 0.3s ease"}}
                onFocus={(e) =>
                  (e.target.style.border = "1px solid rgba(0,255,255,0.6)")
                }
                onBlur={(e) =>
                  (e.target.style.border = "1px solid rgba(255,255,255,0.2)")
                }
              />
              {errors.name && (
                <p style={{ color: "red", marginTop: "5px" }}>
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="username"
                style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px"}}
              >
                User Name
              </label>

              <input
                type="text"
                id="username"
                {...register("username", {
                  required: "Name is Required",
                  pattern: {
                    value: /^[A-Za-z0-9\s]+$/,
                    message: "Letters and Numbers Only Allowed",
                  },
                })}
                style={{ border: "1px solid rgba(255,255,255,0.2)", width: "100%", padding: "12px 15px", borderRadius: "12px", fontSize: "16px", outline: "none", background: "rgba(255,255,255,0.1)", color: "#000", boxShadow: "0 4px 15px rgba(0,0,0,0.3)", transition: "all 0.3s ease"}}
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
                htmlFor="email"
                style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px",}}
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                {...register("email", {
                  required: "Name is Required",
                })}
                style={{ border: "1px solid rgba(255,255,255,0.2)", width: "100%", padding: "12px 15px", borderRadius: "12px", fontSize: "16px", outline: "none", background: "rgba(255,255,255,0.1)", color: "#000", boxShadow: "0 4px 15px rgba(0,0,0,0.3)", transition: "all 0.3s ease"}}
                onFocus={(e) =>
                  (e.target.style.border = "1px solid rgba(0,255,255,0.6)")
                }
                onBlur={(e) =>
                  (e.target.style.border = "1px solid rgba(255,255,255,0.2)")
                }
              />
              {errors.name && (
                <p style={{ color: "red", marginTop: "5px" }}>
                  {errors.name.message}
                </p>
              )}
            </div>


            <div>
              <label
                htmlFor="role"
                style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px"}}
              >
                Select Role
              </label>
              <Controller
                name="role"
                control={control}
                defaultValue={null}
                render={({ field }) => {
                  const selectedOption = roleOptions.find(option => option.value === field.value) || null;
                  return (
                    <Select
                      {...field}
                      options={roleOptions}
                      placeholder="Select Role"
                      value={selectedOption}
                      onChange={(option) => field.onChange(option ? option.value : null)}
                      styles={{
                        control: (base) => ({
                          ...base, border: "1px solid rgba(255,255,255,0.2)", width: "100%", padding: "8px 15px", borderRadius: "12px", fontSize: "16px", outline: "none", background: "rgba(255,255,255,0.1)", color: "#000", boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                        }),
                        option: (base, state) => ({
                          ...base,
                          border: state.isFocused ? "1px solid #00e1ff" : "1px solid rgba(255,255,255,0.2)",
                          color: "#000",
                        }),
                      }}
                    />
                  );
                }}
              />
            </div>


            <div>
              <label
                htmlFor="role"
                style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px"}}
              >
                Select Department
              </label>
              <Controller
                name="department"
                control={control}
                defaultValue={null}
                render={({field})=>{
                  const selectedDepartment = department.find(option=>option.value === field.value) || null;
                  return(
                    <Select
                      {...field}
                      options={department}
                      placeholder="Select Department"
                      value={selectedDepartment}
                      onChange={(option)=>field.onChange(option ? option.value : null)}
                      styles={{
                        control: (base) => ({
                          ...base, border: "1px solid rgba(255,255,255,0.2)", width: "100%", padding: "8px 15px", borderRadius: "12px", fontSize: "16px", outline: "none", background: "rgba(255,255,255,0.1)", color: "#000", boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                        }),
                        option: (base, state) => ({
                          ...base,
                          border: state.isFocused ? "1px solid #00e1ff" : "1px solid rgba(255,255,255,0.2)",
                          color: "#000",
                        }),
                      }}
                    />
                  )
                }}
              />
            </div>


            <div>
              <label
                htmlFor="phone_no"
                style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px",}}
              >
                Mobile Number
              </label>
              <input
                type="text"
                id="phone_no"
                {...register("phone_no", {
                  required: "Name is Required",
                  pattern:{
                    value:/^[0-9]+$/,
                    message:"Phone Number Must be Number"
                  }
                })}
                style={{ border: "1px solid rgba(255,255,255,0.2)", width: "100%", padding: "12px 15px", borderRadius: "12px", fontSize: "16px", outline: "none", background: "rgba(255,255,255,0.1)", color: "#000", boxShadow: "0 4px 15px rgba(0,0,0,0.3)", transition: "all 0.3s ease"}}
                onFocus={(e) =>
                  (e.target.style.border = "1px solid rgba(0,255,255,0.6)")
                }
                onBlur={(e) =>
                  (e.target.style.border = "1px solid rgba(255,255,255,0.2)")
                }
              />
              {errors.name && (
                <p style={{ color: "red", marginTop: "5px" }}>
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
                <label htmlFor="document" style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px"}}
                >Aadhar Document</label>
                <div {...getRootProps()} style={{ border: "1px solid rgba(255,255,255,0.2)", width: "100%", padding: "20px", borderRadius: "12px", fontSize: "16px",  background: "rgba(255,255,255,0.1)", color: "#000", boxShadow: "0 4px 15px rgba(0,0,0,0.3)" }}>
                  <input {...getInputProps()} />
                  <p style={{color:"#969292ff"}}>Drag & drop files here, or click to select</p>
                  <ul>{acceptedFiles.map(file => <li key={file.name}>{file.name}</li>)}</ul>
                </div>
            </div>
          </div>

          <div
            style={{ marginTop: "40px", display: "flex", justifyContent: "end"}}
          >
            <Submitbutton />
          </div>
        </form>
      </div>
    </div>
  );
}
