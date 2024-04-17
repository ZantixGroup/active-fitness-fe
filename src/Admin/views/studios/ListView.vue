<template>
  <div class="content">
    <h1>Studios</h1>
    <TableContent :table-info="clubTableInfo" name="studios"></TableContent>
  </div>
</template>

<script>
import TableContent from "@/Admin/components/TableContent.vue";
import EditAction from "@/Admin/components/form_actions/EditAction.vue";
import DeleteAction from "@/Admin/components/form_actions/DeleteAction.vue";

export default {
  name: "StudioListView",
  components: { TableContent },
  data: () => ({
    clubTableInfo: {
      headers: [
        {
          title: "ID",
          align: "start",
          key: "id",
        },
        {
          title: "Title",
          align: "start",
          key: "title",
        },
        {
          title: "Capacity",
          align: "start",
          key: "capacity",
        },
        {
          title: "Club",
          align: "start",
          key: "club.title",
        },
        {
          title: "Darbības",
          align: "start",
          sortable: false,
          key: "actions",
        },
      ],
      actions: [EditAction, DeleteAction],
    },
  }),
};
</script>

<style scoped>
.content {
  width: 100%;
}
</style>
