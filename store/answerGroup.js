export default {
    actions: {
        create({ commit }, payload) {
    
            return this.$axios({
            url: `api/admin/answers/bulk/${payload.Question_Id}`,
            method: "post",
            data: {
                answers: {
                    text: payload.text,
                    is_correct: payload.is_correct
                }
            }
            })
            .then(res => {
                if (res.status === 200) {
                if (res.data.result) {
                    return res.data.result;
                }
                }
            })
            .catch(err => {
                return false;
            });
        },
    }
}