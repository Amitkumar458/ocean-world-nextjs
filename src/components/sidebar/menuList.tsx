import React from "react";
import { SidebarData } from "../../types/route";
import MenuItemComp from "./menuItem";

import {
  // HomeOutlined,
  PeopleOutline,
  // ContactsOutlined,
  PersonOutline,
  // CalendarTodayOutlined,
  // HelpOutlined,
  AccountBoxOutlined,
  LocalHospitalOutlined,
  Dashboard,
} from "@mui/icons-material";



type Props = {
  data: SidebarData[];
  level: number;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  collapsed?: boolean;
};

const MenuList = ({ data, level, selected, setSelected,collapsed }: Props) => {
  
  
  const getMenuIcon = (menuDesc: string): React.ReactNode | null => {
    
    if (menuDesc === "Dashboard") return <Dashboard />;
    if (menuDesc === "Partners") return <PeopleOutline />;
    if (menuDesc === "Hospitals") return <LocalHospitalOutlined />;
    if (menuDesc === "Patients") return <PersonOutline />;
    if (menuDesc === "Representatives") return <PeopleOutline />;
    if (menuDesc === "Accounts") return <AccountBoxOutlined />;
    return null;
  }
  
  return (
    <>
      {data.map((menuItem) => {
        return (
          <MenuItemComp
            key={`menu-level-key-${menuItem.menuDesc}`}
            item={menuItem}
            level={level}
            selected={selected}
            setSelected={setSelected}
            icon={getMenuIcon(menuItem.menuDesc)}
            collapsed={collapsed}
          />
        );
      })}
    </>
  );
};

export default MenuList;
