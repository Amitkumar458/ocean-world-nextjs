import { Navigate } from "react-router-dom";
import { SidebarData } from "../../types/route";
import { useLocation } from "react-router-dom";
import AdminRouteConstants from "../../util/routeConstants/admin";
import { AdminProgramCodes } from "../../util/routeConstants/admin/codes";
import HospitalReceptionRouteConstants from "../../util/routeConstants/hospitalReception";
import { HospitalReceptionProgramCode } from "../../util/routeConstants/hospitalReception/codes";
import RepresentativeRouteConstants from "../../util/routeConstants/representative";
import { RepresentativeProgramCode } from "../../util/routeConstants/representative/codes";

interface Props {
  data: SidebarData[];
  from?: string;
}

function getRoute(
  data: SidebarData[],
  routeConstants: any,
  programCodes: any
) {
  const temp = data.find((item) => {
    if (item.type === "MENU") {
      return !!routeConstants[item.menuCode as keyof typeof programCodes];
    } else {
      return !!routeConstants[item.programCode as keyof typeof programCodes];
    }
  });

  if (temp?.type === "MENU") {
    return routeConstants[temp.menuCode as keyof typeof programCodes];
  } else if (temp?.type === "PROGRAM") {
    return routeConstants[temp.programCode as keyof typeof programCodes];
  }
  return null;
}

export default function IndexNavigatorComponent(props: Props) {
  const location = useLocation();

  if (!props.data?.length) {
    return <></>;
  }

  let route = null;

  if (location.pathname.includes("admin")) {
    route = getRoute(
      props.data,
      AdminRouteConstants,
      AdminProgramCodes
    );
  } else if (location.pathname.includes("hospital-reception")) {
    route = getRoute(
      props.data,
      HospitalReceptionRouteConstants,
      HospitalReceptionProgramCode
    );
  } else if (location.pathname.includes("representative")) {
    route = getRoute(
      props.data,
      RepresentativeRouteConstants,
      RepresentativeProgramCode
    );
  }

  if (route) {
    return <Navigate to={route.relativepath} />;
  }
  return <></>;
}
