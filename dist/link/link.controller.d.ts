import { LinkService } from './link.service';
import { LinkRequest, LinkResponse } from '../model/link.model';
import { CommonResponse } from '../model/common-response.model';
import { Response } from 'express';
export declare class LinkController {
    private linkService;
    constructor(linkService: LinkService);
    createLink(token: string, url: string, request: LinkRequest): Promise<CommonResponse<LinkResponse>>;
    createPublicLink(url: string, request: LinkRequest): Promise<CommonResponse<LinkResponse>>;
    redirect(shortUrl: string, url: string, res: Response): Promise<void>;
    getLinks(token: string, title: string, page?: number, rowsPerPage?: number): Promise<CommonResponse<LinkResponse[]>>;
    deleteLink(token: string, id: string): Promise<CommonResponse<boolean>>;
}
