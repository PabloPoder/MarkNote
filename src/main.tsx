import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Error } from './components/Error.tsx'
import './index.css'

import { Provider } from 'react-redux'
import { store } from './store/index.ts'

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import { NoteDetail } from './components/NoteDetail.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: ':noteId',
        element: <NoteDetail />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
