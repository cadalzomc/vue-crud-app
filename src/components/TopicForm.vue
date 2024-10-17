<template>
  <div class="flex flex-col" v-bind="$attrs">
    <div class="flex justify-between items-center w-full">
      <div class="w-1/2">
        <input
          type="text"
          name="topic"
          :value="props.topic"
          placeholder="Topic"
          class="border-b px-3 pt-5 text-sm w-full outline-none font-semibold"
          readonly
        />
      </div>
      <div class="flex gap-2">
        <button
          type="button"
          @click="showModal = true"
          class="border rounded-md px-3 py-2 bg-green-600 text-white"
        >
          Edit Topic
        </button>
        <button
          type="button"
          @click="HandleDelete(props.guid)"
          class="border rounded-md px-3 py-2 bg-green-600 text-white"
        >
          Delete Topic
        </button>
      </div>
    </div>
    <label class="pt-6 font-bold">Comments</label>
    <div v-if="comments.length > 0">
      <div
        v-for="(comment, index) in comments"
        :key="index"
        class="w-full pb-4"
      >
        <textarea
          :value="comment.comment"
          class="border rounded-md px-3 py-2 text-sm mt-2 w-full"
          placeholder="Comment"
        />
        <span class="flex justify-between text-sm text-gray-500 px-1">
          <span class="text-[1rem] text-gray-900">
            <span>By: {{ comment.by }}</span>
          </span>
          <span>{{ new Date(comment.date).toLocaleString() }}</span>
        </span>
      </div>
    </div>
    <div class="w-full py-4">
      <form @submit.prevent="addComment">
        <input
          class="border rounded-md px-2 py-1"
          v-model="newComment.by"
          placeholder="Enter your Name"
          required
        />
        <textarea
          v-model="newComment.comment"
          class="border rounded-md px-3 py-2 text-sm mt-2 w-full"
          placeholder="Comment Here"
          required
        />
        <button
          type="submit"
          class="border rounded-md px-3 py-2 bg-green-600 text-white"
        >
          Add new Comment
        </button>
      </form>
    </div>
  </div>
  <EditModal
    @update-topic="HandleUpdateTopic"
    :topic="props.topic"
    :guid="props.guid"
    :is-visible="showModal"
    @close="showModal = false"
  />
</template>

<script setup lang="ts">
import type { IComment } from "@/models/global";
import EditModal from "../components/modal/modal.edit.vue";
import { ref } from "vue";
const showModal = ref(false);
const emit = defineEmits(["add-comment", "delete-topic", "edit-topic"]);

const props = defineProps<{
  guid: string;
  topic: string;
  comments: IComment[];
}>();

const newComment = ref<IComment>({
  comment: "",
  by: "",
  date: "",
});

const addComment = () => {
  if (newComment.value.comment) {
    const commentToAdd: IComment = {
      ...newComment.value,
      date: new Date().toLocaleString(),
    };
    emit("add-comment", props.guid, commentToAdd);

    console.log(commentToAdd);
    newComment.value.comment = "";
    newComment.value.by = "";
  }
};

const HandleDelete = (guid: string) => {
  const isConfirm = window.confirm(
    "Are you sure to delete this topic? This action cannot be undone."
  );
  if (isConfirm) {
    emit("delete-topic", guid);
  }
};

const HandleUpdateTopic = (guid: string, newValue: string) => {
  emit("edit-topic", guid, newValue);
};
</script>
