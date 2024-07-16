export const products = [
  {
    CC_CODE: "141",
    CC_NAME: "Schengen (Europe)",
  },
  {
    CC_CODE: "140",
    CC_NAME: "Budget",
  },

  {
    CC_CODE: "142",
    CC_NAME: "Global Basic",
  },
  {
    CC_CODE: "143",
    CC_NAME: "Global Plus",
  },
  {
    CC_CODE: "144",
    CC_NAME: "Global Extra",
  },
];

export const ProductOptions = products.map((product) => {
  return {
    label: product.CC_NAME,
    value: product.CC_CODE,
  };
});

const countriesOptions: any = {
  AF: "AFGHANISTAN",
  AX: "ALAND ISLANDS (FINLAND)",
  AL: "ALBANIA",
  DZ: "ALGERIA",
  AS: "AMERICAN SAMOA (USA)",

  AD: "ANDORRA",

  AO: "ANGOLA",

  AI: "ANGUILLA (UK)",

  ALL: "ANTARCTICA",

  AQ: "ANTARCTICA",

  AG: "ANTIGUA AND BARBUDA",

  AR: "ARGENTINA",

  AM: "ARMENIA",

  AW: "ARUBA",

  AU: "AUSTRALIA",

  AT: "AUSTRIA",

  AZ: "AZERBAIJAN",

  BS: "BAHAMAS",

  BH: "BAHRAIN",

  BD: "BANGLADESH",

  BB: "BARBADOS",

  BY: "BELARUS",

  BE: "BELGIUM",

  BZ: "BELIZE",

  BJ: "BENIN",

  BM: "BERMUDA (UK)",

  BT: "BHUTAN",

  BO: "BOLIVIA",

  BQ: "BONAIRE",

  BA: "BOSNIA",

  BW: "BOTSWANA",

  BV: "BOUVET ISLAND (NORWAY)",

  BR: "BRAZIL",

  IO: "BRITISH INDIAN OCEAN TERRITORY (UK)",

  BN: "BRUNEI",

  BG: "BULGARIA",

  BF: "BURKINA FASO",

  BI: "BURUNDI",

  KH: "CAMBODIA",

  CM: "CAMEROON",

  CA: "CANADA",

  CV: "CAPE VERDE",

  IC: "CARIBE",

  KY: "CAYMAN",

  CF: "CENTRAL AFRICAN REPUBLIC",

  TD: "CHAD",

  CL: "CHILE",

  CN: "CHINA",

  CX: "CHRISTMAS ISLAND (AUSTRALIA)",

  CC: "COCOS (KEELING) ISLANDS (AUSTRALIA)",

  Co: "COLOMBIA",

  KM: "COMOROS",

  CG: "CONGO",

  CD: "CONGO (THE DEMOCRATIC REPUBLIC)",

  CK: "COOK ISLANDS (NEW ZEALAND)",

  CR: "COSTA RICA",

  HR: "CROATIA",

  CU: "CUBA",

  CW: "CURAÇAO",

  CY: "CYPRUS",

  CZ: "CZECH REPUBLIC",

  DK: "DENMARK",

  DJ: "DJIBOUTI",

  DM: "DOMINICA (UK)",

  DO: "DOMINICAN REPUBLIC",

  EC: "ECUADOR",

  EG: "EGYPT",

  SV: "EL SALVADOR",

  GQ: "EQUATORIAL GUINEA",

  ERN: "ERITREA",

  ER: "ERITREA",

  EE: "ESTONIA",

  ET: "ETHIOPIA",

  FK: "FALKLAND ISLANDS (MALVINAS) (UK)",

  FO: "FAROE ISLANDS (DENMARK)",

  FJ: "FIJI",

  FI: "FINLAND",

  FR: "FRANCE",

  GF: "FRENCH GUIANA (FRANCE)",

  PF: "FRENCH POLYNESIA (FRANCE)",

  TF: "FRENCH SOUTHERN TERRITORIES (FRANCE)",

  GA: "GABON",

  GM: "GAMBIA",

  GE: "GEORGIA",

  DE: "GERMANY",

  GER: "GERMANY",

  GH: "GHANA",

  GI: "GIBRALTAR (UK)",

  GR: "GREECE",

  GL: "GREENLAND (DENMARK)",

  GD: "GRENADA",

  GP: "GUADELOUPE",

  GU: "GUAM (USA)",

  GT: "GUATEMALA",

  GG: "GUERNSEY (UK)",

  GW: "GUINEA-BISSAU",

  GY: "GUYANA",

  HT: "HAITI",

  HM: "HEARD ISLAND AND MCDONALD ISLANDS (AUSTRALIA)",

  VA: "HOLY SEE (VATICAN CITY STATE)",

  HN: "HONDURAS",

  HK: "HONG KONG",

  HU: "HUNGARY",

  IS: "ICELAND",

  IN: "INDIA",

  ID: "INDONESIA",

  "299": "IRAN",

  IQ: "IRAQ",

  IE: "IRELAND",

  IM: "ISLE OF MAN (UK)",

  IL: "ISRAEL",

  IT: "ITALY",

  CI: "IVORY COAST",

  JM: "JAMAICA",

  JP: "JAPAN",

  JE: "JERSEY (UK)",

  JO: "JORDAN",

  KZ: "KAZAKHSTAN",

  KE: "KENYA",

  KI: "KIRIBATI",

  KW: "KUWAIT",

  KG: "KYRGYZSTAN",

  LA: "LAO PDR",

  LV: "LATVIA",

  LB: "LEBANON",

  LS: "LESOTHO",

  LR: "LIBERIA",

  LY: "LIBYA",

  LI: "LIECHTENSTEIN",

  LT: "LITHUANIA",

  LU: "LUXEMBOURG",

  MO: "MACAO",

  MK: "MACEDONIA",

  MG: "MADAGASCAR",

  MW: "MALAWI",

  MY: "MALAYSIA",

  MV: "MALDIVES",

  ML: "MALI",

  MT: "MALTA",

  MH: "MARSHALL ISLANDS",

  MQ: "MARTINIQUE",

  MR: "MAURITANIA",

  MU: "MAURITIUS",

  YT: "MAYOTTE (FRANCE)",

  MX: "MEXICO",

  FM: "MICRONESIA",

  MD: "MOLDOVA",

  MC: "MONACO",

  MN: "MONGOLIA",

  ME: "MONTENEGRO",

  MS: "MONTSERRAT (UK)",

  MA: "MOROCCO",

  MZ: "MOZAMBIQUE",

  MLC: "MULTI-COUNTRY WITHIN COVERED ZONE",

  MM: "MYANMAR",

  NA: "NAMIBIA",

  NR: "NAURU",

  NP: "NEPAL",

  NL: "NETHERLANDS",

  AN: "NETHERLANDS ANTILLES",

  NC: "NEW CALEDONIA",

  NZ: "NEW ZEALAND",

  NI: "NICARAGUA",

  NE: "NIGER",

  NG: "NIGERIA",

  NU: "NIUE (NEW ZEALAND)",

  NF: "NORFOLK ISLAND (AUSTRALIA)",

  KP: "NORTH KOREA",

  MP: "NORTHERN",

  NO: "NORWAY",

  OM: "OMAN",

  PK: "PAKISTAN",

  PW: "PALAU",

  PS: "PALESTINIAN (OCCUPIED TERRITORY)",

  PA: "PANAMA",

  PG: "PAPUA NEW GUINEA",

  PY: "PARAGUAY",

  PE: "PERU",

  PH: "PHILIPPINES",

  PN: "PITCAIRN",

  PL: "POLAND",

  PT: "PORTUGAL",

  PR: "PUERTO RICO (USA)",

  QA: "QATAR",

  GN: "REPUBLIC OF GUINEA (CONAKRY)",

  RE: "REUNION",

  RO: "ROMANIA",

  RU: "RUSSIAN FEDERATION",

  RW: "RWANDA",

  BL: "SAINT BARTHÉLEMY (FRANCE)",

  SH: "SAINT HELENA, ASCENSION AND TRISTAN DA CUNHA (UK)",

  KN: "SAINT KITTS AND NEVIS",

  LC: "SAINT LUCIA",

  MF: "SAINT MARTIN (FRANCE)",

  PM: "SAINT PIERRE AND MIQUELON (FRANCE)",

  VC: "SAINT VINCENT AND THE GRENADINES",

  WS: "SAMOA",

  SM: "SAN MARINO",

  ST: "SAO TOME AND PRINCIPE",

  SA: "SAUDI ARABIA",

  SN: "SENEGAL",

  RS: "SERBIA",

  SC: "SEYCHELLES",

  SL: "SIERRA LEONE",

  SG: "SINGAPORE",

  SX: "SINT MAARTEN (NETHERLANDS)",

  SK: "SLOVAKIA",

  SI: "SLOVENIA",

  SB: "SOLOMON ISLANDS",

  SO: "SOMALIA",

  ZA: "SOUTH AFRICA",

  GS: "SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS (UK)",

  KR: "SOUTH KOREA",

  SS: "SOUTH SUDAN",

  ES: "SPAIN",

  LK: "SRI LANKA",

  SD: "SUDAN",

  SR: "SURINAME",

  SJ: "SVALBARD AND JAN MAYEN (NORWAY)",

  SZ: "SWAZILAND",

  SE: "SWEDEN",

  CH: "SWITZERLAND",

  "249": "SYRIA",

  TW: "TAIWAN (CHINA)",

  TJ: "TAJIKISTAN",

  TZ: "TANZANIA",

  TH: "THAILAND",

  TL: "TIMOR-LESTE",

  TG: "TOGO",

  TK: "TOKELAU (NEW ZEALAND)",

  TO: "TONGA",

  TT: "TRINIDAD AND TOBAGO",

  TN: "TUNISIA",

  TU: "TURKEY",

  TR: "TURKEY",

  TM: "TURKMENISTAN",

  TC: "TURKS AND CAICOS ISLANDS (UK)",

  TV: "TUVALU",

  UG: "UGANDA",

  UA: "UKRAINE",

  AE: "UNITED ARAB EMIRATES",

  GB: "UNITED KINGDOM (UK)",

  UK: "UNITED KINGDOM (UK)",

  US: "UNITED STATES",

  USA: "UNITED STATES (USA)",

  UM: "UNITED STATES MINOR OUTLYING ISLANDS (USA)",

  UY: "URUGUAY",

  UZ: "UZBEKISTAN",

  VU: "VANUATU",

  "5": "VENEZUELA",

  VN: "VIET NAM",

  VG: "VIRGIN ISLANDS (UK)",

  VI: "VIRGIN ISLANDS (USA)",

  WF: "WALLIS AND FUTUNA (FRANCE)",

  EH: "WESTERN",

  PAI: "WPAIS",

  YE: "YEMEN",

  COLU: "ZAMBIA",

  ZM: "ZAMBIA",

  ZW: "ZIMBABWE",
};

export const formattedCountries = Object.keys(countriesOptions).map(
  (countryCode) => {
    return {
      value: countryCode,
      label: countriesOptions[countryCode],
    };
  }
);
