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
        :class="[{ 'twinkle': l.isActive }, whichColor(l.group)]"
        class="l"
        @click="onClick(l)"
      >
        <!-- <b-icon
          v-if="l.isActive"
          icon="x"
          scale="2em"
          variant="light"
        /> -->
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
    whichColor(g) {
      return g === 'child'
        ? 'green'
        : g === 'pet'
          ? 'red'
          : 'blue'
    },
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
  // background-color: #017a68;
  &:hover {
    background-color: white;
    cursor: pointer;
  }
  &.is-active {
    background-color: black;
  }
}
.green { background-color: #017c68; }
.red { background-color: #e8e8e8; }
.blue { background-color: #01677c; }
.trunk {
  width: 50px;
  height: 40px;
  border: 1px solid #c88d20;
  background-color: #c88d20;
  margin: 0 auto;
  border-radius: 4px;
}
.twinkle {
  transform: rotate(-50deg) skewX(-25deg) scale(.8);
  animation: twinkle 3s infinite linear;
}
@keyframes twinkle {
  0% { background: #004A7F; box-shadow: 0 0 3px #004A7F; }
  12% { background: #0094FF; box-shadow: 0 0 10px #0094FF; }
  23% { background: #004A7F; box-shadow: 0 0 3px #004A7F; }
  26% { background: #004A7F; box-shadow: 0 0 3px #004A7F; }
  38% { background: #e7868f; box-shadow: 0 0 10px #e7868f; }
  50% { background: #e60217; box-shadow: 0 0 3px #e60217; }
  52% { background: #e7868f; box-shadow: 0 0 10px #e7868f; }
  62% { background: #ff7800; box-shadow: 0 0 3px #ff7800; }
  73% { background: #ffea00; box-shadow: 0 0 10px #ffea00; }
  76% { background: #519600; box-shadow: 0 0 3px #519600; }
  88% { background: #bafa6f; box-shadow: 0 0 10px #bafa6f; }
  100% { background: #e7868f; box-shadow: 0 0 3px #e7868f; }
}
</style>
