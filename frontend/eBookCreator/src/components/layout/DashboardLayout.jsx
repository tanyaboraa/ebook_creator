import { useState, useEffect } from "react";
import { Album } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";

const DashboardLayout = ({children}) => {
    const { user, logout } = useAuth();
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = () => {
            if (profileDropdownOpen) {
                setProfileDropdownOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [profileDropdownOpen]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex flex-col">
                <header className="bg-white border-b border-gray-100 sticky top-0 z-50 px-6 py-3">
                    <div className="flex items-center justify-between">
                        <Link className="flex items-center gap-2.5" to="/dashboard">
                            <div className="w-9 h-9 bg-gradient-to-br from-violet-400 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
                                <Album className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-semibold text-gray-900">
                                AI eBook Creator
                            </span>
                        </Link>

                        <div className="flex items-center">
                            <ProfileDropdown
                                isOpen={profileDropdownOpen}
                                onToggle={(e) => {
                                    e.stopPropagation();
                                    setProfileDropdownOpen(!profileDropdownOpen);
                                }}
                                avatar={user?.avatar || ""}
                                companyName={user?.name || ""}
                                email={user?.email || ""}
                                onLogout={logout}
                            />
                        </div>
                    </div>
                </header>

                <main className="flex-1">{children}</main>
            </div>
        </div>
    )
}

export default DashboardLayout