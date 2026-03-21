import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, BookOpen } from "lucide-react";
import toast from "react-hot-toast";

import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const SignupPage = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
          const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, formData);
          const { token } = response.data;
      
          // Fetch profile to get user details
          const profileResponse = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE, {
              headers: { Authorization: `Bearer ${token}` },
          });
      
          login(profileResponse.data, token);
          toast.success("Account created successfully!");
          navigate("/dashboard");
      } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">

            {/* Header */}
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-500/30">
                    <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Create an Account</h1>
                <p className="text-gray-500 mt-2">Start your journey of creating amazing eBooks today.</p>
            </div>

            {/* Form Card */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <InputField
                        label="Full Name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        icon={User}
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <InputField
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        icon={Mail}
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <InputField
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Minimum 6 characters"
                        icon={Lock}
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <Button type="submit" isLoading={isLoading} className="w-full">
                        Create Account
                    </Button>
                </form>

                <p className="text-center text-sm text-slate-600 mt-8">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-violet-600 hover:text-violet-700">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignupPage