const searchWaypointsLevels = [
  {
    service: 'nearbysearch/json?type=locality&radius=1000&location=',
    prefix: 'Selo ',
  },
  {
    service: 'nearbysearch/json?type=geocode&radius=200&location=',
    prefix: 'Lokacija ',
  },
  {
    service: 'nearbysearch/json?type=natural_feature&radius=200&location=',
    prefix: '',
  },
  {
    service: 'nearbysearch/json?type=route&radius=200&location=',
    prefix: 'Put ',
  }
];

const searchStoresLevels = [
  {
    service: 'autocomplete/json?input=varazdin+marko+&location=',
    StoreServiceRent: [1,0,0]
  },
  // {
  //   service: 'autocomplete/json?input=zagreb+panex+dinamic&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=cakovec+panex+dinamic&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=koprivnica+panex+dinamic&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=nedelisce+panex+dinamic&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=virovitica+panex+dinamic&location=',
  //   StoreServiceRent: [1,0,0]
  // }
  // {
  //   service: 'nearbysearch/json?type=bicycle_store&radius=25000&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=intersport&radius=25000&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=juventa+sport&radius=25000&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=decathlon&radius=25000&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=bajk+garaza&radius=25000&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=beosport&radius=25000&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=cyclomania&radius=25000&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=freestyle+pancevo&radius=25000&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=jankovic+comp&radius=25000&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=neptun+bike&radius=25000&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=nomad&radius=25000&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=sportofis&radius=25000&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=totalbike&radius=25000&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=rent+a+bike&radius=25000&location=',
  //   StoreServiceRent: [0,0,1]
  // },
  // {
  //   service: 'autocomplete/json?input=rent+bicikl&radius=25000&location=',
  //   StoreServiceRent: [0,0,1]
  // },
  // {
  //   service: 'autocomplete/json?input=iznajmljivanje+bicikla+bicikala&radius=25000&location=',
  //   StoreServiceRent: [0,0,1]
  // },
  // {
  //   service: 'autocomplete/json?input=nextbike&radius=25000&location=',
  //   StoreServiceRent: [0,0,1]
  // },
  // {
  //   service: 'autocomplete/json?input=bike+servis&radius=25000&location=',
  //   StoreServiceRent: [0,1,0]
  // },
  // {
  //   service: 'autocomplete/json?input=servis+bicikala&radius=25000&location=',
  //   StoreServiceRent: [0,1,0]
  // },
  // {
  //   service: 'autocomplete/json?input=servis+bicikla&radius=25000&location=',
  //   StoreServiceRent: [0,1,0]
  // },
  // {
  //   service: 'autocomplete/json?input=dsg+bjelovar&location=',
  //   StoreServiceRent: [1,1,0]
  // },
  // {
  //   service: 'autocomplete/json?input=planet+bike+beograd&location=',
  //   StoreServiceRent: [1,1,1]
  // },
  // {
  //   service: 'autocomplete/json?input=planet+bike+nis&location=',
  //   StoreServiceRent: [1,1,0]
  // },
  // {
  //   service: 'autocomplete/json?input=planet+bike+novi+sad&location=',
  //   StoreServiceRent: [1,1,0]
  // },
  // {
  //   service: 'autocomplete/json?input=planet+bike+cacak&location=',
  //   StoreServiceRent: [1,1,0]
  // },
  // {
  //   service: 'autocomplete/json?input=planet+bike+kopaonik&location=',
  //   StoreServiceRent: [1,1,0]
  // },
  // {
  //   service: 'autocomplete/json?input=planet+bike+stara+planina&location=',
  //   StoreServiceRent: [1,1,0]
  // },
  // {
  //   service: 'autocomplete/json?input=tempo+podgorica&location=',
  //   StoreServiceRent: [1,1,0]
  // },
  // {
  //   service: 'autocomplete/json?input=simicvike+arandjelovac&location=',
  //   StoreServiceRent: [1,1,0]
  // },
  // {
  //   service: 'autocomplete/json?input=bike+mv+sport+kragujevac&location=',
  //   StoreServiceRent: [1,1,0]
  // },
  // {
  //   service: 'autocomplete/json?input=masterbike+kraljevo&location=',
  //   StoreServiceRent: [1,1,0]
  // },
  // {
  //   service: 'autocomplete/json?input=power+bike+leskovac&location=',
  //   StoreServiceRent: [1,1,0]
  // },
  // {
  //   service: 'autocomplete/json?input=bike+igic+pirot&location=',
  //   StoreServiceRent: [1,1,0]
  // },
  // {
  //   service: 'autocomplete/json?input=cadenze+novi+pazar&location=',
  //   StoreServiceRent: [1,1,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Aleksandrovac+Tip-Top&location=',
  //   StoreServiceRent: [1,1,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Arilje+Luković&location=',
  //   StoreServiceRent: [1,1,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Bačka+Palanka+Proma+2002&location=',
  //   StoreServiceRent: [1,1,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Kruševac+Bicikl&location=',
  //   StoreServiceRent: [1,1,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Negotin+T-Bike&location=',
  //   StoreServiceRent: [1,1,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Novi+Pazar+Cadence&location=',
  //   StoreServiceRent: [1,1,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Priboj+Profibike&location=',
  //   StoreServiceRent: [1,1,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Sombor+Meksiko&location=',
  //   StoreServiceRent: [1,1,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Sremska+Mitrovica+Bicikl+centar+Radulović&location=',
  //   StoreServiceRent: [1,1,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Trstenik+Profy+Bike&location=',
  //   StoreServiceRent: [1,1,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Užice+Milivoja-Bike&location=',
  //   StoreServiceRent: [1,1,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Valjevo+Kolnago&location=',
  //   StoreServiceRent: [1,1,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Vranje+Makado&location=',
  //   StoreServiceRent: [1,1,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Vršac+Zlatni+točak&location=',
  //   StoreServiceRent: [1,1,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Zrenjanin+Polar+Bike&location=',
  //   StoreServiceRent: [1,1,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Arilje+Profi+Bike&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Bečej+Gama+ML&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Beograd-Vračar+Pro+Bike&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Beograd-Čukarica+Sportofis&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Kikinda+Sebastian&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Kikinda+Apollo+Bike&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Kragujevac+Bike+MV+Sport&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Kragujevac+Metal&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Kragujevac+Kole&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Kraljevo+Johana+S+Gagi&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Kraljevo+Masterbike&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Kraljevo+Metalac&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Loznica+Vladimir+Tursunović&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Mokrin+Tušta&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Niš+Digor+Sport-Bajk+Garaža&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Novi+Sad+Ris+Cycling&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Novi+Sad+Vector&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Novi+Sad+Invicta&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Pančevo+Freestyle&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Požarevac+Staco&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Požega+Gojković&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Palić+Mega+Favorit&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Senta+Tehnoguma&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Sombor+Meksiko&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Šabac+Tandem+Kid&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Veternik+Bicikl+Centar+Bleša&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Vršac+Zlatni+Točak&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Zemun+Bozaro&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Sombor+Meksiko&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Šabac+Tandem+Kid&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Temerin+Panter-Sport&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Veternik+Bicikl+Centar+Bleša&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Vršac+Zlatni+Točak&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Zemun+Bozaro&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Zemun+Migo&location=',
  //   StoreServiceRent: [1,0,0]
  // },
  // {
  //   service: 'autocomplete/json?input=Kikinda+Appolo=',
  //   StoreServiceRent: [1,0,0]
  // },
];