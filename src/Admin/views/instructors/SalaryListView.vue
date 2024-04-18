<template>
  <div class="content">
    <h1>Clubs</h1>
    <TableContent :table-info="clubTableInfo" :name="`instructor_salaries/${$route.params.id}`"></TableContent>
  </div>
</template>

<script>
import TableContent from "@/Admin/components/TableContent.vue";
import EditAction from "@/Admin/components/form_actions/EditAction.vue";
import DeleteAction from "@/Admin/components/form_actions/DeleteAction.vue";
import {h} from "vue";
import RedirectAction from "@/Admin/components/form_actions/RedirectAction.vue";

export default {
  name: "InstructorSalaryListView",
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
          title: "Surname",
          align: "start",
          key: "user.surname",
        },
        {
          title: "Period",
          align: "start",
          key: "period",
        },
        {
          title: "Amount €",
          align: "start",
          key: "amount",
        },
      ],
      actions: [
        EditAction,
        DeleteAction,
        h(
          RedirectAction,
          {
            icon: 'mdi-currency-usd',
            route: 'view-attendees',
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
