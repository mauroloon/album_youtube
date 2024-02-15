<template>
  <div class="row">
    <div class="col-4" v-for="item in links" :index="item.id">
      <img
        :src="item.thumbnails.standard.url"
        class="rounded"
        height="200"
        width="200"
        @click="openModal(item)"
      />
      <br>
      <button type="button" class="btn btn-danger" @click="emit('delete-link', item.id)">Eliminar</button>
    </div>
  </div>
  <ModalComponent :isOpen="isModalOpened" @modal-close="closeModal" name="first-modal">
    <!-- <template #header>Custom header</template> -->
    <template #content>
      <div class="row">
        <div class="col">
          <img 
          :src="linkSelectedData.src"
          class="rounded"
          height="200"
          width="200"
          />
        </div>
        <div class="col">
          <h3> {{ linkSelectedData.title }} </h3>
          <br>
          <p> {{ linkSelectedData.description }}</p>
        </div>
      </div>
    </template>
    <!-- <template #footer>Custom content</template> -->
  </ModalComponent>
</template>

<script setup>
import ModalComponent from "./Modal.vue";
import { ref } from "vue";

const isModalOpened = ref(false);
const linkSelectedData = ref(null)
const emit = defineEmits(["delete-link"]);

const props = defineProps({
  links: Array,
});

const openModal = (item) => {
  isModalOpened.value = true;
  linkSelectedData.value = {
    'title': item.title,
    'description': item.description,
    'src': item.thumbnails.standard.url,
  }
};
const closeModal = () => {
  isModalOpened.value = false;
  linkSelectedData.value = null;
};
</script>
