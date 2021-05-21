import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from './layout/Layout'

export const constantRouterMap = [
    {
        path: '/404',
        name: 'notFound',
        component: () => import('./404'),
        hidden: true
    }
]

export const menuMap = [
    {
        path: '',
        component: Layout,
        name: 'overview',
        meta: {title: '概览', icon: 'settings'},
        children: [
            {
                path: 'overview/home',
                name: 'overview.home',
                meta: {
                    title: '概览',
                    icon: 'settings',
                    permissions: ['overview.home']
                },
                component: () => import('./overview/Overview')
            }
        ]
    },
    {
        path: '',
        component: Layout,
        name: 'overview',
        meta: {title: '项目管理', icon: 'settings'},
        children: [
            {
                path: 'project/home',
                name: 'project.home',
                meta: {
                    title: '项目管理',
                    icon: 'settings',
                    permissions: ['overview.home']
                },
                component: () => import('./project/Home')
            },
            {
                path: 'project/create',
                name: 'project.create',
                meta: {
                    title: '添加项目',
                    icon: 'settings',
                    permissions: ['overview.home']
                },
                component: () => import('./project/Form'),
                hidden: true
            },
            {
                path: 'project/:id',
                name: 'project.detail',
                meta: {
                    title: '添加项目',
                    icon: 'settings',
                    permissions: ['overview.home']
                },
                component: () => import('./project/Detail'),
                hidden: true
            },
            {
                path: 'project/detail',
                name: 'project.detail',
                meta: {
                    title: '项目查看',
                    icon: 'settings',
                    permissions: ['overview.home']
                },
                component: () => import('./project/Detail'),
                hidden: true
            }
        ]
    },

    {
        path: '',
        component: Layout,
        name: '工作管理',
        meta: {title: '工作管理', icon: 'settings'},
        children: [
            {
                path: 'work/home',
                name: 'work.home',
                meta: {
                    title: '工作管理',
                    icon: 'settings',
                    permissions: ['overview.home']
                },
                component: () => import('./work/Home')
            },
            {
                path: 'work/create',
                name: 'work.create',
                meta: {
                    title: '工作添加',
                    icon: 'settings',
                    permissions: ['overview.home']
                },
                component: () => import('./work/Form'),
                hidden: true
            },
            {
                path: 'work/:id',
                name: 'work.detail',
                meta: {
                    title: '工作添加',
                    icon: 'settings',
                    permissions: ['overview.home']
                },
                component: () => import('./work/Detail'),
                hidden: true
            },
            {
                path: 'work/edit',
                name: 'work.edit',
                meta: {
                    title: '工作添加',
                    icon: 'settings',
                    permissions: ['overview.home']
                },
                component: () => import('./work/Form'),
                hidden: true
            },
            {
                path: 'work/detail',
                name: 'work.detail',
                meta: {
                    title: '查看信息',
                    icon: 'settings',
                    permissions: ['overview.home']
                },
                component: () => import('./work/Detail'),
                hidden: true
            }
        ]
    },
    {
        path: '',
        component: Layout,
        name: 'overview',
        meta: {title: '简历管理', icon: 'settings'},
        children: [
            {
                path: 'resume/home',
                name: 'resume.home',
                meta: {
                    title: '简历管理',
                    icon: 'settings',
                    permissions: ['overview.home']
                },
                component: () => import('./resume/Home')
            },
            {
                path: 'resume/create',
                name: 'resume.create',
                meta: {
                    title: '简历管理',
                    icon: 'settings',
                    permissions: ['overview.home']
                },
                component: () => import('./resume/Form')
            }
        ]
    },
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
})
