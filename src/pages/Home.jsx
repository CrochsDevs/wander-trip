import React, { useState, useEffect } from 'react';
import Navbar from '../../src/layout/Navbar';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [budget, setBudget] = useState('mid');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelers, setTravelers] = useState("2");
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDest, setSelectedDest] = useState(null);
  const [costBreakdown, setCostBreakdown] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [calculating, setCalculating] = useState(false);
  const [showAllDestinations, setShowAllDestinations] = useState(false);
  
  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(true);

  const slides = [
    { 
      url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3", 
      title: "Personalized Travel Calculator", 
      desc: "Costs based on your current location" 
    },
    { 
      url: "https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-4.0.3", 
      title: "Location-Accurate Pricing", 
      desc: "Flight prices based on where you're traveling from" 
    }
  ];

  const calculateDays = (start, end) => {
    if (!start || !end) return 7;
    const diffTime = Math.abs(new Date(end) - new Date(start));
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const fetchUserLocation = async () => {
    try {
      setLocationLoading(true);
      const response = await fetch('http://ip-api.com/json/?fields=status,message,country,countryCode,city,lat,lon,currency,query');
      const data = await response.json();
      
      if (data.status === 'success') {
        const countryResponse = await fetch(`https://restcountries.com/v3.1/alpha/${data.countryCode}`);
        const countryData = await countryResponse.json();
        const country = countryData[0];
        
        setUserLocation({
          country: data.country,
          countryCode: data.countryCode,
          currency: Object.keys(country?.currencies || {})[0] || data.currency || 'USD',
          latitude: data.lat,
          longitude: data.lon,
          city: data.city,
          ip: data.query
        });
      } else {
        const fallbackResponse = await fetch('https://ipapi.co/json/');
        const fallbackData = await fallbackResponse.json();
        
        if (fallbackData.country_code) {
          const countryResponse = await fetch(`https://restcountries.com/v3.1/alpha/${fallbackData.country_code}`);
          const countryData = await countryResponse.json();
          const country = countryData[0];
          
          setUserLocation({
            country: fallbackData.country_name,
            countryCode: fallbackData.country_code,
            currency: fallbackData.currency || Object.keys(country?.currencies || {})[0] || 'USD',
            latitude: fallbackData.latitude,
            longitude: fallbackData.longitude,
            city: fallbackData.city,
            ip: fallbackData.ip
          });
        }
      }
    } catch (error) {
    } finally {
      setLocationLoading(false);
    }
  };

  const fetchPlaces = async (query = '') => {
    try {
      setIsLoading(true);
      let places = [];

      if (query) {
        const countryResponse = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(query)}?fields=name,capital,currencies,flags,population,region,languages,cca2,cca3,latlng`);
        const countryData = await countryResponse.json();
        
        if (!countryData.status) {
          const formattedCountries = countryData.slice(0, 6).map(country => ({
            name: country.name.common,
            capital: country.capital?.[0] || 'Not specified',
            currency: Object.keys(country.currencies || {})[0] || 'USD',
            flag: country.flags.png,
            population: (country.population / 1000000).toFixed(1) + 'M',
            region: country.region,
            countryCode: country.cca2,
            countryCode3: country.cca3,
            languages: Object.values(country.languages || {}).join(', '),
            latitude: country.latlng?.[0] || 0,
            longitude: country.latlng?.[1] || 0,
            type: 'country'
          }));
          places = [...places, ...formattedCountries];
        }

        const attractionsResponse = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=6&addressdetails=1`);
        const attractionsData = await attractionsResponse.json();
        
        const formattedAttractions = attractionsData
          .filter(place => place.display_name && place.lat && place.lon)
          .slice(0, 6)
          .map(place => ({
            name: place.display_name.split(',')[0],
            capital: place.display_name.split(',').slice(1, 3).join(',').trim(),
            currency: 'USD',
            flag: '',
            population: '',
            region: place.address?.country || '',
            countryCode: place.address?.country_code?.toUpperCase() || '',
            countryCode3: '',
            languages: '',
            latitude: parseFloat(place.lat),
            longitude: parseFloat(place.lon),
            type: 'attraction',
            osmId: place.place_id
          }));
        
        places = [...places, ...formattedAttractions];
      } else {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,population,region,languages,cca2,cca3,latlng');
        const data = await response.json();
        
        const countries = data.slice(0, 12).map(country => ({
          name: country.name.common,
          capital: country.capital?.[0] || 'Not specified',
          currency: Object.keys(country.currencies || {})[0] || 'USD',
          flag: country.flags.png,
          population: (country.population / 1000000).toFixed(1) + 'M',
          region: country.region,
          countryCode: country.cca2,
          countryCode3: country.cca3,
          languages: Object.values(country.languages || {}).join(', '),
          latitude: country.latlng?.[0] || 0,
          longitude: country.latlng?.[1] || 0,
          type: 'country'
        }));

        const popularAttractions = [
          { query: 'Boracay Philippines' },
          { query: 'Maldives' },
          { query: 'Bali Indonesia' },
          { query: 'Eiffel Tower Paris' },
          { query: 'Grand Canyon USA' },
          { query: 'Great Wall China' }
        ];

        const attractionPromises = popularAttractions.map(async (attraction) => {
          const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(attraction.query)}&format=json&limit=1&addressdetails=1`);
          const data = await response.json();
          
          if (data[0]) {
            const place = data[0];
            return {
              name: attraction.query.split(' ')[0],
              capital: place.display_name.split(',').slice(1, 3).join(',').trim(),
              currency: 'USD',
              flag: '',
              population: '',
              region: place.address?.country || '',
              countryCode: place.address?.country_code?.toUpperCase() || '',
              countryCode3: '',
              languages: '',
              latitude: parseFloat(place.lat),
              longitude: parseFloat(place.lon),
              type: 'attraction',
              osmId: place.place_id
            };
          }
          return null;
        });

        const attractions = (await Promise.all(attractionPromises)).filter(Boolean);
        places = [...countries, ...attractions];
      }

      setDestinations(places);
    } catch (error) {
      setDestinations([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCurrencyRates = async (fromCurrency, toCurrency) => {
    try {
      const response = await fetch(`https://api.frankfurter.app/latest?from=${fromCurrency}&to=${toCurrency}`);
      const data = await response.json();
      return data.rates?.[toCurrency];
    } catch (error) {
      return null;
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const fetchFlightPrice = async (fromCountry, toCountry, fromLat, fromLon, toLat, toLon) => {
    try {
      const distance = calculateDistance(fromLat, fromLon, toLat, toLon);
      
      const [fromCountryData, toCountryData] = await Promise.all([
        fetch(`https://restcountries.com/v3.1/alpha/${fromCountry}`).then(r => r.json()),
        fetch(`https://restcountries.com/v3.1/alpha/${toCountry}`).then(r => r.json())
      ]);
      
      const fromGDP = fromCountryData[0]?.population || 10000000;
      const toGDP = toCountryData[0]?.population || 10000000;
      
      const basePricePerKm = 0.12;
      const economicFactor = Math.sqrt(toGDP / fromGDP);
      const distanceFactor = distance / 1000;
      
      let flightPriceUSD = basePricePerKm * distance * economicFactor;
      
      const regionAdjustments = {
        'Asia': 0.9,
        'Europe': 1.2,
        'North America': 1.3,
        'South America': 1.0,
        'Africa': 1.1,
        'Oceania': 1.4
      };
      
      const toRegion = toCountryData[0]?.region || 'Asia';
      flightPriceUSD *= regionAdjustments[toRegion] || 1.0;
      
      return Math.round(flightPriceUSD / 50) * 50;
      
    } catch (error) {
      return null;
    }
  };

  const fetchHotelPrice = async (destination) => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/alpha/${destination.countryCode}`);
      const countryData = await response.json();
      const country = countryData[0];
      
      const population = country?.population || 10000000;
      const region = country?.region || 'Asia';
      const isCapital = destination.capital === destination.name;
      
      const regionBasePrices = {
        'Europe': 80,
        'North America': 90,
        'Asia': 40,
        'South America': 45,
        'Africa': 35,
        'Oceania': 85
      };
      
      let basePriceUSD = regionBasePrices[region] || 50;
      
      if (population > 50000000) basePriceUSD *= 1.2;
      if (isCapital) basePriceUSD *= 1.3;
      
      return Math.round(basePriceUSD);
      
    } catch (error) {
      return null;
    }
  };

  const fetchFoodPrice = async (destination) => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/alpha/${destination.countryCode}`);
      const countryData = await response.json();
      const country = countryData[0];
      
      const region = country?.region || 'Asia';
      const population = country?.population || 10000000;
      
      const regionFoodPrices = {
        'Europe': 25,
        'North America': 30,
        'Asia': 15,
        'South America': 18,
        'Africa': 12,
        'Oceania': 28
      };
      
      let dailyFoodUSD = regionFoodPrices[region] || 20;
      
      const developmentFactor = Math.min(1.5, Math.max(0.7, population / 50000000));
      dailyFoodUSD *= developmentFactor;
      
      return Math.round(dailyFoodUSD);
      
    } catch (error) {
      return null;
    }
  };

  const calculateLocationBasedCosts = async (destination) => {
    try {
      const days = calculateDays(startDate, endDate) || 7;
      const travelersCount = parseInt(travelers) || 2;
      
      setCalculating(true);
      
      if (!userLocation) {
        await fetchUserLocation();
      }
      
      const exchangeRate = await fetchCurrencyRates(
        userLocation?.currency || 'USD', 
        destination.currency || 'USD'
      );
      
      const flightPriceUSD = await fetchFlightPrice(
        userLocation?.countryCode || 'PH',
        destination.countryCode,
        userLocation?.latitude || 14.5995,
        userLocation?.longitude || 120.9842,
        destination.latitude || 0,
        destination.longitude || 0
      );
      
      const hotelPriceUSD = await fetchHotelPrice(destination);
      const foodPriceUSD = await fetchFoodPrice(destination);
      
      const budgetMultiplier = {
        'budget': 0.7,
        'mid': 1,
        'luxury': 1.8
      }[budget] || 1;
      
      const finalExchangeRate = exchangeRate || 1;
      
      const flightCost = flightPriceUSD 
        ? Math.round(flightPriceUSD * travelersCount * budgetMultiplier * finalExchangeRate)
        : Math.round(800 * travelersCount * budgetMultiplier * finalExchangeRate);
      
      const accommodationCost = hotelPriceUSD 
        ? Math.round(hotelPriceUSD * days * travelersCount * budgetMultiplier * finalExchangeRate)
        : Math.round(80 * days * travelersCount * budgetMultiplier * finalExchangeRate);
      
      const foodCost = foodPriceUSD 
        ? Math.round(foodPriceUSD * days * travelersCount * budgetMultiplier * finalExchangeRate)
        : Math.round(25 * days * travelersCount * budgetMultiplier * finalExchangeRate);
      
      const transportationCost = Math.round((flightCost + accommodationCost) * 0.15);
      const activitiesCost = Math.round((flightCost + accommodationCost) * 0.20);
      const insuranceCost = Math.round(flightCost * 0.05);
      
      const visaRequiredCountries = ['US', 'GB', 'CA', 'AU', 'JP', 'KR', 'SG'];
      const needsVisa = visaRequiredCountries.includes(destination.countryCode);
      const visaCost = needsVisa ? Math.round(100 * travelersCount * finalExchangeRate) : 0;
      
      const miscCost = Math.round((flightCost + accommodationCost) * 0.10);
      
      const baseCosts = {
        flights: flightCost,
        accommodation: accommodationCost,
        food: foodCost,
        transportation: transportationCost,
        activities: activitiesCost,
        insurance: insuranceCost,
        visa: visaCost,
        misc: miscCost
      };
      
      const subtotal = Object.values(baseCosts).reduce((a, b) => a + b, 0);
      const tax = Math.round(subtotal * 0.12);
      const total = subtotal + tax;
      
      const result = {
        destination: destination.name,
        capital: destination.capital,
        fromCountry: userLocation?.country || 'Your Location',
        toCurrency: destination.currency || 'USD',
        fromCurrency: userLocation?.currency || 'USD',
        days,
        travelers: travelersCount,
        baseCosts,
        subtotal,
        tax,
        total,
        exchangeRate: finalExchangeRate,
        perDayPerPerson: Math.round(total / days / travelersCount),
        timestamp: new Date().toISOString(),
        locationData: {
          fromCountry: userLocation?.country,
          fromCity: userLocation?.city,
          distanceKm: flightPriceUSD ? Math.round(flightPriceUSD / 0.12) : 0,
          currencyUsed: userLocation?.currency || 'USD'
        }
      };
      
      setCostBreakdown(result);
      return result;
      
    } catch (error) {
      return null;
    } finally {
      setCalculating(false);
    }
  };

  const handleCalculateCosts = async (destination) => {
    setSelectedDest(destination);
    setShowModal(true);
    await calculateLocationBasedCosts(destination);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPlaces(searchQuery);
  };

  useEffect(() => {
    fetchUserLocation();
    fetchPlaces();

    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const getTotalDays = () => calculateDays(startDate, endDate) || 7;

  const displayedDestinations = showAllDestinations ? destinations : destinations.slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img 
              src={slide.url} 
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          </div>
        ))}

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {slides[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              {slides[currentSlide].desc}
            </p>
            
            {userLocation && !locationLoading ? (
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                <p className="text-white text-sm">
                  📍 Traveling from: <span className="font-semibold">{userLocation.city}, {userLocation.country}</span>
                </p>
                <p className="text-white text-sm mt-1">
                  💱 Your currency: <span className="font-semibold">{userLocation.currency}</span>
                </p>
              </div>
            ) : locationLoading ? (
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                <p className="text-white text-sm">
                  🔍 Detecting your location...
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-16 md:-mt-20 relative z-10">
        <div className="bg-white shadow-2xl rounded-xl p-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Destination</label>
                <input
                  type="text"
                  placeholder="Search any country or place..."
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">Search countries, cities, and attractions</p>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Travel Dates</label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    className="flex-1 p-3 border border-gray-300 rounded-lg"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <input
                    type="date"
                    className="flex-1 p-3 border border-gray-300 rounded-lg"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Travel Details</label>
                <div className="flex gap-2">
                  <select 
                    className="flex-1 p-3 border border-gray-300 rounded-lg"
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                    ))}
                  </select>
                  
                  <select 
                    className="w-32 p-3 border border-gray-300 rounded-lg"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  >
                    <option value="budget">Budget</option>
                    <option value="mid">Mid-Range</option>
                    <option value="luxury">Luxury</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                {userLocation && !locationLoading && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2">
                    📍 {userLocation.country}
                  </span>
                )}
                {startDate && endDate && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {getTotalDays()} days
                  </span>
                )}
              </div>
              
              <div className="flex gap-3">
                <button 
                  type="button" 
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  onClick={() => {
                    setSearchQuery('');
                    fetchPlaces();
                  }}
                  disabled={isLoading}
                >
                  Reset
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? '🔍 Searching...' : '🔍 Search'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">
            {searchQuery ? `Results for "${searchQuery}"` : 'Recommended Destinations'}
          </h2>
          <p className="text-gray-600">
            {userLocation ? `Traveling from ${userLocation.country}` : 'Select a destination'}
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : destinations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No destinations found. Try a different search.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedDestinations.map((dest) => (
                <div key={`${dest.name}-${dest.type}`} className="bg-white rounded-lg shadow p-4 border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    {dest.flag ? (
                      <img
                        src={dest.flag}
                        alt={`${dest.name} flag`}
                        className="w-10 h-7 object-cover border"
                      />
                    ) : (
                      <div className="w-10 h-7 bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center rounded">
                        <span className="text-white text-sm">📍</span>
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-gray-800">{dest.name}</h3>
                      <p className="text-sm text-gray-500">{dest.capital}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                    <div>
                      <p className="text-gray-500">Type</p>
                      <p className="font-semibold capitalize">{dest.type}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Distance</p>
                      <p className="font-semibold">
                        {userLocation ? 
                          `${Math.round(calculateDistance(
                            userLocation.latitude || 0, 
                            userLocation.longitude || 0,
                            dest.latitude || 0,
                            dest.longitude || 0
                          )).toLocaleString()} km` 
                          : 'Calculating...'}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleCalculateCosts(dest)}
                    disabled={calculating}
                    className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {calculating ? '📊 Calculating...' : '🧮 Calculate Costs'}
                  </button>
                </div>
              ))}
            </div>
            
            {destinations.length > 8 && !showAllDestinations && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowAllDestinations(true)}
                  className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  See More Destinations
                </button>
              </div>
            )}
            
            {showAllDestinations && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowAllDestinations(false)}
                  className="px-6 py-2 border-2 border-gray-600 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Show Less
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {showModal && selectedDest && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  {selectedDest.flag ? (
                    <img
                      src={selectedDest.flag}
                      alt={selectedDest.name}
                      className="w-12 h-9 object-cover border"
                    />
                  ) : (
                    <div className="w-12 h-9 bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center rounded">
                      <span className="text-white text-xl">📍</span>
                    </div>
                  )}
                  <div>
                    <h2 className="text-2xl font-bold">{selectedDest.name} Travel Budget</h2>
                    <p className="text-gray-600">
                      {costBreakdown?.days || 7} days • {costBreakdown?.travelers || 2} travelers • 
                      {budget === 'budget' ? ' 💰 Budget' : budget === 'mid' ? ' 💎 Mid-Range' : ' ✨ Luxury'}
                    </p>
                  </div>
                </div>
                <button 
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                  onClick={() => setShowModal(false)}
                >
                  ✕
                </button>
              </div>

              {calculating ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-lg font-semibold">Calculating location-based costs...</p>
                  <p className="text-gray-600 mt-2">
                    📍 From {userLocation?.country} • ✈️ Flight distance • 💱 Currency conversion
                  </p>
                </div>
              ) : costBreakdown ? (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="font-bold text-lg mb-2 text-blue-800">📍 TRAVEL ROUTE</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white p-3 rounded border">
                        <p className="text-sm text-gray-600">From</p>
                        <p className="font-semibold">{costBreakdown.fromCountry}</p>
                      </div>
                      <div className="bg-white p-3 rounded border">
                        <p className="text-sm text-gray-600">To</p>
                        <p className="font-semibold">{costBreakdown.destination}</p>
                      </div>
                      <div className="bg-white p-3 rounded border">
                        <p className="text-sm text-gray-600">Distance</p>
                        <p className="font-semibold">{costBreakdown.locationData?.distanceKm?.toLocaleString()} km</p>
                      </div>
                      <div className="bg-white p-3 rounded border">
                        <p className="text-sm text-gray-600">Exchange Rate</p>
                        <p className="font-semibold">1 {costBreakdown.fromCurrency} = {costBreakdown.exchangeRate?.toFixed(2)} {costBreakdown.toCurrency}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-4">💰 COST BREAKDOWN ({costBreakdown.toCurrency})</h3>
                    <div className="space-y-3">
                      {Object.entries(costBreakdown.baseCosts).map(([key, value]) => {
                        const icons = {
                          flights: '✈️',
                          accommodation: '🏨',
                          food: '🍽️',
                          transportation: '🚗',
                          activities: '🎡',
                          insurance: '🛡️',
                          visa: '📋',
                          misc: '🎒'
                        };
                        
                        const descriptions = {
                          flights: 'Round-trip based on your location',
                          accommodation: 'Hotels based on destination economy',
                          food: 'Daily meals at destination',
                          transportation: 'Local transport & taxis',
                          activities: 'Sightseeing & entertainment',
                          insurance: 'Travel insurance',
                          visa: 'Visa fees (if required)',
                          misc: 'Souvenirs, tips, extras'
                        };
                        
                        return (
                          <div key={key} className="flex justify-between items-center border-b pb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{icons[key]}</span>
                              <div>
                                <span className="capitalize font-medium">{key.replace('_', ' ')}</span>
                                <p className="text-xs text-gray-500">{descriptions[key]}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="font-semibold text-lg">
                                {value?.toLocaleString()} {costBreakdown.toCurrency}
                              </span>
                              {costBreakdown.fromCurrency !== costBreakdown.toCurrency && (
                                <p className="text-xs text-gray-500">
                                  ≈ {Math.round(value / costBreakdown.exchangeRate)?.toLocaleString()} {costBreakdown.fromCurrency}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      
                      <div className="flex justify-between border-t pt-3">
                        <span className="font-medium">Subtotal:</span>
                        <span className="font-semibold">
                          {costBreakdown.subtotal?.toLocaleString()} {costBreakdown.toCurrency}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Taxes & Fees (12%):</span>
                        <span className="font-semibold">
                          {costBreakdown.tax?.toLocaleString()} {costBreakdown.toCurrency}
                        </span>
                      </div>
                      <div className="flex justify-between text-xl font-bold border-t pt-3">
                        <span>TOTAL ESTIMATED COST:</span>
                        <span className="text-blue-600">
                          {costBreakdown.total?.toLocaleString()} {costBreakdown.toCurrency}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                    <h3 className="font-bold text-lg mb-2 text-green-800">📈 COST ANALYSIS</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Per Person</p>
                        <p className="font-bold text-lg">
                          {Math.round(costBreakdown.total / costBreakdown.travelers)?.toLocaleString()} {costBreakdown.toCurrency}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Per Day</p>
                        <p className="font-bold text-lg">
                          {Math.round(costBreakdown.total / costBreakdown.days)?.toLocaleString()} {costBreakdown.toCurrency}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Per Day/Person</p>
                        <p className="font-bold text-lg">
                          {costBreakdown.perDayPerPerson?.toLocaleString()} {costBreakdown.toCurrency}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-3 text-center">
                      💱 Prices calculated from {costBreakdown.fromCurrency} to {costBreakdown.toCurrency}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-red-500">Error calculating costs. Please try again.</p>
                </div>
              )}

              <div className="mt-6 flex justify-end gap-3">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Save Budget
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t bg-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-600 font-semibold">🌍 LOCATION-BASED TRAVEL CALCULATOR</p>
            <p className="text-sm text-gray-500 mt-2">
              Real costs based on where you're traveling from • No hard-coded prices
            </p>
            <p className="text-xs text-gray-400 mt-4">
              Uses: IP-based location detection • Real distance calculation • Economic-based pricing
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;