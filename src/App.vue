<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useProductStore } from '@/stores/ProductStore'
import { useCartStore } from '@/stores/CartStore'

const productStore = useProductStore();
const cartStore = useCartStore();
  // store.$onAction(({name,store,args,after,onError})=> {
  //   if(name === 'addItems'){
  //   after(() => {
  //       console.log(args[0])
  //   })
  //   }
  //   })
productStore.fill();
</script>

<template>
  <div class="container">
    <TheHeader />
    <div class="mb-5 flex justify-end">
         <app-button @click="cartStore.undo"> Undo </app-button>
         <app-button @click="cartStore.redo" class="ml-2"> Redo </app-button>
    </div>
   
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in productStore.products"
        :key="product.name"
        :product="product"
        @addToCart="cartStore.addItems($event, product)"
      />
    </ul>
  </div>
</template>
