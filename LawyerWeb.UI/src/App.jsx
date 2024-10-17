import React, { useEffect, useState } from "react";
import SmoothScroll from "smooth-scroll";
import "./App.css"
import LoadingPage from "./pages/loadingPage/loadingPage";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Router";
import { useSelector, useDispatch } from 'react-redux'
import { services } from "./services/services";
import { ToastProvider } from "react-toast-notifications";
import { loginFailure, loginSuccess } from "./redux/userSlice";


export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});


const App = () => {

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);


  const loadData = async () => {
    try {
      const token = services.encryptedLocalStorage.getItem("lawyerToken");
      if (token) {
        const userData = await services.user.getUser();
        dispatch(loginSuccess(userData));
      }
    } catch (error) {
      dispatch(loginFailure());
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {
        loading ? <LoadingPage /> :
          <ToastProvider autoDismiss={true}
            autoDismissTimeout={5000}
            className="custom-toast-container">
            <RouterProvider router={router} />
          </ToastProvider>
      }
    </>
  );
};

export default App;
