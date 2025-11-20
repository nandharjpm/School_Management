import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Backbutton from "../../../utils/components/Backbutton";
import Submitbutton from "../../../utils/components/Submitbutton";
import Header from "../../admin/admin_panel/Header";
import LeftMenu from "../../admin/admin_panel/LeftMenu";
import { useState } from "react";

export default function NoticeBoardAdd() {
  const {register,handleSubmit,formState: { errors }} = useForm();
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  const api = import.meta.env.VITE_API_URL;
  const onSubmit = async (data) => {
    try {
        const formData = new FormData();
        formData.append("announcement", data.anouncement);
        formData.append("anouncement_image", data.announcement_image);

        const result = await axios.post(`${api}/noticeboard-submit`, formData, {headers:{"Content-Type":"multipart/form-data"}});
        if (result.status == 201) {
            toast.success("Anouncement is Created");
            navigate("/noticeboard");
        }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div
      style={{ display: "flex", minHeight: "100vh", fontFamily: "'Poppins', sans-serif", color: "#fff",
      }}
    >
      <Header />
      <LeftMenu />
      <div
        style={{ marginTop: 120, marginLeft: 100, boxShadow: "0 5px 18px 0 rgba(0, 0, 0, 0.37)", padding: 40, width: "70%", height: "90%", borderRadius: "20px"}}
      >
        <div
          style={{ display: "flex", justifyContent: "flex-start", marginBottom: "5px"}}
        >
          <Backbutton onClick={() => navigate("/noticeboard")} />
        </div>
        <p
          className="text-center text-2xl"
          style={{ backgroundColor: "#cfcfcfff", padding: "8px", marginBottom: "8px", borderRadius: "5px",
          }}
        >
          Anouncement
        </p>
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "30px" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <textarea
              id="announcement"
              {...register("announcement", {
                required: "This Field is Required",
                pattern: {
                  value: /^[A-Za-z0-9\s]+$/,
                  message: "Letters and numbers only allowed",
                },
              })}
              rows={6}
              cols={20}
              style={{
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "12px 15px",
                borderRadius: "12px",
                fontSize: "16px",
                outline: "none",
                background: "rgba(255,255,255,0.1)",
                color: "#000000",
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

            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{ marginTop: "15px", width: "100px", height: "100px", objectFit: "cover", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                }}
              />
            )}

            <input
              type="file"
              accept="image/*"
              {...register("announcement_image", {
                required: "Please upload an image",
              })}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setPreview(URL.createObjectURL(file));
                }
              }}
              style={{ border: "1px solid rgba(255, 0, 0, 0.2)", padding: "10px", borderRadius: "12px", width: "25%", background: "rgba(255,255,255,0.1)", color: "#000", cursor: "pointer",
              }}
            />
          </div>

          {errors.anouncement && (
            <p style={{ color: "red", position: "absolute", marginTop: "5px" }}>
              {errors.location.message}
            </p>
          )}

          <div style={{display:"flex", justifyContent:"end"}}>
          <Submitbutton />
          </div>
        </form>
      </div>
    </div>
  );
}
