<script setup>
const { API_HOST, API_ROUTE, API_PORT } = useRuntimeConfig().public
const dataArr = ref([])

// GET ALL
async function getData () {
  await useFetch(`${API_HOST}:${API_PORT}${API_ROUTE}/animals`)
    .then((res) => {
      if (res.error.value) {
        alert(res.error.value)
      } else {
        dataArr.value = res.data.value
      }
    })
}
console.log(dataArr)

// DELETE
async function deleteReg (_id) {
  await useFetch(`${API_HOST}:${API_PORT}${API_ROUTE}/animals/${_id}`, {
    method: 'DELETE'
  }).then((res) => {
    if (res.error.value) {
      alert(`Error: ${res.error.value}`)
    } else {
      alert('Successfully delete')
      getData()
    }
  })
}

// // Pagination
// const ITEMS_PER_PAGE = 4
// const currentPage = ref(1)

// const pages = computed(() => Math.ceil(talent.value.length / ITEMS_PER_PAGE))
// const animalsPage = computed(() => {
//   const init = (currentPage.value - 1) * ITEMS_PER_PAGE
//   return talent.value.slice(init, init + ITEMS_PER_PAGE)
// })

getData()
</script>

<template>
  <div class="table-container">
    <v-table fixed-header height="300px">
      <thead>
        <tr>
          <th class="text-left">Grupo</th>
          <th class="text-left">Especie</th>
          <th class="text-left">Raza</th>
          <th class="text-left">Años</th>
          <th class="text-left">Peso aproximado kg.</th>
          <th class="text-left">Descripcion</th>
          <th class="text-left">Fecha de creación</th>
          <th class="text-left">Ultima actualización</th>
          <th class="text-left">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in dataArr" :key="index">
          <td>{{ item.grupo }}</td>
          <td>{{ item.especie }}</td>
          <td>{{ item.raza }}</td>
          <td>{{ item.anios }}</td>
          <td>{{ item.peso_aprox }}</td>
          <td>{{ item.descripcion }}</td>
          <td>{{ new Date(item.created).toLocaleString() }}</td>
          <td>{{ new Date(item.updated).toLocaleString() }}</td>
          <td>
            <div class="d-flex flew-row flew-wrap">
              <v-btn
                dark
                size="small"
                class="action"
                color="black"
                :title="`${item.especie} ${item.raza}`"
                @click="deleteReg(item.id)"
              >
                <v-icon color="yellow" class="d-flex justify-center">mdi-delete</v-icon>
              </v-btn>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<style scoped>
.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

@media screen and (max-width: 600px) {
  table {
    width: 100%;
  }
  th, td {
    display: block;
  }
  td {
    border: none;
    position: relative;
    padding-left: 50%;
  }
  td:before {
    position: absolute;
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    content: attr(data-label);
    font-weight: bold;
  }
}
</style>
