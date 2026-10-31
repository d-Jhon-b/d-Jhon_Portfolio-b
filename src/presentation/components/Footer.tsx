interface FooterProps {
  fullName: string;
}

export function Footer({ fullName }: FooterProps) {
  return (
    <footer className="mt-auto border-t border-line py-8">
      <div className="mx-auto max-w-[44rem] px-6 text-sm text-muted">
        <p>
          {new Date().getFullYear()} · {fullName}
        </p>
      </div>
    </footer>
  );
}
