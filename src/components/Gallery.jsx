import React from "react";
import Image from "./Image";

export default function Gallery({ imageUrl }) {
    return (
        <div>
          {imageUrl && <Image imageUrl={imageUrl} />}
        </div>
    );
}