<template lang="pug">
  div    
    b-modal#add-user-modal(title="Add user" hide-footer)
      b-list-group-item.p-2(v-for="(user, index) in this.getUsers" :key="index")
        .d-flex
          div
            img.rounded(:src="user.photoLink")
          div.d-flex.justify-content-between.align-items-center.w-100.pl-3
            h5.my-0 {{userFullName(user)}}
            b-icon-plus-square#size-20(@click.prevent="addUser(user)")
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AddUserModal",
  computed: {
    ...mapGetters(["getUsers", "getCurrentProject"])
  },
  methods: {
    ...mapActions(["fetchUsers", "createProjectUser"]),
    userFullName(user) {
      return `${user.firstName}
      ${user.middleName || ""} 
      ${user.surname}`;
    },
    addUser(user) {
      this.createProjectUser({
        projectId: this.getCurrentProject.id,
        userId: user.id
      });
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>

<style scoped>
img {
  width: 35px;
  height: 35px;
  object-fit: cover;
}

#size-20 {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>