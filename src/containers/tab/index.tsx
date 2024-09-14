import { Box, Tabs, Tab } from "@mui/material";
import { ReactNode, useState } from "react";

type Props = {
  labels: string[];
  children?: ReactNode[];
  onTabChange?: (tabIndex: number) => void;
};

type TabPanelProps = {
  children?: ReactNode;
  index: number;
  value: number;
};

function TabPanel({ children, index, value }: Readonly<TabPanelProps>) {
  return (
    <>
      <></>
      {value === index && (
        <>
          <></>
          {children}
        </>
      )}
    </>
  );
}

const TabContainer = ({ labels, children, onTabChange }: Readonly<Props>) => {
  const [value, setValue] = useState<number>(0);
  return (
    <Box sx={{ marginBottom:'30px', }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }} position={"static"}>
        <Tabs
          value={value}
          onChange={(_, val: number) => {
            setValue(val);
            onTabChange?.(val);
          }}
          aria-label="basic tabs example"
        >
          {labels.map((label, index) => {
            return (
              <Tab
                label={label}
                key={label}
                id={`simple-tab-${index}`}
                aria-controls={`simple-tabpanel-${index}`}
              />
            );
          })}
        </Tabs>
      </Box>
      <Box sx={{height:"700px",overflowY:"auto",}}> 
      {children?.map((child, index) => {
        return (
          <TabPanel
            value={value}
            index={index}
            key={`table-panel-${child?.valueOf()}`}
          >
            {child}
          </TabPanel>
        );
      })}
      </Box>
    </Box>
  );
};

export default TabContainer;
