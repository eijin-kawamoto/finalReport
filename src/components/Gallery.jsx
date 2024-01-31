import React from "react";
import Image from "./Image";

export default function Gallery({ dog }) {
    return (
        <div>
            {dog.map((dogData) => (
                <Image
                key={dogData.id}
                imageUrl={dogData.url}
                altText={dogData.altText}
                />
            ))}
        </div>
    );
}