export class CommonResponse<T> {
  statusCode: number;
  message: string;
  data?: T;
  errors?: any;
  paging?: Paging;
}

export class Paging {
  size: number;
  totalPage: number;
  currentPage: number;
  totalRows: number;
}
