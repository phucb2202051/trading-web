import { createRouter, createWebHistory } from "vue-router";
import Login from "@/modules/Login.vue";
import Home from "@/modules/Home.vue";
import Register from "@/modules/Register.vue";
import Session from "@/modules/Session.vue";
import User from "@/modules/User.vue";
import Transaction from "@/modules/Transaction.vue";
import Group from "@/modules/Group.vue";

import { getToken } from "./token";



const routes = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/", component: Home, meta: { requiresAuth: true } },
  { path: "/sessions", component: Session, meta: { requiresAuth: true } },
  { path: "/user", component: User, meta: { requiresAuth: true } },
  { path: "/transaction", component: Transaction, meta: { requiresAuth: true } },
  { path: "/group", component: Group, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const token = getToken();

  if (to.meta.requiresAuth && !token) {
    return "/login"; 
  }

  return true; // 
});

export default router;