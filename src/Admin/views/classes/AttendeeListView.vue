<template>
  <div class="content">
    <h1>Attendees list</h1>
    <TableContent :table-info="groupClassUsersRequestsTableInfo" :name="`not_accepted_group_class_users/${$route.params.id}`"></TableContent>

    <h1>Attendee attendance list</h1>
    <TableContent :table-info="groupClassUsersAttendanceTableInfo" :name="`accepted_group_class_users/${$route.params.id}`"></TableContent>
  </div>
</template>

<script>
import TableContent from "@/Admin/components/TableContent.vue";
import CallbackAction from "@/Admin/components/form_actions/CallbackAction.vue";
import axios from "axios";
import { h } from "vue";

export default {
  name: "AttendeeListView",
  components: { TableContent },
  data: () => ({
    groupClassUsersRequestsTableInfo: {
      headers: [
        {
          title: "ID",
          align: "start",
          key: "id",
        },
        {
          title: "Name",
          align: "start",
          key: "user.name",
        },
        {
          title: "Surname",
          align: "start",
          key: "user.surname",
        },
        {
          title: "Is accepted",
          align: "start",
          key: "is_accepted",
        },
        {
          title: "Actions",
          align: "start",
          sortable: false,
          key: "actions",
        },
      ],
      actions: [
        h(CallbackAction, {
          icon: "mdi-check",
          color: "green",
          callback: async (data) => {
            await axios.get(`/accept_user_class_group/${data.id}`).then(() => {
              window.location.reload()
            });
          },
        }),
        h(CallbackAction, {
          icon: "mdi-trash-can-outline",
          color: "red",
          callback: async (data) => {
            await axios.delete(`/delete_group_class_users/${data.id}`).then(() => {
              window.location.reload()
            });
          },
        }),
      ],
    },
    groupClassUsersAttendanceTableInfo: {
      headers: [
        {
          title: "ID",
          align: "start",
          key: "id",
        },
        {
          title: "Name",
          align: "start",
          key: "user.name",
        },
        {
          title: "Surname",
          align: "start",
          key: "user.surname",
        },
        {
          title: "Is not attended",
          align: "start",
          key: "is_not_attended",
        },
        {
          title: "Feedback",
          align: "start",
          key: "feedback_content",
        },
        {
          title: "Actions",
          align: "start",
          sortable: false,
          key: "actions",
        },
      ],
      actions: [
        h(CallbackAction, {
          icon: "mdi-calendar-refresh-outline",
          callback: async (data) => {
            await axios.get(`/user_not_attended/${data.id}`).then(() => {
              window.location.reload()
            });
          },
        }),
        h(CallbackAction, {
          icon: "mdi-close",
          color: "red",
          callback: async (data) => {
            await axios.get(`/decline_group_class_users/${data.id}`).then(() => {
              window.location.reload()
            });
          },
        }),
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
