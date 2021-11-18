export default(context) => {
    if(!context.store.state.auth.loggedIn){
        return redirect ('/login')
    }
}