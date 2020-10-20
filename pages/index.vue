<template>
  <div class="container">
    <b-list-group
      style="position: fixed; top: 0%;"
    >
      <b-list-group-item
        v-for="a in added"
        :key="`added-${a.id}`"
      >
        {{ a }}
      </b-list-group-item>
    </b-list-group>
    <tree @add-gift="added.push($event)" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      added: []
    }
  }
}
</script>

<style>
body {
  background-color: #1e5353;
  width: 100%;
}
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
