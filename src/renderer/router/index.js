import Vue from 'vue'
import Router from 'vue-router'
import CheckAuth from './auth-check'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: require('@/views/Auth/Login').default,
      meta: {
        auth: true
      }
    },
    {
      path: '/',
      name: 'Home',
      component: require('@/views/Home/index').default,
      children: [
        {
          path: '/all-items',
          name: 'AllItems',
          component: require('@/views/AllItems/index').default
        },
        {
          path: '/logins',
          name: 'Logins',
          component: require('@/views/Logins/index').default
        },
        {
          path: '/private-notes',
          name: 'PrivateNotes',
          component: require('@/views/PrivateNotes/index').default
        },
        {
          path: '/credit-cards',
          name: 'CreditCards',
          component: require('@/views/CreditCards/index').default
        },
        {
          path: '/identities',
          name: 'Identities',
          component: require('@/views/Identities/index').default
        },
        {
          path: '/trash',
          name: 'Trash',
          component: require('@/views/Trash/index').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach(CheckAuth)

export default router
