import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ValidationService } from '../common/validation.service';
import { JwtService } from '../jwt/jwt.service';
import {
  LinkRequest,
  LinkResponse,
  LinkSearchRequest,
} from '../model/link.model';
import { LinkValidation } from './link.validation';
import { randomBytes } from 'crypto';
import { CommonResponse } from '../model/common-response.model';

@Injectable()
export class LinkService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) readonly logger: Logger,
    private validationService: ValidationService,
    private jwtService: JwtService,
  ) {}

  async generateRandomString(length: number = 8): Promise<string> {
    return randomBytes(length)
      .toString('base64')
      .replace(/[^a-zA-Z0-9]/g, '')
      .slice(0, length);
  }

  async createWithUser(
    token: string,
    url: string,
    request: LinkRequest,
  ): Promise<LinkResponse> {
    this.logger.debug(`Creating link with data ${JSON.stringify(request)}`);

    const createRequest: LinkRequest = this.validationService.validate(
      LinkValidation.CREATE,
      request,
    );

    const decodedUser = await this.jwtService.verifyToken(token);
    const user = await this.prismaService.user.findFirst({
      where: {
        id: decodedUser.userId,
      },
    });
    if (!user) {
      throw new HttpException('User not found', 404);
    } else if (!user.is_login) {
      throw new HttpException('User is not login', 400);
    }

    let shorUrl: string;
    if (createRequest.title) {
      const title = await this.prismaService.link.count({
        where: {
          title: createRequest.title,
        },
      });
      if (title > 0) {
        throw new HttpException('Title already exists', 400);
      }

      shorUrl = url + '/r/' + createRequest.title;
    } else {
      shorUrl = url + '/r/' + (await this.generateRandomString());
    }

    const link = await this.prismaService.link.create({
      data: {
        title: createRequest.title,
        url: createRequest.url,
        short_url: shorUrl,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return {
      id: link.id,
      url: link.url,
      shortUrl: link.short_url,
    };
  }

  async createWithoutUser(
    url: string,
    request: LinkRequest,
  ): Promise<LinkResponse> {
    this.logger.debug(`Creating link with data ${JSON.stringify(request)}`);

    const createRequest: LinkRequest = this.validationService.validate(
      LinkValidation.CREATE,
      request,
    );

    const shorUrl = url + '/r/' + (await this.generateRandomString());
    const link = await this.prismaService.link.create({
      data: {
        title: createRequest.title,
        url: createRequest.url,
        short_url: shorUrl,
      },
    });

    return {
      id: link.id,
      url: link.url,
      shortUrl: link.short_url,
    };
  }

  async getLink(shortUrl: string, url: string): Promise<string> {
    this.logger.debug(`Getting link with short url ${shortUrl}`);

    const link = await this.prismaService.link.findFirst({
      where: {
        short_url: url + '/r/' + shortUrl,
      },
    });
    if (!link) {
      throw new HttpException('Link not found', 404);
    }

    await this.prismaService.link.update({
      where: {
        id: link.id,
      },
      data: {
        visit: link.visit + 1,
      },
    });

    return link.url;
  }

  async getLinksPerUser(
    token: string,
    request: LinkSearchRequest,
  ): Promise<CommonResponse<LinkResponse[]>> {
    this.logger.debug(`Getting links per user`);

    const searchRequest = this.validationService.validate(
      LinkValidation.SEARCH,
      request,
    );

    const decodedUser = await this.jwtService.verifyToken(token);
    const user = await this.prismaService.user.findFirst({
      where: {
        id: decodedUser.userId,
      },
    });
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    let filters = [];
    if (searchRequest.title) {
      filters.push({
        title: {
          contains: searchRequest.title,
          mode: 'insensitive',
        },
      });
    }

    const skip = (searchRequest.page - 1) * searchRequest.rowsPerPage;
    const links = await this.prismaService.link.findMany({
      where: {
        AND: [
          {
            user_id: user.id,
          },
          ...filters,
        ],
      },
      skip: skip,
      take: searchRequest.rowsPerPage,
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Links found',
      data: links.map((link) => {
        return {
          id: link.id,
          url: link.url,
          shortUrl: link.short_url,
        };
      }),
      paging: {
        currentPage: searchRequest.page,
        totalPage: Math.ceil(links.length / searchRequest.rowsPerPage),
        size: searchRequest.size,
        totalRows: links.length,
      },
    };
  }

  async deleteLink(token: string, id: string): Promise<boolean> {
    this.logger.debug(`Deleting link with id ${id}`);

    const decodedUser = await this.jwtService.verifyToken(token);
    const user = await this.prismaService.user.findFirst({
      where: {
        id: decodedUser.userId,
      },
    });
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const link = await this.prismaService.link.findFirst({
      where: {
        id: id,
      },
    });
    if (!link) {
      throw new HttpException('Link not found', 404);
    } else if (link.user_id !== user.id) {
      throw new HttpException('Unauthorized', 401);
    }

    await this.prismaService.link.delete({
      where: {
        id: link.id,
      },
    });

    return true;
  }
}
