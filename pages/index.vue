<template>
  <div class="container">
    <registration :gifts="added" @register="onSubmit" />
    <div class="fixed-top bg-dk-taupe">
      <h1 class="font-weight-bold d-flex align-items-center justify-content-center text-light">
        <b-img src="/g5-logo.png" class="mr-2" height="30" />
        Giving Tree
      </h1>
      <i class="text-white">
        Hi ALL, When ordering on Amazon or other websites please be sure to update your shipping instructions to say, <br />"M-F 6:30am to 5:00pm, Leave at Reception Desk"<br />
        If you are personally bringing a gift to the office, please reach out to me on TEAMS.
        Office address: 360 SW Bond St Ste. 200, Bend, OR 97702
      </i>
    </div>
    <tree :leaves="leaves" @add-gift="added.push($event)" />
    <div>
      <gift-legend @on-selected="onFilter" />
      <b-list-group style="max-height: 60vh; max-width: 700px; width: 60vw; overflow-y: scroll;">
        <b-list-group-item
          v-for="g in gifts"
          :key="`added-${g.id}`"
          :class="[{ 'is-active': g.isActive }, `bg-${whichGroup(g.group)}`]"
          style="border-radius: 15px;"
          class="d-flex justify-content-between mx-3 mb-2 gift-list-item"
        >
          <div class="inset" />
          <div class="text-left d-flex flex-column" style="flex: 0 1 40%;">
            <h4 class="">
              {{ g.name }}
            </h4>
            <p class="text-left">
              {{ g.group }}
            </p>
          </div>
          <div class="text-right" style="flex: 0 1 60%;">
            <p class="my-2">
              {{ g.description }}
            </p>
            <p v-if="g.options">
              {{ g.options.name }}
              <br>
              <strong class="text-white">
                *Please make sure to claim the tag before purchasing the items.
              </strong>
            </p>
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
    <div class="fixed-bottom text-ocre">
      <p>
        If you have any questions or need assistance using the G5 Giving Tree, please reach out to Bridgette via Teams or email
        <a href="mailto:bridgette.montgomery@getg5.com">
          bridgette.montgomery@getg5.com
        </a>
        .
      </p>
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
      gifts: gifts.filter(gift => gift.claimed !== true),
      backup: gifts.filter(gift => gift.claimed !== true)
    }
  },
  data() {
    return {
      added: []
    }
  },
  methods: {
    onOptions(options) {
      const opts = JSON.parse(options)
      return `
        <p>
          ${opts.name}
        </p>
        <a href="${opts.wishlist}">
          ${opts.wishlist}
        </a>
      `
    },
    whichGroup(g) {
      return g === 'Family'
        ? 'blue'
        : 'tertiary'
    },
    preSubmit() {
      this.added = this.gifts.filter(gift => gift.isActive)
      this.$bvModal.show('register')
    },
    onFilter(evt) {
      if (evt === 'all') {
        this.gifts = this.backup
      } else {
        this.gifts = this.backup.filter(gift => gift.group === evt)
      }
    },
    async onSuccess(err) {
      if (err) {
        alert(err)
      }
      const gifts = await this.$axios.$get('api/gifts')
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
      this.leaves = leaves
      this.gifts = gifts.filter(gift => gift.claimed !== true)
      this.backup = gifts.filter(gift => gift.claimed !== true)
    },
    async onSubmit(payload) {
      try {
        const { email, name } = payload
        await this.$axios.$post('api/claim', {
          email,
          name,
          gifts: this.added
        })
        this.onSuccess()
      } catch (error) {
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
.fixed-top {
  position: fixed;
  top: 0;
  left: 50%;
  padding: 0.5em 1.5em;
  width: 100%;
  transform: translateX(-50%);
}
.fixed-bottom {
  position: fixed;
  bottom: 0;
  left: 50%;
  padding: 0.5em 1.5em;
  transform: translateX(-50%);
}
.gift-list-item {
  transition: 200ms ease;
  border: 4px solid #2d2c27;
  transform: translateY(0) translateZ(0) scale(1);
  // box-shadow: 0 0 20px rgba(10, 10, 10, 0.5);
  &:hover {
    backface-visibility: hidden;
    -webkit-font-smoothing: subpixel-antialiased;
    transform: translateY(0) translateZ(0) scale(1);
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
