<template>
  <div class="d-flex align-items-center justify-content-start">
    <label class="text-uppercase small text-white text-center mb-0">
      Legend
    </label>
    <div class="legend px-1 py-2 bg-dk-taupe flex-grow-1">
      <b-btn variant="transparent" class="text-light" style="font-size: 1.5em;" @click="$emit('on-selected', 'all')">
        <b-iconstack>
          <b-icon-gift-fill variant="light" stacked scale="0.6em" shift-h="4" shift-v="4" />
          <b-icon-gift-fill variant="light" stacked scale="0.6em" shift-h="-4" shift-v="-4" />
        </b-iconstack>
        All
      </b-btn>
      <b-btn variant="transparent" class="text-green" style="font-size: 1.5em;" @click="$emit('on-selected', 'families')">
        <b-icon-gift-fill variant="green" />
        Family
      </b-btn>
      <b-btn variant="transparent" class="text-blue" style="font-size: 1.5em;" @click="$emit('on-selected', 'seniors')">
        <b-icon-gift-fill variant="blue" />
        Seniors
      </b-btn>
      <b-btn variant="transparent" class="text-light" style="font-size: 1.5em;" @click="$emit('on-selected', 'pets')">
        <b-icon-gift-fill variant="light" />
        Pets
      </b-btn>
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
