<template lang="pug">
  div
    div.position-relative
      img#header-img(:src="publicPath('img/markus-winkler-Q2J2qQsoYH8-unsplash.jpg')")
      h1.mt-4 {{getCurrentProject.projectName}}
      hr        
      VueMarkdown.mt-2(:source="getCurrentProject.projectDescription === null ? selectedTask.taskContent = 'Prject description' : getCurrentProject.projectDescription")
      p.mt-3 {{'Due Date ' + this.getDate()}}

      Gantt

      .d-flex.justify-content-center.mt-4
        b-button(v-b-modal.delete-model variant="outline-danger" 
          v-if="checkRole(getUserRole, 'manager', 'admin')") Delete Project
        b-button.ml-2(v-b-modal.edit-modal variant="outline-primary") Edit
      
      b-modal#delete-model(title="Deleting project" hide-footer)
        p#my-4 
          | Are you sure you really want to delete the project? 
          | If you click Delete, you will not be able to undo this action.
        .d-flex.justify-content-center
          b-button(variant="danger" @click="deleteProject()") Delete        

      b-modal#edit-modal(ref="edit-modal" title="Edit project info" hide-footer)
        b-form(@submit.prevent="updateProject()")
          label Project name
          b-form-input(type="text" v-model="getCurrentProject.projectName")
          label.mt-3 Project description
          b-form-textarea(placeholder="Enter description" v-model="getCurrentProject.projectDescription")
          label.mt-3 Due date
          b-form-datepicker(v-model="getCurrentProject.dueDate")
          .d-flex.justify-content-center
            b-button.mt-3(type="submit" variant="primary") Save
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import parseDate from "../script/readableDate";
import VueMarkdown from "vue-markdown";
import Gantt from "../components/Gantt";

export default {
  name: "AboutProject",
  computed: {
    ...mapGetters(["getCurrentProject", "getUserRole"])
  },
  components: {
    VueMarkdown,
    Gantt
  },
  methods: {
    ...mapActions(["deleteProjectById", "updateProjectById"]),
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
    },
    updateProject() {
      this.updateProjectById({
        id: this.getCurrentProject.id,
        form: this.getCurrentProject
      });
      this.$refs["edit-modal"].hide();
    },
    setBefor(val) {
      this.beforeEdit = val;
    }
  },
  data() {
    return {
      beforeEdit: {}
    };
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