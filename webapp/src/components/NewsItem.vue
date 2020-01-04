<template>
  <li class="todo_item">
    <div class="news_headline">{{ news.headline }}</div>
    <div class="news_author">Created by {{ news.author }}</div>
    <div class="news_date">{{ news.createdAt }}</div>
  </li>
</template>

<script>
export default {
  name: "NewsItem",
  props: ["news"]
};
</script>

<style scoped></style>
