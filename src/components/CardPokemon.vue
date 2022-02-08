<template>
  <div :style="`background:${pokemon.color}`" class="card-pokemon">
    <div class="box-image">
      <img :src="pokemon.img" alt="" />
    </div>
    <p>{{ pokemon.name }}</p>
  </div>
</template>
<script>
export default {
  props: ["pokemon"],
};
</script>