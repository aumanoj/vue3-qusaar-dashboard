

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'),
        meta: {
          requiredAuth:true,
          title: 'Dashboard | All Research',
          headerTitle: 'Dashboard',
          metaTags: [
            {
              name: 'description',
              content: 'The transaction page of our example app.'
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.'
            }
          ]
        },
      },
      {path: '/dashboard', component: () => import('pages/Dashboard.vue'),
      name: "dashboard",
        meta: {
          requiredAuth:true,
          title: 'Dashboard | All Research',
          headerTitle: 'Dashboard',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.'
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.'
            }
          ]
        },
      },
      {path: '/menus', component: () => import('pages/Category/index.vue'),
        meta: {
          requiredAuth:true,
          title: 'Menus | Tutorial Example',
          headerTitle: 'Menus',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.'
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.'
            }
          ]
        },
      },
      {path: '/sub-categories', component: () => import('pages/SubCategory/index.vue'),
        meta: {
          requiredAuth:true,
          title: 'Tutorial List | Tutorial Example',
          headerTitle: 'Tutorial List',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.'
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.'
            }
          ]
        },
      },
      {path: '/tutorials', component: () => import('pages/Tutorial/index.vue'),
        meta: {
          requiredAuth:true,
          title: 'Tutorials | Tutorial Example',
          headerTitle: 'Tutorials',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.'
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.'
            }
          ]
        },
      },
      {path: '/posts', component: () => import('pages/Blog/Index.vue'),
        meta: {
          requiredAuth:true,
          title: 'Posts | Tutorial Example',
          headerTitle: 'Posts',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.'
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.'
            }
          ]
        },
      },
      {path: '/side-menu', component: () => import('pages/SideMenu/Index.vue'),
        meta: {
          requiredAuth:true,
          title: 'Side Menu | Tutorial Example',
          headerTitle: 'Side Menu',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.'
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.'
            }
          ]
        },
      },
      {path: '/side-menu/:id', component: () => import('pages/SideMenu/tutorial.vue'),
        meta: {
          requiredAuth:true,
          title: 'Side Menu | Tutorial Example',
          headerTitle: 'Side Menu',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.'
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.'
            }
          ]
        },
      },


      {path: '/new-side-menu', component: () => import('pages/NewSideMenu/Index.vue'),
        meta: {
          requiredAuth:true,
          title: 'New Side Menu | Tutorial Example',
          headerTitle: 'Side Menu',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.'
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.'
            }
          ]
        },
      },
      {path: '/new-side-menu/:id', component: () => import('pages/NewSideMenu/tutorial.vue'),
        meta: {
          requiredAuth:true,
          title: 'New Side Menu | Tutorial Example',
          headerTitle: 'Side Menu',
          metaTags: [
            {
              name: 'description',
              content: 'The about page of our example app.'
            },
            {
              property: 'og:description',
              content: 'The about page of our example app.'
            }
          ]
        },
      },
      
    ]
  },
  
  /*{
    path: '/Login',
    component: () => import('pages/auth/login.vue')
  },
  {
    path: '/register',
    component: () => import('pages/auth/registration.vue')
  },
  {
    path: '/forget-password',
    component: () => import('pages/auth/forget-password.vue')
  },
  {
    path: '/forget-password/otp', component: () => import('pages/auth/otp.vue')
  },*/
  /*{path: '/account', component: () => import('pages/mobile/mobile-account.vue')},*/
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/login',
    component: () => import('pages/Auth/login.vue')
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
