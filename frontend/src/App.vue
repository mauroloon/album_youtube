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
    <Link :links="registerLinks" />
  </div>
</template>

<script setup>
import Link from "./components/Link.vue";
import { ref, onMounted } from "vue";

const registerLinks = ref([]);
const linkVideo = ref("");
const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

const apiKeyYoutube = import.meta.env.VITE_API_KEY_YOUTUBE;
const urlApiGateway = import.meta.env.VITE_URL_API_GATEWAY
const urlApiGoogle = import.meta.env.VITE_URL_API_GOOGLE

onMounted(() => {
  //loadLinks()
});

const loadLinks = async () => {
  const response = await fetch(urlApiGateway+'/links');
  const data = await response.json();
  console.log(data);
  // TODO: insertar datos en variable registerLinks
};

const addLink = async () => {
  const match = linkVideo.value.match(regex);
  if (match && match[1]) {
    const id = match[1];

    const response_youtube = await fetch(`${urlApiGoogle}/videos?part=snippet&id=${id}&key=${apiKeyYoutube}`);
    const data_youtube = await response_youtube.json();

    const data_link = data_youtube.items[0].snippet;
    const title = data_link.title
    const description = data_link.description
    const thumbnails = data_link.thumbnails

    const params = {
      'idLink': id,
      'title': title,
      'description': description,
      'thumbnails': thumbnails
    }
    // TODO: Mandar datos a apigateway mediante post
    console.log(params)

  } else {
    console.log("No se pudo extraer el ID del video.");
  }
};
</script>

<style scoped></style>
