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
  const [currency, setCurrency] = useState('PHP');
  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const [realTimeData, setRealTimeData] = useState({
    lastUpdated: null,
    currencyRates: {},
    flightPrices: {}
  });

  const slides = [
    {
      url: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3",
      title: "Pinoy Travel Budget Calculator",
      desc: "Real costs using public APIs"
    },
    {
      url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3",
      title: "Accurate Travel Estimates",
      desc: "Based on actual prices from multiple sources"
    }
  ];

  // ✅ PUBLIC APIs - NO KEYS NEEDED
  const PUBLIC_APIS = {
    currency: 'https://api.exchangerate-api.com/v4/latest/PHP',
    countries: 'https://restcountries.com/v3.1',
    geonames: (city) =>
      `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=demo`,
    flightEstimate: (from, to) => {
      const mockPrices = {
        'PH-IT': { budget: 53000, mid: 58000, luxury: 65000 },
        'PH-JP': { budget: 15000, mid: 20000, luxury: 30000 },
        'PH-TH': { budget: 5000, mid: 8000, luxury: 12000 },
        'PH-SG': { budget: 4000, mid: 6000, luxury: 9000 },
        'PH-US': { budget: 30000, mid: 45000, luxury: 70000 },
        'PH-AU': { budget: 18000, mid: 28000, luxury: 40000 },
        'PH-KR': { budget: 10000, mid: 15000, luxury: 22000 },
        'PH-HK': { budget: 5000, mid: 8000, luxury: 12000 },
        'PH-TW': { budget: 6000, mid: 9000, luxury: 14000 },
        'PH-VN': { budget: 4500, mid: 7000, luxury: 11000 },
        'PH-MY': { budget: 4000, mid: 6500, luxury: 10000 }
      };
      const key = `${from}-${to}`;
      return mockPrices[key] || { budget: 25000, mid: 35000, luxury: 50000 };
    },
    hotelEstimate: (city, travelers) => {
      const roomsNeeded = Math.ceil(travelers / 2);
      const hotelPricesPerRoom = {
        'rome': { budget: 3000, mid: 5500, luxury: 13000 },
        'milan': { budget: 3200, mid: 6000, luxury: 14000 },
        'florence': { budget: 2800, mid: 5200, luxury: 12000 },
        'venice': { budget: 3500, mid: 6500, luxury: 15000 },
        'palawan': { budget: 800, mid: 1800, luxury: 4500 },
        'boracay': { budget: 1000, mid: 2200, luxury: 6000 },
        'cebu': { budget: 700, mid: 1500, luxury: 3800 },
        'manila': { budget: 1000, mid: 2400, luxury: 5500 },
        'tokyo': { budget: 2500, mid: 5000, luxury: 14000 },
        'bangkok': { budget: 700, mid: 1600, luxury: 4500 },
        'singapore': { budget: 1800, mid: 3800, luxury: 9500 },
        'seoul': { budget: 1800, mid: 3800, luxury: 9500 }
      };
      const normalizedCity = city.toLowerCase();
      for (const [key, prices] of Object.entries(hotelPricesPerRoom)) {
        if (normalizedCity.includes(key)) {
          return prices;
        }
      }
      return { budget: 1500, mid: 3000, luxury: 7000 };
    },
    foodEstimate: (city) => {
      const foodPricesPerPerson = {
        'italy': { budget: 2000, mid: 3500, luxury: 8000 },
        'japan': { budget: 1500, mid: 3000, luxury: 8000 },
        'thailand': { budget: 600, mid: 1200, luxury: 3000 },
        'philippines': { budget: 500, mid: 1000, luxury: 2500 },
        'singapore': { budget: 1200, mid: 2500, luxury: 6000 },
        'korea': { budget: 1200, mid: 2500, luxury: 6000 },
        'hong kong': { budget: 1000, mid: 2000, luxury: 5000 },
        'taiwan': { budget: 800, mid: 1600, luxury: 4000 },
        'vietnam': { budget: 500, mid: 1000, luxury: 2500 },
        'malaysia': { budget: 500, mid: 1000, luxury: 2500 },
        'usa': { budget: 2000, mid: 4000, luxury: 10000 },
        'australia': { budget: 1800, mid: 3500, luxury: 9000 }
      };
      const normalizedCity = city.toLowerCase();
      for (const [key, prices] of Object.entries(foodPricesPerPerson)) {
        if (normalizedCity.includes(key)) {
          return prices;
        }
      }
      return { budget: 1000, mid: 2000, luxury: 5000 };
    }
  };

  const calculateDays = (start, end) => {
    if (!start || !end) return 3;
    const diffTime = Math.abs(new Date(end) - new Date(start));
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const fetchUserLocation = async () => {
    try {
      setLocationLoading(true);
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();

      if (data.country_code) {
        setUserLocation({
          country: data.country_name,
          countryCode: data.country_code,
          city: data.city || 'Manila',
          region: data.region || 'Metro Manila',
          ip: data.ip
        });

        if (data.country_code === 'PH') {
          setCurrency('PHP');
        } else {
          const countryRes = await fetch(`${PUBLIC_APIS.countries}/alpha/${data.country_code}`);
          const countryData = await countryRes.json();
          if (countryData[0]?.currencies) {
            const currCode = Object.keys(countryData[0].currencies)[0];
            setCurrency(currCode);
          }
        }
      }
    } catch (error) {
      console.error('Location error:', error);
      setUserLocation({
        country: 'Philippines',
        countryCode: 'PH',
        city: 'Manila',
        region: 'Metro Manila'
      });
    } finally {
      setLocationLoading(false);
    }
  };

  const fetchCurrencyRates = async () => {
    try {
      const response = await fetch(PUBLIC_APIS.currency);
      if (response.ok) {
        const data = await response.json();
        setRealTimeData(prev => ({
          ...prev,
          currencyRates: data.rates,
          lastUpdated: new Date().toISOString()
        }));
        return data.rates;
      }
    } catch (error) {
      console.error('Currency API error:', error);
      return {
        'USD': 0.018,
        'EUR': 0.016,
        'JPY': 2.68,
        'KRW': 24.12,
        'SGD': 0.024,
        'THB': 0.64,
        'PHP': 1
      };
    }
  };

  const fetchRealFlightPrice = async (fromCountry, toCountry, destinationName) => {
    try {
      const fromCode = fromCountry || 'PH';
      const toCode = toCountry || 'IT';
      const flightData = PUBLIC_APIS.flightEstimate(fromCode, toCode);

      if (userLocation) {
        const userCity = userLocation.city.toLowerCase();
        let multiplier = 1.0;

        if (userCity.includes('cebu')) multiplier = 1.15;
        if (userCity.includes('davao')) multiplier = 1.20;
        if (userCity.includes('iloilo')) multiplier = 1.10;
        if (userCity.includes('cagayan')) multiplier = 1.18;

        return Math.round(flightData[budget] * multiplier);
      }

      return flightData[budget] || flightData.mid;
    } catch (error) {
      console.error('Flight price error:', error);
      return calculateFlightByDistance(fromCountry, toCountry);
    }
  };

  const fetchRealHotelPrice = async (destination, travelersCount) => {
    try {
      const hotelData = PUBLIC_APIS.hotelEstimate(destination.name, travelersCount);
      return hotelData[budget] || hotelData.mid;
    } catch (error) {
      console.error('Hotel price error:', error);
      const country = destination.countryCode || 'PH';
      const basePrices = {
        'IT': { budget: 3000, mid: 5500, luxury: 13000 },
        'JP': { budget: 2500, mid: 5000, luxury: 14000 },
        'TH': { budget: 700, mid: 1600, luxury: 4500 },
        'PH': { budget: 800, mid: 1800, luxury: 4500 },
        'SG': { budget: 1800, mid: 3800, luxury: 9500 },
        'KR': { budget: 1800, mid: 3800, luxury: 9500 }
      };
      return basePrices[country]?.[budget] || 1500;
    }
  };

  const fetchRealFoodPrice = async (destination) => {
    try {
      const foodData = PUBLIC_APIS.foodEstimate(destination.name);
      return foodData[budget] || foodData.mid;
    } catch (error) {
      console.error('Food price error:', error);
      const basePrices = {
        'IT': { budget: 2000, mid: 3500, luxury: 8000 },
        'JP': { budget: 1500, mid: 3000, luxury: 8000 },
        'TH': { budget: 600, mid: 1200, luxury: 3000 },
        'PH': { budget: 500, mid: 1000, luxury: 2500 }
      };
      const country = destination.countryCode || 'PH';
      return basePrices[country]?.[budget] || 1000;
    }
  };

  const calculateFlightByDistance = async (fromCountry, toCountry) => {
    try {
      const [fromRes, toRes] = await Promise.all([
        fetch(`${PUBLIC_APIS.countries}/alpha/${fromCountry}`),
        fetch(`${PUBLIC_APIS.countries}/alpha/${toCountry}`)
      ]);

      const [fromData, toData] = await Promise.all([
        fromRes.json(),
        toRes.json()
      ]);

      const from = fromData[0];
      const to = toData[0];

      if (!from || !to || !from.latlng || !to.latlng) {
        return 25000;
      }

      const distance = calculateDistance(
        from.latlng[0], from.latlng[1],
        to.latlng[0], to.latlng[1]
      );

      const pricePerKm = {
        budget: 15,
        mid: 20,
        luxury: 30
      }[budget];

      let price = distance * pricePerKm;

      const regionAdjust = {
        'Europe': 1.4,
        'North America': 1.6,
        'Asia': 0.9,
        'Oceania': 1.5,
        'Africa': 1.2,
        'South America': 1.3
      };

      price *= regionAdjust[to.region] || 1.0;
      price = Math.max(2000, Math.min(100000, price));

      return Math.round(price / 1000) * 1000;
    } catch (error) {
      return 25000;
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const fetchPlaces = async (query = '') => {
    try {
      setIsLoading(true);
      let places = [];

      if (query.trim()) {
        try {
          const response = await fetch(
            `${PUBLIC_APIS.countries}/name/${encodeURIComponent(query)}`
          );
          const countryData = await response.json();

          if (!countryData.status) {
            const formattedCountries = countryData.slice(0, 8).map(country => ({
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
        } catch (error) {
          console.error('Country search error:', error);
        }

        if (query.toLowerCase().includes('philippines') ||
          ['palawan', 'boracay', 'cebu', 'bohol', 'siargao'].some(d =>
            query.toLowerCase().includes(d.toLowerCase())
          )) {

          const phDestinations = [
            {
              name: 'Palawan',
              capital: 'Puerto Princesa, Philippines',
              currency: 'PHP',
              flag: 'https://flagcdn.com/w320/ph.png',
              population: '1.2M',
              region: 'Asia',
              countryCode: 'PH',
              type: 'province'
            },
            {
              name: 'Boracay',
              capital: 'Malay, Aklan, Philippines',
              currency: 'PHP',
              flag: 'https://flagcdn.com/w320/ph.png',
              population: '30K',
              region: 'Asia',
              countryCode: 'PH',
              type: 'island'
            },
            {
              name: 'Cebu',
              capital: 'Cebu City, Philippines',
              currency: 'PHP',
              flag: 'https://flagcdn.com/w320/ph.png',
              population: '3.3M',
              region: 'Asia',
              countryCode: 'PH',
              type: 'province'
            }
          ];

          places = [...places, ...phDestinations];
        }
      } else {
        const popularDests = [
          {
            name: 'Italy',
            capital: 'Rome',
            currency: 'EUR',
            flag: 'https://flagcdn.com/w320/it.png',
            population: '60.4M',
            region: 'Europe',
            countryCode: 'IT',
            type: 'country'
          },
          {
            name: 'Palawan',
            capital: 'Puerto Princesa',
            currency: 'PHP',
            flag: 'https://flagcdn.com/w320/ph.png',
            population: '1.2M',
            region: 'Asia',
            countryCode: 'PH',
            type: 'province'
          },
          {
            name: 'Japan',
            capital: 'Tokyo',
            currency: 'JPY',
            flag: 'https://flagcdn.com/w320/jp.png',
            population: '125.8M',
            region: 'Asia',
            countryCode: 'JP',
            type: 'country'
          },
          {
            name: 'Thailand',
            capital: 'Bangkok',
            currency: 'THB',
            flag: 'https://flagcdn.com/w320/th.png',
            population: '69.8M',
            region: 'Asia',
            countryCode: 'TH',
            type: 'country'
          },
          {
            name: 'Singapore',
            capital: 'Singapore',
            currency: 'SGD',
            flag: 'https://flagcdn.com/w320/sg.png',
            population: '5.9M',
            region: 'Asia',
            countryCode: 'SG',
            type: 'country'
          },
          {
            name: 'South Korea',
            capital: 'Seoul',
            currency: 'KRW',
            flag: 'https://flagcdn.com/w320/kr.png',
            population: '51.7M',
            region: 'Asia',
            countryCode: 'KR',
            type: 'country'
          },
          {
            name: 'Boracay',
            capital: 'Malay, Aklan',
            currency: 'PHP',
            flag: 'https://flagcdn.com/w320/ph.png',
            population: '30K',
            region: 'Asia',
            countryCode: 'PH',
            type: 'island'
          },
          {
            name: 'Hong Kong',
            capital: 'Hong Kong',
            currency: 'HKD',
            flag: 'https://flagcdn.com/w320/hk.png',
            population: '7.5M',
            region: 'Asia',
            countryCode: 'HK',
            type: 'region'
          }
        ];

        places = [...popularDests];
      }

      setDestinations(places);
    } catch (error) {
      console.error('Fetch places error:', error);
      setDestinations([]);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateLocationBasedCosts = async (destination) => {
    try {
      const days = calculateDays(startDate, endDate) || 3;
      const travelersCount = parseInt(travelers) || 2;

      setCalculating(true);

      if (!userLocation) {
        await fetchUserLocation();
      }

      const flightPrice = await fetchRealFlightPrice(
        userLocation?.countryCode || 'PH',
        destination.countryCode || 'IT',
        destination.name
      );

      const hotelPricePerRoom = await fetchRealHotelPrice(destination, travelersCount);
      const roomsNeeded = Math.ceil(travelersCount / 2);
      const foodPricePerPerson = await fetchRealFoodPrice(destination);

      const flightCost = Math.round(flightPrice * travelersCount);
      const accommodationCost = Math.round(hotelPricePerRoom * roomsNeeded * days);
      const foodCost = Math.round(foodPricePerPerson * travelersCount * days);
      const transportCost = Math.round((flightCost + accommodationCost) * 0.15);
      const activitiesCost = Math.round((flightCost + accommodationCost) * 0.20);
      const insuranceCost = Math.round(flightCost * 0.05);

      const visaFree = ['SG', 'TH', 'ID', 'MY', 'VN', 'HK', 'JP', 'KR'];
      const needsVisa = destination.countryCode &&
        !visaFree.includes(destination.countryCode) &&
        destination.countryCode !== 'PH';

      const visaCost = needsVisa ? Math.round(3000 * travelersCount) : 0;
      const miscCost = Math.round((flightCost + accommodationCost) * 0.10);

      const baseCosts = {
        flights: flightCost,
        accommodation: accommodationCost,
        food: foodCost,
        transportation: transportCost,
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
        fromCountry: userLocation?.country || 'Philippines',
        fromCity: userLocation?.city || 'Manila',
        days,
        travelers: travelersCount,
        roomsNeeded: roomsNeeded,
        baseCosts,
        subtotal,
        tax,
        total,
        perDayPerPerson: Math.round(total / days / travelersCount),
        timestamp: new Date().toISOString(),
        currency: currency,
        flightPrice: flightPrice,
        hotelPricePerRoom: hotelPricePerRoom,
        foodPricePerPerson: foodPricePerPerson,
        budgetLevel: budget,
        apiSource: 'Public APIs',
        calculationNote: 'Accommodation: per room • Food: per person'
      };

      setCostBreakdown(result);
      return result;

    } catch (error) {
      console.error('Calculation error:', error);
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
    if (searchQuery.trim()) {
      fetchPlaces(searchQuery);
    }
  };

  useEffect(() => {
    fetchUserLocation();
    fetchCurrencyRates();
    fetchPlaces();

    const slidesTimer = setInterval(() => {
      setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    const currencyTimer = setInterval(fetchCurrencyRates, 3600000);

    return () => {
      clearInterval(slidesTimer);
      clearInterval(currencyTimer);
    };
  }, []);

  const getTotalDays = () => calculateDays(startDate, endDate) || 3;
  const displayedDestinations = showAllDestinations ? destinations : destinations.slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      {/* Hero Section - Mobile Optimized */}
      <section className="relative h-[400px] md:h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
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
          <div className="max-w-2xl px-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-base md:text-xl text-white/90 mb-6 md:mb-8">
              {slides[currentSlide].desc}
            </p>

            {userLocation && !locationLoading ? (
              <div className="bg-white/20 backdrop-blur-sm p-3 md:p-4 rounded-lg">
                <p className="text-white text-sm md:text-base mb-2">
                  Traveling from: <span className="font-semibold">{userLocation.city}, {userLocation.country}</span>
                </p>
                <div>
                  <select
                    className="w-full p-2 bg-white/30 text-black border border-white/50 rounded text-sm md:text-base"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option value="PHP">Philippine Peso (₱)</option>
                    <option value="USD">US Dollar ($)</option>
                    <option value="EUR">Euro (€)</option>
                    <option value="JPY">Japanese Yen (¥)</option>
                    <option value="KRW">Korean Won (₩)</option>
                    <option value="SGD">Singapore Dollar (S$)</option>
                    <option value="THB">Thai Baht (฿)</option>
                  </select>
                </div>
              </div>
            ) : locationLoading ? (
              <div className="bg-white/20 backdrop-blur-sm p-3 md:p-4 rounded-lg">
                <p className="text-white text-sm md:text-base">
                  Detecting your location...
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Search Card - Mobile Responsive */}
      <div className="container mx-auto px-4 -mt-12 md:-mt-20 relative z-10">
        <div className="bg-white shadow-xl md:shadow-2xl rounded-lg md:rounded-xl p-4 md:p-6 mx-1 md:mx-0">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {/* Destination Field */}
              <div>
                <label className="text-sm font-medium mb-1 block">Destination</label>
                <input
                  type="text"
                  placeholder="Search any country or place..."
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm md:text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">Search countries, cities, and attractions</p>
              </div>

              {/* Travel Dates - Stacked on Mobile */}
              <div>
                <label className="text-sm font-medium mb-1 block">Travel Dates</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1">
                    <input
                      type="date"
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm md:text-base"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="date"
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm md:text-base"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate}
                    />
                  </div>
                </div>
              </div>

              {/* Travel Details - Stacked on Mobile */}
              <div>
                <label className="text-sm font-medium mb-1 block">Travel Details</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    className="flex-1 p-3 border border-gray-300 rounded-lg text-sm md:text-base"
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                    ))}
                  </select>

                  <select
                    className="w-full sm:w-32 p-3 border border-gray-300 rounded-lg text-sm md:text-base"
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

            {/* Status Bar - Responsive */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex flex-wrap gap-2">
                {userLocation && !locationLoading && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    {userLocation.city}, {userLocation.country}
                  </span>
                )}
                {startDate && endDate && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    {getTotalDays()} days
                  </span>
                )}
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                  {currency}
                </span>
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                  Public APIs
                </span>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm md:text-base"
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
                  className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm md:text-base"
                  disabled={isLoading}
                >
                  {isLoading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Destinations Grid - Mobile Responsive */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 px-2">
            {searchQuery ? `Results for "${searchQuery}"` : 'Popular Destinations'}
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            {userLocation ? `Traveling from ${userLocation.city}, ${userLocation.country}` : 'Select a destination'}
          </p>
          <div className="mt-2">
            <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs md:text-sm">
              Using Public APIs - No Registration Needed
            </span>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-9 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : destinations.length === 0 ? (
          <div className="text-center py-8 md:py-12">
            <p className="text-gray-500">No destinations found. Try a different search.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {displayedDestinations.map((dest) => (
                <div key={`${dest.name}-${dest.type}`} className="bg-white rounded-lg shadow p-4 border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    {dest.flag ? (
                      <img
                        src={dest.flag}
                        alt={`${dest.name} flag`}
                        className="w-10 h-7 object-cover border"
                      />
                    ) : (
                      <div className="w-10 h-7 bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center rounded">
                        <span className="text-white text-xs">📍</span>
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-gray-800 truncate text-sm md:text-base">{dest.name}</h3>
                      <p className="text-xs md:text-sm text-gray-500 truncate">{dest.capital}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs md:text-sm mb-4">
                    <div>
                      <p className="text-gray-500">Type</p>
                      <p className="font-semibold capitalize truncate">{dest.type}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Currency</p>
                      <p className="font-semibold truncate">{dest.currency}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCalculateCosts(dest)}
                    disabled={calculating}
                    className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm md:text-base"
                  >
                    {calculating ? 'Calculating...' : 'Calculate Costs'}
                  </button>
                </div>
              ))}
            </div>

            {destinations.length > 8 && !showAllDestinations && (
              <div className="text-center mt-6 md:mt-8">
                <button
                  onClick={() => setShowAllDestinations(true)}
                  className="px-4 md:px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm md:text-base"
                >
                  See More Destinations
                </button>
              </div>
            )}

            {showAllDestinations && (
              <div className="text-center mt-6 md:mt-8">
                <button
                  onClick={() => setShowAllDestinations(false)}
                  className="px-4 md:px-6 py-2 border-2 border-gray-600 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm md:text-base"
                >
                  Show Less
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Cost Breakdown Modal - Mobile Responsive */}
      {showModal && selectedDest && (
        <div className="fixed inset-0 bg-black/70 flex items-start md:items-center justify-center z-50 p-2 md:p-4 overflow-y-auto">
          <div className="bg-white rounded-lg md:rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto my-4 md:my-0">
            <div className="p-4 md:p-6">
              <div className="flex justify-between items-start mb-4 md:mb-6">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  {selectedDest.flag ? (
                    <img
                      src={selectedDest.flag}
                      alt={selectedDest.name}
                      className="w-10 h-7 md:w-12 md:h-9 object-cover border flex-shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-7 md:w-12 md:h-9 bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center rounded flex-shrink-0">
                      <span className="text-white text-sm md:text-base">📍</span>
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg md:text-2xl font-bold truncate">{selectedDest.name} Travel Budget</h2>
                    <p className="text-gray-600 text-sm md:text-base">
                      {costBreakdown?.days || 3} days • {costBreakdown?.travelers || 2} travelers
                    </p>
                    <p className="text-xs md:text-sm text-blue-600 mt-1">
                      Prices in {currency} • Public API Data
                    </p>
                  </div>
                </div>
                <button
                  className="text-gray-500 hover:text-gray-700 text-xl md:text-2xl ml-2 flex-shrink-0"
                  onClick={() => setShowModal(false)}
                >
                  ×
                </button>
              </div>

              {calculating ? (
                <div className="text-center py-8 md:py-12">
                  <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-base md:text-lg font-semibold">Fetching prices from public APIs...</p>
                  <p className="text-gray-600 mt-2 text-sm md:text-base">
                    Flight prices • Hotel rates • Food costs
                  </p>
                </div>
              ) : costBreakdown ? (
                <div className="space-y-4 md:space-y-6">
                  {/* API Info */}
                  <div className="bg-gray-50 p-3 md:p-4 rounded-lg border border-gray-200">
                    <h3 className="font-bold text-base md:text-lg mb-2 text-gray-800">PUBLIC API DATA</h3>
                    <p className="text-xs md:text-sm mb-2">Using free public APIs with no registration required:</p>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-white p-2 rounded">
                        <p className="text-xs text-gray-600">ExchangeRate-API</p>
                        <p className="text-xs font-semibold">Currency Rates</p>
                      </div>
                      <div className="bg-white p-2 rounded">
                        <p className="text-xs text-gray-600">RestCountries</p>
                        <p className="text-xs font-semibold">Country Data</p>
                      </div>
                      <div className="bg-white p-2 rounded">
                        <p className="text-xs text-gray-600">GeoNames</p>
                        <p className="text-xs font-semibold">City Data</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2 text-center">
                      Calculation Method: Hotel = per room • Food = per person
                    </p>
                  </div>

                  {/* Location Info */}
                  <div className="bg-blue-50 p-3 md:p-4 rounded-lg border border-blue-200">
                    <h3 className="font-bold text-base md:text-lg mb-2 text-blue-800">TRAVEL ROUTE</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                      <div className="bg-white p-2 md:p-3 rounded border">
                        <p className="text-xs md:text-sm text-gray-600">From</p>
                        <p className="font-semibold text-sm md:text-base truncate">{costBreakdown.fromCity}, {costBreakdown.fromCountry}</p>
                      </div>
                      <div className="bg-white p-2 md:p-3 rounded border">
                        <p className="text-xs md:text-sm text-gray-600">To</p>
                        <p className="font-semibold text-sm md:text-base truncate">{costBreakdown.destination}</p>
                      </div>
                      <div className="bg-white p-2 md:p-3 rounded border">
                        <p className="text-xs md:text-sm text-gray-600">Duration</p>
                        <p className="font-semibold text-sm md:text-base">{costBreakdown.days} days</p>
                        <p className="text-xs text-gray-500">{costBreakdown.roomsNeeded} room(s)</p>
                      </div>
                      <div className="bg-white p-2 md:p-3 rounded border">
                        <p className="text-xs md:text-sm text-gray-600">Travelers</p>
                        <p className="font-semibold text-sm md:text-base">{costBreakdown.travelers} people</p>
                      </div>
                    </div>
                  </div>

                  {/* Real Prices */}
                  <div className="bg-yellow-50 p-3 md:p-4 rounded-lg border border-yellow-200">
                    <h3 className="font-bold text-base md:text-lg mb-2 text-yellow-800">ESTIMATED PRICES ({currency})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
                      <div className="bg-white p-2 md:p-3 rounded border text-center">
                        <p className="text-xs md:text-sm text-gray-600">Flight (per person)</p>
                        <p className="font-bold text-base md:text-lg">{costBreakdown.flightPrice?.toLocaleString()} {currency}</p>
                        <p className="text-xs text-gray-500">Based on actual flight data</p>
                      </div>
                      <div className="bg-white p-2 md:p-3 rounded border text-center">
                        <p className="text-xs md:text-sm text-gray-600">Hotel (per room/night)</p>
                        <p className="font-bold text-base md:text-lg">{costBreakdown.hotelPricePerRoom?.toLocaleString()} {currency}</p>
                        <p className="text-xs text-gray-500">{costBreakdown.roomsNeeded} room(s) needed</p>
                      </div>
                      <div className="bg-white p-2 md:p-3 rounded border text-center">
                        <p className="text-xs md:text-sm text-gray-600">Food (per person/day)</p>
                        <p className="font-bold text-base md:text-lg">{costBreakdown.foodPricePerPerson?.toLocaleString()} {currency}</p>
                        <p className="text-xs text-gray-500">3 meals + snacks per day</p>
                      </div>
                    </div>
                  </div>

                  {/* Cost Breakdown */}
                  <div>
                    <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4">TOTAL COST BREAKDOWN ({currency})</h3>
                    <div className="space-y-2 md:space-y-3">
                      {Object.entries(costBreakdown.baseCosts).map(([key, value]) => {
                        const descriptions = {
                          flights: `Round-trip flights × ${costBreakdown.travelers} people`,
                          accommodation: `${costBreakdown.roomsNeeded} room(s) × ${costBreakdown.days} nights`,
                          food: `${costBreakdown.travelers} people × ${costBreakdown.days} days`,
                          transportation: 'Local transport & taxis',
                          activities: 'Sightseeing & entertainment',
                          insurance: 'Travel insurance',
                          visa: 'Visa application fees',
                          misc: 'Souvenirs, tips, extras'
                        };

                        return (
                          <div key={key} className="flex justify-between items-start border-b pb-2">
                            <div className="min-w-0 flex-1">
                              <span className="capitalize font-medium text-sm md:text-base">{key.replace('_', ' ')}</span>
                              <p className="text-xs text-gray-500 truncate">{descriptions[key]}</p>
                            </div>
                            <div className="text-right ml-2 flex-shrink-0">
                              <span className="font-semibold text-sm md:text-lg whitespace-nowrap">
                                {value?.toLocaleString()} {currency}
                              </span>
                            </div>
                          </div>
                        );
                      })}

                      <div className="flex justify-between border-t pt-2 md:pt-3">
                        <span className="font-medium text-sm md:text-base">Subtotal:</span>
                        <span className="font-semibold text-sm md:text-base">
                          {costBreakdown.subtotal?.toLocaleString()} {currency}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-sm md:text-base">Taxes & Fees (12%):</span>
                        <span className="font-semibold text-sm md:text-base">
                          {costBreakdown.tax?.toLocaleString()} {currency}
                        </span>
                      </div>
                      <div className="flex justify-between text-lg md:text-xl font-bold border-t pt-2 md:pt-3">
                        <span className="text-sm md:text-lg">TOTAL ESTIMATED COST:</span>
                        <span className="text-blue-600 text-sm md:text-lg">
                          {costBreakdown.total?.toLocaleString()} {currency}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-pink-50 p-3 md:p-4 rounded-lg border border-pink-200">
                    <h3 className="font-bold text-base md:text-lg mb-2 text-pink-800">COST ANALYSIS</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                      <div className="text-center">
                        <p className="text-xs md:text-sm text-gray-600">Per Person Total</p>
                        <p className="font-bold text-sm md:text-lg">
                          {Math.round(costBreakdown.total / costBreakdown.travelers)?.toLocaleString()} {currency}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs md:text-sm text-gray-600">Per Day Total</p>
                        <p className="font-bold text-sm md:text-lg">
                          {Math.round(costBreakdown.total / costBreakdown.days)?.toLocaleString()} {currency}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs md:text-sm text-gray-600">Per Day/Person</p>
                        <p className="font-bold text-sm md:text-lg">
                          {costBreakdown.perDayPerPerson?.toLocaleString()} {currency}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs md:text-sm text-gray-600">Per Room/Night</p>
                        <p className="font-bold text-sm md:text-lg">
                          {Math.round(costBreakdown.baseCosts.accommodation / costBreakdown.days / costBreakdown.roomsNeeded)?.toLocaleString()} {currency}
                        </p>
                      </div>
                    </div>
                  </div>

    
                  <div className="bg-indigo-50 p-3 md:p-4 rounded-lg border border-indigo-200">
                    <h3 className="font-bold text-base md:text-lg mb-2 text-indigo-800">TRAVEL TIPS</h3>
                    <ul className="list-disc pl-4 md:pl-5 space-y-1 text-xs md:text-sm">
                      <li>Book flights 2-3 months in advance for best prices</li>
                      <li>Consider Airbnb or guesthouses for budget stays</li>
                      <li>Use public transportation to save on local transport</li>
                      <li>Eat at local restaurants instead of tourist spots</li>
                      {costBreakdown.baseCosts.visa > 0 && (
                        <li>Apply for visa at least 1 month before travel</li>
                      )}
                      <li className="text-green-600 font-semibold">
                        Note: Accommodation cost is calculated PER ROOM, not per person
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 md:py-12">
                  <p className="text-red-500">Error calculating costs. Please try again.</p>
                </div>
              )}

              <div className="mt-4 md:mt-6 flex flex-col sm:flex-row justify-end gap-2 md:gap-3">
                <button
                  className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm md:text-base order-2 sm:order-1"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button className="px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm md:text-base order-1 sm:order-2">
                  Save Budget
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <footer className="border-t bg-white mt-8 md:mt-12">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="text-center">
            <p className="text-gray-600 font-semibold text-sm md:text-base">PINOY TRAVEL BUDGET CALCULATOR</p>
            <p className="text-xs md:text-sm text-gray-500 mt-2">
              Powered by CrochsDevs - No Registration Required
            </p>
            <p className="text-xs text-gray-400 mt-3 md:mt-4">
              Note: This website use as Travel Guide only. Prices are estimates based on public API data and may vary in real-time. Always check official sources before booking.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;