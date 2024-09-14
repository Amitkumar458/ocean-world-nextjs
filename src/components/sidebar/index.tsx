import { useState } from "react";
import { Sidebar, Menu, sidebarClasses } from "react-pro-sidebar";
import { Box, Typography, Button } from "@mui/material";
import useColors from "../../hooks/useColors";
import { SidebarData } from "../../types/route";
import useSidebar from "../../hooks/useSidebar";
import {
  NavigateBefore,
  NavigateNext,
} from "@mui/icons-material";
import Logo from "../../assets/Logo.png";

import MenuList from "./menuList";
import { AppVersion } from "../../App";

type Props = {
  data: SidebarData[];
};

const SidebarComp = (props: Props) => {
  const colors = useColors();
  const [selected, setSelected] = useState<string>("Dashboard");
  const { collapsed, setCollapsed } = useSidebar();
  return (
    <Box>
      <Sidebar
        collapsed={collapsed}
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: `${colors.greenAccent[600]} !important`,
            display: "flex",
            flexDirection: "column",
          },
        }}
        style={{
          height: "100%",
          border: "none",
        }}
        width="280px"
        breakPoint="md"
        collapsedWidth="80px"
      >
        <Menu
          menuItemStyles={{
            button: () => {
              return {
                "&:hover": {
                  backgroundColor: "transparent",
                },
              };
            },
            root: () => {
              return {
                // backgroundColor: "transparent",
              };
            },
          }}
          style={{ marginBottom: "auto" }}
        >
          {collapsed ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <Button
                sx={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  cursor: "pointer",
                  padding: "10px",
                  ":hover": {
                    backgroundColor: "white",
                  },
                }}
                onClick={() => {
                  setCollapsed(!collapsed);
                }}
              >
                {collapsed ? (
                  <NavigateNext fontSize="large" />
                ) : (
                  <NavigateBefore fontSize="large" />
                )}
              </Button>
            </Box>
          ) : (
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{
                width: "100% !important",
                paddingY: "5px",
                paddingLeft: "15px",
                position: "sticky",
                top: 0,
                backgroundColor: `${colors.greenAccent[600]} !important`,
                zIndex: 1,
              }}
            >
              <img src={Logo} alt="logo" height={"60px"} />

              <Button
                sx={{
                  backgroundColor: "white",
                  borderRadius: "10px 0px 0px 10px",
                  cursor: "pointer",
                  minWidth: "40px",
                  ":hover": {
                    backgroundColor: "white",
                  },
                  padding: "10px",
                }}
                onClick={() => {
                  setCollapsed(!collapsed);
                }}
              >
                {collapsed ? <NavigateNext /> : <NavigateBefore />}
              </Button>
            </Box>
          )}

          <Box>
            <MenuList
              data={props.data}
              level={0}
              selected={selected}
              setSelected={setSelected}
              collapsed={collapsed}
            />
          </Box>
        </Menu>
        <Typography
          sx={{
            whiteSpace: "wrap",
            width: "100%",
            typography:{md:"h6",fontWeight:"bold !important"},
            color: "#fff",
            textAlign: "center",
            position: "sticky",
            bottom: 0,
            backgroundColor: `${colors.greenAccent[600]} !important`,
            zIndex: 1,
            paddingY: "10px",
            alignItems:"center"
          }}
        >
          {AppVersion}
        </Typography>
      </Sidebar>
    </Box>
  );
};

export default SidebarComp;
