import React, { useState } from 'react';
import { Bell, Mail, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tabs = [
    'Your Orders',
    'Buy Again',
    'Prime',
    'Wish Lists',
    'Your Account'
];

export default function StandardDashboard() {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Greeting Bar */}
            <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
                <h1 className="text-lg font-medium">Hello, Vishal</h1>
                <div className="flex space-x-4">
                    <Bell className="w-5 h-5 cursor-pointer" />
                    <Mail className="w-5 h-5 cursor-pointer" />
                    <HelpCircle className="w-5 h-5 cursor-pointer" />
                </div>
            </header>

            {/* Tabs */}
            <nav className="bg-white border-b">
                <ul className="flex px-6">
                    {tabs.map(tab => (
                        <li key={tab} className="mr-6">
                            <button
                                className={`py-3 text-sm font-medium ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="grid grid-cols-12 gap-6 px-6 py-8">
                {/* Side Quick Links */}
                <aside className="col-span-3 bg-white p-4 rounded-lg shadow">
                    <nav className="space-y-3">
                        <Button variant="ghost" block>Orders</Button>
                        <Button variant="ghost" block>Payments</Button>
                        <Button variant="ghost" block>Addresses</Button>
                        <Button variant="ghost" block>Subscriptions</Button>
                        <Button variant="ghost" block>Gift Cards</Button>
                    </nav>
                </aside>

                {/* Main Content Area */}
                <main className="col-span-9 space-y-6">
                    {activeTab === 'Your Orders' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Orders</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {/* Placeholder for order items */}
                                <p className="text-sm text-gray-600">You have no recent orders.</p>
                                <Button className="mt-4">View all orders</Button>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === 'Wish Lists' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Your Wish Lists</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600">Default List, Birthday Gifts, etc.</p>
                                <Button className="mt-4">Create new list</Button>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === 'Prime' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Prime Membership</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600">Member since Jan 2023 • Renewal: Dec 2024</p>
                                <Button className="mt-4">Manage membership</Button>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === 'Your Account' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Account Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button variant="outline" block>Profile & security</Button>
                                <Button variant="outline" block>Login & security</Button>
                                <Button variant="outline" block>Payment methods</Button>
                                <Button variant="outline" block>Manage addresses</Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Recommendations Carousel */}
                    <section className="relative">
                        <h2 className="text-lg font-semibold mb-4">Recommendations for you</h2>
                        <div className="flex items-center">
                            <button className="p-2 rounded-full hover:bg-gray-200"><ChevronLeft /></button>
                            <div className="flex space-x-4 overflow-x-auto py-2">
                                {[...Array(5)].map((_, i) => (
                                    <Card key={i} className="w-40 flex-shrink-0">
                                        <CardContent className="text-center">
                                            <div className="h-24 bg-gray-100 mb-2" />
                                            <p className="text-sm font-medium">Product {i + 1}</p>
                                            <p className="text-sm text-gray-500">$XX.XX</p>
                                            <Button size="sm" className="mt-2">Add to Cart</Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                            <button className="p-2 rounded-full hover:bg-gray-200"><ChevronRight /></button>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
