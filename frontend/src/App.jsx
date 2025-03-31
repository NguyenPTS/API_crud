import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DataTable from "react-data-table-component";

const fetchItems = async () => {
    const { data } = await axios.get("http://localhost:5000/api/items");
    return data;
};

function App() {
    const { data = [], error, isLoading } = useQuery({
        queryKey: ["items"],
        queryFn: fetchItems,
    });

    if (isLoading) return <p className="text-center text-lg font-bold">Loading...</p>;
    if (error) return <p className="text-center text-red-500 font-bold">Error: {error.message}</p>;

    // Định nghĩa cột của bảng
    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
            width: "80px",
        },
        {
            name: "Tên sản phẩm",
            selector: (row) => row.name,
            sortable: true,
            grow: 2,
        },
        {
            name: "Giá",
            selector: (row) => `$${row.price}`,
            sortable: true,
            right: true,
        },
    ];

    return (
        <div className="max-w-4xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">Danh sách Items</h1>
            <DataTable
                columns={columns}
                data={data}
                pagination
                highlightOnHover
                striped
            />
        </div>
    );
}

export default App;
