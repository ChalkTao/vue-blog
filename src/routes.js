import LoginView from './views/Login.vue'
import RegisterView from './views/Register.vue'
import NotFoundView from './views/NotFound.vue'
import AdminView from './views/Admin.vue'
import DashView from './views/Dash.vue'
import ArticleView from './views/Article.vue'
import ArticlesView from './views/Articles.vue'
import CalendarView from './views/Calendar.vue'
import TaskView from './views/Task.vue'

const routers = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/',
    component: AdminView,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'admin_dashboard',
        component: DashView
      },
      {
        path: 'article/:aid',
        name: 'article',
        component: ArticleView
      },
      {
        path: 'articles',
        name: 'articles',
        component: ArticlesView
      },
      {
        path: 'calendar',
        name: 'calendar',
        component: CalendarView
      },
      {
        path: 'task/:day',
        name: 'task',
        component: TaskView
      }
    ]
  },
  {
    path: '*',
    component: NotFoundView
  }
]

export default routers
