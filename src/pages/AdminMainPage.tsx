import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft, CheckCircle2, RefreshCcw, XCircle, Eye } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { getPermissionsPage } from "@/api/supa"

interface Solicitud {
  id: number
  student_name: string
  student_id: string
  student_grade: string
  parent_phone: string
  reason: string
  start_date: string
  end_date: string
  status: string
  observations?: string
}

export const AdminMainPage = () => {
  const [data, setData] = useState<Solicitud[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  // Función para actualizar el estado de una solicitud
  const navigate = useNavigate()

  // Función para actualizar el estado de una solicitud
  const handleStatus = (id: number, newStatus: string) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    )
    console.log(`Solicitud ${id} cambiada a ${newStatus} en el cliente.`)
  }

  // Función para renderizar el badge de estado
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "Aprobado":
        return (
          <Badge
            variant="default"
            className="gap-1 border-green-300 bg-green-100 text-green-700 hover:bg-green-300"
          >
            Aprobado
          </Badge>
        )
      case "Rechazado":
        return (
          <Badge
            variant="default"
            className="gap-1 border-red-300 bg-red-100 text-red-700 hover:bg-red-300"
          >
            Rechazado
          </Badge>
        )
      default:
        return (
          <Badge
            variant="default"
            className="gap-1 border-yellow-300 bg-yellow-100 text-yellow-700 hover:bg-yellow-300"
          >
            Pendiente
          </Badge>
        )
    }
  }

  // Función para cargar los datos de forma aislada
  const loadInitialData = async () => {
    setIsLoading(true)
    const resultado = await getPermissionsPage({
      p_page: 1,
      p_per_page: 10,
      p_status: null,
      p_student_id: null,
      p_order_by: "id",
      p_order_dir: "desc",
      p_parent_phone: null,
    })

    // verificar que el resultado sea un array o un objeto con items
    if (resultado) {
      if (Array.isArray(resultado)) {
        setData(resultado)
      } else if (resultado.items && Array.isArray(resultado.items)) {
        setData(resultado.items)
      }
    }
    setIsLoading(false)
  }

  useEffect(() => {
    // carga los datos de forma inicial
    loadInitialData()
  }, [])

  return (
    <div className="flex h-full min-h-[80vh] w-full flex-col justify-center gap-6 px-4">
      <div className="space-y-2">
        <Button className="w-fit" variant="link" onClick={() => navigate("/")}>
          <ArrowLeft className="h-4 w-4" /> Regresar
        </Button>
        <h1 className="text-3xl font-extrabold tracking-tight">
          Dashboard del Consejero
        </h1>
        <p className="text-lg text-muted-foreground">
          Sistema de Permisos Escolares
        </p>
      </div>

      <Card className="shadow-md">
        <div className="flex items-center justify-between p-4">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold">Solicitudes Recientes</h3>
            <p className="text-sm text-muted-foreground">
              Gestione las solicitudes de los padres
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={loadInitialData}
            disabled={isLoading}
          >
            <RefreshCcw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />{" "}
            {isLoading ? "Cargando..." : "Actualizar"}
          </Button>
        </div>
        <CardContent className="p-0 sm:p-4">
          <div className="overflow-x-auto rounded-md border">
            <Table className="min-w-[700px] sm:min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Estudiante</TableHead>
                  <TableHead>Grado</TableHead>
                  <TableHead>Motivo</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-8 text-center text-muted-foreground"
                    >
                      Cargando solicitudes...
                    </TableCell>
                  </TableRow>
                ) : data.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-8 text-center text-muted-foreground"
                    >
                      No se encontraron solicitudes.
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((solicitud) => (
                    <TableRow
                      key={solicitud.id}
                      className="transition-colors hover:bg-muted/30"
                    >
                      <TableCell className="font-semibold">
                        {solicitud.student_name}
                        <span className="block text-xs font-normal text-muted-foreground">
                          ID: {solicitud.student_id}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {solicitud.student_grade}
                      </TableCell>
                      <TableCell
                        className="max-w-[150px] truncate"
                        title={solicitud.reason}
                      >
                        {solicitud.reason}
                      </TableCell>
                      <TableCell className="text-sm">
                        {solicitud.start_date}
                      </TableCell>
                      <TableCell>
                        {renderStatusBadge(solicitud.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="icon"
                                variant="ghost"
                                title="Ver detalles"
                                className="h-8 w-8"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Detalles de Solicitud</DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-4 py-4 text-sm">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <span className="col-span-1 text-right font-semibold">
                                    Estudiante:
                                  </span>
                                  <span className="col-span-3">
                                    {solicitud.student_name} (
                                    {solicitud.student_grade})
                                  </span>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <span className="col-span-1 text-right font-semibold">
                                    ID:
                                  </span>
                                  <span className="col-span-3">
                                    {solicitud.student_id}
                                  </span>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <span className="col-span-1 text-right font-semibold">
                                    Teléfono:
                                  </span>
                                  <span className="col-span-3">
                                    {solicitud.parent_phone}
                                  </span>
                                </div>
                                <div className="grid grid-cols-4 items-start gap-4">
                                  <span className="col-span-1 text-right font-semibold">
                                    Motivo:
                                  </span>
                                  <span className="col-span-3">
                                    {solicitud.reason}
                                  </span>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <span className="col-span-1 text-right font-semibold">
                                    Fechas:
                                  </span>
                                  <span className="col-span-3">
                                    {solicitud.start_date} al{" "}
                                    {solicitud.end_date}
                                  </span>
                                </div>
                                <div className="grid grid-cols-4 items-start gap-4">
                                  <span className="col-span-1 text-right font-semibold">
                                    Notas:
                                  </span>
                                  <span className="col-span-3 whitespace-pre-wrap">
                                    {solicitud.observations || "Ninguna"}
                                  </span>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <span className="col-span-1 text-right font-semibold">
                                    Estado:
                                  </span>
                                  <span className="col-span-3">
                                    {renderStatusBadge(solicitud.status)}
                                  </span>
                                </div>
                              </div>
                              {solicitud.status === "Pendiente" && (
                                <div className="mt-4 flex justify-end gap-2 border-t pt-4">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="gap-1 border-green-200 text-green-600 hover:bg-green-50 hover:text-green-700"
                                    onClick={() =>
                                      handleStatus(solicitud.id, "Aprobado")
                                    }
                                  >
                                    <CheckCircle2 className="h-4 w-4" /> Aprobar
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="gap-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                                    onClick={() =>
                                      handleStatus(solicitud.id, "Rechazado")
                                    }
                                  >
                                    <XCircle className="h-4 w-4" /> Rechazar
                                  </Button>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
