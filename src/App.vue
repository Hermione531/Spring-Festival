<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vvh = window.innerHeight* 0.01
    // // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vvh}px`)

    // // We listen to the resize event
    window.addEventListener('resize', () => {
      // We execute the same script as before
      let vvh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vvh}px`)
      document.body.querySelector("#app").style.height = window.innerHeight + "px";
    })
  },
}

</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  z-index: -9999;
}
</style>
