import { toggleItem } from "@/app/features/ui/uiSlice";
import { Button } from "@/components/ui/button";
import { Collapse } from "@/components/Collapse";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectOpenItem } from "@/app/features/ui/uiSlice";
import { PersonIcon } from "@radix-ui/react-icons";
import { logout } from "@/app/features/auth/authSlice";

interface SidebarProps {
  items: {
    label: string;
    path: string;
    subItems?: { label: string; path: string }[];
  }[];
}

export function Sidebar({ items }: SidebarProps) {
  const dispatch = useAppDispatch();
  const openIndex = useAppSelector(selectOpenItem("sidebar"));
console.log('open item', openIndex)
  const handleToggle = (index: number) => {
    dispatch(toggleItem({ key: "sidebar", index }));
  };

  return (
    <div className="sidebar">
      {items.map((item, index) => (
        <div key={index}>
          <Button onClick={() => handleToggle(index)} className="sidebar-item">
            {item.label}
          </Button>
          {item.subItems && (
            <Collapse in={openIndex === index}>
              <ul className="sidebar-submenu">
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex} className="sidebar-subitem">
                    {subItem.label}
                  </li>
                ))}
              </ul>
            </Collapse>
          )}
        </div>
      ))}
      <Button onClick={()=> dispatch(logout())}>Logout <PersonIcon/> </Button>
    </div>
  );
}
