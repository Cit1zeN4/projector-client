<template lang="pug">
  div
    b-navbar.bg-color-main(
      toggleable="lg" type="dark" 
      variant="dark")

      b-navbar-brand(to="/") Projector
      NavLinks.ml-auto(navbar)/
      b-nav-toggle(target="sidebar-1")

    b-sidebar.d-lg-none( 
      id="sidebar-1" bg-variant="dark" 
      text-variant="light" right shadow backdrop)
      
      .px-4 
        NavLinks/

        slot(name="sidebar-x-content")

</template>

<script>
import NavLinks from "@/components/NavLinks.vue";

export default {
  name: "NavBar",
  components: {
    NavLinks
  }
};
</script>

<style scoped>
.b-avatar {
  cursor: pointer;
}

</style>
