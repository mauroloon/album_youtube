<template>
  <div class="container p-5">
    <h1>Añadir nuevo video</h1>
      <div class="row g-3">
        <div class="col-9">
          <input
            type="text"
            class="form-control"
            placeholder="Añadir"
            v-model="linkVideo"
          />
        </div>
        <div class="col-3 d-grid">
          <button @click="addLink" class="btn btn-primary mb-3">Añadir</button>
        </div>
      </div>
      <Link :links="registerLinks" @delete-link="deleteLink" />
  </div>
</template>

<script setup>
import Link from "./components/Link.vue";
import { ref, onMounted } from "vue";

const registerLinks = ref([]);
const linkVideo = ref("");
const regex =
  /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

const apiKeyYoutube = import.meta.env.VITE_API_KEY_YOUTUBE;
const urlApiGateway = import.meta.env.VITE_URL_API_GATEWAY;
const urlApiGoogle = import.meta.env.VITE_URL_API_GOOGLE;

onMounted(() => {
  loadLinks();
});

/**
 * Carga los links registrados.
 * @author MauroloonDev
 * @since 2024.02.15
 */
const loadLinks = async () => {
  const response = await fetch(urlApiGateway + "/links");
  const data = await response.json();
  registerLinks.value = data.Items;
};

/**
 * Agrega link(video) al album
 * @author MauroloonDev
 * @since 2024.02.15
 */
const addLink = async () => {
  const contenido = linkVideo.value.toString().trim();

  if (contenido === '') {
    console.log("Campo vacío.");
    return
  }
  const match = contenido.match(regex);
  if (match && match[1]) {
    const id = match[1];
    const duplicateLink = registerLinks.value.filter((item) => item.idLink === id)
    if (duplicateLink.length > 0) {
      linkVideo.value = '';
      return 
    }

    const response_youtube = await fetch(
      `${urlApiGoogle}/videos?part=snippet&id=${id}&key=${apiKeyYoutube}`
    );
    const data_youtube = await response_youtube.json();

    const data_link = data_youtube.items[0].snippet;
    const title = data_link.title;
    const description = data_link.description;
    const thumbnails = data_link.thumbnails;

    const response_youtube_details = await fetch(
      `${urlApiGoogle}/videos?part=contentDetails&id=${id}&key=${apiKeyYoutube}`
    );
    const data_youtube_details = await response_youtube_details.json();

    const params = {
      idLink: id,
      title: title,
      description: description,
      thumbnails: thumbnails,
      duration: data_youtube_details.items[0].contentDetails.duration
    };

    const response_add = await fetch(urlApiGateway + "/link", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(params),
    });

    // TODO: agregar mensaje de éxito y agregar nuevo video al array (o cargarlos nuevamente (menos optimo))
    if (response_add.status == 200) {
      registerLinks.value.push(params);
      linkVideo.value = '';
    }
  } else {
    linkVideo.value = '';
    console.log("No se pudo extraer el ID del video.");
  }
};

/**
 * Borra link(video) del album
 * @author MauroloonDev
 * @since 2024.02.15
 */
const deleteLink = async (id) => {
  const response_remove = await fetch(`${urlApiGateway}/link/${id}`, {
    method: "DELETE",
  });

  if (response_remove.status == 200) {
    registerLinks.value = registerLinks.value.filter((item) => item.id !== id);
  }
};
</script>

<style scoped></style>
