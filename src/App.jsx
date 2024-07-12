import { useState , useCallback ,useEffect, useRef} from "react";

function App() {
  const[length, setLength]=useState(8);
  const[numberAllowed ,setnumberAllowed]=useState(false);
  const [charAllowed , setcharAllowed]=useState(false);
  const[password,setpassword]=useState("")
  const passwordRef=useRef(null)
  const passwordGenerator=useCallback(()=> {
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="1234567890"
    if(charAllowed) str+="!@#$%^&*_-+=[]{}~`"
    for (let i = 1; i <= length; i++) {
     let char=Math.floor(Math.random()*str.length+1)
     pass += str.charAt(char)  
    }
    setpassword(pass)

  } ,[length,numberAllowed,charAllowed,setpassword])

 const copyPasswordToClipboard = useCallback(() =>{
  passwordRef.current?.select();

  window.navigator.clipboard.writeText(password)
 }, [password])

  useEffect(() =>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])



  return (
    <>
    <div
      style={{
        width: "100%",
        maxWidth: "448px",
        marginLeft: "auto",
        marginRight: "auto",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        paddingLeft: "56px",
        paddingRight: "56px",
        paddingBottom:"20px",
        marginTop: "320px",
        marginBottom: "320px",
        color: "black",
        background: "linear-gradient(135deg,#266799, #27ae60)",/*#2a2a2a,#4a4a4a*/ /*#3498db, #2ecc71*/
      }}
    >
      <h1 style={{ color: "black", textAlign: "center",paddingTop:"20px"}}>  Password Genrator</h1>
      <div style={{ display: "flex", borderRadius: "16px", overflow: "hidden", marginBottom: "4px" , paddingBottom:"30px",paddingTop:"20px"}}>
        <input
          type="text"
          value={password}
          style={{
            outline: "none",
            width: "100%",
            padding: "10px",
          }}
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
       <button
onClick={copyPasswordToClipboard}

       style={{
        outline:"none",
        backgroundColor:"black",
        color:"white",
        paddingLeft: "0.75rem",
        paddingRight: "0.75rem",
        paddingTop: "0.125rem",
        paddingBottom: "0.125rem",
        flexShrink: 0,
        
       }}>copy</button>

      </div>
      <div style={{
        display:"flex",
        fontSize: "0.875rem", /* Equivalent to 14px */
        columnGap: "0.5rem"
      }}>
        <div style={{display:"flex",
          alignItems:"center",
          columnGap:"4px"
        }}
        >
          <input type="range"
          min={6}
          max={50}
          value={length}
          onChange={(e) => {
            setLength(e.target.value)
          }}
          style={{cursor:"pointer"}}
          />
          <label><b>Length</b>:{length}</label>
        </div>
        <div style={{display:"flex",alignItems:"center",columnGap:"4px"}}>
            <input type="checkbox" 
             id="numberInput"
             defaultChecked={numberAllowed}
             onChange={()=>{
              setnumberAllowed((prev) => !prev)
             }}
             />
             <label htmlFor ><b>Numbers</b></label>

        </div>
        <div style={{display:"flex",alignItems:"center",columnGap:"4px"}}>
            <input type="checkbox" 
             id="charInput"
             defaultChecked={charAllowed}
             onChange={()=>{
              setcharAllowed((prev) => !prev)
             }}
             />
             <label htmlFor ><b>Characters</b></label>

        </div>
      </div>
    </div>
  </>
  
  );
}

export default App;
