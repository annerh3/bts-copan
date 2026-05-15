import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Phone, Send, RefreshCw } from "lucide-react"
import { Link, useNavigate } from "react-router"
import { sendMagicLink } from "@/api/auth"

export const PhoneLoginPage = () => {
  const navigate = useNavigate()
  const [phone, setPhone] = useState("")
  const [error, setError] = useState("")

  const { mutate, isPending } = useMutation({
    mutationFn: sendMagicLink,
    onSuccess: (_, cleanPhone) => {
      navigate(`./acceso/${cleanPhone}`)
    },
    onError: (error: Error) => {
      console.log("Error al conectar:", error)
      setError(error.message)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const cleanPhone = phone.replace(/\D/g, "")
    
    if (!cleanPhone || cleanPhone.length < 8) {
      setError("Ingrese un número de teléfono válido (mínimo 8 dígitos)")
      return
    }

    mutate(cleanPhone)
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-foreground">
          Permisos Escolares
        </h1>
        <p className="mt-2 text-muted-foreground">Portal de padres</p>
      </div>

      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Acceso para Padres</CardTitle>
          <CardDescription>
            Ingrese su número de teléfono para recibir su enlace de acceso
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Número de Teléfono</Label>
              <div className="relative">
                <Phone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="9934-9694"
                  className="pl-10"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>

            <Button className="w-full" type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <RefreshCw className="mr-2 size-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="mr-2 size-4" />
                  Enviar enlace de acceso
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="text-center">
        <Link to="/admin" className="text-muted-foreground text-sm hover:underline">
          Acceso Consejería
        </Link>
      </div>
    </div>
  )
}

export default PhoneLoginPage

