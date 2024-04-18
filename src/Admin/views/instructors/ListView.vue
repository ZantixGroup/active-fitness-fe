<template>
  <div class="content">
    <h1>Clubs</h1>
    <TableContent :table-info="clubTableInfo" name="instructors"></TableContent>
  </div>
</template>

<script>
import TableContent from "@/Admin/components/TableContent.vue";
import EditAction from "@/Admin/components/form_actions/EditAction.vue";
import DeleteAction from "@/Admin/components/form_actions/DeleteAction.vue";
import {h} from "vue";
import RedirectAction from "@/Admin/components/form_actions/RedirectAction.vue";

export default {
  name: "InstructorsListView",
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
          title: "Darbības",
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
          {
            name: 'asd',
            icon: 'mdi-currency-usd',
            route: 'salary',
          }
        )
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
