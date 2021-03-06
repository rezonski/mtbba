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
    service: 'autocomplete/json?input=zagreb+alan+prim&location=',
    StoreServiceRent: [1,1,0]
  },
  // {
  //   service: 'autocomplete/json?input=varazdin+marko+&location=',
  //   StoreServiceRent: [1,0,0]
  // },
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

const processedIDs = ["ChIJ_cnFJLtDSxMRbLaU7M7mEPw", "ChIJ-71I5U3WZUcRrY7M5LBRfgQ", "ChIJ-8UzzgcDXkcRlLjUfQcjbFQ", "ChIJ-U3oQx0oNRMRljYuGMwMM7I", "ChIJ-UwlvHRDSxMREgCl3k5TFv0", "ChIJ07lejohlWkcR3VXTFW6YwqA", "ChIJ0WxeMBUQW0cRD9Bsi4a_1Zs", "ChIJ0yk7nI9VXEcReGJrWZhzMUw", "ChIJ11DJvtmqaEcR6Hstk_P_BLo", "ChIJ1Uyq8iihZEcRQz5cCBoUo-k", "ChIJ24JZfMjSfEcRliam6UM7bUQ", "ChIJ24JZfMjSfEcRn1whUTq42aA", "ChIJ26OdxFMzZ0cRwQFINbqgMUA", "ChIJ2cuGNyJeNRMRjJn0nOS5apg", "ChIJ2Q_g3tsgV0cR3Ad0g2HsWs8", "ChIJ38mlsyNeNRMRReW9gtFkX18", "ChIJ3VcjvBYhV0cRuQj8AN6Igfs", "ChIJ4cipJZajZEcR5a1LBDPp8rQ", "ChIJ4Y6LB0peNRMRtXbWW3GKHKE", "ChIJ4YHXnipVb0cRaCn9WLVQrdo", "ChIJ4zHs_27uShMRv_ITtOKdamY", "ChIJ5-g5BYahZEcRiR3cXnb7KQw", "ChIJ50m17-_WZUcRVshhQ_qpHWI", "ChIJ5b015KDAfEcRch9zj2EvEB4", "ChIJ5ecP_Y1vWkcRb_iNOh0bis4", "ChIJ6ctov04QW0cRkyWzMVpUHao", "ChIJ6QFLp-AKSxMRLpfkwN6EBvM", "ChIJ6wKo_LmtaEcR9DqaBQwGmZo", "ChIJ6yPoeYpvWkcRkW8LhnUlT9E", "ChIJ6zXfc03BhkcR5lGapVeICJo", "ChIJ6zy-DN3qTRMRYXLLHTy10hI", "ChIJ783Jd8VvWkcRf8LzO9VD-Ns", "ChIJ7fjCZ9VUb0cRLWkpEtuJ_K4", "ChIJ84jBhMsRW0cRZ9lR-KEhu_k", "ChIJ8fN01LLXZUcRVplPMYftPlg", "ChIJ8WDuN_gAV0cRoY2QSIOGTXg", "ChIJ8y78IrbYVkcR8bZgnemcTFM", "ChIJ8ZNJpN4gV0cREuEPwmfWtdE", "ChIJ993Pp2kyZUcRFp27vU2hA6U", "ChIJ9arYj_ysaEcRRt4zW2CZNPc", "ChIJ9xkbHeAgV0cRpCsywob438M", "ChIJa_eLpd_IWEcRamQ7brHzgzg", "ChIJa2SW0h_GREcRSWqgg87Jz-o", "ChIJA3Nb8tXKNBMRLwmDZW4i3-w", "ChIJA8IzMQIRW0cRBqeNJwoaG5Q", "ChIJAf59RbmPXEcRybMTzo6Args", "ChIJaf7M3PgRW0cRNKf4OT9bKgo", "ChIJAQcRpZTWZUcR8STT9La3qMc", "ChIJaw1HBmkQW0cRMSiyswCu0Yo", "ChIJaxFFvw0DXkcRBZR0Z8TWrnM", "ChIJayn39VsQW0cReIs0tjjxcWo", "ChIJAyVl5UjWZUcRUKHDEbfvVXw", "ChIJB2DHe1CWfEcRGxYaEJucR9c", "ChIJBSkqlG3JWEcRYAbtx_X5Pgs", "ChIJbyvPVPxdNRMR6D0FruK1plg", "ChIJc5yMDhTJWEcRO8CjqDs9sHY", "ChIJCfI_lU3mXEcReQaO7orUd68", "ChIJDdEJo_BhLxMRwbQ7f6mV88A", "ChIJDWj5siDJWEcRolqo1j3MN4A", "ChIJDwkjYqOtaEcRx7CgPYqAyKM", "ChIJE2clQux-WkcRgHabeu1229U", "ChIJE3NAUFbWZUcRrwfS5FaINbU", "ChIJe3YXcOF-WkcR7vJ4ZoHpiFk", "ChIJebCWfe1xWkcRZ4k5WBz_ZW8", "ChIJEUSWQbZ5ZkcRWZYYF0RF-mg", "ChIJEwS69mZ6WkcRxK2BoEp2AbA", "ChIJF2cMBCvKWEcRpE5QHmzIJqM", "ChIJfa5wBxrnXEcRW_ozFZsqUGE", "ChIJFxzxpx6mZEcRHCShTSl-rDA", "ChIJG2NwUHXtWUcRcDZzysMFRMQ", "ChIJG3v_mxytaEcRbyo8VThCnsQ", "ChIJg4Z-voT6YUcRJX0gj0X_dBc", "ChIJgeba3qrXZUcRiofpy_vsjvY", "ChIJGT6KwmLOfEcRjWgPGYG4SQE", "ChIJGWezpaupTRMRLPRRXJJ88II", "ChIJh9FMxp8-ZEcR9iMNKjYnyCY", "ChIJhbHXsK7nXEcRHj1VojxPdJM", "ChIJhbMQrpjPZUcRchyM-y0_dtA", "ChIJhR9Zr_RvWkcRCFAp8o9WmFw", "ChIJicXaIsdfNRMR2xAjxRJupWM", "ChIJidYSYmkQW0cRrlfu3FqJa_0", "ChIJieDAXD7JWEcRh2i9vODasoc", "ChIJiZ7FivxdNRMRnntKtOcoIwQ", "ChIJj-fAQNRUb0cR8SPR7VQ8DpQ", "ChIJj0IAuXxlWkcR64O3HXzBRQE", "ChIJj8lXd9zIWEcR24mTA2Yc3E0", "ChIJjajAa4RvWkcRnkxjLcREq2A", "ChIJjb6AbkDuShMRBZumxFaoZEA", "ChIJjSxcE2T6YUcRv-IKUmRKErY", "ChIJJXrRJL2taEcRw1Cr3u0h0ck", "ChIJJzO-UxEQW0cRKmuB91fKZy0", "ChIJK_ghhmzKWEcRiyldJxehwSE", "ChIJk0qH_3PWZUcRqVbK2IivpLE", "ChIJL_QbEtzWZUcRPu2qm4kjx-c", "ChIJl3jITajAfEcRKOil8bN56zM", "ChIJl9Mlg8OqaEcRJywrXsaZOKc", "ChIJLcWVn6nnXEcRFRuei-mxpNA", "ChIJM29t4AcDXkcRAvIsQloB7NI", "ChIJm9MYm-xwWkcRCUufTRVdCYA", "ChIJMQ0zAxqtXkcRWiwnkjn5n3k", "ChIJMUJcvoT6YUcRi2Q2G3rOZuw", "ChIJMyxg7gB0ThMRRWRvOTMZAKQ", "ChIJN-OOgdMcX0cRs8byvAdCUxU", "ChIJN4gergqtaEcRUaKChLaLzZQ", "ChIJN4OZkE_RZUcRGvska0PT9Rg", "ChIJN81HE2T6YUcRcM_oWhQxQgY", "ChIJO4fnlxXKWEcRJBb0jwVnWtY", "ChIJo6wcOmd2WkcREBnFED7OTTo", "ChIJodzIaC48ZEcRxXP_w0r8Ous", "ChIJof29NQIRW0cR6Bhy6zca5DI", "ChIJoRUg7bWmZEcRMWpb1i1UQAs", "ChIJOxI-D_86TBMRvD0Kw-R3LeI", "ChIJp1C7QCs8ZEcRfJitAI7Pw-g", "ChIJp2VAkoT6YUcRCbgq9YkfH9M", "ChIJp4gyPLl6WkcRGbsPLBCBVas", "ChIJP4pGMDbWZUcRHNPzW91YkpM", "ChIJPXhP5deqaEcRJxjtWWF1iew", "ChIJPYkcg23JWEcRlf92JQqlY4U", "ChIJq-3R5MhnRUcRD1S96R1_wZk", "ChIJQ4p2YRqtXkcR41T-5GSCBo0", "ChIJqcA4efXWZUcRPsZiHT0Py6I", "ChIJqRyVat_qTRMR2og7IWI9kcM", "ChIJQxOYTzSBqkARMFOhME4-we4", "ChIJR_8VTR3LW0cRSfKpJhuHmxc", "ChIJr47kMgl4ZkcRRSabhGerYKc", "ChIJr5zLihADXkcR5aXEV_0993c", "ChIJR63q0ks3XEcRelfe_qUXfws", "ChIJr6WwFGX6YUcRlZx46qzq4lk", "ChIJRWTSmu9wWkcRcNNWW6j0b9Q", "ChIJRwzsYI9wWkcRjXAtZO4S9Jw", "ChIJS__KKk6gZEcRX7vEpU88O78", "ChIJs4D1VmQTThMR2Edvi-TqDkI", "ChIJsdqbPbHXZUcRbWyf2FU8-TE", "ChIJsfxDuSFOqEcRjlq3N7lqggs", "ChIJsRBOVSMQW0cRoJzBhq0lpx4", "ChIJSV5Xq0HrTRMR88gBk28NWZU", "ChIJSZCbEuRvWkcRw8xL_w90uBk", "ChIJt-bITN_IWEcR4CkrzUt8hIo", "ChIJT1aS16F6WkcRrSQOpjY6RnE", "ChIJt1kTXxQQW0cR9zotYcgjQ2c", "ChIJTd_DbNggV0cRbSs4V6XH-hk", "ChIJTdp2vozhXkcRIysmmmQhUak", "ChIJtSFBHaRDSxMR6yATw8pjOjE", "ChIJtTX69xTJWEcRFEPQfJdvMcI", "ChIJU_BKtF_WZUcRYDAhCWlYRP8", "ChIJU-verXr6YUcRr_WF-A3E6bM", "ChIJU1qP6DzUZUcRjUZMV-PCilo", "ChIJu2jjGYbRZUcRN2qUtCimeOU", "ChIJu62wQs9mQ0cRZKl7heejlOQ", "ChIJUe6pdUzRZUcRYYklWgrGxwA", "ChIJufvusltlWkcRWg0o9v__g_o", "ChIJUwf2ShgMXEcRUsI_pC3JkB0", "ChIJUY6TNrYRW0cRiCIFGn14x8Q", "ChIJUz6c5mnRZUcRCrmaTqN49Uo", "ChIJv-hsRRfRUEcR_SdN6TjpkJ4", "ChIJv383XTYsY0cRifl-axXkSPY", "ChIJV4jeKuKKXEcRqkGx3ZrxZlI", "ChIJvbrvNBDnXEcRtqh13Pl0ifs", "ChIJVcREcKHIREcRvmaQu_o6kMg", "ChIJVx5QWiXTfEcRi8e67HXABrA", "ChIJW_ykvLWgaEcRGYwh5JmeM0k", "ChIJW2PZ7caEXUcRTb4EDNggNQc", "ChIJW95viSihZEcRCLHv5a6lHG4", "ChIJWa1cee5-WkcRsaHhMDAYsaU", "ChIJWdWB9cTXZUcR41Ra0Ve4E1Q", "ChIJWfzq3OZdNRMRipn61_SOxhY", "ChIJwQjhkDqtXkcRknGSJSpXp6E", "ChIJwRaaVQ4DXkcRRTa-oZfEaYs", "ChIJx293yCXnXEcRil_GZpCkdno", "ChIJxTvV6nEQW0cR126DQ_h7DkI", "ChIJXyZmdVpRXkcRDgE1iQ95aCE", "ChIJY_Hlwo3JWEcRhxQw4jnCiCk", "ChIJY1x6KsumZEcRZT5THPsf8eg", "ChIJy2mg_0RyV0cR_a9-2o5JU6k", "ChIJYe3H6gOtaEcR0qrkg-fBJVM", "ChIJyS2_KCgTSxMR-KWy0lNbHow", "ChIJyUj11d3WZUcRXY04C5dJJQI", "ChIJyUSgg5fXZUcR2GOEKZBdRcI", "ChIJYxomQS0uX0cRvnmvhSiT3kM", "ChIJyYoW5yQQW0cRD57qCAT_w2o", "ChIJZ0p3BLznXEcRbfS-5M1D8zg", "ChIJZ3CQRIh4ZkcRjq5FDYYRiGM", "ChIJz6KAeqFMWUcRh0tStYJ4t3M", "ChIJZTchyDCCXkcRrdwlXRUxAQI", "ChIJZW_mcg3cQUcReEMdoJl9Ryo", "ChIJzW0tDTzTfEcRQVKwmDAC-Cg", "ChIJzw4vZJt8Y0cRRss8qoTUlHU"];

const allBrands = ["Author", "Carraro", "Centurion", "Felt", "Trek", "Atala", "Bianchi", "SixTeam", "Capriolo", "Cube", "Shimano", "Mitas", "Krypton", "CST", "Twinn", "Tacx", "Bellelli", "SRAM", "Rock Shox", "Avid", "Truvativ", "Merida", "SKS", "Sigma", "Michelin", "montegrappa", "montegrappa", "GT", "Specialized", "Topeak", "Sigma", "Hydrapak", "Kenda", "Osprey", "Shimano", "Peruzzo", "Mighty", "Endura", "Cube", "Scott", "Cross", "Polar", "Alpina", "Cinzia", "Electra", "Explorer", "Focus", "Scout", "Visitor", "CatEye", "Rubena", "Schwalbe", "Continental", "Promax", "Ashima", "Kellys", "KMC", "Polysport", "Promax", "Cannondale", "Ritchey", "Fizik", "Continental", "DT Swiss", "Uvex", "Zefal", "Northwave", "Elite", "Volkl", "Elan", "Volkl", "UNIS" ];

const allVendorsBrands = {
    "capriolo": {
      "name": "Capriolo Sport Centar",
      "bikeBrands": ["Capriolo", "Cube"],
      "eqBrands": ["Capriolo", "Cube", "Shimano", "Mitas", "Krypton", "CST", "Twinn", "Tacx", "Bellelli", "SRAM", "Rock Shox", "Avid", "Truvativ", "Merida", "SKS", "Sigma", "Michelin", "montegrappa", "KMC"]
    },
    "ciklocentar": {
      "name": "Ciklo centar",
      "bikeBrands": ["GT", "Specialized"],
      "eqBrands": ["Specialized", "Topeak", "Sigma", "Hydrapak", "Kenda", "Osprey", "Shimano", "Peruzzo", "Mighty", "Endura", "Michelin", "KMC", "Promax"]
    },
    "mbikeshop": {
      "name": "M-Bike Shop",
      "bikeBrands": ["Cube", "Scott", "Cross", "Polar", "Alpina", "Cinzia", "Electra"],
      "eqBrands": []
    },
    "trekbikebhpromo": {
      "name": "TREK BIKE CENTAR",
      "bikeBrands": ["Trek"],
      "eqBrands": []
    },
    "boca": {
      "name": "Boca",
      "bikeBrands": ["Kellys", "Capriolo", "Polar", "Scott", "Alpina"],
      "eqBrands": ["CatEye", "Rubena", "Schwalbe", "Continental", "Promax", "Shimano", "Ashima", "Kellys", "Capriolo", "Polar", "Scott"],
    },
    "dost": {
      "name": "DOST d.o.o",
      "bikeBrands": ["Centurion", "Carraro", "SixTeam", "Bianchi", "Atala"],
      "eqBrands": []
    },
    "josobicikli": {
      "name": "Jošo Bicikli",
      "bikeBrands": ["Alpina", "Polar", "Scott", "SixTeam"],
      "eqBrands": ["Krypton", "Shimano", "KMC", "CatEye", "Polysport",  "Scott", "Promax"]
    },
    "bogolivestrong": {
      "name": "Bogolivestrong",
      "bikeBrands": [],
      "eqBrands": []
    },
    "planetbike": {
      "name": "Planet Bike",
      "bikeBrands": ["Scott", "Polar", "Electra", "Cannondale"],
      "eqBrands": ["Scott", "Polar", "Electra", "Cannondale", "Ritchey", "Fizik", "Continental", "DT Swiss", "CatEye", "Uvex", "Zefal", "Northwave", "Polysport", "Elite"]
    },
    "unis": {
      "name": "UNIS bicikli",
      "bikeBrands": ["UNIS", "SixTeam"],
      "eqBrands": []
    },
    "probikezenica": {
      "name": "PRO-BIKE Zenica",
      "bikeBrands": [],
      "eqBrands": []
    },
    "ldbikeprijedor": {
      "name": "LD Bike",
      "bikeBrands": [],
      "eqBrands": []
    },
    "sokovicsport": {
      "name": "Soković Sport",
      "bikeBrands": [],
      "eqBrands": []
    },
    "visiontrade": {
      "name": "Bike Shop Vision trade",
      "bikeBrands": ["Explorer", "Focus", "Scout", "Trek", "Visitor"],
      "eqBrands": []
    },
    "sportvision": {
      "name": "Sport Vision",
      "bikeBrands": ["Capriolo"],
      "eqBrands": []
    },
    "intersport": {
      "name": "Intersport",
      "bikeBrands": ["Nakamura", "Genesis"],
      "eqBrands": []
    },
    "beosport": {
      "name": "Beosport",
      "bikeBrands": [],
      "eqBrands": []
    },
    "decathlon": {
      "name": "Decathlon",
      "bikeBrands": [],
      "eqBrands": []
    },
    "dsg": {
      "name": "DSG bicikli",
      "bikeBrands": [],
      "eqBrands": []
    },
    "fanatic": {
      "name": "Fanatic Bike Shop",
      "bikeBrands": [],
      "eqBrands": []
    },
    "jankovic": {
      "name": "Jankovic Comp",
      "bikeBrands": [],
      "eqBrands": []
    },
    "protea": {
      "name": "Protea Sport",
      "bikeBrands": [],
      "eqBrands": []
    },
    "rogjoma": {
      "name": "Rog Joma",
      "bikeBrands": [],
      "eqBrands": []
    },
    "totalbike": {
      "name": "Total Bike",
      "bikeBrands": [],
      "eqBrands": []
    }
};

const allBrandsStores = {
};
``
const allPoints = [
  {
    "id": "ChIJm3NvJVXWZUcR1HEb4X1FLNo",
    "vendors": "alanprim",
    "name": "Alan Prim Zagreb",
    "city": "Zagreb",
    "website": "http://www.alanprim.hr",
    "fb_link": "https://www.facebook.com/pg/alanprimbikeshop/",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "Mavic"
  },
  {
    "id": "ChIJU-verXr6YUcRr_WF-A3E6bM",
    "vendors": "autohrvatska",
    "name": "Auto-Hrvatska",
    "city": "Zadar",
    "website": "http://www.autohrvatska.com/",
    "fb_link": "",
    "bike_brands": "Apache, Giant, Haibike, KTM, Rock Machine, Scott, Torpado, Winora",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ6wKo_LmtaEcR9DqaBQwGmZo",
    "vendors": "beciklin",
    "name": "Beciklin",
    "city": "?akovec",
    "website": "http://www.prodaja-bicikla.com/",
    "fb_link": "https://www.facebook.com/TrgovinaBeciklin",
    "bike_brands": "Corratec, CTM, Kreidler, Trek, Fuji",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJqRyVat_qTRMR2og7IWI9kcM",
    "vendors": "bejkerajcg",
    "name": "BAJKERAJ",
    "city": "Podgorica",
    "website": "http://www.bajkeraj.me/",
    "fb_link": "http://www.facebook.com/Bajkeraj/",
    "bike_brands": "Cinzia, CTM, Cube, Itrike, Jumpertrek, Lombardo, MS, Orbea, Ridley",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJt-bITN_IWEcR4CkrzUt8hIo",
    "vendors": "beosport",
    "name": "Beosport",
    "city": "Sarajevo",
    "website": "http://www.beosport.com/",
    "fb_link": "",
    "bike_brands": "Specialized, Alpina, Carrera",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJufvusltlWkcRWg0o9v__g_o",
    "vendors": "beosport",
    "name": "Beosport",
    "city": "Beograd",
    "website": "http://www.beosport.com/",
    "fb_link": "",
    "bike_brands": "Specialized, Alpina, Carrera",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJof29NQIRW0cR6Bhy6zca5DI",
    "vendors": "beosport",
    "name": "Beosport",
    "city": "Novi Sad",
    "website": "http://www.beosport.com/",
    "fb_link": "",
    "bike_brands": "Specialized, Alpina, Carrera",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJv-hsRRfRUEcR_SdN6TjpkJ4",
    "vendors": "beosport",
    "name": "Beosport",
    "city": "Velika Plana",
    "website": "http://www.beosport.rs/",
    "fb_link": "",
    "bike_brands": "Specialized, Alpina, Carrera",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ3VcjvBYhV0cRuQj8AN6Igfs",
    "vendors": "beosport",
    "name": "Beosport",
    "city": "Kragujevac",
    "website": "",
    "fb_link": "",
    "bike_brands": "Specialized, Alpina, Carrera",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJaw1HBmkQW0cRMSiyswCu0Yo",
    "vendors": "beosport",
    "name": "Beosport",
    "city": "Novi Sad",
    "website": "",
    "fb_link": "",
    "bike_brands": "Specialized, Alpina, Carrera",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJFxzxpx6mZEcRHCShTSl-rDA",
    "vendors": "biciklahr",
    "name": "Experience - bike-ski shop & service",
    "city": "Matulji",
    "website": "http://www.bicikla.hr/",
    "fb_link": "https://www.facebook.com/bicikla.hr/",
    "bike_brands": "Adriatica, Cube, GT, Jamis, Norco, Rocky Mountain, Scott, Specialized, Wheeler",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ8fN01LLXZUcRVplPMYftPlg",
    "vendors": "biciklibiz",
    "name": "BICIKL BIZ d.o.o.",
    "city": "Zagreb",
    "website": "http://www.bicikl.biz/",
    "fb_link": "",
    "bike_brands": "Old&Bold, Esperia, Author, Genesis, Nishiki",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJRwzsYI9wWkcRjXAtZO4S9Jw",
    "vendors": "biciklicbg",
    "name": "Biciklic",
    "city": "Beograd",
    "website": "",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJDwkjYqOtaEcRx7CgPYqAyKM",
    "vendors": "biciklopedija",
    "name": "Bike Point Radoti?",
    "city": "?akovec",
    "website": "http://biciklopedija.hr/",
    "fb_link": "https://www.facebook.com/Biciklopedija/",
    "bike_brands": "Megamo",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJr47kMgl4ZkcRRSabhGerYKc",
    "vendors": "bigsportzagreb",
    "name": "Mr. Big Sport",
    "city": "Zagreb",
    "website": "http://www.skije-bicikli.com/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ5ecP_Y1vWkcRb_iNOh0bis4",
    "vendors": "bikeland",
    "name": "Bikeland",
    "city": "Beograd",
    "website": "http://www.bikeland.rs/",
    "fb_link": "https://www.facebook.com/Bikeland-DOO-1381187078816144/",
    "bike_brands": "KTM, Cross, Capriolo, Scout, Visitor, Explorer",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "DODATI U PRETRAGU “Bikeland”",
    "eq_brands": ""
  },
  {
    "id": "ChIJ8ZNJpN4gV0cREuEPwmfWtdE",
    "vendors": "bikemvsport",
    "name": "SERVIS I PRODAJA BICIKLI",
    "city": "BIKE MV SPORT",
    "website": "",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": "",
    "servis": "",
    "rent": "",
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "",
    "vendors": "bikeservis1",
    "name": "Bike Servis",
    "city": "Visoko",
    "website": "",
    "fb_link": "https://www.facebook.com/Bike-Servis-Visoko-567272100053110/",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJf09KZ_c9X0cRqdkFXLCk1_A",
    "vendors": "bikeservis2",
    "name": "Bike Servis",
    "city": "Fojnica",
    "website": "",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJq0cia9ewVUcRhNBhdwKMWVA",
    "vendors": "bikeservis3",
    "name": "Servis Bicikala `VEKTOR`",
    "city": "Niš",
    "website": "",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ_5yeaxznXEcR3E8iLe3a-KU",
    "vendors": "bikeservis4",
    "name": "Bicycle Repair Shop",
    "city": "Osijek",
    "website": "",
    "fb_link": "https://www.facebook.com/profile.php?id=100004149825761&fref=search",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJhau8y0lVb0cRLbcO5sn38Pk",
    "vendors": "bikeservis5",
    "name": "Servis bicikala",
    "city": "Varaždin",
    "website": "",
    "fb_link": "https://www.facebook.com/Majstor-Tihi-Servis-Bicikala-847826201932522/",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJm1PQfgRxWkcRkA1xkwyE6MA",
    "vendors": "bikeservis6",
    "name": "Servis Bicikla Kruna",
    "city": "Beograd",
    "website": "",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJoWwbalkvNRMRy8uKuHklv5k",
    "vendors": "bikeservis7",
    "name": "SERVIS BICIKLA MILKOVIĆ",
    "city": "Šibenik",
    "website": "",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJTdKtaavXZUcRLh98LC1p88I",
    "vendors": "bikeservis8",
    "name": "Bike Servis",
    "city": "Zagreb",
    "website": "",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJvbrvNBDnXEcRtqh13Pl0ifs",
    "vendors": "bikeshoposijek",
    "name": "Bikea Bike Shop",
    "city": "Osijek",
    "website": "",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ1Uyq8iihZEcRQz5cCBoUo-k",
    "vendors": "bikewise",
    "name": "BIKEWISE shop & servis",
    "city": "Rijeka",
    "website": "http://www.bikewise.hr/",
    "fb_link": "https://www.facebook.com/BikeWisehr/",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 1,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJE3NAUFbWZUcRrwfS5FaINbU",
    "vendors": "bimbikezg",
    "name": "bicycles BIM",
    "city": "Zagreb",
    "website": "http://www.bim-bike.hr/",
    "fb_link": "https://www.facebook.com/BimBikeZagreb/",
    "bike_brands": "KTM",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJN-OOgdMcX0cRs8byvAdCUxU",
    "vendors": "boca",
    "name": "Boca",
    "city": "Vitez",
    "website": "http://www.bocavitez.com/",
    "fb_link": "https://www.facebook.com/bocavitez/",
    "bike_brands": "Cube, Kellys, Capriolo, Polar, Alpina",
    "prodaja": 1,
    "servis": 1,
    "rent": 1,
    "note": "",
    "eq_brands": "CAT EYE, RUBENA, SCHWALBE, CONTINENTAL, PROMAX, SHIMANO, ASHIMA, KELLY`S, CAPRIOLO, POLAR, SCOTT, peruzzo, thule"
  },
  {
    "id": "ChIJj8lXd9zIWEcR24mTA2Yc3E0",
    "vendors": "bogolivestrong",
    "name": "Bogolivestrong",
    "city": "Sarajevo",
    "website": "http://www.bogolivestrong.com/",
    "fb_link": "https://www.facebook.com/bogolivestrong.doo/",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJv383XTYsY0cRifl-axXkSPY",
    "vendors": "brbsrpot",
    "name": "B.R.B. sport Ltd.",
    "city": "Pula",
    "website": "http://www.brbsport.hr/",
    "fb_link": "https://www.facebook.com/BRB-SPORT-doo-90422445735/?ref=hl",
    "bike_brands": "BRB, Cube, Torpado",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJjSxcE2T6YUcRv-IKUmRKErY",
    "vendors": "calimero",
    "name": "CALIMERO SPORT Rent-a-bike/bicycle service/spare parts/adventure tour",
    "city": "Zadar",
    "website": "http://www.calimero-sport.hr/",
    "fb_link": "https://www.facebook.com/calimerosportzd/",
    "bike_brands": "Cinzia, Cube, Jumpertrek, Puki, Rider",
    "prodaja": 1,
    "servis": 1,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJN81HE2T6YUcRcM_oWhQxQgY",
    "vendors": "calimero",
    "name": "Prodaja i servis bicikla Zadar - Calimero Sport",
    "city": "Zadar",
    "website": "http://www.calimero-sport.hr/",
    "fb_link": "https://www.facebook.com/calimerosportzd/",
    "bike_brands": "Cinzia, Cube, Jumpertrek, Rider",
    "prodaja": 1,
    "servis": 1,
    "rent": 1,
    "note": "",
    "eq_brands": "Shimano, Cube, RFR, Ritchey, BRN, BROOKS, M-Wave, KMC, Zoom, Promax"
  },
  {
    "id": "ChIJz6KAeqFMWUcRh0tStYJ4t3M",
    "vendors": "capriolo",
    "name": "Capriolo Sport Centar",
    "city": "Živinice Grad",
    "website": "http://www.jabihcapriolo.com/",
    "fb_link": "https://www.facebook.com/JaBiHCapriolo/",
    "bike_brands": "Capriolo, Cube",
    "prodaja": 1,
    "servis": 1,
    "rent": 1,
    "note": "",
    "eq_brands": "Krypton, Mitas, Shimano, Tacx, Bellelli, Sram, Rock Shox, Avid, Truvativ, Merida, SKS, Sigma, Michelin, montegrappa"
  },
  {
    "id": "ChIJZTchyDCCXkcRrdwlXRUxAQI",
    "vendors": "capriolo",
    "name": "Capriolo Sport Centar",
    "city": "Doboj",
    "website": "http://www.jabihcapriolo.com/",
    "fb_link": "https://www.facebook.com/JaBiHCapriolo/",
    "bike_brands": "Capriolo, Cube",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": "Krypton, Mitas, Shimano, Tacx, Bellelli, Sram, Rock Shox, Avid, Truvativ, Merida, SKS, Sigma, Michelin, montegrappa"
  },
  {
    "id": "ChIJr5zLihADXkcR5aXEV_0993c",
    "vendors": "capriolo",
    "name": "Capriolo Sport Centar BL2",
    "city": "Banja Luka",
    "website": "http://jabihcapriolo.com/",
    "fb_link": "https://www.facebook.com/JaBiHCapriolo/",
    "bike_brands": "Capriolo, Cube",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "Krypton, Mitas, Shimano, Tacx, Bellelli, Sram, Rock Shox, Avid, Truvativ, Merida, SKS, Sigma, Michelin, montegrappa"
  },
  {
    "id": "ChIJM29t4AcDXkcRAvIsQloB7NI",
    "vendors": "capriolo",
    "name": "Capriolo Sport Centar BL3",
    "city": "Banja Luka",
    "website": "http://jabihcapriolo.com/",
    "fb_link": "https://www.facebook.com/JaBiHCapriolo/",
    "bike_brands": "Capriolo, Cube",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "Krypton, Mitas, Shimano, Tacx, Bellelli, Sram, Rock Shox, Avid, Truvativ, Merida, SKS, Sigma, Michelin, montegrappa"
  },
  {
    "id": "",
    "vendors": "capriolo",
    "name": "Capriolo Sport Centar BL5",
    "city": "Banja Luka",
    "website": "http://jabihcapriolo.com/",
    "fb_link": "https://www.facebook.com/JaBiHCapriolo/",
    "bike_brands": "Capriolo, Cube",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "Aleja Svetog Save 19,U nastavku Addiko banke",
    "eq_brands": "Krypton, Mitas, Shimano, Tacx, Bellelli, Sram, Rock Shox, Avid, Truvativ, Merida, SKS, Sigma, Michelin, montegrappa"
  },
  {
    "id": "ChIJR63q0ks3XEcRelfe_qUXfws",
    "vendors": "capriolo",
    "name": "Capriolo Sport Centar Modri?a",
    "city": "Modri?a",
    "website": "http://www.jabihcapriolo.com/",
    "fb_link": "https://www.facebook.com/JaBiHCapriolo/",
    "bike_brands": "Capriolo, Cube",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "Krypton, Mitas, Shimano, Tacx, Bellelli, Sram, Rock Shox, Avid, Truvativ, Merida, SKS, Sigma, Michelin, montegrappa"
  },
  {
    "id": "ChIJa_eLpd_IWEcRamQ7brHzgzg",
    "vendors": "capriolo",
    "name": "Capriolo Sport Centar SA1",
    "city": "Sarajevo",
    "website": "http://www.jabihcapriolo.com/",
    "fb_link": "https://www.facebook.com/JaBiHCapriolo/",
    "bike_brands": "Capriolo, Cube",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "Krypton, Mitas, Shimano, Tacx, Bellelli, Sram, Rock Shox, Avid, Truvativ, Merida, SKS, Sigma, Michelin, montegrappa"
  },
  {
    "id": "ChIJBSkqlG3JWEcRYAbtx_X5Pgs",
    "vendors": "capriolo",
    "name": "Capriolo Sport Centar SA2",
    "city": "Sarajevo",
    "website": "http://jabihcapriolo.com/",
    "fb_link": "https://www.facebook.com/JaBiHCapriolo/",
    "bike_brands": "Capriolo, Cube",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "Krypton, Mitas, Shimano, Tacx, Bellelli, Sram, Rock Shox, Avid, Truvativ, Merida, SKS, Sigma, Michelin, montegrappa"
  },
  {
    "id": "ChIJHWDk2Qu_REcRnjvrM46mURQ",
    "vendors": "capriolo",
    "name": "Tehnoguma",
    "city": "Senta",
    "website": "",
    "fb_link": "https://www.facebook.com/Tehnoguma-Bicycles-parts-accessories-301371566861572/",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJK_ghhmzKWEcRiyldJxehwSE",
    "vendors": "ciklocentar",
    "name": "Ciklo Centar",
    "city": "Ilidža",
    "website": "http://ciklocentar.ba/",
    "fb_link": "https://www.facebook.com/Ciklo-Centar-BBK-Igman-328539207183651/",
    "bike_brands": "GT, Specialized",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "Topeak, Sigma, Michelin, Kenda, Shimano, Peruzzo, Osprey, Hydrapak, Endura, Mighty,  ZEFAL, KINETIC,PROMAX, EXUSTAR, REMERX, KOOL STOP, PEDROS, SIXSIXONE, ALLAY, JAGWIRE, NOVATEC,KNOG, VELO, TRUVATIV, KED, LIZARD SKINS, SRAM, MAVIC, SH+, DT SWISS, HOLMENNOL, AVID, ALLAY, KMC, ERGON, Schwinn, CRANKBROTHERS"
  },
  {
    "id": "ChIJDWj5siDJWEcRolqo1j3MN4A",
    "vendors": "ciklocentar",
    "name": "Ciklo Centar",
    "city": "Sarajevo",
    "website": "http://www.ciklocentar.com/",
    "fb_link": "https://www.facebook.com/Ciklo-Centar-BBK-Igman-328539207183651/",
    "bike_brands": "GT, Specialized",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": "Topeak, Sigma, Michelin, Kenda, Shimano, Peruzzo, Osprey, Hydrapak, Endura, Mighty,  ZEFAL, KINETIC,PROMAX, EXUSTAR, REMERX, KOOL STOP, PEDROS, SIXSIXONE, ALLAY, JAGWIRE, NOVATEC,KNOG, VELO, TRUVATIV, KED, LIZARD SKINS, SRAM, MAVIC, SH+, DT SWISS, HOLMENNOL, AVID, ALLAY, KMC, ERGON, Schwinn, CRANKBROTHERS"
  },
  {
    "id": "ChIJtSFBHaRDSxMR6yATw8pjOjE",
    "vendors": "ciklocentar",
    "name": "Ciklo centar",
    "city": "Mostar",
    "website": "http://ciklocentar.ba/",
    "fb_link": "",
    "bike_brands": "GT, Specialized",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "Topeak, Sigma, Michelin, Kenda, Shimano, Peruzzo, Osprey, Hydrapak, Endura, Mighty,  ZEFAL, KINETIC,PROMAX, EXUSTAR, REMERX, KOOL STOP, PEDROS, SIXSIXONE, ALLAY, JAGWIRE, NOVATEC,KNOG, VELO, TRUVATIV, KED, LIZARD SKINS, SRAM, MAVIC, SH+, DT SWISS, HOLMENNOL, AVID, ALLAY, KMC, ERGON, Schwinn, CRANKBROTHERS"
  },
  {
    "id": "ChIJyUSgg5fXZUcR2GOEKZBdRcI",
    "vendors": "ciklocentarhr",
    "name": "CIKLO - CENTAR d.o.o.",
    "city": "Zagreb",
    "website": "http://www.ciklo-centar.hr/",
    "fb_link": "https://www.facebook.com/pg/Ciklo.Centar/about/?ref=page_internal",
    "bike_brands": "Kona, Superior, Shockblaze, KELLYS, Dahon",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "NORTHWAVE, CRATONI, SHIMANO, ATOMLAB, AVID, Kona, Michelin, Schwalbe, Maxxis, Sigma, Kryptonite, Acor, BROOKS, VELO, montegrappa, DA BOMB, SRAM"
  },
  {
    "id": "ChIJU_BKtF_WZUcRYDAhCWlYRP8",
    "vendors": "ciklosportzg",
    "name": "Ciklo-Sport",
    "city": "Zagreb",
    "website": "https://ciklo-sport.hr/",
    "fb_link": "",
    "bike_brands": "Kona, Superior, Dahon, Takashi, Ferrini, Sprint",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "Acor, Velo, Da Bomb, Shimano,SunRace, Kenda, Schwalbe, Continental, Michelin, Zefal, QT,  Kryptonite"
  },
  {
    "id": "ChIJidYSYmkQW0cRrlfu3FqJa_0",
    "vendors": "ciklotekans",
    "name": "Cikloteka",
    "city": "Novi Sad",
    "website": "",
    "fb_link": "https://www.facebook.com/cikloteka",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJebCWfe1xWkcRZ4k5WBz_ZW8",
    "vendors": "citybikers",
    "name": "City-Bike",
    "city": "Beograd",
    "website": "http://www.citybike.rs/",
    "fb_link": "",
    "bike_brands": "Capriolo, Planetbike, Venera, Merida",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJG2NwUHXtWUcRcDZzysMFRMQ",
    "vendors": "colnagovaljevo",
    "name": "Colnago Bike-Servis i prodaja bicikli i motora",
    "city": "Valjevo",
    "website": "",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJcya0WnXtWUcRGW11LDzSBj0",
    "vendors": "colnagovaljevo",
    "name": "COLNAGO-Servis i prodaja bicikli i motora",
    "city": "Valjevo",
    "website": "",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJp4gyPLl6WkcRGbsPLBCBVas",
    "vendors": "crossbikers",
    "name": "CROSS BIKE",
    "city": "Beograd",
    "website": "http://www.crossbike.rs/",
    "fb_link": "",
    "bike_brands": "Cross",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "imaju 3 radnje Zajecar, i dvije u beogradu",
    "eq_brands": "TEKTRO, SELLE SAN MARCO, PROWHEEL, SIGMA, SIMPLA, VELO, VEE RUBBER, GIYO, ZOOM, VP COMPONENTS, ACTIVE DDK, KALLOY, KMC,KRYPTONITE, MACTRONIC, PROMAX, JAGWIRE, GRX, CROSS"
  },
  {
    "id": "ChIJUY6TNrYRW0cRiCIFGn14x8Q",
    "vendors": "cyclomania",
    "name": "Cyclomania Bike Shop i Servis",
    "city": "Novi Sad",
    "website": "http://www.cyclomania.rs/",
    "fb_link": "https://www.facebook.com/CyclomaniaBikeShop/",
    "bike_brands": "Trek, Cross, Capriolo, Visitor, Scout",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "Shimano,Sigma, Novatec, CST, Schwalbe, Luma, VDO, DMT, Michelin"
  },
  {
    "id": "ChIJayn39VsQW0cReIs0tjjxcWo",
    "vendors": "cyclomania",
    "name": "KALE BIKE 3D",
    "city": "Novi Sad",
    "website": "",
    "fb_link": "https://www.facebook.com/KALE-BIKE-3D-1537965159841307/",
    "bike_brands": "Trek, Cross, Capriolo, Visitor, Scout",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "Shimano,Sigma, Novatec, CST, Schwalbe, Luma, VDO, DMT, Michelin"
  },
  {
    "id": "ChIJu2jjGYbRZUcRN2qUtCimeOU",
    "vendors": "decathlon",
    "name": "Decathlon",
    "city": "Zagreb",
    "website": "http://www.decathlon.hr/",
    "fb_link": "",
    "bike_brands": "B`TWIN",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJg4Z-voT6YUcRJX0gj0X_dBc",
    "vendors": "decathlon",
    "name": "Decathlon",
    "city": "Zadar",
    "website": "http://www.decathlon.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ993Pp2kyZUcRFp27vU2hA6U",
    "vendors": "decathlon",
    "name": "Decathlon Ljubljana",
    "city": "Ljubljana",
    "website": "http://decathlon.si/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJx293yCXnXEcRil_GZpCkdno",
    "vendors": "decathlon",
    "name": "Decathlon Osijek",
    "city": "Osijek",
    "website": "http://www.decathlon.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJY1x6KsumZEcRZT5THPsf8eg",
    "vendors": "decathlon",
    "name": "Decathlon Rijeka",
    "city": "Rijeka",
    "website": "http://www.decathlon.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJZW_mcg3cQUcReEMdoJl9Ryo",
    "vendors": "decathlon",
    "name": "Decathlon Skala",
    "city": "Nyugati tÃ©r 1",
    "website": "http://www.decathlon.hu/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJQxOYTzSBqkARMFOhME4-we4",
    "vendors": "decathlon",
    "name": "Decathlon Vitosha",
    "city": "Sofia",
    "website": "http://www.decathlon.bg/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJZ3CQRIh4ZkcRjq5FDYYRiGM",
    "vendors": "decathlon",
    "name": "Decathlon Zagreb Istok",
    "city": "Zagreb",
    "website": "http://decathlon.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJyS2_KCgTSxMR-KWy0lNbHow",
    "vendors": "dostba",
    "name": "DOST d.o.o",
    "city": "Me?ugorje",
    "website": "http://www.dost.ba/",
    "fb_link": "",
    "bike_brands": "Centurion, Carraro, SixTeam, Atala, Bianchi",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": "CST, Shimano"
  },
  {
    "id": "ChIJsdqbPbHXZUcRbWyf2FU8-TE",
    "vendors": "dragosport",
    "name": "Drago-Sport",
    "city": "Zagreb",
    "website": "http://www.drago-sport.com/",
    "fb_link": "https://www.facebook.com/dragosport.hr/?fref=ts",
    "bike_brands": "Cube, Basso, Cinzia",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "Acor, FireEye, Kenda, Shimano, Promax, Peruzzo, Schwalbe, CST, XLC, Sigma, Sport Division, Zefal, Abus"
  },
  {
    "id": "ChIJL_QbEtzWZUcRPu2qm4kjx-c",
    "vendors": "dsg",
    "name": "DSG bicikli",
    "city": "Zagreb",
    "website": "http://www.dsg.hr/",
    "fb_link": "https://www.facebook.com/DSGbicikli/",
    "bike_brands": "Diamondback, Ghost, Haro",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "imaju 3 radnje dvije u ZG i jedna u Bjelovaru, plus servis u ZG naveden dole",
    "eq_brands": "Diamondback, Ghost, Haro, Race Face, UNO, Focus, Devron, DT Swiss, JoyTech, Novatec, Shimano, Sun Ringle, Fizik, Odi, Premium Products, RMS, Velo, WTB, Tektro, Amoeba, Truvativ, SRAM, TAYA, Neco, Continental, Kenda, Slime, Vee Rubber, DT Swiss, Rock Shox, RST, Syncros, Wellgo, Alhonga, Baradine, Clarks, Elvedes, Kool Stop, Magura, FSA, Avid, Odyssey, SST Oryg, Schwalbe, Rubena, Mozo Usa, Sigma, Magnum, OnGuard, Trelock"
  },
  {
    "id": "ChIJk0qH_3PWZUcRqVbK2IivpLE",
    "vendors": "dsg",
    "name": "DSG SERVIS bicikala",
    "city": "Zagreb",
    "website": "http://www.dsg.hr/",
    "fb_link": "",
    "bike_brands": "Devron, Ghost, Haro",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "Diamondback, Ghost, Haro, Race Face, UNO, Focus, Devron, DT Swiss, JoyTech, Novatec, Shimano, Sun Ringle, Fizik, Odi, Premium Products, RMS, Velo, WTB, Tektro, Amoeba, Truvativ, SRAM, TAYA, Neco, Continental, Kenda, Slime, Vee Rubber, DT Swiss, Rock Shox, RST, Syncros, Wellgo, Alhonga, Baradine, Clarks, Elvedes, Kool Stop, Magura, FSA, Avid, Odyssey, SST Oryg, Schwalbe, Rubena, Mozo Usa, Sigma, Magnum, OnGuard, Trelock"
  },
  {
    "id": "ChIJgQFvoXQ2ZkcRPqrndoDs9LU",
    "vendors": "dsg",
    "name": "DSG bicikli d.o.o.",
    "city": "Bjelovar",
    "website": "http://www.dsg.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJhR9Zr_RvWkcRCFAp8o9WmFw",
    "vendors": "eprime",
    "name": "E prime electric bikes",
    "city": "Beograd",
    "website": "http://www.e-prime.net/",
    "fb_link": "",
    "bike_brands": "E-prime",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ2cuGNyJeNRMRjJn0nOS5apg",
    "vendors": "extremeshop",
    "name": "Bike Extremeshop2",
    "city": "Split",
    "website": "https://www.bicikla.com/",
    "fb_link": "https://www.facebook.com/shop.bicikla",
    "bike_brands": "Cinzia, Cube, Dahon, Giant, GT, Haibike, Winora, Jamis, Kettler, Norco, Orbea, Scott, Specialized",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "Continental, Cube, Vittoria, Giant, Kenda, Topeak, Specialized, Michelin, Schwalbe, Maxxis, Byte, Shimano, Endura, Sigma, Fox, Chimpanzee, CrankBRothers, Look, SRAM"
  },
  {
    "id": "ChIJiZ7FivxdNRMRnntKtOcoIwQ",
    "vendors": "extremeshophr",
    "name": "ExtremeShop",
    "city": "Split",
    "website": "http://www.bicikla.com/",
    "fb_link": "https://www.facebook.com/shop.bicikla",
    "bike_brands": "Cinzia, Cube, Dahon, Giant, GT, Haibike, Winora, Jamis, Kettler, Norco, Orbea, Scott, Specialized",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "Continental, Cube, Vittoria, Giant, Kenda, Topeak, Specialized, Michelin, Schwalbe, Maxxis, Byte, Shimano, Endura, Sigma, Fox, Chimpanzee, CrankBRothers, Look, SRAM"
  },
  {
    "id": "ChIJZ0p3BLznXEcRbfS-5M1D8zg",
    "vendors": "extremesporthr",
    "name": "Extreme Sport d.o.o",
    "city": "Osijek",
    "website": "http://www.extremesport.hr/",
    "fb_link": "https://www.facebook.com/extremesport.osijek/",
    "bike_brands": "Arkus, Cube, Electra, Maxim, Romet",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ0WxeMBUQW0cRD9Bsi4a_1Zs",
    "vendors": "fanatic",
    "name": "Fanatic Bicycle Shop",
    "city": "Novi Sad",
    "website": "http://www.fanatic.rs/",
    "fb_link": "https://www.facebook.com/fanaticns",
    "bike_brands": "Adria, Alpina, Booster, Capriolo, Cross, Giant, Polar, Trek, Ultra, Venera",
    "prodaja": 1,
    "servis": 1,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJyYoW5yQQW0cRD57qCAT_w2o",
    "vendors": "fanatic",
    "name": "Fanatic Bike Shop & Service",
    "city": "Veternik",
    "website": "http://www.fanatic.rs/",
    "fb_link": "https://www.facebook.com/fanaticns",
    "bike_brands": "Adria, Alpina, Booster, Capriolo, Cross, Giant, Polar, Trek, Ultra, Venera",
    "prodaja": 1,
    "servis": 1,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJWa1cee5-WkcRsaHhMDAYsaU",
    "vendors": "freestylers",
    "name": "Freestyle Shop",
    "city": "Pan?evo",
    "website": "",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJp1C7QCs8ZEcRfJitAI7Pw-g",
    "vendors": "golfaurora",
    "name": "GOLF AURORA BIKE",
    "city": "Karlovac",
    "website": "http://www.golf-aurora.hr/",
    "fb_link": "",
    "bike_brands": "Trek, Cube, Norco, Schwinn, Rog Joma, X-Plorer, Hodala, Merida, Fuji, Gary Fisher, Wheeler, Cannondale, Orbea, Atala, Cinzia, Jumpertrek, Bottecchia",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJUe6pdUzRZUcRYYklWgrGxwA",
    "vendors": "haferhr",
    "name": "Hafer",
    "city": "Zagreb",
    "website": "http://www.hafer.hr/",
    "fb_link": "",
    "bike_brands": "Dema, Scott, Rock Machine, Visitor",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJqcA4efXWZUcRPsZiHT0Py6I",
    "vendors": "hunibikeshop",
    "name": "Huni Bike Shop prodaja bicikla i opreme",
    "city": "Prelog",
    "website": "http://www.huni-bike-shop.hr/",
    "fb_link": "https://www.facebook.com/HuniBikeShopBicikli",
    "bike_brands": "Haibike, Cube",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "XLC, Shimano, SRAM, CrankBRothers, Schwalbe"
  },
  {
    "id": "ChIJieDAXD7JWEcRh2i9vODasoc",
    "vendors": "intersport",
    "name": "INTERSPORT",
    "city": "Sarajevo",
    "website": "http://www.intersport.ba/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJY_Hlwo3JWEcRhxQw4jnCiCk",
    "vendors": "intersport",
    "name": "INTERSPORT",
    "city": "Sarajevo",
    "website": "http://www.intersport.ba/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJO4fnlxXKWEcRJBb0jwVnWtY",
    "vendors": "intersport",
    "name": "INTERSPORT",
    "city": "Ilidža",
    "website": "http://www.intersport.ba/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ_cnFJLtDSxMRbLaU7M7mEPw",
    "vendors": "intersport",
    "name": "INTERSPORT",
    "city": "Mostar",
    "website": "http://www.intersport.ba/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJXyZmdVpRXkcRDgE1iQ95aCE",
    "vendors": "intersport",
    "name": "INTERSPORT",
    "city": "Šišava",
    "website": "http://www.intersport.ba/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJwQjhkDqtXkcRknGSJSpXp6E",
    "vendors": "intersport",
    "name": "Intersport",
    "city": "Tuzla",
    "website": "http://www.intersport.ba/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJQ4p2YRqtXkcR41T-5GSCBo0",
    "vendors": "intersport",
    "name": "Intersport",
    "city": "Tuzla",
    "website": "http://www.intersport.ba/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJaxFFvw0DXkcRBZR0Z8TWrnM",
    "vendors": "intersport",
    "name": "INTERSPORT",
    "city": "Banja Luka",
    "website": "http://www.intersport.ba/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJUwf2ShgMXEcRUsI_pC3JkB0",
    "vendors": "intersport",
    "name": "Intersport",
    "city": "Br?ko",
    "website": "http://www.intersport.ba/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJP4pGMDbWZUcRHNPzW91YkpM",
    "vendors": "intersport",
    "name": "Intersport",
    "city": "Zagreb",
    "website": "http://www.intersport.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJAyVl5UjWZUcRUKHDEbfvVXw",
    "vendors": "intersport",
    "name": "Intersport",
    "city": "Zagreb",
    "website": "http://www.intersport.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJN4OZkE_RZUcRGvska0PT9Rg",
    "vendors": "intersport",
    "name": "Intersport",
    "city": "Zagreb",
    "website": "http://www.intersport.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJS__KKk6gZEcRX7vEpU88O78",
    "vendors": "intersport",
    "name": "INTERSPORT",
    "city": "Rijeka",
    "website": "http://www.intersport.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ5b015KDAfEcRch9zj2EvEB4",
    "vendors": "intersport",
    "name": "Intersport",
    "city": "Rovinj",
    "website": "http://www.intersport.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ24JZfMjSfEcRliam6UM7bUQ",
    "vendors": "intersport",
    "name": "Intersport",
    "city": "Pula",
    "website": "http://www.intersport.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJMUJcvoT6YUcRi2Q2G3rOZuw",
    "vendors": "intersport",
    "name": "Intersport",
    "city": "Zadar",
    "website": "http://www.intersport.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJjb6AbkDuShMRBZumxFaoZEA",
    "vendors": "intersport",
    "name": "Intersport",
    "city": "Makarska",
    "website": "http://www.intersport.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJe3YXcOF-WkcR7vJ4ZoHpiFk",
    "vendors": "intersport",
    "name": "Intersport",
    "city": "Pan?evo",
    "website": "http://www.intersport.rs/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ7fjCZ9VUb0cRLWkpEtuJ_K4",
    "vendors": "intersport",
    "name": "INTERSPORT",
    "city": "Varaždin",
    "website": "http://www.intersport.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ4YHXnipVb0cRaCn9WLVQrdo",
    "vendors": "intersport",
    "name": "Intersport",
    "city": "Varaždin",
    "website": "http://www.intersport.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJAf59RbmPXEcRybMTzo6Args",
    "vendors": "intersport",
    "name": "INTERSPORT",
    "city": "Vukovar",
    "website": "http://www.intersport.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJR_8VTR3LW0cRSfKpJhuHmxc",
    "vendors": "intersport",
    "name": "INTERSPORT ŠABAC",
    "city": "Šabac",
    "website": "http://www.intersport.rs/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ0yk7nI9VXEcReGJrWZhzMUw",
    "vendors": "intersport",
    "name": "Intersport ?akovo",
    "city": "?akovo",
    "website": "http://www.intersport.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJy2mg_0RyV0cR_a9-2o5JU6k",
    "vendors": "intersport",
    "name": "INTERSPORT ?A?AK",
    "city": "?a?ak",
    "website": "http://www.intersport.rs/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJN4gergqtaEcRUaKChLaLzZQ",
    "vendors": "intersport",
    "name": "Intersport ?akovec 1",
    "city": "?akovec",
    "website": "http://www.intersport.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJYe3H6gOtaEcR0qrkg-fBJVM",
    "vendors": "intersport",
    "name": "Intersport ?akovec 2",
    "city": "?akovec",
    "website": "http://www.intersport.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJU1qP6DzUZUcRjUZMV-PCilo",
    "vendors": "intersport",
    "name": "Intersport Arena Zagreb 4",
    "city": "Zagreb",
    "website": "http://www.intersport.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJMyxg7gB0ThMRRWRvOTMZAKQ",
    "vendors": "intersport",
    "name": "INTERSPORT Bar",
    "city": "Bar",
    "website": "http://www.intersport.me/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJj0IAuXxlWkcR64O3HXzBRQE",
    "vendors": "intersport",
    "name": "INTERSPORT BEOGRAD 1",
    "city": "Beograd",
    "website": "http://www.intersport.rs/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJjajAa4RvWkcRnkxjLcREq2A",
    "vendors": "intersport",
    "name": "INTERSPORT BEOGRAD 2",
    "city": "Beograd",
    "website": "http://www.intersport.rs/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJA3Nb8tXKNBMRLwmDZW4i3-w",
    "vendors": "intersport",
    "name": "Intersport Biograd",
    "city": "Biograd na Moru",
    "website": "http://www.intersport.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ4zHs_27uShMRv_ITtOKdamY",
    "vendors": "intersport",
    "name": "Intersport Capitol Park Makarska 1",
    "city": "Makarska",
    "website": "http://www.intersport.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJicXaIsdfNRMR2xAjxRJupWM",
    "vendors": "intersport",
    "name": "Intersport CCO Split 3",
    "city": "Split",
    "website": "http://www.intersport.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJzw4vZJt8Y0cRRss8qoTUlHU",
    "vendors": "intersport",
    "name": "Intersport Crikvenica 1",
    "city": "Crikvenica",
    "website": "http://www.intersport.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJGWezpaupTRMRLPRRXJJ88II",
    "vendors": "intersport",
    "name": "Intersport Crna Gora",
    "city": "Nikši?",
    "website": "https://www.intersport.me/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJEUSWQbZ5ZkcRWZYYF0RF-mg",
    "vendors": "intersport",
    "name": "Intersport H MBH",
    "city": "Sesvete",
    "website": "http://www.intersport.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJodzIaC48ZEcRxXP_w0r8Ous",
    "vendors": "intersport",
    "name": "Intersport Karlovac 1",
    "city": "Karlovac",
    "website": "http://www.intersport.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJTd_DbNggV0cRbSs4V6XH-hk",
    "vendors": "intersport",
    "name": "INTERSPORT KRAGUJEVAC",
    "city": "Kragujevac",
    "website": "http://www.intersport.rs/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ8y78IrbYVkcR8bZgnemcTFM",
    "vendors": "intersport",
    "name": "INTERSPORT KRUŠEVAC",
    "city": "Kruševac",
    "website": "http://www.intersport.rs/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ4Y6LB0peNRMRtXbWW3GKHKE",
    "vendors": "intersport",
    "name": "Intersport Mall of Split 4",
    "city": "Split",
    "website": "http://www.intersport.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ6QFLp-AKSxMRLpfkwN6EBvM",
    "vendors": "intersport",
    "name": "Intersport Metkovi? 1",
    "city": "Metkovi?",
    "website": "http://www.intersport.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJJzO-UxEQW0cRKmuB91fKZy0",
    "vendors": "intersport",
    "name": "INTERSPORT NOVI SAD 1",
    "city": "Novi Sad",
    "website": "http://www.intersport.rs/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJA8IzMQIRW0cRBqeNJwoaG5Q",
    "vendors": "intersport",
    "name": "INTERSPORT NOVI SAD 2",
    "city": "Novi Sad",
    "website": "http://www.intersport.rs/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJCfI_lU3mXEcReQaO7orUd68",
    "vendors": "intersport",
    "name": "Intersport Osijek 1",
    "city": "Osijek",
    "website": "http://www.intersport.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJSV5Xq0HrTRMR88gBk28NWZU",
    "vendors": "intersport",
    "name": "Intersport Podgorica",
    "city": "Podgorica",
    "website": "http://www.intersport.rs/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJW2PZ7caEXUcRTb4EDNggNQc",
    "vendors": "intersport",
    "name": "Intersport Pozega 1",
    "city": "Požega",
    "website": "http://www.intersport.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ38mlsyNeNRMRReW9gtFkX18",
    "vendors": "intersport",
    "name": "Intersport Prima Split 2",
    "city": "Split",
    "website": "http://www.intersport.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ24JZfMjSfEcRn1whUTq42aA",
    "vendors": "intersport",
    "name": "Intersport Pula 1",
    "city": "Pula",
    "website": "http://www.intersport.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJoRUg7bWmZEcRMWpb1i1UQAs",
    "vendors": "intersport",
    "name": "Intersport Rijeka 2",
    "city": "Rijeka",
    "website": "http://www.intersport.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJl3jITajAfEcRKOil8bN56zM",
    "vendors": "intersport",
    "name": "Intersport Rovinj 1",
    "city": "Rovinj",
    "website": "http://www.intersport.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ07lejohlWkcR3VXTFW6YwqA",
    "vendors": "intersport",
    "name": "INTERSPORT S TRGOVINA",
    "city": "Beograd",
    "website": "http://www.intersport.rs/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJB2DHe1CWfEcRGxYaEJucR9c",
    "vendors": "intersport",
    "name": "Intersport Sport Hall",
    "city": "Pore?",
    "website": "http://www.intersport.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJh9FMxp8-ZEcR9iMNKjYnyCY",
    "vendors": "intersport",
    "name": "Intersport Supernova Karlovac 2",
    "city": "Karlovac",
    "website": "http://www.intersport.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJRWTSmu9wWkcRcNNWW6j0b9Q",
    "vendors": "intersport",
    "name": "Intersport TC Stadion",
    "city": "Beograd",
    "website": "http://www.intersport.rs/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJs4D1VmQTThMR2Edvi-TqDkI",
    "vendors": "intersport",
    "name": "INTERSPORT Ulcinj",
    "city": "Ulcinj",
    "website": "http://www.intersport.me/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJV4jeKuKKXEcRqkGx3ZrxZlI",
    "vendors": "intersport",
    "name": "Intersport Vinkovci 1",
    "city": "Vinkovci",
    "website": "http://www.intersport.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ-U3oQx0oNRMRljYuGMwMM7I",
    "vendors": "intersport",
    "name": "Intersport Vodice",
    "city": "Vodice",
    "website": "http://www.intersport.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJp2VAkoT6YUcRCbgq9YkfH9M",
    "vendors": "intersport",
    "name": "Intersport Zadar 1",
    "city": "Zadar",
    "website": "http://www.intersport.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJOxI-D_86TBMRvD0Kw-R3LeI",
    "vendors": "intersport",
    "name": "INTERSPORT Zelenika",
    "city": "Herceg - Novi",
    "website": "http://www.intersport.me/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJLcWVn6nnXEcRFRuei-mxpNA",
    "vendors": "jakovcevic",
    "name": "bicycles JAKOV?EVI?",
    "city": "Osijek",
    "website": "http://www.jakovcevic.hr/",
    "fb_link": "",
    "bike_brands": "Capriolo, Mayo, Liberty, Kellys",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJVcREcKHIREcRvmaQu_o6kMg",
    "vendors": "jankovic",
    "name": "Jankovi?-Comp Ada",
    "city": "Ada",
    "website": "http://shop.jankovic-comp.rs/",
    "fb_link": "https://www.facebook.com/jankovic.comp",
    "bike_brands": "Kross, KTM, Focus, Kettler, Prophete",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "Schwalbe, Abus, Busch & Müller, Topeak, SQ-lab, Ciclosport, BBB"
  },
  {
    "id": "ChIJa2SW0h_GREcRSWqgg87Jz-o",
    "vendors": "jankovic",
    "name": "Jankovic Comp",
    "city": "Ada",
    "website": "http://www.jankovic-comp.rs/",
    "fb_link": "https://www.facebook.com/jankovic.comp",
    "bike_brands": "Kross, KTM, Focus, Kettler, Prophete",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "Schwalbe, Abus, Busch & Müller, Topeak, SQ-lab, Ciclosport, BBB"
  },
  {
    "id": "ChIJ6bgVi6LnREcR18Ei4hdXeUc",
    "vendors": "jankovic",
    "name": "Tusta",
    "city": "Mokrin",
    "website": "",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ-8UzzgcDXkcRlLjUfQcjbFQ",
    "vendors": "josobicikli",
    "name": "Jošo Bicikli",
    "city": "Banja Luka",
    "website": "",
    "fb_link": "https://www.facebook.com/sportshopjoso/",
    "bike_brands": "SCOTT,CANONDALE,ELECTRA,POLAR",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJyUj11d3WZUcRXY04C5dJJQI",
    "vendors": "keindlsport",
    "name": "Keindl Sport",
    "city": "Zagreb",
    "website": "http://www.keindl-sport.hr/",
    "fb_link": "https://www.facebook.com/keindlsport/",
    "bike_brands": "Cube, Jumpertrek, Orbea, Look, Ridley, Atala, Cinzia, Brompton, Tern",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "dvije prodavnice u ZG, Vitezićeva 1a i Reljkovićeva 2, a centrala i web prodaja Web prodaja Rudeška cesta 14, u opremi mozda ima marki i opreme za skijanje",
    "eq_brands": "4ZA, Abus, Ahead, Alligator, Answer, Arnette,  Avid, Battaglin, Bellelli, Beto, Bicycle line, Big Wipes, Birzman, Bollé, Bosch, Briko, Buff, BYTE, Cairn, Camelbak, Campagnolo, Castelli, Chain, Chiba, Cinelli,  Citadel, cnSPOKE, Connex, Crono, Crud, CST,  Cyclo, Defeet, Demon, Deuter, Dieffe, DT Swiss, Dynamic, Effetto, Mariposa, ELITE, EthicSport, Extend, Fabric, Falke, Fibrax, Fischer, FSA, Fulcrum, Gaerne, Garmin, Geax, Ghost, Gipiemme, Giyo, GoPro, Gore, GSG, Hayes, Hutchinson, Ideal, IXS, Jagwire, JOE`S,  KASK, Kawasaki, Keindl Sport, Kenda, KMC, Knog, Lake, Lizard Skins, Longus, M-wave, Manitou, Mavic, MB Wear, MBM, Miche, Michelin, Mighty, Mizuno, Moto One, MS, Neco, No Flats,No Tubes, Novatec, NRC, NRG, Oakley,  ORCA, Peruzzo, Point, Polar, Polisport, Prologo, Promax, Proviz, Puky, Quarq, Rema TIP-TOP, RFR,  RIE:SEL, ROCK SHOX, Rodi,  Roeckl, ROTO, Rudy Project, San Marco, Schwalbe, Selle Bassano, Selle Italia, SH+, Shimano, Sidi, Simpla, SIS, Sixs, SKF, sks, Solestar, Sonax,  Spanninga, Squeezy, Sram, Stand, Strider, Sugoi, Sunrims, Suomy, SWISSSTOP, Tacx, Tektro, Thule, Topeak, Trail Gator, Tranz X, Truvativ, TSG, Tufo, Tune, Var, Velo, Velomann, Ventura, Vision, Vittoria, Vredestein, WD-40, Weldtite, WTB, Zefal, Zefiro, ZIPP, ZOOM, ZZYZX"
  },
  {
    "id": "ChIJ9arYj_ysaEcRRt4zW2CZNPc",
    "vendors": "kosporthr",
    "name": "KOSPORT bike shop & servis",
    "city": "Strahoninec",
    "website": "http://kosport.com.hr/",
    "fb_link": "https://www.facebook.com/kosport.com.hr",
    "bike_brands": "Cinzia, Cube, GT, Orbea, Specialized",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "Cinzia, Crankbrothers, Cube, Elite, Orbea, Specialized, Topeak"
  },
  {
    "id": "ChIJ26OdxFMzZ0cRwQFINbqgMUA",
    "vendors": "ldbikeprijedor",
    "name": "LD Bike",
    "city": "Prijedor",
    "website": "",
    "fb_link": "https://www.facebook.com/LD-BIKE-351160814996780/",
    "bike_brands": "",
    "prodaja": "",
    "servis": "",
    "rent": "",
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJzW0tDTzTfEcRQVKwmDAC-Cg",
    "vendors": "malupesport",
    "name": "MALUPE",
    "city": "Pula",
    "website": "http://www.malupesport.hr/",
    "fb_link": "https://www.facebook.com/pg/MalupeSportPula/about/?ref=page_internal",
    "bike_brands": "Ghost, Trek, Cube, Scott",
    "prodaja": 1,
    "servis": 1,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJxTvV6nEQW0cR126DQ_h7DkI",
    "vendors": "markonisport",
    "name": "Markoni Sport",
    "city": "Novi Sad",
    "website": "http://www.markonisport.rs/",
    "fb_link": "https://www.facebook.com/Markonisport",
    "bike_brands": "Markoni Bike, Giant, Drag",
    "prodaja": 1,
    "servis": 1,
    "rent": 1,
    "note": "",
    "eq_brands": "SUPER-B, M-WAVE, SELLE SMP, Briko, htp design, Simpla, Master Lock, Marwi, Wowow, Blizzard"
  },
  {
    "id": "ChIJgeba3qrXZUcRiofpy_vsjvY",
    "vendors": "markoprojekt",
    "name": "MARKO - PROJECT Ltd.",
    "city": "Zagreb",
    "website": "https://markoprojekt.com/",
    "fb_link": "https://www.facebook.com/MarkoProjekt/",
    "bike_brands": "Wheeler, Norco, Jamis, Adriatica, Rocky Mountain",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "a usluzi zaljubljenicima labilne ravnoteže nudimo uslugu maloprodaje, veleprodaje i servisa na lokaciji Vlaška 81a, Zagreb i Stanka Vraza 8, Varaždin.",
    "eq_brands": "Acor, Adriatica,, Alligator, Azonic, Bottecchia, Da Bomb, DT Swiss, E-thirteen, Eastpower, Endura, Esperia, Giyo, Hope, Jagwire, Jamis, Joytech, Kenda, KMC, Legnano, Mach1, Master Lock, Michelin, Muc-Off, Neuzer, Norco, Novatec, O`Neal, Oyama, Promax, Race Face, Rocky Mountain, Royal, Schwalbe, Shimano, Sigma, SixSixOne, SRAM, Super-B, Velo, Wheeler, Yaban"
  },
  {
    "id": "ChIJ11DJvtmqaEcR6Hstk_P_BLo",
    "vendors": "matis",
    "name": "Bike box",
    "city": "Varaždin",
    "website": "http://www.matis.com.hr/",
    "fb_link": "https://www.facebook.com/bikeboxvz/",
    "bike_brands": "Cross, DHS, Felt, Gepida, Rog",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "Aqua Design, BBB, Cateye, Cross, Dag, Dagger, Dartmoor, Dhs, Dieffe, Dino, Dynamic, Felt, Gepida, Gumotex, Hiko Sport, Indiana Sup, Kenda, Kreativ, Masciaghi, Master Lock, OZEN, Palm Equipment, Pasarela, Point, PRIJON, Rog, Rowery Embassy, RTM, RTM, TNF, TNP, Typhoon, ULTRa"
  },
  {
    "id": "ChIJ-UwlvHRDSxMREgCl3k5TFv0",
    "vendors": "mbikeshop",
    "name": "M-Bike Shop Mostar",
    "city": "Mostar",
    "website": "http://www.m-bikeshop.com/",
    "fb_link": "http://m-bikeshop.com/",
    "bike_brands": "Cube, Scott, Cross, Polar, Alpina, Cinzia, Electra",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "Continental, Schwalbe, Look, Polisport, Shimano, Camelbak, Uvex, Rox-shox, Fulcrum, Sidi, IXS, Vittoria, Fox, Kenda, Zefal"
  },
  {
    "id": "ChIJF2cMBCvKWEcRpE5QHmzIJqM",
    "vendors": "mbikeshop",
    "name": "M-Bike Shop Sarajevo",
    "city": "Sarajevo",
    "website": "http://www.m-bikeshop.com/",
    "fb_link": "http://m-bikeshop.com/",
    "bike_brands": "Cube, Scott, Cross, Polar, Alpina, Cinzia, Electra",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "Continental, Schwalbe, Look, Polisport, Shimano, Camelbak, Uvex, Rox-shox, Fulcrum, Sidi, IXS, Vittoria, Fox, Kenda, Zefal"
  },
  {
    "id": "ChIJMQ0zAxqtXkcRWiwnkjn5n3k",
    "vendors": "mbikeshop",
    "name": "M-Bike Shop Tuzla",
    "city": "Tuzla",
    "website": "http://www.m-bikeshop.com/",
    "fb_link": "http://m-bikeshop.com/",
    "bike_brands": "Cube, Scott, Cross, Polar, Alpina, Cinzia, Electra",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "Continental, Schwalbe, Look, Polisport, Shimano, Camelbak, Uvex, Rox-shox, Fulcrum, Sidi, IXS, Vittoria, Fox, Kenda, Zefal"
  },
  {
    "id": "ChIJIVUZePNhQ0cRd3zyE9iHSbQ",
    "vendors": "megafavorit",
    "name": "Mega Favorit D.O.O.",
    "city": "Palić",
    "website": "http://www.megafavorit.com/",
    "fb_link": "https://www.facebook.com/biciklisubotica/",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": "Shimano, Wellgo, Velosteel, Kaiwei, Power, Campbell, Radius, Rabe, Rush, KMC, SR Suntour, Dotek, Prowheel, Kenli, Feimin, Kalloy, Kalin, Duro, Galaxy, AHT, Rubena, Mitas, Trayal, Sigma, Ventura, Jing Yi, Assess, Quando, Shunfeng, Tri Diamond, Olona, Thun, Rema Tip-Top, Selle montegrappa"
  },
  {
    "id": "ChIJ2Q_g3tsgV0cR3Ad0g2HsWs8",
    "vendors": "metalsr",
    "name": "Metal",
    "city": "Kragujevac",
    "website": "http://metal-kg.rs/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": "",
    "servis": "",
    "rent": "",
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJYxomQS0uX0cRvnmvhSiT3kM",
    "vendors": "moccacommerce",
    "name": "Mocca Commerce",
    "city": "Visoko",
    "website": "http://moccacommerce.com/",
    "fb_link": "https://www.facebook.com/moccacommercedoo/",
    "bike_brands": "Centurion, Cannondale, Alpina, Scott",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": "Adjoin, Baradine, Cateye, Continental, CST, Feimin, Kenda, Polisport, Promax, Quando, Selle Royal, Shimano, Sunrace, Union, Uvex, VP components, Zefal, Camelbak, EBike, Elite, Giyo, Scott, Tonyon"
  },
  {
    "id": "ChIJ4cipJZajZEcR5a1LBDPp8rQ",
    "vendors": "morisbiciklihr",
    "name": "Moris bicikli",
    "city": "Dražice",
    "website": "",
    "fb_link": "",
    "bike_brands": "Fuji, Trek",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "prodaju autodijelove i pise samo U ponudi bicikli Fuji i Trek",
    "eq_brands": ""
  },
  {
    "id": "ChIJUz6c5mnRZUcRCrmaTqN49Uo",
    "vendors": "msbhr",
    "name": "MSB service",
    "city": "Zagreb",
    "website": "http://www.msb.hr/",
    "fb_link": "https://www.facebook.com/MSBbicikliiskije/?fref=ts",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "samo servis i dijelovi na stranici",
    "eq_brands": "Kenda, Shimano, Michelin, Rubena, Schwalbe, Promax, Marwi, RFR, SRAM"
  },
  {
    "id": "ChIJhbMQrpjPZUcRchyM-y0_dtA",
    "vendors": "mtbshopzapresic",
    "name": "mountain bike shop",
    "city": "Zapreši?",
    "website": "http://mtb-shop.hr/",
    "fb_link": "https://www.facebook.com/mtbshop.hr/?ref=hl",
    "bike_brands": "CAPRIOLO, FUJI, HAIbIkE, HAIBIKE, LEGONI, ROG JOMA, TREK, WINORA, WINORA E-BIKE",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "Fuji, Schwalbe, Continental, Shimano, XLC, Kenda, ROCK SHOX, Carrera, Selle Royal, Sellesmp, Novatec"
  },
  {
    "id": "ChIJL0Im9NrIWEcRUeOgMo6kGPc",
    "vendors": "nextbike",
    "name": "Nextbike",
    "city": "Sarajevo",
    "website": "http://www.nextbike.ba/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 0,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJJ_xVsdjIWEcRsK9oCGbvk_Q",
    "vendors": "nextbike",
    "name": "Nextbike",
    "city": "Sarajevo",
    "website": "http://www.nextbike.ba/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 0,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJIw3QkRfJWEcR7apfPy6ayj4",
    "vendors": "nextbike",
    "name": "Nextbike",
    "city": "Sarajevo",
    "website": "http://www.nextbike.ba/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 0,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJPU3euizKWEcRHGpmsppknTI",
    "vendors": "nextbike",
    "name": "Nextbike",
    "city": "DžemalaBijedića",
    "website": "http://www.nextbike.ba/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 0,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJvVoiznvJWEcRLMvdsdIyiOU",
    "vendors": "nextbike",
    "name": "Nextbike",
    "city": "Sarajevo",
    "website": "http://www.nextbike.ba/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 0,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ6QSb_gytXkcRV4nmrzoJMNc",
    "vendors": "nextbike",
    "name": "Nextbike",
    "city": "Tuzla",
    "website": "http://www.nextbike.ba/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 0,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJaVSu69FSWUcRofd4vulrAnc",
    "vendors": "nextbike",
    "name": "Nextbike",
    "city": "Tuzla",
    "website": "http://www.nextbike.ba/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 0,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ0zUcJfjWZUcRqjHUiGwWHwE",
    "vendors": "nextbike",
    "name": "Nextbike",
    "city": "Zagreb",
    "website": "http://nextbike.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 0,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJl6s_4-PWZUcRYy9kpUqHakU",
    "vendors": "nextbike",
    "name": "NextBike STATION",
    "city": "Zagreb",
    "website": "http://nextbike.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 0,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJr0kVAbpgZkcRDFZHORv8KYo",
    "vendors": "nextbike",
    "name": "Nextbike Naftalan",
    "city": "Ivanić Grad",
    "website": "http://nextbike.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 0,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJHe9VAxqTY0cR2gKkffi2h28",
    "vendors": "nextbike",
    "name": "Brinje Nextbike",
    "city": "Brinje",
    "website": "http://www.visitbrinje.hr/biciklisticke-staze/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 0,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ3c0GJnDuShMRZfaZhiR44b4",
    "vendors": "nextbike",
    "name": "NextBike",
    "city": "Makarska",
    "website": "",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 0,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ40KTWqVgZkcRCRJn4HzJkG8",
    "vendors": "nextbike",
    "name": "Rent-a-bicycle",
    "city": "Ivanić Grad",
    "website": "http://www.nextbike.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 0,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ84jBhMsRW0cRZ9lR-KEhu_k",
    "vendors": "nikicnovisad",
    "name": "Bicikl Servis Nikic",
    "city": "Novi Sad",
    "website": "",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJj-fAQNRUb0cR8SPR7VQ8DpQ",
    "vendors": "panexdinamic",
    "name": "Panex Dinamic",
    "city": "Varaždin",
    "website": "http://web.dinamic.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": "",
    "servis": "",
    "rent": "",
    "note": "ovo je sada dinamic.hr",
    "eq_brands": ""
  },
  {
    "id": "ChIJG3v_mxytaEcRbyo8VThCnsQ",
    "vendors": "panexdinamic",
    "name": "Panex Dinamic",
    "city": "Čakovec",
    "website": "http://www.dinamic.hr/",
    "fb_link": "https://www.facebook.com/panex.dinamic",
    "bike_brands": "Rock Machine, Scott, Spring, WOB",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "ima jos trgovina i servisa: http://dinamic.hr/trgovine-servisi/   ZagrebČakovecKoprivnicaNedelišćeVaraždin 1Varaždin 2Virovitica",
    "eq_brands": "Shimano, VELO, Zoom, Remerx, Schwalbe, Mitas, Rubena, Promax, KMC, M-WAVE, CHAKY,  Scott, montegrappa, Trelock, Sigma, Syncros, Ventura, SAXONIA"
  },
  {
    "id": "ChIJJXrRJL2taEcRw1Cr3u0h0ck",
    "vendors": "panexdinamic",
    "name": "Panex Dinamic",
    "city": "Čakovec",
    "website": "http://web.dinamic.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "ovo je sada dinamic.hr",
    "eq_brands": ""
  },
  {
    "id": "ChIJ0fH-fgMnZkcRdeWIGPGphFs",
    "vendors": "panexdinamic",
    "name": "Panex Dinamic",
    "city": "Koprivnica",
    "website": "http://www.dinamic.hr/",
    "fb_link": "https://www.facebook.com/panex.dinamic",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ94Guo_TqZ0cRkPNDEEq8Z4s",
    "vendors": "panexdinamic",
    "name": "Panex Dinamic",
    "city": "Virovitica",
    "website": "http://www.dinamic.hr/",
    "fb_link": "https://www.facebook.com/panex.dinamic",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJo6wcOmd2WkcREBnFED7OTTo",
    "vendors": "paralexrs",
    "name": "Paralex",
    "city": "Leštane",
    "website": "http://paralex.rs/",
    "fb_link": "",
    "bike_brands": "CAPRIOLO, PLANETBIKE, VENERA",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "Ima jos jedna radnja: Bicikl Servis CentarBulevar Revolucije 20, preko puta tri tiganja11130 Kaluđerica",
    "eq_brands": ""
  },
  {
    "id": "ChIJWfzq3OZdNRMRipn61_SOxhY",
    "vendors": "pelotonhr",
    "name": "Peloton centar",
    "city": "Split",
    "website": "http://www.peloton.hr/",
    "fb_link": "https://www.facebook.com/BiciklistickiCentarPeloton",
    "bike_brands": "DEDACCIAI STRADA, Dema, FOCUS, Merida, Wilier,  Kalkhoff, Salsa, Rog",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "Pise da imaju radnju i u ZG: http://www.peloton.hr/hr/content/4-o-nama",
    "eq_brands": "MICHELIN, SCHWALBE, IMPAC,KENDA, GIANT, SELLE SAN MARCO, ORTLIEB, TUBUS, RACKTIME,MAVIC, GLORYFY, BRIKO, LONGUS, BASIL, HAMAX, VELO, RUBENA, ENDURA, FORCE, NOVATEC, REMERX, MAVIC, LIMAR"
  },
  {
    "id": "ChIJGT6KwmLOfEcRjWgPGYG4SQE",
    "vendors": "perojhr",
    "name": "Bike Peroj",
    "city": "Peroj",
    "website": "http://www.bike-peroj.hr/",
    "fb_link": "https://www.facebook.com/BIKEPEROj",
    "bike_brands": "Cube, Giant, Ghost, Scott",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "Maxxis, Schwalbe, Continental, Rubena, XLC, Shimano, SRAM, FSA, Neco, Alpina, Cratoni, Limar, Shimano, Hayes, Alligator, Promax, Fox, SR Suntour, Rock Shox, Manitou, RST"
  },
  {
    "id": "ChIJSZCbEuRvWkcRw8xL_w90uBk",
    "vendors": "piranabg",
    "name": "Cici Bike - Servis Pirana",
    "city": "Beograd",
    "website": "",
    "fb_link": "https://www.facebook.com/pirana.bike",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJE2clQux-WkcRgHabeu1229U",
    "vendors": "planetbike",
    "name": "Fanatic Sport",
    "city": "Pan?evo",
    "website": "",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ9xkbHeAgV0cRpCsywob438M",
    "vendors": "planetbike",
    "name": "Kole",
    "city": "Kragujevac",
    "website": "",
    "fb_link": "https://www.facebook.com/biciklisticka.radnjakole",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "brisati",
    "eq_brands": ""
  },
  {
    "id": "ChIJc5yMDhTJWEcRO8CjqDs9sHY",
    "vendors": "planetbike",
    "name": "Planet Bike",
    "city": "Sarajevo",
    "website": "http://www.planetbike.ba/",
    "fb_link": "https://www.facebook.com/PlanetBikeBIH",
    "bike_brands": "Scott, Cannondale, Electra, Polar, Alpina, Booster",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": "Shimano, Ritchey, Fizik, Continental, DT Swiss, Zefal, Cat Eye, Uvex, Scott, Northwave, Polisport, Elite"
  },
  {
    "id": "ChIJ6yPoeYpvWkcRkW8LhnUlT9E",
    "vendors": "planetbike",
    "name": "Planet Bike",
    "city": "Beograd",
    "website": "http://www.planetbike.rs/",
    "fb_link": "https://www.facebook.com/PlanetBikeBeograd",
    "bike_brands": "Scott, Cannondale, Electra, Polar, Alpina, Booster",
    "prodaja": 1,
    "servis": 1,
    "rent": 1,
    "note": "imaju jos radnji u NSadu, Nisu...  http://planetbike.rs/gde-kupiti/",
    "eq_brands": "Shimano, Ritchey, Fizik, Continental, DT Swiss, Zefal, Cat Eye, Uvex, Scott, Northwave, Polisport, Elite, Brooks, Herrmans, PRO, Syncros, Velo, Zoom, Promax, Baradine, Jagwire, KMC, SR Suntour, Wheel Top, Fox, Selle Bassano, Selle Montegrappa, Selle Royal, Deestone, DSI, Kenda, Ponely, Trelock"
  },
  {
    "id": "ChIJbdO0YHJlWkcRSM9zQMrkqrk",
    "vendors": "planetbike",
    "name": "Planet Bike",
    "city": "Belgrade",
    "website": "http://www.planetbike.rs/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJuwGER7V6WkcRC34SsBzlHrs",
    "vendors": "planetbike",
    "name": "Planet bike",
    "city": "Profibike priboj",
    "website": "",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJif-QpuhxWkcRucKHRqri7So",
    "vendors": "planetbike",
    "name": "Planet Bike",
    "city": "Grad Beograd",
    "website": "",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJeXJYw7CwVUcRx33AQFh9hso",
    "vendors": "planetbike",
    "name": "Planet Bike",
    "city": "Niš",
    "website": "http://planetbike.rs/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJy50DIEQQW0cRE-YgrCVVHD0",
    "vendors": "planetbike",
    "name": "Planet Bike",
    "city": "Novi Sad",
    "website": "http://www.planetbike.rs/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJfSop1UNyV0cRzfQALLq13TY",
    "vendors": "planetbike",
    "name": "Planet Bike",
    "city": "Čačak",
    "website": "http://www.planetbike.rs/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ6QL7SswgV0cR5UohG-Hj-WI",
    "vendors": "planetbike",
    "name": "Bike MV Sport",
    "city": "Kragujevac",
    "website": "http://www.bikemvsportkg.com/",
    "fb_link": "https://www.facebook.com/Biciklisticka-radnja-BikeMv-Sport-786677868097359/",
    "bike_brands": "Shimano, SRAM, Scott",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJd3waPPsAV0cR1A-gDZmyTxM",
    "vendors": "planetbike",
    "name": "Masterbike",
    "city": "Raški okrug",
    "website": "",
    "fb_link": "https://www.facebook.com/masterbike.kraljevo",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJiSzP_NMiVUcRls6wfqiXkpA",
    "vendors": "planetbike",
    "name": "Bike Igic",
    "city": "Pirotski county",
    "website": "",
    "fb_link": "https://www.facebook.com/groups/103414606361856/",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJoQVPgH1oVkcR05t8Gzjd1-c",
    "vendors": "planetbike",
    "name": "Tip-Top",
    "city": "Aleksandrovac",
    "website": "",
    "fb_link": "https://www.facebook.com/Tip-Top-162959377570384/",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJCeTbjUiVU0cRWGA3ELpAaTc",
    "vendors": "planetbike",
    "name": "T Bike",
    "city": "Неготин",
    "website": "http://www.panoramio.com/photo/37560279",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": "",
    "servis": "",
    "rent": "",
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ_YYoy3gXWEcR2G0OAzwR9bc",
    "vendors": "planetbike",
    "name": "Profibike",
    "city": "Прибој",
    "website": "",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJc3hkY9qkW0cRXt9h1B2puv0",
    "vendors": "planetbike",
    "name": "BICIKL CENTAR RADULOVIC",
    "city": "Sremska Mitrovica",
    "website": "",
    "fb_link": "https://www.facebook.com/groups/biciklcentar/",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJj0ASXLBYVkcRq8LENuixDDc",
    "vendors": "planetbike",
    "name": "SZTR PROFY BIKE",
    "city": "Kraljevo",
    "website": "",
    "fb_link": "https://www.facebook.com/SztrProfyBike/",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJmS2ccm3bWkcRERBtjEgYeHg",
    "vendors": "planetbike",
    "name": "Polar Bike",
    "city": "Srednje-banatski county",
    "website": "",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ3VyiKx-DV0cRQnDr4Fleeec",
    "vendors": "planetbike",
    "name": "Profi Bike",
    "city": "Arilje",
    "website": "",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJg5EbZdneREcRdQAS-ZM0J0M",
    "vendors": "planetbike",
    "name": "Sebastian",
    "city": "Kikinda",
    "website": "",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ69eQIOEgV0cRjQHoGmNzeSU",
    "vendors": "planetbike",
    "name": "Kole",
    "city": "Kragujevac",
    "website": "",
    "fb_link": "https://www.facebook.com/biciklisticka.radnjakole",
    "bike_brands": "Cross, Capriolo, Scout, Visitor, Explorer",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJQWrNeAcSW0cRcJfuDkhs160",
    "vendors": "planetbike",
    "name": "Bicikl-Centar Blesa",
    "city": "Juzno-backi county",
    "website": "",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJmePIozCDV0cRes04ZueO9l4",
    "vendors": "planetbike, capriolo",
    "name": "Lukovic",
    "city": "Zlatiborski okrug",
    "website": "",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJHUMGKVmJVkcR2nOq-8By8-M",
    "vendors": "planetbike, capriolo",
    "name": "Bicikl",
    "city": "Rasinski county",
    "website": "",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJzw_9yI61XEcRf0puGkMV534",
    "vendors": "planetbike, capriolo",
    "name": "Meksiko",
    "city": "Sombor",
    "website": "http://www.meksiko.co.rs/",
    "fb_link": "https://www.facebook.com/meksiko.bicikli/",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJBYNSJUXTWUcR8R7850HRXyA",
    "vendors": "planetbike, capriolo",
    "name": "Milivoja-Bike",
    "city": "Užice",
    "website": "http://www.milivoja-bike.com/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ110iECnfREcR8o09kd50Er0",
    "vendors": "planetbike, capriolo",
    "name": "Apollo Bike",
    "city": "Kikinda",
    "website": "http://apollobike.rs/",
    "fb_link": "https://www.facebook.com/Apollo-Bike-254980714585097/",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJly-kmSUQW0cRAaNJ7VNtVbs",
    "vendors": "planetbike, capriolo",
    "name": "Invicta Bikeshop",
    "city": "Novi Sad",
    "website": "http://invictabike.rs/",
    "fb_link": "https://www.facebook.com/invictabike",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJT1aS16F6WkcRrSQOpjY6RnE",
    "vendors": "probikebeograd",
    "name": "Pro Bike",
    "city": "Beograd",
    "website": "http://www.probike.rs/",
    "fb_link": "https://www.facebook.com/probikebeograd",
    "bike_brands": "GT, Cross, Polar, Scout, Trek, Ultra, Visitor, Alpina, Capriolo",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "ABUS, Avid, AXA, Bassano, BBB, Bellelli, Bike Hand, Cateye, Continental, Cross, CST, Cyclo Tools, Cyclone,  DT Swiss, Elite, Endura, Ergon, Garmin,  Giyo,  Jagwire, KENDA, KMC, Limar, Mavic, Merida, Michelin, NORTHWAVE, Polisport, PRO, PROMAX, Ritchey, Rock Shox, Schwalbe, Selle royal, Shimano, Sigma, SKS, Specialized, SRAM, SR Suntour,  Topeak, Uvex, Velo, VP Components, Zefal, Zoom"
  },
  {
    "id": "ChIJTdp2vozhXkcRIysmmmQhUak",
    "vendors": "probikezenica",
    "name": "PRO-BIKE Zenica",
    "city": "Zenica",
    "website": "",
    "fb_link": "https://www.facebook.com/probikezenica/",
    "bike_brands": "",
    "prodaja": "",
    "servis": "",
    "rent": "",
    "note": "PRESKOCI",
    "eq_brands": ""
  },
  {
    "id": "ChIJ8WDuN_gAV0cRoY2QSIOGTXg",
    "vendors": "promosportrs",
    "name": "Promo Sport",
    "city": "Kraljevo",
    "website": "",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": "",
    "servis": "",
    "rent": "",
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJaf7M3PgRW0cRNKf4OT9bKgo",
    "vendors": "prosportrs",
    "name": "PRO SPORT",
    "city": "Veternik",
    "website": "http://www.prosport.rs/",
    "fb_link": "",
    "bike_brands": "Capriolo, Scout, Adria, Explorer",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJfa5wBxrnXEcRW_ozFZsqUGE",
    "vendors": "proteasport",
    "name": "Protea-Sport",
    "city": "Osijek",
    "website": "http://proteasport.com/",
    "fb_link": "https://www.facebook.com/ProteaSport/",
    "bike_brands": "GT, Kross, Specialized",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "ima u Zagrebu, Rijeci i Osijeku: https://www.proteasport.hr/kontakt",
    "eq_brands": "Kross, SHIMANO, Rubena, Specialized,  TOPEAK,  CRANK,  SUUNTO, DARSON,  ABUS, CamelBak, OSPREY"
  },
  {
    "id": "ChIJ-71I5U3WZUcRrY7M5LBRfgQ",
    "vendors": "proteasport",
    "name": "Protea-Sport - Specialized concept store",
    "city": "Zagreb",
    "website": "http://www.proteajaska.com/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": "",
    "servis": "",
    "rent": "",
    "note": "ovo je ova ista kao prethodna samo u ZG i promijenjena je web stranica",
    "eq_brands": ""
  },
  {
    "id": "ChIJhaYoqQ9eNRMRnUiBSpNwb_w",
    "vendors": "rentabike1",
    "name": "RENT a BIKE in SPLIT Croatia : split.bike",
    "city": "Split",
    "website": "http://rent-fun-bike-split.com/en/home/",
    "fb_link": "https://www.facebook.com/rent.bike.split/",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 0,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ_TUNDL18Y0cRI-r2AaI-vTs",
    "vendors": "rentabike10",
    "name": "RENT A BIKE",
    "city": "Dramalj",
    "website": "http://bikepointcrikvenica.com/",
    "fb_link": "https://www.facebook.com/bikepointcrikvenica/",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 0,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJx_LraJHAfEcRbRVBwAofHPc",
    "vendors": "rentabike11",
    "name": "Rent A Bike RM",
    "city": "Rovinj",
    "website": "http://www.rmgroup.hr/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 0,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJyVWtXDYsY0cRzePznvrr3u8",
    "vendors": "rentabike12",
    "name": "Bike rentals PULA",
    "city": "Ližnjan",
    "website": "http://www.rentabikepula.com/en/index.php",
    "fb_link": "https://www.facebook.com/brb.sport",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 0,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJe720Swb1YUcRXLrZW3dyNXs",
    "vendors": "rentabike13",
    "name": "rent a bike Zaton",
    "city": "Nin",
    "website": "https://rentabikenin.wixsite.com/zadar",
    "fb_link": "https://www.facebook.com/rentabikenin/",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 0,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJEc6hfRsiYkcRLJr68FBR9KI",
    "vendors": "rentabike14",
    "name": "Rent A Bike Tomic",
    "city": "Vir",
    "website": "https://www.facebook.com/rentabikevir/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 0,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJCxFnRsYCYkcR1sQY_qHw9Cs",
    "vendors": "rentabike15",
    "name": "Rent a bike GAMA",
    "city": "Ugljan",
    "website": "",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 0,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJFQPEhVlnNRMR5NtRfsRdjLw",
    "vendors": "rentabike16",
    "name": "Rent a bike Souvenir Shop Zana",
    "city": "Split",
    "website": "",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 0,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ6dqp7TaYShMR4oN4i5c7VVg",
    "vendors": "rentabike17",
    "name": "Rent A Bike Bubu",
    "city": "Omiš",
    "website": "https://www.facebook.com/RentaScooterBikeOmis/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 0,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ4cKalp6AShMRp4vkjeBL8UU",
    "vendors": "rentabike18",
    "name": "Rent a Bike & Scooter `PARK` Stari Grad Otok Hvar",
    "city": "Stari Grad",
    "website": "",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 0,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ8SXfA5TAfEcRZUhoTlelAIc",
    "vendors": "rentabike2",
    "name": "Rent A Bike",
    "city": "Rovinj",
    "website": "http://www.rovinj-rent-scooter-bike.com/",
    "fb_link": "https://www.facebook.com/rent.rovinj.lucky",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 0,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJqQkoPwb1YUcRgC8wVtugbGQ",
    "vendors": "rentabike3",
    "name": "rent a bike Nin",
    "city": "Nin",
    "website": "https://rentabikenin.wixsite.com/zadar",
    "fb_link": "https://www.facebook.com/rentabikenin",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 0,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJhU3F9tiqaEcRRjU6W8TC-HA",
    "vendors": "rentabike4",
    "name": "Rent a bike",
    "city": "Varaždin",
    "website": "",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 0,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ19DTZJYrY0cRsKKn1aMYJ2w",
    "vendors": "rentabike5",
    "name": "RENT - A - BIKE",
    "city": "Premantura",
    "website": "",
    "fb_link": "https://www.facebook.com/RENT-A-BIKE-Premantura-917457535047303",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 0,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJY3E1FbkrY0cReJCkej5x6Mk",
    "vendors": "rentabike6",
    "name": "RENT A BIKE - Bike Spot Kamenjak",
    "city": "Premantura",
    "website": "http://www.bikespot.com.hr/",
    "fb_link": "https://www.facebook.com/bikespotistra",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 0,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJEXt8_VhvY0cRRpQynrYuy0M",
    "vendors": "rentabike7",
    "name": "Rent a Bike Malinska",
    "city": "Malinska",
    "website": "",
    "fb_link": "https://www.facebook.com/MalinskaBikeRental",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 0,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJd2GFELV8Y0cRxOfxgq7EsKs",
    "vendors": "rentabike8",
    "name": "RENT A BIKE",
    "city": "Dramalj",
    "website": "http://bikepointcrikvenica.com/",
    "fb_link": "https://www.facebook.com/bikepointcrikvenica/",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 0,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJXRPjnwKhZEcR086rPGxMRMY",
    "vendors": "rentabike9",
    "name": "Rent a bike BRI",
    "city": "Rijeka",
    "website": "",
    "fb_link": "http://fb.me/bri.rental",
    "bike_brands": "",
    "prodaja": 0,
    "servis": 0,
    "rent": 1,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJW95viSihZEcRCLHv5a6lHG4",
    "vendors": "ribike",
    "name": "RI bike shop&service",
    "city": "Rijeka",
    "website": "http://www.ri-bike.hr/",
    "fb_link": "https://www.facebook.com/ri.bike.shop.and.service",
    "bike_brands": "Cube, Orbea, Ridley, Jumpertrek, Silverback, Cinzia, Atala, Look, Brompton, Tern",
    "prodaja": 1,
    "servis": 1,
    "rent": 1,
    "note": "imaju puno opreme i katastrofa web shop",
    "eq_brands": "Thule, Campagnolo, Velo, RFR, Shimano, SRAM, Look,  Zipp, Fulcrum, Selle Italia, Cube, Rock shox,  Cinelli,  San Marco, Prologo, Regale, Neos, Kenda, Michelin, Schwalbe, Topeak"
  },
  {
    "id": "ChIJt1kTXxQQW0cR9zotYcgjQ2c",
    "vendors": "riscycling",
    "name": "Ris Cycling",
    "city": "Novi Sad",
    "website": "http://www.ris-cycling.com/",
    "fb_link": "https://www.facebook.com/RisCyclingBikeShop",
    "bike_brands": "ALPINA, CANNONDALE, CAPRIOLO, MERIDA, POLAR, SCOTT, SCOTT Custom",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "imaju dvije radnje u NSadu http://www.ris-cycling.com/kontakt/",
    "eq_brands": "ABUS, BELLELLI, BROOKS, CAMELBAK, CAPRIOLO, CAT EYE, COBRA, CONTINENTAL, CYCLEOPS, FAVORIT, FOX, GARMIN, GIYO, HERRMANS, HW, JOE`S, KNOG, KRYPTON, TOUR DE FRANCE, LIZARD SKINS, LUMA, MARIKO, MASTER LOCK, MENABO, MERIDA, PEPE, PRO, PROMAX, PSP, RITCHEY, RSP, SALEWA, SARIS, SCOTT, SELLE BASSANO, SELLE ROYAL, SHAMAN, SIGMA, SKS, SMART, SRAM, SYNCROS, TACX, THULE, TOPEAK, TRELOCK, VELO,  components, , WELDTITE, X-PLORER, XC LIGHTS, XLC, YUENI, ZEFAL, ZIPP, ZOOM, SR SUNTOUR, ROCK SHOX, AVID, DT SWISS, FORMULA, JAGWIRE, SHIMANO, XLC, KMC, YBN, CANNONDALE, TRUVATIV, UNO, PROWHEEL, EXUS, FEIMIN, LOOK, WELLGO, DSI, GEAX, KENDA, MICHELIN, MITAS, RUBENA, SCHWALBE, VITTORIA"
  },
  {
    "id": "ChIJ50m17-_WZUcRVshhQ_qpHWI",
    "vendors": "rogjoma",
    "name": "Rog Joma",
    "city": "Zagreb",
    "website": "http://www.rog-joma.hr/",
    "fb_link": "https://www.facebook.com/rog.joma",
    "bike_brands": "TREK, FUJI, ROG JOMA, BREEZER",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "u ZG imaju dvije radnje koje prodaju bicikle i opremu i jedna posebna samo za servis: https://www.rog-joma.hr/prodavaonice.php",
    "eq_brands": "KENDA, BONTRAGER, CONTINENTAL, TRAYAL, VEE RUBBER, SCHWALBE, CST, VEECO, MITAS, MARZOCCHI, BASIC, VENTURA, MIGHTY, ZOOM, M-WAVE, BNTD, BONTRAGER, TREK, BLACK LABEL, NECO, VP COMPONENTS, RST, CANE CREEK, WOODMAN, SPINNER,  UNIS, SHIMANO, SKS, BNTD, BONTRAGER, BLACK LABEL, SR SUNTOUR, FLINGER, NECO, ICON, FIZIK, BROOKS ENGLAND, SELLE ROYAL, VELO, HUGGY, THULE, ALLIGATOR, JAGWIRE, SACCON, TOUR DE FRANCE, KIDZAMO, SMART, TORCH, VELOMANN, ANLUN, KNOG, BONIN, MOON, CAMELION, TOPEAK, SAXONIA, LOOK, WELLGO, HTI, EXUSTAR, MKS, GIPIEMME, NRC, SRAM, MAGNUM, ONGUARD, KALI PROTECTIVES, BELLELLI, VDO CYCLING, PANASONIC, GARMIN, PROMAX, DT SWISS, KMC, AVID, ZOOM"
  },
  {
    "id": "ChIJr6WwFGX6YUcRlZx46qzq4lk",
    "vendors": "rogjoma",
    "name": "Rog Joma",
    "city": "Zadar",
    "website": "http://www.rog-joma.hr/",
    "fb_link": "https://www.facebook.com/rog.joma",
    "bike_brands": "TREK, FUJI, ROG JOMA, BREEZER",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "KENDA, BONTRAGER, CONTINENTAL, TRAYAL, VEE RUBBER, SCHWALBE, CST, VEECO, MITAS, MARZOCCHI, BASIC, VENTURA, MIGHTY, ZOOM, M-WAVE, BNTD, BONTRAGER, TREK, BLACK LABEL, NECO, VP COMPONENTS, RST, CANE CREEK, WOODMAN, SPINNER,  UNIS, SHIMANO, SKS, BNTD, BONTRAGER, BLACK LABEL, SR SUNTOUR, FLINGER, NECO, ICON, FIZIK, BROOKS ENGLAND, SELLE ROYAL, VELO, HUGGY, THULE, ALLIGATOR, JAGWIRE, SACCON, TOUR DE FRANCE, KIDZAMO, SMART, TORCH, VELOMANN, ANLUN, KNOG, BONIN, MOON, CAMELION, TOPEAK, SAXONIA, LOOK, WELLGO, HTI, EXUSTAR, MKS, GIPIEMME, NRC, SRAM, MAGNUM, ONGUARD, KALI PROTECTIVES, BELLELLI, VDO CYCLING, PANASONIC, GARMIN, PROMAX, DT SWISS, KMC, AVID, ZOOM"
  },
  {
    "id": "ChIJbyvPVPxdNRMR6D0FruK1plg",
    "vendors": "rogjoma",
    "name": "Rog Joma",
    "city": "Split",
    "website": "http://www.rog-joma.hr/",
    "fb_link": "https://www.facebook.com/rog.joma",
    "bike_brands": "TREK, FUJI, ROG JOMA, BREEZER",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": "KENDA, BONTRAGER, CONTINENTAL, TRAYAL, VEE RUBBER, SCHWALBE, CST, VEECO, MITAS, MARZOCCHI, BASIC, VENTURA, MIGHTY, ZOOM, M-WAVE, BNTD, BONTRAGER, TREK, BLACK LABEL, NECO, VP COMPONENTS, RST, CANE CREEK, WOODMAN, SPINNER,  UNIS, SHIMANO, SKS, BNTD, BONTRAGER, BLACK LABEL, SR SUNTOUR, FLINGER, NECO, ICON, FIZIK, BROOKS ENGLAND, SELLE ROYAL, VELO, HUGGY, THULE, ALLIGATOR, JAGWIRE, SACCON, TOUR DE FRANCE, KIDZAMO, SMART, TORCH, VELOMANN, ANLUN, KNOG, BONIN, MOON, CAMELION, TOPEAK, SAXONIA, LOOK, WELLGO, HTI, EXUSTAR, MKS, GIPIEMME, NRC, SRAM, MAGNUM, ONGUARD, KALI PROTECTIVES, BELLELLI, VDO CYCLING, PANASONIC, GARMIN, PROMAX, DT SWISS, KMC, AVID, ZOOM"
  },
  {
    "id": "ChIJl9Mlg8OqaEcRJywrXsaZOKc",
    "vendors": "rogjoma",
    "name": "Rog Joma",
    "city": "Varaždin",
    "website": "https://www.rog-joma.hr/",
    "fb_link": "https://www.facebook.com/rog.joma",
    "bike_brands": "TREK, FUJI, ROG JOMA, BREEZER",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "KENDA, BONTRAGER, CONTINENTAL, TRAYAL, VEE RUBBER, SCHWALBE, CST, VEECO, MITAS, MARZOCCHI, BASIC, VENTURA, MIGHTY, ZOOM, M-WAVE, BNTD, BONTRAGER, TREK, BLACK LABEL, NECO, VP COMPONENTS, RST, CANE CREEK, WOODMAN, SPINNER,  UNIS, SHIMANO, SKS, BNTD, BONTRAGER, BLACK LABEL, SR SUNTOUR, FLINGER, NECO, ICON, FIZIK, BROOKS ENGLAND, SELLE ROYAL, VELO, HUGGY, THULE, ALLIGATOR, JAGWIRE, SACCON, TOUR DE FRANCE, KIDZAMO, SMART, TORCH, VELOMANN, ANLUN, KNOG, BONIN, MOON, CAMELION, TOPEAK, SAXONIA, LOOK, WELLGO, HTI, EXUSTAR, MKS, GIPIEMME, NRC, SRAM, MAGNUM, ONGUARD, KALI PROTECTIVES, BELLELLI, VDO CYCLING, PANASONIC, GARMIN, PROMAX, DT SWISS, KMC, AVID, ZOOM"
  },
  {
    "id": "ChIJPXhP5deqaEcRJxjtWWF1iew",
    "vendors": "rogjoma",
    "name": "Rog Joma",
    "city": "Varaždin",
    "website": "http://www.rog-joma.hr/",
    "fb_link": "https://www.facebook.com/rog.joma",
    "bike_brands": "TREK, FUJI, ROG JOMA, BREEZER",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "KENDA, BONTRAGER, CONTINENTAL, TRAYAL, VEE RUBBER, SCHWALBE, CST, VEECO, MITAS, MARZOCCHI, BASIC, VENTURA, MIGHTY, ZOOM, M-WAVE, BNTD, BONTRAGER, TREK, BLACK LABEL, NECO, VP COMPONENTS, RST, CANE CREEK, WOODMAN, SPINNER,  UNIS, SHIMANO, SKS, BNTD, BONTRAGER, BLACK LABEL, SR SUNTOUR, FLINGER, NECO, ICON, FIZIK, BROOKS ENGLAND, SELLE ROYAL, VELO, HUGGY, THULE, ALLIGATOR, JAGWIRE, SACCON, TOUR DE FRANCE, KIDZAMO, SMART, TORCH, VELOMANN, ANLUN, KNOG, BONIN, MOON, CAMELION, TOPEAK, SAXONIA, LOOK, WELLGO, HTI, EXUSTAR, MKS, GIPIEMME, NRC, SRAM, MAGNUM, ONGUARD, KALI PROTECTIVES, BELLELLI, VDO CYCLING, PANASONIC, GARMIN, PROMAX, DT SWISS, KMC, AVID, ZOOM"
  },
  {
    "id": "",
    "vendors": "rogjoma",
    "name": "Rog Joma",
    "city": "Osijek",
    "website": "http://www.rog-joma.hr/",
    "fb_link": "https://www.facebook.com/rog.joma",
    "bike_brands": "TREK, FUJI, ROG JOMA, BREEZER",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "KENDA, BONTRAGER, CONTINENTAL, TRAYAL, VEE RUBBER, SCHWALBE, CST, VEECO, MITAS, MARZOCCHI, BASIC, VENTURA, MIGHTY, ZOOM, M-WAVE, BNTD, BONTRAGER, TREK, BLACK LABEL, NECO, VP COMPONENTS, RST, CANE CREEK, WOODMAN, SPINNER,  UNIS, SHIMANO, SKS, BNTD, BONTRAGER, BLACK LABEL, SR SUNTOUR, FLINGER, NECO, ICON, FIZIK, BROOKS ENGLAND, SELLE ROYAL, VELO, HUGGY, THULE, ALLIGATOR, JAGWIRE, SACCON, TOUR DE FRANCE, KIDZAMO, SMART, TORCH, VELOMANN, ANLUN, KNOG, BONIN, MOON, CAMELION, TOPEAK, SAXONIA, LOOK, WELLGO, HTI, EXUSTAR, MKS, GIPIEMME, NRC, SRAM, MAGNUM, ONGUARD, KALI PROTECTIVES, BELLELLI, VDO CYCLING, PANASONIC, GARMIN, PROMAX, DT SWISS, KMC, AVID, ZOOM"
  },
  {
    "id": "",
    "vendors": "rogjoma",
    "name": "Rog Joma",
    "city": "Virovitica",
    "website": "http://www.rog-joma.hr/",
    "fb_link": "https://www.facebook.com/rog.joma",
    "bike_brands": "TREK, FUJI, ROG JOMA, BREEZER",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "KENDA, BONTRAGER, CONTINENTAL, TRAYAL, VEE RUBBER, SCHWALBE, CST, VEECO, MITAS, MARZOCCHI, BASIC, VENTURA, MIGHTY, ZOOM, M-WAVE, BNTD, BONTRAGER, TREK, BLACK LABEL, NECO, VP COMPONENTS, RST, CANE CREEK, WOODMAN, SPINNER,  UNIS, SHIMANO, SKS, BNTD, BONTRAGER, BLACK LABEL, SR SUNTOUR, FLINGER, NECO, ICON, FIZIK, BROOKS ENGLAND, SELLE ROYAL, VELO, HUGGY, THULE, ALLIGATOR, JAGWIRE, SACCON, TOUR DE FRANCE, KIDZAMO, SMART, TORCH, VELOMANN, ANLUN, KNOG, BONIN, MOON, CAMELION, TOPEAK, SAXONIA, LOOK, WELLGO, HTI, EXUSTAR, MKS, GIPIEMME, NRC, SRAM, MAGNUM, ONGUARD, KALI PROTECTIVES, BELLELLI, VDO CYCLING, PANASONIC, GARMIN, PROMAX, DT SWISS, KMC, AVID, ZOOM"
  },
  {
    "id": "",
    "vendors": "rogjoma",
    "name": "Rog Joma",
    "city": "Koprivnica",
    "website": "http://www.rog-joma.hr/",
    "fb_link": "https://www.facebook.com/rog.joma",
    "bike_brands": "TREK, FUJI, ROG JOMA, BREEZER",
    "prodaja": 1,
    "servis": 0,
    "rent": 0,
    "note": "",
    "eq_brands": "KENDA, BONTRAGER, CONTINENTAL, TRAYAL, VEE RUBBER, SCHWALBE, CST, VEECO, MITAS, MARZOCCHI, BASIC, VENTURA, MIGHTY, ZOOM, M-WAVE, BNTD, BONTRAGER, TREK, BLACK LABEL, NECO, VP COMPONENTS, RST, CANE CREEK, WOODMAN, SPINNER,  UNIS, SHIMANO, SKS, BNTD, BONTRAGER, BLACK LABEL, SR SUNTOUR, FLINGER, NECO, ICON, FIZIK, BROOKS ENGLAND, SELLE ROYAL, VELO, HUGGY, THULE, ALLIGATOR, JAGWIRE, SACCON, TOUR DE FRANCE, KIDZAMO, SMART, TORCH, VELOMANN, ANLUN, KNOG, BONIN, MOON, CAMELION, TOPEAK, SAXONIA, LOOK, WELLGO, HTI, EXUSTAR, MKS, GIPIEMME, NRC, SRAM, MAGNUM, ONGUARD, KALI PROTECTIVES, BELLELLI, VDO CYCLING, PANASONIC, GARMIN, PROMAX, DT SWISS, KMC, AVID, ZOOM"
  },
  {
    "id": "ChIJ6zy-DN3qTRMRYXLLHTy10hI",
    "vendors": "rubicon",
    "name": "Rubicon",
    "city": "Podgorica",
    "website": "http://www.rubiconshop.me/",
    "fb_link": "https://www.facebook.com/rubicon.podgorica/?ref=br_rs",
    "bike_brands": "Cross, Ultra, Devron",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "Rubber, CST, Kenda, Selle montegrappa, Velo, Selle Royal, Topeak, AVID, Jagwire, Lizard Skins"
  },
  {
    "id": "ChIJwRaaVQ4DXkcRRTa-oZfEaYs",
    "vendors": "sokovicsport",
    "name": "Soković Sport",
    "city": "Banja Luka",
    "website": "https://www.sokovicsport.ba/",
    "fb_link": "https://www.facebook.com/sokovicsport.ba/",
    "bike_brands": "NAKITA, CUBE, POLAR, CROSS, ULTRA, STRIDA",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "ALPINA, ASHIMA, CAMELBAK, CATEYE, CINZIA, CONTINENTAL, CROSS, Crosser,  CST, CUBE, DALBELLO, DARE 2b, ELITE, FORCE, GBT, JAGWIRE, KENDA,KMC, MARWI,  POLISPORT, PROWHEEL, RFR, Rie:Sel, ROCES, ROSSIGNOL, SAN MARCO, SCOTT, SELLE montegrappa, SHIMANO, SIXTEAM,  SRAM,  SUNTOUR, SYNCROS,  UNION, UVEX, VELO, VITTORIA, WTB, XLC, ZEFAL, ULTRA"
  },
  {
    "id": "ChIJWdWB9cTXZUcR41Ra0Ve4E1Q",
    "vendors": "spinsport",
    "name": "SPIN SPORT",
    "city": "Zagreb",
    "website": "http://www.spinsport.hr/",
    "fb_link": "https://www.facebook.com/SpinSport.Zagreb/",
    "bike_brands": "Santa Cruz, Juliana",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ5-g5BYahZEcRiR3cXnb7KQw",
    "vendors": "sportbikerijeka",
    "name": "Sport Bike Bicikli Čavle Rijeka",
    "city": "Čavle",
    "website": "http://www.sportbike.hr/",
    "fb_link": "https://www.facebook.com/SportBikeCavle/",
    "bike_brands": "Scott, Haibike,  Torpado, Dema, Nakxus, Giant, Cincia, Orbea",
    "prodaja": 1,
    "servis": 1,
    "rent": 1,
    "note": "",
    "eq_brands": "Byte, Continental, CST, Duro, Geax, kenda, Maxxis, Michelin, Schwalbe, Vittoria, SRAM, Shimano, Hayes, Promax, Jagwire, Zoom, KMC, YBN, Acor, Mighty, XLC, VP Components, Ergotec, Giant, Cube, montegrappa, Selle Italia, Selle Royal, Velo, FSA, Da Bomb, Cannondale, Sigma, Giyo, Zefal, Thule"
  },
  {
    "id": "ChIJ783Jd8VvWkcRf8LzO9VD-Ns",
    "vendors": "sportofis",
    "name": "Sportofis",
    "city": "Beograd",
    "website": "http://www.sportofis.com/",
    "fb_link": "https://www.facebook.com/sportofis/",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "ne prodadju bicikla samo dijelove i opremu, i imaju servis",
    "eq_brands": "Force, Look, A-HEAD"
  },
  {
    "id": "",
    "vendors": "sportshopbanjaluka",
    "name": "SPORT-SHOP",
    "city": "Banja Luka",
    "website": "http://sportshopbl.net/",
    "fb_link": "https://www.facebook.com/sportshopshimano/",
    "bike_brands": "Scott, Cannondale, Alpina, Polar",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "Scott, Shimano, RITCHEY, SYNCROS, Northwave, Uvex"
  },
  {
    "id": "ChIJm9MYm-xwWkcRCUufTRVdCYA",
    "vendors": "sunnyrs",
    "name": "Sunny Bike&Ski",
    "city": "Beograd",
    "website": "http://www.sunny.rs/",
    "fb_link": "https://www.facebook.com/SunnyBike/",
    "bike_brands": "Alpina, Polar, Booster",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "Shimano, Cateye, Zefal, Elite, Kenda"
  },
  {
    "id": "ChIJHWDk2Qu_REcRCTi4ww8EvCc",
    "vendors": "tehnoguma",
    "name": "Tehnoguma-Promet",
    "city": "Severno-banatski county",
    "website": "",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": "",
    "servis": "",
    "rent": "",
    "note": "BRISATI",
    "eq_brands": ""
  },
  {
    "id": "ChIJecfxpiDrTRMRAmJBEDniUSs",
    "vendors": "tempocg",
    "name": "Tempo",
    "city": "Podgorica",
    "website": "http://www.tempo.co.me/",
    "fb_link": "https://www.facebook.com/tempocitykvart/",
    "bike_brands": "Fast, Booster, Alpina,Polar, Scott, Cinzia, Jumpertrek",
    "prodaja": 1,
    "servis": 1,
    "rent": 1,
    "note": "",
    "eq_brands": "Alpina, Bellelli, CatEye, Cinzia, Continental, DT Swiss, Electra, Elite,  Hao Tu, Jagwire,  Kenda, Menabo, Polar, Polisport, Prowheel, Schwalbe, Scott, Selle Montegrappa, Selle Royal, Syncros, Zefal"
  },
  {
    "id": "ChIJhbHXsK7nXEcRHj1VojxPdJM",
    "vendors": "tomoshr",
    "name": "Tom.Os",
    "city": "Osijek",
    "website": "http://www.tomos.hr/",
    "fb_link": "https://www.facebook.com/TomOSijek/",
    "bike_brands": "Felt, Cruiser, Pasarela, Capriolo, Jasmin, Balaton",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJu62wQs9mQ0cRZKl7heejlOQ",
    "vendors": "totalbike",
    "name": "TotalBike.rs",
    "city": "Subotica",
    "website": "http://www.totalbike.rs/",
    "fb_link": "https://www.facebook.com/pg/totalbike/about/?ref=page_internal",
    "bike_brands": "Capriolo, Adria, Cube, Merida",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": "Shimano, CN, Truvativ, KryptonX, Sram, Wellgo, Feimin, VP Components, KMC, Velosteel, Mavic, Novatec, Mitas, Rubena, Michelin, Wanda Tyre, Zipp, Slime, Power, Tour de France, Avid, Promax, Logan, Tektro, Capriolo, DDK, Selle montegrappa, Selle Royal, SR Suntour, Rock Shox, Logan, Prowell, Bonin, Bellelli,  Sigma, Garmin, ABAC"
  },
  {
    "id": "ChIJPYkcg23JWEcRlf92JQqlY4U",
    "vendors": "trekbikebhpromo",
    "name": "Trek Bike Center",
    "city": "Sarajevo",
    "website": "http://www.bicikla.ba/",
    "fb_link": "https://www.facebook.com/trekbikecentarsarajevo/",
    "bike_brands": "",
    "prodaja": "",
    "servis": "",
    "rent": "",
    "note": "PRESKOCI",
    "eq_brands": ""
  },
  {
    "id": "ChIJtTX69xTJWEcRFEPQfJdvMcI",
    "vendors": "unis",
    "name": "UNIS",
    "city": "Sarajevo",
    "website": "http://www.bicycles.unis.ba/",
    "fb_link": "https://www.facebook.com/Unis-bicikli-sarajevo-137347676433954/",
    "bike_brands": "",
    "prodaja": "",
    "servis": "",
    "rent": "",
    "note": "PRESKOCI",
    "eq_brands": ""
  },
  {
    "id": "ChIJsRBOVSMQW0cRoJzBhq0lpx4",
    "vendors": "vector",
    "name": "Vector",
    "city": "Novi Sad",
    "website": "http://www.vector-bikes.com/prodaja",
    "fb_link": "",
    "bike_brands": "Vector, Kellys, Capriolo, Cross",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJ6ctov04QW0cRkyWzMVpUHao",
    "vendors": "vector",
    "name": "Vector",
    "city": "Novi Sad",
    "website": "http://www.vector-bikes.com/prodaja",
    "fb_link": "",
    "bike_brands": "Vector, Kellys, Capriolo, Cross",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJZykqUaUUUEcRCtbRJ0jrXsg",
    "vendors": "zlatnitocak",
    "name": "Zlatni Tocak",
    "city": "Južno-banatski okrug",
    "website": "http://www.zlatnitocak.rs/",
    "fb_link": "https://www.facebook.com/Zlatni-Tocak-Bike-Fitnes-Shop-303475516354060/",
    "bike_brands": "Scott, Kettler, Polar, Alpina, Capriolo",
    "prodaja": 1,
    "servis": 1,
    "rent": 1,
    "note": "",
    "eq_brands": "Adjoin, Adria, Alpina, ARC, Avid, Baradine, Bellelli,  Bergamont, Body Sculpture, Booster, Camelbak,  Campagnolo,  Cannondale, Capriolo, Cateye, Cober, Continental,  Corratec, Cross, CST, Deuter, DSI, Dynamix, Elite, EyeLevel, fizik, Garmin, Giant, Giyo, GoPro, Grand Star, Gym Fit, Jagwire, Kenda, Kettler, LaPlaya, Tour de France,  Luma, Menabo, Merida, Michelin, Mitas, Rubena, Northwave, O-GNS, Polar, Polisport, Power, Profex, PROMAX, Prowell, Relax, Ring Sport,  Ritchey, Rock Shox, RST, Schwalbe, Scott, Scout, Selle Bassano, Selle Montegrappa, Selle Royal, Shimano,  Sigma, SKS, Sport 2000, Sram, SR Suntour, Syncros, TDF, Thema sport, Tour de France, Tranz X, Trelock, Truvativ, Uvex, VB-1, Velo, Venera, Weldtite, Yueni, Zefal, ZOOM, Mavic, Rithey, Schwalbe, Continental, Cateye, Sigma, Body Sculpture"
  },
  {
    "id": "ChIJEwS69mZ6WkcRxK2BoEp2AbA",
    "vendors": "na",
    "name": "Moj bicikl doo",
    "city": "Beograd",
    "website": "http://www.mojbicikl.rs/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "ovi sastavljaju gradska bicikla",
    "eq_brands": ""
  },
  {
    "id": "ChIJk1089gzvUEcRZw0qT8lofbc",
    "vendors": "na",
    "name": "Staco",
    "city": "Požarevac",
    "website": "http://www.staco.rs/",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJw31IhBx_V0cRG9up_5qzneY",
    "vendors": "na",
    "name": "Gojkovic",
    "city": "Zlatiborski county",
    "website": "",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJzbPc3-PKW0cRSp0Mjp02rQo",
    "vendors": "na",
    "name": "Tandem Kid",
    "city": "Šabac",
    "website": "",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  },
  {
    "id": "ChIJswPvCsY9W0cRNOlDtrvxFuA",
    "vendors": "na",
    "name": "Panter - Sport",
    "city": "Južno-bački okrug",
    "website": "",
    "fb_link": "",
    "bike_brands": "",
    "prodaja": 1,
    "servis": 1,
    "rent": 0,
    "note": "",
    "eq_brands": ""
  }
];

// console.log(allVendorsBrands);
populateBrandsVendors();
// console.log(allVendorsBrands);



function encrichPoints() {
  window.stores.features.forEach(store => {
    const point = allPoints.filter(p => {
      return p.id == store.properties.id;
    })[0];
    if (point) {
      store.properties.fbPage = point['fb_link'];
      store.properties.website = point.website;
      store.properties.bikeBrands = [];
      store.properties.eqBrands = [];
      const pointVendors = point.vendors.replace(' ','').split(',');
      store.properties.vendors = pointVendors;
      pointVendors.forEach(vendor => {
        if (allVendorsBrands[vendor]) {
          store.properties.bikeBrands = store.properties.bikeBrands.concat(allVendorsBrands[vendor].bikeBrands);
          store.properties.eqBrands = store.properties.eqBrands.concat(allVendorsBrands[vendor].eqBrands);
        }
      });
    }
  });
  console.log(window.stores);
}

function populateBrandsVendors() {
  allPoints.forEach((point) => {
    const bikeBrands = point['bike_brands'].split(',');
    const eqBrands = point['eq_brands'].split(',');
    const vendors = point.vendors.split(',');
    vendors.forEach((vendor) => {
      if (!allVendorsBrands[slugger(vendor)]) {
        allVendorsBrands[slugger(vendor)] = {};
        allVendorsBrands[slugger(vendor)].name = point.name;
        allVendorsBrands[slugger(vendor)].bikeBrands = [];
        allVendorsBrands[slugger(vendor)].eqBrands = [];
      }
      bikeBrands.forEach((bikeBrand) => {
        if (bikeBrand.length > 0) {
          if (allVendorsBrands[slugger(vendor)].bikeBrands.indexOf(bikeBrand.trim()) < 0) {
            allVendorsBrands[slugger(vendor)].bikeBrands.push(bikeBrand.trim());
          }
          if (!allBrandsStores[slugger(bikeBrand)] && point.id.length > 0) {
            allBrandsStores[slugger(bikeBrand)] = [point.id];
          } else {
            if (allBrandsStores[slugger(bikeBrand)].indexOf(point.id) < 0 && point.id.length > 0) {
              allBrandsStores[slugger(bikeBrand)].push(point.id);
            }
          }
        }
      });
      eqBrands.forEach((eqBrand) => {
        if (eqBrand.length > 0) {
          if (allVendorsBrands[slugger(vendor)].eqBrands.indexOf(eqBrand.trim()) < 0) {
            allVendorsBrands[slugger(vendor)].eqBrands.push(eqBrand.trim());
          }
          if (!allBrandsStores[slugger(eqBrand)] && point.id.length > 0) {
            allBrandsStores[slugger(eqBrand)] = [point.id];
          } else {
            if (allBrandsStores[slugger(eqBrand)].indexOf(point.id) < 0 && point.id.length > 0) {
              allBrandsStores[slugger(eqBrand)].push(point.id);
            }
          }
        }
      });
    });
  });
}

function slugger(input) {
  return input.trim().replace(/(?:||)/g, '').toLowerCase().replace('/', '_').replace('`', '').replace(' ', '_').replace('`', '').replace(' ', '_');
}