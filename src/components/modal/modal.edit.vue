<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div v-if="isVisible" class="modal-overlay" v-bind="$attrs">
    <div class="bg-white min-w-96 border p-4 rounded-md">
      <h3 class="text-lg font-semibold pb-2">Edit Topic</h3>
      <input
        v-model="newName"
        placeholder="New topic name"
        class="border px-3 py-1 rounded-md w-full"
      />
      <div class="flex justify-end gap-2 pt-3">
        <button
          @click="cancelEdit"
          class="border p-2 rounded-md text-black hover:text-white hover:bg-red-600 duration-200"
        >
          Cancel
        </button>
        <button
          @click="confirmEdit"
          class="border bg-green-600 p-2 rounded-md text-white hover:opacity-90 duration-200"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps } from "vue";

const props = defineProps<{
  topic: string;
  guid: string;
  isVisible: boolean;
}>();

const emit = defineEmits(["update-topic", "close"]);
const newName = ref(props.topic);

const confirmEdit = () => {
  emit("update-topic", props.guid, newName.value);
  emit("close");
};

const cancelEdit = () => {
  emit("close");
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
