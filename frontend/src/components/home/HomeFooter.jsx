const HomeFooter = () => {
  return (
    <footer
      className="bg-gradient-to-b from-white to-blue-200 px-4 py-10 sm:px-6 lg:px-8"
      aria-labelledby="footer-heading"
    >
      <div className="mx-auto max-w-7xl opacity-60">
        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm">© {new Date().getFullYear()} TaskFlow Pro.</p>
          <p>
            Built with ☕ by{" "}
            <a
              href="https://github.com/gneo0"
              target="_blank"
              className="text-sm underline decoration-1 underline-offset-2"
            >
              Giorgos Neofitou
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
