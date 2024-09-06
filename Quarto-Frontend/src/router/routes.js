const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/landingPage.vue") }],
  },

  {
    path: "/menu",
    component: () => import("layouts/MainLayoutMenu.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/menuApartmentPage.vue"),
      },
      {
        path: "/perfil",
        component: () => import("pages/perfilUsuario.vue"),
      },
      {
        path: "/perfil/edit",
        component: () => import("pages/editarPerfil.vue"),
      },
      {
        path: "/viajes",
        component: () => import("pages/RentPropertiesPage.vue"),
      },
      {
        path: "/infoApartment",
        component: () => import("pages/InfoProperty.vue"),
      },
      {
        path: "/createApartment",
        component: () => import("pages/createApartment.vue"),
      },
      {
        path: "/hospedajes/creados",
        component: () => import("pages/PropertycreatedPage.vue"),
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },

  {
    path: "/register",
    component: () => import("pages/registerPage.vue"),
  },
  {
    path: "/login",
    component: () => import("pages/loginPage.vue"),
  },

  {
    path: "/success",
    component: () => import("pages/SuccessPage.vue"),
  },
  {
    path: "/cancel",
    component: () => import("pages/CancelPage.vue"),
  },
];

export default routes;
