<!-- <script>
export default {
  data() {
    return {
      showAlert: false,
      alertType: '',
      alertMessage: ''
    };
  },
  methods: {
    deleteReg() {
      // Delete logic here
      // Show success alert
      this.showAlert = true;
      this.alertType = 'success';
      this.alertMessage = 'Item successfully deleted';
    }
  }
};
</script> -->
<script setup>
const { API_HOST, API_ROUTE, API_PORT } = useRuntimeConfig().public

const props = defineProps({
  dialogUpdate: Boolean,
  idToUp: String
})

const emit = defineEmits(['dialogUpdate'])

const animal = ref(null)

async function getAnimal () {
  await useFetch(`${API_HOST}:${API_PORT}${API_ROUTE}/animals/${props.idToUp}`)
    .then((res) => {
      animal.value = res.data.value
    })
}

const anios = ref(null)
const peso = ref(null)
const costo = ref(null)

async function updateAnimal () {
  await useFetch(`${API_HOST}:${API_PORT}${API_ROUTE}/animals/${props.idToUp}`, {
    method: 'PATCH',
    body: {
      anios: anios.value,
      peso_aprox: peso.value,
      valor_x_unidad: costo.value
    }
  }).then((res) => {
    if (res.error.value) {
      alert(`Error: ${res.error.value}`)
    } else {
      alert('Meeting updated')
    }
    emit('dialogUpdate')
  })
}

getAnimal()
</script>

<template>
  <v-card class="update-modal">
    <v-card-title>
      <span class="text-h5">Actualizar Item</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="anios"
              label="Años"
              clearable
              variant="outlined"
              color="grey-darken-3"
              bg-color="grey-lighten-4"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="peso"
              label="Peso aproximado"
              clearable
              variant="outlined"
              color="grey-darken-3"
              bg-color="grey-lighten-4"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="costo"
              label="Costo c/u"
              clearable
              variant="outlined"
              color="grey-darken-3"
              bg-color="grey-lighten-4"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn variant="text" @click="$emit('dialogUpdate')">
        Cerrar
      </v-btn>
      <v-btn variant="text" @click="updateAnimal">
        Finalizar
      </v-btn>
    </v-card-actions>
    <!-- <v-alert
      v-if="showAlert"
      :type="alertType"
      dismissible
      @input="showAlert = false"
    >
      {{ alertMessage }}
    </v-alert> -->
  </v-card>
</template>

<style scoped>
.update-modal{
  background: #FF5722;
  color: white;
}

@media screen and (max-width: 600px) {
  .text-h5 {
    font-size: 16px;
  }
}
</style>
