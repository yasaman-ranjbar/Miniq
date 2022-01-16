import Vue from 'vue'
export default function () {
  Vue.filter('formatDate', val => {
    let date = new Date(val).toLocaleDateString("fa-IR");
    return date;
  })
}
