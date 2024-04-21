<template>
  <div class="content">
    <h1>Instructors</h1>
    <TableContent :table-info="clubTableInfo" name="instructors"></TableContent>
  </div>
</template>

<script>
import TableContent from "@/Admin/components/TableContent.vue";
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
          title: "Actions",
          align: "start",
          sortable: false,
          key: "actions",
        },
      ],
      actions: [
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
