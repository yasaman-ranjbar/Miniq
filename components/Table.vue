<template>
  <v-data-table
    :headers="headers"
    :items="lists"
    :items-per-page="itemsPerPage"
    item-key="name"
    class="elevation-1"
  >
    <template v-slot:body.append></template>
  </v-data-table>
</template>

<script>
export default {
  name: "Table",

  props: {
    headers: {
      type: Array,
      default() {
        return [];
      },
    },
    lists: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  data() {
    return {
      itemsPerPage : 15,
    }
  }

}
</script>

<style scoped>

</style>
