<template>
  <div class="cpt-app">
    <div class="menus">
      <router-link to="/">Map</router-link>
      <router-link to="/plugin">Plugin</router-link>
      <router-link to="/marker">Marker</router-link>
      <router-link to="/icon">Icon</router-link>
      <router-link to="/text">Text</router-link>
      <router-link to="/polyline">Polyline</router-link>
      <router-link to="/polygon">Polygon</router-link>
      <router-link to="/bezier-curve">BezierCurve</router-link>
      <router-link to="/circle">Circle</router-link>
      <router-link to="/circle-marker">CircleMarker</router-link>
      <router-link to="/info-window">InfoWindow</router-link>
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: true,
      rightVisible: true,
      message: 'Hello Vue Menu Sidebar'
    }
  }
}
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}
.cpt-app {
  position: relative;
  padding: 20px 10px;
  height: 100%;
  background: #f1f1f1;

  .menus {
    font-size: 24px;
    font-weight: bold;

    a:link,
    a:visited,
    a:hover,
    a:active {
      color: #999;
      text-decoration: none;

      &.router-link-exact-active {
        color: #191919;
        text-decoration: underline;
      }
    }
  }

  .container {
    margin-top: 10px;
    height: 90%;
  }
}
</style>
