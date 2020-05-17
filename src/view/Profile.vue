<template lang="pug">
  div
    div.container.shadow-lg.px-4.py-1(v-if="isUserAuth")
      b-row.mt-md-5
        b-col.d-flex.d-md-block.justify-content-center(
          xl="3" lg="4" md="6" sm="12")
          img.rounded.user-img.shadow(v-bind:src="getImage")
        b-col
          h1.text-center.mt-3(
            class="text-md-left mt-md-0") 
            | {{userFullName}}

          h5.text-center.mt-3(
            class="text-md-left mt-md-0")
            | {{getEmail}}

      h3.mt-4 Projects
      b-row
        b-col
        b-col
        b-col

      h3.mt-4 Last tasks
      b-row
        b-col
        b-col
        b-col
        
      b-row
        b-col.d-flex.justify-content-end
          b-button.mb-3(variant="outline-danger" @click="logout") Log Out

    div(v-else)
      p Need auth
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Profile",
  computed: {
    ...mapGetters(["userFullName", "getImage", "getEmail", "isUserAuth"])
  },
  methods: {
    ...mapActions(["logout"])
  }
};
</script>

<style scoped>
.user-img {
  object-fit: cover;
  width: 250px;
  height: 250px;
}
</style>