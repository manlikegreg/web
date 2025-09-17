# Science 1B Backend API (Prisma)

A modern Express.js backend API with PostgreSQL and Prisma ORM for the Science 1B website.

## Features

- **Express.js** - Fast, unopinionated web framework
- **PostgreSQL** - Robust relational database
- **Prisma ORM** - Type-safe database access
- **TypeScript** - Type safety and better developer experience
- **Jest** - Comprehensive testing suite
- **Input Validation** - Request validation with express-validator
- **Error Handling** - Centralized error handling
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API rate limiting
- **Security** - Helmet.js for security headers

## Entities

### Student
- `id` - Unique identifier
- `name` - Student's full name
- `role` - Student's role/position
- `profilePic` - Profile picture URL (optional)
- `bio` - Student biography (optional)
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### Article
- `id` - Unique identifier
- `title` - Article title
- `content` - Article content
- `authorId` - Reference to student who wrote the article
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### Gallery
- `id` - Unique identifier
- `imageUrl` - Image URL
- `caption` - Image caption (optional)
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## API Endpoints

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Articles
- `GET /api/articles` - Get all articles (with pagination)
- `GET /api/articles/:id` - Get article by ID
- `POST /api/articles` - Create new article
- `PUT /api/articles/:id` - Update article
- `DELETE /api/articles/:id` - Delete article

### Gallery
- `GET /api/gallery` - Get all gallery items (with pagination)
- `GET /api/gallery/:id` - Get gallery item by ID
- `POST /api/gallery` - Create new gallery item
- `PUT /api/gallery/:id` - Update gallery item
- `DELETE /api/gallery/:id` - Delete gallery item

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend-prisma
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` with your database credentials:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/science_1b_db?schema=public"
   PORT=5000
   NODE_ENV=development
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed the database
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000`

## Available Scripts

### Development
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server

### Database
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Create and run migrations
- `npm run db:deploy` - Deploy migrations to production
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

### Testing
- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

### Code Quality
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier

## Testing

The project includes comprehensive tests for all endpoints:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Test Structure

- `src/__tests__/students.test.ts` - Student endpoint tests
- `src/__tests__/articles.test.ts` - Article endpoint tests
- `src/__tests__/gallery.test.ts` - Gallery endpoint tests

## API Documentation

### Request/Response Format

All API responses follow this format:

```json
{
  "success": boolean,
  "data": any,
  "error": string,
  "message": string,
  "pagination": {
    "page": number,
    "limit": number,
    "total": number,
    "totalPages": number
  }
}
```

### Error Handling

The API includes comprehensive error handling:

- **400 Bad Request** - Validation errors
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server errors

### Validation

All input is validated using express-validator:

- **Students**: Name (2-100 chars), Role (2-50 chars), Bio (max 500 chars)
- **Articles**: Title (5-200 chars), Content (min 10 chars), Author ID required
- **Gallery**: Image URL (valid URL), Caption (max 200 chars)

## Deployment

### Render.com

1. **Connect your GitHub repository to Render**
2. **Create a new Web Service**
3. **Configure build settings:**
   - Build Command: `npm install && npm run db:generate && npm run build`
   - Start Command: `npm run db:deploy && npm start`
4. **Add environment variables:**
   - `DATABASE_URL` - From Render PostgreSQL database
   - `NODE_ENV` - `production`
   - `JWT_SECRET` - Generate a secure secret
   - `FRONTEND_URL` - Your frontend URL

### Environment Variables

```env
# Required
DATABASE_URL=postgresql://username:password@host:port/database?schema=public
NODE_ENV=production
PORT=10000

# Optional
JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://your-frontend-url.com
```

## Database Schema

The database schema is defined in `prisma/schema.prisma`:

```prisma
model Student {
  id         String   @id @default(cuid())
  name       String
  role       String
  profilePic String?  @map("profile_pic")
  bio        String?
  createdAt  DateTime @default(now()) @map("created_at")
  updatedAt  DateTime @updatedAt @map("updated_at")
  articles   Article[]
}

model Article {
  id        String   @id @default(cuid())
  title     String
  content   String
  authorId  String   @map("author_id")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
  author    Student  @relation(fields: [authorId], references: [id], onDelete: Cascade)
}

model Gallery {
  id        String   @id @default(cuid())
  imageUrl  String   @map("image_url")
  caption   String?
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run tests and linting
6. Submit a pull request

## License

This project is licensed under the MIT License.
