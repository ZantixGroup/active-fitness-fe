<template>
  <div class="content">
    <h1>Instructor salaries</h1>
    <TableContent :table-info="clubTableInfo" :name="`instructor_salaries/${$route.params.id}`"></TableContent>
  </div>
</template>

<script>
import TableContent from "@/Admin/components/TableContent.vue";
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
