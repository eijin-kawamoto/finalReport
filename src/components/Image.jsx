import React from "react";

export default function Image({ imageUrl, altText }) {
    const generatedAltText = altText || "Dog Image";

    return (
        <img
        src={imageUrl}
        alt={generatedAltText}
        style={{ maxWidth: "100%", height: "auto" }}
        />
    );
}