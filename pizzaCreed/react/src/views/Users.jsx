import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        setLoading(true);
        axiosClient
            .get("/users")
            .then(({ data }) => {
                console.log(data);
            })
            .catch(() => {
                setLoading(false);
            });
    };
    

    return (
        <div>
            <div>
                <h1>Users</h1>
                <Link to ="/users/new"> Add new</Link>
            </div>
        </div>
    );
}
