<template>
  <Teleport to="body">
    <Transition name="modal-outer">
      <div v-show="modalActive" class="modal__backdrop" >
        <Transition name="modal-inner">
          <div v-if="modalActive" class="modal__block">
            <slot />
            <button class="close__button" @click="$emit('close-modal')">
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineEmits(["close-modal"]);
defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  },
});

</script>

<style lang="scss" scoped>
@import '../assets/variables';

.modal__backdrop {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 70%);
}

.modal__block {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 50px;
  background: #fff;
}

.close__button {
  position: absolute;
  display: block;
  font-family: $main-font;
  border: none;
  border-radius: 50%;
  color: #fff;
  padding:15px;
  right: 10px;
  top: 10px;
  cursor: pointer;
  background-color: #e57878;

  &:after{
    content: "x";
    position: absolute;
    color: #F8F8FF;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
}

.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>
