import React from "react";

const Home: React.FC = () => {
    return (
        <>
            <main className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                <section className="text-center">
                    <h1 className="text-9xl md:text-7xl font-bold mb-2">Welcome</h1>
                    <p className="text-5xl md:text-3xl font-normal mb-2">to our</p>
                    <h2 className="text-7xl md:text-5xl font-bold mb-4">Traffic Manager System</h2>
                    <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto">
                        Manage your lots and tractors with an intuitive interface and powerful tools to maximize your profits.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <button className="bg-white text-blue-600 font-bold py-3 px-12 rounded-full hover:bg-gray-100 transition transform hover:scale-105">
                            Discover
                        </button>
                    </div>
                </section>
            </main>

            <section className="py-20 bg-gray-100 text-gray-900">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-2">Why Us?</h2>
                    <div className="flex flex-wrap justify-center">
                        <div className="max-w-sm p-6 bg-white shadow-lg rounded-lg m-4">
                            <i className="fas fa-boxes text-4xl text-blue-500 mb-4"></i>
                            <h3 className="text-xl font-bold mb-2">Lot Management</h3>
                            <p className="text-gray-600">
                                Efficiently track and manage your lots with advanced tools that help you keep control of your inventory and transactions.
                            </p>
                        </div>
                        <div className="max-w-sm p-6 bg-white shadow-lg rounded-lg m-4">
                            <i className="fas fa-truck text-4xl text-blue-500 mb-4"></i>
                            <h3 className="text-xl font-bold mb-2">Tractor Management</h3>
                            <p className="text-gray-600">
                                Easily manage your fleet of tractors with tools designed to optimize their usage and ensure maximum efficiency.
                            </p>
                        </div>
                        <div className="max-w-sm p-6 bg-white shadow-lg rounded-lg m-4">
                            <i className="fas fa-chart-line text-4xl text-blue-500 mb-4"></i>
                            <h3 className="text-xl font-bold mb-2">Stock Exchange</h3>
                            <p className="text-gray-600">
                                Access and trade stocks seamlessly on our platform, with real-time market data and analysis to make informed decisions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-gray-800 text-white py-6">
                <div className="container mx-auto px-6 text-center">
                    <p>&copy; 2024 Ligne8. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
};

export default Home;