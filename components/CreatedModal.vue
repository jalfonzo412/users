<script setup>
const { API_HOST, API_ROUTE, API_PORT } = useRuntimeConfig().public

const props = defineProps({ dialogCreate: Boolean })

const emit = defineEmits(['dialogCreate', 'new_Animal'])

const grupo = ref([])
const grupos = [
  { label: 'Mamifero', value: 'Mamifero' },
  { label: 'Ave', value: 'Ave' },
  { label: 'Reptil', value: 'Reptil' }
]
const especie = ref('')
const raza = ref('')
const anios = ref(null)
const peso_aprox = ref(null)
const cantidad = ref(null)
const valor_x_unidad = ref(null)

async function submit () {
  await useFetch(`${API_HOST}:${API_PORT}${API_ROUTE}/animals`, {
    method: 'POST',
    body: {
      grupo: grupo.value,
      especie: especie.value,
      raza: raza.value,
      anios: anios.value,
      peso_aprox: peso_aprox.value,
      cantidad: cantidad.value,
      valor_x_unidad: valor_x_unidad.value
    }
  }).then((res) => {
    if (res.error.value) {
      alert(`Error: ${res.error.value}`)
    } else {
      alert('Successfully registered animal')
      emit('new_Animal', res.data.value)
    }
    emit('dialogCreate')
  })
}
</script>

<template>
  <v-card class="created-modal">
    <v-card-title>
      <span class="text-h5">Nuevo Item</span>
    </v-card-title>
    <v-card-text>
      <v-container fluid>
        <p><strong>Grupo</strong></p>
        <v-row>
          <v-col
            v-for="item in grupos"
            :key="item.value"
            cols="4"
            sm="4"
            md="4"
          >
            <v-checkbox
              v-model="grupo"
              :label="item.label"
              :value="item.value"
              color="grey-lighten-2"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="especie"
              label="Especie"
              required
              clearable
              variant="outlined"
              color="grey-darken-3"
              bg-color="grey-lighten-4"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="raza"
              label="Raza"
              required
              clearable
              variant="outlined"
              color="grey-darken-3"
              bg-color="grey-lighten-4"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="anios"
              label="Años"
              required
              clearable
              variant="outlined"
              color="grey-darken-3"
              bg-color="grey-lighten-4"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="peso_aprox"
              label="Peso aproximado"
              required
              clearable
              variant="outlined"
              color="grey-darken-3"
              bg-color="grey-lighten-4"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="cantidad"
              label="Cantidad"
              required
              clearable
              variant="outlined"
              color="grey-darken-3"
              bg-color="grey-lighten-4"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="valor_x_unidad"
              label="Costo c/u"
              required
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
      <v-btn
        variant="text"
        @click="$emit('dialogCreate')"
      >
        Cerrar
      </v-btn>

      <v-btn
        variant="text"
        @click="submit"
      >
        Enviar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.created-modal{
  background: #FF5722;
  color: white;
}

@media screen and (max-width: 600px) {
  .created-modal {
    padding: 10px;
  }

  .text-h5 {
    font-size: 16px;
  }

  p {
    font-size: 14px;
  }

  v-col {
    margin-bottom: 10px;
  }
}
</style>
