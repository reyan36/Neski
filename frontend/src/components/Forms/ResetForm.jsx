import supabase from '../../lib/supabase'
import { createSignal } from 'solid-js'
import toast from 'solid-toast'

function ResetForm(props) {
  const [email, setEmail] = createSignal('')

  async function handleReset(e) {
    e.preventDefault()

    try {
      // This sends an email with a link that logs the user in
      const { data, error } = await supabase.auth.resetPasswordForEmail(
        email(),
        {
          redirectTo: window.location.origin + '/dashboard.html', // Redirects to dashboard after clicking email link
        }
      )

      if (error) throw error

      toast.success('Check your email for the reset link!')

      // Optional: Go back to login after a few seconds
      setTimeout(() => props.form('login'), 4000)
    } catch (error) {
      toast.error('Error:' + error)
    } finally {
    }
  }

  return (
    <div id="resetForm" class="w-full">
      <h2 class="text-2xl font-heading font-bold text-neskiBlack mb-2">
        Reset Password
      </h2>
      <p class="text-sm text-gray-500 mb-6">
        Enter your email and we'll send you a link to reset your password.
      </p>

      <form onSubmit={handleReset} class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-gray-500 uppercase mb-1">
            Email
          </label>
          <input
            type="email"
            id="resetEmail"
            value={email()}
            onInput={(e) => setEmail(e.target.value)}
            required
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-neskiGreen transition"
          />
        </div>

        <button
          type="submit"
          id="resetBtn"
          class="w-full py-3 bg-neskiGreen text-white rounded-xl font-bold hover:bg-[#113820] transition shadow-lg mt-4"
        >
          Send Reset Link
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-gray-600">
        Remembered it?
        <button
          onClick={() => props.form('login')}
          class="text-neskiGreen font-bold hover:underline"
        >
          Back to Login
        </button>
      </p>
    </div>
  )
}

export default ResetForm
