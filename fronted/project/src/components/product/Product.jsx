import { useEffect, useMemo, useState } from "react";
import Table from "../common/Table";
import { DeleteProductApi, ViewProductApi } from "../../services/apicall";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Product() {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setTimeout(async () => {
          const response = await ViewProductApi();
          console.log(response.data.data);
          const { data } = response.data;
          setProductData(data);
          setLoading(false);
        }, 1000);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchProductData();
  }, []);

  const handleUpdate = (row) => {
    navigate("/product/editproduct", { state: row.id });
  };

  const handleDelete = async (row) => {
    try {
      const response = await DeleteProductApi(row.id);
      productData.map((product) =>
        product.id !== row.id
          ? product
          : setProductData(
              productData.filter((product) => product.id !== row.id)
            )
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const columns = [
    { header: "Id", accessor: "id" },
    { header: "Product name", accessor: "product_name" },
    { header: "Product description", accessor: "product_description" },
    { header: "Product category", accessor: "product_category" },
    { header: "Product quantity", accessor: "product_quantity" },
    { header: "Product price", accessor: "product_price" },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleUpdate(row)}
            className="text-green-700 bg-green-300 py-2 px-3 rounded hover:text-green-900"
          >
            Update
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="text-red-700 bg-red-300 py-2 px-3 rounded hover:text-red-900"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        data={productData}
        loading={loading}
        title="Product List"
        button={true}
      />
    </>
  );
}

export default Product;
