import { Button } from "./ui/button";
import productImg from "@/assets/images/frontend_assets/p_img2_1.png";

const CustomTable = ({ heads, children }) => {
  return (
    <>
      <table className="custom-table w-full border-separate border-spacing-y-4 table-auto lg:table">
        <thead className="hidden lg:table-header-group">
          <tr>
            {heads.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </>
  );
};

export default CustomTable;
