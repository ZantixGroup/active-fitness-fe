<template>
  <div class="content">
    <h1>Users</h1>
    <TableContent :table-info="userTableInfo" name="users"></TableContent>
  </div>
</template>

<script>
import TableContent from "@/Admin/components/TableContent.vue";
import EditAction from "@/Admin/components/form_actions/EditAction.vue";
import DeleteAction from "@/Admin/components/form_actions/DeleteAction.vue";

export default {
  name: "UserListView",
  components: { TableContent },
  data: () => ({
    userTableInfo: {
      headers: [
        {
          title: "ID",
          align: "start",
          key: "id",
        },
        {
          title: "Name",
          align: "start",
          key: "name",
        },
        {
          title: "Surname",
          align: "start",
          key: "surname",
        },
        {
          title: "Email",
          align: "start",
          key: "email",
        },
        {
          title: "Phone number",
          align: "start",
          key: "phone",
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
