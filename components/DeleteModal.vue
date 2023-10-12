<script setup>
const { API_HOST, API_ROUTE, API_PORT } = useRuntimeConfig().public

const props = defineProps({
  dialogDelete: Boolean,
  idToUp: String
})

const emit = defineEmits(['dialogDelete'])

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
  title: 'Eliminación fallida',
  text: 'Intentelo de nuevo más tarde.'
})

const cardSuccess = () => {
  card.status = !card.status
  card.icon = 'mdi-check-circle'
  card.title = 'Eliminación exitosa'
  card.text = 'El registro del animal se ha eliminado'
}

const finalize = () => {
  dialog.value = !dialog.value
  setTimeout(() => {
    emit('dialogDelete')
  }, 3000)
}

// DELETE
async function deleteReg () {
  await useFetch(`${API_HOST}:${API_PORT}${API_ROUTE}/animals/${props.idToUp}`, {
    method: 'DELETE'
  }).then((res) => {
    if (!res.error.value) {
      cardSuccess()
    }
    finalize()
  })
}
</script>

<template>
  <v-card class="card-delete">
    <v-card-title class="title">
      ¿Está seguro que desea eliminar este item?
    </v-card-title>
    <v-card-actions class="actions">
      <v-btn variant="text" @click="$emit('dialogDelete')">
        Cancelar
      </v-btn>
      <v-btn
        :disabled="dialog"
        :loading="dialog"
        variant="text"
        @click="deleteReg"
      >
        OK
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
.card-delete{
  background: white;
  color: #FF5722;
}

.title{
  text-align: center;
}

.actions{
  display: flex;
  justify-content: center;
}

.messageCard {
  background: white;
  color: #FF5722;
  height: 240px;
  width: 100%;
  max-width: 810px;
}

@media screen and (max-width: 600px) {
  .title {
    font-size: 16px;
  }

  .messageCard {
    height: auto;
    max-width: 100%;
    padding: 20px;
  }
}
</style>
