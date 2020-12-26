<template>
  <v-stepper v-model="e13" vertical>

    <v-stepper-step step="1">
      General Information
      <small class="pt-1"> but it is also important for prediction </small>
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-card height="325x" class="py-2">
        <v-container>
          <v-row>
            <v-col cols="4">
              <v-select v-model="city" :items="cities" label="City" :rules="[rules.required]" class="mb-1"></v-select>
            </v-col>

            <v-col cols="4">
              <v-select v-model="company" label="Company" :items="companies" :rules="[rules.required]" class="mb-1"
                single-line></v-select>
            </v-col>

            <v-col cols="4">
              <v-select v-model="model" label="Model" :items="models[company]" :rules="[rules.required]" class="mb-1"
                single-line></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-text-field v-model="description" :counter="70" label="Description"></v-text-field>
            </v-col>
          </v-row>
        </v-container>

        <v-btn color="primary" :disabled="step1()" @click="nextStep()">
          Continue
        </v-btn>
      </v-card>
    </v-stepper-content>

    <v-stepper-step step="2">
      Characteristics of a car

      <small class="pt-1"> main features for prediction </small>
    </v-stepper-step>

    <v-stepper-content step="2">
      <v-card height="400px" class="py-2">

        <v-container>
          <v-row>
            <v-col cols="4">
              <v-text-field v-model="mileage" :min="0" label="Mileage" single-line type="number" suffix="km">
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field v-model="year" :min="1940" :max="2020" label="Year" :rules="[rules.required, rules.year]"
                class="mb-1" single-line type="number"></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field v-model="engine_volume" :min="0" :max="4" label="Engine Volume"
                :rules="[rules.required, rules.engine_volume]" class="mb-1" single-line type="number" step="0.01"
                suffix="litres"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4">
              <v-select v-model="gear" :items="gear_values" label="Gear" :rules="[rules.required]" class="mb-1">
              </v-select>
            </v-col>

            <v-col cols="4">
              <v-select v-model="transmission" :items="transmission_values" label="Transmission"
                :rules="[rules.required]" class="mb-1"></v-select>
            </v-col>

            <v-col cols="4">
              <v-select v-model="shell" :items="shell_values" label="Shell" :rules="[rules.required]" class="mb-1">
              </v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4">
              <v-select v-model="rudder" :items="rudder_values" label="Rudder" :rules="[rules.required]" class="mb-1">
              </v-select>
            </v-col>
            <v-col cols="4">
              <v-select v-model="custom_clear" :items="custom_clear_values" label="Cleared?" :rules="[rules.required]"
                class="mb-1"></v-select>
            </v-col>
            <v-col cols="4">
              <v-select v-model="type_engine" :items="type_engine_values" label="Engine Type" :rules="[rules.required]"
                class="mb-1"></v-select>
            </v-col>
          </v-row>
        </v-container>

        <v-btn color="primary" :disabled="step2()" @click="nextStep(), submit()">
          Predict Price
        </v-btn>

      </v-card>
    </v-stepper-content>

    <v-stepper-step step="3">
      Predicting...
      <small class="pt-1">waiting for the magic ;)</small>
    </v-stepper-step>

    <v-stepper-content step="3">
      <v-card v-if="price" class="mb-12 mh-1 grey lighten-4" height="200px">
        <v-container>
          <v-row>
            <v-col cols="12">
              <h1>Predicted Price</h1>
              <small> our algorithms has high accuracy, check the <a href="#">documentation</a> </small>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-text-field v-model="price" label="Price" :value="price" solo class="blue--text" readonly
                suffix="TENGE">
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <v-card v-else class="mb-12 mh-1 grey lighten-4" height="200px">
        <v-container>
          <v-row>
            <v-col cols="12" class="d-flex flex-column align-center justify-center">
              <h3>Predicting</h3>
              <v-progress-circular class="mt-10" indeterminate color="primary"></v-progress-circular>
            </v-col>
          </v-row>
        </v-container>
      </v-card>

      <v-btn color="primary" @click="nextStep()">
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>

    <v-stepper-step step="4">
      View the car's ad. page
    </v-stepper-step>

    <v-stepper-content step="4">
      <v-card color="grey lighten-4" class="mb-12 text-center d-flex flex-column align-center justify-space-around"
        height="100px">
        <h3>Your car's price was predicted and published on the market</h3>
        <router-link :to="{name:'market'}">
          <v-btn color="primary">
            Market
          </v-btn>
        </router-link>
      </v-card>
      <!-- <v-btn text>
        Cancel
      </v-btn> -->
    </v-stepper-content>
  </v-stepper>
</template>


<script>
  import axios from "axios"
  import {
        // mapActions,
        mapGetters,
        mapMutations
    } from 'vuex';
  export default {

    data: () => ({
      e13: 1,

      rules: {
        required: value => !!value || 'Required.',
        counter: value => value.length <= 20 || 'Max 20 characters',
        email: value => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
        year: value => (value >= 1940 && value < 2021) || "You car is too old or you are from another planet",
        engine_volume: value => (value >= 0 && value <= 4) || "Range is between 0.0 - 4.0",
      },

      // general information
      company: null,
      companies: ['Chevrolet', 'Kia', 'Volkswagen', 'Toyota', 'Mitsubishi',
        'Mercedes-Benz', 'Hyundai', 'Opel', 'ВАЗ (Lada)', 'BMW', 'Subaru',
        'Renault', 'Lexus', 'Skoda', 'Nissan', 'Ford', 'Geely', 'Datsun',
        'Mazda', 'Honda', 'Daewoo', 'Audi', 'УАЗ', 'Lifan', 'FAW',
        'Infiniti', 'ЗАЗ', 'SsangYong', 'Rover', 'Lincoln', 'JAC',
        'Porsche', 'Chrysler', 'Fiat', 'Peugeot', 'Volvo', 'Jeep',
        'Suzuki', 'Ravon', 'Genesis', 'Mini', 'Jaguar', 'MG', 'Foton',
        'Great Wall', 'Renault Samsung', 'Citroen', 'Chery', 'ИЖ',
        'Hummer', 'Cadillac', 'Z', 'Maserati', 'Changan', 'Dodge', 'ZX',
        'ВИС', 'Alfa Romeo', 'BAW', 'Isuzu', 'ЛуАЗ', 'Acura', 'BYD',
        'Москвич', 'Pontiac', 'Scion', 'Haima', 'Brilliance', 'DongFeng',
        'Saab', 'Wuling', 'Saturn', 'Buick', 'Daihatsu'
      ].sort(),

      model: null,
      

      models: {
        'Chevrolet': ['Niva', 'Tracker', 'Orlando', 'Cruze', 'Epica', 'Aveo', 'Captiva', 'Lacetti', 'Spark',
          'Lanos', 'Suburban', 'Malibu', 'Cobalt', 'Tahoe', 'Express', 'Nexia', 'Impala', 'Camaro', 'Cavalier',
          'TrailBlazer'
        ],
        'Kia': ['Cadenza', 'Rio', 'Niro', 'Morning', 'Stonic', 'Cerato', 'Sportage', 'Cee’d', 'K5', 'Sorento',
          'Optima', 'Soul', 'Carnival', 'K7', 'Carens', 'Cerato Koup', 'Picanto', 'Bongo', 'Spectra', 'Quoris',
          'Magentis', 'Shuma', 'Mohave', 'Ray', 'Venga', 'Opirus', 'K9', 'Stinger', 'Forte', 'Clarus', 'Lotze'
        ],
        'Volkswagen': ['LT', 'Golf', 'Passat', 'Touareg', 'Sharan', 'Bora', 'Polo', 'Amarok', 'Jetta', 'Multivan',
          'Transporter', 'Caddy', 'Caravelle', 'Tiguan', 'Passat CC', 'Teramont', 'Golf Plus', 'Touran',
          'Crafter', 'Scirocco', 'Phaeton', 'Vento', 'Beetle', 'Santana'
        ],
        'Toyota': ['Camry', 'Highlander', 'Tacoma', 'Corolla', 'Sequoia', 'Scepter', 'Hilux', 'Crown', 'Hilux Surf',
          'Alphard', 'Yaris', 'Land Cruiser Prado', 'Altezza', 'Estima', 'Carina E', 'RAV 4', 'Mark II',
          'Land Cruiser', 'Vista', 'Voxy', 'Matrix', 'Ipsum', 'Crown Majesta', 'Avensis', 'Mark X', 'Nadia',
          'Camry Gracia', 'Sienna', 'HiAce Regius', 'Picnic', 'Tundra', 'Harrier', 'Granvia', 'Urban Cruiser',
          'Noah', 'Estima Lucida', 'Aristo', 'C-HR', 'HiAce', 'Venza', 'Auris', 'Town Ace Noah', 'Corolla Verso',
          'Avalon', 'FJ Cruiser', 'Soarer', 'Windom', 'Gaia', 'Cavalier', '4Runner', 'Echo', 'Previa', 'Opa',
          'Chaser', 'Caldina', 'Century', 'Prius', 'Starlet', 'Corona', 'Avensis Verso', 'Fortuner', 'Carina ED',
          'Tercel', 'Cresta', 'Brevis', 'Carina', 'Wish', 'Cami', 'Vellfire', 'Isis', 'Camry Lumiere',
          'Sprinter Carib', 'Vista Ardeo', 'Curren', 'Prius V', 'Aygo', 'Land Cruiser 70', 'Carina II', 'Verso',
          'Solara', 'Estima Emina', 'Will', 'Verossa', 'Sprinter', 'Corsa', 'Raum', 'Duet', 'Corona Exiv',
          'Premio', 'Lite Ace', 'Sprinter Marino', 'Town Ace', 'Celsior', 'Kluger'
        ],
        'Mitsubishi': ['Pajero', 'Pajero IO', 'Delica', 'Eclipse', 'Space Wagon', 'Lancer', 'Galant', 'Grandis',
          'Outlander', 'RVR', 'Airtrek', 'Carisma', 'L200', 'Sigma', 'Eclipse Cross', 'Space Runner', 'Diamante',
          'Aspire', 'i', 'ASX', 'Dion', 'Pajero Sport', 'Montero Sport', 'Space Gear', 'GTO', 'Pajero Pinin',
          'Montero', 'Legnum', 'Chariot', 'L300', 'Challenger', 'Lancer Evolution', 'Colt', 'Nativa', 'Space Star'
        ],
        'Lincoln': ['Navigator', 'Town Car'],
        'Mercedes-Benz': [' 1995', 'E 200', 'E 280', 'G 240', 'E 320', 'E 230', ' 2015', 'E 260', 'GLK 300',
          'S 500', 'E 300', 'S 63 AMG', 'E 350', 'C 240', 'CL 500', 'GLK 250', 'CLA 45 AMG', 'S 450', 'V 220',
          '190', 'ML 63 AMG', 'G 320', ' 2012', ' 1996', 'ML 320', 'B 180', 'GL 450', 'GL 500', 'GLC 200',
          'ML 350', 'S 600', 'C 180', 'G 55 AMG', 'E 55 AMG', 'CLS 350', 'S 350', 'E 63 AMG', 'C 280', 'S 560',
          'G 63 AMG', 'C 200', 'S 320', 'CLS 500', 'C 220', 'V 250', 'G 500', 'GL 550', 'GL 63 AMG', 'C 320',
          'A 160', 'GLC 250', 'Viano', 'E 240', 'GLS 450', 'CLA 200', 'GLA 200', ' 2001', 'CL 550', 'Vito',
          'GLE Coupe 63 AMG', 'AMG GT', 'GL 350', 'ML 400', 'GL 400', 'S 400', 'C 300', 'S 260', 'GLA 45 AMG',
          'GLE 450', 'E 53 AMG', 'Sprinter', 'C 250', 'E 400', 'S 550', 'E 220', 'C 230', 'CLK 320', 'E 420',
          'CLA 220', 'ML 270', 'E 430', 'A 45 AMG', 'CL 63 AMG', 'SL 500', 'GLS 400', 'S 65 AMG', 'CLS 63 AMG',
          'CE 230', 'E 500', 'C 36 AMG', 'B 200', 'S 280', 'SL 300', 'SLK 230', 'CLA 250', 'S 420', ' 2017',
          ' 2005', 'R 350', 'B 170', 'SL 55 AMG', 'A 140', 'A 180', 'G 550', 'C 400', 'CLS 400', 'GLS 63 AMG',
          'E 270', 'E 43 AMG', 'GLC 220', ' 2020', 'GL 320', 'E 250', 'G 300', 'GLE Coupe 350d', 'ML 300',
          'S 430', 'ML 430', ' 1991', 'GLK 280', ' 2007', 'GLE 400', 'S 55', ' 1993', 'ML 55 AMG', ' 2000',
          ' 1987', 'ML 500', 'G 350', 'A 150', 'GLK 200', 'ML 230', 'S 220'
        ],
        'Hyundai': ['Elantra', 'Accent', 'Avante', 'Sonata', 'Tucson', 'Grandeur', 'Creta', 'Getz', 'Starex',
          'Santa Fe', 'Solaris', 'Equus', 'i30', 'H-1', 'ix35', 'Genesis', 'i40', 'Terracan', 'Galloper',
          'Santamo', ' 2009', 'Trajet', 'Veloster', 'XG', 'Tiburon', 'Porter', 'Click', 'Genesis Coupe', 'Venue'
        ],
        'Opel': ['Vectra', 'Corsa', 'Frontera', 'Astra', 'Sintra', 'Meriva', 'Omega', 'Antara', 'Vivaro', 'Mokka',
          'Insignia', 'Vita', 'Signum'
        ],
        'ВАЗ (Lada)': ['2113 (хэтчбек)', '2114 (хэтчбек)', '2190 (седан)', '2171 (универсал)', '2115 (седан)',
          '2170 (седан)', 'Largus', '2121 Нива', '2110 (седан)', 'Vesta', '21099 (седан)', '2107',
          '2131 (5-ти дверный)', 'Vesta Cross', '2112 (хэтчбек)', '2192 (хэтчбек)', '2172 (хэтчбек)',
          '2191 (лифтбек)', '2106', '2104', '2109 (хэтчбек)', 'XRAY', '2194 (универсал)', '1119 (хэтчбек)',
          '2111 (универсал)', 'Largus (фургон)', '2123', 'Нива', '1118 (седан)', '1117 (универсал)',
          'Largus Cross', '2105', '1922 Бронто', '2108 (хэтчбек)', '2101', '2103', 'LADA Priora', '11113 Ока',
          '2329 (пикап)', '2102', 'LADA Largus', 'LADA Granta', '21106 (седан)'
        ],
        'BMW': ['525', 'X5', '520', '328', '318', '523', '750', '528', 'X6', 'M3', 'X1', '530', '630', '650', '728',
          '540', '325', '330', '316', '735', '730', '740', 'M760', 'X6 M', '320', 'M5', '745', 'X5 M', '116',
          'X7', '535', 'X3', '640', '518', '323', '218', '5-Series Gran Turismo', 'X4', '760', ' 1993', ' 2020',
          'X2', 'M4', '550', '335', ' 2011', '645', '120'
        ],
        'Ford': ['Mustang', 'Focus', 'Fiesta', 'Galaxy', 'Taurus', 'Escape', 'Transit', 'S-Max', 'Mondeo', 'Ranger',
          'Expedition', 'Explorer', 'Fusion', 'F-Series', 'Maverick', 'Sierra', 'Tourneo Custom', 'Kuga', 'Edge',
          'Fusion (North America)', 'Scorpio', 'EcoSport'
        ],
        'Subaru': ['Outback', 'Legacy', 'Forester', 'Tribeca', 'Impreza', 'XV', 'Impreza WRX STi', 'Impreza WRX',
          'WRX', 'Baja', 'Legacy Lancaster', 'Justy', 'Leone'
        ],
        'Renault': ['Sandero Stepway', 'Duster', 'Logan', 'Sandero', 'Trafic', 'Symbol', 'Kaptur', 'Megane',
          'Master', 'Laguna', 'Kangoo', 'Arkana', 'Scenic', 'Vel Satis', 'Captur'
        ],
        'Lexus': ['GX 460', 'LX 470', 'RX 300', 'LX 570', 'GS 350', 'ES 350', 'RX 350', 'NX 200', 'RX 330',
          'ES 250', 'RX 400h', 'LS 460', 'ES 330', 'GS 300', 'RX 270', 'RX 200t', ' 2012', 'ES 200', 'IS 250',
          'NX 300', 'NX 200t', 'LS 350', 'GX 470', 'LS 600h', 'GS 450h', 'UX 200', 'GS 250', ' 2003', 'ES 300',
          'RX 450h', 'ES 300h', 'RC 350', 'LS 430', 'IS 300', ' 2005', ' 2020', 'HS 250h', 'LC', 'IS 350',
          ' 1998', 'GS-F', 'NX 300h', 'RC 300'
        ],
        'Skoda': ['Yeti', 'Fabia', 'Rapid', 'Octavia', 'Superb', 'Kodiaq', 'Felicia'],
        'Nissan': ['Qashqai', 'Teana', 'Primera', 'Serena', 'Juke', 'Patrol', 'X-Trail', 'Pathfinder', 'Micra',
          'Maxima', 'Cefiro', 'Fuga', 'Almera', 'Cedric', 'Note', 'Sentra', 'Armada', 'Altima', 'Murano',
          'Almera Classic', 'Tino', 'March', 'Navara', 'Mistral', 'Terrano', 'NP300', 'Tiida', 'Avenir',
          'Skyline', 'Elgrand', 'Quest', 'Titan', 'GT-R', 'Safari', 'Liberty', 'Sunny', 'Bluebird', 'Cube',
          'Urvan', 'Gloria', 'Prairie', "R'nessa", 'AD', 'Laurel', 'Interstar', 'Presage', 'Leopard', 'Versa',
          'Almera Tino', 'Terrano II', 'Pulsar', 'Largo'
        ],
        'Geely': ['Emgrand X7', 'SC7', 'GC6', 'MK', 'Emgrand EC7', 'CK (Otaka)'],
        'Datsun': ['on-DO', 'mi-DO'],
        'Hummer': ['H2', 'H1', 'H3'],
        'Mazda': ['3', '6', 'Premacy', '323', 'RX8', 'Cronos', 'Tribute', '626', 'MPV', 'CX-7', 'Xedos 6', 'Sentia',
          'Eunos 500', 'CX-9', 'CX-5', 'Xedos 9', 'Bongo Friendee', 'MX3', 'Bongo', '5', 'Demio', 'Protege',
          'Proceed', 'Capella', 'Familia', 'MX6', 'Eunos 800'
        ],
        'Honda': ['Civic', 'CR-V', 'Elysion', 'Odyssey', 'Stepwgn', 'Legend', 'Pilot', 'Inspire', 'Accord',
          'Prelude', 'Fit Aria', 'Integra', 'Insight', 'Orthia', 'Stream', 'S-MX', 'Crossroad', 'Freed', 'Saber',
          'Domani', 'HR-V', 'Shuttle', 'Fit', 'Rafaga', 'Concerto', 'Jazz', 'Element'
        ],
        'Daewoo': ['Nexia', 'Gentra', 'Nubira', 'Espero', 'Matiz', 'Tosca', 'Leganza', 'Tico', 'Magnus', 'Damas',
          'Lanos', 'Rezzo', 'Matiz Creative', 'Lacetti'
        ],
        'Audi': ['A8', '80', '100', 'A6', 'A4', 'Q7', 'A3', 'A5', 'A6 allroad', 'Q8', 'S4', 'S8', 'TT', 'A7',
          'RS 7', '90', 'Q5', 'S5', 'S6', 'V8'
        ],
        'УАЗ': ['Hunter', '3303', 'Patriot', 'Pickup', 'Буханка', '3151', '469', 'Профи'],
        'Lifan': ['Smily', 'Breez', 'X60', 'Solano', 'Cebrium', 'X70', 'X50', 'Celliya', 'Myway'],
        'FAW': ['V5', 'D60', 'Besturn B70', 'Besturn B50', '1024', '6371', 'Oley', 'V80', '1021'],
        'Infiniti': ['FX35', 'Q50', 'QX56', 'G37', 'QX60', 'QX80', 'QX50', 'QX70', 'FX37', 'M35', 'FX50', 'G35',
          'EX35', 'Q30', 'FX45', 'Q70', 'G25', 'EX25', 'Q60', 'QX30'
        ],
        'ЗАЗ': ['Chance', 'Vida', 'Forza', '968', 'Sens'],
        'SsangYong': ['Istana', 'Kyron', 'Korando', 'Tivoli', 'Rexton', 'Actyon Sports', 'Actyon', 'Nomad'],
        'Rover': ['400 Series', 'Land Range  Sport', 'Land Range  Velar', 'Land Range ', 'Land Discovery',
          'Land Defender', 'Land Range  Evoque', '600 Series', 'Land Freelander', 'Land Discovery Sport', '25'
        ],
        'JAC': ['S3', 'S5', 'T6', 'J2'],
        'Porsche': ['Cayenne', 'Panamera', 'Macan', 'Cayman', '911'],
        'Jeep': ['Grand Cherokee', 'Wrangler', 'Gladiator', 'Liberty', 'Patriot', 'Cherokee'],
        'Chrysler': ['300M', '300C', 'PT Cruiser', 'Concorde'],
        'Fiat': ['Ducato', 'Panda', 'Punto', 'Tempra', 'Palio', 'Stilo'],
        'Peugeot': ['605', '307', '206', '407', '2008', '508', '301', '406', '308', 'Partner', '4007', '107', '207',
          '3008', '807', '607', 'Boxer', '405'
        ],
        'Volvo': ['S60', 'V70', 'S80', 'XC90', '850', 'XC70', 'V40', 'S70'],
        'Suzuki': ['SX4', 'Grand Vitara', 'XL7', 'Jimny', 'Alto', 'Vitara', 'Liana', 'Baleno', 'Escudo', 'Cultus',
          'Samurai'
        ],
        'Ravon': ['Nexia R3', 'R4', 'R2', 'Gentra'],
        'Genesis': ['G70', 'G80'],
        'Mini': ['Cabrio', 'Hatch', 'Countryman', 'ChanganBenBen ', 'Coupe'],
        'Jaguar': ['XF', 'XJ', 'XJS', 'XE', 'S-Type'],
        'MG': ['5', '350'],
        'Bentley': ['Bentayga', 'Continental GT', 'Arnage', 'Continental Flying Spur'],
        'Foton': ['Tunland', 'Alpha', 'Sup'],
        'Great Wall': ['Voleex C30', 'Hover M4', 'Wingle 5', 'Hover H3', 'Hover'],
        'Renault Samsung': ['SM7', 'QM6', 'SM3'],
        'Maserati': ['Quattroporte', 'Ghibli', 'Levante', 'GranTurismo'],
        'Chery': ['QQ', 'Amulet (A15)', 'Tiggo 5', 'Fora', 'Sweet (QQ)', 'Tiggo', 'M11', 'Tiggo 4', 'Tiggo 8',
          'Amulet', 'Bonus'
        ],
        'Citroen': ['C4', 'DS5', 'Jumper'],
        'Mercedes-Maybach': ['S 600', 'S 500'],
        'ИЖ': ['2717', '2126 (Ода)'],
        'Cadillac': ['Escalade', 'SRX', 'CTS', 'Fleetwood'],
        'Z': ['Opelafira', 'SubaruBR', 'PeugeotRC', 'BMW3', 'Honda', 'ToyotaMark X io'],
        'Changan': ['CS35', 'Eado', 'CS75', 'Chana SM8'],
        'Москвич': ['412'],
        'Dodge': ['Ram', 'Caravan', 'Avenger', 'Magnum', 'Caliber', 'Stratus', 'Challenger'],
        'ZX': ['Landmark'],
        'ВИС': ['2345 (Жигули)'],
        'Alfa Romeo': ['GTV', '146'],
        'Lamborghini': ['Gallardo'],
        'GMC': ['Savana', 'Envoy', 'Sierra', 'Yukon'],
        'BAW': ['Luba'],
        'Isuzu': ['Bighorn', 'Wizard', 'Trooper'],
        'ЛуАЗ': ['969'],
        'Maybach': ['57'],
        'Acura': ['RDX'],
        'BYD': ['S6'],
        'Pontiac': ['Vibe'],
        'Scion': ['XA'],
        'Haima': ['M3'],
        'Brilliance': ['H530'],
        'DongFeng': ['H30 Cross', 'Rich'],
        'Saab': ['9-5'],
        'Wuling': ['Sunshine'],
        'Saturn': ['Vue'],
        'Buick': ['Skylark'],
        'Daihatsu': ['Materia', 'Charade']
      },

      city: null,
      cities: ['Уральск', 'Нур-Султан (Астана)', 'Тараз', 'Алматы', 'Караганда',
        'Атырау', 'Петропавловск', 'Шымкент', 'Актау', 'Текели', 'Актобе',
        'Шиели', 'Бауыржана Момышулы', 'Риддер', 'Усть-Каменогорск',
        'Кызылорда', 'Павлодар', 'Семей', 'Костанай', 'Щучинск', 'Аркалык',
        'Талдыкорган', 'Каскелен', 'Хромтау', 'Кокшетау', 'Жанаозен',
        'Рудный', 'Кульсары', 'Аксай', 'Жезказган', 'Талгар', 'Кентау',
        'Приозерск', 'Карабалык (Карабалыкский р-н)', 'Жалагаш', 'Арысь',
        'Темиртау', 'Байконыр', 'Индерборский', 'Аксукент', 'Жетысай',
        'Жетиген', 'Кандыагаш', 'Агадырь', 'Балхаш', 'Степногорск',
        'Казыгурт', 'Байсерке', 'Отеген-Батыр', 'Сарыагаш', 'Туркестан',
        'Сатпаев', 'Аксу', 'Ушарал', 'Ганюшкино', 'Экибастуз', 'Жаркент',
        'Шелек', 'Ленгер', 'Жанатас', 'Шемонаиха', 'Шамалган',
        'Жанакорган', 'Акколь (Аккольский р-н)', 'Кордай', 'Актогай',
        'Урджар', 'Калбатау', 'Тарановское', 'Атбасар', 'Шолаккорган',
        'Аральск', 'Курчатов', 'Шаян', 'Аксуат', 'Сарань', 'Каратау',
        'Балпык би', 'Лисаковск', 'Железинка', 'Шу', 'Жаксы', 'Есик',
        'Узынагаш', 'Курык', 'Карасу', 'Курчум', 'Абай (Абайский р-н)',
        'Аулиеколь', 'Молодежное (Осакаровский р-н)', 'Мерке', 'Шахтинск',
        'Атакент', 'Аягоз', 'Акшукур', 'Зайсан', 'Сарыколь', 'Жосалы',
        'Капшагай', 'Самарское', 'Бишкуль', 'Уштобе', 'Шалкар',
        'Айтеке би', 'Шаульдер', 'Омск', 'Макинск', 'Шубаркудук',
        'Федоровка (Федоровский р-н)', 'Бейнеу', 'Новоишимский', 'Самара',
        'Боралдай', 'Форт-Шевченко', 'Тимирязево', 'Качар', 'Житикара',
        'Есиль', 'Турара Рыскулова', 'Мамлютка', 'Шетпе', 'Шортанды',
        'Алга', 'Иртышск', 'Карабулак', 'Каркаралинск', 'Сарыозек',
        'Осакаровка', 'Пресновка', 'Абай (Келесский р-н)', 'Жайрем',
        'Макат', 'Темирлановка', 'Боровое', 'Октябрьское', 'Казалинск',
        'Челябинск', 'Алтай', 'Сарыкемер', 'Мартук', 'Владивосток',
        'Кызылту', 'Ащибулак', 'Бадамша', 'Уфа', 'Темир',
        'Федоровка (Теректинский р-н)', 'Кулан', 'Хобда', 'Тобыл',
        'Баянаул', 'Саумалколь', 'Каражал', 'Затобольск', 'Шульбинск',
        'Озерск', 'Краснодар', 'Маканчи', 'Троицк', 'Боровской', 'Доссор',
        'Петухово', 'Аршалы', 'Степняк', 'Санкт-Петербург', 'Иргели',
        'Денисовка', 'Аксу-Аюлы', 'Балкашино', 'Тольятти', 'Кеген',
        'Кабанбай (Алакольский р-н)', 'Комсомольское', 'Чингирлау',
        'Макушино', 'Аса', 'Таскала', 'Шардара', 'Явленка', 'Кишкенеколь',
        'Миялы', 'Панфилово (Талгарский р-н)', 'Астраханка', 'Орск',
        'Курган', 'Екатеринбург', 'Рубцовск', 'Тайынша', 'Мойынкум',
        'Иргиз', 'Георгиевка', 'Теренозек', 'Сергеевка', 'Сайхин'
      ].sort(),

      description: '',

      // date picker
      year: null,

      // numeric fields
      mileage: null,
      engine_volume: null,
      gear: null,

      //select values
      rudder_values: [
        'слева', 'справа'
      ],
      transmission_values: ['механика', 'автомат', 'типтроник', 'вариатор', 'робот'],
      shell_values: ['внедорожник', 'седан', 'фургон', 'кроссовер', 'хэтчбек', 'пикап',
        'универсал', 'минивэн', 'купе', 'микроавтобус', 'лифтбек',
        'микровэн', 'родстер', 'кабриолет', 'лимузин', 'фастбек',
        'хардтоп'
      ],
      gear_values: ['полный привод', 'передний привод', 'задний привод'],
      type_engine_values: ['бензин', 'дизель', 'газ-бензин', 'гибрид', 'газ'],
      custom_clear_values: ['ДА', 'НЕТ'],

      // select
      rudder: null,
      custom_clear: null,
      transmission: null,
      shell: null,
      type_engine: null,

      // price: 450000,
      price: null,
    }),

    computed: {
      ...mapGetters(["car"])
    },

    methods: {
      ...mapMutations(["setCar"]),
      submit() {
        var data = {
          city: this.city,
          company: this.company,
          model: this.model,

          year: this.year,
          mileage: this.mileage,
          volume: this.engine_volume,

          gear: this.gear,
          transmisson: this.transmission,
          shell: this.shell,

          rudder: this.rudder,
          custom_cleared: this.custom_clear,
          type_engine: this.type_engine,
        };

        console.log(data);
        // post api

        console.log("Upload");

        axios.post("http://localhost:8000/prediction/", data, { auth: {
          username: "bekmaganbetov.janbolat@gmail.com",
          password: "admin"
        } })
             .then(response => this.moveToFinal(response.data));
        // get api
      },
      step1() {
        if (this.company == null) return true;
        if (this.model == null) return true;
        if (this.city == null) return true;
        return false;
      },
      step2() {
        if (this.year == null || this.year > 2020 || this.year < 1940) return true;
        if (this.mileage == null) return true;
        if (this.engine_volume == null || this.engine_volume > 4) return true;
        if (this.rudder == null) return true;
        if (this.transmission == null) return true;
        if (this.gear == null) return true;
        if (this.custom_clear == null) return true;
        if (this.shell == null) return true;
        if (this.type_engine == null) return true;
        return false;
      },
            moveToFinal(data){
                this.price = data;
                console.log(this.price);
          var data1 = {
          city: this.city,
          company: this.company,
          car_model: this.model,

          release_year: this.year,
          mileage: this.mileage,
          engine_volume: this.engine_volume,

          gear: this.gear,
          transmission: this.transmission,
          shell: this.shell,

          rudder: this.rudder,
          custom_clear: this.custom_clear,
          type_engine: this.type_engine,
          color: this.color,
          id: 50,
          price: this.price
        };
        this.setCar(data1);
        this.$router.push('/car_detail');
      },
      nextStep() {
        console.log("Next Step");
        this.e13 = this.e13 + 1;
        if (this.e13 > 4)
          this.e13 = 1;
      }
    },
  }
</script>