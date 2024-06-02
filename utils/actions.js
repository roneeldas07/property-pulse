const api_domain = process.env.NEXT_PUBLIC_API_DOMAIN || null

export const fetchProperties = async () => {
    try {
        if(!api_domain) return []
        const res = await fetch(`${api_domain}/properties`,{ method: 'GET' , cache: 'no-store'})
        if(!res.ok){
            throw new Error("error in fetching records")
        }
        return res.json()
    } catch (error) {
        console.log(error)
        return []
    }
}

export const fetchProperty = async (id) => {
    try {
        if(!api_domain) return null
        if(!id) return null
        const res = await fetch(`${api_domain}/properties/${id}`,{ method: 'GET' })
        if(!res.ok){
            throw new Error("error in fetching record")
        }
        return res.json()
    } catch (error) {
        console.log(error)
        return null
    }
}