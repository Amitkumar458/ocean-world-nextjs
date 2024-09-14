import {
  SetStateAction,
  ReactNode,
  Dispatch,
  useState,
  useEffect,
} from "react";
import { SidebarData } from "../../types/route";
import { AdminProgramCodes } from "../../util/routeConstants/admin/codes";
import useAuth from "../../hooks/useAuth";
import AdminRouteConstants from "../../util/routeConstants/admin";
import { SubMenu, MenuItem, menuClasses } from "react-pro-sidebar";
import useColors from "../../hooks/useColors";
import { Typography, alpha } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import useSidebar from "../../hooks/useSidebar";

import HospitalReceptionRouteConstants from "../../util/routeConstants/hospitalReception";
import { HospitalReceptionProgramCode } from "../../util/routeConstants/hospitalReception/codes";

import {
  // HomeOutlined,
  // PeopleOutline,
  // ContactsOutlined,
  // ReceiptOutlined,
  // PersonOutline,
  // CalendarTodayOutlined,
  // HelpOutlined,
  // MenuOutlined,
  // MapOutlined,
  ArrowRight,
} from "@mui/icons-material";
import { RepresentativeProgramCode } from "../../util/routeConstants/representative/codes";
import RepresentativeRouteConstants from "../../util/routeConstants/representative";

type Props = {
  item: SidebarData;
  level: number;
  icon?: ReactNode;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  collapsed?: boolean;
};

type ItemProps = {
  title: string;
  to: string;
  icon?: ReactNode;
  selected: string;
  setSelected: Dispatch<React.SetStateAction<string>>;
};

const Item = ({ title, to, icon, setSelected }: Readonly<ItemProps>) => {
  const colors = useColors();
  const location = useLocation();

  return (
    <MenuItem
      active={location.pathname.startsWith(to)}
      style={{
        color: colors.primary[100],
      }}
      onClick={() => {
        setSelected(title);
      }}
      icon={icon}
      component={<Link to={to} />}
      rootStyles={{
        marginBottom: "2px",
        [`.ps-menu-button`]: {
          color: `${colors.primary[500]} !important`,
        },
        [`.ps-menu-button:hover`]: {
          color: `${colors.primary[500]} !important`,
        },
        [`.${menuClasses.active}`]: {
          color: `white`,
        },
      }}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const MenuItemComp = ({
  item,
  level,
  icon,
  selected,
  setSelected,
}: Readonly<Props>) => {
  const colors = useColors();
  const { collapsed, setCollapsed } = useSidebar();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<boolean>(false);
  const [href, setHref] = useState<string>("");

  const { authState } = useAuth();

  useEffect(() => {
    let hrefVal;

    if (authState.data?.userRole === "ADMIN") {
      const code: keyof AdminProgramCodes = (
        item.type === "MENU" ? item.menuCode : item.programCode
      ) as keyof AdminProgramCodes;
      hrefVal = AdminRouteConstants[code]?.relativepath;
      setHref(hrefVal);
    }
    if(authState.data?.userRole === "HOSPITAL_RECEPTION"){
      const code: keyof HospitalReceptionProgramCode = (
        item.type === "MENU" ? item.menuCode : item.programCode
      ) as keyof HospitalReceptionProgramCode;
      hrefVal = HospitalReceptionRouteConstants[code]?.relativepath;
      setHref(hrefVal);
    }

    if(authState.data?.userRole === "REPRESENTATIVE"){
      const code: keyof RepresentativeProgramCode = (
        item.type === "MENU" ? item.menuCode : item.programCode
      ) as keyof RepresentativeProgramCode;
      hrefVal = RepresentativeRouteConstants[code]?.relativepath;
      setHref(hrefVal);
    }

    if (hrefVal) {
      if (location.pathname.startsWith(hrefVal)) {
        setOpenMenu(true);
        setSelectedItem(true);
      } else {
        setSelectedItem(false);
        setOpenMenu(false);
      }
    }
  }, [location.pathname]);

  return (
    <>
      {item.type === "MENU" ? (
        <SubMenu
          label={item.menuDesc}
          icon={icon}
          rootStyles={{
            [`.${menuClasses.subMenuContent}`]: {
              backgroundColor: "transparent !important",
            },

            [`.ps-menuitem-root`]: {
              marginBottom: "0px",
            },

            [`.ps-menu-button`]: {
              paddingLeft: "10px !important",
              paddingRight: "10px !important",
              marginLeft: "10px !important",
              marginRight: "10px !important",
              color: selectedItem
                ? `${colors.greenAccent[700]} !important`
                : `${colors.greenAccent[200]} !important`,
              backgroundColor: selectedItem
                ? `${colors.primary[500]} !important`
                : alpha(colors.primary[500], 0.1),
              borderRadius: "10px",
              marginTop: "10px",
              fontWeight: "600",
              fontSize: "1.1rem",
            },
            [`.ps-menu-button:hover`]: {
              backgroundColor: `${colors.primary[500]} !important`,
              color: `${colors.greenAccent[700]} !important`,
            },

            [`.ps-menuitem-root .ps-menu-button`]: {
              borderLeft: "2px solid white",
              padding: "0px",
              marginLeft: "40px !important",
              marginRight: "20px",
              backgroundColor: `${colors.greenAccent[600]} !important`,
              color: `${colors.greenAccent[200]} !important`,
              borderRadius: "0px",
              marginTop: "0px",
            },
          }}
          defaultOpen={selectedItem}
          open={openMenu}
          onClick={() => {
            if (collapsed) {
              setCollapsed(false);
            }
            setOpenMenu((prev) => !prev);
          }}
        >
          {item.type === "MENU" && item.children.length ? (
            <>
              {item.children.map((subItem, index) => (
                <MenuItemComp
                  key={`subMenuItem.${subItem.type}.${index}`}
                  item={subItem}
                  selected={selected}
                  setSelected={setSelected}
                  level={level + 1}
                  icon={<ArrowRight />}
                />
              ))}
            </>
          ) : null}
        </SubMenu>
      ) : (
        <Item
          title={item.programDesc}
          to={href}
          icon={icon}
          selected={selected}
          setSelected={setSelected}
        />
      )}
    </>
  );
};

export default MenuItemComp;
