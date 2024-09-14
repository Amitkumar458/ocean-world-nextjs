import { StringOrNumber } from "../../types/common";

export interface Data {
  [key: string]: any;
}


export interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
  [key: string]: any;
}

type sortType = {
  attributes: string[];
  sorts: string[];
}

export type reqPartnerType = {
  search: string;
  sort: sortType;
  filters: any[];
  pageNo: number;
  itemsPerPage: number;
};


export type partnersType = {
  id: number;
  [key: string]: any;
};


export type resPartnerType = {
  body: partnersType[];
  headers: HeadCell[];
  totalCount: number;
};


export type DeleteQueryReqType = {
  ids: number[];
}

export type ActiveInactiveType = {
  mode: string;
  ids: number[];
}


export type ViewOrEditResQueryType = {
  id: StringOrNumber;
  [key: string]: any;
}