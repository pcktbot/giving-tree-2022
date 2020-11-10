<template>
  <div class="container">
    <registration :gifts="added" @register="onSubmit" />
    <tree :leaves="leaves" @add-gift="added.push($event)" />
    <div>
      <gift-legend />
      <b-list-group style="max-height: 60vh; overflow-y: scroll;">
        <b-list-group-item
          v-for="g in gifts"
          :key="`added-${g.id}`"
          :class="[{ 'is-active': g.isActive }, `bg-${whichGroup(g.group)}`]"
          style="border-radius: 15px;"
          class="d-flex justify-content-between mx-3 mb-2 gift-list-item"
        >
          <div class="inset" />
          <div class="text-left flex-grow-1">
            <h2>
              {{ g.name }}
            </h2>
            <b-badge :variant="whichGroup(g.group)" class="px-3">
              {{ g.group }}
            </b-badge>
          </div>
          <div class="flex-grow-1 text-right" style="max-width: 60%;">
            <i>
              {{ g.description }}
            </i>
            <pre>
              {{ g.options }}
            </pre>
            <b-form-checkbox
              v-model="g.isActive"
              :button-variant="g.isActive ? 'green' : 'dk-taupe'"
              size="sm"
              button
            >
              <span class="px-3">
                <b-icon-cart-check-fill v-if="g.isActive" />
                <b-icon-cart-plus v-else />
                {{ g.isActive ? 'Added' : 'Add' }}
              </span>
            </b-form-checkbox>
          </div>
        </b-list-group-item>
      </b-list-group>
      <div>
        <b-btn
          variant="ocre"
          block
          pill
          style="box-shadow: 0 -5px 20px rgba(10, 10, 10, 0.5);"
          @click="preSubmit"
        >
          Claim Selected
        </b-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const gifts = await $axios.$get('api/gifts')
    let row = 0
    const leaves = []
    for (let i = 0; i < gifts.length; i++) {
      if (leaves.length === row) {
        leaves.push([])
      }
      if (leaves[row].length <= row + 1) {
        leaves[row].push({ ...gifts[i], isActive: gifts[i].claimed })
      } else {
        row++
      }
    }
    return {
      leaves,
      gifts: gifts.filter(gift => gift.claimed !== true)
    }
  },
  data() {
    return {
      added: []
    }
  },
  methods: {
    whichGroup(g) {
      return g === 'child'
        ? 'green'
        : g === 'pet'
          ? 'red'
          : 'blue'
    },
    preSubmit() {
      this.added = this.gifts.filter(gift => gift.isActive)
      this.$bvModal.show('register')
    },
    onSuccess(res) {
      this.$emit('api-response', res)
    },
    async onSubmit(payload) {
      try {
        const { email, name } = payload
        const res = await this.$axios.$post('api/claim', {
          email,
          name,
          gifts: this.added
        })
        this.onSuccess(res)
      } catch (error) {
        console.error(error)
        this.onSuccess(error)
      }
    }
  }
}
</script>

<style lang="scss">
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
  // position: relative;
}
.gift-list-item {
  transition: 200ms ease;
  border: 4px solid #2d2c27;
  transform: translateY(0) translateZ(0) scale(1);
  &:hover {
    backface-visibility: hidden;
    -webkit-font-smoothing: subpixel-antialiased;
    transform: translateY(-5px) translateZ(0) scale(1);
  }
  & .inset {
    border: 4px solid #2d2c27;
    width: 20px;
    height: 40px;
    margin: auto 10px auto 0;
    background-color: #1e5353;
    border-radius: 20px;
  }
}
</style>
