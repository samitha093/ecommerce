function Profile() {
  const containerRightStyle: React.CSSProperties = {
    marginTop:'-200px',
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    marginLeft: '40px'
  };
  return (
    <div>
         <div style={containerRightStyle}>
        <div className="h-56 grid grid-cols-1 gap-0  mt-0">
          <div>
            <h1 style={{ fontSize: '44px', fontWeight: 'bold',textAlign:'left',color:'#001C30' }}>Register</h1>
          </div>
          <div>
            <h1 style={{textAlign:'left'}}>Please fill in the information below </h1>
          </div>

          <div className=" mt-2">
            <input placeholder="Your Name"
              type="text"
              style={{ border: '1px solid #7FFFD4	', borderRadius: '5px', height: '50px', width: '300px' }}
            />
          </div>
          <div className=" mt-2">
            <input placeholder="email"
              type="text"
              style={{ border: '1px solid #7FFFD4	', borderRadius: '5px', height: '50px', width: '300px' }}
            />
          </div>
          <div className=" mt-2">
            <input placeholder="Password"
              type="text"
              style={{ border: '1px solid #7FFFD4	', borderRadius: '5px', height: '50px', width: '300px' }}
            />
          </div>
          <div className=" mt-2">
            <input placeholder="Confirm Password"
              type="text"
              style={{ border: '1px solid #7FFFD4	', borderRadius: '5px', height: '50px', width: '300px' }}
            />
          </div>


            <div className="grid grid-cols-2 gap-1 mt-2">
                <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                  <input
                    className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                    type="checkbox"
                    value=""
                    id="checkboxDefault" />
                  <label
                    className="inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="checkboxDefault">
                    I agree to terms & Policy.
                  </label>
                </div>
              
            
            </div>


            
            <div style={{ textAlign: 'left' }} className="mt-8">
           <button style={{padding:'15px',width:'130px'}} className="bg-blue-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Register
      </button>
    </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;