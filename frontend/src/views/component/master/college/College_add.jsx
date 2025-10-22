import React from "react";
import Header from "../../../admin/admin_panel/Header";
import LeftMenu from "../../../admin/admin_panel/LeftMenu";
import { useForm } from "react-hook-form";

export default function College_add(){
    const {register, handleSubmit, formState:{error}} = useForm();
    const onSubmit = async () => {

    }

    return(
        <div style={{display:"flex"}}>
           <Header />
           <LeftMenu />
           <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{marginTop:90}}>
                <label htmlFor="College Name">College</label>
                <input type="text" name="college_name" id="college_name" />
            </div>
           </form>
        </div>
    );
}