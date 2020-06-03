<template lang="pug">
  div
    NavBar/
    .container.shadow-lg.mt-5.px-4.py-1.rounded(v-if="isUserAuth")
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

      b-row
        b-col.d-flex.justify-content-end
          b-button.mb-3.mr-2(variant="outline-primary" @click="openEdit") Edit
          b-button.mb-3(variant="outline-danger" @click="logoutAction") Log Out

    div.mt-3(v-else)
      NoAuth/
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NavBar from "../components/NavBar.vue";
import NoAuth from "../components/NoAuth.vue";

export default {
  name: "Profile",
  computed: {
    ...mapGetters(["userFullName", "getImage", "getEmail", "isUserAuth"])
  },
  methods: {
    ...mapActions(["logout"]),
    logoutAction() {
      this.logout(this.$router);
    },
    openEdit() {
      this.$router.push("/user/profile/edit");
    }
  },
  components: {
    NavBar,
    NoAuth
  }
};
</script>

<style scoped>
.user-img {
  object-fit: cover;
  width: 250px;
  height: 250px;
}

.card {
  max-width: 300px;
}

#task-name {
  max-width: 210px;
  max-height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>