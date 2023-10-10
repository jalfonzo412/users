<script setup>
const { API_HOST, API_ROUTE, API_PORT } = useRuntimeConfig().public

const props = defineProps({
  dialogDelete: Boolean,
  idToUp: String
})

const emit = defineEmits(['dialogDelete'])

// DELETE
async function deleteReg () {
  await useFetch(`${API_HOST}:${API_PORT}${API_ROUTE}/animals/${props.idToUp}`, {
    method: 'DELETE'
  }).then((res) => {
    if (res.error.value) {
      alert(`Error: ${res.error.value}`)
    } else {
      alert('Successfully delete')
    }
    emit('dialogDelete')
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
      <v-btn variant="text" @click="deleteReg">
        OK
      </v-btn>
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

@media screen and (max-width: 600px) {
  .title {
    font-size: 16px;
  }
}
</style>
