<template>
  <div class="d-flex legend">
    <label class="text-uppercase small text-white text-center">
      Legend
    </label>
    <div class="pair p-3 text-white">
      <b-icon-gift-fill variant="green" scale="4em" />
      Children
    </div>
    <div class="pair p-3 text-white">
      <b-icon-gift-fill variant="red" scale="4em" />
      Adults
    </div>
    <div class="pair p-3 text-white">
      <b-icon-gift-fill variant="blue" scale="4em" />
      Pets
    </div>
  </div>
</template>

<style lang="scss">
.legend {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -100%);
  max-width: 50vw;
  & .pair {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1em 0.25em;
  }
}
</style>
