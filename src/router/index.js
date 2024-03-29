import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
            }, {
                path: "/account",
                name: "account",
                meta: {
                    title: '账号管理'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/user/Account.vue")
            },{
                path: "/users",
                name: "users",
                meta: {
                    title: '用户管理'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/user/Users.vue")
            }, {
                path: "/role",
                name: "role",
                meta: {
                    title: '角色管理'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/user/Role.vue")
            }, {
                path: "/url",
                name: "url",
                meta: {
                    title: '接口管理'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/user/Url.vue")
            },{
                path: "/operate",
                name: "operate",
                meta: {
                    title: '操作管理'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/user/Operate.vue")
            }, {
                path: "/category",
                name: "category",
                meta: {
                    title: '类目管理'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/blog/Category.vue")
            }, {
                path: "/essay",
                name: "essay",
                meta: {
                    title: '博客管理'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/blog/Essay.vue")
            }, {
                path: "/channel",
                name: "channel",
                meta: {
                    title: '轮播管理'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/home/Channel.vue")
            }, {
                path: "/search",
                name: "search",
                meta: {
                    title: '搜索管理'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/home/Search.vue")
            }, {
                path: "/history",
                name: "history",
                meta: {
                    title: '历史管理'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/home/History.vue")
            },{
                path: "/recommend",
                name: "recommend",
                meta: {
                    title: '热门博客管理'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/home/Recommend.vue")
            },{
                path: "/userRecommend",
                name: "userRecommend",
                meta: {
                    title: '热门博主管理'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/home/UserRecommend.vue")
            }, {
                path: "/charts",
                name: "basecharts",
                meta: {
                    title: '图表'
                },
                component: () => import ( /* webpackChunkName: "charts" */ "../views/BaseCharts.vue")
            }, {
                path: '/user',
                name: 'user',
                meta: {
                    title: '个人中心'
                },
                component: () => import (/* webpackChunkName: "user" */ '../views/User.vue')
            }, {
                path: '/editor',
                name: 'editor',
                meta: {
                    title: '富文本编辑器'
                },
                component: () => import (/* webpackChunkName: "editor" */ '../views/Editor.vue')
            }
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import ( /* webpackChunkName: "login" */ "../views/Login.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | 博客后台管理系统`;
    const token = localStorage.getItem('wtoken');
    const role = localStorage.getItem('wrole_id');
    if (token == null && role==null && to.path !== '/login') {
        next('/login');
    } else {
        next();
    }
});

export default router;