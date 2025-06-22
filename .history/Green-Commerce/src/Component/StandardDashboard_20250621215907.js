import React, { useState } from 'react';

const tabs = ['Your Orders', 'Buy Again', 'Prime', 'Wish Lists', 'Your Account'];

export default function StandardDashboard() {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Greeting Bar */}
            <header className="flex justify-between items-center bg-white px-6 py-4 shadow">
                <h1 className="text-xl font-semibold">Hello, Vishal</h1>
                <div className="flex space-x-4">
                    <button className="focus:outline-none">🔔</button>
                    <button className="focus:outline-none">✉️</button>
                    <button className="focus:outline-none">❓</button>
                </div>
            </header>

            {/* Tabs Navigation */}
            <nav className="bg-white border-b">
                <ul className="flex px-6">
                    {tabs.map((tab) => (
                        <li key={tab} className="mr-6">
                            <button
                                onClick={() => setActiveTab(tab)}
                                className={`py-3 text-sm font-medium ${activeTab === tab
                                        ? 'border-b-2 border-blue-600 text-blue-600'
                                        : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                {tab}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="flex px-6 py-8 space-x-6">
                {/* Side Quick Links */}
                <aside className="w-1/4 bg-white rounded shadow p-4 space-y-2">
                    {['Orders', 'Payments', 'Addresses', 'Subscriptions', 'Gift Cards'].map((item) => (
                        <button
                            key={item}
                            className="w-full text-left py-2 hover:bg-gray-100 rounded focus:outline-none"
                        >
                            {item}
                        </button>
                    ))}
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 space-y-6">
                    {activeTab === 'Your Orders' && (
                        <div className="bg-white rounded shadow p-4">
                            <h2 className="text-lg font-medium mb-2">Recent Orders</h2>
                            <p className="text-gray-600">You have no recent orders.</p>
                            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded focus:outline-none">
                                View all orders
                            </button>
                        </div>
                    )}

                    {activeTab === 'Wish Lists' && (
                        <div className="bg-white rounded shadow p-4">
                            <h2 className="text-lg font-medium mb-2">Your Wish Lists</h2>
                            <p className="text-gray-600">Default List, Birthday Gifts, etc.</p>
                            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded focus:outline-none">
                                Create new list
                            </button>
                        </div>
                    )}

                    {activeTab === 'Prime' && (
                        <div className="bg-white rounded shadow p-4">
                            <h2 className="text-lg font-medium mb-2">Prime Membership</h2>
                            <p className="text-gray-600">Member since Jan 2023 • Renewal: Dec 2024</p>
                            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded focus:outline-none">
                                Manage membership
                            </button>
                        </div>
                    )}

                    {activeTab === 'Your Account' && (
                        <div className="bg-white rounded shadow p-4 space-y-2">
                            <h2 className="text-lg font-medium mb-2">Account Settings</h2>
                            {['Profile & security', 'Login & security', 'Payment methods', 'Manage addresses'].map((item) => (
                                <button
                                    key={item}
                                    className="w-full text-left py-2 hover:bg-gray-100 rounded focus:outline-none"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Recommendations Carousel */}
                    <section>
                        <h2 className="text-lg font-semibold mb-4">Recommendations for you</h2>
                        <div className="flex space-x-4 overflow-x-auto py-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded shadow p-4 w-40 flex-shrink-0 text-center"
                                >
                                    <div className="h-24 bg-gray-100 mb-2"></div>
                                    <p className="font-medium">Product {i}</p>
                                    <p className="text-gray-500">$XX.XX</p>
                                    <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded focus:outline-none">
                                        Add to Cart
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
