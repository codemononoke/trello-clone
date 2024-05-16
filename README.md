# Trello Clone

A full-stack Trello clone built with Next.js, Prisma, Clerk, and Stripe.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [License](#license)

## Features

- User authentication and authorization with Clerk
- Task management (create, read, update, delete tasks)
- Payment processing with Stripe
- Responsive design

## Demo

Check out the live demo: [Trello Clone](https://trello-clone-six-red.vercel.app) (link to your live demo)

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS
- **Backend:** Next.js API routes, Prisma, PostgreSQL
- **Authentication:** Clerk
- **Payments:** Stripe
- **Deployment:** Vercel

## Installation

1. Clone the repository
    ```bash
    git clone https://github.com/codemononoke/trello-clone
    cd trello-clone
    ```

2. Install dependencies
    ```bash
    npm install
    ```

3. Set up your Prisma schema
    ```bash
    npx prisma generate
    npx prisma migrate dev --name init
    ```
    
## Environment Variables

Create a `.env` file in the root of your project and add the following variables:

```env
# clerk auth keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
CLERK_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# clerk redirect url(s)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# mysql db url
DATABASE_URL=<your-db-url>

# unsplash api key
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# stripe api & webhook key
STRIPE_API_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# app base url
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Usage

1. Run the development server
    ```bash
    npm run dev
    ```

2. Open http://localhost:3000 with your browser to see the result.

## License

This project is licensed under the MIT License.
