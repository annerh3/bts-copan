import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hcjoktrbrqosdghiwkyd.supabase.co'
const supabaseKey = 'sb_publishable_mzdEn2_fXJ44xlDnggulBw_32yySI9m'
const supabase = createClient(supabaseUrl, supabaseKey)

interface GetPermissionsParams {
    p_page: number;
    p_per_page: number;
    p_status: string | null;
    p_student_id: string | null;
    p_order_by: string;
    p_order_dir: 'asc' | 'desc';
    p_parent_phone: string | null;
}

export const getPermissionsPage = async (params: GetPermissionsParams) => {
    try {
        const { data, error } = await supabase.rpc('get_permissions_page', params)

        if (error) {
            console.error("Error en la base de datos:", error.message)
            throw error
        }
        
        if (data && data.length > 0) {
            console.log("Datos recibidos con éxito:", data[0])
            

            return data[0].json_data || data[0]
        }
        
        return { items: [], total: 0, page: params.p_page, per_page: params.p_per_page }
        
    } catch (error) {
        console.error("Error de red o ejecución:", error)
        return null
    }
}