import closeIcon from "@/assets/images/frontend_assets/cross_icon.png";
import { Button } from "@/components/ui/button";
import { useGetProductListQuery } from "@/app/services/admin/adminActionApi";
import Skeleton from "@/components/Skeleton";
import CustomTable from "@/components/CustomTable";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const heads = ["Name", "Category", "Price", "Action"];

const AdminProductList = () => {
  const {
    isLoading,
    data: productList,
    isSuccess,
    isError,
    error,
  } = useGetProductListQuery();

  const { toast } = useToast();

  let content;
  if (isLoading) {
    const loadingSkeleton = Array.from({ length: 4 });
    content = loadingSkeleton.map((_, index) => (
      <Skeleton height="h-[137px]" width="w-[1200px]" key={index} />
    ));
  } else if (isSuccess && productList) {
    content = productList?.data?.map((item, index) => {
      return (
        <tr
          key={index}
          className="lg:table-row flex flex-col lg:flex-row lg:space-y-0 space-y-4"
        >
          <td className="pr-4 lg:truncate w-5 relative before:content-['Name'] before:absolute before:left-0 before:font-semibold before:text-gray-500 lg:before:content-none lg:relative lg:text-left">
            {item?.name}
          </td>
          <td className="pl-4 pr-2 relative before:content-['Category'] before:absolute before:left-0 before:font-semibold before:text-gray-500 lg:before:content-none lg:relative lg:text-left">
            {/* Truncate the description for smaller screens */}
            <div className="lg:whitespace-normal truncate lg:overflow-visible overflow-hidden w-full lg:w-auto max-w-[200px] lg:max-w-none">
              {item?.description}
            </div>
          </td>
          <td className="relative before:content-['Price'] before:absolute before:left-0 before:font-semibold before:text-gray-500 lg:before:content-none lg:relative lg:text-left">
            ${item?.price}
          </td>
          <td className="relative before:content-['Action'] before:absolute before:left-0 before:font-semibold before:text-gray-500 lg:before:content-none lg:relative lg:text-left">
            <Button variant="icon" className="justify-end">
              <img src={closeIcon} alt="Delete" />
            </Button>
          </td>
        </tr>
      );
    });
  } else if (isError) {
    console.error("error", error?.error);
  }

  useEffect(() => {
    if (!isError) return;
    toast({
      title: "We are having an error",
      description: `Error: ${error?.error}`,
      variant: "destructive",
    });
  }, [isError, error]);

  return (
    <div className="adminProductList lg:mx-auto mx-0 max-w-[1200px] w-full lg:flex-1 lg:py-10 py-5 px-4">
      <h5 className="text-black font-bold text-[30px] mb-4 capitalize">
        All Products List
      </h5>
      <CustomTable heads={heads}>{content}</CustomTable>
    </div>
  );
};

export default AdminProductList;
