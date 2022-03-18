
import IRoute from '../interface/route'
import lrPage from '../page/lrPage'
import mainPage from '../page/mainPage'

const mainRoute: IRoute[]  = [
  {
    path: '/',
    element: mainPage,
    auth: false
  }
]

const lrRoute: IRoute[] = [
  {
    path: '/register',
    element: lrPage,
    auth: false
  },
  {
    path: '/login',
    element: lrPage,
    auth: false
  }
]


const router: IRoute[] = [
  ...mainRoute,
  ...lrRoute
]


export default router

