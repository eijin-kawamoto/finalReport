import React from "react";
import Image from "./Image";

export default function Gallery({ imageUrl, breed }) {
    return (
        <div>
          {imageUrl && <Image imageUrl={imageUrl} altText={breed} />}
        </div>
    );
}