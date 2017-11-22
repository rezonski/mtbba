const institutionsArray = [
  {
    "city": "menifee",
    "name": "mt san jacinto-menifee",
    "state": "ca",
    "zipcode": 92584,
    "date": ""
  },
  {
    "city": "redwood city",
    "name": "canada college",
    "state": "ca",
    "zipcode": 94061,
    "date": ""
  },
  {
    "city": "santa ana",
    "name": "santa ana college",
    "state": "ca",
    "zipcode": 92706,
    "date": ""
  },
  {
    "city": "panama city",
    "name": "gulf coast state college",
    "state": "fl",
    "zipcode": "32401-1041",
    "date": ""
  },
  {
    "city": "mount berry",
    "name": "berry college",
    "state": "ga",
    "zipcode": 30149,
    "date": ""
  },
  {
    "city": "kahului maui",
    "name": "univ of hawaii maui college",
    "state": "hi",
    "zipcode": 96732,
    "date": ""
  },
  {
    "city": "marion",
    "name": "indiana wesleyan u",
    "state": "in",
    "zipcode": 46953,
    "date": ""
  },
  {
    "city": "newport",
    "name": "northern kentucky univ",
    "state": "ky",
    "zipcode": 41099,
    "date": ""
  },
  {
    "city": "madison",
    "name": "north florida comm coll",
    "state": "fl",
    "zipcode": "32340-1611",
    "date": "8/23/2017"
  },
  {
    "city": "dade city",
    "name": "pasco hernando st coll - east",
    "state": "fl",
    "zipcode": 33525,
    "date": "8/23/2017"
  },
  {
    "city": "monticello",
    "name": "u of arkansas at monticello",
    "state": "ar",
    "zipcode": 71655,
    "date": "8/23/2017"
  },
  {
    "city": "wesson",
    "name": "copiah-lincoln cc-wesson",
    "state": "ms",
    "zipcode": "39191-0649",
    "date": "8/23/2017"
  },
  {
    "city": "bismarck",
    "name": "north dakota university system",
    "state": "nd",
    "zipcode": 58505,
    "date": "8/23/2017"
  },
  {
    "city": "moberly",
    "name": "moberly area comm college",
    "state": "mo",
    "zipcode": "65270-1304",
    "date": "8/23/2017"
  },
  {
    "city": "albuquerque",
    "name": "univ of new mexico",
    "state": "nm",
    "zipcode": 87131,
    "date": "8/23/2017"
  },
  {
    "city": "spartanburg",
    "name": "spartanburg methodist coll",
    "state": "sc",
    "zipcode": 29301,
    "date": "8/23/2017"
  },
  {
    "city": "long beach",
    "name": "cal state u - long beach",
    "state": "ca",
    "zipcode": 90840,
    "date": "8/23/2017"
  },
  {
    "city": "nashville",
    "name": "belmont university",
    "state": "tn",
    "zipcode": "37212-3758",
    "date": "8/23/2017"
  },
  {
    "city": "asheville",
    "name": "univ of nc - asheville",
    "state": "nc",
    "zipcode": "28804-3024",
    "date": "8/23/2017"
  },
  {
    "city": "chattanooga",
    "name": "univ of tenn-chattanooga",
    "state": "tn",
    "zipcode": "37403-2504",
    "date": "8/23/2017"
  },
  {
    "city": "kennesaw",
    "name": "kennesaw state university",
    "state": "ga",
    "zipcode": "30144-5588",
    "date": "8/23/2017"
  },
  {
    "city": "greenville",
    "name": "east carolina univ",
    "state": "nc",
    "zipcode": 27858,
    "date": "8/23/2017"
  },
  {
    "city": "san antonio",
    "name": "univ of texas - san antonio",
    "state": "tx",
    "zipcode": 78249,
    "date": "8/23/2017"
  },
  {
    "city": "boise",
    "name": "boise state university",
    "state": "id",
    "zipcode": 83725,
    "date": "8/23/2017"
  },
  {
    "city": "tulsa",
    "name": "tulsa comm coll-metro cmps",
    "state": "ok",
    "zipcode": 74119,
    "date": "8/23/2017"
  },
  {
    "city": "winter haven",
    "name": "polk state coll - winter haven",
    "state": "fl",
    "zipcode": 33881,
    "date": "8/23/2017"
  },
  {
    "city": "cedar falls",
    "name": "university of northern iowa",
    "state": "ia",
    "zipcode": "50614-0012",
    "date": "8/23/2017"
  },
  {
    "city": "hillsboro",
    "name": "hill college - hillsboro campu",
    "state": "tx",
    "zipcode": 76645,
    "date": "8/23/2017"
  },
  {
    "city": "charlotte",
    "name": "univ of nc - charlotte",
    "state": "nc",
    "zipcode": "28223-0001",
    "date": "8/23/2017"
  },
  {
    "city": "baton rouge",
    "name": "louisiana state university",
    "state": "la",
    "zipcode": 70803,
    "date": "8/23/2017"
  },
  {
    "city": "charlotte",
    "name": "ctrl piedmont cc - e 7th st",
    "state": "nc",
    "zipcode": "28204-2019",
    "date": "8/23/2017"
  },
  {
    "city": "cedar rapids",
    "name": "kirkwood community college",
    "state": "ia",
    "zipcode": "52404-5260",
    "date": "8/23/2017"
  },
  {
    "city": "chapel hill",
    "name": "univ of nc - chapel hill",
    "state": "nc",
    "zipcode": 27599,
    "date": "8/23/2017"
  },
  {
    "city": "alexandria",
    "name": "no virginia cc - alexandria",
    "state": "va",
    "zipcode": 22311,
    "date": "8/23/2017"
  },
  {
    "city": "fayetteville",
    "name": "fayetteville tech comm coll",
    "state": "nc",
    "zipcode": "28303-4761",
    "date": "8/23/2017"
  },
  {
    "city": "coral gables",
    "name": "university of miami",
    "state": "fl",
    "zipcode": "33146-2440",
    "date": "8/23/2017"
  },
  {
    "city": "chula vista",
    "name": "southwestern college",
    "state": "ca",
    "zipcode": 91910,
    "date": "8/23/2017"
  },
  {
    "city": "boca raton",
    "name": "florida atlantic university",
    "state": "fl",
    "zipcode": "33431-6424",
    "date": "8/23/2017"
  },
  {
    "city": "clemson",
    "name": "clemson university",
    "state": "sc",
    "zipcode": 29634,
    "date": "8/23/2017"
  },
  {
    "city": "state university",
    "name": "arkansas state u-main",
    "state": "ar",
    "zipcode": 72467,
    "date": "8/23/2017"
  },
  {
    "city": "raleigh",
    "name": "shaw university",
    "state": "nc",
    "zipcode": "27601-2341",
    "date": "8/23/2017"
  },
  {
    "city": "san luis obispo",
    "name": "cuesta college",
    "state": "ca",
    "zipcode": 93405,
    "date": "8/23/2017"
  },
  {
    "city": "archbold",
    "name": "northwest state c c",
    "state": "oh",
    "zipcode": "43502-9517",
    "date": "8/23/2017"
  },
  {
    "city": "palatine",
    "name": "wm rainey harper college",
    "state": "il",
    "zipcode": "60067-7373",
    "date": "8/23/2017"
  },
  {
    "city": "delaware",
    "name": "ohio wesleyan university",
    "state": "oh",
    "zipcode": "43015-2333",
    "date": "8/23/2017"
  },
  {
    "city": "savannah",
    "name": "savannah technical college",
    "state": "ga",
    "zipcode": "31405-5521",
    "date": "8/23/2017"
  },
  {
    "city": "springfield",
    "name": "missouri st univ-sprngfl",
    "state": "mo",
    "zipcode": "65897-0027",
    "date": "8/23/2017"
  },
  {
    "city": "washington",
    "name": "howard university",
    "state": "dc",
    "zipcode": 20059,
    "date": "8/23/2017"
  },
  {
    "city": "richmond",
    "name": "eastern kentucky university",
    "state": "ky",
    "zipcode": "40475-3100",
    "date": "8/23/2017"
  },
  {
    "city": "london",
    "name": "kctcs-somerset-laurel north",
    "state": "ky",
    "zipcode": "40741-6737",
    "date": "8/23/2017"
  },
  {
    "city": "west lafayette",
    "name": "purdue univ",
    "state": "in",
    "zipcode": 47907,
    "date": "8/23/2017"
  },
  {
    "city": "caldwell",
    "name": "coll of western idaho",
    "state": "id",
    "zipcode": 83605,
    "date": "8/23/2017"
  },
  {
    "city": "saint charles",
    "name": "st charles cty cmty college",
    "state": "mo",
    "zipcode": "63301-4414",
    "date": "8/23/2017"
  },
  {
    "city": "arkadelphia",
    "name": "henderson state univ",
    "state": "ar",
    "zipcode": "71999-0001",
    "date": "8/23/2017"
  },
  {
    "city": "davie",
    "name": "broward coll-central",
    "state": "fl",
    "zipcode": "33314-1604",
    "date": "8/23/2017"
  },
  {
    "city": "lincoln",
    "name": "univ of nebraska - lincoln",
    "state": "ne",
    "zipcode": 68588,
    "date": "8/23/2017"
  },
  {
    "city": "lexington",
    "name": "university of kentucky",
    "state": "ky",
    "zipcode": 40506,
    "date": "8/23/2017"
  },
  {
    "city": "peoria",
    "name": "bradley university",
    "state": "il",
    "zipcode": "61625-0001",
    "date": "8/23/2017"
  },
  {
    "city": "mankato",
    "name": "minnesota st univ-mankato",
    "state": "mn",
    "zipcode": 56001,
    "date": "8/23/2017"
  },
  {
    "city": "evansville",
    "name": "univ of southern indiana",
    "state": "in",
    "zipcode": "47712-3534",
    "date": "8/23/2017"
  },
  {
    "city": "mesquite",
    "name": "dallas cty comm coll",
    "state": "tx",
    "zipcode": 75150,
    "date": "8/23/2017"
  },
  {
    "city": "notre dame",
    "name": "saint marys college - in",
    "state": "in",
    "zipcode": 46556,
    "date": "8/23/2017"
  },
  {
    "city": "ridgecrest",
    "name": "cerro coso cmty college",
    "state": "ca",
    "zipcode": 93555,
    "date": "8/23/2017"
  },
  {
    "city": "huntington",
    "name": "marshall university",
    "state": "wv",
    "zipcode": "25755-0001",
    "date": "8/23/2017"
  },
  {
    "city": "louisville",
    "name": "university of louisville",
    "state": "ky",
    "zipcode": 40292,
    "date": "8/23/2017"
  },
  {
    "city": "cleburn",
    "name": "hills college - cleburne",
    "state": "tx",
    "zipcode": 76033,
    "date": "8/23/2017"
  },
  {
    "city": "troy",
    "name": "troy univ - main campus",
    "state": "al",
    "zipcode": 36082,
    "date": "8/23/2017"
  },
  {
    "city": "springfield",
    "name": "ozarks tech comm college",
    "state": "mo",
    "zipcode": 65802,
    "date": "8/23/2017"
  },
  {
    "city": "stockton",
    "name": "san joaquin delta college",
    "state": "ca",
    "zipcode": 95207,
    "date": "8/23/2017"
  },
  {
    "city": "fullerton",
    "name": "cal state u - fullerton",
    "state": "ca",
    "zipcode": 92831,
    "date": "8/23/2017"
  },
  {
    "city": "kirksville",
    "name": "truman state university",
    "state": "mo",
    "zipcode": "63501-4200",
    "date": "8/23/2017"
  },
  {
    "city": "phoenix",
    "name": "phoenix college",
    "state": "az",
    "zipcode": 85013,
    "date": "8/23/2017"
  },
  {
    "city": "sacramento",
    "name": "american river college",
    "state": "ca",
    "zipcode": 95841,
    "date": "8/23/2017"
  },
  {
    "city": "houston",
    "name": "univ of houston",
    "state": "tx",
    "zipcode": 77004,
    "date": "8/23/2017"
  },
  {
    "city": "pullman",
    "name": "washington state university",
    "state": "wa",
    "zipcode": 99164,
    "date": "8/23/2017"
  },
  {
    "city": "charlottesville",
    "name": "university of virginia",
    "state": "va",
    "zipcode": 22904,
    "date": "8/23/2017"
  },
  {
    "city": "cedar bluff",
    "name": "vccs - southwest va cc",
    "state": "va",
    "zipcode": "24609-9364",
    "date": "8/23/2017"
  },
  {
    "city": "winona",
    "name": "winona state univ",
    "state": "mn",
    "zipcode": 559875838,
    "date": "8/23/2017"
  },
  {
    "city": "norfolk",
    "name": "northeast community college",
    "state": "ne",
    "zipcode": "68701-6831",
    "date": "8/23/2017"
  },
  {
    "city": "cincinnati",
    "name": "university of cincinnati",
    "state": "oh",
    "zipcode": "45221-0001",
    "date": "8/23/2017"
  },
  {
    "city": "huntsville",
    "name": "sam houston state univ",
    "state": "tx",
    "zipcode": 77340,
    "date": "8/23/2017"
  },
  {
    "city": "salem",
    "name": "corban university",
    "state": "or",
    "zipcode": "97317-9392",
    "date": "8/23/2017"
  },
  {
    "city": "so holland",
    "name": "south suburban college",
    "state": "il",
    "zipcode": 60473,
    "date": "8/23/2017"
  },
  {
    "city": "memphis",
    "name": "rhodes college",
    "state": "tn",
    "zipcode": "38112-1624",
    "date": "8/23/2017"
  },
  {
    "city": "bowling green",
    "name": "bowling green state univ",
    "state": "oh",
    "zipcode": 43403,
    "date": "8/23/2017"
  },
  {
    "city": "center valley",
    "name": "de sales university",
    "state": "pa",
    "zipcode": "18034-9565",
    "date": "8/23/2017"
  },
  {
    "city": "glen ellyn",
    "name": "college of dupage",
    "state": "il",
    "zipcode": "60137-6708",
    "date": "8/23/2017"
  },
  {
    "city": "rock hill",
    "name": "winthrop university",
    "state": "sc",
    "zipcode": "29733-7001",
    "date": "8/23/2017"
  },
  {
    "city": "clinton",
    "name": "presbyterian college",
    "state": "sc",
    "zipcode": "29325-2865",
    "date": "8/23/2017"
  },
  {
    "city": "bethlehem",
    "name": "northampton cmty coll",
    "state": "pa",
    "zipcode": "18020-7568",
    "date": "8/23/2017"
  },
  {
    "city": "tuscaloosa",
    "name": "univ of ala-tuscaloosa",
    "state": "al",
    "zipcode": 35487,
    "date": "8/23/2017"
  },
  {
    "city": "south charleston",
    "name": "bridgevalley ctc",
    "state": "wv",
    "zipcode": 25303,
    "date": "8/23/2017"
  },
  {
    "city": "gainesville",
    "name": "university of florida",
    "state": "fl",
    "zipcode": 32611,
    "date": "8/23/2017"
  },
  {
    "city": "columbia",
    "name": "univ of missouri-columbia",
    "state": "mo",
    "zipcode": 65211,
    "date": "8/23/2017"
  },
  {
    "city": "leesburg",
    "name": "lake sumter state college",
    "state": "fl",
    "zipcode": "34788-3950",
    "date": "8/23/2017"
  },
  {
    "city": "pleasant hill",
    "name": "diablo valley college",
    "state": "ca",
    "zipcode": 94523,
    "date": "8/23/2017"
  },
  {
    "city": "wichita",
    "name": "wichita state university",
    "state": "ks",
    "zipcode": "67260-9700",
    "date": "8/23/2017"
  },
  {
    "city": "fayetteville",
    "name": "u of arkansas-fayetteville",
    "state": "ar",
    "zipcode": 72701,
    "date": "8/23/2017"
  },
  {
    "city": "neosho",
    "name": "crowder college",
    "state": "mo",
    "zipcode": "64850-9165",
    "date": "8/23/2017"
  },
  {
    "city": "greenwood",
    "name": "lander university",
    "state": "sc",
    "zipcode": "29649-2056",
    "date": "8/23/2017"
  },
  {
    "city": "curtis",
    "name": "university of nebraska",
    "state": "ne",
    "zipcode": "69025-9525",
    "date": "8/23/2017"
  },
  {
    "city": "waleska",
    "name": "reinhardt college",
    "state": "ga",
    "zipcode": "30183-2981",
    "date": "8/23/2017"
  },
  {
    "city": "decatur",
    "name": "east central community coll",
    "state": "ms",
    "zipcode": "39327-8985",
    "date": "8/23/2017"
  },
  {
    "city": "springfield",
    "name": "wittenberg university",
    "state": "oh",
    "zipcode": "45504-2534",
    "date": "8/23/2017"
  },
  {
    "city": "mount olive",
    "name": "university of mount olive",
    "state": "nc",
    "zipcode": "28365-1263",
    "date": "8/23/2017"
  },
  {
    "city": "n charleston",
    "name": "trident tech coll",
    "state": "sc",
    "zipcode": "29406-4607",
    "date": "8/23/2017"
  },
  {
    "city": "coeur d alene",
    "name": "north idaho college",
    "state": "id",
    "zipcode": 83814,
    "date": "8/23/2017"
  },
  {
    "city": "pembroke pines",
    "name": "broward coll-south",
    "state": "fl",
    "zipcode": 33024,
    "date": "8/23/2017"
  },
  {
    "city": "turlock",
    "name": "cal state u - stanislaus",
    "state": "ca",
    "zipcode": 95382,
    "date": "8/23/2017"
  },
  {
    "city": "fresno",
    "name": "fresno city college",
    "state": "ca",
    "zipcode": 93741,
    "date": "8/23/2017"
  },
  {
    "city": "chico",
    "name": "butte college - chico",
    "state": "ca",
    "zipcode": 95928,
    "date": "8/23/2017"
  },
  {
    "city": "bakersfield",
    "name": "bakersfield college",
    "state": "ca",
    "zipcode": 93305,
    "date": "8/23/2017"
  },
  {
    "city": "grand junction",
    "name": "colorado mesa university",
    "state": "co",
    "zipcode": "81501-3122",
    "date": "8/23/2017"
  },
  {
    "city": "gainesville",
    "name": "santa fe college",
    "state": "fl",
    "zipcode": "32606-6210",
    "date": "8/23/2017"
  },
  {
    "city": "belton",
    "name": "univ of mary hardin baylor",
    "state": "tx",
    "zipcode": 76513,
    "date": "8/23/2017"
  },
  {
    "city": "kent",
    "name": "kent state university",
    "state": "oh",
    "zipcode": 44242,
    "date": "8/23/2017"
  },
  {
    "city": "ames",
    "name": "iowa state university",
    "state": "ia",
    "zipcode": 50011,
    "date": "8/23/2017"
  },
  {
    "city": "durham",
    "name": "north carolina central univ",
    "state": "nc",
    "zipcode": "27707-3129",
    "date": "8/23/2017"
  },
  {
    "city": "denison",
    "name": "grayson county college",
    "state": "tx",
    "zipcode": 75020,
    "date": "8/23/2017"
  },
  {
    "city": "auburn university",
    "name": "auburn u main campus",
    "state": "al",
    "zipcode": 36849,
    "date": "8/23/2017"
  },
  {
    "city": "usaf academy",
    "name": "u s air force academy",
    "state": "co",
    "zipcode": 80840,
    "date": "8/23/2017"
  },
  {
    "city": "los lunas",
    "name": "unm-main campus",
    "state": "nm",
    "zipcode": 87031,
    "date": "8/23/2017"
  },
  {
    "city": "farmington",
    "name": "san juan college",
    "state": "nm",
    "zipcode": "87402-4699",
    "date": "8/23/2017"
  },
  {
    "city": "mission",
    "name": "metropolitan community college",
    "state": "bc",
    "zipcode": "v2v 3v5",
    "date": "8/23/2017"
  },
  {
    "city": "los angeles",
    "name": "univ of southern california",
    "state": "ca",
    "zipcode": 90089,
    "date": "8/23/2017"
  },
  {
    "city": "anderson",
    "name": "anderson university",
    "state": "sc",
    "zipcode": "29621-4002",
    "date": "8/23/2017"
  },
  {
    "city": "hattiesburg",
    "name": "u of southern mississippi",
    "state": "ms",
    "zipcode": "39406-0001",
    "date": "8/23/2017"
  },
  {
    "city": "norfolk",
    "name": "norfolk state university",
    "state": "va",
    "zipcode": "23504-8050",
    "date": "8/23/2017"
  },
  {
    "city": "normal",
    "name": "illinois state university",
    "state": "il",
    "zipcode": 61790,
    "date": "8/23/2017"
  },
  {
    "city": "el dorado",
    "name": "butler co comm coll-el dora",
    "state": "ks",
    "zipcode": "67042-3225",
    "date": "8/23/2017"
  },
  {
    "city": "fort worth",
    "name": "texas christian university",
    "state": "tx",
    "zipcode": 76129,
    "date": "8/23/2017"
  },
  {
    "city": "las cruces",
    "name": "new mexico state university",
    "state": "nm",
    "zipcode": 88003,
    "date": "8/23/2017"
  },
  {
    "city": "hilo",
    "name": "hawaii community college",
    "state": "hi",
    "zipcode": 96720,
    "date": "8/23/2017"
  },
  {
    "city": "bowling green",
    "name": "western kentucky university",
    "state": "ky",
    "zipcode": "42101-1000",
    "date": "8/23/2017"
  },
  {
    "city": "merced",
    "name": "merced college",
    "state": "ca",
    "zipcode": 95348,
    "date": "8/23/2017"
  },
  {
    "city": "honolulu",
    "name": "univ of hawaii manoa campus",
    "state": "hi",
    "zipcode": 96822,
    "date": "8/23/2017"
  },
  {
    "city": "bradenton",
    "name": "state coll of florida - bradenton",
    "state": "fl",
    "zipcode": "34207-3522",
    "date": "8/23/2017"
  },
  {
    "city": "tampa",
    "name": "fl gulf coast chapter abc",
    "state": "fl",
    "zipcode": "33607-3104",
    "date": "8/23/2017"
  },
  {
    "city": "ocala",
    "name": "college of central florida",
    "state": "fl",
    "zipcode": "34474-4415",
    "date": "8/23/2017"
  },
  {
    "city": "bloomington",
    "name": "indiana univ bloomington",
    "state": "in",
    "zipcode": "47405-7104",
    "date": "8/23/2017"
  },
  {
    "city": "statesboro",
    "name": "georgia southern university",
    "state": "ga",
    "zipcode": 30460,
    "date": "8/23/2017"
  },
  {
    "city": "hammond",
    "name": "southeastern louisiana univ",
    "state": "la",
    "zipcode": 70402,
    "date": "8/23/2017"
  },
  {
    "city": "amarillo",
    "name": "amarillo college",
    "state": "tx",
    "zipcode": "79109-2411",
    "date": "8/23/2017"
  },
  {
    "city": "warren",
    "name": "macomb community college",
    "state": "mi",
    "zipcode": 48088,
    "date": "8/23/2017"
  },
  {
    "city": "modesto",
    "name": "modesto junior college",
    "state": "ca",
    "zipcode": 95350,
    "date": "8/23/2017"
  },
  {
    "city": "lake worth",
    "name": "palm beach state coll - lake worth",
    "state": "fl",
    "zipcode": "33461-4705",
    "date": "8/23/2017"
  },
  {
    "city": "miami",
    "name": "fiu - university park campus",
    "state": "fl",
    "zipcode": 33199,
    "date": "8/23/2017"
  },
  {
    "city": "butler",
    "name": "butler county cmty college",
    "state": "pa",
    "zipcode": 16001,
    "date": "8/23/2017"
  },
  {
    "city": "brookings",
    "name": "south dakota state univ -br",
    "state": "sd",
    "zipcode": 57007,
    "date": "8/23/2017"
  },
  {
    "city": "raleigh",
    "name": "north carolina state univ",
    "state": "nc",
    "zipcode": 27695,
    "date": "8/23/2017"
  },
  {
    "city": "williston",
    "name": "williston state college",
    "state": "nd",
    "zipcode": "58801-4464",
    "date": "8/23/2017"
  },
  {
    "city": "el reno",
    "name": "redlands community college",
    "state": "ok",
    "zipcode": 73036,
    "date": "8/23/2017"
  },
  {
    "city": "cleburn",
    "name": "hill college - johnson campus",
    "state": "tx",
    "zipcode": 76033,
    "date": "8/23/2017"
  },
  {
    "city": "tahlequah",
    "name": "northeastern state univ",
    "state": "ok",
    "zipcode": 74464,
    "date": "8/23/2017"
  },
  {
    "city": "rocklin",
    "name": "sierra college",
    "state": "ca",
    "zipcode": 95677,
    "date": "8/23/2017"
  },
  {
    "city": "newtown",
    "name": "bucks county cmty coll",
    "state": "pa",
    "zipcode": "18940-4106",
    "date": "8/23/2017"
  },
  {
    "city": "arkadelphia",
    "name": "ouachita baptist university",
    "state": "ar",
    "zipcode": "71998-0001",
    "date": "8/23/2017"
  },
  {
    "city": "waco",
    "name": "baylor university",
    "state": "tx",
    "zipcode": 76798,
    "date": "8/23/2017"
  },
  {
    "city": "ste anne bellevu",
    "name": "john abbott college",
    "state": "qc",
    "zipcode": "h9x 3l9",
    "date": "8/23/2017"
  },
  {
    "city": "lawrenceville",
    "name": "gwinnett technical college",
    "state": "ga",
    "zipcode": "30043-5702",
    "date": "8/23/2017"
  },
  {
    "city": "tempe",
    "name": "arizona state university",
    "state": "az",
    "zipcode": 85281,
    "date": "8/23/2017"
  },
  {
    "city": "union",
    "name": "east central college",
    "state": "mo",
    "zipcode": "63084-0529",
    "date": "8/23/2017"
  },
  {
    "city": "san bruno",
    "name": "skyline college",
    "state": "ca",
    "zipcode": 94066,
    "date": "8/23/2017"
  },
  {
    "city": "greensboro",
    "name": "north carolina a & st univ",
    "state": "nc",
    "zipcode": "27411-0002",
    "date": "8/23/2017"
  },
  {
    "city": "plant city",
    "name": "hillsborough cmty coll pc",
    "state": "fl",
    "zipcode": "33563-1540",
    "date": "8/23/2017"
  },
  {
    "city": "edwardsville",
    "name": "so illinois u-edwardsville",
    "state": "il",
    "zipcode": "62026-0001",
    "date": "8/23/2017"
  },
  {
    "city": "cullowhee",
    "name": "western carolina university",
    "state": "nc",
    "zipcode": 28723,
    "date": "8/23/2017"
  },
  {
    "city": "saint cloud",
    "name": "saint cloud state univ",
    "state": "mn",
    "zipcode": 56301,
    "date": "8/23/2017"
  },
  {
    "city": "anchorage",
    "name": "univ of alaska - anchorage",
    "state": "ak",
    "zipcode": 99508,
    "date": "8/23/2017"
  },
  {
    "city": "muncie",
    "name": "ball state university",
    "state": "in",
    "zipcode": "47306-1022",
    "date": "8/23/2017"
  },
  {
    "city": "greeley",
    "name": "univ of northern colorado",
    "state": "co",
    "zipcode": 80639,
    "date": "8/23/2017"
  },
  {
    "city": "omaha",
    "name": "creighton university",
    "state": "ne",
    "zipcode": "68178-0001",
    "date": "8/23/2017"
  },
  {
    "city": "west columbia",
    "name": "midlands tech coll",
    "state": "sc",
    "zipcode": "29170-2176",
    "date": "8/23/2017"
  },
  {
    "city": "montgomery",
    "name": "alabama state university",
    "state": "al",
    "zipcode": "36104-5732",
    "date": "8/23/2017"
  },
  {
    "city": "coolidge",
    "name": "central arizona coll",
    "state": "az",
    "zipcode": 85128,
    "date": "8/23/2017"
  },
  {
    "city": "cumberland",
    "name": "allegany college of maryland",
    "state": "md",
    "zipcode": 215022596,
    "date": "8/23/2017"
  },
  {
    "city": "salt lake city",
    "name": "university of utah",
    "state": "ut",
    "zipcode": "84112-9156",
    "date": "8/23/2017"
  },
  {
    "city": "plainview",
    "name": "wayland baptist university",
    "state": "tx",
    "zipcode": 79072,
    "date": "8/23/2017"
  },
  {
    "city": "raleigh",
    "name": "wake technical comm coll",
    "state": "nc",
    "zipcode": "27603-5655",
    "date": "8/23/2017"
  },
  {
    "city": "madison",
    "name": "dakota state university",
    "state": "sd",
    "zipcode": 57042,
    "date": "8/23/2017"
  },
  {
    "city": "stillwater",
    "name": "oklahoma state university",
    "state": "ok",
    "zipcode": 74078,
    "date": "8/23/2017"
  },
  {
    "city": "indianapolis",
    "name": "iupui",
    "state": "in",
    "zipcode": 46202,
    "date": "8/23/2017"
  },
  {
    "city": "fort myers",
    "name": "florida gulf coast univ",
    "state": "fl",
    "zipcode": "33965-6565",
    "date": "8/23/2017"
  },
  {
    "city": "virginia beach",
    "name": "tidewater cc-virginia beach",
    "state": "va",
    "zipcode": "23453-1918",
    "date": "8/23/2017"
  },
  {
    "city": "tampa",
    "name": "hillsborough cc/admin",
    "state": "fl",
    "zipcode": 33606,
    "date": "8/23/2017"
  },
  {
    "city": "tucson",
    "name": "university of arizona",
    "state": "az",
    "zipcode": 85721,
    "date": "8/23/2017"
  },
  {
    "city": "denver",
    "name": "univ of colorado denver",
    "state": "co",
    "zipcode": 80202,
    "date": "8/23/2017"
  },
  {
    "city": "honolulu",
    "name": "kapiolani community college",
    "state": "hi",
    "zipcode": 96816,
    "date": "8/23/2017"
  },
  {
    "city": "minneapolis",
    "name": "minneapolis comm & tech coll",
    "state": "mn",
    "zipcode": "55403-1710",
    "date": "8/23/2017"
  },
  {
    "city": "bloomington",
    "name": "normandale cmty college",
    "state": "mn",
    "zipcode": 55431,
    "date": "8/23/2017"
  },
  {
    "city": "carrollton",
    "name": "west ga tech - carroll",
    "state": "ga",
    "zipcode": "30116-6476",
    "date": "8/23/2017"
  },
  {
    "city": "columbus",
    "name": "columbus tech",
    "state": "ga",
    "zipcode": "31904-6535",
    "date": "8/23/2017"
  },
  {
    "city": "muscle shoals",
    "name": "nw-shoals comm college-ms",
    "state": "al",
    "zipcode": 35661,
    "date": "8/23/2017"
  },
  {
    "city": "west haven",
    "name": "university of new haven",
    "state": "ct",
    "zipcode": "06516-1916",
    "date": "8/23/2017"
  },
  {
    "city": "lafayette",
    "name": "univ of louisiana - lafayette",
    "state": "la",
    "zipcode": 70506,
    "date": "8/23/2017"
  },
  {
    "city": "leesburg",
    "name": "beacon college",
    "state": "fl",
    "zipcode": 34748,
    "date": "8/23/2017"
  },
  {
    "city": "wichita falls",
    "name": "vernon college - wichita fall",
    "state": "tx",
    "zipcode": 76308,
    "date": "8/23/2017"
  },
  {
    "city": "mesquite",
    "name": "eastfield college",
    "state": "tx",
    "zipcode": 75150,
    "date": "8/23/2017"
  },
  {
    "city": "marietta",
    "name": "chattahoochee technical college",
    "state": "ga",
    "zipcode": 30066,
    "date": "8/23/2017"
  },
  {
    "city": "hammond",
    "name": "northshore tech cc - hammond",
    "state": "la",
    "zipcode": "70401-9501",
    "date": "8/23/2017"
  },
  {
    "city": "st george",
    "name": "dixie state university",
    "state": "ut",
    "zipcode": 84770,
    "date": "8/23/2017"
  },
  {
    "city": "phoenix",
    "name": "arizona state univ - downtown",
    "state": "az",
    "zipcode": 85004,
    "date": "8/23/2017"
  },
  {
    "city": "tucson",
    "name": "pima college downtown",
    "state": "az",
    "zipcode": 85709,
    "date": "8/23/2017"
  },
  {
    "city": "springfield",
    "name": "ozarks technical college",
    "state": "mo",
    "zipcode": "65802-3625",
    "date": "8/23/2017"
  },
  {
    "city": "mayville",
    "name": "mayville state university",
    "state": "nd",
    "zipcode": "58257-1217",
    "date": "8/23/2017"
  },
  {
    "city": "fresno",
    "name": "cal state u - fresno",
    "state": "ca",
    "zipcode": 93740,
    "date": "8/23/2017"
  },
  {
    "city": "university",
    "name": "university of mississippi",
    "state": "ms",
    "zipcode": 38677,
    "date": "8/23/2017"
  },
  {
    "city": "poplar bluff",
    "name": "three rivers cmty college",
    "state": "mo",
    "zipcode": 63901,
    "date": "8/23/2017"
  },
  {
    "city": "selma",
    "name": "wallace comm coll - selma",
    "state": "al",
    "zipcode": "36703-2867",
    "date": "8/23/2017"
  },
  {
    "city": "omaha",
    "name": "univ of nebraska - omaha",
    "state": "ne",
    "zipcode": "68182-2000",
    "date": "8/23/2017"
  },
  {
    "city": "sugar grove",
    "name": "waubonsee comm coll",
    "state": "il",
    "zipcode": 60554,
    "date": "8/23/2017"
  },
  {
    "city": "morehead",
    "name": "morehead state university",
    "state": "ky",
    "zipcode": 40351,
    "date": "8/23/2017"
  },
  {
    "city": "kansas city",
    "name": "univ missouri - kansas city",
    "state": "mo",
    "zipcode": "64110-2446",
    "date": "8/23/2017"
  },
  {
    "city": "chandler",
    "name": "chandler-gilbert cc - chandler",
    "state": "az",
    "zipcode": 85225,
    "date": "8/23/2017"
  },
  {
    "city": "athens",
    "name": "university of georgia",
    "state": "ga",
    "zipcode": 30602,
    "date": "8/23/2017"
  },
  {
    "city": "manhattan",
    "name": "kansas state university",
    "state": "ks",
    "zipcode": 66506,
    "date": "8/23/2017"
  },
  {
    "city": "bentonville",
    "name": "northwest arkansas cmty col",
    "state": "ar",
    "zipcode": 72712,
    "date": "8/23/2017"
  },
  {
    "city": "orlando",
    "name": "univ of central florida",
    "state": "fl",
    "zipcode": "32816-0001",
    "date": "8/23/2017"
  },
  {
    "city": "new port richey",
    "name": "pasco hernando st coll - npr",
    "state": "fl",
    "zipcode": 34654,
    "date": "8/23/2017"
  },
  {
    "city": "dallas",
    "name": "southern methodist univ",
    "state": "tx",
    "zipcode": 75205,
    "date": "8/23/2017"
  },
  {
    "city": "wahpeton",
    "name": "north dakota global online campus",
    "state": "nd",
    "zipcode": 58076,
    "date": "8/23/2017"
  },
  {
    "city": "clearwater",
    "name": "st petersburg coll-clearwater",
    "state": "fl",
    "zipcode": "33765-2816",
    "date": "8/23/2017"
  },
  {
    "city": "wilmington",
    "name": "cape fear community college",
    "state": "nc",
    "zipcode": "28401-3910",
    "date": "8/23/2017"
  },
  {
    "city": "colorado springs",
    "name": "univ colorado-colorado sprg",
    "state": "co",
    "zipcode": 80918,
    "date": "8/23/2017"
  },
  {
    "city": "wausau",
    "name": "north cntrl tech c-wausau",
    "state": "wi",
    "zipcode": "54401-1880",
    "date": "8/23/2017"
  },
  {
    "city": "university park",
    "name": "penn state univ-univ park",
    "state": "pa",
    "zipcode": 16802,
    "date": "8/23/2017"
  },
  {
    "city": "rock island",
    "name": "augustana college",
    "state": "il",
    "zipcode": 61201,
    "date": "8/23/2017"
  },
  {
    "city": "tulsa",
    "name": "university of tulsa",
    "state": "ok",
    "zipcode": 74104,
    "date": "8/23/2017"
  },
  {
    "city": "mankato",
    "name": "mankato state university",
    "state": "mn",
    "zipcode": 56001,
    "date": "8/23/2017"
  },
  {
    "city": "macon",
    "name": "central ga tech - macon",
    "state": "ga",
    "zipcode": "31206-3628",
    "date": "8/23/2017"
  },
  {
    "city": "dallas",
    "name": "gaston college",
    "state": "nc",
    "zipcode": "28034-1402",
    "date": "8/23/2017"
  },
  {
    "city": "prescott",
    "name": "yavapai college",
    "state": "az",
    "zipcode": 86301,
    "date": "8/23/2017"
  },
  {
    "city": "jacksonville",
    "name": "edward waters college",
    "state": "fl",
    "zipcode": "32209-6167",
    "date": "8/23/2017"
  },
  {
    "city": "altamonte springs",
    "name": "seminole state - altamonte spring",
    "state": "fl",
    "zipcode": 32714,
    "date": "8/23/2017"
  },
  {
    "city": "chico",
    "name": "cal state u - chico",
    "state": "ca",
    "zipcode": 95929,
    "date": "8/23/2017"
  },
  {
    "city": "oroville",
    "name": "butte college",
    "state": "ca",
    "zipcode": 95965,
    "date": "8/23/2017"
  },
  {
    "city": "pittsburg",
    "name": "los medanos college",
    "state": "ca",
    "zipcode": 94565,
    "date": "8/23/2017"
  },
  {
    "city": "conway",
    "name": "univ of sc - coastal carolina",
    "state": "sc",
    "zipcode": 29526,
    "date": "8/23/2017"
  },
  {
    "city": "south bend",
    "name": "ivy tech comm coll - south bend",
    "state": "in",
    "zipcode": "46601-3415",
    "date": "8/23/2017"
  },
  {
    "city": "tyler",
    "name": "tyler junior college",
    "state": "tx",
    "zipcode": 75701,
    "date": "8/23/2017"
  },
  {
    "city": "greensboro",
    "name": "univ of nc - greensboro",
    "state": "nc",
    "zipcode": 27403,
    "date": "8/23/2017"
  },
  {
    "city": "tucson",
    "name": "pima college-west campus",
    "state": "az",
    "zipcode": 85709,
    "date": "8/23/2017"
  },
  {
    "city": "melrose park",
    "name": "triton college",
    "state": "il",
    "zipcode": 60160,
    "date": "8/23/2017"
  },
  {
    "city": "savannah",
    "name": "armstrong state university",
    "state": "ga",
    "zipcode": 314191997,
    "date": "8/23/2017"
  },
  {
    "city": "portales",
    "name": "eastern nm univ - portales",
    "state": "nm",
    "zipcode": 88130,
    "date": "8/23/2017"
  },
  {
    "city": "linn",
    "name": "state tech coll of missouri",
    "state": "mo",
    "zipcode": 65051,
    "date": "8/23/2017"
  },
  {
    "city": "dallas",
    "name": "el centro college",
    "state": "tx",
    "zipcode": 75202,
    "date": "8/23/2017"
  },
  {
    "city": "deerfield",
    "name": "trinity international univ",
    "state": "il",
    "zipcode": "60015-1241",
    "date": "8/23/2017"
  },
  {
    "city": "brooksville",
    "name": "pasco-hernando st coll - north",
    "state": "fl",
    "zipcode": 34601,
    "date": "8/23/2017"
  },
  {
    "city": "coconut creek",
    "name": "broward coll-north",
    "state": "fl",
    "zipcode": "33066-1615",
    "date": "8/23/2017"
  },
  {
    "city": "poplarville",
    "name": "pearl river cc-poplarville",
    "state": "ms",
    "zipcode": "39470-2216",
    "date": "8/23/2017"
  },
  {
    "city": "conway",
    "name": "coastal carolina university",
    "state": "sc",
    "zipcode": "29526-8279",
    "date": "8/23/2017"
  },
  {
    "city": "keysville",
    "name": "vccs - southside va cc - daniel",
    "state": "va",
    "zipcode": "23947-3559",
    "date": "8/23/2017"
  },
  {
    "city": "berea",
    "name": "baldwin wallace college",
    "state": "oh",
    "zipcode": "44017-2005",
    "date": "8/23/2017"
  },
  {
    "city": "hickory",
    "name": "lenoir rhyne university",
    "state": "nc",
    "zipcode": 28601,
    "date": "8/23/2017"
  },
  {
    "city": "apache junction",
    "name": "central az coll - apache junct",
    "state": "az",
    "zipcode": 85119,
    "date": "8/23/2017"
  },
  {
    "city": "st louis",
    "name": "univ of missouri-st louis",
    "state": "mo",
    "zipcode": 63121,
    "date": "8/23/2017"
  },
  {
    "city": "corning",
    "name": "corning cmty coll",
    "state": "ny",
    "zipcode": "14830-3297",
    "date": "8/23/2017"
  },
  {
    "city": "visalia",
    "name": "college of the sequoias",
    "state": "ca",
    "zipcode": 93277,
    "date": "8/23/2017"
  },
  {
    "city": "providence",
    "name": "rhode island college",
    "state": "ri",
    "zipcode": 2908,
    "date": "8/23/2017"
  },
  {
    "city": "austin",
    "name": "austin c c - highland bus ctr",
    "state": "tx",
    "zipcode": 78752,
    "date": "8/23/2017"
  },
  {
    "city": "cicero",
    "name": "morton college",
    "state": "il",
    "zipcode": "60804-4300",
    "date": "8/23/2017"
  },
  {
    "city": "minot",
    "name": "minot state university",
    "state": "nd",
    "zipcode": "58707-0001",
    "date": "8/23/2017"
  },
  {
    "city": "lawrence",
    "name": "university of kansas",
    "state": "ks",
    "zipcode": 66045,
    "date": "8/23/2017"
  },
  {
    "city": "jacksonville",
    "name": "university of north florida",
    "state": "fl",
    "zipcode": "32224-7699",
    "date": "8/23/2017"
  },
  {
    "city": "saint louis",
    "name": "st louis cc - forest park",
    "state": "mo",
    "zipcode": "63110-1316",
    "date": "8/23/2017"
  },
  {
    "city": "greenwood",
    "name": "piedmont technical college",
    "state": "sc",
    "zipcode": "29648-1467",
    "date": "8/23/2017"
  },
  {
    "city": "elgin",
    "name": "elgin community college",
    "state": "il",
    "zipcode": "60123-7189",
    "date": "8/23/2017"
  },
  {
    "city": "greenville",
    "name": "greenville technical coll",
    "state": "sc",
    "zipcode": "29607-2418",
    "date": "8/23/2017"
  },
  {
    "city": "ada",
    "name": "east central university",
    "state": "ok",
    "zipcode": 74820,
    "date": "8/23/2017"
  },
  {
    "city": "mississippi stat",
    "name": "mississippi state univ",
    "state": "ms",
    "zipcode": 39762,
    "date": "8/23/2017"
  },
  {
    "city": "lafayette",
    "name": "ivy tech comm coll - lafayette",
    "state": "in",
    "zipcode": "47905-5241",
    "date": "8/23/2017"
  },
  {
    "city": "lake city",
    "name": "florida gateway college",
    "state": "fl",
    "zipcode": "32025-2006",
    "date": "8/23/2017"
  },
  {
    "city": "rocky mount",
    "name": "nash community college",
    "state": "nc",
    "zipcode": "27804-9708",
    "date": "8/23/2017"
  },
  {
    "city": "charleston",
    "name": "charleston southern univ",
    "state": "sc",
    "zipcode": "29406-9121",
    "date": "8/23/2017"
  },
  {
    "city": "belleville",
    "name": "southwestern illinois college",
    "state": "il",
    "zipcode": "62221-5859",
    "date": "8/23/2017"
  },
  {
    "city": "mesa",
    "name": "mesa community college",
    "state": "az",
    "zipcode": 85202,
    "date": "8/23/2017"
  },
  {
    "city": "westminster",
    "name": "front range c c - westminster",
    "state": "co",
    "zipcode": 80031,
    "date": "8/23/2017"
  },
  {
    "city": "dahlonega",
    "name": "univ of n georgia -dahlonega",
    "state": "ga",
    "zipcode": 30597,
    "date": "8/23/2017"
  },
  {
    "city": "lake charles",
    "name": "mcneese state university",
    "state": "la",
    "zipcode": "70609-0001",
    "date": "8/23/2017"
  },
  {
    "city": "north little rock",
    "name": "pulaski technical college",
    "state": "ar",
    "zipcode": "72118-3347",
    "date": "8/23/2017"
  },
  {
    "city": "crystal lake",
    "name": "mchenry county college",
    "state": "il",
    "zipcode": "60012-2738",
    "date": "8/23/2017"
  },
  {
    "city": "joplin",
    "name": "ozark christian college",
    "state": "mo",
    "zipcode": 64801,
    "date": "8/23/2017"
  },
  {
    "city": "gaffney",
    "name": "limestone college gaffney",
    "state": "sc",
    "zipcode": "29340-3778",
    "date": "8/23/2017"
  },
  {
    "city": "fredonia",
    "name": "state univ coll at fredonia",
    "state": "ny",
    "zipcode": "14063-1127",
    "date": "8/23/2017"
  },
  {
    "city": "vermillion",
    "name": "university of south dakota",
    "state": "sd",
    "zipcode": "57069-2307",
    "date": "8/23/2017"
  },
  {
    "city": "beaufort",
    "name": "tech coll of the low ctry",
    "state": "sc",
    "zipcode": "29902-5441",
    "date": "8/23/2017"
  },
  {
    "city": "saint petersburg",
    "name": "univ of south florida st petersburg",
    "state": "fl",
    "zipcode": "33701-5016",
    "date": "8/23/2017"
  },
  {
    "city": "scooba",
    "name": "east mississippi comm coll",
    "state": "ms",
    "zipcode": 39358,
    "date": "8/23/2017"
  },
  {
    "city": "cocoa",
    "name": "eastern fl st coll - cocoa",
    "state": "fl",
    "zipcode": "32922-6598",
    "date": "8/23/2017"
  },
  {
    "city": "new york",
    "name": "city college of cuny",
    "state": "ny",
    "zipcode": "10031-9101",
    "date": "8/23/2017"
  },
  {
    "city": "kearney",
    "name": "u of nebraska-kearney",
    "state": "ne",
    "zipcode": "68849-0001",
    "date": "8/23/2017"
  },
  {
    "city": "duluth",
    "name": "lake superior college",
    "state": "mn",
    "zipcode": "55811-3349",
    "date": "8/23/2017"
  },
  {
    "city": "wesley chapel",
    "name": "pasco hernando st coll - porter",
    "state": "fl",
    "zipcode": 33543,
    "date": "8/23/2017"
  },
  {
    "city": "san jacinto",
    "name": "mount san jacinto college",
    "state": "ca",
    "zipcode": 92583,
    "date": "8/23/2017"
  },
  {
    "city": "salisbury",
    "name": "rowan cabarrus comm coll",
    "state": "nc",
    "zipcode": "28146-8357",
    "date": "8/23/2017"
  },
  {
    "city": "charleston",
    "name": "college of charleston",
    "state": "sc",
    "zipcode": "29424-0001",
    "date": "8/23/2017"
  },
  {
    "city": "milledgeville",
    "name": "georgia coll & state univ",
    "state": "ga",
    "zipcode": 31061,
    "date": "8/23/2017"
  },
  {
    "city": "columbus",
    "name": "capital university",
    "state": "oh",
    "zipcode": 43209,
    "date": "8/23/2017"
  },
  {
    "city": "meridian",
    "name": "meridian cc",
    "state": "ms",
    "zipcode": "39307-5801",
    "date": "8/23/2017"
  },
  {
    "city": "albany",
    "name": "albany state university",
    "state": "ga",
    "zipcode": "31705-2717",
    "date": "8/23/2017"
  },
  {
    "city": "chicago",
    "name": "depaul university",
    "state": "il",
    "zipcode": "60614-3282",
    "date": "8/23/2017"
  },
  {
    "city": "san marcos",
    "name": "texas state univ - san marcos",
    "state": "tx",
    "zipcode": 78666,
    "date": "8/23/2017"
  },
  {
    "city": "wildwood",
    "name": "st louis comm coll - wildwood",
    "state": "mo",
    "zipcode": "63040-1168",
    "date": "8/23/2017"
  },
  {
    "city": "galesburg",
    "name": "carl sandburg coll-galesburg",
    "state": "il",
    "zipcode": "61401-9574",
    "date": "8/23/2017"
  },
  {
    "city": "senatobia",
    "name": "northwest miss comm coll",
    "state": "ms",
    "zipcode": "38668-1714",
    "date": "8/23/2017"
  },
  {
    "city": "fort wayne",
    "name": "in univ-purdue univ - ft wayne",
    "state": "in",
    "zipcode": 46805,
    "date": "8/23/2017"
  },
  {
    "city": "augusta",
    "name": "georgia regents univ",
    "state": "ga",
    "zipcode": "30904-4562",
    "date": "8/23/2017"
  },
  {
    "city": "albuquerque",
    "name": "univ of new mexico sch med",
    "state": "nm",
    "zipcode": 87131,
    "date": "8/23/2017"
  },
  {
    "city": "spruce pine",
    "name": "mayland community college",
    "state": "nc",
    "zipcode": "28777-8434",
    "date": "8/23/2017"
  },
  {
    "city": "tarpon springs",
    "name": "st petersburg coll-tarpon spg",
    "state": "fl",
    "zipcode": "34689-1299",
    "date": "8/23/2017"
  },
  {
    "city": "fredericksburg",
    "name": "university of mary washington",
    "state": "va",
    "zipcode": "22401-5300",
    "date": "8/23/2017"
  },
  {
    "city": "iowa city",
    "name": "university of iowa",
    "state": "ia",
    "zipcode": 52242,
    "date": "8/23/2017"
  },
  {
    "city": "booneville",
    "name": "northeast miss cc",
    "state": "ms",
    "zipcode": "38829-1726",
    "date": "8/23/2017"
  },
  {
    "city": "fargo",
    "name": "north dakota st university",
    "state": "nd",
    "zipcode": 58102,
    "date": "8/23/2017"
  },
  {
    "city": "high point",
    "name": "high point university",
    "state": "nc",
    "zipcode": "27262-4221",
    "date": "8/23/2017"
  },
  {
    "city": "hilo",
    "name": "univ of hawaii at hilo",
    "state": "hi",
    "zipcode": 967204091,
    "date": "8/23/2017"
  },
  {
    "city": "aurora",
    "name": "metropolitan st univ of denver",
    "state": "co",
    "zipcode": 80014,
    "date": "8/23/2017"
  },
  {
    "city": "tupelo",
    "name": "itawamba cc-tupelo",
    "state": "ms",
    "zipcode": "38804-5981",
    "date": "8/23/2017"
  },
  {
    "city": "oceanside",
    "name": "mira costa college",
    "state": "ca",
    "zipcode": 92056,
    "date": "8/23/2017"
  },
  {
    "city": "san diego",
    "name": "san diego miramar college",
    "state": "ca",
    "zipcode": 92126,
    "date": "8/23/2017"
  },
  {
    "city": "pembroke",
    "name": "univ of nc - pembroke",
    "state": "nc",
    "zipcode": 28372,
    "date": "8/23/2017"
  },
  {
    "city": "richland",
    "name": "wsu - tri cities",
    "state": "wa",
    "zipcode": "99354-1671",
    "date": "8/23/2017"
  },
  {
    "city": "kutztown",
    "name": "kutztown university",
    "state": "pa",
    "zipcode": 19530,
    "date": "8/23/2017"
  },
  {
    "city": "council bluffs",
    "name": "iowa wstn cc-council bluffs",
    "state": "ia",
    "zipcode": "51503-1057",
    "date": "8/23/2017"
  },
  {
    "city": "wilmington",
    "name": "univ of nc - wilmington",
    "state": "nc",
    "zipcode": "28403-3201",
    "date": "8/23/2017"
  },
  {
    "city": "hampden sydney",
    "name": "hampden-sydney college",
    "state": "va",
    "zipcode": 23943,
    "date": "8/23/2017"
  },
  {
    "city": "fort smith",
    "name": "ua fort smith",
    "state": "ar",
    "zipcode": 72904,
    "date": "8/23/2017"
  },
  {
    "city": "charleston",
    "name": "trident tech - palmer",
    "state": "sc",
    "zipcode": "29403-5637",
    "date": "8/23/2017"
  },
  {
    "city": "morgantown",
    "name": "west virginia university",
    "state": "wv",
    "zipcode": 26506,
    "date": "8/23/2017"
  },
  {
    "city": "lakeland",
    "name": "polk state coll - lakeland",
    "state": "fl",
    "zipcode": 33803,
    "date": "8/23/2017"
  },
  {
    "city": "east peoria",
    "name": "illinois central college",
    "state": "il",
    "zipcode": "61635-0001",
    "date": "8/23/2017"
  },
  {
    "city": "north las vegas",
    "name": "coll of s nv - cheyenne",
    "state": "nv",
    "zipcode": 89030,
    "date": "8/23/2017"
  },
  {
    "city": "winchester",
    "name": "shenandoah university",
    "state": "va",
    "zipcode": "22601-5100",
    "date": "8/23/2017"
  },
  {
    "city": "dover",
    "name": "del tech & cc - dover",
    "state": "de",
    "zipcode": "19904-1383",
    "date": "8/23/2017"
  },
  {
    "city": "dickinson",
    "name": "dickinson state univ",
    "state": "nd",
    "zipcode": "58601-4853",
    "date": "8/23/2017"
  },
  {
    "city": "st leo",
    "name": "saint leo university",
    "state": "fl",
    "zipcode": 33574,
    "date": "8/23/2017"
  },
  {
    "city": "carbondale",
    "name": "so illinois univ-carbondale",
    "state": "il",
    "zipcode": 62901,
    "date": "8/23/2017"
  },
  {
    "city": "columbus",
    "name": "ohio state univ - main",
    "state": "oh",
    "zipcode": 43210,
    "date": "8/23/2017"
  },
  {
    "city": "weatherford",
    "name": "southwestern okla state unv",
    "state": "ok",
    "zipcode": 73096,
    "date": "8/23/2017"
  },
  {
    "city": "los lunas",
    "name": "unm-valencia",
    "state": "nm",
    "zipcode": 87031,
    "date": "8/23/2017"
  },
  {
    "city": "south bend",
    "name": "indiana univ - south bend",
    "state": "in",
    "zipcode": "46615-1408",
    "date": "8/23/2017"
  },
  {
    "city": "fort collins",
    "name": "colorado st univ - ft collins",
    "state": "co",
    "zipcode": 80523,
    "date": "8/23/2017"
  },
  {
    "city": "springfield",
    "name": "lincoln land cmty college",
    "state": "il",
    "zipcode": "62794-9256",
    "date": "8/23/2017"
  },
  {
    "city": "crookston",
    "name": "university of minnesota - crookston",
    "state": "mn",
    "zipcode": "56716-5000",
    "date": "8/23/2017"
  },
  {
    "city": "hays",
    "name": "fort hays state university",
    "state": "ks",
    "zipcode": "67601-4009",
    "date": "8/23/2017"
  },
  {
    "city": "tallahassee",
    "name": "tallahassee community colle",
    "state": "fl",
    "zipcode": "32304-2815",
    "date": "8/23/2017"
  },
  {
    "city": "farmville",
    "name": "longwood university",
    "state": "va",
    "zipcode": 23909,
    "date": "8/23/2017"
  },
  {
    "city": "tampa",
    "name": "hillsborough cmty coll dm",
    "state": "fl",
    "zipcode": "33614-7810",
    "date": "8/23/2017"
  },
  {
    "city": "arlington",
    "name": "univ of texas - arlington",
    "state": "tx",
    "zipcode": 76019,
    "date": "8/23/2017"
  },
  {
    "city": "aurora",
    "name": "community coll of aurora",
    "state": "co",
    "zipcode": 80011,
    "date": "8/23/2017"
  },
  {
    "city": "dayton",
    "name": "sinclair community college",
    "state": "oh",
    "zipcode": "45402-1421",
    "date": "8/23/2017"
  },
  {
    "city": "atlanta",
    "name": "atlanta metro college",
    "state": "ga",
    "zipcode": "30310-4448",
    "date": "8/23/2017"
  },
  {
    "city": "naples",
    "name": "southwest florida college",
    "state": "fl",
    "zipcode": 33962,
    "date": "8/23/2017"
  },
  {
    "city": "lawrenceburg",
    "name": "ivy tech comm coll - lawrenceb",
    "state": "in",
    "zipcode": 47025,
    "date": "8/23/2017"
  },
  {
    "city": "gary",
    "name": "indiana univ northwest",
    "state": "in",
    "zipcode": "46408-1101",
    "date": "8/23/2017"
  },
  {
    "city": "hartford",
    "name": "connecticut state colleges & universities",
    "state": "ct",
    "zipcode": 6105,
    "date": "8/23/2017"
  },
  {
    "city": "palatka",
    "name": "st johns river st coll - palatka",
    "state": "fl",
    "zipcode": "32177-3807",
    "date": "8/23/2017"
  },
  {
    "city": "grand forks",
    "name": "university of north dakota",
    "state": "nd",
    "zipcode": 58202,
    "date": "8/23/2017"
  },
  {
    "city": "overland park",
    "name": "johnson county cmty college",
    "state": "ks",
    "zipcode": 66210,
    "date": "8/23/2017"
  },
  {
    "city": "middletown",
    "name": "lord fairfax cc - middletown",
    "state": "va",
    "zipcode": "22645-1745",
    "date": "8/23/2017"
  },
  {
    "city": "athens",
    "name": "ohio university - athens",
    "state": "oh",
    "zipcode": 45701,
    "date": "8/23/2017"
  },
  {
    "city": "savannah",
    "name": "savannah state university",
    "state": "ga",
    "zipcode": "31404-5254",
    "date": "8/23/2017"
  },
  {
    "city": "san jose",
    "name": "san jose state university",
    "state": "ca",
    "zipcode": 95192,
    "date": "8/23/2017"
  },
  {
    "city": "detroit",
    "name": "wayne state university",
    "state": "mi",
    "zipcode": 48202,
    "date": "8/23/2017"
  },
  {
    "city": "bettendorf",
    "name": "scott comm coll",
    "state": "ia",
    "zipcode": "52722-5649",
    "date": "8/23/2017"
  },
  {
    "city": "rochester",
    "name": "rochester comm & tech coll",
    "state": "mn",
    "zipcode": "55904-4915",
    "date": "8/23/2017"
  },
  {
    "city": "laredo",
    "name": "texas a & m international u",
    "state": "tx",
    "zipcode": 78041,
    "date": "8/23/2017"
  },
  {
    "city": "new albany",
    "name": "indiana univ-southeast cmp",
    "state": "in",
    "zipcode": "47150-2158",
    "date": "8/23/2017"
  },
  {
    "city": "knoxville",
    "name": "university of tennessee",
    "state": "tn",
    "zipcode": "37996-0341",
    "date": "8/23/2017"
  },
  {
    "city": "smithfield",
    "name": "johnston community college",
    "state": "nc",
    "zipcode": "27577-2350",
    "date": "8/23/2017"
  },
  {
    "city": "denton",
    "name": "texas womans university",
    "state": "tx",
    "zipcode": 76204,
    "date": "8/23/2017"
  },
  {
    "city": "yuma",
    "name": "arizona western college",
    "state": "az",
    "zipcode": 85365,
    "date": "8/23/2017"
  },
  {
    "city": "arcata",
    "name": "humboldt state university",
    "state": "ca",
    "zipcode": 95521,
    "date": "8/23/2017"
  },
  {
    "city": "west columbia",
    "name": "midlands tech c-airport",
    "state": "sc",
    "zipcode": "29170-2176",
    "date": "8/23/2017"
  },
  {
    "city": "adrian",
    "name": "adrian college",
    "state": "mi",
    "zipcode": "49221-2518",
    "date": "8/23/2017"
  },
  {
    "city": "mc kenzie",
    "name": "bethel univ - mckenzie",
    "state": "tn",
    "zipcode": "38201-1769",
    "date": "8/23/2017"
  },
  {
    "city": "oglesby",
    "name": "ill valley comm coll",
    "state": "il",
    "zipcode": "61348-9692",
    "date": "8/23/2017"
  },
  {
    "city": "philadelphia",
    "name": "la salle university",
    "state": "pa",
    "zipcode": "19141-1108",
    "date": "8/23/2017"
  },
  {
    "city": "pleasanton",
    "name": "chabot-las positas cc",
    "state": "ca",
    "zipcode": 94588,
    "date": "8/23/2017"
  },
  {
    "city": "nelsonville",
    "name": "hocking college",
    "state": "oh",
    "zipcode": "45764-9582",
    "date": "8/23/2017"
  },
  {
    "city": "shalimar",
    "name": "univ of florida-gainesville",
    "state": "fl",
    "zipcode": "32579-1163",
    "date": "8/23/2017"
  },
  {
    "city": "palos hills",
    "name": "moraine valley cmty coll",
    "state": "il",
    "zipcode": "60465-1444",
    "date": "8/23/2017"
  },
  {
    "city": "fredericksburg",
    "name": "germanna comm coll",
    "state": "va",
    "zipcode": 22408,
    "date": "8/23/2017"
  },
  {
    "city": "newark",
    "name": "del tech stanton/newark",
    "state": "de",
    "zipcode": "19713-2111",
    "date": "8/23/2017"
  },
  {
    "city": "las vegas",
    "name": "new mexico highlands univ",
    "state": "nm",
    "zipcode": 87701,
    "date": "8/23/2017"
  },
  {
    "city": "white bear lake",
    "name": "century comm tech college",
    "state": "mn",
    "zipcode": "55110-1842",
    "date": "8/23/2017"
  },
  {
    "city": "richmond",
    "name": "indiana univ east",
    "state": "in",
    "zipcode": "47374-1220",
    "date": "8/23/2017"
  },
  {
    "city": "roswell",
    "name": "eastern nm univ - roswell",
    "state": "nm",
    "zipcode": 88201,
    "date": "8/23/2017"
  },
  {
    "city": "salt lake city",
    "name": "salt lake community college",
    "state": "ut",
    "zipcode": 84123,
    "date": "8/23/2017"
  },
  {
    "city": "perrysburg",
    "name": "owens community college",
    "state": "oh",
    "zipcode": 43551,
    "date": "8/23/2017"
  },
  {
    "city": "joliet",
    "name": "joliet junior college",
    "state": "il",
    "zipcode": "60431-8938",
    "date": "8/23/2017"
  },
  {
    "city": "tucson",
    "name": "pima cc - comm campus",
    "state": "az",
    "zipcode": 857096000,
    "date": "8/23/2017"
  },
  {
    "city": "universal city",
    "name": "accd - ne lakeview campus",
    "state": "tx",
    "zipcode": 78148,
    "date": "8/23/2017"
  },
  {
    "city": "lancaster",
    "name": "univ of sc - lancaster",
    "state": "sc",
    "zipcode": "29720-5615",
    "date": "8/23/2017"
  },
  {
    "city": "morganton",
    "name": "western piedmont cc",
    "state": "nc",
    "zipcode": "28655-4504",
    "date": "8/23/2017"
  },
  {
    "city": "tuscaloosa",
    "name": "shelton state cc",
    "state": "al",
    "zipcode": "35405-8522",
    "date": "8/23/2017"
  },
  {
    "city": "monterey park",
    "name": "east los angeles coll - mp",
    "state": "ca",
    "zipcode": 91754,
    "date": "2/10/2015"
  },
  {
    "city": "worcester",
    "name": "worcester state university",
    "state": "ma",
    "zipcode": "01602-2861",
    "date": "2/10/2015"
  },
  {
    "city": "boulder",
    "name": "univ of colorado boulder",
    "state": "co",
    "zipcode": 80309,
    "date": "2/10/2015"
  },
  {
    "city": "pasadena",
    "name": "pasadena city college",
    "state": "ca",
    "zipcode": 91106,
    "date": "2/10/2015"
  },
  {
    "city": "toledo",
    "name": "university of toledo",
    "state": "oh",
    "zipcode": "43606-3328",
    "date": "2/10/2015"
  },
  {
    "city": "edison",
    "name": "middlesex cnty coll-edison",
    "state": "nj",
    "zipcode": 8818,
    "date": "2/10/2015"
  },
  {
    "city": "bronx",
    "name": "bronx community college",
    "state": "ny",
    "zipcode": "10453-2804",
    "date": "2/10/2015"
  },
  {
    "city": "beeville",
    "name": "coastal bend college",
    "state": "tx",
    "zipcode": 78102,
    "date": "2/10/2015"
  },
  {
    "city": "tulsa",
    "name": "tulsa comm coll se",
    "state": "ok",
    "zipcode": 74133,
    "date": "2/10/2015"
  },
  {
    "city": "college station",
    "name": "texas a & m univ - college stn",
    "state": "tx",
    "zipcode": 77843,
    "date": "2/10/2015"
  },
  {
    "city": "college park",
    "name": "univ maryland college park",
    "state": "md",
    "zipcode": 20742,
    "date": "2/10/2015"
  },
  {
    "city": "huntington beach",
    "name": "golden west college",
    "state": "ca",
    "zipcode": 92647,
    "date": "2/10/2015"
  },
  {
    "city": "warwick",
    "name": "cmty coll of r i-warwick",
    "state": "ri",
    "zipcode": "02886-1805",
    "date": "2/10/2015"
  },
  {
    "city": "palm desert",
    "name": "college of the desert",
    "state": "ca",
    "zipcode": 92260,
    "date": "2/10/2015"
  },
  {
    "city": "rochester",
    "name": "rochester inst of tech",
    "state": "ny",
    "zipcode": "14623-5603",
    "date": "2/10/2015"
  },
  {
    "city": "valencia",
    "name": "college of the canyons",
    "state": "ca",
    "zipcode": 91355,
    "date": "2/10/2015"
  },
  {
    "city": "rockville",
    "name": "montgomery coll-rockville",
    "state": "md",
    "zipcode": "20855-2811",
    "date": "2/10/2015"
  },
  {
    "city": "york",
    "name": "hacc york",
    "state": "pa",
    "zipcode": 17404,
    "date": "2/10/2015"
  },
  {
    "city": "houston",
    "name": "univ of houston-downtown",
    "state": "tx",
    "zipcode": 77002,
    "date": "2/10/2015"
  },
  {
    "city": "austin",
    "name": "univ of texas - austin",
    "state": "tx",
    "zipcode": 78712,
    "date": "2/10/2015"
  },
  {
    "city": "baltimore",
    "name": "maryland inst coll of art",
    "state": "md",
    "zipcode": "21217-4134",
    "date": "2/10/2015"
  },
  {
    "city": "saint petersburg",
    "name": "st petersburg coll-st pete/gib",
    "state": "fl",
    "zipcode": "33710-6801",
    "date": "2/10/2015"
  },
  {
    "city": "san diego",
    "name": "san diego state university",
    "state": "ca",
    "zipcode": 92182,
    "date": "2/10/2015"
  },
  {
    "city": "san diego",
    "name": "san diego mesa college",
    "state": "ca",
    "zipcode": 92111,
    "date": "2/11/2015"
  },
  {
    "city": "irvine",
    "name": "irvine valley college",
    "state": "ca",
    "zipcode": 92618,
    "date": "2/11/2015"
  },
  {
    "city": "menifee",
    "name": "mt san jacinto coll - menifee",
    "state": "ca",
    "zipcode": 92584,
    "date": "2/11/2015"
  },
  {
    "city": "san marcos",
    "name": "palomar college",
    "state": "ca",
    "zipcode": 92069,
    "date": "2/11/2015"
  },
  {
    "city": "new york",
    "name": "new york university",
    "state": "ny",
    "zipcode": 10012,
    "date": "2/11/2015"
  },
  {
    "city": "oregon city",
    "name": "clackamas community college",
    "state": "or",
    "zipcode": 97045,
    "date": "2/11/2015"
  },
  {
    "city": "baltimore",
    "name": "university of maryland-baltimore cty",
    "state": "md",
    "zipcode": "21250-0001",
    "date": "2/11/2015"
  },
  {
    "city": "alice",
    "name": "coastal bend coll/alice cmp",
    "state": "tx",
    "zipcode": 78332,
    "date": "2/11/2015"
  },
  {
    "city": "portsmouth",
    "name": "tidewater cc-portsmouth",
    "state": "va",
    "zipcode": 23701,
    "date": "2/11/2015"
  },
  {
    "city": "flagstaff",
    "name": "northern arizona university",
    "state": "az",
    "zipcode": 86011,
    "date": "2/11/2015"
  },
  {
    "city": "holyoke",
    "name": "holyoke comm coll",
    "state": "ma",
    "zipcode": "01040-1091",
    "date": "2/11/2015"
  },
  {
    "city": "paramus",
    "name": "bergen community college",
    "state": "nj",
    "zipcode": "07652-1508",
    "date": "2/11/2015"
  },
  {
    "city": "nashville",
    "name": "lipscomb university",
    "state": "tn",
    "zipcode": 37204,
    "date": "2/11/2015"
  },
  {
    "city": "trinidad",
    "name": "trinidad state jr college",
    "state": "co",
    "zipcode": 81082,
    "date": "2/11/2015"
  },
  {
    "city": "millersville",
    "name": "millersville university",
    "state": "pa",
    "zipcode": 17551,
    "date": "2/11/2015"
  },
  {
    "city": "indianapolis",
    "name": "ivy tech comm coll - central",
    "state": "in",
    "zipcode": "46208-5752",
    "date": "2/11/2015"
  },
  {
    "city": "burlington",
    "name": "univ of vermont",
    "state": "vt",
    "zipcode": "05405-0001",
    "date": "2/11/2015"
  },
  {
    "city": "lynnwood",
    "name": "edmonds cmty coll-lynnwood",
    "state": "wa",
    "zipcode": 98036,
    "date": "2/11/2015"
  },
  {
    "city": "teaneck",
    "name": "fdu teaneck",
    "state": "nj",
    "zipcode": 7666,
    "date": "2/11/2015"
  },
  {
    "city": "carrollton",
    "name": "univ of west ga - carrollton",
    "state": "ga",
    "zipcode": "30118-0001",
    "date": "2/11/2015"
  },
  {
    "city": "des plaines",
    "name": "oakton community college",
    "state": "il",
    "zipcode": "60016-1234",
    "date": "2/11/2015"
  },
  {
    "city": "reedley",
    "name": "reedley clg",
    "state": "ca",
    "zipcode": 93654,
    "date": "2/11/2015"
  },
  {
    "city": "sweet briar",
    "name": "sweet briar college",
    "state": "va",
    "zipcode": "24595-5001",
    "date": "2/11/2015"
  },
  {
    "city": "ypsilanti",
    "name": "eastern michigan univ",
    "state": "mi",
    "zipcode": 48197,
    "date": "2/11/2015"
  },
  {
    "city": "terre haute",
    "name": "indiana state university",
    "state": "in",
    "zipcode": "47809-1902",
    "date": "2/11/2015"
  },
  {
    "city": "saint petersburg",
    "name": "eckerd college",
    "state": "fl",
    "zipcode": "33711-4744",
    "date": "2/11/2015"
  },
  {
    "city": "albany",
    "name": "university at albany",
    "state": "ny",
    "zipcode": "12222-0001",
    "date": "2/11/2015"
  },
  {
    "city": "cincinnati",
    "name": "xavier university",
    "state": "oh",
    "zipcode": "45207-1035",
    "date": "2/11/2015"
  },
  {
    "city": "spearfish",
    "name": "black hills state univ",
    "state": "sd",
    "zipcode": "57799-8840",
    "date": "2/11/2015"
  },
  {
    "city": "tucson",
    "name": "pima comm coll/desert vista",
    "state": "az",
    "zipcode": 857096000,
    "date": "2/11/2015"
  },
  {
    "city": "dearborn",
    "name": "univ of michigan-dearborn",
    "state": "mi",
    "zipcode": "48128-2406",
    "date": "2/11/2015"
  },
  {
    "city": "casper",
    "name": "university of wyoming",
    "state": "wy",
    "zipcode": 82601,
    "date": "2/11/2015"
  },
  {
    "city": "dekalb",
    "name": "northern illinois univ",
    "state": "il",
    "zipcode": 60115,
    "date": "2/11/2015"
  },
  {
    "city": "norfolk",
    "name": "tidewater comm coll/norfolk",
    "state": "va",
    "zipcode": "23510-1910",
    "date": "2/11/2015"
  },
  {
    "city": "valley glen",
    "name": "los angeles valley college",
    "state": "ca",
    "zipcode": 914014096,
    "date": "2/11/2015"
  },
  {
    "city": "worcester",
    "name": "clark university",
    "state": "ma",
    "zipcode": 1610,
    "date": "2/11/2015"
  },
  {
    "city": "cheney",
    "name": "eastern washington univ",
    "state": "wa",
    "zipcode": 99004,
    "date": "2/12/2015"
  },
  {
    "city": "avon park",
    "name": "south florida state coll",
    "state": "fl",
    "zipcode": 33825,
    "date": "2/12/2015"
  },
  {
    "city": "west barnstable",
    "name": "cape cod comm coll",
    "state": "ma",
    "zipcode": "02668-1532",
    "date": "2/12/2015"
  },
  {
    "city": "russellville",
    "name": "arkansas tech university",
    "state": "ar",
    "zipcode": 72801,
    "date": "2/12/2015"
  },
  {
    "city": "chesapeake",
    "name": "tidewater cc-chesapeake",
    "state": "va",
    "zipcode": "23322-7108",
    "date": "2/12/2015"
  },
  {
    "city": "irving",
    "name": "univ of dallas",
    "state": "tx",
    "zipcode": 75062,
    "date": "2/12/2015"
  },
  {
    "city": "norfolk",
    "name": "george washington univ",
    "state": "va",
    "zipcode": 23502,
    "date": "2/12/2015"
  },
  {
    "city": "glendale",
    "name": "arizona state univ - west",
    "state": "az",
    "zipcode": "85306-4908",
    "date": "2/12/2015"
  },
  {
    "city": "poughkeepsie",
    "name": "marist college",
    "state": "ny",
    "zipcode": "12601-1350",
    "date": "2/12/2015"
  },
  {
    "city": "kalamazoo",
    "name": "western michigan univ",
    "state": "mi",
    "zipcode": 49008,
    "date": "2/12/2015"
  },
  {
    "city": "delhi",
    "name": "suny - delhi",
    "state": "ny",
    "zipcode": 13753,
    "date": "2/12/2015"
  },
  {
    "city": "schuylkill haven",
    "name": "penn state u schuylkill",
    "state": "pa",
    "zipcode": "17972-2202",
    "date": "2/12/2015"
  },
  {
    "city": "marion",
    "name": "marion technical college",
    "state": "oh",
    "zipcode": 43302,
    "date": "2/12/2015"
  },
  {
    "city": "cedar city",
    "name": "southern utah university",
    "state": "ut",
    "zipcode": 84720,
    "date": "2/12/2015"
  },
  {
    "city": "oakland",
    "name": "laney college",
    "state": "ca",
    "zipcode": 94607,
    "date": "2/12/2015"
  },
  {
    "city": "long beach",
    "name": "long beach city college - a",
    "state": "ca",
    "zipcode": 90808,
    "date": "2/12/2015"
  },
  {
    "city": "clarinda",
    "name": "iowa western cc-clarinda",
    "state": "ia",
    "zipcode": 51632,
    "date": "2/12/2015"
  },
  {
    "city": "honolulu",
    "name": "hawaii pacific university",
    "state": "hi",
    "zipcode": 96813,
    "date": "2/12/2015"
  },
  {
    "city": "milwaukee",
    "name": "univ of wisconsin - milwaukee",
    "state": "wi",
    "zipcode": 53211,
    "date": "2/12/2015"
  },
  {
    "city": "torrance",
    "name": "el camino college",
    "state": "ca",
    "zipcode": 90506,
    "date": "2/13/2015"
  },
  {
    "city": "chicago",
    "name": "univ of illinois at chicago",
    "state": "il",
    "zipcode": "60607-7100",
    "date": "2/13/2015"
  },
  {
    "city": "new orleans",
    "name": "university of new orleans",
    "state": "la",
    "zipcode": "70148-0001",
    "date": "2/13/2015"
  },
  {
    "city": "malta",
    "name": "kishwaukee community coll",
    "state": "il",
    "zipcode": 60150,
    "date": "2/13/2015"
  },
  {
    "city": "honolulu",
    "name": "chaminade university",
    "state": "hi",
    "zipcode": 96816,
    "date": "2/13/2015"
  },
  {
    "city": "new york",
    "name": "cuny hunter college",
    "state": "ny",
    "zipcode": 10021,
    "date": "2/13/2015"
  },
  {
    "city": "canton",
    "name": "walsh university",
    "state": "oh",
    "zipcode": "44720-3336",
    "date": "2/13/2015"
  },
  {
    "city": "commerce",
    "name": "texas a & m univ - commerce",
    "state": "tx",
    "zipcode": 75428,
    "date": "2/13/2015"
  },
  {
    "city": "blacksburg",
    "name": "virginia tech",
    "state": "va",
    "zipcode": 24061,
    "date": "2/13/2015"
  },
  {
    "city": "denver",
    "name": "community college of denver",
    "state": "co",
    "zipcode": 80204,
    "date": "2/14/2015"
  },
  {
    "city": "kingsville",
    "name": "coastal bend college-kingsvill",
    "state": "tx",
    "zipcode": 78363,
    "date": "2/14/2015"
  },
  {
    "city": "seminole",
    "name": "st petersburg coll - seminole",
    "state": "fl",
    "zipcode": "33772-2800",
    "date": "2/14/2015"
  },
  {
    "city": "hayward",
    "name": "chabot college",
    "state": "ca",
    "zipcode": 94545,
    "date": "2/15/2015"
  },
  {
    "city": "watertown",
    "name": "jefferson community college",
    "state": "ny",
    "zipcode": "13601-1822",
    "date": "2/15/2015"
  },
  {
    "city": "university center",
    "name": "saginaw valley state univ",
    "state": "mi",
    "zipcode": "48710-0001",
    "date": "2/15/2015"
  },
  {
    "city": "louisville",
    "name": "kctcs-jefferson-downtown",
    "state": "ky",
    "zipcode": "40202-2005",
    "date": "2/16/2015"
  },
  {
    "city": "logan",
    "name": "utah state university",
    "state": "ut",
    "zipcode": 84322,
    "date": "2/16/2015"
  },
  {
    "city": "battle creek",
    "name": "kellogg community college",
    "state": "mi",
    "zipcode": "49017-3306",
    "date": "2/16/2015"
  },
  {
    "city": "saddle river",
    "name": "prentice hall university",
    "state": "nj",
    "zipcode": "07458-1813",
    "date": "2/16/2015"
  },
  {
    "city": "portland",
    "name": "portland cc-cascade",
    "state": "or",
    "zipcode": 97217,
    "date": "2/16/2015"
  },
  {
    "city": "tallahassee",
    "name": "florida state university",
    "state": "fl",
    "zipcode": 32306,
    "date": "2/16/2015"
  },
  {
    "city": "glendale",
    "name": "glendale community college",
    "state": "ca",
    "zipcode": 91208,
    "date": "2/16/2015"
  },
  {
    "city": "sioux falls",
    "name": "university of sioux falls",
    "state": "sd",
    "zipcode": 57105,
    "date": "2/17/2015"
  },
  {
    "city": "montclair",
    "name": "montclair state university",
    "state": "nj",
    "zipcode": "07043-1624",
    "date": "2/17/2015"
  },
  {
    "city": "bellingham",
    "name": "western washington univ",
    "state": "wa",
    "zipcode": 98225,
    "date": "2/17/2015"
  },
  {
    "city": "columbus",
    "name": "columbus state university",
    "state": "ga",
    "zipcode": "31907-5679",
    "date": "2/17/2015"
  },
  {
    "city": "valhalla",
    "name": "westchester cmty college",
    "state": "ny",
    "zipcode": "10595-1550",
    "date": "2/17/2015"
  },
  {
    "city": "bristol",
    "name": "roger williams university",
    "state": "ri",
    "zipcode": "02809-2923",
    "date": "2/17/2015"
  },
  {
    "city": "orange",
    "name": "chapman univ-orange",
    "state": "ca",
    "zipcode": 92866,
    "date": "2/17/2015"
  },
  {
    "city": "tallahassee",
    "name": "florida agric & mech univ",
    "state": "fl",
    "zipcode": 32307,
    "date": "2/17/2015"
  },
  {
    "city": "las vegas",
    "name": "univ of nevada las vegas",
    "state": "nv",
    "zipcode": 89154,
    "date": "2/18/2015"
  },
  {
    "city": "bellevue",
    "name": "bellevue university",
    "state": "ne",
    "zipcode": "68005-3058",
    "date": "2/18/2015"
  },
  {
    "city": "norfolk",
    "name": "old dominion university",
    "state": "va",
    "zipcode": "23529-0001",
    "date": "2/19/2015"
  },
  {
    "city": "big rapids",
    "name": "ferris state university",
    "state": "mi",
    "zipcode": "49307-2251",
    "date": "2/19/2015"
  },
  {
    "city": "riverside",
    "name": "riverside city college",
    "state": "ca",
    "zipcode": 92506,
    "date": "2/19/2015"
  },
  {
    "city": "memphis",
    "name": "university of memphis",
    "state": "tn",
    "zipcode": "38152-0001",
    "date": "2/19/2015"
  },
  {
    "city": "medford",
    "name": "delta college",
    "state": "or",
    "zipcode": 97504,
    "date": "2/19/2015"
  },
  {
    "city": "portland",
    "name": "portland cmty coll sylvania",
    "state": "or",
    "zipcode": 97219,
    "date": "2/19/2015"
  },
  {
    "city": "norco",
    "name": "norco college",
    "state": "ca",
    "zipcode": "92860-2600",
    "date": "2/19/2015"
  },
  {
    "city": "los angeles",
    "name": "los angeles city college",
    "state": "ca",
    "zipcode": 90029,
    "date": "2/19/2015"
  },
  {
    "city": "wheeling",
    "name": "wheeling jesuit university",
    "state": "wv",
    "zipcode": 26003,
    "date": "2/20/2015"
  },
  {
    "city": "boaz",
    "name": "snead state comm college",
    "state": "al",
    "zipcode": "35957-1650",
    "date": "2/20/2015"
  },
  {
    "city": "moreno valley",
    "name": "moreno valley college",
    "state": "ca",
    "zipcode": "92551-2045",
    "date": "2/20/2015"
  },
  {
    "city": "ft wayne",
    "name": "univeristy of st francis",
    "state": "in",
    "zipcode": 46807,
    "date": "2/21/2015"
  },
  {
    "city": "bayside",
    "name": "queensborough cc of cuny",
    "state": "ny",
    "zipcode": 11364,
    "date": "2/22/2015"
  },
  {
    "city": "new york",
    "name": "fashion institute of tech",
    "state": "ny",
    "zipcode": 10001,
    "date": "2/22/2015"
  },
  {
    "city": "rockford",
    "name": "rock valley college",
    "state": "il",
    "zipcode": "61114-5640",
    "date": "2/22/2015"
  },
  {
    "city": "tucson",
    "name": "pima cc northwest",
    "state": "az",
    "zipcode": 85709,
    "date": "2/23/2015"
  },
  {
    "city": "walnut",
    "name": "mount san antonio college",
    "state": "ca",
    "zipcode": 91789,
    "date": "2/23/2015"
  },
  {
    "city": "villanova",
    "name": "villanova university",
    "state": "pa",
    "zipcode": "19085-1603",
    "date": "2/23/2015"
  },
  {
    "city": "pearl city",
    "name": "leeward community college",
    "state": "hi",
    "zipcode": 96782,
    "date": "2/24/2015"
  },
  {
    "city": "forest grove",
    "name": "pacific university",
    "state": "or",
    "zipcode": 97116,
    "date": "2/24/2015"
  },
  {
    "city": "oakdale",
    "name": "dowling college",
    "state": "ny",
    "zipcode": "11769-1906",
    "date": "2/24/2015"
  },
  {
    "city": "edinburg",
    "name": "univ of texas - pan american",
    "state": "tx",
    "zipcode": 785412999,
    "date": "2/25/2015"
  },
  {
    "city": "santa rosa",
    "name": "santa rosa junior college",
    "state": "ca",
    "zipcode": 95401,
    "date": "2/25/2015"
  },
  {
    "city": "nacogdoches",
    "name": "stephen f austin state univ",
    "state": "tx",
    "zipcode": 75961,
    "date": "2/25/2015"
  },
  {
    "city": "rohnert park",
    "name": "sonoma state university",
    "state": "ca",
    "zipcode": 94928,
    "date": "2/26/2015"
  },
  {
    "city": "valparaiso",
    "name": "valparaiso university",
    "state": "in",
    "zipcode": 46383,
    "date": "2/27/2015"
  },
  {
    "city": "columbus",
    "name": "sales associates",
    "state": "oh",
    "zipcode": 43235,
    "date": "3/1/2015"
  },
  {
    "city": "santa monica",
    "name": "santa monica college",
    "state": "ca",
    "zipcode": 90405,
    "date": "3/4/2015"
  },
  {
    "city": "west plains",
    "name": "missouri st u-west plain",
    "state": "mo",
    "zipcode": "65775-2715",
    "date": "3/4/2015"
  },
  {
    "city": "san francisco",
    "name": "golden gate univ-san francisco",
    "state": "ca",
    "zipcode": 94105,
    "date": "3/4/2015"
  },
  {
    "city": "petaluma",
    "name": "santa rosa jr college",
    "state": "ca",
    "zipcode": 94954,
    "date": "3/4/2015"
  },
  {
    "city": "chicago",
    "name": "loyola - chicago",
    "state": "il",
    "zipcode": 60660,
    "date": "3/5/2015"
  },
  {
    "city": "naples",
    "name": "fl southwestern st coll - naples",
    "state": "fl",
    "zipcode": "34113-8976",
    "date": "3/6/2015"
  },
  {
    "city": "batavia",
    "name": "genesee cc batavia",
    "state": "ny",
    "zipcode": 14020,
    "date": "3/8/2015"
  },
  {
    "city": "scottsdale",
    "name": "scottsdale cmty college",
    "state": "az",
    "zipcode": 85256,
    "date": "3/10/2015"
  },
  {
    "city": "grants",
    "name": "new mexico st u-grants",
    "state": "nm",
    "zipcode": 87020,
    "date": "3/10/2015"
  },
  {
    "city": "laredo",
    "name": "laredo community college",
    "state": "tx",
    "zipcode": 78040,
    "date": "11/8/2016"
  },
  {
    "city": "gainesville",
    "name": "brenau university",
    "state": "ga",
    "zipcode": 30501,
    "date": "11/8/2016"
  },
  {
    "city": "new britain",
    "name": "central conn state univ",
    "state": "ct",
    "zipcode": "06050-2439",
    "date": "11/8/2016"
  },
  {
    "city": "east stroudsburg",
    "name": "east stroudsburg university",
    "state": "pa",
    "zipcode": "18301-2956",
    "date": "11/8/2016"
  },
  {
    "city": "knoxville",
    "name": "pellissippi st cmty coll",
    "state": "tn",
    "zipcode": 37932,
    "date": "11/8/2016"
  },
  {
    "city": "jacksonville",
    "name": "fl st coll - jacksonville deerwood",
    "state": "fl",
    "zipcode": "32256-8102",
    "date": "11/8/2016"
  },
  {
    "city": "westminster",
    "name": "mcdaniel college",
    "state": "md",
    "zipcode": "21157-4303",
    "date": "11/8/2016"
  },
  {
    "city": "midland",
    "name": "midland college",
    "state": "tx",
    "zipcode": 79705,
    "date": "11/8/2016"
  },
  {
    "city": "fountain valley",
    "name": "coastline cmty coll",
    "state": "ca",
    "zipcode": 92708,
    "date": "11/8/2016"
  },
  {
    "city": "albuquerque",
    "name": "central new mexico comm coll",
    "state": "nm",
    "zipcode": 87106,
    "date": "11/8/2016"
  },
  {
    "city": "sacramento",
    "name": "sacramento city college",
    "state": "ca",
    "zipcode": 95822,
    "date": "11/8/2016"
  },
  {
    "city": "bend",
    "name": "central oregon cmty college",
    "state": "or",
    "zipcode": 97701,
    "date": "11/8/2016"
  },
  {
    "city": "allendale",
    "name": "gvsu - allendale",
    "state": "mi",
    "zipcode": "49401-9401",
    "date": "11/8/2016"
  },
  {
    "city": "grand rapids",
    "name": "grand rapids cmty coll",
    "state": "mi",
    "zipcode": 49503,
    "date": "11/8/2016"
  },
  {
    "city": "fond du lac",
    "name": "moraine park tech coll",
    "state": "wi",
    "zipcode": "54935-2884",
    "date": "11/8/2016"
  },
  {
    "city": "fort yates",
    "name": "sitting bull college",
    "state": "nd",
    "zipcode": "58538-9721",
    "date": "11/8/2016"
  },
  {
    "city": "buffalo",
    "name": "university at buffalo",
    "state": "ny",
    "zipcode": "14260-1660",
    "date": "11/8/2016"
  },
  {
    "city": "chicago",
    "name": "harold washington college",
    "state": "il",
    "zipcode": "60601-2408",
    "date": "11/8/2016"
  },
  {
    "city": "wichita falls",
    "name": "midwestern state university",
    "state": "tx",
    "zipcode": 76308,
    "date": "11/8/2016"
  },
  {
    "city": "midwest city",
    "name": "rose state college",
    "state": "ok",
    "zipcode": 73110,
    "date": "11/8/2016"
  },
  {
    "city": "campbellsville",
    "name": "campbellsville universtiy",
    "state": "ky",
    "zipcode": "42718-2190",
    "date": "11/8/2016"
  },
  {
    "city": "irving",
    "name": "north lake college",
    "state": "tx",
    "zipcode": 75038,
    "date": "11/8/2016"
  },
  {
    "city": "collegedale",
    "name": "southern adventist univ",
    "state": "tn",
    "zipcode": 37315,
    "date": "11/8/2016"
  },
  {
    "city": "wilkesboro",
    "name": "wilkes community college",
    "state": "nc",
    "zipcode": "28697-2102",
    "date": "11/8/2016"
  },
  {
    "city": "paris",
    "name": "paris jr coll-paris",
    "state": "tx",
    "zipcode": 75460,
    "date": "11/8/2016"
  },
  {
    "city": "new olreans",
    "name": "delta intl univ of new orleans",
    "state": "la",
    "zipcode": 70170,
    "date": "11/8/2016"
  },
  {
    "city": "evanston",
    "name": "northwestern university",
    "state": "il",
    "zipcode": "60208-0873",
    "date": "11/8/2016"
  },
  {
    "city": "troy",
    "name": "hudson valley community col",
    "state": "ny",
    "zipcode": "12180-6037",
    "date": "11/8/2016"
  },
  {
    "city": "selden",
    "name": "suffolk county cc (ammerman)",
    "state": "ny",
    "zipcode": "11784-2851",
    "date": "11/8/2016"
  },
  {
    "city": "provo",
    "name": "brigham young univ-provo",
    "state": "ut",
    "zipcode": 84602,
    "date": "11/8/2016"
  },
  {
    "city": "san diego",
    "name": "western american university",
    "state": "ca",
    "zipcode": 92108,
    "date": "11/8/2016"
  },
  {
    "city": "manchester",
    "name": "manchester community college",
    "state": "nh",
    "zipcode": "03102-8528",
    "date": "11/8/2016"
  },
  {
    "city": "reno",
    "name": "univ of nevada sch medicine",
    "state": "nv",
    "zipcode": 89557,
    "date": "11/8/2016"
  },
  {
    "city": "bloomsburg",
    "name": "bloomsburg university",
    "state": "pa",
    "zipcode": "17815-1301",
    "date": "11/8/2016"
  },
  {
    "city": "fremont",
    "name": "ohlone college",
    "state": "ca",
    "zipcode": 94539,
    "date": "11/8/2016"
  },
  {
    "city": "ridgeland",
    "name": "holmes comm coll-ridgeland",
    "state": "ms",
    "zipcode": "39157-1815",
    "date": "11/8/2016"
  },
  {
    "city": "kankakee",
    "name": "kankakee community college",
    "state": "il",
    "zipcode": "60901-6505",
    "date": "11/8/2016"
  },
  {
    "city": "lancaster",
    "name": "antelope valley college",
    "state": "ca",
    "zipcode": 93536,
    "date": "11/9/2016"
  },
  {
    "city": "dowagiac",
    "name": "southwestern michigan coll",
    "state": "mi",
    "zipcode": 49047,
    "date": "11/9/2016"
  },
  {
    "city": "brooklyn",
    "name": "long island univ (brooklyn)",
    "state": "ny",
    "zipcode": "11201-5301",
    "date": "11/9/2016"
  },
  {
    "city": "duluth",
    "name": "univ of minnesota-duluth",
    "state": "mn",
    "zipcode": "55812-2403",
    "date": "11/9/2016"
  },
  {
    "city": "acworth",
    "name": "chatt tech - north metro",
    "state": "ga",
    "zipcode": "30102-3129",
    "date": "11/9/2016"
  },
  {
    "city": "sylmar",
    "name": "los angeles mission college",
    "state": "ca",
    "zipcode": 91342,
    "date": "11/9/2016"
  },
  {
    "city": "brooklyn",
    "name": "kingsborough cmty college",
    "state": "ny",
    "zipcode": 11235,
    "date": "11/9/2016"
  },
  {
    "city": "victorville",
    "name": "victor valley college",
    "state": "ca",
    "zipcode": 92395,
    "date": "11/9/2016"
  },
  {
    "city": "lebanon",
    "name": "mckendree university",
    "state": "il",
    "zipcode": "62254-1291",
    "date": "11/9/2016"
  },
  {
    "city": "dallas",
    "name": "richland college",
    "state": "tx",
    "zipcode": 75243,
    "date": "11/9/2016"
  },
  {
    "city": "nashville",
    "name": "tennessee st univ-main camp",
    "state": "tn",
    "zipcode": "37209-1500",
    "date": "11/9/2016"
  },
  {
    "city": "philadelphia",
    "name": "comm college of philadelphi",
    "state": "pa",
    "zipcode": "19130-3936",
    "date": "11/9/2016"
  },
  {
    "city": "pikeville",
    "name": "kctcs-big sandy-pikeville",
    "state": "ky",
    "zipcode": 41501,
    "date": "11/9/2016"
  },
  {
    "city": "mount pleasant",
    "name": "central michigan university",
    "state": "mi",
    "zipcode": 48859,
    "date": "11/9/2016"
  },
  {
    "city": "orange",
    "name": "career networks institute",
    "state": "ca",
    "zipcode": 92868,
    "date": "11/9/2016"
  },
  {
    "city": "columbia",
    "name": "univ of sc - columbia",
    "state": "sc",
    "zipcode": 29208,
    "date": "11/9/2016"
  },
  {
    "city": "kirtland",
    "name": "lakeland comm college",
    "state": "oh",
    "zipcode": "44094-5198",
    "date": "11/9/2016"
  },
  {
    "city": "tomball",
    "name": "lonestar college - tomball",
    "state": "tx",
    "zipcode": 77375,
    "date": "11/9/2016"
  },
  {
    "city": "shelby",
    "name": "cleveland county comm coll",
    "state": "nc",
    "zipcode": "28152-6224",
    "date": "11/9/2016"
  },
  {
    "city": "oshkosh",
    "name": "univ of wisconsin - oshkosh",
    "state": "wi",
    "zipcode": "54901-3551",
    "date": "11/9/2016"
  },
  {
    "city": "melbourne",
    "name": "eastern fl st coll - melbourne",
    "state": "fl",
    "zipcode": "32935-2310",
    "date": "11/9/2016"
  },
  {
    "city": "blackwood",
    "name": "camden county college",
    "state": "nj",
    "zipcode": 8012,
    "date": "11/9/2016"
  },
  {
    "city": "buffalo",
    "name": "erie cmty coll-city campus",
    "state": "ny",
    "zipcode": "14203-2601",
    "date": "11/9/2016"
  },
  {
    "city": "elizabethtown",
    "name": "kctcs-elizabethtown",
    "state": "ky",
    "zipcode": "42701-3053",
    "date": "11/10/2016"
  },
  {
    "city": "vancouver",
    "name": "clark college",
    "state": "wa",
    "zipcode": 98663,
    "date": "11/10/2016"
  },
  {
    "city": "lubbock",
    "name": "wayland baptist univ lubboc",
    "state": "tx",
    "zipcode": 79407,
    "date": "11/10/2016"
  },
  {
    "city": "santa maria",
    "name": "allan hancock college",
    "state": "ca",
    "zipcode": 93454,
    "date": "11/10/2016"
  },
  {
    "city": "ellensburg",
    "name": "central washington univ",
    "state": "wa",
    "zipcode": 98926,
    "date": "11/10/2016"
  },
  {
    "city": "biloxi",
    "name": "william carey univ - gulfport",
    "state": "ms",
    "zipcode": 39532,
    "date": "11/10/2016"
  },
  {
    "city": "napa",
    "name": "napa valley college",
    "state": "ca",
    "zipcode": 94558,
    "date": "11/10/2016"
  },
  {
    "city": "goodman",
    "name": "holmes community college",
    "state": "ms",
    "zipcode": 39079,
    "date": "11/10/2016"
  },
  {
    "city": "odessa",
    "name": "odessa college",
    "state": "tx",
    "zipcode": 79764,
    "date": "11/10/2016"
  },
  {
    "city": "dover",
    "name": "delaware state university",
    "state": "de",
    "zipcode": "19901-2202",
    "date": "11/10/2016"
  },
  {
    "city": "welland",
    "name": "niagara college",
    "state": "on",
    "zipcode": "l3c 7l3",
    "date": "11/10/2016"
  },
  {
    "city": "portland",
    "name": "portland state university",
    "state": "or",
    "zipcode": 97201,
    "date": "11/10/2016"
  },
  {
    "city": "new york",
    "name": "american business institute",
    "state": "ny",
    "zipcode": "10019-6700",
    "date": "11/10/2016"
  },
  {
    "city": "clarksville",
    "name": "austin peay state univ",
    "state": "tn",
    "zipcode": "37040-3086",
    "date": "11/10/2016"
  },
  {
    "city": "plymouth",
    "name": "quincy -plymouth college",
    "state": "ma",
    "zipcode": "02360-3309",
    "date": "11/10/2016"
  },
  {
    "city": "jackson",
    "name": "jackson community college",
    "state": "mi",
    "zipcode": "49201-8395",
    "date": "11/10/2016"
  },
  {
    "city": "new castle",
    "name": "wilmington university",
    "state": "de",
    "zipcode": "19720-6434",
    "date": "11/11/2016"
  },
  {
    "city": "south euclid",
    "name": "notre dame college of ohio",
    "state": "oh",
    "zipcode": "44121-4228",
    "date": "11/11/2016"
  },
  {
    "city": "ft worth",
    "name": "tarrant cnty coll nw",
    "state": "tx",
    "zipcode": 76179,
    "date": "11/11/2016"
  },
  {
    "city": "rock hill",
    "name": "york technical college",
    "state": "sc",
    "zipcode": "29730-7318",
    "date": "11/11/2016"
  },
  {
    "city": "ashland",
    "name": "southern oregon university",
    "state": "or",
    "zipcode": 97520,
    "date": "11/11/2016"
  },
  {
    "city": "cupertino",
    "name": "de anza college",
    "state": "ca",
    "zipcode": 95014,
    "date": "11/11/2016"
  },
  {
    "city": "kissimmee",
    "name": "valencia coll - osceola",
    "state": "fl",
    "zipcode": "34744-3714",
    "date": "11/11/2016"
  },
  {
    "city": "new orleans",
    "name": "delgado cmty clg",
    "state": "la",
    "zipcode": "70119-4399",
    "date": "11/11/2016"
  },
  {
    "city": "santa fe",
    "name": "santa fe comm college",
    "state": "nm",
    "zipcode": 87508,
    "date": "11/11/2016"
  },
  {
    "city": "new brunswick",
    "name": "rutgers state univ nj",
    "state": "nj",
    "zipcode": 8903,
    "date": "11/11/2016"
  },
  {
    "city": "new york",
    "name": "borough manhattan cc",
    "state": "ny",
    "zipcode": "10007-1044",
    "date": "11/11/2016"
  },
  {
    "city": "danville",
    "name": "kctcs-bluegrass-danville",
    "state": "ky",
    "zipcode": "40422-9690",
    "date": "11/11/2016"
  },
  {
    "city": "sturgeon bay",
    "name": "northeast wi tech coll",
    "state": "wi",
    "zipcode": "54235-1317",
    "date": "11/11/2016"
  },
  {
    "city": "canton",
    "name": "stark state collof technology",
    "state": "oh",
    "zipcode": "44720-7228",
    "date": "11/12/2016"
  },
  {
    "city": "el paso",
    "name": "univ of texas - el paso",
    "state": "tx",
    "zipcode": 79968,
    "date": "11/12/2016"
  },
  {
    "city": "anchorage",
    "name": "alaska whole health inst",
    "state": "ak",
    "zipcode": 99503,
    "date": "11/12/2016"
  },
  {
    "city": "houston",
    "name": "lonestar college - univ park",
    "state": "tx",
    "zipcode": "77070-2607",
    "date": "11/12/2016"
  },
  {
    "city": "palm beach gardens",
    "name": "palm beach state coll - north",
    "state": "fl",
    "zipcode": "33410-2802",
    "date": "11/12/2016"
  },
  {
    "city": "killeen",
    "name": "central texas college",
    "state": "tx",
    "zipcode": 76549,
    "date": "11/12/2016"
  },
  {
    "city": "kansas city",
    "name": "univ of kansas",
    "state": "ks",
    "zipcode": 66100,
    "date": "11/12/2016"
  },
  {
    "city": "kaneohe",
    "name": "windward community college",
    "state": "hi",
    "zipcode": 96744,
    "date": "11/12/2016"
  },
  {
    "city": "arnold",
    "name": "anne arundel cmty college",
    "state": "md",
    "zipcode": "21012-1857",
    "date": "11/13/2016"
  },
  {
    "city": "rancho cucamonga",
    "name": "chaffey clg",
    "state": "ca",
    "zipcode": 91737,
    "date": "11/13/2016"
  },
  {
    "city": "porterville",
    "name": "porterville college",
    "state": "ca",
    "zipcode": 93257,
    "date": "11/13/2016"
  },
  {
    "city": "beaumont",
    "name": "lamar university",
    "state": "tx",
    "zipcode": 77710,
    "date": "11/13/2016"
  },
  {
    "city": "university heights",
    "name": "john carroll university",
    "state": "oh",
    "zipcode": 44118,
    "date": "11/13/2016"
  },
  {
    "city": "corvallis",
    "name": "oregon state university",
    "state": "or",
    "zipcode": 97331,
    "date": "11/14/2016"
  },
  {
    "city": "st petersburg",
    "name": "st petersburg coll - downtown",
    "state": "fl",
    "zipcode": 33701,
    "date": "11/14/2016"
  },
  {
    "city": "huntington",
    "name": "mountwest comm & tech college",
    "state": "wv",
    "zipcode": 25701,
    "date": "11/14/2016"
  },
  {
    "city": "harrisonburg",
    "name": "james madison university",
    "state": "va",
    "zipcode": "22807-0001",
    "date": "11/14/2016"
  },
  {
    "city": "levelland",
    "name": "south plains college",
    "state": "tx",
    "zipcode": 79336,
    "date": "11/14/2016"
  },
  {
    "city": "auburn",
    "name": "green river comm college",
    "state": "wa",
    "zipcode": 98092,
    "date": "11/14/2016"
  },
  {
    "city": "coon rapids",
    "name": "anoka ramsey cc - coon rapids",
    "state": "mn",
    "zipcode": 55433,
    "date": "11/14/2016"
  },
  {
    "city": "galveston",
    "name": "galveston college",
    "state": "tx",
    "zipcode": 77550,
    "date": "11/14/2016"
  },
  {
    "city": "cincinnati",
    "name": "univ of cincinnati/univ clg",
    "state": "oh",
    "zipcode": "45221-0001",
    "date": "11/14/2016"
  },
  {
    "city": "fort worth",
    "name": "tarrant county college district",
    "state": "texas",
    "zipcode": 76102,
    "date": "11/14/2016"
  },
  {
    "city": "sanford",
    "name": "seminole st coll of florida",
    "state": "fl",
    "zipcode": "32773-6132",
    "date": "11/14/2016"
  },
  {
    "city": "california",
    "name": "california univ of pa",
    "state": "pa",
    "zipcode": "15419-1341",
    "date": "11/14/2016"
  },
  {
    "city": "towson",
    "name": "towson university",
    "state": "md",
    "zipcode": "21252-0001",
    "date": "11/14/2016"
  },
  {
    "city": "canandaigua",
    "name": "finger lakes comm coll",
    "state": "ny",
    "zipcode": "14424-8347",
    "date": "11/14/2016"
  },
  {
    "city": "west long branch",
    "name": "monmouth univ",
    "state": "nj",
    "zipcode": "07764-1804",
    "date": "11/15/2016"
  },
  {
    "city": "worcester",
    "name": "quinsigamond community coll",
    "state": "ma",
    "zipcode": "01606-2064",
    "date": "11/15/2016"
  },
  {
    "city": "irvine",
    "name": "univ of calif - irvine",
    "state": "ca",
    "zipcode": 92717,
    "date": "11/15/2016"
  },
  {
    "city": "utica",
    "name": "mohawk valley cmty college",
    "state": "ny",
    "zipcode": "13501-5308",
    "date": "11/15/2016"
  },
  {
    "city": "indianapolis",
    "name": "ivy tech state coll - indianap",
    "state": "in",
    "zipcode": "46208-4777",
    "date": "11/15/2016"
  },
  {
    "city": "radford",
    "name": "radford university",
    "state": "va",
    "zipcode": 24142,
    "date": "11/15/2016"
  },
  {
    "city": "shelbyville",
    "name": "kctcs-jefferson-shelby county",
    "state": "ky",
    "zipcode": "40065-9447",
    "date": "11/15/2016"
  },
  {
    "city": "san antonio",
    "name": "texas a & m university-san antonio",
    "state": "tx",
    "zipcode": 78224,
    "date": "11/15/2016"
  },
  {
    "city": "grayslake",
    "name": "college of lake county",
    "state": "il",
    "zipcode": 60030,
    "date": "1/29/2016"
  },
  {
    "city": "phoenix",
    "name": "paradise valley comm coll",
    "state": "az",
    "zipcode": 85032,
    "date": "1/29/2016"
  },
  {
    "city": "chicago",
    "name": "loyola univ - water tower",
    "state": "il",
    "zipcode": 60611,
    "date": "1/29/2016"
  },
  {
    "city": "frisco",
    "name": "collin college - preston rdge",
    "state": "tx",
    "zipcode": 75035,
    "date": "1/29/2016"
  },
  {
    "city": "oxford",
    "name": "miami univ - oxford",
    "state": "oh",
    "zipcode": "45056-1846",
    "date": "1/29/2016"
  },
  {
    "city": "san marcos",
    "name": "cal state u - san marcos",
    "state": "ca",
    "zipcode": 92096,
    "date": "1/29/2016"
  },
  {
    "city": "waukesha",
    "name": "uwc - waukesha",
    "state": "wi",
    "zipcode": "53188-2720",
    "date": "1/29/2016"
  },
  {
    "city": "storrs",
    "name": "univ of connecticut-storrs",
    "state": "ct",
    "zipcode": 6269,
    "date": "1/29/2016"
  },
  {
    "city": "green bay",
    "name": "ne wisconsin tech clg-gb",
    "state": "wi",
    "zipcode": 54303,
    "date": "1/29/2016"
  },
  {
    "city": "northridge",
    "name": "cal state u - northridge",
    "state": "ca",
    "zipcode": 91330,
    "date": "1/29/2016"
  },
  {
    "city": "sacramento",
    "name": "cal state u - sacramento",
    "state": "ca",
    "zipcode": 95819,
    "date": "1/29/2016"
  },
  {
    "city": "new paltz",
    "name": "suny at new paltz",
    "state": "ny",
    "zipcode": "12561-2447",
    "date": "1/29/2016"
  },
  {
    "city": "slippery rock",
    "name": "slippery rock univ of pa",
    "state": "pa",
    "zipcode": "16057-1313",
    "date": "1/29/2016"
  },
  {
    "city": "monroe",
    "name": "univ of louisiana at monroe",
    "state": "la",
    "zipcode": "71209-9000",
    "date": "1/29/2016"
  },
  {
    "city": "davie",
    "name": "florida atlantic u-davie",
    "state": "fl",
    "zipcode": 33314,
    "date": "1/29/2016"
  },
  {
    "city": "durham",
    "name": "univ of new hampshire",
    "state": "nh",
    "zipcode": 3824,
    "date": "1/29/2016"
  },
  {
    "city": "martin",
    "name": "univ of tennessee - martin",
    "state": "tn",
    "zipcode": "38238-0001",
    "date": "1/29/2016"
  },
  {
    "city": "corsicana",
    "name": "navarro coll - corsicana",
    "state": "tx",
    "zipcode": 75110,
    "date": "1/29/2016"
  },
  {
    "city": "sioux city",
    "name": "western iowa tech cc",
    "state": "ia",
    "zipcode": "51106-1918",
    "date": "1/29/2016"
  },
  {
    "city": "missoula",
    "name": "university of montana",
    "state": "mt",
    "zipcode": "59812-0003",
    "date": "1/29/2016"
  },
  {
    "city": "east lansing",
    "name": "michigan state university",
    "state": "mi",
    "zipcode": 48824,
    "date": "1/29/2016"
  },
  {
    "city": "new haven",
    "name": "gateway cc - new haven",
    "state": "ct",
    "zipcode": 6510,
    "date": "1/29/2016"
  },
  {
    "city": "dearborn",
    "name": "henry ford cmty college",
    "state": "mi",
    "zipcode": "48128-2407",
    "date": "1/29/2016"
  },
  {
    "city": "kingston",
    "name": "university of rhode island",
    "state": "ri",
    "zipcode": "02881-1124",
    "date": "1/29/2016"
  },
  {
    "city": "philadelphia",
    "name": "st josephs university",
    "state": "pa",
    "zipcode": "19131-1308",
    "date": "1/29/2016"
  },
  {
    "city": "dayton",
    "name": "wright state university",
    "state": "oh",
    "zipcode": "45435-0001",
    "date": "1/29/2016"
  },
  {
    "city": "sioux city",
    "name": "morningside college",
    "state": "ia",
    "zipcode": "51106-1717",
    "date": "1/29/2016"
  },
  {
    "city": "cleveland",
    "name": "cleveland st cmty coll",
    "state": "tn",
    "zipcode": "37312-2813",
    "date": "1/29/2016"
  },
  {
    "city": "frostburg",
    "name": "frostburg state university",
    "state": "md",
    "zipcode": "21532-2303",
    "date": "1/29/2016"
  },
  {
    "city": "phoenix",
    "name": "south mountain comm college",
    "state": "az",
    "zipcode": 85042,
    "date": "1/29/2016"
  },
  {
    "city": "shreveport",
    "name": "southern univ-shreveport",
    "state": "la",
    "zipcode": 71107,
    "date": "1/29/2016"
  },
  {
    "city": "jamaica",
    "name": "st johns univ (queens)",
    "state": "ny",
    "zipcode": "11439-0001",
    "date": "1/29/2016"
  },
  {
    "city": "lubbock",
    "name": "texas tech university",
    "state": "tx",
    "zipcode": 79409,
    "date": "1/29/2016"
  },
  {
    "city": "westfield",
    "name": "westfield state college",
    "state": "ma",
    "zipcode": "01085-2580",
    "date": "1/29/2016"
  },
  {
    "city": "la junta",
    "name": "otero junior college",
    "state": "co",
    "zipcode": 81050,
    "date": "1/29/2016"
  },
  {
    "city": "rio grande",
    "name": "university of rio grande",
    "state": "oh",
    "zipcode": "45674-3100",
    "date": "1/29/2016"
  },
  {
    "city": "boca raton",
    "name": "palm beach state coll - south",
    "state": "fl",
    "zipcode": "33431-6418",
    "date": "1/29/2016"
  },
  {
    "city": "salinas",
    "name": "hartnell community college",
    "state": "ca",
    "zipcode": 93901,
    "date": "1/29/2016"
  },
  {
    "city": "spokane",
    "name": "spokane falls comm coll",
    "state": "wa",
    "zipcode": 99224,
    "date": "1/29/2016"
  },
  {
    "city": "austin",
    "name": "austin c c - northridge",
    "state": "tx",
    "zipcode": 787583190,
    "date": "1/29/2016"
  },
  {
    "city": "murfreesboro",
    "name": "middle tennessee state univ",
    "state": "tn",
    "zipcode": "37132-0001",
    "date": "1/29/2016"
  },
  {
    "city": "batavia",
    "name": "univ cincinnati-clermont",
    "state": "oh",
    "zipcode": 45103,
    "date": "1/29/2016"
  },
  {
    "city": "kalispell",
    "name": "flathead vly comm college",
    "state": "mt",
    "zipcode": "59901-2622",
    "date": "1/29/2016"
  },
  {
    "city": "youngwood",
    "name": "westmoreland cnty cmty coll",
    "state": "pa",
    "zipcode": "15697-1801",
    "date": "1/29/2016"
  },
  {
    "city": "champaign",
    "name": "univ of illinois - champaign",
    "state": "il",
    "zipcode": 61820,
    "date": "1/29/2016"
  },
  {
    "city": "stephenville",
    "name": "tarleton state univ",
    "state": "tx",
    "zipcode": 76402,
    "date": "1/29/2016"
  },
  {
    "city": "salem",
    "name": "salem state university",
    "state": "ma",
    "zipcode": "01970-5348",
    "date": "1/29/2016"
  },
  {
    "city": "auburn hills",
    "name": "oakland cc - auburn hills",
    "state": "mi",
    "zipcode": 48326,
    "date": "1/29/2016"
  },
  {
    "city": "indianapolis",
    "name": "university of indianapolis",
    "state": "in",
    "zipcode": "46227-3630",
    "date": "1/29/2016"
  },
  {
    "city": "milwaukee",
    "name": "alverno college",
    "state": "wi",
    "zipcode": "53215-4020",
    "date": "1/29/2016"
  },
  {
    "city": "tyler",
    "name": "univ of texas - tyler",
    "state": "tx",
    "zipcode": 75799,
    "date": "1/29/2016"
  },
  {
    "city": "san diego",
    "name": "university of san diego",
    "state": "ca",
    "zipcode": 92110,
    "date": "1/29/2016"
  },
  {
    "city": "reading",
    "name": "reading area comm college",
    "state": "pa",
    "zipcode": "19602-1014",
    "date": "1/29/2016"
  },
  {
    "city": "largo",
    "name": "prince georges cmty college",
    "state": "md",
    "zipcode": "20774-2109",
    "date": "1/29/2016"
  },
  {
    "city": "pomona",
    "name": "cal state polytech u-pomona",
    "state": "ca",
    "zipcode": 91768,
    "date": "1/29/2016"
  },
  {
    "city": "billings",
    "name": "montana state univ - billings",
    "state": "mt",
    "zipcode": "59101-0245",
    "date": "1/29/2016"
  },
  {
    "city": "johnstown",
    "name": "fulton montgomery cmty coll",
    "state": "ny",
    "zipcode": "12095-3749",
    "date": "1/29/2016"
  },
  {
    "city": "lancaster",
    "name": "hacc lancaster",
    "state": "pa",
    "zipcode": "17602-2633",
    "date": "1/29/2016"
  },
  {
    "city": "colorado spg",
    "name": "univ of colo-colo spr",
    "state": "co",
    "zipcode": 80918,
    "date": "1/29/2016"
  },
  {
    "city": "lufkin",
    "name": "angelina college",
    "state": "tx",
    "zipcode": 75904,
    "date": "1/29/2016"
  },
  {
    "city": "nashville",
    "name": "vanderbilt university",
    "state": "tn",
    "zipcode": "37235-0001",
    "date": "1/29/2016"
  },
  {
    "city": "plattsburgh",
    "name": "suny - plattsburgh",
    "state": "ny",
    "zipcode": "12901-2637",
    "date": "1/29/2016"
  },
  {
    "city": "wayne",
    "name": "william paterson university",
    "state": "nj",
    "zipcode": "07470-2103",
    "date": "1/29/2016"
  },
  {
    "city": "north miami",
    "name": "fiu - biscayne bay campus",
    "state": "fl",
    "zipcode": 33181,
    "date": "1/29/2016"
  },
  {
    "city": "plano",
    "name": "collin college - spr crk",
    "state": "tx",
    "zipcode": 75074,
    "date": "1/29/2016"
  },
  {
    "city": "morrilton",
    "name": "univ of arkansas cc-morrilton",
    "state": "ar",
    "zipcode": 72110,
    "date": "1/29/2016"
  },
  {
    "city": "lock haven",
    "name": "lock haven university",
    "state": "pa",
    "zipcode": "17745-2342",
    "date": "1/29/2016"
  },
  {
    "city": "clermont",
    "name": "lake sumter cc - southlake campus",
    "state": "fl",
    "zipcode": 34711,
    "date": "1/29/2016"
  },
  {
    "city": "chicago",
    "name": "malcolm x college",
    "state": "il",
    "zipcode": "60612-3145",
    "date": "1/29/2016"
  },
  {
    "city": "paterson",
    "name": "passaic county cmty college",
    "state": "nj",
    "zipcode": 7509,
    "date": "1/29/2016"
  },
  {
    "city": "la crosse",
    "name": "western tech coll",
    "state": "wi",
    "zipcode": "54601-3368",
    "date": "1/29/2016"
  },
  {
    "city": "bridgewater",
    "name": "bridgewater state university",
    "state": "ma",
    "zipcode": 2325,
    "date": "1/29/2016"
  },
  {
    "city": "frederick",
    "name": "frederick cmty college",
    "state": "md",
    "zipcode": "21702-2964",
    "date": "1/29/2016"
  },
  {
    "city": "denver",
    "name": "colorado community college onl",
    "state": "co",
    "zipcode": 80230,
    "date": "1/29/2016"
  },
  {
    "city": "brockton",
    "name": "massasoit community college",
    "state": "ma",
    "zipcode": 2302,
    "date": "1/29/2016"
  },
  {
    "city": "macomb",
    "name": "western illinois university",
    "state": "il",
    "zipcode": "61455-1367",
    "date": "1/29/2016"
  },
  {
    "city": "new haven",
    "name": "southern conn state univ",
    "state": "ct",
    "zipcode": "06515-1330",
    "date": "1/29/2016"
  },
  {
    "city": "youngstown",
    "name": "youngstown state university",
    "state": "oh",
    "zipcode": "44555-0001",
    "date": "1/29/2016"
  },
  {
    "city": "mission viejo",
    "name": "saddleback college",
    "state": "ca",
    "zipcode": 92692,
    "date": "1/29/2016"
  },
  {
    "city": "bloomfield hills",
    "name": "oakland community college",
    "state": "mi",
    "zipcode": "48304-2223",
    "date": "1/29/2016"
  },
  {
    "city": "wharton",
    "name": "wharton county jr college",
    "state": "tx",
    "zipcode": 77488,
    "date": "1/29/2016"
  },
  {
    "city": "emporia",
    "name": "emporia state university",
    "state": "ks",
    "zipcode": 66801,
    "date": "1/29/2016"
  },
  {
    "city": "menasha",
    "name": "uwc - fox valley",
    "state": "wi",
    "zipcode": "54952-8002",
    "date": "1/29/2016"
  },
  {
    "city": "austin",
    "name": "austin c c - riverside",
    "state": "tx",
    "zipcode": 78741,
    "date": "1/29/2016"
  },
  {
    "city": "san bernardino",
    "name": "cal state u - san bernardino",
    "state": "ca",
    "zipcode": 92407,
    "date": "1/29/2016"
  },
  {
    "city": "buffalo",
    "name": "buffalo state college",
    "state": "ny",
    "zipcode": "14222-1004",
    "date": "1/29/2016"
  },
  {
    "city": "patchogue",
    "name": "st josephs college - long island",
    "state": "ny",
    "zipcode": "11772-2325",
    "date": "1/29/2016"
  },
  {
    "city": "morristown",
    "name": "walters st cmty coll",
    "state": "tn",
    "zipcode": "37813-1908",
    "date": "1/29/2016"
  },
  {
    "city": "wilmington",
    "name": "del tech & cc wilmington",
    "state": "de",
    "zipcode": "19801-2412",
    "date": "1/29/2016"
  },
  {
    "city": "huntington bch",
    "name": "coastline cc-huntngtn wstmn",
    "state": "ca",
    "zipcode": 92649,
    "date": "1/29/2016"
  },
  {
    "city": "sugarland",
    "name": "wharton cty jr coll - sugarland",
    "state": "tx",
    "zipcode": 77479,
    "date": "1/29/2016"
  },
  {
    "city": "rochester",
    "name": "oakland university",
    "state": "mi",
    "zipcode": "48309-4402",
    "date": "1/29/2016"
  },
  {
    "city": "burlington",
    "name": "university of vermont",
    "state": "vt",
    "zipcode": "05405-0001",
    "date": "1/29/2016"
  },
  {
    "city": "chicago",
    "name": "chicago state university",
    "state": "il",
    "zipcode": 60628,
    "date": "1/29/2016"
  },
  {
    "city": "pine bluff",
    "name": "u arkansas-pine bluff",
    "state": "ar",
    "zipcode": "71601-2799",
    "date": "1/29/2016"
  },
  {
    "city": "huntington",
    "name": "queens  huntington college",
    "state": "ny",
    "zipcode": 11743,
    "date": "1/29/2016"
  },
  {
    "city": "fullerton",
    "name": "fullerton college",
    "state": "ca",
    "zipcode": 92832,
    "date": "1/29/2016"
  },
  {
    "city": "tampa",
    "name": "university of tampa",
    "state": "fl",
    "zipcode": "33606-1450",
    "date": "1/29/2016"
  },
  {
    "city": "colorado springs",
    "name": "pikes peak cc - centennial cmps",
    "state": "co",
    "zipcode": 80906,
    "date": "1/29/2016"
  },
  {
    "city": "new york",
    "name": "john jay coll criminal just",
    "state": "ny",
    "zipcode": "10019-1104",
    "date": "1/29/2016"
  },
  {
    "city": "hazard",
    "name": "kctcs-hazard",
    "state": "ky",
    "zipcode": 41701,
    "date": "1/29/2016"
  },
  {
    "city": "aptos",
    "name": "cabrillo college",
    "state": "ca",
    "zipcode": 95003,
    "date": "1/29/2016"
  },
  {
    "city": "las vegas",
    "name": "coll of s nv - charleston",
    "state": "nv",
    "zipcode": 89146,
    "date": "1/29/2016"
  },
  {
    "city": "springfield",
    "name": "nvcc medical educ campus",
    "state": "va",
    "zipcode": "22150-1913",
    "date": "1/29/2016"
  },
  {
    "city": "frankfort",
    "name": "kentucky state university",
    "state": "ky",
    "zipcode": "40601-2334",
    "date": "1/29/2016"
  },
  {
    "city": "nanticoke",
    "name": "luzerne cty comm college",
    "state": "pa",
    "zipcode": "18634-3814",
    "date": "1/29/2016"
  },
  {
    "city": "manchester",
    "name": "sthrn nh univ cont/online educ",
    "state": "nh",
    "zipcode": 3101,
    "date": "1/29/2016"
  },
  {
    "city": "yakima",
    "name": "yakima valley comm coll",
    "state": "wa",
    "zipcode": 98902,
    "date": "1/29/2016"
  },
  {
    "city": "richmond",
    "name": "virginia commonwealth university",
    "state": "va",
    "zipcode": 23284,
    "date": "1/29/2016"
  },
  {
    "city": "athens",
    "name": "trinity valley cc - athens",
    "state": "tx",
    "zipcode": 75751,
    "date": "1/29/2016"
  },
  {
    "city": "woodbridge",
    "name": "no virginia cc - woodbridge",
    "state": "va",
    "zipcode": 22191,
    "date": "1/29/2016"
  },
  {
    "city": "phoenix",
    "name": "grand canyon university",
    "state": "az",
    "zipcode": 85017,
    "date": "1/29/2016"
  },
  {
    "city": "jamestown",
    "name": "guilford tech comm coll",
    "state": "nc",
    "zipcode": "27282-0309",
    "date": "1/29/2016"
  },
  {
    "city": "washington",
    "name": "trinity univeristy",
    "state": "dc",
    "zipcode": 20017,
    "date": "1/29/2016"
  },
  {
    "city": "cleveland",
    "name": "cleveland state university",
    "state": "oh",
    "zipcode": "44115-2214",
    "date": "1/29/2016"
  },
  {
    "city": "belle glade",
    "name": "palm beach state coll - glades",
    "state": "fl",
    "zipcode": "33430-3611",
    "date": "1/29/2016"
  },
  {
    "city": "hurst",
    "name": "tarrant cnty coll ne",
    "state": "tx",
    "zipcode": 76054,
    "date": "1/29/2016"
  },
  {
    "city": "columbus",
    "name": "ivy tech comm coll - columbus",
    "state": "in",
    "zipcode": "47203-1868",
    "date": "1/29/2016"
  },
  {
    "city": "west windsor",
    "name": "mercer cnty c c-trenton",
    "state": "nj",
    "zipcode": "08550-3407",
    "date": "1/29/2016"
  },
  {
    "city": "columbus",
    "name": "franklin university",
    "state": "oh",
    "zipcode": "43215-5301",
    "date": "1/29/2016"
  },
  {
    "city": "el cajon",
    "name": "grossmont college",
    "state": "ca",
    "zipcode": 92020,
    "date": "1/29/2016"
  },
  {
    "city": "marion",
    "name": "marion military institute",
    "state": "al",
    "zipcode": 36756,
    "date": "1/29/2016"
  },
  {
    "city": "green bay",
    "name": "university of wisconsin - green bay",
    "state": "wi",
    "zipcode": 54311,
    "date": "1/29/2016"
  },
  {
    "city": "buies creek",
    "name": "campbell university",
    "state": "nc",
    "zipcode": 27506,
    "date": "1/29/2016"
  },
  {
    "city": "miami",
    "name": "miami-dade coll north",
    "state": "fl",
    "zipcode": 33167,
    "date": "1/29/2016"
  },
  {
    "city": "kyle",
    "name": "austin cc - hays",
    "state": "tx",
    "zipcode": 78640,
    "date": "11/15/2016"
  },
  {
    "city": "pittsburgh",
    "name": "univ of pittsburgh",
    "state": "pa",
    "zipcode": "15260-0001",
    "date": "11/15/2016"
  },
  {
    "city": "farmington",
    "name": "tunxis cmty technical college",
    "state": "ct",
    "zipcode": "06032-3324",
    "date": "11/15/2016"
  },
  {
    "city": "tuscaloosa",
    "name": "univ of alabama -nursing",
    "state": "al",
    "zipcode": "35487-0001",
    "date": "11/15/2016"
  },
  {
    "city": "richmond",
    "name": "ivy tech comm coll - richmond",
    "state": "in",
    "zipcode": "47374-1220",
    "date": "11/15/2016"
  },
  {
    "city": "san diego",
    "name": "advanced college of tech",
    "state": "ca",
    "zipcode": 92123,
    "date": "11/16/2016"
  },
  {
    "city": "new orleans",
    "name": "delgado cc-west bank campus",
    "state": "la",
    "zipcode": "70114-3047",
    "date": "11/16/2016"
  },
  {
    "city": "branchburg",
    "name": "raritan valley comm coll",
    "state": "nj",
    "zipcode": 8876,
    "date": "11/16/2016"
  },
  {
    "city": "nj",
    "name": "test school s1",
    "state": "nj",
    "zipcode": 1234,
    "date": "11/16/2016"
  },
  {
    "city": "lincoln",
    "name": "southeast cmty coll-lincoln",
    "state": "ne",
    "zipcode": 68520,
    "date": "11/16/2016"
  },
  {
    "city": "newark",
    "name": "rutgers univ newark",
    "state": "nj",
    "zipcode": "07102-1811",
    "date": "11/16/2016"
  },
  {
    "city": "placerville",
    "name": "folsom lake coll - el dorado",
    "state": "ca",
    "zipcode": 95667,
    "date": "11/16/2016"
  },
  {
    "city": "hayward",
    "name": "cal state u - east bay",
    "state": "ca",
    "zipcode": 94542,
    "date": "11/17/2016"
  },
  {
    "city": "asheville",
    "name": "ashevl buncombe tech coll",
    "state": "nc",
    "zipcode": "28801-4816",
    "date": "11/17/2016"
  },
  {
    "city": "thibodaux",
    "name": "nicholls state university",
    "state": "la",
    "zipcode": 70310,
    "date": "11/17/2016"
  },
  {
    "city": "sheboygan",
    "name": "uwc-sheboygan county",
    "state": "wi",
    "zipcode": 53081,
    "date": "11/17/2016"
  },
  {
    "city": "dover",
    "name": "wesley college dover",
    "state": "de",
    "zipcode": "19901-3835",
    "date": "11/18/2016"
  },
  {
    "city": "newport news",
    "name": "christopher newport university",
    "state": "va",
    "zipcode": "23606-0070",
    "date": "11/18/2016"
  },
  {
    "city": "reno",
    "name": "university of nevada - reno",
    "state": "nv",
    "zipcode": "89557-0042",
    "date": "11/18/2016"
  },
  {
    "city": "blountville",
    "name": "northeast st cmty coll",
    "state": "tn",
    "zipcode": "37617-6350",
    "date": "11/18/2016"
  },
  {
    "city": "fort wayne",
    "name": "univ of st francis",
    "state": "in",
    "zipcode": 46808,
    "date": "11/18/2016"
  },
  {
    "city": "nashville",
    "name": "nashville state comm coll",
    "state": "tn",
    "zipcode": "37209-4515",
    "date": "11/18/2016"
  },
  {
    "city": "durango",
    "name": "fort lewis college",
    "state": "co",
    "zipcode": 813013000,
    "date": "11/19/2016"
  },
  {
    "city": "chicago",
    "name": "wilbur wright college-south",
    "state": "il",
    "zipcode": 60634,
    "date": "11/20/2016"
  },
  {
    "city": "waco",
    "name": "texas st tech coll-waco",
    "state": "tx",
    "zipcode": 76705,
    "date": "11/20/2016"
  },
  {
    "city": "deerfield bch",
    "name": "north broward tech ctr",
    "state": "fl",
    "zipcode": 33442,
    "date": "11/20/2016"
  },
  {
    "city": "milwaukee",
    "name": "technology institute",
    "state": "wi",
    "zipcode": "53202-1806",
    "date": "11/20/2016"
  },
  {
    "city": "brenham",
    "name": "blinn college-brenham camp",
    "state": "tx",
    "zipcode": 77833,
    "date": "11/21/2016"
  },
  {
    "city": "poteau",
    "name": "carl albert state college",
    "state": "ok",
    "zipcode": 74953,
    "date": "11/21/2016"
  },
  {
    "city": "hanceville",
    "name": "wallace st comm coll-hancevil",
    "state": "al",
    "zipcode": 35077,
    "date": "11/21/2016"
  },
  {
    "city": "edmond",
    "name": "ok christian univ",
    "state": "ok",
    "zipcode": 73013,
    "date": "11/21/2016"
  },
  {
    "city": "fairbury",
    "name": "southeast community college",
    "state": "ne",
    "zipcode": 68352,
    "date": "11/21/2016"
  },
  {
    "city": "barnesville",
    "name": "gordon state college - ga",
    "state": "ga",
    "zipcode": "30204-1746",
    "date": "11/22/2016"
  },
  {
    "city": "mesa",
    "name": "mesa comm coll - red mtn",
    "state": "az",
    "zipcode": "85207-1908",
    "date": "11/22/2016"
  },
  {
    "city": "williamsville",
    "name": "erie cmty clg north campus",
    "state": "ny",
    "zipcode": 14221,
    "date": "11/22/2016"
  },
  {
    "city": "bronx",
    "name": "fordham university-rose hil",
    "state": "ny",
    "zipcode": "10458-5149",
    "date": "11/22/2016"
  },
  {
    "city": "miami",
    "name": "miami-dade coll-kendal",
    "state": "fl",
    "zipcode": 33176,
    "date": "11/22/2016"
  },
  {
    "city": "fresno",
    "name": "willow/intnl coll ctr",
    "state": "ca",
    "zipcode": "93730-5401",
    "date": "11/22/2016"
  },
  {
    "city": "chicago",
    "name": "wright city college",
    "state": "il",
    "zipcode": "60634-1591",
    "date": "11/22/2016"
  },
  {
    "city": "brooklyn",
    "name": "a & m schwartz coll pharmacy",
    "state": "ny",
    "zipcode": "11201-5423",
    "date": "11/23/2016"
  },
  {
    "city": "ebensburg",
    "name": "admiral peary vo-tech",
    "state": "pa",
    "zipcode": 15931,
    "date": "11/23/2016"
  },
  {
    "city": "woodland hills",
    "name": "pierce college - la",
    "state": "ca",
    "zipcode": 91371,
    "date": "11/25/2016"
  },
  {
    "city": "sacramento",
    "name": "cosumnes river college",
    "state": "ca",
    "zipcode": 95823,
    "date": "11/25/2016"
  },
  {
    "city": "louisville",
    "name": "spalding university",
    "state": "ky",
    "zipcode": "40203-2115",
    "date": "11/26/2016"
  },
  {
    "city": "decatur",
    "name": "inst for construction educ",
    "state": "il",
    "zipcode": "62526-2158",
    "date": "11/27/2016"
  },
  {
    "city": "chicago",
    "name": "richard j daley college",
    "state": "il",
    "zipcode": "60652-1369",
    "date": "11/28/2016"
  },
  {
    "city": "peoria",
    "name": "univ of illinois",
    "state": "il",
    "zipcode": 61656,
    "date": "11/28/2016"
  },
  {
    "city": "oskaloosa",
    "name": "william penn university",
    "state": "ia",
    "zipcode": "52577-1757",
    "date": "11/28/2016"
  },
  {
    "city": "fairfield",
    "name": "fairfield university",
    "state": "ct",
    "zipcode": "06824-5171",
    "date": "11/28/2016"
  },
  {
    "city": "macon",
    "name": "middle ga st coll - macon",
    "state": "ga",
    "zipcode": 31206,
    "date": "11/28/2016"
  },
  {
    "city": "san jose",
    "name": "everest coll - san jose",
    "state": "ca",
    "zipcode": 95117,
    "date": "11/28/2016"
  },
  {
    "city": "doral",
    "name": "miami dade coll - west cmps",
    "state": "fl",
    "zipcode": "33178-4856",
    "date": "11/28/2016"
  },
  {
    "city": "tsaile",
    "name": "dine college - arizona",
    "state": "az",
    "zipcode": 86556,
    "date": "11/28/2016"
  },
  {
    "city": "memphis",
    "name": "univ of memphis",
    "state": "tn",
    "zipcode": 38152,
    "date": "11/28/2016"
  },
  {
    "city": "takoma park",
    "name": "washington adventist univ",
    "state": "md",
    "zipcode": "20912-7744",
    "date": "11/28/2016"
  },
  {
    "city": "waterbury",
    "name": "naugatuck vly comm tech col",
    "state": "ct",
    "zipcode": "06708-3011",
    "date": "11/29/2016"
  },
  {
    "city": "gallatin",
    "name": "volunteer st cmty college",
    "state": "tn",
    "zipcode": 37066,
    "date": "11/29/2016"
  },
  {
    "city": "dalton",
    "name": "dalton state college",
    "state": "ga",
    "zipcode": "30720-3778",
    "date": "11/29/2016"
  },
  {
    "city": "orlando",
    "name": "central florida reception ctr",
    "state": "fl",
    "zipcode": "32831-2518",
    "date": "11/29/2016"
  },
  {
    "city": "fairbanks",
    "name": "univ of alaska - fairbanks",
    "state": "ak",
    "zipcode": 99775,
    "date": "11/30/2016"
  },
  {
    "city": "moline",
    "name": "black hawk college",
    "state": "il",
    "zipcode": "61265-5870",
    "date": "11/30/2016"
  },
  {
    "city": "long island city",
    "name": "laguardia cc of cuny",
    "state": "ny",
    "zipcode": "11101-3007",
    "date": "11/30/2016"
  },
  {
    "city": "fremont",
    "name": "midland university",
    "state": "ne",
    "zipcode": "68025-4254",
    "date": "11/30/2016"
  },
  {
    "city": "dallas",
    "name": "univ of north texas - dallas",
    "state": "tx",
    "zipcode": 75241,
    "date": "11/30/2016"
  },
  {
    "city": "mahwah",
    "name": "ramapo c of new jersey",
    "state": "nj",
    "zipcode": "07430-1623",
    "date": "11/30/2016"
  },
  {
    "city": "lima",
    "name": "ohio state univ-lima",
    "state": "oh",
    "zipcode": 45804,
    "date": "12/1/2016"
  },
  {
    "city": "kapolei",
    "name": "univ of hawaii west oahu",
    "state": "hi",
    "zipcode": 96707,
    "date": "12/1/2016"
  },
  {
    "city": "elyria",
    "name": "lorain county cmty college",
    "state": "oh",
    "zipcode": "44035-1613",
    "date": "12/1/2016"
  },
  {
    "city": "ontario",
    "name": "treasure valley cmty coll",
    "state": "or",
    "zipcode": 97914,
    "date": "12/2/2016"
  },
  {
    "city": "omaha",
    "name": "metro comm -e college",
    "state": "ne",
    "zipcode": 68103,
    "date": "12/2/2016"
  },
  {
    "city": "omaha",
    "name": "metropolitan cmty coll",
    "state": "ne",
    "zipcode": 68111,
    "date": "12/2/2016"
  },
  {
    "city": "boston",
    "name": "northeastern university",
    "state": "ma",
    "zipcode": "02115-5005",
    "date": "12/3/2016"
  },
  {
    "city": "toledo",
    "name": "univ of toledo - health sci cmps",
    "state": "oh",
    "zipcode": "43614-2595",
    "date": "12/5/2016"
  },
  {
    "city": "fort myers",
    "name": "southwest florida coll bus",
    "state": "fl",
    "zipcode": "33907-1157",
    "date": "1/29/2016"
  },
  {
    "city": "waxahachie",
    "name": "navarro coll - waxahachie",
    "state": "tx",
    "zipcode": 75165,
    "date": "1/29/2016"
  },
  {
    "city": "arlington",
    "name": "tarrant cnty coll se",
    "state": "tx",
    "zipcode": 76018,
    "date": "1/29/2016"
  },
  {
    "city": "oklahoma city",
    "name": "oklahoma city comm coll",
    "state": "ok",
    "zipcode": 73159,
    "date": "1/29/2016"
  },
  {
    "city": "valley city",
    "name": "valley city state univ",
    "state": "nd",
    "zipcode": 58072,
    "date": "1/29/2016"
  },
  {
    "city": "marietta",
    "name": "chattahoochee tech",
    "state": "ga",
    "zipcode": "30060-3304",
    "date": "1/29/2016"
  },
  {
    "city": "midlothian",
    "name": "navarro coll - midlothian",
    "state": "tx",
    "zipcode": 76065,
    "date": "1/29/2016"
  },
  {
    "city": "rapid city",
    "name": "south dakota sch mines tech",
    "state": "sd",
    "zipcode": "57701-3901",
    "date": "1/29/2016"
  },
  {
    "city": "elkins",
    "name": "davis & elkins college",
    "state": "wv",
    "zipcode": "26241-3971",
    "date": "1/29/2016"
  },
  {
    "city": "twin falls",
    "name": "college of southern idaho",
    "state": "id",
    "zipcode": 83301,
    "date": "1/29/2016"
  },
  {
    "city": "south burlington",
    "name": "comm coll of vermont",
    "state": "vt",
    "zipcode": "05403-6241",
    "date": "1/29/2016"
  },
  {
    "city": "freeport",
    "name": "highland community college",
    "state": "il",
    "zipcode": "61032-9338",
    "date": "1/29/2016"
  },
  {
    "city": "olean",
    "name": "jamestown cmty coll (olean)",
    "state": "ny",
    "zipcode": "14760-2662",
    "date": "1/29/2016"
  },
  {
    "city": "cedar rapids",
    "name": "mount mercy university",
    "state": "ia",
    "zipcode": 52402,
    "date": "1/29/2016"
  },
  {
    "city": "homestead",
    "name": "miami dade coll - homestead",
    "state": "fl",
    "zipcode": 33030,
    "date": "1/29/2016"
  },
  {
    "city": "salisbury",
    "name": "salisbury university",
    "state": "md",
    "zipcode": "21801-6837",
    "date": "1/29/2016"
  },
  {
    "city": "fort worth",
    "name": "tarrant cc - trinity river",
    "state": "tx",
    "zipcode": 76102,
    "date": "1/29/2016"
  },
  {
    "city": "san pablo",
    "name": "contra costa college",
    "state": "ca",
    "zipcode": 94806,
    "date": "1/29/2016"
  },
  {
    "city": "orchard park",
    "name": "erie cmty coll south campus",
    "state": "ny",
    "zipcode": "14127-2100",
    "date": "1/29/2016"
  },
  {
    "city": "brockport",
    "name": "state univ coll brockport",
    "state": "ny",
    "zipcode": "14420-2997",
    "date": "1/29/2016"
  },
  {
    "city": "chester",
    "name": "widener university",
    "state": "pa",
    "zipcode": "19013-5700",
    "date": "1/29/2016"
  },
  {
    "city": "laramie",
    "name": "univ of wyoming - laramie",
    "state": "wy",
    "zipcode": 82071,
    "date": "1/29/2016"
  },
  {
    "city": "rock springs",
    "name": "w wyoming comm coll",
    "state": "wy",
    "zipcode": 82901,
    "date": "1/29/2016"
  },
  {
    "city": "columbus",
    "name": "columbus state comm coll",
    "state": "oh",
    "zipcode": "43215-1722",
    "date": "1/29/2016"
  },
  {
    "city": "hagerstown",
    "name": "hagerstown community college",
    "state": "md",
    "zipcode": 21742,
    "date": "1/29/2016"
  },
  {
    "city": "waco",
    "name": "mclennan community college",
    "state": "tx",
    "zipcode": 76708,
    "date": "1/29/2016"
  },
  {
    "city": "newburgh",
    "name": "mt st mary college",
    "state": "ny",
    "zipcode": "12550-3412",
    "date": "1/29/2016"
  },
  {
    "city": "hamden",
    "name": "quinnipiac university",
    "state": "ct",
    "zipcode": "06518-1905",
    "date": "1/29/2016"
  },
  {
    "city": "flint",
    "name": "charles s mott comm coll",
    "state": "mi",
    "zipcode": "48503-6208",
    "date": "1/29/2016"
  },
  {
    "city": "azusa",
    "name": "azusa pacific university",
    "state": "ca",
    "zipcode": 91702,
    "date": "1/29/2016"
  },
  {
    "city": "tigerville",
    "name": "north greenville university",
    "state": "sc",
    "zipcode": 29688,
    "date": "1/29/2016"
  },
  {
    "city": "tucson",
    "name": "pima college east campus",
    "state": "az",
    "zipcode": 85709,
    "date": "1/29/2016"
  },
  {
    "city": "brentwood",
    "name": "suffolk county cc (grant)",
    "state": "ny",
    "zipcode": 11717,
    "date": "1/29/2016"
  },
  {
    "city": "orangeburg",
    "name": "orangeburg calhoun tec coll",
    "state": "sc",
    "zipcode": 29115,
    "date": "1/29/2016"
  },
  {
    "city": "philadelphia",
    "name": "temple univ",
    "state": "pa",
    "zipcode": "19122-6003",
    "date": "1/29/2016"
  },
  {
    "city": "alexandria",
    "name": "louisiana state univ-alexandri",
    "state": "la",
    "zipcode": "71302-9119",
    "date": "1/29/2016"
  },
  {
    "city": "la plata",
    "name": "college of southern maryland",
    "state": "md",
    "zipcode": "20646-0910",
    "date": "1/29/2016"
  },
  {
    "city": "san antonio",
    "name": "ccc group inc",
    "state": "tx",
    "zipcode": 78219,
    "date": "1/29/2016"
  },
  {
    "city": "murray",
    "name": "murray state university",
    "state": "ky",
    "zipcode": 42071,
    "date": "1/29/2016"
  },
  {
    "city": "stony brook",
    "name": "stony brook university",
    "state": "ny",
    "zipcode": 11794,
    "date": "1/29/2016"
  },
  {
    "city": "madison",
    "name": "madison area tech coll",
    "state": "wi",
    "zipcode": 53704,
    "date": "1/30/2016"
  },
  {
    "city": "dallas",
    "name": "mountain view college",
    "state": "tx",
    "zipcode": 75211,
    "date": "1/30/2016"
  },
  {
    "city": "willimantic",
    "name": "eastern conn state univ",
    "state": "ct",
    "zipcode": "06226-2211",
    "date": "1/30/2016"
  },
  {
    "city": "parma heights",
    "name": "cuyahoga cmty coll - westrn",
    "state": "oh",
    "zipcode": 44130,
    "date": "1/30/2016"
  },
  {
    "city": "new york",
    "name": "barnard coll-columbia univ",
    "state": "ny",
    "zipcode": "10027-6909",
    "date": "1/30/2016"
  },
  {
    "city": "aurora",
    "name": "waubonsee cc-aurora",
    "state": "il",
    "zipcode": 60505,
    "date": "1/30/2016"
  },
  {
    "city": "savannah",
    "name": "savannah coll of art & design",
    "state": "ga",
    "zipcode": "31415-2105",
    "date": "1/30/2016"
  },
  {
    "city": "orlando",
    "name": "valencia coll - east",
    "state": "fl",
    "zipcode": "32825-6404",
    "date": "1/30/2016"
  },
  {
    "city": "daytona beach",
    "name": "bethune cookman university",
    "state": "fl",
    "zipcode": "32114-3012",
    "date": "1/30/2016"
  },
  {
    "city": "kealakekua",
    "name": "u h ctr west hawaii",
    "state": "hi",
    "zipcode": 96750,
    "date": "1/30/2016"
  },
  {
    "city": "moorhead",
    "name": "mississippi delta cmty coll",
    "state": "ms",
    "zipcode": 38761,
    "date": "1/30/2016"
  },
  {
    "city": "denver",
    "name": "university of denver",
    "state": "co",
    "zipcode": 80208,
    "date": "1/30/2016"
  },
  {
    "city": "honolulu",
    "name": "honolulu community college",
    "state": "hi",
    "zipcode": 96817,
    "date": "1/30/2016"
  },
  {
    "city": "phoenix",
    "name": "gateway community college",
    "state": "az",
    "zipcode": 85034,
    "date": "1/30/2016"
  },
  {
    "city": "greenvale",
    "name": "long island univ - cw post ctr",
    "state": "ny",
    "zipcode": "11548-1319",
    "date": "1/30/2016"
  },
  {
    "city": "saint peters",
    "name": "st charles comm coll",
    "state": "mo",
    "zipcode": "63376-2865",
    "date": "12/5/2016"
  },
  {
    "city": "jackson",
    "name": "univ of mississippi med ctr",
    "state": "ms",
    "zipcode": "39216-4500",
    "date": "12/5/2016"
  },
  {
    "city": "chicago",
    "name": "olive harvey college",
    "state": "il",
    "zipcode": 60628,
    "date": "12/5/2016"
  },
  {
    "city": "omaha",
    "name": "metro comm -f college",
    "state": "ne",
    "zipcode": "68111-1646",
    "date": "12/5/2016"
  },
  {
    "city": "sewell",
    "name": "rowan coll at gloucester cty",
    "state": "nj",
    "zipcode": 8080,
    "date": "12/5/2016"
  },
  {
    "city": "oswego",
    "name": "suny at oswego",
    "state": "ny",
    "zipcode": "13126-3501",
    "date": "12/5/2016"
  },
  {
    "city": "chicago",
    "name": "robert morris univ chicago",
    "state": "il",
    "zipcode": "60605-1229",
    "date": "12/6/2016"
  },
  {
    "city": "corpus christi",
    "name": "texas a & m univ - corpus christi",
    "state": "tx",
    "zipcode": 78412,
    "date": "12/6/2016"
  },
  {
    "city": "madison",
    "name": "univ of wisconsin - madison",
    "state": "wi",
    "zipcode": 53706,
    "date": "12/6/2016"
  },
  {
    "city": "highland hills",
    "name": "cuyahoga cmty coll - east",
    "state": "oh",
    "zipcode": "44122-6104",
    "date": "12/6/2016"
  },
  {
    "city": "reading",
    "name": "albright college",
    "state": "pa",
    "zipcode": "19604-1752",
    "date": "12/7/2016"
  },
  {
    "city": "piscataway",
    "name": "umdnj - piscataway",
    "state": "nj",
    "zipcode": "08854-8021",
    "date": "12/7/2016"
  },
  {
    "city": "cambridge",
    "name": "harvard university",
    "state": "ma",
    "zipcode": 2138,
    "date": "12/7/2016"
  },
  {
    "city": "cazenovia",
    "name": "cazenovia college",
    "state": "ny",
    "zipcode": "13035-1054",
    "date": "12/8/2016"
  },
  {
    "city": "syracuse",
    "name": "onondaga community coll",
    "state": "ny",
    "zipcode": "13215-4580",
    "date": "12/8/2016"
  },
  {
    "city": "san rafael",
    "name": "dominican university of calif",
    "state": "ca",
    "zipcode": 94901,
    "date": "12/8/2016"
  },
  {
    "city": "omaha",
    "name": "metro comm -s college",
    "state": "ne",
    "zipcode": 68103,
    "date": "12/11/2016"
  },
  {
    "city": "norman",
    "name": "university of oklahoma",
    "state": "ok",
    "zipcode": 73019,
    "date": "12/11/2016"
  },
  {
    "city": "syracuse",
    "name": "syracuse univ",
    "state": "ny",
    "zipcode": 13244,
    "date": "12/11/2016"
  },
  {
    "city": "jacksonville",
    "name": "jacksonville college",
    "state": "tx",
    "zipcode": 75766,
    "date": "12/12/2016"
  },
  {
    "city": "harrisburg",
    "name": "hacc harrisburg",
    "state": "pa",
    "zipcode": "17110-2903",
    "date": "12/12/2016"
  },
  {
    "city": "castleton",
    "name": "castleton state college",
    "state": "vt",
    "zipcode": "05735-4453",
    "date": "12/12/2016"
  },
  {
    "city": "beatrice",
    "name": "southeast cmty coll-beatrice",
    "state": "ne",
    "zipcode": "68310-7042",
    "date": "12/13/2016"
  },
  {
    "city": "prosser",
    "name": "washington state univ",
    "state": "wa",
    "zipcode": 99350,
    "date": "12/13/2016"
  },
  {
    "city": "spartanburg",
    "name": "spartanburg comm coll",
    "state": "sc",
    "zipcode": 29303,
    "date": "12/14/2016"
  },
  {
    "city": "jackson",
    "name": "jackson state cmty college",
    "state": "tn",
    "zipcode": "38301-3722",
    "date": "12/15/2016"
  },
  {
    "city": "littleton",
    "name": "arapahoe comm coll",
    "state": "co",
    "zipcode": 80160,
    "date": "12/15/2016"
  },
  {
    "city": "supply",
    "name": "brunswick community college",
    "state": "nc",
    "zipcode": "28462-0030",
    "date": "12/16/2016"
  },
  {
    "city": "piscataway",
    "name": "rutgers u-busch campus",
    "state": "nj",
    "zipcode": 8854,
    "date": "12/16/2016"
  },
  {
    "city": "canton",
    "name": "saint lawrence university",
    "state": "ny",
    "zipcode": "13617-1423",
    "date": "12/18/2016"
  },
  {
    "city": "deland",
    "name": "daytona state coll - deland",
    "state": "fl",
    "zipcode": 32724,
    "date": "12/19/2016"
  },
  {
    "city": "bellevue",
    "name": "bellevue college",
    "state": "wa",
    "zipcode": 98007,
    "date": "12/19/2016"
  },
  {
    "city": "redding",
    "name": "simpson university",
    "state": "ca",
    "zipcode": 96003,
    "date": "12/20/2016"
  },
  {
    "city": "miami",
    "name": "miami-dade coll - virtual coll",
    "state": "fl",
    "zipcode": 33132,
    "date": "1/30/2016"
  },
  {
    "city": "gresham",
    "name": "mt hood community college",
    "state": "or",
    "zipcode": 97030,
    "date": "1/30/2016"
  },
  {
    "city": "jacksonville",
    "name": "fl st coll - jacksonville downtown",
    "state": "fl",
    "zipcode": "32202-3099",
    "date": "1/30/2016"
  },
  {
    "city": "new york",
    "name": "new york career institute",
    "state": "ny",
    "zipcode": 10007,
    "date": "1/30/2016"
  },
  {
    "city": "lincoln",
    "name": "cmty coll of r i-lincoln",
    "state": "ri",
    "zipcode": 2865,
    "date": "1/30/2016"
  },
  {
    "city": "bowling green",
    "name": "southcentral ky ctc - bowling green",
    "state": "ky",
    "zipcode": "42101-3601",
    "date": "1/30/2016"
  },
  {
    "city": "conway",
    "name": "univ of central arkansas",
    "state": "ar",
    "zipcode": "72035-5001",
    "date": "1/30/2016"
  },
  {
    "city": "cleveland",
    "name": "lakeshore tech college",
    "state": "wi",
    "zipcode": "53015-1412",
    "date": "1/30/2016"
  },
  {
    "city": "wingate",
    "name": "wingate univeristy",
    "state": "nc",
    "zipcode": 28174,
    "date": "1/30/2016"
  },
  {
    "city": "arlington",
    "name": "argosy univ/washington dc",
    "state": "va",
    "zipcode": "22209-2490",
    "date": "1/30/2016"
  },
  {
    "city": "palm bay",
    "name": "eastern fl st coll - palm bay",
    "state": "fl",
    "zipcode": "32909-2206",
    "date": "1/30/2016"
  },
  {
    "city": "beverly",
    "name": "endicott college",
    "state": "ma",
    "zipcode": "01915-2096",
    "date": "1/30/2016"
  },
  {
    "city": "monaca",
    "name": "community college of beaver cty",
    "state": "pa",
    "zipcode": "15061-2566",
    "date": "1/30/2016"
  },
  {
    "city": "midlothian",
    "name": "vccs - john tyler cc-midlothia",
    "state": "va",
    "zipcode": "23114-4383",
    "date": "1/30/2016"
  },
  {
    "city": "pocatello",
    "name": "idaho state university",
    "state": "id",
    "zipcode": 83209,
    "date": "1/30/2016"
  },
  {
    "city": "lincroft",
    "name": "brookdale community college",
    "state": "nj",
    "zipcode": "07738-1399",
    "date": "1/30/2016"
  },
  {
    "city": "galveston",
    "name": "texas a & m univ - galveston",
    "state": "tx",
    "zipcode": 77553,
    "date": "1/30/2016"
  },
  {
    "city": "minneapolis",
    "name": "univ of minnesota - mpls",
    "state": "mn",
    "zipcode": "55455-0110",
    "date": "1/30/2016"
  },
  {
    "city": "great falls",
    "name": "great falls coll - msu",
    "state": "mt",
    "zipcode": "59406-6010",
    "date": "1/30/2016"
  },
  {
    "city": "lexington",
    "name": "davidson cty comm coll",
    "state": "nc",
    "zipcode": 27295,
    "date": "1/30/2016"
  },
  {
    "city": "tanner",
    "name": "calhoun cc",
    "state": "al",
    "zipcode": "35671-4028",
    "date": "1/30/2016"
  },
  {
    "city": "warren",
    "name": "kent state u-trumbull",
    "state": "oh",
    "zipcode": "44483-1931",
    "date": "1/30/2016"
  },
  {
    "city": "tacoma",
    "name": "university of puget sound",
    "state": "wa",
    "zipcode": 98416,
    "date": "1/30/2016"
  },
  {
    "city": "pewaukee",
    "name": "waukesha county tech coll",
    "state": "wi",
    "zipcode": 53072,
    "date": "1/30/2016"
  },
  {
    "city": "lewiston",
    "name": "lewis clark state college",
    "state": "id",
    "zipcode": 83501,
    "date": "1/30/2016"
  },
  {
    "city": "little rock",
    "name": "univ arkansas little rock",
    "state": "ar",
    "zipcode": "72204-1000",
    "date": "1/30/2016"
  },
  {
    "city": "river forest",
    "name": "concordia university",
    "state": "il",
    "zipcode": "60305-1402",
    "date": "1/30/2016"
  },
  {
    "city": "boston",
    "name": "boston univ",
    "state": "ma",
    "zipcode": 2215,
    "date": "1/30/2016"
  },
  {
    "city": "johnson city",
    "name": "east tennessee state univ",
    "state": "tn",
    "zipcode": 37614,
    "date": "1/30/2016"
  },
  {
    "city": "philippi",
    "name": "alderson broaddus university",
    "state": "wv",
    "zipcode": 26416,
    "date": "1/31/2016"
  },
  {
    "city": "orlando",
    "name": "valencia coll - lake nona",
    "state": "fl",
    "zipcode": 32832,
    "date": "1/31/2016"
  },
  {
    "city": "germantown",
    "name": "montgomery coll - germantown",
    "state": "md",
    "zipcode": 20876,
    "date": "1/31/2016"
  },
  {
    "city": "providence",
    "name": "comm college rhode island",
    "state": "ri",
    "zipcode": 29052304,
    "date": "1/31/2016"
  },
  {
    "city": "fall river",
    "name": "bristol community college",
    "state": "ma",
    "zipcode": "02720-7307",
    "date": "1/31/2016"
  },
  {
    "city": "washington",
    "name": "american university",
    "state": "dc",
    "zipcode": 20016,
    "date": "1/31/2016"
  },
  {
    "city": "pasco",
    "name": "columbia basin college",
    "state": "wa",
    "zipcode": 99301,
    "date": "1/31/2016"
  },
  {
    "city": "mobile",
    "name": "university of south alabama",
    "state": "al",
    "zipcode": "36688-3053",
    "date": "8/23/2017"
  },
  {
    "city": "galva",
    "name": "black hawk coll - e campus",
    "state": "il",
    "zipcode": "61434-9476",
    "date": "8/23/2017"
  },
  {
    "city": "cambridge",
    "name": "anoka ramsey cc - cambridge",
    "state": "mn",
    "zipcode": "55008-5706",
    "date": "8/23/2017"
  },
  {
    "city": "florence",
    "name": "francis marion univ",
    "state": "sc",
    "zipcode": 29506,
    "date": "8/23/2017"
  },
  {
    "city": "middletown",
    "name": "penn state u harrisburg",
    "state": "pa",
    "zipcode": "17057-4846",
    "date": "8/23/2017"
  },
  {
    "city": "colorado springs",
    "name": "csu pueblo",
    "state": "co",
    "zipcode": 80909,
    "date": "8/23/2017"
  },
  {
    "city": "kingsville",
    "name": "texas a & m univ - kingsville",
    "state": "tx",
    "zipcode": 78363,
    "date": "8/23/2017"
  },
  {
    "city": "purchase",
    "name": "manhattanville college",
    "state": "ny",
    "zipcode": "10577-2131",
    "date": "8/23/2017"
  },
  {
    "city": "ft collins",
    "name": "front range c c - larimer",
    "state": "co",
    "zipcode": 805263812,
    "date": "8/23/2017"
  },
  {
    "city": "milwaukee",
    "name": "mount mary univ - wi",
    "state": "wi",
    "zipcode": "53222-4545",
    "date": "8/23/2017"
  },
  {
    "city": "raleigh",
    "name": "meredith college",
    "state": "nc",
    "zipcode": "27607-5237",
    "date": "8/23/2017"
  },
  {
    "city": "baltimore",
    "name": "morgan state university",
    "state": "md",
    "zipcode": "21251-0001",
    "date": "8/23/2017"
  },
  {
    "city": "jackson",
    "name": "jackson state university",
    "state": "ms",
    "zipcode": "39204-2335",
    "date": "8/23/2017"
  },
  {
    "city": "hiram",
    "name": "hiram college",
    "state": "oh",
    "zipcode": 44234,
    "date": "8/23/2017"
  },
  {
    "city": "owensboro",
    "name": "kctcs-owensboro",
    "state": "ky",
    "zipcode": "42303-1800",
    "date": "8/23/2017"
  },
  {
    "city": "ukiah",
    "name": "mendocino college",
    "state": "ca",
    "zipcode": 95482,
    "date": "8/23/2017"
  },
  {
    "city": "mountain home",
    "name": "arkansas st univ-mtn home",
    "state": "ar",
    "zipcode": 72653,
    "date": "8/23/2017"
  },
  {
    "city": "augusta",
    "name": "augusta college",
    "state": "ga",
    "zipcode": "30904-4562",
    "date": "8/23/2017"
  },
  {
    "city": "baton rouge",
    "name": "baton rouge cmty college",
    "state": "la",
    "zipcode": "70806-4156",
    "date": "8/23/2017"
  },
  {
    "city": "blue ash",
    "name": "uc - blue ash",
    "state": "oh",
    "zipcode": "45236-1007",
    "date": "8/23/2017"
  },
  {
    "city": "inver grove heights",
    "name": "inver hills comm college",
    "state": "mn",
    "zipcode": "55076-3224",
    "date": "8/23/2017"
  },
  {
    "city": "new rochelle",
    "name": "iona college",
    "state": "ny",
    "zipcode": "10801-1830",
    "date": "8/23/2017"
  },
  {
    "city": "los angeles",
    "name": "cal state u - los angeles",
    "state": "ca",
    "zipcode": 90032,
    "date": "8/23/2017"
  },
  {
    "city": "huntingdon",
    "name": "juniata college",
    "state": "pa",
    "zipcode": "16652-2119",
    "date": "8/23/2017"
  },
  {
    "city": "cheraw",
    "name": "northeast technical college",
    "state": "sc",
    "zipcode": 29520,
    "date": "8/23/2017"
  },
  {
    "city": "weyers cave",
    "name": "vccs - blue ridge cc",
    "state": "va",
    "zipcode": "24486-0080",
    "date": "8/23/2017"
  },
  {
    "city": "quebec",
    "name": "Vanier College",
    "state": "montreal",
    "zipcode": "H4L 3X9",
    "date": "8/23/2017"
  },
  {
    "city": "brooklyn park",
    "name": "north hennepin cmty college",
    "state": "mn",
    "zipcode": "55445-2231",
    "date": "8/23/2017"
  },
  {
    "city": "danville",
    "name": "centre college",
    "state": "ky",
    "zipcode": "40422-1309",
    "date": "12/22/2016"
  },
  {
    "city": "virginia beach",
    "name": "regent university",
    "state": "va",
    "zipcode": 23464,
    "date": "12/22/2016"
  },
  {
    "city": "schenectady",
    "name": "union college",
    "state": "ny",
    "zipcode": "12308-3103",
    "date": "12/22/2016"
  },
  {
    "city": "indianapolis",
    "name": "indiana univ-purdue u-indy",
    "state": "in",
    "zipcode": 46202,
    "date": "12/25/2016"
  },
  {
    "city": "davis",
    "name": "univ of calif - davis",
    "state": "ca",
    "zipcode": 95616,
    "date": "12/26/2016"
  },
  {
    "city": "perrysburg",
    "name": "healing arts institute",
    "state": "oh",
    "zipcode": "43551-3138",
    "date": "12/28/2016"
  },
  {
    "city": "kokomo",
    "name": "indiana univ - kokomo",
    "state": "in",
    "zipcode": 46904,
    "date": "12/29/2016"
  },
  {
    "city": "ironton",
    "name": "ohio univ southern campus",
    "state": "oh",
    "zipcode": "45638-2279",
    "date": "12/29/2016"
  },
  {
    "city": "eureka",
    "name": "college of the redwoods",
    "state": "ca",
    "zipcode": 95501,
    "date": "12/29/2016"
  },
  {
    "city": "westminster",
    "name": "carroll comm college",
    "state": "md",
    "zipcode": 21157,
    "date": "12/30/2016"
  },
  {
    "city": "lakewood",
    "name": "clover park technical colle",
    "state": "wa",
    "zipcode": 98499,
    "date": "12/31/2016"
  },
  {
    "city": "santa clara",
    "name": "mission college",
    "state": "ca",
    "zipcode": 95054,
    "date": "1/1/2017"
  },
  {
    "city": "chicago",
    "name": "depaul univ-loop campus",
    "state": "il",
    "zipcode": "60604-2201",
    "date": "1/1/2017"
  },
  {
    "city": "albany",
    "name": "excelsior college",
    "state": "ny",
    "zipcode": 12203,
    "date": "1/2/2017"
  },
  {
    "city": "de pere",
    "name": "saint norbert college",
    "state": "wi",
    "zipcode": "54115-2002",
    "date": "1/2/2017"
  },
  {
    "city": "los angeles",
    "name": "la coll of microtechnology",
    "state": "ca",
    "zipcode": 90017,
    "date": "1/2/2017"
  },
  {
    "city": "spokane",
    "name": "spokane community college",
    "state": "wa",
    "zipcode": 99217,
    "date": "1/2/2017"
  },
  {
    "city": "tacoma",
    "name": "tacoma community college",
    "state": "wa",
    "zipcode": 98466,
    "date": "1/2/2017"
  },
  {
    "city": "naperville",
    "name": "north central college",
    "state": "il",
    "zipcode": "60540-4607",
    "date": "1/2/2017"
  },
  {
    "city": "somerset",
    "name": "kctcs-somerset",
    "state": "ky",
    "zipcode": "42501-2973",
    "date": "1/2/2017"
  },
  {
    "city": "longview",
    "name": "lower columbia college",
    "state": "wa",
    "zipcode": 98632,
    "date": "1/3/2017"
  },
  {
    "city": "columbia",
    "name": "howard community college",
    "state": "md",
    "zipcode": 21044,
    "date": "1/3/2017"
  },
  {
    "city": "glendora",
    "name": "citrus college",
    "state": "ca",
    "zipcode": "91741-1899",
    "date": "1/3/2017"
  },
  {
    "city": "notre dame",
    "name": "university of notre dame",
    "state": "in",
    "zipcode": 46556,
    "date": "1/3/2017"
  },
  {
    "city": "el cajon",
    "name": "cuyamaca college",
    "state": "ca",
    "zipcode": 92019,
    "date": "1/3/2017"
  },
  {
    "city": "moses lake",
    "name": "big bend community college",
    "state": "wa",
    "zipcode": 98837,
    "date": "1/3/2017"
  },
  {
    "city": "wilkes barre",
    "name": "wilkes university",
    "state": "pa",
    "zipcode": "18766-0997",
    "date": "1/3/2017"
  },
  {
    "city": "philadelphia",
    "name": "drexel university",
    "state": "pa",
    "zipcode": "19104-2816",
    "date": "1/4/2017"
  },
  {
    "city": "los altos hills",
    "name": "foothill c -los altos hills",
    "state": "ca",
    "zipcode": 94022,
    "date": "1/31/2016"
  },
  {
    "city": "oneonta",
    "name": "suny at oneonta",
    "state": "ny",
    "zipcode": "13820-2685",
    "date": "1/31/2016"
  },
  {
    "city": "venice",
    "name": "state coll of florida - venice",
    "state": "fl",
    "zipcode": "34293-5113",
    "date": "1/31/2016"
  },
  {
    "city": "austin",
    "name": "austin c c - pinnacle",
    "state": "tx",
    "zipcode": 78736,
    "date": "1/31/2016"
  },
  {
    "city": "pittsburgh",
    "name": "duquesne university",
    "state": "pa",
    "zipcode": 15282,
    "date": "1/31/2016"
  },
  {
    "city": "lexington",
    "name": "kctcs-bluegrass-cooper",
    "state": "ky",
    "zipcode": "40506-0001",
    "date": "1/31/2016"
  },
  {
    "city": "harriman",
    "name": "roane st cmty college",
    "state": "tn",
    "zipcode": "37748-8615",
    "date": "1/31/2016"
  },
  {
    "city": "sidney",
    "name": "montcalm comm college",
    "state": "mi",
    "zipcode": "48885-9723",
    "date": "1/31/2016"
  },
  {
    "city": "brunswick",
    "name": "college of coastal georgia",
    "state": "ga",
    "zipcode": "31520-3632",
    "date": "1/31/2016"
  },
  {
    "city": "avondale",
    "name": "estrella mountain cc",
    "state": "az",
    "zipcode": 85392,
    "date": "1/31/2016"
  },
  {
    "city": "westerville",
    "name": "otterbein university",
    "state": "oh",
    "zipcode": 43081,
    "date": "1/31/2016"
  },
  {
    "city": "bloomington",
    "name": "ivy tech comm coll - bloomington",
    "state": "in",
    "zipcode": "47404-9772",
    "date": "1/31/2016"
  },
  {
    "city": "cypress",
    "name": "cypress college",
    "state": "ca",
    "zipcode": 90630,
    "date": "1/31/2016"
  },
  {
    "city": "folsom",
    "name": "folsom lake college",
    "state": "ca",
    "zipcode": 95630,
    "date": "1/31/2016"
  },
  {
    "city": "ft pierce",
    "name": "indian river state college",
    "state": "fl",
    "zipcode": 34981,
    "date": "1/31/2016"
  },
  {
    "city": "centralia",
    "name": "centralia college",
    "state": "wa",
    "zipcode": 98531,
    "date": "1/31/2016"
  },
  {
    "city": "new york",
    "name": "pace university",
    "state": "ny",
    "zipcode": "10038-1502",
    "date": "1/31/2016"
  },
  {
    "city": "schenectady",
    "name": "schenectady county cc",
    "state": "ny",
    "zipcode": 12305,
    "date": "1/31/2016"
  },
  {
    "city": "livonia",
    "name": "madonna university",
    "state": "mi",
    "zipcode": 48150,
    "date": "1/31/2016"
  },
  {
    "city": "elyria",
    "name": "ashland univ - elyria",
    "state": "oh",
    "zipcode": 44035,
    "date": "1/31/2016"
  },
  {
    "city": "dixon",
    "name": "sauk valley college",
    "state": "il",
    "zipcode": 61021,
    "date": "1/31/2016"
  },
  {
    "city": "anderson",
    "name": "ivy tech comm coll - anderson",
    "state": "in",
    "zipcode": "46013-1502",
    "date": "1/31/2016"
  },
  {
    "city": "rochester",
    "name": "monroe community college",
    "state": "ny",
    "zipcode": "14623-5701",
    "date": "1/31/2016"
  },
  {
    "city": "estherville",
    "name": "iowa lakes cc-estherville",
    "state": "ia",
    "zipcode": "51334-2721",
    "date": "1/31/2016"
  },
  {
    "city": "orono",
    "name": "univ of maine at orono",
    "state": "me",
    "zipcode": 4469,
    "date": "1/31/2016"
  },
  {
    "city": "olney",
    "name": "olney central college",
    "state": "il",
    "zipcode": "62450-1043",
    "date": "8/23/2017"
  },
  {
    "city": "tampa",
    "name": "hillsborough cmty coll ybor",
    "state": "fl",
    "zipcode": 33605,
    "date": "8/23/2017"
  },
  {
    "city": "charlottesville",
    "name": "vccs - piedmont virginia cc",
    "state": "va",
    "zipcode": "22902-7589",
    "date": "8/23/2017"
  },
  {
    "city": "goldsboro",
    "name": "wayne community coll goldsb",
    "state": "nc",
    "zipcode": "27534-8212",
    "date": "8/23/2017"
  },
  {
    "city": "bel air",
    "name": "harford community college",
    "state": "md",
    "zipcode": "21015-1627",
    "date": "8/23/2017"
  },
  {
    "city": "raymond",
    "name": "hinds cc- raymond",
    "state": "ms",
    "zipcode": 39154,
    "date": "8/23/2017"
  },
  {
    "city": "springfield",
    "name": "drury university-springfield",
    "state": "mo",
    "zipcode": "65802-3712",
    "date": "8/23/2017"
  },
  {
    "city": "fairfield",
    "name": "solano community college",
    "state": "ca",
    "zipcode": 945344017,
    "date": "8/23/2017"
  },
  {
    "city": "beebe",
    "name": "arkansas state u beebe br",
    "state": "ar",
    "zipcode": "72012-3109",
    "date": "8/23/2017"
  },
  {
    "city": "ankeny",
    "name": "des moines area c c-ankeny",
    "state": "ia",
    "zipcode": "50023-8995",
    "date": "8/23/2017"
  },
  {
    "city": "san antonio",
    "name": "our lady of the lake univ",
    "state": "tx",
    "zipcode": 78207,
    "date": "8/23/2017"
  },
  {
    "city": "forrest city",
    "name": "east arkansas comm coll",
    "state": "ar",
    "zipcode": 72335,
    "date": "8/23/2017"
  },
  {
    "city": "temple terrace",
    "name": "univ of south florida",
    "state": "fl",
    "zipcode": 33637,
    "date": "8/23/2017"
  },
  {
    "city": "helena",
    "name": "carroll college",
    "state": "mt",
    "zipcode": "59625-0001",
    "date": "8/23/2017"
  },
  {
    "city": "chicago heights",
    "name": "prairie state college",
    "state": "il",
    "zipcode": "60411-8200",
    "date": "8/23/2017"
  },
  {
    "city": "institute",
    "name": "west virginia st univ",
    "state": "wv",
    "zipcode": 25112,
    "date": "8/23/2017"
  },
  {
    "city": "bemidji",
    "name": "bemidji state university",
    "state": "mn",
    "zipcode": 56601,
    "date": "8/23/2017"
  },
  {
    "city": "devils lake",
    "name": "lake region state college",
    "state": "nd",
    "zipcode": "58301-1598",
    "date": "8/23/2017"
  },
  {
    "city": "tampa",
    "name": "university of south florida",
    "state": "fl",
    "zipcode": "33620-9951",
    "date": "8/23/2017"
  },
  {
    "city": "lumberton",
    "name": "robeson community college",
    "state": "nc",
    "zipcode": "28360-2158",
    "date": "8/23/2017"
  },
  {
    "city": "ottawa",
    "name": "ottawa university",
    "state": "ks",
    "zipcode": "66067-3341",
    "date": "8/23/2017"
  },
  {
    "city": "madison",
    "name": "ivy tech comm coll - madison",
    "state": "in",
    "zipcode": 47250,
    "date": "8/23/2017"
  },
  {
    "city": "lawrenceville",
    "name": "georgia gwinnett college",
    "state": "ga",
    "zipcode": "30043-7409",
    "date": "8/23/2017"
  },
  {
    "city": "burnaby",
    "name": "simon fraser university",
    "state": "bc",
    "zipcode": "v5a 1s6",
    "date": "8/23/2017"
  },
  {
    "city": "jamestown",
    "name": "jamestown cmty clg jamestwn",
    "state": "ny",
    "zipcode": "14701-1920",
    "date": "8/23/2017"
  },
  {
    "city": "marietta",
    "name": "kennesaw state univ - marietta cmps",
    "state": "ga",
    "zipcode": "30060-2855",
    "date": "8/23/2017"
  },
  {
    "city": "berkeley",
    "name": "univ of calif - berkeley",
    "state": "ca",
    "zipcode": 94720,
    "date": "8/23/2017"
  },
  {
    "city": "wichita",
    "name": "friends university",
    "state": "ks",
    "zipcode": "67213-3379",
    "date": "8/23/2017"
  },
  {
    "city": "winston salem",
    "name": "forsyth technical comm coll",
    "state": "nc",
    "zipcode": "27103-5150",
    "date": "8/24/2017"
  },
  {
    "city": "overland park",
    "name": "univ of kansas-overland par",
    "state": "ks",
    "zipcode": 66225,
    "date": "8/24/2017"
  },
  {
    "city": "sayre",
    "name": "s w ok st univ-sayre",
    "state": "ok",
    "zipcode": 73662,
    "date": "8/24/2017"
  },
  {
    "city": "media",
    "name": "penn state u brandywine",
    "state": "pa",
    "zipcode": "19063-5522",
    "date": "8/24/2017"
  },
  {
    "city": "keene",
    "name": "southwestern adventist univ",
    "state": "tx",
    "zipcode": 76059,
    "date": "8/24/2017"
  },
  {
    "city": "fairfax",
    "name": "george mason university",
    "state": "va",
    "zipcode": "22030-4422",
    "date": "8/24/2017"
  },
  {
    "city": "lima",
    "name": "j a rhodes state college",
    "state": "oh",
    "zipcode": "45804-3576",
    "date": "8/24/2017"
  },
  {
    "city": "wilmington",
    "name": "southern state cc - north",
    "state": "oh",
    "zipcode": "45177-7146",
    "date": "8/24/2017"
  },
  {
    "city": "mandeville",
    "name": "northshore tech cc - mandeville",
    "state": "la",
    "zipcode": 70471,
    "date": "8/24/2017"
  },
  {
    "city": "san mateo",
    "name": "college of san mateo",
    "state": "ca",
    "zipcode": 94402,
    "date": "8/24/2017"
  },
  {
    "city": "alfred",
    "name": "alfred university",
    "state": "ny",
    "zipcode": 14802,
    "date": "8/24/2017"
  },
  {
    "city": "raleigh",
    "name": "nc state university",
    "state": "nc",
    "zipcode": "27606-1428",
    "date": "8/24/2017"
  },
  {
    "city": "merced",
    "name": "uc merced",
    "state": "ca",
    "zipcode": 95343,
    "date": "8/24/2017"
  },
  {
    "city": "cresson",
    "name": "mount aloysius college",
    "state": "pa",
    "zipcode": "16630-1902",
    "date": "8/24/2017"
  },
  {
    "city": "moscow",
    "name": "university of idaho",
    "state": "id",
    "zipcode": 83844,
    "date": "8/24/2017"
  },
  {
    "city": "orange park",
    "name": "st johns river st coll - org park",
    "state": "fl",
    "zipcode": "32065-7639",
    "date": "8/24/2017"
  },
  {
    "city": "new orleans",
    "name": "loyola university",
    "state": "la",
    "zipcode": "70118-6143",
    "date": "8/24/2017"
  },
  {
    "city": "cleveland",
    "name": "truett mcconnell college",
    "state": "ga",
    "zipcode": "30528-1264",
    "date": "8/24/2017"
  },
  {
    "city": "greensburg",
    "name": "seton hill university",
    "state": "pa",
    "zipcode": 15601,
    "date": "8/24/2017"
  },
  {
    "city": "notre dame",
    "name": "holy cross college",
    "state": "in",
    "zipcode": 46556,
    "date": "8/24/2017"
  },
  {
    "city": "west liberty",
    "name": "west liberty university",
    "state": "wv",
    "zipcode": 26074,
    "date": "8/24/2017"
  },
  {
    "city": "west des moines",
    "name": "des moines area cc-west",
    "state": "ia",
    "zipcode": "50266-5302",
    "date": "8/24/2017"
  },
  {
    "city": "huntsville",
    "name": "univ of alabama-huntsville",
    "state": "al",
    "zipcode": "35899-1911",
    "date": "8/24/2017"
  },
  {
    "city": "lakeland",
    "name": "florida southern college",
    "state": "fl",
    "zipcode": "33801-5607",
    "date": "8/24/2017"
  },
  {
    "city": "greensburg",
    "name": "northshore tech cc - greensburg",
    "state": "la",
    "zipcode": 70441,
    "date": "8/24/2017"
  },
  {
    "city": "tamp",
    "name": "saint leo univ - tampa",
    "state": "fl",
    "zipcode": 336198317,
    "date": "8/24/2017"
  },
  {
    "city": "altoona",
    "name": "penn state u altoona",
    "state": "pa",
    "zipcode": "16601-3777",
    "date": "8/24/2017"
  },
  {
    "city": "tulsa",
    "name": "tulsa comm coll-west campus",
    "state": "ok",
    "zipcode": 74107,
    "date": "3/10/2015"
  },
  {
    "city": "medford",
    "name": "tufts university",
    "state": "ma",
    "zipcode": 2155,
    "date": "3/11/2015"
  },
  {
    "city": "pensacola",
    "name": "pensacola state college",
    "state": "fl",
    "zipcode": "32504-8910",
    "date": "3/11/2015"
  },
  {
    "city": "spokane",
    "name": "whitworth university",
    "state": "wa",
    "zipcode": 99251,
    "date": "3/12/2015"
  },
  {
    "city": "albemarle",
    "name": "stanly community college",
    "state": "nc",
    "zipcode": "28001-7458",
    "date": "3/12/2015"
  },
  {
    "city": "newton",
    "name": "boston college",
    "state": "ma",
    "zipcode": "02459-1148",
    "date": "3/12/2015"
  },
  {
    "city": "redlands",
    "name": "community christian college",
    "state": "ca",
    "zipcode": 92373,
    "date": "3/12/2015"
  },
  {
    "city": "detroit",
    "name": "wayne cnty cc-nw",
    "state": "mi",
    "zipcode": "48219-3580",
    "date": "3/12/2015"
  },
  {
    "city": "grand rapids",
    "name": "aquinas college",
    "state": "mi",
    "zipcode": "49506-1741",
    "date": "3/18/2015"
  },
  {
    "city": "kingwood",
    "name": "lonestar college - kingwood",
    "state": "tx",
    "zipcode": 77339,
    "date": "3/18/2015"
  },
  {
    "city": "orlando",
    "name": "valencia coll - west",
    "state": "fl",
    "zipcode": "32811-2302",
    "date": "3/24/2015"
  },
  {
    "city": "owensboro",
    "name": "kctcs-owensboro-downtown",
    "state": "ky",
    "zipcode": "42301-4806",
    "date": "3/24/2015"
  },
  {
    "city": "saint paul",
    "name": "macalester college",
    "state": "mn",
    "zipcode": "55105-1801",
    "date": "3/26/2015"
  },
  {
    "city": "los angeles",
    "name": "ucla - los angeles",
    "state": "ca",
    "zipcode": 90095,
    "date": "3/30/2015"
  },
  {
    "city": "bryan",
    "name": "blinn -occ ed college",
    "state": "tx",
    "zipcode": 77801,
    "date": "3/30/2015"
  },
  {
    "city": "kaneohe",
    "name": "hawaii pacific univ-loa",
    "state": "hi",
    "zipcode": 96744,
    "date": "3/31/2015"
  },
  {
    "city": "orlando",
    "name": "adventist univ of health sci",
    "state": "fl",
    "zipcode": "32803-1237",
    "date": "3/31/2015"
  },
  {
    "city": "seminole",
    "name": "seminole state college",
    "state": "ok",
    "zipcode": 74868,
    "date": "4/1/2015"
  },
  {
    "city": "nashville",
    "name": "tenn state university",
    "state": "tn",
    "zipcode": 37209,
    "date": "4/5/2015"
  },
  {
    "city": "lenexa",
    "name": "a & l underground inc",
    "state": "ks",
    "zipcode": 66215,
    "date": "4/7/2015"
  },
  {
    "city": "mount vernon",
    "name": "skagit valley college",
    "state": "wa",
    "zipcode": 98273,
    "date": "4/7/2015"
  },
  {
    "city": "presque isle",
    "name": "northern maine comm coll",
    "state": "me",
    "zipcode": "04769-2016",
    "date": "4/7/2015"
  },
  {
    "city": "columbus",
    "name": "inside sales",
    "state": "oh",
    "zipcode": 43235,
    "date": "4/9/2015"
  },
  {
    "city": "colchester",
    "name": "saint michaels college",
    "state": "vt",
    "zipcode": "05439-0001",
    "date": "4/9/2015"
  },
  {
    "city": "aberdeen",
    "name": "grays harbor cmty college",
    "state": "wa",
    "zipcode": 98520,
    "date": "4/13/2015"
  },
  {
    "city": "mobile",
    "name": "spring hill college",
    "state": "al",
    "zipcode": "36608-1780",
    "date": "4/15/2015"
  },
  {
    "city": "media",
    "name": "pennsylvania inst tech",
    "state": "pa",
    "zipcode": "19063-4036",
    "date": "4/17/2015"
  },
  {
    "city": "garden city",
    "name": "nassau community college",
    "state": "ny",
    "zipcode": 11530,
    "date": "4/18/2015"
  },
  {
    "city": "hartsville",
    "name": "coker college",
    "state": "sc",
    "zipcode": "29550-3742",
    "date": "4/18/2015"
  },
  {
    "city": "olympia",
    "name": "south puget sound cmty coll",
    "state": "wa",
    "zipcode": 98512,
    "date": "4/20/2015"
  },
  {
    "city": "tifton",
    "name": "abraham baldwin agric coll",
    "state": "ga",
    "zipcode": 31793,
    "date": "4/21/2015"
  },
  {
    "city": "brooklyn",
    "name": "brooklyn college",
    "state": "ny",
    "zipcode": "11210-2850",
    "date": "4/21/2015"
  },
  {
    "city": "sumter",
    "name": "central carolina tech coll",
    "state": "sc",
    "zipcode": 29150,
    "date": "4/22/2015"
  },
  {
    "city": "rockville",
    "name": "johns hopkins university",
    "state": "md",
    "zipcode": "20850-3330",
    "date": "4/22/2015"
  },
  {
    "city": "keuka park",
    "name": "keuka college",
    "state": "ny",
    "zipcode": 14478,
    "date": "4/24/2015"
  },
  {
    "city": "cortland",
    "name": "suny at cortland",
    "state": "ny",
    "zipcode": 13045,
    "date": "4/25/2015"
  },
  {
    "city": "parkville",
    "name": "park university",
    "state": "mo",
    "zipcode": "64152-4358",
    "date": "4/27/2015"
  },
  {
    "city": "glassboro",
    "name": "rowan university of new jersey",
    "state": "nj",
    "zipcode": "08028-1700",
    "date": "4/29/2015"
  },
  {
    "city": "jacksonville",
    "name": "fl st coll - jacksonville south",
    "state": "fl",
    "zipcode": 32246,
    "date": "1/4/2017"
  },
  {
    "city": "johnstown",
    "name": "univ of pitts at johnstown",
    "state": "pa",
    "zipcode": "15904-2912",
    "date": "1/4/2017"
  },
  {
    "city": "greenville",
    "name": "thiel college",
    "state": "pa",
    "zipcode": "16125-2186",
    "date": "1/4/2017"
  },
  {
    "city": "boston",
    "name": "wentworth inst of tech",
    "state": "ma",
    "zipcode": "02115-5901",
    "date": "1/4/2017"
  },
  {
    "city": "portland",
    "name": "portland cmty coll cascade",
    "state": "or",
    "zipcode": 97217,
    "date": "1/4/2017"
  },
  {
    "city": "meridan",
    "name": "univ of phoenix - id",
    "state": "id",
    "zipcode": 83642,
    "date": "1/4/2017"
  },
  {
    "city": "greensburg",
    "name": "univ of pitts at greensburg",
    "state": "pa",
    "zipcode": "15601-5804",
    "date": "1/4/2017"
  },
  {
    "city": "titusville",
    "name": "univ of pitts at titusville",
    "state": "pa",
    "zipcode": 16354,
    "date": "1/4/2017"
  },
  {
    "city": "portland",
    "name": "portland cmty coll rock crk",
    "state": "or",
    "zipcode": 97229,
    "date": "1/5/2017"
  },
  {
    "city": "nashua",
    "name": "rivier university",
    "state": "nh",
    "zipcode": 3060,
    "date": "1/5/2017"
  },
  {
    "city": "jacksonville",
    "name": "jacksonville st university",
    "state": "al",
    "zipcode": "36265-1602",
    "date": "1/5/2017"
  },
  {
    "city": "santa clara",
    "name": "santa clara university",
    "state": "ca",
    "zipcode": 95053,
    "date": "1/5/2017"
  },
  {
    "city": "tampa",
    "name": "southwest florida coll",
    "state": "fl",
    "zipcode": "33619-1344",
    "date": "1/5/2017"
  },
  {
    "city": "oakwood",
    "name": "lanier tech coll - oakwood",
    "state": "ga",
    "zipcode": 30566,
    "date": "1/5/2017"
  },
  {
    "city": "hanceville",
    "name": "wallace st comm coll-hanceville",
    "state": "al",
    "zipcode": 35077,
    "date": "1/5/2017"
  },
  {
    "city": "warren",
    "name": "macomb cmty coll-south cp",
    "state": "mi",
    "zipcode": 48088,
    "date": "1/31/2016"
  },
  {
    "city": "west chester",
    "name": "west chester university",
    "state": "pa",
    "zipcode": 19383,
    "date": "2/1/2016"
  },
  {
    "city": "hobbs",
    "name": "new mexico junior college",
    "state": "nm",
    "zipcode": 88240,
    "date": "2/1/2016"
  },
  {
    "city": "portsmouth",
    "name": "great bay community coll",
    "state": "nh",
    "zipcode": "03801-2879",
    "date": "2/1/2016"
  },
  {
    "city": "takoma park",
    "name": "montgomery coll-takoma park",
    "state": "md",
    "zipcode": "20912-4141",
    "date": "2/1/2016"
  },
  {
    "city": "texarkana",
    "name": "texarkana college",
    "state": "tx",
    "zipcode": 75501,
    "date": "2/1/2016"
  },
  {
    "city": "indianapolis",
    "name": "marian university - in",
    "state": "in",
    "zipcode": "46222-1960",
    "date": "2/1/2016"
  },
  {
    "city": "franklin springs",
    "name": "emmanuel college",
    "state": "ga",
    "zipcode": 30639,
    "date": "1/6/2017"
  },
  {
    "city": "pensacola",
    "name": "university of west florida",
    "state": "fl",
    "zipcode": 32514,
    "date": "1/6/2017"
  },
  {
    "city": "columbia",
    "name": "columbia college",
    "state": "sc",
    "zipcode": 29203,
    "date": "1/6/2017"
  },
  {
    "city": "flint",
    "name": "univ of michigan-flint",
    "state": "mi",
    "zipcode": 48502,
    "date": "1/6/2017"
  },
  {
    "city": "chicago",
    "name": "university of chicago",
    "state": "il",
    "zipcode": 60637,
    "date": "1/6/2017"
  },
  {
    "city": "lancaster",
    "name": "ohio univ-lancaster",
    "state": "oh",
    "zipcode": "43130-1037",
    "date": "1/6/2017"
  },
  {
    "city": "greenville",
    "name": "furman university",
    "state": "sc",
    "zipcode": "29613-0002",
    "date": "1/6/2017"
  },
  {
    "city": "aberdeen",
    "name": "presentation college",
    "state": "sd",
    "zipcode": 57401,
    "date": "1/6/2017"
  },
  {
    "city": "eugene",
    "name": "university of oregon",
    "state": "or",
    "zipcode": "97403-1253",
    "date": "1/6/2017"
  },
  {
    "city": "portland",
    "name": "univ of oregon",
    "state": "or",
    "zipcode": 97204,
    "date": "1/7/2017"
  },
  {
    "city": "fort myers",
    "name": "fl southwestern st coll - lee campus",
    "state": "fl",
    "zipcode": "33919-5566",
    "date": "1/7/2017"
  },
  {
    "city": "chester",
    "name": "vccs - john tyler cc-chester",
    "state": "va",
    "zipcode": 23831,
    "date": "1/7/2017"
  },
  {
    "city": "riverside",
    "name": "univ of calif - riverside",
    "state": "ca",
    "zipcode": 92521,
    "date": "2/1/2016"
  },
  {
    "city": "hudson",
    "name": "caldwell community college",
    "state": "nc",
    "zipcode": "28638-2672",
    "date": "2/1/2016"
  },
  {
    "city": "seattle",
    "name": "shoreline cmty college",
    "state": "wa",
    "zipcode": 98133,
    "date": "2/1/2016"
  },
  {
    "city": "boone",
    "name": "des moines area cc-boone",
    "state": "ia",
    "zipcode": "50036-5326",
    "date": "2/1/2016"
  },
  {
    "city": "malibu",
    "name": "pepperdine univ - malibu",
    "state": "ca",
    "zipcode": 90263,
    "date": "2/1/2016"
  },
  {
    "city": "mexia",
    "name": "navarro coll - mexia",
    "state": "tx",
    "zipcode": 76667,
    "date": "2/1/2016"
  },
  {
    "city": "springfield",
    "name": "american international coll",
    "state": "ma",
    "zipcode": "01109-3151",
    "date": "2/1/2016"
  },
  {
    "city": "hamilton",
    "name": "colgate university",
    "state": "ny",
    "zipcode": "13346-1338",
    "date": "2/1/2016"
  },
  {
    "city": "madisonville",
    "name": "kctcs-madisonville",
    "state": "ky",
    "zipcode": "42431-9185",
    "date": "2/1/2016"
  },
  {
    "city": "whittier",
    "name": "rio hondo college",
    "state": "ca",
    "zipcode": 90601,
    "date": "2/1/2016"
  },
  {
    "city": "bennington",
    "name": "southern vermont college",
    "state": "vt",
    "zipcode": "05201-9269",
    "date": "2/1/2016"
  },
  {
    "city": "costa mesa",
    "name": "orange coast college",
    "state": "ca",
    "zipcode": 92626,
    "date": "2/1/2016"
  },
  {
    "city": "allentown",
    "name": "cedar crest college",
    "state": "pa",
    "zipcode": "18104-6132",
    "date": "2/1/2016"
  },
  {
    "city": "new orleans",
    "name": "tulane university",
    "state": "la",
    "zipcode": "70118-5665",
    "date": "2/1/2016"
  },
  {
    "city": "ft worth",
    "name": "tarrant cnty coll so",
    "state": "tx",
    "zipcode": 76119,
    "date": "2/1/2016"
  },
  {
    "city": "farmington hills",
    "name": "oakland cc -orchard ridge",
    "state": "mi",
    "zipcode": 48334,
    "date": "2/1/2016"
  },
  {
    "city": "bismarck",
    "name": "bismarck state college",
    "state": "nd",
    "zipcode": "58501-1276",
    "date": "2/1/2016"
  },
  {
    "city": "angwin",
    "name": "pacific union college",
    "state": "ca",
    "zipcode": 94508,
    "date": "1/8/2017"
  },
  {
    "city": "aiken",
    "name": "univ of sc - aiken",
    "state": "sc",
    "zipcode": "29801-6389",
    "date": "1/8/2017"
  },
  {
    "city": "portland",
    "name": "university of portland",
    "state": "or",
    "zipcode": 97203,
    "date": "1/8/2017"
  },
  {
    "city": "wayne",
    "name": "wayne state college",
    "state": "ne",
    "zipcode": 68787,
    "date": "1/8/2017"
  },
  {
    "city": "saint augustine",
    "name": "st johns river st coll -st augustine",
    "state": "fl",
    "zipcode": "32084-1197",
    "date": "1/9/2017"
  },
  {
    "city": "plymouth",
    "name": "lakeland college",
    "state": "wi",
    "zipcode": 53073,
    "date": "2/1/2016"
  },
  {
    "city": "bradford",
    "name": "univ of pitts at bradford",
    "state": "pa",
    "zipcode": "16701-2812",
    "date": "2/1/2016"
  },
  {
    "city": "akron",
    "name": "univ of akron",
    "state": "oh",
    "zipcode": "44325-0001",
    "date": "2/1/2016"
  },
  {
    "city": "winchester",
    "name": "kctcs-bluegrass-winchester-clark",
    "state": "ky",
    "zipcode": "40391-1804",
    "date": "2/1/2016"
  },
  {
    "city": "champaign",
    "name": "parkland college",
    "state": "il",
    "zipcode": "61821-1806",
    "date": "2/1/2016"
  },
  {
    "city": "altoona",
    "name": "penn state univ-altoona",
    "state": "pa",
    "zipcode": "16601-3777",
    "date": "2/2/2016"
  },
  {
    "city": "casper",
    "name": "casper college",
    "state": "wy",
    "zipcode": 82601,
    "date": "2/2/2016"
  },
  {
    "city": "roxboro",
    "name": "piedmont community college",
    "state": "nc",
    "zipcode": 27573,
    "date": "2/2/2016"
  },
  {
    "city": "ashtabula",
    "name": "kent state u-ashtabula",
    "state": "oh",
    "zipcode": "44004-2316",
    "date": "2/2/2016"
  },
  {
    "city": "fort morgan",
    "name": "morgan comm coll",
    "state": "co",
    "zipcode": 80701,
    "date": "8/24/2017"
  },
  {
    "city": "pueblo",
    "name": "pueblo community college",
    "state": "co",
    "zipcode": 81004,
    "date": "8/24/2017"
  },
  {
    "city": "st marys city",
    "name": "st marys college",
    "state": "md",
    "zipcode": 20686,
    "date": "8/24/2017"
  },
  {
    "city": "berkeley",
    "name": "berkeley city college",
    "state": "ca",
    "zipcode": 94704,
    "date": "8/24/2017"
  },
  {
    "city": "st louis",
    "name": "st louis cc - meramec",
    "state": "mo",
    "zipcode": 631225799,
    "date": "8/24/2017"
  },
  {
    "city": "norwalk",
    "name": "cerritos college",
    "state": "ca",
    "zipcode": 90650,
    "date": "1/9/2017"
  },
  {
    "city": "weldon",
    "name": "halifax cmty coll",
    "state": "nc",
    "zipcode": "27890-0700",
    "date": "1/9/2017"
  },
  {
    "city": "chesapeake",
    "name": "st leo univ - chesapeake",
    "state": "va",
    "zipcode": 23322,
    "date": "1/9/2017"
  },
  {
    "city": "des moines",
    "name": "grand view university",
    "state": "ia",
    "zipcode": "50316-1529",
    "date": "1/9/2017"
  },
  {
    "city": "alameda",
    "name": "college of alameda",
    "state": "ca",
    "zipcode": 94501,
    "date": "2/2/2016"
  },
  {
    "city": "la verne",
    "name": "university of la verne",
    "state": "ca",
    "zipcode": 91750,
    "date": "2/2/2016"
  },
  {
    "city": "albany",
    "name": "darton college",
    "state": "ga",
    "zipcode": "31707-3023",
    "date": "2/2/2016"
  },
  {
    "city": "san antonio",
    "name": "st philips college",
    "state": "tx",
    "zipcode": 78203,
    "date": "2/2/2016"
  },
  {
    "city": "west allis",
    "name": "milwaukee atc w camp west",
    "state": "wi",
    "zipcode": "53214-3110",
    "date": "2/2/2016"
  },
  {
    "city": "southaven",
    "name": "northwest miss cmty coll",
    "state": "ms",
    "zipcode": "38671-8403",
    "date": "2/2/2016"
  },
  {
    "city": "auburndale",
    "name": "lasell college",
    "state": "ma",
    "zipcode": "02466-2709",
    "date": "2/2/2016"
  },
  {
    "city": "gardner",
    "name": "mount wachusett cmty coll",
    "state": "ma",
    "zipcode": "01440-1378",
    "date": "2/2/2016"
  },
  {
    "city": "terrell",
    "name": "trinity valley cc - terrell",
    "state": "tx",
    "zipcode": 75160,
    "date": "2/2/2016"
  },
  {
    "city": "iowa city",
    "name": "kirkwood cc",
    "state": "ia",
    "zipcode": "52240-3102",
    "date": "2/2/2016"
  },
  {
    "city": "wilson",
    "name": "barton college",
    "state": "nc",
    "zipcode": 27893,
    "date": "2/2/2016"
  },
  {
    "city": "bolivar",
    "name": "southwest baptist univ",
    "state": "mo",
    "zipcode": "65613-2578",
    "date": "2/2/2016"
  },
  {
    "city": "winston salem",
    "name": "salem college",
    "state": "nc",
    "zipcode": "27101-5318",
    "date": "8/24/2017"
  },
  {
    "city": "canyon",
    "name": "west texas a & university",
    "state": "tx",
    "zipcode": 79015,
    "date": "8/24/2017"
  },
  {
    "city": "san francisco",
    "name": "university of san francisco",
    "state": "ca",
    "zipcode": 94117,
    "date": "8/24/2017"
  },
  {
    "city": "warrensburg",
    "name": "university of central missouri",
    "state": "mo",
    "zipcode": 64093,
    "date": "8/24/2017"
  },
  {
    "city": "yucaipa",
    "name": "crafton hills college",
    "state": "ca",
    "zipcode": 92399,
    "date": "8/24/2017"
  },
  {
    "city": "peru",
    "name": "peru state college",
    "state": "ne",
    "zipcode": "68421-3073",
    "date": "8/24/2017"
  },
  {
    "city": "san diego",
    "name": "san diego city coll",
    "state": "ca",
    "zipcode": 92101,
    "date": "8/24/2017"
  },
  {
    "city": "boiling springs",
    "name": "gardner-webb university",
    "state": "nc",
    "zipcode": 28017,
    "date": "8/24/2017"
  },
  {
    "city": "wentworth",
    "name": "rockingham community coll",
    "state": "nc",
    "zipcode": "27375-0038",
    "date": "8/24/2017"
  },
  {
    "city": "alamosa",
    "name": "adams state university",
    "state": "co",
    "zipcode": 81102,
    "date": "8/24/2017"
  },
  {
    "city": "riverdale",
    "name": "manhattan college",
    "state": "ny",
    "zipcode": 10471,
    "date": "8/24/2017"
  },
  {
    "city": "imperial",
    "name": "imperial valley college",
    "state": "ca",
    "zipcode": 92251,
    "date": "8/24/2017"
  },
  {
    "city": "west point",
    "name": "point university",
    "state": "ga",
    "zipcode": 31833,
    "date": "8/24/2017"
  },
  {
    "city": "cedar rapids",
    "name": "coe college",
    "state": "ia",
    "zipcode": 52402,
    "date": "8/24/2017"
  },
  {
    "city": "madera",
    "name": "madera cmty clg ctr",
    "state": "ca",
    "zipcode": 93637,
    "date": "8/24/2017"
  },
  {
    "city": "plymouth",
    "name": "plymouth state university",
    "state": "nh",
    "zipcode": "03264-1595",
    "date": "8/24/2017"
  },
  {
    "city": "columbus",
    "name": "miss university for women",
    "state": "ms",
    "zipcode": "39701-5821",
    "date": "8/24/2017"
  },
  {
    "city": "syracuse",
    "name": "le moyne college",
    "state": "ny",
    "zipcode": "13214-1302",
    "date": "8/24/2017"
  },
  {
    "city": "los alamos",
    "name": "univ of nm-los alamos",
    "state": "nm",
    "zipcode": 87544,
    "date": "8/24/2017"
  },
  {
    "city": "great bend",
    "name": "barton cnty cc-great bend",
    "state": "ks",
    "zipcode": "67530-9803",
    "date": "8/24/2017"
  },
  {
    "city": "dallas",
    "name": "misericordia university",
    "state": "pa",
    "zipcode": "18612-1008",
    "date": "8/24/2017"
  },
  {
    "city": "clinton",
    "name": "mississippi college",
    "state": "ms",
    "zipcode": "39058-0001",
    "date": "8/24/2017"
  },
  {
    "city": "roanoke",
    "name": "virginia western cmty coll",
    "state": "va",
    "zipcode": "24015-4705",
    "date": "8/24/2017"
  },
  {
    "city": "clovis",
    "name": "clovis community college",
    "state": "nm",
    "zipcode": 88101,
    "date": "8/24/2017"
  },
  {
    "city": "dothan",
    "name": "troy univ dothan",
    "state": "al",
    "zipcode": "36303-1568",
    "date": "8/24/2017"
  },
  {
    "city": "centennial",
    "name": "pearson internal test",
    "state": "co",
    "zipcode": 80122,
    "date": "8/24/2017"
  },
  {
    "city": "milwaukee",
    "name": "marquette univ",
    "state": "wi",
    "zipcode": "53233-2207",
    "date": "8/24/2017"
  },
  {
    "city": "new westminster",
    "name": "douglas college",
    "state": "bc",
    "zipcode": "v3l 5b2",
    "date": "8/24/2017"
  },
  {
    "city": "davidson",
    "name": "davidson college",
    "state": "nc",
    "zipcode": "28035-0001",
    "date": "8/24/2017"
  },
  {
    "city": "north east",
    "name": "cecil college",
    "state": "md",
    "zipcode": "21901-1900",
    "date": "5/5/2015"
  },
  {
    "city": "naples",
    "name": "ave maria university",
    "state": "fl",
    "zipcode": "34119-1376",
    "date": "5/5/2015"
  },
  {
    "city": "eden prairie",
    "name": "wol-abc minnesota",
    "state": "mn",
    "zipcode": 55344,
    "date": "5/7/2015"
  },
  {
    "city": "san luis obispo",
    "name": "california polytech st univ",
    "state": "ca",
    "zipcode": 93407,
    "date": "5/14/2015"
  },
  {
    "city": "miami",
    "name": "miami-dade coll wolfsn",
    "state": "fl",
    "zipcode": "33132-2204",
    "date": "5/14/2015"
  },
  {
    "city": "orange city",
    "name": "northwestern college",
    "state": "ia",
    "zipcode": "51041-1923",
    "date": "5/15/2015"
  },
  {
    "city": "racine",
    "name": "gateway tech coll",
    "state": "wi",
    "zipcode": "53403-1518",
    "date": "5/18/2015"
  },
  {
    "city": "atlanta",
    "name": "georgia inst of technology",
    "state": "ga",
    "zipcode": 30308,
    "date": "5/18/2015"
  },
  {
    "city": "clinton",
    "name": "ashford university",
    "state": "ia",
    "zipcode": "52732-3910",
    "date": "5/19/2015"
  },
  {
    "city": "kenosha",
    "name": "gateway tech inst-kenosha",
    "state": "wi",
    "zipcode": "53144-1619",
    "date": "5/22/2015"
  },
  {
    "city": "boston",
    "name": "caritas laboure college",
    "state": "ma",
    "zipcode": "02124-5617",
    "date": "5/26/2015"
  },
  {
    "city": "springfield",
    "name": "clark state cmty college",
    "state": "oh",
    "zipcode": "45501-0570",
    "date": "5/27/2015"
  },
  {
    "city": "carson",
    "name": "cal state u - dominguez hills",
    "state": "ca",
    "zipcode": 90747,
    "date": "5/27/2015"
  },
  {
    "city": "santa cruz",
    "name": "univ of calif - santa cruz",
    "state": "ca",
    "zipcode": 95064,
    "date": "5/29/2015"
  },
  {
    "city": "providence",
    "name": "providence college",
    "state": "ri",
    "zipcode": "02918-7000",
    "date": "5/29/2015"
  },
  {
    "city": "fulton",
    "name": "westminster college",
    "state": "mo",
    "zipcode": "65251-1230",
    "date": "5/29/2015"
  },
  {
    "city": "charlotte",
    "name": "queens univ - charlotte",
    "state": "nc",
    "zipcode": "28274-0001",
    "date": "5/31/2015"
  },
  {
    "city": "lowell",
    "name": "umasslowell",
    "state": "ma",
    "zipcode": "01854-2827",
    "date": "5/31/2015"
  },
  {
    "city": "martinsville",
    "name": "vccs - patrick henry cc",
    "state": "va",
    "zipcode": "24112-6693",
    "date": "6/1/2015"
  },
  {
    "city": "clarion",
    "name": "clarion university of pa",
    "state": "pa",
    "zipcode": "16214-1240",
    "date": "6/1/2015"
  },
  {
    "city": "north dartmouth",
    "name": "umassdartmouth",
    "state": "ma",
    "zipcode": "02747-2356",
    "date": "6/2/2015"
  },
  {
    "city": "seattle",
    "name": "university of washington",
    "state": "wa",
    "zipcode": 98195,
    "date": "6/10/2015"
  },
  {
    "city": "framingham",
    "name": "framingham state university",
    "state": "ma",
    "zipcode": "01702-2499",
    "date": "6/14/2015"
  },
  {
    "city": "spartanburg",
    "name": "univ of sc - upstate",
    "state": "sc",
    "zipcode": "29303-4932",
    "date": "1/9/2017"
  },
  {
    "city": "ogden",
    "name": "weber state university",
    "state": "ut",
    "zipcode": 84408,
    "date": "1/9/2017"
  },
  {
    "city": "new bern",
    "name": "craven community college",
    "state": "nc",
    "zipcode": 28562,
    "date": "1/9/2017"
  },
  {
    "city": "morrow",
    "name": "clayton state univ",
    "state": "ga",
    "zipcode": "30260-1293",
    "date": "1/9/2017"
  },
  {
    "city": "alpena",
    "name": "alpena community college",
    "state": "mi",
    "zipcode": "49707-1410",
    "date": "2/2/2016"
  },
  {
    "city": "staten island",
    "name": "college of staten island",
    "state": "ny",
    "zipcode": "10314-6609",
    "date": "2/2/2016"
  },
  {
    "city": "greenvale",
    "name": "long island university (cw post)",
    "state": "ny",
    "zipcode": "11548-1319",
    "date": "2/2/2016"
  },
  {
    "city": "henderson",
    "name": "nevada state college",
    "state": "nv",
    "zipcode": 89015,
    "date": "2/2/2016"
  },
  {
    "city": "san angelo",
    "name": "angelo state university",
    "state": "tx",
    "zipcode": 76909,
    "date": "2/3/2016"
  },
  {
    "city": "dyersburg",
    "name": "dyersburg st comm coll",
    "state": "tn",
    "zipcode": 38024,
    "date": "2/3/2016"
  },
  {
    "city": "cambridge",
    "name": "massachusetts inst of tech",
    "state": "ma",
    "zipcode": 2139,
    "date": "1/9/2017"
  },
  {
    "city": "new concord",
    "name": "muskingum university",
    "state": "oh",
    "zipcode": "43762-1118",
    "date": "1/9/2017"
  },
  {
    "city": "hammond",
    "name": "purdue university calumet",
    "state": "in",
    "zipcode": 46323,
    "date": "1/9/2017"
  },
  {
    "city": "san bernardino",
    "name": "san bernardino valley coll",
    "state": "ca",
    "zipcode": 92410,
    "date": "2/3/2016"
  },
  {
    "city": "fort lauderdale",
    "name": "broward coll-downtown",
    "state": "fl",
    "zipcode": "33301-2208",
    "date": "2/3/2016"
  },
  {
    "city": "kansas city",
    "name": "penn valley cmty college",
    "state": "mo",
    "zipcode": 64111,
    "date": "2/3/2016"
  },
  {
    "city": "colorado springs",
    "name": "pikes peak cc - downtown cmps",
    "state": "co",
    "zipcode": 80903,
    "date": "2/3/2016"
  },
  {
    "city": "heathrow",
    "name": "seminole state - heathrow",
    "state": "fl",
    "zipcode": 32746,
    "date": "2/3/2016"
  },
  {
    "city": "purchase",
    "name": "suny at purchase",
    "state": "ny",
    "zipcode": "10577-1402",
    "date": "2/3/2016"
  },
  {
    "city": "south bend",
    "name": "indiana univ at so bend",
    "state": "in",
    "zipcode": "46615-1408",
    "date": "2/3/2016"
  },
  {
    "city": "monmouth",
    "name": "western oregon university",
    "state": "or",
    "zipcode": 97361,
    "date": "1/10/2017"
  },
  {
    "city": "sarasota",
    "name": "univ of south florida sarasota/manatee",
    "state": "fl",
    "zipcode": "34243-2049",
    "date": "1/10/2017"
  },
  {
    "city": "catonsville",
    "name": "cc baltimore cty - catonsville",
    "state": "md",
    "zipcode": "21228-5317",
    "date": "2/3/2016"
  },
  {
    "city": "new york",
    "name": "baruch college of cuny",
    "state": "ny",
    "zipcode": "10010-5518",
    "date": "2/3/2016"
  },
  {
    "city": "hempstead",
    "name": "hofstra university",
    "state": "ny",
    "zipcode": 11549,
    "date": "2/3/2016"
  },
  {
    "city": "cambridge",
    "name": "lesley university",
    "state": "ma",
    "zipcode": "02138-2702",
    "date": "2/4/2016"
  },
  {
    "city": "the pas",
    "name": "univ coll of the north - the pas",
    "state": "mb",
    "zipcode": "r9a 1m7",
    "date": "8/24/2017"
  },
  {
    "city": "worthington",
    "name": "mn west comm & tech coll- wort",
    "state": "mn",
    "zipcode": "56187-3024",
    "date": "8/24/2017"
  },
  {
    "city": "harrisburg",
    "name": "temple univ - harrisburg",
    "state": "pa",
    "zipcode": "17101-1817",
    "date": "8/24/2017"
  },
  {
    "city": "portland",
    "name": "univ of so maine - portland",
    "state": "me",
    "zipcode": "04103-4864",
    "date": "8/24/2017"
  },
  {
    "city": "newark",
    "name": "university of delaware",
    "state": "de",
    "zipcode": 19716,
    "date": "8/24/2017"
  },
  {
    "city": "salt lake city",
    "name": "salt lake city comm coll-s",
    "state": "ut",
    "zipcode": 84115,
    "date": "1/10/2017"
  },
  {
    "city": "jupiter",
    "name": "florida atlantic u - north/mac",
    "state": "fl",
    "zipcode": "33458-2906",
    "date": "1/10/2017"
  },
  {
    "city": "salt lake city",
    "name": "brigham young univ-salt lak",
    "state": "ut",
    "zipcode": 84124,
    "date": "1/10/2017"
  },
  {
    "city": "douglas",
    "name": "south ga state coll - douglas",
    "state": "ga",
    "zipcode": "31533-5020",
    "date": "1/10/2017"
  },
  {
    "city": "terre haute",
    "name": "ivy tech comm coll - terre haute",
    "state": "in",
    "zipcode": "47802-4883",
    "date": "2/4/2016"
  },
  {
    "city": "belmont",
    "name": "notre dame de namur university",
    "state": "ca",
    "zipcode": 94002,
    "date": "2/4/2016"
  },
  {
    "city": "plattsburgh",
    "name": "clinton community college",
    "state": "ny",
    "zipcode": "12901-6002",
    "date": "2/4/2016"
  },
  {
    "city": "marietta",
    "name": "marietta college",
    "state": "oh",
    "zipcode": "45750-4033",
    "date": "2/4/2016"
  },
  {
    "city": "birmingham",
    "name": "univ alabama-birmingham",
    "state": "al",
    "zipcode": "35294-0001",
    "date": "2/4/2016"
  },
  {
    "city": "magnolia",
    "name": "sthrn arkansas u-magnolia",
    "state": "ar",
    "zipcode": 71753,
    "date": "2/4/2016"
  },
  {
    "city": "san francisco",
    "name": "san francisco state univ",
    "state": "ca",
    "zipcode": 94132,
    "date": "8/24/2017"
  },
  {
    "city": "colby",
    "name": "colby comm coll",
    "state": "ks",
    "zipcode": "67701-4007",
    "date": "8/24/2017"
  },
  {
    "city": "burton",
    "name": "kent state u-geauga co",
    "state": "oh",
    "zipcode": 44021,
    "date": "8/24/2017"
  },
  {
    "city": "augusta",
    "name": "augusta technical college",
    "state": "ga",
    "zipcode": "30906-8243",
    "date": "8/24/2017"
  },
  {
    "city": "opelika",
    "name": "southern union cc-opelika",
    "state": "al",
    "zipcode": "36801-3113",
    "date": "8/24/2017"
  },
  {
    "city": "columbia",
    "name": "benedict college",
    "state": "sc",
    "zipcode": "29204-1058",
    "date": "8/24/2017"
  },
  {
    "city": "shepherdstown",
    "name": "shepherd university",
    "state": "wv",
    "zipcode": 25443,
    "date": "8/24/2017"
  },
  {
    "city": "creston",
    "name": "southwestern community coll",
    "state": "ia",
    "zipcode": "50801-1042",
    "date": "8/24/2017"
  },
  {
    "city": "south orange",
    "name": "seton hall university",
    "state": "nj",
    "zipcode": "07079-2646",
    "date": "8/24/2017"
  },
  {
    "city": "kenosha",
    "name": "univ of wisconsin - parkside",
    "state": "wi",
    "zipcode": "53144-1133",
    "date": "8/24/2017"
  },
  {
    "city": "lincoln univ",
    "name": "lincoln university",
    "state": "pa",
    "zipcode": 19352,
    "date": "8/24/2017"
  },
  {
    "city": "bogalusa",
    "name": "northshore tech cc - bogalusa",
    "state": "la",
    "zipcode": "70427-5866",
    "date": "8/24/2017"
  },
  {
    "city": "childersburg",
    "name": "central alabama cc",
    "state": "al",
    "zipcode": 35044,
    "date": "8/24/2017"
  },
  {
    "city": "tampa",
    "name": "hillsborough c c-d mabry",
    "state": "fl",
    "zipcode": "33614-7810",
    "date": "8/24/2017"
  },
  {
    "city": "media",
    "name": "delaware cty comm college",
    "state": "pa",
    "zipcode": "19063-1027",
    "date": "8/24/2017"
  },
  {
    "city": "mayhew",
    "name": "east ms cc - golden triangle campus",
    "state": "ms",
    "zipcode": 39753,
    "date": "8/24/2017"
  },
  {
    "city": "ellisville",
    "name": "jones county junior college",
    "state": "ms",
    "zipcode": "39437-3901",
    "date": "8/24/2017"
  },
  {
    "city": "douglasville",
    "name": "west ga tech - douglas",
    "state": "ga",
    "zipcode": 30135,
    "date": "8/24/2017"
  },
  {
    "city": "kennesaw",
    "name": "duplicate",
    "state": "ga",
    "zipcode": 30144,
    "date": "8/24/2017"
  },
  {
    "city": "bryan",
    "name": "s-con inc",
    "state": "tx",
    "zipcode": 77807,
    "date": "6/18/2015"
  },
  {
    "city": "la grande",
    "name": "eastern oregon university",
    "state": "or",
    "zipcode": 97850,
    "date": "6/18/2015"
  },
  {
    "city": "san francisco",
    "name": "ccsf - ocean",
    "state": "ca",
    "zipcode": 94112,
    "date": "6/19/2015"
  },
  {
    "city": "puyallup",
    "name": "pierce college",
    "state": "wa",
    "zipcode": "98374-2210",
    "date": "6/29/2015"
  },
  {
    "city": "indiana",
    "name": "indiana university of pa",
    "state": "pa",
    "zipcode": 15705,
    "date": "7/6/2015"
  },
  {
    "city": "lakewood",
    "name": "rockmont college",
    "state": "co",
    "zipcode": 80226,
    "date": "7/22/2015"
  },
  {
    "city": "philadelphia",
    "name": "holy family university",
    "state": "pa",
    "zipcode": "19114-2009",
    "date": "1/10/2017"
  },
  {
    "city": "chicago",
    "name": "northeastern illinois univ",
    "state": "il",
    "zipcode": 60625,
    "date": "1/10/2017"
  },
  {
    "city": "elizabethtown",
    "name": "kentucky tech elizabethtown",
    "state": "ky",
    "zipcode": "42701-3149",
    "date": "1/10/2017"
  },
  {
    "city": "detroit",
    "name": "univ of detroit-dental schl",
    "state": "mi",
    "zipcode": "48207-4288",
    "date": "1/10/2017"
  },
  {
    "city": "austin",
    "name": "austin c c - rio grande",
    "state": "tx",
    "zipcode": 78701,
    "date": "2/4/2016"
  },
  {
    "city": "denton",
    "name": "university of north texas",
    "state": "tx",
    "zipcode": 76203,
    "date": "2/4/2016"
  },
  {
    "city": "cincinnati",
    "name": "raymond walters college",
    "state": "oh",
    "zipcode": 45236,
    "date": "2/5/2016"
  },
  {
    "city": "chicago",
    "name": "city college of chicago",
    "state": "il",
    "zipcode": "60609-2325",
    "date": "2/5/2016"
  },
  {
    "city": "winston salem",
    "name": "wake forest university",
    "state": "nc",
    "zipcode": 27106,
    "date": "1/10/2017"
  },
  {
    "city": "erie",
    "name": "penn state u behrend campus",
    "state": "pa",
    "zipcode": "16563-4101",
    "date": "1/10/2017"
  },
  {
    "city": "don mills",
    "name": "pearson university",
    "state": "on",
    "zipcode": "m3c 2t8",
    "date": "1/10/2017"
  },
  {
    "city": "grenada",
    "name": "holmes cc-grenada",
    "state": "ms",
    "zipcode": "38901-5095",
    "date": "1/10/2017"
  },
  {
    "city": "bangor",
    "name": "husson university",
    "state": "me",
    "zipcode": 4401,
    "date": "2/5/2016"
  },
  {
    "city": "pittsburgh",
    "name": "cc allegheny co-allegheny",
    "state": "pa",
    "zipcode": "15212-6003",
    "date": "2/5/2016"
  },
  {
    "city": "new york",
    "name": "fordham univ-lincoln ctr",
    "state": "ny",
    "zipcode": "10023-7414",
    "date": "2/5/2016"
  },
  {
    "city": "elkhorn",
    "name": "gateway tech coll elkhorn",
    "state": "wi",
    "zipcode": "53121-2035",
    "date": "2/5/2016"
  },
  {
    "city": "chicago",
    "name": "kennedy king college",
    "state": "il",
    "zipcode": "60621-2709",
    "date": "2/6/2016"
  },
  {
    "city": "seattle",
    "name": "north seattle cmty college",
    "state": "wa",
    "zipcode": 98103,
    "date": "2/6/2016"
  },
  {
    "city": "emory",
    "name": "emory and henry college",
    "state": "va",
    "zipcode": 24327,
    "date": "1/10/2017"
  },
  {
    "city": "wahpeton",
    "name": "no dakota st college of sci",
    "state": "nd",
    "zipcode": "58076-0001",
    "date": "1/10/2017"
  },
  {
    "city": "vincennes",
    "name": "vincennes univ - vincennes",
    "state": "in",
    "zipcode": "47591-1504",
    "date": "1/11/2017"
  },
  {
    "city": "edinboro",
    "name": "edinboro university of pa",
    "state": "pa",
    "zipcode": 16444,
    "date": "2/6/2016"
  },
  {
    "city": "randolph",
    "name": "county college of morris",
    "state": "nj",
    "zipcode": 7869,
    "date": "2/6/2016"
  },
  {
    "city": "river forest",
    "name": "dominican university",
    "state": "il",
    "zipcode": 60305,
    "date": "2/6/2016"
  },
  {
    "city": "plainfield",
    "name": "union county college",
    "state": "nj",
    "zipcode": "07060-1308",
    "date": "2/7/2016"
  },
  {
    "city": "eau claire",
    "name": "chippewa valley tech coll",
    "state": "wi",
    "zipcode": "54701-6120",
    "date": "8/24/2017"
  },
  {
    "city": "brownwood",
    "name": "texas state tech - brownwood",
    "state": "tx",
    "zipcode": 76801,
    "date": "8/25/2017"
  },
  {
    "city": "odessa",
    "name": "univ of texas - permian basin",
    "state": "tx",
    "zipcode": 79762,
    "date": "8/25/2017"
  },
  {
    "city": "peoria",
    "name": "midstate college",
    "state": "il",
    "zipcode": "61614-3542",
    "date": "8/25/2017"
  },
  {
    "city": "washington",
    "name": "univ district of columbia",
    "state": "dc",
    "zipcode": 20008,
    "date": "1/11/2017"
  },
  {
    "city": "pineville",
    "name": "louisiana college",
    "state": "la",
    "zipcode": 71360,
    "date": "1/11/2017"
  },
  {
    "city": "erie",
    "name": "gannon university",
    "state": "pa",
    "zipcode": "16541-0002",
    "date": "1/11/2017"
  },
  {
    "city": "pinehurst",
    "name": "sandhills community college",
    "state": "nc",
    "zipcode": "28374-8778",
    "date": "1/11/2017"
  },
  {
    "city": "newnan",
    "name": "univ of west ga - newnan",
    "state": "ga",
    "zipcode": 30265,
    "date": "8/25/2017"
  },
  {
    "city": "greeley",
    "name": "aims comm coll-greeley",
    "state": "co",
    "zipcode": 80634,
    "date": "8/25/2017"
  },
  {
    "city": "ft lauderdale",
    "name": "nova southeastern univ",
    "state": "fl",
    "zipcode": 33314,
    "date": "8/25/2017"
  },
  {
    "city": "saint louis",
    "name": "univ of mo-st louis",
    "state": "mo",
    "zipcode": 63121,
    "date": "8/25/2017"
  },
  {
    "city": "coalinga",
    "name": "west hills college",
    "state": "ca",
    "zipcode": 93210,
    "date": "8/25/2017"
  },
  {
    "city": "moraga",
    "name": "saint marys college",
    "state": "ca",
    "zipcode": 94575,
    "date": "8/25/2017"
  },
  {
    "city": "albany",
    "name": "albany tech college",
    "state": "ga",
    "zipcode": "31701-2648",
    "date": "8/25/2017"
  },
  {
    "city": "indianapolis",
    "name": "ball state univ - indiana",
    "state": "in",
    "zipcode": 46220,
    "date": "8/25/2017"
  },
  {
    "city": "independence",
    "name": "blue river community colleg",
    "state": "mo",
    "zipcode": 64057,
    "date": "8/25/2017"
  },
  {
    "city": "lansing",
    "name": "lansing community college",
    "state": "mi",
    "zipcode": "48933-1215",
    "date": "8/25/2017"
  },
  {
    "city": "mars hill",
    "name": "mars hill college",
    "state": "nc",
    "zipcode": "28754-9134",
    "date": "8/25/2017"
  },
  {
    "city": "hickory",
    "name": "catawba valley comm coll",
    "state": "nc",
    "zipcode": "28602-8302",
    "date": "8/25/2017"
  },
  {
    "city": "watkinsville",
    "name": "univ of n georgia -oconee",
    "state": "ga",
    "zipcode": 30677,
    "date": "8/25/2017"
  },
  {
    "city": "hammond",
    "name": "north shore career coll",
    "state": "la",
    "zipcode": 70401,
    "date": "8/25/2017"
  },
  {
    "city": "gambier",
    "name": "kenyon college",
    "state": "oh",
    "zipcode": 43022,
    "date": "8/25/2017"
  }
];