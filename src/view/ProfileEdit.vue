<template lang="pug">
  div
    NavBar/
    .container.shadow-lg.mt-5.px-4.py-1.rounded(v-if="isUserAuth")
      b-form(@submit.prevent="updateUserAction()")
        b-row.mt-5
          b-col.d-flex.d-md-block.justify-content-center(
            xl="3" lg="4" md="6" sm="12")
            img.rounded.user-img.shadow(v-bind:src="getImage")
          b-col
            b-row.mt-4.mt-md-0
              b-col(cols="12")
                b-form-group#input-group-1(
                  label="Photo link:"
                  label-for="input-1")      
                    b-form-input#input-1(
                    type="text"
                    v-model="form.photoLink"
                    placeholder="Enter photolink")

              b-col(cols="12")
                b-form-group#input-group-1(
                  label="First name:"
                  label-for="input-1")      
                    b-form-input#input-1(
                    type="text"
                    v-model="form.firstName"
                    placeholder="Enter first name")
              
              b-col(cols="12")
                b-form-group#input-group-1(
                  label="Middle name:"
                  label-for="input-1")      
                    b-form-input#input-1(
                    type="text"
                    v-model="form.middleName"
                    placeholder="Enter middle name")
              
              b-col(cols="12")
                b-form-group#input-group-1(
                  label="Surname:"
                  label-for="input-1")      
                    b-form-input#input-1(
                    type="text"
                    v-model="form.surname"
                    placeholder="Enter surname")

        b-row.mt-5
          b-col.d-flex.justify-content-center
            b-button.mb-3.mr-2(type="submit" variant="outline-primary") Save
            b-button.mb-3.mr-2(variant="outline-danger" @click="toProfile()") Cancle

    div.mt-3(v-else)
      NoAuth/
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NavBar from "@/components/NavBar.vue";
import NoAuth from "@/components/NoAuth.vue";

export default {
  name: "ProfileEdit",
  components: { NavBar, NoAuth },
  computed: {
    ...mapGetters(["isUserAuth", "getImage", "getUserId", "getUserForm"])
  },
  methods: {
    ...mapActions(["updateUserInfo"]),
    updateUserAction() {
      this.updateUserInfo({
        form: this.form,
        redirect: this.$router,
        userId: this.getUserId
      });
    },
    toProfile() {
      this.$router.push("/user/profile");
    }
  },
  data() {
    return {
      form: {
        firstName: "",
        surname: "",
        middleName: "",
        photoLink: ""
      }
    };
  },
  mounted() {
    this.form = this.getUserForm;
  }
};
</script>

<style scoped>
.user-img {
  object-fit: cover;
  width: 250px;
  height: 250px;
}
</style>