# Amazin E-commerce Portfolio Project

## Overview

This is a mock e-commerce portfolio project built with Next.js for a fictional platform named "Amazin". It showcases a range of modern web development technologies and practices.

## Tech Stack

- **Frontend**: Next.js (App Router), TypeScript, ChadCN UI library
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (hosted on Vercel)
- **ORM**: Prisma
- **Authentication**: Auth.js
- **Styling**: Tailwind CSS (via ChadCN UI)

## Key Features

### Database Design

- **Category Hierarchy**: Categories can have multiple subcategories
- **Sales Integration**: Categories can be labeled for sales, applying discounts to all products
- **Efficient Product Fetching**: Products inherit all parent category labels for quick retrieval
- **Homepage Prioritization**: Categories have a priority field for homepage display
- **Special Categories**: "SALE", "POPULAR", and "NEW" have highest priority
- **Featured Items**: Special grid on homepage for marketable items (categories or products)
- **Sales and Discounts**:
  - Time-limited sales with countdown
  - Multiple discount types (fixed or percentage) per sale
- **User Reviews**: Allows users to add opinions on products
- **Cart and Wishlist**:
  - Anonymous or user-assigned
  - Cookie-based for non-logged in users (30-day lifespan)
  - Seamless transfer from anonymous to user account upon login

### Pages

1. **Home**: Streaming content with Suspense (categories, featured grid, top categories)
2. **Search**: Client-side filtering and pagination
3. **Single Product**: Detailed view with images, description, and stock info
4. **About**: Company statistics and team carousel
5. **Cart**: Dynamic item management and price calculation
6. **Wishlist**: Displays user's wishlist and highest priority category
7. **Contact**: Form submission using SendGrid for email notifications
8. **Privacy Policy and Terms of Service**: Static informational pages
9. **Sign In/Sign Up**: Custom authentication pages with server-side actions

### Additional Features

- Email validation for registration
- Password hashing with bcrypt
- Server-side rendering for improved SEO and performance

## Planned Features

- Admin dashboard with middleware validation
- Product variants
- Enhanced search filters
- Improved cart and checkout actions
- SEO optimization (metadata, slug-based URLs)
- Stripe integration for payments
- Inventory management system
- More robust sales and discount management (coupons, bundles)
- Additional authentication providers
