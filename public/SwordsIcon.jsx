"use client";
// icons/BookIcon.jsx
const SwordsIcon = ({ className, stroke = "#333" }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.5 17.5L3 6V3H6L17.5 14.5M13 19L19 13M16 16L20 20M19 21L21 19M14.5 6.5L18 3H21V6L17.5 9.5M5 14L9 18M7 17L4 20M3 19L5 21"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SwordsIcon;
