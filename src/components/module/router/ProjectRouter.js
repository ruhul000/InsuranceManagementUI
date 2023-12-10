import  React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";






const ProjectRouter = createBrowserRouter(
  createRoutesFromElements(
    [
      {
          path:'/',
          element: <div>Hello this is root</div>,
          children:[
            {
              path:'/',
              element:<div>This is child</div>
            },
          ]
          
      },
  ]
  )
)

export default ProjectRouter;


