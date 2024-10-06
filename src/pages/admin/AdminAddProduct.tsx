import Label from "@/components/Label";
import uploadImg from "@/assets/images/admin_assets/upload_area.png";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Select from "@/components/Select";
import { Button } from "@/components/ui/button";
import { useAddProductMutation } from "@/app/services/admin/adminActionApi";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useForm } from "@/hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFormFields,
  selectProductImages,
  setFormFields,
  setProductImg,
  setResetAdminActionState,
} from "@/app/features/admin/adminAddProductSilce";

const labelArr = Array.from({ length: 4 });
const buttonArray = ["s", "m", "l", "xl", "xxl"];

const AdminAddProduct = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [addProduct, { isLoading, isError, error, isSuccess, data }] =
    useAddProductMutation();

  const savedFormFields = useSelector(selectFormFields);
  const savedProductImg = useSelector(selectProductImages);

  const { formFields, handleChange, handleUpdateFormFields } = useForm();

  const [imageFiles, setImageFile] = useState([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formFields?.["product_name"] ||
      !formFields?.["product_desc"] ||
      !formFields?.["product_price"]
    ) {
      toast({
        title: "Please Fill the required fields",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", formFields?.["product_name"]);
    formData.append("description", formFields?.["product_desc"]);
    formData.append("price", formFields?.["product_price"]);
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });
    formData.append("quantity", formFields?.["quantity"]);

    addProduct(formData);
    dispatch(setFormFields(formFields));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];

    setImageFile((prev) => [...prev, file]);

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      dispatch(setProductImg(imageUrl));
    }
  };

  useEffect(() => {
    if (data && isSuccess) {
      toast({
        title: "Product Added Successfully!!",
        variant: "success",
      });
      handleUpdateFormFields({});
      dispatch(setResetAdminActionState());
    } else if (isError) {
      toast({
        title: `Error: ${error?.status}`,
        description: `${error?.data?.error}`,
        variant: "destructive",
      });
    }
  }, [data, isError, isSuccess]);

  useEffect(() => {
    if (!savedFormFields) {
      return;
    }
    handleUpdateFormFields(savedFormFields);
  }, []);

  return (
    <div className="md:ml-[70px] mx-auto md:py-10 py-5 max-w-[500px] w-full px-[14px]">
      <form onSubmit={handleSubmit} className="w-full">
        <input
          type="file"
          className="hidden"
          id="uploadImg"
          onChange={handleFileChange}
        />
        <Label className="mb-2">Upload Image</Label>
        <div className="flex items-center justify-start gap-3 flex-wrap mb-4">
          {labelArr.map((_, index) => (
            <Label
              htmlFor="uploadImg"
              className="h-[100px] w-[100px] rounded-md bg-gray-100 flex items-center justify-center cursor-pointer"
              key={index}
            >
              <img
                src={savedProductImg[index].split("blog:").join() || uploadImg}
                alt="Upload"
                className="object-cover h-full w-full"
              />
            </Label>
          ))}
        </div>
        <div className="field_wrap mb-4">
          <Label htmlFor="productName">Product Name</Label>
          <Input
            placeholder="Type here"
            variant="tertiary"
            size="lg"
            className="max-w-[500px] w-full"
            onChange={(e) => handleChange("product_name", e.target.value)}
            value={formFields?.["product_name"] || ""}
            id="productName"
          />
        </div>
        <div className="field_wrap mb-4">
          <Label htmlFor="productPrice">Product Price</Label>
          <Input
            placeholder="Type here"
            variant="tertiary"
            size="lg"
            className="max-w-[500px] w-full"
            onChange={(e) => handleChange("product_price", e.target.value)}
            value={formFields?.["product_price"] || ""}
            type="number"
            id="productPrice"
          />
        </div>
        <div className="field_wrap mb-4">
          <Label htmlFor="productQuantity">Product Quantity</Label>
          <Input
            placeholder="Type here"
            variant="tertiary"
            size="lg"
            className="max-w-[500px] w-full"
            onChange={(e) => handleChange("quantity", e.target.value)}
            value={formFields?.["quantity"] || ""}
            type="number"
            id="productQuantity"
          />
        </div>
        <div className="field_wrap mb-5">
          <Label htmlFor="productName">Product Description</Label>
          <Textarea
            placeholder="Type Desc here"
            size="md"
            className="min-h-[100px] bg-white border border-black"
            onChange={(e) => handleChange("product_desc", e.target.value)}
            value={formFields?.["product_desc"] || ""}
            id="productName"
          />
        </div>
        <div className="field_wrap mb-4">
          <div className="grid lg:gird-cols-3 grid-cols-1 gap-4">
            <div className="select_wrap">
              <Select placeholder="Category" />
            </div>
            <div className="select_wrap">
              <Select placeholder="Sub cateogry" />
            </div>
            <div className="select_wrap">
              <Select placeholder="Product Price" />
            </div>
          </div>
        </div>
        <div className="field_wrap mb-8">
          <div className="label_wrap">
            <Label>Product Sizes</Label>
          </div>
          <div className="flex items-center justify-start gap-3 flex-wrap">
            {buttonArray.map((item) => (
              <Button size="icon" key={item}>
                {item}
              </Button>
            ))}
          </div>
        </div>
        <div className="button_wrap">
          <Button isLoading={isLoading} size="sm">
            Add Product
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddProduct;
