<template lang="pug">
  b-modal#create-project-modal(title="Creating project" hide-footer)
    b-form(@submit.prevent="createNewProject()")
      b-form-group#input-group-1(
        label="Name:"
        label-for="input-1"
      )
        b-form-input#input-1(
          type="text" placeholder="Enter project name" required
          v-model="form.projectName"
        )

      b-form-group#input-groupe-2(
        label="Description"
        label-for="input-2"
      )
        b-form-textarea#input-2(
          placeholder="Enter description"
          row="4" v-model="form.projectDescription"
        )

      div.d-flex.justify-content-center
        b-button(type="subbmit" variant="primary") Create
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CreateProjectModal",
  methods: {
    ...mapActions(["createProject"]),
    createNewProject() {
      this.createProject({ form: this.form });
      this.$bvModal.hide("create-project-modal");
      this.form.projectName = "";
      this.form.projectDescription = "";
    }
  },
  computed: {
    ...mapGetters(["getUserId"])
  },
  data() {
    return {
      form: {
        projectName: "",
        projectDescription: "",
        managerId: this.getUserId
      }
    };
  }
};
</script>