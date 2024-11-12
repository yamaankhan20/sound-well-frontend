import React,{useEffect} from "react";
import Admin from "layouts/Admin.js";
import CardTable from "../../components/Cards/CardTable";
import Router from "next/router";

export default function Dashboard() {
    useEffect(()=>{
        const autherize_token= localStorage.getItem("AuthToken");

        if(!autherize_token){
            Router.replace('/auth/login');
        }
    },[]);



  return (
      <>
          <div className="flex flex-wrap mt-4">
              <div className="w-full mb-12 px-4">
                  <CardTable/>
              </div>
          </div>
      </>
  );
}

Dashboard.layout = Admin;
