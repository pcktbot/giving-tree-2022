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
    <b-card bg-variant="light" no-body>
      <b-table
        :fields="[{ key:'name', label: 'Gift' }, 'options', 'description', 'group']"
        :items="gifts"
        responsive
        small
      >
        <template v-slot:cell(options)="{ item }">
          <span v-if="item.options">
            <p>
              Name: {{ item.options.name }}
            </p>
            <a :href="item.options.wishlist">
              {{ item.options.wishlist }}
            </a>
          </span>
        </template>
      </b-table>
    </b-card>
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
        : /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email)
    },
    isReady() {
      return this.email !== '' && this.name !== ''
    }
  }
}
</script>
