<template>
  <v-layout>
    <main>
      <header class="d-flex align-center">
        <img src="@/assets/images/logo.svg" width="234px" />
        <div class="navigation-bar-avatar-container d-flex align-center">
          <v-icon icon="mdi-bell" color="#8C8C8C" size="30px"></v-icon>
          <v-avatar
            image="https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
            size="54"
          ></v-avatar>
        </div>
      </header>
      <div class="main-container d-flex">
        <div class="side-navigation-bar d-flex flex-column">
          <div class="user-info-container d-flex align-center">
            <v-avatar
              image="https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
              size="54"
            ></v-avatar>
            <div class="user-info-text">
              <h2>Zigmunds Latvānis</h2>
              <p>Administrators</p>
            </div>
          </div>
          <v-divider color="#F0F0F0" thickness="1"></v-divider>
          <v-navigation-drawer>
            <v-list>
              <div v-for="(item, index) in sideNavbarItems" :key="index">
                <v-list-group v-if="item?.sections" :title="item.title">
                  <template #activator="{ props }">
                    <v-list-item
                      v-bind="props"
                      :prepend-icon="item.prependIcon"
                      :title="item.title"
                      height="56px"
                      color="primary"
                    ></v-list-item>
                  </template>
                  <v-list-item
                    v-for="(section, sectionIndex) in item.sections"
                    :key="sectionIndex"
                    :title="section.title"
                    :value="section.title + Math.random()"
                    height="56px"
                    color="primary"
                    @click="handleNavbarItemClick(section.route)"
                  >
                  </v-list-item>
                </v-list-group>
                <v-list-item
                  v-else
                  :prepend-icon="item.prependIcon"
                  :title="item.title"
                  :value="item.title"
                  height="56px"
                  color="primary"
                  @click="handleNavbarItemClick(item.route)"
                >
                </v-list-item>
              </div>
            </v-list>
          </v-navigation-drawer>
        </div>
        <div class="content-wrapper">
          <slot />
        </div>
      </div>
    </main>
  </v-layout>
</template>
<script>
export default {
  name: "AdminLayout",
  data: () => ({
    sideNavbarItems: [
      {
        title: "Main panel",
        height: "56px",
        prependIcon: "mdi-view-dashboard",
        route: "/admin",
      },
      {
        title: "Users",
        height: "56px",
        prependIcon: "mdi-account-multiple",
        sections: [
          {
            title: "List",
            route: "/admin/users/list",
          },
          {
            title: "Create",
            route: "/admin/users/create",
          },
        ],
      },
      {
        title: "Instructors",
        height: "56px",
        prependIcon: "mdi-school",
        sections: [
          {
            title: "List",
            route: "/admin/instructors/list",
          },
        ],
      },
      {
        title: "Clubs",
        height: "56px",
        prependIcon: "mdi-home-city",
        sections: [
          {
            title: "List",
            route: "/admin/clubs/list",
          },
          {
            title: "Create",
            route: "/admin/clubs/create",
          },
        ],
      },
      {
        title: "Studios",
        height: "56px",
        prependIcon: "mdi-floor-plan",
        sections: [
          {
            title: "List",
            route: "/admin/studios/list",
          },
          {
            title: "Create",
            route: "/admin/studios/create",
          },
        ],
      },
      {
        title: "Group classes",
        height: "56px",
        prependIcon: "mdi-account-group",
        sections: [
          {
            title: "List",
            route: "/admin/classes/list",
          },
          {
            title: "Create",
            route: "/admin/classes/create",
          },
        ],
      },
    ],
  }),
  methods: {
    handleNavbarItemClick(route) {
      this.$router.push({ path: route });
    },
  },
};
</script>

<style scoped>
header {
  width: 100vw;
  height: 75px;
  background-color: #262626;
  padding: 0 35px;
}

.v-navigation-drawer {
  position: static !important;
  width: 100% !important;
  background-color: #262626;
  color: #fff;
}

.navigation-bar-avatar-container {
  gap: 25px;
  margin-left: auto;
}

.main-container {
  height: calc(100vh - 75px);
}

.side-navigation-bar {
  background-color: #262626;
  width: 327px;
  color: #fff;
}

.v-list {
  padding: 0;
}

.user-info-container {
  height: 75px;
  padding: 12px 0 12px 20px;
}

.user-info-text {
  padding: 0 20px;
  white-space: nowrap;
}

.user-info-text > h2 {
  font-size: 20px;
  line-height: 32px;
  font-weight: 400;
}

.user-info-text > p {
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
}

footer {
  width: 100%;
  text-align: center;
  margin-top: auto;
  padding: 15px 54px;
}

.content-wrapper {
  padding: 20px 35px;
  overflow-y: scroll;
  flex-grow: 1;
}
</style>
