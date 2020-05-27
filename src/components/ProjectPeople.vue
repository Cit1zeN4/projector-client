<template lang="pug">
  div
    h1.mt-4 People
    b-button.mt-3( v-b-modal.add-user-modal variant="primary")
        div
          b-icon-plus-square.mr-2
          span Add
    
    h4.mt-4 Project Manager    
    b-list-group.mt-4
      b-list-group-item
        .d-flex
          div 
            img.rounded(:src="this.getCurrentProjectManager.photoLink")
          div.w-100.px-4
            h3.my-0 {{userFullName(this.getCurrentProjectManager)}}
            p.my-0 PM
    h4.mt-4 Users   
    b-list-group.mt-4
      b-list-group-item(v-for="(user, index) in this.getCurrentProjectUsers" :key="index")
        .d-flex
          div 
            img.rounded(:src="user.photoLink")
          div.d-flex.justify-content-between.w-100.pl-4
            div
              h3.my-0 {{userFullName(user)}}
              p.my-0 {{user.user_project.role}}
            div
              b-dropdown(size="lg"  variant="link" toggle-class="text-decoration-none" no-caret)
                template(v-slot:button-content)
                  h6: b-icon-three-dots-vertical(variant="dark")
                b-dropdown-item Edit project role
                b-dropdown-item(v-b-modal.delete-user-model @click.prevent="getUser(user)") Delete user

    AddUserModal/

    b-modal#delete-user-model(ref="delete-user-model" title="Deleting user" hide-footer @hide="clearUserForAction()")
      p#my-4 
        | Are you sure that you want to delete {{userForAction.firstName}} from project? 
      .d-flex.justify-content-center
        b-button(variant="danger" @click="deleteUser()") Delete

</template>

<script>
import AddUserModal from "./AddUserModal";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "ProjectPeople",
  components: {
    AddUserModal
  },
  computed: {
    ...mapGetters([
      "getCurrentProject",
      "getCurrentProjectManager",
      "getCurrentProjectUsers"
    ])
  },
  methods: {
    ...mapActions(["deleteProjectUser"]),
    ...mapMutations(["deleteUserFromProject"]),
    userFullName(user) {
      return `${user.firstName}
      ${user.middleName || ""} 
      ${user.surname}`;
    },
    getUser(user) {
      this.userForAction = user;
    },
    clearUserForAction() {
      this.userForAction = {};
    },
    deleteUser() {
      this.deleteProjectUser({
        projectId: this.getCurrentProject.id,
        userId: this.userForAction.id
      });
      this.deleteUserFromProject(this.userForAction.id);
      this.$refs["delete-user-model"].hide();
    }
  },
  data() {
    return {
      userForAction: {}
    };
  }
};
</script>

<style>
img {
  width: 60px;
  height: 60px;
  object-fit: cover;
}
.list-group-item {
  padding: 0.75rem;
}
.dropdown-toggle {
  padding: 0;
}
</style>