export declare class LinkRequest {
    title: string;
    url: string;
}
export declare class LinkSearchRequest {
    title?: string;
    rowsPerPage?: number;
    page?: number;
}
export declare class LinkResponse {
    id: string;
    shortUrl: string;
    url: string;
}
