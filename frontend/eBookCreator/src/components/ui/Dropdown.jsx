import React, { useEffect, useRef, useState } from "react";

const Dropdown = ({ trigger, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

            {isOpen && (
                <div
                    className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-200 z-50 overflow-hidden"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                >
                    <div className="py-1" role="none">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

export const DropdownItem = ({ children, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors gap-2"
            role="menuitem"
            tabIndex="-1"
        >
            {children}
        </button>
    );
};

export default Dropdown;