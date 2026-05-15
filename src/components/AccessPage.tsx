'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { Phone, Send, Copy, Check } from 'lucide-react'


export function PhoneLogin() {
  const [phone, setPhone] = useState('')
  const [generatedLink, setGeneratedLink] = useState('')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  const handleSendLink = () => {
    setError('')
    setCopied(false)
    
    const cleanPhone = phone.replace(/\D/g, '')
    
    if (!cleanPhone || cleanPhone.length < 10) {
      setError('Ingrese un número de teléfono válido')
      return
    }

    if (!isValidPhone(cleanPhone)) {
      setError('Número no registrado en el sistema')
      return
    }

    const token = generateToken()
    saveToken(token, cleanPhone)
    
    // Generate magic link
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
    const link = `${baseUrl}/acceso?token=${token}&phone=${cleanPhone}`
    setGeneratedLink(link)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
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
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder="809-123-4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          <Button onClick={handleSendLink} className="w-full">
            <Send className="h-4 w-4 mr-2" />
            Enviar enlace de acceso
          </Button>

          {generatedLink && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg space-y-3">
              <p className="text-sm text-green-700 font-medium">
                Enlace enviado a tu WhatsApp
              </p>
              <div className="flex gap-2">
                <Input 
                  value={generatedLink} 
                  readOnly 
                  className="text-xs bg-white"
                />
                <Button variant="outline" size="icon" onClick={handleCopy}>
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Para la demo: copia este enlace y ábrelo en otra pestaña
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Demo info */}
      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <p className="text-sm font-medium mb-2">Teléfonos de prueba:</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            {Object.entries(MOCK_USERS).map(([phone, user]) => (
              <li key={phone}>
                <span className="font-mono">{phone}</span> - {user.parentName}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Counselor access */}
      <div className="text-center">
        <Link href="/consejero">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Acceso Consejería
          </Button>
        </Link>
      </div>
    </div>
  )
}