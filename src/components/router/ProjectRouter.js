import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Master from "../layout/Master";
import Dashboard from "../module/Dashboard";


const ProjectRouter = createBrowserRouter([
    {
        path:'/',
        element: <Master/>,
        children: [
            {
              path: "/dashboard",
              element: <Dashboard />,
              
            },
            
        ],
    },
]);

export default ProjectRouter;