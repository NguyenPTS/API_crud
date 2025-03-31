import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ItemList from "../components/ItemList";

const fetchItems = async () => {
    const { data } = await axios.get("http://localhost:5000/api/items");
    return data;
};

const Home = () => {
    const { data: items = [], isLoading, error } = useQuery({
        queryKey: ["items"],
        queryFn: fetchItems,
    });

    if (isLoading) return <p>Đang tải...</p>;
    if (error) return <p>Lỗi: {error.message}</p>;

    return <ItemList items={items} />;
};

export default Home;
