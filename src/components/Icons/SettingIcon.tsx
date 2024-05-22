import { SVGProps } from "react";

export function SettingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 48 48"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="4"
      >
        <path d="m34 41l10-17L34 7H14L4 24l10 17z"></path>
        <path d="M24 29a5 5 0 1 0 0-10a5 5 0 0 0 0 10Z"></path>
      </g>
    </svg>
  );
}
