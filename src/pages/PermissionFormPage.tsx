import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle2, Send, RefreshCw, AlertCircle, Clock } from 'lucide-react'

export const PermissionFormPage = () => {
  const { tokenId: token } = useParams()
  
  // Mock data
  const parentName = 'Juan Pérez'
  const studentName = 'Juanito Pérez'
  
  // View states
  const [viewState, setViewState] = useState<'form' | 'status'>('form')
  const [permission, setPermission] = useState<any>(null)
  
  // Form fields
  const [studentGrade, setStudentGrade] = useState('')
  const [reason, setReason] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  // Simular validación de solicitud existente
  useEffect(() => {
    // Si el número es uno específico, simulamos que ya tiene solicitud
    if (token === '99345673') {
      setPermission({
        status: 'Pendiente',
        studentName: studentName,
        date: '2026-05-20 al 2026-05-22',
        reason: 'Viaje familiar'
      })
      setViewState('status')
    } else {
      setViewState('form')
    }
  }, [token])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Basic Validations
    if (!studentGrade.trim()) {
      setError('Debe ingresar el grado del estudiante.')
      return
    }
    if (!startDate) {
      setError('Debe seleccionar una fecha de inicio.')
      return
    }
    if (!endDate) {
      setError('Debe seleccionar una fecha de finalización.')
      return
    }
    if (new Date(startDate) > new Date(endDate)) {
      setError('La fecha de inicio no puede ser posterior a la fecha final.')
      return
    }
    if (!reason.trim() || reason.trim().length < 5) {
      setError('Debe ingresar un motivo válido (mínimo 5 caracteres).')
      return
    }

    setIsSubmitting(true)
    
    // Simulate brief delay
    setTimeout(() => {
      setPermission({
        status: 'Pendiente',
        studentName: studentName,
        date: `${startDate} al ${endDate}`,
        reason: reason
      })
      setSubmitted(true)
      setIsSubmitting(false)
      
      // Cambiar a vista de estado después de 1.5s
      setTimeout(() => {
        setViewState('status')
      }, 1500)
    }, 1000)
  }

  const handleRefresh = () => {
    // Aquí se refrescaría el estado desde el backend
    console.log("Refrescando estado...")
  }

  if (viewState === 'status' && permission) {
    return (
      <div className="w-full max-w-md space-y-6 mx-auto mt-8">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Estado de tu Solicitud</CardTitle>
            <CardDescription>
              Hola {parentName}, aquí está el estado de tu trámite
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Status indicator */}
            <div className={`p-4 rounded-lg text-center ${
              permission.status === 'Aprobado' 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-yellow-50 border border-yellow-200'
            }`}>
              {permission.status === 'Aprobado' ? (
                <>
                  <CheckCircle2 className="h-10 w-10 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold text-green-700">Aprobado</p>
                </>
              ) : (
                <>
                  <Clock className="h-10 w-10 text-yellow-600 mx-auto mb-2" />
                  <p className="font-semibold text-yellow-700">Pendiente de Aprobación</p>
                </>
              )}
            </div>

            {/* Request details */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Estudiante:</span>
                <span className="font-medium">{permission.studentName}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Fecha del permiso:</span>
                <span className="font-medium">{permission.date}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Motivo:</span>
                <span className="font-medium">{permission.reason}</span>
              </div>
            </div>

            <Button variant="outline" onClick={handleRefresh} className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualizar estado
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Guarda este enlace para consultar el estado de tu solicitud
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md space-y-6 mx-auto mt-8">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Solicitar Permiso</CardTitle>
          <CardDescription>
            Hola {parentName}, completa el formulario para {studentName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="p-8 text-center space-y-4">
              <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
              <p className="font-semibold text-green-700">Solicitud Enviada</p>
              <p className="text-sm text-muted-foreground">Redirigiendo a estado de solicitud...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Padre/Madre</Label>
                  <Input value={parentName} disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label>Estudiante</Label>
                  <Input value={studentName} disabled className="bg-muted" />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200">
                  <AlertCircle className="h-4 w-4" />
                  <p>{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="studentGrade">Grado del Estudiante *</Label>
                <Input
                  id="studentGrade"
                  type="text"
                  placeholder="Ej: 8vo Grado"
                  value={studentGrade}
                  onChange={(e) => setStudentGrade(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Desde *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Hasta *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    min={startDate || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Motivo del Permiso *</Label>
                <Textarea
                  id="reason"
                  placeholder="Ej: Cita médica, compromiso familiar..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Solicitud
                  </>
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default PermissionFormPage