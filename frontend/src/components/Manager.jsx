import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
import eyeIcon from '../assets/eye.svg'
import eyecrossIcon from '../assets/eyecross.svg'
import copyIcon from '../assets/copy.svg'
import editIcon from '../assets/edit.svg'
import deleteIcon from '../assets/delete.svg'

const Manager = () => {

    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])


    const getPasswords= async () => {
      let req = await fetch("http://localhost:3000")
      let passwords = await req.json();
      console.log(passwords)
      setPasswordArray(passwords)
    }
    
    useEffect(() => {
       getPasswords()
    }, [])


    const showPassword = () => {
        passwordRef.current.type = "text";
        console.log(ref.current.src)
        if (ref.current.src.includes("eyecross")) {
            ref.current.src = eyeIcon
            passwordRef.current.type = "password";
        }
        else {
            ref.current.src = eyecrossIcon
            passwordRef.current.type = "text";

        }
    }

    const savePassword = async () => {
        if(form.site.length>3 && form.username.length>3 && form.password.length>3){
            await fetch("http://localhost:3000/",{method:"DELETE", headers:{"Content-Type":"application/json"},
            body:JSON.stringify({id: form.id })})

            setPasswordArray([...passwordArray, {...form, id:uuidv4()}])
            await fetch("http://localhost:3000/",{method:"POST", headers:{"Content-Type":"application/json"},
                body:JSON.stringify({...form,id:uuidv4() })})

            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id:uuidv4()}]))
            // console.log([...passwordArray, form])
            setform({ site: "", username: "", password: "" })
            toast('Password saved successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                
            });
        }
        else{
            toast('Error:Password not saved')
        }
    }
    const deletePassword = async (id) => {
        console.log("Deleting password with id:",id)
        let c = confirm("Do you really want delete this passwords")
    if(c){

        setPasswordArray(passwordArray.filter(item=>item.id!==id))
        
        await fetch("http://localhost:3000/",{method:"DELETE", headers:{"Content-Type":"application/json"},
            body:JSON.stringify({id })})
        // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
    }
     toast('Password deleted successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
           
        });
        
    }
    const editPassword = (id) => {
        console.log("Editing detail with id :", id)
    setform({...passwordArray.filter(i=>i.id===id)[0], id:id})
        setPasswordArray(passwordArray.filter(item=>item.id!==id)) 
         
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('🦄Copy to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
           
        });
        navigator.clipboard.writeText(text)
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>

            <div className="p-2 md:p-0 md:mycontainer">
                <h1 className='text-4xl text font-bold text-center'>
                    <span className='text-green-700'>&lt;</span>
                    Pass
                    <span className='text-green-700'>OP&gt;</span>
                </h1>
                <p className="text-green-900 text-lg text-center"> Your own Password Manager</p>
                <div className=" flex flex-col p-4 text-black gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name='site' id='site' />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1 ' type="text" name='username' id='username' />
                        <div className="relative">

                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='  rounded-full border border-green-500 w-full p-4 py-1' type="password" name='password' id='password' />
                            <span className='absolute right-[3px] top-[3px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={30} height={30} src={eyeIcon} alt="eye icon" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-green-400 hover:bg-green-300 rounded-full px-8 gap-4 border py-2 w-fit'>
                        <lord-icon
                            src="https://cdn.lordicon.com/gzqofmcx.json"
                            trigger="hover">
                        </lord-icon>Save</button>
                </div>

                <div className="password">
                    <h2 className='font-bold text-xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overfull-hidden mb-15">
                        <thead className='text-white bg-green-500'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='text-center border border-white py-3 px-2 max-w-xs'> <a href={item.site} target='_blank'></a>
                                        <div className='flex justify-center items-center gap-2'>
                                            <span className='truncate text-sm flex-1'>{item.site}</span>
                                            <img width={20} height={20} className='cursor-pointer flex-shrink-0' onClick={() => { copyText(item.site) }} src={copyIcon} alt="copy" />
                                        </div>

                                    </td>
                                    <td className='text-center border border-white py-3 px-2 max-w-xs'>

                                        <div className='flex justify-center items-center gap-2 flex-wrap'>
                                            <span className='break-all text-sm'>{item.username}</span>
                                            <img width={20} height={20} className='cursor-pointer flex-shrink-0' onClick={() => { copyText(item.username) }} src={copyIcon} alt="copy" />
                                        </div>
                                    </td>
                                    <td className='text-center border border-white py-3 px-2 max-w-xs'>
                                        <div className='flex justify-center items-center gap-2 flex-wrap'>
                                            <span className='text-sm'>{item.password.length}</span>
                                            <img width={20} height={20} className='cursor-pointer flex-shrink-0' onClick={() => { copyText(item.password) }} src={copyIcon} alt="copy" />
                                        </div>
                                    </td>
                                    <td className='py-2 px-2 border border-white'>
                                        <div className="flex justify-center items-center gap-1 flex-wrap">

                                        <span onClick={()=>{editPassword(item.id)}}>
                                            <img width={24} height={24} className='cursor-pointer' src={editIcon} alt="edit" />
                                        </span>
                                        <span onClick={()=>{deletePassword(item.id)}}>
                                            <img width={24} height={24} className='cursor-pointer' src={deleteIcon} alt="delete" />
                                        </span>
                                        </div>
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>
                    }

                </div>

            </div>
        </>

    )
}

export default Manager
