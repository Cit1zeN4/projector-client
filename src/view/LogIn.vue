<template lang="pug">
  .bg-img
    .h-100.d-flex.justify-content-center.align-items-center
      .form-block.shadow-lg.rounded.p-4

        b-form(@submit.prevent="onSubmit")
          h4 Log In

          b-form-group#input-group-email(
            label="Email address:" label-for="input-email")
            
            b-form-input#input-email(
              v-model="form.email"
              type="email" required
              placeholder="Enter email")/
              
          b-form-group#input-group-password(
            label="Password" label-for="input-password")

            b-form-input#input-password(
              type="password"
              v-model="form.password"
              required
              placeholder="Enter password")/
          
          .d-flex.justify-content-center
            b-button(type="submit" variant="primary") Submit
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "LogIn",
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  computed: { ...mapGetters(["getError"]) },
  methods: {
    ...mapActions(["login"]),
    onSubmit() {
      this.login({ form: this.form, redirect: this.$router });
    }
  }
};
</script>

<style scoped>
.bg-img {
  background-image: url("../assets/alvaro-reyes-qWwpHwip31M-unsplash.jpg");

  /* Full height */
  height: 100vh;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.form-block {
  background-color: white;
}
</style>
