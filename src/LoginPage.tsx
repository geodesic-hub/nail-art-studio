import { useState } from "react"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "./firebase"
import { FirebaseError } from "firebase/app"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  async function handleSubmit() {
    setMessage("")
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
          if (userCredential) {
            setMessage("Account created successfully!")
            setIsSuccess(true)
          }
        })
      }
      else {
        await signInWithEmailAndPassword(auth, email, password)
      }
    } catch (err: FirebaseError | unknown) {
      setIsSuccess(false)
      setMessage("Invalid email or password. Please create an account if you don't have one or Check your credentials.")
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center">
      <div className="bg-white rounded shadow-md p-6 w-full max-w-md flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-pink-600 text-center">Nail Art Studio</h1>

        <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          {message && (
            <p className={`text-sm ${isSuccess ? "text-green-500" : "text-red-500"}`}>
              {message}
            </p>
          )}
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg py-2 transition-colors"
          >
            {isSignUp ? "Create Account" : "Sign In"}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={() => setIsSignUp(!isSignUp)} className="text-pink-500 hover:underline">
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>

      </div>

    </div>
  )
}
