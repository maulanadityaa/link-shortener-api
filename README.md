<p align="center">

<h2 align="center">Link Shortener API</h2>
</p>

### Built With

- [NestJS v10.4.15](https://nestjs.com/)
- [Prisma v6.1.0](https://prisma.io/)
- [PostgreSQL](https://www.postgresql.org/docs/)
- [Supabase](https://supabase.com/)

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- Text Editor
- PgAdmin or other PostgreSQL DBMS
- Postman or other API Testing Apps<br/>
- NPM 

### Installation

1. Clone the repo
   ```sh
    https://github.com/maulanadityaa/link-shortener-api.git
   ```
2. Rename .env.example to .env and change few config

   ```env
    PORT=3000
    APP_NAME="Link Shortener API"
    APP_DESCRIPTION="Link Shortener API"
    APP_AUTHOR_NAME=YOUR_NAME
    APP_AUTHOR_EMAIL=YOUR_EMAIL
    APP_AUTHOR_URL=YOUR_URL
    APP_VERSION="1.0.0"
    APP_LOCAL_URL="http://localhost:8000"
    APP_PROD_URL=YOUR_PROD_URL
    
    DATABASE_URL=YOUR_SUPABASE_DATABASE_URL 
    DIRECT_URL=YOUR_SUPABASE_DIRECT_URL
    
    JWT_SECRET=YOUR_JWT_SECRET
   ```

3. Install all packages

   ```sh
   npm install
   ```

4. Run the migration

   ```sh
    npx prisma migrate dev
    ```

5. Then run the project

   ```sh
   npm run start:dev
   ```

## API Documentation

Visit -  [API Documentation](https://link-shortener-api-one.vercel.app/api/v1/docs)

### Example Request

- Endpoint : `/api/v1/links`
- Method : POST
- Header : Authorization : Bearer {token}
- Content-Type: application/json
- Accept: application/json
- Body :

```json
{
  "title": "Google",
  "url": "https://www.google.com"
}
```

### Example Response

```json
{
  "statusCode": 201,
  "message": "Link created successfully",
  "data": {
    "id" : "9538107b-6596-44ca-9677-bb2682bb611f",
    "url": "https://www.google.com",
    "shortUrl": "https://link-shortener-api-one.vercel.app/r/Google"
  }
}
```

<!-- CONTACT -->

## Contact

M Maulana Z Aditya -
Instagram - [@maulanadityaa](https://instagram.com/maulanadityaa)

Project Link: [https://github.com/maulanadityaa/link-shortener-api](https://github.com/maulanadityaa/link-shortener-api)
