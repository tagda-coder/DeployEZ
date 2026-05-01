import { ToastContainer, Zoom } from "react-toastify"; 
import { router } from "./app.routes"; 

// Providers
import { RouterProvider } from "react-router";

// styles
import "./app.css";
import { useTheme } from "../features/shared/hook/useTheme";

function App() {
  // const { handleGetMe } = useAuth()

  // const user = useSelector(state => state.auth.user)

  // console.log(user)

  // useEffect(() => {
  //   handleGetMe()
  // }, [])

  const { theme } = useTheme();

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === "dark" ? "light" : "dark"}
        transition={Zoom}
      />
    </>
  );
}

export default App;
