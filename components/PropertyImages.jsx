import Image from 'next/image'
import React, { useId } from 'react'

const PropertyImages = ({images}) => {
    return (
        <section key={useId()} className='rounded-lg shadow-md bg-white p-2 grid grid-cols-2 mt-3 gap-2'>
            {images.map((image,index)=><Image
                src={image}
                className={`h-[400px] w-full rounded-md ${ (index == images.length-1 && index%2 == 0) ? "col-span-2":"col-span-1"}`}
                alt="Property Image"
                height={0}
                width={0}
                key={index}
                sizes='100vw'
            />)}
        </section>
    )
}

export default PropertyImages