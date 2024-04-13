<template>
  <div class="content">
    <h1>Lietotāji</h1>
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
          title: "Bilde",
          align: "start",
          sortable: false,
          key: "avatar",
        },
        {
          title: "ID",
          align: "start",
          key: "id",
        },
        {
          title: "Vārds",
          align: "start",
          key: "firstname",
        },
        {
          title: "Uzvārds",
          align: "start",
          key: "lastname",
        },
        {
          title: "E-pasts",
          align: "start",
          key: "email",
        },
        {
          title: "Telefona nr.",
          align: "start",
          key: "phone_number",
        },
        {
          title: "Loma",
          align: "start",
          key: "role",
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
