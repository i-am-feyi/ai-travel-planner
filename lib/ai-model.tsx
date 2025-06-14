// // To run this code you need to install the following dependencies:
// // npm install @google/genai mime
// // npm install -D @types/node

// import { GoogleGenAI } from "@google/genai";
// import { GoogleGenerativeAI } from "@google/generative-ai"

// export const action = async () => {

//   const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
//   const unsplashApiKey = process.env.UNSPLASH_API_KEY!;

//   try {
//     const prompt = `Generate a ${numberOfDays}-day travel itinerary for ${country} based on the following user information:
//         Budget: '${budget}'
//         Interests: '${interests}'
//         TravelStyle: '${travelStyle}'
//         GroupType: '${groupType}'
//         Return the itinerary and lowest estimated price in a clean, non-markdown JSON format with the following structure:
//         {
//         "name": "A descriptive title for the trip",
//         "description": "A brief description of the trip and its highlights not exceeding 100 words",
//         "estimatedPrice": "Lowest average price for the trip in USD, e.g.$price",
//         "duration": ${numberOfDays},
//         "budget": "${budget}",
//         "travelStyle": "${travelStyle}",
//         "country": "${country}",
//         "interests": ${interests},
//         "groupType": "${groupType}",
//         "bestTimeToVisit": [
//           '🌸 Season (from month to month): reason to visit',
//           '☀️ Season (from month to month): reason to visit',
//           '🍁 Season (from month to month): reason to visit',
//           '❄️ Season (from month to month): reason to visit'
//         ],
//         "weatherInfo": [
//           '☀️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
//           '🌦️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
//           '🌧️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
//           '❄️ Season: temperature range in Celsius (temperature range in Fahrenheit)'
//         ],
//         "location": {
//           "city": "name of the city or region",
//           "coordinates": [latitude, longitude],
//           "openStreetMap": "link to open street map"
//         },
//         "itinerary": [
//         {
//           "day": 1,
//           "location": "City/Region Name",
//           "activities": [
//             {"time": "Morning", "description": "🏰 Visit the local historic castle and enjoy a scenic walk"},
//             {"time": "Afternoon", "description": "🖼️ Explore a famous art museum with a guided tour"},
//             {"time": "Evening", "description": "🍷 Dine at a rooftop restaurant with local wine"}
//           ]
//         },
//         ...
//         ]
//     }`;

//      const textResult = await genAI
//             .getGenerativeModel({ model: 'gemini-2.0-flash' })
//             .generateContent([prompt])

//         const trip = parseMarkdownToJson(textResult.response.text());

//         const imageResponse = await fetch(
//             `https://api.unsplash.com/search/photos?query=${country} ${interests} ${travelStyle}&client_id=${unsplashApiKey}`
//         );

//         const imageUrls = (await imageResponse.json()).results.slice(0, 3)
//             .map((result: any) => result.urls?.regular || null);
//   } catch (error) {
//     console.log("Error generating travel plan:", error);
//   }

//   const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY,
//   });

//   const GemAI = new GoogleGenerativeAI(process);
//   const config = {
//     responseMimeType: "application/json",
//   };
//   const model = "gemini-1.5-flash";
//   const contents = [
//     {
//       role: "user",
//       parts: [
//         {
//           text: `Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Uri, Geo Coordinates, ticket Pricing, rating, Time to travel each of the location for 3 days with each day plan with best time to visit in JSON format.`,
//         },
//       ],
//     },
//     {
//       role: "model",
//       parts: [
//         {
//           text: `\`\`\`json
// {
//   "hotelOptions": [
//     {
//       "hotelName": "Circus Circus Hotel & Casino",
//       "hotelAddress": "2880 Las Vegas Blvd S, Las Vegas, NV 89109",
//       "price": {
//         "currency": "USD",
//         "min": 40,
//         "max": 100
//       },
//       "hotelImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/CircusCircusLasVegas.jpg/1280px-CircusCircusLasVegas.jpg",
//       "geoCoordinates": {
//         "latitude": 36.1209,
//         "longitude": -115.172
//       },
//       "rating": 3.5,
//       "description": "A classic Vegas hotel with affordable rooms and a lively atmosphere.  Features a free circus acts."
//     },
//     {
//       "hotelName": "The D Las Vegas",
//       "hotelAddress": "300 Fremont Street, Las Vegas, NV 89101",
//       "price": {
//         "currency": "USD",
//         "min": 50,
//         "max": 120
//       },
//       "hotelImageURL": "https://www.vegasexperience.com/wp-content/uploads/2016/04/The-D-Las-Vegas-Hotel-and-Casino.jpg",
//       "geoCoordinates": {
//         "latitude": 36.1668,
//         "longitude": -115.140
//       },
//       "rating": 4.0,
//       "description": "Downtown location, stylish and modern,  offers good value for money."
//     },
//     {
//       "hotelName": "Main Street Station Casino, Brewery & Hotel",
//       "hotelAddress": "200 Bonneville Ave, Las Vegas, NV 89101",
//       "price": {
//         "currency": "USD",
//         "min": 45,
//         "max": 90
//       },
//       "hotelImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Main_Street_Station_Hotel_and_Casino.jpg/1280px-Main_Street_Station_Hotel_and_Casino.jpg",
//       "geoCoordinates": {
//         "latitude": 36.1673,
//         "longitude": -115.138
//       },
//       "rating": 3.8,
//       "description": "Historic hotel in downtown Las Vegas, known for its brewery and affordable prices."
//     }
//   ],
//   "itinerary": {
//     "day1": {
//       "plan": [
//         {
//           "placeName": "Fremont Street Experience",
//           "placeDetails": "Free light show, street performers, zip lines.",
//           "placeImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Fremont_Street_Experience_at_night.jpg/1280px-Fremont_Street_Experience_at_night.jpg",
//           "geoCoordinates": {
//             "latitude": 36.167,
//             "longitude": -115.14
//           },
//           "ticketPricing": "Free",
//           "rating": 4.5,
//           "travelTime": "5 minutes (from Downtown Hotels)" ,
//           "bestTime": "Evening (for the light show)"
//         },
//         {
//           "placeName": "Container Park",
//           "placeDetails": "Unique shopping and dining experience in repurposed shipping containers.",
//           "placeImageURL": "https://www.lasvegas.com/wp-content/uploads/2017/11/Container-Park-Las-Vegas-Strip.jpg",
//           "geoCoordinates": {
//             "latitude": 36.1648,
//             "longitude": -115.1416
//           },
//           "ticketPricing": "Free entry",
//           "rating": 4.0,
//           "travelTime": "10 minutes (from Fremont Street)",
//           "bestTime": "Afternoon or early evening"
//         }
//       ]
//     },
//     "day2": {
//       "plan": [
//         {
//           "placeName": "The Strip (walkable sections)",
//           "placeDetails": "Explore the iconic hotels and casinos on the Strip. Focus on a few areas to avoid fatigue.",
//           "placeImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Las_Vegas_Strip_at_night_2017.jpg/1280px-Las_Vegas_Strip_at_night_2017.jpg",
//           "geoCoordinates": {
//             "latitude": 36.11,
//             "longitude": -115.17
//           },
//           "ticketPricing": "Free (unless entering casinos/attractions)",
//           "rating": 5.0,
//           "travelTime": "Depends on walking distance",
//           "bestTime": "Late afternoon to evening"

//         },
//         {
//           "placeName": "Bellagio Conservatory & Botanical Gardens",
//           "placeDetails": "Stunning floral displays (free)",
//           "placeImageURL": "https://www.bellagio.com/content/dam/bellagio/images/conservatory/conservatory-botanical-gardens-fall-2022-hero.jpg",
//           "geoCoordinates": {
//             "latitude": 36.1146,
//             "longitude": -115.1759
//           },
//           "ticketPricing": "Free",
//           "rating": 4.5,
//           "travelTime": "Short walk from many Strip Hotels",
//           "bestTime": "Anytime"
//         }
//       ]
//     },
//     "day3": {
//       "plan": [
//         {
//           "placeName": "Seven Magic Mountains",
//           "placeDetails": "Colorful art installation south of Las Vegas (requires transport).",
//           "placeImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Seven_Magic_Mountains_from_the_road.jpg/1280px-Seven_Magic_Mountains_from_the_road.jpg",
//           "geoCoordinates": {
//             "latitude": 36.0069,
//             "longitude": -114.985
//           },
//           "ticketPricing": "Free (but requires transport)",
//           "rating": 4.2,
//           "travelTime": "30-45 minutes drive from Strip (Uber/Lyft recommended)",
//           "bestTime": "Late afternoon for nice sunset photos"
//         },
//          {
//           "placeName": "Red Rock Canyon National Conservation Area (short hike)",
//           "placeDetails": "Scenic drives and short hiking trails (entrance fee applies)",
//           "placeImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Red_Rock_Canyon_National_Conservation_Area.jpg/1280px-Red_Rock_Canyon_National_Conservation_Area.jpg",
//           "geoCoordinates": {
//             "latitude": 36.206,
//             "longitude": -115.752
//           },
//           "ticketPricing": "Entrance fee applies (check NPS website)",
//           "rating": 4.5,
//           "travelTime": "30-45 minutes drive from Strip (Uber/Lyft recommended)",
//           "bestTime": "Morning or late afternoon to avoid heat"
//         }
//       ]
//     }
//   }
// }
// \`\`\`

// **Important Notes:**

// * **Prices:** Hotel and activity prices are estimates and can vary greatly depending on the season and availability.  Always check current prices before booking.
// * **Transportation:**  Consider using ride-sharing services (Uber/Lyft) for transportation, especially to Seven Magic Mountains and Red Rock Canyon.  Walking is feasible for many Strip attractions and Downtown Las Vegas.  The Las Vegas Monorail can be cost effective along parts of the Strip.
// * **Free Activities:** Las Vegas offers many free attractions, so you can have a fun and memorable trip without breaking the bank.
// * **Food:**  Budgeting for food is crucial. Look for happy hour deals, food courts, and affordable eateries to save money.
// * **Heat:** Las Vegas can be extremely hot, especially during summer. Plan your outdoor activities accordingly and stay hydrated.

// This JSON provides a framework.  You'll need to verify pricing, availability, and opening hours closer to your travel dates.  Use online resources like TripAdvisor, Google Maps, and the official websites of attractions and hotels for the most up-to-date information.
// `,
//         },
//       ],
//     },
//   ];

//   const response = await ai.models.generateContentStream({
//     model,
//     config,
//     contents,
//   });
//   let fileIndex = 0;
//   for await (const chunk of response) {
//     console.log(chunk.text);
//   }
// }
