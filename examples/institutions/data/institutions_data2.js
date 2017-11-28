const institutionsArrayInput = [
  {
    "id": 0,
    "country": "usa",
    "city": "columbus",
    "name": "Pearson Education",
    "state": "oh",
    "zipcode": 43235,
    "date": "4/9/2015"
  },
  {
    "id": 1,
    "country": "usa",
    "city": "menifee",
    "name": "mt san jacinto-menifee",
    "state": "ca",
    "zipcode": 92584,
    "date": ""
  },
  {
    "id": 2,
    "country": "usa",
    "city": "redwood city",
    "name": "canada college",
    "state": "ca",
    "zipcode": 94061,
    "date": ""
  },
  {
    "id": 3,
    "country": "usa",
    "city": "santa ana",
    "name": "santa ana college",
    "state": "ca",
    "zipcode": 92706,
    "date": ""
  },
  {
    "id": 4,
    "country": "usa",
    "city": "panama city",
    "name": "gulf coast state college",
    "state": "fl",
    "zipcode": "32401-1041",
    "date": ""
  },
  {
    "id": 5,
    "country": "usa",
    "city": "mount berry",
    "name": "berry college",
    "state": "ga",
    "zipcode": 30149,
    "date": ""
  },
  {
    "id": 6,
    "country": "usa",
    "city": "kahului maui",
    "name": "univ of hawaii maui college",
    "state": "hi",
    "zipcode": 96732,
    "date": ""
  },
  {
    "id": 7,
    "country": "usa",
    "city": "marion",
    "name": "indiana wesleyan u",
    "state": "in",
    "zipcode": 46953,
    "date": ""
  },
  {
    "id": 8,
    "country": "usa",
    "city": "newport",
    "name": "northern kentucky univ",
    "state": "ky",
    "zipcode": 41099,
    "date": ""
  },
  {
    "id": 9,
    "country": "usa",
    "city": "madison",
    "name": "north florida comm coll",
    "state": "fl",
    "zipcode": "32340-1611",
    "date": "8/23/2017"
  },
  {
    "id": 10,
    "country": "usa",
    "city": "dade city",
    "name": "pasco hernando st coll - east",
    "state": "fl",
    "zipcode": 33525,
    "date": "8/23/2017"
  },
  {
    "id": 11,
    "country": "usa",
    "city": "monticello",
    "name": "u of arkansas at monticello",
    "state": "ar",
    "zipcode": 71655,
    "date": "8/23/2017"
  },
  {
    "id": 12,
    "country": "usa",
    "city": "wesson",
    "name": "copiah-lincoln cc-wesson",
    "state": "ms",
    "zipcode": "39191-0649",
    "date": "8/23/2017"
  },
  {
    "id": 13,
    "country": "usa",
    "city": "bismarck",
    "name": "north dakota university system",
    "state": "nd",
    "zipcode": 58505,
    "date": "8/23/2017"
  },
  {
    "id": 14,
    "country": "usa",
    "city": "moberly",
    "name": "moberly area comm college",
    "state": "mo",
    "zipcode": "65270-1304",
    "date": "8/23/2017"
  },
  {
    "id": 15,
    "country": "usa",
    "city": "albuquerque",
    "name": "univ of new mexico",
    "state": "nm",
    "zipcode": 87131,
    "date": "8/23/2017"
  },
  {
    "id": 16,
    "country": "usa",
    "city": "spartanburg",
    "name": "spartanburg methodist coll",
    "state": "sc",
    "zipcode": 29301,
    "date": "8/23/2017"
  },
  {
    "id": 17,
    "country": "usa",
    "city": "long beach",
    "name": "cal state u - long beach",
    "state": "ca",
    "zipcode": 90840,
    "date": "8/23/2017"
  },
  {
    "id": 18,
    "country": "usa",
    "city": "nashville",
    "name": "belmont university",
    "state": "tn",
    "zipcode": "37212-3758",
    "date": "8/23/2017"
  },
  {
    "id": 19,
    "country": "usa",
    "city": "asheville",
    "name": "univ of nc - asheville",
    "state": "nc",
    "zipcode": "28804-3024",
    "date": "8/23/2017"
  },
  {
    "id": 20,
    "country": "usa",
    "city": "chattanooga",
    "name": "univ of tenn-chattanooga",
    "state": "tn",
    "zipcode": "37403-2504",
    "date": "8/23/2017"
  },
  {
    "id": 21,
    "country": "usa",
    "city": "kennesaw",
    "name": "kennesaw state university",
    "state": "ga",
    "zipcode": "30144-5588",
    "date": "8/23/2017"
  },
  {
    "id": 22,
    "country": "usa",
    "city": "greenville",
    "name": "east carolina univ",
    "state": "nc",
    "zipcode": 27858,
    "date": "8/23/2017"
  },
  {
    "id": 23,
    "country": "usa",
    "city": "san antonio",
    "name": "univ of texas - san antonio",
    "state": "tx",
    "zipcode": 78249,
    "date": "8/23/2017"
  },
  {
    "id": 24,
    "country": "usa",
    "city": "boise",
    "name": "boise state university",
    "state": "id",
    "zipcode": 83725,
    "date": "8/23/2017"
  },
  {
    "id": 25,
    "country": "usa",
    "city": "tulsa",
    "name": "tulsa comm coll-metro cmps",
    "state": "ok",
    "zipcode": 74119,
    "date": "8/23/2017"
  },
  {
    "id": 26,
    "country": "usa",
    "city": "winter haven",
    "name": "polk state coll - winter haven",
    "state": "fl",
    "zipcode": 33881,
    "date": "8/23/2017"
  },
  {
    "id": 27,
    "country": "usa",
    "city": "cedar falls",
    "name": "university of northern iowa",
    "state": "ia",
    "zipcode": "50614-0012",
    "date": "8/23/2017"
  },
  {
    "id": 28,
    "country": "usa",
    "city": "hillsboro",
    "name": "hill college - hillsboro campu",
    "state": "tx",
    "zipcode": 76645,
    "date": "8/23/2017"
  },
  {
    "id": 29,
    "country": "usa",
    "city": "charlotte",
    "name": "univ of nc - charlotte",
    "state": "nc",
    "zipcode": "28223-0001",
    "date": "8/23/2017"
  },
  {
    "id": 30,
    "country": "usa",
    "city": "baton rouge",
    "name": "louisiana state university",
    "state": "la",
    "zipcode": 70803,
    "date": "8/23/2017"
  },
  {
    "id": 31,
    "country": "usa",
    "city": "charlotte",
    "name": "ctrl piedmont cc - e 7th st",
    "state": "nc",
    "zipcode": "28204-2019",
    "date": "8/23/2017"
  },
  {
    "id": 32,
    "country": "usa",
    "city": "cedar rapids",
    "name": "kirkwood community college",
    "state": "ia",
    "zipcode": "52404-5260",
    "date": "8/23/2017"
  },
  {
    "id": 33,
    "country": "usa",
    "city": "chapel hill",
    "name": "univ of nc - chapel hill",
    "state": "nc",
    "zipcode": 27599,
    "date": "8/23/2017"
  },
  {
    "id": 34,
    "country": "usa",
    "city": "alexandria",
    "name": "no virginia cc - alexandria",
    "state": "va",
    "zipcode": 22311,
    "date": "8/23/2017"
  },
  {
    "id": 35,
    "country": "usa",
    "city": "fayetteville",
    "name": "fayetteville tech comm coll",
    "state": "nc",
    "zipcode": "28303-4761",
    "date": "8/23/2017"
  },
  {
    "id": 36,
    "country": "usa",
    "city": "coral gables",
    "name": "university of miami",
    "state": "fl",
    "zipcode": "33146-2440",
    "date": "8/23/2017"
  },
  {
    "id": 37,
    "country": "usa",
    "city": "chula vista",
    "name": "southwestern college",
    "state": "ca",
    "zipcode": 91910,
    "date": "8/23/2017"
  },
  {
    "id": 38,
    "country": "usa",
    "city": "boca raton",
    "name": "florida atlantic university",
    "state": "fl",
    "zipcode": "33431-6424",
    "date": "8/23/2017"
  },
  {
    "id": 39,
    "country": "usa",
    "city": "clemson",
    "name": "clemson university",
    "state": "sc",
    "zipcode": 29634,
    "date": "8/23/2017"
  },
  {
    "id": 40,
    "country": "usa",
    "city": "state university",
    "name": "arkansas state u-main",
    "state": "ar",
    "zipcode": 72467,
    "date": "8/23/2017"
  },
  {
    "id": 41,
    "country": "usa",
    "city": "raleigh",
    "name": "shaw university",
    "state": "nc",
    "zipcode": "27601-2341",
    "date": "8/23/2017"
  },
  {
    "id": 42,
    "country": "usa",
    "city": "san luis obispo",
    "name": "cuesta college",
    "state": "ca",
    "zipcode": 93405,
    "date": "8/23/2017"
  },
  {
    "id": 43,
    "country": "usa",
    "city": "archbold",
    "name": "northwest state c c",
    "state": "oh",
    "zipcode": "43502-9517",
    "date": "8/23/2017"
  },
  {
    "id": 44,
    "country": "usa",
    "city": "palatine",
    "name": "wm rainey harper college",
    "state": "il",
    "zipcode": "60067-7373",
    "date": "8/23/2017"
  },
  {
    "id": 45,
    "country": "usa",
    "city": "delaware",
    "name": "ohio wesleyan university",
    "state": "oh",
    "zipcode": "43015-2333",
    "date": "8/23/2017"
  },
  {
    "id": 46,
    "country": "usa",
    "city": "savannah",
    "name": "savannah technical college",
    "state": "ga",
    "zipcode": "31405-5521",
    "date": "8/23/2017"
  },
  {
    "id": 47,
    "country": "usa",
    "city": "springfield",
    "name": "missouri st univ-sprngfl",
    "state": "mo",
    "zipcode": "65897-0027",
    "date": "8/23/2017"
  },
  {
    "id": 48,
    "country": "usa",
    "city": "washington",
    "name": "howard university",
    "state": "dc",
    "zipcode": 20059,
    "date": "8/23/2017"
  },
  {
    "id": 49,
    "country": "usa",
    "city": "richmond",
    "name": "eastern kentucky university",
    "state": "ky",
    "zipcode": "40475-3100",
    "date": "8/23/2017"
  },
  {
    "id": 50,
    "country": "usa",
    "city": "london",
    "name": "kctcs-somerset-laurel north",
    "state": "ky",
    "zipcode": "40741-6737",
    "date": "8/23/2017"
  },
  {
    "id": 51,
    "country": "usa",
    "city": "west lafayette",
    "name": "purdue univ",
    "state": "in",
    "zipcode": 47907,
    "date": "8/23/2017"
  },
  {
    "id": 52,
    "country": "usa",
    "city": "caldwell",
    "name": "coll of western idaho",
    "state": "id",
    "zipcode": 83605,
    "date": "8/23/2017"
  },
  {
    "id": 53,
    "country": "usa",
    "city": "saint charles",
    "name": "st charles cty cmty college",
    "state": "mo",
    "zipcode": "63301-4414",
    "date": "8/23/2017"
  },
  {
    "id": 54,
    "country": "usa",
    "city": "arkadelphia",
    "name": "henderson state univ",
    "state": "ar",
    "zipcode": "71999-0001",
    "date": "8/23/2017"
  },
  {
    "id": 55,
    "country": "usa",
    "city": "davie",
    "name": "broward coll-central",
    "state": "fl",
    "zipcode": "33314-1604",
    "date": "8/23/2017"
  },
  {
    "id": 56,
    "country": "usa",
    "city": "lincoln",
    "name": "univ of nebraska - lincoln",
    "state": "ne",
    "zipcode": 68588,
    "date": "8/23/2017"
  },
  {
    "id": 57,
    "country": "usa",
    "city": "lexington",
    "name": "university of kentucky",
    "state": "ky",
    "zipcode": 40506,
    "date": "8/23/2017"
  },
  {
    "id": 58,
    "country": "usa",
    "city": "peoria",
    "name": "bradley university",
    "state": "il",
    "zipcode": "61625-0001",
    "date": "8/23/2017"
  },
  {
    "id": 59,
    "country": "usa",
    "city": "mankato",
    "name": "minnesota st univ-mankato",
    "state": "mn",
    "zipcode": 56001,
    "date": "8/23/2017"
  },
  {
    "id": 60,
    "country": "usa",
    "city": "evansville",
    "name": "univ of southern indiana",
    "state": "in",
    "zipcode": "47712-3534",
    "date": "8/23/2017"
  },
  {
    "id": 61,
    "country": "usa",
    "city": "mesquite",
    "name": "dallas cty comm coll",
    "state": "tx",
    "zipcode": 75150,
    "date": "8/23/2017"
  },
  {
    "id": 62,
    "country": "usa",
    "city": "notre dame",
    "name": "saint marys college - in",
    "state": "in",
    "zipcode": 46556,
    "date": "8/23/2017"
  },
  {
    "id": 63,
    "country": "usa",
    "city": "ridgecrest",
    "name": "cerro coso cmty college",
    "state": "ca",
    "zipcode": 93555,
    "date": "8/23/2017"
  },
  {
    "id": 64,
    "country": "usa",
    "city": "huntington",
    "name": "marshall university",
    "state": "wv",
    "zipcode": "25755-0001",
    "date": "8/23/2017"
  },
  {
    "id": 65,
    "country": "usa",
    "city": "louisville",
    "name": "university of louisville",
    "state": "ky",
    "zipcode": 40292,
    "date": "8/23/2017"
  },
  {
    "id": 66,
    "country": "usa",
    "city": "cleburn",
    "name": "hills college - cleburne",
    "state": "tx",
    "zipcode": 76033,
    "date": "8/23/2017"
  },
  {
    "id": 67,
    "country": "usa",
    "city": "troy",
    "name": "troy univ - main campus",
    "state": "al",
    "zipcode": 36082,
    "date": "8/23/2017"
  },
  {
    "id": 68,
    "country": "usa",
    "city": "springfield",
    "name": "ozarks tech comm college",
    "state": "mo",
    "zipcode": 65802,
    "date": "8/23/2017"
  },
  {
    "id": 69,
    "country": "usa",
    "city": "stockton",
    "name": "san joaquin delta college",
    "state": "ca",
    "zipcode": 95207,
    "date": "8/23/2017"
  },
  {
    "id": 70,
    "country": "usa",
    "city": "fullerton",
    "name": "cal state u - fullerton",
    "state": "ca",
    "zipcode": 92831,
    "date": "8/23/2017"
  },
  {
    "id": 71,
    "country": "usa",
    "city": "kirksville",
    "name": "truman state university",
    "state": "mo",
    "zipcode": "63501-4200",
    "date": "8/23/2017"
  },
  {
    "id": 72,
    "country": "usa",
    "city": "phoenix",
    "name": "phoenix college",
    "state": "az",
    "zipcode": 85013,
    "date": "8/23/2017"
  },
  {
    "id": 73,
    "country": "usa",
    "city": "sacramento",
    "name": "american river college",
    "state": "ca",
    "zipcode": 95841,
    "date": "8/23/2017"
  },
  {
    "id": 74,
    "country": "usa",
    "city": "houston",
    "name": "univ of houston",
    "state": "tx",
    "zipcode": 77004,
    "date": "8/23/2017"
  },
  {
    "id": 75,
    "country": "usa",
    "city": "pullman",
    "name": "washington state university",
    "state": "wa",
    "zipcode": 99164,
    "date": "8/23/2017"
  },
  {
    "id": 76,
    "country": "usa",
    "city": "charlottesville",
    "name": "university of virginia",
    "state": "va",
    "zipcode": 22904,
    "date": "8/23/2017"
  },
  {
    "id": 77,
    "country": "usa",
    "city": "cedar bluff",
    "name": "vccs - southwest va cc",
    "state": "va",
    "zipcode": "24609-9364",
    "date": "8/23/2017"
  },
  {
    "id": 78,
    "country": "usa",
    "city": "winona",
    "name": "winona state univ",
    "state": "mn",
    "zipcode": 559875838,
    "date": "8/23/2017"
  },
  {
    "id": 79,
    "country": "usa",
    "city": "norfolk",
    "name": "northeast community college",
    "state": "ne",
    "zipcode": "68701-6831",
    "date": "8/23/2017"
  },
  {
    "id": 80,
    "country": "usa",
    "city": "cincinnati",
    "name": "university of cincinnati",
    "state": "oh",
    "zipcode": "45221-0001",
    "date": "8/23/2017"
  },
  {
    "id": 81,
    "country": "usa",
    "city": "huntsville",
    "name": "sam houston state univ",
    "state": "tx",
    "zipcode": 77340,
    "date": "8/23/2017"
  },
  {
    "id": 82,
    "country": "usa",
    "city": "salem",
    "name": "corban university",
    "state": "or",
    "zipcode": "97317-9392",
    "date": "8/23/2017"
  },
  {
    "id": 83,
    "country": "usa",
    "city": "so holland",
    "name": "south suburban college",
    "state": "il",
    "zipcode": 60473,
    "date": "8/23/2017"
  },
  {
    "id": 84,
    "country": "usa",
    "city": "memphis",
    "name": "rhodes college",
    "state": "tn",
    "zipcode": "38112-1624",
    "date": "8/23/2017"
  },
  {
    "id": 85,
    "country": "usa",
    "city": "bowling green",
    "name": "bowling green state univ",
    "state": "oh",
    "zipcode": 43403,
    "date": "8/23/2017"
  },
  {
    "id": 86,
    "country": "usa",
    "city": "center valley",
    "name": "de sales university",
    "state": "pa",
    "zipcode": "18034-9565",
    "date": "8/23/2017"
  },
  {
    "id": 87,
    "country": "usa",
    "city": "glen ellyn",
    "name": "college of dupage",
    "state": "il",
    "zipcode": "60137-6708",
    "date": "8/23/2017"
  },
  {
    "id": 88,
    "country": "usa",
    "city": "rock hill",
    "name": "winthrop university",
    "state": "sc",
    "zipcode": "29733-7001",
    "date": "8/23/2017"
  },
  {
    "id": 89,
    "country": "usa",
    "city": "clinton",
    "name": "presbyterian college",
    "state": "sc",
    "zipcode": "29325-2865",
    "date": "8/23/2017"
  },
  {
    "id": 90,
    "country": "usa",
    "city": "bethlehem",
    "name": "northampton cmty coll",
    "state": "pa",
    "zipcode": "18020-7568",
    "date": "8/23/2017"
  },
  {
    "id": 91,
    "country": "usa",
    "city": "tuscaloosa",
    "name": "univ of ala-tuscaloosa",
    "state": "al",
    "zipcode": 35487,
    "date": "8/23/2017"
  },
  {
    "id": 92,
    "country": "usa",
    "city": "south charleston",
    "name": "bridgevalley ctc",
    "state": "wv",
    "zipcode": 25303,
    "date": "8/23/2017"
  },
  {
    "id": 93,
    "country": "usa",
    "city": "gainesville",
    "name": "university of florida",
    "state": "fl",
    "zipcode": 32611,
    "date": "8/23/2017"
  },
  {
    "id": 94,
    "country": "usa",
    "city": "columbia",
    "name": "univ of missouri-columbia",
    "state": "mo",
    "zipcode": 65211,
    "date": "8/23/2017"
  },
  {
    "id": 95,
    "country": "usa",
    "city": "leesburg",
    "name": "lake sumter state college",
    "state": "fl",
    "zipcode": "34788-3950",
    "date": "8/23/2017"
  },
  {
    "id": 96,
    "country": "usa",
    "city": "pleasant hill",
    "name": "diablo valley college",
    "state": "ca",
    "zipcode": 94523,
    "date": "8/23/2017"
  },
  {
    "id": 97,
    "country": "usa",
    "city": "wichita",
    "name": "wichita state university",
    "state": "ks",
    "zipcode": "67260-9700",
    "date": "8/23/2017"
  },
  {
    "id": 98,
    "country": "usa",
    "city": "fayetteville",
    "name": "u of arkansas-fayetteville",
    "state": "ar",
    "zipcode": 72701,
    "date": "8/23/2017"
  },
  {
    "id": 99,
    "country": "usa",
    "city": "neosho",
    "name": "crowder college",
    "state": "mo",
    "zipcode": "64850-9165",
    "date": "8/23/2017"
  },
  {
    "id": 100,
    "country": "usa",
    "city": "greenwood",
    "name": "lander university",
    "state": "sc",
    "zipcode": "29649-2056",
    "date": "8/23/2017"
  },
  {
    "id": 101,
    "country": "usa",
    "city": "curtis",
    "name": "university of nebraska",
    "state": "ne",
    "zipcode": "69025-9525",
    "date": "8/23/2017"
  },
  {
    "id": 102,
    "country": "usa",
    "city": "waleska",
    "name": "reinhardt college",
    "state": "ga",
    "zipcode": "30183-2981",
    "date": "8/23/2017"
  },
  {
    "id": 103,
    "country": "usa",
    "city": "decatur",
    "name": "east central community coll",
    "state": "ms",
    "zipcode": "39327-8985",
    "date": "8/23/2017"
  },
  {
    "id": 104,
    "country": "usa",
    "city": "springfield",
    "name": "wittenberg university",
    "state": "oh",
    "zipcode": "45504-2534",
    "date": "8/23/2017"
  },
  {
    "id": 105,
    "country": "usa",
    "city": "mount olive",
    "name": "university of mount olive",
    "state": "nc",
    "zipcode": "28365-1263",
    "date": "8/23/2017"
  },
  {
    "id": 106,
    "country": "usa",
    "city": "n charleston",
    "name": "trident tech coll",
    "state": "sc",
    "zipcode": "29406-4607",
    "date": "8/23/2017"
  },
  {
    "id": 107,
    "country": "usa",
    "city": "coeur d alene",
    "name": "north idaho college",
    "state": "id",
    "zipcode": 83814,
    "date": "8/23/2017"
  },
  {
    "id": 108,
    "country": "usa",
    "city": "pembroke pines",
    "name": "broward coll-south",
    "state": "fl",
    "zipcode": 33024,
    "date": "8/23/2017"
  },
  {
    "id": 109,
    "country": "usa",
    "city": "turlock",
    "name": "cal state u - stanislaus",
    "state": "ca",
    "zipcode": 95382,
    "date": "8/23/2017"
  },
  {
    "id": 110,
    "country": "usa",
    "city": "fresno",
    "name": "fresno city college",
    "state": "ca",
    "zipcode": 93741,
    "date": "8/23/2017"
  },
  {
    "id": 111,
    "country": "usa",
    "city": "chico",
    "name": "butte college - chico",
    "state": "ca",
    "zipcode": 95928,
    "date": "8/23/2017"
  },
  {
    "id": 112,
    "country": "usa",
    "city": "bakersfield",
    "name": "bakersfield college",
    "state": "ca",
    "zipcode": 93305,
    "date": "8/23/2017"
  },
  {
    "id": 113,
    "country": "usa",
    "city": "grand junction",
    "name": "colorado mesa university",
    "state": "co",
    "zipcode": "81501-3122",
    "date": "8/23/2017"
  },
  {
    "id": 114,
    "country": "usa",
    "city": "gainesville",
    "name": "santa fe college",
    "state": "fl",
    "zipcode": "32606-6210",
    "date": "8/23/2017"
  },
  {
    "id": 115,
    "country": "usa",
    "city": "belton",
    "name": "univ of mary hardin baylor",
    "state": "tx",
    "zipcode": 76513,
    "date": "8/23/2017"
  },
  {
    "id": 116,
    "country": "usa",
    "city": "kent",
    "name": "kent state university",
    "state": "oh",
    "zipcode": 44242,
    "date": "8/23/2017"
  },
  {
    "id": 117,
    "country": "usa",
    "city": "ames",
    "name": "iowa state university",
    "state": "ia",
    "zipcode": 50011,
    "date": "8/23/2017"
  },
  {
    "id": 118,
    "country": "usa",
    "city": "durham",
    "name": "north carolina central univ",
    "state": "nc",
    "zipcode": "27707-3129",
    "date": "8/23/2017"
  },
  {
    "id": 119,
    "country": "usa",
    "city": "denison",
    "name": "grayson county college",
    "state": "tx",
    "zipcode": 75020,
    "date": "8/23/2017"
  },
  {
    "id": 120,
    "country": "usa",
    "city": "auburn university",
    "name": "auburn u main campus",
    "state": "al",
    "zipcode": 36849,
    "date": "8/23/2017"
  },
  {
    "id": 121,
    "country": "usa",
    "city": "usaf academy",
    "name": "u s air force academy",
    "state": "co",
    "zipcode": 80840,
    "date": "8/23/2017"
  },
  {
    "id": 122,
    "country": "usa",
    "city": "los lunas",
    "name": "unm-main campus",
    "state": "nm",
    "zipcode": 87031,
    "date": "8/23/2017"
  },
  {
    "id": 123,
    "country": "usa",
    "city": "farmington",
    "name": "san juan college",
    "state": "nm",
    "zipcode": "87402-4699",
    "date": "8/23/2017"
  },
  {
    "id": 124,
    "country": "usa",
    "city": "mission",
    "name": "metropolitan community college",
    "state": "bc",
    "zipcode": "v2v 3v5",
    "date": "8/23/2017"
  },
  {
    "id": 125,
    "country": "usa",
    "city": "los angeles",
    "name": "univ of southern california",
    "state": "ca",
    "zipcode": 90089,
    "date": "8/23/2017"
  },
  {
    "id": 126,
    "country": "usa",
    "city": "anderson",
    "name": "anderson university",
    "state": "sc",
    "zipcode": "29621-4002",
    "date": "8/23/2017"
  },
  {
    "id": 127,
    "country": "usa",
    "city": "hattiesburg",
    "name": "u of southern mississippi",
    "state": "ms",
    "zipcode": "39406-0001",
    "date": "8/23/2017"
  },
  {
    "id": 128,
    "country": "usa",
    "city": "norfolk",
    "name": "norfolk state university",
    "state": "va",
    "zipcode": "23504-8050",
    "date": "8/23/2017"
  },
  {
    "id": 129,
    "country": "usa",
    "city": "normal",
    "name": "illinois state university",
    "state": "il",
    "zipcode": 61790,
    "date": "8/23/2017"
  },
  {
    "id": 130,
    "country": "usa",
    "city": "el dorado",
    "name": "butler co comm coll-el dora",
    "state": "ks",
    "zipcode": "67042-3225",
    "date": "8/23/2017"
  },
  {
    "id": 131,
    "country": "usa",
    "city": "fort worth",
    "name": "texas christian university",
    "state": "tx",
    "zipcode": 76129,
    "date": "8/23/2017"
  },
  {
    "id": 132,
    "country": "usa",
    "city": "las cruces",
    "name": "new mexico state university",
    "state": "nm",
    "zipcode": 88003,
    "date": "8/23/2017"
  },
  {
    "id": 133,
    "country": "usa",
    "city": "hilo",
    "name": "hawaii community college",
    "state": "hi",
    "zipcode": 96720,
    "date": "8/23/2017"
  },
  {
    "id": 134,
    "country": "usa",
    "city": "bowling green",
    "name": "western kentucky university",
    "state": "ky",
    "zipcode": "42101-1000",
    "date": "8/23/2017"
  },
  {
    "id": 135,
    "country": "usa",
    "city": "merced",
    "name": "merced college",
    "state": "ca",
    "zipcode": 95348,
    "date": "8/23/2017"
  },
  {
    "id": 136,
    "country": "usa",
    "city": "honolulu",
    "name": "univ of hawaii manoa campus",
    "state": "hi",
    "zipcode": 96822,
    "date": "8/23/2017"
  },
  {
    "id": 137,
    "country": "usa",
    "city": "bradenton",
    "name": "state coll of florida - bradenton",
    "state": "fl",
    "zipcode": "34207-3522",
    "date": "8/23/2017"
  },
  {
    "id": 138,
    "country": "usa",
    "city": "tampa",
    "name": "fl gulf coast chapter abc",
    "state": "fl",
    "zipcode": "33607-3104",
    "date": "8/23/2017"
  },
  {
    "id": 139,
    "country": "usa",
    "city": "ocala",
    "name": "college of central florida",
    "state": "fl",
    "zipcode": "34474-4415",
    "date": "8/23/2017"
  },
  {
    "id": 140,
    "country": "usa",
    "city": "bloomington",
    "name": "indiana univ bloomington",
    "state": "in",
    "zipcode": "47405-7104",
    "date": "8/23/2017"
  },
  {
    "id": 141,
    "country": "usa",
    "city": "statesboro",
    "name": "georgia southern university",
    "state": "ga",
    "zipcode": 30460,
    "date": "8/23/2017"
  },
  {
    "id": 142,
    "country": "usa",
    "city": "hammond",
    "name": "southeastern louisiana univ",
    "state": "la",
    "zipcode": 70402,
    "date": "8/23/2017"
  },
  {
    "id": 143,
    "country": "usa",
    "city": "amarillo",
    "name": "amarillo college",
    "state": "tx",
    "zipcode": "79109-2411",
    "date": "8/23/2017"
  },
  {
    "id": 144,
    "country": "usa",
    "city": "warren",
    "name": "macomb community college",
    "state": "mi",
    "zipcode": 48088,
    "date": "8/23/2017"
  },
  {
    "id": 145,
    "country": "usa",
    "city": "modesto",
    "name": "modesto junior college",
    "state": "ca",
    "zipcode": 95350,
    "date": "8/23/2017"
  },
  {
    "id": 146,
    "country": "usa",
    "city": "lake worth",
    "name": "palm beach state coll - lake worth",
    "state": "fl",
    "zipcode": "33461-4705",
    "date": "8/23/2017"
  },
  {
    "id": 147,
    "country": "usa",
    "city": "miami",
    "name": "fiu -  university park campus",
    "state": "fl",
    "zipcode": 33199,
    "date": "8/23/2017"
  },
  {
    "id": 148,
    "country": "usa",
    "city": "butler",
    "name": "butler county cmty college",
    "state": "pa",
    "zipcode": 16001,
    "date": "8/23/2017"
  },
  {
    "id": 149,
    "country": "usa",
    "city": "brookings",
    "name": "south dakota state univ -br",
    "state": "sd",
    "zipcode": 57007,
    "date": "8/23/2017"
  },
  {
    "id": 150,
    "country": "usa",
    "city": "raleigh",
    "name": "north carolina state univ",
    "state": "nc",
    "zipcode": 27695,
    "date": "8/23/2017"
  },
  {
    "id": 151,
    "country": "usa",
    "city": "williston",
    "name": "williston state college",
    "state": "nd",
    "zipcode": "58801-4464",
    "date": "8/23/2017"
  },
  {
    "id": 152,
    "country": "usa",
    "city": "el reno",
    "name": "redlands community college",
    "state": "ok",
    "zipcode": 73036,
    "date": "8/23/2017"
  },
  {
    "id": 153,
    "country": "usa",
    "city": "cleburn",
    "name": "hill college - johnson campus",
    "state": "tx",
    "zipcode": 76033,
    "date": "8/23/2017"
  },
  {
    "id": 154,
    "country": "usa",
    "city": "tahlequah",
    "name": "northeastern state univ",
    "state": "ok",
    "zipcode": 74464,
    "date": "8/23/2017"
  },
  {
    "id": 155,
    "country": "usa",
    "city": "rocklin",
    "name": "sierra college",
    "state": "ca",
    "zipcode": 95677,
    "date": "8/23/2017"
  },
  {
    "id": 156,
    "country": "usa",
    "city": "newtown",
    "name": "bucks county cmty coll",
    "state": "pa",
    "zipcode": "18940-4106",
    "date": "8/23/2017"
  },
  {
    "id": 157,
    "country": "usa",
    "city": "arkadelphia",
    "name": "ouachita baptist university",
    "state": "ar",
    "zipcode": "71998-0001",
    "date": "8/23/2017"
  },
  {
    "id": 158,
    "country": "usa",
    "city": "waco",
    "name": "baylor university",
    "state": "tx",
    "zipcode": 76798,
    "date": "8/23/2017"
  },
  {
    "id": 159,
    "country": "usa",
    "city": "ste anne bellevu",
    "name": "john abbott college",
    "state": "qc",
    "zipcode": "h9x 3l9",
    "date": "8/23/2017"
  },
  {
    "id": 160,
    "country": "usa",
    "city": "lawrenceville",
    "name": "gwinnett technical college",
    "state": "ga",
    "zipcode": "30043-5702",
    "date": "8/23/2017"
  },
  {
    "id": 161,
    "country": "usa",
    "city": "tempe",
    "name": "arizona state university",
    "state": "az",
    "zipcode": 85281,
    "date": "8/23/2017"
  },
  {
    "id": 162,
    "country": "usa",
    "city": "union",
    "name": "east central college",
    "state": "mo",
    "zipcode": "63084-0529",
    "date": "8/23/2017"
  },
  {
    "id": 163,
    "country": "usa",
    "city": "san bruno",
    "name": "skyline college",
    "state": "ca",
    "zipcode": 94066,
    "date": "8/23/2017"
  },
  {
    "id": 164,
    "country": "usa",
    "city": "greensboro",
    "name": "north carolina a&amp; st univ",
    "state": "nc",
    "zipcode": "27411-0002",
    "date": "8/23/2017"
  },
  {
    "id": 165,
    "country": "usa",
    "city": "plant city",
    "name": "hillsborough cmty coll pc",
    "state": "fl",
    "zipcode": "33563-1540",
    "date": "8/23/2017"
  },
  {
    "id": 166,
    "country": "usa",
    "city": "edwardsville",
    "name": "so illinois u-edwardsville",
    "state": "il",
    "zipcode": "62026-0001",
    "date": "8/23/2017"
  },
  {
    "id": 167,
    "country": "usa",
    "city": "cullowhee",
    "name": "western carolina university",
    "state": "nc",
    "zipcode": 28723,
    "date": "8/23/2017"
  },
  {
    "id": 168,
    "country": "usa",
    "city": "saint cloud",
    "name": "saint cloud state univ",
    "state": "mn",
    "zipcode": 56301,
    "date": "8/23/2017"
  },
  {
    "id": 169,
    "country": "usa",
    "city": "anchorage",
    "name": "univ of alaska - anchorage",
    "state": "ak",
    "zipcode": 99508,
    "date": "8/23/2017"
  },
  {
    "id": 170,
    "country": "usa",
    "city": "muncie",
    "name": "ball state university",
    "state": "in",
    "zipcode": "47306-1022",
    "date": "8/23/2017"
  },
  {
    "id": 171,
    "country": "usa",
    "city": "greeley",
    "name": "univ of northern colorado",
    "state": "co",
    "zipcode": 80639,
    "date": "8/23/2017"
  },
  {
    "id": 172,
    "country": "usa",
    "city": "omaha",
    "name": "creighton university",
    "state": "ne",
    "zipcode": "68178-0001",
    "date": "8/23/2017"
  },
  {
    "id": 173,
    "country": "usa",
    "city": "west columbia",
    "name": "midlands tech coll",
    "state": "sc",
    "zipcode": "29170-2176",
    "date": "8/23/2017"
  },
  {
    "id": 174,
    "country": "usa",
    "city": "montgomery",
    "name": "alabama state university",
    "state": "al",
    "zipcode": "36104-5732",
    "date": "8/23/2017"
  },
  {
    "id": 175,
    "country": "usa",
    "city": "coolidge",
    "name": "central arizona coll",
    "state": "az",
    "zipcode": 85128,
    "date": "8/23/2017"
  },
  {
    "id": 176,
    "country": "usa",
    "city": "cumberland",
    "name": "allegany college of maryland",
    "state": "md",
    "zipcode": 215022596,
    "date": "8/23/2017"
  },
  {
    "id": 177,
    "country": "usa",
    "city": "salt lake city",
    "name": "university of utah",
    "state": "ut",
    "zipcode": "84112-9156",
    "date": "8/23/2017"
  },
  {
    "id": 178,
    "country": "usa",
    "city": "plainview",
    "name": "wayland baptist university",
    "state": "tx",
    "zipcode": 79072,
    "date": "8/23/2017"
  },
  {
    "id": 179,
    "country": "usa",
    "city": "raleigh",
    "name": "wake technical comm coll",
    "state": "nc",
    "zipcode": "27603-5655",
    "date": "8/23/2017"
  },
  {
    "id": 180,
    "country": "usa",
    "city": "madison",
    "name": "dakota state university",
    "state": "sd",
    "zipcode": 57042,
    "date": "8/23/2017"
  },
  {
    "id": 181,
    "country": "usa",
    "city": "stillwater",
    "name": "oklahoma state university",
    "state": "ok",
    "zipcode": 74078,
    "date": "8/23/2017"
  },
  {
    "id": 182,
    "country": "usa",
    "city": "indianapolis",
    "name": "iupui",
    "state": "in",
    "zipcode": 46202,
    "date": "8/23/2017"
  },
  {
    "id": 183,
    "country": "usa",
    "city": "fort myers",
    "name": "florida gulf coast univ",
    "state": "fl",
    "zipcode": "33965-6565",
    "date": "8/23/2017"
  },
  {
    "id": 184,
    "country": "usa",
    "city": "virginia beach",
    "name": "tidewater cc-virginia beach",
    "state": "va",
    "zipcode": "23453-1918",
    "date": "8/23/2017"
  },
  {
    "id": 185,
    "country": "usa",
    "city": "tampa",
    "name": "hillsborough cc/admin",
    "state": "fl",
    "zipcode": 33606,
    "date": "8/23/2017"
  },
  {
    "id": 186,
    "country": "usa",
    "city": "tucson",
    "name": "university of arizona",
    "state": "az",
    "zipcode": 85721,
    "date": "8/23/2017"
  },
  {
    "id": 187,
    "country": "usa",
    "city": "denver",
    "name": "univ of colorado denver",
    "state": "co",
    "zipcode": 80202,
    "date": "8/23/2017"
  },
  {
    "id": 188,
    "country": "usa",
    "city": "honolulu",
    "name": "kapiolani community college",
    "state": "hi",
    "zipcode": 96816,
    "date": "8/23/2017"
  },
  {
    "id": 189,
    "country": "usa",
    "city": "minneapolis",
    "name": "minneapolis comm &amp;tech coll",
    "state": "mn",
    "zipcode": "55403-1710",
    "date": "8/23/2017"
  },
  {
    "id": 190,
    "country": "usa",
    "city": "bloomington",
    "name": "normandale cmty college",
    "state": "mn",
    "zipcode": 55431,
    "date": "8/23/2017"
  },
  {
    "id": 191,
    "country": "usa",
    "city": "carrollton",
    "name": "west ga tech - carroll",
    "state": "ga",
    "zipcode": "30116-6476",
    "date": "8/23/2017"
  },
  {
    "id": 192,
    "country": "usa",
    "city": "columbus",
    "name": "columbus tech",
    "state": "ga",
    "zipcode": "31904-6535",
    "date": "8/23/2017"
  },
  {
    "id": 193,
    "country": "usa",
    "city": "muscle shoals",
    "name": "nw-shoals comm college-ms",
    "state": "al",
    "zipcode": 35661,
    "date": "8/23/2017"
  },
  {
    "id": 194,
    "country": "usa",
    "city": "west haven",
    "name": "university of new haven",
    "state": "ct",
    "zipcode": "06516-1916",
    "date": "8/23/2017"
  },
  {
    "id": 195,
    "country": "usa",
    "city": "lafayette",
    "name": "univ of louisiana - lafayette",
    "state": "la",
    "zipcode": 70506,
    "date": "8/23/2017"
  },
  {
    "id": 196,
    "country": "usa",
    "city": "leesburg",
    "name": "beacon college",
    "state": "fl",
    "zipcode": 34748,
    "date": "8/23/2017"
  },
  {
    "id": 197,
    "country": "usa",
    "city": "wichita falls",
    "name": "vernon  college - wichita fall",
    "state": "tx",
    "zipcode": 76308,
    "date": "8/23/2017"
  },
  {
    "id": 198,
    "country": "usa",
    "city": "mesquite",
    "name": "eastfield college",
    "state": "tx",
    "zipcode": 75150,
    "date": "8/23/2017"
  },
  {
    "id": 199,
    "country": "usa",
    "city": "marietta",
    "name": "chattahoochee technical college",
    "state": "ga",
    "zipcode": 30066,
    "date": "8/23/2017"
  },
  {
    "id": 200,
    "country": "usa",
    "city": "hammond",
    "name": "northshore tech cc - hammond",
    "state": "la",
    "zipcode": "70401-9501",
    "date": "8/23/2017"
  },
  {
    "id": 201,
    "country": "usa",
    "city": "st george",
    "name": "dixie state university",
    "state": "ut",
    "zipcode": 84770,
    "date": "8/23/2017"
  },
  {
    "id": 202,
    "country": "usa",
    "city": "phoenix",
    "name": "arizona state univ - downtown",
    "state": "az",
    "zipcode": 85004,
    "date": "8/23/2017"
  },
  {
    "id": 203,
    "country": "usa",
    "city": "tucson",
    "name": "pima college downtown",
    "state": "az",
    "zipcode": 85709,
    "date": "8/23/2017"
  },
  {
    "id": 204,
    "country": "usa",
    "city": "springfield",
    "name": "ozarks technical college",
    "state": "mo",
    "zipcode": "65802-3625",
    "date": "8/23/2017"
  },
  {
    "id": 205,
    "country": "usa",
    "city": "mayville",
    "name": "mayville state university",
    "state": "nd",
    "zipcode": "58257-1217",
    "date": "8/23/2017"
  },
  {
    "id": 206,
    "country": "usa",
    "city": "fresno",
    "name": "cal state u - fresno",
    "state": "ca",
    "zipcode": 93740,
    "date": "8/23/2017"
  },
  {
    "id": 207,
    "country": "usa",
    "city": "university",
    "name": "university of mississippi",
    "state": "ms",
    "zipcode": 38677,
    "date": "8/23/2017"
  },
  {
    "id": 208,
    "country": "usa",
    "city": "poplar bluff",
    "name": "three rivers cmty college",
    "state": "mo",
    "zipcode": 63901,
    "date": "8/23/2017"
  },
  {
    "id": 209,
    "country": "usa",
    "city": "selma",
    "name": "wallace comm coll - selma",
    "state": "al",
    "zipcode": "36703-2867",
    "date": "8/23/2017"
  },
  {
    "id": 210,
    "country": "usa",
    "city": "omaha",
    "name": "univ of nebraska - omaha",
    "state": "ne",
    "zipcode": "68182-2000",
    "date": "8/23/2017"
  },
  {
    "id": 211,
    "country": "usa",
    "city": "sugar grove",
    "name": "waubonsee comm coll",
    "state": "il",
    "zipcode": 60554,
    "date": "8/23/2017"
  },
  {
    "id": 212,
    "country": "usa",
    "city": "morehead",
    "name": "morehead state university",
    "state": "ky",
    "zipcode": 40351,
    "date": "8/23/2017"
  },
  {
    "id": 213,
    "country": "usa",
    "city": "kansas city",
    "name": "univ missouri - kansas city",
    "state": "mo",
    "zipcode": "64110-2446",
    "date": "8/23/2017"
  },
  {
    "id": 214,
    "country": "usa",
    "city": "chandler",
    "name": "chandler-gilbert cc - chandler",
    "state": "az",
    "zipcode": 85225,
    "date": "8/23/2017"
  },
  {
    "id": 215,
    "country": "usa",
    "city": "athens",
    "name": "university of georgia",
    "state": "ga",
    "zipcode": 30602,
    "date": "8/23/2017"
  },
  {
    "id": 216,
    "country": "usa",
    "city": "manhattan",
    "name": "kansas state university",
    "state": "ks",
    "zipcode": 66506,
    "date": "8/23/2017"
  },
  {
    "id": 217,
    "country": "usa",
    "city": "bentonville",
    "name": "northwest arkansas cmty col",
    "state": "ar",
    "zipcode": 72712,
    "date": "8/23/2017"
  },
  {
    "id": 218,
    "country": "usa",
    "city": "orlando",
    "name": "univ of central florida",
    "state": "fl",
    "zipcode": "32816-0001",
    "date": "8/23/2017"
  },
  {
    "id": 219,
    "country": "usa",
    "city": "new port richey",
    "name": "pasco hernando st coll - npr",
    "state": "fl",
    "zipcode": 34654,
    "date": "8/23/2017"
  },
  {
    "id": 220,
    "country": "usa",
    "city": "dallas",
    "name": "southern methodist univ",
    "state": "tx",
    "zipcode": 75205,
    "date": "8/23/2017"
  },
  {
    "id": 221,
    "country": "usa",
    "city": "wahpeton",
    "name": "north dakota global online campus",
    "state": "nd",
    "zipcode": 58076,
    "date": "8/23/2017"
  },
  {
    "id": 222,
    "country": "usa",
    "city": "clearwater",
    "name": "st petersburg coll-clearwater",
    "state": "fl",
    "zipcode": "33765-2816",
    "date": "8/23/2017"
  },
  {
    "id": 223,
    "country": "usa",
    "city": "wilmington",
    "name": "cape fear community college",
    "state": "nc",
    "zipcode": "28401-3910",
    "date": "8/23/2017"
  },
  {
    "id": 224,
    "country": "usa",
    "city": "colorado springs",
    "name": "univ colorado-colorado sprg",
    "state": "co",
    "zipcode": 80918,
    "date": "8/23/2017"
  },
  {
    "id": 225,
    "country": "usa",
    "city": "wausau",
    "name": "north cntrl tech c-wausau",
    "state": "wi",
    "zipcode": "54401-1880",
    "date": "8/23/2017"
  },
  {
    "id": 226,
    "country": "usa",
    "city": "university park",
    "name": "penn state univ-univ park",
    "state": "pa",
    "zipcode": 16802,
    "date": "8/23/2017"
  },
  {
    "id": 227,
    "country": "usa",
    "city": "rock island",
    "name": "augustana college",
    "state": "il",
    "zipcode": 61201,
    "date": "8/23/2017"
  },
  {
    "id": 228,
    "country": "usa",
    "city": "tulsa",
    "name": "university of tulsa",
    "state": "ok",
    "zipcode": 74104,
    "date": "8/23/2017"
  },
  {
    "id": 229,
    "country": "usa",
    "city": "mankato",
    "name": "mankato state university",
    "state": "mn",
    "zipcode": 56001,
    "date": "8/23/2017"
  },
  {
    "id": 230,
    "country": "usa",
    "city": "macon",
    "name": "central ga tech - macon",
    "state": "ga",
    "zipcode": "31206-3628",
    "date": "8/23/2017"
  },
  {
    "id": 231,
    "country": "usa",
    "city": "dallas",
    "name": "gaston college",
    "state": "nc",
    "zipcode": "28034-1402",
    "date": "8/23/2017"
  },
  {
    "id": 232,
    "country": "usa",
    "city": "prescott",
    "name": "yavapai college",
    "state": "az",
    "zipcode": 86301,
    "date": "8/23/2017"
  },
  {
    "id": 233,
    "country": "usa",
    "city": "jacksonville",
    "name": "edward waters college",
    "state": "fl",
    "zipcode": "32209-6167",
    "date": "8/23/2017"
  },
  {
    "id": 234,
    "country": "usa",
    "city": "altamonte springs",
    "name": "seminole state - altamonte spring",
    "state": "fl",
    "zipcode": 32714,
    "date": "8/23/2017"
  },
  {
    "id": 235,
    "country": "usa",
    "city": "chico",
    "name": "cal state u - chico",
    "state": "ca",
    "zipcode": 95929,
    "date": "8/23/2017"
  },
  {
    "id": 236,
    "country": "usa",
    "city": "oroville",
    "name": "butte college",
    "state": "ca",
    "zipcode": 95965,
    "date": "8/23/2017"
  },
  {
    "id": 237,
    "country": "usa",
    "city": "pittsburg",
    "name": "los medanos college",
    "state": "ca",
    "zipcode": 94565,
    "date": "8/23/2017"
  },
  {
    "id": 238,
    "country": "usa",
    "city": "conway",
    "name": "univ of sc - coastal carolina",
    "state": "sc",
    "zipcode": 29526,
    "date": "8/23/2017"
  },
  {
    "id": 239,
    "country": "usa",
    "city": "south bend",
    "name": "ivy tech comm coll - south bend",
    "state": "in",
    "zipcode": "46601-3415",
    "date": "8/23/2017"
  },
  {
    "id": 240,
    "country": "usa",
    "city": "tyler",
    "name": "tyler junior college",
    "state": "tx",
    "zipcode": 75701,
    "date": "8/23/2017"
  },
  {
    "id": 241,
    "country": "usa",
    "city": "greensboro",
    "name": "univ of nc - greensboro",
    "state": "nc",
    "zipcode": 27403,
    "date": "8/23/2017"
  },
  {
    "id": 242,
    "country": "usa",
    "city": "tucson",
    "name": "pima college-west campus",
    "state": "az",
    "zipcode": 85709,
    "date": "8/23/2017"
  },
  {
    "id": 243,
    "country": "usa",
    "city": "melrose park",
    "name": "triton college",
    "state": "il",
    "zipcode": 60160,
    "date": "8/23/2017"
  },
  {
    "id": 244,
    "country": "usa",
    "city": "savannah",
    "name": "armstrong state university",
    "state": "ga",
    "zipcode": 314191997,
    "date": "8/23/2017"
  },
  {
    "id": 245,
    "country": "usa",
    "city": "portales",
    "name": "eastern nm univ - portales",
    "state": "nm",
    "zipcode": 88130,
    "date": "8/23/2017"
  },
  {
    "id": 246,
    "country": "usa",
    "city": "linn",
    "name": "state tech coll of missouri",
    "state": "mo",
    "zipcode": 65051,
    "date": "8/23/2017"
  },
  {
    "id": 247,
    "country": "usa",
    "city": "dallas",
    "name": "el centro college",
    "state": "tx",
    "zipcode": 75202,
    "date": "8/23/2017"
  },
  {
    "id": 248,
    "country": "usa",
    "city": "deerfield",
    "name": "trinity international univ",
    "state": "il",
    "zipcode": "60015-1241",
    "date": "8/23/2017"
  },
  {
    "id": 249,
    "country": "usa",
    "city": "brooksville",
    "name": "pasco-hernando st coll -  north",
    "state": "fl",
    "zipcode": 34601,
    "date": "8/23/2017"
  },
  {
    "id": 250,
    "country": "usa",
    "city": "coconut creek",
    "name": "broward coll-north",
    "state": "fl",
    "zipcode": "33066-1615",
    "date": "8/23/2017"
  },
  {
    "id": 251,
    "country": "usa",
    "city": "poplarville",
    "name": "pearl river cc-poplarville",
    "state": "ms",
    "zipcode": "39470-2216",
    "date": "8/23/2017"
  },
  {
    "id": 252,
    "country": "usa",
    "city": "conway",
    "name": "coastal carolina university",
    "state": "sc",
    "zipcode": "29526-8279",
    "date": "8/23/2017"
  },
  {
    "id": 253,
    "country": "usa",
    "city": "keysville",
    "name": "vccs - southside va cc - daniel",
    "state": "va",
    "zipcode": "23947-3559",
    "date": "8/23/2017"
  },
  {
    "id": 254,
    "country": "usa",
    "city": "berea",
    "name": "baldwin wallace college",
    "state": "oh",
    "zipcode": "44017-2005",
    "date": "8/23/2017"
  },
  {
    "id": 255,
    "country": "usa",
    "city": "hickory",
    "name": "lenoir rhyne university",
    "state": "nc",
    "zipcode": 28601,
    "date": "8/23/2017"
  },
  {
    "id": 256,
    "country": "usa",
    "city": "apache junction",
    "name": "central az coll - apache junct",
    "state": "az",
    "zipcode": 85119,
    "date": "8/23/2017"
  },
  {
    "id": 257,
    "country": "usa",
    "city": "st louis",
    "name": "univ of missouri-st louis",
    "state": "mo",
    "zipcode": 63121,
    "date": "8/23/2017"
  },
  {
    "id": 258,
    "country": "usa",
    "city": "corning",
    "name": "corning cmty coll",
    "state": "ny",
    "zipcode": "14830-3297",
    "date": "8/23/2017"
  },
  {
    "id": 259,
    "country": "usa",
    "city": "visalia",
    "name": "college of the sequoias",
    "state": "ca",
    "zipcode": 93277,
    "date": "8/23/2017"
  },
  {
    "id": 260,
    "country": "usa",
    "city": "providence",
    "name": "rhode island college",
    "state": "ri",
    "zipcode": 2908,
    "date": "8/23/2017"
  },
  {
    "id": 261,
    "country": "usa",
    "city": "austin",
    "name": "austin c c - highland bus ctr",
    "state": "tx",
    "zipcode": 78752,
    "date": "8/23/2017"
  },
  {
    "id": 262,
    "country": "usa",
    "city": "cicero",
    "name": "morton college",
    "state": "il",
    "zipcode": "60804-4300",
    "date": "8/23/2017"
  },
  {
    "id": 263,
    "country": "usa",
    "city": "minot",
    "name": "minot state university",
    "state": "nd",
    "zipcode": "58707-0001",
    "date": "8/23/2017"
  },
  {
    "id": 264,
    "country": "usa",
    "city": "lawrence",
    "name": "university of kansas",
    "state": "ks",
    "zipcode": 66045,
    "date": "8/23/2017"
  },
  {
    "id": 265,
    "country": "usa",
    "city": "jacksonville",
    "name": "university of north florida",
    "state": "fl",
    "zipcode": "32224-7699",
    "date": "8/23/2017"
  },
  {
    "id": 266,
    "country": "usa",
    "city": "saint louis",
    "name": "st louis cc - forest park",
    "state": "mo",
    "zipcode": "63110-1316",
    "date": "8/23/2017"
  },
  {
    "id": 267,
    "country": "usa",
    "city": "greenwood",
    "name": "piedmont technical college",
    "state": "sc",
    "zipcode": "29648-1467",
    "date": "8/23/2017"
  },
  {
    "id": 268,
    "country": "usa",
    "city": "elgin",
    "name": "elgin community college",
    "state": "il",
    "zipcode": "60123-7189",
    "date": "8/23/2017"
  },
  {
    "id": 269,
    "country": "usa",
    "city": "greenville",
    "name": "greenville technical coll",
    "state": "sc",
    "zipcode": "29607-2418",
    "date": "8/23/2017"
  },
  {
    "id": 270,
    "country": "usa",
    "city": "ada",
    "name": "east central university",
    "state": "ok",
    "zipcode": 74820,
    "date": "8/23/2017"
  },
  {
    "id": 271,
    "country": "usa",
    "city": "mississippi stat",
    "name": "mississippi state univ",
    "state": "ms",
    "zipcode": 39762,
    "date": "8/23/2017"
  },
  {
    "id": 272,
    "country": "usa",
    "city": "lafayette",
    "name": "ivy tech comm coll - lafayette",
    "state": "in",
    "zipcode": "47905-5241",
    "date": "8/23/2017"
  },
  {
    "id": 273,
    "country": "usa",
    "city": "lake city",
    "name": "florida gateway college",
    "state": "fl",
    "zipcode": "32025-2006",
    "date": "8/23/2017"
  },
  {
    "id": 274,
    "country": "usa",
    "city": "rocky mount",
    "name": "nash community college",
    "state": "nc",
    "zipcode": "27804-9708",
    "date": "8/23/2017"
  },
  {
    "id": 275,
    "country": "usa",
    "city": "charleston",
    "name": "charleston southern univ",
    "state": "sc",
    "zipcode": "29406-9121",
    "date": "8/23/2017"
  },
  {
    "id": 276,
    "country": "usa",
    "city": "belleville",
    "name": "southwestern illinois college",
    "state": "il",
    "zipcode": "62221-5859",
    "date": "8/23/2017"
  },
  {
    "id": 277,
    "country": "usa",
    "city": "mesa",
    "name": "mesa community college",
    "state": "az",
    "zipcode": 85202,
    "date": "8/23/2017"
  },
  {
    "id": 278,
    "country": "usa",
    "city": "westminster",
    "name": "front range c c - westminster",
    "state": "co",
    "zipcode": 80031,
    "date": "8/23/2017"
  },
  {
    "id": 279,
    "country": "usa",
    "city": "dahlonega",
    "name": "univ of n georgia -dahlonega",
    "state": "ga",
    "zipcode": 30597,
    "date": "8/23/2017"
  },
  {
    "id": 280,
    "country": "usa",
    "city": "lake charles",
    "name": "mcneese state university",
    "state": "la",
    "zipcode": "70609-0001",
    "date": "8/23/2017"
  },
  {
    "id": 281,
    "country": "usa",
    "city": "north little rock",
    "name": "pulaski technical college",
    "state": "ar",
    "zipcode": "72118-3347",
    "date": "8/23/2017"
  },
  {
    "id": 282,
    "country": "usa",
    "city": "crystal lake",
    "name": "mchenry county college",
    "state": "il",
    "zipcode": "60012-2738",
    "date": "8/23/2017"
  },
  {
    "id": 283,
    "country": "usa",
    "city": "joplin",
    "name": "ozark christian college",
    "state": "mo",
    "zipcode": 64801,
    "date": "8/23/2017"
  },
  {
    "id": 284,
    "country": "usa",
    "city": "gaffney",
    "name": "limestone college gaffney",
    "state": "sc",
    "zipcode": "29340-3778",
    "date": "8/23/2017"
  },
  {
    "id": 285,
    "country": "usa",
    "city": "fredonia",
    "name": "state univ coll at fredonia",
    "state": "ny",
    "zipcode": "14063-1127",
    "date": "8/23/2017"
  },
  {
    "id": 286,
    "country": "usa",
    "city": "vermillion",
    "name": "university of south dakota",
    "state": "sd",
    "zipcode": "57069-2307",
    "date": "8/23/2017"
  },
  {
    "id": 287,
    "country": "usa",
    "city": "beaufort",
    "name": "tech coll of the low ctry",
    "state": "sc",
    "zipcode": "29902-5441",
    "date": "8/23/2017"
  },
  {
    "id": 288,
    "country": "usa",
    "city": "saint petersburg",
    "name": "univ of south florida st petersburg",
    "state": "fl",
    "zipcode": "33701-5016",
    "date": "8/23/2017"
  },
  {
    "id": 289,
    "country": "usa",
    "city": "scooba",
    "name": "east mississippi comm coll",
    "state": "ms",
    "zipcode": 39358,
    "date": "8/23/2017"
  },
  {
    "id": 290,
    "country": "usa",
    "city": "cocoa",
    "name": "eastern fl st coll - cocoa",
    "state": "fl",
    "zipcode": "32922-6598",
    "date": "8/23/2017"
  },
  {
    "id": 291,
    "country": "usa",
    "city": "new york",
    "name": "city college of cuny",
    "state": "ny",
    "zipcode": "10031-9101",
    "date": "8/23/2017"
  },
  {
    "id": 292,
    "country": "usa",
    "city": "kearney",
    "name": "u of nebraska-kearney",
    "state": "ne",
    "zipcode": "68849-0001",
    "date": "8/23/2017"
  },
  {
    "id": 293,
    "country": "usa",
    "city": "duluth",
    "name": "lake superior college",
    "state": "mn",
    "zipcode": "55811-3349",
    "date": "8/23/2017"
  },
  {
    "id": 294,
    "country": "usa",
    "city": "wesley chapel",
    "name": "pasco hernando st coll - porter",
    "state": "fl",
    "zipcode": 33543,
    "date": "8/23/2017"
  },
  {
    "id": 295,
    "country": "usa",
    "city": "san jacinto",
    "name": "mount san jacinto college",
    "state": "ca",
    "zipcode": 92583,
    "date": "8/23/2017"
  },
  {
    "id": 296,
    "country": "usa",
    "city": "salisbury",
    "name": "rowan cabarrus comm coll",
    "state": "nc",
    "zipcode": "28146-8357",
    "date": "8/23/2017"
  },
  {
    "id": 297,
    "country": "usa",
    "city": "charleston",
    "name": "college of charleston",
    "state": "sc",
    "zipcode": "29424-0001",
    "date": "8/23/2017"
  },
  {
    "id": 298,
    "country": "usa",
    "city": "milledgeville",
    "name": "georgia coll &amp; state univ",
    "state": "ga",
    "zipcode": 31061,
    "date": "8/23/2017"
  },
  {
    "id": 299,
    "country": "usa",
    "city": "columbus",
    "name": "capital university",
    "state": "oh",
    "zipcode": 43209,
    "date": "8/23/2017"
  },
  {
    "id": 300,
    "country": "usa",
    "city": "meridian",
    "name": "meridian cc",
    "state": "ms",
    "zipcode": "39307-5801",
    "date": "8/23/2017"
  },
  {
    "id": 301,
    "country": "usa",
    "city": "albany",
    "name": "albany state university",
    "state": "ga",
    "zipcode": "31705-2717",
    "date": "8/23/2017"
  },
  {
    "id": 302,
    "country": "usa",
    "city": "chicago",
    "name": "depaul university",
    "state": "il",
    "zipcode": "60614-3282",
    "date": "8/23/2017"
  },
  {
    "id": 303,
    "country": "usa",
    "city": "san marcos",
    "name": "texas state univ - san marcos",
    "state": "tx",
    "zipcode": 78666,
    "date": "8/23/2017"
  },
  {
    "id": 304,
    "country": "usa",
    "city": "wildwood",
    "name": "st louis comm coll - wildwood",
    "state": "mo",
    "zipcode": "63040-1168",
    "date": "8/23/2017"
  },
  {
    "id": 305,
    "country": "usa",
    "city": "galesburg",
    "name": "carl sandburg coll-galesburg",
    "state": "il",
    "zipcode": "61401-9574",
    "date": "8/23/2017"
  },
  {
    "id": 306,
    "country": "usa",
    "city": "senatobia",
    "name": "northwest miss comm coll",
    "state": "ms",
    "zipcode": "38668-1714",
    "date": "8/23/2017"
  },
  {
    "id": 307,
    "country": "usa",
    "city": "fort wayne",
    "name": "in univ-purdue univ - ft wayne",
    "state": "in",
    "zipcode": 46805,
    "date": "8/23/2017"
  },
  {
    "id": 308,
    "country": "usa",
    "city": "augusta",
    "name": "georgia regents univ",
    "state": "ga",
    "zipcode": "30904-4562",
    "date": "8/23/2017"
  },
  {
    "id": 309,
    "country": "usa",
    "city": "albuquerque",
    "name": "univ of new mexico sch med",
    "state": "nm",
    "zipcode": 87131,
    "date": "8/23/2017"
  },
  {
    "id": 310,
    "country": "usa",
    "city": "spruce pine",
    "name": "mayland community college",
    "state": "nc",
    "zipcode": "28777-8434",
    "date": "8/23/2017"
  },
  {
    "id": 311,
    "country": "usa",
    "city": "tarpon springs",
    "name": "st petersburg  coll-tarpon spg",
    "state": "fl",
    "zipcode": "34689-1299",
    "date": "8/23/2017"
  },
  {
    "id": 312,
    "country": "usa",
    "city": "fredericksburg",
    "name": "university of mary washington",
    "state": "va",
    "zipcode": "22401-5300",
    "date": "8/23/2017"
  },
  {
    "id": 313,
    "country": "usa",
    "city": "iowa city",
    "name": "university of iowa",
    "state": "ia",
    "zipcode": 52242,
    "date": "8/23/2017"
  },
  {
    "id": 314,
    "country": "usa",
    "city": "booneville",
    "name": "northeast miss cc",
    "state": "ms",
    "zipcode": "38829-1726",
    "date": "8/23/2017"
  },
  {
    "id": 315,
    "country": "usa",
    "city": "fargo",
    "name": "north dakota st university",
    "state": "nd",
    "zipcode": 58102,
    "date": "8/23/2017"
  },
  {
    "id": 316,
    "country": "usa",
    "city": "high point",
    "name": "high point university",
    "state": "nc",
    "zipcode": "27262-4221",
    "date": "8/23/2017"
  },
  {
    "id": 317,
    "country": "usa",
    "city": "hilo",
    "name": "univ of hawaii at hilo",
    "state": "hi",
    "zipcode": 967204091,
    "date": "8/23/2017"
  },
  {
    "id": 318,
    "country": "usa",
    "city": "aurora",
    "name": "metropolitan st univ of denver",
    "state": "co",
    "zipcode": 80014,
    "date": "8/23/2017"
  },
  {
    "id": 319,
    "country": "usa",
    "city": "tupelo",
    "name": "itawamba cc-tupelo",
    "state": "ms",
    "zipcode": "38804-5981",
    "date": "8/23/2017"
  },
  {
    "id": 320,
    "country": "usa",
    "city": "oceanside",
    "name": "mira costa college",
    "state": "ca",
    "zipcode": 92056,
    "date": "8/23/2017"
  },
  {
    "id": 321,
    "country": "usa",
    "city": "san diego",
    "name": "san diego miramar college",
    "state": "ca",
    "zipcode": 92126,
    "date": "8/23/2017"
  },
  {
    "id": 322,
    "country": "usa",
    "city": "pembroke",
    "name": "univ of nc - pembroke",
    "state": "nc",
    "zipcode": 28372,
    "date": "8/23/2017"
  },
  {
    "id": 323,
    "country": "usa",
    "city": "richland",
    "name": "wsu - tri cities",
    "state": "wa",
    "zipcode": "99354-1671",
    "date": "8/23/2017"
  },
  {
    "id": 324,
    "country": "usa",
    "city": "kutztown",
    "name": "kutztown university",
    "state": "pa",
    "zipcode": 19530,
    "date": "8/23/2017"
  },
  {
    "id": 325,
    "country": "usa",
    "city": "council bluffs",
    "name": "iowa wstn cc-council bluffs",
    "state": "ia",
    "zipcode": "51503-1057",
    "date": "8/23/2017"
  },
  {
    "id": 326,
    "country": "usa",
    "city": "wilmington",
    "name": "univ of nc - wilmington",
    "state": "nc",
    "zipcode": "28403-3201",
    "date": "8/23/2017"
  },
  {
    "id": 327,
    "country": "usa",
    "city": "hampden sydney",
    "name": "hampden-sydney college",
    "state": "va",
    "zipcode": 23943,
    "date": "8/23/2017"
  },
  {
    "id": 328,
    "country": "usa",
    "city": "fort smith",
    "name": "ua fort smith",
    "state": "ar",
    "zipcode": 72904,
    "date": "8/23/2017"
  },
  {
    "id": 329,
    "country": "usa",
    "city": "charleston",
    "name": "trident tech - palmer",
    "state": "sc",
    "zipcode": "29403-5637",
    "date": "8/23/2017"
  },
  {
    "id": 330,
    "country": "usa",
    "city": "morgantown",
    "name": "west virginia university",
    "state": "wv",
    "zipcode": 26506,
    "date": "8/23/2017"
  },
  {
    "id": 331,
    "country": "usa",
    "city": "lakeland",
    "name": "polk state coll - lakeland",
    "state": "fl",
    "zipcode": 33803,
    "date": "8/23/2017"
  },
  {
    "id": 332,
    "country": "usa",
    "city": "east peoria",
    "name": "illinois central college",
    "state": "il",
    "zipcode": "61635-0001",
    "date": "8/23/2017"
  },
  {
    "id": 333,
    "country": "usa",
    "city": "north las vegas",
    "name": "coll of s nv - cheyenne",
    "state": "nv",
    "zipcode": 89030,
    "date": "8/23/2017"
  },
  {
    "id": 334,
    "country": "usa",
    "city": "winchester",
    "name": "shenandoah university",
    "state": "va",
    "zipcode": "22601-5100",
    "date": "8/23/2017"
  },
  {
    "id": 335,
    "country": "usa",
    "city": "dover",
    "name": "del tech &amp; cc - dover",
    "state": "de",
    "zipcode": "19904-1383",
    "date": "8/23/2017"
  },
  {
    "id": 336,
    "country": "usa",
    "city": "dickinson",
    "name": "dickinson state univ",
    "state": "nd",
    "zipcode": "58601-4853",
    "date": "8/23/2017"
  },
  {
    "id": 337,
    "country": "usa",
    "city": "st leo",
    "name": "saint leo university",
    "state": "fl",
    "zipcode": 33574,
    "date": "8/23/2017"
  },
  {
    "id": 338,
    "country": "usa",
    "city": "carbondale",
    "name": "so illinois univ-carbondale",
    "state": "il",
    "zipcode": 62901,
    "date": "8/23/2017"
  },
  {
    "id": 339,
    "country": "usa",
    "city": "columbus",
    "name": "ohio state univ - main",
    "state": "oh",
    "zipcode": 43210,
    "date": "8/23/2017"
  },
  {
    "id": 340,
    "country": "usa",
    "city": "weatherford",
    "name": "southwestern okla state unv",
    "state": "ok",
    "zipcode": 73096,
    "date": "8/23/2017"
  },
  {
    "id": 341,
    "country": "usa",
    "city": "los lunas",
    "name": "unm-valencia",
    "state": "nm",
    "zipcode": 87031,
    "date": "8/23/2017"
  },
  {
    "id": 342,
    "country": "usa",
    "city": "south bend",
    "name": "indiana univ - south bend",
    "state": "in",
    "zipcode": "46615-1408",
    "date": "8/23/2017"
  },
  {
    "id": 343,
    "country": "usa",
    "city": "fort collins",
    "name": "colorado st univ - ft collins",
    "state": "co",
    "zipcode": 80523,
    "date": "8/23/2017"
  },
  {
    "id": 344,
    "country": "usa",
    "city": "springfield",
    "name": "lincoln land cmty college",
    "state": "il",
    "zipcode": "62794-9256",
    "date": "8/23/2017"
  },
  {
    "id": 345,
    "country": "usa",
    "city": "crookston",
    "name": "university of minnesota - crookston",
    "state": "mn",
    "zipcode": "56716-5000",
    "date": "8/23/2017"
  },
  {
    "id": 346,
    "country": "usa",
    "city": "hays",
    "name": "fort hays state university",
    "state": "ks",
    "zipcode": "67601-4009",
    "date": "8/23/2017"
  },
  {
    "id": 347,
    "country": "usa",
    "city": "tallahassee",
    "name": "tallahassee community colle",
    "state": "fl",
    "zipcode": "32304-2815",
    "date": "8/23/2017"
  },
  {
    "id": 348,
    "country": "usa",
    "city": "farmville",
    "name": "longwood university",
    "state": "va",
    "zipcode": 23909,
    "date": "8/23/2017"
  },
  {
    "id": 349,
    "country": "usa",
    "city": "tampa",
    "name": "hillsborough cmty coll dm",
    "state": "fl",
    "zipcode": "33614-7810",
    "date": "8/23/2017"
  },
  {
    "id": 350,
    "country": "usa",
    "city": "arlington",
    "name": "univ of texas - arlington",
    "state": "tx",
    "zipcode": 76019,
    "date": "8/23/2017"
  },
  {
    "id": 351,
    "country": "usa",
    "city": "aurora",
    "name": "community coll of aurora",
    "state": "co",
    "zipcode": 80011,
    "date": "8/23/2017"
  },
  {
    "id": 352,
    "country": "usa",
    "city": "dayton",
    "name": "sinclair community college",
    "state": "oh",
    "zipcode": "45402-1421",
    "date": "8/23/2017"
  },
  {
    "id": 353,
    "country": "usa",
    "city": "atlanta",
    "name": "atlanta metro college",
    "state": "ga",
    "zipcode": "30310-4448",
    "date": "8/23/2017"
  },
  {
    "id": 354,
    "country": "usa",
    "city": "naples",
    "name": "southwest florida college",
    "state": "fl",
    "zipcode": 33962,
    "date": "8/23/2017"
  },
  {
    "id": 355,
    "country": "usa",
    "city": "lawrenceburg",
    "name": "ivy tech comm coll - lawrenceb",
    "state": "in",
    "zipcode": 47025,
    "date": "8/23/2017"
  },
  {
    "id": 356,
    "country": "usa",
    "city": "gary",
    "name": "indiana univ northwest",
    "state": "in",
    "zipcode": "46408-1101",
    "date": "8/23/2017"
  },
  {
    "id": 357,
    "country": "usa",
    "city": "hartford",
    "name": "connecticut state colleges & universities",
    "state": "ct",
    "zipcode": 6105,
    "date": "8/23/2017"
  },
  {
    "id": 358,
    "country": "usa",
    "city": "palatka",
    "name": "st johns river st coll - palatka",
    "state": "fl",
    "zipcode": "32177-3807",
    "date": "8/23/2017"
  },
  {
    "id": 359,
    "country": "usa",
    "city": "grand forks",
    "name": "university of north dakota",
    "state": "nd",
    "zipcode": 58202,
    "date": "8/23/2017"
  },
  {
    "id": 360,
    "country": "usa",
    "city": "overland park",
    "name": "johnson county cmty college",
    "state": "ks",
    "zipcode": 66210,
    "date": "8/23/2017"
  },
  {
    "id": 361,
    "country": "usa",
    "city": "middletown",
    "name": "lord fairfax cc - middletown",
    "state": "va",
    "zipcode": "22645-1745",
    "date": "8/23/2017"
  },
  {
    "id": 362,
    "country": "usa",
    "city": "athens",
    "name": "ohio university - athens",
    "state": "oh",
    "zipcode": 45701,
    "date": "8/23/2017"
  },
  {
    "id": 363,
    "country": "usa",
    "city": "savannah",
    "name": "savannah state university",
    "state": "ga",
    "zipcode": "31404-5254",
    "date": "8/23/2017"
  },
  {
    "id": 364,
    "country": "usa",
    "city": "san jose",
    "name": "san jose state university",
    "state": "ca",
    "zipcode": 95192,
    "date": "8/23/2017"
  },
  {
    "id": 365,
    "country": "usa",
    "city": "detroit",
    "name": "wayne state university",
    "state": "mi",
    "zipcode": 48202,
    "date": "8/23/2017"
  },
  {
    "id": 366,
    "country": "usa",
    "city": "bettendorf",
    "name": "scott comm coll",
    "state": "ia",
    "zipcode": "52722-5649",
    "date": "8/23/2017"
  },
  {
    "id": 367,
    "country": "usa",
    "city": "rochester",
    "name": "rochester comm &amp; tech coll",
    "state": "mn",
    "zipcode": "55904-4915",
    "date": "8/23/2017"
  },
  {
    "id": 368,
    "country": "usa",
    "city": "laredo",
    "name": "texas a&amp;m international u",
    "state": "tx",
    "zipcode": 78041,
    "date": "8/23/2017"
  },
  {
    "id": 369,
    "country": "usa",
    "city": "new albany",
    "name": "indiana univ-southeast cmp",
    "state": "in",
    "zipcode": "47150-2158",
    "date": "8/23/2017"
  },
  {
    "id": 370,
    "country": "usa",
    "city": "knoxville",
    "name": "university of tennessee",
    "state": "tn",
    "zipcode": "37996-0341",
    "date": "8/23/2017"
  },
  {
    "id": 371,
    "country": "usa",
    "city": "smithfield",
    "name": "johnston community college",
    "state": "nc",
    "zipcode": "27577-2350",
    "date": "8/23/2017"
  },
  {
    "id": 372,
    "country": "usa",
    "city": "denton",
    "name": "texas womans university",
    "state": "tx",
    "zipcode": 76204,
    "date": "8/23/2017"
  },
  {
    "id": 373,
    "country": "usa",
    "city": "yuma",
    "name": "arizona western college",
    "state": "az",
    "zipcode": 85365,
    "date": "8/23/2017"
  },
  {
    "id": 374,
    "country": "usa",
    "city": "arcata",
    "name": "humboldt state university",
    "state": "ca",
    "zipcode": 95521,
    "date": "8/23/2017"
  },
  {
    "id": 375,
    "country": "usa",
    "city": "west columbia",
    "name": "midlands tech c-airport",
    "state": "sc",
    "zipcode": "29170-2176",
    "date": "8/23/2017"
  },
  {
    "id": 376,
    "country": "usa",
    "city": "adrian",
    "name": "adrian college",
    "state": "mi",
    "zipcode": "49221-2518",
    "date": "8/23/2017"
  },
  {
    "id": 377,
    "country": "usa",
    "city": "mc kenzie",
    "name": "bethel univ - mckenzie",
    "state": "tn",
    "zipcode": "38201-1769",
    "date": "8/23/2017"
  },
  {
    "id": 378,
    "country": "usa",
    "city": "oglesby",
    "name": "ill valley comm coll",
    "state": "il",
    "zipcode": "61348-9692",
    "date": "8/23/2017"
  },
  {
    "id": 379,
    "country": "usa",
    "city": "philadelphia",
    "name": "la salle university",
    "state": "pa",
    "zipcode": "19141-1108",
    "date": "8/23/2017"
  },
  {
    "id": 380,
    "country": "usa",
    "city": "pleasanton",
    "name": "chabot-las positas cc",
    "state": "ca",
    "zipcode": 94588,
    "date": "8/23/2017"
  },
  {
    "id": 381,
    "country": "usa",
    "city": "nelsonville",
    "name": "hocking college",
    "state": "oh",
    "zipcode": "45764-9582",
    "date": "8/23/2017"
  },
  {
    "id": 382,
    "country": "usa",
    "city": "shalimar",
    "name": "univ of florida-gainesville",
    "state": "fl",
    "zipcode": "32579-1163",
    "date": "8/23/2017"
  },
  {
    "id": 383,
    "country": "usa",
    "city": "palos hills",
    "name": "moraine valley cmty coll",
    "state": "il",
    "zipcode": "60465-1444",
    "date": "8/23/2017"
  },
  {
    "id": 384,
    "country": "usa",
    "city": "fredericksburg",
    "name": "germanna comm coll",
    "state": "va",
    "zipcode": 22408,
    "date": "8/23/2017"
  },
  {
    "id": 385,
    "country": "usa",
    "city": "newark",
    "name": "del tech stanton/newark",
    "state": "de",
    "zipcode": "19713-2111",
    "date": "8/23/2017"
  },
  {
    "id": 386,
    "country": "usa",
    "city": "las vegas",
    "name": "new mexico highlands univ",
    "state": "nm",
    "zipcode": 87701,
    "date": "8/23/2017"
  },
  {
    "id": 387,
    "country": "usa",
    "city": "white bear lake",
    "name": "century comm tech college",
    "state": "mn",
    "zipcode": "55110-1842",
    "date": "8/23/2017"
  },
  {
    "id": 388,
    "country": "usa",
    "city": "richmond",
    "name": "indiana univ east",
    "state": "in",
    "zipcode": "47374-1220",
    "date": "8/23/2017"
  },
  {
    "id": 389,
    "country": "usa",
    "city": "roswell",
    "name": "eastern nm univ - roswell",
    "state": "nm",
    "zipcode": 88201,
    "date": "8/23/2017"
  },
  {
    "id": 390,
    "country": "usa",
    "city": "salt lake city",
    "name": "salt lake community college",
    "state": "ut",
    "zipcode": 84123,
    "date": "8/23/2017"
  },
  {
    "id": 391,
    "country": "usa",
    "city": "perrysburg",
    "name": "owens community college",
    "state": "oh",
    "zipcode": 43551,
    "date": "8/23/2017"
  },
  {
    "id": 392,
    "country": "usa",
    "city": "joliet",
    "name": "joliet junior college",
    "state": "il",
    "zipcode": "60431-8938",
    "date": "8/23/2017"
  },
  {
    "id": 393,
    "country": "usa",
    "city": "tucson",
    "name": "pima cc - comm campus",
    "state": "az",
    "zipcode": 857096000,
    "date": "8/23/2017"
  },
  {
    "id": 394,
    "country": "usa",
    "city": "universal city",
    "name": "accd - ne lakeview campus",
    "state": "tx",
    "zipcode": 78148,
    "date": "8/23/2017"
  },
  {
    "id": 395,
    "country": "usa",
    "city": "lancaster",
    "name": "univ of sc - lancaster",
    "state": "sc",
    "zipcode": "29720-5615",
    "date": "8/23/2017"
  },
  {
    "id": 396,
    "country": "usa",
    "city": "morganton",
    "name": "western piedmont cc",
    "state": "nc",
    "zipcode": "28655-4504",
    "date": "8/23/2017"
  },
  {
    "id": 397,
    "country": "usa",
    "city": "tuscaloosa",
    "name": "shelton state cc",
    "state": "al",
    "zipcode": "35405-8522",
    "date": "8/23/2017"
  },
  {
    "id": 398,
    "country": "usa",
    "city": "monterey park",
    "name": "east los angeles coll - mp",
    "state": "ca",
    "zipcode": 91754,
    "date": "2/10/2015"
  },
  {
    "id": 399,
    "country": "usa",
    "city": "worcester",
    "name": "worcester state university",
    "state": "ma",
    "zipcode": "01602-2861",
    "date": "2/10/2015"
  },
  {
    "id": 400,
    "country": "usa",
    "city": "boulder",
    "name": "univ of colorado boulder",
    "state": "co",
    "zipcode": 80309,
    "date": "2/10/2015"
  },
  {
    "id": 401,
    "country": "usa",
    "city": "pasadena",
    "name": "pasadena city college",
    "state": "ca",
    "zipcode": 91106,
    "date": "2/10/2015"
  },
  {
    "id": 402,
    "country": "usa",
    "city": "toledo",
    "name": "university of toledo",
    "state": "oh",
    "zipcode": "43606-3328",
    "date": "2/10/2015"
  },
  {
    "id": 403,
    "country": "usa",
    "city": "edison",
    "name": "middlesex cnty coll-edison",
    "state": "nj",
    "zipcode": 8818,
    "date": "2/10/2015"
  },
  {
    "id": 404,
    "country": "usa",
    "city": "bronx",
    "name": "bronx community college",
    "state": "ny",
    "zipcode": "10453-2804",
    "date": "2/10/2015"
  },
  {
    "id": 405,
    "country": "usa",
    "city": "beeville",
    "name": "coastal bend college",
    "state": "tx",
    "zipcode": 78102,
    "date": "2/10/2015"
  },
  {
    "id": 406,
    "country": "usa",
    "city": "tulsa",
    "name": "tulsa comm coll se",
    "state": "ok",
    "zipcode": 74133,
    "date": "2/10/2015"
  },
  {
    "id": 407,
    "country": "usa",
    "city": "college station",
    "name": "texas a&amp;m univ - college stn",
    "state": "tx",
    "zipcode": 77843,
    "date": "2/10/2015"
  },
  {
    "id": 408,
    "country": "usa",
    "city": "college park",
    "name": "univ maryland college park",
    "state": "md",
    "zipcode": 20742,
    "date": "2/10/2015"
  },
  {
    "id": 409,
    "country": "usa",
    "city": "huntington beach",
    "name": "golden west college",
    "state": "ca",
    "zipcode": 92647,
    "date": "2/10/2015"
  },
  {
    "id": 410,
    "country": "usa",
    "city": "warwick",
    "name": "cmty coll of r i-warwick",
    "state": "ri",
    "zipcode": "02886-1805",
    "date": "2/10/2015"
  },
  {
    "id": 411,
    "country": "usa",
    "city": "palm desert",
    "name": "college of the desert",
    "state": "ca",
    "zipcode": 92260,
    "date": "2/10/2015"
  },
  {
    "id": 412,
    "country": "usa",
    "city": "rochester",
    "name": "rochester inst of tech",
    "state": "ny",
    "zipcode": "14623-5603",
    "date": "2/10/2015"
  },
  {
    "id": 413,
    "country": "usa",
    "city": "valencia",
    "name": "college of the canyons",
    "state": "ca",
    "zipcode": 91355,
    "date": "2/10/2015"
  },
  {
    "id": 414,
    "country": "usa",
    "city": "rockville",
    "name": "montgomery coll-rockville",
    "state": "md",
    "zipcode": "20855-2811",
    "date": "2/10/2015"
  },
  {
    "id": 415,
    "country": "usa",
    "city": "york",
    "name": "hacc york",
    "state": "pa",
    "zipcode": 17404,
    "date": "2/10/2015"
  },
  {
    "id": 416,
    "country": "usa",
    "city": "houston",
    "name": "univ of houston-downtown",
    "state": "tx",
    "zipcode": 77002,
    "date": "2/10/2015"
  },
  {
    "id": 417,
    "country": "usa",
    "city": "austin",
    "name": "univ of texas - austin",
    "state": "tx",
    "zipcode": 78712,
    "date": "2/10/2015"
  },
  {
    "id": 418,
    "country": "usa",
    "city": "baltimore",
    "name": "maryland inst coll of art",
    "state": "md",
    "zipcode": "21217-4134",
    "date": "2/10/2015"
  },
  {
    "id": 419,
    "country": "usa",
    "city": "saint petersburg",
    "name": "st petersburg coll-st pete/gib",
    "state": "fl",
    "zipcode": "33710-6801",
    "date": "2/10/2015"
  },
  {
    "id": 420,
    "country": "usa",
    "city": "san diego",
    "name": "san diego state university",
    "state": "ca",
    "zipcode": 92182,
    "date": "2/10/2015"
  },
  {
    "id": 421,
    "country": "usa",
    "city": "san diego",
    "name": "san diego mesa college",
    "state": "ca",
    "zipcode": 92111,
    "date": "2/11/2015"
  },
  {
    "id": 422,
    "country": "usa",
    "city": "irvine",
    "name": "irvine valley college",
    "state": "ca",
    "zipcode": 92618,
    "date": "2/11/2015"
  },
  {
    "id": 423,
    "country": "usa",
    "city": "menifee",
    "name": "mt san jacinto coll - menifee",
    "state": "ca",
    "zipcode": 92584,
    "date": "2/11/2015"
  },
  {
    "id": 424,
    "country": "usa",
    "city": "san marcos",
    "name": "palomar college",
    "state": "ca",
    "zipcode": 92069,
    "date": "2/11/2015"
  },
  {
    "id": 425,
    "country": "usa",
    "city": "new york",
    "name": "new york university",
    "state": "ny",
    "zipcode": 10012,
    "date": "2/11/2015"
  },
  {
    "id": 426,
    "country": "usa",
    "city": "oregon city",
    "name": "clackamas community college",
    "state": "or",
    "zipcode": 97045,
    "date": "2/11/2015"
  },
  {
    "id": 427,
    "country": "usa",
    "city": "baltimore",
    "name": "university of maryland-baltimore cty",
    "state": "md",
    "zipcode": "21250-0001",
    "date": "2/11/2015"
  },
  {
    "id": 428,
    "country": "usa",
    "city": "alice",
    "name": "coastal bend coll/alice cmp",
    "state": "tx",
    "zipcode": 78332,
    "date": "2/11/2015"
  },
  {
    "id": 429,
    "country": "usa",
    "city": "portsmouth",
    "name": "tidewater cc-portsmouth",
    "state": "va",
    "zipcode": 23701,
    "date": "2/11/2015"
  },
  {
    "id": 430,
    "country": "usa",
    "city": "flagstaff",
    "name": "northern arizona university",
    "state": "az",
    "zipcode": 86011,
    "date": "2/11/2015"
  },
  {
    "id": 431,
    "country": "usa",
    "city": "holyoke",
    "name": "holyoke comm coll",
    "state": "ma",
    "zipcode": "01040-1091",
    "date": "2/11/2015"
  },
  {
    "id": 432,
    "country": "usa",
    "city": "paramus",
    "name": "bergen community college",
    "state": "nj",
    "zipcode": "07652-1508",
    "date": "2/11/2015"
  },
  {
    "id": 433,
    "country": "usa",
    "city": "nashville",
    "name": "lipscomb university",
    "state": "tn",
    "zipcode": 37204,
    "date": "2/11/2015"
  },
  {
    "id": 434,
    "country": "usa",
    "city": "trinidad",
    "name": "trinidad state jr college",
    "state": "co",
    "zipcode": 81082,
    "date": "2/11/2015"
  },
  {
    "id": 435,
    "country": "usa",
    "city": "millersville",
    "name": "millersville university",
    "state": "pa",
    "zipcode": 17551,
    "date": "2/11/2015"
  },
  {
    "id": 436,
    "country": "usa",
    "city": "indianapolis",
    "name": "ivy tech comm coll - central",
    "state": "in",
    "zipcode": "46208-5752",
    "date": "2/11/2015"
  },
  {
    "id": 437,
    "country": "usa",
    "city": "burlington",
    "name": "univ of vermont",
    "state": "vt",
    "zipcode": "05405-0001",
    "date": "2/11/2015"
  },
  {
    "id": 438,
    "country": "usa",
    "city": "lynnwood",
    "name": "edmonds cmty coll-lynnwood",
    "state": "wa",
    "zipcode": 98036,
    "date": "2/11/2015"
  },
  {
    "id": 439,
    "country": "usa",
    "city": "teaneck",
    "name": "fdu teaneck",
    "state": "nj",
    "zipcode": 7666,
    "date": "2/11/2015"
  },
  {
    "id": 440,
    "country": "usa",
    "city": "carrollton",
    "name": "univ of west ga - carrollton",
    "state": "ga",
    "zipcode": "30118-0001",
    "date": "2/11/2015"
  },
  {
    "id": 441,
    "country": "usa",
    "city": "des plaines",
    "name": "oakton community college",
    "state": "il",
    "zipcode": "60016-1234",
    "date": "2/11/2015"
  },
  {
    "id": 442,
    "country": "usa",
    "city": "reedley",
    "name": "reedley clg",
    "state": "ca",
    "zipcode": 93654,
    "date": "2/11/2015"
  },
  {
    "id": 443,
    "country": "usa",
    "city": "sweet briar",
    "name": "sweet briar college",
    "state": "va",
    "zipcode": "24595-5001",
    "date": "2/11/2015"
  },
  {
    "id": 444,
    "country": "usa",
    "city": "ypsilanti",
    "name": "eastern michigan univ",
    "state": "mi",
    "zipcode": 48197,
    "date": "2/11/2015"
  },
  {
    "id": 445,
    "country": "usa",
    "city": "terre haute",
    "name": "indiana state university",
    "state": "in",
    "zipcode": "47809-1902",
    "date": "2/11/2015"
  },
  {
    "id": 446,
    "country": "usa",
    "city": "saint petersburg",
    "name": "eckerd college",
    "state": "fl",
    "zipcode": "33711-4744",
    "date": "2/11/2015"
  },
  {
    "id": 447,
    "country": "usa",
    "city": "albany",
    "name": "university at albany",
    "state": "ny",
    "zipcode": "12222-0001",
    "date": "2/11/2015"
  },
  {
    "id": 448,
    "country": "usa",
    "city": "cincinnati",
    "name": "xavier university",
    "state": "oh",
    "zipcode": "45207-1035",
    "date": "2/11/2015"
  },
  {
    "id": 449,
    "country": "usa",
    "city": "spearfish",
    "name": "black hills state univ",
    "state": "sd",
    "zipcode": "57799-8840",
    "date": "2/11/2015"
  },
  {
    "id": 450,
    "country": "usa",
    "city": "tucson",
    "name": "pima comm coll/desert vista",
    "state": "az",
    "zipcode": 857096000,
    "date": "2/11/2015"
  },
  {
    "id": 451,
    "country": "usa",
    "city": "dearborn",
    "name": "univ of michigan-dearborn",
    "state": "mi",
    "zipcode": "48128-2406",
    "date": "2/11/2015"
  },
  {
    "id": 452,
    "country": "usa",
    "city": "casper",
    "name": "university of wyoming",
    "state": "wy",
    "zipcode": 82601,
    "date": "2/11/2015"
  },
  {
    "id": 453,
    "country": "usa",
    "city": "dekalb",
    "name": "northern illinois univ",
    "state": "il",
    "zipcode": 60115,
    "date": "2/11/2015"
  },
  {
    "id": 454,
    "country": "usa",
    "city": "norfolk",
    "name": "tidewater comm coll/norfolk",
    "state": "va",
    "zipcode": "23510-1910",
    "date": "2/11/2015"
  },
  {
    "id": 455,
    "country": "usa",
    "city": "valley glen",
    "name": "los angeles valley college",
    "state": "ca",
    "zipcode": 914014096,
    "date": "2/11/2015"
  },
  {
    "id": 456,
    "country": "usa",
    "city": "worcester",
    "name": "clark university",
    "state": "ma",
    "zipcode": 1610,
    "date": "2/11/2015"
  },
  {
    "id": 457,
    "country": "usa",
    "city": "cheney",
    "name": "eastern washington univ",
    "state": "wa",
    "zipcode": 99004,
    "date": "2/12/2015"
  },
  {
    "id": 458,
    "country": "usa",
    "city": "avon park",
    "name": "south florida state coll",
    "state": "fl",
    "zipcode": 33825,
    "date": "2/12/2015"
  },
  {
    "id": 459,
    "country": "usa",
    "city": "west barnstable",
    "name": "cape cod comm coll",
    "state": "ma",
    "zipcode": "02668-1532",
    "date": "2/12/2015"
  },
  {
    "id": 460,
    "country": "usa",
    "city": "russellville",
    "name": "arkansas tech university",
    "state": "ar",
    "zipcode": 72801,
    "date": "2/12/2015"
  },
  {
    "id": 461,
    "country": "usa",
    "city": "chesapeake",
    "name": "tidewater cc-chesapeake",
    "state": "va",
    "zipcode": "23322-7108",
    "date": "2/12/2015"
  },
  {
    "id": 462,
    "country": "usa",
    "city": "irving",
    "name": "univ of dallas",
    "state": "tx",
    "zipcode": 75062,
    "date": "2/12/2015"
  },
  {
    "id": 463,
    "country": "usa",
    "city": "norfolk",
    "name": "george washington univ",
    "state": "va",
    "zipcode": 23502,
    "date": "2/12/2015"
  },
  {
    "id": 464,
    "country": "usa",
    "city": "glendale",
    "name": "arizona state univ - west",
    "state": "az",
    "zipcode": "85306-4908",
    "date": "2/12/2015"
  },
  {
    "id": 465,
    "country": "usa",
    "city": "poughkeepsie",
    "name": "marist college",
    "state": "ny",
    "zipcode": "12601-1350",
    "date": "2/12/2015"
  },
  {
    "id": 466,
    "country": "usa",
    "city": "kalamazoo",
    "name": "western michigan univ",
    "state": "mi",
    "zipcode": 49008,
    "date": "2/12/2015"
  },
  {
    "id": 467,
    "country": "usa",
    "city": "delhi",
    "name": "suny - delhi",
    "state": "ny",
    "zipcode": 13753,
    "date": "2/12/2015"
  },
  {
    "id": 468,
    "country": "usa",
    "city": "schuylkill haven",
    "name": "penn state u schuylkill",
    "state": "pa",
    "zipcode": "17972-2202",
    "date": "2/12/2015"
  },
  {
    "id": 469,
    "country": "usa",
    "city": "marion",
    "name": "marion technical college",
    "state": "oh",
    "zipcode": 43302,
    "date": "2/12/2015"
  },
  {
    "id": 470,
    "country": "usa",
    "city": "cedar city",
    "name": "southern utah university",
    "state": "ut",
    "zipcode": 84720,
    "date": "2/12/2015"
  },
  {
    "id": 471,
    "country": "usa",
    "city": "oakland",
    "name": "laney college",
    "state": "ca",
    "zipcode": 94607,
    "date": "2/12/2015"
  },
  {
    "id": 472,
    "country": "usa",
    "city": "long beach",
    "name": "long beach city college - a",
    "state": "ca",
    "zipcode": 90808,
    "date": "2/12/2015"
  },
  {
    "id": 473,
    "country": "usa",
    "city": "clarinda",
    "name": "iowa western cc-clarinda",
    "state": "ia",
    "zipcode": 51632,
    "date": "2/12/2015"
  },
  {
    "id": 474,
    "country": "usa",
    "city": "honolulu",
    "name": "hawaii pacific university",
    "state": "hi",
    "zipcode": 96813,
    "date": "2/12/2015"
  },
  {
    "id": 475,
    "country": "usa",
    "city": "milwaukee",
    "name": "univ of wisconsin - milwaukee",
    "state": "wi",
    "zipcode": 53211,
    "date": "2/12/2015"
  },
  {
    "id": 476,
    "country": "usa",
    "city": "torrance",
    "name": "el camino college",
    "state": "ca",
    "zipcode": 90506,
    "date": "2/13/2015"
  },
  {
    "id": 477,
    "country": "usa",
    "city": "chicago",
    "name": "univ of illinois at chicago",
    "state": "il",
    "zipcode": "60607-7100",
    "date": "2/13/2015"
  },
  {
    "id": 478,
    "country": "usa",
    "city": "new orleans",
    "name": "university of new orleans",
    "state": "la",
    "zipcode": "70148-0001",
    "date": "2/13/2015"
  },
  {
    "id": 479,
    "country": "usa",
    "city": "malta",
    "name": "kishwaukee community coll",
    "state": "il",
    "zipcode": 60150,
    "date": "2/13/2015"
  },
  {
    "id": 480,
    "country": "usa",
    "city": "honolulu",
    "name": "chaminade university",
    "state": "hi",
    "zipcode": 96816,
    "date": "2/13/2015"
  },
  {
    "id": 481,
    "country": "usa",
    "city": "new york",
    "name": "cuny hunter college",
    "state": "ny",
    "zipcode": 10021,
    "date": "2/13/2015"
  },
  {
    "id": 482,
    "country": "usa",
    "city": "canton",
    "name": "walsh university",
    "state": "oh",
    "zipcode": "44720-3336",
    "date": "2/13/2015"
  },
  {
    "id": 483,
    "country": "usa",
    "city": "commerce",
    "name": "texas a&amp;m univ - commerce",
    "state": "tx",
    "zipcode": 75428,
    "date": "2/13/2015"
  },
  {
    "id": 484,
    "country": "usa",
    "city": "blacksburg",
    "name": "virginia tech",
    "state": "va",
    "zipcode": 24061,
    "date": "2/13/2015"
  },
  {
    "id": 485,
    "country": "usa",
    "city": "denver",
    "name": "community college of denver",
    "state": "co",
    "zipcode": 80204,
    "date": "2/14/2015"
  },
  {
    "id": 486,
    "country": "usa",
    "city": "kingsville",
    "name": "coastal bend college-kingsvill",
    "state": "tx",
    "zipcode": 78363,
    "date": "2/14/2015"
  },
  {
    "id": 487,
    "country": "usa",
    "city": "seminole",
    "name": "st petersburg  coll - seminole",
    "state": "fl",
    "zipcode": "33772-2800",
    "date": "2/14/2015"
  },
  {
    "id": 488,
    "country": "usa",
    "city": "hayward",
    "name": "chabot college",
    "state": "ca",
    "zipcode": 94545,
    "date": "2/15/2015"
  },
  {
    "id": 489,
    "country": "usa",
    "city": "watertown",
    "name": "jefferson community college",
    "state": "ny",
    "zipcode": "13601-1822",
    "date": "2/15/2015"
  },
  {
    "id": 490,
    "country": "usa",
    "city": "university center",
    "name": "saginaw valley state univ",
    "state": "mi",
    "zipcode": "48710-0001",
    "date": "2/15/2015"
  },
  {
    "id": 491,
    "country": "usa",
    "city": "louisville",
    "name": "kctcs-jefferson-downtown",
    "state": "ky",
    "zipcode": "40202-2005",
    "date": "2/16/2015"
  },
  {
    "id": 492,
    "country": "usa",
    "city": "logan",
    "name": "utah state university",
    "state": "ut",
    "zipcode": 84322,
    "date": "2/16/2015"
  },
  {
    "id": 493,
    "country": "usa",
    "city": "battle creek",
    "name": "kellogg community college",
    "state": "mi",
    "zipcode": "49017-3306",
    "date": "2/16/2015"
  },
  {
    "id": 494,
    "country": "usa",
    "city": "saddle river",
    "name": "prentice hall university",
    "state": "nj",
    "zipcode": "07458-1813",
    "date": "2/16/2015"
  },
  {
    "id": 495,
    "country": "usa",
    "city": "portland",
    "name": "portland cc-cascade",
    "state": "or",
    "zipcode": 97217,
    "date": "2/16/2015"
  },
  {
    "id": 496,
    "country": "usa",
    "city": "tallahassee",
    "name": "florida state university",
    "state": "fl",
    "zipcode": 32306,
    "date": "2/16/2015"
  },
  {
    "id": 497,
    "country": "usa",
    "city": "glendale",
    "name": "glendale community college",
    "state": "ca",
    "zipcode": 91208,
    "date": "2/16/2015"
  },
  {
    "id": 498,
    "country": "usa",
    "city": "sioux falls",
    "name": "university of sioux falls",
    "state": "sd",
    "zipcode": 57105,
    "date": "2/17/2015"
  },
  {
    "id": 499,
    "country": "usa",
    "city": "montclair",
    "name": "montclair state university",
    "state": "nj",
    "zipcode": "07043-1624",
    "date": "2/17/2015"
  },
  {
    "id": 500,
    "country": "usa",
    "city": "bellingham",
    "name": "western washington univ",
    "state": "wa",
    "zipcode": 98225,
    "date": "2/17/2015"
  },
  {
    "id": 501,
    "country": "usa",
    "city": "columbus",
    "name": "columbus state university",
    "state": "ga",
    "zipcode": "31907-5679",
    "date": "2/17/2015"
  },
  {
    "id": 502,
    "country": "usa",
    "city": "valhalla",
    "name": "westchester cmty college",
    "state": "ny",
    "zipcode": "10595-1550",
    "date": "2/17/2015"
  },
  {
    "id": 503,
    "country": "usa",
    "city": "bristol",
    "name": "roger williams university",
    "state": "ri",
    "zipcode": "02809-2923",
    "date": "2/17/2015"
  },
  {
    "id": 504,
    "country": "usa",
    "city": "orange",
    "name": "chapman univ-orange",
    "state": "ca",
    "zipcode": 92866,
    "date": "2/17/2015"
  },
  {
    "id": 505,
    "country": "usa",
    "city": "tallahassee",
    "name": "florida agric &amp; mech univ",
    "state": "fl",
    "zipcode": 32307,
    "date": "2/17/2015"
  },
  {
    "id": 506,
    "country": "usa",
    "city": "las vegas",
    "name": "univ of nevada las vegas",
    "state": "nv",
    "zipcode": 89154,
    "date": "2/18/2015"
  },
  {
    "id": 507,
    "country": "usa",
    "city": "bellevue",
    "name": "bellevue university",
    "state": "ne",
    "zipcode": "68005-3058",
    "date": "2/18/2015"
  },
  {
    "id": 508,
    "country": "usa",
    "city": "norfolk",
    "name": "old dominion university",
    "state": "va",
    "zipcode": "23529-0001",
    "date": "2/19/2015"
  },
  {
    "id": 509,
    "country": "usa",
    "city": "big rapids",
    "name": "ferris state university",
    "state": "mi",
    "zipcode": "49307-2251",
    "date": "2/19/2015"
  },
  {
    "id": 510,
    "country": "usa",
    "city": "riverside",
    "name": "riverside city college",
    "state": "ca",
    "zipcode": 92506,
    "date": "2/19/2015"
  },
  {
    "id": 511,
    "country": "usa",
    "city": "memphis",
    "name": "university of memphis",
    "state": "tn",
    "zipcode": "38152-0001",
    "date": "2/19/2015"
  },
  {
    "id": 512,
    "country": "usa",
    "city": "medford",
    "name": "delta college",
    "state": "or",
    "zipcode": 97504,
    "date": "2/19/2015"
  },
  {
    "id": 513,
    "country": "usa",
    "city": "portland",
    "name": "portland cmty coll sylvania",
    "state": "or",
    "zipcode": 97219,
    "date": "2/19/2015"
  },
  {
    "id": 514,
    "country": "usa",
    "city": "norco",
    "name": "norco college",
    "state": "ca",
    "zipcode": "92860-2600",
    "date": "2/19/2015"
  },
  {
    "id": 515,
    "country": "usa",
    "city": "los angeles",
    "name": "los angeles city college",
    "state": "ca",
    "zipcode": 90029,
    "date": "2/19/2015"
  },
  {
    "id": 516,
    "country": "usa",
    "city": "wheeling",
    "name": "wheeling jesuit university",
    "state": "wv",
    "zipcode": 26003,
    "date": "2/20/2015"
  },
  {
    "id": 517,
    "country": "usa",
    "city": "boaz",
    "name": "snead state comm college",
    "state": "al",
    "zipcode": "35957-1650",
    "date": "2/20/2015"
  },
  {
    "id": 518,
    "country": "usa",
    "city": "moreno valley",
    "name": "moreno valley college",
    "state": "ca",
    "zipcode": "92551-2045",
    "date": "2/20/2015"
  },
  {
    "id": 519,
    "country": "usa",
    "city": "ft wayne",
    "name": "univeristy of st francis",
    "state": "in",
    "zipcode": 46807,
    "date": "2/21/2015"
  },
  {
    "id": 520,
    "country": "usa",
    "city": "bayside",
    "name": "queensborough cc of cuny",
    "state": "ny",
    "zipcode": 11364,
    "date": "2/22/2015"
  },
  {
    "id": 521,
    "country": "usa",
    "city": "new york",
    "name": "fashion institute of tech",
    "state": "ny",
    "zipcode": 10001,
    "date": "2/22/2015"
  },
  {
    "id": 522,
    "country": "usa",
    "city": "rockford",
    "name": "rock valley college",
    "state": "il",
    "zipcode": "61114-5640",
    "date": "2/22/2015"
  },
  {
    "id": 523,
    "country": "usa",
    "city": "tucson",
    "name": "pima cc northwest",
    "state": "az",
    "zipcode": 85709,
    "date": "2/23/2015"
  },
  {
    "id": 524,
    "country": "usa",
    "city": "walnut",
    "name": "mount san antonio college",
    "state": "ca",
    "zipcode": 91789,
    "date": "2/23/2015"
  },
  {
    "id": 525,
    "country": "usa",
    "city": "villanova",
    "name": "villanova university",
    "state": "pa",
    "zipcode": "19085-1603",
    "date": "2/23/2015"
  },
  {
    "id": 526,
    "country": "usa",
    "city": "pearl city",
    "name": "leeward community college",
    "state": "hi",
    "zipcode": 96782,
    "date": "2/24/2015"
  },
  {
    "id": 527,
    "country": "usa",
    "city": "forest grove",
    "name": "pacific university",
    "state": "or",
    "zipcode": 97116,
    "date": "2/24/2015"
  },
  {
    "id": 528,
    "country": "usa",
    "city": "oakdale",
    "name": "dowling college",
    "state": "ny",
    "zipcode": "11769-1906",
    "date": "2/24/2015"
  },
  {
    "id": 529,
    "country": "usa",
    "city": "edinburg",
    "name": "univ of texas - pan american",
    "state": "tx",
    "zipcode": 785412999,
    "date": "2/25/2015"
  },
  {
    "id": 530,
    "country": "usa",
    "city": "santa rosa",
    "name": "santa rosa junior college",
    "state": "ca",
    "zipcode": 95401,
    "date": "2/25/2015"
  },
  {
    "id": 531,
    "country": "usa",
    "city": "nacogdoches",
    "name": "stephen f austin state univ",
    "state": "tx",
    "zipcode": 75961,
    "date": "2/25/2015"
  },
  {
    "id": 532,
    "country": "usa",
    "city": "rohnert park",
    "name": "sonoma state university",
    "state": "ca",
    "zipcode": 94928,
    "date": "2/26/2015"
  },
  {
    "id": 533,
    "country": "usa",
    "city": "valparaiso",
    "name": "valparaiso university",
    "state": "in",
    "zipcode": 46383,
    "date": "2/27/2015"
  },
  {
    "id": 534,
    "country": "usa",
    "city": "columbus",
    "name": "sales associates",
    "state": "oh",
    "zipcode": 43235,
    "date": "3/1/2015"
  },
  {
    "id": 535,
    "country": "usa",
    "city": "santa monica",
    "name": "santa monica college",
    "state": "ca",
    "zipcode": 90405,
    "date": "3/4/2015"
  },
  {
    "id": 536,
    "country": "usa",
    "city": "west plains",
    "name": "missouri st u-west plain",
    "state": "mo",
    "zipcode": "65775-2715",
    "date": "3/4/2015"
  },
  {
    "id": 537,
    "country": "usa",
    "city": "san francisco",
    "name": "golden gate univ-san francisco",
    "state": "ca",
    "zipcode": 94105,
    "date": "3/4/2015"
  },
  {
    "id": 538,
    "country": "usa",
    "city": "petaluma",
    "name": "santa rosa jr college",
    "state": "ca",
    "zipcode": 94954,
    "date": "3/4/2015"
  },
  {
    "id": 539,
    "country": "usa",
    "city": "chicago",
    "name": "loyola - chicago",
    "state": "il",
    "zipcode": 60660,
    "date": "3/5/2015"
  },
  {
    "id": 540,
    "country": "usa",
    "city": "naples",
    "name": "fl southwestern st coll - naples",
    "state": "fl",
    "zipcode": "34113-8976",
    "date": "3/6/2015"
  },
  {
    "id": 541,
    "country": "usa",
    "city": "batavia",
    "name": "genesee cc batavia",
    "state": "ny",
    "zipcode": 14020,
    "date": "3/8/2015"
  },
  {
    "id": 542,
    "country": "usa",
    "city": "scottsdale",
    "name": "scottsdale cmty college",
    "state": "az",
    "zipcode": 85256,
    "date": "3/10/2015"
  },
  {
    "id": 543,
    "country": "usa",
    "city": "grants",
    "name": "new mexico st u-grants",
    "state": "nm",
    "zipcode": 87020,
    "date": "3/10/2015"
  },
  {
    "id": 544,
    "country": "usa",
    "city": "laredo",
    "name": "laredo community college",
    "state": "tx",
    "zipcode": 78040,
    "date": "11/8/2016"
  },
  {
    "id": 545,
    "country": "usa",
    "city": "gainesville",
    "name": "brenau university",
    "state": "ga",
    "zipcode": 30501,
    "date": "11/8/2016"
  },
  {
    "id": 546,
    "country": "usa",
    "city": "new britain",
    "name": "central conn state univ",
    "state": "ct",
    "zipcode": "06050-2439",
    "date": "11/8/2016"
  },
  {
    "id": 547,
    "country": "usa",
    "city": "east stroudsburg",
    "name": "east stroudsburg university",
    "state": "pa",
    "zipcode": "18301-2956",
    "date": "11/8/2016"
  },
  {
    "id": 548,
    "country": "usa",
    "city": "knoxville",
    "name": "pellissippi st cmty coll",
    "state": "tn",
    "zipcode": 37932,
    "date": "11/8/2016"
  },
  {
    "id": 549,
    "country": "usa",
    "city": "jacksonville",
    "name": "fl st coll - jacksonville deerwood",
    "state": "fl",
    "zipcode": "32256-8102",
    "date": "11/8/2016"
  },
  {
    "id": 550,
    "country": "usa",
    "city": "westminster",
    "name": "mcdaniel college",
    "state": "md",
    "zipcode": "21157-4303",
    "date": "11/8/2016"
  },
  {
    "id": 551,
    "country": "usa",
    "city": "midland",
    "name": "midland college",
    "state": "tx",
    "zipcode": 79705,
    "date": "11/8/2016"
  },
  {
    "id": 552,
    "country": "usa",
    "city": "fountain valley",
    "name": "coastline cmty coll",
    "state": "ca",
    "zipcode": 92708,
    "date": "11/8/2016"
  },
  {
    "id": 553,
    "country": "usa",
    "city": "albuquerque",
    "name": "central new mexico comm coll",
    "state": "nm",
    "zipcode": 87106,
    "date": "11/8/2016"
  },
  {
    "id": 554,
    "country": "usa",
    "city": "sacramento",
    "name": "sacramento city college",
    "state": "ca",
    "zipcode": 95822,
    "date": "11/8/2016"
  },
  {
    "id": 555,
    "country": "usa",
    "city": "bend",
    "name": "central oregon cmty college",
    "state": "or",
    "zipcode": 97701,
    "date": "11/8/2016"
  },
  {
    "id": 556,
    "country": "usa",
    "city": "allendale",
    "name": "gvsu - allendale",
    "state": "mi",
    "zipcode": "49401-9401",
    "date": "11/8/2016"
  },
  {
    "id": 557,
    "country": "usa",
    "city": "grand rapids",
    "name": "grand rapids cmty coll",
    "state": "mi",
    "zipcode": 49503,
    "date": "11/8/2016"
  },
  {
    "id": 558,
    "country": "usa",
    "city": "fond du lac",
    "name": "moraine park tech coll",
    "state": "wi",
    "zipcode": "54935-2884",
    "date": "11/8/2016"
  },
  {
    "id": 559,
    "country": "usa",
    "city": "fort yates",
    "name": "sitting bull college",
    "state": "nd",
    "zipcode": "58538-9721",
    "date": "11/8/2016"
  },
  {
    "id": 560,
    "country": "usa",
    "city": "buffalo",
    "name": "university at buffalo",
    "state": "ny",
    "zipcode": "14260-1660",
    "date": "11/8/2016"
  },
  {
    "id": 561,
    "country": "usa",
    "city": "chicago",
    "name": "harold washington college",
    "state": "il",
    "zipcode": "60601-2408",
    "date": "11/8/2016"
  },
  {
    "id": 562,
    "country": "usa",
    "city": "wichita falls",
    "name": "midwestern state university",
    "state": "tx",
    "zipcode": 76308,
    "date": "11/8/2016"
  },
  {
    "id": 563,
    "country": "usa",
    "city": "midwest city",
    "name": "rose state college",
    "state": "ok",
    "zipcode": 73110,
    "date": "11/8/2016"
  },
  {
    "id": 564,
    "country": "usa",
    "city": "campbellsville",
    "name": "campbellsville universtiy",
    "state": "ky",
    "zipcode": "42718-2190",
    "date": "11/8/2016"
  },
  {
    "id": 565,
    "country": "usa",
    "city": "irving",
    "name": "north lake college",
    "state": "tx",
    "zipcode": 75038,
    "date": "11/8/2016"
  },
  {
    "id": 566,
    "country": "usa",
    "city": "collegedale",
    "name": "southern adventist univ",
    "state": "tn",
    "zipcode": 37315,
    "date": "11/8/2016"
  },
  {
    "id": 567,
    "country": "usa",
    "city": "wilkesboro",
    "name": "wilkes community college",
    "state": "nc",
    "zipcode": "28697-2102",
    "date": "11/8/2016"
  },
  {
    "id": 568,
    "country": "usa",
    "city": "paris",
    "name": "paris jr coll-paris",
    "state": "tx",
    "zipcode": 75460,
    "date": "11/8/2016"
  },
  {
    "id": 569,
    "country": "usa",
    "city": "new olreans",
    "name": "delta intl univ of new orleans",
    "state": "la",
    "zipcode": 70170,
    "date": "11/8/2016"
  },
  {
    "id": 570,
    "country": "usa",
    "city": "evanston",
    "name": "northwestern university",
    "state": "il",
    "zipcode": "60208-0873",
    "date": "11/8/2016"
  },
  {
    "id": 571,
    "country": "usa",
    "city": "troy",
    "name": "hudson valley community col",
    "state": "ny",
    "zipcode": "12180-6037",
    "date": "11/8/2016"
  },
  {
    "id": 572,
    "country": "usa",
    "city": "selden",
    "name": "suffolk county cc (ammerman)",
    "state": "ny",
    "zipcode": "11784-2851",
    "date": "11/8/2016"
  },
  {
    "id": 573,
    "country": "usa",
    "city": "provo",
    "name": "brigham young univ-provo",
    "state": "ut",
    "zipcode": 84602,
    "date": "11/8/2016"
  },
  {
    "id": 574,
    "country": "usa",
    "city": "san diego",
    "name": "western american university",
    "state": "ca",
    "zipcode": 92108,
    "date": "11/8/2016"
  },
  {
    "id": 575,
    "country": "usa",
    "city": "manchester",
    "name": "manchester community college",
    "state": "nh",
    "zipcode": "03102-8528",
    "date": "11/8/2016"
  },
  {
    "id": 576,
    "country": "usa",
    "city": "reno",
    "name": "univ of nevada sch medicine",
    "state": "nv",
    "zipcode": 89557,
    "date": "11/8/2016"
  },
  {
    "id": 577,
    "country": "usa",
    "city": "bloomsburg",
    "name": "bloomsburg university",
    "state": "pa",
    "zipcode": "17815-1301",
    "date": "11/8/2016"
  },
  {
    "id": 578,
    "country": "usa",
    "city": "fremont",
    "name": "ohlone college",
    "state": "ca",
    "zipcode": 94539,
    "date": "11/8/2016"
  },
  {
    "id": 579,
    "country": "usa",
    "city": "ridgeland",
    "name": "holmes comm coll-ridgeland",
    "state": "ms",
    "zipcode": "39157-1815",
    "date": "11/8/2016"
  },
  {
    "id": 580,
    "country": "usa",
    "city": "kankakee",
    "name": "kankakee community college",
    "state": "il",
    "zipcode": "60901-6505",
    "date": "11/8/2016"
  },
  {
    "id": 581,
    "country": "usa",
    "city": "lancaster",
    "name": "antelope valley college",
    "state": "ca",
    "zipcode": 93536,
    "date": "11/9/2016"
  },
  {
    "id": 582,
    "country": "usa",
    "city": "dowagiac",
    "name": "southwestern michigan coll",
    "state": "mi",
    "zipcode": 49047,
    "date": "11/9/2016"
  },
  {
    "id": 583,
    "country": "usa",
    "city": "brooklyn",
    "name": "long island univ (brooklyn)",
    "state": "ny",
    "zipcode": "11201-5301",
    "date": "11/9/2016"
  },
  {
    "id": 584,
    "country": "usa",
    "city": "duluth",
    "name": "univ of minnesota-duluth",
    "state": "mn",
    "zipcode": "55812-2403",
    "date": "11/9/2016"
  },
  {
    "id": 585,
    "country": "usa",
    "city": "acworth",
    "name": "chatt tech - north metro",
    "state": "ga",
    "zipcode": "30102-3129",
    "date": "11/9/2016"
  },
  {
    "id": 586,
    "country": "usa",
    "city": "sylmar",
    "name": "los angeles mission college",
    "state": "ca",
    "zipcode": 91342,
    "date": "11/9/2016"
  },
  {
    "id": 587,
    "country": "usa",
    "city": "brooklyn",
    "name": "kingsborough cmty college",
    "state": "ny",
    "zipcode": 11235,
    "date": "11/9/2016"
  },
  {
    "id": 588,
    "country": "usa",
    "city": "victorville",
    "name": "victor valley college",
    "state": "ca",
    "zipcode": 92395,
    "date": "11/9/2016"
  },
  {
    "id": 589,
    "country": "usa",
    "city": "lebanon",
    "name": "mckendree university",
    "state": "il",
    "zipcode": "62254-1291",
    "date": "11/9/2016"
  },
  {
    "id": 590,
    "country": "usa",
    "city": "dallas",
    "name": "richland college",
    "state": "tx",
    "zipcode": 75243,
    "date": "11/9/2016"
  },
  {
    "id": 591,
    "country": "usa",
    "city": "nashville",
    "name": "tennessee st univ-main camp",
    "state": "tn",
    "zipcode": "37209-1500",
    "date": "11/9/2016"
  },
  {
    "id": 592,
    "country": "usa",
    "city": "philadelphia",
    "name": "comm college of philadelphi",
    "state": "pa",
    "zipcode": "19130-3936",
    "date": "11/9/2016"
  },
  {
    "id": 593,
    "country": "usa",
    "city": "pikeville",
    "name": "kctcs-big sandy-pikeville",
    "state": "ky",
    "zipcode": 41501,
    "date": "11/9/2016"
  },
  {
    "id": 594,
    "country": "usa",
    "city": "mount pleasant",
    "name": "central michigan university",
    "state": "mi",
    "zipcode": 48859,
    "date": "11/9/2016"
  },
  {
    "id": 595,
    "country": "usa",
    "city": "orange",
    "name": "career networks institute",
    "state": "ca",
    "zipcode": 92868,
    "date": "11/9/2016"
  },
  {
    "id": 596,
    "country": "usa",
    "city": "columbia",
    "name": "univ of sc - columbia",
    "state": "sc",
    "zipcode": 29208,
    "date": "11/9/2016"
  },
  {
    "id": 597,
    "country": "usa",
    "city": "kirtland",
    "name": "lakeland comm college",
    "state": "oh",
    "zipcode": "44094-5198",
    "date": "11/9/2016"
  },
  {
    "id": 598,
    "country": "usa",
    "city": "tomball",
    "name": "lonestar college - tomball",
    "state": "tx",
    "zipcode": 77375,
    "date": "11/9/2016"
  },
  {
    "id": 599,
    "country": "usa",
    "city": "shelby",
    "name": "cleveland county comm coll",
    "state": "nc",
    "zipcode": "28152-6224",
    "date": "11/9/2016"
  },
  {
    "id": 600,
    "country": "usa",
    "city": "oshkosh",
    "name": "univ of wisconsin - oshkosh",
    "state": "wi",
    "zipcode": "54901-3551",
    "date": "11/9/2016"
  },
  {
    "id": 601,
    "country": "usa",
    "city": "melbourne",
    "name": "eastern fl st coll - melbourne",
    "state": "fl",
    "zipcode": "32935-2310",
    "date": "11/9/2016"
  },
  {
    "id": 602,
    "country": "usa",
    "city": "blackwood",
    "name": "camden county college",
    "state": "nj",
    "zipcode": 8012,
    "date": "11/9/2016"
  },
  {
    "id": 603,
    "country": "usa",
    "city": "buffalo",
    "name": "erie cmty coll-city campus",
    "state": "ny",
    "zipcode": "14203-2601",
    "date": "11/9/2016"
  },
  {
    "id": 604,
    "country": "usa",
    "city": "elizabethtown",
    "name": "kctcs-elizabethtown",
    "state": "ky",
    "zipcode": "42701-3053",
    "date": "11/10/2016"
  },
  {
    "id": 605,
    "country": "usa",
    "city": "vancouver",
    "name": "clark college",
    "state": "wa",
    "zipcode": 98663,
    "date": "11/10/2016"
  },
  {
    "id": 606,
    "country": "usa",
    "city": "lubbock",
    "name": "wayland baptist univ lubboc",
    "state": "tx",
    "zipcode": 79407,
    "date": "11/10/2016"
  },
  {
    "id": 607,
    "country": "usa",
    "city": "santa maria",
    "name": "allan hancock college",
    "state": "ca",
    "zipcode": 93454,
    "date": "11/10/2016"
  },
  {
    "id": 608,
    "country": "usa",
    "city": "ellensburg",
    "name": "central washington univ",
    "state": "wa",
    "zipcode": 98926,
    "date": "11/10/2016"
  },
  {
    "id": 609,
    "country": "usa",
    "city": "biloxi",
    "name": "william carey univ - gulfport",
    "state": "ms",
    "zipcode": 39532,
    "date": "11/10/2016"
  },
  {
    "id": 610,
    "country": "usa",
    "city": "napa",
    "name": "napa valley college",
    "state": "ca",
    "zipcode": 94558,
    "date": "11/10/2016"
  },
  {
    "id": 611,
    "country": "usa",
    "city": "goodman",
    "name": "holmes community college",
    "state": "ms",
    "zipcode": 39079,
    "date": "11/10/2016"
  },
  {
    "id": 612,
    "country": "usa",
    "city": "odessa",
    "name": "odessa college",
    "state": "tx",
    "zipcode": 79764,
    "date": "11/10/2016"
  },
  {
    "id": 613,
    "country": "usa",
    "city": "dover",
    "name": "delaware state university",
    "state": "de",
    "zipcode": "19901-2202",
    "date": "11/10/2016"
  },
  {
    "id": 614,
    "country": "usa",
    "city": "welland",
    "name": "niagara college",
    "state": "on",
    "zipcode": "l3c 7l3",
    "date": "11/10/2016"
  },
  {
    "id": 615,
    "country": "usa",
    "city": "portland",
    "name": "portland state university",
    "state": "or",
    "zipcode": 97201,
    "date": "11/10/2016"
  },
  {
    "id": 616,
    "country": "usa",
    "city": "new york",
    "name": "american business institute",
    "state": "ny",
    "zipcode": "10019-6700",
    "date": "11/10/2016"
  },
  {
    "id": 617,
    "country": "usa",
    "city": "clarksville",
    "name": "austin peay state univ",
    "state": "tn",
    "zipcode": "37040-3086",
    "date": "11/10/2016"
  },
  {
    "id": 618,
    "country": "usa",
    "city": "plymouth",
    "name": "quincy -plymouth college",
    "state": "ma",
    "zipcode": "02360-3309",
    "date": "11/10/2016"
  },
  {
    "id": 619,
    "country": "usa",
    "city": "jackson",
    "name": "jackson community college",
    "state": "mi",
    "zipcode": "49201-8395",
    "date": "11/10/2016"
  },
  {
    "id": 620,
    "country": "usa",
    "city": "new castle",
    "name": "wilmington university",
    "state": "de",
    "zipcode": "19720-6434",
    "date": "11/11/2016"
  },
  {
    "id": 621,
    "country": "usa",
    "city": "south euclid",
    "name": "notre dame college of ohio",
    "state": "oh",
    "zipcode": "44121-4228",
    "date": "11/11/2016"
  },
  {
    "id": 622,
    "country": "usa",
    "city": "ft worth",
    "name": "tarrant cnty  coll nw",
    "state": "tx",
    "zipcode": 76179,
    "date": "11/11/2016"
  },
  {
    "id": 623,
    "country": "usa",
    "city": "rock hill",
    "name": "york technical college",
    "state": "sc",
    "zipcode": "29730-7318",
    "date": "11/11/2016"
  },
  {
    "id": 624,
    "country": "usa",
    "city": "ashland",
    "name": "southern oregon university",
    "state": "or",
    "zipcode": 97520,
    "date": "11/11/2016"
  },
  {
    "id": 625,
    "country": "usa",
    "city": "cupertino",
    "name": "de anza college",
    "state": "ca",
    "zipcode": 95014,
    "date": "11/11/2016"
  },
  {
    "id": 626,
    "country": "usa",
    "city": "kissimmee",
    "name": "valencia coll - osceola",
    "state": "fl",
    "zipcode": "34744-3714",
    "date": "11/11/2016"
  },
  {
    "id": 627,
    "country": "usa",
    "city": "new orleans",
    "name": "delgado cmty clg",
    "state": "la",
    "zipcode": "70119-4399",
    "date": "11/11/2016"
  },
  {
    "id": 628,
    "country": "usa",
    "city": "santa fe",
    "name": "santa fe comm college",
    "state": "nm",
    "zipcode": 87508,
    "date": "11/11/2016"
  },
  {
    "id": 629,
    "country": "usa",
    "city": "new brunswick",
    "name": "rutgers state univ nj",
    "state": "nj",
    "zipcode": 8903,
    "date": "11/11/2016"
  },
  {
    "id": 630,
    "country": "usa",
    "city": "new york",
    "name": "borough manhattan cc",
    "state": "ny",
    "zipcode": "10007-1044",
    "date": "11/11/2016"
  },
  {
    "id": 631,
    "country": "usa",
    "city": "danville",
    "name": "kctcs-bluegrass-danville",
    "state": "ky",
    "zipcode": "40422-9690",
    "date": "11/11/2016"
  },
  {
    "id": 632,
    "country": "usa",
    "city": "sturgeon bay",
    "name": "northeast wi tech coll",
    "state": "wi",
    "zipcode": "54235-1317",
    "date": "11/11/2016"
  },
  {
    "id": 633,
    "country": "usa",
    "city": "canton",
    "name": "stark state collof technology",
    "state": "oh",
    "zipcode": "44720-7228",
    "date": "11/12/2016"
  },
  {
    "id": 634,
    "country": "usa",
    "city": "el paso",
    "name": "univ of texas - el paso",
    "state": "tx",
    "zipcode": 79968,
    "date": "11/12/2016"
  },
  {
    "id": 635,
    "country": "usa",
    "city": "anchorage",
    "name": "alaska whole health inst",
    "state": "ak",
    "zipcode": 99503,
    "date": "11/12/2016"
  },
  {
    "id": 636,
    "country": "usa",
    "city": "houston",
    "name": "lonestar college - univ park",
    "state": "tx",
    "zipcode": "77070-2607",
    "date": "11/12/2016"
  },
  {
    "id": 637,
    "country": "usa",
    "city": "palm beach gardens",
    "name": "palm beach state coll - north",
    "state": "fl",
    "zipcode": "33410-2802",
    "date": "11/12/2016"
  },
  {
    "id": 638,
    "country": "usa",
    "city": "killeen",
    "name": "central texas college",
    "state": "tx",
    "zipcode": 76549,
    "date": "11/12/2016"
  },
  {
    "id": 639,
    "country": "usa",
    "city": "kansas city",
    "name": "univ of kansas",
    "state": "ks",
    "zipcode": 66100,
    "date": "11/12/2016"
  },
  {
    "id": 640,
    "country": "usa",
    "city": "kaneohe",
    "name": "windward community college",
    "state": "hi",
    "zipcode": 96744,
    "date": "11/12/2016"
  },
  {
    "id": 641,
    "country": "usa",
    "city": "arnold",
    "name": "anne arundel cmty college",
    "state": "md",
    "zipcode": "21012-1857",
    "date": "11/13/2016"
  },
  {
    "id": 642,
    "country": "usa",
    "city": "rancho cucamonga",
    "name": "chaffey clg",
    "state": "ca",
    "zipcode": 91737,
    "date": "11/13/2016"
  },
  {
    "id": 643,
    "country": "usa",
    "city": "porterville",
    "name": "porterville college",
    "state": "ca",
    "zipcode": 93257,
    "date": "11/13/2016"
  },
  {
    "id": 644,
    "country": "usa",
    "city": "beaumont",
    "name": "lamar university",
    "state": "tx",
    "zipcode": 77710,
    "date": "11/13/2016"
  },
  {
    "id": 645,
    "country": "usa",
    "city": "university heights",
    "name": "john carroll university",
    "state": "oh",
    "zipcode": 44118,
    "date": "11/13/2016"
  },
  {
    "id": 646,
    "country": "usa",
    "city": "corvallis",
    "name": "oregon state university",
    "state": "or",
    "zipcode": 97331,
    "date": "11/14/2016"
  },
  {
    "id": 647,
    "country": "usa",
    "city": "st petersburg",
    "name": "st petersburg coll - downtown",
    "state": "fl",
    "zipcode": 33701,
    "date": "11/14/2016"
  },
  {
    "id": 648,
    "country": "usa",
    "city": "huntington",
    "name": "mountwest comm &amp;tech college",
    "state": "wv",
    "zipcode": 25701,
    "date": "11/14/2016"
  },
  {
    "id": 649,
    "country": "usa",
    "city": "harrisonburg",
    "name": "james madison university",
    "state": "va",
    "zipcode": "22807-0001",
    "date": "11/14/2016"
  },
  {
    "id": 650,
    "country": "usa",
    "city": "levelland",
    "name": "south plains college",
    "state": "tx",
    "zipcode": 79336,
    "date": "11/14/2016"
  },
  {
    "id": 651,
    "country": "usa",
    "city": "auburn",
    "name": "green river comm college",
    "state": "wa",
    "zipcode": 98092,
    "date": "11/14/2016"
  },
  {
    "id": 652,
    "country": "usa",
    "city": "coon rapids",
    "name": "anoka ramsey cc - coon rapids",
    "state": "mn",
    "zipcode": 55433,
    "date": "11/14/2016"
  },
  {
    "id": 653,
    "country": "usa",
    "city": "galveston",
    "name": "galveston college",
    "state": "tx",
    "zipcode": 77550,
    "date": "11/14/2016"
  },
  {
    "id": 654,
    "country": "usa",
    "city": "cincinnati",
    "name": "univ of cincinnati/univ clg",
    "state": "oh",
    "zipcode": "45221-0001",
    "date": "11/14/2016"
  },
  {
    "id": 655,
    "country": "usa",
    "city": "fort worth",
    "name": "tarrant county college district",
    "state": "texas",
    "zipcode": 76102,
    "date": "11/14/2016"
  },
  {
    "id": 656,
    "country": "usa",
    "city": "sanford",
    "name": "seminole st coll of florida",
    "state": "fl",
    "zipcode": "32773-6132",
    "date": "11/14/2016"
  },
  {
    "id": 657,
    "country": "usa",
    "city": "california",
    "name": "california univ of pa",
    "state": "pa",
    "zipcode": "15419-1341",
    "date": "11/14/2016"
  },
  {
    "id": 658,
    "country": "usa",
    "city": "towson",
    "name": "towson university",
    "state": "md",
    "zipcode": "21252-0001",
    "date": "11/14/2016"
  },
  {
    "id": 659,
    "country": "usa",
    "city": "canandaigua",
    "name": "finger lakes comm coll",
    "state": "ny",
    "zipcode": "14424-8347",
    "date": "11/14/2016"
  },
  {
    "id": 660,
    "country": "usa",
    "city": "west long branch",
    "name": "monmouth univ",
    "state": "nj",
    "zipcode": "07764-1804",
    "date": "11/15/2016"
  },
  {
    "id": 661,
    "country": "usa",
    "city": "worcester",
    "name": "quinsigamond community coll",
    "state": "ma",
    "zipcode": "01606-2064",
    "date": "11/15/2016"
  },
  {
    "id": 662,
    "country": "usa",
    "city": "irvine",
    "name": "univ of calif - irvine",
    "state": "ca",
    "zipcode": 92717,
    "date": "11/15/2016"
  },
  {
    "id": 663,
    "country": "usa",
    "city": "utica",
    "name": "mohawk valley cmty college",
    "state": "ny",
    "zipcode": "13501-5308",
    "date": "11/15/2016"
  },
  {
    "id": 664,
    "country": "usa",
    "city": "indianapolis",
    "name": "ivy tech state coll - indianap",
    "state": "in",
    "zipcode": "46208-4777",
    "date": "11/15/2016"
  },
  {
    "id": 665,
    "country": "usa",
    "city": "radford",
    "name": "radford university",
    "state": "va",
    "zipcode": 24142,
    "date": "11/15/2016"
  },
  {
    "id": 666,
    "country": "usa",
    "city": "shelbyville",
    "name": "kctcs-jefferson-shelby county",
    "state": "ky",
    "zipcode": "40065-9447",
    "date": "11/15/2016"
  },
  {
    "id": 667,
    "country": "usa",
    "city": "san antonio",
    "name": "texas a&amp;m university-san antonio",
    "state": "tx",
    "zipcode": 78224,
    "date": "11/15/2016"
  },
  {
    "id": 668,
    "country": "usa",
    "city": "grayslake",
    "name": "college of lake county",
    "state": "il",
    "zipcode": 60030,
    "date": "1/29/2016"
  },
  {
    "id": 669,
    "country": "usa",
    "city": "phoenix",
    "name": "paradise valley comm coll",
    "state": "az",
    "zipcode": 85032,
    "date": "1/29/2016"
  },
  {
    "id": 670,
    "country": "usa",
    "city": "chicago",
    "name": "loyola univ - water tower",
    "state": "il",
    "zipcode": 60611,
    "date": "1/29/2016"
  },
  {
    "id": 671,
    "country": "usa",
    "city": "frisco",
    "name": "collin college - preston rdge",
    "state": "tx",
    "zipcode": 75035,
    "date": "1/29/2016"
  },
  {
    "id": 672,
    "country": "usa",
    "city": "oxford",
    "name": "miami univ - oxford",
    "state": "oh",
    "zipcode": "45056-1846",
    "date": "1/29/2016"
  },
  {
    "id": 673,
    "country": "usa",
    "city": "san marcos",
    "name": "cal state u - san marcos",
    "state": "ca",
    "zipcode": 92096,
    "date": "1/29/2016"
  },
  {
    "id": 674,
    "country": "usa",
    "city": "waukesha",
    "name": "uwc - waukesha",
    "state": "wi",
    "zipcode": "53188-2720",
    "date": "1/29/2016"
  },
  {
    "id": 675,
    "country": "usa",
    "city": "storrs",
    "name": "univ of connecticut-storrs",
    "state": "ct",
    "zipcode": 6269,
    "date": "1/29/2016"
  },
  {
    "id": 676,
    "country": "usa",
    "city": "green bay",
    "name": "ne wisconsin tech clg-gb",
    "state": "wi",
    "zipcode": 54303,
    "date": "1/29/2016"
  },
  {
    "id": 677,
    "country": "usa",
    "city": "northridge",
    "name": "cal state u - northridge",
    "state": "ca",
    "zipcode": 91330,
    "date": "1/29/2016"
  },
  {
    "id": 678,
    "country": "usa",
    "city": "sacramento",
    "name": "cal state u - sacramento",
    "state": "ca",
    "zipcode": 95819,
    "date": "1/29/2016"
  },
  {
    "id": 679,
    "country": "usa",
    "city": "new paltz",
    "name": "suny at new paltz",
    "state": "ny",
    "zipcode": "12561-2447",
    "date": "1/29/2016"
  },
  {
    "id": 680,
    "country": "usa",
    "city": "slippery rock",
    "name": "slippery rock univ of pa",
    "state": "pa",
    "zipcode": "16057-1313",
    "date": "1/29/2016"
  },
  {
    "id": 681,
    "country": "usa",
    "city": "monroe",
    "name": "univ of louisiana at monroe",
    "state": "la",
    "zipcode": "71209-9000",
    "date": "1/29/2016"
  },
  {
    "id": 682,
    "country": "usa",
    "city": "davie",
    "name": "florida  atlantic u-davie",
    "state": "fl",
    "zipcode": 33314,
    "date": "1/29/2016"
  },
  {
    "id": 683,
    "country": "usa",
    "city": "durham",
    "name": "univ of new hampshire",
    "state": "nh",
    "zipcode": 3824,
    "date": "1/29/2016"
  },
  {
    "id": 684,
    "country": "usa",
    "city": "martin",
    "name": "univ of tennessee - martin",
    "state": "tn",
    "zipcode": "38238-0001",
    "date": "1/29/2016"
  },
  {
    "id": 685,
    "country": "usa",
    "city": "corsicana",
    "name": "navarro coll - corsicana",
    "state": "tx",
    "zipcode": 75110,
    "date": "1/29/2016"
  },
  {
    "id": 686,
    "country": "usa",
    "city": "sioux city",
    "name": "western iowa tech cc",
    "state": "ia",
    "zipcode": "51106-1918",
    "date": "1/29/2016"
  },
  {
    "id": 687,
    "country": "usa",
    "city": "missoula",
    "name": "university of montana",
    "state": "mt",
    "zipcode": "59812-0003",
    "date": "1/29/2016"
  },
  {
    "id": 688,
    "country": "usa",
    "city": "east lansing",
    "name": "michigan state university",
    "state": "mi",
    "zipcode": 48824,
    "date": "1/29/2016"
  },
  {
    "id": 689,
    "country": "usa",
    "city": "new haven",
    "name": "gateway cc - new haven",
    "state": "ct",
    "zipcode": 6510,
    "date": "1/29/2016"
  },
  {
    "id": 690,
    "country": "usa",
    "city": "dearborn",
    "name": "henry ford cmty college",
    "state": "mi",
    "zipcode": "48128-2407",
    "date": "1/29/2016"
  },
  {
    "id": 691,
    "country": "usa",
    "city": "kingston",
    "name": "university of rhode island",
    "state": "ri",
    "zipcode": "02881-1124",
    "date": "1/29/2016"
  },
  {
    "id": 692,
    "country": "usa",
    "city": "philadelphia",
    "name": "st josephs university",
    "state": "pa",
    "zipcode": "19131-1308",
    "date": "1/29/2016"
  },
  {
    "id": 693,
    "country": "usa",
    "city": "dayton",
    "name": "wright state university",
    "state": "oh",
    "zipcode": "45435-0001",
    "date": "1/29/2016"
  },
  {
    "id": 694,
    "country": "usa",
    "city": "sioux city",
    "name": "morningside college",
    "state": "ia",
    "zipcode": "51106-1717",
    "date": "1/29/2016"
  },
  {
    "id": 695,
    "country": "usa",
    "city": "cleveland",
    "name": "cleveland st cmty coll",
    "state": "tn",
    "zipcode": "37312-2813",
    "date": "1/29/2016"
  },
  {
    "id": 696,
    "country": "usa",
    "city": "frostburg",
    "name": "frostburg state university",
    "state": "md",
    "zipcode": "21532-2303",
    "date": "1/29/2016"
  },
  {
    "id": 697,
    "country": "usa",
    "city": "phoenix",
    "name": "south mountain comm college",
    "state": "az",
    "zipcode": 85042,
    "date": "1/29/2016"
  },
  {
    "id": 698,
    "country": "usa",
    "city": "shreveport",
    "name": "southern univ-shreveport",
    "state": "la",
    "zipcode": 71107,
    "date": "1/29/2016"
  },
  {
    "id": 699,
    "country": "usa",
    "city": "jamaica",
    "name": "st johns univ (queens)",
    "state": "ny",
    "zipcode": "11439-0001",
    "date": "1/29/2016"
  },
  {
    "id": 700,
    "country": "usa",
    "city": "lubbock",
    "name": "texas tech university",
    "state": "tx",
    "zipcode": 79409,
    "date": "1/29/2016"
  },
  {
    "id": 701,
    "country": "usa",
    "city": "westfield",
    "name": "westfield state college",
    "state": "ma",
    "zipcode": "01085-2580",
    "date": "1/29/2016"
  },
  {
    "id": 702,
    "country": "usa",
    "city": "la junta",
    "name": "otero junior college",
    "state": "co",
    "zipcode": 81050,
    "date": "1/29/2016"
  },
  {
    "id": 703,
    "country": "usa",
    "city": "rio grande",
    "name": "university of rio grande",
    "state": "oh",
    "zipcode": "45674-3100",
    "date": "1/29/2016"
  },
  {
    "id": 704,
    "country": "usa",
    "city": "boca raton",
    "name": "palm beach state coll - south",
    "state": "fl",
    "zipcode": "33431-6418",
    "date": "1/29/2016"
  },
  {
    "id": 705,
    "country": "usa",
    "city": "salinas",
    "name": "hartnell community college",
    "state": "ca",
    "zipcode": 93901,
    "date": "1/29/2016"
  },
  {
    "id": 706,
    "country": "usa",
    "city": "spokane",
    "name": "spokane falls comm coll",
    "state": "wa",
    "zipcode": 99224,
    "date": "1/29/2016"
  },
  {
    "id": 707,
    "country": "usa",
    "city": "austin",
    "name": "austin c c - northridge",
    "state": "tx",
    "zipcode": 787583190,
    "date": "1/29/2016"
  },
  {
    "id": 708,
    "country": "usa",
    "city": "murfreesboro",
    "name": "middle tennessee state univ",
    "state": "tn",
    "zipcode": "37132-0001",
    "date": "1/29/2016"
  },
  {
    "id": 709,
    "country": "usa",
    "city": "batavia",
    "name": "univ cincinnati-clermont",
    "state": "oh",
    "zipcode": 45103,
    "date": "1/29/2016"
  },
  {
    "id": 710,
    "country": "usa",
    "city": "kalispell",
    "name": "flathead vly comm college",
    "state": "mt",
    "zipcode": "59901-2622",
    "date": "1/29/2016"
  },
  {
    "id": 711,
    "country": "usa",
    "city": "youngwood",
    "name": "westmoreland cnty cmty coll",
    "state": "pa",
    "zipcode": "15697-1801",
    "date": "1/29/2016"
  },
  {
    "id": 712,
    "country": "usa",
    "city": "champaign",
    "name": "univ of illinois - champaign",
    "state": "il",
    "zipcode": 61820,
    "date": "1/29/2016"
  },
  {
    "id": 713,
    "country": "usa",
    "city": "stephenville",
    "name": "tarleton state univ",
    "state": "tx",
    "zipcode": 76402,
    "date": "1/29/2016"
  },
  {
    "id": 714,
    "country": "usa",
    "city": "salem",
    "name": "salem state university",
    "state": "ma",
    "zipcode": "01970-5348",
    "date": "1/29/2016"
  },
  {
    "id": 715,
    "country": "usa",
    "city": "auburn hills",
    "name": "oakland cc - auburn hills",
    "state": "mi",
    "zipcode": 48326,
    "date": "1/29/2016"
  },
  {
    "id": 716,
    "country": "usa",
    "city": "indianapolis",
    "name": "university of indianapolis",
    "state": "in",
    "zipcode": "46227-3630",
    "date": "1/29/2016"
  },
  {
    "id": 717,
    "country": "usa",
    "city": "milwaukee",
    "name": "alverno college",
    "state": "wi",
    "zipcode": "53215-4020",
    "date": "1/29/2016"
  },
  {
    "id": 718,
    "country": "usa",
    "city": "tyler",
    "name": "univ of texas - tyler",
    "state": "tx",
    "zipcode": 75799,
    "date": "1/29/2016"
  },
  {
    "id": 719,
    "country": "usa",
    "city": "san diego",
    "name": "university of san diego",
    "state": "ca",
    "zipcode": 92110,
    "date": "1/29/2016"
  },
  {
    "id": 720,
    "country": "usa",
    "city": "reading",
    "name": "reading area comm college",
    "state": "pa",
    "zipcode": "19602-1014",
    "date": "1/29/2016"
  },
  {
    "id": 721,
    "country": "usa",
    "city": "largo",
    "name": "prince georges cmty college",
    "state": "md",
    "zipcode": "20774-2109",
    "date": "1/29/2016"
  },
  {
    "id": 722,
    "country": "usa",
    "city": "pomona",
    "name": "cal state polytech u-pomona",
    "state": "ca",
    "zipcode": 91768,
    "date": "1/29/2016"
  },
  {
    "id": 723,
    "country": "usa",
    "city": "billings",
    "name": "montana state univ - billings",
    "state": "mt",
    "zipcode": "59101-0245",
    "date": "1/29/2016"
  },
  {
    "id": 724,
    "country": "usa",
    "city": "johnstown",
    "name": "fulton montgomery cmty coll",
    "state": "ny",
    "zipcode": "12095-3749",
    "date": "1/29/2016"
  },
  {
    "id": 725,
    "country": "usa",
    "city": "lancaster",
    "name": "hacc  lancaster",
    "state": "pa",
    "zipcode": "17602-2633",
    "date": "1/29/2016"
  },
  {
    "id": 726,
    "country": "usa",
    "city": "colorado spg",
    "name": "univ of colo-colo spr",
    "state": "co",
    "zipcode": 80918,
    "date": "1/29/2016"
  },
  {
    "id": 727,
    "country": "usa",
    "city": "lufkin",
    "name": "angelina college",
    "state": "tx",
    "zipcode": 75904,
    "date": "1/29/2016"
  },
  {
    "id": 728,
    "country": "usa",
    "city": "nashville",
    "name": "vanderbilt university",
    "state": "tn",
    "zipcode": "37235-0001",
    "date": "1/29/2016"
  },
  {
    "id": 729,
    "country": "usa",
    "city": "plattsburgh",
    "name": "suny - plattsburgh",
    "state": "ny",
    "zipcode": "12901-2637",
    "date": "1/29/2016"
  },
  {
    "id": 730,
    "country": "usa",
    "city": "wayne",
    "name": "william paterson university",
    "state": "nj",
    "zipcode": "07470-2103",
    "date": "1/29/2016"
  },
  {
    "id": 731,
    "country": "usa",
    "city": "north miami",
    "name": "fiu -  biscayne bay campus",
    "state": "fl",
    "zipcode": 33181,
    "date": "1/29/2016"
  },
  {
    "id": 732,
    "country": "usa",
    "city": "plano",
    "name": "collin college - spr crk",
    "state": "tx",
    "zipcode": 75074,
    "date": "1/29/2016"
  },
  {
    "id": 733,
    "country": "usa",
    "city": "morrilton",
    "name": "univ of arkansas cc-morrilton",
    "state": "ar",
    "zipcode": 72110,
    "date": "1/29/2016"
  },
  {
    "id": 734,
    "country": "usa",
    "city": "lock haven",
    "name": "lock haven  university",
    "state": "pa",
    "zipcode": "17745-2342",
    "date": "1/29/2016"
  },
  {
    "id": 735,
    "country": "usa",
    "city": "clermont",
    "name": "lake sumter cc - southlake campus",
    "state": "fl",
    "zipcode": 34711,
    "date": "1/29/2016"
  },
  {
    "id": 736,
    "country": "usa",
    "city": "chicago",
    "name": "malcolm x college",
    "state": "il",
    "zipcode": "60612-3145",
    "date": "1/29/2016"
  },
  {
    "id": 737,
    "country": "usa",
    "city": "paterson",
    "name": "passaic county cmty college",
    "state": "nj",
    "zipcode": 7509,
    "date": "1/29/2016"
  },
  {
    "id": 738,
    "country": "usa",
    "city": "la crosse",
    "name": "western tech coll",
    "state": "wi",
    "zipcode": "54601-3368",
    "date": "1/29/2016"
  },
  {
    "id": 739,
    "country": "usa",
    "city": "bridgewater",
    "name": "bridgewater state university",
    "state": "ma",
    "zipcode": 2325,
    "date": "1/29/2016"
  },
  {
    "id": 740,
    "country": "usa",
    "city": "frederick",
    "name": "frederick cmty college",
    "state": "md",
    "zipcode": "21702-2964",
    "date": "1/29/2016"
  },
  {
    "id": 741,
    "country": "usa",
    "city": "denver",
    "name": "colorado community college onl",
    "state": "co",
    "zipcode": 80230,
    "date": "1/29/2016"
  },
  {
    "id": 742,
    "country": "usa",
    "city": "brockton",
    "name": "massasoit community college",
    "state": "ma",
    "zipcode": 2302,
    "date": "1/29/2016"
  },
  {
    "id": 743,
    "country": "usa",
    "city": "macomb",
    "name": "western illinois university",
    "state": "il",
    "zipcode": "61455-1367",
    "date": "1/29/2016"
  },
  {
    "id": 744,
    "country": "usa",
    "city": "new haven",
    "name": "southern conn state univ",
    "state": "ct",
    "zipcode": "06515-1330",
    "date": "1/29/2016"
  },
  {
    "id": 745,
    "country": "usa",
    "city": "youngstown",
    "name": "youngstown state university",
    "state": "oh",
    "zipcode": "44555-0001",
    "date": "1/29/2016"
  },
  {
    "id": 746,
    "country": "usa",
    "city": "mission viejo",
    "name": "saddleback college",
    "state": "ca",
    "zipcode": 92692,
    "date": "1/29/2016"
  },
  {
    "id": 747,
    "country": "usa",
    "city": "bloomfield hills",
    "name": "oakland community college",
    "state": "mi",
    "zipcode": "48304-2223",
    "date": "1/29/2016"
  },
  {
    "id": 748,
    "country": "usa",
    "city": "wharton",
    "name": "wharton county jr college",
    "state": "tx",
    "zipcode": 77488,
    "date": "1/29/2016"
  },
  {
    "id": 749,
    "country": "usa",
    "city": "emporia",
    "name": "emporia state university",
    "state": "ks",
    "zipcode": 66801,
    "date": "1/29/2016"
  },
  {
    "id": 750,
    "country": "usa",
    "city": "menasha",
    "name": "uwc - fox valley",
    "state": "wi",
    "zipcode": "54952-8002",
    "date": "1/29/2016"
  },
  {
    "id": 751,
    "country": "usa",
    "city": "austin",
    "name": "austin c c - riverside",
    "state": "tx",
    "zipcode": 78741,
    "date": "1/29/2016"
  },
  {
    "id": 752,
    "country": "usa",
    "city": "san bernardino",
    "name": "cal state u - san bernardino",
    "state": "ca",
    "zipcode": 92407,
    "date": "1/29/2016"
  },
  {
    "id": 753,
    "country": "usa",
    "city": "buffalo",
    "name": "buffalo state college",
    "state": "ny",
    "zipcode": "14222-1004",
    "date": "1/29/2016"
  },
  {
    "id": 754,
    "country": "usa",
    "city": "patchogue",
    "name": "st josephs college - long island",
    "state": "ny",
    "zipcode": "11772-2325",
    "date": "1/29/2016"
  },
  {
    "id": 755,
    "country": "usa",
    "city": "morristown",
    "name": "walters st cmty coll",
    "state": "tn",
    "zipcode": "37813-1908",
    "date": "1/29/2016"
  },
  {
    "id": 756,
    "country": "usa",
    "city": "wilmington",
    "name": "del tech &amp;cc wilmington",
    "state": "de",
    "zipcode": "19801-2412",
    "date": "1/29/2016"
  },
  {
    "id": 757,
    "country": "usa",
    "city": "huntington bch",
    "name": "coastline cc-huntngtn wstmn",
    "state": "ca",
    "zipcode": 92649,
    "date": "1/29/2016"
  },
  {
    "id": 758,
    "country": "usa",
    "city": "sugarland",
    "name": "wharton cty jr coll - sugarland",
    "state": "tx",
    "zipcode": 77479,
    "date": "1/29/2016"
  },
  {
    "id": 759,
    "country": "usa",
    "city": "rochester",
    "name": "oakland university",
    "state": "mi",
    "zipcode": "48309-4402",
    "date": "1/29/2016"
  },
  {
    "id": 760,
    "country": "usa",
    "city": "burlington",
    "name": "university of vermont",
    "state": "vt",
    "zipcode": "05405-0001",
    "date": "1/29/2016"
  },
  {
    "id": 761,
    "country": "usa",
    "city": "chicago",
    "name": "chicago state university",
    "state": "il",
    "zipcode": 60628,
    "date": "1/29/2016"
  },
  {
    "id": 762,
    "country": "usa",
    "city": "pine bluff",
    "name": "u arkansas-pine bluff",
    "state": "ar",
    "zipcode": "71601-2799",
    "date": "1/29/2016"
  },
  {
    "id": 763,
    "country": "usa",
    "city": "huntington",
    "name": "queens   huntington college",
    "state": "ny",
    "zipcode": 11743,
    "date": "1/29/2016"
  },
  {
    "id": 764,
    "country": "usa",
    "city": "fullerton",
    "name": "fullerton college",
    "state": "ca",
    "zipcode": 92832,
    "date": "1/29/2016"
  },
  {
    "id": 765,
    "country": "usa",
    "city": "tampa",
    "name": "university of tampa",
    "state": "fl",
    "zipcode": "33606-1450",
    "date": "1/29/2016"
  },
  {
    "id": 766,
    "country": "usa",
    "city": "colorado springs",
    "name": "pikes peak cc - centennial cmps",
    "state": "co",
    "zipcode": 80906,
    "date": "1/29/2016"
  },
  {
    "id": 767,
    "country": "usa",
    "city": "new york",
    "name": "john jay coll criminal just",
    "state": "ny",
    "zipcode": "10019-1104",
    "date": "1/29/2016"
  },
  {
    "id": 768,
    "country": "usa",
    "city": "hazard",
    "name": "kctcs-hazard",
    "state": "ky",
    "zipcode": 41701,
    "date": "1/29/2016"
  },
  {
    "id": 769,
    "country": "usa",
    "city": "aptos",
    "name": "cabrillo college",
    "state": "ca",
    "zipcode": 95003,
    "date": "1/29/2016"
  },
  {
    "id": 770,
    "country": "usa",
    "city": "las vegas",
    "name": "coll of s nv - charleston",
    "state": "nv",
    "zipcode": 89146,
    "date": "1/29/2016"
  },
  {
    "id": 771,
    "country": "usa",
    "city": "springfield",
    "name": "nvcc medical educ campus",
    "state": "va",
    "zipcode": "22150-1913",
    "date": "1/29/2016"
  },
  {
    "id": 772,
    "country": "usa",
    "city": "frankfort",
    "name": "kentucky state university",
    "state": "ky",
    "zipcode": "40601-2334",
    "date": "1/29/2016"
  },
  {
    "id": 773,
    "country": "usa",
    "city": "nanticoke",
    "name": "luzerne cty comm college",
    "state": "pa",
    "zipcode": "18634-3814",
    "date": "1/29/2016"
  },
  {
    "id": 774,
    "country": "usa",
    "city": "manchester",
    "name": "sthrn nh univ cont/online educ",
    "state": "nh",
    "zipcode": 3101,
    "date": "1/29/2016"
  },
  {
    "id": 775,
    "country": "usa",
    "city": "yakima",
    "name": "yakima valley comm coll",
    "state": "wa",
    "zipcode": 98902,
    "date": "1/29/2016"
  },
  {
    "id": 776,
    "country": "usa",
    "city": "richmond",
    "name": "virginia commonwealth university",
    "state": "va",
    "zipcode": 23284,
    "date": "1/29/2016"
  },
  {
    "id": 777,
    "country": "usa",
    "city": "athens",
    "name": "trinity valley cc - athens",
    "state": "tx",
    "zipcode": 75751,
    "date": "1/29/2016"
  },
  {
    "id": 778,
    "country": "usa",
    "city": "woodbridge",
    "name": "no virginia cc - woodbridge",
    "state": "va",
    "zipcode": 22191,
    "date": "1/29/2016"
  },
  {
    "id": 779,
    "country": "usa",
    "city": "phoenix",
    "name": "grand canyon university",
    "state": "az",
    "zipcode": 85017,
    "date": "1/29/2016"
  },
  {
    "id": 780,
    "country": "usa",
    "city": "jamestown",
    "name": "guilford tech comm coll",
    "state": "nc",
    "zipcode": "27282-0309",
    "date": "1/29/2016"
  },
  {
    "id": 781,
    "country": "usa",
    "city": "washington",
    "name": "trinity univeristy",
    "state": "dc",
    "zipcode": 20017,
    "date": "1/29/2016"
  },
  {
    "id": 782,
    "country": "usa",
    "city": "cleveland",
    "name": "cleveland state university",
    "state": "oh",
    "zipcode": "44115-2214",
    "date": "1/29/2016"
  },
  {
    "id": 783,
    "country": "usa",
    "city": "belle glade",
    "name": "palm beach state coll - glades",
    "state": "fl",
    "zipcode": "33430-3611",
    "date": "1/29/2016"
  },
  {
    "id": 784,
    "country": "usa",
    "city": "hurst",
    "name": "tarrant cnty  coll ne",
    "state": "tx",
    "zipcode": 76054,
    "date": "1/29/2016"
  },
  {
    "id": 785,
    "country": "usa",
    "city": "columbus",
    "name": "ivy tech comm coll - columbus",
    "state": "in",
    "zipcode": "47203-1868",
    "date": "1/29/2016"
  },
  {
    "id": 786,
    "country": "usa",
    "city": "west windsor",
    "name": "mercer cnty c c-trenton",
    "state": "nj",
    "zipcode": "08550-3407",
    "date": "1/29/2016"
  },
  {
    "id": 787,
    "country": "usa",
    "city": "columbus",
    "name": "franklin university",
    "state": "oh",
    "zipcode": "43215-5301",
    "date": "1/29/2016"
  },
  {
    "id": 788,
    "country": "usa",
    "city": "el cajon",
    "name": "grossmont college",
    "state": "ca",
    "zipcode": 92020,
    "date": "1/29/2016"
  },
  {
    "id": 789,
    "country": "usa",
    "city": "marion",
    "name": "marion military institute",
    "state": "al",
    "zipcode": 36756,
    "date": "1/29/2016"
  },
  {
    "id": 790,
    "country": "usa",
    "city": "green bay",
    "name": "university of wisconsin - green bay",
    "state": "wi",
    "zipcode": 54311,
    "date": "1/29/2016"
  },
  {
    "id": 791,
    "country": "usa",
    "city": "buies creek",
    "name": "campbell university",
    "state": "nc",
    "zipcode": 27506,
    "date": "1/29/2016"
  },
  {
    "id": 792,
    "country": "usa",
    "city": "miami",
    "name": "miami-dade  coll north",
    "state": "fl",
    "zipcode": 33167,
    "date": "1/29/2016"
  },
  {
    "id": 793,
    "country": "usa",
    "city": "kyle",
    "name": "austin cc - hays",
    "state": "tx",
    "zipcode": 78640,
    "date": "11/15/2016"
  },
  {
    "id": 794,
    "country": "usa",
    "city": "pittsburgh",
    "name": "univ of pittsburgh",
    "state": "pa",
    "zipcode": "15260-0001",
    "date": "11/15/2016"
  },
  {
    "id": 795,
    "country": "usa",
    "city": "farmington",
    "name": "tunxis cmty technical college",
    "state": "ct",
    "zipcode": "06032-3324",
    "date": "11/15/2016"
  },
  {
    "id": 796,
    "country": "usa",
    "city": "tuscaloosa",
    "name": "univ of alabama -nursing",
    "state": "al",
    "zipcode": "35487-0001",
    "date": "11/15/2016"
  },
  {
    "id": 797,
    "country": "usa",
    "city": "richmond",
    "name": "ivy tech comm coll - richmond",
    "state": "in",
    "zipcode": "47374-1220",
    "date": "11/15/2016"
  },
  {
    "id": 798,
    "country": "usa",
    "city": "san diego",
    "name": "advanced college of tech",
    "state": "ca",
    "zipcode": 92123,
    "date": "11/16/2016"
  },
  {
    "id": 799,
    "country": "usa",
    "city": "new orleans",
    "name": "delgado cc-west bank campus",
    "state": "la",
    "zipcode": "70114-3047",
    "date": "11/16/2016"
  },
  {
    "id": 800,
    "country": "usa",
    "city": "branchburg",
    "name": "raritan valley comm coll",
    "state": "nj",
    "zipcode": 8876,
    "date": "11/16/2016"
  },
  {
    "id": 801,
    "country": "usa",
    "city": "nj",
    "name": "test school s1",
    "state": "nj",
    "zipcode": 1234,
    "date": "11/16/2016"
  },
  {
    "id": 802,
    "country": "usa",
    "city": "lincoln",
    "name": "southeast cmty coll-lincoln",
    "state": "ne",
    "zipcode": 68520,
    "date": "11/16/2016"
  },
  {
    "id": 803,
    "country": "usa",
    "city": "newark",
    "name": "rutgers univ newark",
    "state": "nj",
    "zipcode": "07102-1811",
    "date": "11/16/2016"
  },
  {
    "id": 804,
    "country": "usa",
    "city": "placerville",
    "name": "folsom lake coll - el dorado",
    "state": "ca",
    "zipcode": 95667,
    "date": "11/16/2016"
  },
  {
    "id": 805,
    "country": "usa",
    "city": "hayward",
    "name": "cal state u - east bay",
    "state": "ca",
    "zipcode": 94542,
    "date": "11/17/2016"
  },
  {
    "id": 806,
    "country": "usa",
    "city": "asheville",
    "name": "ashevl buncombe tech coll",
    "state": "nc",
    "zipcode": "28801-4816",
    "date": "11/17/2016"
  },
  {
    "id": 807,
    "country": "usa",
    "city": "thibodaux",
    "name": "nicholls state university",
    "state": "la",
    "zipcode": 70310,
    "date": "11/17/2016"
  },
  {
    "id": 808,
    "country": "usa",
    "city": "sheboygan",
    "name": "uwc-sheboygan county",
    "state": "wi",
    "zipcode": 53081,
    "date": "11/17/2016"
  },
  {
    "id": 809,
    "country": "usa",
    "city": "dover",
    "name": "wesley college dover",
    "state": "de",
    "zipcode": "19901-3835",
    "date": "11/18/2016"
  },
  {
    "id": 810,
    "country": "usa",
    "city": "newport news",
    "name": "christopher newport university",
    "state": "va",
    "zipcode": "23606-0070",
    "date": "11/18/2016"
  },
  {
    "id": 811,
    "country": "usa",
    "city": "reno",
    "name": "university of nevada - reno",
    "state": "nv",
    "zipcode": "89557-0042",
    "date": "11/18/2016"
  },
  {
    "id": 812,
    "country": "usa",
    "city": "blountville",
    "name": "northeast st cmty coll",
    "state": "tn",
    "zipcode": "37617-6350",
    "date": "11/18/2016"
  },
  {
    "id": 813,
    "country": "usa",
    "city": "fort wayne",
    "name": "univ of st francis",
    "state": "in",
    "zipcode": 46808,
    "date": "11/18/2016"
  },
  {
    "id": 814,
    "country": "usa",
    "city": "nashville",
    "name": "nashville state comm coll",
    "state": "tn",
    "zipcode": "37209-4515",
    "date": "11/18/2016"
  },
  {
    "id": 815,
    "country": "usa",
    "city": "durango",
    "name": "fort lewis college",
    "state": "co",
    "zipcode": 813013000,
    "date": "11/19/2016"
  },
  {
    "id": 816,
    "country": "usa",
    "city": "chicago",
    "name": "wilbur wright college-south",
    "state": "il",
    "zipcode": 60634,
    "date": "11/20/2016"
  },
  {
    "id": 817,
    "country": "usa",
    "city": "waco",
    "name": "texas st tech coll-waco",
    "state": "tx",
    "zipcode": 76705,
    "date": "11/20/2016"
  },
  {
    "id": 818,
    "country": "usa",
    "city": "deerfield bch",
    "name": "north broward tech ctr",
    "state": "fl",
    "zipcode": 33442,
    "date": "11/20/2016"
  },
  {
    "id": 819,
    "country": "usa",
    "city": "milwaukee",
    "name": "technology institute",
    "state": "wi",
    "zipcode": "53202-1806",
    "date": "11/20/2016"
  },
  {
    "id": 820,
    "country": "usa",
    "city": "brenham",
    "name": "blinn college-brenham camp",
    "state": "tx",
    "zipcode": 77833,
    "date": "11/21/2016"
  },
  {
    "id": 821,
    "country": "usa",
    "city": "poteau",
    "name": "carl albert state college",
    "state": "ok",
    "zipcode": 74953,
    "date": "11/21/2016"
  },
  {
    "id": 822,
    "country": "usa",
    "city": "hanceville",
    "name": "wallace st comm coll-hancevil",
    "state": "al",
    "zipcode": 35077,
    "date": "11/21/2016"
  },
  {
    "id": 823,
    "country": "usa",
    "city": "edmond",
    "name": "ok christian univ",
    "state": "ok",
    "zipcode": 73013,
    "date": "11/21/2016"
  },
  {
    "id": 824,
    "country": "usa",
    "city": "fairbury",
    "name": "southeast community college",
    "state": "ne",
    "zipcode": 68352,
    "date": "11/21/2016"
  },
  {
    "id": 825,
    "country": "usa",
    "city": "barnesville",
    "name": "gordon state college - ga",
    "state": "ga",
    "zipcode": "30204-1746",
    "date": "11/22/2016"
  },
  {
    "id": 826,
    "country": "usa",
    "city": "mesa",
    "name": "mesa comm coll - red mtn",
    "state": "az",
    "zipcode": "85207-1908",
    "date": "11/22/2016"
  },
  {
    "id": 827,
    "country": "usa",
    "city": "williamsville",
    "name": "erie cmty clg north campus",
    "state": "ny",
    "zipcode": 14221,
    "date": "11/22/2016"
  },
  {
    "id": 828,
    "country": "usa",
    "city": "bronx",
    "name": "fordham university-rose hil",
    "state": "ny",
    "zipcode": "10458-5149",
    "date": "11/22/2016"
  },
  {
    "id": 829,
    "country": "usa",
    "city": "miami",
    "name": "miami-dade  coll-kendal",
    "state": "fl",
    "zipcode": 33176,
    "date": "11/22/2016"
  },
  {
    "id": 830,
    "country": "usa",
    "city": "fresno",
    "name": "willow/intnl coll ctr",
    "state": "ca",
    "zipcode": "93730-5401",
    "date": "11/22/2016"
  },
  {
    "id": 831,
    "country": "usa",
    "city": "chicago",
    "name": "wright city college",
    "state": "il",
    "zipcode": "60634-1591",
    "date": "11/22/2016"
  },
  {
    "id": 832,
    "country": "usa",
    "city": "brooklyn",
    "name1": "a&m schwartz coll pharmacy",
    "name": "a%26m%20schwartz%20coll%20pharmacy",
    "state": "ny",
    "zipcode": "11201-5423",
    "date": "11/23/2016"
  },
  {
    "id": 833,
    "country": "usa",
    "city": "ebensburg",
    "name": "admiral peary vo-tech",
    "state": "pa",
    "zipcode": 15931,
    "date": "11/23/2016"
  },
  {
    "id": 834,
    "country": "usa",
    "city": "woodland hills",
    "name": "pierce college - la",
    "state": "ca",
    "zipcode": 91371,
    "date": "11/25/2016"
  },
  {
    "id": 835,
    "country": "usa",
    "city": "sacramento",
    "name": "cosumnes river college",
    "state": "ca",
    "zipcode": 95823,
    "date": "11/25/2016"
  },
  {
    "id": 836,
    "country": "usa",
    "city": "louisville",
    "name": "spalding university",
    "state": "ky",
    "zipcode": "40203-2115",
    "date": "11/26/2016"
  },
  {
    "id": 837,
    "country": "usa",
    "city": "decatur",
    "name": "inst for construction educ",
    "state": "il",
    "zipcode": "62526-2158",
    "date": "11/27/2016"
  },
  {
    "id": 838,
    "country": "usa",
    "city": "chicago",
    "name": "richard j daley college",
    "state": "il",
    "zipcode": "60652-1369",
    "date": "11/28/2016"
  },
  {
    "id": 839,
    "country": "usa",
    "city": "peoria",
    "name": "univ of illinois",
    "state": "il",
    "zipcode": 61656,
    "date": "11/28/2016"
  },
  {
    "id": 840,
    "country": "usa",
    "city": "oskaloosa",
    "name": "william penn university",
    "state": "ia",
    "zipcode": "52577-1757",
    "date": "11/28/2016"
  },
  {
    "id": 841,
    "country": "usa",
    "city": "fairfield",
    "name": "fairfield university",
    "state": "ct",
    "zipcode": "06824-5171",
    "date": "11/28/2016"
  },
  {
    "id": 842,
    "country": "usa",
    "city": "macon",
    "name": "middle ga st coll - macon",
    "state": "ga",
    "zipcode": 31206,
    "date": "11/28/2016"
  },
  {
    "id": 843,
    "country": "usa",
    "city": "san jose",
    "name": "everest coll - san jose",
    "state": "ca",
    "zipcode": 95117,
    "date": "11/28/2016"
  },
  {
    "id": 844,
    "country": "usa",
    "city": "doral",
    "name": "miami dade coll - west cmps",
    "state": "fl",
    "zipcode": "33178-4856",
    "date": "11/28/2016"
  },
  {
    "id": 845,
    "country": "usa",
    "city": "tsaile",
    "name": "dine college - arizona",
    "state": "az",
    "zipcode": 86556,
    "date": "11/28/2016"
  },
  {
    "id": 846,
    "country": "usa",
    "city": "memphis",
    "name": "univ of memphis",
    "state": "tn",
    "zipcode": 38152,
    "date": "11/28/2016"
  },
  {
    "id": 847,
    "country": "usa",
    "city": "takoma park",
    "name": "washington adventist univ",
    "state": "md",
    "zipcode": "20912-7744",
    "date": "11/28/2016"
  },
  {
    "id": 848,
    "country": "usa",
    "city": "waterbury",
    "name": "naugatuck vly comm tech col",
    "state": "ct",
    "zipcode": "06708-3011",
    "date": "11/29/2016"
  },
  {
    "id": 849,
    "country": "usa",
    "city": "gallatin",
    "name": "volunteer st cmty college",
    "state": "tn",
    "zipcode": 37066,
    "date": "11/29/2016"
  },
  {
    "id": 850,
    "country": "usa",
    "city": "dalton",
    "name": "dalton state college",
    "state": "ga",
    "zipcode": "30720-3778",
    "date": "11/29/2016"
  },
  {
    "id": 851,
    "country": "usa",
    "city": "orlando",
    "name": "central florida reception ctr",
    "state": "fl",
    "zipcode": "32831-2518",
    "date": "11/29/2016"
  },
  {
    "id": 852,
    "country": "usa",
    "city": "fairbanks",
    "name": "univ of alaska - fairbanks",
    "state": "ak",
    "zipcode": 99775,
    "date": "11/30/2016"
  },
  {
    "id": 853,
    "country": "usa",
    "city": "moline",
    "name": "black hawk college",
    "state": "il",
    "zipcode": "61265-5870",
    "date": "11/30/2016"
  },
  {
    "id": 854,
    "country": "usa",
    "city": "long island city",
    "name": "laguardia cc of cuny",
    "state": "ny",
    "zipcode": "11101-3007",
    "date": "11/30/2016"
  },
  {
    "id": 855,
    "country": "usa",
    "city": "fremont",
    "name": "midland university",
    "state": "ne",
    "zipcode": "68025-4254",
    "date": "11/30/2016"
  },
  {
    "id": 856,
    "country": "usa",
    "city": "dallas",
    "name": "univ of north texas - dallas",
    "state": "tx",
    "zipcode": 75241,
    "date": "11/30/2016"
  },
  {
    "id": 857,
    "country": "usa",
    "city": "mahwah",
    "name": "ramapo c of new jersey",
    "state": "nj",
    "zipcode": "07430-1623",
    "date": "11/30/2016"
  },
  {
    "id": 858,
    "country": "usa",
    "city": "lima",
    "name": "ohio state univ-lima",
    "state": "oh",
    "zipcode": 45804,
    "date": "12/1/2016"
  },
  {
    "id": 859,
    "country": "usa",
    "city": "kapolei",
    "name": "univ of hawaii west oahu",
    "state": "hi",
    "zipcode": 96707,
    "date": "12/1/2016"
  },
  {
    "id": 860,
    "country": "usa",
    "city": "elyria",
    "name": "lorain county cmty college",
    "state": "oh",
    "zipcode": "44035-1613",
    "date": "12/1/2016"
  },
  {
    "id": 861,
    "country": "usa",
    "city": "ontario",
    "name": "treasure valley cmty coll",
    "state": "or",
    "zipcode": 97914,
    "date": "12/2/2016"
  },
  {
    "id": 862,
    "country": "usa",
    "city": "omaha",
    "name": "metro comm -e college",
    "state": "ne",
    "zipcode": 68103,
    "date": "12/2/2016"
  },
  {
    "id": 863,
    "country": "usa",
    "city": "omaha",
    "name": "metropolitan cmty coll",
    "state": "ne",
    "zipcode": 68111,
    "date": "12/2/2016"
  },
  {
    "id": 864,
    "country": "usa",
    "city": "boston",
    "name": "northeastern university",
    "state": "ma",
    "zipcode": "02115-5005",
    "date": "12/3/2016"
  },
  {
    "id": 865,
    "country": "usa",
    "city": "toledo",
    "name": "univ of toledo - health sci cmps",
    "state": "oh",
    "zipcode": "43614-2595",
    "date": "12/5/2016"
  },
  {
    "id": 866,
    "country": "usa",
    "city": "fort myers",
    "name": "southwest florida coll bus",
    "state": "fl",
    "zipcode": "33907-1157",
    "date": "1/29/2016"
  },
  {
    "id": 867,
    "country": "usa",
    "city": "waxahachie",
    "name": "navarro coll - waxahachie",
    "state": "tx",
    "zipcode": 75165,
    "date": "1/29/2016"
  },
  {
    "id": 868,
    "country": "usa",
    "city": "arlington",
    "name": "tarrant cnty coll se",
    "state": "tx",
    "zipcode": 76018,
    "date": "1/29/2016"
  },
  {
    "id": 869,
    "country": "usa",
    "city": "oklahoma city",
    "name": "oklahoma city comm coll",
    "state": "ok",
    "zipcode": 73159,
    "date": "1/29/2016"
  },
  {
    "id": 870,
    "country": "usa",
    "city": "valley city",
    "name": "valley city state univ",
    "state": "nd",
    "zipcode": 58072,
    "date": "1/29/2016"
  },
  {
    "id": 871,
    "country": "usa",
    "city": "marietta",
    "name": "chattahoochee tech",
    "state": "ga",
    "zipcode": "30060-3304",
    "date": "1/29/2016"
  },
  {
    "id": 872,
    "country": "usa",
    "city": "midlothian",
    "name": "navarro coll - midlothian",
    "state": "tx",
    "zipcode": 76065,
    "date": "1/29/2016"
  },
  {
    "id": 873,
    "country": "usa",
    "city": "rapid city",
    "name": "south dakota sch mines tech",
    "state": "sd",
    "zipcode": "57701-3901",
    "date": "1/29/2016"
  },
  {
    "id": 874,
    "country": "usa",
    "city": "elkins",
    "name": "davis &amp;elkins college",
    "state": "wv",
    "zipcode": "26241-3971",
    "date": "1/29/2016"
  },
  {
    "id": 875,
    "country": "usa",
    "city": "twin falls",
    "name": "college of southern idaho",
    "state": "id",
    "zipcode": 83301,
    "date": "1/29/2016"
  },
  {
    "id": 876,
    "country": "usa",
    "city": "south burlington",
    "name": "comm coll of vermont",
    "state": "vt",
    "zipcode": "05403-6241",
    "date": "1/29/2016"
  },
  {
    "id": 877,
    "country": "usa",
    "city": "freeport",
    "name": "highland community college",
    "state": "il",
    "zipcode": "61032-9338",
    "date": "1/29/2016"
  },
  {
    "id": 878,
    "country": "usa",
    "city": "olean",
    "name": "jamestown cmty coll (olean)",
    "state": "ny",
    "zipcode": "14760-2662",
    "date": "1/29/2016"
  },
  {
    "id": 879,
    "country": "usa",
    "city": "cedar rapids",
    "name": "mount mercy university",
    "state": "ia",
    "zipcode": 52402,
    "date": "1/29/2016"
  },
  {
    "id": 880,
    "country": "usa",
    "city": "homestead",
    "name": "miami dade coll - homestead",
    "state": "fl",
    "zipcode": 33030,
    "date": "1/29/2016"
  },
  {
    "id": 881,
    "country": "usa",
    "city": "salisbury",
    "name": "salisbury university",
    "state": "md",
    "zipcode": "21801-6837",
    "date": "1/29/2016"
  },
  {
    "id": 882,
    "country": "usa",
    "city": "fort worth",
    "name": "tarrant cc - trinity river",
    "state": "tx",
    "zipcode": 76102,
    "date": "1/29/2016"
  },
  {
    "id": 883,
    "country": "usa",
    "city": "san pablo",
    "name": "contra costa college",
    "state": "ca",
    "zipcode": 94806,
    "date": "1/29/2016"
  },
  {
    "id": 884,
    "country": "usa",
    "city": "orchard park",
    "name": "erie cmty coll south campus",
    "state": "ny",
    "zipcode": "14127-2100",
    "date": "1/29/2016"
  },
  {
    "id": 885,
    "country": "usa",
    "city": "brockport",
    "name": "state univ coll brockport",
    "state": "ny",
    "zipcode": "14420-2997",
    "date": "1/29/2016"
  },
  {
    "id": 886,
    "country": "usa",
    "city": "chester",
    "name": "widener university",
    "state": "pa",
    "zipcode": "19013-5700",
    "date": "1/29/2016"
  },
  {
    "id": 887,
    "country": "usa",
    "city": "laramie",
    "name": "univ of wyoming - laramie",
    "state": "wy",
    "zipcode": 82071,
    "date": "1/29/2016"
  },
  {
    "id": 888,
    "country": "usa",
    "city": "rock springs",
    "name": "w wyoming comm coll",
    "state": "wy",
    "zipcode": 82901,
    "date": "1/29/2016"
  },
  {
    "id": 889,
    "country": "usa",
    "city": "columbus",
    "name": "columbus state comm coll",
    "state": "oh",
    "zipcode": "43215-1722",
    "date": "1/29/2016"
  },
  {
    "id": 890,
    "country": "usa",
    "city": "hagerstown",
    "name": "hagerstown community college",
    "state": "md",
    "zipcode": 21742,
    "date": "1/29/2016"
  },
  {
    "id": 891,
    "country": "usa",
    "city": "waco",
    "name": "mclennan community college",
    "state": "tx",
    "zipcode": 76708,
    "date": "1/29/2016"
  },
  {
    "id": 892,
    "country": "usa",
    "city": "newburgh",
    "name": "mt st mary college",
    "state": "ny",
    "zipcode": "12550-3412",
    "date": "1/29/2016"
  },
  {
    "id": 893,
    "country": "usa",
    "city": "hamden",
    "name": "quinnipiac university",
    "state": "ct",
    "zipcode": "06518-1905",
    "date": "1/29/2016"
  },
  {
    "id": 894,
    "country": "usa",
    "city": "flint",
    "name": "charles s mott comm coll",
    "state": "mi",
    "zipcode": "48503-6208",
    "date": "1/29/2016"
  },
  {
    "id": 895,
    "country": "usa",
    "city": "azusa",
    "name": "azusa pacific university",
    "state": "ca",
    "zipcode": 91702,
    "date": "1/29/2016"
  },
  {
    "id": 896,
    "country": "usa",
    "city": "tigerville",
    "name": "north greenville university",
    "state": "sc",
    "zipcode": 29688,
    "date": "1/29/2016"
  },
  {
    "id": 897,
    "country": "usa",
    "city": "tucson",
    "name": "pima college east campus",
    "state": "az",
    "zipcode": 85709,
    "date": "1/29/2016"
  },
  {
    "id": 898,
    "country": "usa",
    "city": "brentwood",
    "name": "suffolk county cc (grant)",
    "state": "ny",
    "zipcode": 11717,
    "date": "1/29/2016"
  },
  {
    "id": 899,
    "country": "usa",
    "city": "orangeburg",
    "name": "orangeburg calhoun tec coll",
    "state": "sc",
    "zipcode": 29115,
    "date": "1/29/2016"
  },
  {
    "id": 900,
    "country": "usa",
    "city": "philadelphia",
    "name": "temple univ",
    "state": "pa",
    "zipcode": "19122-6003",
    "date": "1/29/2016"
  },
  {
    "id": 901,
    "country": "usa",
    "city": "alexandria",
    "name": "louisiana state univ-alexandri",
    "state": "la",
    "zipcode": "71302-9119",
    "date": "1/29/2016"
  },
  {
    "id": 902,
    "country": "usa",
    "city": "la plata",
    "name": "college of southern maryland",
    "state": "md",
    "zipcode": "20646-0910",
    "date": "1/29/2016"
  },
  {
    "id": 903,
    "country": "usa",
    "city": "san antonio",
    "name": "ccc group inc",
    "state": "tx",
    "zipcode": 78219,
    "date": "1/29/2016"
  },
  {
    "id": 904,
    "country": "usa",
    "city": "murray",
    "name": "murray state university",
    "state": "ky",
    "zipcode": 42071,
    "date": "1/29/2016"
  },
  {
    "id": 905,
    "country": "usa",
    "city": "stony brook",
    "name": "stony brook university",
    "state": "ny",
    "zipcode": 11794,
    "date": "1/29/2016"
  },
  {
    "id": 906,
    "country": "usa",
    "city": "madison",
    "name": "madison area tech coll",
    "state": "wi",
    "zipcode": 53704,
    "date": "1/30/2016"
  },
  {
    "id": 907,
    "country": "usa",
    "city": "dallas",
    "name": "mountain view college",
    "state": "tx",
    "zipcode": 75211,
    "date": "1/30/2016"
  },
  {
    "id": 908,
    "country": "usa",
    "city": "willimantic",
    "name": "eastern conn state univ",
    "state": "ct",
    "zipcode": "06226-2211",
    "date": "1/30/2016"
  },
  {
    "id": 909,
    "country": "usa",
    "city": "parma heights",
    "name": "cuyahoga cmty coll - westrn",
    "state": "oh",
    "zipcode": 44130,
    "date": "1/30/2016"
  },
  {
    "id": 910,
    "country": "usa",
    "city": "new york",
    "name": "barnard coll-columbia univ",
    "state": "ny",
    "zipcode": "10027-6909",
    "date": "1/30/2016"
  },
  {
    "id": 911,
    "country": "usa",
    "city": "aurora",
    "name": "waubonsee cc-aurora",
    "state": "il",
    "zipcode": 60505,
    "date": "1/30/2016"
  },
  {
    "id": 912,
    "country": "usa",
    "city": "savannah",
    "name": "savannah coll of art &amp;design",
    "state": "ga",
    "zipcode": "31415-2105",
    "date": "1/30/2016"
  },
  {
    "id": 913,
    "country": "usa",
    "city": "orlando",
    "name": "valencia coll - east",
    "state": "fl",
    "zipcode": "32825-6404",
    "date": "1/30/2016"
  },
  {
    "id": 914,
    "country": "usa",
    "city": "daytona beach",
    "name": "bethune cookman university",
    "state": "fl",
    "zipcode": "32114-3012",
    "date": "1/30/2016"
  },
  {
    "id": 915,
    "country": "usa",
    "city": "kealakekua",
    "name": "u h ctr  west hawaii",
    "state": "hi",
    "zipcode": 96750,
    "date": "1/30/2016"
  },
  {
    "id": 916,
    "country": "usa",
    "city": "moorhead",
    "name": "mississippi delta cmty coll",
    "state": "ms",
    "zipcode": 38761,
    "date": "1/30/2016"
  },
  {
    "id": 917,
    "country": "usa",
    "city": "denver",
    "name": "university of denver",
    "state": "co",
    "zipcode": 80208,
    "date": "1/30/2016"
  },
  {
    "id": 918,
    "country": "usa",
    "city": "honolulu",
    "name": "honolulu community college",
    "state": "hi",
    "zipcode": 96817,
    "date": "1/30/2016"
  },
  {
    "id": 919,
    "country": "usa",
    "city": "phoenix",
    "name": "gateway community college",
    "state": "az",
    "zipcode": 85034,
    "date": "1/30/2016"
  },
  {
    "id": 920,
    "country": "usa",
    "city": "greenvale",
    "name": "long island univ - cw post ctr",
    "state": "ny",
    "zipcode": "11548-1319",
    "date": "1/30/2016"
  },
  {
    "id": 921,
    "country": "usa",
    "city": "saint peters",
    "name": "st charles comm coll",
    "state": "mo",
    "zipcode": "63376-2865",
    "date": "12/5/2016"
  },
  {
    "id": 922,
    "country": "usa",
    "city": "jackson",
    "name": "univ of mississippi med ctr",
    "state": "ms",
    "zipcode": "39216-4500",
    "date": "12/5/2016"
  },
  {
    "id": 923,
    "country": "usa",
    "city": "chicago",
    "name": "olive harvey college",
    "state": "il",
    "zipcode": 60628,
    "date": "12/5/2016"
  },
  {
    "id": 924,
    "country": "usa",
    "city": "omaha",
    "name": "metro comm -f college",
    "state": "ne",
    "zipcode": "68111-1646",
    "date": "12/5/2016"
  },
  {
    "id": 925,
    "country": "usa",
    "city": "sewell",
    "name": "rowan coll at gloucester cty",
    "state": "nj",
    "zipcode": 8080,
    "date": "12/5/2016"
  },
  {
    "id": 926,
    "country": "usa",
    "city": "oswego",
    "name": "suny at oswego",
    "state": "ny",
    "zipcode": "13126-3501",
    "date": "12/5/2016"
  },
  {
    "id": 927,
    "country": "usa",
    "city": "chicago",
    "name": "robert morris univ  chicago",
    "state": "il",
    "zipcode": "60605-1229",
    "date": "12/6/2016"
  },
  {
    "id": 928,
    "country": "usa",
    "city": "corpus christi",
    "name": "texas a&amp;m univ - corpus christi",
    "state": "tx",
    "zipcode": 78412,
    "date": "12/6/2016"
  },
  {
    "id": 929,
    "country": "usa",
    "city": "madison",
    "name": "univ of wisconsin - madison",
    "state": "wi",
    "zipcode": 53706,
    "date": "12/6/2016"
  },
  {
    "id": 930,
    "country": "usa",
    "city": "highland hills",
    "name": "cuyahoga cmty coll - east",
    "state": "oh",
    "zipcode": "44122-6104",
    "date": "12/6/2016"
  },
  {
    "id": 931,
    "country": "usa",
    "city": "reading",
    "name": "albright college",
    "state": "pa",
    "zipcode": "19604-1752",
    "date": "12/7/2016"
  },
  {
    "id": 932,
    "country": "usa",
    "city": "piscataway",
    "name": "umdnj - piscataway",
    "state": "nj",
    "zipcode": "08854-8021",
    "date": "12/7/2016"
  },
  {
    "id": 933,
    "country": "usa",
    "city": "cambridge",
    "name": "harvard university",
    "state": "ma",
    "zipcode": 2138,
    "date": "12/7/2016"
  },
  {
    "id": 934,
    "country": "usa",
    "city": "cazenovia",
    "name": "cazenovia college",
    "state": "ny",
    "zipcode": "13035-1054",
    "date": "12/8/2016"
  },
  {
    "id": 935,
    "country": "usa",
    "city": "syracuse",
    "name": "onondaga community coll",
    "state": "ny",
    "zipcode": "13215-4580",
    "date": "12/8/2016"
  },
  {
    "id": 936,
    "country": "usa",
    "city": "san rafael",
    "name": "dominican university of calif",
    "state": "ca",
    "zipcode": 94901,
    "date": "12/8/2016"
  },
  {
    "id": 937,
    "country": "usa",
    "city": "omaha",
    "name": "metro comm -s college",
    "state": "ne",
    "zipcode": 68103,
    "date": "12/11/2016"
  },
  {
    "id": 938,
    "country": "usa",
    "city": "norman",
    "name": "university of oklahoma",
    "state": "ok",
    "zipcode": 73019,
    "date": "12/11/2016"
  },
  {
    "id": 939,
    "country": "usa",
    "city": "syracuse",
    "name": "syracuse univ",
    "state": "ny",
    "zipcode": 13244,
    "date": "12/11/2016"
  },
  {
    "id": 940,
    "country": "usa",
    "city": "jacksonville",
    "name": "jacksonville college",
    "state": "tx",
    "zipcode": 75766,
    "date": "12/12/2016"
  },
  {
    "id": 941,
    "country": "usa",
    "city": "harrisburg",
    "name": "hacc harrisburg",
    "state": "pa",
    "zipcode": "17110-2903",
    "date": "12/12/2016"
  },
  {
    "id": 942,
    "country": "usa",
    "city": "castleton",
    "name": "castleton state college",
    "state": "vt",
    "zipcode": "05735-4453",
    "date": "12/12/2016"
  },
  {
    "id": 943,
    "country": "usa",
    "city": "beatrice",
    "name": "southeast cmty coll-beatrice",
    "state": "ne",
    "zipcode": "68310-7042",
    "date": "12/13/2016"
  },
  {
    "id": 944,
    "country": "usa",
    "city": "prosser",
    "name": "washington state univ",
    "state": "wa",
    "zipcode": 99350,
    "date": "12/13/2016"
  },
  {
    "id": 945,
    "country": "usa",
    "city": "spartanburg",
    "name": "spartanburg comm coll",
    "state": "sc",
    "zipcode": 29303,
    "date": "12/14/2016"
  },
  {
    "id": 946,
    "country": "usa",
    "city": "jackson",
    "name": "jackson state cmty college",
    "state": "tn",
    "zipcode": "38301-3722",
    "date": "12/15/2016"
  },
  {
    "id": 947,
    "country": "usa",
    "city": "littleton",
    "name": "arapahoe comm coll",
    "state": "co",
    "zipcode": 80160,
    "date": "12/15/2016"
  },
  {
    "id": 948,
    "country": "usa",
    "city": "supply",
    "name": "brunswick community college",
    "state": "nc",
    "zipcode": "28462-0030",
    "date": "12/16/2016"
  },
  {
    "id": 949,
    "country": "usa",
    "city": "piscataway",
    "name": "rutgers u-busch campus",
    "state": "nj",
    "zipcode": 8854,
    "date": "12/16/2016"
  },
  {
    "id": 950,
    "country": "usa",
    "city": "canton",
    "name": "saint lawrence university",
    "state": "ny",
    "zipcode": "13617-1423",
    "date": "12/18/2016"
  },
  {
    "id": 951,
    "country": "usa",
    "city": "deland",
    "name": "daytona state coll - deland",
    "state": "fl",
    "zipcode": 32724,
    "date": "12/19/2016"
  },
  {
    "id": 952,
    "country": "usa",
    "city": "bellevue",
    "name": "bellevue college",
    "state": "wa",
    "zipcode": 98007,
    "date": "12/19/2016"
  },
  {
    "id": 953,
    "country": "usa",
    "city": "redding",
    "name": "simpson university",
    "state": "ca",
    "zipcode": 96003,
    "date": "12/20/2016"
  },
  {
    "id": 954,
    "country": "usa",
    "city": "miami",
    "name": "miami-dade coll - virtual coll",
    "state": "fl",
    "zipcode": 33132,
    "date": "1/30/2016"
  },
  {
    "id": 955,
    "country": "usa",
    "city": "gresham",
    "name": "mt hood community college",
    "state": "or",
    "zipcode": 97030,
    "date": "1/30/2016"
  },
  {
    "id": 956,
    "country": "usa",
    "city": "jacksonville",
    "name": "fl st coll - jacksonville downtown",
    "state": "fl",
    "zipcode": "32202-3099",
    "date": "1/30/2016"
  },
  {
    "id": 957,
    "country": "usa",
    "city": "new york",
    "name": "new york career institute",
    "state": "ny",
    "zipcode": 10007,
    "date": "1/30/2016"
  },
  {
    "id": 958,
    "country": "usa",
    "city": "lincoln",
    "name": "cmty coll of r i-lincoln",
    "state": "ri",
    "zipcode": 2865,
    "date": "1/30/2016"
  },
  {
    "id": 959,
    "country": "usa",
    "city": "bowling green",
    "name": "southcentral ky ctc - bowling green",
    "state": "ky",
    "zipcode": "42101-3601",
    "date": "1/30/2016"
  },
  {
    "id": 960,
    "country": "usa",
    "city": "conway",
    "name": "univ of central arkansas",
    "state": "ar",
    "zipcode": "72035-5001",
    "date": "1/30/2016"
  },
  {
    "id": 961,
    "country": "usa",
    "city": "cleveland",
    "name": "lakeshore tech college",
    "state": "wi",
    "zipcode": "53015-1412",
    "date": "1/30/2016"
  },
  {
    "id": 962,
    "country": "usa",
    "city": "wingate",
    "name": "wingate univeristy",
    "state": "nc",
    "zipcode": 28174,
    "date": "1/30/2016"
  },
  {
    "id": 963,
    "country": "usa",
    "city": "arlington",
    "name": "argosy univ/washington dc",
    "state": "va",
    "zipcode": "22209-2490",
    "date": "1/30/2016"
  },
  {
    "id": 964,
    "country": "usa",
    "city": "palm bay",
    "name": "eastern fl st coll - palm bay",
    "state": "fl",
    "zipcode": "32909-2206",
    "date": "1/30/2016"
  },
  {
    "id": 965,
    "country": "usa",
    "city": "beverly",
    "name": "endicott college",
    "state": "ma",
    "zipcode": "01915-2096",
    "date": "1/30/2016"
  },
  {
    "id": 966,
    "country": "usa",
    "city": "monaca",
    "name": "community college of beaver cty",
    "state": "pa",
    "zipcode": "15061-2566",
    "date": "1/30/2016"
  },
  {
    "id": 967,
    "country": "usa",
    "city": "midlothian",
    "name": "vccs - john tyler cc-midlothia",
    "state": "va",
    "zipcode": "23114-4383",
    "date": "1/30/2016"
  },
  {
    "id": 968,
    "country": "usa",
    "city": "pocatello",
    "name": "idaho state university",
    "state": "id",
    "zipcode": 83209,
    "date": "1/30/2016"
  },
  {
    "id": 969,
    "country": "usa",
    "city": "lincroft",
    "name": "brookdale community college",
    "state": "nj",
    "zipcode": "07738-1399",
    "date": "1/30/2016"
  },
  {
    "id": 970,
    "country": "usa",
    "city": "galveston",
    "name": "texas a&amp;m univ - galveston",
    "state": "tx",
    "zipcode": 77553,
    "date": "1/30/2016"
  },
  {
    "id": 971,
    "country": "usa",
    "city": "minneapolis",
    "name": "univ of minnesota - mpls",
    "state": "mn",
    "zipcode": "55455-0110",
    "date": "1/30/2016"
  },
  {
    "id": 972,
    "country": "usa",
    "city": "great falls",
    "name": "great falls coll - msu",
    "state": "mt",
    "zipcode": "59406-6010",
    "date": "1/30/2016"
  },
  {
    "id": 973,
    "country": "usa",
    "city": "lexington",
    "name": "davidson cty comm coll",
    "state": "nc",
    "zipcode": 27295,
    "date": "1/30/2016"
  },
  {
    "id": 974,
    "country": "usa",
    "city": "tanner",
    "name": "calhoun cc",
    "state": "al",
    "zipcode": "35671-4028",
    "date": "1/30/2016"
  },
  {
    "id": 975,
    "country": "usa",
    "city": "warren",
    "name": "kent state u-trumbull",
    "state": "oh",
    "zipcode": "44483-1931",
    "date": "1/30/2016"
  },
  {
    "id": 976,
    "country": "usa",
    "city": "tacoma",
    "name": "university of puget sound",
    "state": "wa",
    "zipcode": 98416,
    "date": "1/30/2016"
  },
  {
    "id": 977,
    "country": "usa",
    "city": "pewaukee",
    "name": "waukesha county tech coll",
    "state": "wi",
    "zipcode": 53072,
    "date": "1/30/2016"
  },
  {
    "id": 978,
    "country": "usa",
    "city": "lewiston",
    "name": "lewis clark state college",
    "state": "id",
    "zipcode": 83501,
    "date": "1/30/2016"
  },
  {
    "id": 979,
    "country": "usa",
    "city": "little rock",
    "name": "univ arkansas little rock",
    "state": "ar",
    "zipcode": "72204-1000",
    "date": "1/30/2016"
  },
  {
    "id": 980,
    "country": "usa",
    "city": "river forest",
    "name": "concordia university",
    "state": "il",
    "zipcode": "60305-1402",
    "date": "1/30/2016"
  },
  {
    "id": 981,
    "country": "usa",
    "city": "boston",
    "name": "boston univ",
    "state": "ma",
    "zipcode": 2215,
    "date": "1/30/2016"
  },
  {
    "id": 982,
    "country": "usa",
    "city": "johnson city",
    "name": "east tennessee state univ",
    "state": "tn",
    "zipcode": 37614,
    "date": "1/30/2016"
  },
  {
    "id": 983,
    "country": "usa",
    "city": "philippi",
    "name": "alderson broaddus university",
    "state": "wv",
    "zipcode": 26416,
    "date": "1/31/2016"
  },
  {
    "id": 984,
    "country": "usa",
    "city": "orlando",
    "name": "valencia coll - lake nona",
    "state": "fl",
    "zipcode": 32832,
    "date": "1/31/2016"
  },
  {
    "id": 985,
    "country": "usa",
    "city": "germantown",
    "name": "montgomery coll - germantown",
    "state": "md",
    "zipcode": 20876,
    "date": "1/31/2016"
  },
  {
    "id": 986,
    "country": "usa",
    "city": "providence",
    "name": "comm college rhode island",
    "state": "ri",
    "zipcode": 29052304,
    "date": "1/31/2016"
  },
  {
    "id": 987,
    "country": "usa",
    "city": "fall river",
    "name": "bristol community college",
    "state": "ma",
    "zipcode": "02720-7307",
    "date": "1/31/2016"
  },
  {
    "id": 988,
    "country": "usa",
    "city": "washington",
    "name": "american university",
    "state": "dc",
    "zipcode": 20016,
    "date": "1/31/2016"
  },
  {
    "id": 989,
    "country": "usa",
    "city": "pasco",
    "name": "columbia basin college",
    "state": "wa",
    "zipcode": 99301,
    "date": "1/31/2016"
  },
  {
    "id": 990,
    "country": "usa",
    "city": "mobile",
    "name": "university of south alabama",
    "state": "al",
    "zipcode": "36688-3053",
    "date": "8/23/2017"
  },
  {
    "id": 991,
    "country": "usa",
    "city": "galva",
    "name": "black hawk coll - e campus",
    "state": "il",
    "zipcode": "61434-9476",
    "date": "8/23/2017"
  },
  {
    "id": 992,
    "country": "usa",
    "city": "cambridge",
    "name": "anoka ramsey cc - cambridge",
    "state": "mn",
    "zipcode": "55008-5706",
    "date": "8/23/2017"
  },
  {
    "id": 993,
    "country": "usa",
    "city": "florence",
    "name": "francis marion univ",
    "state": "sc",
    "zipcode": 29506,
    "date": "8/23/2017"
  },
  {
    "id": 994,
    "country": "usa",
    "city": "middletown",
    "name": "penn state u harrisburg",
    "state": "pa",
    "zipcode": "17057-4846",
    "date": "8/23/2017"
  },
  {
    "id": 995,
    "country": "usa",
    "city": "colorado springs",
    "name": "csu pueblo",
    "state": "co",
    "zipcode": 80909,
    "date": "8/23/2017"
  },
  {
    "id": 996,
    "country": "usa",
    "city": "kingsville",
    "name": "texas a&amp;m univ - kingsville",
    "state": "tx",
    "zipcode": 78363,
    "date": "8/23/2017"
  },
  {
    "id": 997,
    "country": "usa",
    "city": "purchase",
    "name": "manhattanville college",
    "state": "ny",
    "zipcode": "10577-2131",
    "date": "8/23/2017"
  },
  {
    "id": 998,
    "country": "usa",
    "city": "ft collins",
    "name": "front range c c - larimer",
    "state": "co",
    "zipcode": 805263812,
    "date": "8/23/2017"
  },
  {
    "id": 999,
    "country": "usa",
    "city": "milwaukee",
    "name": "mount mary univ - wi",
    "state": "wi",
    "zipcode": "53222-4545",
    "date": "8/23/2017"
  },
  {
    "id": 1000,
    "country": "usa",
    "city": "raleigh",
    "name": "meredith college",
    "state": "nc",
    "zipcode": "27607-5237",
    "date": "8/23/2017"
  },
  {
    "id": 1001,
    "country": "usa",
    "city": "baltimore",
    "name": "morgan state university",
    "state": "md",
    "zipcode": "21251-0001",
    "date": "8/23/2017"
  },
  {
    "id": 1002,
    "country": "usa",
    "city": "jackson",
    "name": "jackson state university",
    "state": "ms",
    "zipcode": "39204-2335",
    "date": "8/23/2017"
  },
  {
    "id": 1003,
    "country": "usa",
    "city": "hiram",
    "name": "hiram college",
    "state": "oh",
    "zipcode": 44234,
    "date": "8/23/2017"
  },
  {
    "id": 1004,
    "country": "usa",
    "city": "owensboro",
    "name": "kctcs-owensboro",
    "state": "ky",
    "zipcode": "42303-1800",
    "date": "8/23/2017"
  },
  {
    "id": 1005,
    "country": "usa",
    "city": "ukiah",
    "name": "mendocino college",
    "state": "ca",
    "zipcode": 95482,
    "date": "8/23/2017"
  },
  {
    "id": 1006,
    "country": "usa",
    "city": "mountain home",
    "name": "arkansas st univ-mtn home",
    "state": "ar",
    "zipcode": 72653,
    "date": "8/23/2017"
  },
  {
    "id": 1007,
    "country": "usa",
    "city": "augusta",
    "name": "augusta college",
    "state": "ga",
    "zipcode": "30904-4562",
    "date": "8/23/2017"
  },
  {
    "id": 1008,
    "country": "usa",
    "city": "baton rouge",
    "name": "baton rouge cmty college",
    "state": "la",
    "zipcode": "70806-4156",
    "date": "8/23/2017"
  },
  {
    "id": 1009,
    "country": "usa",
    "city": "blue ash",
    "name": "uc - blue ash",
    "state": "oh",
    "zipcode": "45236-1007",
    "date": "8/23/2017"
  },
  {
    "id": 1010,
    "country": "usa",
    "city": "inver grove heights",
    "name": "inver hills comm college",
    "state": "mn",
    "zipcode": "55076-3224",
    "date": "8/23/2017"
  },
  {
    "id": 1011,
    "country": "usa",
    "city": "new rochelle",
    "name": "iona college",
    "state": "ny",
    "zipcode": "10801-1830",
    "date": "8/23/2017"
  },
  {
    "id": 1012,
    "country": "usa",
    "city": "los angeles",
    "name": "cal state u - los angeles",
    "state": "ca",
    "zipcode": 90032,
    "date": "8/23/2017"
  },
  {
    "id": 1013,
    "country": "usa",
    "city": "huntingdon",
    "name": "juniata college",
    "state": "pa",
    "zipcode": "16652-2119",
    "date": "8/23/2017"
  },
  {
    "id": 1014,
    "country": "usa",
    "city": "cheraw",
    "name": "northeast technical college",
    "state": "sc",
    "zipcode": 29520,
    "date": "8/23/2017"
  },
  {
    "id": 1015,
    "country": "usa",
    "city": "weyers cave",
    "name": "vccs - blue ridge cc",
    "state": "va",
    "zipcode": "24486-0080",
    "date": "8/23/2017"
  },
  {
    "id": 1016,
    "country": "usa",
    "city": "quebec",
    "name": "Vanier College",
    "state": "montreal",
    "zipcode": "H4L 3X9",
    "date": "8/23/2017"
  },
  {
    "id": 1017,
    "country": "usa",
    "city": "brooklyn park",
    "name": "north hennepin cmty college",
    "state": "mn",
    "zipcode": "55445-2231",
    "date": "8/23/2017"
  },
  {
    "id": 1018,
    "country": "usa",
    "city": "danville",
    "name": "centre college",
    "state": "ky",
    "zipcode": "40422-1309",
    "date": "12/22/2016"
  },
  {
    "id": 1019,
    "country": "usa",
    "city": "virginia beach",
    "name": "regent university",
    "state": "va",
    "zipcode": 23464,
    "date": "12/22/2016"
  },
  {
    "id": 1020,
    "country": "usa",
    "city": "schenectady",
    "name": "union college",
    "state": "ny",
    "zipcode": "12308-3103",
    "date": "12/22/2016"
  },
  {
    "id": 1021,
    "country": "usa",
    "city": "indianapolis",
    "name": "indiana univ-purdue u-indy",
    "state": "in",
    "zipcode": 46202,
    "date": "12/25/2016"
  },
  {
    "id": 1022,
    "country": "usa",
    "city": "davis",
    "name": "univ of calif - davis",
    "state": "ca",
    "zipcode": 95616,
    "date": "12/26/2016"
  },
  {
    "id": 1023,
    "country": "usa",
    "city": "perrysburg",
    "name": "healing arts institute",
    "state": "oh",
    "zipcode": "43551-3138",
    "date": "12/28/2016"
  },
  {
    "id": 1024,
    "country": "usa",
    "city": "kokomo",
    "name": "indiana univ - kokomo",
    "state": "in",
    "zipcode": 46904,
    "date": "12/29/2016"
  },
  {
    "id": 1025,
    "country": "usa",
    "city": "ironton",
    "name": "ohio univ southern campus",
    "state": "oh",
    "zipcode": "45638-2279",
    "date": "12/29/2016"
  },
  {
    "id": 1026,
    "country": "usa",
    "city": "eureka",
    "name": "college of the redwoods",
    "state": "ca",
    "zipcode": 95501,
    "date": "12/29/2016"
  },
  {
    "id": 1027,
    "country": "usa",
    "city": "westminster",
    "name": "carroll comm college",
    "state": "md",
    "zipcode": 21157,
    "date": "12/30/2016"
  },
  {
    "id": 1028,
    "country": "usa",
    "city": "lakewood",
    "name": "clover park technical colle",
    "state": "wa",
    "zipcode": 98499,
    "date": "12/31/2016"
  },
  {
    "id": 1029,
    "country": "usa",
    "city": "santa clara",
    "name": "mission college",
    "state": "ca",
    "zipcode": 95054,
    "date": "1/1/2017"
  },
  {
    "id": 1030,
    "country": "usa",
    "city": "chicago",
    "name": "depaul univ-loop campus",
    "state": "il",
    "zipcode": "60604-2201",
    "date": "1/1/2017"
  },
  {
    "id": 1031,
    "country": "usa",
    "city": "albany",
    "name": "excelsior college",
    "state": "ny",
    "zipcode": 12203,
    "date": "1/2/2017"
  },
  {
    "id": 1032,
    "country": "usa",
    "city": "de pere",
    "name": "saint norbert college",
    "state": "wi",
    "zipcode": "54115-2002",
    "date": "1/2/2017"
  },
  {
    "id": 1033,
    "country": "usa",
    "city": "los angeles",
    "name": "la coll of microtechnology",
    "state": "ca",
    "zipcode": 90017,
    "date": "1/2/2017"
  },
  {
    "id": 1034,
    "country": "usa",
    "city": "spokane",
    "name": "spokane community college",
    "state": "wa",
    "zipcode": 99217,
    "date": "1/2/2017"
  },
  {
    "id": 1035,
    "country": "usa",
    "city": "tacoma",
    "name": "tacoma community college",
    "state": "wa",
    "zipcode": 98466,
    "date": "1/2/2017"
  },
  {
    "id": 1036,
    "country": "usa",
    "city": "naperville",
    "name": "north central college",
    "state": "il",
    "zipcode": "60540-4607",
    "date": "1/2/2017"
  },
  {
    "id": 1037,
    "country": "usa",
    "city": "somerset",
    "name": "kctcs-somerset",
    "state": "ky",
    "zipcode": "42501-2973",
    "date": "1/2/2017"
  },
  {
    "id": 1038,
    "country": "usa",
    "city": "longview",
    "name": "lower columbia college",
    "state": "wa",
    "zipcode": 98632,
    "date": "1/3/2017"
  },
  {
    "id": 1039,
    "country": "usa",
    "city": "columbia",
    "name": "howard community college",
    "state": "md",
    "zipcode": 21044,
    "date": "1/3/2017"
  },
  {
    "id": 1040,
    "country": "usa",
    "city": "glendora",
    "name": "citrus college",
    "state": "ca",
    "zipcode": "91741-1899",
    "date": "1/3/2017"
  },
  {
    "id": 1041,
    "country": "usa",
    "city": "notre dame",
    "name": "university of notre dame",
    "state": "in",
    "zipcode": 46556,
    "date": "1/3/2017"
  },
  {
    "id": 1042,
    "country": "usa",
    "city": "el cajon",
    "name": "cuyamaca college",
    "state": "ca",
    "zipcode": 92019,
    "date": "1/3/2017"
  },
  {
    "id": 1043,
    "country": "usa",
    "city": "moses lake",
    "name": "big bend community college",
    "state": "wa",
    "zipcode": 98837,
    "date": "1/3/2017"
  },
  {
    "id": 1044,
    "country": "usa",
    "city": "wilkes barre",
    "name": "wilkes university",
    "state": "pa",
    "zipcode": "18766-0997",
    "date": "1/3/2017"
  },
  {
    "id": 1045,
    "country": "usa",
    "city": "philadelphia",
    "name": "drexel university",
    "state": "pa",
    "zipcode": "19104-2816",
    "date": "1/4/2017"
  },
  {
    "id": 1046,
    "country": "usa",
    "city": "los altos hills",
    "name": "foothill c -los altos hills",
    "state": "ca",
    "zipcode": 94022,
    "date": "1/31/2016"
  },
  {
    "id": 1047,
    "country": "usa",
    "city": "oneonta",
    "name": "suny at oneonta",
    "state": "ny",
    "zipcode": "13820-2685",
    "date": "1/31/2016"
  },
  {
    "id": 1048,
    "country": "usa",
    "city": "venice",
    "name": "state coll of florida - venice",
    "state": "fl",
    "zipcode": "34293-5113",
    "date": "1/31/2016"
  },
  {
    "id": 1049,
    "country": "usa",
    "city": "austin",
    "name": "austin c c - pinnacle",
    "state": "tx",
    "zipcode": 78736,
    "date": "1/31/2016"
  },
  {
    "id": 1050,
    "country": "usa",
    "city": "pittsburgh",
    "name": "duquesne university",
    "state": "pa",
    "zipcode": 15282,
    "date": "1/31/2016"
  },
  {
    "id": 1051,
    "country": "usa",
    "city": "lexington",
    "name": "kctcs-bluegrass-cooper",
    "state": "ky",
    "zipcode": "40506-0001",
    "date": "1/31/2016"
  },
  {
    "id": 1052,
    "country": "usa",
    "city": "harriman",
    "name": "roane st cmty college",
    "state": "tn",
    "zipcode": "37748-8615",
    "date": "1/31/2016"
  },
  {
    "id": 1053,
    "country": "usa",
    "city": "sidney",
    "name": "montcalm comm college",
    "state": "mi",
    "zipcode": "48885-9723",
    "date": "1/31/2016"
  },
  {
    "id": 1054,
    "country": "usa",
    "city": "brunswick",
    "name": "college of coastal georgia",
    "state": "ga",
    "zipcode": "31520-3632",
    "date": "1/31/2016"
  },
  {
    "id": 1055,
    "country": "usa",
    "city": "avondale",
    "name": "estrella mountain cc",
    "state": "az",
    "zipcode": 85392,
    "date": "1/31/2016"
  },
  {
    "id": 1056,
    "country": "usa",
    "city": "westerville",
    "name": "otterbein university",
    "state": "oh",
    "zipcode": 43081,
    "date": "1/31/2016"
  },
  {
    "id": 1057,
    "country": "usa",
    "city": "bloomington",
    "name": "ivy tech comm coll - bloomington",
    "state": "in",
    "zipcode": "47404-9772",
    "date": "1/31/2016"
  },
  {
    "id": 1058,
    "country": "usa",
    "city": "cypress",
    "name": "cypress college",
    "state": "ca",
    "zipcode": 90630,
    "date": "1/31/2016"
  },
  {
    "id": 1059,
    "country": "usa",
    "city": "folsom",
    "name": "folsom lake college",
    "state": "ca",
    "zipcode": 95630,
    "date": "1/31/2016"
  },
  {
    "id": 1060,
    "country": "usa",
    "city": "ft pierce",
    "name": "indian river state college",
    "state": "fl",
    "zipcode": 34981,
    "date": "1/31/2016"
  },
  {
    "id": 1061,
    "country": "usa",
    "city": "centralia",
    "name": "centralia college",
    "state": "wa",
    "zipcode": 98531,
    "date": "1/31/2016"
  },
  {
    "id": 1062,
    "country": "usa",
    "city": "new york",
    "name": "pace university",
    "state": "ny",
    "zipcode": "10038-1502",
    "date": "1/31/2016"
  },
  {
    "id": 1063,
    "country": "usa",
    "city": "schenectady",
    "name": "schenectady county cc",
    "state": "ny",
    "zipcode": 12305,
    "date": "1/31/2016"
  },
  {
    "id": 1064,
    "country": "usa",
    "city": "livonia",
    "name": "madonna university",
    "state": "mi",
    "zipcode": 48150,
    "date": "1/31/2016"
  },
  {
    "id": 1065,
    "country": "usa",
    "city": "elyria",
    "name": "ashland univ - elyria",
    "state": "oh",
    "zipcode": 44035,
    "date": "1/31/2016"
  },
  {
    "id": 1066,
    "country": "usa",
    "city": "dixon",
    "name": "sauk valley college",
    "state": "il",
    "zipcode": 61021,
    "date": "1/31/2016"
  },
  {
    "id": 1067,
    "country": "usa",
    "city": "anderson",
    "name": "ivy tech comm coll - anderson",
    "state": "in",
    "zipcode": "46013-1502",
    "date": "1/31/2016"
  },
  {
    "id": 1068,
    "country": "usa",
    "city": "rochester",
    "name": "monroe community college",
    "state": "ny",
    "zipcode": "14623-5701",
    "date": "1/31/2016"
  },
  {
    "id": 1069,
    "country": "usa",
    "city": "estherville",
    "name": "iowa lakes cc-estherville",
    "state": "ia",
    "zipcode": "51334-2721",
    "date": "1/31/2016"
  },
  {
    "id": 1070,
    "country": "usa",
    "city": "orono",
    "name": "univ of maine at orono",
    "state": "me",
    "zipcode": 4469,
    "date": "1/31/2016"
  },
  {
    "id": 1071,
    "country": "usa",
    "city": "olney",
    "name": "olney central college",
    "state": "il",
    "zipcode": "62450-1043",
    "date": "8/23/2017"
  },
  {
    "id": 1072,
    "country": "usa",
    "city": "tampa",
    "name": "hillsborough cmty coll ybor",
    "state": "fl",
    "zipcode": 33605,
    "date": "8/23/2017"
  },
  {
    "id": 1073,
    "country": "usa",
    "city": "charlottesville",
    "name": "vccs - piedmont virginia cc",
    "state": "va",
    "zipcode": "22902-7589",
    "date": "8/23/2017"
  },
  {
    "id": 1074,
    "country": "usa",
    "city": "goldsboro",
    "name": "wayne community coll goldsb",
    "state": "nc",
    "zipcode": "27534-8212",
    "date": "8/23/2017"
  },
  {
    "id": 1075,
    "country": "usa",
    "city": "bel air",
    "name": "harford community college",
    "state": "md",
    "zipcode": "21015-1627",
    "date": "8/23/2017"
  },
  {
    "id": 1076,
    "country": "usa",
    "city": "raymond",
    "name": "hinds cc- raymond",
    "state": "ms",
    "zipcode": 39154,
    "date": "8/23/2017"
  },
  {
    "id": 1077,
    "country": "usa",
    "city": "springfield",
    "name": "drury university-springfield",
    "state": "mo",
    "zipcode": "65802-3712",
    "date": "8/23/2017"
  },
  {
    "id": 1078,
    "country": "usa",
    "city": "fairfield",
    "name": "solano community college",
    "state": "ca",
    "zipcode": 945344017,
    "date": "8/23/2017"
  },
  {
    "id": 1079,
    "country": "usa",
    "city": "beebe",
    "name": "arkansas state u beebe br",
    "state": "ar",
    "zipcode": "72012-3109",
    "date": "8/23/2017"
  },
  {
    "id": 1080,
    "country": "usa",
    "city": "ankeny",
    "name": "des moines area c c-ankeny",
    "state": "ia",
    "zipcode": "50023-8995",
    "date": "8/23/2017"
  },
  {
    "id": 1081,
    "country": "usa",
    "city": "san antonio",
    "name": "our lady of the lake univ",
    "state": "tx",
    "zipcode": 78207,
    "date": "8/23/2017"
  },
  {
    "id": 1082,
    "country": "usa",
    "city": "forrest city",
    "name": "east arkansas comm coll",
    "state": "ar",
    "zipcode": 72335,
    "date": "8/23/2017"
  },
  {
    "id": 1083,
    "country": "usa",
    "city": "temple terrace",
    "name": "univ of south florida",
    "state": "fl",
    "zipcode": 33637,
    "date": "8/23/2017"
  },
  {
    "id": 1084,
    "country": "usa",
    "city": "helena",
    "name": "carroll college",
    "state": "mt",
    "zipcode": "59625-0001",
    "date": "8/23/2017"
  },
  {
    "id": 1085,
    "country": "usa",
    "city": "chicago heights",
    "name": "prairie state college",
    "state": "il",
    "zipcode": "60411-8200",
    "date": "8/23/2017"
  },
  {
    "id": 1086,
    "country": "usa",
    "city": "institute",
    "name": "west virginia st univ",
    "state": "wv",
    "zipcode": 25112,
    "date": "8/23/2017"
  },
  {
    "id": 1087,
    "country": "usa",
    "city": "bemidji",
    "name": "bemidji state university",
    "state": "mn",
    "zipcode": 56601,
    "date": "8/23/2017"
  },
  {
    "id": 1088,
    "country": "usa",
    "city": "devils lake",
    "name": "lake region state college",
    "state": "nd",
    "zipcode": "58301-1598",
    "date": "8/23/2017"
  },
  {
    "id": 1089,
    "country": "usa",
    "city": "tampa",
    "name": "university of south florida",
    "state": "fl",
    "zipcode": "33620-9951",
    "date": "8/23/2017"
  },
  {
    "id": 1090,
    "country": "usa",
    "city": "lumberton",
    "name": "robeson community college",
    "state": "nc",
    "zipcode": "28360-2158",
    "date": "8/23/2017"
  },
  {
    "id": 1091,
    "country": "usa",
    "city": "ottawa",
    "name": "ottawa university",
    "state": "ks",
    "zipcode": "66067-3341",
    "date": "8/23/2017"
  },
  {
    "id": 1092,
    "country": "usa",
    "city": "madison",
    "name": "ivy tech comm coll - madison",
    "state": "in",
    "zipcode": 47250,
    "date": "8/23/2017"
  },
  {
    "id": 1093,
    "country": "usa",
    "city": "lawrenceville",
    "name": "georgia gwinnett college",
    "state": "ga",
    "zipcode": "30043-7409",
    "date": "8/23/2017"
  },
  {
    "id": 1094,
    "country": "usa",
    "city": "burnaby",
    "name": "simon fraser university",
    "state": "bc",
    "zipcode": "v5a 1s6",
    "date": "8/23/2017"
  },
  {
    "id": 1095,
    "country": "usa",
    "city": "jamestown",
    "name": "jamestown cmty clg jamestwn",
    "state": "ny",
    "zipcode": "14701-1920",
    "date": "8/23/2017"
  },
  {
    "id": 1096,
    "country": "usa",
    "city": "marietta",
    "name": "kennesaw state univ - marietta cmps",
    "state": "ga",
    "zipcode": "30060-2855",
    "date": "8/23/2017"
  },
  {
    "id": 1097,
    "country": "usa",
    "city": "berkeley",
    "name": "univ of calif -  berkeley",
    "state": "ca",
    "zipcode": 94720,
    "date": "8/23/2017"
  },
  {
    "id": 1098,
    "country": "usa",
    "city": "wichita",
    "name": "friends university",
    "state": "ks",
    "zipcode": "67213-3379",
    "date": "8/23/2017"
  },
  {
    "id": 1099,
    "country": "usa",
    "city": "winston salem",
    "name": "forsyth technical comm coll",
    "state": "nc",
    "zipcode": "27103-5150",
    "date": "8/24/2017"
  },
  {
    "id": 1100,
    "country": "usa",
    "city": "overland park",
    "name": "univ of kansas-overland par",
    "state": "ks",
    "zipcode": 66225,
    "date": "8/24/2017"
  },
  {
    "id": 1101,
    "country": "usa",
    "city": "sayre",
    "name": "s w ok st univ-sayre",
    "state": "ok",
    "zipcode": 73662,
    "date": "8/24/2017"
  },
  {
    "id": 1102,
    "country": "usa",
    "city": "media",
    "name": "penn state u brandywine",
    "state": "pa",
    "zipcode": "19063-5522",
    "date": "8/24/2017"
  },
  {
    "id": 1103,
    "country": "usa",
    "city": "keene",
    "name": "southwestern adventist univ",
    "state": "tx",
    "zipcode": 76059,
    "date": "8/24/2017"
  },
  {
    "id": 1104,
    "country": "usa",
    "city": "fairfax",
    "name": "george mason university",
    "state": "va",
    "zipcode": "22030-4422",
    "date": "8/24/2017"
  },
  {
    "id": 1105,
    "country": "usa",
    "city": "lima",
    "name": "j a rhodes state college",
    "state": "oh",
    "zipcode": "45804-3576",
    "date": "8/24/2017"
  },
  {
    "id": 1106,
    "country": "usa",
    "city": "wilmington",
    "name": "southern state cc - north",
    "state": "oh",
    "zipcode": "45177-7146",
    "date": "8/24/2017"
  },
  {
    "id": 1107,
    "country": "usa",
    "city": "mandeville",
    "name": "northshore tech cc - mandeville",
    "state": "la",
    "zipcode": 70471,
    "date": "8/24/2017"
  },
  {
    "id": 1108,
    "country": "usa",
    "city": "san mateo",
    "name": "college of san mateo",
    "state": "ca",
    "zipcode": 94402,
    "date": "8/24/2017"
  },
  {
    "id": 1109,
    "country": "usa",
    "city": "alfred",
    "name": "alfred university",
    "state": "ny",
    "zipcode": 14802,
    "date": "8/24/2017"
  },
  {
    "id": 1110,
    "country": "usa",
    "city": "raleigh",
    "name": "nc state university",
    "state": "nc",
    "zipcode": "27606-1428",
    "date": "8/24/2017"
  },
  {
    "id": 1111,
    "country": "usa",
    "city": "merced",
    "name": "uc merced",
    "state": "ca",
    "zipcode": 95343,
    "date": "8/24/2017"
  },
  {
    "id": 1112,
    "country": "usa",
    "city": "cresson",
    "name": "mount aloysius college",
    "state": "pa",
    "zipcode": "16630-1902",
    "date": "8/24/2017"
  },
  {
    "id": 1113,
    "country": "usa",
    "city": "moscow",
    "name": "university of idaho",
    "state": "id",
    "zipcode": 83844,
    "date": "8/24/2017"
  },
  {
    "id": 1114,
    "country": "usa",
    "city": "orange park",
    "name": "st johns river st coll - org park",
    "state": "fl",
    "zipcode": "32065-7639",
    "date": "8/24/2017"
  },
  {
    "id": 1115,
    "country": "usa",
    "city": "new orleans",
    "name": "loyola university",
    "state": "la",
    "zipcode": "70118-6143",
    "date": "8/24/2017"
  },
  {
    "id": 1116,
    "country": "usa",
    "city": "cleveland",
    "name": "truett mcconnell college",
    "state": "ga",
    "zipcode": "30528-1264",
    "date": "8/24/2017"
  },
  {
    "id": 1117,
    "country": "usa",
    "city": "greensburg",
    "name": "seton hill university",
    "state": "pa",
    "zipcode": 15601,
    "date": "8/24/2017"
  },
  {
    "id": 1118,
    "country": "usa",
    "city": "notre dame",
    "name": "holy cross college",
    "state": "in",
    "zipcode": 46556,
    "date": "8/24/2017"
  },
  {
    "id": 1119,
    "country": "usa",
    "city": "west liberty",
    "name": "west liberty university",
    "state": "wv",
    "zipcode": 26074,
    "date": "8/24/2017"
  },
  {
    "id": 1120,
    "country": "usa",
    "city": "west des moines",
    "name": "des moines area cc-west",
    "state": "ia",
    "zipcode": "50266-5302",
    "date": "8/24/2017"
  },
  {
    "id": 1121,
    "country": "usa",
    "city": "huntsville",
    "name": "univ of alabama-huntsville",
    "state": "al",
    "zipcode": "35899-1911",
    "date": "8/24/2017"
  },
  {
    "id": 1122,
    "country": "usa",
    "city": "lakeland",
    "name": "florida southern college",
    "state": "fl",
    "zipcode": "33801-5607",
    "date": "8/24/2017"
  },
  {
    "id": 1123,
    "country": "usa",
    "city": "greensburg",
    "name": "northshore tech cc - greensburg",
    "state": "la",
    "zipcode": 70441,
    "date": "8/24/2017"
  },
  {
    "id": 1124,
    "country": "usa",
    "city": "tamp",
    "name": "saint leo univ - tampa",
    "state": "fl",
    "zipcode": 336198317,
    "date": "8/24/2017"
  },
  {
    "id": 1125,
    "country": "usa",
    "city": "altoona",
    "name": "penn state u altoona",
    "state": "pa",
    "zipcode": "16601-3777",
    "date": "8/24/2017"
  },
  {
    "id": 1126,
    "country": "usa",
    "city": "tulsa",
    "name": "tulsa comm coll-west campus",
    "state": "ok",
    "zipcode": 74107,
    "date": "3/10/2015"
  },
  {
    "id": 1127,
    "country": "usa",
    "city": "medford",
    "name": "tufts university",
    "state": "ma",
    "zipcode": 2155,
    "date": "3/11/2015"
  },
  {
    "id": 1128,
    "country": "usa",
    "city": "pensacola",
    "name": "pensacola state college",
    "state": "fl",
    "zipcode": "32504-8910",
    "date": "3/11/2015"
  },
  {
    "id": 1129,
    "country": "usa",
    "city": "spokane",
    "name": "whitworth university",
    "state": "wa",
    "zipcode": 99251,
    "date": "3/12/2015"
  },
  {
    "id": 1130,
    "country": "usa",
    "city": "albemarle",
    "name": "stanly community college",
    "state": "nc",
    "zipcode": "28001-7458",
    "date": "3/12/2015"
  },
  {
    "id": 1131,
    "country": "usa",
    "city": "newton",
    "name": "boston college",
    "state": "ma",
    "zipcode": "02459-1148",
    "date": "3/12/2015"
  },
  {
    "id": 1132,
    "country": "usa",
    "city": "redlands",
    "name": "community christian college",
    "state": "ca",
    "zipcode": 92373,
    "date": "3/12/2015"
  },
  {
    "id": 1133,
    "country": "usa",
    "city": "detroit",
    "name": "wayne cnty cc-nw",
    "state": "mi",
    "zipcode": "48219-3580",
    "date": "3/12/2015"
  },
  {
    "id": 1134,
    "country": "usa",
    "city": "grand rapids",
    "name": "aquinas college",
    "state": "mi",
    "zipcode": "49506-1741",
    "date": "3/18/2015"
  },
  {
    "id": 1135,
    "country": "usa",
    "city": "kingwood",
    "name": "lonestar college - kingwood",
    "state": "tx",
    "zipcode": 77339,
    "date": "3/18/2015"
  },
  {
    "id": 1136,
    "country": "usa",
    "city": "orlando",
    "name": "valencia coll - west",
    "state": "fl",
    "zipcode": "32811-2302",
    "date": "3/24/2015"
  },
  {
    "id": 1137,
    "country": "usa",
    "city": "owensboro",
    "name": "kctcs-owensboro-downtown",
    "state": "ky",
    "zipcode": "42301-4806",
    "date": "3/24/2015"
  },
  {
    "id": 1138,
    "country": "usa",
    "city": "saint paul",
    "name": "macalester college",
    "state": "mn",
    "zipcode": "55105-1801",
    "date": "3/26/2015"
  },
  {
    "id": 1139,
    "country": "usa",
    "city": "los angeles",
    "name": "ucla - los angeles",
    "state": "ca",
    "zipcode": 90095,
    "date": "3/30/2015"
  },
  {
    "id": 1140,
    "country": "usa",
    "city": "bryan",
    "name": "blinn -occ ed college",
    "state": "tx",
    "zipcode": 77801,
    "date": "3/30/2015"
  },
  {
    "id": 1141,
    "country": "usa",
    "city": "kaneohe",
    "name": "hawaii pacific univ-loa",
    "state": "hi",
    "zipcode": 96744,
    "date": "3/31/2015"
  },
  {
    "id": 1142,
    "country": "usa",
    "city": "orlando",
    "name": "adventist univ of health sci",
    "state": "fl",
    "zipcode": "32803-1237",
    "date": "3/31/2015"
  },
  {
    "id": 1143,
    "country": "usa",
    "city": "seminole",
    "name": "seminole state college",
    "state": "ok",
    "zipcode": 74868,
    "date": "4/1/2015"
  },
  {
    "id": 1144,
    "country": "usa",
    "city": "nashville",
    "name": "tenn state university",
    "state": "tn",
    "zipcode": 37209,
    "date": "4/5/2015"
  },
  {
    "id": 1145,
    "country": "usa",
    "city": "lenexa",
    "name": "a&amp;l underground inc",
    "state": "ks",
    "zipcode": 66215,
    "date": "4/7/2015"
  },
  {
    "id": 1146,
    "country": "usa",
    "city": "mount vernon",
    "name": "skagit valley college",
    "state": "wa",
    "zipcode": 98273,
    "date": "4/7/2015"
  },
  {
    "id": 1147,
    "country": "usa",
    "city": "presque isle",
    "name": "northern maine comm coll",
    "state": "me",
    "zipcode": "04769-2016",
    "date": "4/7/2015"
  },
  {
    "id": 1148,
    "country": "usa",
    "city": "columbus",
    "name": "Pearson Education",
    "state": "oh",
    "zipcode": 43235,
    "date": "4/9/2015"
  },
  {
    "id": 1149,
    "country": "usa",
    "city": "colchester",
    "name": "saint michaels college",
    "state": "vt",
    "zipcode": "05439-0001",
    "date": "4/9/2015"
  },
  {
    "id": 1150,
    "country": "usa",
    "city": "aberdeen",
    "name": "grays harbor cmty college",
    "state": "wa",
    "zipcode": 98520,
    "date": "4/13/2015"
  },
  {
    "id": 1151,
    "country": "usa",
    "city": "mobile",
    "name": "spring hill college",
    "state": "al",
    "zipcode": "36608-1780",
    "date": "4/15/2015"
  },
  {
    "id": 1152,
    "country": "usa",
    "city": "media",
    "name": "pennsylvania inst tech",
    "state": "pa",
    "zipcode": "19063-4036",
    "date": "4/17/2015"
  },
  {
    "id": 1153,
    "country": "usa",
    "city": "garden city",
    "name": "nassau community college",
    "state": "ny",
    "zipcode": 11530,
    "date": "4/18/2015"
  },
  {
    "id": 1154,
    "country": "usa",
    "city": "hartsville",
    "name": "coker college",
    "state": "sc",
    "zipcode": "29550-3742",
    "date": "4/18/2015"
  },
  {
    "id": 1155,
    "country": "usa",
    "city": "olympia",
    "name": "south puget sound cmty coll",
    "state": "wa",
    "zipcode": 98512,
    "date": "4/20/2015"
  },
  {
    "id": 1156,
    "country": "usa",
    "city": "tifton",
    "name": "abraham baldwin agric coll",
    "state": "ga",
    "zipcode": 31793,
    "date": "4/21/2015"
  },
  {
    "id": 1157,
    "country": "usa",
    "city": "brooklyn",
    "name": "brooklyn college",
    "state": "ny",
    "zipcode": "11210-2850",
    "date": "4/21/2015"
  },
  {
    "id": 1158,
    "country": "usa",
    "city": "sumter",
    "name": "central carolina tech coll",
    "state": "sc",
    "zipcode": 29150,
    "date": "4/22/2015"
  },
  {
    "id": 1159,
    "country": "usa",
    "city": "rockville",
    "name": "johns hopkins university",
    "state": "md",
    "zipcode": "20850-3330",
    "date": "4/22/2015"
  },
  {
    "id": 1160,
    "country": "usa",
    "city": "keuka park",
    "name": "keuka college",
    "state": "ny",
    "zipcode": 14478,
    "date": "4/24/2015"
  },
  {
    "id": 1161,
    "country": "usa",
    "city": "cortland",
    "name": "suny at cortland",
    "state": "ny",
    "zipcode": 13045,
    "date": "4/25/2015"
  },
  {
    "id": 1162,
    "country": "usa",
    "city": "parkville",
    "name": "park university",
    "state": "mo",
    "zipcode": "64152-4358",
    "date": "4/27/2015"
  },
  {
    "id": 1163,
    "country": "usa",
    "city": "glassboro",
    "name": "rowan university of new jersey",
    "state": "nj",
    "zipcode": "08028-1700",
    "date": "4/29/2015"
  },
  {
    "id": 1164,
    "country": "usa",
    "city": "jacksonville",
    "name": "fl st coll - jacksonville south",
    "state": "fl",
    "zipcode": 32246,
    "date": "1/4/2017"
  },
  {
    "id": 1165,
    "country": "usa",
    "city": "johnstown",
    "name": "univ of pitts at johnstown",
    "state": "pa",
    "zipcode": "15904-2912",
    "date": "1/4/2017"
  },
  {
    "id": 1166,
    "country": "usa",
    "city": "greenville",
    "name": "thiel college",
    "state": "pa",
    "zipcode": "16125-2186",
    "date": "1/4/2017"
  },
  {
    "id": 1167,
    "country": "usa",
    "city": "boston",
    "name": "wentworth inst of tech",
    "state": "ma",
    "zipcode": "02115-5901",
    "date": "1/4/2017"
  },
  {
    "id": 1168,
    "country": "usa",
    "city": "portland",
    "name": "portland cmty coll cascade",
    "state": "or",
    "zipcode": 97217,
    "date": "1/4/2017"
  },
  {
    "id": 1169,
    "country": "usa",
    "city": "meridan",
    "name": "univ of phoenix - id",
    "state": "id",
    "zipcode": 83642,
    "date": "1/4/2017"
  },
  {
    "id": 1170,
    "country": "usa",
    "city": "greensburg",
    "name": "univ of pitts at greensburg",
    "state": "pa",
    "zipcode": "15601-5804",
    "date": "1/4/2017"
  },
  {
    "id": 1171,
    "country": "usa",
    "city": "titusville",
    "name": "univ of pitts at titusville",
    "state": "pa",
    "zipcode": 16354,
    "date": "1/4/2017"
  },
  {
    "id": 1172,
    "country": "usa",
    "city": "portland",
    "name": "portland cmty coll rock crk",
    "state": "or",
    "zipcode": 97229,
    "date": "1/5/2017"
  },
  {
    "id": 1173,
    "country": "usa",
    "city": "nashua",
    "name": "rivier university",
    "state": "nh",
    "zipcode": 3060,
    "date": "1/5/2017"
  },
  {
    "id": 1174,
    "country": "usa",
    "city": "jacksonville",
    "name": "jacksonville st university",
    "state": "al",
    "zipcode": "36265-1602",
    "date": "1/5/2017"
  },
  {
    "id": 1175,
    "country": "usa",
    "city": "santa clara",
    "name": "santa clara university",
    "state": "ca",
    "zipcode": 95053,
    "date": "1/5/2017"
  },
  {
    "id": 1176,
    "country": "usa",
    "city": "tampa",
    "name": "southwest florida coll",
    "state": "fl",
    "zipcode": "33619-1344",
    "date": "1/5/2017"
  },
  {
    "id": 1177,
    "country": "usa",
    "city": "oakwood",
    "name": "lanier tech coll - oakwood",
    "state": "ga",
    "zipcode": 30566,
    "date": "1/5/2017"
  },
  {
    "id": 1178,
    "country": "usa",
    "city": "hanceville",
    "name": "wallace st comm coll-hanceville",
    "state": "al",
    "zipcode": 35077,
    "date": "1/5/2017"
  },
  {
    "id": 1179,
    "country": "usa",
    "city": "warren",
    "name": "macomb cmty coll-south cp",
    "state": "mi",
    "zipcode": 48088,
    "date": "1/31/2016"
  },
  {
    "id": 1180,
    "country": "usa",
    "city": "west chester",
    "name": "west chester university",
    "state": "pa",
    "zipcode": 19383,
    "date": "2/1/2016"
  },
  {
    "id": 1181,
    "country": "usa",
    "city": "hobbs",
    "name": "new mexico junior college",
    "state": "nm",
    "zipcode": 88240,
    "date": "2/1/2016"
  },
  {
    "id": 1182,
    "country": "usa",
    "city": "portsmouth",
    "name": "great bay community coll",
    "state": "nh",
    "zipcode": "03801-2879",
    "date": "2/1/2016"
  },
  {
    "id": 1183,
    "country": "usa",
    "city": "takoma park",
    "name": "montgomery coll-takoma park",
    "state": "md",
    "zipcode": "20912-4141",
    "date": "2/1/2016"
  },
  {
    "id": 1184,
    "country": "usa",
    "city": "texarkana",
    "name": "texarkana college",
    "state": "tx",
    "zipcode": 75501,
    "date": "2/1/2016"
  },
  {
    "id": 1185,
    "country": "usa",
    "city": "indianapolis",
    "name": "marian university - in",
    "state": "in",
    "zipcode": "46222-1960",
    "date": "2/1/2016"
  },
  {
    "id": 1186,
    "country": "usa",
    "city": "franklin springs",
    "name": "emmanuel college",
    "state": "ga",
    "zipcode": 30639,
    "date": "1/6/2017"
  },
  {
    "id": 1187,
    "country": "usa",
    "city": "pensacola",
    "name": "university of west florida",
    "state": "fl",
    "zipcode": 32514,
    "date": "1/6/2017"
  },
  {
    "id": 1188,
    "country": "usa",
    "city": "columbia",
    "name": "columbia college",
    "state": "sc",
    "zipcode": 29203,
    "date": "1/6/2017"
  },
  {
    "id": 1189,
    "country": "usa",
    "city": "flint",
    "name": "univ of michigan-flint",
    "state": "mi",
    "zipcode": 48502,
    "date": "1/6/2017"
  },
  {
    "id": 1190,
    "country": "usa",
    "city": "chicago",
    "name": "university of chicago",
    "state": "il",
    "zipcode": 60637,
    "date": "1/6/2017"
  },
  {
    "id": 1191,
    "country": "usa",
    "city": "lancaster",
    "name": "ohio univ-lancaster",
    "state": "oh",
    "zipcode": "43130-1037",
    "date": "1/6/2017"
  },
  {
    "id": 1192,
    "country": "usa",
    "city": "greenville",
    "name": "furman university",
    "state": "sc",
    "zipcode": "29613-0002",
    "date": "1/6/2017"
  },
  {
    "id": 1193,
    "country": "usa",
    "city": "aberdeen",
    "name": "presentation college",
    "state": "sd",
    "zipcode": 57401,
    "date": "1/6/2017"
  },
  {
    "id": 1194,
    "country": "usa",
    "city": "eugene",
    "name": "university of oregon",
    "state": "or",
    "zipcode": "97403-1253",
    "date": "1/6/2017"
  },
  {
    "id": 1195,
    "country": "usa",
    "city": "portland",
    "name": "univ of oregon",
    "state": "or",
    "zipcode": 97204,
    "date": "1/7/2017"
  },
  {
    "id": 1196,
    "country": "usa",
    "city": "fort myers",
    "name": "fl southwestern st coll - lee campus",
    "state": "fl",
    "zipcode": "33919-5566",
    "date": "1/7/2017"
  },
  {
    "id": 1197,
    "country": "usa",
    "city": "chester",
    "name": "vccs - john tyler cc-chester",
    "state": "va",
    "zipcode": 23831,
    "date": "1/7/2017"
  },
  {
    "id": 1198,
    "country": "usa",
    "city": "riverside",
    "name": "univ of calif - riverside",
    "state": "ca",
    "zipcode": 92521,
    "date": "2/1/2016"
  },
  {
    "id": 1199,
    "country": "usa",
    "city": "hudson",
    "name": "caldwell community college",
    "state": "nc",
    "zipcode": "28638-2672",
    "date": "2/1/2016"
  },
  {
    "id": 1200,
    "country": "usa",
    "city": "seattle",
    "name": "shoreline cmty college",
    "state": "wa",
    "zipcode": 98133,
    "date": "2/1/2016"
  },
  {
    "id": 1201,
    "country": "usa",
    "city": "boone",
    "name": "des moines area cc-boone",
    "state": "ia",
    "zipcode": "50036-5326",
    "date": "2/1/2016"
  },
  {
    "id": 1202,
    "country": "usa",
    "city": "malibu",
    "name": "pepperdine univ - malibu",
    "state": "ca",
    "zipcode": 90263,
    "date": "2/1/2016"
  },
  {
    "id": 1203,
    "country": "usa",
    "city": "mexia",
    "name": "navarro coll - mexia",
    "state": "tx",
    "zipcode": 76667,
    "date": "2/1/2016"
  },
  {
    "id": 1204,
    "country": "usa",
    "city": "springfield",
    "name": "american international coll",
    "state": "ma",
    "zipcode": "01109-3151",
    "date": "2/1/2016"
  },
  {
    "id": 1205,
    "country": "usa",
    "city": "hamilton",
    "name": "colgate university",
    "state": "ny",
    "zipcode": "13346-1338",
    "date": "2/1/2016"
  },
  {
    "id": 1206,
    "country": "usa",
    "city": "madisonville",
    "name": "kctcs-madisonville",
    "state": "ky",
    "zipcode": "42431-9185",
    "date": "2/1/2016"
  },
  {
    "id": 1207,
    "country": "usa",
    "city": "whittier",
    "name": "rio hondo college",
    "state": "ca",
    "zipcode": 90601,
    "date": "2/1/2016"
  },
  {
    "id": 1208,
    "country": "usa",
    "city": "bennington",
    "name": "southern vermont college",
    "state": "vt",
    "zipcode": "05201-9269",
    "date": "2/1/2016"
  },
  {
    "id": 1209,
    "country": "usa",
    "city": "costa mesa",
    "name": "orange coast college",
    "state": "ca",
    "zipcode": 92626,
    "date": "2/1/2016"
  },
  {
    "id": 1210,
    "country": "usa",
    "city": "allentown",
    "name": "cedar crest college",
    "state": "pa",
    "zipcode": "18104-6132",
    "date": "2/1/2016"
  },
  {
    "id": 1211,
    "country": "usa",
    "city": "new orleans",
    "name": "tulane university",
    "state": "la",
    "zipcode": "70118-5665",
    "date": "2/1/2016"
  },
  {
    "id": 1212,
    "country": "usa",
    "city": "ft worth",
    "name": "tarrant cnty coll so",
    "state": "tx",
    "zipcode": 76119,
    "date": "2/1/2016"
  },
  {
    "id": 1213,
    "country": "usa",
    "city": "farmington hills",
    "name": "oakland cc -orchard ridge",
    "state": "mi",
    "zipcode": 48334,
    "date": "2/1/2016"
  },
  {
    "id": 1214,
    "country": "usa",
    "city": "bismarck",
    "name": "bismarck state college",
    "state": "nd",
    "zipcode": "58501-1276",
    "date": "2/1/2016"
  },
  {
    "id": 1215,
    "country": "usa",
    "city": "angwin",
    "name": "pacific union college",
    "state": "ca",
    "zipcode": 94508,
    "date": "1/8/2017"
  },
  {
    "id": 1216,
    "country": "usa",
    "city": "aiken",
    "name": "univ of sc - aiken",
    "state": "sc",
    "zipcode": "29801-6389",
    "date": "1/8/2017"
  },
  {
    "id": 1217,
    "country": "usa",
    "city": "portland",
    "name": "university of portland",
    "state": "or",
    "zipcode": 97203,
    "date": "1/8/2017"
  },
  {
    "id": 1218,
    "country": "usa",
    "city": "wayne",
    "name": "wayne state college",
    "state": "ne",
    "zipcode": 68787,
    "date": "1/8/2017"
  },
  {
    "id": 1219,
    "country": "usa",
    "city": "saint augustine",
    "name": "st johns river st coll -st augustine",
    "state": "fl",
    "zipcode": "32084-1197",
    "date": "1/9/2017"
  },
  {
    "id": 1220,
    "country": "usa",
    "city": "plymouth",
    "name": "lakeland college",
    "state": "wi",
    "zipcode": 53073,
    "date": "2/1/2016"
  },
  {
    "id": 1221,
    "country": "usa",
    "city": "bradford",
    "name": "univ of pitts at bradford",
    "state": "pa",
    "zipcode": "16701-2812",
    "date": "2/1/2016"
  },
  {
    "id": 1222,
    "country": "usa",
    "city": "akron",
    "name": "univ of akron",
    "state": "oh",
    "zipcode": "44325-0001",
    "date": "2/1/2016"
  },
  {
    "id": 1223,
    "country": "usa",
    "city": "winchester",
    "name": "kctcs-bluegrass-winchester-clark",
    "state": "ky",
    "zipcode": "40391-1804",
    "date": "2/1/2016"
  },
  {
    "id": 1224,
    "country": "usa",
    "city": "champaign",
    "name": "parkland college",
    "state": "il",
    "zipcode": "61821-1806",
    "date": "2/1/2016"
  },
  {
    "id": 1225,
    "country": "usa",
    "city": "altoona",
    "name": "penn state univ-altoona",
    "state": "pa",
    "zipcode": "16601-3777",
    "date": "2/2/2016"
  },
  {
    "id": 1226,
    "country": "usa",
    "city": "casper",
    "name": "casper college",
    "state": "wy",
    "zipcode": 82601,
    "date": "2/2/2016"
  },
  {
    "id": 1227,
    "country": "usa",
    "city": "roxboro",
    "name": "piedmont community college",
    "state": "nc",
    "zipcode": 27573,
    "date": "2/2/2016"
  },
  {
    "id": 1228,
    "country": "usa",
    "city": "ashtabula",
    "name": "kent state u-ashtabula",
    "state": "oh",
    "zipcode": "44004-2316",
    "date": "2/2/2016"
  },
  {
    "id": 1229,
    "country": "usa",
    "city": "fort morgan",
    "name": "morgan comm coll",
    "state": "co",
    "zipcode": 80701,
    "date": "8/24/2017"
  },
  {
    "id": 1230,
    "country": "usa",
    "city": "pueblo",
    "name": "pueblo community college",
    "state": "co",
    "zipcode": 81004,
    "date": "8/24/2017"
  },
  {
    "id": 1231,
    "country": "usa",
    "city": "st marys city",
    "name": "st marys college",
    "state": "md",
    "zipcode": 20686,
    "date": "8/24/2017"
  },
  {
    "id": 1232,
    "country": "usa",
    "city": "berkeley",
    "name": "berkeley city college",
    "state": "ca",
    "zipcode": 94704,
    "date": "8/24/2017"
  },
  {
    "id": 1233,
    "country": "usa",
    "city": "st louis",
    "name": "st louis cc - meramec",
    "state": "mo",
    "zipcode": 631225799,
    "date": "8/24/2017"
  },
  {
    "id": 1234,
    "country": "usa",
    "city": "norwalk",
    "name": "cerritos college",
    "state": "ca",
    "zipcode": 90650,
    "date": "1/9/2017"
  },
  {
    "id": 1235,
    "country": "usa",
    "city": "weldon",
    "name": "halifax cmty coll",
    "state": "nc",
    "zipcode": "27890-0700",
    "date": "1/9/2017"
  },
  {
    "id": 1236,
    "country": "usa",
    "city": "chesapeake",
    "name": "st leo univ - chesapeake",
    "state": "va",
    "zipcode": 23322,
    "date": "1/9/2017"
  },
  {
    "id": 1237,
    "country": "usa",
    "city": "des moines",
    "name": "grand view university",
    "state": "ia",
    "zipcode": "50316-1529",
    "date": "1/9/2017"
  },
  {
    "id": 1238,
    "country": "usa",
    "city": "alameda",
    "name": "college of alameda",
    "state": "ca",
    "zipcode": 94501,
    "date": "2/2/2016"
  },
  {
    "id": 1239,
    "country": "usa",
    "city": "la verne",
    "name": "university of la verne",
    "state": "ca",
    "zipcode": 91750,
    "date": "2/2/2016"
  },
  {
    "id": 1240,
    "country": "usa",
    "city": "albany",
    "name": "darton college",
    "state": "ga",
    "zipcode": "31707-3023",
    "date": "2/2/2016"
  },
  {
    "id": 1241,
    "country": "usa",
    "city": "san antonio",
    "name": "st philips college",
    "state": "tx",
    "zipcode": 78203,
    "date": "2/2/2016"
  },
  {
    "id": 1242,
    "country": "usa",
    "city": "west allis",
    "name": "milwaukee atc w camp west",
    "state": "wi",
    "zipcode": "53214-3110",
    "date": "2/2/2016"
  },
  {
    "id": 1243,
    "country": "usa",
    "city": "southaven",
    "name": "northwest miss cmty coll",
    "state": "ms",
    "zipcode": "38671-8403",
    "date": "2/2/2016"
  },
  {
    "id": 1244,
    "country": "usa",
    "city": "auburndale",
    "name": "lasell college",
    "state": "ma",
    "zipcode": "02466-2709",
    "date": "2/2/2016"
  },
  {
    "id": 1245,
    "country": "usa",
    "city": "gardner",
    "name": "mount wachusett cmty coll",
    "state": "ma",
    "zipcode": "01440-1378",
    "date": "2/2/2016"
  },
  {
    "id": 1246,
    "country": "usa",
    "city": "terrell",
    "name": "trinity valley cc - terrell",
    "state": "tx",
    "zipcode": 75160,
    "date": "2/2/2016"
  },
  {
    "id": 1247,
    "country": "usa",
    "city": "iowa city",
    "name": "kirkwood cc",
    "state": "ia",
    "zipcode": "52240-3102",
    "date": "2/2/2016"
  },
  {
    "id": 1248,
    "country": "usa",
    "city": "wilson",
    "name": "barton college",
    "state": "nc",
    "zipcode": 27893,
    "date": "2/2/2016"
  },
  {
    "id": 1249,
    "country": "usa",
    "city": "bolivar",
    "name": "southwest baptist univ",
    "state": "mo",
    "zipcode": "65613-2578",
    "date": "2/2/2016"
  },
  {
    "id": 1250,
    "country": "usa",
    "city": "winston salem",
    "name": "salem college",
    "state": "nc",
    "zipcode": "27101-5318",
    "date": "8/24/2017"
  },
  {
    "id": 1251,
    "country": "usa",
    "city": "canyon",
    "name": "west texas a&amp; university",
    "state": "tx",
    "zipcode": 79015,
    "date": "8/24/2017"
  },
  {
    "id": 1252,
    "country": "usa",
    "city": "san francisco",
    "name": "university of san francisco",
    "state": "ca",
    "zipcode": 94117,
    "date": "8/24/2017"
  },
  {
    "id": 1253,
    "country": "usa",
    "city": "warrensburg",
    "name": "university of central missouri",
    "state": "mo",
    "zipcode": 64093,
    "date": "8/24/2017"
  },
  {
    "id": 1254,
    "country": "usa",
    "city": "yucaipa",
    "name": "crafton hills college",
    "state": "ca",
    "zipcode": 92399,
    "date": "8/24/2017"
  },
  {
    "id": 1255,
    "country": "usa",
    "city": "peru",
    "name": "peru state college",
    "state": "ne",
    "zipcode": "68421-3073",
    "date": "8/24/2017"
  },
  {
    "id": 1256,
    "country": "usa",
    "city": "san diego",
    "name": "san diego city coll",
    "state": "ca",
    "zipcode": 92101,
    "date": "8/24/2017"
  },
  {
    "id": 1257,
    "country": "usa",
    "city": "boiling springs",
    "name": "gardner-webb university",
    "state": "nc",
    "zipcode": 28017,
    "date": "8/24/2017"
  },
  {
    "id": 1258,
    "country": "usa",
    "city": "wentworth",
    "name": "rockingham community coll",
    "state": "nc",
    "zipcode": "27375-0038",
    "date": "8/24/2017"
  },
  {
    "id": 1259,
    "country": "usa",
    "city": "alamosa",
    "name": "adams state university",
    "state": "co",
    "zipcode": 81102,
    "date": "8/24/2017"
  },
  {
    "id": 1260,
    "country": "usa",
    "city": "riverdale",
    "name": "manhattan college",
    "state": "ny",
    "zipcode": 10471,
    "date": "8/24/2017"
  },
  {
    "id": 1261,
    "country": "usa",
    "city": "imperial",
    "name": "imperial valley college",
    "state": "ca",
    "zipcode": 92251,
    "date": "8/24/2017"
  },
  {
    "id": 1262,
    "country": "usa",
    "city": "west point",
    "name": "point university",
    "state": "ga",
    "zipcode": 31833,
    "date": "8/24/2017"
  },
  {
    "id": 1263,
    "country": "usa",
    "city": "cedar rapids",
    "name": "coe college",
    "state": "ia",
    "zipcode": 52402,
    "date": "8/24/2017"
  },
  {
    "id": 1264,
    "country": "usa",
    "city": "madera",
    "name": "madera cmty clg ctr",
    "state": "ca",
    "zipcode": 93637,
    "date": "8/24/2017"
  },
  {
    "id": 1265,
    "country": "usa",
    "city": "plymouth",
    "name": "plymouth state university",
    "state": "nh",
    "zipcode": "03264-1595",
    "date": "8/24/2017"
  },
  {
    "id": 1266,
    "country": "usa",
    "city": "columbus",
    "name": "miss university  for women",
    "state": "ms",
    "zipcode": "39701-5821",
    "date": "8/24/2017"
  },
  {
    "id": 1267,
    "country": "usa",
    "city": "syracuse",
    "name": "le moyne college",
    "state": "ny",
    "zipcode": "13214-1302",
    "date": "8/24/2017"
  },
  {
    "id": 1268,
    "country": "usa",
    "city": "los alamos",
    "name": "univ of nm-los alamos",
    "state": "nm",
    "zipcode": 87544,
    "date": "8/24/2017"
  },
  {
    "id": 1269,
    "country": "usa",
    "city": "great bend",
    "name": "barton cnty cc-great bend",
    "state": "ks",
    "zipcode": "67530-9803",
    "date": "8/24/2017"
  },
  {
    "id": 1270,
    "country": "usa",
    "city": "dallas",
    "name": "misericordia university",
    "state": "pa",
    "zipcode": "18612-1008",
    "date": "8/24/2017"
  },
  {
    "id": 1271,
    "country": "usa",
    "city": "clinton",
    "name": "mississippi college",
    "state": "ms",
    "zipcode": "39058-0001",
    "date": "8/24/2017"
  },
  {
    "id": 1272,
    "country": "usa",
    "city": "roanoke",
    "name": "virginia western cmty coll",
    "state": "va",
    "zipcode": "24015-4705",
    "date": "8/24/2017"
  },
  {
    "id": 1273,
    "country": "usa",
    "city": "clovis",
    "name": "clovis community college",
    "state": "nm",
    "zipcode": 88101,
    "date": "8/24/2017"
  },
  {
    "id": 1274,
    "country": "usa",
    "city": "dothan",
    "name": "troy univ dothan",
    "state": "al",
    "zipcode": "36303-1568",
    "date": "8/24/2017"
  },
  {
    "id": 1275,
    "country": "usa",
    "city": "centennial",
    "name": "pearson internal test",
    "state": "co",
    "zipcode": 80122,
    "date": "8/24/2017"
  },
  {
    "id": 1276,
    "country": "usa",
    "city": "milwaukee",
    "name": "marquette univ",
    "state": "wi",
    "zipcode": "53233-2207",
    "date": "8/24/2017"
  },
  {
    "id": 1277,
    "country": "usa",
    "city": "new westminster",
    "name": "douglas college",
    "state": "bc",
    "zipcode": "v3l 5b2",
    "date": "8/24/2017"
  },
  {
    "id": 1278,
    "country": "usa",
    "city": "davidson",
    "name": "davidson college",
    "state": "nc",
    "zipcode": "28035-0001",
    "date": "8/24/2017"
  },
  {
    "id": 1279,
    "country": "usa",
    "city": "north east",
    "name": "cecil  college",
    "state": "md",
    "zipcode": "21901-1900",
    "date": "5/5/2015"
  },
  {
    "id": 1280,
    "country": "usa",
    "city": "naples",
    "name": "ave maria university",
    "state": "fl",
    "zipcode": "34119-1376",
    "date": "5/5/2015"
  },
  {
    "id": 1281,
    "country": "usa",
    "city": "eden prairie",
    "name": "wol-abc minnesota",
    "state": "mn",
    "zipcode": 55344,
    "date": "5/7/2015"
  },
  {
    "id": 1282,
    "country": "usa",
    "city": "san luis obispo",
    "name": "california polytech st univ",
    "state": "ca",
    "zipcode": 93407,
    "date": "5/14/2015"
  },
  {
    "id": 1283,
    "country": "usa",
    "city": "miami",
    "name": "miami-dade  coll wolfsn",
    "state": "fl",
    "zipcode": "33132-2204",
    "date": "5/14/2015"
  },
  {
    "id": 1284,
    "country": "usa",
    "city": "orange city",
    "name": "northwestern college",
    "state": "ia",
    "zipcode": "51041-1923",
    "date": "5/15/2015"
  },
  {
    "id": 1285,
    "country": "usa",
    "city": "racine",
    "name": "gateway tech coll",
    "state": "wi",
    "zipcode": "53403-1518",
    "date": "5/18/2015"
  },
  {
    "id": 1286,
    "country": "usa",
    "city": "atlanta",
    "name": "georgia inst of technology",
    "state": "ga",
    "zipcode": 30308,
    "date": "5/18/2015"
  },
  {
    "id": 1287,
    "country": "usa",
    "city": "clinton",
    "name": "ashford university",
    "state": "ia",
    "zipcode": "52732-3910",
    "date": "5/19/2015"
  },
  {
    "id": 1288,
    "country": "usa",
    "city": "kenosha",
    "name": "gateway tech inst-kenosha",
    "state": "wi",
    "zipcode": "53144-1619",
    "date": "5/22/2015"
  },
  {
    "id": 1289,
    "country": "usa",
    "city": "boston",
    "name": "caritas laboure college",
    "state": "ma",
    "zipcode": "02124-5617",
    "date": "5/26/2015"
  },
  {
    "id": 1290,
    "country": "usa",
    "city": "springfield",
    "name": "clark state cmty college",
    "state": "oh",
    "zipcode": "45501-0570",
    "date": "5/27/2015"
  },
  {
    "id": 1291,
    "country": "usa",
    "city": "carson",
    "name": "cal state u - dominguez hills",
    "state": "ca",
    "zipcode": 90747,
    "date": "5/27/2015"
  },
  {
    "id": 1292,
    "country": "usa",
    "city": "santa cruz",
    "name": "univ of calif - santa cruz",
    "state": "ca",
    "zipcode": 95064,
    "date": "5/29/2015"
  },
  {
    "id": 1293,
    "country": "usa",
    "city": "providence",
    "name": "providence college",
    "state": "ri",
    "zipcode": "02918-7000",
    "date": "5/29/2015"
  },
  {
    "id": 1294,
    "country": "usa",
    "city": "fulton",
    "name": "westminster college",
    "state": "mo",
    "zipcode": "65251-1230",
    "date": "5/29/2015"
  },
  {
    "id": 1295,
    "country": "usa",
    "city": "charlotte",
    "name": "queens univ - charlotte",
    "state": "nc",
    "zipcode": "28274-0001",
    "date": "5/31/2015"
  },
  {
    "id": 1296,
    "country": "usa",
    "city": "lowell",
    "name": "umasslowell",
    "state": "ma",
    "zipcode": "01854-2827",
    "date": "5/31/2015"
  },
  {
    "id": 1297,
    "country": "usa",
    "city": "martinsville",
    "name": "vccs - patrick henry cc",
    "state": "va",
    "zipcode": "24112-6693",
    "date": "6/1/2015"
  },
  {
    "id": 1298,
    "country": "usa",
    "city": "clarion",
    "name": "clarion university of pa",
    "state": "pa",
    "zipcode": "16214-1240",
    "date": "6/1/2015"
  },
  {
    "id": 1299,
    "country": "usa",
    "city": "north dartmouth",
    "name": "umassdartmouth",
    "state": "ma",
    "zipcode": "02747-2356",
    "date": "6/2/2015"
  },
  {
    "id": 1300,
    "country": "usa",
    "city": "seattle",
    "name": "university of washington",
    "state": "wa",
    "zipcode": 98195,
    "date": "6/10/2015"
  },
  {
    "id": 1301,
    "country": "usa",
    "city": "framingham",
    "name": "framingham state university",
    "state": "ma",
    "zipcode": "01702-2499",
    "date": "6/14/2015"
  },
  {
    "id": 1302,
    "country": "usa",
    "city": "spartanburg",
    "name": "univ of sc - upstate",
    "state": "sc",
    "zipcode": "29303-4932",
    "date": "1/9/2017"
  },
  {
    "id": 1303,
    "country": "usa",
    "city": "ogden",
    "name": "weber state university",
    "state": "ut",
    "zipcode": 84408,
    "date": "1/9/2017"
  },
  {
    "id": 1304,
    "country": "usa",
    "city": "new bern",
    "name": "craven community college",
    "state": "nc",
    "zipcode": 28562,
    "date": "1/9/2017"
  },
  {
    "id": 1305,
    "country": "usa",
    "city": "morrow",
    "name": "clayton state univ",
    "state": "ga",
    "zipcode": "30260-1293",
    "date": "1/9/2017"
  },
  {
    "id": 1306,
    "country": "usa",
    "city": "alpena",
    "name": "alpena community college",
    "state": "mi",
    "zipcode": "49707-1410",
    "date": "2/2/2016"
  },
  {
    "id": 1307,
    "country": "usa",
    "city": "staten island",
    "name": "college of staten island",
    "state": "ny",
    "zipcode": "10314-6609",
    "date": "2/2/2016"
  },
  {
    "id": 1308,
    "country": "usa",
    "city": "greenvale",
    "name": "long island university (cw post)",
    "state": "ny",
    "zipcode": "11548-1319",
    "date": "2/2/2016"
  },
  {
    "id": 1309,
    "country": "usa",
    "city": "henderson",
    "name": "nevada state college",
    "state": "nv",
    "zipcode": 89015,
    "date": "2/2/2016"
  },
  {
    "id": 1310,
    "country": "usa",
    "city": "san angelo",
    "name": "angelo state university",
    "state": "tx",
    "zipcode": 76909,
    "date": "2/3/2016"
  },
  {
    "id": 1311,
    "country": "usa",
    "city": "dyersburg",
    "name": "dyersburg st comm coll",
    "state": "tn",
    "zipcode": 38024,
    "date": "2/3/2016"
  },
  {
    "id": 1312,
    "country": "usa",
    "city": "cambridge",
    "name": "massachusetts inst of tech",
    "state": "ma",
    "zipcode": 2139,
    "date": "1/9/2017"
  },
  {
    "id": 1313,
    "country": "usa",
    "city": "new concord",
    "name": "muskingum university",
    "state": "oh",
    "zipcode": "43762-1118",
    "date": "1/9/2017"
  },
  {
    "id": 1314,
    "country": "usa",
    "city": "hammond",
    "name": "purdue university calumet",
    "state": "in",
    "zipcode": 46323,
    "date": "1/9/2017"
  },
  {
    "id": 1315,
    "country": "usa",
    "city": "san bernardino",
    "name": "san bernardino valley coll",
    "state": "ca",
    "zipcode": 92410,
    "date": "2/3/2016"
  },
  {
    "id": 1316,
    "country": "usa",
    "city": "fort lauderdale",
    "name": "broward coll-downtown",
    "state": "fl",
    "zipcode": "33301-2208",
    "date": "2/3/2016"
  },
  {
    "id": 1317,
    "country": "usa",
    "city": "kansas city",
    "name": "penn valley cmty college",
    "state": "mo",
    "zipcode": 64111,
    "date": "2/3/2016"
  },
  {
    "id": 1318,
    "country": "usa",
    "city": "colorado springs",
    "name": "pikes peak cc - downtown cmps",
    "state": "co",
    "zipcode": 80903,
    "date": "2/3/2016"
  },
  {
    "id": 1319,
    "country": "usa",
    "city": "heathrow",
    "name": "seminole state - heathrow",
    "state": "fl",
    "zipcode": 32746,
    "date": "2/3/2016"
  },
  {
    "id": 1320,
    "country": "usa",
    "city": "purchase",
    "name": "suny at purchase",
    "state": "ny",
    "zipcode": "10577-1402",
    "date": "2/3/2016"
  },
  {
    "id": 1321,
    "country": "usa",
    "city": "south bend",
    "name": "indiana univ at so bend",
    "state": "in",
    "zipcode": "46615-1408",
    "date": "2/3/2016"
  },
  {
    "id": 1322,
    "country": "usa",
    "city": "monmouth",
    "name": "western oregon university",
    "state": "or",
    "zipcode": 97361,
    "date": "1/10/2017"
  },
  {
    "id": 1323,
    "country": "usa",
    "city": "sarasota",
    "name": "univ of south florida sarasota/manatee",
    "state": "fl",
    "zipcode": "34243-2049",
    "date": "1/10/2017"
  },
  {
    "id": 1324,
    "country": "usa",
    "city": "catonsville",
    "name": "cc baltimore cty - catonsville",
    "state": "md",
    "zipcode": "21228-5317",
    "date": "2/3/2016"
  },
  {
    "id": 1325,
    "country": "usa",
    "city": "new york",
    "name": "baruch college of cuny",
    "state": "ny",
    "zipcode": "10010-5518",
    "date": "2/3/2016"
  },
  {
    "id": 1326,
    "country": "usa",
    "city": "hempstead",
    "name": "hofstra university",
    "state": "ny",
    "zipcode": 11549,
    "date": "2/3/2016"
  },
  {
    "id": 1327,
    "country": "usa",
    "city": "cambridge",
    "name": "lesley university",
    "state": "ma",
    "zipcode": "02138-2702",
    "date": "2/4/2016"
  },
  {
    "id": 1328,
    "country": "usa",
    "city": "the pas",
    "name": "univ coll of the north - the pas",
    "state": "mb",
    "zipcode": "r9a 1m7",
    "date": "8/24/2017"
  },
  {
    "id": 1329,
    "country": "usa",
    "city": "worthington",
    "name": "mn west comm &amp;tech coll- wort",
    "state": "mn",
    "zipcode": "56187-3024",
    "date": "8/24/2017"
  },
  {
    "id": 1330,
    "country": "usa",
    "city": "harrisburg",
    "name": "temple univ - harrisburg",
    "state": "pa",
    "zipcode": "17101-1817",
    "date": "8/24/2017"
  },
  {
    "id": 1331,
    "country": "usa",
    "city": "portland",
    "name": "univ of so maine - portland",
    "state": "me",
    "zipcode": "04103-4864",
    "date": "8/24/2017"
  },
  {
    "id": 1332,
    "country": "usa",
    "city": "newark",
    "name": "university of delaware",
    "state": "de",
    "zipcode": 19716,
    "date": "8/24/2017"
  },
  {
    "id": 1333,
    "country": "usa",
    "city": "salt lake city",
    "name": "salt lake city comm coll-s",
    "state": "ut",
    "zipcode": 84115,
    "date": "1/10/2017"
  },
  {
    "id": 1334,
    "country": "usa",
    "city": "jupiter",
    "name": "florida atlantic u - north/mac",
    "state": "fl",
    "zipcode": "33458-2906",
    "date": "1/10/2017"
  },
  {
    "id": 1335,
    "country": "usa",
    "city": "salt lake city",
    "name": "brigham young univ-salt lak",
    "state": "ut",
    "zipcode": 84124,
    "date": "1/10/2017"
  },
  {
    "id": 1336,
    "country": "usa",
    "city": "douglas",
    "name": "south ga state coll - douglas",
    "state": "ga",
    "zipcode": "31533-5020",
    "date": "1/10/2017"
  },
  {
    "id": 1337,
    "country": "usa",
    "city": "terre haute",
    "name": "ivy tech comm coll - terre haute",
    "state": "in",
    "zipcode": "47802-4883",
    "date": "2/4/2016"
  },
  {
    "id": 1338,
    "country": "usa",
    "city": "belmont",
    "name": "notre dame de namur university",
    "state": "ca",
    "zipcode": 94002,
    "date": "2/4/2016"
  },
  {
    "id": 1339,
    "country": "usa",
    "city": "plattsburgh",
    "name": "clinton community college",
    "state": "ny",
    "zipcode": "12901-6002",
    "date": "2/4/2016"
  },
  {
    "id": 1340,
    "country": "usa",
    "city": "marietta",
    "name": "marietta college",
    "state": "oh",
    "zipcode": "45750-4033",
    "date": "2/4/2016"
  },
  {
    "id": 1341,
    "country": "usa",
    "city": "birmingham",
    "name": "univ alabama-birmingham",
    "state": "al",
    "zipcode": "35294-0001",
    "date": "2/4/2016"
  },
  {
    "id": 1342,
    "country": "usa",
    "city": "magnolia",
    "name": "sthrn arkansas u-magnolia",
    "state": "ar",
    "zipcode": 71753,
    "date": "2/4/2016"
  },
  {
    "id": 1343,
    "country": "usa",
    "city": "san francisco",
    "name": "san francisco state univ",
    "state": "ca",
    "zipcode": 94132,
    "date": "8/24/2017"
  },
  {
    "id": 1344,
    "country": "usa",
    "city": "colby",
    "name": "colby comm coll",
    "state": "ks",
    "zipcode": "67701-4007",
    "date": "8/24/2017"
  },
  {
    "id": 1345,
    "country": "usa",
    "city": "burton",
    "name": "kent state u-geauga co",
    "state": "oh",
    "zipcode": 44021,
    "date": "8/24/2017"
  },
  {
    "id": 1346,
    "country": "usa",
    "city": "augusta",
    "name": "augusta technical college",
    "state": "ga",
    "zipcode": "30906-8243",
    "date": "8/24/2017"
  },
  {
    "id": 1347,
    "country": "usa",
    "city": "opelika",
    "name": "southern union cc-opelika",
    "state": "al",
    "zipcode": "36801-3113",
    "date": "8/24/2017"
  },
  {
    "id": 1348,
    "country": "usa",
    "city": "columbia",
    "name": "benedict college",
    "state": "sc",
    "zipcode": "29204-1058",
    "date": "8/24/2017"
  },
  {
    "id": 1349,
    "country": "usa",
    "city": "shepherdstown",
    "name": "shepherd university",
    "state": "wv",
    "zipcode": 25443,
    "date": "8/24/2017"
  },
  {
    "id": 1350,
    "country": "usa",
    "city": "creston",
    "name": "southwestern community coll",
    "state": "ia",
    "zipcode": "50801-1042",
    "date": "8/24/2017"
  },
  {
    "id": 1351,
    "country": "usa",
    "city": "south orange",
    "name": "seton hall university",
    "state": "nj",
    "zipcode": "07079-2646",
    "date": "8/24/2017"
  },
  {
    "id": 1352,
    "country": "usa",
    "city": "kenosha",
    "name": "univ of wisconsin - parkside",
    "state": "wi",
    "zipcode": "53144-1133",
    "date": "8/24/2017"
  },
  {
    "id": 1353,
    "country": "usa",
    "city": "lincoln univ",
    "name": "lincoln university",
    "state": "pa",
    "zipcode": 19352,
    "date": "8/24/2017"
  },
  {
    "id": 1354,
    "country": "usa",
    "city": "bogalusa",
    "name": "northshore tech cc - bogalusa",
    "state": "la",
    "zipcode": "70427-5866",
    "date": "8/24/2017"
  },
  {
    "id": 1355,
    "country": "usa",
    "city": "childersburg",
    "name": "central alabama cc",
    "state": "al",
    "zipcode": 35044,
    "date": "8/24/2017"
  },
  {
    "id": 1356,
    "country": "usa",
    "city": "tampa",
    "name": "hillsborough c c-d mabry",
    "state": "fl",
    "zipcode": "33614-7810",
    "date": "8/24/2017"
  },
  {
    "id": 1357,
    "country": "usa",
    "city": "media",
    "name": "delaware cty comm college",
    "state": "pa",
    "zipcode": "19063-1027",
    "date": "8/24/2017"
  },
  {
    "id": 1358,
    "country": "usa",
    "city": "mayhew",
    "name": "east ms cc - golden triangle campus",
    "state": "ms",
    "zipcode": 39753,
    "date": "8/24/2017"
  },
  {
    "id": 1359,
    "country": "usa",
    "city": "ellisville",
    "name": "jones county junior college",
    "state": "ms",
    "zipcode": "39437-3901",
    "date": "8/24/2017"
  },
  {
    "id": 1360,
    "country": "usa",
    "city": "douglasville",
    "name": "west ga tech - douglas",
    "state": "ga",
    "zipcode": 30135,
    "date": "8/24/2017"
  },
  {
    "id": 1361,
    "country": "usa",
    "city": "kennesaw",
    "name": "duplicate",
    "state": "ga",
    "zipcode": 30144,
    "date": "8/24/2017"
  },
  {
    "id": 1362,
    "country": "usa",
    "city": "bryan",
    "name": "s-con inc",
    "state": "tx",
    "zipcode": 77807,
    "date": "6/18/2015"
  },
  {
    "id": 1363,
    "country": "usa",
    "city": "la grande",
    "name": "eastern oregon university",
    "state": "or",
    "zipcode": 97850,
    "date": "6/18/2015"
  },
  {
    "id": 1364,
    "country": "usa",
    "city": "san francisco",
    "name": "ccsf - ocean",
    "state": "ca",
    "zipcode": 94112,
    "date": "6/19/2015"
  },
  {
    "id": 1365,
    "country": "usa",
    "city": "puyallup",
    "name": "pierce college",
    "state": "wa",
    "zipcode": "98374-2210",
    "date": "6/29/2015"
  },
  {
    "id": 1366,
    "country": "usa",
    "city": "indiana",
    "name": "indiana university of pa",
    "state": "pa",
    "zipcode": 15705,
    "date": "7/6/2015"
  },
  {
    "id": 1367,
    "country": "usa",
    "city": "lakewood",
    "name": "rockmont college",
    "state": "co",
    "zipcode": 80226,
    "date": "7/22/2015"
  },
  {
    "id": 1368,
    "country": "usa",
    "city": "philadelphia",
    "name": "holy family university",
    "state": "pa",
    "zipcode": "19114-2009",
    "date": "1/10/2017"
  },
  {
    "id": 1369,
    "country": "usa",
    "city": "chicago",
    "name": "northeastern illinois univ",
    "state": "il",
    "zipcode": 60625,
    "date": "1/10/2017"
  },
  {
    "id": 1370,
    "country": "usa",
    "city": "elizabethtown",
    "name": "kentucky tech elizabethtown",
    "state": "ky",
    "zipcode": "42701-3149",
    "date": "1/10/2017"
  },
  {
    "id": 1371,
    "country": "usa",
    "city": "detroit",
    "name": "univ of detroit-dental schl",
    "state": "mi",
    "zipcode": "48207-4288",
    "date": "1/10/2017"
  },
  {
    "id": 1372,
    "country": "usa",
    "city": "austin",
    "name": "austin c c - rio grande",
    "state": "tx",
    "zipcode": 78701,
    "date": "2/4/2016"
  },
  {
    "id": 1373,
    "country": "usa",
    "city": "denton",
    "name": "university of north texas",
    "state": "tx",
    "zipcode": 76203,
    "date": "2/4/2016"
  },
  {
    "id": 1374,
    "country": "usa",
    "city": "cincinnati",
    "name": "raymond walters college",
    "state": "oh",
    "zipcode": 45236,
    "date": "2/5/2016"
  },
  {
    "id": 1375,
    "country": "usa",
    "city": "chicago",
    "name": "city college of chicago",
    "state": "il",
    "zipcode": "60609-2325",
    "date": "2/5/2016"
  },
  {
    "id": 1376,
    "country": "usa",
    "city": "winston salem",
    "name": "wake forest university",
    "state": "nc",
    "zipcode": 27106,
    "date": "1/10/2017"
  },
  {
    "id": 1377,
    "country": "usa",
    "city": "erie",
    "name": "penn state u behrend campus",
    "state": "pa",
    "zipcode": "16563-4101",
    "date": "1/10/2017"
  },
  {
    "id": 1378,
    "country": "usa",
    "city": "don mills",
    "name": "pearson university",
    "state": "on",
    "zipcode": "m3c 2t8",
    "date": "1/10/2017"
  },
  {
    "id": 1379,
    "country": "usa",
    "city": "grenada",
    "name": "holmes cc-grenada",
    "state": "ms",
    "zipcode": "38901-5095",
    "date": "1/10/2017"
  },
  {
    "id": 1380,
    "country": "usa",
    "city": "bangor",
    "name": "husson university",
    "state": "me",
    "zipcode": 4401,
    "date": "2/5/2016"
  },
  {
    "id": 1381,
    "country": "usa",
    "city": "pittsburgh",
    "name": "cc allegheny co-allegheny",
    "state": "pa",
    "zipcode": "15212-6003",
    "date": "2/5/2016"
  },
  {
    "id": 1382,
    "country": "usa",
    "city": "new york",
    "name": "fordham univ-lincoln ctr",
    "state": "ny",
    "zipcode": "10023-7414",
    "date": "2/5/2016"
  },
  {
    "id": 1383,
    "country": "usa",
    "city": "elkhorn",
    "name": "gateway tech coll elkhorn",
    "state": "wi",
    "zipcode": "53121-2035",
    "date": "2/5/2016"
  },
  {
    "id": 1384,
    "country": "usa",
    "city": "chicago",
    "name": "kennedy king college",
    "state": "il",
    "zipcode": "60621-2709",
    "date": "2/6/2016"
  },
  {
    "id": 1385,
    "country": "usa",
    "city": "seattle",
    "name": "north seattle cmty college",
    "state": "wa",
    "zipcode": 98103,
    "date": "2/6/2016"
  },
  {
    "id": 1386,
    "country": "usa",
    "city": "emory",
    "name": "emory and henry college",
    "state": "va",
    "zipcode": 24327,
    "date": "1/10/2017"
  },
  {
    "id": 1387,
    "country": "usa",
    "city": "wahpeton",
    "name": "no dakota st college of sci",
    "state": "nd",
    "zipcode": "58076-0001",
    "date": "1/10/2017"
  },
  {
    "id": 1388,
    "country": "usa",
    "city": "vincennes",
    "name": "vincennes univ - vincennes",
    "state": "in",
    "zipcode": "47591-1504",
    "date": "1/11/2017"
  },
  {
    "id": 1389,
    "country": "usa",
    "city": "edinboro",
    "name": "edinboro university of pa",
    "state": "pa",
    "zipcode": 16444,
    "date": "2/6/2016"
  },
  {
    "id": 1390,
    "country": "usa",
    "city": "randolph",
    "name": "county college of morris",
    "state": "nj",
    "zipcode": 7869,
    "date": "2/6/2016"
  },
  {
    "id": 1391,
    "country": "usa",
    "city": "river forest",
    "name": "dominican university",
    "state": "il",
    "zipcode": 60305,
    "date": "2/6/2016"
  },
  {
    "id": 1392,
    "country": "usa",
    "city": "plainfield",
    "name": "union county college",
    "state": "nj",
    "zipcode": "07060-1308",
    "date": "2/7/2016"
  },
  {
    "id": 1393,
    "country": "usa",
    "city": "eau claire",
    "name": "chippewa valley tech coll",
    "state": "wi",
    "zipcode": "54701-6120",
    "date": "8/24/2017"
  },
  {
    "id": 1394,
    "country": "usa",
    "city": "brownwood",
    "name": "texas state tech - brownwood",
    "state": "tx",
    "zipcode": 76801,
    "date": "8/25/2017"
  },
  {
    "id": 1395,
    "country": "usa",
    "city": "odessa",
    "name": "univ of texas - permian basin",
    "state": "tx",
    "zipcode": 79762,
    "date": "8/25/2017"
  },
  {
    "id": 1396,
    "country": "usa",
    "city": "peoria",
    "name": "midstate college",
    "state": "il",
    "zipcode": "61614-3542",
    "date": "8/25/2017"
  },
  {
    "id": 1397,
    "country": "usa",
    "city": "washington",
    "name": "univ district of columbia",
    "state": "dc",
    "zipcode": 20008,
    "date": "1/11/2017"
  },
  {
    "id": 1398,
    "country": "usa",
    "city": "pineville",
    "name": "louisiana college",
    "state": "la",
    "zipcode": 71360,
    "date": "1/11/2017"
  },
  {
    "id": 1399,
    "country": "usa",
    "city": "erie",
    "name": "gannon university",
    "state": "pa",
    "zipcode": "16541-0002",
    "date": "1/11/2017"
  },
  {
    "id": 1400,
    "country": "usa",
    "city": "pinehurst",
    "name": "sandhills community college",
    "state": "nc",
    "zipcode": "28374-8778",
    "date": "1/11/2017"
  },
  {
    "id": 1401,
    "country": "usa",
    "city": "newnan",
    "name": "univ of west ga - newnan",
    "state": "ga",
    "zipcode": 30265,
    "date": "8/25/2017"
  },
  {
    "id": 1402,
    "country": "usa",
    "city": "greeley",
    "name": "aims comm coll-greeley",
    "state": "co",
    "zipcode": 80634,
    "date": "8/25/2017"
  },
  {
    "id": 1403,
    "country": "usa",
    "city": "ft lauderdale",
    "name": "nova southeastern univ",
    "state": "fl",
    "zipcode": 33314,
    "date": "8/25/2017"
  },
  {
    "id": 1404,
    "country": "usa",
    "city": "saint louis",
    "name": "univ of mo-st louis",
    "state": "mo",
    "zipcode": 63121,
    "date": "8/25/2017"
  },
  {
    "id": 1405,
    "country": "usa",
    "city": "coalinga",
    "name": "west hills college",
    "state": "ca",
    "zipcode": 93210,
    "date": "8/25/2017"
  },
  {
    "id": 1406,
    "country": "usa",
    "city": "moraga",
    "name": "saint marys college",
    "state": "ca",
    "zipcode": 94575,
    "date": "8/25/2017"
  },
  {
    "id": 1407,
    "country": "usa",
    "city": "albany",
    "name": "albany tech college",
    "state": "ga",
    "zipcode": "31701-2648",
    "date": "8/25/2017"
  },
  {
    "id": 1408,
    "country": "usa",
    "city": "indianapolis",
    "name": "ball state univ - indiana",
    "state": "in",
    "zipcode": 46220,
    "date": "8/25/2017"
  },
  {
    "id": 1409,
    "country": "usa",
    "city": "independence",
    "name": "blue river community colleg",
    "state": "mo",
    "zipcode": 64057,
    "date": "8/25/2017"
  },
  {
    "id": 1410,
    "country": "usa",
    "city": "lansing",
    "name": "lansing community college",
    "state": "mi",
    "zipcode": "48933-1215",
    "date": "8/25/2017"
  },
  {
    "id": 1411,
    "country": "usa",
    "city": "mars hill",
    "name": "mars hill college",
    "state": "nc",
    "zipcode": "28754-9134",
    "date": "8/25/2017"
  },
  {
    "id": 1412,
    "country": "usa",
    "city": "hickory",
    "name": "catawba valley comm coll",
    "state": "nc",
    "zipcode": "28602-8302",
    "date": "8/25/2017"
  },
  {
    "id": 1413,
    "country": "usa",
    "city": "watkinsville",
    "name": "univ of n georgia -oconee",
    "state": "ga",
    "zipcode": 30677,
    "date": "8/25/2017"
  },
  {
    "id": 1414,
    "country": "usa",
    "city": "hammond",
    "name": "north shore career coll",
    "state": "la",
    "zipcode": 70401,
    "date": "8/25/2017"
  },
  {
    "id": 1415,
    "country": "usa",
    "city": "gambier",
    "name": "kenyon college",
    "state": "oh",
    "zipcode": 43022,
    "date": "8/25/2017"
  }
];

const checkList = [
  {
    "name": "Mt. San Jacinto College",
    "id": 1
  },
  {
    "name": "Cañada College",
    "id": 2
  },
  {
    "name": "Santa Ana College",
    "id": 3
  },
  {
    "name": "Gulf Coast State College",
    "id": 4
  },
  {
    "name": "Berry College",
    "id": 5
  },
  {
    "name": "University of Hawaii Maui College",
    "id": 6
  },
  {
    "name": "Indiana Wesleyan University",
    "id": 7
  },
  {
    "name": "Northern Kentucky University",
    "id": 8
  },
  {
    "name": "North Florida Community College",
    "id": 9
  },
  {
    "name": "Pasco-Hernando State College East Campus",
    "id": 10
  },
  {
    "name": "University of Arkansas at Monticello",
    "id": 11
  },
  {
    "name": "Copiah-Lincoln Community College",
    "id": 12
  },
  {
    "name": "North Dakota University System",
    "id": 13
  },
  {
    "name": "Moberly Area Community College",
    "id": 14
  },
  {
    "name": "The University of New Mexico",
    "id": 15
  },
  {
    "name": "Spartanburg Methodist College",
    "id": 16
  },
  {
    "name": "California State University Long Beach",
    "id": 17
  },
  {
    "name": "Belmont University",
    "id": 18
  },
  {
    "name": "University of North Carolina Asheville",
    "id": 19
  },
  {
    "name": "The University of Tennessee at Chattanooga",
    "id": 20
  },
  {
    "name": "Kennesaw State University",
    "id": 21
  },
  {
    "name": "East Carolina University",
    "id": 22
  },
  {
    "name": "The University of Texas at San Antonio",
    "id": 23
  },
  {
    "name": "Boise State University",
    "id": 24
  },
  {
    "name": "Tulsa Community College Metro Campus",
    "id": 25
  },
  {
    "name": "Polk State College",
    "id": 26
  },
  {
    "name": "University of Northern Iowa",
    "id": 27
  },
  {
    "name": "Hill College",
    "id": 28
  },
  {
    "name": "University of North Carolina at Charlotte",
    "id": 29
  },
  {
    "name": "Louisiana State University",
    "id": 30
  },
  {
    "name": "Central Piedmont Community College Charlotte Cooks",
    "id": 31
  },
  {
    "name": "Kirkwood Community College",
    "id": 32
  },
  {
    "name": "Graduate School at the University of North Carolina at Chapel Hill",
    "id": 33
  },
  {
    "name": "Northern Virginia Community College - Alexandria Campus",
    "id": 34
  },
  {
    "name": "Fayetteville Technical Community College",
    "id": 35
  },
  {
    "name": "University of Miami",
    "id": 36
  },
  {
    "name": "Southwestern College",
    "id": 37
  },
  {
    "name": "Florida Atlantic University",
    "id": 38
  },
  {
    "name": "Clemson University",
    "id": 39
  },
  {
    "name": "Arkansas State University",
    "id": 40
  },
  {
    "name": "Shaw University Bookstore",
    "id": 41
  },
  {
    "name": "Cuesta College",
    "id": 42
  },
  {
    "name": "Northwest State Community College",
    "id": 43
  },
  {
    "name": "Harper College",
    "id": 44
  },
  {
    "name": "Ohio Wesleyan University",
    "id": 45
  },
  {
    "name": "Savannah Technical College",
    "id": 46
  },
  {
    "name": "Missouri State University: University Communications",
    "id": 47
  },
  {
    "name": "Howard University",
    "id": 48
  },
  {
    "name": "Eastern Kentucky University",
    "id": 49
  },
  {
    "name": "Somerset Community College - Laurel Campus North",
    "id": 50
  },
  {
    "name": "Purdue University",
    "id": 51
  },
  {
    "name": "The College of Idaho",
    "id": 52
  },
  {
    "name": "St. Charles Community College",
    "id": 53
  },
  {
    "name": "Henderson State University",
    "id": 54
  },
  {
    "name": "Broward College - A. Hugh Adams Central Campus",
    "id": 55
  },
  {
    "name": "University of Nebraska-Lincoln",
    "id": 56
  },
  {
    "name": "University of Kentucky",
    "id": 57
  },
  {
    "name": "Cullom-Davis Library",
    "id": 58
  },
  {
    "name": "Minnesota State University, Mankato",
    "id": 59
  },
  {
    "name": "University of Southern Indiana",
    "id": 60
  },
  {
    "name": "Dallas County Community College District Service Center",
    "id": 61
  },
  {
    "name": "Saint Mary's College",
    "id": 62
  },
  {
    "name": "Cerro Coso Community College",
    "id": 63
  },
  {
    "name": "Marshall University",
    "id": 64
  },
  {
    "name": "University of Louisville",
    "id": 65
  },
  {
    "name": "Hill College",
    "id": 66
  },
  {
    "name": "Troy University",
    "id": 67
  },
  {
    "name": "Ozarks Technical Community College",
    "id": 68
  },
  {
    "name": "San Joaquin Delta College",
    "id": 69
  },
  {
    "name": "College of Education at California State University Fullerton",
    "id": 70
  },
  {
    "name": "Truman State University",
    "id": 71
  },
  {
    "name": "Phoenix College",
    "id": 72
  },
  {
    "name": "American River College",
    "id": 73
  },
  {
    "name": "University of Houston",
    "id": 74
  },
  {
    "name": "99164",
    "id": 75
  },
  {
    "name": "Gilmer Hall",
    "id": 76
  },
  {
    "name": "Southwest Virginia Community College",
    "id": 77
  },
  {
    "name": "Winona State University",
    "id": 78
  },
  {
    "name": "Northeast Community College",
    "id": 79
  },
  {
    "name": "University of Cincinnati",
    "id": 80
  },
  {
    "name": "Sam Houston State University",
    "id": 81
  },
  {
    "name": "Corban University",
    "id": 82
  },
  {
    "name": "South Suburban College",
    "id": 83
  },
  {
    "name": "Rhodes College",
    "id": 84
  },
  {
    "name": "Bowling Green State University",
    "id": 85
  },
  {
    "name": "DeSales University",
    "id": 86
  },
  {
    "name": "College of DuPage",
    "id": 87
  },
  {
    "name": "Winthrop University",
    "id": 88
  },
  {
    "name": "Presbyterian College",
    "id": 89
  },
  {
    "name": "Northampton Community College",
    "id": 90
  },
  {
    "name": "35487",
    "id": 91
  },
  {
    "name": "BridgeValley Community and Technical College",
    "id": 92
  },
  {
    "name": "University of Florida",
    "id": 93
  },
  {
    "name": "University of Missouri",
    "id": 94
  },
  {
    "name": "Lake-Sumter State College",
    "id": 95
  },
  {
    "name": "Diablo Valley College",
    "id": 96
  },
  {
    "name": "The Graduate School Wichita State University",
    "id": 97
  },
  {
    "name": "University of Arkansas",
    "id": 98
  },
  {
    "name": "Crowder College",
    "id": 99
  },
  {
    "name": "Lander University",
    "id": 100
  },
  {
    "name": "Nebraska College of Technical Agriculture",
    "id": 101
  },
  {
    "name": "Reinhardt University",
    "id": 102
  },
  {
    "name": "East Central Community College",
    "id": 103
  },
  {
    "name": "Wittenberg University",
    "id": 104
  },
  {
    "name": "University of Mount Olive",
    "id": 105
  },
  {
    "name": "Trident Technical College",
    "id": 106
  },
  {
    "name": "North Idaho College",
    "id": 107
  },
  {
    "name": "Broward College-South Campus",
    "id": 108
  },
  {
    "name": "Stanislaus State",
    "id": 109
  },
  {
    "name": "Fresno City College",
    "id": 110
  },
  {
    "name": "Butte College",
    "id": 111
  },
  {
    "name": "Bakersfield College",
    "id": 112
  },
  {
    "name": "Colorado Mesa University",
    "id": 113
  },
  {
    "name": "Santa Fe College",
    "id": 114
  },
  {
    "name": "University of Mary Hardin-Baylor",
    "id": 115
  },
  {
    "name": "Kent State University - Center for Scholastic Journalism",
    "id": 116
  },
  {
    "name": "Iowa State University",
    "id": 117
  },
  {
    "name": "North Carolina Central University",
    "id": 118
  },
  {
    "name": "Grayson College",
    "id": 119
  },
  {
    "name": "Auburn University",
    "id": 120
  },
  {
    "name": "US Air Force Academy Clinic",
    "id": 121
  },
  {
    "name": "The University of New Mexico-Valencia Campus",
    "id": 122
  },
  {
    "name": "San Juan College",
    "id": 123
  },
  {
    "name": "University of Southern California",
    "id": 125
  },
  {
    "name": "Anderson University",
    "id": 126
  },
  {
    "name": "The University of Southern Mississippi",
    "id": 127
  },
  {
    "name": "Norfolk State University",
    "id": 128
  },
  {
    "name": "61790",
    "id": 129
  },
  {
    "name": "Butler Community College",
    "id": 130
  },
  {
    "name": "Texas Christian University",
    "id": 131
  },
  {
    "name": "New Mexico State University",
    "id": 132
  },
  {
    "name": "Hawai'i Community College",
    "id": 133
  },
  {
    "name": "Western Kentucky University",
    "id": 134
  },
  {
    "name": "Merced College",
    "id": 135
  },
  {
    "name": "University of Hawaii at Manoa",
    "id": 136
  },
  {
    "name": "State College of Florida",
    "id": 137
  },
  {
    "name": "Associated Builders & Contractors",
    "id": 138
  },
  {
    "name": "College of Central Florida",
    "id": 139
  },
  {
    "name": "Student Central",
    "id": 140
  },
  {
    "name": "Georgia Southern University College of Business Administration",
    "id": 141
  },
  {
    "name": "Southeastern Louisiana University",
    "id": 142
  },
  {
    "name": "Amarillo College",
    "id": 143
  },
  {
    "name": "Macomb Community College",
    "id": 144
  },
  {
    "name": "Modesto Junior College",
    "id": 145
  },
  {
    "name": "Palm Beach State College",
    "id": 146
  },
  {
    "name": "33199",
    "id": 147
  },
  {
    "name": "Butler County Community College",
    "id": 148
  },
  {
    "name": "South Dakota State University",
    "id": 149
  },
  {
    "name": "North Carolina State University",
    "id": 150
  },
  {
    "name": "Williston State College",
    "id": 151
  },
  {
    "name": "Redlands Community College",
    "id": 152
  },
  {
    "name": "Hill College",
    "id": 153
  },
  {
    "name": "Northeastern State University Tahlequah",
    "id": 154
  },
  {
    "name": "Sierra College",
    "id": 155
  },
  {
    "name": "Bucks County Community College",
    "id": 156
  },
  {
    "name": "Ouachita Baptist University",
    "id": 157
  },
  {
    "name": "Baylor University",
    "id": 158
  },
  {
    "name": "John Abbott College",
    "id": 159
  },
  {
    "name": "Gwinnett Technical College",
    "id": 160
  },
  {
    "name": "Arizona State University, Tempe Campus",
    "id": 161
  },
  {
    "name": "East Central College",
    "id": 162
  },
  {
    "name": "Skyline College Campground",
    "id": 163
  },
  {
    "name": "27411",
    "id": 164
  },
  {
    "name": "Hillsborough Community College - Plant City Campus",
    "id": 165
  },
  {
    "name": "62026",
    "id": 166
  },
  {
    "name": "Western Carolina University",
    "id": 167
  },
  {
    "name": "St. Cloud State University",
    "id": 168
  },
  {
    "name": "University of Alaska Anchorage",
    "id": 169
  },
  {
    "name": "Ball State Student Center",
    "id": 170
  },
  {
    "name": "University of Northern Colorado College of Performing and Visual Arts",
    "id": 171
  },
  {
    "name": "Creighton University",
    "id": 172
  },
  {
    "name": "Midlands Technical College - Airport Campus",
    "id": 173
  },
  {
    "name": "Alabama State University",
    "id": 174
  },
  {
    "name": "Central Arizona College",
    "id": 175
  },
  {
    "name": "Allegany College of Maryland",
    "id": 176
  },
  {
    "name": "The University of Utah",
    "id": 177
  },
  {
    "name": "Wayland Baptist University",
    "id": 178
  },
  {
    "name": "Wake Technical Community College",
    "id": 179
  },
  {
    "name": "Dakota State University",
    "id": 180
  },
  {
    "name": "Oklahoma State University",
    "id": 181
  },
  {
    "name": "Indiana University - Purdue University Indianapolis",
    "id": 182
  },
  {
    "name": "Florida Gulf Coast University",
    "id": 183
  },
  {
    "name": "Tidewater Community College Virginia Beach Campus",
    "id": 184
  },
  {
    "name": "Hillsborough Community College - Administration",
    "id": 185
  },
  {
    "name": "The University of Arizona",
    "id": 186
  },
  {
    "name": "University of Colorado Denver",
    "id": 187
  },
  {
    "name": "Kapiʻolani Community College",
    "id": 188
  },
  {
    "name": "Minneapolis Community & Technical College",
    "id": 189
  },
  {
    "name": "Normandale Community College",
    "id": 190
  },
  {
    "name": "West Georgia Technical College - Carroll Campus",
    "id": 191
  },
  {
    "name": "Columbus Technical College",
    "id": 192
  },
  {
    "name": "Northwest-Shoals Community College",
    "id": 193
  },
  {
    "name": "University of New Haven",
    "id": 194
  },
  {
    "name": "South Louisiana Community College - Lafayette Campus",
    "id": 195
  },
  {
    "name": "Beacon College",
    "id": 196
  },
  {
    "name": "Vernon College - Century City Center",
    "id": 197
  },
  {
    "name": "Eastfield College",
    "id": 198
  },
  {
    "name": "Chattahoochee Tech College",
    "id": 199
  },
  {
    "name": "Northshore Technical Community College - Hammond Campus",
    "id": 200
  },
  {
    "name": "Dixie State University.",
    "id": 201
  },
  {
    "name": "Arizona State University Downtown Phoenix Campus",
    "id": 202
  },
  {
    "name": "Pima Community College - Downtown Campus",
    "id": 203
  },
  {
    "name": "Ozarks Technical Community College",
    "id": 204
  },
  {
    "name": "Mayville State University",
    "id": 205
  },
  {
    "name": "California State University, Fresno",
    "id": 206
  },
  {
    "name": "University of Mississippi",
    "id": 207
  },
  {
    "name": "Three Rivers College",
    "id": 208
  },
  {
    "name": "George Corley Wallace State Community College Selma",
    "id": 209
  },
  {
    "name": "University of Nebraska Omaha",
    "id": 210
  },
  {
    "name": "Waubonsee Community College",
    "id": 211
  },
  {
    "name": "Morehead State University",
    "id": 212
  },
  {
    "name": "University of Missouri-Kansas City",
    "id": 213
  },
  {
    "name": "Chandler Gilbert Community College",
    "id": 214
  },
  {
    "name": "The University of Georgia",
    "id": 215
  },
  {
    "name": "Kansas State University",
    "id": 216
  },
  {
    "name": "Northwest Arkansas Community College",
    "id": 217
  },
  {
    "name": "32816",
    "id": 218
  },
  {
    "name": "Pasco-Hernando State College",
    "id": 219
  },
  {
    "name": "Southern Methodist University",
    "id": 220
  },
  {
    "name": "SPC - Clearwater Campus",
    "id": 222
  },
  {
    "name": "Cape Fear Community College",
    "id": 223
  },
  {
    "name": "University of Colorado Colorado Springs",
    "id": 224
  },
  {
    "name": "Northcentral Technical College",
    "id": 225
  },
  {
    "name": "Penn State Undergraduate Admissions",
    "id": 226
  },
  {
    "name": "Augustana College",
    "id": 227
  },
  {
    "name": "The University of Tulsa",
    "id": 228
  },
  {
    "name": "Minnesota State University, Mankato",
    "id": 229
  },
  {
    "name": "Central Georgia Technical College",
    "id": 230
  },
  {
    "name": "Gaston College",
    "id": 231
  },
  {
    "name": "Yavapai College",
    "id": 232
  },
  {
    "name": "Edward Waters College",
    "id": 233
  },
  {
    "name": "Trace of Altamonte Spring",
    "id": 234
  },
  {
    "name": "California State University, Chico",
    "id": 235
  },
  {
    "name": "Butte College",
    "id": 236
  },
  {
    "name": "Los Medanos College",
    "id": 237
  },
  {
    "name": "Coastal Carolina University",
    "id": 238
  },
  {
    "name": "Ivy Tech Community College - South Bend",
    "id": 239
  },
  {
    "name": "Tyler Junior College",
    "id": 240
  },
  {
    "name": "The University of North Carolina at Greensboro",
    "id": 241
  },
  {
    "name": "Pima Community College - Downtown Campus",
    "id": 242
  },
  {
    "name": "Triton College Community Center",
    "id": 243
  },
  {
    "name": "Armstrong State University",
    "id": 244
  },
  {
    "name": "Eastern New Mexico University",
    "id": 245
  },
  {
    "name": "State Technical College of Missouri",
    "id": 246
  },
  {
    "name": "El Centro College",
    "id": 247
  },
  {
    "name": "Trinity International University",
    "id": 248
  },
  {
    "name": "Pasco-Hernando State College North Campus",
    "id": 249
  },
  {
    "name": "Broward College - North Campus",
    "id": 250
  },
  {
    "name": "Pearl River Community College",
    "id": 251
  },
  {
    "name": "Coastal Carolina University",
    "id": 252
  },
  {
    "name": "Baldwin Wallace University",
    "id": 254
  },
  {
    "name": "Lenoir-Rhyne University",
    "id": 255
  },
  {
    "name": "Central Arizona College",
    "id": 256
  },
  {
    "name": "University of Missouri-St. Louis",
    "id": 257
  },
  {
    "name": "Corning Community College",
    "id": 258
  },
  {
    "name": "College of the Sequoias",
    "id": 259
  },
  {
    "name": "Rhode Island College",
    "id": 260
  },
  {
    "name": "Austin Community College: Highland Business Center",
    "id": 261
  },
  {
    "name": "Morton College",
    "id": 262
  },
  {
    "name": "Minot State University",
    "id": 263
  },
  {
    "name": "University of Kansas",
    "id": 264
  },
  {
    "name": "University of North Florida (UNF)",
    "id": 265
  },
  {
    "name": "Saint Louis Community College - Forest Park",
    "id": 266
  },
  {
    "name": "Piedmont Technical College",
    "id": 267
  },
  {
    "name": "Elgin Community College",
    "id": 268
  },
  {
    "name": "Greenville Technical College",
    "id": 269
  },
  {
    "name": "East Central University",
    "id": 270
  },
  {
    "name": "39762",
    "id": 271
  },
  {
    "name": "Ivy Tech Community College Lafayette",
    "id": 272
  },
  {
    "name": "Florida Gateway College",
    "id": 273
  },
  {
    "name": "Nash Community College",
    "id": 274
  },
  {
    "name": "Charleston Southern University",
    "id": 275
  },
  {
    "name": "Southwestern Illinois College",
    "id": 276
  },
  {
    "name": "Mesa Community College",
    "id": 277
  },
  {
    "name": "Front Range Community College",
    "id": 278
  },
  {
    "name": "University of North Georgia",
    "id": 279
  },
  {
    "name": "McNeese State University Foundation",
    "id": 280
  },
  {
    "name": "University of Arkansas – Pulaski Technical College",
    "id": 281
  },
  {
    "name": "McHenry County College",
    "id": 282
  },
  {
    "name": "Ozark Christian College",
    "id": 283
  },
  {
    "name": "Limestone College",
    "id": 284
  },
  {
    "name": "State University of New York at Fredonia",
    "id": 285
  },
  {
    "name": "University of South Dakota",
    "id": 286
  },
  {
    "name": "Technical College of the Lowcountry",
    "id": 287
  },
  {
    "name": "USF St Petersburg",
    "id": 288
  },
  {
    "name": "East Mississippi Community College",
    "id": 289
  },
  {
    "name": "Eastern Florida State College - Cocoa Campus",
    "id": 290
  },
  {
    "name": "The City College of New York",
    "id": 291
  },
  {
    "name": "University of Nebraska Kearney",
    "id": 292
  },
  {
    "name": "Lake Superior College",
    "id": 293
  },
  {
    "name": "Pasco-Hernando State College Porter Campus at Wiregrass Ranch",
    "id": 294
  },
  {
    "name": "Mt San Jacinto College",
    "id": 295
  },
  {
    "name": "Rowan-Cabarrus Community College",
    "id": 296
  },
  {
    "name": "College of Charleston",
    "id": 297
  },
  {
    "name": "Georgia College",
    "id": 298
  },
  {
    "name": "Capital University",
    "id": 299
  },
  {
    "name": "Meridian Community College",
    "id": 300
  },
  {
    "name": "Albany State University",
    "id": 301
  },
  {
    "name": "DePaul University - Welcome Center",
    "id": 302
  },
  {
    "name": "Texas State University",
    "id": 303
  },
  {
    "name": "St Louis Community College - Wildwood",
    "id": 304
  },
  {
    "name": "Carl Sandburg College",
    "id": 305
  },
  {
    "name": "Northwest Mississippi Community College",
    "id": 306
  },
  {
    "name": "Indiana University – Purdue University Fort Wayne (IPFW)",
    "id": 307
  },
  {
    "name": "Augusta University",
    "id": 308
  },
  {
    "name": "Univ of Nm School of Medicine: Valdez-Boyle Lorene S MD",
    "id": 309
  },
  {
    "name": "Mayland Community College",
    "id": 310
  },
  {
    "name": "St. Petersburg College - Tarpon Springs Campus",
    "id": 311
  },
  {
    "name": "University of Mary Washington",
    "id": 312
  },
  {
    "name": "The University of Iowa",
    "id": 313
  },
  {
    "name": "Northeast Mississippi Community College",
    "id": 314
  },
  {
    "name": "North Dakota State University",
    "id": 315
  },
  {
    "name": "High Point University Student Health Services",
    "id": 316
  },
  {
    "name": "University of Hawaii at Hilo",
    "id": 317
  },
  {
    "name": "Metropolitan State University of Denver",
    "id": 318
  },
  {
    "name": "Itawamba Community College Drive",
    "id": 319
  },
  {
    "name": "MiraCosta College",
    "id": 320
  },
  {
    "name": "San Diego Miramar College",
    "id": 321
  },
  {
    "name": "The University of North Carolina at Pembroke",
    "id": 322
  },
  {
    "name": "Washington State University Tri-Cities",
    "id": 323
  },
  {
    "name": "Kutztown University of Pennsylvania",
    "id": 324
  },
  {
    "name": "Iowa Western Community College",
    "id": 325
  },
  {
    "name": "University of North Carolina Wilmington",
    "id": 326
  },
  {
    "name": "23943",
    "id": 327
  },
  {
    "name": "University of Arkansas - Fort Smith",
    "id": 328
  },
  {
    "name": "Trident Technical College Palmer Campus",
    "id": 329
  },
  {
    "name": "West Virginia University",
    "id": 330
  },
  {
    "name": "Polk State College - Lakeland Campus",
    "id": 331
  },
  {
    "name": "Illinois Central College - East Peoria Campus",
    "id": 332
  },
  {
    "name": "College of Southern Nevada North Las Vegas Campus",
    "id": 333
  },
  {
    "name": "Shenandoah University",
    "id": 334
  },
  {
    "name": "Delaware Technical Community College - Charles L. Terry Campus - Dover",
    "id": 335
  },
  {
    "name": "Dickinson State University",
    "id": 336
  },
  {
    "name": "Saint Leo University",
    "id": 337
  },
  {
    "name": "Southern Illinois University",
    "id": 338
  },
  {
    "name": "The Ohio State University",
    "id": 339
  },
  {
    "name": "Southwestern Oklahoma State University",
    "id": 340
  },
  {
    "name": "The University of New Mexico-Valencia Campus",
    "id": 341
  },
  {
    "name": "Indiana University South Bend",
    "id": 342
  },
  {
    "name": "Colorado State University",
    "id": 343
  },
  {
    "name": "Lincoln Land Community College",
    "id": 344
  },
  {
    "name": "University of Minnesota Crookston",
    "id": 345
  },
  {
    "name": "Fort Hays State University",
    "id": 346
  },
  {
    "name": "Tallahassee Community College",
    "id": 347
  },
  {
    "name": "Longwood University",
    "id": 348
  },
  {
    "name": "Hillsborough Community College - Dale Mabry Campus",
    "id": 349
  },
  {
    "name": "Univ of Texas-Arlington: Qasim Syed",
    "id": 350
  },
  {
    "name": "Community College of Aurora - CentreTech Campus",
    "id": 351
  },
  {
    "name": "Sinclair Community College",
    "id": 352
  },
  {
    "name": "Atlanta Metropolitan State College",
    "id": 353
  },
  {
    "name": "Florida SouthWestern State College - Collier Campus",
    "id": 354
  },
  {
    "name": "Ivy Tech Community College",
    "id": 355
  },
  {
    "name": "Indiana University Northwest",
    "id": 356
  },
  {
    "name": "Connecticut State Colleges and Universities System",
    "id": 357
  },
  {
    "name": "St. Johns River State College",
    "id": 358
  },
  {
    "name": "University of North Dakota",
    "id": 359
  },
  {
    "name": "Johnson County Community College",
    "id": 360
  },
  {
    "name": "Lord Fairfax Community College - Middletown Campus",
    "id": 361
  },
  {
    "name": "Ohio University",
    "id": 362
  },
  {
    "name": "Savannah State University",
    "id": 363
  },
  {
    "name": "San José State University",
    "id": 364
  },
  {
    "name": "Wayne State University",
    "id": 365
  },
  {
    "name": "Scott Community College",
    "id": 366
  },
  {
    "name": "Rochester Community and Technical College",
    "id": 367
  },
  {
    "name": "78041",
    "id": 368
  },
  {
    "name": "Indiana University Southeast",
    "id": 369
  },
  {
    "name": "University of Tennessee",
    "id": 370
  },
  {
    "name": "Johnston Community College",
    "id": 371
  },
  {
    "name": "Texas Woman's University",
    "id": 372
  },
  {
    "name": "Arizona Western College",
    "id": 373
  },
  {
    "name": "Humboldt State University",
    "id": 374
  },
  {
    "name": "Midlands Technical College - Airport Campus",
    "id": 375
  },
  {
    "name": "Adrian College",
    "id": 376
  },
  {
    "name": "Bethel University",
    "id": 377
  },
  {
    "name": "Illinois Valley Community College",
    "id": 378
  },
  {
    "name": "La Salle University",
    "id": 379
  },
  {
    "name": "Chabot-Las Positas Community College District",
    "id": 380
  },
  {
    "name": "Hocking College",
    "id": 381
  },
  {
    "name": "University of Florida",
    "id": 382
  },
  {
    "name": "Moraine Valley Community College",
    "id": 383
  },
  {
    "name": "Germanna Community College",
    "id": 384
  },
  {
    "name": "Delaware Technical Community College - Stanton Campus - Newark",
    "id": 385
  },
  {
    "name": "New Mexico Highlands University",
    "id": 386
  },
  {
    "name": "Century College",
    "id": 387
  },
  {
    "name": "Indiana University East",
    "id": 388
  },
  {
    "name": "Eastern New Mexico University - Roswell",
    "id": 389
  },
  {
    "name": "Salt Lake Community College",
    "id": 390
  },
  {
    "name": "Owens Community College",
    "id": 391
  },
  {
    "name": "Joliet Junior College",
    "id": 392
  },
  {
    "name": "Pima Community College - Downtown Campus",
    "id": 393
  },
  {
    "name": "Northeast Lakeview College",
    "id": 394
  },
  {
    "name": "University of SC Lancaster",
    "id": 395
  },
  {
    "name": "Western Piedmont Community College",
    "id": 396
  },
  {
    "name": "Shelton State Community College",
    "id": 397
  },
  {
    "name": "East Los Angeles College",
    "id": 398
  },
  {
    "name": "Worcester State University",
    "id": 399
  },
  {
    "name": "University of Colorado Boulder",
    "id": 400
  },
  {
    "name": "Pasadena City College",
    "id": 401
  },
  {
    "name": "The University of Toledo",
    "id": 402
  },
  {
    "name": "Middlesex County College",
    "id": 403
  },
  {
    "name": "Bronx Community College",
    "id": 404
  },
  {
    "name": "Coastal Bend College",
    "id": 405
  },
  {
    "name": "Tulsa Community College - Southeast Campus",
    "id": 406
  },
  {
    "name": "77843",
    "id": 407
  },
  {
    "name": "University of Maryland",
    "id": 408
  },
  {
    "name": "Golden West College",
    "id": 409
  },
  {
    "name": "Knight Campus - Community College of Rhode Island (CCRI)",
    "id": 410
  },
  {
    "name": "College of the Desert",
    "id": 411
  },
  {
    "name": "Rochester Institute of Technology",
    "id": 412
  },
  {
    "name": "College of the Canyons",
    "id": 413
  },
  {
    "name": "Montgomery College, Rockville md",
    "id": 414
  },
  {
    "name": "HACC, Central Pennsylvania’s Community College York Campus",
    "id": 415
  },
  {
    "name": "University of Houston-Downtown",
    "id": 416
  },
  {
    "name": "The University of Texas at Austin",
    "id": 417
  },
  {
    "name": "Maryland Institute College of Art, Main Building",
    "id": 418
  },
  {
    "name": "SPC - St. Petersburg/Gibbs Campus",
    "id": 419
  },
  {
    "name": "SDSU",
    "id": 420
  },
  {
    "name": "San Diego Mesa College",
    "id": 421
  },
  {
    "name": "Irvine Valley College",
    "id": 422
  },
  {
    "name": "Mt. San Jacinto College",
    "id": 423
  },
  {
    "name": "Palomar College",
    "id": 424
  },
  {
    "name": "New York University",
    "id": 425
  },
  {
    "name": "Clackamas Community College",
    "id": 426
  },
  {
    "name": "University of Maryland - Baltimore County",
    "id": 427
  },
  {
    "name": "Coastal Bend College",
    "id": 428
  },
  {
    "name": "Tidewater Community College",
    "id": 429
  },
  {
    "name": "Northern Arizona University",
    "id": 430
  },
  {
    "name": "Holyoke Community College",
    "id": 431
  },
  {
    "name": "Bergen Community College",
    "id": 432
  },
  {
    "name": "Lipscomb University",
    "id": 433
  },
  {
    "name": "Trinidad State Junior College",
    "id": 434
  },
  {
    "name": "Millersville University",
    "id": 435
  },
  {
    "name": "Ivy Tech Community College Indianapolis",
    "id": 436
  },
  {
    "name": "University of Vermont",
    "id": 437
  },
  {
    "name": "Edmonds Community College",
    "id": 438
  },
  {
    "name": "Fairleigh Dickinson University",
    "id": 439
  },
  {
    "name": "30118",
    "id": 440
  },
  {
    "name": "Oakton Community College",
    "id": 441
  },
  {
    "name": "Reedley College",
    "id": 442
  },
  {
    "name": "The Florence Elston Inn & The Conference Center at Sweet Briar College",
    "id": 443
  },
  {
    "name": "Eastern Michigan University",
    "id": 444
  },
  {
    "name": "Indiana State University",
    "id": 445
  },
  {
    "name": "Eckerd College",
    "id": 446
  },
  {
    "name": "University at Albany",
    "id": 447
  },
  {
    "name": "Xavier University",
    "id": 448
  },
  {
    "name": "Black Hills State University",
    "id": 449
  },
  {
    "name": "Desert Vista Campus; Pima Community College",
    "id": 450
  },
  {
    "name": "University of Michigan- Dearborn",
    "id": 451
  },
  {
    "name": "University of Wyoming at Casper",
    "id": 452
  },
  {
    "name": "Northern Illinois University",
    "id": 453
  },
  {
    "name": "Tidewater Community College - Norfolk Campus",
    "id": 454
  },
  {
    "name": "Los Angeles Valley College",
    "id": 455
  },
  {
    "name": "Clark University",
    "id": 456
  },
  {
    "name": "Eastern Washington University",
    "id": 457
  },
  {
    "name": "South Florida State College",
    "id": 458
  },
  {
    "name": "Cape Cod Community College Bookstore",
    "id": 459
  },
  {
    "name": "Arkansas Tech University",
    "id": 460
  },
  {
    "name": "Tidewater Community College - Chesapeake Campus",
    "id": 461
  },
  {
    "name": "University of Dallas",
    "id": 462
  },
  {
    "name": "George Washington University",
    "id": 463
  },
  {
    "name": "Arizona State University West Campus",
    "id": 464
  },
  {
    "name": "Marist College",
    "id": 465
  },
  {
    "name": "Western Michigan University",
    "id": 466
  },
  {
    "name": "SUNY Delhi",
    "id": 467
  },
  {
    "name": "Penn State Schuylkill",
    "id": 468
  },
  {
    "name": "Marion Technical College",
    "id": 469
  },
  {
    "name": "Southern Utah University",
    "id": 470
  },
  {
    "name": "Laney College",
    "id": 471
  },
  {
    "name": "Long Beach City College LAC Campus",
    "id": 472
  },
  {
    "name": "Iowa Western Community College",
    "id": 473
  },
  {
    "name": "Hawai'i Pacific University",
    "id": 474
  },
  {
    "name": "University of Wisconsin-Milwaukee",
    "id": 475
  },
  {
    "name": "El Camino College",
    "id": 476
  },
  {
    "name": "University of Illinois at Chicago",
    "id": 477
  },
  {
    "name": "The University of New Orleans",
    "id": 478
  },
  {
    "name": "Kishwaukee College",
    "id": 479
  },
  {
    "name": "Chaminade University",
    "id": 480
  },
  {
    "name": "Hunter College",
    "id": 481
  },
  {
    "name": "Walsh University",
    "id": 482
  },
  {
    "name": "Commerce",
    "id": 483
  },
  {
    "name": "Virginia Polytechnic Institute and State University",
    "id": 484
  },
  {
    "name": "Community College Of Denver Confluence Building",
    "id": 485
  },
  {
    "name": "Coastal Bend College",
    "id": 486
  },
  {
    "name": "SPC - Seminole Campus",
    "id": 487
  },
  {
    "name": "Chabot College",
    "id": 488
  },
  {
    "name": "Jefferson Community College",
    "id": 489
  },
  {
    "name": "Ryder Center for Health and Physical Education at Saginaw Valley State University",
    "id": 490
  },
  {
    "name": "Jefferson Community and Technical College",
    "id": 491
  },
  {
    "name": "Utah State University",
    "id": 492
  },
  {
    "name": "Kellogg Community College",
    "id": 493
  },
  {
    "name": "7458 Prentice St",
    "id": 494
  },
  {
    "name": "Portland Community College Cascade",
    "id": 495
  },
  {
    "name": "Florida State University",
    "id": 496
  },
  {
    "name": "Glendale Community College",
    "id": 497
  },
  {
    "name": "University of Sioux Falls",
    "id": 498
  },
  {
    "name": "Montclair State University",
    "id": 499
  },
  {
    "name": "Western Washington University",
    "id": 500
  },
  {
    "name": "Columbus State University",
    "id": 501
  },
  {
    "name": "Westchester Community College",
    "id": 502
  },
  {
    "name": "Roger Williams University",
    "id": 503
  },
  {
    "name": "Chapman University",
    "id": 504
  },
  {
    "name": "32307 NW Agri Park Rd",
    "id": 505
  },
  {
    "name": "University of Nevada, Las Vegas",
    "id": 506
  },
  {
    "name": "Bellevue University",
    "id": 507
  },
  {
    "name": "23529",
    "id": 508
  },
  {
    "name": "Ferris State University",
    "id": 509
  },
  {
    "name": "Riverside City College",
    "id": 510
  },
  {
    "name": "University of Memphis",
    "id": 511
  },
  {
    "name": "Delta College",
    "id": 512
  },
  {
    "name": "Portland Community College Sylvania",
    "id": 513
  },
  {
    "name": "Norco College",
    "id": 514
  },
  {
    "name": "Los Angeles City College",
    "id": 515
  },
  {
    "name": "Wheeling Jesuit University Inc",
    "id": 516
  },
  {
    "name": "Snead State Community College",
    "id": 517
  },
  {
    "name": "Moreno Valley College",
    "id": 518
  },
  {
    "name": "University of Saint Francis",
    "id": 519
  },
  {
    "name": "QCC",
    "id": 520
  },
  {
    "name": "Fashion Institute of Technology",
    "id": 521
  },
  {
    "name": "Rock Valley College",
    "id": 522
  },
  {
    "name": "Pima Community College - Northwest Campus",
    "id": 523
  },
  {
    "name": "Mt. San Antonio College",
    "id": 524
  },
  {
    "name": "Villanova University",
    "id": 525
  },
  {
    "name": "Leeward Community College",
    "id": 526
  },
  {
    "name": "Pacific University",
    "id": 527
  },
  {
    "name": "Dowling College",
    "id": 528
  },
  {
    "name": "The University of Texas Rio Grande Valley",
    "id": 529
  },
  {
    "name": "Santa Rosa Junior College",
    "id": 530
  },
  {
    "name": "Stephen F Austin State University",
    "id": 531
  },
  {
    "name": "Sonoma State University",
    "id": 532
  },
  {
    "name": "Valparaiso University",
    "id": 533
  },
  {
    "name": "JBJ Sales & Associates",
    "id": 534
  },
  {
    "name": "Santa Monica College District Offices",
    "id": 535
  },
  {
    "name": "Missouri State University-West Plains",
    "id": 536
  },
  {
    "name": "Golden Gate University",
    "id": 537
  },
  {
    "name": "SRJC Petaluma",
    "id": 538
  },
  {
    "name": "Loyola University Chicago",
    "id": 539
  },
  {
    "name": "Florida SouthWestern State College - Collier Campus",
    "id": 540
  },
  {
    "name": "Genesee Community College",
    "id": 541
  },
  {
    "name": "Scottsdale Community College",
    "id": 542
  },
  {
    "name": "New Mexico State University Grants",
    "id": 543
  },
  {
    "name": "Laredo Community College",
    "id": 544
  },
  {
    "name": "Brenau University",
    "id": 545
  },
  {
    "name": "Central Connecticut State University: Admissions Department",
    "id": 546
  },
  {
    "name": "East Stroudsburg University of Pennsylvania",
    "id": 547
  },
  {
    "name": "Pellissippi State Community College",
    "id": 548
  },
  {
    "name": "Florida State College-Jacksonville",
    "id": 549
  },
  {
    "name": "McDaniel College",
    "id": 550
  },
  {
    "name": "Midland College",
    "id": 551
  },
  {
    "name": "Coastline Community College",
    "id": 552
  },
  {
    "name": "Central New Mexico Community College",
    "id": 553
  },
  {
    "name": "Sacramento City College",
    "id": 554
  },
  {
    "name": "Central Oregon Community College",
    "id": 555
  },
  {
    "name": "Grand Valley State University",
    "id": 556
  },
  {
    "name": "Grand Rapids Community College",
    "id": 557
  },
  {
    "name": "Moraine Park Technical College",
    "id": 558
  },
  {
    "name": "Sitting Bull College",
    "id": 559
  },
  {
    "name": "University at Buffalo",
    "id": 560
  },
  {
    "name": "Harold Washington College",
    "id": 561
  },
  {
    "name": "Midwestern State University",
    "id": 562
  },
  {
    "name": "Rose State College",
    "id": 563
  },
  {
    "name": "Campbellsville University",
    "id": 564
  },
  {
    "name": "North Lake College",
    "id": 565
  },
  {
    "name": "Southern Adventist University",
    "id": 566
  },
  {
    "name": "Wilkes Community College",
    "id": 567
  },
  {
    "name": "Paris Junior College",
    "id": 568
  },
  {
    "name": "Delta International University of New Orleans",
    "id": 569
  },
  {
    "name": "Northwestern University",
    "id": 570
  },
  {
    "name": "Hudson Valley Community College",
    "id": 571
  },
  {
    "name": "Suffolk County Community College",
    "id": 572
  },
  {
    "name": "Brigham Young University",
    "id": 573
  },
  {
    "name": "Argosy University, San Diego",
    "id": 574
  },
  {
    "name": "Manchester Community College",
    "id": 575
  },
  {
    "name": "University of Nevada School of Medicine Patient Centered Family Medicine",
    "id": 576
  },
  {
    "name": "Bloomsburg University of Pennsylvania",
    "id": 577
  },
  {
    "name": "Ohlone College",
    "id": 578
  },
  {
    "name": "Holmes Community College",
    "id": 579
  },
  {
    "name": "Kankakee Community College",
    "id": 580
  },
  {
    "name": "Antelope Valley College",
    "id": 581
  },
  {
    "name": "Southwestern Michigan College",
    "id": 582
  },
  {
    "name": "LIU- Brooklyn",
    "id": 583
  },
  {
    "name": "University of Minnesota Duluth",
    "id": 584
  },
  {
    "name": "Chattahoochee Technical College - North Metro Campus",
    "id": 585
  },
  {
    "name": "Los Angeles Mission College",
    "id": 586
  },
  {
    "name": "Kingsborough Community College",
    "id": 587
  },
  {
    "name": "Victor Valley College",
    "id": 588
  },
  {
    "name": "McKendree University",
    "id": 589
  },
  {
    "name": "Richland College",
    "id": 590
  },
  {
    "name": "Tennessee State University",
    "id": 591
  },
  {
    "name": "Community College of Philadelphia",
    "id": 592
  },
  {
    "name": "Big Sandy Community & Technical College-Pikeville Campus",
    "id": 593
  },
  {
    "name": "Central Michigan University",
    "id": 594
  },
  {
    "name": "CNI College",
    "id": 595
  },
  {
    "name": "University of South Carolina",
    "id": 596
  },
  {
    "name": "Lakeland Community College",
    "id": 597
  },
  {
    "name": "Lone Star College-Tomball",
    "id": 598
  },
  {
    "name": "Cleveland Community College",
    "id": 599
  },
  {
    "name": "University of Wisconsin-Oshkosh",
    "id": 600
  },
  {
    "name": "Eastern Florida State College - Melbourne Campus",
    "id": 601
  },
  {
    "name": "Camden County College",
    "id": 602
  },
  {
    "name": "Erie CC - City Campus",
    "id": 603
  },
  {
    "name": "Elizabethtown Community and Technical College",
    "id": 604
  },
  {
    "name": "Clark College",
    "id": 605
  },
  {
    "name": "Wayland Baptist University",
    "id": 606
  },
  {
    "name": "Allan Hancock College",
    "id": 607
  },
  {
    "name": "Central Washington University",
    "id": 608
  },
  {
    "name": "William Carey University on the Coast",
    "id": 609
  },
  {
    "name": "Napa Valley College",
    "id": 610
  },
  {
    "name": "Holmes Community College",
    "id": 611
  },
  {
    "name": "Odessa College",
    "id": 612
  },
  {
    "name": "Delaware State University",
    "id": 613
  },
  {
    "name": "Niagara College Canada, Welland Campus",
    "id": 614
  },
  {
    "name": "Portland State University",
    "id": 615
  },
  {
    "name": "American Business Institute",
    "id": 616
  },
  {
    "name": "Austin Peay State University",
    "id": 617
  },
  {
    "name": "Eastern Nazarene College",
    "id": 618
  },
  {
    "name": "Jackson College",
    "id": 619
  },
  {
    "name": "Wilmington University",
    "id": 620
  },
  {
    "name": "Notre Dame College",
    "id": 621
  },
  {
    "name": "Tarrant County College - Northwest Campus",
    "id": 622
  },
  {
    "name": "York Technical College",
    "id": 623
  },
  {
    "name": "Southern Oregon University",
    "id": 624
  },
  {
    "name": "De Anza Community College",
    "id": 625
  },
  {
    "name": "Osceola Campus - Valencia College",
    "id": 626
  },
  {
    "name": "Delgado Community College",
    "id": 627
  },
  {
    "name": "Santa Fe Community College",
    "id": 628
  },
  {
    "name": "Rutgers–New Brunswick",
    "id": 629
  },
  {
    "name": "Fiterman Hall",
    "id": 630
  },
  {
    "name": "Bluegrass Community & Technical College - Danville Campus",
    "id": 631
  },
  {
    "name": "NWTC Sturgeon Bay",
    "id": 632
  },
  {
    "name": "Stark State College",
    "id": 633
  },
  {
    "name": "The University of Texas at El Paso",
    "id": 634
  },
  {
    "name": "Vera Whole Health",
    "id": 635
  },
  {
    "name": "Lone Star College - University Park",
    "id": 636
  },
  {
    "name": "Palm Beach State College: Palm Beach Gardens Campus",
    "id": 637
  },
  {
    "name": "Central Texas College",
    "id": 638
  },
  {
    "name": "University of Kansas School of Medicine",
    "id": 639
  },
  {
    "name": "Windward Community College",
    "id": 640
  },
  {
    "name": "Anne Arundel Community College",
    "id": 641
  },
  {
    "name": "Chaffey College",
    "id": 642
  },
  {
    "name": "Porterville College",
    "id": 643
  },
  {
    "name": "Lamar University",
    "id": 644
  },
  {
    "name": "John Carroll University",
    "id": 645
  },
  {
    "name": "Oregon State University",
    "id": 646
  },
  {
    "name": "SPC - Downtown Center",
    "id": 647
  },
  {
    "name": "Mountwest Community & Technical College",
    "id": 648
  },
  {
    "name": "James Madison University",
    "id": 649
  },
  {
    "name": "South Plains College",
    "id": 650
  },
  {
    "name": "Green River College",
    "id": 651
  },
  {
    "name": "Anoka-Ramsey Community College, Coon Rapids Campus",
    "id": 652
  },
  {
    "name": "Galveston College",
    "id": 653
  },
  {
    "name": "University of Cincinnati College of Nursing",
    "id": 654
  },
  {
    "name": "Tarrant County College District Office",
    "id": 655
  },
  {
    "name": "Seminole State College - Sanford/Lake Mary Campus",
    "id": 656
  },
  {
    "name": "California University of Pennsylvania",
    "id": 657
  },
  {
    "name": "Towson University",
    "id": 658
  },
  {
    "name": "Finger Lakes Community College",
    "id": 659
  },
  {
    "name": "Monmouth University",
    "id": 660
  },
  {
    "name": "Quinsigamond Community College",
    "id": 661
  },
  {
    "name": "University of California Irvine",
    "id": 662
  },
  {
    "name": "Mohawk Valley Community College - Utica",
    "id": 663
  },
  {
    "name": "Ivy Tech Community College Indianapolis",
    "id": 664
  },
  {
    "name": "Radford University",
    "id": 665
  },
  {
    "name": "78224",
    "id": 667
  },
  {
    "name": "College of Lake County",
    "id": 668
  },
  {
    "name": "Paradise Valley Community College",
    "id": 669
  },
  {
    "name": "Loyola University Water Tower Campus",
    "id": 670
  },
  {
    "name": "Preston Ridge Campus of Collin College",
    "id": 671
  },
  {
    "name": "Miami University",
    "id": 672
  },
  {
    "name": "California State University San Marcos",
    "id": 673
  },
  {
    "name": "University of Wisconsin - Waukesha",
    "id": 674
  },
  {
    "name": "University of Connecticut",
    "id": 675
  },
  {
    "name": "Northeast Wisconsin Technical College",
    "id": 676
  },
  {
    "name": "California State University, Northridge",
    "id": 677
  },
  {
    "name": "California State University, Sacramento",
    "id": 678
  },
  {
    "name": "State University of New York at New Paltz",
    "id": 679
  },
  {
    "name": "Slippery Rock University",
    "id": 680
  },
  {
    "name": "University of Louisiana Monroe",
    "id": 681
  },
  {
    "name": "Florida Atlantic University - Davie Campus",
    "id": 682
  },
  {
    "name": "University of New Hampshire",
    "id": 683
  },
  {
    "name": "University of Tennessee Martin",
    "id": 684
  },
  {
    "name": "Navarro College",
    "id": 685
  },
  {
    "name": "Western Iowa Tech Community College",
    "id": 686
  },
  {
    "name": "University of Montana",
    "id": 687
  },
  {
    "name": "48824",
    "id": 688
  },
  {
    "name": "Gateway Community College",
    "id": 689
  },
  {
    "name": "Henry Ford College",
    "id": 690
  },
  {
    "name": "University of Rhode Island",
    "id": 691
  },
  {
    "name": "Saint Joseph's University",
    "id": 692
  },
  {
    "name": "Wright State University",
    "id": 693
  },
  {
    "name": "Morningside College",
    "id": 694
  },
  {
    "name": "Cleveland State Community College",
    "id": 695
  },
  {
    "name": "Frostburg State University",
    "id": 696
  },
  {
    "name": "South Mountain Community College",
    "id": 697
  },
  {
    "name": "Southern University Shreveport",
    "id": 698
  },
  {
    "name": "St John's University Queens Campus",
    "id": 699
  },
  {
    "name": "Texas Tech University",
    "id": 700
  },
  {
    "name": "Westfield State University",
    "id": 701
  },
  {
    "name": "Otero Junior College",
    "id": 702
  },
  {
    "name": "University of Rio Grande",
    "id": 703
  },
  {
    "name": "Palm Beach State College Bookstore - South Campus",
    "id": 704
  },
  {
    "name": "Hartnell College",
    "id": 705
  },
  {
    "name": "Spokane Falls Community College",
    "id": 706
  },
  {
    "name": "Austin Community College: Northridge Campus",
    "id": 707
  },
  {
    "name": "Middle Tennessee State University",
    "id": 708
  },
  {
    "name": "U C Clermont College",
    "id": 709
  },
  {
    "name": "Flathead Valley Community College",
    "id": 710
  },
  {
    "name": "Westmoreland County Community College",
    "id": 711
  },
  {
    "name": "University of Illinois Facilities & Services",
    "id": 712
  },
  {
    "name": "Tarleton State University",
    "id": 713
  },
  {
    "name": "Salem State University",
    "id": 714
  },
  {
    "name": "Oakland Community College - Auburn Hills Campus",
    "id": 715
  },
  {
    "name": "University of Indianapolis",
    "id": 716
  },
  {
    "name": "Alverno College",
    "id": 717
  },
  {
    "name": "The University of Texas at Tyler",
    "id": 718
  },
  {
    "name": "University of San Diego",
    "id": 719
  },
  {
    "name": "Reading Area Community College",
    "id": 720
  },
  {
    "name": "Prince George's Community College",
    "id": 721
  },
  {
    "name": "Cal Poly Pomona",
    "id": 722
  },
  {
    "name": "Montana State University Billings",
    "id": 723
  },
  {
    "name": "Evans Library and Learning Commons, Fulton-Montgomery Community College",
    "id": 724
  },
  {
    "name": "HACC Lancaster Campus",
    "id": 725
  },
  {
    "name": "University of Colorado Colorado Springs",
    "id": 726
  },
  {
    "name": "Angelina College",
    "id": 727
  },
  {
    "name": "Vanderbilt University Office of Undergraduate Admissions",
    "id": 728
  },
  {
    "name": "SUNY Plattsburgh: Nursing Program",
    "id": 729
  },
  {
    "name": "William Paterson University",
    "id": 730
  },
  {
    "name": "FIU Biscayne Bay Campus",
    "id": 731
  },
  {
    "name": "Collin College - Spring Creek Campus",
    "id": 732
  },
  {
    "name": "University of Arkansas Community College at Morrilton",
    "id": 733
  },
  {
    "name": "Lock Haven University",
    "id": 734
  },
  {
    "name": "Lake-Sumter State College - South Lake Campus",
    "id": 735
  },
  {
    "name": "Malcolm X College",
    "id": 736
  },
  {
    "name": "PCCC",
    "id": 737
  },
  {
    "name": "Western Technical College",
    "id": 738
  },
  {
    "name": "Bridgewater State University",
    "id": 739
  },
  {
    "name": "Frederick Community College",
    "id": 740
  },
  {
    "name": "Colorado Community College System",
    "id": 741
  },
  {
    "name": "Massasoit Community College",
    "id": 742
  },
  {
    "name": "Western Illinois University",
    "id": 743
  },
  {
    "name": "Southern Connecticut State University",
    "id": 744
  },
  {
    "name": "Youngstown State University",
    "id": 745
  },
  {
    "name": "Saddleback College",
    "id": 746
  },
  {
    "name": "Oakland Community College - District Office",
    "id": 747
  },
  {
    "name": "Wharton County Junior College",
    "id": 748
  },
  {
    "name": "Emporia State University",
    "id": 749
  },
  {
    "name": "University of Wisconsin-Fox Valley",
    "id": 750
  },
  {
    "name": "Austin Community College: Riverside Campus",
    "id": 751
  },
  {
    "name": "California State University San Bernardino",
    "id": 752
  },
  {
    "name": "E. H. Butler Library",
    "id": 753
  },
  {
    "name": "St. Joseph's College",
    "id": 754
  },
  {
    "name": "Walters State Community College",
    "id": 755
  },
  {
    "name": "Delaware Technical Community College - Orlando J. George Jr. Campus - Wilmington",
    "id": 756
  },
  {
    "name": "Wharton County Junior College",
    "id": 758
  },
  {
    "name": "Oakland University",
    "id": 759
  },
  {
    "name": "University of Vermont",
    "id": 760
  },
  {
    "name": "Chicago State University",
    "id": 761
  },
  {
    "name": "University of Arkansas Pine Bluff",
    "id": 762
  },
  {
    "name": "Mahanaim",
    "id": 763
  },
  {
    "name": "Fullerton College",
    "id": 764
  },
  {
    "name": "The University of Tampa",
    "id": 765
  },
  {
    "name": "Pikes Peak Community College",
    "id": 766
  },
  {
    "name": "John Jay College of Criminal Justice",
    "id": 767
  },
  {
    "name": "HAZARD COMMUNITY AND TECHNICAL COLLEGE",
    "id": 768
  },
  {
    "name": "Cabrillo College SAC east - Student Activities Center",
    "id": 769
  },
  {
    "name": "College of Southern Nevada",
    "id": 770
  },
  {
    "name": "Northern Virginia Community College - Medical Education Campus",
    "id": 771
  },
  {
    "name": "Kentucky State University",
    "id": 772
  },
  {
    "name": "Luzerne County Community College",
    "id": 773
  },
  {
    "name": "Southern New Hampshire University - Online and Continuing Education",
    "id": 774
  },
  {
    "name": "Yakima Valley Community College",
    "id": 775
  },
  {
    "name": "Virginia Commonwealth University",
    "id": 776
  },
  {
    "name": "Trinity Valley Community College",
    "id": 777
  },
  {
    "name": "Northern Virginia Community College - Woodbridge Campus",
    "id": 778
  },
  {
    "name": "Grand Canyon University",
    "id": 779
  },
  {
    "name": "Guilford Technical Community College",
    "id": 780
  },
  {
    "name": "Trinity Washington University",
    "id": 781
  },
  {
    "name": "Cleveland State University",
    "id": 782
  },
  {
    "name": "Palm Beach State College",
    "id": 783
  },
  {
    "name": "Tarrant County College - Northeast Campus",
    "id": 784
  },
  {
    "name": "Ivy Tech Community College",
    "id": 785
  },
  {
    "name": "Mercer County Community College",
    "id": 786
  },
  {
    "name": "Franklin University",
    "id": 787
  },
  {
    "name": "Grossmont College",
    "id": 788
  },
  {
    "name": "Marion Military Institute",
    "id": 789
  },
  {
    "name": "University of Wisconsin-Green Bay",
    "id": 790
  },
  {
    "name": "Campbell University",
    "id": 791
  },
  {
    "name": "Miami Dade College - North Campus",
    "id": 792
  },
  {
    "name": "Austin Community College Hays Campus",
    "id": 793
  },
  {
    "name": "University of Pittsburgh",
    "id": 794
  },
  {
    "name": "Tunxis Community College",
    "id": 795
  },
  {
    "name": "Capstone College of Nursing",
    "id": 796
  },
  {
    "name": "Ivy Tech Community College - Johnson Hall",
    "id": 797
  },
  {
    "name": "Coleman University",
    "id": 798
  },
  {
    "name": "Delgado Community College",
    "id": 799
  },
  {
    "name": "Raritan Valley Community College",
    "id": 800
  },
  {
    "name": "Eye Exam Group",
    "id": 801
  },
  {
    "name": "Southeast Community College",
    "id": 802
  },
  {
    "name": "Rutgers University - Newark Campus",
    "id": 803
  },
  {
    "name": "Folsom Lake College - El Dorado Center",
    "id": 804
  },
  {
    "name": "California State University, East Bay",
    "id": 805
  },
  {
    "name": "Asheville-Buncombe Technical Community College",
    "id": 806
  },
  {
    "name": "Nicholls State University",
    "id": 807
  },
  {
    "name": "University of Wisconsin-Sheboygan",
    "id": 808
  },
  {
    "name": "Wesley College",
    "id": 809
  },
  {
    "name": "Christopher Newport University",
    "id": 810
  },
  {
    "name": "University of Nevada, Reno",
    "id": 811
  },
  {
    "name": "Northeast State Community College",
    "id": 812
  },
  {
    "name": "University of Saint Francis",
    "id": 813
  },
  {
    "name": "Nashville State Community College",
    "id": 814
  },
  {
    "name": "Fort Lewis College",
    "id": 815
  },
  {
    "name": "Wilbur Wright College",
    "id": 816
  },
  {
    "name": "Texas State Technical College",
    "id": 817
  },
  {
    "name": "North Broward Technical Center",
    "id": 818
  },
  {
    "name": "Bradley Tech High School",
    "id": 819
  },
  {
    "name": "Blinn College",
    "id": 820
  },
  {
    "name": "Carl Albert State College",
    "id": 821
  },
  {
    "name": "Wallace State Community College",
    "id": 822
  },
  {
    "name": "Oklahoma Christian University",
    "id": 823
  },
  {
    "name": "Southeast Community College",
    "id": 824
  },
  {
    "name": "Gordon State College",
    "id": 825
  },
  {
    "name": "Mesa Community College - Red Mountain - Library",
    "id": 826
  },
  {
    "name": "Erie Community College",
    "id": 827
  },
  {
    "name": "Fordham University - Rose Hill Campus Bookstore",
    "id": 828
  },
  {
    "name": "Miami Dade College - Kendall Campus",
    "id": 829
  },
  {
    "name": "Wilbur Wright College",
    "id": 831
  },
  {
    "name": "11201",
    "id": 832
  },
  {
    "name": "Admiral Peary Area Vocational Technical School",
    "id": 833
  },
  {
    "name": "Pierce College",
    "id": 834
  },
  {
    "name": "Cosumnes River College",
    "id": 835
  },
  {
    "name": "Spalding University",
    "id": 836
  },
  {
    "name": "Richard J. Daley College",
    "id": 838
  },
  {
    "name": "University of Illinois College of Medicine at Peoria",
    "id": 839
  },
  {
    "name": "William Penn University",
    "id": 840
  },
  {
    "name": "Fairfield University",
    "id": 841
  },
  {
    "name": "Middle Georgia State University - Macon Campus - Main Campus",
    "id": 842
  },
  {
    "name": "Bryman College",
    "id": 843
  },
  {
    "name": "Miami Dade College-West Campus",
    "id": 844
  },
  {
    "name": "Dine College",
    "id": 845
  },
  {
    "name": "University of Memphis",
    "id": 846
  },
  {
    "name": "Washington Adventist University",
    "id": 847
  },
  {
    "name": "Naugatuck Valley Community College",
    "id": 848
  },
  {
    "name": "Volunteer State Community College",
    "id": 849
  },
  {
    "name": "Dalton State College",
    "id": 850
  },
  {
    "name": "Central Florida Reception Center",
    "id": 851
  },
  {
    "name": "University of Alaska Fairbanks",
    "id": 852
  },
  {
    "name": "Black Hawk College Industrial Training Lab Extension Center",
    "id": 853
  },
  {
    "name": "LaGuardia Community College, Long Island City",
    "id": 854
  },
  {
    "name": "Midland University",
    "id": 855
  },
  {
    "name": "University of North Texas - Dallas",
    "id": 856
  },
  {
    "name": "Ramapo College of New Jersey",
    "id": 857
  },
  {
    "name": "The Ohio State University at Lima",
    "id": 858
  },
  {
    "name": "University of Hawai‘i - West O‘ahu",
    "id": 859
  },
  {
    "name": "Lorain County Community College",
    "id": 860
  },
  {
    "name": "Treasure Valley Community College",
    "id": 861
  },
  {
    "name": "Metropolitan Community College - Express",
    "id": 862
  },
  {
    "name": "Metropolitan Community College",
    "id": 863
  },
  {
    "name": "Northeastern University",
    "id": 864
  },
  {
    "name": "Health Science Campus",
    "id": 865
  },
  {
    "name": "College of Business",
    "id": 866
  },
  {
    "name": "Navarro College Waxahachie Building B",
    "id": 867
  },
  {
    "name": "Tarrant County College - Southeast Campus",
    "id": 868
  },
  {
    "name": "Oklahoma City Community College",
    "id": 869
  },
  {
    "name": "Valley City State University",
    "id": 870
  },
  {
    "name": "Chattahoochee Technical College Bookstore",
    "id": 871
  },
  {
    "name": "Navarro College at Midlothian",
    "id": 872
  },
  {
    "name": "South Dakota School of Mines & Technology",
    "id": 873
  },
  {
    "name": "Davis Avenue",
    "id": 874
  },
  {
    "name": "College of Southern Idaho",
    "id": 875
  },
  {
    "name": "Community College of Vermont (CCV) - Winooski",
    "id": 876
  },
  {
    "name": "Highland Community College",
    "id": 877
  },
  {
    "name": "Jamestown Community College: Cattaraugus County Campus",
    "id": 878
  },
  {
    "name": "Mount Mercy University",
    "id": 879
  },
  {
    "name": "Miami Dade College - Homestead Campus",
    "id": 880
  },
  {
    "name": "Salisbury University",
    "id": 881
  },
  {
    "name": "Tarrant County College - Trinity River Campus",
    "id": 882
  },
  {
    "name": "Contra Costa College",
    "id": 883
  },
  {
    "name": "Erie Community College South Campus",
    "id": 884
  },
  {
    "name": "State University College at Brockport",
    "id": 885
  },
  {
    "name": "Widener University",
    "id": 886
  },
  {
    "name": "University of Wyoming",
    "id": 887
  },
  {
    "name": "Western Wyoming Community College",
    "id": 888
  },
  {
    "name": "Columbus State Community College",
    "id": 889
  },
  {
    "name": "Hagerstown Community College",
    "id": 890
  },
  {
    "name": "McLennan Community College",
    "id": 891
  },
  {
    "name": "Mount Saint Mary College",
    "id": 892
  },
  {
    "name": "Quinnipiac University",
    "id": 893
  },
  {
    "name": "Mott Community College",
    "id": 894
  },
  {
    "name": "Azusa Pacific University",
    "id": 895
  },
  {
    "name": "North Greenville University",
    "id": 896
  },
  {
    "name": "Pima Community College East Campus",
    "id": 897
  },
  {
    "name": "Suffolk County Community College Grant Campus",
    "id": 898
  },
  {
    "name": "Orangeburg-Calhoun Technical College",
    "id": 899
  },
  {
    "name": "Temple University",
    "id": 900
  },
  {
    "name": "Louisiana State University Alexandria",
    "id": 901
  },
  {
    "name": "College of Southern Maryland",
    "id": 902
  },
  {
    "name": "CCC Group Inc",
    "id": 903
  },
  {
    "name": "Murray State University",
    "id": 904
  },
  {
    "name": "Stony Brook University",
    "id": 905
  },
  {
    "name": "Madison Area Technical College",
    "id": 906
  },
  {
    "name": "Mountain View College",
    "id": 907
  },
  {
    "name": "Eastern Connecticut State University",
    "id": 908
  },
  {
    "name": "Cuyahoga Community College Western Campus",
    "id": 909
  },
  {
    "name": "Barnard College, Columbia University",
    "id": 910
  },
  {
    "name": "Waubonsee Community College - Aurora Fox Valley Campus",
    "id": 911
  },
  {
    "name": "The Savannah College of Art and Design",
    "id": 912
  },
  {
    "name": "Valencia College East Campus",
    "id": 913
  },
  {
    "name": "Bethune Cookman University",
    "id": 914
  },
  {
    "name": "Uh Center W Hawaii",
    "id": 915
  },
  {
    "name": "Mississippi Delta Community College",
    "id": 916
  },
  {
    "name": "University of Denver",
    "id": 917
  },
  {
    "name": "Honolulu Community College",
    "id": 918
  },
  {
    "name": "GateWay Community College",
    "id": 919
  },
  {
    "name": "St. Charles Community College",
    "id": 921
  },
  {
    "name": "University of Mississippi Medical Center",
    "id": 922
  },
  {
    "name": "Olive-Harvey College",
    "id": 923
  },
  {
    "name": "Metropolitan Community College",
    "id": 924
  },
  {
    "name": "Rowan College at Gloucester County",
    "id": 925
  },
  {
    "name": "SUNY Oswego",
    "id": 926
  },
  {
    "name": "Robert Morris University",
    "id": 927
  },
  {
    "name": "78412",
    "id": 928
  },
  {
    "name": "University of Wisconsin-Madison",
    "id": 929
  },
  {
    "name": "Cuyahoga Community College- Eastern Campus (Tri-C East)",
    "id": 930
  },
  {
    "name": "Albright College",
    "id": 931
  },
  {
    "name": "Rutgers Robert Wood Johnson Medical School",
    "id": 932
  },
  {
    "name": "Harvard University",
    "id": 933
  },
  {
    "name": "Cazenovia College",
    "id": 934
  },
  {
    "name": "Onondaga Community College",
    "id": 935
  },
  {
    "name": "Dominican University of California",
    "id": 936
  },
  {
    "name": "Metropolitan Community College - Express",
    "id": 937
  },
  {
    "name": "The University of Oklahoma",
    "id": 938
  },
  {
    "name": "Syracuse University - Peck Hall",
    "id": 939
  },
  {
    "name": "Jacksonville College",
    "id": 940
  },
  {
    "name": "Harrisburg Area Community College",
    "id": 941
  },
  {
    "name": "Castleton University",
    "id": 942
  },
  {
    "name": "Southeast Community College",
    "id": 943
  },
  {
    "name": "Washington State Dormitory",
    "id": 944
  },
  {
    "name": "Spartanburg Community College",
    "id": 945
  },
  {
    "name": "Jackson State Community College",
    "id": 946
  },
  {
    "name": "Arapahoe Community College",
    "id": 947
  },
  {
    "name": "Brunswick Community College",
    "id": 948
  },
  {
    "name": "Rutgers University Busch Student Center",
    "id": 949
  },
  {
    "name": "St. Lawrence University",
    "id": 950
  },
  {
    "name": "Daytona State College",
    "id": 951
  },
  {
    "name": "Bellevue College",
    "id": 952
  },
  {
    "name": "Simpson University",
    "id": 953
  },
  {
    "name": "Miami Dade College - Virtual College",
    "id": 954
  },
  {
    "name": "Mt Hood Community College",
    "id": 955
  },
  {
    "name": "Florida State College at Jacksonville Downtown Campus",
    "id": 956
  },
  {
    "name": "New York Career Institute",
    "id": 957
  },
  {
    "name": "Flanagan Campus - Community College of Rhode Island (CCRI)",
    "id": 958
  },
  {
    "name": "Southcentral Kentucky Community and Technical College",
    "id": 959
  },
  {
    "name": "University of Central Arkansas",
    "id": 960
  },
  {
    "name": "Lakeshore Technical College",
    "id": 961
  },
  {
    "name": "Wingate University",
    "id": 962
  },
  {
    "name": "Argosy University, Northern Virginia",
    "id": 963
  },
  {
    "name": "Eastern Florida State College - Palm Bay Campus",
    "id": 964
  },
  {
    "name": "Endicott College",
    "id": 965
  },
  {
    "name": "Community College of Beaver County",
    "id": 966
  },
  {
    "name": "John Tyler Community College - Midlothian Campus",
    "id": 967
  },
  {
    "name": "83209",
    "id": 968
  },
  {
    "name": "Brookdale Community College",
    "id": 969
  },
  {
    "name": "77553",
    "id": 970
  },
  {
    "name": "University of Minnesota",
    "id": 971
  },
  {
    "name": "Great Falls College Montana State University",
    "id": 972
  },
  {
    "name": "Davidson County Community College",
    "id": 973
  },
  {
    "name": "Calhoun Community College",
    "id": 974
  },
  {
    "name": "Kent State University Trumbull",
    "id": 975
  },
  {
    "name": "University of Puget Sound",
    "id": 976
  },
  {
    "name": "Waukesha County Technical College",
    "id": 977
  },
  {
    "name": "Lewis-Clark State College",
    "id": 978
  },
  {
    "name": "University of Arkansas at Little Rock",
    "id": 979
  },
  {
    "name": "Concordia University Chicago",
    "id": 980
  },
  {
    "name": "Boston University",
    "id": 981
  },
  {
    "name": "East Tennessee State University",
    "id": 982
  },
  {
    "name": "Alderson Broaddus University",
    "id": 983
  },
  {
    "name": "Valencia College, Lake Nona Campus",
    "id": 984
  },
  {
    "name": "Montgomery College Germantown Campus",
    "id": 985
  },
  {
    "name": "Rhode Island College",
    "id": 986
  },
  {
    "name": "Bristol Community College",
    "id": 987
  },
  {
    "name": "American University",
    "id": 988
  },
  {
    "name": "Columbia Basin College",
    "id": 989
  },
  {
    "name": "College of Nursing, University of South Alabama",
    "id": 990
  },
  {
    "name": "Black Hawk College East Campus",
    "id": 991
  },
  {
    "name": "Anoka-Ramsey Community College, Cambridge Campus",
    "id": 992
  },
  {
    "name": "Francis Marion University",
    "id": 993
  },
  {
    "name": "Penn State Harrisburg",
    "id": 994
  },
  {
    "name": "CSU-Pueblo Tower",
    "id": 995
  },
  {
    "name": "Kingsville",
    "id": 996
  },
  {
    "name": "Manhattanville College",
    "id": 997
  },
  {
    "name": "Front Range Community College - Larimer Campus",
    "id": 998
  },
  {
    "name": "Mount Mary University",
    "id": 999
  },
  {
    "name": "Meredith College",
    "id": 1000
  },
  {
    "name": "Morgan State University- Cummings Student Dormitory",
    "id": 1001
  },
  {
    "name": "Jackson State University",
    "id": 1002
  },
  {
    "name": "Hiram College",
    "id": 1003
  },
  {
    "name": "Owensboro Community & Technical College",
    "id": 1004
  },
  {
    "name": "Mendocino College",
    "id": 1005
  },
  {
    "name": "ASUMH Technical Center",
    "id": 1006
  },
  {
    "name": "The Dental College of Georgia at Augusta University",
    "id": 1007
  },
  {
    "name": "Baton Rouge Community College",
    "id": 1008
  },
  {
    "name": "UC Blue Ash College",
    "id": 1009
  },
  {
    "name": "Inver Hills Community College",
    "id": 1010
  },
  {
    "name": "Iona College",
    "id": 1011
  },
  {
    "name": "Cal State LA",
    "id": 1012
  },
  {
    "name": "Juniata College",
    "id": 1013
  },
  {
    "name": "Northeastern Technical College",
    "id": 1014
  },
  {
    "name": "Blue Ridge Community College",
    "id": 1015
  },
  {
    "name": "Vanier College",
    "id": 1016
  },
  {
    "name": "North Hennepin Community College",
    "id": 1017
  },
  {
    "name": "Centre College",
    "id": 1018
  },
  {
    "name": "Regent University",
    "id": 1019
  },
  {
    "name": "Union College",
    "id": 1020
  },
  {
    "name": "Indiana University - Purdue University Indianapolis",
    "id": 1021
  },
  {
    "name": "University of California, Davis",
    "id": 1022
  },
  {
    "name": "The Orion Institute, formerly known as Healing Arts Institute",
    "id": 1023
  },
  {
    "name": "Indiana University Kokomo",
    "id": 1024
  },
  {
    "name": "Ohio University Southern",
    "id": 1025
  },
  {
    "name": "College of the Redwoods",
    "id": 1026
  },
  {
    "name": "Carroll Community College",
    "id": 1027
  },
  {
    "name": "Clover Park Technical College",
    "id": 1028
  },
  {
    "name": "Mission College",
    "id": 1029
  },
  {
    "name": "DePaul University - Loop Campus",
    "id": 1030
  },
  {
    "name": "Excelsior College",
    "id": 1031
  },
  {
    "name": "St. Norbert College",
    "id": 1032
  },
  {
    "name": "Los Angeles Trade Technical College",
    "id": 1033
  },
  {
    "name": "Spokane Community College",
    "id": 1034
  },
  {
    "name": "Tacoma Community College",
    "id": 1035
  },
  {
    "name": "North Central College",
    "id": 1036
  },
  {
    "name": "Somerset Community College",
    "id": 1037
  },
  {
    "name": "Lower Columbia College",
    "id": 1038
  },
  {
    "name": "Howard Community College",
    "id": 1039
  },
  {
    "name": "Citrus College",
    "id": 1040
  },
  {
    "name": "University of Notre Dame",
    "id": 1041
  },
  {
    "name": "Cuyamaca College",
    "id": 1042
  },
  {
    "name": "Big Bend Community College",
    "id": 1043
  },
  {
    "name": "Wilkes University Admissions",
    "id": 1044
  },
  {
    "name": "Drexel University",
    "id": 1045
  },
  {
    "name": "Foothill Lane",
    "id": 1046
  },
  {
    "name": "SUNY Oneonta",
    "id": 1047
  },
  {
    "name": "State College of Florida",
    "id": 1048
  },
  {
    "name": "Austin Community College: Pinnacle Campus",
    "id": 1049
  },
  {
    "name": "Duquesne University",
    "id": 1050
  },
  {
    "name": "Bluegrass Community & Technical College - Cooper Campus",
    "id": 1051
  },
  {
    "name": "Roane State Community College",
    "id": 1052
  },
  {
    "name": "Montcalm Community College",
    "id": 1053
  },
  {
    "name": "College of Coastal Georgia",
    "id": 1054
  },
  {
    "name": "Estrella Mountain Community College",
    "id": 1055
  },
  {
    "name": "Otterbein University",
    "id": 1056
  },
  {
    "name": "Ivy Tech Community College Bloomington",
    "id": 1057
  },
  {
    "name": "Cypress College",
    "id": 1058
  },
  {
    "name": "Folsom Lake College",
    "id": 1059
  },
  {
    "name": "Indian River State College",
    "id": 1060
  },
  {
    "name": "Centralia College",
    "id": 1061
  },
  {
    "name": "Pace University",
    "id": 1062
  },
  {
    "name": "Schenectady County Community College",
    "id": 1063
  },
  {
    "name": "Madonna University",
    "id": 1064
  },
  {
    "name": "Ashland University Center-Elyria",
    "id": 1065
  },
  {
    "name": "Sauk Valley Community College",
    "id": 1066
  },
  {
    "name": "Ivy Tech Community College",
    "id": 1067
  },
  {
    "name": "Monroe Community College",
    "id": 1068
  },
  {
    "name": "Iowa Lakes Community college",
    "id": 1069
  },
  {
    "name": "Olney Central College",
    "id": 1071
  },
  {
    "name": "Hillsborough Community College - Ybor City Campus",
    "id": 1072
  },
  {
    "name": "Piedmont Virginia Community College",
    "id": 1073
  },
  {
    "name": "Wayne Community College",
    "id": 1074
  },
  {
    "name": "Harford Community College",
    "id": 1075
  },
  {
    "name": "Hinds Community College",
    "id": 1076
  },
  {
    "name": "Drury University",
    "id": 1077
  },
  {
    "name": "Solano Community College",
    "id": 1078
  },
  {
    "name": "Arkansas State University Beebe",
    "id": 1079
  },
  {
    "name": "Super 8 Ankeny/Des Moines Area",
    "id": 1080
  },
  {
    "name": "Our Lady of the Lake University",
    "id": 1081
  },
  {
    "name": "East Arkansas Community College",
    "id": 1082
  },
  {
    "name": "University of Phoenix - West Florida Campus",
    "id": 1083
  },
  {
    "name": "Carroll College",
    "id": 1084
  },
  {
    "name": "Prairie State College",
    "id": 1085
  },
  {
    "name": "West Virginia State University",
    "id": 1086
  },
  {
    "name": "Bemidji State University",
    "id": 1087
  },
  {
    "name": "Lake Region State College",
    "id": 1088
  },
  {
    "name": "University of South Florida",
    "id": 1089
  },
  {
    "name": "Robeson Community College",
    "id": 1090
  },
  {
    "name": "Ottawa University",
    "id": 1091
  },
  {
    "name": "Ivy Tech Community College Madison Campus Library",
    "id": 1092
  },
  {
    "name": "Georgia Gwinnett College",
    "id": 1093
  },
  {
    "name": "Simon Fraser University",
    "id": 1094
  },
  {
    "name": "Jamestown Community College",
    "id": 1095
  },
  {
    "name": "Kennesaw State University Marietta Campus",
    "id": 1096
  },
  {
    "name": "University of California, Berkeley",
    "id": 1097
  },
  {
    "name": "Friends University",
    "id": 1098
  },
  {
    "name": "Forsyth Technical Community College",
    "id": 1099
  },
  {
    "name": "University of Kansas Edwards Campus",
    "id": 1100
  },
  {
    "name": "Southwestern Oklahoma State University Bookstore",
    "id": 1101
  },
  {
    "name": "Penn State Brandywine",
    "id": 1102
  },
  {
    "name": "Southwestern Adventist University",
    "id": 1103
  },
  {
    "name": "George Mason University",
    "id": 1104
  },
  {
    "name": "Rhodes State College",
    "id": 1105
  },
  {
    "name": "Southern State Community College - North Campus",
    "id": 1106
  },
  {
    "name": "Northshore Technical Community College - Connect to Success Mandeville",
    "id": 1107
  },
  {
    "name": "College of San Mateo Campus",
    "id": 1108
  },
  {
    "name": "Alfred University",
    "id": 1109
  },
  {
    "name": "North Carolina State University",
    "id": 1110
  },
  {
    "name": "University of California, Merced",
    "id": 1111
  },
  {
    "name": "Mount Aloysius College",
    "id": 1112
  },
  {
    "name": "University of Idaho",
    "id": 1113
  },
  {
    "name": "St. Johns River State College-Orange Park Campus",
    "id": 1114
  },
  {
    "name": "Loyola University New Orleans",
    "id": 1115
  },
  {
    "name": "Truett McConnell University",
    "id": 1116
  },
  {
    "name": "Seton Hill University",
    "id": 1117
  },
  {
    "name": "Holy Cross College",
    "id": 1118
  },
  {
    "name": "West Liberty University",
    "id": 1119
  },
  {
    "name": "DMACC West Campus Bookstore",
    "id": 1120
  },
  {
    "name": "The University of Alabama in Huntsville",
    "id": 1121
  },
  {
    "name": "Florida Southern College",
    "id": 1122
  },
  {
    "name": "Northshore Technical Community College",
    "id": 1123
  },
  {
    "name": "Saint Leo University - Tampa Education Center",
    "id": 1124
  },
  {
    "name": "Penn State Altoona",
    "id": 1125
  },
  {
    "name": "Tulsa Community College West Campus",
    "id": 1126
  },
  {
    "name": "Tufts University",
    "id": 1127
  },
  {
    "name": "Pensacola State College",
    "id": 1128
  },
  {
    "name": "Whitworth University",
    "id": 1129
  },
  {
    "name": "Stanly Community College",
    "id": 1130
  },
  {
    "name": "Boston College Law School",
    "id": 1131
  },
  {
    "name": "Community Christian College",
    "id": 1132
  },
  {
    "name": "Wayne County Community College District",
    "id": 1133
  },
  {
    "name": "Aquinas College",
    "id": 1134
  },
  {
    "name": "Lone Star College-Kingwood",
    "id": 1135
  },
  {
    "name": "Valencia College, West Campus",
    "id": 1136
  },
  {
    "name": "Macalester College",
    "id": 1138
  },
  {
    "name": "90095",
    "id": 1139
  },
  {
    "name": "Blinn College",
    "id": 1140
  },
  {
    "name": "Hawaii Pacific University Hawaii Loa Campus",
    "id": 1141
  },
  {
    "name": "Adventist University of Health Sciences",
    "id": 1142
  },
  {
    "name": "Seminole State College",
    "id": 1143
  },
  {
    "name": "Tennessee State University",
    "id": 1144
  },
  {
    "name": "66215",
    "id": 1145
  },
  {
    "name": "Skagit Valley College",
    "id": 1146
  },
  {
    "name": "NMCC",
    "id": 1147
  },
  {
    "name": "Saint Michael's College",
    "id": 1149
  },
  {
    "name": "Grays Harbor College",
    "id": 1150
  },
  {
    "name": "Spring Hill College",
    "id": 1151
  },
  {
    "name": "Pennsylvania Institute Of Technology",
    "id": 1152
  },
  {
    "name": "Nassau Community College",
    "id": 1153
  },
  {
    "name": "Coker College",
    "id": 1154
  },
  {
    "name": "South Puget Sound Community College",
    "id": 1155
  },
  {
    "name": "Abraham Baldwin Agricultural College",
    "id": 1156
  },
  {
    "name": "Brooklyn College",
    "id": 1157
  },
  {
    "name": "Central Carolina Technical College",
    "id": 1158
  },
  {
    "name": "Johns Hopkins University - Montgomery County Campus",
    "id": 1159
  },
  {
    "name": "Keuka College",
    "id": 1160
  },
  {
    "name": "Suny at Cortland",
    "id": 1161
  },
  {
    "name": "Park University",
    "id": 1162
  },
  {
    "name": "Courtyard by Marriott Glassboro Rowan University",
    "id": 1163
  },
  {
    "name": "Florida State College at Jacksonville - South Campus",
    "id": 1164
  },
  {
    "name": "University of Pittsburgh at Johnstown",
    "id": 1165
  },
  {
    "name": "Thiel College",
    "id": 1166
  },
  {
    "name": "Wentworth Institute of Technology",
    "id": 1167
  },
  {
    "name": "Portland Community College Cascade",
    "id": 1168
  },
  {
    "name": "University of Phoenix - Idaho Campus",
    "id": 1169
  },
  {
    "name": "University of Pittsburgh",
    "id": 1170
  },
  {
    "name": "University of Pittsburgh at Titusville",
    "id": 1171
  },
  {
    "name": "Portland Community College Rock Creek",
    "id": 1172
  },
  {
    "name": "Rivier University",
    "id": 1173
  },
  {
    "name": "Trustee Street",
    "id": 1174
  },
  {
    "name": "Santa Clara University",
    "id": 1175
  },
  {
    "name": "Southern Technical College - Tampa",
    "id": 1176
  },
  {
    "name": "Lanier Technical College",
    "id": 1177
  },
  {
    "name": "Wallace State Community College",
    "id": 1178
  },
  {
    "name": "Macomb Community College",
    "id": 1179
  },
  {
    "name": "Department of Economics and Finance, West Chester University",
    "id": 1180
  },
  {
    "name": "New Mexico Junior College",
    "id": 1181
  },
  {
    "name": "Great Bay Community College",
    "id": 1182
  },
  {
    "name": "Montgomery College Takoma Park/Silver Spring Campus",
    "id": 1183
  },
  {
    "name": "Texarkana College",
    "id": 1184
  },
  {
    "name": "Marian University",
    "id": 1185
  },
  {
    "name": "Emmanuel College",
    "id": 1186
  },
  {
    "name": "University of West Florida",
    "id": 1187
  },
  {
    "name": "Columbia College",
    "id": 1188
  },
  {
    "name": "University of Michigan-Flint",
    "id": 1189
  },
  {
    "name": "The University of Chicago",
    "id": 1190
  },
  {
    "name": "Ohio University Lancaster Campus",
    "id": 1191
  },
  {
    "name": "Furman University",
    "id": 1192
  },
  {
    "name": "Presentation College",
    "id": 1193
  },
  {
    "name": "University of Oregon",
    "id": 1194
  },
  {
    "name": "University of Oregon",
    "id": 1195
  },
  {
    "name": "Florida SouthWestern State College",
    "id": 1196
  },
  {
    "name": "John Tyler Community College - Chester Campus",
    "id": 1197
  },
  {
    "name": "University of California, Riverside",
    "id": 1198
  },
  {
    "name": "Caldwell Community College and Technical Institute",
    "id": 1199
  },
  {
    "name": "Shoreline Community College",
    "id": 1200
  },
  {
    "name": "Des Moines Area Community College",
    "id": 1201
  },
  {
    "name": "Pepperdine University",
    "id": 1202
  },
  {
    "name": "Navarro College South at Mexia",
    "id": 1203
  },
  {
    "name": "American International College",
    "id": 1204
  },
  {
    "name": "Colgate University",
    "id": 1205
  },
  {
    "name": "Madisonville Community College",
    "id": 1206
  },
  {
    "name": "Rio Hondo College",
    "id": 1207
  },
  {
    "name": "Southern Vermont College",
    "id": 1208
  },
  {
    "name": "Orange Coast College",
    "id": 1209
  },
  {
    "name": "Cedar Crest College",
    "id": 1210
  },
  {
    "name": "Tulane University",
    "id": 1211
  },
  {
    "name": "Tarrant County College - South Campus",
    "id": 1212
  },
  {
    "name": "Oakland Community College - Orchard Ridge Campus",
    "id": 1213
  },
  {
    "name": "Bismarck State College",
    "id": 1214
  },
  {
    "name": "Pacific Union College",
    "id": 1215
  },
  {
    "name": "University of South Carolina Aiken",
    "id": 1216
  },
  {
    "name": "University of Portland",
    "id": 1217
  },
  {
    "name": "Wayne State College",
    "id": 1218
  },
  {
    "name": "University of St Augustine for Health Sciences",
    "id": 1219
  },
  {
    "name": "Lakeland University - Sheboygan Center",
    "id": 1220
  },
  {
    "name": "University of Pittsburgh, Bradford",
    "id": 1221
  },
  {
    "name": "The University of Akron",
    "id": 1222
  },
  {
    "name": "Bluegrass Community & Technical College Winchester-Clark County Campus",
    "id": 1223
  },
  {
    "name": "Parkland College - Admissions",
    "id": 1224
  },
  {
    "name": "Penn State Altoona",
    "id": 1225
  },
  {
    "name": "Casper College",
    "id": 1226
  },
  {
    "name": "Piedmont Community College",
    "id": 1227
  },
  {
    "name": "Kent State University at Ashtabula",
    "id": 1228
  },
  {
    "name": "Morgan Community College",
    "id": 1229
  },
  {
    "name": "Pueblo Community College",
    "id": 1230
  },
  {
    "name": "St. Mary's College of Maryland",
    "id": 1231
  },
  {
    "name": "Berkeley City College",
    "id": 1232
  },
  {
    "name": "Saint Louis Community College-Meramec",
    "id": 1233
  },
  {
    "name": "Cerritos College Athletics",
    "id": 1234
  },
  {
    "name": "Halifax Community College",
    "id": 1235
  },
  {
    "name": "Saint Leo University",
    "id": 1236
  },
  {
    "name": "Grand View University",
    "id": 1237
  },
  {
    "name": "College of Alameda",
    "id": 1238
  },
  {
    "name": "University of La Verne",
    "id": 1239
  },
  {
    "name": "Albany State University West Campus",
    "id": 1240
  },
  {
    "name": "St. Philip's College",
    "id": 1241
  },
  {
    "name": "Northwest Mississippi Community College",
    "id": 1243
  },
  {
    "name": "Lasell College",
    "id": 1244
  },
  {
    "name": "Mount Wachusett Community College",
    "id": 1245
  },
  {
    "name": "TVCC Terrell Campus",
    "id": 1246
  },
  {
    "name": "Kirkwood Community College: Iowa City Campus",
    "id": 1247
  },
  {
    "name": "Barton College",
    "id": 1248
  },
  {
    "name": "Southwest Baptist University",
    "id": 1249
  },
  {
    "name": "Salem College",
    "id": 1250
  },
  {
    "name": "Canyon",
    "id": 1251
  },
  {
    "name": "University of San Francisco",
    "id": 1252
  },
  {
    "name": "University of Central Missouri",
    "id": 1253
  },
  {
    "name": "Crafton Hills College",
    "id": 1254
  },
  {
    "name": "Peru State College",
    "id": 1255
  },
  {
    "name": "San Diego City College",
    "id": 1256
  },
  {
    "name": "Gardner-Webb University",
    "id": 1257
  },
  {
    "name": "Rockingham Community College",
    "id": 1258
  },
  {
    "name": "Adams State University",
    "id": 1259
  },
  {
    "name": "Manhattan College",
    "id": 1260
  },
  {
    "name": "Imperial Valley College Bookstore",
    "id": 1261
  },
  {
    "name": "Point University",
    "id": 1262
  },
  {
    "name": "Coe College",
    "id": 1263
  },
  {
    "name": "Madera Community College",
    "id": 1264
  },
  {
    "name": "Plymouth State University",
    "id": 1265
  },
  {
    "name": "Mississippi University For Women",
    "id": 1266
  },
  {
    "name": "Le Moyne College",
    "id": 1267
  },
  {
    "name": "University of New Mexico-Los Alamos",
    "id": 1268
  },
  {
    "name": "Stoneridge Country Club",
    "id": 1269
  },
  {
    "name": "Misericordia University",
    "id": 1270
  },
  {
    "name": "Mississippi College Library",
    "id": 1271
  },
  {
    "name": "Virginia Western Community College",
    "id": 1272
  },
  {
    "name": "Clovis Community College",
    "id": 1273
  },
  {
    "name": "Troy University",
    "id": 1274
  },
  {
    "name": "Pearson Education",
    "id": 1275
  },
  {
    "name": "Marquette University",
    "id": 1276
  },
  {
    "name": "Douglas College",
    "id": 1277
  },
  {
    "name": "Davidson College: Package Shipping",
    "id": 1278
  },
  {
    "name": "Cecil College",
    "id": 1279
  },
  {
    "name": "Ave Maria School of Law",
    "id": 1280
  },
  {
    "name": "California Polytechnic State University",
    "id": 1282
  },
  {
    "name": "Miami Dade College - Wolfson Campus",
    "id": 1283
  },
  {
    "name": "Northwestern College",
    "id": 1284
  },
  {
    "name": "Gateway Technical College",
    "id": 1285
  },
  {
    "name": "Georgia Institute Of Technology: The Blueprint Yearbook",
    "id": 1286
  },
  {
    "name": "Ashford University Online Center",
    "id": 1287
  },
  {
    "name": "Gateway Technical College Kenosha",
    "id": 1288
  },
  {
    "name": "Labouré College",
    "id": 1289
  },
  {
    "name": "Clark State Community College",
    "id": 1290
  },
  {
    "name": "California State University Dominguez Hills",
    "id": 1291
  },
  {
    "name": "University of California Santa Cruz",
    "id": 1292
  },
  {
    "name": "Providence College",
    "id": 1293
  },
  {
    "name": "Westminster College",
    "id": 1294
  },
  {
    "name": "Queens University of Charlotte",
    "id": 1295
  },
  {
    "name": "University of Massachusetts Lowell",
    "id": 1296
  },
  {
    "name": "Patrick Henry Community College",
    "id": 1297
  },
  {
    "name": "Clarion University",
    "id": 1298
  },
  {
    "name": "University of Massachusetts Dartmouth",
    "id": 1299
  },
  {
    "name": "University of Washington",
    "id": 1300
  },
  {
    "name": "Framingham State University",
    "id": 1301
  },
  {
    "name": "University of South Carolina Upstate",
    "id": 1302
  },
  {
    "name": "Weber State University",
    "id": 1303
  },
  {
    "name": "Craven Community College",
    "id": 1304
  },
  {
    "name": "Clayton State University",
    "id": 1305
  },
  {
    "name": "Alpena Community College",
    "id": 1306
  },
  {
    "name": "CUNY College of Staten Island",
    "id": 1307
  },
  {
    "name": "LIU Post",
    "id": 1308
  },
  {
    "name": "Nevada State College",
    "id": 1309
  },
  {
    "name": "Angelo State University",
    "id": 1310
  },
  {
    "name": "Dyersburg State Community College",
    "id": 1311
  },
  {
    "name": "Massachusetts Institute of Technology",
    "id": 1312
  },
  {
    "name": "Muskingum University",
    "id": 1313
  },
  {
    "name": "Purdue University Northwest - Hammond Campus",
    "id": 1314
  },
  {
    "name": "San Bernardino Valley College",
    "id": 1315
  },
  {
    "name": "Broward College-Downtown Center",
    "id": 1316
  },
  {
    "name": "MCC-Penn Valley",
    "id": 1317
  },
  {
    "name": "Pikes Peak Community College-Downtown Studio Campus",
    "id": 1318
  },
  {
    "name": "Seminole State College - Heathrow Campus",
    "id": 1319
  },
  {
    "name": "Purchase College",
    "id": 1320
  },
  {
    "name": "Indiana University South Bend",
    "id": 1321
  },
  {
    "name": "Western Oregon University",
    "id": 1322
  },
  {
    "name": "University of South Florida Sarasota-Manatee",
    "id": 1323
  },
  {
    "name": "Baruch College",
    "id": 1325
  },
  {
    "name": "Hofstra University",
    "id": 1326
  },
  {
    "name": "Lesley University",
    "id": 1327
  },
  {
    "name": "University College-North",
    "id": 1328
  },
  {
    "name": "Minnesota West Community & Technical",
    "id": 1329
  },
  {
    "name": "Temple University Harrisburg",
    "id": 1330
  },
  {
    "name": "University of Southern Maine",
    "id": 1331
  },
  {
    "name": "University of Delaware",
    "id": 1332
  },
  {
    "name": "Salt Lake Community College - South City Campus",
    "id": 1333
  },
  {
    "name": "Florida Atlantic University - John D. MacArthur Campus at Jupiter",
    "id": 1334
  },
  {
    "name": "BYU Salt Lake Center",
    "id": 1335
  },
  {
    "name": "South Georgia State College",
    "id": 1336
  },
  {
    "name": "Ivy Tech Community College",
    "id": 1337
  },
  {
    "name": "Notre Dame de Namur University",
    "id": 1338
  },
  {
    "name": "Clinton Community College",
    "id": 1339
  },
  {
    "name": "Marietta College",
    "id": 1340
  },
  {
    "name": "University Boulevard",
    "id": 1341
  },
  {
    "name": "Southern Arkansas University",
    "id": 1342
  },
  {
    "name": "San Francisco State University",
    "id": 1343
  },
  {
    "name": "Colby Community College",
    "id": 1344
  },
  {
    "name": "Kent State University Geauga Campus",
    "id": 1345
  },
  {
    "name": "Augusta Technical College",
    "id": 1346
  },
  {
    "name": "Southern Union State Community College",
    "id": 1347
  },
  {
    "name": "Benedict College",
    "id": 1348
  },
  {
    "name": "Shepherd University",
    "id": 1349
  },
  {
    "name": "Southwestern Community College",
    "id": 1350
  },
  {
    "name": "Seton Hall University",
    "id": 1351
  },
  {
    "name": "University of Wisconsin-Parkside",
    "id": 1352
  },
  {
    "name": "Lincoln University",
    "id": 1353
  },
  {
    "name": "Northshore Technical Community College",
    "id": 1354
  },
  {
    "name": "Central Alabama Community College",
    "id": 1355
  },
  {
    "name": "Hillsborough Community College - Dale Mabry Campus",
    "id": 1356
  },
  {
    "name": "Delaware County Community College - Marple Campus",
    "id": 1357
  },
  {
    "name": "East Mississippi Community College",
    "id": 1358
  },
  {
    "name": "Jones County Junior College",
    "id": 1359
  },
  {
    "name": "West Georgia Technical College",
    "id": 1360
  },
  {
    "name": "FedEx Office Print & Ship Center",
    "id": 1361
  },
  {
    "name": "S-Con, Inc.",
    "id": 1362
  },
  {
    "name": "Eastern Oregon University",
    "id": 1363
  },
  {
    "name": "City College of San Francisco - Ocean Campus",
    "id": 1364
  },
  {
    "name": "Pierce College Puyallup",
    "id": 1365
  },
  {
    "name": "Indiana University of Pennsylvania",
    "id": 1366
  },
  {
    "name": "Colorado Christian University",
    "id": 1367
  },
  {
    "name": "Holy Family University",
    "id": 1368
  },
  {
    "name": "NEIU",
    "id": 1369
  },
  {
    "name": "Elizabethtown Community and Technical College",
    "id": 1370
  },
  {
    "name": "University of Detroit Mercy",
    "id": 1371
  },
  {
    "name": "Austin Community College",
    "id": 1372
  },
  {
    "name": "University of North Texas",
    "id": 1373
  },
  {
    "name": "UC Blue Ash College",
    "id": 1374
  },
  {
    "name": "Kennedy - King College",
    "id": 1375
  },
  {
    "name": "Wake Forest University",
    "id": 1376
  },
  {
    "name": "Penn State Behrend: School of Engineering",
    "id": 1377
  },
  {
    "name": "Husson University",
    "id": 1380
  },
  {
    "name": "CC's Homemade Foods",
    "id": 1381
  },
  {
    "name": "Gateway Technical College",
    "id": 1383
  },
  {
    "name": "Kennedy - King College",
    "id": 1384
  },
  {
    "name": "North Seattle College",
    "id": 1385
  },
  {
    "name": "Emory & Henry College (E&H)",
    "id": 1386
  },
  {
    "name": "North Dakota State College of Science",
    "id": 1387
  },
  {
    "name": "Vincennes University",
    "id": 1388
  },
  {
    "name": "Edinboro University",
    "id": 1389
  },
  {
    "name": "County College of Morris",
    "id": 1390
  },
  {
    "name": "Dominican University",
    "id": 1391
  },
  {
    "name": "Union County College",
    "id": 1392
  },
  {
    "name": "Chippewa Valley Technical College - Business Education Center",
    "id": 1393
  },
  {
    "name": "Texas State Technical College in Brownwood",
    "id": 1394
  },
  {
    "name": "The University of Texas of the Permian Basin",
    "id": 1395
  },
  {
    "name": "Midstate College",
    "id": 1396
  },
  {
    "name": "University of the District of Columbia",
    "id": 1397
  },
  {
    "name": "Louisiana College",
    "id": 1398
  },
  {
    "name": "Gannon University",
    "id": 1399
  },
  {
    "name": "Sandhills Community College",
    "id": 1400
  },
  {
    "name": "University of West Georgia Newnan",
    "id": 1401
  },
  {
    "name": "Aims Community College",
    "id": 1402
  },
  {
    "name": "Nova Southeastern University",
    "id": 1403
  },
  {
    "name": "Saint Louis University",
    "id": 1404
  },
  {
    "name": "West Hills Community College District",
    "id": 1405
  },
  {
    "name": "St. Mary's College of California",
    "id": 1406
  },
  {
    "name": "Albany Technical College",
    "id": 1407
  },
  {
    "name": "Ball State Indianapolis Center",
    "id": 1408
  },
  {
    "name": "Metropolitan Community College- Blue River",
    "id": 1409
  },
  {
    "name": "Lansing Community College",
    "id": 1410
  },
  {
    "name": "Mars Hill University",
    "id": 1411
  },
  {
    "name": "Catawba Valley Community College",
    "id": 1412
  },
  {
    "name": "University of North Georgia - Oconee Campus",
    "id": 1413
  },
  {
    "name": "Northshore Technical Community College - Hammond Campus",
    "id": 1414
  },
  {
    "name": "Kenyon College",
    "id": 1415
  }
];