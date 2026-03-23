import React from "react";

import "./Card.css";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

interface CardImageProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  position?: string;
  className?: string;
}

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

interface CardBodyProps {
  className?: string;
  children: React.ReactNode;
}

interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

export const Card = ({
  className,
  children,
  as: Component = "div",
}: CardProps) => {
  return React.createElement(
    Component,
    { className: `card ${className || ""}` },
    children,
  );
};

export const CardImage = ({
  src,
  alt,
  aspectRatio = "16/9",
  position = "center",
  className,
}: CardImageProps) => {
  return (
    <div
      className={`card-image ${className || ""}`}
      style={
        {
          "--aspect": aspectRatio,
          "--position": position,
        } as React.CSSProperties
      }
    >
      <img src={src} alt={alt} />
    </div>
  );
};

export const CardHeader = ({ className, children }: CardHeaderProps) => {
  return <div className={`card-header ${className || ""}`}>{children}</div>;
};

export const CardBody = ({ className, children }: CardBodyProps) => {
  return <div className={`card-body ${className || ""}`}>{children}</div>;
};

export const CardFooter = ({ className, children }: CardFooterProps) => {
  return <div className={`card-footer ${className || ""}`}>{children}</div>;
};
