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

const dialog = ref(false)

watch(() => dialog.value, (val) => {
  if (!val) {
    return
  }
  setTimeout(() => (dialog.value = false), 4000)
})

const card = reactive({
  status: false,
  icon: 'mdi-alert-circle',
  title: 'Actualización fallida',
  text: 'Intentelo de nuevo más tarde.'
})

const cardSuccess = () => {
  card.status = !card.status
  card.icon = 'mdi-check-circle'
  card.title = 'Actualización completada'
  card.text = 'El registro del animal se ha actualizado. Los cambios ahora pueden verse en la tabla'
}

const finalize = () => {
  dialog.value = !dialog.value
  setTimeout(() => {
    emit('dialogUpdate')
  }, 2800)
}

async function updateAnimal () {
  await useFetch(`${API_HOST}:${API_PORT}${API_ROUTE}/animals/${props.idToUp}`, {
    method: 'PATCH',
    body: {
      anios: anios.value,
      peso_aprox: peso.value,
      valor_x_unidad: costo.value
    }
  }).then((res) => {
    if (!res.error.value) {
      cardSuccess()
    }
    finalize()
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

      <v-btn
        :disabled="dialog"
        :loading="dialog"
        variant="text"
        @click="updateAnimal"
      >
        Finalizar
      </v-btn>
      <v-dialog
        v-model="dialog"
        persistent
        width="auto"
      >
        <v-card v-model="card.status" class="messageCard">
          <v-row>
            <v-col cols="12" class="text-center">
              <v-icon size="100">
                {{ card.icon }}
              </v-icon>
            </v-col>
            <v-col cols="12" class="text-center">
              <span class="text-h5">{{ card.title }}</span>
            </v-col>
            <v-col cols="12" class="text-center">
              <span>{{ card.text }}</span>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.update-modal{
  background: #FF5722;
  color: white;
}

.messageCard {
  background: white;
  color: #FF5722;
  height: 240px;
  width: 100%;
  max-width: 810px;
}

@media screen and (max-width: 600px) {
  .text-h5 {
    font-size: 16px;
  }

  .messageCard {
    height: auto;
    max-width: 100%;
    padding: 20px;
  }
}
</style>
