import packageImg from "@/assets/images/admin_assets/order_icon.png";
import Select from "@/components/Select";

const AdminOrderList = () => {
  const selectOptions = [
    {
      label: "Order Placed",
      value: "Order Placed",
    },
    {
      label: "Packing",
      value: "Packing",
    },
    {
      label: "Shipped",
      value: "Shipped",
    },
    {
      label: "Out for Delivery",
      value: "Out for Delivery",
    },
    {
      label: "Delivered",
      value: "Delivered",
    },
  ];

  return (
    <div className="adminOrderList max-w-[1400px] w-full mx-auto lg:py-10 py-5">
      <h5 className="text-black font-bold text-[30px] mb-4 capitalize">
        All Orders List
      </h5>
      <ul className="orderListWrapper">
        <li className="border border-solid border-[#99999932] min-h-[200px] rounded-md px-5 py-4">
          <div className="flex items-start justify-between lg:mb-5 mb-3">
            <div className="img_wrap h-[50px] w-[50px] border border-solid border-gray-200 flex items-center justify-center shadow-sm">
              <img src={packageImg} alt="Reload Page" />
            </div>
            <div className="text_wrap">
              <span className="lg:text-[16px] text-[14px] font-medium text-black mb-2">
                Lorem ipsum dolor sit.
              </span>
              <span className="lg:text-[16px] text-[14px] font-medium text-black mb-2">
                Lorem ipsum dolor sit.
              </span>
              <span className="lg:text-[16px] text-[14px] font-medium text-black mb-2">
                Lorem ipsum dolor sit.
              </span>
            </div>
            <div className="text_wrap">
              <span className="lg:text-[16px] text-[14px] font-medium text-black mb-2">
                item: 3
              </span>
              <span className="lg:text-[16px] text-[14px] font-medium text-black mb-2">
                Method: COD
              </span>
              <span className="lg:text-[16px] text-[14px] font-medium text-black mb-2">
                Payment: Pending
              </span>
              <span className="lg:text-[16px] text-[14px] font-medium text-black mb-2">
                Date: 8/16/2024
              </span>
            </div>
            <div className="text_wrap">
              <span className="lg:text-[16px] text-[14px] font-medium text-black mb-2">
                $304
              </span>
            </div>
            <div className="select_wrap">
              <Select
                style={{ content: "min-w-[164px]" }}
                placeholder="Select Option"
                options={selectOptions}
              />
            </div>
          </div>
          <div className="orderInfo">
            <span className="lg:text-[16px] text-[14px] font-medium text-black mb-2">
              Avinash Jr
            </span>
            <span className="lg:text-[16px] text-[14px] font-medium text-black mb-2">
              some street
            </span>
            <span className="lg:text-[16px] text-[14px] font-medium text-black mb-2">
              Bangalore KA, IN, 56000
            </span>
            <span className="lg:text-[16px] text-[14px] font-medium text-black mb-2">
              123456789
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default AdminOrderList;
