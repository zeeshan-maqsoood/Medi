import React, { useState, useContext, useEffect } from "react";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { AppContext } from "../../contextApi/useContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createProduct, editProducts } from "../../Api/product";

const Modal = ({ title, initialValues }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { data, setData, selectedValue, setSelectedValue, fcmToken } =
    useContext(AppContext);

  const toggleModel = () => {
    setIsOpenModal(!isOpenModal);
    if (title === "Add Product") {
      formik.resetForm();
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      category: "",
      description: "",
      date: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      price: Yup.string().required("Price is required"),
      category: Yup.string().required("Category is required"),
      description: Yup.string().required("Description is required"),
      date: Yup.date().required("Date is required"),
    }),
    onSubmit: async (values) => {
      try {
        if (title === "Add Product") {
          const valueWithToken = {
            ...values,
            token: fcmToken,
          };
          const response = await createProduct(valueWithToken);
          if (response.status === 200) {
            setData((prevData) => [...prevData, response.data.data]);
            alert("Your Product has been added");
            toggleModel();
          } else {
            console.error("Failed to add product");
          }
        } else {
          const response = await editProducts(values);
          if (response.status === 200) {
            const updatedData = data.map((product) =>
              product._id === values._id ? response.data.data : product
            );
            setData(updatedData);
            toggleModel();
            alert("Your Product has been updated");
          }
        }
      } catch (error) {
        console.error("Error adding product:", error);
      }
    },
  });

  useEffect(() => {
    if (initialValues) {
      const initialValueFormatted = {
        ...initialValues,
        date: new Date(initialValues.reminderTime).toISOString().slice(0, 16),
      };
      formik.setValues(initialValueFormatted);
    } else if (selectedValue) {
      const selectedValueFormatted = {
        ...selectedValue,
        date: new Date(selectedValue.reminderTime).toISOString().slice(0, 16),
      };
      formik.setValues(selectedValueFormatted);
    }
  }, [initialValues, selectedValue]);

  // useEffect(() => {
  //   console.log(formik.values,"formik.values")
  //   if (title !== "Add Product" && (initialValues || selectedValue)) {
  //     formik.setValues(initialValues || selectedValue);
  //   }
  // }, [initialValues, selectedValue, title]);

  const style =
    "block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex justify-items-end items-end";

  return (
    <>
      <button
        className={title === "Add Product" ? style : null}
        type="button"
        onClick={toggleModel}
      >
        {title}
      </button>
      {isOpenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-md md:max-w-lg lg:max-w-xl bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={toggleModel}
              >
                <RiDeleteBack2Fill />
              </button>
            </div>
            <form className="p-4" onSubmit={formik.handleSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-1 md:grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Type product name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-600 text-sm">
                      {formik.errors.name}
                    </div>
                  ) : null}
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="$2999"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.price && formik.errors.price ? (
                    <div className="text-red-600 text-sm">
                      {formik.errors.price}
                    </div>
                  ) : null}
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    name="category"
                    onChange={formik.handleChange}
                    value={formik.values.category}
                    onBlur={formik.handleBlur}
                  >
                    <option value="" label="Select category" />
                    <option value="TV">TV/Monitors</option>
                    <option value="PC">PC</option>
                    <option value="GA">Gaming/Console</option>
                    <option value="PH">Phones</option>
                  </select>
                  {formik.touched.category && formik.errors.category ? (
                    <div className="text-red-600 text-sm">
                      {formik.errors.category}
                    </div>
                  ) : null}
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Description
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Write product description here"
                    name="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    onBlur={formik.handleBlur}
                  ></textarea>
                  {formik.touched.description && formik.errors.description ? (
                    <div className="text-red-600 text-sm">
                      {formik.errors.description}
                    </div>
                  ) : null}
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label
                    htmlFor="date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Date
                  </label>
                  <input
                    type="dateTime-local"
                    name="date"
                    id="date"
                    onChange={formik.handleChange}
                    value={formik.values.date}
                    onBlur={formik.handleBlur}
                    className="text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-red-600 dark:placeholder-red-600 dark:text-white "
                  />
                  {formik.touched.date && formik.errors.date ? (
                    <>
                      <div className="text-red-600 text-sm">
                        {formik.errors.date}
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="mr-1 -ml-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                {title}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
