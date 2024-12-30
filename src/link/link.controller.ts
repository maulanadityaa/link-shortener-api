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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

@Controller()
export class LinkController {
  constructor(private linkService: LinkService) {}

  @Post('/api/v1/links')
  @ApiOperation({
    summary: 'Create a new link for logged in user',
    description:
      'This endpoint requires a valid access token for authorization.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Link created successfully',
    type: LinkResponse,
  })
  @ApiConsumes('application/json')
  @ApiBody({ type: LinkRequest })
  @ApiBearerAuth()
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
  @ApiOperation({
    summary: 'Create a new public link',
    description:
      'This endpoint does not require any authorization. The title will be generated randomly',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Link created successfully',
    type: LinkResponse,
  })
  @ApiConsumes('application/json')
  @ApiBody({ type: LinkRequest })
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
  @ApiExcludeEndpoint()
  async redirect(
    @Param('shortUrl') shortUrl: string,
    @Url() url: string,
    @Res() res: Response,
  ) {
    const redirectUrl = await this.linkService.getLink(shortUrl, url);

    res.redirect(redirectUrl);
  }

  @Get('/api/v1/links')
  @ApiOperation({
    summary: 'Get all links for logged in user',
    description:
      'This endpoint requires a valid access token for authorization.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Links retrieved successfully',
    type: LinkResponse,
    isArray: true,
  })
  @ApiBearerAuth()
  @ApiQuery({
    name: 'title',
    description: 'Title',
    example: 'Title',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    description: 'Page number (Optional) - default 1',
    example: 1,
    required: false,
  })
  @ApiQuery({
    name: 'rowsPerPage',
    description: 'Rows per page (Optional) - default 10',
    example: 10,
    required: false,
  })
  async getLinks(
    @Auth() token: string,
    @Query('title') title: string,
    @Query('page') page: number = 1,
    @Query('rowsPerPage') rowsPerPage: number = 10,
  ): Promise<CommonResponse<LinkResponse[]>> {
    const request: LinkSearchRequest = {
      title,
      page: parseInt(String(page)) || 1,
      rowsPerPage: parseInt(String(rowsPerPage)) || 10,
    };

    return await this.linkService.getLinksPerUser(token, request);
  }

  @Delete('/api/v1/links/:id')
  @ApiOperation({
    summary: 'Delete a link for logged in user',
    description:
      'This endpoint requires a valid access token for authorization.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Link deleted successfully',
    type: Boolean,
  })
  @ApiBearerAuth()
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
