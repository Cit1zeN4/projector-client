<template lang="pug">
  div.bg-img
    NavBar/
    #lab.d-flex.flex-column.align-items-center.mt-5
      h1.mt-5 Projector
      p Make your projects better
</template>

<script>
import NavBar from "../components/NavBar";

export default {
  name: "Main",
  components: { NavBar },
  methods: {
    publicPath(path) {
      return `${process.env.VUE_APP_BASE_URL}${path}`;
    }
  }
};
</script>

<style scoped>
.bg-img {
  background-image: url("../../public/img/main-bg.jpg");

  /* Full height */
  height: 100vh;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

#lab h1 {
  color: white;
}

#lab p {
  color: white;
}

#gh {
  width: 100vw;
  bottom: 0px;
}

#s50 {
  height: 30px;
}

#pointer {
  cursor: pointer;
  color: black;
  text-decoration: none;
}
</style>
