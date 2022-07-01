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
            },
            {
                path: "/projects",
                name: "projects",
                redirect: {name: "projects.show"},
                component: () => import("@/view/projects/ProjectsView.vue"),
                children: [
                    {
                        path: "",
                        name: "projects.show",
                        component: () => import("@/view/projects/ProjectsShowView.vue"),
                    },
                    {
                        path: "add",
                        name: "projects.add",
                        component: () => import("@/view/projects/ProjectsAddView.vue")
                    },
                    {
                        path: "edit",
                        name: "projects.edit",
                        component: () => import("@/view/projects/ProjectsEditView.vue")
                    },
                ]
            },
            {
                path: "/highlights",
                name: "highlights",
                component: () => import("@/view/AboutView.vue")
            },
            {
                path: "/projects/i/:url",
                redirect: {name: "project.show"},
                component: () => import("@/view/project/ProjectView.vue"),
                children: [
                    {
                        path: "",
                        name: "project.show",
                        component: () => import("@/view/project/ProjectShowView.vue")
                    },
                    {
                        path: "edit",
                        name: "project.edit",
                        component: () => import("@/view/project/ProjectEditView.vue")
                    }
                ]
            },
            {
                path: "/:catchAll(.*)",
                component: () => import("@/view/NotFoundView.vue"),
            },
        ]
    }
)

export default router