<template>
  <b-modal
    ref="register"
    id="register"
    @ok="$emit('register', { email, name })"
  >
    <b-input-group prepend="Name">
      <b-form-input v-model="name" />
    </b-input-group>
    <b-input-group prepend="Email">
      <b-form-input v-model="email" />
    </b-input-group>
    {{ gifts }}
  </b-modal>
</template>

<script>
export default {
  props: ['gifts'],
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
