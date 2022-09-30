<template>
    <div>
    <div class="box ">
    <div class="field">
    <label class="label">Nombre</label>
    <div class="control">
    <input class="input" type="text" v-model="newProd.nombre" placeholder="Nombre del producto" required>
    </div>
    </div>

    <div class="field">
    <label class="label">Descripcion</label>
    <div class="control">
        <input class="input" type="text" v-model="newProd.descripcion" placeholder="Descripcion de la tarea" required>
    </div>
    </div>

    <div class="field">
    <label class="label">Estado</label>
    <div class="control">
        <input class="input" type="text" v-model="newProd.estado" placeholder="Estado del producto" required>
    </div>
    </div>



    <div class="field">
    <label class="label">Precio</label>
    <div class="control">
        <input class="input" type="text" v-model="newProd.precio" placeholder="Precio del producto" required>
    </div>
    </div>

    <div class="field">
    <label class="label">Id del proveedor</label>
    <div class="control">
        <input class="input" type="text" v-model="newProd.proveedor_id" placeholder="Id del proveedor del producto" required>
    </div>
    </div>

    <div class="field">
    <label class="label">Id de la categoria</label>
    <div class="control">
        <input class="input" type="text" v-model="newProd.categoria_id" placeholder="Id de la categoria del producto" required>
    </div>
    </div>

    <div class="field is-grouped">
    <div class="control">
        <button class="button is-link" id="submitButton" @click.prevent="add">Añadir</button>
    </div>
    <div class="control">
        <button class="button is-text" @click.prevent="cancelar">Cancelar</button>
    </div>
    </div>
    </div>
    </div>
</template>


<script>
import axios from 'axios';
export default{
    name:"addProd",
    data() {
        return{
            newProd: {
                descrip: null,
                status: null,
                estado: null,
                nombre: null,
                precio: null,
                categoria_id: null,
                proveedor_id: null,
            }
        }
    },
    mounted(){
        this.Prod = {}
    },
    methods: {
            cancelar() {
                this.$router.push({name: "catalogo_adm"})
            },
            add() {
                axios.post(`http://localhost:5000/api/products`, this.newProd)
          .then(()=>{
            this.$router.push({name: "catalogo_adm"})
          })
          .catch((error) => {
            console.log(error);
          })
            }
        }
}
</script>

<style scoped>

</style>