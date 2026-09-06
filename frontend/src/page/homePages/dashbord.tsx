import { useEffect, useState, type ChangeEvent } from "react";
import ReactPlayer from "react-player";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CloudSun,
  Download,
  FileText,
  Globe2,
  Hotel,
  MailCheck,
  Map,
  MapPin,
  Moon,
  Plane,
  Route,
  Search,
  Sparkles,
  Star,
  Sun,
  Ticket,
  WalletCards,
} from "lucide-react";
import AuthModal, { type AuthMode } from "@/page/homePages/AuthModal";
import i18n from "@/lib/i18n";

const navItems = [
  { labelKey: "nav.home", href: "#home" },
  { labelKey: "nav.destinations", href: "#destinations" },
  { labelKey: "nav.travelGuides", href: "#travel-guides" },
  { labelKey: "nav.whyUs", href: "#why-us" },
  { labelKey: "nav.hotel", href: "#travel-guides" },
  { labelKey: "nav.stories", href: "#stories" },
];

const stats = [
  { value: "1M+", labelKey: "stats.travelers" },
  { value: "120+", labelKey: "stats.countries" },
  { value: "4.9/5", labelKey: "stats.rating" },
];

const testimonials = [
  {
    name: "Aarav Mehta",
    roleKey: "testimonials.aarav.role",
    quoteKey: "testimonials.aarav.quote",
  },
  {
    name: "Mira Kapoor",
    roleKey: "testimonials.mira.role",
    quoteKey: "testimonials.mira.quote",
  },
  {
    name: "Kabir Shah",
    roleKey: "testimonials.kabir.role",
    quoteKey: "testimonials.kabir.quote",
  },
];

const features = [
  {
    icon: MapPin,
    titleKey: "features.places.title",
    descriptionKey: "features.places.description",
  },
  {
    icon: Map,
    titleKey: "features.maps.title",
    descriptionKey: "features.maps.description",
  },
  {
    icon: CalendarDays,
    titleKey: "features.itineraries.title",
    descriptionKey: "features.itineraries.description",
  },
  {
    icon: Hotel,
    titleKey: "features.hotels.title",
    descriptionKey: "features.hotels.description",
  },
  {
    icon: CloudSun,
    titleKey: "features.weather.title",
    descriptionKey: "features.weather.description",
  },
  {
    icon: Ticket,
    titleKey: "features.tickets.title",
    descriptionKey: "features.tickets.description",
  },
];

const pressMentions = [
  {
    source: "Nomad Review",
    titleKey: "press.nomad",
  },
  {
    source: "City Trails",
    titleKey: "press.cityTrails",
  },
  {
    source: "Route Weekly",
    titleKey: "press.routeWeekly",
  },
  {
    source: "The Travel Desk",
    titleKey: "press.travelDesk",
  },
  {
    source: "Guidebook Lab",
    titleKey: "press.guidebook",
  },
];

const proFeatures = [
  {
    icon: Plane,
    titleKey: "pro.flights.title",
    descriptionKey: "pro.flights.description",
  },
  {
    icon: Download,
    titleKey: "pro.offline.title",
    descriptionKey: "pro.offline.description",
  },
  {
    icon: MailCheck,
    titleKey: "pro.gmail.title",
    descriptionKey: "pro.gmail.description",
  },
  {
    icon: Route,
    titleKey: "pro.routes.title",
    descriptionKey: "pro.routes.description",
  },
  {
    icon: WalletCards,
    titleKey: "pro.deals.title",
    descriptionKey: "pro.deals.description",
  },
  {
    icon: FileText,
    titleKey: "pro.attachments.title",
    descriptionKey: "pro.attachments.description",
  },
];

const destinationGroups = [
  {
    titleKey: "destinations.topCities",
    places: [
      "Jaipur",
      "Udaipur",
      "Surat",
      "Mumbai",
      "Nashik",
      "Bengaluru",
      "Noida",
      "Gandhinagar",
      "Indore",
      "Amritsar",
      "Chandigarh",
    ],
  },
  {
    titleKey: "destinations.parks",
    places: [
      "Jim Corbett",
      "Ranthambore",
      "Valley of Flowers",
      "Gir National Park",
      "Kaziranga",
      "Sundarbans",
    ],
  },
  {
    titleKey: "destinations.attractions",
    places: [
      "Amber Fort",
      "Gateway of India",
      "Mysore Palace",
      "Hawa Mahal",
      "Marine Drive",
      "Sabarmati Ashram",
      "Golden Temple",
      "City Palace",
    ],
  },
];

const footerLinks = [
  "footer.links.hotel",
  "footer.links.blog",
  "footer.links.security",
  "footer.links.terms",
  "footer.links.contact",
];

const guideLinks = [
  "footer.guides.tripPlanners",
  "footer.guides.explore",
  "footer.guides.roadTrips",
  "footer.guides.categories",
  "footer.guides.searchTerms",
  "footer.guides.weather",
  "footer.guides.questions",
  "footer.guides.itineraries",
  "footer.guides.maps",
  "footer.guides.season",
  "footer.guides.places",
];

const translations: Record<string, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.destinations": "Destinations",
    "nav.travelGuides": "Travel guides",
    "nav.whyUs": "Why Us",
    "nav.hotel": "Hotel",
    "nav.stories": "Stories",
    "header.searchPlaceholder": "Explore by destination",
    "header.login": "Login",
    "header.getStarted": "Get Started",
    "hero.kicker": "Smarter trips, calmer planning",
    "hero.title": "One app for all your travel planning needs",
    "hero.description":
      "Create detailed itineraries, explore shared guides, map every stop, and manage bookings in one clean workspace.",
    "cta.startPlanning": "Start Planning",
    "cta.getApp": "Get the App",
    "cta.upgradePlanning": "Upgrade Planning",
    "stats.travelers": "travelers planning with Wanderlust",
    "stats.countries": "countries mapped into guides",
    "stats.rating": "average trip planning rating",
    "map.eyebrow": "Map-first planning",
    "map.title": "Your itinerary and your map in one view",
    "map.description":
      "No more switching between apps, tabs, and tools to keep track of travel plans. Keep routes, saved places, stays, and timing connected from the start.",
    "map.item.schedules": "Day-by-day schedules",
    "map.item.guides": "Shared travel guides",
    "map.item.bookings": "Booking details",
    "map.item.notes": "Route notes",
    "stories.title": "What travelers are raving about",
    "stories.description":
      "Over 1 million people have tried Wanderlust and loved its easy trip planning features.",
    "stories.ratingLabel": "5 star rating",
    "testimonials.aarav.role": "Travel blogger",
    "testimonials.aarav.quote":
      "Wanderlust turned my scattered notes into one clean plan. I booked, mapped, and shared the full itinerary without jumping between tabs.",
    "testimonials.mira.role": "Solo explorer",
    "testimonials.mira.quote":
      "The map view makes every day feel organized. I can spot nearby cafes, museums, and bookings before I leave the hotel.",
    "testimonials.kabir.role": "Weekend traveler",
    "testimonials.kabir.quote":
      "I planned a three-city route in minutes. The guide suggestions saved me hours and still felt personal.",
    "features.eyebrow": "Features",
    "features.title": "Replace the messy stack of travel tools",
    "features.places.title": "Add places in one click",
    "features.places.description":
      "Save restaurants, landmarks, stays, and local tips from guides directly into your trip plan.",
    "features.maps.title": "Plan with maps open",
    "features.maps.description":
      "See every stop, booking, and route together so each travel day feels easy to scan.",
    "features.itineraries.title": "Build detailed itineraries",
    "features.itineraries.description":
      "Group plans by day, time, city, and category without losing the big picture.",
    "features.hotels.title": "Track hotels and bookings",
    "features.hotels.description":
      "Keep stays, confirmations, check-ins, and reservation details close to your route.",
    "features.weather.title": "Check destination weather",
    "features.weather.description":
      "Plan the right activities with helpful seasonal and weather context for each stop.",
    "features.tickets.title": "Save tickets and notes",
    "features.tickets.description":
      "Attach passes, ideas, PDFs, reminders, and quick notes to the right travel day.",
    "press.eyebrow": "Recommended",
    "press.title": "Recommended by the press",
    "press.description":
      "Discover why travel writers and city-guide editors keep choosing Wanderlust.",
    "press.nomad": "A polished planner for travelers who want maps and schedules together.",
    "press.cityTrails": "Wanderlust keeps the busy parts of trip planning surprisingly calm.",
    "press.routeWeekly": "A practical way to turn saved places into real, bookable travel days.",
    "press.travelDesk": "Smart enough for complex trips, simple enough for weekend escapes.",
    "press.guidebook": "Clean collaboration tools make group travel less messy.",
    "press.meta": "Travel planning review",
    "pro.eyebrow": "Wanderlust Pro",
    "pro.title": "Maximize your trip planning with Pro",
    "pro.description":
      "Experience the full potential of Wanderlust with enhanced features for longer trips, frequent travel, and group planning.",
    "pro.flights.title": "Live flight updates",
    "pro.flights.description":
      "Monitor flight status and get useful timing changes before they derail the day.",
    "pro.offline.title": "Offline access",
    "pro.offline.description":
      "Download your plans locally so maps, notes, and reservations travel with you.",
    "pro.gmail.title": "Automatic Gmail scanning",
    "pro.gmail.description":
      "Sync travel reservations into your itinerary as soon as confirmations arrive.",
    "pro.routes.title": "Optimized routes",
    "pro.routes.description": "Reorder stops to reduce backtracking and make road trips smoother.",
    "pro.deals.title": "Flight deals",
    "pro.deals.description":
      "Get useful fare alerts when a destination on your list becomes easier to reach.",
    "pro.attachments.title": "Unlimited attachments",
    "pro.attachments.description":
      "Keep tickets, PDFs, hotel notes, and travel files beside the plan they support.",
    "destinations.eyebrow": "Explore next",
    "destinations.title": "Popular places travelers plan first",
    "destinations.topCities": "Top cities",
    "destinations.parks": "Parks and nature",
    "destinations.attractions": "Popular attractions",
    "footer.description": "Made with care by Sumit. Copyright 2026 Travel Inc.",
    "footer.languageLabel": "Change language",
    "footer.activeLabel": "Active",
    "footer.companyTitle": "Company",
    "footer.guideTitle": "Guides and resources",
    "footer.links.hotel": "Hotel",
    "footer.links.blog": "Blog",
    "footer.links.security": "Report security issue",
    "footer.links.terms": "Terms, privacy policy and copyright",
    "footer.links.contact": "Contact us",
    "footer.guides.tripPlanners": "Trip planners by destination",
    "footer.guides.explore": "Explore cities and countries",
    "footer.guides.roadTrips": "Road trips by destination",
    "footer.guides.categories": "Best places to visit by category",
    "footer.guides.searchTerms": "Popular search terms by destination",
    "footer.guides.weather": "Weather around the world",
    "footer.guides.questions": "Travel questions and answers",
    "footer.guides.itineraries": "Travel itinerary guides",
    "footer.guides.maps": "Maps of cities and national parks",
    "footer.guides.season": "Destinations by season",
    "footer.guides.places": "Places to visit by destination",
  },
  hi: {
    "nav.home": "होम",
    "nav.destinations": "गंतव्य",
    "nav.travelGuides": "यात्रा गाइड",
    "nav.whyUs": "क्यों हम",
    "nav.hotel": "होटल",
    "nav.stories": "कहानियां",
    "header.searchPlaceholder": "गंतव्य खोजें",
    "header.login": "लॉगिन",
    "header.getStarted": "शुरू करें",
    "hero.kicker": "स्मार्ट यात्राएं, शांत योजना",
    "hero.title": "आपकी सभी यात्रा योजनाओं के लिए एक ऐप",
    "hero.description":
      "विस्तृत यात्रा कार्यक्रम बनाएं, साझा गाइड देखें, हर जगह को मैप करें और बुकिंग को एक साफ जगह पर संभालें.",
    "cta.startPlanning": "योजना शुरू करें",
    "cta.getApp": "ऐप पाएं",
    "cta.upgradePlanning": "योजना अपग्रेड करें",
    "stats.travelers": "Wanderlust के साथ यात्रा योजना बना रहे यात्री",
    "stats.countries": "गाइड में शामिल देश",
    "stats.rating": "औसत यात्रा योजना रेटिंग",
    "map.eyebrow": "मैप-फर्स्ट प्लानिंग",
    "map.title": "आपकी यात्रा सूची और मैप एक ही दृश्य में",
    "map.description":
      "यात्रा योजनाओं को संभालने के लिए कई ऐप और टैब बदलने की जरूरत नहीं. रूट, सेव की गई जगहें, ठहराव और समय शुरू से जुड़े रहें.",
    "map.item.schedules": "दिन-दर-दिन शेड्यूल",
    "map.item.guides": "साझा यात्रा गाइड",
    "map.item.bookings": "बुकिंग विवरण",
    "map.item.notes": "रूट नोट्स",
    "stories.title": "यात्री क्या पसंद कर रहे हैं",
    "stories.description":
      "10 लाख से अधिक लोगों ने Wanderlust आजमाया और इसकी आसान यात्रा योजना सुविधाओं को पसंद किया.",
    "stories.ratingLabel": "5 स्टार रेटिंग",
    "testimonials.aarav.role": "यात्रा ब्लॉगर",
    "testimonials.aarav.quote":
      "Wanderlust ने मेरे बिखरे नोट्स को एक साफ योजना में बदल दिया. मैंने बिना टैब बदलें बुकिंग, मैपिंग और पूरी यात्रा साझा की.",
    "testimonials.mira.role": "सोलो एक्सप्लोरर",
    "testimonials.mira.quote":
      "मैप व्यू से हर दिन व्यवस्थित लगता है. होटल छोड़ने से पहले मैं पास के कैफे, म्यूजियम और बुकिंग देख लेती हूं.",
    "testimonials.kabir.role": "वीकेंड यात्री",
    "testimonials.kabir.quote":
      "मैंने मिनटों में तीन शहरों का रूट बना लिया. गाइड सुझावों ने घंटों बचाए और फिर भी योजना निजी लगी.",
    "features.eyebrow": "फीचर्स",
    "features.title": "बिखरे हुए यात्रा टूल्स की जगह एक साफ सिस्टम",
    "features.places.title": "एक क्लिक में जगहें जोड़ें",
    "features.places.description":
      "रेस्तरां, लैंडमार्क, ठहराव और लोकल टिप्स सीधे अपनी यात्रा योजना में सेव करें.",
    "features.maps.title": "मैप खोलकर योजना बनाएं",
    "features.maps.description":
      "हर स्टॉप, बुकिंग और रूट साथ देखें ताकि हर यात्रा दिन आसानी से समझ आए.",
    "features.itineraries.title": "विस्तृत यात्रा कार्यक्रम बनाएं",
    "features.itineraries.description":
      "दिन, समय, शहर और श्रेणी के अनुसार योजनाएं व्यवस्थित करें.",
    "features.hotels.title": "होटल और बुकिंग ट्रैक करें",
    "features.hotels.description":
      "ठहराव, कन्फर्मेशन, चेक-इन और आरक्षण विवरण रूट के पास रखें.",
    "features.weather.title": "गंतव्य मौसम देखें",
    "features.weather.description":
      "हर स्टॉप के मौसम और मौसम-काल की जानकारी से सही गतिविधियां चुनें.",
    "features.tickets.title": "टिकट और नोट्स सेव करें",
    "features.tickets.description":
      "पास, विचार, PDF, रिमाइंडर और नोट्स सही यात्रा दिन से जोड़ें.",
    "press.eyebrow": "अनुशंसित",
    "press.title": "प्रेस द्वारा अनुशंसित",
    "press.description": "जानें कि यात्रा लेखक और शहर-गाइड एडिटर Wanderlust क्यों चुनते हैं.",
    "press.nomad": "उन यात्रियों के लिए साफ प्लानर जो मैप और शेड्यूल साथ चाहते हैं.",
    "press.cityTrails": "Wanderlust यात्रा योजना के कठिन हिस्सों को आश्चर्यजनक रूप से शांत रखता है.",
    "press.routeWeekly": "सेव की गई जगहों को वास्तविक यात्रा दिनों में बदलने का उपयोगी तरीका.",
    "press.travelDesk": "जटिल यात्राओं के लिए स्मार्ट, वीकेंड ट्रिप के लिए सरल.",
    "press.guidebook": "साफ सहयोग टूल्स ग्रुप यात्रा को कम उलझाते हैं.",
    "press.meta": "यात्रा योजना समीक्षा",
    "pro.eyebrow": "Wanderlust Pro",
    "pro.title": "Pro के साथ अपनी यात्रा योजना बेहतर बनाएं",
    "pro.description":
      "लंबी यात्राओं, बार-बार यात्रा और ग्रुप प्लानिंग के लिए बेहतर सुविधाओं के साथ Wanderlust का पूरा लाभ लें.",
    "pro.flights.title": "लाइव फ्लाइट अपडेट",
    "pro.flights.description": "दिन बिगड़ने से पहले फ्लाइट स्थिति और समय बदलाव देखें.",
    "pro.offline.title": "ऑफलाइन एक्सेस",
    "pro.offline.description": "मैप, नोट्स और आरक्षण साथ रखने के लिए योजनाएं लोकल डाउनलोड करें.",
    "pro.gmail.title": "ऑटोमैटिक Gmail स्कैनिंग",
    "pro.gmail.description": "कन्फर्मेशन आते ही यात्रा आरक्षण अपने कार्यक्रम में सिंक करें.",
    "pro.routes.title": "ऑप्टिमाइज्ड रूट",
    "pro.routes.description": "कम चक्कर लगाने के लिए स्टॉप्स को बेहतर क्रम में रखें.",
    "pro.deals.title": "फ्लाइट डील्स",
    "pro.deals.description": "आपकी सूची के गंतव्य पर बेहतर किराया मिलने पर उपयोगी अलर्ट पाएं.",
    "pro.attachments.title": "अनलिमिटेड अटैचमेंट",
    "pro.attachments.description": "टिकट, PDF, होटल नोट्स और यात्रा फाइलें सही योजना के साथ रखें.",
    "destinations.eyebrow": "अगला एक्सप्लोर करें",
    "destinations.title": "लोकप्रिय जगहें जहां यात्री पहले योजना बनाते हैं",
    "destinations.topCities": "टॉप शहर",
    "destinations.parks": "पार्क और प्रकृति",
    "destinations.attractions": "लोकप्रिय आकर्षण",
    "footer.description": "Sumit द्वारा प्यार से बनाया गया. Copyright 2026 Travel Inc.",
    "footer.languageLabel": "भाषा बदलें",
    "footer.activeLabel": "सक्रिय",
    "footer.companyTitle": "कंपनी",
    "footer.guideTitle": "गाइड और संसाधन",
    "footer.links.hotel": "होटल",
    "footer.links.blog": "ब्लॉग",
    "footer.links.security": "सुरक्षा समस्या रिपोर्ट करें",
    "footer.links.terms": "नियम, गोपनीयता नीति और कॉपीराइट",
    "footer.links.contact": "संपर्क करें",
    "footer.guides.tripPlanners": "गंतव्य के अनुसार ट्रिप प्लानर",
    "footer.guides.explore": "शहर और देश एक्सप्लोर करें",
    "footer.guides.roadTrips": "गंतव्य के अनुसार रोड ट्रिप",
    "footer.guides.categories": "श्रेणी के अनुसार घूमने की जगहें",
    "footer.guides.searchTerms": "गंतव्य के लोकप्रिय खोज शब्द",
    "footer.guides.weather": "दुनिया भर का मौसम",
    "footer.guides.questions": "यात्रा प्रश्न और उत्तर",
    "footer.guides.itineraries": "यात्रा कार्यक्रम गाइड",
    "footer.guides.maps": "शहरों और नेशनल पार्कों के मैप",
    "footer.guides.season": "मौसम के अनुसार गंतव्य",
    "footer.guides.places": "गंतव्य के अनुसार घूमने की जगहें",
  },
  gu: {
    "nav.home": "હોમ",
    "nav.destinations": "ગંતવ્ય",
    "nav.travelGuides": "પ્રવાસ માર્ગદર્શિકા",
    "nav.whyUs": "શા માટે અમે",
    "nav.hotel": "હોટેલ",
    "nav.stories": "વાર્તાઓ",
    "header.searchPlaceholder": "ગંતવ્ય શોધો",
    "header.login": "લોગિન",
    "header.getStarted": "શરૂ કરો",
    "hero.kicker": "સ્માર્ટ પ્રવાસ, શાંતિપૂર્ણ આયોજન",
    "hero.title": "તમારી બધી મુસાફરી યોજનાઓ માટે એક એપ",
    "hero.description":
      "વિગતવાર પ્રવાસ કાર્યક્રમ બનાવો, શેર કરેલી ગાઇડ જુઓ, દરેક સ્ટોપ મેપ કરો અને બુકિંગ એક જ જગ્યા પર સંભાળો.",
    "cta.startPlanning": "આયોજન શરૂ કરો",
    "cta.getApp": "એપ મેળવો",
    "cta.upgradePlanning": "પ્લાનિંગ અપગ્રેડ કરો",
    "stats.travelers": "Wanderlust સાથે મુસાફરીનું આયોજન કરતા પ્રવાસીઓ",
    "stats.countries": "ગાઇડમાં મેપ કરાયેલા દેશો",
    "stats.rating": "સરેરાશ ટ્રિપ પ્લાનિંગ રેટિંગ",
    "map.eyebrow": "મેપ-ફર્સ્ટ પ્લાનિંગ",
    "map.title": "તમારો પ્રવાસ કાર્યક્રમ અને મેપ એક જ દૃશ્યમાં",
    "map.description":
      "પ્રવાસ યોજનાઓ સંભાળવા માટે અલગ એપ અને ટેબ બદલવાની જરૂર નથી. રૂટ, સેવ કરેલી જગ્યાઓ, રહેવાની માહિતી અને સમય એકસાથે જોડાયેલા રહે.",
    "map.item.schedules": "દિવસ પ્રમાણે શેડ્યૂલ",
    "map.item.guides": "શેર કરેલી પ્રવાસ ગાઇડ",
    "map.item.bookings": "બુકિંગ વિગતો",
    "map.item.notes": "રૂટ નોંધો",
    "stories.title": "પ્રવાસીઓ શું વખાણી રહ્યા છે",
    "stories.description":
      "10 લાખથી વધુ લોકોએ Wanderlust અજમાવ્યું છે અને તેની સરળ ટ્રિપ પ્લાનિંગ સુવિધાઓ પસંદ કરી છે.",
    "stories.ratingLabel": "5 સ્ટાર રેટિંગ",
    "testimonials.aarav.role": "ટ્રાવેલ બ્લોગર",
    "testimonials.aarav.quote":
      "Wanderlust એ મારી છૂટક નોંધોને એક સ્વચ્છ પ્લાનમાં ફેરવી. મેં બુકિંગ, મેપિંગ અને સંપૂર્ણ કાર્યક્રમ સરળતાથી શેર કર્યો.",
    "testimonials.mira.role": "સોલો એક્સપ્લોરર",
    "testimonials.mira.quote":
      "મેપ વ્યૂથી દરેક દિવસ ગોઠવાયેલો લાગે છે. હોટેલ છોડતા પહેલા નજીકના કેફે, મ્યુઝિયમ અને બુકિંગ દેખાઈ જાય છે.",
    "testimonials.kabir.role": "વીકએન્ડ પ્રવાસી",
    "testimonials.kabir.quote":
      "મેં મિનિટોમાં ત્રણ શહેરોનો રૂટ બનાવ્યો. ગાઇડ સૂચનોને કારણે કલાકો બચ્યા અને પ્લાન વ્યક્તિગત લાગ્યો.",
    "features.eyebrow": "સુવિધાઓ",
    "features.title": "છૂટક ટ્રાવેલ ટૂલ્સને એક સ્વચ્છ સિસ્ટમથી બદલો",
    "features.places.title": "એક ક્લિકમાં જગ્યાઓ ઉમેરો",
    "features.places.description":
      "રેસ્ટોરાં, સ્થળો, રહેવાની જગ્યાઓ અને લોકલ ટીપ્સ સીધી તમારી ટ્રિપ પ્લાનમાં સેવ કરો.",
    "features.maps.title": "મેપ સાથે આયોજન કરો",
    "features.maps.description":
      "દરેક સ્ટોપ, બુકિંગ અને રૂટ સાથે જુઓ જેથી દરેક દિવસ સરળતાથી સમજાય.",
    "features.itineraries.title": "વિગતવાર પ્રવાસ કાર્યક્રમ બનાવો",
    "features.itineraries.description": "દિવસ, સમય, શહેર અને કેટેગરી પ્રમાણે પ્લાન ગોઠવો.",
    "features.hotels.title": "હોટેલ અને બુકિંગ ટ્રેક કરો",
    "features.hotels.description": "રહેવાની, કન્ફર્મેશન, ચેક-ઇન અને આરક્ષણ વિગતો રૂટ પાસે રાખો.",
    "features.weather.title": "ગંતવ્યનું હવામાન જુઓ",
    "features.weather.description": "દરેક સ્ટોપના હવામાનથી યોગ્ય પ્રવૃત્તિઓ પસંદ કરો.",
    "features.tickets.title": "ટિકિટ અને નોંધો સેવ કરો",
    "features.tickets.description": "પાસ, વિચારો, PDF, રિમાઇન્ડર અને નોંધો યોગ્ય દિવસે જોડો.",
    "press.eyebrow": "ભલામણ કરેલું",
    "press.title": "પ્રેસ દ્વારા ભલામણ",
    "press.description": "ટ્રાવેલ લેખકો અને શહેર-ગાઇડ એડિટર્સ Wanderlust કેમ પસંદ કરે છે તે જાણો.",
    "press.nomad": "મેપ અને શેડ્યૂલ સાથે ઇચ્છતા પ્રવાસીઓ માટે એક પોલિશ્ડ પ્લાનર.",
    "press.cityTrails": "Wanderlust ટ્રિપ પ્લાનિંગના વ્યસ્ત ભાગોને શાંત રાખે છે.",
    "press.routeWeekly": "સેવ કરેલી જગ્યાઓને સાચા પ્રવાસ દિવસોમાં ફેરવવાનો વ્યવહારુ રસ્તો.",
    "press.travelDesk": "મોટી ટ્રિપ માટે સ્માર્ટ અને વીકએન્ડ પ્રવાસ માટે સરળ.",
    "press.guidebook": "સ્વચ્છ સહયોગ ટૂલ્સ ગ્રુપ ટ્રાવેલને સરળ બનાવે છે.",
    "press.meta": "ટ્રિપ પ્લાનિંગ સમીક્ષા",
    "pro.eyebrow": "Wanderlust Pro",
    "pro.title": "Pro સાથે તમારું ટ્રિપ પ્લાનિંગ વધુ સારું બનાવો",
    "pro.description":
      "લાંબી ટ્રિપ, વારંવાર મુસાફરી અને ગ્રુપ પ્લાનિંગ માટે વધુ સારી સુવિધાઓનો લાભ લો.",
    "pro.flights.title": "લાઇવ ફ્લાઇટ અપડેટ્સ",
    "pro.flights.description": "દિવસ બગડે તે પહેલા ફ્લાઇટ સ્થિતિ અને સમય ફેરફાર જુઓ.",
    "pro.offline.title": "ઓફલાઇન ઍક્સેસ",
    "pro.offline.description": "મેપ, નોંધો અને રિઝર્વેશન સાથે રાખવા માટે પ્લાન ડાઉનલોડ કરો.",
    "pro.gmail.title": "ઓટોમેટિક Gmail સ્કેનિંગ",
    "pro.gmail.description": "કન્ફર્મેશન આવતાં જ ટ્રાવેલ રિઝર્વેશન કાર્યક્રમમાં સિંક કરો.",
    "pro.routes.title": "ઑપ્ટિમાઇઝ્ડ રૂટ",
    "pro.routes.description": "ઓછું પાછું ફરવું પડે તે માટે સ્ટોપ્સનો ક્રમ સુધારો.",
    "pro.deals.title": "ફ્લાઇટ ડીલ્સ",
    "pro.deals.description": "તમારી યાદીના ગંતવ્ય માટે સારી કિંમત મળે ત્યારે એલર્ટ મેળવો.",
    "pro.attachments.title": "અનલિમિટેડ એટેચમેન્ટ્સ",
    "pro.attachments.description": "ટિકિટ, PDF, હોટેલ નોંધો અને ફાઇલો યોગ્ય પ્લાન સાથે રાખો.",
    "destinations.eyebrow": "આગળ શોધો",
    "destinations.title": "પ્રવાસીઓ પહેલા પ્લાન કરતી લોકપ્રિય જગ્યાઓ",
    "destinations.topCities": "ટોચના શહેરો",
    "destinations.parks": "પાર્ક અને પ્રકૃતિ",
    "destinations.attractions": "લોકપ્રિય આકર્ષણો",
    "footer.description": "Sumit દ્વારા પ્રેમથી બનાવેલું. Copyright 2026 Travel Inc.",
    "footer.languageLabel": "ભાષા બદલો",
    "footer.activeLabel": "સક્રિય",
    "footer.companyTitle": "કંપની",
    "footer.guideTitle": "ગાઇડ અને સ્ત્રોતો",
    "footer.links.hotel": "હોટેલ",
    "footer.links.blog": "બ્લોગ",
    "footer.links.security": "સુરક્ષા સમસ્યા રિપોર્ટ કરો",
    "footer.links.terms": "નિયમો, ગોપનીયતા નીતિ અને કૉપિરાઇટ",
    "footer.links.contact": "સંપર્ક કરો",
    "footer.guides.tripPlanners": "ગંતવ્ય મુજબ ટ્રિપ પ્લાનર",
    "footer.guides.explore": "શહેરો અને દેશો શોધો",
    "footer.guides.roadTrips": "ગંતવ્ય મુજબ રોડ ટ્રિપ",
    "footer.guides.categories": "કેટેગરી મુજબ શ્રેષ્ઠ જગ્યાઓ",
    "footer.guides.searchTerms": "ગંતવ્ય મુજબ લોકપ્રિય શોધ શબ્દો",
    "footer.guides.weather": "દુનિયાનું હવામાન",
    "footer.guides.questions": "પ્રવાસ પ્રશ્નો અને જવાબો",
    "footer.guides.itineraries": "પ્રવાસ કાર્યક્રમ ગાઇડ",
    "footer.guides.maps": "શહેરો અને નેશનલ પાર્કના મેપ",
    "footer.guides.season": "સીઝન મુજબ ગંતવ્ય",
    "footer.guides.places": "ગંતવ્ય મુજબ મુલાકાતી સ્થળો",
  },
  mr: {
    "nav.home": "मुख्यपृष्ठ",
    "nav.destinations": "गंतव्ये",
    "nav.travelGuides": "प्रवास मार्गदर्शक",
    "nav.whyUs": "आम्ही का",
    "nav.hotel": "हॉटेल",
    "nav.stories": "कथा",
    "header.searchPlaceholder": "गंतव्य शोधा",
    "header.login": "लॉगिन",
    "header.getStarted": "सुरू करा",
    "hero.kicker": "हुशार प्रवास, शांत नियोजन",
    "hero.title": "तुमच्या सर्व प्रवास नियोजनासाठी एकच अॅप",
    "hero.description":
      "तपशीलवार कार्यक्रम तयार करा, शेअर केलेले गाइड पाहा, प्रत्येक थांबा मॅप करा आणि बुकिंग एका स्वच्छ ठिकाणी सांभाळा.",
    "cta.startPlanning": "नियोजन सुरू करा",
    "cta.getApp": "अॅप मिळवा",
    "cta.upgradePlanning": "नियोजन अपग्रेड करा",
    "stats.travelers": "Wanderlust सोबत प्रवास नियोजन करणारे प्रवासी",
    "stats.countries": "गाइडमध्ये मॅप केलेले देश",
    "stats.rating": "सरासरी ट्रिप नियोजन रेटिंग",
    "map.eyebrow": "मॅप-फर्स्ट नियोजन",
    "map.title": "तुमचा कार्यक्रम आणि मॅप एका दृश्यात",
    "map.description":
      "प्रवास योजना सांभाळण्यासाठी अॅप्स आणि टॅब बदलण्याची गरज नाही. रूट, सेव्ह केलेली ठिकाणे, मुक्काम आणि वेळ एकत्र ठेवा.",
    "map.item.schedules": "दिवसागणिक वेळापत्रक",
    "map.item.guides": "शेअर केलेले प्रवास गाइड",
    "map.item.bookings": "बुकिंग तपशील",
    "map.item.notes": "रूट नोट्स",
    "stories.title": "प्रवासी काय कौतुक करत आहेत",
    "stories.description":
      "10 लाखांहून अधिक लोकांनी Wanderlust वापरले आणि त्याच्या सोप्या नियोजन सुविधांना पसंती दिली.",
    "stories.ratingLabel": "5 स्टार रेटिंग",
    "testimonials.aarav.role": "प्रवास ब्लॉगर",
    "testimonials.aarav.quote":
      "Wanderlust ने माझ्या विखुरलेल्या नोट्सचे स्वच्छ प्लानमध्ये रूपांतर केले. बुकिंग, मॅपिंग आणि शेअरिंग एकाच ठिकाणी झाले.",
    "testimonials.mira.role": "एकटी प्रवासी",
    "testimonials.mira.quote":
      "मॅप दृश्यामुळे प्रत्येक दिवस व्यवस्थित वाटतो. हॉटेल सोडण्यापूर्वी जवळची कॅफे, संग्रहालये आणि बुकिंग दिसतात.",
    "testimonials.kabir.role": "वीकेंड प्रवासी",
    "testimonials.kabir.quote":
      "मी काही मिनिटांत तीन शहरांचा रूट तयार केला. गाइड सूचनांनी वेळ वाचवला आणि प्लान वैयक्तिक वाटला.",
    "features.eyebrow": "सुविधा",
    "features.title": "अव्यवस्थित प्रवास टूल्सऐवजी एक स्वच्छ प्रणाली",
    "features.places.title": "एका क्लिकमध्ये ठिकाणे जोडा",
    "features.places.description": "रेस्टॉरंट, स्थळे, मुक्काम आणि स्थानिक टिप्स थेट प्लानमध्ये सेव्ह करा.",
    "features.maps.title": "मॅप उघडून नियोजन करा",
    "features.maps.description": "प्रत्येक थांबा, बुकिंग आणि रूट एकत्र पाहा.",
    "features.itineraries.title": "तपशीलवार कार्यक्रम तयार करा",
    "features.itineraries.description": "दिवस, वेळ, शहर आणि श्रेणीनुसार योजना गटबद्ध करा.",
    "features.hotels.title": "हॉटेल आणि बुकिंग ट्रॅक करा",
    "features.hotels.description": "मुक्काम, कन्फर्मेशन, चेक-इन आणि आरक्षण तपशील जवळ ठेवा.",
    "features.weather.title": "गंतव्य हवामान तपासा",
    "features.weather.description": "प्रत्येक थांब्यासाठी हवामानानुसार योग्य गोष्टी ठरवा.",
    "features.tickets.title": "तिकिटे आणि नोट्स सेव्ह करा",
    "features.tickets.description": "पास, कल्पना, PDF, रिमाइंडर आणि नोट्स योग्य दिवशी जोडा.",
    "press.eyebrow": "शिफारस केलेले",
    "press.title": "प्रेसकडून शिफारस",
    "press.description": "प्रवास लेखक आणि शहर-गाइड संपादक Wanderlust का निवडतात ते पाहा.",
    "press.nomad": "मॅप आणि वेळापत्रक एकत्र हवे असणाऱ्या प्रवाशांसाठी उत्तम प्लानर.",
    "press.cityTrails": "Wanderlust प्रवास नियोजनाचे व्यस्त भाग शांत ठेवते.",
    "press.routeWeekly": "सेव्ह केलेली ठिकाणे प्रत्यक्ष प्रवास दिवसांत बदलण्याचा सोपा मार्ग.",
    "press.travelDesk": "मोठ्या ट्रिपसाठी स्मार्ट, वीकेंड ट्रिपसाठी सोपे.",
    "press.guidebook": "स्वच्छ सहकार्य टूल्स ग्रुप प्रवास सोपा करतात.",
    "press.meta": "ट्रिप नियोजन समीक्षा",
    "pro.eyebrow": "Wanderlust Pro",
    "pro.title": "Pro सह तुमचे प्रवास नियोजन वाढवा",
    "pro.description": "लांब ट्रिप, वारंवार प्रवास आणि ग्रुप प्लानिंगसाठी अधिक सुविधा वापरा.",
    "pro.flights.title": "लाईव्ह फ्लाइट अपडेट्स",
    "pro.flights.description": "दिवस बिघडण्यापूर्वी फ्लाइट स्थिती आणि वेळ बदल पाहा.",
    "pro.offline.title": "ऑफलाइन प्रवेश",
    "pro.offline.description": "मॅप, नोट्स आणि आरक्षणांसाठी प्लान लोकली डाउनलोड करा.",
    "pro.gmail.title": "ऑटोमॅटिक Gmail स्कॅनिंग",
    "pro.gmail.description": "कन्फर्मेशन आले की आरक्षणे कार्यक्रमात सिंक करा.",
    "pro.routes.title": "ऑप्टिमाइझ्ड रूट्स",
    "pro.routes.description": "कमी परतफेरीसाठी थांबे योग्य क्रमात लावा.",
    "pro.deals.title": "फ्लाइट डील्स",
    "pro.deals.description": "तुमच्या यादीतील गंतव्यांसाठी चांगली किंमत मिळाली की अलर्ट मिळवा.",
    "pro.attachments.title": "अमर्यादित अटॅचमेंट्स",
    "pro.attachments.description": "तिकिटे, PDF, हॉटेल नोट्स आणि फाइल्स योग्य प्लानजवळ ठेवा.",
    "destinations.eyebrow": "पुढे एक्सप्लोर करा",
    "destinations.title": "प्रवासी आधी प्लान करणारी लोकप्रिय ठिकाणे",
    "destinations.topCities": "टॉप शहरे",
    "destinations.parks": "उद्याने आणि निसर्ग",
    "destinations.attractions": "लोकप्रिय आकर्षणे",
    "footer.description": "Sumit कडून प्रेमाने तयार. Copyright 2026 Travel Inc.",
    "footer.languageLabel": "भाषा बदला",
    "footer.activeLabel": "सक्रिय",
    "footer.companyTitle": "कंपनी",
    "footer.guideTitle": "गाइड आणि संसाधने",
    "footer.links.hotel": "हॉटेल",
    "footer.links.blog": "ब्लॉग",
    "footer.links.security": "सुरक्षा समस्या कळवा",
    "footer.links.terms": "अटी, गोपनीयता धोरण आणि कॉपीराइट",
    "footer.links.contact": "संपर्क करा",
    "footer.guides.tripPlanners": "गंतव्यनुसार ट्रिप प्लानर",
    "footer.guides.explore": "शहरे आणि देश एक्सप्लोर करा",
    "footer.guides.roadTrips": "गंतव्यनुसार रोड ट्रिप",
    "footer.guides.categories": "श्रेणीनुसार भेट देण्याची ठिकाणे",
    "footer.guides.searchTerms": "गंतव्यनुसार लोकप्रिय शोध शब्द",
    "footer.guides.weather": "जगभरातील हवामान",
    "footer.guides.questions": "प्रवास प्रश्न आणि उत्तरे",
    "footer.guides.itineraries": "प्रवास कार्यक्रम गाइड",
    "footer.guides.maps": "शहरे आणि राष्ट्रीय उद्यानांचे मॅप",
    "footer.guides.season": "ऋतूनुसार गंतव्ये",
    "footer.guides.places": "गंतव्यनुसार भेटीची ठिकाणे",
  },
  bn: {
    "nav.home": "হোম",
    "nav.destinations": "গন্তব্য",
    "nav.travelGuides": "ভ্রমণ গাইড",
    "nav.whyUs": "কেন আমরা",
    "nav.hotel": "হোটেল",
    "nav.stories": "গল্প",
    "header.searchPlaceholder": "গন্তব্য খুঁজুন",
    "header.login": "লগইন",
    "header.getStarted": "শুরু করুন",
    "hero.kicker": "স্মার্ট ভ্রমণ, শান্ত পরিকল্পনা",
    "hero.title": "আপনার সব ভ্রমণ পরিকল্পনার জন্য একটি অ্যাপ",
    "hero.description":
      "বিস্তারিত ভ্রমণসূচি তৈরি করুন, শেয়ার করা গাইড দেখুন, প্রতিটি স্টপ ম্যাপে রাখুন এবং বুকিং এক জায়গায় সামলান।",
    "cta.startPlanning": "পরিকল্পনা শুরু করুন",
    "cta.getApp": "অ্যাপ নিন",
    "cta.upgradePlanning": "পরিকল্পনা আপগ্রেড করুন",
    "stats.travelers": "Wanderlust দিয়ে ভ্রমণ পরিকল্পনা করছেন এমন ভ্রমণকারী",
    "stats.countries": "গাইডে ম্যাপ করা দেশ",
    "stats.rating": "গড় ট্রিপ পরিকল্পনা রেটিং",
    "map.eyebrow": "ম্যাপ-ফার্স্ট পরিকল্পনা",
    "map.title": "আপনার ভ্রমণসূচি এবং ম্যাপ একসঙ্গে",
    "map.description":
      "ভ্রমণ পরিকল্পনা দেখার জন্য আর অ্যাপ ও ট্যাব বদলাতে হবে না। রুট, সেভ করা জায়গা, থাকা এবং সময় একসঙ্গে রাখুন।",
    "map.item.schedules": "দিন অনুযায়ী সময়সূচি",
    "map.item.guides": "শেয়ার করা ভ্রমণ গাইড",
    "map.item.bookings": "বুকিং বিবরণ",
    "map.item.notes": "রুট নোট",
    "stories.title": "ভ্রমণকারীরা যা পছন্দ করছেন",
    "stories.description":
      "10 লক্ষের বেশি মানুষ Wanderlust ব্যবহার করেছেন এবং এর সহজ ট্রিপ পরিকল্পনা ফিচার পছন্দ করেছেন।",
    "stories.ratingLabel": "5 স্টার রেটিং",
    "testimonials.aarav.role": "ভ্রমণ ব্লগার",
    "testimonials.aarav.quote":
      "Wanderlust আমার ছড়ানো নোটকে একটি পরিষ্কার পরিকল্পনায় বদলে দিয়েছে। বুকিং, ম্যাপিং এবং শেয়ারিং এক জায়গায় হয়েছে।",
    "testimonials.mira.role": "একক ভ্রমণকারী",
    "testimonials.mira.quote":
      "ম্যাপ ভিউতে প্রতিদিন গুছানো লাগে। হোটেল ছাড়ার আগে কাছের ক্যাফে, মিউজিয়াম এবং বুকিং দেখতে পাই।",
    "testimonials.kabir.role": "উইকএন্ড ভ্রমণকারী",
    "testimonials.kabir.quote":
      "আমি মিনিটের মধ্যে তিন শহরের রুট বানিয়েছি। গাইড সাজেশন সময় বাঁচিয়েছে এবং পরিকল্পনাটি ব্যক্তিগত লেগেছে।",
    "features.eyebrow": "ফিচার",
    "features.title": "অগোছালো ভ্রমণ টুলের বদলে এক পরিষ্কার ব্যবস্থা",
    "features.places.title": "এক ক্লিকে জায়গা যোগ করুন",
    "features.places.description":
      "রেস্তোরাঁ, দর্শনীয় স্থান, থাকার জায়গা এবং স্থানীয় টিপস সরাসরি আপনার ট্রিপ প্ল্যানে সেভ করুন।",
    "features.maps.title": "ম্যাপ খুলে পরিকল্পনা করুন",
    "features.maps.description": "প্রতিটি স্টপ, বুকিং এবং রুট একসঙ্গে দেখুন।",
    "features.itineraries.title": "বিস্তারিত ভ্রমণসূচি বানান",
    "features.itineraries.description": "দিন, সময়, শহর এবং ক্যাটেগরি অনুযায়ী পরিকল্পনা সাজান।",
    "features.hotels.title": "হোটেল এবং বুকিং ট্র্যাক করুন",
    "features.hotels.description": "থাকা, কনফার্মেশন, চেক-ইন এবং রিজার্ভেশন কাছে রাখুন।",
    "features.weather.title": "গন্তব্যের আবহাওয়া দেখুন",
    "features.weather.description": "প্রতিটি স্টপের আবহাওয়া দেখে সঠিক কাজ বেছে নিন।",
    "features.tickets.title": "টিকিট এবং নোট সেভ করুন",
    "features.tickets.description": "পাস, আইডিয়া, PDF, রিমাইন্ডার এবং নোট ঠিক দিনে যোগ করুন।",
    "press.eyebrow": "প্রস্তাবিত",
    "press.title": "প্রেসের সুপারিশ",
    "press.description": "ভ্রমণ লেখক এবং শহর-গাইড সম্পাদকরা কেন Wanderlust বেছে নেন তা জানুন।",
    "press.nomad": "ম্যাপ এবং সময়সূচি একসঙ্গে চাই এমন ভ্রমণকারীদের জন্য ঝকঝকে প্ল্যানার।",
    "press.cityTrails": "Wanderlust ট্রিপ পরিকল্পনার ব্যস্ত অংশগুলোকে শান্ত রাখে।",
    "press.routeWeekly": "সেভ করা জায়গাকে বাস্তব ভ্রমণ দিনে বদলানোর ব্যবহারিক উপায়।",
    "press.travelDesk": "জটিল ট্রিপের জন্য স্মার্ট, উইকএন্ড ট্রিপের জন্য সহজ।",
    "press.guidebook": "পরিষ্কার সহযোগিতা টুল গ্রুপ ট্রাভেলকে সহজ করে।",
    "press.meta": "ট্রিপ পরিকল্পনা রিভিউ",
    "pro.eyebrow": "Wanderlust Pro",
    "pro.title": "Pro দিয়ে আপনার ট্রিপ পরিকল্পনা আরও শক্তিশালী করুন",
    "pro.description": "লম্বা ট্রিপ, নিয়মিত ভ্রমণ এবং গ্রুপ পরিকল্পনার জন্য উন্নত ফিচার ব্যবহার করুন।",
    "pro.flights.title": "লাইভ ফ্লাইট আপডেট",
    "pro.flights.description": "দিন নষ্ট হওয়ার আগে ফ্লাইট স্ট্যাটাস এবং সময় বদল দেখুন।",
    "pro.offline.title": "অফলাইন অ্যাক্সেস",
    "pro.offline.description": "ম্যাপ, নোট এবং রিজার্ভেশন সঙ্গে রাখতে পরিকল্পনা ডাউনলোড করুন।",
    "pro.gmail.title": "অটোমেটিক Gmail স্ক্যানিং",
    "pro.gmail.description": "কনফার্মেশন এলেই ট্রাভেল রিজার্ভেশন ভ্রমণসূচিতে সিঙ্ক করুন।",
    "pro.routes.title": "অপ্টিমাইজড রুট",
    "pro.routes.description": "কম ঘুরে যেতে স্টপগুলো ভালো ক্রমে সাজান।",
    "pro.deals.title": "ফ্লাইট ডিল",
    "pro.deals.description": "আপনার তালিকার গন্তব্যে ভালো ভাড়া এলে অ্যালার্ট পান।",
    "pro.attachments.title": "আনলিমিটেড অ্যাটাচমেন্ট",
    "pro.attachments.description": "টিকিট, PDF, হোটেল নোট এবং ফাইল ঠিক পরিকল্পনার পাশে রাখুন।",
    "destinations.eyebrow": "পরের গন্তব্য দেখুন",
    "destinations.title": "যে জনপ্রিয় জায়গাগুলো ভ্রমণকারীরা আগে পরিকল্পনা করেন",
    "destinations.topCities": "শীর্ষ শহর",
    "destinations.parks": "পার্ক ও প্রকৃতি",
    "destinations.attractions": "জনপ্রিয় আকর্ষণ",
    "footer.description": "Sumit এর যত্নে তৈরি। Copyright 2026 Travel Inc.",
    "footer.languageLabel": "ভাষা বদলান",
    "footer.activeLabel": "সক্রিয়",
    "footer.companyTitle": "কোম্পানি",
    "footer.guideTitle": "গাইড ও রিসোর্স",
    "footer.links.hotel": "হোটেল",
    "footer.links.blog": "ব্লগ",
    "footer.links.security": "নিরাপত্তা সমস্যা রিপোর্ট করুন",
    "footer.links.terms": "শর্ত, গোপনীয়তা নীতি এবং কপিরাইট",
    "footer.links.contact": "যোগাযোগ করুন",
    "footer.guides.tripPlanners": "গন্তব্য অনুযায়ী ট্রিপ প্ল্যানার",
    "footer.guides.explore": "শহর ও দেশ দেখুন",
    "footer.guides.roadTrips": "গন্তব্য অনুযায়ী রোড ট্রিপ",
    "footer.guides.categories": "ক্যাটেগরি অনুযায়ী সেরা জায়গা",
    "footer.guides.searchTerms": "গন্তব্য অনুযায়ী জনপ্রিয় সার্চ শব্দ",
    "footer.guides.weather": "বিশ্বের আবহাওয়া",
    "footer.guides.questions": "ভ্রমণ প্রশ্ন ও উত্তর",
    "footer.guides.itineraries": "ভ্রমণসূচি গাইড",
    "footer.guides.maps": "শহর ও জাতীয় উদ্যানের ম্যাপ",
    "footer.guides.season": "ঋতু অনুযায়ী গন্তব্য",
    "footer.guides.places": "গন্তব্য অনুযায়ী দেখার জায়গা",
  },
  pa: {
    "nav.home": "ਹੋਮ",
    "nav.destinations": "ਮੰਜ਼ਿਲਾਂ",
    "nav.travelGuides": "ਯਾਤਰਾ ਗਾਈਡ",
    "nav.whyUs": "ਅਸੀਂ ਕਿਉਂ",
    "nav.hotel": "ਹੋਟਲ",
    "nav.stories": "ਕਹਾਣੀਆਂ",
    "header.searchPlaceholder": "ਮੰਜ਼ਿਲ ਖੋਜੋ",
    "header.login": "ਲਾਗਇਨ",
    "header.getStarted": "ਸ਼ੁਰੂ ਕਰੋ",
    "hero.kicker": "ਸਮਾਰਟ ਯਾਤਰਾਵਾਂ, ਸ਼ਾਂਤ ਯੋਜਨਾ",
    "hero.title": "ਤੁਹਾਡੀ ਹਰ ਯਾਤਰਾ ਯੋਜਨਾ ਲਈ ਇਕ ਐਪ",
    "hero.description":
      "ਵਿਸਥਾਰਤ ਇਟੀਨਰੇਰੀ ਬਣਾਓ, ਸਾਂਝੇ ਗਾਈਡ ਵੇਖੋ, ਹਰ ਸਟਾਪ ਨੂੰ ਮੈਪ ਕਰੋ ਅਤੇ ਬੁਕਿੰਗ ਇਕ ਸਾਫ ਥਾਂ ਤੇ ਸੰਭਾਲੋ।",
    "cta.startPlanning": "ਯੋਜਨਾ ਸ਼ੁਰੂ ਕਰੋ",
    "cta.getApp": "ਐਪ ਲਵੋ",
    "cta.upgradePlanning": "ਯੋਜਨਾ ਅਪਗ੍ਰੇਡ ਕਰੋ",
    "stats.travelers": "Wanderlust ਨਾਲ ਯਾਤਰਾ ਯੋਜਨਾ ਬਣਾਉਂਦੇ ਯਾਤਰੀ",
    "stats.countries": "ਗਾਈਡਾਂ ਵਿੱਚ ਮੈਪ ਕੀਤੇ ਦੇਸ਼",
    "stats.rating": "ਔਸਤ ਯਾਤਰਾ ਯੋਜਨਾ ਰੇਟਿੰਗ",
    "map.eyebrow": "ਮੈਪ-ਫਰਸਟ ਯੋਜਨਾ",
    "map.title": "ਤੁਹਾਡੀ ਇਟੀਨਰੇਰੀ ਅਤੇ ਮੈਪ ਇਕੋ ਦ੍ਰਿਸ਼ ਵਿੱਚ",
    "map.description":
      "ਯਾਤਰਾ ਯੋਜਨਾਵਾਂ ਲਈ ਵੱਖ ਵੱਖ ਐਪ ਜਾਂ ਟੈਬ ਬਦਲਣ ਦੀ ਲੋੜ ਨਹੀਂ। ਰੂਟ, ਸੇਵ ਕੀਤੀਆਂ ਥਾਵਾਂ, ਰਹਿਣ ਅਤੇ ਸਮਾਂ ਇਕੱਠੇ ਰੱਖੋ।",
    "map.item.schedules": "ਦਿਨ-ਦਰ-ਦਿਨ ਸ਼ਡਿਊਲ",
    "map.item.guides": "ਸਾਂਝੇ ਯਾਤਰਾ ਗਾਈਡ",
    "map.item.bookings": "ਬੁਕਿੰਗ ਵੇਰਵੇ",
    "map.item.notes": "ਰੂਟ ਨੋਟਸ",
    "stories.title": "ਯਾਤਰੀ ਕੀ ਪਸੰਦ ਕਰ ਰਹੇ ਹਨ",
    "stories.description": "10 ਲੱਖ ਤੋਂ ਵੱਧ ਲੋਕਾਂ ਨੇ Wanderlust ਵਰਤਿਆ ਅਤੇ ਇਸ ਦੀ ਆਸਾਨ ਯੋਜਨਾ ਪਸੰਦ ਕੀਤੀ।",
    "stories.ratingLabel": "5 ਸਟਾਰ ਰੇਟਿੰਗ",
    "testimonials.aarav.role": "ਯਾਤਰਾ ਬਲੌਗਰ",
    "testimonials.aarav.quote":
      "Wanderlust ਨੇ ਮੇਰੇ ਖਿਲਰੇ ਨੋਟ ਇਕ ਸਾਫ ਯੋਜਨਾ ਵਿੱਚ ਬਦਲ ਦਿੱਤੇ। ਬੁਕਿੰਗ, ਮੈਪਿੰਗ ਅਤੇ ਸਾਂਝਾ ਕਰਨਾ ਇਕ ਥਾਂ ਹੋ ਗਿਆ।",
    "testimonials.mira.role": "ਸੋਲੋ ਯਾਤਰੀ",
    "testimonials.mira.quote":
      "ਮੈਪ ਵਿਊ ਨਾਲ ਹਰ ਦਿਨ ਗਠਿਤ ਲੱਗਦਾ ਹੈ। ਹੋਟਲ ਛੱਡਣ ਤੋਂ ਪਹਿਲਾਂ ਨੇੜਲੇ ਕੈਫੇ, ਮਿਊਜ਼ੀਅਮ ਅਤੇ ਬੁਕਿੰਗ ਵੇਖ ਲੈਂਦੀ ਹਾਂ।",
    "testimonials.kabir.role": "ਵੀਕਐਂਡ ਯਾਤਰੀ",
    "testimonials.kabir.quote":
      "ਮੈਂ ਮਿੰਟਾਂ ਵਿੱਚ ਤਿੰਨ ਸ਼ਹਿਰਾਂ ਦਾ ਰੂਟ ਬਣਾਇਆ। ਗਾਈਡ ਸੁਝਾਵਾਂ ਨੇ ਸਮਾਂ ਬਚਾਇਆ ਅਤੇ ਯੋਜਨਾ ਨਿੱਜੀ ਲੱਗੀ।",
    "features.eyebrow": "ਫੀਚਰ",
    "features.title": "ਖਿਲਰੇ ਯਾਤਰਾ ਟੂਲਾਂ ਦੀ ਥਾਂ ਇਕ ਸਾਫ ਸਿਸਟਮ",
    "features.places.title": "ਇਕ ਕਲਿਕ ਨਾਲ ਥਾਵਾਂ ਜੋੜੋ",
    "features.places.description": "ਰੈਸਟੋਰੈਂਟ, ਲੈਂਡਮਾਰਕ, ਰਹਿਣ ਦੀ ਥਾਂ ਅਤੇ ਲੋਕਲ ਟਿਪਸ ਆਪਣੀ ਯੋਜਨਾ ਵਿੱਚ ਸੇਵ ਕਰੋ।",
    "features.maps.title": "ਮੈਪ ਖੋਲ੍ਹ ਕੇ ਯੋਜਨਾ ਬਣਾਓ",
    "features.maps.description": "ਹਰ ਸਟਾਪ, ਬੁਕਿੰਗ ਅਤੇ ਰੂਟ ਇਕੱਠੇ ਵੇਖੋ।",
    "features.itineraries.title": "ਵਿਸਥਾਰਤ ਇਟੀਨਰੇਰੀ ਬਣਾਓ",
    "features.itineraries.description": "ਦਿਨ, ਸਮਾਂ, ਸ਼ਹਿਰ ਅਤੇ ਸ਼੍ਰੇਣੀ ਅਨੁਸਾਰ ਯੋਜਨਾ ਗਠਿਤ ਕਰੋ।",
    "features.hotels.title": "ਹੋਟਲ ਅਤੇ ਬੁਕਿੰਗ ਟ੍ਰੈਕ ਕਰੋ",
    "features.hotels.description": "ਰਹਿਣ, ਕਨਫਰਮੇਸ਼ਨ, ਚੈਕ-ਇਨ ਅਤੇ ਰਿਜ਼ਰਵੇਸ਼ਨ ਵੇਰਵੇ ਨੇੜੇ ਰੱਖੋ।",
    "features.weather.title": "ਮੰਜ਼ਿਲ ਦਾ ਮੌਸਮ ਵੇਖੋ",
    "features.weather.description": "ਹਰ ਸਟਾਪ ਦੇ ਮੌਸਮ ਅਨੁਸਾਰ ਸਹੀ ਕੰਮ ਚੁਣੋ।",
    "features.tickets.title": "ਟਿਕਟਾਂ ਅਤੇ ਨੋਟ ਸੇਵ ਕਰੋ",
    "features.tickets.description": "ਪਾਸ, ਵਿਚਾਰ, PDF, ਰਿਮਾਈਂਡਰ ਅਤੇ ਨੋਟ ਸਹੀ ਦਿਨ ਨਾਲ ਜੋੜੋ।",
    "press.eyebrow": "ਸਿਫਾਰਸ਼ੀ",
    "press.title": "ਪ੍ਰੈਸ ਵੱਲੋਂ ਸਿਫਾਰਸ਼",
    "press.description": "ਜਾਣੋ ਯਾਤਰਾ ਲੇਖਕ ਅਤੇ ਸਿਟੀ-ਗਾਈਡ ਐਡੀਟਰ Wanderlust ਕਿਉਂ ਚੁਣਦੇ ਹਨ।",
    "press.nomad": "ਜੋ ਯਾਤਰੀ ਮੈਪ ਅਤੇ ਸ਼ਡਿਊਲ ਇਕੱਠੇ ਚਾਹੁੰਦੇ ਹਨ, ਉਨ੍ਹਾਂ ਲਈ ਸਾਫ ਪਲਾਨਰ।",
    "press.cityTrails": "Wanderlust ਟ੍ਰਿਪ ਯੋਜਨਾ ਦੇ ਰੁੱਝੇ ਹਿੱਸਿਆਂ ਨੂੰ ਸ਼ਾਂਤ ਰੱਖਦਾ ਹੈ।",
    "press.routeWeekly": "ਸੇਵ ਕੀਤੀਆਂ ਥਾਵਾਂ ਨੂੰ ਅਸਲ ਯਾਤਰਾ ਦਿਨਾਂ ਵਿੱਚ ਬਦਲਣ ਦਾ ਵਰਤੋਂਯੋਗ ਤਰੀਕਾ।",
    "press.travelDesk": "ਜਟਿਲ ਯਾਤਰਾਵਾਂ ਲਈ ਸਮਾਰਟ, ਵੀਕਐਂਡ ਲਈ ਆਸਾਨ।",
    "press.guidebook": "ਸਾਫ ਸਹਿਯੋਗ ਟੂਲ ਗਰੁੱਪ ਯਾਤਰਾ ਨੂੰ ਆਸਾਨ ਬਣਾਉਂਦੇ ਹਨ।",
    "press.meta": "ਯਾਤਰਾ ਯੋਜਨਾ ਸਮੀਖਿਆ",
    "pro.eyebrow": "Wanderlust Pro",
    "pro.title": "Pro ਨਾਲ ਆਪਣੀ ਯਾਤਰਾ ਯੋਜਨਾ ਵਧਾਓ",
    "pro.description": "ਲੰਬੀਆਂ ਯਾਤਰਾਵਾਂ, ਨਿਯਮਿਤ ਯਾਤਰਾ ਅਤੇ ਗਰੁੱਪ ਯੋਜਨਾ ਲਈ ਵਧੀਆ ਫੀਚਰ ਵਰਤੋ।",
    "pro.flights.title": "ਲਾਈਵ ਫਲਾਈਟ ਅਪਡੇਟ",
    "pro.flights.description": "ਦਿਨ ਖਰਾਬ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ ਫਲਾਈਟ ਸਥਿਤੀ ਅਤੇ ਸਮਾਂ ਬਦਲਾਅ ਵੇਖੋ।",
    "pro.offline.title": "ਆਫਲਾਈਨ ਐਕਸੈਸ",
    "pro.offline.description": "ਮੈਪ, ਨੋਟ ਅਤੇ ਰਿਜ਼ਰਵੇਸ਼ਨ ਨਾਲ ਰੱਖਣ ਲਈ ਯੋਜਨਾ ਡਾਊਨਲੋਡ ਕਰੋ।",
    "pro.gmail.title": "ਆਟੋਮੈਟਿਕ Gmail ਸਕੈਨਿੰਗ",
    "pro.gmail.description": "ਕਨਫਰਮੇਸ਼ਨ ਆਉਂਦੇ ਹੀ ਰਿਜ਼ਰਵੇਸ਼ਨ ਇਟੀਨਰੇਰੀ ਵਿੱਚ ਸਿੰਕ ਕਰੋ।",
    "pro.routes.title": "ਓਪਟੀਮਾਈਜ਼ਡ ਰੂਟ",
    "pro.routes.description": "ਘੱਟ ਵਾਪਸੀ ਲਈ ਸਟਾਪਾਂ ਨੂੰ ਚੰਗੇ ਕ੍ਰਮ ਵਿੱਚ ਲਗਾਓ।",
    "pro.deals.title": "ਫਲਾਈਟ ਡੀਲਾਂ",
    "pro.deals.description": "ਤੁਹਾਡੀ ਸੂਚੀ ਦੀ ਮੰਜ਼ਿਲ ਲਈ ਵਧੀਆ ਕਿਰਾਇਆ ਆਏ ਤਾਂ ਅਲਰਟ ਲਵੋ।",
    "pro.attachments.title": "ਅਸੀਮਿਤ ਅਟੈਚਮੈਂਟ",
    "pro.attachments.description": "ਟਿਕਟਾਂ, PDF, ਹੋਟਲ ਨੋਟ ਅਤੇ ਫਾਈਲਾਂ ਸਹੀ ਯੋਜਨਾ ਨਾਲ ਰੱਖੋ।",
    "destinations.eyebrow": "ਅਗਲਾ ਵੇਖੋ",
    "destinations.title": "ਲੋਕਪ੍ਰਿਯ ਥਾਵਾਂ ਜਿਨ੍ਹਾਂ ਦੀ ਯਾਤਰੀ ਪਹਿਲਾਂ ਯੋਜਨਾ ਬਣਾਉਂਦੇ ਹਨ",
    "destinations.topCities": "ਟੌਪ ਸ਼ਹਿਰ",
    "destinations.parks": "ਪਾਰਕ ਅਤੇ ਕੁਦਰਤ",
    "destinations.attractions": "ਲੋਕਪ੍ਰਿਯ ਆਕਰਸ਼ਣ",
    "footer.description": "Sumit ਵੱਲੋਂ ਪਿਆਰ ਨਾਲ ਬਣਾਇਆ। Copyright 2026 Travel Inc.",
    "footer.languageLabel": "ਭਾਸ਼ਾ ਬਦਲੋ",
    "footer.activeLabel": "ਸਰਗਰਮ",
    "footer.companyTitle": "ਕੰਪਨੀ",
    "footer.guideTitle": "ਗਾਈਡ ਅਤੇ ਸਰੋਤ",
    "footer.links.hotel": "ਹੋਟਲ",
    "footer.links.blog": "ਬਲੌਗ",
    "footer.links.security": "ਸੁਰੱਖਿਆ ਸਮੱਸਿਆ ਰਿਪੋਰਟ ਕਰੋ",
    "footer.links.terms": "ਸ਼ਰਤਾਂ, ਗੋਪਨੀਯਤਾ ਨੀਤੀ ਅਤੇ ਕਾਪੀਰਾਈਟ",
    "footer.links.contact": "ਸੰਪਰਕ ਕਰੋ",
    "footer.guides.tripPlanners": "ਮੰਜ਼ਿਲ ਅਨੁਸਾਰ ਟ੍ਰਿਪ ਪਲਾਨਰ",
    "footer.guides.explore": "ਸ਼ਹਿਰ ਅਤੇ ਦੇਸ਼ ਵੇਖੋ",
    "footer.guides.roadTrips": "ਮੰਜ਼ਿਲ ਅਨੁਸਾਰ ਰੋਡ ਟ੍ਰਿਪ",
    "footer.guides.categories": "ਸ਼੍ਰੇਣੀ ਅਨੁਸਾਰ ਵਧੀਆ ਥਾਵਾਂ",
    "footer.guides.searchTerms": "ਮੰਜ਼ਿਲ ਅਨੁਸਾਰ ਲੋਕਪ੍ਰਿਯ ਖੋਜ ਸ਼ਬਦ",
    "footer.guides.weather": "ਦੁਨੀਆ ਭਰ ਦਾ ਮੌਸਮ",
    "footer.guides.questions": "ਯਾਤਰਾ ਸਵਾਲ ਅਤੇ ਜਵਾਬ",
    "footer.guides.itineraries": "ਯਾਤਰਾ ਇਟੀਨਰੇਰੀ ਗਾਈਡ",
    "footer.guides.maps": "ਸ਼ਹਿਰਾਂ ਅਤੇ ਨੇਸ਼ਨਲ ਪਾਰਕਾਂ ਦੇ ਮੈਪ",
    "footer.guides.season": "ਮੌਸਮ ਅਨੁਸਾਰ ਮੰਜ਼ਿਲਾਂ",
    "footer.guides.places": "ਮੰਜ਼ਿਲ ਅਨੁਸਾਰ ਵੇਖਣ ਵਾਲੀਆਂ ਥਾਵਾਂ",
  },
  ta: {
    "nav.home": "முகப்பு",
    "nav.destinations": "இடங்கள்",
    "nav.travelGuides": "பயண வழிகாட்டிகள்",
    "nav.whyUs": "ஏன் நாம்",
    "nav.hotel": "ஹோட்டல்",
    "nav.stories": "கதைகள்",
    "header.searchPlaceholder": "இடத்தை தேடுங்கள்",
    "header.login": "உள்நுழை",
    "header.getStarted": "தொடங்குங்கள்",
    "hero.kicker": "சிறந்த பயணம், அமைதியான திட்டம்",
    "hero.title": "உங்கள் அனைத்து பயண திட்டங்களுக்கும் ஒரு ஆப்",
    "hero.description":
      "விரிவான பயண நிரல் உருவாக்குங்கள், பகிரப்பட்ட வழிகாட்டிகளை பாருங்கள், ஒவ்வொரு நிறுத்தத்தையும் வரைபடத்தில் வைத்து, முன்பதிவுகளை ஒரே இடத்தில் நிர்வகிக்கவும்.",
    "cta.startPlanning": "திட்டமிடத் தொடங்குங்கள்",
    "cta.getApp": "ஆப் பெறுங்கள்",
    "cta.upgradePlanning": "திட்டத்தை மேம்படுத்துங்கள்",
    "stats.travelers": "Wanderlust மூலம் பயணம் திட்டமிடும் பயணிகள்",
    "stats.countries": "வழிகாட்டிகளில் சேர்க்கப்பட்ட நாடுகள்",
    "stats.rating": "சராசரி பயண திட்ட மதிப்பீடு",
    "map.eyebrow": "வரைபடம் முதன்மை திட்டமிடல்",
    "map.title": "உங்கள் பயண நிரலும் வரைபடமும் ஒரே பார்வையில்",
    "map.description":
      "பயண திட்டங்களை காண பல ஆப்கள், டேப்கள் மாற தேவையில்லை. பாதைகள், சேமித்த இடங்கள், தங்கும் இடங்கள் மற்றும் நேரத்தை ஒன்றாக வைத்துக் கொள்ளுங்கள்.",
    "map.item.schedules": "நாள் வாரியான அட்டவணை",
    "map.item.guides": "பகிரப்பட்ட பயண வழிகாட்டிகள்",
    "map.item.bookings": "முன்பதிவு விவரங்கள்",
    "map.item.notes": "பாதை குறிப்புகள்",
    "stories.title": "பயணிகள் பாராட்டுவது என்ன",
    "stories.description": "10 லட்சத்துக்கும் மேற்பட்டோர் Wanderlust பயன்படுத்தி அதன் எளிய திட்ட அம்சங்களை விரும்பினர்.",
    "stories.ratingLabel": "5 நட்சத்திர மதிப்பீடு",
    "testimonials.aarav.role": "பயண பதிவர்",
    "testimonials.aarav.quote":
      "Wanderlust என் சிதறிய குறிப்புகளை ஒரு சுத்தமான திட்டமாக மாற்றியது. முன்பதிவு, வரைபடம், பகிர்வு அனைத்தும் ஒரே இடத்தில் நடந்தது.",
    "testimonials.mira.role": "தனி பயணி",
    "testimonials.mira.quote":
      "வரைபட பார்வை ஒவ்வொரு நாளையும் ஒழுங்காக காட்டுகிறது. ஹோட்டலை விட்டு முன் அருகிலுள்ள கஃபே, அருங்காட்சியகம், முன்பதிவுகளை பார்க்கிறேன்.",
    "testimonials.kabir.role": "வார இறுதி பயணி",
    "testimonials.kabir.quote":
      "நிமிடங்களில் மூன்று நகர பாதையை திட்டமிட்டேன். வழிகாட்டி பரிந்துரைகள் நேரத்தை சேமித்தன.",
    "features.eyebrow": "அம்சங்கள்",
    "features.title": "சிதறிய பயண கருவிகளுக்கு பதில் ஒரு சுத்தமான அமைப்பு",
    "features.places.title": "ஒரு கிளிக்கில் இடங்களை சேர்க்கவும்",
    "features.places.description": "உணவகங்கள், முக்கிய இடங்கள், தங்கும் இடங்கள், உள்ளூர் குறிப்புகளை திட்டத்தில் சேமிக்கவும்.",
    "features.maps.title": "வரைபடத்துடன் திட்டமிடுங்கள்",
    "features.maps.description": "ஒவ்வொரு நிறுத்தம், முன்பதிவு, பாதையையும் ஒன்றாக காணுங்கள்.",
    "features.itineraries.title": "விரிவான பயண நிரல் உருவாக்குங்கள்",
    "features.itineraries.description": "நாள், நேரம், நகரம், வகைபடி திட்டங்களை அமைக்கவும்.",
    "features.hotels.title": "ஹோட்டல் மற்றும் முன்பதிவுகளை கண்காணிக்கவும்",
    "features.hotels.description": "தங்கும் இடம், உறுதிப்படுத்தல், செக்-இன் விவரங்களை அருகில் வைத்துக் கொள்ளுங்கள்.",
    "features.weather.title": "இடத்தின் வானிலை பார்க்கவும்",
    "features.weather.description": "ஒவ்வொரு நிறுத்தத்திற்கும் வானிலை பார்த்து சரியான செயல்களை தேர்வு செய்யுங்கள்.",
    "features.tickets.title": "டிக்கெட்டுகள் மற்றும் குறிப்புகளை சேமிக்கவும்",
    "features.tickets.description": "பாஸ், யோசனைகள், PDF, நினைவூட்டல்கள் மற்றும் குறிப்புகளை சரியான நாளுடன் இணைக்கவும்.",
    "press.eyebrow": "பரிந்துரை",
    "press.title": "பத்திரிகைகள் பரிந்துரைத்தது",
    "press.description": "பயண எழுத்தாளர்கள் மற்றும் நகர வழிகாட்டி ஆசிரியர்கள் Wanderlust ஐ ஏன் தேர்வுசெய்கிறார்கள் என்பதை அறியுங்கள்.",
    "press.nomad": "வரைபடமும் அட்டவணையும் ஒன்றாகவேண்டும் என்ற பயணிகளுக்கான அழகான திட்டி.",
    "press.cityTrails": "Wanderlust பயண திட்டத்தின் பிஸியான பகுதிகளையும் அமைதியாக வைத்திருக்கிறது.",
    "press.routeWeekly": "சேமித்த இடங்களை உண்மையான பயண நாட்களாக மாற்றும் பயனுள்ள வழி.",
    "press.travelDesk": "சிக்கலான பயணங்களுக்கு ஸ்மார்ட், வார இறுதி பயணங்களுக்கு எளிது.",
    "press.guidebook": "சுத்தமான கூட்டாண்மை கருவிகள் குழு பயணத்தை எளிதாக்கும்.",
    "press.meta": "பயண திட்ட மதிப்புரை",
    "pro.eyebrow": "Wanderlust Pro",
    "pro.title": "Pro மூலம் உங்கள் பயண திட்டத்தை மேம்படுத்துங்கள்",
    "pro.description": "நீண்ட பயணங்கள், அடிக்கடி பயணம், குழு திட்டமிடல் ஆகியவற்றுக்கு மேம்பட்ட அம்சங்களைப் பயன்படுத்துங்கள்.",
    "pro.flights.title": "நேரடி விமான புதுப்பிப்புகள்",
    "pro.flights.description": "நாள் பாதிக்கும்முன் விமான நிலை மற்றும் நேர மாற்றங்களை பாருங்கள்.",
    "pro.offline.title": "ஆஃப்லைன் அணுகல்",
    "pro.offline.description": "வரைபடம், குறிப்புகள், முன்பதிவுகள் கிடைக்க திட்டங்களை பதிவிறக்குங்கள்.",
    "pro.gmail.title": "தானியங்கி Gmail ஸ்கேனிங்",
    "pro.gmail.description": "உறுதிப்படுத்தல்கள் வந்தவுடன் பயண முன்பதிவுகளை நிரலில் சேர்க்கவும்.",
    "pro.routes.title": "மேம்படுத்தப்பட்ட பாதைகள்",
    "pro.routes.description": "திரும்பிச் செல்லுதல் குறைய நிறுத்தங்களை நல்ல வரிசையில் அமைக்கவும்.",
    "pro.deals.title": "விமான சலுகைகள்",
    "pro.deals.description": "உங்கள் பட்டியலிலுள்ள இடங்களுக்கு நல்ல கட்டணம் வந்தால் அறிவிப்பு பெறுங்கள்.",
    "pro.attachments.title": "வரம்பற்ற இணைப்புகள்",
    "pro.attachments.description": "டிக்கெட்டுகள், PDF, ஹோட்டல் குறிப்புகள், கோப்புகளை சரியான திட்டத்துடன் வைத்திருங்கள்.",
    "destinations.eyebrow": "அடுத்ததாக ஆராயுங்கள்",
    "destinations.title": "பயணிகள் முதலில் திட்டமிடும் பிரபல இடங்கள்",
    "destinations.topCities": "முக்கிய நகரங்கள்",
    "destinations.parks": "பூங்கா மற்றும் இயற்கை",
    "destinations.attractions": "பிரபல ஈர்ப்புகள்",
    "footer.description": "Sumit அன்புடன் உருவாக்கியது. Copyright 2026 Travel Inc.",
    "footer.languageLabel": "மொழி மாற்று",
    "footer.activeLabel": "செயலில்",
    "footer.companyTitle": "நிறுவனம்",
    "footer.guideTitle": "வழிகாட்டிகள் மற்றும் வளங்கள்",
    "footer.links.hotel": "ஹோட்டல்",
    "footer.links.blog": "வலைப்பதிவு",
    "footer.links.security": "பாதுகாப்பு சிக்கலை தெரிவிக்கவும்",
    "footer.links.terms": "விதிமுறைகள், தனியுரிமை கொள்கை மற்றும் காப்புரிமை",
    "footer.links.contact": "தொடர்பு கொள்ளுங்கள்",
    "footer.guides.tripPlanners": "இடங்களின்படி பயண திட்டிகள்",
    "footer.guides.explore": "நகரங்கள் மற்றும் நாடுகளை ஆராயுங்கள்",
    "footer.guides.roadTrips": "இடங்களின்படி சாலைப் பயணங்கள்",
    "footer.guides.categories": "வகையின்படி சிறந்த இடங்கள்",
    "footer.guides.searchTerms": "இடங்களின்படி பிரபல தேடல் சொற்கள்",
    "footer.guides.weather": "உலகம் முழுவதும் வானிலை",
    "footer.guides.questions": "பயண கேள்விகள் மற்றும் பதில்கள்",
    "footer.guides.itineraries": "பயண நிரல் வழிகாட்டிகள்",
    "footer.guides.maps": "நகரங்கள் மற்றும் தேசிய பூங்கா வரைபடங்கள்",
    "footer.guides.season": "பருவத்தின்படி இடங்கள்",
    "footer.guides.places": "இடங்களின்படி பார்க்க வேண்டிய இடங்கள்",
  },
  te: {
    "nav.home": "హోమ్",
    "nav.destinations": "గమ్యస్థానాలు",
    "nav.travelGuides": "ప్రయాణ గైడ్లు",
    "nav.whyUs": "మమ్మల్ని ఎందుకు",
    "nav.hotel": "హోటల్",
    "nav.stories": "కథలు",
    "header.searchPlaceholder": "గమ్యస్థానాన్ని వెతకండి",
    "header.login": "లాగిన్",
    "header.getStarted": "ప్రారంభించండి",
    "hero.kicker": "స్మార్ట్ ప్రయాణాలు, ప్రశాంత ప్రణాళిక",
    "hero.title": "మీ అన్ని ప్రయాణ ప్రణాళికలకు ఒకే యాప్",
    "hero.description":
      "వివరమైన ప్రయాణ కార్యక్రమాలు సృష్టించండి, షేర్ చేసిన గైడ్లు చూడండి, ప్రతి స్టాప్ మ్యాప్ చేయండి మరియు బుకింగులను ఒకే చోట నిర్వహించండి.",
    "cta.startPlanning": "ప్రణాళిక ప్రారంభించండి",
    "cta.getApp": "యాప్ పొందండి",
    "cta.upgradePlanning": "ప్రణాళికను అప్గ్రేడ్ చేయండి",
    "stats.travelers": "Wanderlust తో ప్రయాణ ప్రణాళిక చేస్తున్న ప్రయాణికులు",
    "stats.countries": "గైడ్లలో మ్యాప్ చేసిన దేశాలు",
    "stats.rating": "సగటు ట్రిప్ ప్రణాళిక రేటింగ్",
    "map.eyebrow": "మ్యాప్-ఫస్ట్ ప్రణాళిక",
    "map.title": "మీ ప్రయాణ కార్యక్రమం మరియు మ్యాప్ ఒకే వీక్షణలో",
    "map.description":
      "ప్రయాణ ప్రణాళికల కోసం వేర్వేరు యాప్లు, ట్యాబ్లు మార్చాల్సిన అవసరం లేదు. రూట్లు, సేవ్ చేసిన చోటులు, ఉండే చోటు మరియు సమయాన్ని కలిపి ఉంచండి.",
    "map.item.schedules": "రోజువారీ షెడ్యూల్",
    "map.item.guides": "షేర్ చేసిన ప్రయాణ గైడ్లు",
    "map.item.bookings": "బుకింగ్ వివరాలు",
    "map.item.notes": "రూట్ నోట్స్",
    "stories.title": "ప్రయాణికులు ఏమి మెచ్చుకుంటున్నారు",
    "stories.description": "10 లక్షలకుపైగా మంది Wanderlust వాడి దాని సులభమైన ప్రణాళిక ఫీచర్లను ఇష్టపడ్డారు.",
    "stories.ratingLabel": "5 స్టార్ రేటింగ్",
    "testimonials.aarav.role": "ప్రయాణ బ్లాగర్",
    "testimonials.aarav.quote":
      "Wanderlust నా చెల్లాచెదురు నోట్లను ఒక శుభ్రమైన ప్రణాళికగా మార్చింది. బుకింగ్, మ్యాపింగ్, షేరింగ్ అన్నీ ఒకే చోట జరిగాయి.",
    "testimonials.mira.role": "సోలో ప్రయాణికురాలు",
    "testimonials.mira.quote":
      "మ్యాప్ వీక్షణతో ప్రతి రోజు సక్రమంగా కనిపిస్తుంది. హోటల్ నుంచి బయలుదేరే ముందు దగ్గర్లోని కేఫేలు, మ్యూజియంలు, బుకింగులు చూస్తాను.",
    "testimonials.kabir.role": "వీకెండ్ ప్రయాణికుడు",
    "testimonials.kabir.quote":
      "నేను నిమిషాల్లో మూడు నగరాల రూట్ ప్లాన్ చేశాను. గైడ్ సూచనలు సమయం ఆదా చేశాయి.",
    "features.eyebrow": "ఫీచర్లు",
    "features.title": "చెల్లాచెదురు ప్రయాణ టూల్స్ స్థానంలో ఒక శుభ్రమైన సిస్టమ్",
    "features.places.title": "ఒక క్లిక్తో చోటులు జోడించండి",
    "features.places.description": "రెస్టారెంట్లు, ల్యాండ్మార్క్లు, ఉండే చోటులు, స్థానిక టిప్స్ ప్లాన్లో సేవ్ చేయండి.",
    "features.maps.title": "మ్యాప్ తెరిచి ప్రణాళిక చేయండి",
    "features.maps.description": "ప్రతి స్టాప్, బుకింగ్, రూట్ ఒకేసారి చూడండి.",
    "features.itineraries.title": "వివరమైన ప్రయాణ కార్యక్రమాలు తయారు చేయండి",
    "features.itineraries.description": "రోజు, సమయం, నగరం, వర్గం ప్రకారం ప్రణాళికలు అమర్చండి.",
    "features.hotels.title": "హోటళ్ళు మరియు బుకింగులను ట్రాక్ చేయండి",
    "features.hotels.description": "ఉండే చోటు, కన్ఫర్మేషన్, చెక్-ఇన్, రిజర్వేషన్ వివరాలు దగ్గర ఉంచండి.",
    "features.weather.title": "గమ్యస్థానం వాతావరణం చూడండి",
    "features.weather.description": "ప్రతి స్టాప్ వాతావరణం ఆధారంగా సరైన కార్యకలాపాలు ఎంచుకోండి.",
    "features.tickets.title": "టికెట్లు మరియు నోట్స్ సేవ్ చేయండి",
    "features.tickets.description": "పాస్లు, ఆలోచనలు, PDFలు, రిమైండర్లు, నోట్స్ సరైన రోజుకు జోడించండి.",
    "press.eyebrow": "సిఫార్సు",
    "press.title": "ప్రెస్ సిఫార్సు చేసింది",
    "press.description": "ప్రయాణ రచయితలు మరియు నగర గైడ్ ఎడిటర్లు Wanderlust ఎందుకు ఎంచుకుంటారో తెలుసుకోండి.",
    "press.nomad": "మ్యాప్స్ మరియు షెడ్యూల్స్ కలిపి కావాలనుకునే ప్రయాణికులకు మెరుగైన ప్లానర్.",
    "press.cityTrails": "Wanderlust ట్రిప్ ప్రణాళికలో బిజీ భాగాలను ప్రశాంతంగా ఉంచుతుంది.",
    "press.routeWeekly": "సేవ్ చేసిన చోటులను నిజమైన ప్రయాణ రోజులుగా మార్చే ఉపయోగకరమైన మార్గం.",
    "press.travelDesk": "క్లిష్టమైన ట్రిప్లకు స్మార్ట్, వీకెండ్ ట్రిప్లకు సులభం.",
    "press.guidebook": "శుభ్రమైన సహకార టూల్స్ గ్రూప్ ప్రయాణాన్ని సులభం చేస్తాయి.",
    "press.meta": "ట్రిప్ ప్రణాళిక సమీక్ష",
    "pro.eyebrow": "Wanderlust Pro",
    "pro.title": "Pro తో మీ ప్రయాణ ప్రణాళికను మెరుగుపరచండి",
    "pro.description": "పెద్ద ప్రయాణాలు, తరచూ ప్రయాణం, గ్రూప్ ప్లానింగ్ కోసం మెరుగైన ఫీచర్లు పొందండి.",
    "pro.flights.title": "లైవ్ ఫ్లైట్ అప్డేట్స్",
    "pro.flights.description": "రోజు దెబ్బతినే ముందు ఫ్లైట్ స్థితి మరియు సమయ మార్పులు చూడండి.",
    "pro.offline.title": "ఆఫ్లైన్ యాక్సెస్",
    "pro.offline.description": "మ్యాప్, నోట్స్, రిజర్వేషన్లు అందుబాటులో ఉండేందుకు ప్లాన్లు డౌన్లోడ్ చేయండి.",
    "pro.gmail.title": "ఆటోమేటిక్ Gmail స్కానింగ్",
    "pro.gmail.description": "కన్ఫర్మేషన్లు వచ్చిన వెంటనే రిజర్వేషన్లు కార్యక్రమంలో సింక్ చేయండి.",
    "pro.routes.title": "ఆప్టిమైజ్డ్ రూట్లు",
    "pro.routes.description": "తిరిగి తిరిగి వెళ్లడం తగ్గేందుకు స్టాప్లను మంచి క్రమంలో అమర్చండి.",
    "pro.deals.title": "ఫ్లైట్ డీల్స్",
    "pro.deals.description": "మీ జాబితాలోని గమ్యస్థానానికి మంచి ధర వచ్చినప్పుడు అలర్ట్ పొందండి.",
    "pro.attachments.title": "అన్లిమిటెడ్ అటాచ్మెంట్లు",
    "pro.attachments.description": "టికెట్లు, PDFలు, హోటల్ నోట్స్, ఫైళ్ళను సరైన ప్లాన్ దగ్గర ఉంచండి.",
    "destinations.eyebrow": "తర్వాత అన్వేషించండి",
    "destinations.title": "ప్రయాణికులు ముందుగా ప్లాన్ చేసే ప్రసిద్ధ ప్రదేశాలు",
    "destinations.topCities": "టాప్ నగరాలు",
    "destinations.parks": "పార్కులు మరియు ప్రకృతి",
    "destinations.attractions": "ప్రసిద్ధ ఆకర్షణలు",
    "footer.description": "Sumit ప్రేమతో తయారు చేసింది. Copyright 2026 Travel Inc.",
    "footer.languageLabel": "భాష మార్చండి",
    "footer.activeLabel": "యాక్టివ్",
    "footer.companyTitle": "కంపెనీ",
    "footer.guideTitle": "గైడ్లు మరియు వనరులు",
    "footer.links.hotel": "హోటల్",
    "footer.links.blog": "బ్లాగ్",
    "footer.links.security": "సెక్యూరిటీ సమస్యను రిపోర్ట్ చేయండి",
    "footer.links.terms": "నిబంధనలు, గోప్యతా విధానం మరియు కాపీరైట్",
    "footer.links.contact": "సంప్రదించండి",
    "footer.guides.tripPlanners": "గమ్యస్థానం ప్రకారం ట్రిప్ ప్లానర్లు",
    "footer.guides.explore": "నగరాలు మరియు దేశాలు అన్వేషించండి",
    "footer.guides.roadTrips": "గమ్యస్థానం ప్రకారం రోడ్ ట్రిప్లు",
    "footer.guides.categories": "వర్గం ప్రకారం ఉత్తమ ప్రదేశాలు",
    "footer.guides.searchTerms": "గమ్యస్థానం ప్రకారం ప్రసిద్ధ శోధన పదాలు",
    "footer.guides.weather": "ప్రపంచ వాతావరణం",
    "footer.guides.questions": "ప్రయాణ ప్రశ్నలు మరియు సమాధానాలు",
    "footer.guides.itineraries": "ప్రయాణ కార్యక్రమ గైడ్లు",
    "footer.guides.maps": "నగరాలు మరియు జాతీయ పార్కుల మ్యాప్లు",
    "footer.guides.season": "సీజన్ ప్రకారం గమ్యస్థానాలు",
    "footer.guides.places": "గమ్యస్థానం ప్రకారం చూడాల్సిన ప్రదేశాలు",
  },
  kn: {
    "nav.home": "ಮುಖಪುಟ",
    "nav.destinations": "ಗಮ್ಯಸ್ಥಾನಗಳು",
    "nav.travelGuides": "ಪ್ರಯಾಣ ಮಾರ್ಗದರ್ಶಿಗಳು",
    "nav.whyUs": "ನಮ್ಮನ್ನು ಏಕೆ",
    "nav.hotel": "ಹೋಟೆಲ್",
    "nav.stories": "ಕಥೆಗಳು",
    "header.searchPlaceholder": "ಗಮ್ಯಸ್ಥಾನ ಹುಡುಕಿ",
    "header.login": "ಲಾಗಿನ್",
    "header.getStarted": "ಪ್ರಾರಂಭಿಸಿ",
    "hero.kicker": "ಸ್ಮಾರ್ಟ್ ಪ್ರಯಾಣ, ಶಾಂತ ಯೋಜನೆ",
    "hero.title": "ನಿಮ್ಮ ಎಲ್ಲ ಪ್ರಯಾಣ ಯೋಜನೆಗಳಿಗೆ ಒಂದೇ ಆಪ್",
    "hero.description":
      "ವಿಸ್ತೃತ ಪ್ರಯಾಣ ಯೋಜನೆಗಳನ್ನು ರಚಿಸಿ, ಹಂಚಿದ ಗೈಡ್ಗಳನ್ನು ನೋಡಿ, ಪ್ರತಿಯೊಂದು ನಿಲ್ದಾಣವನ್ನು ಮ್ಯಾಪ್ ಮಾಡಿ ಮತ್ತು ಬುಕಿಂಗ್ಸ್ ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ ನಿರ್ವಹಿಸಿ.",
    "cta.startPlanning": "ಯೋಜನೆ ಪ್ರಾರಂಭಿಸಿ",
    "cta.getApp": "ಆಪ್ ಪಡೆಯಿರಿ",
    "cta.upgradePlanning": "ಯೋಜನೆ ಅಪ್ಗ್ರೇಡ್ ಮಾಡಿ",
    "map.eyebrow": "ಮ್ಯಾಪ್-ಫಸ್ಟ್ ಯೋಜನೆ",
    "map.title": "ನಿಮ್ಮ ಪ್ರಯಾಣ ಯೋಜನೆ ಮತ್ತು ಮ್ಯಾಪ್ ಒಂದೇ ದೃಶ್ಯದಲ್ಲಿ",
    "stories.title": "ಪ್ರಯಾಣಿಕರು ಮೆಚ್ಚುತ್ತಿರುವುದು",
    "features.eyebrow": "ವೈಶಿಷ್ಟ್ಯಗಳು",
    "features.title": "ಅಸ್ತವ್ಯಸ್ತ ಪ್ರಯಾಣ ಟೂಲ್ಗಳ ಬದಲು ಒಂದು ಸ್ವಚ್ಛ ವ್ಯವಸ್ಥೆ",
    "press.eyebrow": "ಶಿಫಾರಸು",
    "press.title": "ಪ್ರೆಸ್ ಶಿಫಾರಸು ಮಾಡಿದೆ",
    "pro.title": "Pro ಜೊತೆ ನಿಮ್ಮ ಪ್ರಯಾಣ ಯೋಜನೆ ಹೆಚ್ಚಿಸಿ",
    "destinations.eyebrow": "ಮುಂದಿನದನ್ನು ಅನ್ವೇಷಿಸಿ",
    "destinations.title": "ಪ್ರಯಾಣಿಕರು ಮೊದಲು ಯೋಜಿಸುವ ಜನಪ್ರಿಯ ಸ್ಥಳಗಳು",
    "destinations.topCities": "ಪ್ರಮುಖ ನಗರಗಳು",
    "destinations.parks": "ಪಾರ್ಕ್ ಮತ್ತು ಪ್ರಕೃತಿ",
    "destinations.attractions": "ಜನಪ್ರಿಯ ಆಕರ್ಷಣೆಗಳು",
    "footer.description": "Sumit ಪ್ರೀತಿಯಿಂದ ನಿರ್ಮಿಸಲಾಗಿದೆ. Copyright 2026 Travel Inc.",
    "footer.languageLabel": "ಭಾಷೆ ಬದಲಿಸಿ",
    "footer.activeLabel": "ಸಕ್ರಿಯ",
    "footer.companyTitle": "ಕಂಪನಿ",
    "footer.guideTitle": "ಗೈಡ್ಗಳು ಮತ್ತು ಸಂಪನ್ಮೂಲಗಳು",
  },
  ml: {
    "nav.home": "ഹോം",
    "nav.destinations": "ലക്ഷ്യസ്ഥാനങ്ങൾ",
    "nav.travelGuides": "യാത്രാ ഗൈഡുകൾ",
    "nav.whyUs": "എന്തിന് ഞങ്ങൾ",
    "nav.hotel": "ഹോട്ടൽ",
    "nav.stories": "കഥകൾ",
    "header.searchPlaceholder": "ലക്ഷ്യസ്ഥാനം തിരയുക",
    "header.login": "ലോഗിൻ",
    "header.getStarted": "തുടങ്ങുക",
    "hero.kicker": "സ്മാർട്ട് യാത്രകൾ, ശാന്തമായ പ്ലാനിംഗ്",
    "hero.title": "നിങ്ങളുടെ എല്ലാ യാത്രാ പ്ലാനുകൾക്കും ഒരു ആപ്പ്",
    "hero.description":
      "വിശദമായ യാത്രാപദ്ധതികൾ ഉണ്ടാക്കുക, പങ്കിട്ട ഗൈഡുകൾ കാണുക, ഓരോ സ്റ്റോപ്പും മാപ്പിൽ ചേർക്കുക, ബുക്കിംഗുകൾ ഒരിടത്ത് കൈകാര്യം ചെയ്യുക.",
    "cta.startPlanning": "പ്ലാൻ തുടങ്ങുക",
    "cta.getApp": "ആപ്പ് നേടുക",
    "cta.upgradePlanning": "പ്ലാനിംഗ് അപ്ഗ്രേഡ് ചെയ്യുക",
    "map.eyebrow": "മാപ്പ്-ഫസ്റ്റ് പ്ലാനിംഗ്",
    "map.title": "നിങ്ങളുടെ യാത്രാപദ്ധതിയും മാപ്പും ഒരേ കാഴ്ചയിൽ",
    "stories.title": "യാത്രക്കാർ പ്രശംസിക്കുന്നത്",
    "features.eyebrow": "സവിശേഷതകൾ",
    "features.title": "ചിതറിച്ച യാത്രാ ടൂളുകൾക്ക് പകരം ഒരു വൃത്തിയുള്ള സംവിധാനം",
    "press.eyebrow": "ശുപാർശ",
    "press.title": "പ്രസ് ശുപാർശ ചെയ്തത്",
    "pro.title": "Pro ഉപയോഗിച്ച് നിങ്ങളുടെ യാത്രാ പ്ലാനിംഗ് മെച്ചപ്പെടുത്തുക",
    "destinations.eyebrow": "അടുത്തത് അന്വേഷിക്കുക",
    "destinations.title": "യാത്രക്കാർ ആദ്യം പ്ലാൻ ചെയ്യുന്ന ജനപ്രിയ സ്ഥലങ്ങൾ",
    "destinations.topCities": "മുൻനിര നഗരങ്ങൾ",
    "destinations.parks": "പാർക്കും പ്രകൃതിയും",
    "destinations.attractions": "ജനപ്രിയ ആകർഷണങ്ങൾ",
    "footer.description": "Sumit സ്നേഹത്തോടെ നിർമ്മിച്ചത്. Copyright 2026 Travel Inc.",
    "footer.languageLabel": "ഭാഷ മാറ്റുക",
    "footer.activeLabel": "സജീവം",
    "footer.companyTitle": "കമ്പനി",
    "footer.guideTitle": "ഗൈഡുകളും വിഭവങ്ങളും",
  },
  or: {
    "nav.home": "ହୋମ",
    "nav.destinations": "ଗନ୍ତବ୍ୟ",
    "nav.travelGuides": "ଭ୍ରମଣ ଗାଇଡ",
    "nav.whyUs": "ଆମେ କାହିଁକି",
    "nav.hotel": "ହୋଟେଲ",
    "nav.stories": "କାହାଣୀ",
    "header.searchPlaceholder": "ଗନ୍ତବ୍ୟ ଖୋଜନ୍ତୁ",
    "header.login": "ଲଗଇନ",
    "header.getStarted": "ଆରମ୍ଭ କରନ୍ତୁ",
    "hero.kicker": "ସ୍ମାର୍ଟ ଯାତ୍ରା, ଶାନ୍ତ ପ୍ଲାନିଂ",
    "hero.title": "ଆପଣଙ୍କ ସମସ୍ତ ଭ୍ରମଣ ଯୋଜନା ପାଇଁ ଗୋଟିଏ ଆପ",
    "hero.description":
      "ବିସ୍ତୃତ ଯାତ୍ରା ସୂଚୀ ତିଆରି କରନ୍ତୁ, ସେୟାର ଗାଇଡ ଦେଖନ୍ତୁ, ପ୍ରତ୍ୟେକ ସ୍ଟପକୁ ମ୍ୟାପ କରନ୍ତୁ ଏବଂ ବୁକିଂକୁ ଗୋଟିଏ ସ୍ଥାନରେ ରଖନ୍ତୁ.",
    "cta.startPlanning": "ପ୍ଲାନିଂ ଆରମ୍ଭ କରନ୍ତୁ",
    "cta.getApp": "ଆପ ପାଆନ୍ତୁ",
    "cta.upgradePlanning": "ପ୍ଲାନିଂ ଅପଗ୍ରେଡ କରନ୍ତୁ",
    "map.eyebrow": "ମ୍ୟାପ-ଫର୍ଷ୍ଟ ପ୍ଲାନିଂ",
    "map.title": "ଆପଣଙ୍କ ଯାତ୍ରା ସୂଚୀ ଏବଂ ମ୍ୟାପ ଏକେ ଭ୍ୟୁରେ",
    "stories.title": "ଯାତ୍ରୀମାନେ କଣ ପସନ୍ଦ କରୁଛନ୍ତି",
    "features.eyebrow": "ଫିଚର",
    "features.title": "ଅବ୍ୟବସ୍ଥିତ ଟ୍ରାଭେଲ ଟୁଲ୍ସ ବଦଳରେ ଏକ ସଫା ସିଷ୍ଟମ",
    "press.eyebrow": "ସୁପାରିଶ",
    "press.title": "ପ୍ରେସ ଦ୍ୱାରା ସୁପାରିଶ",
    "pro.title": "Pro ସହ ଆପଣଙ୍କ ଟ୍ରିପ ପ୍ଲାନିଂକୁ ଉନ୍ନତ କରନ୍ତୁ",
    "destinations.eyebrow": "ପରବର୍ତ୍ତୀ ଖୋଜନ୍ତୁ",
    "destinations.title": "ଯାତ୍ରୀମାନେ ପ୍ରଥମେ ପ୍ଲାନ କରୁଥିବା ଲୋକପ୍ରିୟ ସ୍ଥାନ",
    "destinations.topCities": "ଶୀର୍ଷ ସହର",
    "destinations.parks": "ପାର୍କ ଏବଂ ପ୍ରକୃତି",
    "destinations.attractions": "ଲୋକପ୍ରିୟ ଆକର୍ଷଣ",
    "footer.description": "Sumit ଙ୍କ ଭଲପାଇବାରେ ତିଆରି. Copyright 2026 Travel Inc.",
    "footer.languageLabel": "ଭାଷା ବଦଳାନ୍ତୁ",
    "footer.activeLabel": "ସକ୍ରିୟ",
    "footer.companyTitle": "କମ୍ପାନୀ",
    "footer.guideTitle": "ଗାଇଡ ଏବଂ ସମ୍ପଦ",
  },
  as: {
    "nav.home": "হোম",
    "nav.destinations": "গন্তব্য",
    "nav.travelGuides": "ভ্ৰমণ গাইড",
    "nav.whyUs": "আমাক কিয়",
    "nav.hotel": "হোটেল",
    "nav.stories": "কাহিনী",
    "header.searchPlaceholder": "গন্তব্য বিচাৰক",
    "header.login": "লগইন",
    "header.getStarted": "আৰম্ভ কৰক",
    "hero.kicker": "স্মাৰ্ট ভ্ৰমণ, শান্ত পৰিকল্পনা",
    "hero.title": "আপোনাৰ সকলো ভ্ৰমণ পৰিকল্পনাৰ বাবে এটা এপ",
    "hero.description":
      "বিস্তৃত ভ্ৰমণসূচী বনাওক, শ্বেয়াৰ কৰা গাইড চাওক, প্ৰতিটো স্থান মেপ কৰক আৰু বুকিং একে ঠাইতে ৰাখক.",
    "cta.startPlanning": "পৰিকল্পনা আৰম্ভ কৰক",
    "cta.getApp": "এপ লওক",
    "cta.upgradePlanning": "পৰিকল্পনা উন্নত কৰক",
    "map.eyebrow": "মেপ-প্ৰথম পৰিকল্পনা",
    "map.title": "আপোনাৰ ভ্ৰমণসূচী আৰু মেপ একে দৃশ্যত",
    "stories.title": "ভ্ৰমণকাৰীয়ে যি ভাল পাইছে",
    "features.eyebrow": "বৈশিষ্ট্য",
    "features.title": "অগোছাল ভ্ৰমণ টুলৰ সলনি এটা পৰিষ্কাৰ ব্যৱস্থা",
    "press.eyebrow": "পৰামৰ্শ",
    "press.title": "প্ৰেছৰ পৰামৰ্শ",
    "pro.title": "Pro ৰে আপোনাৰ ভ্ৰমণ পৰিকল্পনা উন্নত কৰক",
    "destinations.eyebrow": "পিছৰটো অন্বেষণ কৰক",
    "destinations.title": "ভ্ৰমণকাৰীয়ে প্ৰথমে পৰিকল্পনা কৰা জনপ্ৰিয় স্থান",
    "destinations.topCities": "শীৰ্ষ চহৰ",
    "destinations.parks": "উদ্যান আৰু প্ৰকৃতি",
    "destinations.attractions": "জনপ্ৰিয় আকৰ্ষণ",
    "footer.description": "Sumit ৰ যত্নেৰে নিৰ্মিত. Copyright 2026 Travel Inc.",
    "footer.languageLabel": "ভাষা সলনি কৰক",
    "footer.activeLabel": "সক্ৰিয়",
    "footer.companyTitle": "কোম্পানী",
    "footer.guideTitle": "গাইড আৰু সম্পদ",
  },
  ne: {
    "nav.home": "होम",
    "nav.destinations": "गन्तव्यहरू",
    "nav.travelGuides": "यात्रा गाइड",
    "nav.whyUs": "हामी किन",
    "nav.hotel": "होटल",
    "nav.stories": "कथाहरू",
    "header.searchPlaceholder": "गन्तव्य खोज्नुहोस्",
    "header.login": "लगइन",
    "header.getStarted": "सुरु गर्नुहोस्",
    "hero.kicker": "स्मार्ट यात्रा, शान्त योजना",
    "hero.title": "तपाईंका सबै यात्रा योजनाका लागि एउटै एप",
    "hero.description":
      "विस्तृत यात्रा तालिका बनाउनुहोस्, साझा गाइड हेर्नुहोस्, हरेक स्टप म्याप गर्नुहोस् र बुकिङ एउटै ठाउँमा मिलाउनुहोस्.",
    "cta.startPlanning": "योजना सुरु गर्नुहोस्",
    "cta.getApp": "एप लिनुहोस्",
    "cta.upgradePlanning": "योजना अपग्रेड गर्नुहोस्",
    "map.eyebrow": "म्याप-फर्स्ट योजना",
    "map.title": "तपाईंको यात्रा तालिका र म्याप एउटै दृश्यमा",
    "stories.title": "यात्रीहरूले मन पराएको कुरा",
    "features.eyebrow": "सुविधाहरू",
    "features.title": "छरिएका यात्रा टुलहरूको सट्टा सफा प्रणाली",
    "press.eyebrow": "सिफारिस",
    "press.title": "प्रेसबाट सिफारिस",
    "pro.title": "Pro सँग आफ्नो यात्रा योजना बढाउनुहोस्",
    "destinations.eyebrow": "अर्को अन्वेषण गर्नुहोस्",
    "destinations.title": "यात्रीहरूले पहिले योजना बनाउने लोकप्रिय ठाउँहरू",
    "destinations.topCities": "शीर्ष शहरहरू",
    "destinations.parks": "पार्क र प्रकृति",
    "destinations.attractions": "लोकप्रिय आकर्षणहरू",
    "footer.description": "Sumit द्वारा मायासाथ बनाइएको. Copyright 2026 Travel Inc.",
    "footer.languageLabel": "भाषा परिवर्तन गर्नुहोस्",
    "footer.activeLabel": "सक्रिय",
    "footer.companyTitle": "कम्पनी",
    "footer.guideTitle": "गाइड र स्रोतहरू",
  },
};

const supportedTranslationCodes = new Set(Object.keys(translations));
const translationFallbacks: Record<string, string> = {
  kha: "en",
  kok: "mr",
  ks: "hi",
  lus: "en",
  mni: "hi",
  trp: "bn",
};

const getTranslationCode = (code: string) => {
  if (supportedTranslationCodes.has(code)) {
    return code;
  }

  return translationFallbacks[code] ?? "en";
};

const indianStateLanguages = [
  { id: "india-en", region: "India", language: "English", nativeName: "English", i18nCode: "en" },
  {
    id: "andhra-pradesh-te",
    region: "Andhra Pradesh",
    language: "Telugu",
    nativeName: "తెలుగు",
    i18nCode: "te",
  },
  {
    id: "arunachal-pradesh-en",
    region: "Arunachal Pradesh",
    language: "English",
    nativeName: "English",
    i18nCode: "en",
  },
  {
    id: "assam-as",
    region: "Assam",
    language: "Assamese",
    nativeName: "অসমীয়া",
    i18nCode: "as",
  },
  { id: "bihar-hi", region: "Bihar", language: "Hindi", nativeName: "हिन्दी", i18nCode: "hi" },
  {
    id: "chhattisgarh-hi",
    region: "Chhattisgarh",
    language: "Hindi",
    nativeName: "हिन्दी",
    i18nCode: "hi",
  },
  { id: "goa-kok", region: "Goa", language: "Konkani", nativeName: "कोंकणी", i18nCode: "kok" },
  {
    id: "gujarat-gu",
    region: "Gujarat",
    language: "Gujarati",
    nativeName: "ગુજરાતી",
    i18nCode: "gu",
  },
  { id: "haryana-hi", region: "Haryana", language: "Hindi", nativeName: "हिन्दी", i18nCode: "hi" },
  {
    id: "himachal-pradesh-hi",
    region: "Himachal Pradesh",
    language: "Hindi",
    nativeName: "हिन्दी",
    i18nCode: "hi",
  },
  {
    id: "jharkhand-hi",
    region: "Jharkhand",
    language: "Hindi",
    nativeName: "हिन्दी",
    i18nCode: "hi",
  },
  {
    id: "karnataka-kn",
    region: "Karnataka",
    language: "Kannada",
    nativeName: "ಕನ್ನಡ",
    i18nCode: "kn",
  },
  {
    id: "kerala-ml",
    region: "Kerala",
    language: "Malayalam",
    nativeName: "മലയാളം",
    i18nCode: "ml",
  },
  {
    id: "madhya-pradesh-hi",
    region: "Madhya Pradesh",
    language: "Hindi",
    nativeName: "हिन्दी",
    i18nCode: "hi",
  },
  {
    id: "maharashtra-mr",
    region: "Maharashtra",
    language: "Marathi",
    nativeName: "मराठी",
    i18nCode: "mr",
  },
  {
    id: "manipur-mni",
    region: "Manipur",
    language: "Manipuri",
    nativeName: "ꯃꯤꯇꯩꯂꯣꯟ",
    i18nCode: "mni",
  },
  {
    id: "meghalaya-kha",
    region: "Meghalaya",
    language: "Khasi",
    nativeName: "Khasi",
    i18nCode: "kha",
  },
  { id: "mizoram-lus", region: "Mizoram", language: "Mizo", nativeName: "Mizo", i18nCode: "lus" },
  {
    id: "nagaland-en",
    region: "Nagaland",
    language: "English",
    nativeName: "English",
    i18nCode: "en",
  },
  { id: "odisha-or", region: "Odisha", language: "Odia", nativeName: "ଓଡ଼ିଆ", i18nCode: "or" },
  {
    id: "punjab-pa",
    region: "Punjab",
    language: "Punjabi",
    nativeName: "ਪੰਜਾਬੀ",
    i18nCode: "pa",
  },
  {
    id: "rajasthan-hi",
    region: "Rajasthan",
    language: "Hindi",
    nativeName: "हिन्दी",
    i18nCode: "hi",
  },
  {
    id: "sikkim-ne",
    region: "Sikkim",
    language: "Nepali",
    nativeName: "नेपाली",
    i18nCode: "ne",
  },
  {
    id: "tamil-nadu-ta",
    region: "Tamil Nadu",
    language: "Tamil",
    nativeName: "தமிழ்",
    i18nCode: "ta",
  },
  {
    id: "telangana-te",
    region: "Telangana",
    language: "Telugu",
    nativeName: "తెలుగు",
    i18nCode: "te",
  },
  {
    id: "tripura-trp",
    region: "Tripura",
    language: "Kokborok",
    nativeName: "Kokborok",
    i18nCode: "trp",
  },
  {
    id: "uttar-pradesh-hi",
    region: "Uttar Pradesh",
    language: "Hindi",
    nativeName: "हिन्दी",
    i18nCode: "hi",
  },
  {
    id: "uttarakhand-hi",
    region: "Uttarakhand",
    language: "Hindi",
    nativeName: "हिन्दी",
    i18nCode: "hi",
  },
  {
    id: "west-bengal-bn",
    region: "West Bengal",
    language: "Bengali",
    nativeName: "বাংলা",
    i18nCode: "bn",
  },
  {
    id: "andaman-nicobar-hi",
    region: "Andaman and Nicobar Islands",
    language: "Hindi",
    nativeName: "हिन्दी",
    i18nCode: "hi",
  },
  {
    id: "chandigarh-en",
    region: "Chandigarh",
    language: "English",
    nativeName: "English",
    i18nCode: "en",
  },
  {
    id: "dadra-daman-gu",
    region: "Dadra and Nagar Haveli and Daman and Diu",
    language: "Gujarati",
    nativeName: "ગુજરાતી",
    i18nCode: "gu",
  },
  {
    id: "delhi-hi",
    region: "Delhi",
    language: "Hindi",
    nativeName: "हिन्दी",
    i18nCode: "hi",
  },
  {
    id: "jammu-kashmir-ks",
    region: "Jammu and Kashmir",
    language: "Kashmiri",
    nativeName: "کٲشُر",
    i18nCode: "ks",
  },
  { id: "ladakh-hi", region: "Ladakh", language: "Hindi", nativeName: "हिन्दी", i18nCode: "hi" },
  {
    id: "lakshadweep-ml",
    region: "Lakshadweep",
    language: "Malayalam",
    nativeName: "മലയാളം",
    i18nCode: "ml",
  },
  {
    id: "puducherry-ta",
    region: "Puducherry",
    language: "Tamil",
    nativeName: "தமிழ்",
    i18nCode: "ta",
  },
];

const Dashbord = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedLanguageId, setSelectedLanguageId] = useState(() => {
    const savedLanguageId = window.localStorage.getItem("wanderlust-language");

    return savedLanguageId &&
      indianStateLanguages.some((language) => language.id === savedLanguageId)
      ? savedLanguageId
      : indianStateLanguages[0].id;
  });

  const selectedLanguage =
    indianStateLanguages.find((language) => language.id === selectedLanguageId) ??
    indianStateLanguages[0];
  const translationCode = getTranslationCode(selectedLanguage.i18nCode);
  const t = (key: string) => translations[translationCode]?.[key] ?? translations.en[key] ?? key;

  useEffect(() => {
    document.documentElement.lang = selectedLanguage.i18nCode;
    window.localStorage.setItem("wanderlust-language", selectedLanguage.id);
    void i18n.changeLanguage(translationCode);
  }, [selectedLanguage, translationCode]);

  const openAuthModal = (mode: AuthMode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguageId(event.target.value);
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <a href="#home" className="flex items-center gap-2" aria-label="Wanderlust home">
              <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Globe2 className="size-5" />
              </span>
              <span className="text-xl font-bold">Wanderlust</span>
            </a>

            <nav className="hidden items-center gap-6 text-sm font-medium text-foreground/75 lg:flex">
              {navItems.map((item) => (
                <a
                  key={item.labelKey}
                  href={item.href}
                  className="transition hover:text-foreground"
                >
                  {t(item.labelKey)}
                </a>
              ))}
            </nav>

            <div className="hidden min-w-64 items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground md:flex">
              <Search className="size-4" />
              <input
                type="search"
                placeholder={t("header.searchPlaceholder")}
                className="w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Toggle theme"
                aria-pressed={isDarkMode}
                onClick={() => setIsDarkMode((current) => !current)}
                className="inline-flex size-10 items-center justify-center rounded-md border border-border bg-background text-foreground transition hover:bg-muted"
              >
                {isDarkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </button>
              <button
                type="button"
                onClick={() => openAuthModal("signin")}
                className="hidden rounded-md px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-muted sm:inline-flex"
              >
                {t("header.login")}
              </button>
              <button
                type="button"
                onClick={() => openAuthModal("signup")}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
              >
                {t("header.getStarted")}
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </header>

        <main>
          <section
            id="home"
            className="relative isolate flex min-h-[76svh] items-end overflow-hidden bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80')",
            }}
          >
            <div className="absolute inset-0 -z-10 bg-black/55" />
            <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 pb-14 pt-24 text-white sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
              <div className="max-w-3xl">
                <p className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/15 px-3 py-1 text-sm font-medium backdrop-blur">
                  <Sparkles className="size-4" />
                  {t("hero.kicker")}
                </p>
                <h1 className="max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                  {t("hero.title")}
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
                  {t("hero.description")}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => openAuthModal("signup")}
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-lg transition hover:bg-primary/90"
                  >
                    {t("cta.startPlanning")}
                    <ArrowRight className="size-4" />
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-md border border-white/35 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
                  >
                    {t("cta.getApp")}
                    <Download className="size-4" />
                  </button>
                </div>
              </div>

              <div className="grid gap-3 self-end sm:grid-cols-3 lg:grid-cols-1">
                {stats.map((stat) => (
                  <div
                    key={stat.labelKey}
                    className="rounded-lg border border-white/20 bg-white/12 p-4 backdrop-blur"
                  >
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="mt-1 text-sm leading-5 text-white/75">{t(stat.labelKey)}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="why-us" className="border-b border-border bg-background py-16 sm:py-20">
            <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
              <div>
                <p className="text-sm font-semibold uppercase text-primary">{t("map.eyebrow")}</p>
                <h2 className="mt-3 max-w-xl text-3xl font-bold leading-tight sm:text-4xl">
                  {t("map.title")}
                </h2>
                <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
                  {t("map.description")}
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    "map.item.schedules",
                    "map.item.guides",
                    "map.item.bookings",
                    "map.item.notes",
                  ].map((itemKey) => (
                      <div key={itemKey} className="flex items-center gap-3 text-sm font-medium">
                        <CheckCircle2 className="size-5 text-primary" />
                        {t(itemKey)}
                      </div>
                    ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-lg border border-border bg-card shadow-xl">
                <div className="aspect-video bg-muted">
                  <ReactPlayer
                    src="https://www.youtube.com/shorts/XJeOMVJr1Cc"
                    controls
                    width="100%"
                    height="100%"
                  />
                </div>
              </div>
            </div>
          </section>

          <section id="stories" className="bg-secondary/50 py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                  {t("stories.title")}
                </h2>
                <p className="mt-4 text-lg leading-7 text-muted-foreground">
                  {t("stories.description")}
                </p>
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {testimonials.map((testimonial) => (
                  <article
                    key={testimonial.name}
                    className="rounded-lg border border-border bg-card p-6 shadow-sm"
                  >
                    <div className="flex gap-1 text-primary" aria-label={t("stories.ratingLabel")}>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className="size-4 fill-current" />
                      ))}
                    </div>
                    <p className="mt-5 leading-7 text-card-foreground">
                      "{t(testimonial.quoteKey)}"
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="flex size-11 items-center justify-center rounded-md bg-accent font-bold text-accent-foreground">
                        {testimonial.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{t(testimonial.roleKey)}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="travel-guides" className="bg-background py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div className="max-w-2xl">
                  <p className="text-sm font-semibold uppercase text-primary">
                    {t("features.eyebrow")}
                  </p>
                  <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                    {t("features.title")}
                  </h2>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => openAuthModal("signup")}
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition hover:bg-primary/90"
                  >
                    {t("cta.startPlanning")}
                    <ArrowRight className="size-4" />
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-bold transition hover:bg-muted"
                  >
                    {t("cta.getApp")}
                    <Download className="size-4" />
                  </button>
                </div>
              </div>

              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <article
                      key={feature.titleKey}
                      className="rounded-lg border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                      <div className="flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </div>
                      <h3 className="mt-5 text-lg font-bold">{t(feature.titleKey)}</h3>
                      <p className="mt-3 leading-7 text-muted-foreground">
                        {t(feature.descriptionKey)}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="border-y border-border bg-muted/45 py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm font-semibold uppercase text-primary">{t("press.eyebrow")}</p>
                <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                  {t("press.title")}
                </h2>
                <p className="mt-4 text-muted-foreground">
                  {t("press.description")}
                </p>
              </div>

              <Carousel
                opts={{
                  align: "start",
                }}
                className="mx-auto mt-10 w-full max-w-5xl"
              >
                <CarouselContent>
                  {pressMentions.map((mention) => (
                    <CarouselItem key={mention.source} className="md:basis-1/2 lg:basis-1/3">
                      <div className="h-full p-1">
                        <Card className="h-full rounded-lg">
                          <CardContent className="flex h-full flex-col justify-between gap-8 p-6">
                            <p className="text-lg font-semibold leading-7">
                              {t(mention.titleKey)}
                            </p>
                            <div>
                              <p className="text-sm font-bold text-primary">{mention.source}</p>
                              <p className="mt-1 text-sm text-muted-foreground">
                                {t("press.meta")}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:inline-flex" />
                <CarouselNext className="hidden sm:inline-flex" />
              </Carousel>
            </div>
          </section>

          <section className="bg-background py-16 sm:py-20">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
              <div>
                <p className="text-sm font-semibold uppercase text-primary">{t("pro.eyebrow")}</p>
                <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                  {t("pro.title")}
                </h2>
                <p className="mt-4 leading-7 text-muted-foreground">
                  {t("pro.description")}
                </p>
                <button
                  type="button"
                  onClick={() => openAuthModal("signup")}
                  className="mt-8 inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-bold text-background transition hover:bg-foreground/90"
                >
                  {t("cta.upgradePlanning")}
                  <Sparkles className="size-4" />
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {proFeatures.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <article
                      key={feature.titleKey}
                      className="rounded-lg border border-border bg-card p-5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-md bg-accent text-accent-foreground">
                          <Icon className="size-5" />
                        </div>
                        <h3 className="font-bold">{t(feature.titleKey)}</h3>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        {t(feature.descriptionKey)}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section id="destinations" className="bg-secondary/50 py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase text-primary">
                  {t("destinations.eyebrow")}
                </p>
                <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                  {t("destinations.title")}
                </h2>
              </div>

              <div className="mt-10 grid gap-5 lg:grid-cols-3">
                {destinationGroups.map((group) => (
                  <div key={group.titleKey} className="rounded-lg border border-border bg-card p-6">
                    <h3 className="font-bold">{t(group.titleKey)}</h3>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {group.places.map((place) => (
                        <a
                          key={place}
                          href="#home"
                          className="rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition hover:border-primary hover:text-primary"
                        >
                          {place}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-border bg-foreground text-background">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_0.7fr_1.4fr] lg:px-8">
            <section>
              <div className="flex items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Globe2 className="size-5" />
                </span>
                <h2 className="text-xl font-bold">Wanderlust</h2>
              </div>
              <p className="mt-5 max-w-sm text-sm leading-6 text-background/70">
                {t("footer.description")}
              </p>
              <div className="mt-5 max-w-sm">
                <label
                  htmlFor="footer-language"
                  className="mb-2 flex items-center gap-2 text-sm font-medium text-background/80"
                >
                  <Globe2 className="size-4" />
                  {t("footer.languageLabel")}
                </label>
                <select
                  id="footer-language"
                  value={selectedLanguageId}
                  onChange={handleLanguageChange}
                  className="w-full rounded-md border border-background/20 bg-background px-3 py-2 text-sm font-medium text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40"
                >
                  {indianStateLanguages.map((language) => (
                    <option key={language.id} value={language.id}>
                      {language.region} - {language.nativeName} ({language.language})
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-xs leading-5 text-background/60">
                  {t("footer.activeLabel")}: {selectedLanguage.region} -{" "}
                  {selectedLanguage.nativeName}
                </p>
              </div>
            </section>

            <section>
              <h3 className="font-semibold">{t("footer.companyTitle")}</h3>
              <div className="mt-4 grid gap-3 text-sm text-background/70">
                {footerLinks.map((link) => (
                  <a key={link} href="#home" className="transition hover:text-background">
                    {t(link)}
                  </a>
                ))}
              </div>
            </section>

            <section>
              <h3 className="font-semibold">{t("footer.guideTitle")}</h3>
              <div className="mt-4 grid gap-x-5 gap-y-3 text-sm text-background/70 sm:grid-cols-2">
                {guideLinks.map((link) => (
                  <a key={link} href="#home" className="transition hover:text-background">
                    {t(link)}
                  </a>
                ))}
              </div>
            </section>
          </div>
        </footer>

        {isAuthOpen ? (
          <AuthModal defaultMode={authMode} onClose={() => setIsAuthOpen(false)} />
        ) : null}
      </div>
    </div>
  );
};

export default Dashbord;
