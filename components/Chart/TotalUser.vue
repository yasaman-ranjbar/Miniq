<template>
  <v-card
    class="mx-auto text-center no-gutters"
    color="#00cae3"
    dark
  >
    <v-card-text>
      <v-sheet
        color="rgba(0, 0, 0, .12)"
      >
        <v-sparkline
          :value="value"
          :labels="labels"
          line-width="1"
          color="white"
          height="100"
          padding="24"
          stroke-linecap="round"
          auto-draw

        >
          <template v-slot:label="item">
            {{ item.value }}
          </template>
        </v-sparkline>
      </v-sheet>
    </v-card-text>


    <v-divider></v-divider>

    <v-card-actions class="justify-center">
      <v-btn
        block
        text
        to="/report"
      >
        گزارش کامل
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "TotalUser",
    props:["value", "labels"],
    data: () => ({
    })
}
</script>

<style scoped>

</style>
