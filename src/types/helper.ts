import { NavigateFunction } from "react-router-dom";
import { NavigateStateType } from "../types/form";
import ColumnWidth from "./ColumnWidth";
import ColumnName from "./ColumnName";

type columnLabelType = number | string | undefined;
type valueType = number | string | undefined;

class Helper {
  navigateToFormWithType<StateData = NavigateStateType>(
    navigate: NavigateFunction,
    fullPath: string
  ) {
    return (to: string, state?: StateData) => {
      navigate(`${fullPath}/${to}`, { state });
    };
  }

  debounce(cb: (...args: any[]) => any, time: number = 0) {
    let timeout: NodeJS.Timeout;
    return async (...args: any[]) => {
      clearTimeout(timeout);
      await new Promise((resolve) => {
        timeout = setTimeout(resolve, time);
      });
      return cb(...args);
    };
  }

  getWidthByColumnLabel = (columnLabel: string): columnLabelType => {
    if (!columnLabel) return undefined;
    columnLabel = columnLabel.toLowerCase().trim();
    let width: columnLabelType;

    for (const fieldName of Object.values(ColumnName)) {
      if (columnLabel === fieldName) {
        width = ColumnWidth[`${fieldName}`];
      }
    }
    if (width) {
      return width;
    } else {
      return 60;
    }
  };
  hasEmptyValues(obj: { [key: string]: valueType }) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] === null || obj[key] === undefined || obj[key] === "") {
          return true;
        }
      }
    }
    return false;
  }
  calcPer(total:number,perAmount:number){
    return ((perAmount / total) * 100).toFixed(2);
  }
};

const helper = new Helper();
Object.freeze(helper);
export default helper;