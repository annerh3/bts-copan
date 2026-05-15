import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey, {
    global: {
        fetch: (...args) => fetch(...args),
    },
})

export const getAllAbsentRequests = async () => {
    const { data, error } = await supabase
        .from('permisos_salida')
        .select('*')
    if (error) throw error
    console.log("Esta respondiendo la base de datos: " + JSON.stringify(data))
    return data
}


