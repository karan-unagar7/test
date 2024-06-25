import { Toaster } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";

function Table({
  // eslint-disable-next-line react/prop-types
  columns,
  data,
  loading,
  title,
  button,
}) {
  const navigate = useNavigate();
  return (
    <section className="bg-gradient-to-r from-indigo-300 to-purple-300 min-h-screen flex items-center justify-center p-8">
      <Toaster position="top-right" />
      <div className="w-full max-w-7xl bg-white rounded-lg shadow-lg px-5 py-6 sm:px-7.5 xl:py-8">
        {button ? (
          <button onClick={() => navigate("/product/addproduct")} className="absolute right-[57px] text-green-700 bg-green-300 py-2 px-3 rounded hover:text-green-900" >
            Create New Product
          </button>
        ):(
          <button onClick={() => navigate("/sale/addsale")} className="absolute right-[57px] text-green-700 bg-green-300 py-2 px-3 rounded hover:text-green-900" >
            Create New Sale
          </button>
        )}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {title}
        </h1>
        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-indigo-500 text-left text-white">
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="min-w-[120px] py-4 px-4 font-medium border text-center border-gray-200"
                  >
                    <button
                      className="flex items-center justify-center"
                      onClick={() => onSort(column.accessor)}
                    >
                      {column.header.toUpperCase()}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="border-b border-gray-200 py-5 px-4"
                  >
                    <Skeleton
                      count={5}
                      height={30}
                      style={{
                        backgroundColor: "#e5e7eb",
                        borderRadius: "4px",
                        marginBottom: "8px",
                        animation: "pulse 2s infinite ease-in-out",
                      }}
                    />
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr className="hover:bg-slate-200">
                  <td
                    colSpan={columns.length}
                    className="border-b text-center border-gray-200 py-5 px-4 pl-9 xl:pl-11"
                  >
                    <h5 className="font-medium text-gray-800 bg-yellow-100 py-2 px-4 rounded-md">
                      No Data Found
                    </h5>
                  </td>
                </tr>
              ) : (
                data.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-slate-200">
                    {columns.map((column, colIndex) => (
                      <td
                        key={colIndex}
                        className={`border-b border-gray-200 py-5 px-4 ${
                          column.accessor === "department" ? "uppercase" : null
                        }`}
                      >
                        {column.render
                          ? column.render(row)
                          : column.accessor
                              .split(".")
                              .reduce((o, i) => o?.[i], row)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Table;
