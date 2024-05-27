<template>
  <div class="content">
    <h1>Group classes</h1>
    <TableContent :table-info="clubTableInfo" name="classes"></TableContent>
  </div>
</template>

<script>
import DeleteAction from "@/Admin/components/form_actions/DeleteAction.vue";
import EditAction from "@/Admin/components/form_actions/EditAction.vue";
import RedirectAction from "@/Admin/components/form_actions/RedirectAction.vue";
import TableContent from "@/Admin/components/TableContent.vue";
import { h } from "vue";
import RestoreGroupClassAction from "@/Admin/components/form_actions/RestoreGroupClassAction.vue";

export default {
  name: "ClassListView",
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
          title: "Instructor",
          align: "start",
          key: "instructor.surname",
        },
        {
          title: "Starts at",
          align: "start",
          key: "starts_at",
        },
        {
          title: "Ends At",
          align: "start",
          key: "ends_at",
        },
        {
          title: "Studio",
          align: "start",
          key: "studio.title",
        },
        {
          title: "Price",
          align: "start",
          key: "price",
        },
        {
          title: "Actions",
          align: "start",
          sortable: false,
          key: "actions",
        },
      ],
      actions: [
        EditAction,
        DeleteAction,
        h(
          RedirectAction,
          { route: 'view-attendees' }
        ),
				RestoreGroupClassAction,
      ],
    },
  }),
};
</script>

<style scoped>
.content {
  width: 100%;
}
</style>
