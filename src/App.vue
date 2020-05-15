<template lang="pug">
  div
    .position-absolute.w-100
      b-alert(
        :show="getError.error" 
        dismissible fade 
        variant="danger")
        
        h4.alert-heading {{getError.name}}

        p {{getError.message}}

        template(slot="dismiss")
          button.close(@click="closeError()")
            b-icon-x/
    router-view/
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "App",
  computed: { ...mapGetters(["getError", "userFullName"]) },
  methods: { ...mapActions(["closeError", "auth"]) },
  mounted() {
    this.auth();
  }
};
</script>

<style scoped>
.alert {
  z-index: 99;
}
</style>
