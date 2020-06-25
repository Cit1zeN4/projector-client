<template lang="pug">
  div
    div(if="!getAccessError")
      h1.mt-4 People
      b-button.mt-3( v-b-modal.add-user-modal variant="outline-primary"
      v-if="checkRole(getUserRole, 'admin', 'manager')")
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
              img.rounded(:src="defaultImg(user.photoLink)")
            div.d-flex.justify-content-between.w-100.pl-4
              div
                h4.my-0 {{userFullName(user)}}
                p.my-0 {{user.user_project.role}}
              div(v-if="checkRole(getUserRole, 'admin', 'manager')")
                b-dropdown(size="lg"  variant="link" toggle-class="text-decoration-none" no-caret)
                  template(v-slot:button-content)
                    h6: b-icon-three-dots-vertical(variant="dark")
                  b-dropdown-item(v-b-modal.update-user-model @click.prevent="getUser(user)") Edit project role
                  b-dropdown-item(v-b-modal.delete-user-model @click.prevent="getUser(user)") Delete user

      AddUserModal/

      b-modal#delete-user-model(v-if="loaded" ref="delete-user-model" 
        title="Deleting user" hide-footer @hide="clearUserForAction()")
        p Are you sure that you want to delete {{userForAction.firstName}} from project? 
        .d-flex.justify-content-center
          b-button(variant="danger" @click="deleteUser()") Delete 

      b-modal#update-user-model(v-if="loaded" ref="update-user-model" title="Update user" hide-footer)
        b-form(@submit.prevent="updateUserRole()")
          b-form-input(v-model="role")
          .d-flex.justify-content-center.mt-3 
            b-button(type="submit" variant="primary") Update

</template>

<script>
import AddUserModal from "./AddUserModal";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ProjectPeople",
  components: {
    AddUserModal
  },
  computed: {
    ...mapGetters([
      "getCurrentProject",
      "getCurrentProjectManager",
      "getCurrentProjectUsers",
      "getUserRole",
      "getUser"
    ])
  },
  methods: {
    ...mapActions(["deleteProjectUser", "updateUserProjectRole"]),
    checkRole(role, ...accessRole) {
      return accessRole.some(r => r === role);
    },
    userFullName(user) {
      return `${user.firstName}
      ${user.middleName || ""} 
      ${user.surname}`;
    },
    getUser(user) {
      this.userForAction = user;
      this.role = user.user_project.role;
      this.loaded = true;
    },
    clearUserForAction() {
      this.userForAction = {
        id: 0,
        firstName: "",
        user_project: {
          role: "NoRole"
        }
      };
      this.role = "";
      this.loaded = false;
    },
    defaultImg(img) {
      return (
        img ||
        `http://${process.env.VUE_APP_API_HOST}/public/files/img/profile.png`
      );
    },
    deleteUser() {
      console.log(this.userForAction);
      this.deleteProjectUser({
        projectId: this.getCurrentProject.id,
        userId: this.userForAction.id
      });
      this.$refs["delete-user-model"].hide();
    },
    updateUserRole() {
      this.updateUserProjectRole({
        projectId: this.getCurrentProject.id,
        userId: this.userForAction.id,
        role: this.role
      });
      this.role = "";
      this.$refs["update-user-model"].hide();
    }
  },
  data() {
    return {
      loaded: false,
      userForAction: {
        id: 0,
        firstName: "",
        user_project: {
          role: "NoRole"
        }
      },
      role: ""
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