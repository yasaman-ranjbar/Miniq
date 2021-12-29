export default {

  actions: {
    list({commit}, payload) {
      return this.$axios({
        url: `/api/admin/dashboard/list?page=${payload.page}`,
        method: 'get',
        data: {
          register_count: payload.register_count,
          total_register_count: payload.total_register_count,
          total_solo_game_count: payload.total_solo_game_count,
          solo_game_count: payload.solo_game_count,
          total_group_game_count: payload.total_group_game_count,
          group_game_count: payload.group_game_count,
          total_charge_gift_count: payload.total_charge_gift_count,
          total_code_gift_count: payload.total_charge_gift_count,
          code_gift_count: payload.ode_gift_count,
          report_date: payload.report_date,
        }
      })
        .then(res => {
          if (res.status === 200) {
            if (res.data.result.data) {
              return res.data.result;
            }
          }
        })
        .catch(err => {
          err.message
        });
    },
  }
}
