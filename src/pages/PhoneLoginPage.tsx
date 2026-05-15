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
import { Phone, Send } from "lucide-react"

export const PhoneLoginPage = () => {
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
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Número de Teléfono</Label>
            <div className="relative">
              <Phone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder="9934-9694"
                className="pl-10"
                defaultValue=""
              />
            </div>
          </div>

          <Button className="w-full" type="button">
            <Send className="mr-2 size-4" />
            Enviar enlace de acceso
          </Button>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          Acceso Consejería
        </Button>
      </div>
    </div>
  )
}

export default PhoneLoginPage
