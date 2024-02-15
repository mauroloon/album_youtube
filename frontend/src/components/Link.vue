<template>
  <div class="row">
    <div class="col-4 pb-4" v-for="item in links" :index="item.id">
      <img
        :src="item.thumbnails.standard.url"
        class="img-link"
        @click="openModal(item)"
      />
      <br />
      <div class="d-grid">
        <button
          type="button"
          class="btn btn-danger"
          @click="emit('delete-link', item.id)"
        >
          Eliminar
        </button>

      </div>
    </div>
  </div>
  <ModalComponent
    :isOpen="isModalOpened"
    @modal-close="closeModal"
    name="first-modal"
  >
    <template #content>
      <div class="row">
        <div class="col">
          <iframe
            width="500"
            height="400"
            :src="linkSelectedData.link"
          ></iframe>
        </div>
        <div class="col">
          <h3>{{ linkSelectedData.title }}</h3>
          <br />
          <p>{{ linkSelectedData.description }}</p>
        </div>
      </div>
    </template>
  </ModalComponent>
</template>

<script setup>
import ModalComponent from "./Modal.vue";
import { ref } from "vue";

const isModalOpened = ref(false);
const linkSelectedData = ref(null);
const emit = defineEmits(["delete-link"]);

const props = defineProps({
  links: Array,
});

const openModal = (item) => {
  isModalOpened.value = true;
  linkSelectedData.value = {
    link: `https://www.youtube.com/embed/${item.idLink}`,
    title: item.title,
    description: item.description,
    src: item.thumbnails.standard.url,
  };
};
const closeModal = () => {
  isModalOpened.value = false;
  linkSelectedData.value = null;
};
</script>

<style scoped>
.img-link {
  max-width: 100%;
  height: auto;
}
</style>