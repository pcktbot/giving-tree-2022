<template>
  <b-modal
    id="register"
    ref="register"
    body-bg-variant="dk-taupe"
    footer-bg-variant="dk-taupe"
    footer-border-variant="dk-taupe"
    hide-header
    button-size="lg"
    ok-variant="ocre"
    cancel-variant="outline-tertiary"
    centered
    size="lg"
    @ok="$emit('register', { email, name })"
  >
    <b-form-group
      label="Name"
      label-cols="3"
      label-class="text-ocre"
    >
      <b-form-input v-model.trim="name" :state="isName" required />
    </b-form-group>
    <b-form-group
      label="Email"
      label-cols="3"
      label-class="text-ocre"
    >
      <b-form-input v-model.trim="email" :state="isEmail" required />
    </b-form-group>
    <p class="font-weight-bold h2 mb-2 text-ocre">
      Here are you selections.
    </p>
    <b-card-group deck>
      <b-card
        v-for="(gift, i) in gifts"
        :key="`gift-${i}`"
        :bg-variant="whichGroup(gift.group)"
        class="text-center"
        style="border-radius: 20px; border-width: 3px;"
      >
        <h4>
          <b-icon-gift-fill />
          {{ gift.name }}
        </h4>
      </b-card>
    </b-card-group>
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
  },
  computed: {
    isName() {
      return this.name === null
        ? null
        : this.name !== ''
    },
    isEmail() {
      return this.email === null
        ? null
        : this.email !== ''
    }
  },
  methods: {
    whichGroup(g) {
      return g === 'child'
        ? 'green'
        : g === 'pet'
          ? 'red'
          : 'blue'
    }
  }
}
</script>
