const api_domain = process.env.NEXT_PUBLIC_API_DOMAIN || null

export const fetchProperties = async () => {
    try {
        if(!api_domain) return []
        const res = await fetch(`${api_domain}/properties`,{ method: 'GET' , cache: 'no-store'})
        if(!res.ok){
            throw new Error("error in fetching records")
        }
        return await res.json()
    } catch (error) {
        console.error(error)
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
        console.error(error)
        return null
    }
}

export const fetchUserProperties = async (userId) => {
    try {
        if(!api_domain) return null
        if(!userId) return null
        const res = await fetch(`${api_domain}/properties/user/${userId}`,{ method: 'GET' })
        if(!res.ok){
            throw new Error("error in fetching record")
        }
        return await res.json()
    } catch (error) {
        console.error(error)
        return null
    }
}

export const deleteProperty = async (propertyId) => {
    try {
        if(!api_domain) return null
        if(!propertyId) return null
        const res = await fetch(`${api_domain}/properties/${propertyId}`,{ method: 'DELETE' })
        if(!res.ok){
            throw new Error("error in deleting record")
        }
        return await res.json()
    } catch (error) {
        console.error(error)
        return null
    }
}

export const updateProperty = async (propertyId, formData) => {
    try {
        if(!api_domain) return null
        if(!propertyId) return null
        const res = await fetch(`${api_domain}/properties/${propertyId}`,{ method: 'PUT', body: formData })
        if(!res.ok){
            throw new Error("error in updating record")
        }
        return res
    } catch (error) {
        console.error(error)
        return null
    }
}