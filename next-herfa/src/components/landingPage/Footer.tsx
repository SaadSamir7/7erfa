function Footer() {
    return (
        <footer className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.1) 2px, transparent 0)`,
                        backgroundSize: "50px 50px",
                    }}></div>
            </div>

            {/* Gradient Overlays */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-main-500 to-main-600"></div>

            {/* Main Content */}
            <div className="relative z-10 px-6 py-16 lg:px-20">
                {/* Brand Section */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-6 mb-6">
                        <h2 className="font-brand text-5xl font-bold bg-gradient-to-r from-main-500 to-main-600 bg-clip-text text-transparent lg:text-6xl">
                            7erfa
                        </h2>
                        <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-400 to-transparent"></div>
                        <p className="font-brand text-xl font-normal text-gray-300 lg:text-2xl">
                            save your time
                        </p>
                    </div>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Connecting skilled professionals with customers who need
                        their expertise. Building bridges in the world of
                        services.
                    </p>
                </div>

                {/* Links and Copyright Section */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pt-8 border-t border-gray-700/50">
                    {/* Links */}
                    <div className="flex items-center gap-8">
                        <a
                            href="#"
                            className="group relative text-lg font-medium text-gray-300 transition-all duration-300 hover:text-main-400">
                            Privacy Policy
                            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-main-500 to-main-600 transition-all duration-300 group-hover:w-full"></div>
                        </a>
                        <div className="h-6 w-px bg-gray-600"></div>
                        <a
                            href="#"
                            className="group relative text-lg font-medium text-gray-300 transition-all duration-300 hover:text-main-400">
                            Terms of Service
                            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-main-500 to-main-600 transition-all duration-300 group-hover:w-full"></div>
                        </a>
                    </div>

                    {/* Copyright */}
                    <div className="text-center lg:text-right">
                        <p className="text-lg text-gray-400">
                            <strong className="font-brand font-bold bg-gradient-to-r from-main-500 to-main-600 bg-clip-text text-transparent">
                                7erfa Platform
                            </strong>{" "}
                            © 2024 All rights reserved
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            Made with ❤️ by our amazing team
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-main-600 to-main-500"></div>
        </footer>
    );
}

export default Footer;
