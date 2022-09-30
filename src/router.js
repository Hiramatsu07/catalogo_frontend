import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home"
import NotFound from "@/views/NotFound";
import About from "@/views/About";
import Catalogo from "@/views/Catalogo";
import Add from '../src/components/Add';
import catalogo_adm from '@/views/Catalogo_Adm';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '',
      name: 'home',
      component: Home
    },
    {
      path: '/catalogo',
      name: 'catalogo',
      component: Catalogo
    },
    {
      path: '/catalogo_adm',
      name: 'catalogo_adm',
      component: catalogo_adm
    },
    {
      path: '/add',
      name: 'editProd',
      component: Add
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/404',
      component: NotFound
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
});

export default router
