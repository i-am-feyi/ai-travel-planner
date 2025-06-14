# AI Travel Planner

An intelligent travel planning application that uses AI to generate personalized travel itineraries based on your preferences. Built with Next.js, TypeScript, and modern web technologies.

## 🌟 Features

- **AI-Powered Trip Generation**: Create detailed travel plans using Google's Gemini AI
- **Smart Itinerary Planning**: Get day-by-day itineraries with activities, timings, and travel details
- **Hotel Recommendations**: Curated hotel suggestions with prices, ratings, and images
- **Interactive Maps**: View locations and get directions for all activities
- **Image Integration**: Beautiful destination photos from Unsplash and Google Places
- **Share Functionality**: Share your travel plans with friends and family
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **AI Integration**: Google Gemini
- **Image Services**: Unsplash API, Google Places API
- **UI Components**: Shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **API Client**: Hono.js
- **Form Handling**: React Hook Form with Zod validation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Google Cloud Platform account (for Gemini AI and Places API)
- Unsplash API key
- Clerk account

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://..."

# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""

# AI & APIs
GOOGLE_API_KEY=""
UNSPLASH_ACCESS_KEY=""

# Other
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/i-am-pheyee/ai-travel-planner.git
cd ai-travel-planner
```

2. Install dependencies:

```bash
npm install
```

3. Set up the database:

```bash
npx prisma generate
npx prisma db push
```

4. Start the development server:

```bash
npm run dev
```

## 📱 Usage

1. **Create a Trip**:

   - Enter your destination
   - Select travel style and group type
   - Specify budget and interests
   - Let AI generate your personalized itinerary

2. **View Trip Details**:

   - Browse through day-by-day activities
   - Check hotel recommendations
   - View destination images
   - Get location details and directions

3. **Share Your Trip**:
   - Copy trip link
   - Share with friends and family

## 🏗️ Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   └── app/               # Main application pages
├── components/            # Reusable UI components
├── features/             # Feature-based modules
│   └── trip/             # Trip-related features
├── lib/                  # Utility functions and configurations
├── prisma/               # Database schema and migrations
└── public/               # Static assets
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for trip generation
- Unsplash for beautiful destination photos
- Google Places API for location data
- Shadcn/ui for the component library
- Clerk for authentication
