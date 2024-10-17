<script setup lang="ts">
import TopicForm from "./TopicForm.vue";
import { generateGuid } from "../helper/helper.global";
import { onMounted, ref } from "vue";
import type { IComment, ITopic } from "../models/global";

const topics = ref<ITopic[]>([]);
const topicData = ref<ITopic>({
  guid: "",
  name: "",
  comments: [],
});

const HandleNewComment = (guid: string, newComment: IComment) => {
  topics.value = topics.value.map((topic) => {
    if (topic.guid === guid) {
      return { ...topic, comments: [...topic.comments, newComment] };
    }
    return topic;
  });
  console.log(topics.value);
};

const HandleCreate = () => {
  const newTopic: ITopic = {
    guid: generateGuid(),
    name: topicData.value.name,
    comments: [],
  };
  topics.value = [newTopic, ...topics.value];
};

const fetchTopics = async () => {
  try {
    const response = await fetch(
      "https://atillc.blob.core.windows.net/data-collector/icode/test-data/topics.json"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch topics");
    }
    const data = await response.json();
    topics.value = data.topics;
  } catch (error) {
    console.error("Error fetching topics:", error);
  }
};

const HandleDeleteTopic = (guid: string) => {
  topics.value = topics.value.filter((topic) => topic.guid !== guid);
  console.log("Topic Delete: ", guid);
};

const HandleEditTopic = (guid: string, newValue: string) => {
  const topic = topics.value.find((topic) => topic.guid === guid);
  if (topic) {
    topic.name = newValue;
  }
};

onMounted(() => {
  fetchTopics();
});
</script>

<template>
  <div class="flex flex-col">
    <h1 class="text-4xl mb-8 font-bold">Topics</h1>
    <div class="w-full">
      <form
        @submit.prevent="HandleCreate"
        class="flex justify-between gap-2 items-center w-full"
      >
        <label class="text-[1rem] font-semibold">Create Topic</label>
        <input
          type="text"
          id="topic"
          v-model="topicData.name"
          placeholder="Enter Topic"
          class="border rounded-md px-3 py-2 text-sm w-9/12"
          required
        />
        <button
          type="submit"
          class="bg-green-700 px-3 py-2 rounded-md text-white hover:opacity-90"
        >
          Create
        </button>
      </form>
    </div>
    <div v-if="topics.length > 0">
      <TopicForm
        @edit-topic="HandleEditTopic"
        @delete-topic="HandleDeleteTopic"
        @add-comment="HandleNewComment"
        v-for="topic in topics"
        :key="topic.guid"
        :guid="topic.guid"
        :comments="topic.comments"
        :topic="topic.name"
        class="pt-14"
      />
    </div>
  </div>
</template>
