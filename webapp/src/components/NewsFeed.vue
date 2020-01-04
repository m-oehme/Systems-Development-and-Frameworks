<template>
  <div id="newsfeed">
    <h2 id="newsfeed_head">
      NewsFeed!
    </h2>
    <ol>
      <NewsItem v-for="news in this.newsfeed" :news="news" :key="news._id" />
    </ol>
  </div>
</template>

<script>
import NewsItem from "./NewsItem";
import gql from "graphql-tag";

export default {
  name: "NewsFeed",
  components: { NewsItem },
  props: ["user"],
  apollo: {
    newsfeed: {
      query: gql`
        query {
          newsfeed: News {
            _id
            headline
            author
            createdAt
          }
        }
      `
    }
  }
};
</script>

<style scoped></style>
