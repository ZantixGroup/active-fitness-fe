<template>
  <div class="form-container rounded-lg">
    <v-form v-model="valid">
      <v-container>
        <h2 class="form-subtitle">Vispārīgā informācija</h2>
        <v-row>
          <v-col>
            <v-row>
              <v-text-field
                v-model="firstname"
                label="Vārds"
                placeholder="Vārds"
                required
                hide-details
                variant="underlined"
              ></v-text-field>

              <v-text-field
                v-model="lastname"
                label="Uzvārds"
                placeholder="Uzvārds"
                required
                hide-details
                variant="underlined"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                v-model="email"
                label="E-pasts"
                placeholder="piemers@gmail.com"
                required
                hide-details
                variant="underlined"
              ></v-text-field>

              <v-text-field
                v-model="phone"
                label="Tālruņa numurs"
                placeholder="+371 21234567"
                required
                hide-details
                variant="underlined"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                v-model="personalCode"
                label="Personas kods"
                placeholder="000000-00000"
                required
                hide-details
                variant="underlined"
              ></v-text-field>
              <v-spacer class="personal-code-spacer"></v-spacer>
            </v-row>
            <v-row>
              <v-text-field
                v-model="description"
                label="Piezīmes"
                placeholder="Piezīmes teksts"
                required
                hide-details
                variant="underlined"
              ></v-text-field>
            </v-row>
          </v-col>
          <v-col cols="4">
            <p class="form-label">Lietotāja attēls</p>
            <v-img
              class="rounded-lg"
              :width="400"
              aspect-ratio="1/1"
              src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
            ></v-img>
            <v-file-input
              accept="image/*"
              label="Lietotāja attēls"
              variant="underlined"
            ></v-file-input>
          </v-col>
        </v-row>
      </v-container>

      <v-container>
        <h2 class="form-subtitle">Lietotāja loma</h2>
        <v-row>
          <v-col cols="4">
            <v-select
              v-model="role"
              variant="underlined"
              class="select"
              :items="roles"
            ></v-select>
          </v-col>
        </v-row>
      </v-container>

      <v-container>
        <h2 class="form-subtitle">Tiesības</h2>
        <v-row class="pt-3">
          <v-checkbox
            v-for="(item, index) in rightsValues"
            :key="index"
            v-model="rights"
            color="primary"
            :label="item.label"
            :value="item.value"
            hide-details
          ></v-checkbox>
        </v-row>
      </v-container>
      <div class="d-flex ga-2 pt-3 pa-3 form-submit-buttons">
        <v-btn variant="flat" color="#262626">Saglabāt</v-btn>
        <v-btn variant="text">Atmest izmaiņas</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "UserEditForm",
  data: () => ({
    valid: false,
    firstname: "",
    lastname: "",
    email: "",
    personalCode: "",
    description: "",
    phone: "",
    role: "Lietotājs",
    rights: [],

    rightsValues: [
      {
        value: "view-admin-panel",
        label: "Skatīt administrācijas paneli",
      },
      {
        value: "edit-records",
        label: "Rediģēt ierakstus",
      },
      {
        value: "foo",
        label: "Label",
      },
      {
        value: "bar",
        label: "Label",
      },
      {
        value: "temp",
        label: "Label",
      },
    ],

    roles: ["Lietotājs", "Administrators", "Skursteņslauķis"],
  }),
};
</script>

<style scoped>
.v-text-field,
.v-spacer {
  padding: 10px;
}

.personal-code-spacer {
  width: 43.32px;
}

.select {
  padding: 0;
}

.form-subtitle {
  font-weight: 500;
  line-height: 32px;
  font-size: 22px;
}

.form-label {
  font-weight: 400;
  line-height: 24px;
  font-size: 18px;
  padding-bottom: 4px;
}

.form-submit-buttons > * {
  text-transform: none;
  font-weight: 500;
  font-size: 16px;
}
</style>
