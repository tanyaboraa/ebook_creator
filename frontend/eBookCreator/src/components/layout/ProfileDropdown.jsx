import { ChevronDown, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = ({ isOpen, onToggle, avatar, companyName, email, onLogout }) => {
    const navigate = useNavigate()
    return (
        <div className="relative" onClick={(e) => e.stopPropagation()}>
            {/* Trigger Button */}
            <button
                onClick={onToggle}
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition-all duration-200 cursor-pointer"
            >
                {avatar ? (
                    <img
                        src={avatar}
                        alt="Avatar"
                        className="w-9 h-9 rounded-xl object-cover"
                    />
                ) : (
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-md">
                        <span className="text-white font-semibold text-sm">
                            {companyName?.charAt(0).toUpperCase()}
                        </span>
                    </div>
                )}

                {/* ✅ Name + email shown next to avatar */}
                <div className="text-left hidden sm:block">
                    <p className="text-sm font-semibold text-gray-900 leading-tight">{companyName}</p>
                    <p className="text-xs text-gray-500 leading-tight">{email}</p>
                </div>

                <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">

                    {/* User Info Header */}
                    <div className="px-4 py-3 bg-gradient-to-r from-violet-50 to-purple-50 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            {avatar ? (
                                <img
                                    src={avatar}
                                    alt="Avatar"
                                    className="w-10 h-10 rounded-xl object-cover"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-md flex-shrink-0">
                                    <span className="text-white font-bold text-sm">
                                        {companyName?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">{companyName}</p>
                                <p className="text-xs text-gray-500 truncate">{email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1.5">
                        <button
                            onClick={() => navigate('/profile')}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-600 transition-all duration-200 cursor-pointer"
                        >
                            <User className="w-4 h-4" />
                            View Profile
                        </button>
                    </div>

                    {/* Sign Out */}
                    <div className="border-t border-gray-100 py-1.5">
                        <button
                            onClick={onLogout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-all duration-200 cursor-pointer"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign out
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfileDropdown