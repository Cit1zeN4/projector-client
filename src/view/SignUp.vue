<template lang="pug">
  .bg-img
    .h-100.d-flex.justify-content-center.align-items-center
      .form-block.shadow-lg.rounded.p-4.m-4

        b-form(@submit.prevent="onSubmit")

          h4 Sign Up

          // First name & surname form group
          b-form-group#input-group-name(
            label="Your name:" label-for="input-firstname")

            b-row

              b-col(lg="6" md="6")
                b-form-input#input-firstname(                  
                  v-model="form.firstName"
                  type="text" placeholder="Enter your first name")

              b-col(lg="6" md="6")
                b-form-input.mt-3.mt-md-0#input-surname(
                  v-model="form.surname"
                  type="text" placeholder="Enter your surname")   

          // Email form group
          b-form-group#input-group-email(
            label="Email address:" label-for="input-email")

            b-form-input#input-email(
              v-model="form.email"
              type="email" required
              placeholder="Enter email")
            
          // Password from group
          b-form-group#input-group-password(
            label="Password" label-for="input-password")

            b-row

              b-col(lg="6" md="6")
                b-form-input#input-password(
                  type="password"
                  v-model="form.password"
                  placeholder="Enter password" required)

              b-col(lg="6" md="6")
                b-form-input.mt-3.mt-md-0#confirm-password(
                  type="password" v-model="confim"
                  placeholder="Confirm password" required)

          .d-flex.justify-content-center
            b-button(type="submit" variant="primary") Submit
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SignUp",
  data() {
    return {
      form: {
        firstName: "",
        surname: "",
        email: "",
        password: ""
      },
      confim: ""
    };
  },
  methods: {
    ...mapActions(["signup", "throwError"]),
    onSubmit() {
      if (this.confim === this.form.password)
        this.signup({
          form: this.form,
          redirect: this.$router
          //userId: this.$state.user.id
        });
      else this.throwError(new Error("Passwords are not equal"));
    }
  }
};
</script>

<style scoped>
.bg-img {
  background-image: url("../../public/img/alvaro-reyes-qWwpHwip31M-unsplash.jpg");

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
