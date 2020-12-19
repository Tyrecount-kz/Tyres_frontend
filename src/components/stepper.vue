<template>
  <v-stepper
    v-model="e13"
    vertical
  >
    <v-stepper-step
      step="1"
    >
      General Information
      <p class="grey--text"> but it is also important for prediction </p>
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-card
        height="325px"
      >
        <form>
            <v-text-field
                v-model="company"
                :error-messages="nameErrors"
                :counter="20"
                label="Company"
                required
                @input="$v.company.$touch()"
                @blur="$v.company.$touch()"
            ></v-text-field>

            <v-text-field
                v-model="model"
                :error-messages="nameErrors"
                label="Model"
                required
                @input="$v.model.$touch()"
                @blur="$v.model.$touch()"
            ></v-text-field>

            <v-text-field
                v-model="description"
                :error-messages="nameErrors"
                :counter="60"
                label="Description"
                required
                @input="$v.description.$touch()"
                @blur="$v.description.$touch()"
            ></v-text-field>

            <v-select
                v-model="select"
                :items="cities"
                :error-messages="selectErrors"
                label="City"
                required
                @change="$v.city.$touch()"
                @blur="$v.city.$touch()"
            ></v-select>
        </form>
            
        <v-btn
            color="primary"
            @click="e13 = 2"
        >
            Continue
        </v-btn>
      </v-card>
    </v-stepper-content>

    <v-stepper-step
      step="2"
    >
      Characteristics of a car
      
      <p class="grey--text"> main features for prediction </p>
    </v-stepper-step>

    <v-stepper-content step="2">
      <v-card
        height="325px"
      >
        <form>

            <v-text-field
                width="150"
                v-model="company"
                :error-messages="nameErrors"
                :counter="20"
                label="Company"
                required
                @input="$v.company.$touch()"
                @blur="$v.company.$touch()"
            ></v-text-field>

            <v-text-field
                v-model="model"
                :error-messages="nameErrors"
                label="Model"
                required
                @input="$v.model.$touch()"
                @blur="$v.model.$touch()"
            ></v-text-field>

            <v-text-field
                v-model="description"
                :error-messages="nameErrors"
                :counter="60"
                label="Description"
                required
                @input="$v.description.$touch()"
                @blur="$v.description.$touch()"
            ></v-text-field>

            <v-select
                v-model="select"
                :items="cities"
                :error-messages="selectErrors"
                label="City"
                required
                @change="$v.city.$touch()"
                @blur="$v.city.$touch()"
            ></v-select>
        </form>
            
        <v-btn
            color="primary"
            @click="e13 = 3"
        >
            Continue
        </v-btn>
      </v-card>
    </v-stepper-content>

    <v-stepper-step
      step="3"
      :rules="[() => false]"
    >
      Ad templates
      <small>Alert message</small>
    </v-stepper-step>

    <v-stepper-content step="3">
      <v-card
        color="grey lighten-1"
        class="mb-12"
        height="200px"
      ></v-card>
      <v-btn
        color="primary"
        @click="e13 = 4"
      >
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
      <v-card
        color="grey lighten-1"
        class="mb-12"
        height="200px"
      ></v-card>
      <v-btn
        color="primary"
        @click="e13 = 1"
      >
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>
  </v-stepper>
</template>


<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(10) },
      email: { required, email },
      select: { required },
      checkbox: {
        checked (val) {
          return val
        },
      },
    },

    data: () => ({        
        e13: 1,

        // general information
        company: '',
        model: '',
        description: '',
        city: null,
        cities: [
            'Almaty',
            'Nur-Sultan',
            'Oskemen',
            'Taldykorgan',
        ],

        // date picker
        year: null,
        
        // numeric fields
        mileage: null,
        engine_volume: null,
        gear: null,
        
        //select values
        rudder_values: {
            0: "left",
            1: "right",
        },
        transmission_values: {
            0: "automat",
            1: "mechanics",

        },
        shell_values: {
            0: "sedan",
            1: "baklajan",

        },

        // select
        rudder: 0,
        custom_clear: 0,
        transmission: 0,
        shell: 0,


        checkbox: false,
    }),

    computed: {
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('You must agree to continue!')
        return errors
      },
      selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('Item is required')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
    },

    methods: {
      submit () {
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = false
      },
    },
  }
</script>