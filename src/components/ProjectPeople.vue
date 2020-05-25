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
            h3.my-0 {{this.userFullName(this.getCurrentProjectManager)}}
            p.my-0 PM

    AddUserModal/

</template>

<script>
import AddUserModal from "./AddUserModal";
import { mapGetters } from "vuex";

export default {
  name: "ProjectPeople",
  components: {
    AddUserModal
  },
  computed: {
    ...mapGetters(["getCurrentProject", "getCurrentProjectManager"])
  },
  methods: {
    userFullName(user) {
      return `${user.firstName}
      ${user.middleName || ""} 
      ${user.surname}`;
    }
  },
  beforeCreate() {
    this.manager = this.getCurrentProjectManager;
  },
  data() {
    return {
      manager: {}
    };
  }
};
</script>

<style>
img {
  width: 60px;
  height: 60px;
}
</style>