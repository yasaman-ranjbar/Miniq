<template>
  <v-card
    class="mx-auto text-center no-gutters"
    color="cyan darken-1"
    dark
    max-width="800"
  >
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline
          :value="value"
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
        بازی های گروهی
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
  name: "GroupGame",

  data: () => ({
    value: [
      0,
      40,
      40,
      40,
      41,
      41,
      44,
      44,
    ],
  })
}
</script>

<style scoped>

</style>
