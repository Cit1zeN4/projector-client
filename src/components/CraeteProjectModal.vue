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

      b-form-group#input-group-2(
        label="Description"
        label-for="input-2"
      )
        b-form-textarea#input-2(
          placeholder="Enter description"
          row="4" v-model="form.projectDescription"
        )

      b-form-group#input-group-3(
        label="Due Date"
        label-for="input-3"
      )
        b-form-datepicker#input-3(
          required
          v-model="form.dueDate"
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
      this.form.dueDate = null;
    }
  },
  computed: {
    ...mapGetters(["getUserId"])
  },
  mounted() {
    this.form.managerId = this.getUserId;
  },
  data() {
    return {
      form: {
        projectName: "",
        projectDescription: "",
        dueDate: "",
        managerId: null
      }
    };
  }
};
</script>