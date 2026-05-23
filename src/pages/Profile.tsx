import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile, deleteUser } from 'firebase/auth';
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar/NavBar";
import { getUserOrders } from "../api/orderApi";
import type { Order, OrderItem } from '../types/order'
import ProfileInfo from "../components/ProfileInfo";
import type { UserProfile } from "../types/types";
import { getUserProfile } from "../api/userApi";

const Profile: React.FC = () => {

    const {user} = useAuth()
    const [displayName, setDisplayName] = useState(user?.displayName|| '');
    const [email, setEmail] = useState(user?.email || '');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [orders, setOrders] = useState<Order[]>([]);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     if (!user?.uid) return;

    //     const fetchOrders = async () => {
            

    //         const data = await getUserOrders(user.uid);
    //         setOrders(data);
    //     }
    //     fetchOrders();
    // }, [user?.uid]);

    useEffect(() => {
        if (!user?.uid) return;

        const fetchData = async () => {
            const [ordersData, profileData] = await Promise.all([
                getUserOrders(user.uid),
                getUserProfile(user.uid)
            ]);

            setOrders(ordersData);
            setProfile(profileData);

            setLoading(false);
        }
        fetchData();
    }, [user?.uid]);

    const handleDeleteAccount = async () => {
        try {
            if (!user) {
                setError('User not found');
                return;
            }
            await deleteUser(user);
            setSuccess('Account deleted successfully');
        } catch (error: any) {
            setError(error.message)
        }
    }

    if (!user) return null;

    //if (!profile) return <p>Loading...</p>
    if (loading) return <p>Loading...</p>

    return (
        <div className="bg-warning-subtle pt-5 px-3 vh-100">
            <nav>
              <NavBar />  
            </nav>
            
            <div className='pt-5 flex-columng align-items-center text-center'>
            <h1>Profile</h1>
            <h2>Welcome {user.displayName}</h2>

            {profile ? (

            <ProfileInfo profile={profile} user={user}/>

            ) : (
                <p>No profile created yet.</p>
            )}

            <Link to='/update-profile' className="btn btn-primary">Update Profile</Link>

            <button className='btn btn-danger' onClick={handleDeleteAccount}>Delete Account</button>
            </div>
            <h2 className='text-center p-2'>Your Orders</h2>
            <div className='row g-3'>
                
            {orders.map((order) => (
                <div key={order.orderId} className='col-12 cold-md-6 col-lg-4'>
                    <div className='bg-success-subtle border rounded p-3 mb-2 h-100'>
                    <p>Order ID: {order.orderId}</p>
                    <p>Total: ${order.total}</p>
                    <p>Status: {order.status}</p>
                    <p>Date Ordered: {order.createdAt.toDate().toLocaleDateString()}</p>

                    <ul>
                        {order.items.map((items: OrderItem) => (
                            <li key={items.productId}>
                                {items.title} x {items.quantity}
                            </li>
                        ))}
                    </ul>

                <Link to={`/orderdetails/${order.orderId}`}>View Details</Link>    

                </div>
                </div>
            ))}
            
            </div>
        </div>
    );

};
export default Profile;