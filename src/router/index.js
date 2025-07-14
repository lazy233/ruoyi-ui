import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/store/user';
// import HomePage from '@/views/HomePage.vue';  // 更新为 HomePage
import Login from '@/views/LoginPage.vue';
import Register from '@/views/RegisterPage.vue';
import ConsoleLayout from '@/layouts/ConsoleLayout.vue';
import HomePage from '@/views/HomePage.vue';
import UserManagement from '@/views/UserManagement.vue';
import DepartmentManagement from '@/views/DepartmentManagement.vue';
import RolesManagement from '@/views/RolesManagement.vue';
import SystemManagement from '@/views/SystemSettings.vue';
import CourseLearning from '@/views/CourseLearning.vue';
import CourseManagement from '@/views/CourseManagement.vue';



const routes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { 
        path: '/course-learning/:id', 
        component: CourseLearning,
        meta: { requiresAuth: true }  // 添加权限验证
    },
    {
        path: '/console',
        component: ConsoleLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'HomePage',
                component: HomePage
            },
            {
                path: 'users',
                name: 'UserManagement',
                component: UserManagement
            },
            {
                path: 'departments',
                name: 'DepartmentManagement',
                component: DepartmentManagement
            },
            {
                path: 'courses',
                name: 'CourseManagement',
                component: CourseManagement
            },
            {
                path: 'roles',
                name: 'RolesManagement',
                component: RolesManagement
            },{
                path: 'settings',
                name: 'SystemManagement',
                component: SystemManagement
            }
        ]
    },
    {
        path: '/',
        name: 'Home',
        component: Login  // 配置首页路由
    }
   /* {
        path: '/',
        component: () => import('@/views/Home.vue'), // 替换为你的首页组件
        meta: { requiresAuth: true },
    }*/,
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
    console.log('Route navigation:', { from: from.path, to: to.path });
    const store = useUserStore();
    if (to.meta.requiresAuth && !store.token) {
        next('/login');
    } else {
        next();
    }
});

export default router;
