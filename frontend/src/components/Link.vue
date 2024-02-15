<template>
  <div class="row">
    <div class="col-4 pb-4" v-for="item in links" :index="item.id">
      <div class="image-container">
        <img
          :src="chooseImg(item.thumbnails)"
          class="img-link"
          height="480"
          width="640"
          alt="Descripción de la imagen"
          @click="openModal(item)"
        />
        <button type="button" class="btn btn-dark close" @click="openModalDelete(item.id)">
          <img class="icon-delete" src="/static/icons/x-white.svg" alt="Icono X">
        </button>
      </div>
    </div>
  </div>
  <!-- Modal Detalle -->
  <ModalComponent
    :isOpen="modalDescription"
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

  <!-- Modal eliminar -->
  <ModalComponent
    :isOpen="modalDelete"
    @modal-close="closeModalDelete"
    name="second-modal"
  >
    <template #content>
      <div>
        <p>¿Seguro que quieres eliminar este video?</p>
      </div>
    </template>
    <template #footer>
      <div class="row">
        <div class="col">
          <button
            type="button"
            class="btn btn-outline-primary"
            @click="closeModalDelete"
          >
            Cancelar
          </button>
        </div>
        <div class="col">
          <button type="button" class="btn btn-primary" @click="emitDelete">
            Eliminar
          </button>
        </div>
      </div>
    </template>
  </ModalComponent>
</template>

<script setup>
import ModalComponent from "./Modal.vue";
import { ref } from "vue";

const modalDescription = ref(false);
const modalDelete = ref(false);
const linkSelectedData = ref(null);
const idLinkSelected = ref("");
const emit = defineEmits(["delete-link"]);

const props = defineProps({
  links: Array,
});

/**
 * Abre modal de detalle
 * @author MauroloonDev
 * @since 2024.02.15
 */
const openModal = (item) => {
  modalDescription.value = true;
  linkSelectedData.value = {
    link: `https://www.youtube.com/embed/${item.idLink}`,
    title: item.title,
    description: item.description,
    src: item.thumbnails.default.url,
  };
};

/**
 * Cierra modal de detalle.
 * @author MauroloonDev
 * @since 2024.02.15
 */
const closeModal = () => {
  modalDescription.value = false;
  linkSelectedData.value = null;
};

/**
 * Abre modal para eliminar video.
 * @author MauroloonDev
 * @since 2024.02.15
 */
const openModalDelete = (id) => {
  modalDelete.value = true;
  idLinkSelected.value = id;
};

/**
 * Cierra modal para eliminar video.
 * @author MauroloonDev
 * @since 2024.02.15
 */
const closeModalDelete = () => {
  modalDelete.value = false;
  idLinkSelected.value = "";
};

/**
 * Envía id a eliminar
 * @author MauroloonDev
 * @since 2024.02.15
 */
const emitDelete = () => {
  emit("delete-link", idLinkSelected.value);
  closeModalDelete();
};

/**
 * Selecciona img con mejor calidad
 * @author MauroloonDev
 * @since 2024.02.15
 */
const chooseImg = (item) => {
  if(item.standard) {
    return item.standard.url
  }

  return item.default.url
}
</script>

<style scoped>
.img-link {
  max-width: 100%;
  height: auto;
}

.image-container {
  position: relative;
}
.close {
  position: absolute;
  top: 0;
  right: 0;
}
.icon-delete {
  height: 15px;
}
</style>
