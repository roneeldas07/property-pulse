import Image from 'next/image'
import React from 'react'

const HeaderImage = ({image}) => {
    return (
        <section>
            <div className="container-xl m-auto">
                <div className="grid grid-cols-1">
                    <Image
                        src={image}
                        alt=""
                        className="object-cover h-[400px] w-full"
                        sizes='100vw'
                        height={0}
                        width={0}
                        priority
                    />
                </div>
            </div>
        </section>
    )
}

export default HeaderImage