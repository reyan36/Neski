import './login.css'
import WelcomePanel from '../components/WelcomePanel'
import LoginForm from '../components/Forms/LoginForm'
import ResetForm from '../components/Forms/ResetForm'
import SignupForm from '../components/Forms/SignupForm'
import { createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Dynamic } from 'solid-js/web'

function Login() {
  const [form, setForm] = createSignal('login')
  const [message, showMessage] = createStore([
    {
      id: 0,
      message: '',
      type: '',
    },
  ])

  const forms = {
    login: LoginForm,
    signup: SignupForm,
    reset: ResetForm,
  }

  return (
    <div class="bg-neskiBeige font-body flex items-center justify-center min-h-screen p-4 md:p-6">
      <div class="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row min-h-150">
        <WelcomePanel />
        <div class="w-full md:w-1/2 p-8 md:p-12 bg-white flex flex-col justify-center transition-all duration-300">
          <Dynamic component={forms[form()]} form={setForm} />
        </div>
      </div>
    </div>
  )
}

export default Login
