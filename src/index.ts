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
                path: "/login",
                name: "login",
                component: () => import("@/view/LoginView.vue")
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
                redirect: {name: "mil"},
            },
            {
                path: "/projects/:project_id",
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
                path: "/mil",
                component: () => import("@/mil/view/MilView.vue"),
                children: [
                    {
                        path: "",
                        name: "mil",
                        component: () => import("@/mil/view/MilObjectsView.vue"),
                    },
                    {
                        path: ":organization_id",
                        component: () => import("@/mil/view/DivisionView.vue"),
                        children: [
                            {
                                path: ":child_route*",
                                component: () => import("@/mil/view/OrganizationView.vue")
                            }
                        ],
                    },
                    {
                        path: "help",
                        name: "mil.help",
                        component: () => import("@/mil/view/HelpView.vue"),
                    },

                ]
            },
            {
                path: "/dod",
                component: () => import("@/dod/view/DodView.vue"),
                children: [
                    {
                        path: "",
                        name: "dod",
                        component: () => import("@/dod/view/DodMenuView.vue"),
                    },
                    {
                        path: "organizations",
                        name: "dod.organizations",
                        component: () => import("@/mil/view/HelpView.vue"),
                    },
                    {
                        path: "equipment",
                        name: "dod.equipment",
                        component: () => import("@/dod/view/EquipmentView.vue"),
                    },
                    {
                        path: "documents",
                        name: "dod.documents",
                        component: () => import("@/mil/view/HelpView.vue"),
                    },
                    {
                        path: "help",
                        name: "dod.help",
                        component: () => import("@/dod/view/HelpView.vue"),
                    },
                ]
            },
            {
                path: "/book",
                name: "book",
                component: () => import("@/view/BookView.vue"),
            },

            {
                path: "/:catchAll(.*)",
                component: () => import("@/view/NotFoundView.vue"),
            },
        ]
    }
)

export default router