<template lang="pug">
  div
    h1 User

    b-button.mb-3.mt-1(v-b-modal.create-user variant="primary") Create user

    b-list-group
      b-list-group-item(v-for="(user, index) in getUsers" :key="index" v-if="user.role")
        .d-flex
          div 
            img.rounded(:src="user.photoLink")
          div.d-flex.justify-content-between.w-100.pl-4
            div
              h4.my-0 {{userFullName(user)}}
              p.my-0(v-if="user.role") {{user.role.roleName}}
            div     
              b-dropdown(v-if="user.id !== getUserId" size="lg"  variant="link" toggle-class="text-decoration-none" no-caret)
                template(v-slot:button-content)
                  h6: b-icon-three-dots-vertical(variant="dark")
                b-dropdown-item(v-b-modal.edit-role @click.prevent="getUser(user)") Change user role
                b-dropdown-item(v-b-modal.delete-user-model @click.prevent="getUser(user)") Delete user

    b-modal#edit-role(ref="edit-role" title="Change user role" hide-footer)
      b-form(@submit.prevent="changeAction")
        b-form-select(v-model="userForAction.roleId" :options="mapGetRoles" require)
        .d-flex.justify-content-center
          b-button.mt-3(type="submit" variant="primary") Save

    b-modal#delete-user-model(ref="delete-user-model" title="Deleting user" hide-footer @hide="clearUserAction")
      p Are you sure that you want to delete {{userForAction.firstName}} ? 
      .d-flex.justify-content-center
        b-button(variant="danger" @click="deleteAction") delete      

    b-modal#create-user(ref="create-user" title="Creating user" hide-footer)
      b-form(@submit.prevent="createUserAction")
        label Photo link
        b-form-input(v-model="newUser.photoLink" placeholder="Enter photo link")

        label.mt-2 First name
        b-form-input(v-model="newUser.firstName" placeholder="Enter first name" require)

        label.mt-2 Middle name
        b-form-input(v-model="newUser.middleName" placeholder="Enter middle name")

        label.mt-2 Surname
        b-form-input(v-model="newUser.surname" placeholder="Enter surname" require)

        label.mt-2 User role
        b-form-select(v-model="newUser.roleId" :options="mapGetRoles" require)

        label.mt-2 Email
        b-form-input(v-model="newUser.email" type="email" placeholder="Enter email" require)

        label.mt-2 Password
        b-form-input(v-model="newUser.password" type="password" placeholder="Enter password" require)

        .d-flex.justify-content-center.mt-3
          b-button(type="submit" variant="primary") Craete


</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AdminUsers",
  computed: {
    ...mapGetters(["getUsers", "getUserId", "getRoles"]),
    mapGetRoles: function() {
      return this.getRoles.map(i => {
        return { value: i.id, text: i.roleName };
      });
    }
  },
  methods: {
    ...mapActions(["deleteUser", "createUser", "updateUser"]),
    deleteAction() {
      this.deleteUser(this.userForAction.id);
      this.$refs["delete-user-model"].hide();
    },
    changeAction() {
      this.updateUser(this.userForAction);
      this.userForAction.role = this.getRoles.find(
        r => r.id === this.userForAction.roleId
      );
      this.$refs["edit-role"].hide();
    },
    createUserAction() {
      this.createUser(this.newUser);
      this.$refs["create-user"].hide();
    },
    userFullName(user) {
      return `${user.firstName}
      ${user.middleName || ""} 
      ${user.surname}`;
    },
    getUser(user) {
      this.userForAction = user;
    },
    clearUserAction() {
      this.userForAction = {};
    },
    clearNewUser() {
      this.newUser = {};
    }
  },
  data() {
    return {
      newUser: {
        roleId: 3
      },
      userForAction: {}
    };
  }
};
</script>

<style scoped>
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