import { ApiProperty } from '@nestjs/swagger';

export class LinkRequest {
  @ApiProperty({ example: 'Title', description: 'Title' })
  title: string;

  @ApiProperty({ example: 'https://www.google.com', description: 'URL' })
  url: string;
}

export class LinkSearchRequest {
  @ApiProperty({ example: 'Title', description: 'Title (Optional)' })
  title?: string;

  @ApiProperty({ example: 10, description: 'Rows per page (Optional)' })
  rowsPerPage?: number;

  @ApiProperty({ example: 1, description: 'Page number (Optional)' })
  page?: number;
}

export class LinkResponse {
  @ApiProperty({ example: 'ValidUUIDv4', description: 'Link ID' })
  id: string;

  @ApiProperty({
    example: process.env.APP_PROD_URL + 'r/title',
    description: 'Shortened URL',
  })
  shortUrl: string;

  @ApiProperty({ example: 'https://www.google.com', description: 'URL' })
  url: string;
}
