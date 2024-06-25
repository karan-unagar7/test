import { useEffect, useMemo, useState } from "react";
import Table from "../common/Table";
import { ViewSaleApi } from "../../services/apicall";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Sale() {
  const [saleData, setSaleData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSaleData = async () => {
      try {
        setTimeout(async () => {
          const response = await ViewSaleApi();
          console.log(response.data.data);
          const { data } = response.data;
          setSaleData(data);
          setLoading(false);
        }, 1000);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchSaleData();
  }, []);

  const columns = [
    { header: "Id", accessor: "id" },
    { header: "user id", accessor: "userId" },
    { header: "name", accessor: "name" },
    { header: "product id", accessor: "productId" },
    { header: "quantity", accessor: "quantity" },
    { header: "price", accessor: "price" },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleUpdate(row)}
            className="text-green-700 bg-green-300 py-2 px-3 rounded hover:text-green-900"
          >
            View
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="text-red-700 bg-red-300 py-2 px-3 rounded hover:text-red-900"
          >
            Download Invoice
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        data={saleData}
        loading={loading}
        title="Sales List"
        button={false}
      />
    </>
  );
}

export default Sale;
