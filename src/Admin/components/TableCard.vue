<template>
  <TitleCard :title="title">
    <TableContent :table-info="tableInfo"></TableContent>
  </TitleCard>
</template>

<script>
import TitleCard from "@/Admin/components/TitleCard.vue";
import TableContent from "@/Admin/components/TableContent.vue";

export default {
  name: "TableCard",
  components: {
    TableContent,
    TitleCard,
  },
  props: {
    title: {
      type: String,
      default: null,
    },
    tableInfo: {
      type: Object,
      default: () => ({
        headers: [],
        content: [],
      }),
    },
  },
};
</script>
