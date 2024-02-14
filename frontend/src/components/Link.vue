<template>
  <div class="row">
    <div class="col-4" v-for="item in links" :index="item.id" >
      <img
        :src="item.src"
        class="rounded"
        height="200"
        width="200"
      />
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    links: Array
  })
</script>
