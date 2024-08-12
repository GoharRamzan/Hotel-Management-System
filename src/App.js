import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Rooms from './pages/Rooms';
import Bookings from './pages/Bookings';
import Customers from './pages/Customers';
import Staff from './pages/Staff';
import Payments from './pages/Payments';
import Reports from './pages/Reports';
import Sidebar from './components/Sidebar';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

function App() {
  const [user, setUser] = React.useState(null);
  const [userRole, setUserRole] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true); // Added loading state
  const auth = getAuth();

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const userDoc = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          setUserRole(docSnap.data().role);
        }
        setIsLoading(false); // Set loading to false once role is fetched
      } else {
        setUser(null);
        setUserRole(null);
        setIsLoading(false); // Set loading to false if no user
      }
    });

    return () => unsubscribe();
  }, [auth]);

  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner if needed
  }

  if (user === null) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    );
  }

  // Redirect based on user role
  const redirectPath = () => {
    switch (userRole) {
      case 'admin':
        return '/dashboard';
      case 'staff':
        return '/dashboard'; // Adjust if you have a different default page for staff
      case 'user':
        return '/bookings';
      default:
        return '/dashboard'; // Fallback
    }
  };

  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar userRole={userRole} />
        <div className="flex-1 md:ml-64 p-4 bg-gray-100">
          <Routes>
            <Route path="/" element={<Navigate to={redirectPath()} />} />
            {userRole === 'admin' && (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />

              </>
            )}
            {userRole === 'staff' && (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </>
            )}
            {userRole === 'user' && (
              <>
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="*" element={<Navigate to="/bookings" />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
