type AccessFoundationBannerProps = {
  text: string;
};

export function AccessFoundationBanner({ text }: AccessFoundationBannerProps) {
  return (
    <p className="access-foundation-banner" role="status">
      {text}
    </p>
  );
}
