<template>
  <div class="body">
    <div class="content">
      <div class="form">
        <p v-if="user">{{user.name}}</p>
        <p v-if="user">{{user.surname}}</p>
        <p v-if="user">{{user.email}}</p>
        <p v-if="user">{{user.password}}</p>
        <p v-if="user">{{user.phone}}</p>
        <p v-if="user">{{user.address}}</p>
        <p v-if="user">{{user.date_of_birthday}}</p>
        <p v-if="user">{{user.role_id}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
    }
  },
  mounted() {
    this.axios.get('/me').then(response =>{
      console.log(response.data)
      this.user = response.data
      if (this.user.role_id === 1) {
        this.user.role_id === "user"
      }
    })
  },
}
</script>

<style scoped>
.body {
  width: 100%;
  height: 80vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.content {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap:10px;
}
.form {
  width: 369px;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  padding: 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
