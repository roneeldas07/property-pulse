import React from 'react'
import {
    EmailIcon,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    EmailShareButton,
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    LinkedinShareButton,
    LinkedinIcon,
  } from "react-share";

const PropertyShareButtons = ({property}) => {
    const shareUrl = `${process.env.NEXTAUTH_URL}/properties/${property._id}`
  return (
    <div className='flex justify-center align-middle flex-col gap-2'>
        <h3 className='text-center text-xl font-bold'>Share Property</h3>
        <div className="flex justify-center gap-3">
            <WhatsappShareButton url={shareUrl} title={property.name}>
                <WhatsappIcon size={40} round/>
            </WhatsappShareButton>
            <LinkedinShareButton url={shareUrl} title={property.name} summary={`${property.type} For Rent`}>
                <LinkedinIcon size={40} round/>
            </LinkedinShareButton>
            <FacebookShareButton url={shareUrl} quote={property.name} hashtag={`${property.type.replace(/\s/g,'')}ForRent`}>
                <FacebookIcon size={40} round/>
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} title={property.name} hashtags={[`${property.type.replace(/\s/g,'')}ForRent`]}>
                <TwitterIcon size={40} round/>
            </TwitterShareButton>
            <EmailShareButton url={shareUrl} subject={property.name} body={`${property.type} For Rent`}>
                <EmailIcon size={40} round/>
            </EmailShareButton>
        </div> 
    </div>
  )
}

export default PropertyShareButtons