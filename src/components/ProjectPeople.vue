<template lang="pug">
  div
    h1.mt-4 People
    b-button.mt-3( v-b-modal.add-user-modal variant="primary")
        div
          b-icon-plus-square.mr-2
          span Add

    h4.mt-4 Projec Manager
    b-list-group.mt-4
      b-list-group-item
        .d-flex
          div
            img.rounded
          div.w-100.px-4
            h3.my-0 Name
            p.my-0 Roles

    AddUserModal/

</template>

<script>
import AddUserModal from "./AddUserModal";

export default {
  name: "ProjectPeople",
  components: {
    AddUserModal
  }
};
</script>

<style>
img {
  width: 60px;
  height: 60px;
}
</style>