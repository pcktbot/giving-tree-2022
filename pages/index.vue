<template>
  <div class="container">
    <registration @register="onSubmit" />
    <tree :leaves="leaves" @add-gift="added.push($event)" />
    <div style="position: relative;">
      <gift-legend />
    <b-list-group style="max-height: 50vh; overflow-y: scroll;">
      <b-list-group-item
        v-for="g in gifts"
        :key="`added-${g.id}`"
        :class="[{ 'is-active': g.isActive }]"
        style="border-radius: 15px;"
        class="d-flex justify-content-between ml-3 mb-2 gift-list-item bg-taupe"
      >
        <div class="inset" />
        <div class="text-left flex-grow-1">
          <h2>
            <b-icon-gift :variant="whichGroup(g.group)" />
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
            :button-variant="g.isActive ? 'success' : 'secondary'"
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
    </div>
    <b-btn variant="outline-dk-taupe" @click="$bvModal.show('register')">
      Claim
    </b-btn>
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
        leaves[row].push({ ...gifts[i], isActive: false })
      } else {
        row++
      }
    }
    return {
      leaves,
      gifts
    }
  },
  data() {
    return {
      added: []
    }
  },
  methods: {
    add(g) {
      g.isActive = true
      this.added.push(g)
    },
    remove(g) {
      const i = this.added.findIndex(a => a.id === g.id)
      this.added.splice(i, 0)
    },
    whichGroup(g) {
      return g === 'child'
        ? 'green'
        : g === 'pet'
          ? 'red'
          : 'blue'
    },
    onSubmit() {}
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
  &:hover {
    transform: translateX(-10px);
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
