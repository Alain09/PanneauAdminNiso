"use client"

import { useState } from 'react'
import { useRouter} from 'next/navigation'
import { signIn } from '@/src/lib/auth-client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { Alert, AlertDescription } from '@/src/components/ui/alert'

import { AlertCircle, LogIn } from 'lucide-react'
import { createAuthClient } from 'better-auth/react'
export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [succes, setSuccess] = useState('')
  const [open, setOpen] = useState(false)


  const router = useRouter()


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn.email({
        email: formData.email,
        password: formData.password,
      })

      if (result.error) {
        setError(result.error.message || 'Erreur de connexion')
        setOpen(false)
      } else {
        setOpen(true)
        setSuccess('Connexion réussie!')
        setTimeout(() => {

        }, 10000);

        router.push('/dashboard')


      }
    } catch (err) {
      setError('Une erreur est survenue lors de la connexion')

    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }


  //
  const authClient = createAuthClient();
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Connexion Admin
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Connectez-vous à votre compte administrateur
          </p>
        </div>

        {!open ?
          (error &&
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-700">
                {error}
              </AlertDescription>
            </Alert>
          )
          : (succes && (
            <Alert className="border-green-200 bg-green-50">
              <AlertCircle className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-green-700">
                {succes}
              </AlertDescription>
            </Alert>
          ))}



        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LogIn className="h-5 w-5" />
              Connexion
            </CardTitle>
            <CardDescription>
              Entrez vos identifiants d'administrateur
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </Button>
            </form>
            <Button
              className="w-full mt-10 bg-gray-100 text-black hover:bg-black hover:text-gray-50"
              onClick={() =>
                authClient.signIn.social({
                  provider: "google",
                  callbackURL: "/dashboard",
                })
              }
            >
              Connexion via Google
            </Button>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-600">
          <p>Seuls les administrateurs peuvent accéder au système</p>
        </div>
      </div>
    </div>
  )
}