<template>
  <div
    class="table-container d-flex flex-column justify-space-between h-100 rounded"
  >
    <v-data-table-server
      :items-per-page="pagination.itemsPerPage"
      :headers="tableInfo.headers"
      :items="content"
      :items-length="pagination.last_page"
      :loading="loading"
      @update:options="getData"
    >
      <template #[`item.avatar`]="{ value }">
        <v-avatar :image="value"></v-avatar>
      </template>

      <template #[`item.user.avatar`]="{ value }">
        <v-avatar :image="value"></v-avatar>
      </template>

      <template #[`item.actions`]="{ item }">
        <TableActions
          :id="item.id"
          :actions="tableInfo.actions"
          :name="name"
          :data="item"
          @change="actionChange"
        ></TableActions>
      </template>

      <template #[`item.status`]="{ value }">
        <v-chip :color="getStatusColor(value)" class="status-chip">
          {{ value }}
        </v-chip>
      </template>

      <template #[`item.created_at`]="{ value }">
        <span>{{ new Date(value).toLocaleDateString() }}</span>
      </template>

      <template #[`item.role`]="{ value }">
        <v-chip>
          {{ value.name }}
        </v-chip>
      </template>

      <template #[`item.is_accepted`]="{ value }">
        <v-chip :color="value ? 'green' : 'red'">
          {{ booleanValue(value) }}
        </v-chip>
      </template>

      <template #[`item.is_not_attended`]="{ value }">
        <v-chip v-if="value" color="red">
          {{ booleanValue(value) }}
        </v-chip>
      </template>

      <template #[`item.order_completed`]="{ value }">
        <v-chip :color="value ? 'green' : 'red'">
          {{ booleanValue(value) }}
        </v-chip>
      </template>

      <template #[`item.draft`]="{ value }">
        <v-chip :color="value ? 'gray' : 'green'">
          {{ booleanValue(value) }}
        </v-chip>
      </template>
    </v-data-table-server>
  </div>
</template>

<script>
import TableActions from "@/Admin/components/TableActions.vue";

export default {
  name: "NewTableContent",
  components: { TableActions },
  props: {
    tableInfo: {
      type: Object,
      default: () => ({
        headers: [],
        actions: [],
      }),
    },
    name: {
      type: String,
      default: null,
    },
  },
  data: () => ({
    pagination: {
      page: 1,
      itemsPerPage: 10,
      total: 0,
      current_page: 0,
      last_page: 0,
    },
    content: [],
    loading: false,
  }),
  mounted() {
    this.getData({ page: 1, itemsPerPage: 10 });
  },
  methods: {
    booleanValue(value) {
      if (value === true) {
        return "True";
      } else if (value === false) {
        return "False";
      }
      return "Undetermined";
    },
    actionChange() {
      this.$forceUpdate();
      this.getData({
        page: this.pagination.page,
        itemsPerPage: this.pagination.itemsPerPage,
      });
    },
    async getData(data) {
      this.loading = true;
      this.pagination.page = data.page;
      this.pagination.itemsPerPage = data.itemsPerPage;
      await this.axios.get(`/${this.name}?page=${data.page}&pagination=${data.itemsPerPage}`).then((response) => {
        this.pagination.itemsPerPage = response.data.meta.per_page;
        this.pagination.current_page = response.data.meta.current_page;
        this.pagination.last_page = response.data.meta.last_page;
        this.pagination.total = response.data.meta.total;
        this.content = response.data.data;
      }).finally(() => {
        this.loading = false;
      })
    },
    getStatusColor(status) {
      switch (status) {
        case "Rēķins nosūtīts":
          return "orange";
        case "Atcelts":
          return "red";
        case "Apmaksāts":
          return "green";
        default:
          return "orange";
      }
    },
  },
};
</script>

<style scoped>
.table-container {
  background-color: white;
}

.select {
  max-width: 60px;
}
</style>
