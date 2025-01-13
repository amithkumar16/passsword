import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
const Manager = () => {
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordarray, setpasswordarray] = useState([]);
    const passwordref = useRef();
    const getpasswords = async () => {
        let req = await fetch("http://localhost:3000/");
        let passwords = await req.json()

        setpasswordarray(passwords);

    }
    useEffect(() => {
        getpasswords()
    }, []);

    const showpassword = () => {
        if (passwordref.current.type === "password") {
            passwordref.current.type = "text";
        } else {
            passwordref.current.type = "password";
        }
    };

    const savepassword = async () => {
       
        // localStorage.setItem("passwords", JSON.stringify([...passwordarray, { ...form, id: uuidv4() }]));

        //if any such id exists then delete

        await fetch('http://localhost:3000', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id:form.id
            })
        });

        setpasswordarray([...passwordarray,{...form,id:uuidv4()}]); 

        await fetch('http://localhost:3000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...form,id:uuidv4()
            })
        });
        
        setform({ site: "", username: "", password: "" })
        console.log([...passwordarray, form])
    };

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                alert("Copied to clipboard!" + text); // Optionally, you can add a success alert
            });
    };

    const deletePassword = async (id) => {
        let c = confirm("do you really want to delete the password")
        if (c) {
            const updatedPasswords = passwordarray.filter(item => item.id !== id)
            setpasswordarray(updatedPasswords);
            // localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
            await fetch('http://localhost:3000', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id
                })
            });
        }

    };

    const editPassword = (id) => {
        setform({...passwordarray.filter(i => i.id === id)[0]})
        setpasswordarray(passwordarray.filter(item => item.id !== id))

    };

    return (
        <>
            <div className="absolute inset-0 -z-10 min-h-[80vh] w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

            <div className='rounded-xl text-center p-10'>
                <h1 className="text-4xl text-white font-bold">
                    <span className='text-green-700'>&lt;</span>
                    <span>Pass</span><span className='text-green-700'>
                        OP/&gt;
                    </span>
                </h1>
                <p className='text-green-700'>your own password manager</p>
            </div>

            <div className='text-black flex flex-col gap-3 p-4'>
                <input className='rounded-full border border-green-700 w-full p-4 py-1' type="text" name='site' id='' value={form.site} onChange={handlechange} placeholder='enter the website url' />
                <div className='flex gap-5 relative'>
                    <input onChange={handlechange} value={form.username} className='rounded-full border border-green-700 w-1/2 p-4 py-1' type="text" name='username' id='' placeholder='enter the username' />
                    <input ref={passwordref} value={form.password} onChange={handlechange} className='rounded-full border border-green-700 w-1/2 p-4 py-1' type="password" name='password' id='' placeholder='enter the password' />
                    <span className='absolute cursor-pointer right-4 top-1' onClick={showpassword}>
                        <img src="eye.png" alt="" width={20} height={20} />
                    </span>
                </div>
            </div>

            <div className='flex justify-center mt-3'>
                <button onClick={savepassword} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Add password
                    </span>
                </button>
            </div>

            <h2 className="text-white font-bold text-2xl px-3 p-4">Your Passwords</h2>
            <div className="passwords pb-10">

                {passwordarray.length === 0 && (
                    <div className="text-white text-center">No passwords to show</div>
                )}


                {passwordarray.length > 0 && (
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="w-full">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Site</th>
                                    <th scope="col" className="px-6 py-3">Username</th>
                                    <th scope="col" className="px-6 py-3">Password</th>
                                    <th scope="col" className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-white bg-slate-400">
                                {passwordarray.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4">
                                            <div className='flex gap-1 backdrop-invert-0' onClick={() => copyText(item.site)}>
                                                <a href={item.site}>
                                                    {item.site}
                                                </a>
                                                <img src="save.png" alt="" width={10} style={{ "invert": "0" }} />
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className='flex gap-1' onClick={() => copyText(item.username)}>
                                                {item.username}
                                                <img src="save.png" alt="" width={10} style={{ "invert": "0" }} />
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className='flex gap-1' onClick={() => copyText(item.password)}>
                                                {"*".repeat(item.password.length)}
                                                <img src="save.png" alt="" width={10} style={{ "invert": "0" }} />
                                            </div>
                                        </td>


                                        <td className="mt-1">
                                            <button type="button" class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => editPassword(item.id)}>Edit</button>
                                            <button type="button" class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => deletePassword(item.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
};

export default Manager;
