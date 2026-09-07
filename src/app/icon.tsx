import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f6f4ed",
          borderRadius: 7,
        }}
      >
        <svg width="32" height="32" viewBox="0 0 170 170">
          <line x1="85" y1="85" x2="85" y2="38" stroke="#8fbf98" strokeWidth="6" />
          <line x1="85" y1="85" x2="85" y2="132" stroke="#8fbf98" strokeWidth="6" />
          <line x1="85" y1="85" x2="38" y2="85" stroke="#8fbf98" strokeWidth="6" />
          <line x1="85" y1="85" x2="132" y2="85" stroke="#8fbf98" strokeWidth="6" />
          <circle cx="85" cy="38" r="11" fill="#8fbf98" />
          <circle cx="85" cy="132" r="11" fill="#8fbf98" />
          <circle cx="38" cy="85" r="11" fill="#8fbf98" />
          <circle cx="132" cy="85" r="11" fill="#8fbf98" />
          <circle cx="85" cy="85" r="18" fill="#8fbf98" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
