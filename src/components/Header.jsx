import React from 'react';

const TerraformIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Middle section */}
        <path
            d="M12.042 4.858v9.345l8.089 4.673v-9.345z"
            fill="currentColor"
        />
        {/* Right section */}
        <path
            d="M21.131 9.531l8.089-4.673v9.345l-8.089 4.673z"
            fill="currentColor"
            fillOpacity="0.7"
        />
        {/* Left section */}
        <path
            d="M2.953 4.858l8.089 4.673v9.345l-8.089-4.673z"
            fill="currentColor"
            fillOpacity="0.9"
        />
        {/* Bottom section */}
        <path
            d="M12.042 24.876l8.089 4.673v-9.345l-8.089-4.673z"
            fill="currentColor"
            fillOpacity="0.8"
        />
    </svg>
);

const Header = () => {
    return (
        <header className="bg-slate-600 py-6 mb-8">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-4">
                    <TerraformIcon className="text-white" />
                    <div>
                        <h1 className="text-2xl font-medium text-white">Terraform Plan Viewer</h1>
                        <p className="text-slate-200">
                            Visualize and analyze your infrastructure changes
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
