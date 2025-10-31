import Header from "../admin/admin_panel/Header";
import { useForm } from "react-hook-form";
import Submitbutton from "../../utils/components/Submitbutton";
import LeftMenu from "../admin/admin_panel/LeftMenu";

export default function UserForm() {
  const { register, handleSubmit, formState: { errors }} = useForm();

  const api = import.meta.env.VITE_API_URL;

  return (
      <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Poppins', sans-serif", color: "#fff"}}>
        <Header />
        <LeftMenu />
        <div style={{ marginTop: 120, marginLeft: 100, boxShadow: "0 5px 18px 0 rgba(0, 0, 0, 0.37)", padding: 40, height: "90%", width: "70%", borderRadius: "20px"}}>
  
          <p className="text-center text-2xl"
            style={{ backgroundColor: "#cfcfcfff", padding: "8px", marginBottom: "8px", borderRadius: "5px", color: "#000", fontWeight: "600"}}
          >
            Please Fill The Details For Further
          </p>
  
          <form style={{ marginTop: "30px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px", alignItems: "start"}}>
  
              <div>
                <label htmlFor="name"
                  style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px"}}
                >
                  Name
                </label>
  
                <input
                  type="text"
                  id="name"
                  {...register("name", {
                    required: "Name is Required",
                    pattern:{
                      value:/^[A-Za-z\s]+$/,
                      message:"Letters Only Allowed"
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
                <label htmlFor="username"
                  style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px"}}
                >
                  User Name
                </label>
  
                <input
                  type="text"
                  id="username"
                  {...register("username", {
                    required: "Name is Required",
                    pattern:{
                      value:/^[A-Za-z0-9\s]+$/,
                      message:"Letters and Numbers Only Allowed"
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
                {errors.username && (
                  <p style={{ color: "red", marginTop: "5px" }}>
                    {errors.username.message}
                  </p>
                )}
              </div>



<div>
                <label htmlFor="email"
                  style={{ display: "block", fontSize: "1.2rem", fontWeight: "500", color: "#000", marginBottom: "10px"}}
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
