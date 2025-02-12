'use client'

import React, { useState, useEffect } from 'react';
import { collection, auth, db, getDocs, where, query, updateDoc, deleteDoc, addDoc, doc } from '@/app/firebase/config';
import { signOut, onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export const Dash = () => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [products, setProducts] = useState<{ id: string; name: string; quantity: string }[]>([]);
    const [searchTerm, setSearchTerm] = useState('')
    const router = useRouter()

    const fetchProducts = async (uid: string, searchTerm: string = '') => {
        const productsCollection = collection(db, 'users', uid, 'products');
        const productSnapshot = await getDocs(productsCollection);
    
        const productList = productSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                quantity: data.quantity
            };
        });

        const filteredProducts = productList.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
        setProducts(filteredProducts);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                fetchProducts(user.uid)
            } else {
                router.push('/sign-in')
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [auth, router])

    const handleLogout = async () => {
        try {
            await signOut(auth)
            router.push('/sign-in')
        } catch (error) {
            console.log(error)
        }
    } 

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !quantity) {
            alert('Please fill out all fields.');
            return;
        }
        if (user) {
            const productRef = collection(db, 'users', user?.uid, 'products');
            await addDoc(productRef, {
                name,
                quantity,
                createdAt: new Date(),
            });
            setName('');
            setQuantity('');
            fetchProducts(user?.uid);
        }
    };

    const handleUpdate = async (id: string) => {
        const newQuantity = prompt('Enter the new quantity:');
        if (newQuantity && user) {
            const productRef = doc(db, 'users', user?.uid, 'products', id);
            await updateDoc(productRef, { quantity: newQuantity });
            fetchProducts(user?.uid);
        }
    };

    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
        if (confirmDelete && user) {
            const productRef = doc(db, 'users', user?.uid, 'products', id);
            await deleteDoc(productRef);
            fetchProducts(user?.uid);
        }
    };

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div className="bg-white py-6 sm:py-8 lg:py-12 min-h-screen">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                <div className="flex flex-col items-center rounded-lg bg-gray-100 p-4 sm:p-8 lg:flex-row lg:justify-between">
                    <div className="mb-4 sm:mb-8 lg:mb-0">
                        <h2 className="text-center text-xl font-bold text-indigo-500 sm:text-2xl lg:text-left lg:text-3xl">Welcome, {user?.displayName}</h2>
                        <p className="text-center text-gray-500 lg:text-left">{user?.email}</p>
                    </div>

                    <div className="flex flex-col items-center lg:items-end">
                        <button onClick={handleLogout} className="inline-block rounded bg-indigo-500 px-8 py-2 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Log Out</button>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-lg my-4">
                <input
                    type="text"
                    placeholder="Search for a product"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        if (user) fetchProducts(user.uid, e.target.value);
                    }}
                    className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                />
            </div>


            <div className="py-8">
                <form onSubmit={handleCreate} className="mx-auto max-w-lg rounded-lg border p-8">
                    <div className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="name" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Product Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                            />
                        </div>

                        <div>
                            <label htmlFor="quantity" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Quantity</label>
                            <input 
                                type="number" 
                                id="quantity" 
                                value={quantity} 
                                onChange={(e) => setQuantity(e.target.value)} 
                                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-500 text-white text-center text-sm font-semibold py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>


            <div className="p-4 sm:p-8 mb-4 mx-auto max-w-screen-2xl px-4 md:px-8">
                <h3 className="text-2xl font-bold text-center text-indigo-500 mb-4">Inventory List</h3>
                <div className="space-y-4">
                        {products.map((product) => (
                        <div key={product.id} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
                            <div>
                                <p className="text-lg font-semibold text-gray-800">{product.name}</p>
                                <p className="text-gray-600">Quantity: {product?.quantity}</p>
                            </div>
                            <div className="flex gap-4">
                                <button 
                                    onClick={() => handleUpdate(product.id)} 
                                    className="bg-indigo-500 text-white text-center text-sm font-semibold px-4 py-2 rounded-lg hover:bg-indigo-600"
                                >
                                    Update
                                </button>
                                <button 
                                    onClick={() => handleDelete(product.id)} 
                                    className="bg-red-500 text-white text-center text-sm font-semibold px-4 py-2 rounded-lg hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
