import toast from "react-hot-toast";
import GenericForm from "../common/Form";
import { useEffect, useState } from "react";
import { addSaleSchema } from "../../services/validationschema";
import { AddSaleApi, GetProductListApi } from "../../services/apicall";
import { useNavigate } from "react-router-dom";

function AddSale() {
  const [btnDis, setBtnDis] = useState(false);
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProductList = async () => {
      try {
        const response = await GetProductListApi();
        const { data } = response.data;
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProductList();
  }, []);

  const initialValues = {
    name: "",
    productname: "",
    quantity: "",
    price: "",
  };

  const fields = {
    title: "Create a Sale",
    items: [
      {
        type: "input",
        labelName: "Your Name",
        inputType: "text",
        inputName: "name",
      },
      {
        type: "select",
        name: "productname",
        labelName: "product",
        options: product,
      },
      {
        type: "input",
        labelName: "Quantity",
        inputType: "number",
        inputName: "quantity",
      },
      {
        type: "input",
        labelName: "Price",
        inputType: "text",
        inputName: "price",
      },
    ],
    btnDis,
    setBtnDis,
    submitButtonText: "Create",
  };

  const onSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("productname", values.productname);
    formData.append("quantity", values.quantity);
    formData.append("price", values.price);
    try {
      setBtnDis(true);
      const response = await AddSaleApi(formData);
      if (response.status === 201) {
        toast.success(response.data.message);
        setTimeout(() => navigate("/sale/sale"), 500);
      }
      resetForm();
    } catch (e) {
      setBtnDis(true);
      toast.error(e.response.data.message);
    } finally {
      setBtnDis(false);
    }
  };

  return (
    <GenericForm
      initialValues={initialValues}
      validationSchema={addSaleSchema()}
      onSubmit={onSubmit}
      fields={fields}
    />
  );
}

export default AddSale;
