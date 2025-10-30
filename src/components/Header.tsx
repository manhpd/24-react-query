export default function Header({ children }: any) {
  return (
    <>
      <div id="main-header-loading"></div>
      <header id="main-header">
        <div id="header-title">
          <h1>React Events Hello World</h1>
        </div>
        <nav>{children}</nav>
      </header>
    </>
  );
}
