// // {**😍😍firebase must be installed if not installed will not work😍😍 **}

// import { useContext } from "react";
// import { AuthContext } from "../AuthProvider/AuthProvider";
// import { Navigate, useLocation } from "react-router-dom";

// const PrivecteRoute = ({children}) => {
//     const{user, loading} = useContext(AuthContext);

//     const locaton = useLocation()
//     console.log(locaton.pathname);

//     if(loading){
//         return<div className='ml-44 md:ml-80 lg:ml-[40rem]'>
//                 <img src="https://i.ibb.co/3CrNhVk/icons.gif" alt="" />
//              </div>
//     }

//     if(user){
//         return children;
//     }
//         //  login page jabe
//         return <Navigate state={locaton.pathname} to='/login' replace></Navigate>

// };

// export default PrivecteRoute;