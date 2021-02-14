import { FC, useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'

import { auth, googleAuthProvider } from '../utils/firebase'
import { AuthContext } from '../auth/AuthProvider'

const SignUp: FC = () => {
    const router = useRouter()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            user && router.push('/')
        })
    }, [])

    const createUser = async (e) => {
        e.preventDefault()
        try {
            await auth.createUserWithEmailAndPassword(email, password)
            router.push('/login')
        } catch (err) {
            alert(err.message)
        }
    }

    const googleAuth = async (e) => {
        e.preventDefault()
        try {
            await auth.signInWithPopup(googleAuthProvider)
            router.push('/login')
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <div className="wrapper">
            <form className="auth" onSubmit={createUser}>
                <div>
                    <label htmlFor="email" className="auth-label">
                        Email:{' '}
                    </label>
                    <input
                        id="email"
                        className="auth-input"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mt-2">
                    <label htmlFor="password" className="auth-label">
                        Password:{' '}
                    </label>
                    <input
                        id="password"
                        className="auth-input"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="auth-btn" type="submit">
                    SignUp
                </button>
                <button className="auth-btn" onClick={(e) => googleAuth(e)}>
                    GoogleIDで登録/ログインする
                </button>
            </form>
            <Link href="/login">
                <a className="auth-link">Login</a>
            </Link>
        </div>
    )
}

export default SignUp