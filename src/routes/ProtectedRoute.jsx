import { Navigate } from "react-router-dom";
const token = localStorage.getItem("auth_token")
console.log("token", token)
const Protected = ({  children }) => {
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
};
export default Protected;