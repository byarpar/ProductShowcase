# Product Showcase

Product Showcase is a full-stack Next.js application that allows users to upload and display product images and information. It uses MongoDB for data storage and Cloudinary for image hosting, featuring a modern, responsive design with a glassmorphism aesthetic.

## Features

- Upload product images with details (name, description, price)
- Display products in a responsive grid layout
- Glassmorphism design for a modern UI
- Server-side rendering for improved performance and SEO
- Image optimization using Next.js Image component
- Cloudinary integration for efficient image storage and delivery
- MongoDB database for storing product information

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm or yarn
- MongoDB account
- Cloudinary account

## Installation

1. Clone the repository:
   \```bash
   git clone https://github.com/yourusername/product-showcase.git
   cd product-showcase
   \```

2. Install the dependencies:
   \```bash
   npm install
   # or
   yarn install
   \```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:

   \```
   MONGODB_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   \```

   Replace the values with your actual MongoDB and Cloudinary credentials.

## Usage

To run the development server:

\```bash
npm run dev
# or
yarn dev
\```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

View Demo_(https://product-showcase-pearl.vercel.app/)


