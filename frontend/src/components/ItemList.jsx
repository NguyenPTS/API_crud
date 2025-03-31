import React from "react";
import DataTable from "react-data-table-component";

const ItemList = ({ items }) => {
    // Định nghĩa các cột cho bảng
    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "Tên sản phẩm",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Giá",
            selector: (row) => `$${row.price}`,
            sortable: true,
        },
    ];

    return (
        <div className="p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4">Danh sách Items</h2>
            <DataTable
                columns={columns}
                data={items}
                pagination  // Bật phân trang
                highlightOnHover  // Hiển thị highlight khi hover
                striped  // Hiển thị kiểu sọc xen kẽ
            />
        </div>
    );
};

export default ItemList;
