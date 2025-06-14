export const generateTripPrompt = ({
  location,
  groupType,
  numberOfDays,
  travelStyle,
  interests,
  budget,
}: {
  location: string;
  groupType: string;
  numberOfDays: number;
  travelStyle: string;
  interests: string[];
  budget: string;
}) => {
  return `
Generate a ${numberOfDays}-day travel plan to ${location} for a ${groupType}. Base the plan on the following preferences:

- Budget: ${budget}
- Travel Style: ${travelStyle}
- Interests: ${interests.join(", ")}

### Instructions:

1. Return the response as a valid, **clean JSON**. Do **not** include any markdown formatting or triple backticks.
2. The structure must include two main sections:
   - \`hotels\`: List 3-5 suitable hotel options with:
     - hotelName
     - address
     - estimatedPricePerNight (in USD)
     - latitude
     - longitude
     - rating (out of 5)
     - description
     - The hotel should be in the same city as the location or in the same country as the location and it should match the travel budget..
   - \`itinerary\`: List for each day in an array of objects:
     - day: number (1–${numberOfDays})
     - location: name of city/area for that day
     - activities: array of:
       - placeName
       - placeDetails
       - latitude
       - longitude
       - ticketPrice (USD, if applicable)
       - rating (out of 5)
       - timeOfDay (e.g., Morning, Afternoon, Evening)
       - estimatedTravelTime (from previous location, in minutes)
       - imageUrl of the place of the activity

3. Include an overview section:
   - title: name of the trip
   - location: the location of the trip
   - travelStyle: the style of travel for the trip
   - groupType: the type of group for the trip
   - interests: the interests of the trip
   - budget: the budget of the trip
   - numberOfDays: the number of days for the trip
   - description: 2-3 paragraphs of short summary of the trip and its highlights. The first paragraph should be a short summary of the destination while the second and third paragraphs should be a summary of the trip and its highlights. Also, the paragraphs should be in an array of strings. Below is an example of the description which you can model but do not limit yourself to it:
      - "The Maldives is a tropical paradise in the Indian Ocean, known for its crystal-clear waters, white sandy beaches, and luxurious overwater villas. Consisting of 26 atolls and over 1,000 coral islands, it is a dream destination for travelers seeking relaxation and adventure.
      Visitors can enjoy world-class snorkeling and scuba diving, with vibrant coral reefs teeming with marine life, including manta rays and sea turtles. The Maldives also offers breathtaking sunsets, private island experiences, and some of the best spa and wellness retreats..."
    
   - estimatedTotalPrice: lowest estimate for the full trip (USD)
   - bestTimeToVisit: per season, give suggestions
   - weatherInfo: seasonal temperature info with naming sspecific to the location's weather types (e.g rainy, dry, fall, autumn, spring, e.t.c).
   - generalLocation:
     - cityOrRegionName: city or region name
     - coordinates
     - openStreetMap link

For each hotel and activity, provide a realistic and specific image URL.
Use known sources like:
- Google Maps and Google Places
Do not use placeholder links or "example.com". The images must be relevant and directly tied to the location or business.

Make the output highly structured and parseable. Do not add explanations, extra text, markdown, or commentary.
Only return valid JSON.
`;
};
