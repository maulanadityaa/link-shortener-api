import { PrismaService } from '../common/prisma.service';
import { Logger } from 'winston';
import { ValidationService } from '../common/validation.service';
import { JwtService } from '../jwt/jwt.service';
import { LinkRequest, LinkResponse, LinkSearchRequest } from '../model/link.model';
import { CommonResponse } from '../model/common-response.model';
export declare class LinkService {
    private prismaService;
    readonly logger: Logger;
    private validationService;
    private jwtService;
    constructor(prismaService: PrismaService, logger: Logger, validationService: ValidationService, jwtService: JwtService);
    generateRandomString(length?: number): Promise<string>;
    createWithUser(token: string, url: string, request: LinkRequest): Promise<LinkResponse>;
    createWithoutUser(url: string, request: LinkRequest): Promise<LinkResponse>;
    getLink(shortUrl: string, url: string): Promise<string>;
    getLinksPerUser(token: string, request: LinkSearchRequest): Promise<CommonResponse<LinkResponse[]>>;
    deleteLink(token: string, id: string): Promise<boolean>;
}
