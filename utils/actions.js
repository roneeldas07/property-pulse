const api_domain = process.env.NEXT_PUBLIC_API_DOMAIN || null

export const fetchProperties = async (page, recordsPerPage, location, type) => {
    try {
        if(!api_domain) return []
        let url = `${api_domain}/properties`
        if(page && recordsPerPage){
            url += `?page=${page}&recordsPerPage=${recordsPerPage}`
        }
        if(location) url+= `&location=${location}`
        if(type) url+= `&type=${type}`
        
        const res = await fetch(url,{ method: 'GET' , cache: 'no-store'})
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

export const getBookmarkedData = async (propertyId) => {
    try {
        if(!api_domain) return null
        if(!propertyId) return null
        const res = await fetch(`${api_domain}/bookmark/check`,{ 
            method: 'POST' ,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                propertyId
            })
        })
        if(!res.ok){
            throw new Error("error in fetching record")
        }
        return res.json()
    } catch (error) {
        console.error(error)
        return null
    }
}

export const bookmarkAction = async (propertyId, isBookmarked) => {
    try {
        if(!api_domain) return null
        if(!propertyId) return null
        const res = await fetch(`${api_domain}/bookmark`,{ 
            method: 'POST' ,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                propertyId,
                bookmark: !isBookmarked
            })
        })
        if(!res.ok){
            throw new Error("error in fetching record")
        }
        return res.json()
    } catch (error) {
        console.error(error)
        return null
    }
}

export const getSavedProperties = async () => {
    try {
        if(!api_domain) return null
        const res = await fetch(`${api_domain}/properties/saved`,{method: 'GET'})
        if(!res.ok){
            throw new Error("error in fetching record")
        }
        return res.json()
    } catch (error) {
        console.error(error)
        return null
    }
}