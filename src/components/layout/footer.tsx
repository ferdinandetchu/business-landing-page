export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container flex flex-col items-center justify-center gap-4 py-10 max-w-7xl px-4 sm:px-6 lg:px-8 md:h-24 md:flex-row md:py-0">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} Verity Solutions. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
