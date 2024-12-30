export class LinkRequest {
  title: string;
  url: string;
}

export class LinkSearchRequest {
  title?: string;
  rowsPerPage?: number;
  page?: number;
}

export class LinkResponse {
  id: string;
  shortUrl: string;
  url: string;
}
