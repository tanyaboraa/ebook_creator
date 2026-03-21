import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { User, Mail } from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const ProfilePage = () => {
    const { user, updateUser, loading: authLoading } = useAuth();
    const [formData, setFormData] = useState({ name: "", email: "" });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({ name: user.name, email: user.email });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE, {
                name: formData.name,
            });
            updateUser(response.data); // Update user in context
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile.");
        } finally {
            setIsLoading(false);
        }
    };

    if (authLoading) {
        return <div>Loading profile...</div>;
    }

    return (
        <DashboardLayout activeMenu="profile">
            <div className="max-w-2xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold text-slate-800 mb-1">Profile</h1>
                <p className="text-slate-500 mb-8">Manage your account details.</p>

                <div className="bg-white rounded-2xl border border-slate-200 p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <InputField
                            label="Full Name"
                            name="name"
                            type="text"
                            icon={User}
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <InputField
                            label="Email"
                            name="email"
                            type="email"
                            icon={Mail}
                            value={formData.email}
                            disabled // Email is not editable
                        />
                        <div className="flex justify-end pt-2">
                            <Button
                                type="submit"
                                isLoading={isLoading}
                                className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                            >
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ProfilePage;