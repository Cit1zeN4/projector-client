<template lang="pug">
  div
    NavBar/
    .container.shadow-lg.mt-5.px-4.py-1.rounded
      h2.mt-4 Projects
      b-row.my-4
        b-col(lg="3" md="6")
          b-card.shadow(title="Project 1")
            b-card-text.text-truncate
              | some text
</template>

<script>
import NavBar from "../components/NavBar.vue";
export default {
  name: "ProjectList",
  components: {
    NavBar
  }
};
</script>

<style scoped>
.card {
  cursor: pointer;
}
</style>
