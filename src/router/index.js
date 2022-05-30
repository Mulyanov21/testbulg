import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/MainPage'
import Mark from '../views/MarkPage'

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/dashboard', component: Main, alias: '/'},
        { path: '/mark/:id/edit', component: Mark}
    ]
})
