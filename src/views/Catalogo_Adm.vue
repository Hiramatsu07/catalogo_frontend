<template>
  <div>
  <!--Cabecera-->
    <section class="hero is-small is-link">
    <div class="hero-body">
        <p class="title">
        Catálogo (administrativo)
        </p>
        <p class="subtitle">
        Aquí se muestra la lista de productos disponibles actualmente
        </p>
    </div>
    </section>
  <!--Búscador y filtros-->
  <div class="search-area">
    <nav class="level">
      <!-- Left side -->
      <form class="level-left" @submit.prevent="searchProd">
        <div class="level-item">
          <div class="field has-addons">
            <p class="control is-expanded">
              <input class="input" type="text" placeholder="búsqueda de productos..." style="min-width: calc(45vw)" v-model='buscador'>
            </p>
            <p class="control">
              <button class="button is-link">
                Buscar
              </button>
            </p>
          </div>
        </div>
      </form>
    </nav>
  </div>

      <!-- Right side -->
    <div>
      <nav>
      <div class="level-right">
        <div class="level-item">
          <p class="subtitle is-5">
            <strong>Filtrar por</strong> Categoría
          </p>
        </div>
        <div class="select is-link">
          <select>
            <option v-for="(categoria, index) in categoriaList" :key="index">{{ categoria.descripcion }}</option>
          </select>
        </div>
      </div>
    </nav>
  </div>

  <!--Listado de productos-->
  <div class="list-catalogo">
    <div class="columns is-multiline">
      <div class="column is-one-quarter" v-for="product in productList" :key="product.id">
        <div class="container">

          <div class="card">

            <header class="card-header">
              <p class="card-header-title">
                {{ product.nombre }}
              </p>
              <button class="card-header-icon" aria-label="more options" data-tooltip="Mostrar detalle">
                <span class="icon">
                  <font-awesome-icon icon="eye" aria-hidden="true"/>
                </span>
              </button>
            </header>

            <div class="card-content">
              <div class="content">
                <img src="../assets/images/generic-product.png" width="150" class="image-product"
                     :alt="product.nombre"/>
                <p v-if="product.descripcion"><strong>Descripción: </strong> {{ product.descripcion }} </p>
                <p v-if="product.estado"><strong>Estado: </strong> {{ product.estado }} </p>
                <p v-if="product._categoria.descripcion"><strong>Categoria: </strong>
                  {{ product._categoria.descripcion }} </p>

              </div>
            </div>

            <nap class="'level is-mobile'">
                  <div class="level is-right">
                    <button class="button is-link" @click.prevent="edit(product)">
                      Editar
                    </button>
                    <button class="button is-link" @click.prevent="del(product)">
                      Eliminar
                  </button>
                  </div>
                </nap>

          </div>

        </div>
      </div>
    </div>
  </div>

  <!--Paginador-->
  <div class="pagination-area">
    <PaginationComponent :page="pagination.page" :pages="pagination.pages" @selected="(page) => searchProducts(page)"></PaginationComponent>
  </div>

  <div class="pageloader is-bottom-to-top is-link" style="opacity: 0.8" :class="{'is-active': loading}"><span class="title">Cargando productos...</span></div>

</div>
</template>

<script>
import {HTTP} from '@/http'
import PaginationComponent from "../components/PaginationComponent";
import axios from 'axios';

export default {
name: "catalogo_adm",
components: { PaginationComponent },
data() {
  return {
    buscador: null,
    loading: false,
    search: {
    },
    pagination: {
      page: 1,
      pages: 1
    },
    productList: [],
    categoriaList: []
  }
},
mounted() {
  this.searchProducts();
  this.getCategorias();
},
methods: {
      add(){
        this.$router.push({name:'addProd'})
      },
      edit(instance){
        this.$router.push({ name: 'editProd', query:{inst:instance}})
      },
      del(instance) {
        axios.delete(`http://localhost:5000/api/products/${instance.id}`)
          .then(()=>{
            this.searchProducts();
          })
          .catch((error) => {
            console.log(error);
            this.searchProducts();
          })
      },
  async searchProducts(page) {
    this.loading = true;
    this.search.id = this.buscador
    try {
      let data = (await HTTP.post(`/search/products`,this.search,{
        params: {
          page: page ? page : 1
        }
      })).data;
      if (data.items) {
        this.productList = data.items;
        this.pagination.page = data.page;
        this.pagination.pages = data.pages;
      } else {
        this.productList = data;
        this.pagination = {};
      }
    } catch (error) {
      //eslint-disable-next-line no-prototype-builtins
      if (!error.hasOwnProperty('response')) {
        this.notificar('error', this.title, 'Ha ocurrido un error inesperado. Error: ' + error);
      }
      if (error.response.status !== 404) {
        this.notificar('error', this.title, 'No se han podido obtener la lista de proyectos. Error: ' + error);
      }
      this.productList = [];
    } finally {
      this.loading = false;
    }
  },
  //async hace una llamada a un servicio y esperar a que este responda
  async getCategorias() {
    try {
      let data = (await HTTP.get(`/categories/`)).data;
      if (data.items) {
        this.categoriaList = data.items;
      } else {
        this.categoriaList = data;
      }
      // Se agrega al principio la opción 'Todos'
      this.categoriaList = [{descripcion: 'Todos'}, ...this.categoriaList];
    } catch (error) {
      this.categoriaList = [];
    }
  }
},
}

</script>

<style scoped>
.list-catalogo {
margin: 50px;
}

.image-product {
display: block;
margin-left: auto;
margin-right: auto;
margin-bottom: 10px;
width: 50%;
}

.search-area {
margin-top: 20px;
margin-left: 50px;
margin-right: 50px;
}

.pagination-area{
margin: 3%;
}
</style>
