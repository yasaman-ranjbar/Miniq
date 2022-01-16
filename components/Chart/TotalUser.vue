<template>
  <v-card
    class="mx-auto text-center no-gutters"
    color="orange darken-2"
    dark
    max-width="800"
  >
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline
          :value="value"
          :labels="labels"
          color="white"
          height="100"
          padding="24"
          stroke-linecap="round"
          smooth
          auto-draw

        >
          <template v-slot:label="item">
            {{ item.value }}
          </template>
        </v-sparkline>
      </v-sheet>
    </v-card-text>

    <v-card-text>
      <div class="text-h6">
        تعداد کاربران
      </div>
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
