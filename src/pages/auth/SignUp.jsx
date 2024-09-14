import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineGithub, AiOutlineGooglePlus } from "react-icons/ai";
import { CiTwitter } from "react-icons/ci";
import { FiFacebook } from "react-icons/fi";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from "react-hook-form";
import { overrideStyle } from "../../utils/Loader/Loader";
import BeatLoader from "react-spinners/BeatLoader";
import swal from "sweetalert";
import { UsePhoto } from "../../hooks/axiosPublic/imageHosting/ImageHosting";
import useAxiosPublic from './../../hooks/axiosPublic/axiosPublic';
import { AuthContext } from "../../utils/provider/AuthProvider";


const SignUp = () => {
    const { signUp, updateUserProfile, loading, setUser } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const navigate = useNavigate();

    // show password function
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        try {
            const imgURL = data.photoURL[0];
            //image host imgbb te
            const img = await UsePhoto(imgURL);
            data.photoURL = img; //data.photoURL aey path a image ta ke set korteci

            await signUp(data.email, data.password) //তোমার signUp ফাংশন একটি Promise রিটার্ন করে, কিন্তু তুমি সেটা .then() ব্লকে ব্যবহার korte pari ba আরও পরিষ্কারভাবে async/await ব্যবহার করতে pari.
            await axiosPublic.post("/userdata", data);

            //update User data
            await updateUserProfile(data.name, data.photoURL)

            setUser((prevUser) => ({   //সাইনআপ করার পর/রিলোড না দিয়ে ইমেজ আপডেট kore UI dekano
                ...prevUser,
                name: data.name,
                photoURL: img,
              }));
            reset();
            swal("YOUR ACCOUNT SUCCESS!", "", "success");
            navigate("/");
        }
        catch (error) {
            // console.error('Error creating account:', error);
            if (error.code === "auth/email-already-in-use") {
                swal("Error", "This email is already registered!", "error"); // Show email exists error
            } else {
                swal("Error", error.message, "error"); // Handle other errors
            }
        }


    }
    return (
        <div className='min-w-screen min-h-screen bg-[#161d31] flex justify-center items-center'>
            <div className='w-[430px] text-[#d0d2d6] p-2'>
                <div className='bg-[#283046] p-4 rounded-md'>
                    <h2 className='text-xl mb-3'>Welcome to e-commerce</h2>
                    <p className='text-sm mb-3'>Please register to your account and start your bussiness</p>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className='flex flex-col w-full gap-1 mb-3'>
                            <label htmlFor="name">Name</label>

                            <input {...register("name", { required: true })} placeholder="Your Name" className='px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden' type="text" />

                            {errors.name && (
                                <span className="error-message text-red-500">
                                    Name is required
                                </span>
                            )}
                        </div>

                        <div className='flex flex-col w-full gap-1 mb-3'>
                            <label htmlFor="email">Email</label>

                            <input {...register("email", { required: true })} placeholder="Your Email" className='px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden' type="email" />

                            {errors.email && (
                                <span className="error-message text-red-500">
                                    Email is required
                                </span>
                            )}

                        </div>
                        <div className='flex flex-col w-full gap-1 mb-3'>
                            <label htmlFor="photoURL">Photo</label>
                            <input  type="file"  {...register("photoURL", { required: true })} className="file-input file-input-bordered file-input-info w-full" />
                            {errors.photoURL && (
                                <span className="error-message text-red-500">
                                    photoURL is required
                                </span>
                            )}

                        </div>

                        <div className='flex flex-col  w-full gap-1'>
                            <label htmlFor="password">Password</label>
                            <input  {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                            })}
                                placeholder="password" className='px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden' type={showPassword ? "text" : "password"} />
                            {/* password show Hide */}
                            <span className="relative w-[30px] text-xl flex justify-end -top-8 left-[90%] ">
                                {showPassword ? (
                                    <FaEye
                                        className="hover:cursor-pointer"
                                        onClick={handleShowPassword}
                                    />
                                ) : (
                                    <FaEyeSlash
                                        className="hover:cursor-pointer"
                                        onClick={handleShowPassword}
                                    />
                                )}
                            </span>
                        </div>
                        {errors.password && (
                            <span className="error-message text-red-500">
                                Password must be between 6 and 20 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$&*).

                            </span>
                        )}




                        <div className='flex items-center w-full gap-3 my-3'>
                            <input className='w-4 h-4 text-blue-600 overflow-hidden bg-gray-100 rounded border-gray-300 focus:ring-blue-500' type="checkbox" required />
                            <label htmlFor="checkbox">I agree to privacy policy & terms</label>
                        </div>
                        <button disabled={loading ? true : false} className='bg-blue-500 w-full hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'>
                            {loading ? (
                                <BeatLoader color="#F0AF0E" cssOverride={overrideStyle} />
                            ) : (
                                "Signup"
                            )}
                        </button>
                        <div className='flex items-center mb-3 gap-3 justify-center'>
                            <p>Already have an account ? <Link to='/login'>Signin here</Link></p>
                        </div>
                        <div className='w-full flex justify-center items-center mb-3'>
                            <div className='w-[45%] bg-slate-700 h-[1px]'></div>
                            <div className='w-[10%] flex justify-center items-center'>
                                <span className='pb-1'>Or</span>
                            </div>
                            <div className='w-[45%] bg-slate-700 h-[1px]'></div>
                        </div>
                        <div className='flex justify-center items-center gap-3'>
                            <div className='w-[35px] h-[35px] flex rounded-md bg-orange-700 shadow-lg hover:shadow-orange-700/50 justify-center cursor-pointer items-center overflow-hidden'>
                                <span><AiOutlineGooglePlus /></span>
                            </div>
                            <div className='w-[35px] h-[35px] flex rounded-md bg-indigo-700 shadow-lg hover:shadow-indigo-700/50 justify-center cursor-pointer items-center overflow-hidden'>
                                <span><FiFacebook /></span>
                            </div>
                            <div className='w-[35px] h-[35px] flex rounded-md bg-cyan-700 shadow-lg hover:shadow-cyan-700/50 justify-center cursor-pointer items-center overflow-hidden'>
                                <span><CiTwitter /></span>
                            </div>
                            <div className='w-[35px] h-[35px] flex rounded-md bg-purple-700 shadow-lg hover:shadow-purple-700/50 justify-center cursor-pointer items-center overflow-hidden'>
                                <span><AiOutlineGithub /></span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;