<template>
  <div class="content">
    <h1>Clubs</h1>
    <TableContent :table-info="clubTableInfo" name="clubs"></TableContent>
  </div>
</template>

<script>
import TableContent from "@/Admin/components/TableContent.vue";
import EditAction from "@/Admin/components/form_actions/EditAction.vue";
import DeleteAction from "@/Admin/components/form_actions/DeleteAction.vue";

export default {
  name: "ClubListView",
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
          title: "Address",
          align: "start",
          key: "address",
        },
        {
          title: "Phone",
          align: "start",
          key: "phone",
        },
        {
          title: "Email",
          align: "start",
          key: "email",
        },
        {
          title: "Actions",
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
