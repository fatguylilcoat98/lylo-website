import Image from "next/image";

type Props = {
  className?: string;
  variant?: "nav" | "footer";
};

export default function LyloMark({ className, variant = "nav" }: Props) {
  const dims =
    variant === "footer"
      ? { width: 200, height: 133 }
      : { width: 140, height: 93 };

  return (
    <Image
      src="/lylo-logo.png"
      alt="LYLO — Love Your Loved One"
      width={dims.width}
      height={dims.height}
      className={className ?? ""}
      priority={variant === "nav"}
    />
  );
}
