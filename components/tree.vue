<template>
  <div>
    <b-icon
      icon="star-fill"
      variant="secondary"
      scale="2em"
    />
    <div
      v-for="(leaf, i) in leaves"
      :key="`row-${i}`"
      class="leaf"
    >
      <div
        v-for="l in leaf"
        :key="l.id"
        :class="[{ 'is-active': l.isActive }, l.color]"
        class="l"
        @click="onClick(l)"
      >
        <b-icon
          v-if="l.isActive"
          icon="x"
          scale="2em"
          variant="light"
        />
      </div>
    </div>
    <div class="trunk" />
  </div>
</template>

<script>
export default {
  props: {
    leaves: {
      type: Array,
      default() {
        return this.backup
      }
    }
  },
  data() {
    return {
      // TODO build a function that creates these rows.
      backup: [
        [{
          id: 1,
          color: 'red',
          isActive: false
        }, {
          id: 2,
          color: 'blue',
          isActive: false
        }],
        [{}, {}, {}],
        [{}, {}, {}, {}],
        [{}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
      ]
    }
  },
  methods: {
    onClick(l) {
      l.isActive = !l.isActive
      if (!l.isActive) {
        this.$emit('add-gift', l)
      }
    }
  }
}
</script>

<style lang="scss">
.leaf {
  display: flex;
  justify-content: center;
}
.l {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #017a68;
  &:hover {
    background-color: white;
    cursor: pointer;
  }
  &.is-active {
    background-color: black;
  }
}
.red { background-color: #e00033; }
.blue { background-color: #2f38b0; }
.trunk {
  width: 50px;
  height: 40px;
  border: 1px solid #c88d20;
  background-color: #c88d20;
  margin: 0 auto;
  border-radius: 4px;
}
</style>
