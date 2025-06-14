import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValueSchema: z.ZodType<Prisma.JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.literal(null),
    z.record(z.lazy(() => JsonValueSchema.optional())),
    z.array(z.lazy(() => JsonValueSchema)),
  ])
);

export type JsonValueType = z.infer<typeof JsonValueSchema>;

export const NullableJsonValue = z
  .union([JsonValueSchema, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValueSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.object({ toJSON: z.function(z.tuple([]), z.any()) }),
    z.record(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
    z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
  ])
);

export type InputJsonValueType = z.infer<typeof InputJsonValueSchema>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','clerkId','email','firstName','lastName','fullName','profileImageUrl','createdAt','updatedAt']);

export const TripScalarFieldEnumSchema = z.enum(['id','userId','title','description','location','travelGroup','style','duration','budget','estimatedTotal','bestTimeToVisit','weatherInfo','generalLocation','createdAt','updatedAt']);

export const TripImageScalarFieldEnumSchema = z.enum(['id','tripId','ImageUrl','source','description','createdAt','updatedAt']);

export const HotelScalarFieldEnumSchema = z.enum(['id','tripId','hotelName','address','description','estimatedPricePerNight','rating','latitude','longitude','imageUrl','createdAt','updatedAt']);

export const ItineraryDayScalarFieldEnumSchema = z.enum(['id','tripId','dayNumber','location','createdAt','updatedAt']);

export const ItineraryActivityScalarFieldEnumSchema = z.enum(['id','itineraryDayId','placeName','placeDetails','imageUrl','latitude','longitude','ticketPrice','rating','timeOfDay','estimatedTravelTime','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const JsonNullValueInputSchema = z.enum(['JsonNull',]).transform((value) => (value === 'JsonNull' ? Prisma.JsonNull : value));

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.JsonNull : value === 'AnyNull' ? Prisma.AnyNull : value);

export const ImageSourceSchema = z.enum(['UNSPLASH','GOOGLE_PLACES','CUSTOM']);

export type ImageSourceType = `${z.infer<typeof ImageSourceSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  clerkId: z.string().nullable(),
  email: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  fullName: z.string().nullable(),
  profileImageUrl: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// TRIP SCHEMA
/////////////////////////////////////////

export const TripSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  title: z.string(),
  description: z.string().array(),
  location: z.string(),
  travelGroup: z.string(),
  style: z.string(),
  duration: z.number().int(),
  budget: z.string(),
  estimatedTotal: z.number().int(),
  bestTimeToVisit: JsonValueSchema,
  weatherInfo: JsonValueSchema,
  generalLocation: JsonValueSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Trip = z.infer<typeof TripSchema>

/////////////////////////////////////////
// TRIP IMAGE SCHEMA
/////////////////////////////////////////

export const TripImageSchema = z.object({
  source: ImageSourceSchema,
  id: z.string().cuid(),
  tripId: z.string(),
  ImageUrl: z.string(),
  description: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type TripImage = z.infer<typeof TripImageSchema>

/////////////////////////////////////////
// HOTEL SCHEMA
/////////////////////////////////////////

export const HotelSchema = z.object({
  id: z.string().cuid(),
  tripId: z.string(),
  hotelName: z.string(),
  address: z.string(),
  description: z.string(),
  estimatedPricePerNight: z.number(),
  rating: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  imageUrl: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Hotel = z.infer<typeof HotelSchema>

/////////////////////////////////////////
// ITINERARY DAY SCHEMA
/////////////////////////////////////////

export const ItineraryDaySchema = z.object({
  id: z.string().cuid(),
  tripId: z.string(),
  dayNumber: z.number().int(),
  location: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type ItineraryDay = z.infer<typeof ItineraryDaySchema>

/////////////////////////////////////////
// ITINERARY ACTIVITY SCHEMA
/////////////////////////////////////////

export const ItineraryActivitySchema = z.object({
  id: z.string().cuid(),
  itineraryDayId: z.string(),
  placeName: z.string(),
  placeDetails: z.string(),
  imageUrl: z.string().nullable(),
  latitude: z.number(),
  longitude: z.number(),
  ticketPrice: z.number(),
  rating: z.number(),
  timeOfDay: z.string(),
  estimatedTravelTime: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type ItineraryActivity = z.infer<typeof ItineraryActivitySchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  trips: z.union([z.boolean(),z.lazy(() => TripFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  trips: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  clerkId: z.boolean().optional(),
  email: z.boolean().optional(),
  firstName: z.boolean().optional(),
  lastName: z.boolean().optional(),
  fullName: z.boolean().optional(),
  profileImageUrl: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  trips: z.union([z.boolean(),z.lazy(() => TripFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TRIP
//------------------------------------------------------

export const TripIncludeSchema: z.ZodType<Prisma.TripInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  hotels: z.union([z.boolean(),z.lazy(() => HotelFindManyArgsSchema)]).optional(),
  itineraryDays: z.union([z.boolean(),z.lazy(() => ItineraryDayFindManyArgsSchema)]).optional(),
  tripImages: z.union([z.boolean(),z.lazy(() => TripImageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TripCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TripArgsSchema: z.ZodType<Prisma.TripDefaultArgs> = z.object({
  select: z.lazy(() => TripSelectSchema).optional(),
  include: z.lazy(() => TripIncludeSchema).optional(),
}).strict();

export const TripCountOutputTypeArgsSchema: z.ZodType<Prisma.TripCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TripCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TripCountOutputTypeSelectSchema: z.ZodType<Prisma.TripCountOutputTypeSelect> = z.object({
  hotels: z.boolean().optional(),
  itineraryDays: z.boolean().optional(),
  tripImages: z.boolean().optional(),
}).strict();

export const TripSelectSchema: z.ZodType<Prisma.TripSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  location: z.boolean().optional(),
  travelGroup: z.boolean().optional(),
  style: z.boolean().optional(),
  duration: z.boolean().optional(),
  budget: z.boolean().optional(),
  estimatedTotal: z.boolean().optional(),
  bestTimeToVisit: z.boolean().optional(),
  weatherInfo: z.boolean().optional(),
  generalLocation: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  hotels: z.union([z.boolean(),z.lazy(() => HotelFindManyArgsSchema)]).optional(),
  itineraryDays: z.union([z.boolean(),z.lazy(() => ItineraryDayFindManyArgsSchema)]).optional(),
  tripImages: z.union([z.boolean(),z.lazy(() => TripImageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TripCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TRIP IMAGE
//------------------------------------------------------

export const TripImageIncludeSchema: z.ZodType<Prisma.TripImageInclude> = z.object({
  Trip: z.union([z.boolean(),z.lazy(() => TripArgsSchema)]).optional(),
}).strict()

export const TripImageArgsSchema: z.ZodType<Prisma.TripImageDefaultArgs> = z.object({
  select: z.lazy(() => TripImageSelectSchema).optional(),
  include: z.lazy(() => TripImageIncludeSchema).optional(),
}).strict();

export const TripImageSelectSchema: z.ZodType<Prisma.TripImageSelect> = z.object({
  id: z.boolean().optional(),
  tripId: z.boolean().optional(),
  ImageUrl: z.boolean().optional(),
  source: z.boolean().optional(),
  description: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  Trip: z.union([z.boolean(),z.lazy(() => TripArgsSchema)]).optional(),
}).strict()

// HOTEL
//------------------------------------------------------

export const HotelIncludeSchema: z.ZodType<Prisma.HotelInclude> = z.object({
  trip: z.union([z.boolean(),z.lazy(() => TripArgsSchema)]).optional(),
}).strict()

export const HotelArgsSchema: z.ZodType<Prisma.HotelDefaultArgs> = z.object({
  select: z.lazy(() => HotelSelectSchema).optional(),
  include: z.lazy(() => HotelIncludeSchema).optional(),
}).strict();

export const HotelSelectSchema: z.ZodType<Prisma.HotelSelect> = z.object({
  id: z.boolean().optional(),
  tripId: z.boolean().optional(),
  hotelName: z.boolean().optional(),
  address: z.boolean().optional(),
  description: z.boolean().optional(),
  estimatedPricePerNight: z.boolean().optional(),
  rating: z.boolean().optional(),
  latitude: z.boolean().optional(),
  longitude: z.boolean().optional(),
  imageUrl: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  trip: z.union([z.boolean(),z.lazy(() => TripArgsSchema)]).optional(),
}).strict()

// ITINERARY DAY
//------------------------------------------------------

export const ItineraryDayIncludeSchema: z.ZodType<Prisma.ItineraryDayInclude> = z.object({
  trip: z.union([z.boolean(),z.lazy(() => TripArgsSchema)]).optional(),
  activities: z.union([z.boolean(),z.lazy(() => ItineraryActivityFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ItineraryDayCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ItineraryDayArgsSchema: z.ZodType<Prisma.ItineraryDayDefaultArgs> = z.object({
  select: z.lazy(() => ItineraryDaySelectSchema).optional(),
  include: z.lazy(() => ItineraryDayIncludeSchema).optional(),
}).strict();

export const ItineraryDayCountOutputTypeArgsSchema: z.ZodType<Prisma.ItineraryDayCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ItineraryDayCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ItineraryDayCountOutputTypeSelectSchema: z.ZodType<Prisma.ItineraryDayCountOutputTypeSelect> = z.object({
  activities: z.boolean().optional(),
}).strict();

export const ItineraryDaySelectSchema: z.ZodType<Prisma.ItineraryDaySelect> = z.object({
  id: z.boolean().optional(),
  tripId: z.boolean().optional(),
  dayNumber: z.boolean().optional(),
  location: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  trip: z.union([z.boolean(),z.lazy(() => TripArgsSchema)]).optional(),
  activities: z.union([z.boolean(),z.lazy(() => ItineraryActivityFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ItineraryDayCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ITINERARY ACTIVITY
//------------------------------------------------------

export const ItineraryActivityIncludeSchema: z.ZodType<Prisma.ItineraryActivityInclude> = z.object({
  itineraryDay: z.union([z.boolean(),z.lazy(() => ItineraryDayArgsSchema)]).optional(),
}).strict()

export const ItineraryActivityArgsSchema: z.ZodType<Prisma.ItineraryActivityDefaultArgs> = z.object({
  select: z.lazy(() => ItineraryActivitySelectSchema).optional(),
  include: z.lazy(() => ItineraryActivityIncludeSchema).optional(),
}).strict();

export const ItineraryActivitySelectSchema: z.ZodType<Prisma.ItineraryActivitySelect> = z.object({
  id: z.boolean().optional(),
  itineraryDayId: z.boolean().optional(),
  placeName: z.boolean().optional(),
  placeDetails: z.boolean().optional(),
  imageUrl: z.boolean().optional(),
  latitude: z.boolean().optional(),
  longitude: z.boolean().optional(),
  ticketPrice: z.boolean().optional(),
  rating: z.boolean().optional(),
  timeOfDay: z.boolean().optional(),
  estimatedTravelTime: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  itineraryDay: z.union([z.boolean(),z.lazy(() => ItineraryDayArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  clerkId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  lastName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  fullName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  profileImageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  trips: z.lazy(() => TripListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  clerkId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  lastName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  fullName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  profileImageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  trips: z.lazy(() => TripOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    clerkId: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string().cuid(),
    clerkId: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
    email: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    clerkId: z.string(),
    email: z.string(),
  }),
  z.object({
    clerkId: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  clerkId: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  firstName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  lastName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  fullName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  profileImageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  trips: z.lazy(() => TripListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  clerkId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  lastName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  fullName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  profileImageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  clerkId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  lastName: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  fullName: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  profileImageUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TripWhereInputSchema: z.ZodType<Prisma.TripWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TripWhereInputSchema),z.lazy(() => TripWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TripWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TripWhereInputSchema),z.lazy(() => TripWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.lazy(() => StringNullableListFilterSchema).optional(),
  location: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  travelGroup: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  style: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  duration: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  budget: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  estimatedTotal: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  bestTimeToVisit: z.lazy(() => JsonFilterSchema).optional(),
  weatherInfo: z.lazy(() => JsonFilterSchema).optional(),
  generalLocation: z.lazy(() => JsonFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  hotels: z.lazy(() => HotelListRelationFilterSchema).optional(),
  itineraryDays: z.lazy(() => ItineraryDayListRelationFilterSchema).optional(),
  tripImages: z.lazy(() => TripImageListRelationFilterSchema).optional()
}).strict();

export const TripOrderByWithRelationInputSchema: z.ZodType<Prisma.TripOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  travelGroup: z.lazy(() => SortOrderSchema).optional(),
  style: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  budget: z.lazy(() => SortOrderSchema).optional(),
  estimatedTotal: z.lazy(() => SortOrderSchema).optional(),
  bestTimeToVisit: z.lazy(() => SortOrderSchema).optional(),
  weatherInfo: z.lazy(() => SortOrderSchema).optional(),
  generalLocation: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  hotels: z.lazy(() => HotelOrderByRelationAggregateInputSchema).optional(),
  itineraryDays: z.lazy(() => ItineraryDayOrderByRelationAggregateInputSchema).optional(),
  tripImages: z.lazy(() => TripImageOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TripWhereUniqueInputSchema: z.ZodType<Prisma.TripWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => TripWhereInputSchema),z.lazy(() => TripWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TripWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TripWhereInputSchema),z.lazy(() => TripWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.lazy(() => StringNullableListFilterSchema).optional(),
  location: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  travelGroup: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  style: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  duration: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  budget: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  estimatedTotal: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  bestTimeToVisit: z.lazy(() => JsonFilterSchema).optional(),
  weatherInfo: z.lazy(() => JsonFilterSchema).optional(),
  generalLocation: z.lazy(() => JsonFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  hotels: z.lazy(() => HotelListRelationFilterSchema).optional(),
  itineraryDays: z.lazy(() => ItineraryDayListRelationFilterSchema).optional(),
  tripImages: z.lazy(() => TripImageListRelationFilterSchema).optional()
}).strict());

export const TripOrderByWithAggregationInputSchema: z.ZodType<Prisma.TripOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  travelGroup: z.lazy(() => SortOrderSchema).optional(),
  style: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  budget: z.lazy(() => SortOrderSchema).optional(),
  estimatedTotal: z.lazy(() => SortOrderSchema).optional(),
  bestTimeToVisit: z.lazy(() => SortOrderSchema).optional(),
  weatherInfo: z.lazy(() => SortOrderSchema).optional(),
  generalLocation: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TripCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TripAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TripMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TripMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TripSumOrderByAggregateInputSchema).optional()
}).strict();

export const TripScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TripScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TripScalarWhereWithAggregatesInputSchema),z.lazy(() => TripScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TripScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TripScalarWhereWithAggregatesInputSchema),z.lazy(() => TripScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.lazy(() => StringNullableListFilterSchema).optional(),
  location: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  travelGroup: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  style: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  duration: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  budget: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  estimatedTotal: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  bestTimeToVisit: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  weatherInfo: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  generalLocation: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TripImageWhereInputSchema: z.ZodType<Prisma.TripImageWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TripImageWhereInputSchema),z.lazy(() => TripImageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TripImageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TripImageWhereInputSchema),z.lazy(() => TripImageWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tripId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ImageUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  source: z.union([ z.lazy(() => EnumImageSourceFilterSchema),z.lazy(() => ImageSourceSchema) ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Trip: z.union([ z.lazy(() => TripScalarRelationFilterSchema),z.lazy(() => TripWhereInputSchema) ]).optional(),
}).strict();

export const TripImageOrderByWithRelationInputSchema: z.ZodType<Prisma.TripImageOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  ImageUrl: z.lazy(() => SortOrderSchema).optional(),
  source: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  Trip: z.lazy(() => TripOrderByWithRelationInputSchema).optional()
}).strict();

export const TripImageWhereUniqueInputSchema: z.ZodType<Prisma.TripImageWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => TripImageWhereInputSchema),z.lazy(() => TripImageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TripImageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TripImageWhereInputSchema),z.lazy(() => TripImageWhereInputSchema).array() ]).optional(),
  tripId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ImageUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  source: z.union([ z.lazy(() => EnumImageSourceFilterSchema),z.lazy(() => ImageSourceSchema) ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Trip: z.union([ z.lazy(() => TripScalarRelationFilterSchema),z.lazy(() => TripWhereInputSchema) ]).optional(),
}).strict());

export const TripImageOrderByWithAggregationInputSchema: z.ZodType<Prisma.TripImageOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  ImageUrl: z.lazy(() => SortOrderSchema).optional(),
  source: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TripImageCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TripImageMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TripImageMinOrderByAggregateInputSchema).optional()
}).strict();

export const TripImageScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TripImageScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TripImageScalarWhereWithAggregatesInputSchema),z.lazy(() => TripImageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TripImageScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TripImageScalarWhereWithAggregatesInputSchema),z.lazy(() => TripImageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tripId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  ImageUrl: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  source: z.union([ z.lazy(() => EnumImageSourceWithAggregatesFilterSchema),z.lazy(() => ImageSourceSchema) ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const HotelWhereInputSchema: z.ZodType<Prisma.HotelWhereInput> = z.object({
  AND: z.union([ z.lazy(() => HotelWhereInputSchema),z.lazy(() => HotelWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HotelWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HotelWhereInputSchema),z.lazy(() => HotelWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tripId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hotelName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  estimatedPricePerNight: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  rating: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  latitude: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  longitude: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  trip: z.union([ z.lazy(() => TripScalarRelationFilterSchema),z.lazy(() => TripWhereInputSchema) ]).optional(),
}).strict();

export const HotelOrderByWithRelationInputSchema: z.ZodType<Prisma.HotelOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  hotelName: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  estimatedPricePerNight: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  trip: z.lazy(() => TripOrderByWithRelationInputSchema).optional()
}).strict();

export const HotelWhereUniqueInputSchema: z.ZodType<Prisma.HotelWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => HotelWhereInputSchema),z.lazy(() => HotelWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HotelWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HotelWhereInputSchema),z.lazy(() => HotelWhereInputSchema).array() ]).optional(),
  tripId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hotelName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  estimatedPricePerNight: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  rating: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  latitude: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  longitude: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  trip: z.union([ z.lazy(() => TripScalarRelationFilterSchema),z.lazy(() => TripWhereInputSchema) ]).optional(),
}).strict());

export const HotelOrderByWithAggregationInputSchema: z.ZodType<Prisma.HotelOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  hotelName: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  estimatedPricePerNight: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => HotelCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => HotelAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => HotelMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => HotelMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => HotelSumOrderByAggregateInputSchema).optional()
}).strict();

export const HotelScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.HotelScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => HotelScalarWhereWithAggregatesInputSchema),z.lazy(() => HotelScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => HotelScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HotelScalarWhereWithAggregatesInputSchema),z.lazy(() => HotelScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tripId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  hotelName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  estimatedPricePerNight: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  rating: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  latitude: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  longitude: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ItineraryDayWhereInputSchema: z.ZodType<Prisma.ItineraryDayWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ItineraryDayWhereInputSchema),z.lazy(() => ItineraryDayWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ItineraryDayWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ItineraryDayWhereInputSchema),z.lazy(() => ItineraryDayWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tripId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dayNumber: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  location: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  trip: z.union([ z.lazy(() => TripScalarRelationFilterSchema),z.lazy(() => TripWhereInputSchema) ]).optional(),
  activities: z.lazy(() => ItineraryActivityListRelationFilterSchema).optional()
}).strict();

export const ItineraryDayOrderByWithRelationInputSchema: z.ZodType<Prisma.ItineraryDayOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  dayNumber: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  trip: z.lazy(() => TripOrderByWithRelationInputSchema).optional(),
  activities: z.lazy(() => ItineraryActivityOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ItineraryDayWhereUniqueInputSchema: z.ZodType<Prisma.ItineraryDayWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ItineraryDayWhereInputSchema),z.lazy(() => ItineraryDayWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ItineraryDayWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ItineraryDayWhereInputSchema),z.lazy(() => ItineraryDayWhereInputSchema).array() ]).optional(),
  tripId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dayNumber: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  location: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  trip: z.union([ z.lazy(() => TripScalarRelationFilterSchema),z.lazy(() => TripWhereInputSchema) ]).optional(),
  activities: z.lazy(() => ItineraryActivityListRelationFilterSchema).optional()
}).strict());

export const ItineraryDayOrderByWithAggregationInputSchema: z.ZodType<Prisma.ItineraryDayOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  dayNumber: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ItineraryDayCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ItineraryDayAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ItineraryDayMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ItineraryDayMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ItineraryDaySumOrderByAggregateInputSchema).optional()
}).strict();

export const ItineraryDayScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ItineraryDayScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ItineraryDayScalarWhereWithAggregatesInputSchema),z.lazy(() => ItineraryDayScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ItineraryDayScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ItineraryDayScalarWhereWithAggregatesInputSchema),z.lazy(() => ItineraryDayScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tripId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  dayNumber: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  location: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ItineraryActivityWhereInputSchema: z.ZodType<Prisma.ItineraryActivityWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ItineraryActivityWhereInputSchema),z.lazy(() => ItineraryActivityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ItineraryActivityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ItineraryActivityWhereInputSchema),z.lazy(() => ItineraryActivityWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  itineraryDayId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  placeName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  placeDetails: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  latitude: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  longitude: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  ticketPrice: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  rating: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  timeOfDay: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  estimatedTravelTime: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  itineraryDay: z.union([ z.lazy(() => ItineraryDayScalarRelationFilterSchema),z.lazy(() => ItineraryDayWhereInputSchema) ]).optional(),
}).strict();

export const ItineraryActivityOrderByWithRelationInputSchema: z.ZodType<Prisma.ItineraryActivityOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  itineraryDayId: z.lazy(() => SortOrderSchema).optional(),
  placeName: z.lazy(() => SortOrderSchema).optional(),
  placeDetails: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  ticketPrice: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  timeOfDay: z.lazy(() => SortOrderSchema).optional(),
  estimatedTravelTime: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  itineraryDay: z.lazy(() => ItineraryDayOrderByWithRelationInputSchema).optional()
}).strict();

export const ItineraryActivityWhereUniqueInputSchema: z.ZodType<Prisma.ItineraryActivityWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ItineraryActivityWhereInputSchema),z.lazy(() => ItineraryActivityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ItineraryActivityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ItineraryActivityWhereInputSchema),z.lazy(() => ItineraryActivityWhereInputSchema).array() ]).optional(),
  itineraryDayId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  placeName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  placeDetails: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  latitude: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  longitude: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  ticketPrice: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  rating: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  timeOfDay: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  estimatedTravelTime: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  itineraryDay: z.union([ z.lazy(() => ItineraryDayScalarRelationFilterSchema),z.lazy(() => ItineraryDayWhereInputSchema) ]).optional(),
}).strict());

export const ItineraryActivityOrderByWithAggregationInputSchema: z.ZodType<Prisma.ItineraryActivityOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  itineraryDayId: z.lazy(() => SortOrderSchema).optional(),
  placeName: z.lazy(() => SortOrderSchema).optional(),
  placeDetails: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  ticketPrice: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  timeOfDay: z.lazy(() => SortOrderSchema).optional(),
  estimatedTravelTime: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ItineraryActivityCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ItineraryActivityAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ItineraryActivityMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ItineraryActivityMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ItineraryActivitySumOrderByAggregateInputSchema).optional()
}).strict();

export const ItineraryActivityScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ItineraryActivityScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ItineraryActivityScalarWhereWithAggregatesInputSchema),z.lazy(() => ItineraryActivityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ItineraryActivityScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ItineraryActivityScalarWhereWithAggregatesInputSchema),z.lazy(() => ItineraryActivityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  itineraryDayId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  placeName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  placeDetails: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  latitude: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  longitude: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  ticketPrice: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  rating: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  timeOfDay: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  estimatedTravelTime: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  clerkId: z.string().optional().nullable(),
  email: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  fullName: z.string().optional().nullable(),
  profileImageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  trips: z.lazy(() => TripCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  clerkId: z.string().optional().nullable(),
  email: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  fullName: z.string().optional().nullable(),
  profileImageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  trips: z.lazy(() => TripUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clerkId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fullName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  trips: z.lazy(() => TripUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clerkId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fullName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  trips: z.lazy(() => TripUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  clerkId: z.string().optional().nullable(),
  email: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  fullName: z.string().optional().nullable(),
  profileImageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clerkId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fullName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clerkId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fullName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TripCreateInputSchema: z.ZodType<Prisma.TripCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.union([ z.lazy(() => TripCreatedescriptionInputSchema),z.string().array() ]).optional(),
  location: z.string(),
  travelGroup: z.string(),
  style: z.string(),
  duration: z.number().int(),
  budget: z.string(),
  estimatedTotal: z.number().int(),
  bestTimeToVisit: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  weatherInfo: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  generalLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutTripsInputSchema),
  hotels: z.lazy(() => HotelCreateNestedManyWithoutTripInputSchema).optional(),
  itineraryDays: z.lazy(() => ItineraryDayCreateNestedManyWithoutTripInputSchema).optional(),
  tripImages: z.lazy(() => TripImageCreateNestedManyWithoutTripInputSchema).optional()
}).strict();

export const TripUncheckedCreateInputSchema: z.ZodType<Prisma.TripUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  title: z.string(),
  description: z.union([ z.lazy(() => TripCreatedescriptionInputSchema),z.string().array() ]).optional(),
  location: z.string(),
  travelGroup: z.string(),
  style: z.string(),
  duration: z.number().int(),
  budget: z.string(),
  estimatedTotal: z.number().int(),
  bestTimeToVisit: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  weatherInfo: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  generalLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  hotels: z.lazy(() => HotelUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  itineraryDays: z.lazy(() => ItineraryDayUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  tripImages: z.lazy(() => TripImageUncheckedCreateNestedManyWithoutTripInputSchema).optional()
}).strict();

export const TripUpdateInputSchema: z.ZodType<Prisma.TripUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.lazy(() => TripUpdatedescriptionInputSchema),z.string().array() ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  travelGroup: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  style: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bestTimeToVisit: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  weatherInfo: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  generalLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutTripsNestedInputSchema).optional(),
  hotels: z.lazy(() => HotelUpdateManyWithoutTripNestedInputSchema).optional(),
  itineraryDays: z.lazy(() => ItineraryDayUpdateManyWithoutTripNestedInputSchema).optional(),
  tripImages: z.lazy(() => TripImageUpdateManyWithoutTripNestedInputSchema).optional()
}).strict();

export const TripUncheckedUpdateInputSchema: z.ZodType<Prisma.TripUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.lazy(() => TripUpdatedescriptionInputSchema),z.string().array() ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  travelGroup: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  style: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bestTimeToVisit: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  weatherInfo: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  generalLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hotels: z.lazy(() => HotelUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  itineraryDays: z.lazy(() => ItineraryDayUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  tripImages: z.lazy(() => TripImageUncheckedUpdateManyWithoutTripNestedInputSchema).optional()
}).strict();

export const TripCreateManyInputSchema: z.ZodType<Prisma.TripCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  title: z.string(),
  description: z.union([ z.lazy(() => TripCreatedescriptionInputSchema),z.string().array() ]).optional(),
  location: z.string(),
  travelGroup: z.string(),
  style: z.string(),
  duration: z.number().int(),
  budget: z.string(),
  estimatedTotal: z.number().int(),
  bestTimeToVisit: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  weatherInfo: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  generalLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TripUpdateManyMutationInputSchema: z.ZodType<Prisma.TripUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.lazy(() => TripUpdatedescriptionInputSchema),z.string().array() ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  travelGroup: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  style: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bestTimeToVisit: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  weatherInfo: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  generalLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TripUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TripUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.lazy(() => TripUpdatedescriptionInputSchema),z.string().array() ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  travelGroup: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  style: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bestTimeToVisit: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  weatherInfo: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  generalLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TripImageCreateInputSchema: z.ZodType<Prisma.TripImageCreateInput> = z.object({
  id: z.string().cuid().optional(),
  ImageUrl: z.string(),
  source: z.lazy(() => ImageSourceSchema),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  Trip: z.lazy(() => TripCreateNestedOneWithoutTripImagesInputSchema)
}).strict();

export const TripImageUncheckedCreateInputSchema: z.ZodType<Prisma.TripImageUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  tripId: z.string(),
  ImageUrl: z.string(),
  source: z.lazy(() => ImageSourceSchema),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TripImageUpdateInputSchema: z.ZodType<Prisma.TripImageUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ImageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.lazy(() => ImageSourceSchema),z.lazy(() => EnumImageSourceFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Trip: z.lazy(() => TripUpdateOneRequiredWithoutTripImagesNestedInputSchema).optional()
}).strict();

export const TripImageUncheckedUpdateInputSchema: z.ZodType<Prisma.TripImageUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tripId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ImageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.lazy(() => ImageSourceSchema),z.lazy(() => EnumImageSourceFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TripImageCreateManyInputSchema: z.ZodType<Prisma.TripImageCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  tripId: z.string(),
  ImageUrl: z.string(),
  source: z.lazy(() => ImageSourceSchema),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TripImageUpdateManyMutationInputSchema: z.ZodType<Prisma.TripImageUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ImageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.lazy(() => ImageSourceSchema),z.lazy(() => EnumImageSourceFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TripImageUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TripImageUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tripId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ImageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.lazy(() => ImageSourceSchema),z.lazy(() => EnumImageSourceFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HotelCreateInputSchema: z.ZodType<Prisma.HotelCreateInput> = z.object({
  id: z.string().cuid().optional(),
  hotelName: z.string(),
  address: z.string(),
  description: z.string(),
  estimatedPricePerNight: z.number(),
  rating: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  imageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  trip: z.lazy(() => TripCreateNestedOneWithoutHotelsInputSchema)
}).strict();

export const HotelUncheckedCreateInputSchema: z.ZodType<Prisma.HotelUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  tripId: z.string(),
  hotelName: z.string(),
  address: z.string(),
  description: z.string(),
  estimatedPricePerNight: z.number(),
  rating: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  imageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const HotelUpdateInputSchema: z.ZodType<Prisma.HotelUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hotelName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedPricePerNight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  trip: z.lazy(() => TripUpdateOneRequiredWithoutHotelsNestedInputSchema).optional()
}).strict();

export const HotelUncheckedUpdateInputSchema: z.ZodType<Prisma.HotelUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tripId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hotelName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedPricePerNight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HotelCreateManyInputSchema: z.ZodType<Prisma.HotelCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  tripId: z.string(),
  hotelName: z.string(),
  address: z.string(),
  description: z.string(),
  estimatedPricePerNight: z.number(),
  rating: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  imageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const HotelUpdateManyMutationInputSchema: z.ZodType<Prisma.HotelUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hotelName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedPricePerNight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HotelUncheckedUpdateManyInputSchema: z.ZodType<Prisma.HotelUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tripId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hotelName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedPricePerNight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ItineraryDayCreateInputSchema: z.ZodType<Prisma.ItineraryDayCreateInput> = z.object({
  id: z.string().cuid().optional(),
  dayNumber: z.number().int(),
  location: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  trip: z.lazy(() => TripCreateNestedOneWithoutItineraryDaysInputSchema),
  activities: z.lazy(() => ItineraryActivityCreateNestedManyWithoutItineraryDayInputSchema).optional()
}).strict();

export const ItineraryDayUncheckedCreateInputSchema: z.ZodType<Prisma.ItineraryDayUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  tripId: z.string(),
  dayNumber: z.number().int(),
  location: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  activities: z.lazy(() => ItineraryActivityUncheckedCreateNestedManyWithoutItineraryDayInputSchema).optional()
}).strict();

export const ItineraryDayUpdateInputSchema: z.ZodType<Prisma.ItineraryDayUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  trip: z.lazy(() => TripUpdateOneRequiredWithoutItineraryDaysNestedInputSchema).optional(),
  activities: z.lazy(() => ItineraryActivityUpdateManyWithoutItineraryDayNestedInputSchema).optional()
}).strict();

export const ItineraryDayUncheckedUpdateInputSchema: z.ZodType<Prisma.ItineraryDayUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tripId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  activities: z.lazy(() => ItineraryActivityUncheckedUpdateManyWithoutItineraryDayNestedInputSchema).optional()
}).strict();

export const ItineraryDayCreateManyInputSchema: z.ZodType<Prisma.ItineraryDayCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  tripId: z.string(),
  dayNumber: z.number().int(),
  location: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ItineraryDayUpdateManyMutationInputSchema: z.ZodType<Prisma.ItineraryDayUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ItineraryDayUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ItineraryDayUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tripId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ItineraryActivityCreateInputSchema: z.ZodType<Prisma.ItineraryActivityCreateInput> = z.object({
  id: z.string().cuid().optional(),
  placeName: z.string(),
  placeDetails: z.string(),
  imageUrl: z.string().optional().nullable(),
  latitude: z.number(),
  longitude: z.number(),
  ticketPrice: z.number(),
  rating: z.number(),
  timeOfDay: z.string(),
  estimatedTravelTime: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  itineraryDay: z.lazy(() => ItineraryDayCreateNestedOneWithoutActivitiesInputSchema)
}).strict();

export const ItineraryActivityUncheckedCreateInputSchema: z.ZodType<Prisma.ItineraryActivityUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  itineraryDayId: z.string(),
  placeName: z.string(),
  placeDetails: z.string(),
  imageUrl: z.string().optional().nullable(),
  latitude: z.number(),
  longitude: z.number(),
  ticketPrice: z.number(),
  rating: z.number(),
  timeOfDay: z.string(),
  estimatedTravelTime: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ItineraryActivityUpdateInputSchema: z.ZodType<Prisma.ItineraryActivityUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  placeName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  placeDetails: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  ticketPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  timeOfDay: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedTravelTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  itineraryDay: z.lazy(() => ItineraryDayUpdateOneRequiredWithoutActivitiesNestedInputSchema).optional()
}).strict();

export const ItineraryActivityUncheckedUpdateInputSchema: z.ZodType<Prisma.ItineraryActivityUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  itineraryDayId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  placeName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  placeDetails: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  ticketPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  timeOfDay: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedTravelTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ItineraryActivityCreateManyInputSchema: z.ZodType<Prisma.ItineraryActivityCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  itineraryDayId: z.string(),
  placeName: z.string(),
  placeDetails: z.string(),
  imageUrl: z.string().optional().nullable(),
  latitude: z.number(),
  longitude: z.number(),
  ticketPrice: z.number(),
  rating: z.number(),
  timeOfDay: z.string(),
  estimatedTravelTime: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ItineraryActivityUpdateManyMutationInputSchema: z.ZodType<Prisma.ItineraryActivityUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  placeName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  placeDetails: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  ticketPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  timeOfDay: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedTravelTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ItineraryActivityUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ItineraryActivityUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  itineraryDayId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  placeName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  placeDetails: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  ticketPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  timeOfDay: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedTravelTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const TripListRelationFilterSchema: z.ZodType<Prisma.TripListRelationFilter> = z.object({
  every: z.lazy(() => TripWhereInputSchema).optional(),
  some: z.lazy(() => TripWhereInputSchema).optional(),
  none: z.lazy(() => TripWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const TripOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TripOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  clerkId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  fullName: z.lazy(() => SortOrderSchema).optional(),
  profileImageUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  clerkId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  fullName: z.lazy(() => SortOrderSchema).optional(),
  profileImageUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  clerkId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  fullName: z.lazy(() => SortOrderSchema).optional(),
  profileImageUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const JsonFilterSchema: z.ZodType<Prisma.JsonFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional()
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const HotelListRelationFilterSchema: z.ZodType<Prisma.HotelListRelationFilter> = z.object({
  every: z.lazy(() => HotelWhereInputSchema).optional(),
  some: z.lazy(() => HotelWhereInputSchema).optional(),
  none: z.lazy(() => HotelWhereInputSchema).optional()
}).strict();

export const ItineraryDayListRelationFilterSchema: z.ZodType<Prisma.ItineraryDayListRelationFilter> = z.object({
  every: z.lazy(() => ItineraryDayWhereInputSchema).optional(),
  some: z.lazy(() => ItineraryDayWhereInputSchema).optional(),
  none: z.lazy(() => ItineraryDayWhereInputSchema).optional()
}).strict();

export const TripImageListRelationFilterSchema: z.ZodType<Prisma.TripImageListRelationFilter> = z.object({
  every: z.lazy(() => TripImageWhereInputSchema).optional(),
  some: z.lazy(() => TripImageWhereInputSchema).optional(),
  none: z.lazy(() => TripImageWhereInputSchema).optional()
}).strict();

export const HotelOrderByRelationAggregateInputSchema: z.ZodType<Prisma.HotelOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItineraryDayOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ItineraryDayOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TripImageOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TripImageOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TripCountOrderByAggregateInputSchema: z.ZodType<Prisma.TripCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  travelGroup: z.lazy(() => SortOrderSchema).optional(),
  style: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  budget: z.lazy(() => SortOrderSchema).optional(),
  estimatedTotal: z.lazy(() => SortOrderSchema).optional(),
  bestTimeToVisit: z.lazy(() => SortOrderSchema).optional(),
  weatherInfo: z.lazy(() => SortOrderSchema).optional(),
  generalLocation: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TripAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TripAvgOrderByAggregateInput> = z.object({
  duration: z.lazy(() => SortOrderSchema).optional(),
  estimatedTotal: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TripMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TripMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  travelGroup: z.lazy(() => SortOrderSchema).optional(),
  style: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  budget: z.lazy(() => SortOrderSchema).optional(),
  estimatedTotal: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TripMinOrderByAggregateInputSchema: z.ZodType<Prisma.TripMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  travelGroup: z.lazy(() => SortOrderSchema).optional(),
  style: z.lazy(() => SortOrderSchema).optional(),
  duration: z.lazy(() => SortOrderSchema).optional(),
  budget: z.lazy(() => SortOrderSchema).optional(),
  estimatedTotal: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TripSumOrderByAggregateInputSchema: z.ZodType<Prisma.TripSumOrderByAggregateInput> = z.object({
  duration: z.lazy(() => SortOrderSchema).optional(),
  estimatedTotal: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const JsonWithAggregatesFilterSchema: z.ZodType<Prisma.JsonWithAggregatesFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonFilterSchema).optional()
}).strict();

export const EnumImageSourceFilterSchema: z.ZodType<Prisma.EnumImageSourceFilter> = z.object({
  equals: z.lazy(() => ImageSourceSchema).optional(),
  in: z.lazy(() => ImageSourceSchema).array().optional(),
  notIn: z.lazy(() => ImageSourceSchema).array().optional(),
  not: z.union([ z.lazy(() => ImageSourceSchema),z.lazy(() => NestedEnumImageSourceFilterSchema) ]).optional(),
}).strict();

export const TripScalarRelationFilterSchema: z.ZodType<Prisma.TripScalarRelationFilter> = z.object({
  is: z.lazy(() => TripWhereInputSchema).optional(),
  isNot: z.lazy(() => TripWhereInputSchema).optional()
}).strict();

export const TripImageCountOrderByAggregateInputSchema: z.ZodType<Prisma.TripImageCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  ImageUrl: z.lazy(() => SortOrderSchema).optional(),
  source: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TripImageMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TripImageMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  ImageUrl: z.lazy(() => SortOrderSchema).optional(),
  source: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TripImageMinOrderByAggregateInputSchema: z.ZodType<Prisma.TripImageMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  ImageUrl: z.lazy(() => SortOrderSchema).optional(),
  source: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumImageSourceWithAggregatesFilterSchema: z.ZodType<Prisma.EnumImageSourceWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ImageSourceSchema).optional(),
  in: z.lazy(() => ImageSourceSchema).array().optional(),
  notIn: z.lazy(() => ImageSourceSchema).array().optional(),
  not: z.union([ z.lazy(() => ImageSourceSchema),z.lazy(() => NestedEnumImageSourceWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumImageSourceFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumImageSourceFilterSchema).optional()
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const HotelCountOrderByAggregateInputSchema: z.ZodType<Prisma.HotelCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  hotelName: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  estimatedPricePerNight: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HotelAvgOrderByAggregateInputSchema: z.ZodType<Prisma.HotelAvgOrderByAggregateInput> = z.object({
  estimatedPricePerNight: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HotelMaxOrderByAggregateInputSchema: z.ZodType<Prisma.HotelMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  hotelName: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  estimatedPricePerNight: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HotelMinOrderByAggregateInputSchema: z.ZodType<Prisma.HotelMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  hotelName: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  estimatedPricePerNight: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HotelSumOrderByAggregateInputSchema: z.ZodType<Prisma.HotelSumOrderByAggregateInput> = z.object({
  estimatedPricePerNight: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const ItineraryActivityListRelationFilterSchema: z.ZodType<Prisma.ItineraryActivityListRelationFilter> = z.object({
  every: z.lazy(() => ItineraryActivityWhereInputSchema).optional(),
  some: z.lazy(() => ItineraryActivityWhereInputSchema).optional(),
  none: z.lazy(() => ItineraryActivityWhereInputSchema).optional()
}).strict();

export const ItineraryActivityOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ItineraryActivityOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItineraryDayCountOrderByAggregateInputSchema: z.ZodType<Prisma.ItineraryDayCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  dayNumber: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItineraryDayAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ItineraryDayAvgOrderByAggregateInput> = z.object({
  dayNumber: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItineraryDayMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ItineraryDayMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  dayNumber: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItineraryDayMinOrderByAggregateInputSchema: z.ZodType<Prisma.ItineraryDayMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tripId: z.lazy(() => SortOrderSchema).optional(),
  dayNumber: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItineraryDaySumOrderByAggregateInputSchema: z.ZodType<Prisma.ItineraryDaySumOrderByAggregateInput> = z.object({
  dayNumber: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItineraryDayScalarRelationFilterSchema: z.ZodType<Prisma.ItineraryDayScalarRelationFilter> = z.object({
  is: z.lazy(() => ItineraryDayWhereInputSchema).optional(),
  isNot: z.lazy(() => ItineraryDayWhereInputSchema).optional()
}).strict();

export const ItineraryActivityCountOrderByAggregateInputSchema: z.ZodType<Prisma.ItineraryActivityCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  itineraryDayId: z.lazy(() => SortOrderSchema).optional(),
  placeName: z.lazy(() => SortOrderSchema).optional(),
  placeDetails: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  ticketPrice: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  timeOfDay: z.lazy(() => SortOrderSchema).optional(),
  estimatedTravelTime: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItineraryActivityAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ItineraryActivityAvgOrderByAggregateInput> = z.object({
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  ticketPrice: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  estimatedTravelTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItineraryActivityMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ItineraryActivityMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  itineraryDayId: z.lazy(() => SortOrderSchema).optional(),
  placeName: z.lazy(() => SortOrderSchema).optional(),
  placeDetails: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  ticketPrice: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  timeOfDay: z.lazy(() => SortOrderSchema).optional(),
  estimatedTravelTime: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItineraryActivityMinOrderByAggregateInputSchema: z.ZodType<Prisma.ItineraryActivityMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  itineraryDayId: z.lazy(() => SortOrderSchema).optional(),
  placeName: z.lazy(() => SortOrderSchema).optional(),
  placeDetails: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  ticketPrice: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  timeOfDay: z.lazy(() => SortOrderSchema).optional(),
  estimatedTravelTime: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ItineraryActivitySumOrderByAggregateInputSchema: z.ZodType<Prisma.ItineraryActivitySumOrderByAggregateInput> = z.object({
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  ticketPrice: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  estimatedTravelTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TripCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TripCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutUserInputSchema),z.lazy(() => TripCreateWithoutUserInputSchema).array(),z.lazy(() => TripUncheckedCreateWithoutUserInputSchema),z.lazy(() => TripUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TripCreateOrConnectWithoutUserInputSchema),z.lazy(() => TripCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TripCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TripWhereUniqueInputSchema),z.lazy(() => TripWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TripUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TripUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutUserInputSchema),z.lazy(() => TripCreateWithoutUserInputSchema).array(),z.lazy(() => TripUncheckedCreateWithoutUserInputSchema),z.lazy(() => TripUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TripCreateOrConnectWithoutUserInputSchema),z.lazy(() => TripCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TripCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TripWhereUniqueInputSchema),z.lazy(() => TripWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const TripUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TripUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutUserInputSchema),z.lazy(() => TripCreateWithoutUserInputSchema).array(),z.lazy(() => TripUncheckedCreateWithoutUserInputSchema),z.lazy(() => TripUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TripCreateOrConnectWithoutUserInputSchema),z.lazy(() => TripCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TripUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TripUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TripCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TripWhereUniqueInputSchema),z.lazy(() => TripWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TripWhereUniqueInputSchema),z.lazy(() => TripWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TripWhereUniqueInputSchema),z.lazy(() => TripWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TripWhereUniqueInputSchema),z.lazy(() => TripWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TripUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TripUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TripUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => TripUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TripScalarWhereInputSchema),z.lazy(() => TripScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TripUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TripUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutUserInputSchema),z.lazy(() => TripCreateWithoutUserInputSchema).array(),z.lazy(() => TripUncheckedCreateWithoutUserInputSchema),z.lazy(() => TripUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TripCreateOrConnectWithoutUserInputSchema),z.lazy(() => TripCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TripUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TripUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TripCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TripWhereUniqueInputSchema),z.lazy(() => TripWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TripWhereUniqueInputSchema),z.lazy(() => TripWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TripWhereUniqueInputSchema),z.lazy(() => TripWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TripWhereUniqueInputSchema),z.lazy(() => TripWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TripUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TripUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TripUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => TripUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TripScalarWhereInputSchema),z.lazy(() => TripScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TripCreatedescriptionInputSchema: z.ZodType<Prisma.TripCreatedescriptionInput> = z.object({
  set: z.string().array()
}).strict();

export const UserCreateNestedOneWithoutTripsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTripsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTripsInputSchema),z.lazy(() => UserUncheckedCreateWithoutTripsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTripsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const HotelCreateNestedManyWithoutTripInputSchema: z.ZodType<Prisma.HotelCreateNestedManyWithoutTripInput> = z.object({
  create: z.union([ z.lazy(() => HotelCreateWithoutTripInputSchema),z.lazy(() => HotelCreateWithoutTripInputSchema).array(),z.lazy(() => HotelUncheckedCreateWithoutTripInputSchema),z.lazy(() => HotelUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HotelCreateOrConnectWithoutTripInputSchema),z.lazy(() => HotelCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HotelCreateManyTripInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => HotelWhereUniqueInputSchema),z.lazy(() => HotelWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ItineraryDayCreateNestedManyWithoutTripInputSchema: z.ZodType<Prisma.ItineraryDayCreateNestedManyWithoutTripInput> = z.object({
  create: z.union([ z.lazy(() => ItineraryDayCreateWithoutTripInputSchema),z.lazy(() => ItineraryDayCreateWithoutTripInputSchema).array(),z.lazy(() => ItineraryDayUncheckedCreateWithoutTripInputSchema),z.lazy(() => ItineraryDayUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ItineraryDayCreateOrConnectWithoutTripInputSchema),z.lazy(() => ItineraryDayCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ItineraryDayCreateManyTripInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ItineraryDayWhereUniqueInputSchema),z.lazy(() => ItineraryDayWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TripImageCreateNestedManyWithoutTripInputSchema: z.ZodType<Prisma.TripImageCreateNestedManyWithoutTripInput> = z.object({
  create: z.union([ z.lazy(() => TripImageCreateWithoutTripInputSchema),z.lazy(() => TripImageCreateWithoutTripInputSchema).array(),z.lazy(() => TripImageUncheckedCreateWithoutTripInputSchema),z.lazy(() => TripImageUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TripImageCreateOrConnectWithoutTripInputSchema),z.lazy(() => TripImageCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TripImageCreateManyTripInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TripImageWhereUniqueInputSchema),z.lazy(() => TripImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const HotelUncheckedCreateNestedManyWithoutTripInputSchema: z.ZodType<Prisma.HotelUncheckedCreateNestedManyWithoutTripInput> = z.object({
  create: z.union([ z.lazy(() => HotelCreateWithoutTripInputSchema),z.lazy(() => HotelCreateWithoutTripInputSchema).array(),z.lazy(() => HotelUncheckedCreateWithoutTripInputSchema),z.lazy(() => HotelUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HotelCreateOrConnectWithoutTripInputSchema),z.lazy(() => HotelCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HotelCreateManyTripInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => HotelWhereUniqueInputSchema),z.lazy(() => HotelWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ItineraryDayUncheckedCreateNestedManyWithoutTripInputSchema: z.ZodType<Prisma.ItineraryDayUncheckedCreateNestedManyWithoutTripInput> = z.object({
  create: z.union([ z.lazy(() => ItineraryDayCreateWithoutTripInputSchema),z.lazy(() => ItineraryDayCreateWithoutTripInputSchema).array(),z.lazy(() => ItineraryDayUncheckedCreateWithoutTripInputSchema),z.lazy(() => ItineraryDayUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ItineraryDayCreateOrConnectWithoutTripInputSchema),z.lazy(() => ItineraryDayCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ItineraryDayCreateManyTripInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ItineraryDayWhereUniqueInputSchema),z.lazy(() => ItineraryDayWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TripImageUncheckedCreateNestedManyWithoutTripInputSchema: z.ZodType<Prisma.TripImageUncheckedCreateNestedManyWithoutTripInput> = z.object({
  create: z.union([ z.lazy(() => TripImageCreateWithoutTripInputSchema),z.lazy(() => TripImageCreateWithoutTripInputSchema).array(),z.lazy(() => TripImageUncheckedCreateWithoutTripInputSchema),z.lazy(() => TripImageUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TripImageCreateOrConnectWithoutTripInputSchema),z.lazy(() => TripImageCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TripImageCreateManyTripInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TripImageWhereUniqueInputSchema),z.lazy(() => TripImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TripUpdatedescriptionInputSchema: z.ZodType<Prisma.TripUpdatedescriptionInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutTripsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutTripsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTripsInputSchema),z.lazy(() => UserUncheckedCreateWithoutTripsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTripsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutTripsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutTripsInputSchema),z.lazy(() => UserUpdateWithoutTripsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTripsInputSchema) ]).optional(),
}).strict();

export const HotelUpdateManyWithoutTripNestedInputSchema: z.ZodType<Prisma.HotelUpdateManyWithoutTripNestedInput> = z.object({
  create: z.union([ z.lazy(() => HotelCreateWithoutTripInputSchema),z.lazy(() => HotelCreateWithoutTripInputSchema).array(),z.lazy(() => HotelUncheckedCreateWithoutTripInputSchema),z.lazy(() => HotelUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HotelCreateOrConnectWithoutTripInputSchema),z.lazy(() => HotelCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => HotelUpsertWithWhereUniqueWithoutTripInputSchema),z.lazy(() => HotelUpsertWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HotelCreateManyTripInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => HotelWhereUniqueInputSchema),z.lazy(() => HotelWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => HotelWhereUniqueInputSchema),z.lazy(() => HotelWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => HotelWhereUniqueInputSchema),z.lazy(() => HotelWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => HotelWhereUniqueInputSchema),z.lazy(() => HotelWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => HotelUpdateWithWhereUniqueWithoutTripInputSchema),z.lazy(() => HotelUpdateWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => HotelUpdateManyWithWhereWithoutTripInputSchema),z.lazy(() => HotelUpdateManyWithWhereWithoutTripInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => HotelScalarWhereInputSchema),z.lazy(() => HotelScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ItineraryDayUpdateManyWithoutTripNestedInputSchema: z.ZodType<Prisma.ItineraryDayUpdateManyWithoutTripNestedInput> = z.object({
  create: z.union([ z.lazy(() => ItineraryDayCreateWithoutTripInputSchema),z.lazy(() => ItineraryDayCreateWithoutTripInputSchema).array(),z.lazy(() => ItineraryDayUncheckedCreateWithoutTripInputSchema),z.lazy(() => ItineraryDayUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ItineraryDayCreateOrConnectWithoutTripInputSchema),z.lazy(() => ItineraryDayCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ItineraryDayUpsertWithWhereUniqueWithoutTripInputSchema),z.lazy(() => ItineraryDayUpsertWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ItineraryDayCreateManyTripInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ItineraryDayWhereUniqueInputSchema),z.lazy(() => ItineraryDayWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ItineraryDayWhereUniqueInputSchema),z.lazy(() => ItineraryDayWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ItineraryDayWhereUniqueInputSchema),z.lazy(() => ItineraryDayWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ItineraryDayWhereUniqueInputSchema),z.lazy(() => ItineraryDayWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ItineraryDayUpdateWithWhereUniqueWithoutTripInputSchema),z.lazy(() => ItineraryDayUpdateWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ItineraryDayUpdateManyWithWhereWithoutTripInputSchema),z.lazy(() => ItineraryDayUpdateManyWithWhereWithoutTripInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ItineraryDayScalarWhereInputSchema),z.lazy(() => ItineraryDayScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TripImageUpdateManyWithoutTripNestedInputSchema: z.ZodType<Prisma.TripImageUpdateManyWithoutTripNestedInput> = z.object({
  create: z.union([ z.lazy(() => TripImageCreateWithoutTripInputSchema),z.lazy(() => TripImageCreateWithoutTripInputSchema).array(),z.lazy(() => TripImageUncheckedCreateWithoutTripInputSchema),z.lazy(() => TripImageUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TripImageCreateOrConnectWithoutTripInputSchema),z.lazy(() => TripImageCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TripImageUpsertWithWhereUniqueWithoutTripInputSchema),z.lazy(() => TripImageUpsertWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TripImageCreateManyTripInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TripImageWhereUniqueInputSchema),z.lazy(() => TripImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TripImageWhereUniqueInputSchema),z.lazy(() => TripImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TripImageWhereUniqueInputSchema),z.lazy(() => TripImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TripImageWhereUniqueInputSchema),z.lazy(() => TripImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TripImageUpdateWithWhereUniqueWithoutTripInputSchema),z.lazy(() => TripImageUpdateWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TripImageUpdateManyWithWhereWithoutTripInputSchema),z.lazy(() => TripImageUpdateManyWithWhereWithoutTripInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TripImageScalarWhereInputSchema),z.lazy(() => TripImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const HotelUncheckedUpdateManyWithoutTripNestedInputSchema: z.ZodType<Prisma.HotelUncheckedUpdateManyWithoutTripNestedInput> = z.object({
  create: z.union([ z.lazy(() => HotelCreateWithoutTripInputSchema),z.lazy(() => HotelCreateWithoutTripInputSchema).array(),z.lazy(() => HotelUncheckedCreateWithoutTripInputSchema),z.lazy(() => HotelUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HotelCreateOrConnectWithoutTripInputSchema),z.lazy(() => HotelCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => HotelUpsertWithWhereUniqueWithoutTripInputSchema),z.lazy(() => HotelUpsertWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HotelCreateManyTripInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => HotelWhereUniqueInputSchema),z.lazy(() => HotelWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => HotelWhereUniqueInputSchema),z.lazy(() => HotelWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => HotelWhereUniqueInputSchema),z.lazy(() => HotelWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => HotelWhereUniqueInputSchema),z.lazy(() => HotelWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => HotelUpdateWithWhereUniqueWithoutTripInputSchema),z.lazy(() => HotelUpdateWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => HotelUpdateManyWithWhereWithoutTripInputSchema),z.lazy(() => HotelUpdateManyWithWhereWithoutTripInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => HotelScalarWhereInputSchema),z.lazy(() => HotelScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ItineraryDayUncheckedUpdateManyWithoutTripNestedInputSchema: z.ZodType<Prisma.ItineraryDayUncheckedUpdateManyWithoutTripNestedInput> = z.object({
  create: z.union([ z.lazy(() => ItineraryDayCreateWithoutTripInputSchema),z.lazy(() => ItineraryDayCreateWithoutTripInputSchema).array(),z.lazy(() => ItineraryDayUncheckedCreateWithoutTripInputSchema),z.lazy(() => ItineraryDayUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ItineraryDayCreateOrConnectWithoutTripInputSchema),z.lazy(() => ItineraryDayCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ItineraryDayUpsertWithWhereUniqueWithoutTripInputSchema),z.lazy(() => ItineraryDayUpsertWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ItineraryDayCreateManyTripInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ItineraryDayWhereUniqueInputSchema),z.lazy(() => ItineraryDayWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ItineraryDayWhereUniqueInputSchema),z.lazy(() => ItineraryDayWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ItineraryDayWhereUniqueInputSchema),z.lazy(() => ItineraryDayWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ItineraryDayWhereUniqueInputSchema),z.lazy(() => ItineraryDayWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ItineraryDayUpdateWithWhereUniqueWithoutTripInputSchema),z.lazy(() => ItineraryDayUpdateWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ItineraryDayUpdateManyWithWhereWithoutTripInputSchema),z.lazy(() => ItineraryDayUpdateManyWithWhereWithoutTripInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ItineraryDayScalarWhereInputSchema),z.lazy(() => ItineraryDayScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TripImageUncheckedUpdateManyWithoutTripNestedInputSchema: z.ZodType<Prisma.TripImageUncheckedUpdateManyWithoutTripNestedInput> = z.object({
  create: z.union([ z.lazy(() => TripImageCreateWithoutTripInputSchema),z.lazy(() => TripImageCreateWithoutTripInputSchema).array(),z.lazy(() => TripImageUncheckedCreateWithoutTripInputSchema),z.lazy(() => TripImageUncheckedCreateWithoutTripInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TripImageCreateOrConnectWithoutTripInputSchema),z.lazy(() => TripImageCreateOrConnectWithoutTripInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TripImageUpsertWithWhereUniqueWithoutTripInputSchema),z.lazy(() => TripImageUpsertWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TripImageCreateManyTripInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TripImageWhereUniqueInputSchema),z.lazy(() => TripImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TripImageWhereUniqueInputSchema),z.lazy(() => TripImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TripImageWhereUniqueInputSchema),z.lazy(() => TripImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TripImageWhereUniqueInputSchema),z.lazy(() => TripImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TripImageUpdateWithWhereUniqueWithoutTripInputSchema),z.lazy(() => TripImageUpdateWithWhereUniqueWithoutTripInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TripImageUpdateManyWithWhereWithoutTripInputSchema),z.lazy(() => TripImageUpdateManyWithWhereWithoutTripInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TripImageScalarWhereInputSchema),z.lazy(() => TripImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TripCreateNestedOneWithoutTripImagesInputSchema: z.ZodType<Prisma.TripCreateNestedOneWithoutTripImagesInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutTripImagesInputSchema),z.lazy(() => TripUncheckedCreateWithoutTripImagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TripCreateOrConnectWithoutTripImagesInputSchema).optional(),
  connect: z.lazy(() => TripWhereUniqueInputSchema).optional()
}).strict();

export const EnumImageSourceFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumImageSourceFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ImageSourceSchema).optional()
}).strict();

export const TripUpdateOneRequiredWithoutTripImagesNestedInputSchema: z.ZodType<Prisma.TripUpdateOneRequiredWithoutTripImagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutTripImagesInputSchema),z.lazy(() => TripUncheckedCreateWithoutTripImagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TripCreateOrConnectWithoutTripImagesInputSchema).optional(),
  upsert: z.lazy(() => TripUpsertWithoutTripImagesInputSchema).optional(),
  connect: z.lazy(() => TripWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TripUpdateToOneWithWhereWithoutTripImagesInputSchema),z.lazy(() => TripUpdateWithoutTripImagesInputSchema),z.lazy(() => TripUncheckedUpdateWithoutTripImagesInputSchema) ]).optional(),
}).strict();

export const TripCreateNestedOneWithoutHotelsInputSchema: z.ZodType<Prisma.TripCreateNestedOneWithoutHotelsInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutHotelsInputSchema),z.lazy(() => TripUncheckedCreateWithoutHotelsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TripCreateOrConnectWithoutHotelsInputSchema).optional(),
  connect: z.lazy(() => TripWhereUniqueInputSchema).optional()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const TripUpdateOneRequiredWithoutHotelsNestedInputSchema: z.ZodType<Prisma.TripUpdateOneRequiredWithoutHotelsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutHotelsInputSchema),z.lazy(() => TripUncheckedCreateWithoutHotelsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TripCreateOrConnectWithoutHotelsInputSchema).optional(),
  upsert: z.lazy(() => TripUpsertWithoutHotelsInputSchema).optional(),
  connect: z.lazy(() => TripWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TripUpdateToOneWithWhereWithoutHotelsInputSchema),z.lazy(() => TripUpdateWithoutHotelsInputSchema),z.lazy(() => TripUncheckedUpdateWithoutHotelsInputSchema) ]).optional(),
}).strict();

export const TripCreateNestedOneWithoutItineraryDaysInputSchema: z.ZodType<Prisma.TripCreateNestedOneWithoutItineraryDaysInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutItineraryDaysInputSchema),z.lazy(() => TripUncheckedCreateWithoutItineraryDaysInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TripCreateOrConnectWithoutItineraryDaysInputSchema).optional(),
  connect: z.lazy(() => TripWhereUniqueInputSchema).optional()
}).strict();

export const ItineraryActivityCreateNestedManyWithoutItineraryDayInputSchema: z.ZodType<Prisma.ItineraryActivityCreateNestedManyWithoutItineraryDayInput> = z.object({
  create: z.union([ z.lazy(() => ItineraryActivityCreateWithoutItineraryDayInputSchema),z.lazy(() => ItineraryActivityCreateWithoutItineraryDayInputSchema).array(),z.lazy(() => ItineraryActivityUncheckedCreateWithoutItineraryDayInputSchema),z.lazy(() => ItineraryActivityUncheckedCreateWithoutItineraryDayInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ItineraryActivityCreateOrConnectWithoutItineraryDayInputSchema),z.lazy(() => ItineraryActivityCreateOrConnectWithoutItineraryDayInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ItineraryActivityCreateManyItineraryDayInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ItineraryActivityWhereUniqueInputSchema),z.lazy(() => ItineraryActivityWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ItineraryActivityUncheckedCreateNestedManyWithoutItineraryDayInputSchema: z.ZodType<Prisma.ItineraryActivityUncheckedCreateNestedManyWithoutItineraryDayInput> = z.object({
  create: z.union([ z.lazy(() => ItineraryActivityCreateWithoutItineraryDayInputSchema),z.lazy(() => ItineraryActivityCreateWithoutItineraryDayInputSchema).array(),z.lazy(() => ItineraryActivityUncheckedCreateWithoutItineraryDayInputSchema),z.lazy(() => ItineraryActivityUncheckedCreateWithoutItineraryDayInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ItineraryActivityCreateOrConnectWithoutItineraryDayInputSchema),z.lazy(() => ItineraryActivityCreateOrConnectWithoutItineraryDayInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ItineraryActivityCreateManyItineraryDayInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ItineraryActivityWhereUniqueInputSchema),z.lazy(() => ItineraryActivityWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TripUpdateOneRequiredWithoutItineraryDaysNestedInputSchema: z.ZodType<Prisma.TripUpdateOneRequiredWithoutItineraryDaysNestedInput> = z.object({
  create: z.union([ z.lazy(() => TripCreateWithoutItineraryDaysInputSchema),z.lazy(() => TripUncheckedCreateWithoutItineraryDaysInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TripCreateOrConnectWithoutItineraryDaysInputSchema).optional(),
  upsert: z.lazy(() => TripUpsertWithoutItineraryDaysInputSchema).optional(),
  connect: z.lazy(() => TripWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TripUpdateToOneWithWhereWithoutItineraryDaysInputSchema),z.lazy(() => TripUpdateWithoutItineraryDaysInputSchema),z.lazy(() => TripUncheckedUpdateWithoutItineraryDaysInputSchema) ]).optional(),
}).strict();

export const ItineraryActivityUpdateManyWithoutItineraryDayNestedInputSchema: z.ZodType<Prisma.ItineraryActivityUpdateManyWithoutItineraryDayNestedInput> = z.object({
  create: z.union([ z.lazy(() => ItineraryActivityCreateWithoutItineraryDayInputSchema),z.lazy(() => ItineraryActivityCreateWithoutItineraryDayInputSchema).array(),z.lazy(() => ItineraryActivityUncheckedCreateWithoutItineraryDayInputSchema),z.lazy(() => ItineraryActivityUncheckedCreateWithoutItineraryDayInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ItineraryActivityCreateOrConnectWithoutItineraryDayInputSchema),z.lazy(() => ItineraryActivityCreateOrConnectWithoutItineraryDayInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ItineraryActivityUpsertWithWhereUniqueWithoutItineraryDayInputSchema),z.lazy(() => ItineraryActivityUpsertWithWhereUniqueWithoutItineraryDayInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ItineraryActivityCreateManyItineraryDayInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ItineraryActivityWhereUniqueInputSchema),z.lazy(() => ItineraryActivityWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ItineraryActivityWhereUniqueInputSchema),z.lazy(() => ItineraryActivityWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ItineraryActivityWhereUniqueInputSchema),z.lazy(() => ItineraryActivityWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ItineraryActivityWhereUniqueInputSchema),z.lazy(() => ItineraryActivityWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ItineraryActivityUpdateWithWhereUniqueWithoutItineraryDayInputSchema),z.lazy(() => ItineraryActivityUpdateWithWhereUniqueWithoutItineraryDayInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ItineraryActivityUpdateManyWithWhereWithoutItineraryDayInputSchema),z.lazy(() => ItineraryActivityUpdateManyWithWhereWithoutItineraryDayInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ItineraryActivityScalarWhereInputSchema),z.lazy(() => ItineraryActivityScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ItineraryActivityUncheckedUpdateManyWithoutItineraryDayNestedInputSchema: z.ZodType<Prisma.ItineraryActivityUncheckedUpdateManyWithoutItineraryDayNestedInput> = z.object({
  create: z.union([ z.lazy(() => ItineraryActivityCreateWithoutItineraryDayInputSchema),z.lazy(() => ItineraryActivityCreateWithoutItineraryDayInputSchema).array(),z.lazy(() => ItineraryActivityUncheckedCreateWithoutItineraryDayInputSchema),z.lazy(() => ItineraryActivityUncheckedCreateWithoutItineraryDayInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ItineraryActivityCreateOrConnectWithoutItineraryDayInputSchema),z.lazy(() => ItineraryActivityCreateOrConnectWithoutItineraryDayInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ItineraryActivityUpsertWithWhereUniqueWithoutItineraryDayInputSchema),z.lazy(() => ItineraryActivityUpsertWithWhereUniqueWithoutItineraryDayInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ItineraryActivityCreateManyItineraryDayInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ItineraryActivityWhereUniqueInputSchema),z.lazy(() => ItineraryActivityWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ItineraryActivityWhereUniqueInputSchema),z.lazy(() => ItineraryActivityWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ItineraryActivityWhereUniqueInputSchema),z.lazy(() => ItineraryActivityWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ItineraryActivityWhereUniqueInputSchema),z.lazy(() => ItineraryActivityWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ItineraryActivityUpdateWithWhereUniqueWithoutItineraryDayInputSchema),z.lazy(() => ItineraryActivityUpdateWithWhereUniqueWithoutItineraryDayInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ItineraryActivityUpdateManyWithWhereWithoutItineraryDayInputSchema),z.lazy(() => ItineraryActivityUpdateManyWithWhereWithoutItineraryDayInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ItineraryActivityScalarWhereInputSchema),z.lazy(() => ItineraryActivityScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ItineraryDayCreateNestedOneWithoutActivitiesInputSchema: z.ZodType<Prisma.ItineraryDayCreateNestedOneWithoutActivitiesInput> = z.object({
  create: z.union([ z.lazy(() => ItineraryDayCreateWithoutActivitiesInputSchema),z.lazy(() => ItineraryDayUncheckedCreateWithoutActivitiesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ItineraryDayCreateOrConnectWithoutActivitiesInputSchema).optional(),
  connect: z.lazy(() => ItineraryDayWhereUniqueInputSchema).optional()
}).strict();

export const ItineraryDayUpdateOneRequiredWithoutActivitiesNestedInputSchema: z.ZodType<Prisma.ItineraryDayUpdateOneRequiredWithoutActivitiesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ItineraryDayCreateWithoutActivitiesInputSchema),z.lazy(() => ItineraryDayUncheckedCreateWithoutActivitiesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ItineraryDayCreateOrConnectWithoutActivitiesInputSchema).optional(),
  upsert: z.lazy(() => ItineraryDayUpsertWithoutActivitiesInputSchema).optional(),
  connect: z.lazy(() => ItineraryDayWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ItineraryDayUpdateToOneWithWhereWithoutActivitiesInputSchema),z.lazy(() => ItineraryDayUpdateWithoutActivitiesInputSchema),z.lazy(() => ItineraryDayUncheckedUpdateWithoutActivitiesInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedJsonFilterSchema: z.ZodType<Prisma.NestedJsonFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional()
}).strict();

export const NestedEnumImageSourceFilterSchema: z.ZodType<Prisma.NestedEnumImageSourceFilter> = z.object({
  equals: z.lazy(() => ImageSourceSchema).optional(),
  in: z.lazy(() => ImageSourceSchema).array().optional(),
  notIn: z.lazy(() => ImageSourceSchema).array().optional(),
  not: z.union([ z.lazy(() => ImageSourceSchema),z.lazy(() => NestedEnumImageSourceFilterSchema) ]).optional(),
}).strict();

export const NestedEnumImageSourceWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumImageSourceWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ImageSourceSchema).optional(),
  in: z.lazy(() => ImageSourceSchema).array().optional(),
  notIn: z.lazy(() => ImageSourceSchema).array().optional(),
  not: z.union([ z.lazy(() => ImageSourceSchema),z.lazy(() => NestedEnumImageSourceWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumImageSourceFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumImageSourceFilterSchema).optional()
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const TripCreateWithoutUserInputSchema: z.ZodType<Prisma.TripCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.union([ z.lazy(() => TripCreatedescriptionInputSchema),z.string().array() ]).optional(),
  location: z.string(),
  travelGroup: z.string(),
  style: z.string(),
  duration: z.number().int(),
  budget: z.string(),
  estimatedTotal: z.number().int(),
  bestTimeToVisit: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  weatherInfo: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  generalLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  hotels: z.lazy(() => HotelCreateNestedManyWithoutTripInputSchema).optional(),
  itineraryDays: z.lazy(() => ItineraryDayCreateNestedManyWithoutTripInputSchema).optional(),
  tripImages: z.lazy(() => TripImageCreateNestedManyWithoutTripInputSchema).optional()
}).strict();

export const TripUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.TripUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.union([ z.lazy(() => TripCreatedescriptionInputSchema),z.string().array() ]).optional(),
  location: z.string(),
  travelGroup: z.string(),
  style: z.string(),
  duration: z.number().int(),
  budget: z.string(),
  estimatedTotal: z.number().int(),
  bestTimeToVisit: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  weatherInfo: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  generalLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  hotels: z.lazy(() => HotelUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  itineraryDays: z.lazy(() => ItineraryDayUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  tripImages: z.lazy(() => TripImageUncheckedCreateNestedManyWithoutTripInputSchema).optional()
}).strict();

export const TripCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.TripCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => TripWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TripCreateWithoutUserInputSchema),z.lazy(() => TripUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const TripCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.TripCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TripCreateManyUserInputSchema),z.lazy(() => TripCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TripUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TripUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => TripWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TripUpdateWithoutUserInputSchema),z.lazy(() => TripUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => TripCreateWithoutUserInputSchema),z.lazy(() => TripUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const TripUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TripUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => TripWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TripUpdateWithoutUserInputSchema),z.lazy(() => TripUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const TripUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.TripUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => TripScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TripUpdateManyMutationInputSchema),z.lazy(() => TripUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const TripScalarWhereInputSchema: z.ZodType<Prisma.TripScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TripScalarWhereInputSchema),z.lazy(() => TripScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TripScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TripScalarWhereInputSchema),z.lazy(() => TripScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.lazy(() => StringNullableListFilterSchema).optional(),
  location: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  travelGroup: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  style: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  duration: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  budget: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  estimatedTotal: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  bestTimeToVisit: z.lazy(() => JsonFilterSchema).optional(),
  weatherInfo: z.lazy(() => JsonFilterSchema).optional(),
  generalLocation: z.lazy(() => JsonFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateWithoutTripsInputSchema: z.ZodType<Prisma.UserCreateWithoutTripsInput> = z.object({
  id: z.string().cuid().optional(),
  clerkId: z.string().optional().nullable(),
  email: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  fullName: z.string().optional().nullable(),
  profileImageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUncheckedCreateWithoutTripsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTripsInput> = z.object({
  id: z.string().cuid().optional(),
  clerkId: z.string().optional().nullable(),
  email: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  fullName: z.string().optional().nullable(),
  profileImageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserCreateOrConnectWithoutTripsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTripsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutTripsInputSchema),z.lazy(() => UserUncheckedCreateWithoutTripsInputSchema) ]),
}).strict();

export const HotelCreateWithoutTripInputSchema: z.ZodType<Prisma.HotelCreateWithoutTripInput> = z.object({
  id: z.string().cuid().optional(),
  hotelName: z.string(),
  address: z.string(),
  description: z.string(),
  estimatedPricePerNight: z.number(),
  rating: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  imageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const HotelUncheckedCreateWithoutTripInputSchema: z.ZodType<Prisma.HotelUncheckedCreateWithoutTripInput> = z.object({
  id: z.string().cuid().optional(),
  hotelName: z.string(),
  address: z.string(),
  description: z.string(),
  estimatedPricePerNight: z.number(),
  rating: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  imageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const HotelCreateOrConnectWithoutTripInputSchema: z.ZodType<Prisma.HotelCreateOrConnectWithoutTripInput> = z.object({
  where: z.lazy(() => HotelWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => HotelCreateWithoutTripInputSchema),z.lazy(() => HotelUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const HotelCreateManyTripInputEnvelopeSchema: z.ZodType<Prisma.HotelCreateManyTripInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => HotelCreateManyTripInputSchema),z.lazy(() => HotelCreateManyTripInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ItineraryDayCreateWithoutTripInputSchema: z.ZodType<Prisma.ItineraryDayCreateWithoutTripInput> = z.object({
  id: z.string().cuid().optional(),
  dayNumber: z.number().int(),
  location: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  activities: z.lazy(() => ItineraryActivityCreateNestedManyWithoutItineraryDayInputSchema).optional()
}).strict();

export const ItineraryDayUncheckedCreateWithoutTripInputSchema: z.ZodType<Prisma.ItineraryDayUncheckedCreateWithoutTripInput> = z.object({
  id: z.string().cuid().optional(),
  dayNumber: z.number().int(),
  location: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  activities: z.lazy(() => ItineraryActivityUncheckedCreateNestedManyWithoutItineraryDayInputSchema).optional()
}).strict();

export const ItineraryDayCreateOrConnectWithoutTripInputSchema: z.ZodType<Prisma.ItineraryDayCreateOrConnectWithoutTripInput> = z.object({
  where: z.lazy(() => ItineraryDayWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ItineraryDayCreateWithoutTripInputSchema),z.lazy(() => ItineraryDayUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const ItineraryDayCreateManyTripInputEnvelopeSchema: z.ZodType<Prisma.ItineraryDayCreateManyTripInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ItineraryDayCreateManyTripInputSchema),z.lazy(() => ItineraryDayCreateManyTripInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TripImageCreateWithoutTripInputSchema: z.ZodType<Prisma.TripImageCreateWithoutTripInput> = z.object({
  id: z.string().cuid().optional(),
  ImageUrl: z.string(),
  source: z.lazy(() => ImageSourceSchema),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TripImageUncheckedCreateWithoutTripInputSchema: z.ZodType<Prisma.TripImageUncheckedCreateWithoutTripInput> = z.object({
  id: z.string().cuid().optional(),
  ImageUrl: z.string(),
  source: z.lazy(() => ImageSourceSchema),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TripImageCreateOrConnectWithoutTripInputSchema: z.ZodType<Prisma.TripImageCreateOrConnectWithoutTripInput> = z.object({
  where: z.lazy(() => TripImageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TripImageCreateWithoutTripInputSchema),z.lazy(() => TripImageUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const TripImageCreateManyTripInputEnvelopeSchema: z.ZodType<Prisma.TripImageCreateManyTripInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TripImageCreateManyTripInputSchema),z.lazy(() => TripImageCreateManyTripInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutTripsInputSchema: z.ZodType<Prisma.UserUpsertWithoutTripsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutTripsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTripsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutTripsInputSchema),z.lazy(() => UserUncheckedCreateWithoutTripsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutTripsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTripsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutTripsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTripsInputSchema) ]),
}).strict();

export const UserUpdateWithoutTripsInputSchema: z.ZodType<Prisma.UserUpdateWithoutTripsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clerkId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fullName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutTripsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTripsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clerkId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  fullName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  profileImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HotelUpsertWithWhereUniqueWithoutTripInputSchema: z.ZodType<Prisma.HotelUpsertWithWhereUniqueWithoutTripInput> = z.object({
  where: z.lazy(() => HotelWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => HotelUpdateWithoutTripInputSchema),z.lazy(() => HotelUncheckedUpdateWithoutTripInputSchema) ]),
  create: z.union([ z.lazy(() => HotelCreateWithoutTripInputSchema),z.lazy(() => HotelUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const HotelUpdateWithWhereUniqueWithoutTripInputSchema: z.ZodType<Prisma.HotelUpdateWithWhereUniqueWithoutTripInput> = z.object({
  where: z.lazy(() => HotelWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => HotelUpdateWithoutTripInputSchema),z.lazy(() => HotelUncheckedUpdateWithoutTripInputSchema) ]),
}).strict();

export const HotelUpdateManyWithWhereWithoutTripInputSchema: z.ZodType<Prisma.HotelUpdateManyWithWhereWithoutTripInput> = z.object({
  where: z.lazy(() => HotelScalarWhereInputSchema),
  data: z.union([ z.lazy(() => HotelUpdateManyMutationInputSchema),z.lazy(() => HotelUncheckedUpdateManyWithoutTripInputSchema) ]),
}).strict();

export const HotelScalarWhereInputSchema: z.ZodType<Prisma.HotelScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => HotelScalarWhereInputSchema),z.lazy(() => HotelScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HotelScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HotelScalarWhereInputSchema),z.lazy(() => HotelScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tripId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hotelName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  estimatedPricePerNight: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  rating: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  latitude: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  longitude: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ItineraryDayUpsertWithWhereUniqueWithoutTripInputSchema: z.ZodType<Prisma.ItineraryDayUpsertWithWhereUniqueWithoutTripInput> = z.object({
  where: z.lazy(() => ItineraryDayWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ItineraryDayUpdateWithoutTripInputSchema),z.lazy(() => ItineraryDayUncheckedUpdateWithoutTripInputSchema) ]),
  create: z.union([ z.lazy(() => ItineraryDayCreateWithoutTripInputSchema),z.lazy(() => ItineraryDayUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const ItineraryDayUpdateWithWhereUniqueWithoutTripInputSchema: z.ZodType<Prisma.ItineraryDayUpdateWithWhereUniqueWithoutTripInput> = z.object({
  where: z.lazy(() => ItineraryDayWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ItineraryDayUpdateWithoutTripInputSchema),z.lazy(() => ItineraryDayUncheckedUpdateWithoutTripInputSchema) ]),
}).strict();

export const ItineraryDayUpdateManyWithWhereWithoutTripInputSchema: z.ZodType<Prisma.ItineraryDayUpdateManyWithWhereWithoutTripInput> = z.object({
  where: z.lazy(() => ItineraryDayScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ItineraryDayUpdateManyMutationInputSchema),z.lazy(() => ItineraryDayUncheckedUpdateManyWithoutTripInputSchema) ]),
}).strict();

export const ItineraryDayScalarWhereInputSchema: z.ZodType<Prisma.ItineraryDayScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ItineraryDayScalarWhereInputSchema),z.lazy(() => ItineraryDayScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ItineraryDayScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ItineraryDayScalarWhereInputSchema),z.lazy(() => ItineraryDayScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tripId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dayNumber: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  location: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TripImageUpsertWithWhereUniqueWithoutTripInputSchema: z.ZodType<Prisma.TripImageUpsertWithWhereUniqueWithoutTripInput> = z.object({
  where: z.lazy(() => TripImageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TripImageUpdateWithoutTripInputSchema),z.lazy(() => TripImageUncheckedUpdateWithoutTripInputSchema) ]),
  create: z.union([ z.lazy(() => TripImageCreateWithoutTripInputSchema),z.lazy(() => TripImageUncheckedCreateWithoutTripInputSchema) ]),
}).strict();

export const TripImageUpdateWithWhereUniqueWithoutTripInputSchema: z.ZodType<Prisma.TripImageUpdateWithWhereUniqueWithoutTripInput> = z.object({
  where: z.lazy(() => TripImageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TripImageUpdateWithoutTripInputSchema),z.lazy(() => TripImageUncheckedUpdateWithoutTripInputSchema) ]),
}).strict();

export const TripImageUpdateManyWithWhereWithoutTripInputSchema: z.ZodType<Prisma.TripImageUpdateManyWithWhereWithoutTripInput> = z.object({
  where: z.lazy(() => TripImageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TripImageUpdateManyMutationInputSchema),z.lazy(() => TripImageUncheckedUpdateManyWithoutTripInputSchema) ]),
}).strict();

export const TripImageScalarWhereInputSchema: z.ZodType<Prisma.TripImageScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TripImageScalarWhereInputSchema),z.lazy(() => TripImageScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TripImageScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TripImageScalarWhereInputSchema),z.lazy(() => TripImageScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tripId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ImageUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  source: z.union([ z.lazy(() => EnumImageSourceFilterSchema),z.lazy(() => ImageSourceSchema) ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TripCreateWithoutTripImagesInputSchema: z.ZodType<Prisma.TripCreateWithoutTripImagesInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.union([ z.lazy(() => TripCreatedescriptionInputSchema),z.string().array() ]).optional(),
  location: z.string(),
  travelGroup: z.string(),
  style: z.string(),
  duration: z.number().int(),
  budget: z.string(),
  estimatedTotal: z.number().int(),
  bestTimeToVisit: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  weatherInfo: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  generalLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutTripsInputSchema),
  hotels: z.lazy(() => HotelCreateNestedManyWithoutTripInputSchema).optional(),
  itineraryDays: z.lazy(() => ItineraryDayCreateNestedManyWithoutTripInputSchema).optional()
}).strict();

export const TripUncheckedCreateWithoutTripImagesInputSchema: z.ZodType<Prisma.TripUncheckedCreateWithoutTripImagesInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  title: z.string(),
  description: z.union([ z.lazy(() => TripCreatedescriptionInputSchema),z.string().array() ]).optional(),
  location: z.string(),
  travelGroup: z.string(),
  style: z.string(),
  duration: z.number().int(),
  budget: z.string(),
  estimatedTotal: z.number().int(),
  bestTimeToVisit: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  weatherInfo: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  generalLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  hotels: z.lazy(() => HotelUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  itineraryDays: z.lazy(() => ItineraryDayUncheckedCreateNestedManyWithoutTripInputSchema).optional()
}).strict();

export const TripCreateOrConnectWithoutTripImagesInputSchema: z.ZodType<Prisma.TripCreateOrConnectWithoutTripImagesInput> = z.object({
  where: z.lazy(() => TripWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TripCreateWithoutTripImagesInputSchema),z.lazy(() => TripUncheckedCreateWithoutTripImagesInputSchema) ]),
}).strict();

export const TripUpsertWithoutTripImagesInputSchema: z.ZodType<Prisma.TripUpsertWithoutTripImagesInput> = z.object({
  update: z.union([ z.lazy(() => TripUpdateWithoutTripImagesInputSchema),z.lazy(() => TripUncheckedUpdateWithoutTripImagesInputSchema) ]),
  create: z.union([ z.lazy(() => TripCreateWithoutTripImagesInputSchema),z.lazy(() => TripUncheckedCreateWithoutTripImagesInputSchema) ]),
  where: z.lazy(() => TripWhereInputSchema).optional()
}).strict();

export const TripUpdateToOneWithWhereWithoutTripImagesInputSchema: z.ZodType<Prisma.TripUpdateToOneWithWhereWithoutTripImagesInput> = z.object({
  where: z.lazy(() => TripWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TripUpdateWithoutTripImagesInputSchema),z.lazy(() => TripUncheckedUpdateWithoutTripImagesInputSchema) ]),
}).strict();

export const TripUpdateWithoutTripImagesInputSchema: z.ZodType<Prisma.TripUpdateWithoutTripImagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.lazy(() => TripUpdatedescriptionInputSchema),z.string().array() ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  travelGroup: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  style: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bestTimeToVisit: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  weatherInfo: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  generalLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutTripsNestedInputSchema).optional(),
  hotels: z.lazy(() => HotelUpdateManyWithoutTripNestedInputSchema).optional(),
  itineraryDays: z.lazy(() => ItineraryDayUpdateManyWithoutTripNestedInputSchema).optional()
}).strict();

export const TripUncheckedUpdateWithoutTripImagesInputSchema: z.ZodType<Prisma.TripUncheckedUpdateWithoutTripImagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.lazy(() => TripUpdatedescriptionInputSchema),z.string().array() ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  travelGroup: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  style: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bestTimeToVisit: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  weatherInfo: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  generalLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hotels: z.lazy(() => HotelUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  itineraryDays: z.lazy(() => ItineraryDayUncheckedUpdateManyWithoutTripNestedInputSchema).optional()
}).strict();

export const TripCreateWithoutHotelsInputSchema: z.ZodType<Prisma.TripCreateWithoutHotelsInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.union([ z.lazy(() => TripCreatedescriptionInputSchema),z.string().array() ]).optional(),
  location: z.string(),
  travelGroup: z.string(),
  style: z.string(),
  duration: z.number().int(),
  budget: z.string(),
  estimatedTotal: z.number().int(),
  bestTimeToVisit: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  weatherInfo: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  generalLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutTripsInputSchema),
  itineraryDays: z.lazy(() => ItineraryDayCreateNestedManyWithoutTripInputSchema).optional(),
  tripImages: z.lazy(() => TripImageCreateNestedManyWithoutTripInputSchema).optional()
}).strict();

export const TripUncheckedCreateWithoutHotelsInputSchema: z.ZodType<Prisma.TripUncheckedCreateWithoutHotelsInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  title: z.string(),
  description: z.union([ z.lazy(() => TripCreatedescriptionInputSchema),z.string().array() ]).optional(),
  location: z.string(),
  travelGroup: z.string(),
  style: z.string(),
  duration: z.number().int(),
  budget: z.string(),
  estimatedTotal: z.number().int(),
  bestTimeToVisit: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  weatherInfo: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  generalLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  itineraryDays: z.lazy(() => ItineraryDayUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  tripImages: z.lazy(() => TripImageUncheckedCreateNestedManyWithoutTripInputSchema).optional()
}).strict();

export const TripCreateOrConnectWithoutHotelsInputSchema: z.ZodType<Prisma.TripCreateOrConnectWithoutHotelsInput> = z.object({
  where: z.lazy(() => TripWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TripCreateWithoutHotelsInputSchema),z.lazy(() => TripUncheckedCreateWithoutHotelsInputSchema) ]),
}).strict();

export const TripUpsertWithoutHotelsInputSchema: z.ZodType<Prisma.TripUpsertWithoutHotelsInput> = z.object({
  update: z.union([ z.lazy(() => TripUpdateWithoutHotelsInputSchema),z.lazy(() => TripUncheckedUpdateWithoutHotelsInputSchema) ]),
  create: z.union([ z.lazy(() => TripCreateWithoutHotelsInputSchema),z.lazy(() => TripUncheckedCreateWithoutHotelsInputSchema) ]),
  where: z.lazy(() => TripWhereInputSchema).optional()
}).strict();

export const TripUpdateToOneWithWhereWithoutHotelsInputSchema: z.ZodType<Prisma.TripUpdateToOneWithWhereWithoutHotelsInput> = z.object({
  where: z.lazy(() => TripWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TripUpdateWithoutHotelsInputSchema),z.lazy(() => TripUncheckedUpdateWithoutHotelsInputSchema) ]),
}).strict();

export const TripUpdateWithoutHotelsInputSchema: z.ZodType<Prisma.TripUpdateWithoutHotelsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.lazy(() => TripUpdatedescriptionInputSchema),z.string().array() ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  travelGroup: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  style: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bestTimeToVisit: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  weatherInfo: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  generalLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutTripsNestedInputSchema).optional(),
  itineraryDays: z.lazy(() => ItineraryDayUpdateManyWithoutTripNestedInputSchema).optional(),
  tripImages: z.lazy(() => TripImageUpdateManyWithoutTripNestedInputSchema).optional()
}).strict();

export const TripUncheckedUpdateWithoutHotelsInputSchema: z.ZodType<Prisma.TripUncheckedUpdateWithoutHotelsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.lazy(() => TripUpdatedescriptionInputSchema),z.string().array() ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  travelGroup: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  style: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bestTimeToVisit: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  weatherInfo: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  generalLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  itineraryDays: z.lazy(() => ItineraryDayUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  tripImages: z.lazy(() => TripImageUncheckedUpdateManyWithoutTripNestedInputSchema).optional()
}).strict();

export const TripCreateWithoutItineraryDaysInputSchema: z.ZodType<Prisma.TripCreateWithoutItineraryDaysInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.union([ z.lazy(() => TripCreatedescriptionInputSchema),z.string().array() ]).optional(),
  location: z.string(),
  travelGroup: z.string(),
  style: z.string(),
  duration: z.number().int(),
  budget: z.string(),
  estimatedTotal: z.number().int(),
  bestTimeToVisit: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  weatherInfo: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  generalLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutTripsInputSchema),
  hotels: z.lazy(() => HotelCreateNestedManyWithoutTripInputSchema).optional(),
  tripImages: z.lazy(() => TripImageCreateNestedManyWithoutTripInputSchema).optional()
}).strict();

export const TripUncheckedCreateWithoutItineraryDaysInputSchema: z.ZodType<Prisma.TripUncheckedCreateWithoutItineraryDaysInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  title: z.string(),
  description: z.union([ z.lazy(() => TripCreatedescriptionInputSchema),z.string().array() ]).optional(),
  location: z.string(),
  travelGroup: z.string(),
  style: z.string(),
  duration: z.number().int(),
  budget: z.string(),
  estimatedTotal: z.number().int(),
  bestTimeToVisit: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  weatherInfo: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  generalLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  hotels: z.lazy(() => HotelUncheckedCreateNestedManyWithoutTripInputSchema).optional(),
  tripImages: z.lazy(() => TripImageUncheckedCreateNestedManyWithoutTripInputSchema).optional()
}).strict();

export const TripCreateOrConnectWithoutItineraryDaysInputSchema: z.ZodType<Prisma.TripCreateOrConnectWithoutItineraryDaysInput> = z.object({
  where: z.lazy(() => TripWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TripCreateWithoutItineraryDaysInputSchema),z.lazy(() => TripUncheckedCreateWithoutItineraryDaysInputSchema) ]),
}).strict();

export const ItineraryActivityCreateWithoutItineraryDayInputSchema: z.ZodType<Prisma.ItineraryActivityCreateWithoutItineraryDayInput> = z.object({
  id: z.string().cuid().optional(),
  placeName: z.string(),
  placeDetails: z.string(),
  imageUrl: z.string().optional().nullable(),
  latitude: z.number(),
  longitude: z.number(),
  ticketPrice: z.number(),
  rating: z.number(),
  timeOfDay: z.string(),
  estimatedTravelTime: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ItineraryActivityUncheckedCreateWithoutItineraryDayInputSchema: z.ZodType<Prisma.ItineraryActivityUncheckedCreateWithoutItineraryDayInput> = z.object({
  id: z.string().cuid().optional(),
  placeName: z.string(),
  placeDetails: z.string(),
  imageUrl: z.string().optional().nullable(),
  latitude: z.number(),
  longitude: z.number(),
  ticketPrice: z.number(),
  rating: z.number(),
  timeOfDay: z.string(),
  estimatedTravelTime: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ItineraryActivityCreateOrConnectWithoutItineraryDayInputSchema: z.ZodType<Prisma.ItineraryActivityCreateOrConnectWithoutItineraryDayInput> = z.object({
  where: z.lazy(() => ItineraryActivityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ItineraryActivityCreateWithoutItineraryDayInputSchema),z.lazy(() => ItineraryActivityUncheckedCreateWithoutItineraryDayInputSchema) ]),
}).strict();

export const ItineraryActivityCreateManyItineraryDayInputEnvelopeSchema: z.ZodType<Prisma.ItineraryActivityCreateManyItineraryDayInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ItineraryActivityCreateManyItineraryDayInputSchema),z.lazy(() => ItineraryActivityCreateManyItineraryDayInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TripUpsertWithoutItineraryDaysInputSchema: z.ZodType<Prisma.TripUpsertWithoutItineraryDaysInput> = z.object({
  update: z.union([ z.lazy(() => TripUpdateWithoutItineraryDaysInputSchema),z.lazy(() => TripUncheckedUpdateWithoutItineraryDaysInputSchema) ]),
  create: z.union([ z.lazy(() => TripCreateWithoutItineraryDaysInputSchema),z.lazy(() => TripUncheckedCreateWithoutItineraryDaysInputSchema) ]),
  where: z.lazy(() => TripWhereInputSchema).optional()
}).strict();

export const TripUpdateToOneWithWhereWithoutItineraryDaysInputSchema: z.ZodType<Prisma.TripUpdateToOneWithWhereWithoutItineraryDaysInput> = z.object({
  where: z.lazy(() => TripWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TripUpdateWithoutItineraryDaysInputSchema),z.lazy(() => TripUncheckedUpdateWithoutItineraryDaysInputSchema) ]),
}).strict();

export const TripUpdateWithoutItineraryDaysInputSchema: z.ZodType<Prisma.TripUpdateWithoutItineraryDaysInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.lazy(() => TripUpdatedescriptionInputSchema),z.string().array() ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  travelGroup: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  style: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bestTimeToVisit: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  weatherInfo: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  generalLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutTripsNestedInputSchema).optional(),
  hotels: z.lazy(() => HotelUpdateManyWithoutTripNestedInputSchema).optional(),
  tripImages: z.lazy(() => TripImageUpdateManyWithoutTripNestedInputSchema).optional()
}).strict();

export const TripUncheckedUpdateWithoutItineraryDaysInputSchema: z.ZodType<Prisma.TripUncheckedUpdateWithoutItineraryDaysInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.lazy(() => TripUpdatedescriptionInputSchema),z.string().array() ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  travelGroup: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  style: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bestTimeToVisit: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  weatherInfo: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  generalLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hotels: z.lazy(() => HotelUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  tripImages: z.lazy(() => TripImageUncheckedUpdateManyWithoutTripNestedInputSchema).optional()
}).strict();

export const ItineraryActivityUpsertWithWhereUniqueWithoutItineraryDayInputSchema: z.ZodType<Prisma.ItineraryActivityUpsertWithWhereUniqueWithoutItineraryDayInput> = z.object({
  where: z.lazy(() => ItineraryActivityWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ItineraryActivityUpdateWithoutItineraryDayInputSchema),z.lazy(() => ItineraryActivityUncheckedUpdateWithoutItineraryDayInputSchema) ]),
  create: z.union([ z.lazy(() => ItineraryActivityCreateWithoutItineraryDayInputSchema),z.lazy(() => ItineraryActivityUncheckedCreateWithoutItineraryDayInputSchema) ]),
}).strict();

export const ItineraryActivityUpdateWithWhereUniqueWithoutItineraryDayInputSchema: z.ZodType<Prisma.ItineraryActivityUpdateWithWhereUniqueWithoutItineraryDayInput> = z.object({
  where: z.lazy(() => ItineraryActivityWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ItineraryActivityUpdateWithoutItineraryDayInputSchema),z.lazy(() => ItineraryActivityUncheckedUpdateWithoutItineraryDayInputSchema) ]),
}).strict();

export const ItineraryActivityUpdateManyWithWhereWithoutItineraryDayInputSchema: z.ZodType<Prisma.ItineraryActivityUpdateManyWithWhereWithoutItineraryDayInput> = z.object({
  where: z.lazy(() => ItineraryActivityScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ItineraryActivityUpdateManyMutationInputSchema),z.lazy(() => ItineraryActivityUncheckedUpdateManyWithoutItineraryDayInputSchema) ]),
}).strict();

export const ItineraryActivityScalarWhereInputSchema: z.ZodType<Prisma.ItineraryActivityScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ItineraryActivityScalarWhereInputSchema),z.lazy(() => ItineraryActivityScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ItineraryActivityScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ItineraryActivityScalarWhereInputSchema),z.lazy(() => ItineraryActivityScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  itineraryDayId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  placeName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  placeDetails: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  latitude: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  longitude: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  ticketPrice: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  rating: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  timeOfDay: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  estimatedTravelTime: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ItineraryDayCreateWithoutActivitiesInputSchema: z.ZodType<Prisma.ItineraryDayCreateWithoutActivitiesInput> = z.object({
  id: z.string().cuid().optional(),
  dayNumber: z.number().int(),
  location: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  trip: z.lazy(() => TripCreateNestedOneWithoutItineraryDaysInputSchema)
}).strict();

export const ItineraryDayUncheckedCreateWithoutActivitiesInputSchema: z.ZodType<Prisma.ItineraryDayUncheckedCreateWithoutActivitiesInput> = z.object({
  id: z.string().cuid().optional(),
  tripId: z.string(),
  dayNumber: z.number().int(),
  location: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ItineraryDayCreateOrConnectWithoutActivitiesInputSchema: z.ZodType<Prisma.ItineraryDayCreateOrConnectWithoutActivitiesInput> = z.object({
  where: z.lazy(() => ItineraryDayWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ItineraryDayCreateWithoutActivitiesInputSchema),z.lazy(() => ItineraryDayUncheckedCreateWithoutActivitiesInputSchema) ]),
}).strict();

export const ItineraryDayUpsertWithoutActivitiesInputSchema: z.ZodType<Prisma.ItineraryDayUpsertWithoutActivitiesInput> = z.object({
  update: z.union([ z.lazy(() => ItineraryDayUpdateWithoutActivitiesInputSchema),z.lazy(() => ItineraryDayUncheckedUpdateWithoutActivitiesInputSchema) ]),
  create: z.union([ z.lazy(() => ItineraryDayCreateWithoutActivitiesInputSchema),z.lazy(() => ItineraryDayUncheckedCreateWithoutActivitiesInputSchema) ]),
  where: z.lazy(() => ItineraryDayWhereInputSchema).optional()
}).strict();

export const ItineraryDayUpdateToOneWithWhereWithoutActivitiesInputSchema: z.ZodType<Prisma.ItineraryDayUpdateToOneWithWhereWithoutActivitiesInput> = z.object({
  where: z.lazy(() => ItineraryDayWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ItineraryDayUpdateWithoutActivitiesInputSchema),z.lazy(() => ItineraryDayUncheckedUpdateWithoutActivitiesInputSchema) ]),
}).strict();

export const ItineraryDayUpdateWithoutActivitiesInputSchema: z.ZodType<Prisma.ItineraryDayUpdateWithoutActivitiesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  trip: z.lazy(() => TripUpdateOneRequiredWithoutItineraryDaysNestedInputSchema).optional()
}).strict();

export const ItineraryDayUncheckedUpdateWithoutActivitiesInputSchema: z.ZodType<Prisma.ItineraryDayUncheckedUpdateWithoutActivitiesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tripId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TripCreateManyUserInputSchema: z.ZodType<Prisma.TripCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.union([ z.lazy(() => TripCreatedescriptionInputSchema),z.string().array() ]).optional(),
  location: z.string(),
  travelGroup: z.string(),
  style: z.string(),
  duration: z.number().int(),
  budget: z.string(),
  estimatedTotal: z.number().int(),
  bestTimeToVisit: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  weatherInfo: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  generalLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TripUpdateWithoutUserInputSchema: z.ZodType<Prisma.TripUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.lazy(() => TripUpdatedescriptionInputSchema),z.string().array() ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  travelGroup: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  style: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bestTimeToVisit: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  weatherInfo: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  generalLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hotels: z.lazy(() => HotelUpdateManyWithoutTripNestedInputSchema).optional(),
  itineraryDays: z.lazy(() => ItineraryDayUpdateManyWithoutTripNestedInputSchema).optional(),
  tripImages: z.lazy(() => TripImageUpdateManyWithoutTripNestedInputSchema).optional()
}).strict();

export const TripUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.TripUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.lazy(() => TripUpdatedescriptionInputSchema),z.string().array() ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  travelGroup: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  style: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bestTimeToVisit: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  weatherInfo: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  generalLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hotels: z.lazy(() => HotelUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  itineraryDays: z.lazy(() => ItineraryDayUncheckedUpdateManyWithoutTripNestedInputSchema).optional(),
  tripImages: z.lazy(() => TripImageUncheckedUpdateManyWithoutTripNestedInputSchema).optional()
}).strict();

export const TripUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.TripUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.lazy(() => TripUpdatedescriptionInputSchema),z.string().array() ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  travelGroup: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  style: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  duration: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  budget: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedTotal: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bestTimeToVisit: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  weatherInfo: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  generalLocation: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HotelCreateManyTripInputSchema: z.ZodType<Prisma.HotelCreateManyTripInput> = z.object({
  id: z.string().cuid().optional(),
  hotelName: z.string(),
  address: z.string(),
  description: z.string(),
  estimatedPricePerNight: z.number(),
  rating: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  imageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ItineraryDayCreateManyTripInputSchema: z.ZodType<Prisma.ItineraryDayCreateManyTripInput> = z.object({
  id: z.string().cuid().optional(),
  dayNumber: z.number().int(),
  location: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TripImageCreateManyTripInputSchema: z.ZodType<Prisma.TripImageCreateManyTripInput> = z.object({
  id: z.string().cuid().optional(),
  ImageUrl: z.string(),
  source: z.lazy(() => ImageSourceSchema),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const HotelUpdateWithoutTripInputSchema: z.ZodType<Prisma.HotelUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hotelName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedPricePerNight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HotelUncheckedUpdateWithoutTripInputSchema: z.ZodType<Prisma.HotelUncheckedUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hotelName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedPricePerNight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HotelUncheckedUpdateManyWithoutTripInputSchema: z.ZodType<Prisma.HotelUncheckedUpdateManyWithoutTripInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hotelName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedPricePerNight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ItineraryDayUpdateWithoutTripInputSchema: z.ZodType<Prisma.ItineraryDayUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  activities: z.lazy(() => ItineraryActivityUpdateManyWithoutItineraryDayNestedInputSchema).optional()
}).strict();

export const ItineraryDayUncheckedUpdateWithoutTripInputSchema: z.ZodType<Prisma.ItineraryDayUncheckedUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  activities: z.lazy(() => ItineraryActivityUncheckedUpdateManyWithoutItineraryDayNestedInputSchema).optional()
}).strict();

export const ItineraryDayUncheckedUpdateManyWithoutTripInputSchema: z.ZodType<Prisma.ItineraryDayUncheckedUpdateManyWithoutTripInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dayNumber: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TripImageUpdateWithoutTripInputSchema: z.ZodType<Prisma.TripImageUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ImageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.lazy(() => ImageSourceSchema),z.lazy(() => EnumImageSourceFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TripImageUncheckedUpdateWithoutTripInputSchema: z.ZodType<Prisma.TripImageUncheckedUpdateWithoutTripInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ImageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.lazy(() => ImageSourceSchema),z.lazy(() => EnumImageSourceFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TripImageUncheckedUpdateManyWithoutTripInputSchema: z.ZodType<Prisma.TripImageUncheckedUpdateManyWithoutTripInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ImageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.lazy(() => ImageSourceSchema),z.lazy(() => EnumImageSourceFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ItineraryActivityCreateManyItineraryDayInputSchema: z.ZodType<Prisma.ItineraryActivityCreateManyItineraryDayInput> = z.object({
  id: z.string().cuid().optional(),
  placeName: z.string(),
  placeDetails: z.string(),
  imageUrl: z.string().optional().nullable(),
  latitude: z.number(),
  longitude: z.number(),
  ticketPrice: z.number(),
  rating: z.number(),
  timeOfDay: z.string(),
  estimatedTravelTime: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ItineraryActivityUpdateWithoutItineraryDayInputSchema: z.ZodType<Prisma.ItineraryActivityUpdateWithoutItineraryDayInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  placeName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  placeDetails: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  ticketPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  timeOfDay: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedTravelTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ItineraryActivityUncheckedUpdateWithoutItineraryDayInputSchema: z.ZodType<Prisma.ItineraryActivityUncheckedUpdateWithoutItineraryDayInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  placeName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  placeDetails: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  ticketPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  timeOfDay: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedTravelTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ItineraryActivityUncheckedUpdateManyWithoutItineraryDayInputSchema: z.ZodType<Prisma.ItineraryActivityUncheckedUpdateManyWithoutItineraryDayInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  placeName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  placeDetails: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  ticketPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  timeOfDay: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  estimatedTravelTime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const TripFindFirstArgsSchema: z.ZodType<Prisma.TripFindFirstArgs> = z.object({
  select: TripSelectSchema.optional(),
  include: TripIncludeSchema.optional(),
  where: TripWhereInputSchema.optional(),
  orderBy: z.union([ TripOrderByWithRelationInputSchema.array(),TripOrderByWithRelationInputSchema ]).optional(),
  cursor: TripWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TripScalarFieldEnumSchema,TripScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TripFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TripFindFirstOrThrowArgs> = z.object({
  select: TripSelectSchema.optional(),
  include: TripIncludeSchema.optional(),
  where: TripWhereInputSchema.optional(),
  orderBy: z.union([ TripOrderByWithRelationInputSchema.array(),TripOrderByWithRelationInputSchema ]).optional(),
  cursor: TripWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TripScalarFieldEnumSchema,TripScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TripFindManyArgsSchema: z.ZodType<Prisma.TripFindManyArgs> = z.object({
  select: TripSelectSchema.optional(),
  include: TripIncludeSchema.optional(),
  where: TripWhereInputSchema.optional(),
  orderBy: z.union([ TripOrderByWithRelationInputSchema.array(),TripOrderByWithRelationInputSchema ]).optional(),
  cursor: TripWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TripScalarFieldEnumSchema,TripScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TripAggregateArgsSchema: z.ZodType<Prisma.TripAggregateArgs> = z.object({
  where: TripWhereInputSchema.optional(),
  orderBy: z.union([ TripOrderByWithRelationInputSchema.array(),TripOrderByWithRelationInputSchema ]).optional(),
  cursor: TripWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TripGroupByArgsSchema: z.ZodType<Prisma.TripGroupByArgs> = z.object({
  where: TripWhereInputSchema.optional(),
  orderBy: z.union([ TripOrderByWithAggregationInputSchema.array(),TripOrderByWithAggregationInputSchema ]).optional(),
  by: TripScalarFieldEnumSchema.array(),
  having: TripScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TripFindUniqueArgsSchema: z.ZodType<Prisma.TripFindUniqueArgs> = z.object({
  select: TripSelectSchema.optional(),
  include: TripIncludeSchema.optional(),
  where: TripWhereUniqueInputSchema,
}).strict() ;

export const TripFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TripFindUniqueOrThrowArgs> = z.object({
  select: TripSelectSchema.optional(),
  include: TripIncludeSchema.optional(),
  where: TripWhereUniqueInputSchema,
}).strict() ;

export const TripImageFindFirstArgsSchema: z.ZodType<Prisma.TripImageFindFirstArgs> = z.object({
  select: TripImageSelectSchema.optional(),
  include: TripImageIncludeSchema.optional(),
  where: TripImageWhereInputSchema.optional(),
  orderBy: z.union([ TripImageOrderByWithRelationInputSchema.array(),TripImageOrderByWithRelationInputSchema ]).optional(),
  cursor: TripImageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TripImageScalarFieldEnumSchema,TripImageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TripImageFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TripImageFindFirstOrThrowArgs> = z.object({
  select: TripImageSelectSchema.optional(),
  include: TripImageIncludeSchema.optional(),
  where: TripImageWhereInputSchema.optional(),
  orderBy: z.union([ TripImageOrderByWithRelationInputSchema.array(),TripImageOrderByWithRelationInputSchema ]).optional(),
  cursor: TripImageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TripImageScalarFieldEnumSchema,TripImageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TripImageFindManyArgsSchema: z.ZodType<Prisma.TripImageFindManyArgs> = z.object({
  select: TripImageSelectSchema.optional(),
  include: TripImageIncludeSchema.optional(),
  where: TripImageWhereInputSchema.optional(),
  orderBy: z.union([ TripImageOrderByWithRelationInputSchema.array(),TripImageOrderByWithRelationInputSchema ]).optional(),
  cursor: TripImageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TripImageScalarFieldEnumSchema,TripImageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TripImageAggregateArgsSchema: z.ZodType<Prisma.TripImageAggregateArgs> = z.object({
  where: TripImageWhereInputSchema.optional(),
  orderBy: z.union([ TripImageOrderByWithRelationInputSchema.array(),TripImageOrderByWithRelationInputSchema ]).optional(),
  cursor: TripImageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TripImageGroupByArgsSchema: z.ZodType<Prisma.TripImageGroupByArgs> = z.object({
  where: TripImageWhereInputSchema.optional(),
  orderBy: z.union([ TripImageOrderByWithAggregationInputSchema.array(),TripImageOrderByWithAggregationInputSchema ]).optional(),
  by: TripImageScalarFieldEnumSchema.array(),
  having: TripImageScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TripImageFindUniqueArgsSchema: z.ZodType<Prisma.TripImageFindUniqueArgs> = z.object({
  select: TripImageSelectSchema.optional(),
  include: TripImageIncludeSchema.optional(),
  where: TripImageWhereUniqueInputSchema,
}).strict() ;

export const TripImageFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TripImageFindUniqueOrThrowArgs> = z.object({
  select: TripImageSelectSchema.optional(),
  include: TripImageIncludeSchema.optional(),
  where: TripImageWhereUniqueInputSchema,
}).strict() ;

export const HotelFindFirstArgsSchema: z.ZodType<Prisma.HotelFindFirstArgs> = z.object({
  select: HotelSelectSchema.optional(),
  include: HotelIncludeSchema.optional(),
  where: HotelWhereInputSchema.optional(),
  orderBy: z.union([ HotelOrderByWithRelationInputSchema.array(),HotelOrderByWithRelationInputSchema ]).optional(),
  cursor: HotelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HotelScalarFieldEnumSchema,HotelScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const HotelFindFirstOrThrowArgsSchema: z.ZodType<Prisma.HotelFindFirstOrThrowArgs> = z.object({
  select: HotelSelectSchema.optional(),
  include: HotelIncludeSchema.optional(),
  where: HotelWhereInputSchema.optional(),
  orderBy: z.union([ HotelOrderByWithRelationInputSchema.array(),HotelOrderByWithRelationInputSchema ]).optional(),
  cursor: HotelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HotelScalarFieldEnumSchema,HotelScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const HotelFindManyArgsSchema: z.ZodType<Prisma.HotelFindManyArgs> = z.object({
  select: HotelSelectSchema.optional(),
  include: HotelIncludeSchema.optional(),
  where: HotelWhereInputSchema.optional(),
  orderBy: z.union([ HotelOrderByWithRelationInputSchema.array(),HotelOrderByWithRelationInputSchema ]).optional(),
  cursor: HotelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HotelScalarFieldEnumSchema,HotelScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const HotelAggregateArgsSchema: z.ZodType<Prisma.HotelAggregateArgs> = z.object({
  where: HotelWhereInputSchema.optional(),
  orderBy: z.union([ HotelOrderByWithRelationInputSchema.array(),HotelOrderByWithRelationInputSchema ]).optional(),
  cursor: HotelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const HotelGroupByArgsSchema: z.ZodType<Prisma.HotelGroupByArgs> = z.object({
  where: HotelWhereInputSchema.optional(),
  orderBy: z.union([ HotelOrderByWithAggregationInputSchema.array(),HotelOrderByWithAggregationInputSchema ]).optional(),
  by: HotelScalarFieldEnumSchema.array(),
  having: HotelScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const HotelFindUniqueArgsSchema: z.ZodType<Prisma.HotelFindUniqueArgs> = z.object({
  select: HotelSelectSchema.optional(),
  include: HotelIncludeSchema.optional(),
  where: HotelWhereUniqueInputSchema,
}).strict() ;

export const HotelFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.HotelFindUniqueOrThrowArgs> = z.object({
  select: HotelSelectSchema.optional(),
  include: HotelIncludeSchema.optional(),
  where: HotelWhereUniqueInputSchema,
}).strict() ;

export const ItineraryDayFindFirstArgsSchema: z.ZodType<Prisma.ItineraryDayFindFirstArgs> = z.object({
  select: ItineraryDaySelectSchema.optional(),
  include: ItineraryDayIncludeSchema.optional(),
  where: ItineraryDayWhereInputSchema.optional(),
  orderBy: z.union([ ItineraryDayOrderByWithRelationInputSchema.array(),ItineraryDayOrderByWithRelationInputSchema ]).optional(),
  cursor: ItineraryDayWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ItineraryDayScalarFieldEnumSchema,ItineraryDayScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ItineraryDayFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ItineraryDayFindFirstOrThrowArgs> = z.object({
  select: ItineraryDaySelectSchema.optional(),
  include: ItineraryDayIncludeSchema.optional(),
  where: ItineraryDayWhereInputSchema.optional(),
  orderBy: z.union([ ItineraryDayOrderByWithRelationInputSchema.array(),ItineraryDayOrderByWithRelationInputSchema ]).optional(),
  cursor: ItineraryDayWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ItineraryDayScalarFieldEnumSchema,ItineraryDayScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ItineraryDayFindManyArgsSchema: z.ZodType<Prisma.ItineraryDayFindManyArgs> = z.object({
  select: ItineraryDaySelectSchema.optional(),
  include: ItineraryDayIncludeSchema.optional(),
  where: ItineraryDayWhereInputSchema.optional(),
  orderBy: z.union([ ItineraryDayOrderByWithRelationInputSchema.array(),ItineraryDayOrderByWithRelationInputSchema ]).optional(),
  cursor: ItineraryDayWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ItineraryDayScalarFieldEnumSchema,ItineraryDayScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ItineraryDayAggregateArgsSchema: z.ZodType<Prisma.ItineraryDayAggregateArgs> = z.object({
  where: ItineraryDayWhereInputSchema.optional(),
  orderBy: z.union([ ItineraryDayOrderByWithRelationInputSchema.array(),ItineraryDayOrderByWithRelationInputSchema ]).optional(),
  cursor: ItineraryDayWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ItineraryDayGroupByArgsSchema: z.ZodType<Prisma.ItineraryDayGroupByArgs> = z.object({
  where: ItineraryDayWhereInputSchema.optional(),
  orderBy: z.union([ ItineraryDayOrderByWithAggregationInputSchema.array(),ItineraryDayOrderByWithAggregationInputSchema ]).optional(),
  by: ItineraryDayScalarFieldEnumSchema.array(),
  having: ItineraryDayScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ItineraryDayFindUniqueArgsSchema: z.ZodType<Prisma.ItineraryDayFindUniqueArgs> = z.object({
  select: ItineraryDaySelectSchema.optional(),
  include: ItineraryDayIncludeSchema.optional(),
  where: ItineraryDayWhereUniqueInputSchema,
}).strict() ;

export const ItineraryDayFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ItineraryDayFindUniqueOrThrowArgs> = z.object({
  select: ItineraryDaySelectSchema.optional(),
  include: ItineraryDayIncludeSchema.optional(),
  where: ItineraryDayWhereUniqueInputSchema,
}).strict() ;

export const ItineraryActivityFindFirstArgsSchema: z.ZodType<Prisma.ItineraryActivityFindFirstArgs> = z.object({
  select: ItineraryActivitySelectSchema.optional(),
  include: ItineraryActivityIncludeSchema.optional(),
  where: ItineraryActivityWhereInputSchema.optional(),
  orderBy: z.union([ ItineraryActivityOrderByWithRelationInputSchema.array(),ItineraryActivityOrderByWithRelationInputSchema ]).optional(),
  cursor: ItineraryActivityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ItineraryActivityScalarFieldEnumSchema,ItineraryActivityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ItineraryActivityFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ItineraryActivityFindFirstOrThrowArgs> = z.object({
  select: ItineraryActivitySelectSchema.optional(),
  include: ItineraryActivityIncludeSchema.optional(),
  where: ItineraryActivityWhereInputSchema.optional(),
  orderBy: z.union([ ItineraryActivityOrderByWithRelationInputSchema.array(),ItineraryActivityOrderByWithRelationInputSchema ]).optional(),
  cursor: ItineraryActivityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ItineraryActivityScalarFieldEnumSchema,ItineraryActivityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ItineraryActivityFindManyArgsSchema: z.ZodType<Prisma.ItineraryActivityFindManyArgs> = z.object({
  select: ItineraryActivitySelectSchema.optional(),
  include: ItineraryActivityIncludeSchema.optional(),
  where: ItineraryActivityWhereInputSchema.optional(),
  orderBy: z.union([ ItineraryActivityOrderByWithRelationInputSchema.array(),ItineraryActivityOrderByWithRelationInputSchema ]).optional(),
  cursor: ItineraryActivityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ItineraryActivityScalarFieldEnumSchema,ItineraryActivityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ItineraryActivityAggregateArgsSchema: z.ZodType<Prisma.ItineraryActivityAggregateArgs> = z.object({
  where: ItineraryActivityWhereInputSchema.optional(),
  orderBy: z.union([ ItineraryActivityOrderByWithRelationInputSchema.array(),ItineraryActivityOrderByWithRelationInputSchema ]).optional(),
  cursor: ItineraryActivityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ItineraryActivityGroupByArgsSchema: z.ZodType<Prisma.ItineraryActivityGroupByArgs> = z.object({
  where: ItineraryActivityWhereInputSchema.optional(),
  orderBy: z.union([ ItineraryActivityOrderByWithAggregationInputSchema.array(),ItineraryActivityOrderByWithAggregationInputSchema ]).optional(),
  by: ItineraryActivityScalarFieldEnumSchema.array(),
  having: ItineraryActivityScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ItineraryActivityFindUniqueArgsSchema: z.ZodType<Prisma.ItineraryActivityFindUniqueArgs> = z.object({
  select: ItineraryActivitySelectSchema.optional(),
  include: ItineraryActivityIncludeSchema.optional(),
  where: ItineraryActivityWhereUniqueInputSchema,
}).strict() ;

export const ItineraryActivityFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ItineraryActivityFindUniqueOrThrowArgs> = z.object({
  select: ItineraryActivitySelectSchema.optional(),
  include: ItineraryActivityIncludeSchema.optional(),
  where: ItineraryActivityWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TripCreateArgsSchema: z.ZodType<Prisma.TripCreateArgs> = z.object({
  select: TripSelectSchema.optional(),
  include: TripIncludeSchema.optional(),
  data: z.union([ TripCreateInputSchema,TripUncheckedCreateInputSchema ]),
}).strict() ;

export const TripUpsertArgsSchema: z.ZodType<Prisma.TripUpsertArgs> = z.object({
  select: TripSelectSchema.optional(),
  include: TripIncludeSchema.optional(),
  where: TripWhereUniqueInputSchema,
  create: z.union([ TripCreateInputSchema,TripUncheckedCreateInputSchema ]),
  update: z.union([ TripUpdateInputSchema,TripUncheckedUpdateInputSchema ]),
}).strict() ;

export const TripCreateManyArgsSchema: z.ZodType<Prisma.TripCreateManyArgs> = z.object({
  data: z.union([ TripCreateManyInputSchema,TripCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TripCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TripCreateManyAndReturnArgs> = z.object({
  data: z.union([ TripCreateManyInputSchema,TripCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TripDeleteArgsSchema: z.ZodType<Prisma.TripDeleteArgs> = z.object({
  select: TripSelectSchema.optional(),
  include: TripIncludeSchema.optional(),
  where: TripWhereUniqueInputSchema,
}).strict() ;

export const TripUpdateArgsSchema: z.ZodType<Prisma.TripUpdateArgs> = z.object({
  select: TripSelectSchema.optional(),
  include: TripIncludeSchema.optional(),
  data: z.union([ TripUpdateInputSchema,TripUncheckedUpdateInputSchema ]),
  where: TripWhereUniqueInputSchema,
}).strict() ;

export const TripUpdateManyArgsSchema: z.ZodType<Prisma.TripUpdateManyArgs> = z.object({
  data: z.union([ TripUpdateManyMutationInputSchema,TripUncheckedUpdateManyInputSchema ]),
  where: TripWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TripUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.TripUpdateManyAndReturnArgs> = z.object({
  data: z.union([ TripUpdateManyMutationInputSchema,TripUncheckedUpdateManyInputSchema ]),
  where: TripWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TripDeleteManyArgsSchema: z.ZodType<Prisma.TripDeleteManyArgs> = z.object({
  where: TripWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TripImageCreateArgsSchema: z.ZodType<Prisma.TripImageCreateArgs> = z.object({
  select: TripImageSelectSchema.optional(),
  include: TripImageIncludeSchema.optional(),
  data: z.union([ TripImageCreateInputSchema,TripImageUncheckedCreateInputSchema ]),
}).strict() ;

export const TripImageUpsertArgsSchema: z.ZodType<Prisma.TripImageUpsertArgs> = z.object({
  select: TripImageSelectSchema.optional(),
  include: TripImageIncludeSchema.optional(),
  where: TripImageWhereUniqueInputSchema,
  create: z.union([ TripImageCreateInputSchema,TripImageUncheckedCreateInputSchema ]),
  update: z.union([ TripImageUpdateInputSchema,TripImageUncheckedUpdateInputSchema ]),
}).strict() ;

export const TripImageCreateManyArgsSchema: z.ZodType<Prisma.TripImageCreateManyArgs> = z.object({
  data: z.union([ TripImageCreateManyInputSchema,TripImageCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TripImageCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TripImageCreateManyAndReturnArgs> = z.object({
  data: z.union([ TripImageCreateManyInputSchema,TripImageCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TripImageDeleteArgsSchema: z.ZodType<Prisma.TripImageDeleteArgs> = z.object({
  select: TripImageSelectSchema.optional(),
  include: TripImageIncludeSchema.optional(),
  where: TripImageWhereUniqueInputSchema,
}).strict() ;

export const TripImageUpdateArgsSchema: z.ZodType<Prisma.TripImageUpdateArgs> = z.object({
  select: TripImageSelectSchema.optional(),
  include: TripImageIncludeSchema.optional(),
  data: z.union([ TripImageUpdateInputSchema,TripImageUncheckedUpdateInputSchema ]),
  where: TripImageWhereUniqueInputSchema,
}).strict() ;

export const TripImageUpdateManyArgsSchema: z.ZodType<Prisma.TripImageUpdateManyArgs> = z.object({
  data: z.union([ TripImageUpdateManyMutationInputSchema,TripImageUncheckedUpdateManyInputSchema ]),
  where: TripImageWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TripImageUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.TripImageUpdateManyAndReturnArgs> = z.object({
  data: z.union([ TripImageUpdateManyMutationInputSchema,TripImageUncheckedUpdateManyInputSchema ]),
  where: TripImageWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TripImageDeleteManyArgsSchema: z.ZodType<Prisma.TripImageDeleteManyArgs> = z.object({
  where: TripImageWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const HotelCreateArgsSchema: z.ZodType<Prisma.HotelCreateArgs> = z.object({
  select: HotelSelectSchema.optional(),
  include: HotelIncludeSchema.optional(),
  data: z.union([ HotelCreateInputSchema,HotelUncheckedCreateInputSchema ]),
}).strict() ;

export const HotelUpsertArgsSchema: z.ZodType<Prisma.HotelUpsertArgs> = z.object({
  select: HotelSelectSchema.optional(),
  include: HotelIncludeSchema.optional(),
  where: HotelWhereUniqueInputSchema,
  create: z.union([ HotelCreateInputSchema,HotelUncheckedCreateInputSchema ]),
  update: z.union([ HotelUpdateInputSchema,HotelUncheckedUpdateInputSchema ]),
}).strict() ;

export const HotelCreateManyArgsSchema: z.ZodType<Prisma.HotelCreateManyArgs> = z.object({
  data: z.union([ HotelCreateManyInputSchema,HotelCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const HotelCreateManyAndReturnArgsSchema: z.ZodType<Prisma.HotelCreateManyAndReturnArgs> = z.object({
  data: z.union([ HotelCreateManyInputSchema,HotelCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const HotelDeleteArgsSchema: z.ZodType<Prisma.HotelDeleteArgs> = z.object({
  select: HotelSelectSchema.optional(),
  include: HotelIncludeSchema.optional(),
  where: HotelWhereUniqueInputSchema,
}).strict() ;

export const HotelUpdateArgsSchema: z.ZodType<Prisma.HotelUpdateArgs> = z.object({
  select: HotelSelectSchema.optional(),
  include: HotelIncludeSchema.optional(),
  data: z.union([ HotelUpdateInputSchema,HotelUncheckedUpdateInputSchema ]),
  where: HotelWhereUniqueInputSchema,
}).strict() ;

export const HotelUpdateManyArgsSchema: z.ZodType<Prisma.HotelUpdateManyArgs> = z.object({
  data: z.union([ HotelUpdateManyMutationInputSchema,HotelUncheckedUpdateManyInputSchema ]),
  where: HotelWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const HotelUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.HotelUpdateManyAndReturnArgs> = z.object({
  data: z.union([ HotelUpdateManyMutationInputSchema,HotelUncheckedUpdateManyInputSchema ]),
  where: HotelWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const HotelDeleteManyArgsSchema: z.ZodType<Prisma.HotelDeleteManyArgs> = z.object({
  where: HotelWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ItineraryDayCreateArgsSchema: z.ZodType<Prisma.ItineraryDayCreateArgs> = z.object({
  select: ItineraryDaySelectSchema.optional(),
  include: ItineraryDayIncludeSchema.optional(),
  data: z.union([ ItineraryDayCreateInputSchema,ItineraryDayUncheckedCreateInputSchema ]),
}).strict() ;

export const ItineraryDayUpsertArgsSchema: z.ZodType<Prisma.ItineraryDayUpsertArgs> = z.object({
  select: ItineraryDaySelectSchema.optional(),
  include: ItineraryDayIncludeSchema.optional(),
  where: ItineraryDayWhereUniqueInputSchema,
  create: z.union([ ItineraryDayCreateInputSchema,ItineraryDayUncheckedCreateInputSchema ]),
  update: z.union([ ItineraryDayUpdateInputSchema,ItineraryDayUncheckedUpdateInputSchema ]),
}).strict() ;

export const ItineraryDayCreateManyArgsSchema: z.ZodType<Prisma.ItineraryDayCreateManyArgs> = z.object({
  data: z.union([ ItineraryDayCreateManyInputSchema,ItineraryDayCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ItineraryDayCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ItineraryDayCreateManyAndReturnArgs> = z.object({
  data: z.union([ ItineraryDayCreateManyInputSchema,ItineraryDayCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ItineraryDayDeleteArgsSchema: z.ZodType<Prisma.ItineraryDayDeleteArgs> = z.object({
  select: ItineraryDaySelectSchema.optional(),
  include: ItineraryDayIncludeSchema.optional(),
  where: ItineraryDayWhereUniqueInputSchema,
}).strict() ;

export const ItineraryDayUpdateArgsSchema: z.ZodType<Prisma.ItineraryDayUpdateArgs> = z.object({
  select: ItineraryDaySelectSchema.optional(),
  include: ItineraryDayIncludeSchema.optional(),
  data: z.union([ ItineraryDayUpdateInputSchema,ItineraryDayUncheckedUpdateInputSchema ]),
  where: ItineraryDayWhereUniqueInputSchema,
}).strict() ;

export const ItineraryDayUpdateManyArgsSchema: z.ZodType<Prisma.ItineraryDayUpdateManyArgs> = z.object({
  data: z.union([ ItineraryDayUpdateManyMutationInputSchema,ItineraryDayUncheckedUpdateManyInputSchema ]),
  where: ItineraryDayWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ItineraryDayUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ItineraryDayUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ItineraryDayUpdateManyMutationInputSchema,ItineraryDayUncheckedUpdateManyInputSchema ]),
  where: ItineraryDayWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ItineraryDayDeleteManyArgsSchema: z.ZodType<Prisma.ItineraryDayDeleteManyArgs> = z.object({
  where: ItineraryDayWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ItineraryActivityCreateArgsSchema: z.ZodType<Prisma.ItineraryActivityCreateArgs> = z.object({
  select: ItineraryActivitySelectSchema.optional(),
  include: ItineraryActivityIncludeSchema.optional(),
  data: z.union([ ItineraryActivityCreateInputSchema,ItineraryActivityUncheckedCreateInputSchema ]),
}).strict() ;

export const ItineraryActivityUpsertArgsSchema: z.ZodType<Prisma.ItineraryActivityUpsertArgs> = z.object({
  select: ItineraryActivitySelectSchema.optional(),
  include: ItineraryActivityIncludeSchema.optional(),
  where: ItineraryActivityWhereUniqueInputSchema,
  create: z.union([ ItineraryActivityCreateInputSchema,ItineraryActivityUncheckedCreateInputSchema ]),
  update: z.union([ ItineraryActivityUpdateInputSchema,ItineraryActivityUncheckedUpdateInputSchema ]),
}).strict() ;

export const ItineraryActivityCreateManyArgsSchema: z.ZodType<Prisma.ItineraryActivityCreateManyArgs> = z.object({
  data: z.union([ ItineraryActivityCreateManyInputSchema,ItineraryActivityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ItineraryActivityCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ItineraryActivityCreateManyAndReturnArgs> = z.object({
  data: z.union([ ItineraryActivityCreateManyInputSchema,ItineraryActivityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ItineraryActivityDeleteArgsSchema: z.ZodType<Prisma.ItineraryActivityDeleteArgs> = z.object({
  select: ItineraryActivitySelectSchema.optional(),
  include: ItineraryActivityIncludeSchema.optional(),
  where: ItineraryActivityWhereUniqueInputSchema,
}).strict() ;

export const ItineraryActivityUpdateArgsSchema: z.ZodType<Prisma.ItineraryActivityUpdateArgs> = z.object({
  select: ItineraryActivitySelectSchema.optional(),
  include: ItineraryActivityIncludeSchema.optional(),
  data: z.union([ ItineraryActivityUpdateInputSchema,ItineraryActivityUncheckedUpdateInputSchema ]),
  where: ItineraryActivityWhereUniqueInputSchema,
}).strict() ;

export const ItineraryActivityUpdateManyArgsSchema: z.ZodType<Prisma.ItineraryActivityUpdateManyArgs> = z.object({
  data: z.union([ ItineraryActivityUpdateManyMutationInputSchema,ItineraryActivityUncheckedUpdateManyInputSchema ]),
  where: ItineraryActivityWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ItineraryActivityUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ItineraryActivityUpdateManyAndReturnArgs> = z.object({
  data: z.union([ ItineraryActivityUpdateManyMutationInputSchema,ItineraryActivityUncheckedUpdateManyInputSchema ]),
  where: ItineraryActivityWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const ItineraryActivityDeleteManyArgsSchema: z.ZodType<Prisma.ItineraryActivityDeleteManyArgs> = z.object({
  where: ItineraryActivityWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;