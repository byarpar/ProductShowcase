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

## Project Structure

- `/app`: Contains the main application code
  - `/api`: API routes for handling server-side logic
  - `/components`: Reusable React components
  - `page.tsx`: Main page component
- `/lib`: Utility functions and database connection
- `next.config.js`: Next.js configuration
- `tailwind.config.js`: Tailwind CSS configuration

## Adding a Product

1. Navigate to the homepage
2. Fill in the product details (name, description, price)
3. Upload an image by dragging and dropping or clicking the upload area
4. Click the "Add Product" button

The product will be added to the database and displayed in the product grid.

## Deployment

This project is ready to be deployed on Vercel. Follow these steps:

1. Push your code to a GitHub repository
2. Create a new project on Vercel and import your GitHub repository
3. Set up the environment variables in the Vercel project settings
4. Deploy the project

## Contributing

Contributions to the Product Showcase project are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch: \`git checkout -b feature/your-feature-name\`
3. Make your changes and commit them: \`git commit -m 'Add some feature'\`
4. Push to the branch: \`git push origin feature/your-feature-name\`
5. Submit a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or feedback, please open an issue on the GitHub repository.

Thank you for using Product Showcase!

