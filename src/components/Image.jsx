import React from "react";

export default function Image({ imageUrl, altText }) {
    return (
        <img
        src={imageUrl}
        alt={altText}
        style={{ maxWidth: "100%", height: "auto" }}
        />
    );
}