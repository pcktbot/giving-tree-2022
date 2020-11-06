<template>
  <div class="d-flex align-items-center justify-content-start">
    <label class="text-uppercase small text-white text-center mb-0">
      Legend
    </label>
    <div class="legend px-1 py-2 bg-dk-taupe flex-grow-1">
      <div class="text-green" style="font-size: 1.5em;">
        <b-icon-gift-fill variant="green" />
        Children
      </div>
      <div class="text-light" style="font-size: 1.5em;">
        <b-icon-gift-fill variant="red" />
        Adults
      </div>
      <div class="text-blue" style="font-size: 1.5em;">
        <b-icon-gift-fill variant="blue" />
        Pets
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.legend {
  border: 2px solid #2d2c27;
  border-radius: 20px;
  max-width: 80%;
  margin: 10px auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-transform: uppercase;
  font-size: 0.8em;
}
</style>
