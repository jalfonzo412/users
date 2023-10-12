<script setup>
const { API_HOST, API_ROUTE, API_PORT } = useRuntimeConfig().public

const dataArr = ref([])

// GET ALL
async function getData () {
  await useFetch(`${API_HOST}:${API_PORT}${API_ROUTE}/animals`)
    .then((res) => {
      if (res.data.value) {
        dataArr.value = res.data.value
      }
    })
}

const specific_animal = ref([])
const nameEntered = ref('')

// GET BY NAME
const getByName = (value) => {
  specific_animal.value = dataArr.value.filter((e) => {
    const { especie, raza } = e
    const searchValue = value.toLowerCase()
    return especie.toLowerCase().includes(searchValue) || raza.toLowerCase().includes(searchValue)
  })
}

const animal = computed(() => {
  return specific_animal.value.length === 0 ? dataArr.value : specific_animal.value
})

const dialogCreate = ref(false)

const closeCreate = () => {
  dialogCreate.value = !dialogCreate.value
  getData()
}

async function decrement (_id, _cantidad) {
  await useFetch(`${API_HOST}:${API_PORT}${API_ROUTE}/animals/${_id}`, {
    method: 'PATCH',
    body: {
      cantidad: _cantidad - 1
    }
  })
  getData()
}

async function increment (_id, _cantidad) {
  await useFetch(`${API_HOST}:${API_PORT}${API_ROUTE}/animals/${_id}`, {
    method: 'PATCH',
    body: {
      cantidad: _cantidad + 1
    }
  })
  getData()
}

const dialogUpdate = ref(false)
const idToUp = ref('')

const closeUpdate = () => {
  dialogUpdate.value = !dialogUpdate.value
  getData()
}

const dialogDelete = ref(false)

const closeDelete = () => {
  dialogDelete.value = !dialogDelete.value
  getData()
}

// Pagination
const ITEMS_PER_PAGE = 7
const currentPage = ref(1)

const pages = computed(() => Math.ceil(animal.value.length / ITEMS_PER_PAGE))
const animalsPage = computed(() => {
  const init = (currentPage.value - 1) * ITEMS_PER_PAGE
  return animal.value.slice(init, init + ITEMS_PER_PAGE)
})

getData()
</script>

<template>
  <div class="section-search-add">
    <v-text-field
      v-model="nameEntered"
      class="text-field"
      hide-details
      placeholder="Buscar talento"
      prepend-icon="mdi-magnify"
      single-line
      @keyup.enter="getByName(nameEntered)"
    />
    <v-spacer />
    <v-btn class="bottom-add" dark>
      <v-icon start size="large" icon="mdi-plus" />
      Agregar
      <v-dialog
        v-model="dialogCreate"
        persistent
        activator="parent"
        width="750"
      >
        <CreatedModal @dialogCreate="closeCreate" @new-animal="dataArr.push($event)" />
      </v-dialog>
    </v-btn>
  </div>
  <div class="table-container">
    <v-table fixed-header height="435px">
      <thead>
        <tr>
          <th>Grupo</th>
          <th>Especie</th>
          <th>Raza</th>
          <th>Años</th>
          <th>Peso aproximado kg.</th>
          <th>Cantidad</th>
          <th>Costo c/u</th>
          <th>Fecha de creación</th>
          <th>Ultima actualización</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in animalsPage" :key="index">
          <td>{{ item.grupo }}</td>
          <td>{{ item.especie }}</td>
          <td>{{ item.raza }}</td>
          <td>{{ item.anios }}</td>
          <td>{{ item.peso_aprox }}</td>
          <td>
            <div class="mod-cantidad">
              <v-btn
                icon="mdi-minus"
                size="x-small"
                variant="text"
                class="decrement"
                @click="decrement(item.id, item.cantidad)"
              />
              {{ item.cantidad }}
              <v-btn
                icon="mdi-plus"
                size="x-small"
                disabled
                variant="text"
                class="increment"
                @click="increment(item.id, item.cantidad)"
              />
            </div>
          </td>
          <td>{{ item.valor_x_unidad }}</td>
          <td>{{ new Date(item.created).toLocaleString() }}</td>
          <td>{{ new Date(item.updated).toLocaleString() }}</td>
          <td>
            <div class="section-bottoms">
              <v-btn
                dark
                size="small"
                color="black"
                class="mr-2"
                :title="`${item.especie} ${item.raza}`"
                @click="idToUp=item.id"
              >
                <v-icon color="#FFEA00">
                  mdi-pencil
                </v-icon>
                <v-dialog
                  v-model="dialogUpdate"
                  activator="parent"
                  max-width="450px"
                >
                  <UpdateModal :idToUp="idToUp" @dialogUpdate="closeUpdate" />
                </v-dialog>
              </v-btn>
              <v-btn
                dark
                size="small"
                color="black"
                :title="`${item.especie} ${item.raza}`"
                @click="idToUp=item.id"
              >
                <v-icon color="#FFEA00">
                  mdi-delete
                </v-icon>
                <v-dialog
                  v-model="dialogDelete"
                  activator="parent"
                  max-width="500px"
                >
                  <DeleteModal :idToUp="idToUp" @dialogDelete="closeDelete" />
                </v-dialog>
              </v-btn>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
    <div class="pagination">
      <v-pagination v-model="currentPage" :length="pages" />
    </div>
  </div>
</template>

<style scoped>
.section-search-add {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  padding: 25px;
}

.bottom-add {
  background: black;
  color: #FFEA00;
  font-weight: 700;
  z-index: 1;
}

.table-container {
  overflow-x: auto;
  z-index: 100;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.mod-cantidad {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.decrement {
  color: #D50000;
  margin-right: 5px;
}

.increment {
  color: #1DE9B6;
  margin-left: 5px;
}

.section-bottoms {
  display: flex;
  flex-direction: row;
}

.pagination {
  text-align: center;
  margin-bottom: 32px;
  z-index: 1 !important;
}

/* Estilos para pantallas más pequeñas */
@media screen and (max-width: 960px) {
  .section-search-add {
    flex-direction: column;
    align-items: flex-start;
  }

  .text-field {
    width: 100%;
    margin-bottom: 16px;
  }

  .bottom-add {
    margin-top: 16px;
  }

  .table-container {
    overflow-x: auto;
    width: 100%;
  }

  table {
    width: 100%;
  }

  th,
  td {
    display: block;
    width: 100%;
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
