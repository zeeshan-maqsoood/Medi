import React, { useState, useContext } from "react";
import Modal from "../Modal/modal";
import { AppContext } from "../../contextApi/useContext";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { deleteProduct as deleteProductApi } from "../../Api/product";

const Table = () => {
  const { data, setData, setSelectedValue, selectedValue } =
    useContext(AppContext);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProduct = (product) => {
    setSelectedProduct(product);
    setSelectedValue(product);
  };

  const deleteProduct = async (id) => {
    const response = await deleteProductApi(id);
    if (response.status === 200) {
      alert("Your Product has been deleted");
      setData(data.filter((product) => product._id !== id));
    }
  };

  return (
    <>
      <div className="p-4">
        <Modal title={"Add Product"} />
      </div>
      <div className="overflow-x-auto">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  <span>Edit</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  <span>Delete</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.length < 1 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-4 text-red-600 font-bold"
                  >
                    NOT FOUND
                  </td>
                </tr>
              ) : (
                data &&
                data?.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.price}</td>
                    <td className="px-6 py-4">{item.category}</td>
                    <td className="px-6 py-4">{item.description}</td>
                    <td className="px-6 py-4">
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => handleProduct(item)}
                      >
                        <Modal
                          title={<MdModeEditOutline />}
                          initialValues={item}
                        />
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        onClick={() => deleteProduct(item._id)}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Table;
