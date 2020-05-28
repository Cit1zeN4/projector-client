<template lang="pug">
  div
    img#header-img(:src="publicPath('img/markus-winkler-Q2J2qQsoYH8-unsplash.jpg')")
    h1.mt-4 {{getCurrentProject.projectName}}        
    p.mt-3 {{getCurrentProject.projectDescription}}
    p {{'Due Date ' + this.getDate()}}

    .d-flex.justify-content-center
      b-button(v-b-modal.delete-model variant="outline-danger" 
        v-if="checkRole(getUserRole, 'manager', 'admin')") Delete Project
    
    b-modal#delete-model(title="Deleting project" hide-footer)
      p#my-4 
        | Are you sure you really want to delete the project? 
        | If you click Delete, you will not be able to undo this action.
      .d-flex.justify-content-center
        b-button(variant="danger" @click="deleteProject()") Delete
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import parseDate from "../script/readableDate";

export default {
  name: "AboutProject",
  computed: {
    ...mapGetters(["getCurrentProject", "getUserRole"])
  },
  methods: {
    ...mapActions(["deleteProjectById"]),
    checkRole(role, ...accessRole) {
      return accessRole.some(r => r === role);
    },
    deleteProject() {
      this.deleteProjectById({
        redirect: this.$router,
        id: this.getCurrentProject.id
      });
    },
    getDate() {
      return parseDate(this.getCurrentProject.dueDate);
    },
    publicPath(path) {
      return `${process.env.VUE_APP_BASE_URL}${path}`;
    }
  }
};
</script>

<style scoped>
.content #header-img {
  height: 170px;
  width: 100%;
  object-fit: cover;
}
</style>