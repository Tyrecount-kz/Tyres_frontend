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
              <v-select v-model="model" label="Model" :items="models" :rules="[rules.required]" class="mb-1"
                single-line></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-text-field v-model="description" :counter="60" label="Description" required
                @input="$v.description.$touch()" @blur="$v.description.$touch()"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        
        <v-btn 
          color="primary" 
          :disabled="step1()"
          @click="nextStep()"
        >
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
              <v-text-field v-model="mileage" :min="0" label="Mileage" hide-details single-line type="number"
                suffix="km">
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

        <v-btn 
          color="primary" 
          :disabled="step2()"
          @click="nextStep()"
        >
          Predict Price
        </v-btn>

      </v-card>
    </v-stepper-content>

    <v-stepper-step step="3">
      Predicting...
      <small class="pt-1">waiting for the magic ;)</small>
    </v-stepper-step>

    <v-stepper-content step="3">
      <v-card color="grey lighten-3" class="mb-12" height="200px">
          
        <v-text-field v-model="price" :min="0" label="Price" :value="price" :rules="[rules.required]" class="mb-1"
          single-line type="number" readonly suffix="TENGE"></v-text-field>

      </v-card>
      <v-btn color="primary" @click="nextStep">
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>

    <v-stepper-step step="4">
      View setup instructions
    </v-stepper-step>

    <v-stepper-content step="4">
      <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
      <v-btn color="primary" @click="nextStep()">
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>
  </v-stepper>
</template>


<script>

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
      ],

      model: null,
      models: ['Niva', 'Cadenza', 'LT', 'Camry', 'Pajero', ' 1995', 'Highlander',
        'Elantra', 'Accent', 'Tacoma', 'Vectra', 'Golf', 'E 200', 'Passat',
        'Corolla', '2113 (хэтчбек)', '525', 'Outback', 'Sandero Stepway',
        'X5', 'Scepter', 'Hilux', '520', 'GX 460', 'Crown', 'Touareg',
        'E 280', 'Yeti', '2114 (хэтчбек)', 'Rio', 'Qashqai', 'Hilux Surf',
        'Niro', 'Teana', 'Focus', '2190 (седан)', 'G 240', 'Emgrand X7',
        '2171 (универсал)', 'Sharan', 'RX 300', 'Pajero IO', 'on-DO', '3',
        'E 320', 'Tracker', '2115 (седан)', 'E 230', 'Primera', 'Civic',
        '2170 (седан)', 'Largus', 'Serena', 'Bora', 'Alphard', 'Legacy',
        'E 260', 'Delica', 'Eclipse', 'Nexia', 'Orlando', '6', 'Cruze',
        'Avante', 'GLK 300', 'A8', 'Juke', '2121 Нива', 'E 300', 'Hunter',
        'Smily', 'Yaris', 'Land Cruiser Prado', 'Morning', '2110 (седан)',
        'V5', 'Duster', 'Vesta', 'GS 350', 'ES 350', '318', '523', 'E 350',
        'Altezza', 'FX35', 'Polo', 'Fabia', 'X-Trail', '21099 (седан)',
        '80', 'Chance', 'Estima', 'C 240', 'Istana', 'Pathfinder',
        '400 Series', 'Carina E', 'Town Car', 'S3', 'RAV 4', 'Cayenne',
        'Vida', 'Forester', 'RX 350', 'Tribeca', '2107', '100', 'A6', 'A4',
        'Rapid', '3303', 'Stonic', 'Epica', 'NX 200', 'GLK 250', 'CR-V',
        'Elysion', 'Premacy', 'Patrol', 'Micra', 'Breez', 'Maxima',
        '2131 (5-ти дверный)', 'Sonata', '300M', 'Tucson', 'Ducato',
        'RX 330', '190', 'Cerato', 'Corsa', 'Patriot', 'Grandeur', 'G 320',
        '528', ' 2012', 'Creta', 'Cefiro', 'Space Wagon', 'Sportage',
        '323', 'Vista', 'Cee’d', 'X60', 'Voxy', 'Lancer', ' 1996', 'Fuga',
        'ML 320', 'Matrix', 'Getz', 'B 180', 'Galant', 'Grandis', 'K5',
        '605', 'Ipsum', 'S60', 'Aveo', 'Frontera', 'Q7', 'Vesta Cross',
        'Astra', 'ES 250', 'X1', 'Starex', 'RX 400h', 'Sorento',
        'Crown Majesta', 'LS 460', 'A3', 'Avensis', 'Jetta',
        '2112 (хэтчбек)', '307', 'Captiva', 'Almera', '206', 'A5',
        'ML 350', 'Impreza', 'Optima', 'RX8', 'Mark X', 'C 180', '530',
        'Odyssey', 'Lacetti', '2192 (хэтчбек)', 'S 500', 'Solano',
        'Fiesta', 'Soul', 'Santa Fe', 'Cedric', 'Note', 'Outlander',
        'A6 allroad', 'Sentra', 'Octavia', 'Multivan', 'Cronos',
        '2172 (хэтчбек)', 'Gentra', '2191 (лифтбек)', 'Grand Cherokee',
        'Sintra', 'D60', 'Q50', '2106', 'Logan', 'CLS 350', 'RVR',
        'Airtrek', 'ES 330', 'G37', 'Tribute', 'Land Cruiser', '407',
        'Solaris', 'Nadia', '2104', 'Spark', 'Camry Gracia', 'SX4',
        'Nexia R3', 'GS 300', 'Sienna', 'Carnival', 'Transporter',
        'HiAce Regius', 'Carisma', 'Stepwgn', '2109 (хэтчбек)', 'Mark II',
        'QX60', '626', 'S 350', 'Kyron', 'Grand Vitara', '630', 'C 280',
        'Picnic', 'C 200', 'G70', 'K7', 'Equus', 'S 320', 'Sandero',
        'Lanos', 'Carens', 'XRAY', 'MPV', 'Cabrio', 'XF', 'L200', 'Pickup',
        '328', 'Land Range  Sport', '728', '5', 'RX 270', 'Superb',
        'C 220', 'CX-7', 'X6', 'Sigma', 'Trafic', 'CLA 45 AMG',
        'Cerato Koup', 'Eclipse Cross', 'Harrier', 'Space Runner', '300C',
        'Granvia', 'Altima', '325', '2194 (универсал)', '2008',
        '1119 (хэтчбек)', 'Land Range ', 'Nubira', 'Galaxy', 'Legend',
        'Land Discovery', 'Picanto', 'XV', 'R4', 'Kodiaq', 'Symbol', '330',
        'Land Defender', '316', '508', 'Diamante', 'Murano',
        'Almera Classic', 'Land Range  Evoque', 'Taurus', 'QX50', 'SC7',
        'Urban Cruiser', 'Pilot', '301', 'C 320', 'GC6',
        '2111 (универсал)', 'QX70', 'A 160', 'Largus (фургон)', 'Xedos 6',
        'GLC 250', '406', 'Escape', 'Noah', 'XL7', 'Caddy', '735', 'Tino',
        'Cebrium', 'Буханка', 'Viano', 'FX37', 'Jimny', 'Transit',
        'Meriva', 'S-Max', 'Caravelle', 'Sentia', 'Estima Lucida',
        'Aspire', 'i', 'R2', 'Aristo', 'Inspire', 'Tunland', 'ASX', '2123',
        'Нива', 'Accord', 'C-HR', 'March', '600 Series', 'Navara', 'Hatch',
        'HiAce', 'Venza', 'Auris', 'Alto', 'Korando', 'Town Ace Noah',
        'Mondeo', 'E 240', 'Tivoli', 'Voleex C30', '1118 (седан)', '1117 (универсал)', 'Mistral', 'Tiguan',
        'Terrano', 'Kaptur',
        'Impreza WRX STi', 'Panda', 'Wrangler', 'X70', 'Ranger', 'NP300',
        'S4', 'Passat CC', 'CLA 200', '740', 'Corolla Verso', 'GLA 200',
        '750', 'Avalon', 'Impreza WRX', 'Largus Cross', 'M35',
        'Land Freelander', 'ES 200', 'IS 250', 'Tundra', 'SM7', 'Tiida',
        ' 2001', 'i30', 'FJ Cruiser', 'Bongo', 'Vito', 'NX 200t',
        'Countryman', 'Dion', 'GL 350', 'ML 400', 'Rexton', 'Omega',
        'X6 M', 'Soarer', 'G35', 'C4', 'C 300', 'RX 200t', 'PT Cruiser',
        'Amulet (A15)', 'Amarok', 'Pajero Sport', 'Tiggo 5', 'Windom',
        'Spectra', 'Gaia', '320', 'Actyon Sports', 'GLA 45 AMG',
        'Cavalier', '2717', 'Avenir', 'GL 450', 'H3', 'Vitara', 'EX35',
        '2105', 'Espero', 'Megane', 'Sprinter', 'Alpha', 'M5', 'Escalade',
        'XJ', 'Montero Sport', 'Prelude', 'C 250', 'E 400', 'Opelafira',
        'TT', 'Golf Plus', 'Fit Aria', 'Fora', 'GL 400', 'MK',
        'Quattroporte', 'E 220', 'Echo', 'A7', 'H-1', 'Previa', '3151',
        'Antara', 'C 230', 'GS 450h', 'Opa', 'CLK 320', 'V70', 'E 420',
        'SubaruBR', 'Besturn B70', 'Mustang', 'X50', 'Vivaro', '745',
        'Explorer', 'Touran', 'X5 M', 'CLA 220', 'UX 200', 'Quoris', '116',
        'Fusion', 'Skyline', 'Malibu', 'ix35', 'Eunos 500', 'Elgrand',
        'Quest', 'S 450', 'Master', 'Cobalt', 'Chaser', '1922 Бронто',
        'CS35', '4Runner', 'Laguna', 'Caldina', '2108 (хэтчбек)', 'Kangoo',
        'Besturn B50', 'GS 250', 'ML 270', 'Space Gear', 'Matiz', 'E 430',
        'Actyon', 'Integra', 'Genesis', 'CX-9', ' 2003', 'Crafter', 'i40',
        'Cayman', '535', 'A 45 AMG', 'Ram', 'GTO', 'Safari', 'ES 300',
        'Magentis', 'X3', 'Hover M4', 'Liberty', '640', 'Sunny', 'Q30',
        'Wingle 5', 'Punto', 'S80', 'Prius', 'ChanganBenBen ', 'Liana',
        'Scirocco', 'CX-5', 'Landmark', 'Bluebird', 'Baleno', 'RX 450h',
        'CE 230', 'Xedos 9', 'Starlet', 'XC90', '308', 'Tosca', 'FX45',
        'ES 300h', 'Q70', '518', '2345 (Жигули)', 'Insight', '90',
        'Leganza', 'Bongo Friendee', 'Caravan', 'Corona', 'Forza',
        'Sweet (QQ)', 'Cube', 'Partner', '730', 'C 36 AMG', '540',
        'Maverick', 'Urvan', 'B 200', 'Avensis Verso', 'Fortuner', 'MX3',
        'QM6', 'Carina ED', 'Emgrand EC7', 'Pajero Pinin', 'S5', '850',
        'Montero', 'Arkana', 'Orthia', 'Gloria', 'SL 300', 'LADA Priora',
        'SLK 230', 'Tiggo', 'M11', '218', 'RC 350', 'T6',
        '5-Series Gran Turismo', '4007', 'Tercel', 'CLA 250', 'Scenic',
        'Nomad', 'S 420', 'Cresta', 'GTV', 'Mohave', 'Ray', ' 2005',
        'Venga', 'R 350', '107', 'X4', 'Phaeton', 'Prairie', 'Brevis',
        'XC70', 'Vento', 'Avenger', 'Stream', 'DS5', '1024', 'Terracan',
        'Tico', '968', '6371', 'WRX', 'Shuma', 'Galloper', 'Carina',
        'B 170', 'S-MX', 'V 250', 'Luba', 'Sierra', 'Santamo', 'Wish',
        'Crossroad', 'Cami', 'Vellfire', 'Isis', 'Bighorn', 'Celliya',
        ' 1993', '11113 Ока', '969', 'Camry Lumiere', 'Freed',
        'Sprinter Carib', 'A 140', 'Opirus', '2329 (пикап)', 'S 280',
        ' 2009', "R'nessa", 'Magnus', 'AD', 'Oley', 'Eado', 'Vista Ardeo',
        'Legnum', 'Demio', 'Chariot', 'A 180', 'Q5', 'G80', 'Baja', 'RDX',
        'G 550', 'Protege', 'C 400', 'Prius V', 'S6', 'Sup', 'Mokka',
        'CLS 400', '412', 'Beetle', 'E 270', 'V40', 'Vel Satis', 'G25',
        '350', 'Saber', 'Sens', 'Damas', '207', 'LS 430', 'Aygo',
        'GLC 220', 'Tiggo 4', 'mi-DO', '3008', 'EX25', '469', 'IS 300',
        'V80', 'Trajet', 'Tiggo 8', 'Domani', 'SM3', 'Insignia', 'Stinger',
        'Vibe', 'Magnum', 'XA', 'Veloster', 'Laurel', 'Carina II',
        'Impala', 'CS75', 'PeugeotRC', 'Tourneo Custom', 'GL 320', 'E 250',
        'Camaro', 'Q60', 'HS 250h', 'S 400', 'G 300', 'Captur', 'Escudo',
        'Rezzo', 'XG', 'Jumper', 'Tiburon', 'Chana SM8', 'ML 300', 'S 430',
        'ML 430', 'Expedition', 'BMW3', 'Kuga', 'Cultus', 'Proceed',
        'Land Discovery Sport', 'Edge', 'Verso', 'GLK 280', 'Samurai',
        'X2', 'Matiz Creative', 'Tempra', 'Interstar', 'Vita', 'IS 350', 'Cherokee', 'Amulet', 'HR-V', 'S70',
        'XE', 'Capella',
        'Fusion (North America)', 'Porter', 'Honda', 'Solara', 'Click',
        '911', 'Palio', 'L300', 'Legacy Lancaster', 'Estima Emina',
        ' 1998', 'Challenger', 'Signum', '807', 'Scorpio', ' 2015', 'Will',
        'Verossa', 'Justy', 'Caliber', 'Genesis Coupe', 'Lancer Evolution',
        'Presage', 'G 350', 'Familia', 'Forte', '650', 'Bonus', 'M3',
        'Stilo', 'CTS', '607', 'Wizard', 'Hover H3', 'TrailBlazer', '335',
        'Leopard', 'Versa', ' 2011', 'Almera Tino', 'ToyotaMark X io',
        '146', 'QX30', 'Clarus', 'H530', 'H30 Cross', 'Shuttle', 'Профи',
        'Stratus', '9-5', 'Concorde', 'Colt', 'Trooper', 'Santana',
        'S-Type', 'A 150', 'Terrano II', 'Sunshine', '2126 (Ода)',
        'Nativa', 'Felicia', 'Fit', 'Hover', 'Raum', 'MX6', 'Vue', '645',
        'GLK 200', 'Leone', 'Pulsar', 'ML 230', 'Largo', '25',
        'LADA Largus', 'Duet', 'Myway', 'CK (Otaka)', 'Skylark', 'Rafaga',
        'Premio', 'Materia', '2103', 'Lite Ace', 'Sprinter Marino',
        'Corona Exiv', 'Lotze', 'Eunos 800', 'Concerto', 'J2', 'Boxer',
        'Town Ace', 'NX 300h', 'Coupe', 'Venue', 'Rich', 'EcoSport',
        'LADA Granta', 'V8', '405', '21106 (седан)', 'Jazz', '120',
        'Element', 'Celsior', 'Kluger', 'RC 300', 'Space Star'
      ],

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
      ],

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

      price: 450000,
    }),

    computed: {

    },

    methods: {
      submit() {
        this.$v.$touch()
      },
      step1() {
        if( this.company == null ) return true;
        if( this.model == null ) return true;
        if( this.city == null ) return true;
        return false;
      },
      step2() {
        if( this.year == null || this.year > 2020 || this.year < 1940 ) return true;
        if( this.mileage == null ) return true;
        if( this.engine_volume == null || this.engine_volume > 4 ) return true;
        if( this.rudder == null ) return true;
        if( this.transmission == null ) return true;
        if( this.gear == null ) return true;
        if( this.custom_clear == null ) return true;
        if( this.shell == null ) return true;
        if( this.type_engine == null ) return true;
        return false;
      },
      nextStep() {
        console.log("Next Step");
        this.e13 = this.e13 + 1;
        if( this.e13 > 4 )
          this.e13 = 1;
      }
    },
  }
</script>