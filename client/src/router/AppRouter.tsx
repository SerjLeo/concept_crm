import React from 'react'
import {Route, Routes} from 'react-router-dom'
import GuardedRoute from './GuardedRoute'

import NotFound from '../pages/NotFound/NotFound'
import MainLayout from '../layouts/MainLayout'
import useTypedSelector from '../hooks/useTypedSelector'
import Spinner from '../components/Spinner/Spinner'

const Login = React.lazy(() => import('../pages/Auth/Login'))
const Landing = React.lazy(() => import('../pages/Landing/Landing'))

const AppRouter = () => {
  const {isAuth, initialLoading} = useTypedSelector(state => state.user)

  if (initialLoading) return (
    <Routes>
      <Route path="*" element={<MainLayout/>}>
        <Route index element={<Spinner/>}/>
      </Route>
    </Routes>
  )

  const globalRoutes = () => {
    return (
      <Route
        path="/"
        element={<MainLayout/>}
      >
        <Route
          path="*"
          element={<NotFound/>}
        />
      </Route>
    )
  }

  const notAuthenticatedRoutes = () => {
    return (
      <Route
        path="/"
        element={<GuardedRoute isAuth={isAuth} permission="notAuth"><MainLayout/></GuardedRoute>}
      >
        <Route index element={<Landing/>} />
        <Route path="login" element={<Login/>}/>
      </Route>
    )
  }

  return (
    <Routes>
      {globalRoutes()}
      {notAuthenticatedRoutes()}
      <Route
        path="/"
        element={<GuardedRoute isAuth={isAuth}><MainLayout/></GuardedRoute>}
      >
        {/*<Route path="dashboard" element={<Dashboard/>}/>*/}
        {/*<Route path="categories" element={<CategoriesList/>}>*/}
        {/*	<Route path="create" element={<CreateCategoryForm/>}/>*/}
        {/*	<Route path=":categoryId" element={<CategoryPage/>}/>*/}
        {/*</Route>*/}
      </Route>
    </Routes>
  )
}

export default AppRouter
