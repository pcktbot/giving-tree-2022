<template>
  <b-modal
    ref="register"
    id="register"
    @ok="$emit('registration', { email, name })"
  >
    <b-input-group prepend="Name">
      <b-form-input v-model="name" />
    </b-input-group>
    <b-input-group prepend="Email">
      <b-form-input v-model="email" />
    </b-input-group>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      name: null
    }
  }
}
</script>

<style>

</style>
