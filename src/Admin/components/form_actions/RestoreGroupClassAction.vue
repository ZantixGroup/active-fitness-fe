<template>
  <v-icon v-if="this.data?.deleted_at" icon="mdi-restore" @click="restore()"></v-icon>
</template>

<script>
export default {
  name: "RestoreGroupClassAction",
  props: {
    data: {
      type: Object,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
  },
	methods: {
    restore() {
      this.axios.get(`/group_class_archive_backup/${this.data.id}`).then(() => {
				alert('Group class has been restored')
				window.location.reload()
      })
    },
  },
};
</script>
