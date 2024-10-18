
![Logo](https://i.ibb.co/3FXQyg3/logo-transparent-png.png)


# Pishipoa

Pishipoa is a recipe-sharing web application that allows users to create, upload, search, and favorite recipes. The app integrates external recipes using the Edamam API and offers a seamless user experience with authentication through Google and GitHub. Pishipoa empowers users to discover new recipes and save their favorites.
## Features

- User Authentication: Sign up and log in with Google or GitHub using NextAuth.js.
- RecipeUpload:Authenticated users can create and upload their own recipes.
- Search Recipes: Search for recipes using the Edamam API.
- Favorite Recipes: Users can save their favorite recipes to view them later.
- Dynamic Recipe Pages: Each recipe has its own detail page with full instructions aabd ingredients.
## Technologies Used

- Frontend: Next.js, Tailwind CSS
- Authentication: NextAuth.js (Google, GitHub)
- API: Edamam API
- State Management: React Hooks (`useState`, `useEffect`)
- Database: MongoDB (for user and recipe storage)
- CSS Framework: Tailwind CSS for responsive UI
## Installation
- Node.js (v14 or higher)
- MongoDB (running locally or on a cloud platform like MongoDB Atlas)
- Edamam API credentials
- Next Auth credentials
## Clone the repository
- git clone https://github.com/your-username/Pishipoa.git

- cd pishipoa
## Installation


```bash
  npm install
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- EDAMAM_APP_ID=your-edamam-app-id
- EDAMAM_APP_KEY=your-edamam-app-key
- MONGO_DB_CONNECTION_STRING=your-mongodb-connection-string
- AUTH_SECRET=your-auth-secret
- GOOGLE_CLIENT_ID=your-google-client-id
- GOOGLE_CLIENT_SECRET=your-google-client-secret
- GITHUB_CLIENT_ID=your-github-client-id
- GITHUB_CLIENT_SECRET=your-github-client-secret


## Run the development server

- npm run dev
## Authors

- [Abdirahman Abdi](https://www.github.com/abdirahmanmohamedabdi)

