export type ApplyClickInfo = {
  id: string;
  company: string;
  role_title: string;
};

export function notifyApplyClick(opportunity: ApplyClickInfo) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<ApplyClickInfo>("hublr:apply-click", { detail: opportunity }),
  );
}
