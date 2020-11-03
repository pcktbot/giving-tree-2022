<template>
  <div class="legend">
    <label class="text-uppercase small text-white text-center">
      Legend
    </label>
    <div class="d-flex justify-content-end">
      <div class="pair p-3 text-white">
        <b-icon-gift-fill variant="green" scale="2em" shift-v="16" />
        Children
      </div>
      <div class="pair p-3 text-white">
        <b-icon-gift-fill variant="red" scale="2em" shift-v="16" />
        Adults
      </div>
      <div class="pair p-3 text-white">
        <b-icon-gift-fill variant="blue" scale="2em" shift-v="16" />
        Pets
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.legend {
  position: absolute;
  border: 2px solid #2d2c27;
  border-radius: 20px;
  top: -10px;
  left: 0%;
  transform: translate(-50%, -100%);
  max-width: 50vw;
  & .pair {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-transform: uppercase;
    font-size: 0.8em;
  }
}
</style>
