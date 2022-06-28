import {createRouter, createWebHistory} from "vue-router";

const router = createRouter(
    {
        history: createWebHistory(import.meta.env.BASE_URL),
        routes: [
            {
                path: "/",
                name: "home",
                component: () => import("@/view/HomeView.vue")
            },
            {
                path: "/about",
                name: "about",
                component: () => import("@/view/AboutView.vue")
            },
            {
                path: "/products",
                name: "products",
                component: () => import("@/view/AboutView.vue")
            }, {
                path: "/projects",
                name: "projects",
                component: () => import("@/view/ProjectsView.vue")
            },
            {
                path: "/highlights",
                name: "highlights",
                component: () => import("@/view/AboutView.vue")
            },
            {
                path: "/card/:id",
                component: () => import("@/view/CardView.vue")
            }
        ]
    }
)

export default router