import { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db, auth } from '@/app/firebase/config'; 

const useInventoryData = () => {
    const [inventory, setInventory] = useState<{ id: string; name: string; quantity: string }[]>([]);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
            }
        });

        return () => unsubscribeAuth();
    }, []);

    useEffect(() => {
        if (!userId) return;

        const productsCollection = collection(db, 'users', userId, 'products');
        const q = query(productsCollection);

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const updatedInventory = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    name: data.name || '',
                    quantity: data.quantity || '',
                };
            });

            setInventory(updatedInventory);
        });

        return () => unsubscribe();
    }, [userId]);

    return inventory;
};

export default useInventoryData;
