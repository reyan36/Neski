import supabase from '../../lib/supabase'
import { createSignal } from 'solid-js'
import toast from 'solid-toast'

function SignupForm(props) {
  const [name, setName] = createSignal('')
  const [email, setEmail] = createSignal('')
  const [password, setPassword] = createSignal('')
  const [zip, setZip] = createSignal('')

  async function handleSignup(e) {
    e.preventDefault()

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email(),
        password: password(),
      })

      if (error) throw error

      if (data.user) {
        const { error: profileError } = await supabase.from('profiles').insert([
          {
            id: data.user.id,
            email: email(),
            name: name(),
            zip: zip(),
            balance: 5,
          },
        ])

        if (profileError) throw profileError

        toast.success('Account created! Redirecting...')
        setTimeout(() => (window.location.href = 'dashboard'), 1000)
      }
    } catch (error) {
      toast.error('Error: ' + error)
    }
  }

  return (
    <div id="signupForm" class="w-full">
      <h2 class="text-2xl font-heading font-bold text-neskiBlack mb-6">
        Create Account
      </h2>

      <form onSubmit={handleSignup} class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">
              First Name
            </label>
            <input
              type="text"
              id="regName"
              value={name()}
              onInput={(e) => setName(e.target.value)}
              required
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-neskiGreen"
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase mb-1">
              Zip Code
            </label>
            <input
              type="text"
              id="regZip"
              value={zip()}
              onInput={(e) => setZip(e.target.value)}
              required
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-neskiGreen"
            />
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold text-gray-500 uppercase mb-1">
            Email
          </label>
          <input
            type="email"
            id="regEmail"
            value={email()}
            onInput={(e) => setEmail(e.target.value)}
            required
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-neskiGreen"
          />
        </div>
        <div>
          <label class="block text-xs font-bold text-gray-500 uppercase mb-1">
            Password
          </label>
          <input
            type="password"
            id="regPass"
            value={password()}
            onInput={(e) => setPassword(e.target.value)}
            required
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-neskiGreen"
          />
        </div>

        <button
          type="submit"
          id="signupBtn"
          class="w-full py-3 bg-neskiGreen text-white rounded-xl font-bold hover:bg-[#113820] transition shadow-lg mt-4"
        >
          Join Community
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-gray-600">
        Already have an account?
        <button
          onClick={() => props.form('login')}
          class="text-neskiGreen font-bold hover:underline"
        >
          Login here
        </button>
      </p>
    </div>
  )
}

export default SignupForm
