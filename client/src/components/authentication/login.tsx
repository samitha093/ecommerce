function Login() {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70vh',
  };
  function checkPassword(event: any) {
    const passwordInput = event.target as HTMLInputElement;
    const passwordError = document.getElementById("passwordError");
  
    if (passwordInput.value.trim() === "") {
      if (passwordError) {
        passwordError.style.display = "block";
      }
    } else {
      if (passwordError) {
        passwordError.style.display = "none";
      }
    }
  }
  
  
  return (
    <div style={containerStyle}>
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
          </div>
          <div className="mb-6">
          <div className="mb-6">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
    Password
  </label>
  <input
    className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
    id="password"
    type="password"
    placeholder="******************"
    onInput={checkPassword}
  />
  <p className="text-red-500 text-xs italic" id="passwordError">Please choose a password.</p>
</div>

  <p className="text-red-500 text-xs italic" id="passwordError">Please choose a password.</p>
</div>

          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Sign In
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
              Forgot Password?
            </a>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2023 Ecommerce. All rights reserved.
        </p>
      </div>
    </div>
  )
}
export default Login;