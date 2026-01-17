import { createSignal } from 'solid-js'
import supabase from '../../lib/supabase'
import toast from 'solid-toast'

function LoginForm(props) {
  const [email, setEmail] = createSignal('')
  const [password, setPassword] = createSignal('')

  async function handleLogin(e) {
    e.preventDefault()

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email(),
        password: password(),
      })

      if (error) throw error

      toast.success('Welcome back!')
      setTimeout(() => (window.location.href = 'dashboard'), 500)
    } catch (error) {
      toast.error('Error: ' + error)
    }
  }

  return (
    <div id="loginForm" class="w-full">
      <h2 class="text-2xl font-heading font-bold text-neskiBlack mb-6">
        Log In
      </h2>

      <form onSubmit={handleLogin} class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-gray-500 uppercase mb-1 text-left">
            Email
          </label>
          <input
            type="email"
            id="loginEmail"
            value={email()}
            onInput={(e) => setEmail(e.target.value)}
            required
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-neskiGreen transition"
          />
        </div>
        <div>
          <label class="block text-xs font-bold text-gray-500 uppercase mb-1 text-left">
            Password
          </label>
          <input
            type="password"
            id="loginPass"
            value={password()}
            onInput={(e) => setPassword(e.target.value)}
            required
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-neskiGreen transition"
          />
        </div>

        <button
          type="submit"
          id="loginBtn"
          class="w-full py-3 bg-neskiGreen text-white rounded-xl font-bold hover:bg-[#113820] transition shadow-lg mt-4"
        >
          Login to Dashboard
        </button>
      </form>

      <p class="mt-6 flex items-center justify-center gap-1 text-sm text-gray-600">
        New to Neski?
        <button
          class="text-neskiGreen font-bold hover:underline"
          onClick={() => props.form('signup')}
        >
          Create Account
        </button>
      </p>
      <p class="mt-2 text-center text-sm text-gray-600">
        <button
          class="text-neskiGreen font-bold hover:underline"
          onClick={() => props.form('reset')}
        >
          Forgot Password?
        </button>
      </p>
    </div>
  )
}

export default LoginForm
