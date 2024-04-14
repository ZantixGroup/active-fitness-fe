<template>
  <div class="content">
    <h1>Galvenais panelis</h1>
    <div class="info-card-container info-container ga-6">
      <InfoCard
        title="Reģistrēti lietotāji"
        value="51,442"
        icon="mdi-account-multiple"
      ></InfoCard>
      <InfoCard
        title="Apmeklējumi mēnesī"
        value="2,511"
        icon="mdi-link"
      ></InfoCard>
      <InfoCard
        title="Izpildīti kursi"
        value="281"
        icon="mdi-account-multiple"
      ></InfoCard>
      <InfoCard title="Pārdoti produkti" value="551" icon="mdi-cart"></InfoCard>
    </div>
  </div>
</template>

<script>
import InfoCard from "@/Admin/components/InfoCard.vue";

export default {
  name: "MainView",
  components: { InfoCard },
  data: () => ({
    tableInfo: {
      headers: [
        {
          title: "Vārds",
          align: "start",
          key: "name",
        },
        {
          title: "Pirkuma Nr.",
          align: "start",
          key: "order",
        },
        {
          title: "Summa",
          align: "start",
          key: "cost",
        },
        {
          title: "Statuss",
          align: "start",
          key: "status",
        },
      ],
      content: [
        {
          name: "Jānis",
          order: "NR0000422",
          cost: "12.65€",
          status: "Rēķins nosūtīts",
        },
        {
          name: "Zigmunds",
          order: "NR0000421",
          cost: "122.65€",
          status: "Apmaksāts",
        },
        {
          name: "Alhamons",
          order: "NR0000420",
          cost: "12.65€",
          status: "Apmaksāts",
        },
        {
          name: "Diždirsis",
          order: "NR0000419",
          cost: "12.65€",
          status: "Atcelts",
        },
        {
          name: "Padirsenis",
          order: "NR0000418",
          cost: "92.11€",
          status: "Apmaksāts",
        },
        {
          name: "Džons",
          order: "NR0000417",
          cost: "45.20€",
          status: "Rēķins nosūtīts",
        },
        {
          name: "Andris",
          order: "NR0000416",
          cost: "76.40€",
          status: "Rēķins nosūtīts",
        },
        {
          name: "Inese",
          order: "NR0000415",
          cost: "30.15€",
          status: "Apmaksāts",
        },
        {
          name: "Voldemārs",
          order: "NR0000414",
          cost: "18.99€",
          status: "Atcelts",
        },
        {
          name: "Sliede",
          order: "NR0000413",
          cost: "65.75€",
          status: "Atcelts",
        },
      ],
    },
  }),
};
</script>

<style scoped>
.content {
  width: 100%;
}

.info-card-container {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.info-container {
  margin: 20px 0;
}
</style>
