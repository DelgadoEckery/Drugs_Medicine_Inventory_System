import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import Login from "./pages/Login";
import MedicineList from "./pages/MedicineList";
import MedicineForm from "./pages/MedicineForm";
import MedicineDetails from "./pages/MedicineDetails";

const Protected = ({ children }) =>
    useAuth().token ? children : <Navigate to="/login" replace />;
const Public = () =>
    useAuth().token ? <Navigate to="/medicines" replace /> : <Login />;
export default function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/login" element={<Public />} />
                <Route
                    path="/medicines"
                    element={
                        <Protected>
                            <MedicineList />
                        </Protected>
                    }
                />
                <Route
                    path="/medicines/new"
                    element={
                        <Protected>
                            <MedicineForm />
                        </Protected>
                    }
                />
                <Route
                    path="/medicines/:id"
                    element={
                        <Protected>
                            <MedicineDetails />
                        </Protected>
                    }
                />
                <Route
                    path="/medicines/:id/edit"
                    element={
                        <Protected>
                            <MedicineForm />
                        </Protected>
                    }
                />
                <Route
                    path="*"
                    element={<Navigate to="/medicines" replace />}
                />
            </Routes>
        </AuthProvider>
    );
}
