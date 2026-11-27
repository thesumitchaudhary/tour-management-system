export const getHotelCacheKey = (destination: string): string => {
  const normalizedDestination = destination
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

  return `hotels:city:${normalizedDestination}`;
};
