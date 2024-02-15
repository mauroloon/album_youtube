<template>
  <div class="container">
    <h1>Añadir nuevo video</h1>
    <div class="row g-3">
      <div class="col-auto">
        <label for="inputPassword2" class="visually-hidden">Añadir</label>
        <input
          type="text"
          class="form-control"
          id="inputPassword2"
          placeholder="Añadir"
          v-model="linkVideo"
        />
      </div>
      <div class="col-auto">
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
const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

const apiKeyYoutube = import.meta.env.VITE_API_KEY_YOUTUBE;
const urlApiGateway = import.meta.env.VITE_URL_API_GATEWAY;
const urlApiGoogle = import.meta.env.VITE_URL_API_GOOGLE;

onMounted(() => {
  loadLinks();
});

const loadLinks = async () => {
  const response = await fetch(urlApiGateway + "/links");
  const data = await response.json();
  registerLinks.value = data.Items;
};

const addLink = async () => {
  const match = linkVideo.value.match(regex);
  if (match && match[1]) {
    const id = match[1];

    const response_youtube = await fetch(
      `${urlApiGoogle}/videos?part=snippet&id=${id}&key=${apiKeyYoutube}`
    );
    const data_youtube = await response_youtube.json();

    const data_link = data_youtube.items[0].snippet;
    const title = data_link.title;
    const description = data_link.description;
    const thumbnails = data_link.thumbnails;

    const params = {
      idLink: id,
      title: title,
      description: description,
      thumbnails: thumbnails,
    };

    // TODO: Mandar datos a apigateway mediante post
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
    }
  } else {
    console.log("No se pudo extraer el ID del video.");
  }
};

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
