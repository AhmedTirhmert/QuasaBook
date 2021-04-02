const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: "index",
        name: "Home",
        component: () => import("pages/Index.vue"),
        meta: {
          requireAuth: true
        }
      },
      {
        path: "weather",
        name: "Weather",
        component: () => import("pages/Weather.vue"),
        meta: {
          requireAuth: true
        }
      },
      {
        path: "users",
        name: "Users",
        component: () => import("pages/users.vue"),
        meta: {
          requireAuth: true
        },
        cildren: []
      },
      {
        path: "profile/:userId",
        name: "Profile",
        component: () => import("pages/Profile.vue"),
        meta: {
          requireAuth: true
        }
      },
      {
        path: "chat/:otherUserId",
        name: "Chat",
        component: () => import("pages/Chat.vue"),
        meta: {
          requireAuth: true
        }
      },
      {
        path: "morse",
        name: "Morse",
        component: () => import("pages/Morse.vue"),
        meta: {
          requireAuth: true
        }
      },
      {
        path: "Photos",
        name: "Photos",
        component: () => import("pages/Photos.vue"),
        meta: {
          requireAuth: true
        }
      },

      {
        path: "Login",
        name: "Login",
        component: () => import("pages/LoginRegister.vue"),
        meta: {
          guest: true
        }
      },
      {
        path: "Photos",
        name: "Photos",
        component: () => import("pages/Photos.vue"),
        meta: {
          requireAuth: true
        }
      },
      {
        path: "AfterRegister",
        name: "AfterRegister",
        component: () => import("pages/AfterRegister.vue"),
        meta: {
          requireAuth: true
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/NotFound",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
