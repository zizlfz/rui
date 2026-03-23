import { Box } from "#/components/ui/Box";
import { Button } from "#/components/ui/Button";

interface PricingCardBlockProps {
  title: string;
  price: string;
  description?: string;
  features: string[];
  buttonText?: string;
  buttonVariant?: "primary" | "secondary";
  isPopular?: boolean;
  onClick?: () => void;
}

export function PricingCardBlock({
  title,
  price,
  description,
  features,
  buttonText = "Get Started",
  buttonVariant = "primary",
  isPopular = false,
  onClick,
}: PricingCardBlockProps) {
  return (
    <Box className="flex flex-col gap-4 relative min-w-3xs">
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-surface-primary text-content-primary">
            Popular
          </span>
        </div>
      )}
      <div className="text-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="mt-2">
          <span className="text-3xl font-bold">{price}</span>
        </div>
        {description && (
          <p className="mt-2 text-sm text-content-muted">{description}</p>
        )}
      </div>
      <ul className="flex flex-col gap-2 flex-1">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm">
            <svg
              className="w-4 h-4 text-success"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <title>Check</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <Button variant={buttonVariant} className="w-full" onClick={onClick}>
        {buttonText}
      </Button>
    </Box>
  );
}
