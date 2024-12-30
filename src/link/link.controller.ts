import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { Auth } from '../auth/auth.decorator';
import { Url } from './url.decorator';
import {
  LinkRequest,
  LinkResponse,
  LinkSearchRequest,
} from '../model/link.model';
import { CommonResponse } from '../model/common-response.model';
import { Response } from 'express';

@Controller()
export class LinkController {
  constructor(private linkService: LinkService) {}

  @Post('/api/v1/links')
  async createLink(
    @Auth() token: string,
    @Url() url: string,
    @Body() request: LinkRequest,
  ): Promise<CommonResponse<LinkResponse>> {
    const response = await this.linkService.createWithUser(token, url, request);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Link created successfully',
      data: response,
    };
  }

  @Post('/api/v1/links/public')
  async createPublicLink(
    @Url() url: string,
    @Body() request: LinkRequest,
  ): Promise<CommonResponse<LinkResponse>> {
    const response = await this.linkService.createWithoutUser(url, request);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Link created successfully',
      data: response,
    };
  }

  @Get('/r/:shortUrl')
  async redirect(
    @Param('shortUrl') shortUrl: string,
    @Url() url: string,
    @Res() res: Response,
  ) {
    const redirectUrl = await this.linkService.getLink(shortUrl, url);

    res.redirect(redirectUrl);
  }

  @Get('/api/v1/links')
  async getLinks(
    @Auth() token: string,
    @Query('title') title: string,
    @Query('page') page: number = 1,
    @Query('rowsPerPage') rowsPerPage: number = 10,
  ): Promise<CommonResponse<LinkResponse[]>> {
    const request: LinkSearchRequest = {
      title,
      page,
      rowsPerPage,
    };

    return await this.linkService.getLinksPerUser(token, request);
  }

  @Delete('/api/v1/links/:id')
  async deleteLink(
    @Auth() token: string,
    @Param('id') id: string,
  ): Promise<CommonResponse<boolean>> {
    const response = await this.linkService.deleteLink(token, id);

    return {
      statusCode: HttpStatus.OK,
      message: 'Link deleted successfully',
      data: response,
    };
  }
}
