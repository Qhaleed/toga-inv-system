import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function StudentHomeCard() {
    const [username, setUsername] = useState('Student');
    const navigate = useNavigate();

    // Sample checked out items
    const checkedOutItems = [
        { id: 'LT-234', name: 'MacBook Pro', dueDate: '2025-04-25' },
        { id: 'TB-512', name: 'Advanced Physics Textbook', dueDate: '2025-05-15' }
    ];

    // Simulate fetching student data
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const email = localStorage.getItem('userEmail');
        if (email) {
            setUsername(email.split('@')[0]);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userEmail');
        navigate('/login');
    };

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Student Portal</h1>
                    <div className="flex items-center">
                        <span className="mr-4">Welcome, {username}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                <div className="mb-6">
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Search for equipment..."
                            className="flex-1 border border-gray-300 rounded-l px-4 py-2"
                        />
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-r">
                            Search
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <h2 className="text-xl font-medium mb-4">My Checked Out Items</h2>
                        {checkedOutItems.map(item => (
                            <div key={item.id} className="bg-gray-100 p-4 rounded-lg mb-3">
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="font-medium">{item.name}</h3>
                                        <p className="text-sm text-gray-600">ID: {item.id}</p>
                                    </div>
                                    <div className="text-sm text-right">
                                        <p className="font-medium">Due: {new Date(item.dueDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h2 className="text-xl font-medium mb-4">Quick Request</h2>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <div className="mb-4">
                                <label htmlFor="item-type" className="block mb-1 font-medium">Item Category</label>
                                <select
                                    id="item-type"
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                >
                                    <option value="">Select a category</option>
                                    <option value="laptops">Laptops</option>
                                    <option value="lab-equipment">Lab Equipment</option>
                                    <option value="textbooks">Textbooks</option>
                                    <option value="cameras">Cameras</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="request-notes" className="block mb-1 font-medium">Notes (optional)</label>
                                <textarea
                                    id="request-notes"
                                    rows="3"
                                    placeholder="Any specific requirements..."
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                ></textarea>
                            </div>
                            <button className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                                Submit Request
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-medium mb-4">Available Categories</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        <div className="bg-gray-100 p-4 rounded-lg text-center hover:bg-gray-200 cursor-pointer">
                            <div className="text-2xl mb-2">💻</div>
                            <h3 className="font-medium">Laptops</h3>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg text-center hover:bg-gray-200 cursor-pointer">
                            <div className="text-2xl mb-2">🧪</div>
                            <h3 className="font-medium">Lab Equipment</h3>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg text-center hover:bg-gray-200 cursor-pointer">
                            <div className="text-2xl mb-2">📚</div>
                            <h3 className="font-medium">Textbooks</h3>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg text-center hover:bg-gray-200 cursor-pointer">
                            <div className="text-2xl mb-2">📷</div>
                            <h3 className="font-medium">Cameras</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentHomeCard;