export const tripTestData = {
  success: true,
  baseTripData: {
    overview: {
      title: "Luxury Parisian Culinary & Nightlife Escape",
      description:
        "Indulge in a luxurious 2-day solo trip to Paris, France, focusing on exquisite cuisine, vibrant nightlife, and iconic city experiences. This itinerary is designed for a premium budget, ensuring the best Paris has to offer.",
      estimatedTotalPrice: 3500,
      bestTimeToVisit: {
        Spring:
          "April-May: Pleasant weather, blooming gardens, fewer crowds than summer.",
        Summer:
          "June-August: Warmest weather, but also the busiest and most expensive time.",
        Autumn:
          "September-October: Mild temperatures, stunning fall foliage, fewer tourists.",
        Winter:
          "November-March: Coldest weather, but also the most romantic and festive, especially during the Christmas season.",
      },
      weatherInfo: {
        Spring: "10-20°C (50-68°F)",
        Summer: "20-30°C (68-86°F)",
        Autumn: "10-20°C (50-68°F)",
        Winter: "2-8°C (36-46°F)",
      },
      generalLocation: {
        cityOrRegionName: "Paris",
        coordinates: {
          latitude: 48.8566,
          longitude: 2.3522,
        },
        openStreetMapLink: "https://www.openstreetmap.org/#map=12/48.8566/2.3522",
      },
    },
    hotels: [
      {
        hotelName: "Four Seasons Hotel George V Paris",
        address: "31 Avenue George V, 75008 Paris, France",
        estimatedPricePerNight: 1800,
        latitiude: 48.8711,
        longitude: 2.3008,
        rating: 5,
        description:
          "An iconic luxury hotel near the Champs-Élysées, renowned for its exceptional service, Michelin-starred dining, and stunning floral arrangements.",
      },
      {
        hotelName: "Le Bristol Paris",
        address: "112 Rue du Faubourg Saint-Honoré, 75008 Paris, France",
        estimatedPricePerNight: 1600,
        latitiude: 48.8726,
        longitude: 2.3145,
        rating: 5,
        description:
          "A palace hotel with a rooftop pool, beautiful courtyard garden, and gourmet dining experiences.",
      },
      {
        hotelName: "The Peninsula Paris",
        address: "19 Avenue Kléber, 75116 Paris, France",
        estimatedPricePerNight: 1500,
        latitiude: 48.8662,
        longitude: 2.2934,
        rating: 5,
        description:
          "A modern luxury hotel with a rooftop terrace, exceptional dining options, and a world-class spa.",
      },
    ],
    itinerary: [
      {
        day: 1,
        location: "Paris",
        activities: [
          {
            placeName: "Eiffel Tower",
            placeDetails: "Visit the iconic Eiffel Tower for panoramic views of Paris.",
            latitiude: 48.8584,
            longitude: 2.2945,
            ticketPrice: 30,
            rating: 4.7,
            timeOfDay: "Morning",
            estimatedTravelTime: 0,
          },
          {
            placeName: "Le Jules Verne",
            placeDetails:
              "Enjoy a Michelin-starred lunch at Le Jules Verne, located on the second floor of the Eiffel Tower.",
            latitiude: 48.8584,
            longitude: 2.2945,
            ticketPrice: 250,
            rating: 4.5,
            timeOfDay: "Afternoon",
            estimatedTravelTime: 0,
          },
          {
            placeName: "Louvre Museum",
            placeDetails:
              "Explore the Louvre Museum and admire masterpieces like the Mona Lisa.",
            latitiude: 48.8606,
            longitude: 2.3376,
            ticketPrice: 20,
            rating: 4.6,
            timeOfDay: "Afternoon",
            estimatedTravelTime: 20,
          },
          {
            placeName: "Experimental Cocktail Club",
            placeDetails:
              "Experience innovative cocktails in a stylish speakeasy setting in the trendy Le Marais district.",
            latitiude: 48.8613,
            longitude: 2.3591,
            ticketPrice: 30,
            rating: 4.4,
            timeOfDay: "Evening",
            estimatedTravelTime: 20,
          },
          {
            placeName: "L'Arpège",
            placeDetails:
              "Indulge in a world-class Michelin-starred dinner at L'Arpège, known for its innovative vegetable-centric cuisine.",
            latitiude: 48.8535,
            longitude: 2.3085,
            ticketPrice: 400,
            rating: 4.8,
            timeOfDay: "Evening",
            estimatedTravelTime: 15,
          },
        ],
      },
      {
        day: 2,
        location: "Paris",
        activities: [
          {
            placeName: "Île de la Cité",
            placeDetails:
              "Visit Notre Dame Cathedral and Sainte-Chapelle, architectural gems on Île de la Cité.",
            latitiude: 48.853,
            longitude: 2.3499,
            ticketPrice: 12,
            rating: 4.5,
            timeOfDay: "Morning",
            estimatedTravelTime: 0,
          },
          {
            placeName: "Berthillon",
            placeDetails:
              "Enjoy artisanal ice cream at Berthillon, a famous ice cream shop on Île Saint-Louis.",
            latitiude: 48.8521,
            longitude: 2.3551,
            ticketPrice: 10,
            rating: 4.6,
            timeOfDay: "Morning",
            estimatedTravelTime: 5,
          },
          {
            placeName: "Champagne Tasting at a Boutique",
            placeDetails:
              "Participate in a private champagne tasting at a boutique in Saint-Germain-des-Prés.",
            latitiude: 48.8563,
            longitude: 2.3306,
            ticketPrice: 150,
            rating: 4.7,
            timeOfDay: "Afternoon",
            estimatedTravelTime: 20,
          },
          {
            placeName: "Shopping at Champs-Élysées",
            placeDetails: "Luxury shopping at the Champs-Élysées.",
            latitiude: 48.8738,
            longitude: 2.3036,
            ticketPrice: 0,
            rating: 4.3,
            timeOfDay: "Afternoon",
            estimatedTravelTime: 15,
          },
          {
            placeName: "Le Bar 228",
            placeDetails:
              "Enjoy live jazz and expertly crafted cocktails at Le Bar 228 in Le Meurice hotel.",
            latitiude: 48.8665,
            longitude: 2.3241,
            ticketPrice: 40,
            rating: 4.6,
            timeOfDay: "Evening",
            estimatedTravelTime: 20,
          },
          {
            placeName: "Plénitude",
            placeDetails:
              "Experience three-Michelin-starred dining by Arnaud Donckele at Plénitude in Cheval Blanc Paris.",
            latitiude: 48.8611,
            longitude: 2.3461,
            ticketPrice: 500,
            rating: 4.9,
            timeOfDay: "Evening",
            estimatedTravelTime: 15,
          },
        ],
      },
    ],
  },
  tripImages: [
    "https://images.unsplash.com/photo-1527507516-4de2af31545c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTkxODZ8MHwxfHNlYXJjaHwxfHxGcmFuY2UlMjBsdXh1cnklMjBUcmF2ZWx8ZW58MHwwfHx8MTc0ODkwNzY5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1730293539266-982bd1a9cf0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTkxODZ8MHwxfHNlYXJjaHwzfHxGcmFuY2UlMjBsdXh1cnklMjBUcmF2ZWx8ZW58MHwwfHx8MTc0ODkwNzY5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1730293539262-b76f80c97a5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTkxODZ8MHwxfHNlYXJjaHwyfHxGcmFuY2UlMjBsdXh1cnklMjBUcmF2ZWx8ZW58MHwwfHx8MTc0ODkwNzY5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
  ],
  enrichedTripData: {
    overview: {
      title: "Luxury Parisian Culinary & Nightlife Escape",
      description:
        "Indulge in a luxurious 2-day solo trip to Paris, France, focusing on exquisite cuisine, vibrant nightlife, and iconic city experiences. This itinerary is designed for a premium budget, ensuring the best Paris has to offer.",
      estimatedTotalPrice: 3500,
      bestTimeToVisit: {
        Spring:
          "April-May: Pleasant weather, blooming gardens, fewer crowds than summer.",
        Summer:
          "June-August: Warmest weather, but also the busiest and most expensive time.",
        Autumn:
          "September-October: Mild temperatures, stunning fall foliage, fewer tourists.",
        Winter:
          "November-March: Coldest weather, but also the most romantic and festive, especially during the Christmas season.",
      },
      weatherInfo: {
        Spring: "10-20°C (50-68°F)",
        Summer: "20-30°C (68-86°F)",
        Autumn: "10-20°C (50-68°F)",
        Winter: "2-8°C (36-46°F)",
      },
      generalLocation: {
        cityOrRegionName: "Paris",
        coordinates: {
          latitude: 48.8566,
          longitude: 2.3522,
        },
        openStreetMapLink: "https://www.openstreetmap.org/#map=12/48.8566/2.3522",
      },
    },
    hotels: [
      {
        hotelName: "Four Seasons Hotel George V Paris",
        address: "31 Av. George V, 75008 Paris, France",
        estimatedPricePerNight: 1800,
        latitiude: 48.8687444,
        longitude: 2.3008389,
        rating: 4.8,
        description:
          "An iconic luxury hotel near the Champs-Élysées, renowned for its exceptional service, Michelin-starred dining, and stunning floral arrangements.",
        imageUrl:
          "https://places.googleapis.com/v1/places/ChIJAcNYmcJv5kcR7EQ_IeMZp8c/photos/AXQCQNSv2_Z93Uc14sUnYbDmt3-SRhLPZPOlnVjf3-nrXh9CyZkLEqw8nduDfUDgAf1FoefOJ-__vyfqSyPhIcvPA-0nEv56uGg5BidMJ0JTRDCuVG2nYu_LX1QJ1_mH7OLgZQheLXsx3bT8p6qeOt-mOdOCLANqIsp6l3NyHK8dP9aB9yLGCIH0yjGhtkIZMZA9n7EW2Z2HjG5yWqdEfJBtMpUHJGQE-7UkJZV4krrqORnUq3FczRxvPdcxOroqBYpco8Sl_-3bqqcsZEJZJ7j06QoZcJEtCqIp_Embs0uhsdw0TQ/media?maxHeightPx=1000&maxWidthPx=1900&key=AIzaSyBjVEiaV7gMxGpYblLAHdyB56d7pQef8xQ",
      },
      {
        hotelName: "Le Bristol Paris",
        address: "112 Rue du Faubourg Saint-Honoré, 75008 Paris, France",
        estimatedPricePerNight: 1600,
        latitiude: 48.871686399999994,
        longitude: 2.3147995999999997,
        rating: 4.7,
        description:
          "A palace hotel with a rooftop pool, beautiful courtyard garden, and gourmet dining experiences.",
        imageUrl:
          "https://places.googleapis.com/v1/places/ChIJVeUHqupv5kcR4taEicvH7ww/photos/AXQCQNTgnci3eFFYzLyL4F1KtYZmnpBR56KFCOFUATxRKEaQYCwcFYvLChuwaOjt8vmIw-HQKIOm4yxz9tCw-ogOwlXRnRq7ZowDCmjlShX4UnX2QwjVd3bDYVzh0HhXqWYimneUww46Vvvl_1xwhjftlqBve0I7ZBcfhr9DvdMSaEFgHdkcdGaiJD9EhbQKGdZzNx9kEmitbyaJfq8BbiW7vqGYPexPlTLYNAI9ebAS5mD1OQR-5vKuJdaYEvEhdlcdzDzpyWOWcs97-cxY1yPLCSWBmVlSr-JkSTSE2ftHPQckcQ/media?maxHeightPx=1000&maxWidthPx=1900&key=AIzaSyBjVEiaV7gMxGpYblLAHdyB56d7pQef8xQ",
      },
      {
        hotelName: "The Peninsula Paris",
        address: "19 Av. Kléber, 75116 Paris, France",
        estimatedPricePerNight: 1500,
        latitiude: 48.871018199999995,
        longitude: 2.293689,
        rating: 4.7,
        description:
          "A modern luxury hotel with a rooftop terrace, exceptional dining options, and a world-class spa.",
        imageUrl:
          "https://places.googleapis.com/v1/places/ChIJjYzV7O5v5kcRCKONjpjWenU/photos/AXQCQNSRib7v2DScdcTK_ygDbhKDw-Kyj9jQzxJkbJqYGiaeDZVf2hql1jf-ED_Y2ribDRNRf2P7zhmQJ0lLlUFtffzUXeyyUqqXpMjkO486jPXpgF7P-0TBDzNunt4jk-lpv0EYAQBBbINazbg4Qx_yLNUu3n2W1Siiu5010JeS1w7E9X8sBV_fF-JoTHbOH00N_GJkFJN4kIBOaaaeVIYM9e-VXJbMhLpFreenNv5WSw1KX8SK3zEnFnZiCuszWM7rNUqZy9qy1D1ua4-qH-ca4Skb9VXJmqA83fKrXUFXbvM/media?maxHeightPx=1000&maxWidthPx=1900&key=AIzaSyBjVEiaV7gMxGpYblLAHdyB56d7pQef8xQ",
      },
    ],
    itinerary: [
      {
        day: 1,
        location: "Paris",
        activities: [
          {
            placeName: "Eiffel Tower",
            placeDetails: "Visit the iconic Eiffel Tower for panoramic views of Paris.",
            longitude: 2.2944812999999997,
            ticketPrice: 30,
            rating: 4.7,
            timeOfDay: "Morning",
            estimatedTravelTime: 0,
            imageUrl:
              "https://places.googleapis.com/v1/places/ChIJLU7jZClu5kcR4PcOOO6p3I0/photos/AXQCQNRNvi1gP9zgdF2oHYiWbT0_mL76eE8T25OhYNSSGQSrNkpRIFhQBIyWFlyMJp6FV9IkHmG6kU4oPYGQVTNIfzERqNdIkZM_c7EP9I1__qOMMTUIMMR-OW_ZQf94UXCdwx50tEZ7JX_COHDeSLvW_sgu-0F4YZJMcjfb49JOPmytuIGCde4EZjqTgNGVyQV-pHDuqEMuV3QmzBpXxqjK9KHyveuH2RyhhKN__6G0t6xzjG5mwSqrU_Vy796TO6C564eLZa5-XAiwc1mndRusBa6ffHewszcESXUtbJUMz5Qi3qzZpbjZm25nDaFo_4-oogWFonPOWoryA2IY9zk9mCdgU3omJDnZXkZS6eWWlhDWGDwXJ3rahfxrspwshUi9fDiC-c_34w5ml7iQ_kvyTgXiTASfYSGxIF2vYFQgRP3QZ5ws662T7DMgX34onA/media?maxHeightPx=1000&maxWidthPx=1900&key=AIzaSyBjVEiaV7gMxGpYblLAHdyB56d7pQef8xQ",
          },
          {
            placeName: "Le Jules Verne",
            placeDetails:
              "Enjoy a Michelin-starred lunch at Le Jules Verne, located on the second floor of the Eiffel Tower.",
            longitude: 2.2944833,
            ticketPrice: 250,
            rating: 4.5,
            timeOfDay: "Afternoon",
            estimatedTravelTime: 0,
            imageUrl:
              "https://places.googleapis.com/v1/places/ChIJl_7p8uFv5kcRj5ZGEf31ILM/photos/AXQCQNRKTYKIds7AAI2r_m224pS-8N1ubaCvBTnrKGcrt0XCQ8Y-fYvz8vK0OlpqOrFeIzURtyN92beFjIypFJ8fZis-CxU8ZBalcXyyMkmz3emI9GdXu-nLFzIUDL6uitvCg7swwIpZ2Wznh_hYEeFg9n5vEMV39_0GcIFaslmFXgJ0TsTlaFp_PU3Ye6kF3-8FrnGZBMfuBahsRPo1Afn2UaemJkV455fAd1KF80YbEEbkSKZZ47THcqv_nzKaxPf1cmhnWBBhlKfc2kfTFdZJeUPZ5fSdGqIWdyGB20OpamjZdw/media?maxHeightPx=1000&maxWidthPx=1900&key=AIzaSyBjVEiaV7gMxGpYblLAHdyB56d7pQef8xQ",
          },
          {
            placeName: "Louvre Museum",
            placeDetails:
              "Explore the Louvre Museum and admire masterpieces like the Mona Lisa.",
            longitude: 2.337644,
            ticketPrice: 20,
            rating: 4.7,
            timeOfDay: "Afternoon",
            estimatedTravelTime: 20,
            imageUrl:
              "https://places.googleapis.com/v1/places/ChIJD3uTd9hx5kcR1IQvGfr8dbk/photos/AXQCQNSX06Kzc2aH_HeJg_yHYcA8M5E6o-rP1lOLtHu3Oy9MgrgdGSHTMXuHiZfEy83G3Cp7paYJEW1LgVnaXy8dddaOp9OUjQ5HupZv2v-g3fg0X7_H5RvKvXvobeD-bDyLX78zYZN4_bFk0MSw6Zz3xliUVX6GV09stqAoRHqJtBNbANEjAev5pwP5gbdjMw4rqp0AcLj8f83t013Bdvc06TLOaFopcac8ZKESDXIg8hUEuc2RkOTjT4frxMkAVXH6SP8YZeIEQi4uCy-tCfRc8PUYu68aPr3CX6ZxkeKq1lssI5rBdDzV7sLU3OmD6s8KN4E8LrWTTa3NPHMgoegd5w3OSBOtO1V1TJraozFvvvxPqYGTfq_nQ3qCFGMTsL2G2OMzVXdkuQyCKfFMIJ6CgXqRGFmj3GAKdayFtFyoQWvuJw/media?maxHeightPx=1000&maxWidthPx=1900&key=AIzaSyBjVEiaV7gMxGpYblLAHdyB56d7pQef8xQ",
          },
          {
            placeName: "Experimental Cocktail Club",
            placeDetails:
              "Experience innovative cocktails in a stylish speakeasy setting in the trendy Le Marais district.",
            longitude: -0.13102719999999998,
            ticketPrice: 30,
            rating: 4,
            timeOfDay: "Evening",
            estimatedTravelTime: 20,
            imageUrl:
              "https://places.googleapis.com/v1/places/ChIJ03seTNIEdkgR_bVvGVN2-d4/photos/AXQCQNSm8QH7LedNDOC3C6yFEolSvZfJ4L3thN520AfiXIPMCSj5vSuKp7MZesoHSU_zxHNR_ZLp8TY-DnXd_2Y9nxrd5uuHzYKl6IR3Y8VJZbp-7QBA2CJ7tKAkGTN8YjdJVJTjrgmWyJbF0ohbtdbx4UbCemYYIRrclETZ_YmdlmQVUPW_Xuvt8cOvOSHfvdx0UB90qq3tlc9y5XdF4Sv3yV8LWPUMh6_ez5LNJmAZN19qo0xW75mV8n92RJByHuhtEOzVcDLUTmURl5j2DU5j2a1JnAHZ109M7_rLnhmr-qSn8w/media?maxHeightPx=1000&maxWidthPx=1900&key=AIzaSyBjVEiaV7gMxGpYblLAHdyB56d7pQef8xQ",
          },
          {
            placeName: "L'Arpège",
            placeDetails:
              "Indulge in a world-class Michelin-starred dinner at L'Arpège, known for its innovative vegetable-centric cuisine.",
            longitude: 2.3170682,
            ticketPrice: 400,
            rating: 4.6,
            timeOfDay: "Evening",
            estimatedTravelTime: 15,
            imageUrl:
              "https://places.googleapis.com/v1/places/ChIJQ-oAFypw5kcR2T9NszPcZO4/photos/AXQCQNQiJT1RfCkrhOfUATLm5W9MGFKcJhLOyskNZsgqbGenDPMCdUrx325fqUHbO_Rb5cb6uI2H-lJun24drGaQnVj2YxDF83Qza5OKtEgZG3TNAutmMHM4NzfOvs-afB9-hT2EVoZh5920XaUEoRKpR4QvkEZCTHOdq7wgFtwQXK_37BXs9FX0YknxHmBhxBstSllh8bAHkZCX6tY-1FPQRAC-UE4Xz0StPhBoh5_qshVULsL3ULaV4TtW2sXdrQ3hP2Qe1oO5IYpLbDRVEjK8Gugaf9XvBNqovvlz-MvNgo4/media?maxHeightPx=1000&maxWidthPx=1900&key=AIzaSyBjVEiaV7gMxGpYblLAHdyB56d7pQef8xQ",
          },
        ],
      },
      {
        day: 2,
        location: "Paris",
        activities: [
          {
            placeName: "Île de la Cité",
            placeDetails:
              "Visit Notre Dame Cathedral and Sainte-Chapelle, architectural gems on Île de la Cité.",
            longitude: 2.3474928,
            ticketPrice: 12,
            rating: 4.7,
            timeOfDay: "Morning",
            estimatedTravelTime: 0,
            imageUrl:
              "https://places.googleapis.com/v1/places/ChIJPce7N-Bx5kcRQxfSLaOHKpw/photos/AXQCQNTDIWtBa7VIGEvFn46IyrVwxFxoHaSJUyqH7SwFRjCTBA9lB-K73LK7i2iJfGqleulcckbZglaacuz3MkIg0J6huDBdN2b4ysZ4jKljoI77D0oWIhSQJstgmJzi575ctHIqelZOwvavxwQGoGALDg_RCdUPe2R-SPpWX857RnQWYfFT6z3HqCdqckzQg8xVU0egfB0y7cwAAGF9ZQhfGLvZbuhol1d8CByM1jmAw3GxsBCHbQsdi07wlcLNWphFllYaGKN--XYtFmoIBRPQNIR88W--JZbMfiknBTwFpgHuy2VJUEvI_KpuMUna7B7muPtyV5pTjb79eO1CEAnNaXUNR8ppyWqQmWTjn6HkFA-ooCPScg1_NUeyhhFLXbmZyoLaI7Y2xQsRlE10BX8xCV78RWx3iBtreseOtg4_UG1KIg/media?maxHeightPx=1000&maxWidthPx=1900&key=AIzaSyBjVEiaV7gMxGpYblLAHdyB56d7pQef8xQ",
          },
          {
            placeName: "Berthillon",
            placeDetails:
              "Enjoy artisanal ice cream at Berthillon, a famous ice cream shop on Île Saint-Louis.",
            longitude: 2.3567354,
            ticketPrice: 10,
            rating: 4.4,
            timeOfDay: "Morning",
            estimatedTravelTime: 5,
            imageUrl:
              "https://places.googleapis.com/v1/places/ChIJaxE1EONx5kcRSm1sFRqBUTM/photos/AXQCQNRnq0q_tRWmhUWLk8H6pD7kXLY7r1Z5To6vmxDQUIjHKf3beee-VaSgsDoAcvg8zvqUeENxcSv1yZCOUDi53WL77yNhC2vRaCvtgYKzdnfvtjAjKyP7f_5w9QuiLZQrwqTeJvDFdSuL2NOn8c_4PovCzR9Zs88FXaIn1YK8WUC8GzC3wFJtOjUdWQq24nDtVz72pK3SSONV9MM0Vgr23A29T_gNJHXqaJ51Cfy01d8JTu_l31rcm7_qnbt-luUiIz7kjSLtyjIxOM-1BDMNFzyVlmUtfvIQfkUQ7K6itYoPKw/media?maxHeightPx=1000&maxWidthPx=1900&key=AIzaSyBjVEiaV7gMxGpYblLAHdyB56d7pQef8xQ",
          },
          {
            placeName: "Champagne Tasting at a Boutique",
            placeDetails:
              "Participate in a private champagne tasting at a boutique in Saint-Germain-des-Prés.",
            longitude: 33.367149,
            ticketPrice: 150,
            rating: 4.9,
            timeOfDay: "Afternoon",
            estimatedTravelTime: 20,
            imageUrl:
              "https://places.googleapis.com/v1/places/ChIJKzmrJ_gb3hQRvYabVK7tdlw/photos/AXQCQNT4sytJNUwir-PkNTkY_4CIeD0twv3MKpJ3rqZdmSIxdN8pSqhaSRVK0Lej1mqS4oEc-Vegp71TrmvHj5HiT9NFP28EtwJU7hx5bJKjaOTVzYfUeBaRU1_xCVbzXf5sIkkK93m7CYuoUwvbB4JM7MfxYe760PjhZsusKR5AOT6MjkIrdLmojRj7-6v3UXTRrCO4tL5YhLlJ3sxQyqAUBzwjcEt3BEg9UCvXr6ewxd98My_Lzlr9SO4GQGEGKC5LvDukI7nAzL1F0SqWmL_SjbxBUQEV3saW281O9JIXURGsHg/media?maxHeightPx=1000&maxWidthPx=1900&key=AIzaSyBjVEiaV7gMxGpYblLAHdyB56d7pQef8xQ",
          },
          {
            placeName: "Shopping at Champs-Élysées",
            placeDetails: "Luxury shopping at the Champs-Élysées.",
            longitude: 2.3062649,
            ticketPrice: 0,
            rating: 4.4,
            timeOfDay: "Afternoon",
            estimatedTravelTime: 15,
            imageUrl:
              "https://places.googleapis.com/v1/places/ChIJU0nn0uZv5kcRbncuncHdnXE/photos/AXQCQNSBueN4emOm8bYb3geg5Fl6N357-khUnJI30Z7EQtVctCOBMHA9dFV12hQ4Xq73yXMFOHYsDGtM0elXI3xmiM_1066sups41Yvprrdi8cP-KL5ztPWLdpCZnR--eqXyPphNRfp2vmldN1AvmjJcHbOuW_O4IHsZqpJ5gy_wNrv5UPveucOhdmemCObjdX_8JhbdgoJIc-9xBo3bQa9_zRFC2B3fv8PSN1-07EMGHTr9ES7PWgJ85Yvkk9s902AQ3WAR5WssA-qVKbKsS0wrMtjlk5HnKyYtfrLegdQkuRa93A/media?maxHeightPx=1000&maxWidthPx=1900&key=AIzaSyBjVEiaV7gMxGpYblLAHdyB56d7pQef8xQ",
          },
          {
            placeName: "Le Bar 228",
            placeDetails:
              "Enjoy live jazz and expertly crafted cocktails at Le Bar 228 in Le Meurice hotel.",
            longitude: 2.3281373999999997,
            ticketPrice: 40,
            rating: 4.4,
            timeOfDay: "Evening",
            estimatedTravelTime: 20,
            imageUrl:
              "https://places.googleapis.com/v1/places/ChIJpZXu3i1u5kcRidACoPLI1g4/photos/AXQCQNT2Z9L_UE3Trh-km3XjzvM2AJ1yb36wQ4FJuFifq3rKwl1mSzhIhP50YE4tx0zcwd1XMK-RhknR7AfhOZ5qcOt0CSnB1sbFkrrNrCgjDSLc1dtqRbWhRH0Tye9gUImPIO3LUty_BXMfbHaj35r46ghypgfZqru3bJxdAsVXS5BPKbzJw80dOn6KnNATp-F-amcg51OaRYNWnPZBjNy_qQshXEzE2KFYOPFG_55fRNLXERWqZwW_qzxPHAtachS6jVLzEtIkF7GRnDFUgHt68YhN1uhd5HTey3DuZacya0Hqog/media?maxHeightPx=1000&maxWidthPx=1900&key=AIzaSyBjVEiaV7gMxGpYblLAHdyB56d7pQef8xQ",
          },
          {
            placeName: "Plénitude",
            placeDetails:
              "Experience three-Michelin-starred dining by Arnaud Donckele at Plénitude in Cheval Blanc Paris.",
            longitude: -1.5205271999999999,
            ticketPrice: 500,
            rating: 4.4,
            timeOfDay: "Evening",
            estimatedTravelTime: 15,
            imageUrl:
              "https://places.googleapis.com/v1/places/ChIJbcAdi0-9Lg4RxL4CdOMbrpI/photos/AXQCQNRON2Zq7Mfp5mRzTMkCqpnNhXRgxtRlNcOxlSyRk6HfERnST0NLx9t07V30hZ4evNNUfFCuaaxQHwCsRipQpGxpoKpY8drXVfGMTbrtn--6Ds8_O2biAWn-tuA6uKk71ffGfyP3ZACBhKYEd4PGMtTAxzq_HpbLdN-6MRuRny26W6dnohnloEJ_wJeIUE59zRnEkT9soCuuZKYZ6Dm2B6pSCDw2wj_2a4Ov3lUwkoIeLy5dRPYkOHp9-6YgwW-tcZn9j7vib8sNSWjrwfhK39GEpBQxlojYzTiCzn7Ye15jB8KCVmYCyOXlPb9b2Em0S616luy9QybmB0jrZNil96CxDYA0xas0BfnkX8MNtGvoSaLDDSl0aVn2mgyBKrqPyPV9-BriMeKdMNRaguWx6xug_MUycUowa_j5ewlCkUgbQDic/media?maxHeightPx=1000&maxWidthPx=1900&key=AIzaSyBjVEiaV7gMxGpYblLAHdyB56d7pQef8xQ",
          },
        ],
      },
    ],
  },
};
