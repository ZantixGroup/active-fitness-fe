<template>
  <td>
    <div class="action-list d-flex justify-space-between">
      <component
        :is="action"
        v-for="(action, index) in actions"
        :key="index"
        :data="data"
        :name="name"
        @change="$emit('change')"
      />
    </div>
  </td>
</template>

<script>
export default {
  name: "TableActions",
  props: {
    actions: {
      type: Array,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    data: {
      type: Object,
      default: null,
    },
  },
  emits: ["change"],
};
</script>
