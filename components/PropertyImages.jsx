import Image from 'next/image'
import React, { useId } from 'react'
import { Gallery, Item } from 'react-photoswipe-gallery'

const PropertyImages = ({images}) => {
    return (
        <Gallery>
            <section key={useId()} className='rounded-lg shadow-md bg-white p-2 grid grid-cols-2 mt-3 gap-2'>
                {images.map((image,index)=>
                <Item
                    original={image}
                    thumbnail={image}
                    width="1024"
                    height="768"
                >{({ ref, open }) => (
                    <Image
                        src={image}
                        ref={ref} onClick={open}
                        className={`h-[400px] w-full rounded-md cursor-pointer ${ (index == images.length-1 && index%2 == 0) ? "col-span-2":"col-span-1"}`}
                        alt="Property Image"
                        height={0}
                        width={0}
                        key={index}
                        sizes='100vw'
                    />
                )}
                </Item>)}
            </section>
        </Gallery>
    )
}

export default PropertyImages